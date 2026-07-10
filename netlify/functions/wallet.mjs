import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";

const INITIAL_COINS = Number(process.env.ACCOUNT_INITIAL_COINS) || 100;
const MAX_STAKE = Number(process.env.ACCOUNT_MAX_STAKE) || 100;
const RATE_LIMIT = Number(process.env.ACCOUNT_RATE_LIMIT_PER_MIN) || 10;
const DEVICE_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function resolveDeviceId(request) {
  return request.headers.get("x-device-id")?.trim() || "";
}

function walletKey(deviceId) {
  return crypto.createHash("sha256").update(`wallet:v2:device:${deviceId}`).digest("hex");
}

function maskDeviceId(deviceId) {
  if (!deviceId) return "未知设备";
  return deviceId.replace(/-/g, "").slice(0, 8) + "…";
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

async function loadWallet(store, key) {
  const existing = await store.get(key, { type: "json" });
  if (existing) return existing;
  return {
    coins: INITIAL_COINS,
    tickets: [],
    prefs: {},
    nextId: 1,
    betTimestamps: [],
    createdAt: new Date().toISOString(),
  };
}

async function saveWallet(store, key, wallet) {
  await store.setJSON(key, wallet);
}

/** Re-read before write; retry if another request wrote in between (avoids prefs stomping bets). */
async function mutateWallet(store, key, mutator, maxAttempts = 8) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const wallet = await loadWallet(store, key);
    const revBefore = wallet.rev || 0;
    mutator(wallet);
    const lastTicket = wallet._lastTicket;
    delete wallet._lastTicket;
    wallet.rev = revBefore + 1;
    wallet.updatedAt = new Date().toISOString();
    await saveWallet(store, key, wallet);
    const verify = await store.get(key, { type: "json" });
    if ((verify?.rev || 0) === wallet.rev) {
      if (lastTicket) wallet._lastTicket = lastTicket;
      return wallet;
    }
  }
  throw new Error("wallet_write_conflict");
}

function pruneTimestamps(timestamps) {
  const cutoff = Date.now() - 60_000;
  return (timestamps || []).filter((t) => t > cutoff);
}

function recentBetCount(timestamps) {
  return pruneTimestamps(timestamps).length;
}

export default async (request, context) => {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Device-Id",
      },
    });
  }

  const deviceId = resolveDeviceId(request);
  if (!DEVICE_ID_RE.test(deviceId)) {
    return jsonResponse({ error: "invalid_device_id" }, 400);
  }

  const key = walletKey(deviceId);
  const store = getStore("geying-wallets");

  try {
    if (request.method === "GET") {
      const wallet = await loadWallet(store, key);
      return jsonResponse({
        coins: wallet.coins,
        cap: INITIAL_COINS,
        deviceLabel: maskDeviceId(deviceId),
        tickets: (wallet.tickets || []).slice(0, 200),
        prefs: wallet.prefs || {},
      });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "method_not_allowed" }, 405);
    }

    const body = await request.json();

    if (body.action === "prefs") {
      const wallet = await mutateWallet(store, key, (w) => {
        w.prefs = { ...(w.prefs || {}), ...(body.prefs || {}) };
      });
      return jsonResponse({ ok: true, prefs: wallet.prefs });
    }

    const stake = Math.round(Number(body.stake));
    if (!Number.isFinite(stake) || stake < 1 || stake > MAX_STAKE) {
      return jsonResponse({ error: "invalid_stake" }, 400);
    }

    if (body.action === "bet") {
      const wallet = await mutateWallet(store, key, (w) => {
        w.betTimestamps = pruneTimestamps(w.betTimestamps);
        if (recentBetCount(w.betTimestamps) >= RATE_LIMIT) {
          throw Object.assign(new Error("rate_limited"), { code: "rate_limited" });
        }
        if (w.coins < stake) {
          throw Object.assign(new Error("insufficient_coins"), { code: "insufficient_coins", coins: w.coins });
        }
        const ticket = {
          id: w.nextId++,
          ticket_type: body.type,
          picks: body.picks || {},
          legs: null,
          label: body.label || "",
          description: body.desc || "",
          stake,
          odds: Number(body.odds) || 1.01,
          status: "open",
          created_at: new Date().toISOString(),
        };
        w.coins -= stake;
        w.betTimestamps.push(Date.now());
        w.tickets = [ticket, ...(w.tickets || [])];
        w._lastTicket = ticket;
      });
      return jsonResponse({ coins: wallet.coins, ticket: wallet._lastTicket });
    }

    if (body.action === "parlay") {
      const legs = body.legs || [];
      if (!Array.isArray(legs) || legs.length < 2) {
        return jsonResponse({ error: "invalid_parlay" }, 400);
      }
      const wallet = await mutateWallet(store, key, (w) => {
        w.betTimestamps = pruneTimestamps(w.betTimestamps);
        if (recentBetCount(w.betTimestamps) >= RATE_LIMIT) {
          throw Object.assign(new Error("rate_limited"), { code: "rate_limited" });
        }
        if (w.coins < stake) {
          throw Object.assign(new Error("insufficient_coins"), { code: "insufficient_coins", coins: w.coins });
        }
        const ticket = {
          id: w.nextId++,
          ticket_type: "Z_parlay",
          picks: {},
          legs,
          label: body.label || "",
          description: body.desc || "",
          stake,
          odds: Number(body.odds) || 1.01,
          status: "open",
          created_at: new Date().toISOString(),
        };
        w.coins -= stake;
        w.betTimestamps.push(Date.now());
        w.tickets = [ticket, ...(w.tickets || [])];
        w._lastTicket = ticket;
      });
      return jsonResponse({ coins: wallet.coins, ticket: wallet._lastTicket });
    }

    return jsonResponse({ error: "unknown_action" }, 400);
  } catch (err) {
    if (err?.code === "rate_limited") return jsonResponse({ error: "rate_limited" }, 429);
    if (err?.code === "insufficient_coins") {
      return jsonResponse({ error: "insufficient_coins", coins: err.coins }, 400);
    }
    if (String(err?.message || err).includes("wallet_write_conflict")) {
      return jsonResponse({ error: "wallet_busy", message: "retry" }, 409);
    }
    return jsonResponse({ error: "server_error", message: String(err?.message || err) }, 500);
  }
};