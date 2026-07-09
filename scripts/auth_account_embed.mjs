export function authAccountCss() {
  return `
  .ac-bar {
    display: flex; flex-wrap: wrap; align-items: center; gap: 10px;
    margin-bottom: 14px; padding: 10px 12px; border-radius: 12px;
    background: rgba(15, 23, 42, 0.55); border: 1px solid #334155;
    font-size: 12px; color: #e2e8f0;
  }
  .ac-bar .ac-balance {
    font-size: 15px; font-weight: 700; color: #fbbf24;
  }
  .ac-bar .ac-balance-cap {
    font-size: 11px; color: #94a3b8; font-weight: 500;
  }
  .ac-bar .ac-user { color: #94a3b8; max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .ac-bar .ac-btn {
    border: 1px solid #475569; background: #1e293b; color: #e2e8f0;
    border-radius: 8px; padding: 6px 12px; cursor: pointer; font-size: 12px;
  }
  .ac-bar .ac-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .ac-offline-note {
    margin-bottom: 12px; padding: 8px 10px; border-radius: 8px;
    background: rgba(251, 191, 36, 0.12); border: 1px solid rgba(251, 191, 36, 0.35);
    color: #fcd34d; font-size: 11px;
  }
  `;
}

export function authAccountHtml() {
  return `<div class="ac-bar" id="acBar">
      <span class="ac-balance-wrap" style="margin-right:auto;display:flex;align-items:baseline;gap:6px;flex-wrap:wrap">
        <span class="ac-balance" id="acBalance">◈ — / 100</span>
        <span class="ac-balance-cap" id="acBalanceCap">账户上限 ◈100</span>
      </span>
      <span class="ac-user" id="acUser">按 IP 识别钱包</span>
      <button type="button" class="ac-btn" id="acRefreshBtn">刷新钱包</button>
    </div>
    <div class="ac-offline-note" id="acOfflineNote" style="display:none">钱包 API 未连接（请通过 Netlify 部署访问，或运行 netlify dev）</div>`;
}

