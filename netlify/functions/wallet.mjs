import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";

const INITIAL_COINS = Number(process.env.ACCOUNT_INITIAL_COINS) || 100;
const MAX_STAKE = Number(process.env.ACCOUNT_MAX_STAKE) || 100;
const RATE_LIMIT = Number(process.env.ACCOUNT_RATE_LIMIT_PER_MIN) || 10;

function clientIp(request, context) {
  return (
    context.ip
    || request.headers.get("x-nf-client-connection-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown"
  );
}

function walletKey(ip) {
  return crypto.createHash("sha256").update(`wallet:v1:${ip}`).digest("hex");
}

function maskIp(ip) {
  if (!ip || ip === "unknown") return "本机";
  if (ip.includes(":")) {
    const parts = ip.split(":");
    return parts.slice(0, 3).join(":") + ":…";
  }
  const parts = ip.split(".");
  if (parts.length === 4) return `${parts[0]}.${parts[1]}.x.x`;
  return ip;
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
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const ip = clientIp(request, context);
  const key = walletKey(ip);
  const store = getStore("geying-wallets");

  try {
    if (request.method === "GET") {
      const wallet = await loadWallet(store, key);
      return jsonResponse({
        coins: wallet.coins,
        cap: INITIAL_COINS,
        ipLabel: maskIp(ip),
        tickets: (wallet.tickets || []).slice(0, 200),
        prefs: wallet.prefs || {},
      });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "method_not_allowed" }, 405);
    }

    const body = await request.json();
    const wallet = await loadWallet(store, key);

    if (body.action === "prefs") {
      wallet.prefs = { ...(wallet.prefs || {}), ...(body.prefs || {}) };
      await saveWallet(store, key, wallet);
      return jsonResponse({ ok: true, prefs: wallet.prefs });
    }

    const stake = Math.round(Number(body.stake));
    if (!Number.isFinite(stake) || stake < 1 || stake > MAX_STAKE) {
      return jsonResponse({ error: "invalid_stake" }, 400);
    }

    wallet.betTimestamps = pruneTimestamps(wallet.betTimestamps);
    if (recentBetCount(wallet.betTimestamps) >= RATE_LIMIT) {
      return jsonResponse({ error: "rate_limited" }, 429);
    }

    if (wallet.coins < stake) {
      return jsonResponse({ error: "insufficient_coins", coins: wallet.coins }, 400);
    }

    if (body.action === "bet") {
      const ticket = {
        id: wallet.nextId++,
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
      wallet.coins -= stake;
      wallet.betTimestamps.push(Date.now());
      wallet.tickets = [ticket, ...(wallet.tickets || [])];
      await saveWallet(store, key, wallet);
      return jsonResponse({ coins: wallet.coins, ticket_id: ticket.id });
    }

    if (body.action === "parlay") {
      const legs = body.legs || [];
      if (!Array.isArray(legs) || legs.length < 2) {
        return jsonResponse({ error: "invalid_parlay" }, 400);
      }
      const ticket = {
        id: wallet.nextId++,
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
      wallet.coins -= stake;
      wallet.betTimestamps.push(Date.now());
      wallet.tickets = [ticket, ...(wallet.tickets || [])];
      await saveWallet(store, key, wallet);
      return jsonResponse({ coins: wallet.coins, ticket_id: ticket.id });
    }

    return jsonResponse({ error: "unknown_action" }, 400);
  } catch (err) {
    return jsonResponse({ error: "server_error", message: String(err?.message || err) }, 500);
  }
};