export function authAccountJs() {
  return `
function acEnabled() {
  return DATA.accountEnabled === true;
}

function acWalletUrl() {
  return DATA.walletApiUrl || '/api/wallet';
}

function acEnsureAccountState() {
  if (!state.account) {
    state.account = { coins: null, ready: false, ipLabel: '', error: null, active: false };
  }
}

function acCoinCap() {
  return Number(DATA.accountInitialCoins) || 100;
}

function acFmtCoins(n) {
  const cap = acCoinCap();
  const v = Number(n);
  const cur = Number.isFinite(v) ? Math.max(0, Math.round(v)) : '—';
  return '◈ ' + cur + ' / ' + cap;
}

function acSyncBalanceCapLabel() {
  const cap = acCoinCap();
  const capEl = document.getElementById('acBalanceCap');
  if (capEl) capEl.textContent = '账户上限 ◈' + cap;
}

function acErrorMessage(err) {
  const code = err?.message || String(err || '');
  if (code.includes('insufficient_coins')) return '虚拟币不足，无法下注';
  if (code.includes('rate_limited')) return '下注太频繁，请稍后再试（每分钟最多 ' + (DATA.accountRateLimitPerMin || 10) + ' 注）';
  if (code.includes('invalid_stake')) return '单注金额须在 1–' + acCoinCap() + ' 币之间';
  if (code.includes('invalid_parlay')) return '串关至少需要 2 关';
  if (code.includes('Failed to fetch') || code.includes('NetworkError')) return '钱包 API 连接失败，请确认已部署到 Netlify';
  return code || '操作失败';
}

async function acApi(method, body) {
  const res = await fetch(acWalletUrl(), {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || res.statusText);
  return data;
}

function acGetBalance() {
  acEnsureAccountState();
  if (!acEnabled() || !state.account.active) return null;
  return Number(state.account.coins) || 0;
}

function acSetBalance(coins) {
  acEnsureAccountState();
  state.account.coins = Number(coins) || 0;
  const el = document.getElementById('acBalance');
  if (el) el.textContent = acFmtCoins(state.account.coins);
  acSyncBalanceCapLabel();
  ltUpdateStakeLimits?.();
  ltUpdateWalletCapDisplay?.();
}

function acRenderBar() {
  acEnsureAccountState();
  const userEl = document.getElementById('acUser');
  const balanceEl = document.getElementById('acBalance');
  const offline = document.getElementById('acOfflineNote');
  acSyncBalanceCapLabel();

  if (!acEnabled()) {
    if (balanceEl) balanceEl.textContent = '◈ 离线 / ' + acCoinCap();
    if (userEl) userEl.textContent = '钱包未启用';
    if (offline) offline.style.display = '';
    return;
  }

  if (offline) offline.style.display = state.account.error ? '' : 'none';

  if (state.account.active) {
    if (userEl) userEl.textContent = 'IP 钱包 · ' + (state.account.ipLabel || '已连接');
    if (balanceEl) balanceEl.textContent = acFmtCoins(state.account.coins);
  } else if (state.account.error) {
    if (userEl) userEl.textContent = '钱包连接失败';
    if (balanceEl) balanceEl.textContent = '◈ — / ' + acCoinCap();
  } else {
    if (userEl) userEl.textContent = '正在连接 IP 钱包…';
    if (balanceEl) balanceEl.textContent = '◈ … / ' + acCoinCap();
  }
}

function acRowToTicket(row) {
  const ticket = {
    id: row.id,
    createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
    type: row.ticket_type,
    picks: row.picks || {},
    label: row.label || '',
    desc: row.description || '',
    stake: row.stake,
    odds: Number(row.odds) || 1.01,
    status: row.status || 'open',
  };
  if (row.ticket_type === 'Z_parlay' && row.legs) ticket.legs = row.legs;
  return ticket;
}

function acApplyWalletPayload(data) {
  acEnsureAccountState();
  state.account.active = true;
  state.account.error = null;
  state.account.ipLabel = data.ipLabel || '';
  acSetBalance(data.coins);
  ltEnsureState();
  const rows = data.tickets || [];
  state.lottery.tickets = rows.map(acRowToTicket);
  const maxId = rows.reduce((m, r) => Math.max(m, Number(r.id) || 0), 0);
  state.lottery.nextId = maxId + 1;
  const prefs = data.prefs || {};
  if (prefs.activeCategory) state.lottery.activeCategory = prefs.activeCategory;
  if (prefs.betMode) state.lottery.betMode = prefs.betMode;
  if (prefs.defaultStake) state.lottery.defaultStake = prefs.defaultStake;
  const stakeEl = document.getElementById('ltStake');
  if (stakeEl && prefs.defaultStake) stakeEl.value = String(prefs.defaultStake);
  ltRenderSlip?.();
  ltRenderJackpot?.();
  ltUpdateBetModeUi?.();
}

async function acLoadLotteryFromServer() {
  if (!acEnabled()) return;
  const data = await acApi('GET');
  acApplyWalletPayload(data);
  acRenderBar();
}

async function acSavePrefs() {
  if (!acEnabled() || !state.account.active) return;
  ltEnsureState();
  await acApi('POST', {
    action: 'prefs',
    prefs: {
      activeCategory: state.lottery.activeCategory,
      betMode: state.lottery.betMode,
      defaultStake: state.lottery.defaultStake,
    },
  });
}

let acPrefsTimer = null;
function acScheduleSavePrefs() {
  if (!acEnabled() || !state.account.active) return;
  clearTimeout(acPrefsTimer);
  acPrefsTimer = setTimeout(() => { acSavePrefs().catch(() => {}); }, 600);
}

async function acSyncSession() {
  acEnsureAccountState();
  if (!acEnabled()) {
    state.account.ready = true;
    acRenderBar();
    return;
  }
  try {
    await acLoadLotteryFromServer();
  } catch (err) {
    state.account.active = false;
    state.account.error = err;
    ltEnsureState();
    state.lottery.tickets = [];
  }
  state.account.ready = true;
  acRenderBar();
}

async function acRequireAuth() {
  if (!acEnabled()) return true;
  acEnsureAccountState();
  if (!state.account.ready) await acSyncSession();
  if (!state.account.active) {
    alert(acErrorMessage(state.account.error || new Error('wallet_unavailable')));
    return false;
  }
  return true;
}

function acApplyBetResponse(data) {
  if (data.coins != null) acSetBalance(data.coins);
  if (!data.ticket) return;
  ltEnsureState();
  const ticket = acRowToTicket(data.ticket);
  state.lottery.tickets.unshift(ticket);
  state.lottery.nextId = Math.max(state.lottery.nextId || 1, (Number(ticket.id) || 0) + 1);
  ltRenderSlip?.();
  ltRenderJackpot?.();
}

async function acPlaceBet(ticket) {
  const data = await acApi('POST', {
    action: 'bet',
    stake: ticket.stake,
    type: ticket.type,
    picks: ticket.picks || {},
    label: ticket.label || '',
    desc: ticket.desc || '',
    odds: ticket.odds,
  });
  acApplyBetResponse(data);
  return data;
}

async function acPlaceParlay(ticket) {
  const data = await acApi('POST', {
    action: 'parlay',
    stake: ticket.stake,
    legs: ticket.legs || [],
    label: ticket.label || '',
    desc: ticket.desc || '',
    odds: ticket.odds,
  });
  acApplyBetResponse(data);
  return data;
}

function acInit() {
  acEnsureAccountState();
  acRenderBar();
  document.getElementById('acRefreshBtn')?.addEventListener('click', () => {
    acSyncSession().catch((e) => alert(acErrorMessage(e)));
  });
  acSyncSession().catch(() => {
    state.account.ready = true;
    acRenderBar();
  });
}
`;
}