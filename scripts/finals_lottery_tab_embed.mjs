export function lotteryTabCss() {
  return `
  .lt-panel {
    background: rgba(18, 12, 20, 0.96); border: 1px solid rgba(244, 63, 94, 0.28); border-radius: 18px; padding: 18px;
  }
  .lt-banner {
    padding: 14px 16px; border-radius: 14px; margin-bottom: 16px;
    background: linear-gradient(90deg, rgba(127, 29, 29, 0.35), rgba(190, 24, 93, 0.18), rgba(124, 45, 18, 0.22));
    border: 1px solid rgba(251, 113, 133, 0.4); font-size: 13px; color: #fecdd3; line-height: 1.55;
  }
  .lt-banner strong { color: #fff1f2; }
  .lt-cat-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
  .lt-cat-tab {
    border: 1px solid #4c0519; background: rgba(30, 15, 25, 0.92); color: #fda4af; padding: 8px 14px;
    border-radius: 10px; font-size: 12px; font-weight: 800; cursor: pointer;
  }
  .lt-cat-tab.active { background: linear-gradient(135deg, #be123c, #9f1239); color: #fff1f2; border-color: #fb7185; }
  .lt-layout { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 14px; }
  @media (max-width: 1100px) { .lt-layout { grid-template-columns: 1fr; } }
  .lt-card {
    background: rgba(0,0,0,0.28); border: 1px solid rgba(244, 63, 94, 0.16); border-radius: 14px; padding: 14px; margin-bottom: 10px;
  }
  .lt-card h4 { margin: 0 0 8px; font-size: 13px; color: #fecdd3; }
  .lt-card p { margin: 0 0 10px; font-size: 11px; color: #9f8f95; line-height: 1.45; }
  .lt-form { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
  .lt-form select, .lt-form input[type=number], .lt-form input[type=search] {
    border: 1px solid #4c0519; background: #1a0a12; color: #ffe4e6; border-radius: 8px; padding: 6px 10px; font-size: 12px;
  }
  .lt-btn {
    border: 1px solid #881337; background: rgba(62, 10, 31, 0.9); color: #fecdd3; padding: 7px 12px;
    border-radius: 9px; font-size: 12px; font-weight: 700; cursor: pointer;
  }
  .lt-btn.primary { background: linear-gradient(135deg, #be123c, #e11d48); border-color: #fb7185; color: #fff1f2; }
  .lt-slip { min-height: 280px; }
  .lt-slip h3 { margin: 0 0 10px; font-size: 14px; color: #fda4af; }
  .lt-ticket {
    border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 10px 12px; margin-bottom: 8px; font-size: 12px;
    background: rgba(0,0,0,0.22);
  }
  .lt-ticket .k { font-weight: 800; color: #ffe4e6; }
  .lt-ticket .meta { font-size: 11px; color: #a8a29e; margin-top: 4px; line-height: 1.4; }
  .lt-empty { font-size: 12px; color: #78716c; padding: 20px 0; text-align: center; }
  .lt-toolbar { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; align-items: center; }
  .lt-stake-wrap { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #fda4af; margin-left: auto; }
  .lt-stake-wrap input { width: 72px; }
  .lt-odds {
    display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 8px;
    background: rgba(190, 24, 93, 0.22); border: 1px solid rgba(251, 113, 133, 0.45);
    font-size: 13px; font-weight: 900; color: #fff1f2; font-variant-numeric: tabular-nums;
  }
  .lt-odds .tag { font-size: 10px; font-weight: 700; color: #fda4af; }
  .lt-odds.muted { opacity: 0.55; border-style: dashed; }
  .lt-odds-hint {
    display: block; width: 100%; margin-top: 6px; font-size: 10px; line-height: 1.45;
    color: #a8a29e; font-weight: 600;
  }
  .lt-odds-hint.warn { color: #fbbf24; }
  .lt-payout { font-size: 11px; color: #fcd34d; margin-top: 4px; }
  .lt-mode-tabs { display: flex; gap: 6px; margin-right: 8px; }
  .lt-mode-tab {
    border: 1px solid #4c0519; background: rgba(30, 15, 25, 0.92); color: #fda4af; padding: 6px 10px;
    border-radius: 8px; font-size: 11px; font-weight: 800; cursor: pointer;
  }
  .lt-mode-tab.active { background: rgba(190, 24, 93, 0.35); border-color: #fb7185; color: #fff1f2; }
  .lt-parlay {
    margin-bottom: 12px; padding: 12px; border-radius: 12px;
    border: 1px solid rgba(251, 113, 133, 0.35); background: rgba(0,0,0,0.24);
  }
  .lt-parlay h4 { margin: 0 0 8px; font-size: 12px; color: #fda4af; }
  .lt-parlay-leg {
    display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 7px 8px; margin-bottom: 6px;
    border-radius: 8px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #e7e5e4;
  }
  .lt-parlay-leg .n {
    display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 999px;
    background: rgba(190, 24, 93, 0.45); color: #fff1f2; font-size: 10px; font-weight: 900;
  }
  .lt-parlay-rm { padding: 4px 8px !important; font-size: 10px !important; margin-left: auto; }
  .lt-parlay-actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 8px; }
  .lt-parlay-summary { font-size: 11px; color: #d6d3d1; margin: 8px 0; line-height: 1.5; }
  .lt-ticket.parlay { border-color: rgba(251, 113, 133, 0.28); }
  .lt-jackpot {
    margin-top: 14px; padding: 22px 18px 20px; border-radius: 16px; text-align: center;
    background: linear-gradient(160deg, rgba(120, 53, 15, 0.55), rgba(190, 24, 93, 0.42), rgba(6, 78, 59, 0.35));
    border: 2px solid rgba(251, 191, 36, 0.55);
    box-shadow: 0 0 28px rgba(251, 191, 36, 0.18), inset 0 0 24px rgba(255, 255, 255, 0.04);
  }
  .lt-jackpot-label { font-size: 13px; font-weight: 800; color: #fde68a; letter-spacing: 0.06em; }
  .lt-jackpot-amount {
    margin: 10px 0 6px; font-size: 42px; font-weight: 900; line-height: 1.05; color: #fffbeb;
    text-shadow: 0 0 18px rgba(251, 191, 36, 0.55), 0 2px 0 rgba(127, 29, 29, 0.45);
    font-variant-numeric: tabular-nums;
  }
  .lt-jackpot-sub { font-size: 11px; color: #fecdd3; line-height: 1.5; opacity: 0.92; }
  .lt-jackpot-glow { color: #fbbf24; }
  .lt-confirm-bar {
    margin-bottom: 12px; padding: 12px 14px; border-radius: 12px;
    border: 1px solid rgba(251, 191, 36, 0.45); background: rgba(120, 53, 15, 0.28);
    font-size: 12px; color: #fde68a; line-height: 1.5;
  }
  .lt-confirm-bar .lt-confirm-title { font-weight: 800; color: #fffbeb; margin-bottom: 6px; }
  .lt-confirm-bar .lt-confirm-meta { font-size: 11px; color: #fcd34d; margin-bottom: 10px; }
  .lt-confirm-actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
  .lt-confirm-actions .lt-btn.danger {
    border-color: #7f1d1d; background: rgba(69, 10, 10, 0.85); color: #fecaca;
  }
  `;
}

export function lotteryTabHtml() {
  return `<section class="main-view" id="view-lottery">
      <div class="lt-panel">
        <div class="lt-banner">
          <strong>福利彩票 · 庄家模拟盘</strong> · 赔率由左侧<strong>组内胜率</strong>等模型推导并含约 <strong>6% 水位</strong>，随滑块实时变动；<strong>下注时锁定赔率</strong>。<strong>累积串关</strong>多关相乘。每个 IP 钱包 <strong id="ltCoinCapNote">◈100 / 100</strong> 虚拟币额度，下注扣币、注单云端保存。非官方、非真钱。
        </div>
        <div class="lt-cat-tabs" id="ltCatTabs">
          <button type="button" class="lt-cat-tab active" data-lt-cat="A">A · 冠军盘</button>
          <button type="button" class="lt-cat-tab" data-lt-cat="B">B · 名次盘</button>
          <button type="button" class="lt-cat-tab" data-lt-cat="D">D · 半场盘</button>
          <button type="button" class="lt-cat-tab" data-lt-cat="H">H · 特码盘</button>
        </div>
        <div class="lt-layout">
          <div id="ltMarkets"></div>
          <div class="lt-slip">
            <h3>我的彩票</h3>
            <div class="lt-toolbar">
              <div class="lt-mode-tabs">
                <button type="button" class="lt-mode-tab active" id="ltModeSingle">单关</button>
                <button type="button" class="lt-mode-tab" id="ltModeCumulative">累积串关</button>
              </div>
              <button type="button" class="lt-btn" id="ltClearSlip">刷新注单</button>
              <button type="button" class="lt-btn primary" id="ltRefreshDraw">刷新</button>
              <label class="lt-stake-wrap">单注金额 <input type="number" id="ltStake" min="1" max="100" value="10" step="1" /> 币 <span id="ltWalletCap" class="lt-wallet-cap" style="font-size:10px;color:#9f8f95">余额 ◈— / 100</span></label>
            </div>
            <div id="ltPendingConfirm" class="lt-confirm-bar" style="display:none">
              <div class="lt-confirm-title">待确认注单</div>
              <div class="lt-confirm-meta" id="ltPendingMeta"></div>
              <div class="lt-confirm-actions">
                <button type="button" class="lt-btn primary" id="ltPendingConfirmBtn">确认下注</button>
                <button type="button" class="lt-btn danger" id="ltPendingCancelBtn">取消</button>
              </div>
            </div>
            <div id="ltParlay" class="lt-parlay" style="display:none">
              <h4>串关草稿 · 至少 2 关</h4>
              <div id="ltParlayLegs"></div>
              <div class="lt-parlay-summary" id="ltParlaySummary"></div>
              <div class="lt-parlay-actions">
                <button type="button" class="lt-btn primary" id="ltConfirmParlay">确认串关</button>
                <button type="button" class="lt-btn" id="ltClearParlay">清空草稿</button>
              </div>
            </div>
            <div id="ltSlip"></div>
            <div class="lt-jackpot" id="ltJackpot">
              <div class="lt-jackpot-label">若全部命中 · 你将赢得</div>
              <div class="lt-jackpot-amount" id="ltJackpotAmount">◈ 0.00</div>
              <div class="lt-jackpot-sub" id="ltJackpotSub">还没有注单</div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

export function lotteryTabJs() {
  return `
const LT_VIG = 0.06;
const LT_ODDS_MAX = 5000;
const LT_COIN_SYM = '◈';
const LT_COIN_UNIT = '币';

function ltFmtCoin(amount) {
  return LT_COIN_SYM + ' ' + (Number(amount) || 0).toFixed(2);
}

function ltEnsureState() {
  if (!state.lottery) {
    state.lottery = {
      activeCategory: 'A', tickets: [], nextId: 1, defaultStake: 10, betMode: 'single',
      parlayLegs: [], pendingBet: null, placingBet: false,
    };
  }
  if (!state.lottery.parlayLegs) state.lottery.parlayLegs = [];
  if (!state.lottery.betMode) state.lottery.betMode = 'single';
  if (!state.lottery.topNCache) state.lottery.topNCache = null;
  if (!state.lottery.fullRankCache) state.lottery.fullRankCache = null;
  if (!('pendingBet' in state.lottery)) state.lottery.pendingBet = null;
  if (!('placingBet' in state.lottery)) state.lottery.placingBet = false;
}

function ltIsCumulative() {
  ltEnsureState();
  return state.lottery.betMode === 'cumulative';
}

function ltParlayOdds(legs) {
  const raw = (legs || []).reduce((prod, leg) => prod * (Number(leg.odds) || 1.01), 1);
  return Math.min(LT_ODDS_MAX, Math.max(1.01, Math.round(raw * 100) / 100));
}

function ltBuildLeg(ticket) {
  return {
    type: ticket.type,
    picks: ticket.picks || {},
    label: ticket.label || '',
    desc: ticket.desc || '',
    odds: ltQuoteTicket(ticket.type, ticket.picks),
  };
}

function ltCoinCap() {
  return Number(DATA.accountInitialCoins) || 100;
}

function ltUpdateWalletCapDisplay() {
  const cap = ltCoinCap();
  const note = document.getElementById('ltCoinCapNote');
  if (note) note.textContent = '◈' + cap + ' / ' + cap;
  const wallet = document.getElementById('ltWalletCap');
  if (!wallet) return;
  if (typeof acGetBalance === 'function' && typeof acEnabled === 'function' && acEnabled() && state.account?.active) {
    const bal = acGetBalance();
    wallet.textContent = '余额 ◈' + (Number.isFinite(bal) ? Math.round(bal) : '—') + ' / ' + cap;
  } else {
    wallet.textContent = '余额 ◈— / ' + cap;
  }
}

function ltMaxStake() {
  const cap = Number(DATA.accountMaxStake) || ltCoinCap();
  if (typeof acEnabled === 'function' && acEnabled() && typeof acGetBalance === 'function' && state.account?.active) {
    return Math.max(1, Math.min(cap, acGetBalance() || 0));
  }
  return cap;
}

function ltUpdateStakeLimits() {
  const stakeEl = document.getElementById('ltStake');
  if (!stakeEl) return;
  const max = ltMaxStake();
  stakeEl.max = String(Math.max(1, max));
  const cur = Number(stakeEl.value) || 10;
  if (cur > max) stakeEl.value = String(Math.max(1, max));
  ltUpdateWalletCapDisplay();
}

function ltStake() {
  ltEnsureState();
  const v = Number(document.getElementById('ltStake')?.value ?? state.lottery.defaultStake ?? 10);
  let stake = Number.isFinite(v) && v > 0 ? Math.round(v) : 10;
  const max = ltMaxStake();
  stake = Math.min(stake, max);
  state.lottery.defaultStake = stake;
  const stakeEl = document.getElementById('ltStake');
  if (stakeEl && Number(stakeEl.value) !== stake) stakeEl.value = String(stake);
  return stake;
}

function ltFmtOdds(odds) {
  const o = Number(odds) || 1.01;
  return o >= 100 ? o.toFixed(0) : o >= 10 ? o.toFixed(1) : o.toFixed(2);
}

function ltFmtPct(prob) {
  const p = Math.max(0, Math.min(0.995, Number(prob) || 0));
  if (p >= 0.1) return (p * 100).toFixed(1) + '%';
  if (p >= 0.01) return (p * 100).toFixed(2) + '%';
  return (p * 100).toFixed(3) + '%';
}

function ltEntryOptionLabel(prob, row) {
  const label = (typeof entryLabel === 'function')
    ? entryLabel(row.entry.code, row.entry.title)
    : (row.entry.code + ' · ' + escapeHtml(row.entry.title || ''));
  return ltFmtPct(prob) + ' · ' + label;
}

function ltDisplayText(text) {
  return (typeof maskLeakText === 'function') ? maskLeakText(text) : String(text ?? '');
}

function ltBookOdds(prob) {
  const p = Math.max(0.0005, Math.min(0.995, Number(prob) || 0.001));
  const raw = (1 - LT_VIG) / p;
  return Math.min(LT_ODDS_MAX, Math.max(1.01, Math.round(raw * 100) / 100));
}

function ltParlayBookOdds(legOdds) {
  return ltParlayOdds((legOdds || []).map((odds) => ({ odds })));
}

function ltQuoteDoubleChampion(zh, yf) {
  return ltParlayBookOdds([
    ltBookOdds(ltProbChampion('中文组', zh)),
    ltBookOdds(ltProbChampion('外文组', yf)),
  ]);
}

function ltOddsHtml(odds, muted) {
  return '<span class="lt-odds' + (muted ? ' muted' : '') + '"><span class="tag">赔率</span>@' + ltFmtOdds(odds) + '</span>';
}

function ltTicketProfit(ticket) {
  const stake = ticket.stake || 10;
  const odds = ticket.odds || 1.01;
  return Math.round(stake * (odds - 1) * 100) / 100;
}

function ltPayoutHtml(stake, odds) {
  const profit = Math.round(stake * (odds - 1) * 100) / 100;
  const total = Math.round(stake * odds * 100) / 100;
  return '<div class="lt-payout">注 ' + stake + ' ' + LT_COIN_UNIT + ' @' + ltFmtOdds(odds)
    + ' · 可赢 <strong>' + ltFmtCoin(profit) + '</strong>（返还 ' + ltFmtCoin(total) + '）</div>';
}

function ltJackpotTotals() {
  ltEnsureState();
  const tickets = state.lottery.tickets || [];
  let totalProfit = 0;
  let totalStake = 0;
  let count = tickets.length;
  for (const ticket of tickets) {
    const stake = ticket.stake || 10;
    totalStake += stake;
    totalProfit += stake * ((ticket.odds || 1.01) - 1);
  }
  const legs = state.lottery.parlayLegs || [];
  if (ltIsCumulative() && legs.length >= 2) {
    const stake = ltStake();
    const odds = ltParlayOdds(legs);
    totalStake += stake;
    totalProfit += stake * (odds - 1);
    count += 1;
  }
  return {
    count,
    totalStake: Math.round(totalStake * 100) / 100,
    totalProfit: Math.round(totalProfit * 100) / 100,
    totalReturn: Math.round((totalStake + totalProfit) * 100) / 100,
    draftParlay: ltIsCumulative() && legs.length >= 2,
  };
}

function ltRenderJackpot() {
  const amountEl = document.getElementById('ltJackpotAmount');
  const subEl = document.getElementById('ltJackpotSub');
  if (!amountEl || !subEl) return;
  const t = ltJackpotTotals();
  amountEl.textContent = ltFmtCoin(t.totalProfit);
  if (!t.count) {
    subEl.innerHTML = '还没有注单 · <span class="lt-jackpot-glow">下注越多，梦想越大</span>';
    return;
  }
  const parts = ['共 <strong>' + t.count + '</strong> 张票', '总投注 <strong>' + ltFmtCoin(t.totalStake) + '</strong>', '返还可达 <strong>' + ltFmtCoin(t.totalReturn) + '</strong>'];
  if (t.draftParlay) parts.push('含串关草稿 1 张');
  subEl.innerHTML = parts.join(' · ');
}

function ltGroupAvgStep(rows) {
  const top = rows.slice(0, Math.min(10, rows.length));
  if (top.length < 2) return 2;
  let sum = 0;
  for (let i = 0; i < top.length - 1; i++) {
    sum += (top[i].prediction_score || 0) - (top[i + 1].prediction_score || 0);
  }
  return Math.max(0.35, sum / (top.length - 1));
}

function ltGroupContext(group) {
  const rows = ltRanked(group);
  const avgStep = ltGroupAvgStep(rows);
  return {
    rows,
    avgStep,
    tightBoost: Math.min(2.8, 2.45 / avgStep),
    sizeBoost: 1 + Math.max(0, rows.length - 25) / 70 * 0.4,
  };
}

function ltPlWeights(rows) {
  const scores = rows.map((row) => Number(row.prediction_score) || 0);
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  const temp = Math.max(2, (max - min) / 4);
  const weights = scores.map((score) => Math.exp((score - max) / temp));
  const sum = weights.reduce((a, b) => a + b, 0) || 1;
  return { weights, sum, rows, temp };
}

function ltSoftmaxWeights(rows) {
  const scores = rows.map((row) => Number(row.prediction_score) || 0);
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  const avgStep = ltGroupAvgStep(rows);
  const temp = Math.max(1.1, Math.max((max - min) / 4, avgStep * 2.2));
  const weights = scores.map((score) => Math.exp((score - max) / temp));
  const sum = weights.reduce((a, b) => a + b, 0) || 1;
  return { weights, sum, rows, temp };
}

function ltProbChampion(group, code) {
  const row = ltRanked(group).find((r) => r.entry.code === code);
  return row ? Math.max(0.0005, (row.advanceProb ?? 0) / 100) : 0.001;
}

function ltProbTop2OrderAnalytic(group, first, second) {
  const rows = ltRanked(group);
  const { weights, sum } = ltPlWeights(rows);
  const i = rows.findIndex((r) => r.entry.code === first);
  const j = rows.findIndex((r) => r.entry.code === second);
  if (i < 0 || j < 0 || i === j) return 0.001;
  const pFirst = weights[i] / sum;
  const sum2 = sum - weights[i];
  const pSecond = weights[j] / sum2;
  return Math.max(0.0005, pFirst * pSecond);
}

function ltProbTop2Order(group, first, second) {
  if (!first || !second || first === second) return 0.001;
  return ltProbTop2OrderAnalytic(group, first, second);
}

function ltProbTop2Any(group, a, b) {
  if (!a || !b || a === b) return 0.001;
  const p = ltProbTop2OrderAnalytic(group, a, b) + ltProbTop2OrderAnalytic(group, b, a);
  return Math.min(0.99, Math.max(0.0005, p));
}

function ltEntryRankMaps(group) {
  const rows = ltRanked(group);
  const bySupport = rows.slice().sort((a, b) => b.supportScore - a.supportScore || a.entry.code.localeCompare(b.entry.code, 'en'));
  const byConv = rows.slice().sort((a, b) => b.conversionScore - a.conversionScore || a.entry.code.localeCompare(b.entry.code, 'en'));
  return {
    blend: new Map(rows.map((r) => [r.entry.code, r.rank])),
    support: new Map(bySupport.map((r, i) => [r.entry.code, i + 1])),
    conversion: new Map(byConv.map((r, i) => [r.entry.code, i + 1])),
  };
}

function ltTop2ContextLine(group, first, second, prob) {
  const maps = ltEntryRankMaps(group);
  const br1 = maps.blend.get(first), br2 = maps.blend.get(second);
  const sr1 = maps.support.get(first), sr2 = maps.support.get(second);
  const cr1 = maps.conversion.get(first), cr2 = maps.conversion.get(second);
  const pct = ((Number(prob) || 0) * 100).toFixed(2);
  let line = '综合 #' + br1 + '→#' + br2 + ' · 支持 #' + sr1 + '→#' + sr2 + ' · 转化 #' + cr1 + '→#' + cr2 + ' · 约 ' + pct + '%';
  if (br2 > 2 || br1 > 1) line += '（逆综合榜名次，赔率偏高）';
  return line;
}

function ltSetTop2Hint(id, html, warn) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!html) {
    el.textContent = '';
    el.className = 'lt-odds-hint';
    return;
  }
  el.className = 'lt-odds-hint' + (warn ? ' warn' : '');
  el.textContent = html;
}

function ltSeededRng(seedStr) {
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6D2B79F5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ltPlackettDrawTop(weights, n, rng) {
  const rem = weights.map((w, i) => ({ w: Math.max(1e-9, w), i }));
  let total = rem.reduce((s, r) => s + r.w, 0);
  const picked = [];
  for (let k = 0; k < n && rem.length; k++) {
    const r = rng() * total;
    let acc = 0;
    for (let j = 0; j < rem.length; j++) {
      acc += rem[j].w;
      if (acc >= r) {
        picked.push(rem[j].i);
        total -= rem[j].w;
        rem.splice(j, 1);
        break;
      }
    }
  }
  return picked;
}

function ltTopNScoreKey(rows) {
  return rows.map((r) => r.entry.code + ':' + (Number(r.prediction_score) || 0).toFixed(3)).join('|');
}

function ltFullRankCache(group) {
  ltEnsureState();
  const { rows } = ltGroupContext(group);
  const cacheKey = group + '#full#' + ltTopNScoreKey(rows);
  if (state.lottery.fullRankCache?.key === cacheKey) return state.lottery.fullRankCache;

  const { weights } = ltSoftmaxWeights(rows);
  const n = rows.length;
  const samples = n > 35 ? 6000 : 8000;
  const rng = ltSeededRng(cacheKey);
  const rankCounts = new Map(rows.map((r) => [r.entry.code, new Array(n).fill(0)]));
  const top2OrderCounts = new Map();

  for (let s = 0; s < samples; s++) {
    const order = ltPlackettDrawTop(weights, n, rng);
    for (let k = 0; k < order.length; k++) {
      const code = rows[order[k]]?.entry?.code;
      if (code) rankCounts.get(code)[k]++;
    }
    if (order.length >= 2) {
      const first = rows[order[0]]?.entry?.code;
      const second = rows[order[1]]?.entry?.code;
      if (first && second) {
        const key = first + '|' + second;
        top2OrderCounts.set(key, (top2OrderCounts.get(key) || 0) + 1);
      }
    }
  }

  const cache = { key: cacheKey, rankCounts, top2OrderCounts, samples, n };
  state.lottery.fullRankCache = cache;
  return cache;
}

function ltTopNProbMap(group, n) {
  ltEnsureState();
  const { rows } = ltGroupContext(group);
  const cacheKey = group + '#' + n + '#' + ltTopNScoreKey(rows);
  if (state.lottery.topNCache?.key === cacheKey) return state.lottery.topNCache.map;

  const { weights } = ltSoftmaxWeights(rows);
  const hits = new Map(rows.map((r) => [r.entry.code, 0]));
  const samples = rows.length > 35 ? 6000 : 8000;
  const rng = ltSeededRng(cacheKey);
  for (let s = 0; s < samples; s++) {
    for (const idx of ltPlackettDrawTop(weights, n, rng)) {
      const code = rows[idx]?.entry?.code;
      if (code) hits.set(code, (hits.get(code) || 0) + 1);
    }
  }
  const map = new Map();
  for (const [code, count] of hits) map.set(code, Math.max(0.0005, count / samples));
  state.lottery.topNCache = { key: cacheKey, map };
  return map;
}

function ltLocalTau(rows, centerIdx) {
  const steps = [];
  for (let j = Math.max(0, centerIdx - 3); j < Math.min(rows.length - 1, centerIdx + 4); j++) {
    steps.push(Math.max(0.2, (rows[j].prediction_score || 0) - (rows[j + 1].prediction_score || 0)));
  }
  return Math.max(0.45, steps.reduce((a, b) => a + b, 0) / steps.length);
}

function ltProbTopN(group, code, n) {
  const pPL = ltTopNProbMap(group, n).get(code) ?? 0.001;
  const { rows } = ltGroupContext(group);
  const row = rows.find((r) => r.entry.code === code);
  if (!row) return 0.001;

  const cutIdx = Math.min(n - 1, rows.length - 1);
  const gap = (row.prediction_score || 0) - (rows[cutIdx]?.prediction_score || 0);
  const gapSteps = gap / ltLocalTau(rows, cutIdx);
  const pMargin = 1 / (1 + Math.exp(-gapSteps));
  const marginBlend = Math.min(0.92, Math.max(0.22, 0.22 + gapSteps * 0.11));

  return Math.max(0.003, Math.min(0.985, pMargin * marginBlend + pPL * (1 - marginBlend)));
}

function ltProbExactRank(group, code, targetRank) {
  const { rows } = ltGroupContext(group);
  const rank = Number(targetRank);
  if (!rows.find((r) => r.entry.code === code) || rank < 1 || rank > rows.length) return 0.001;
  const { rankCounts, samples } = ltFullRankCache(group);
  return Math.max(0.0005, (rankCounts.get(code)?.[rank - 1] || 0) / samples);
}

function ltProbRankBand(group, code, lo, hi) {
  const { rows } = ltGroupContext(group);
  const a = Math.max(1, Math.min(lo, hi));
  const b = Math.min(rows.length, Math.max(lo, hi));
  if (a === 1 && [3, 5, 10].includes(b)) return ltProbTopN(group, code, b);
  const { rankCounts, samples } = ltFullRankCache(group);
  const counts = rankCounts.get(code);
  if (!counts) return 0.001;
  let hits = 0;
  for (let k = a; k <= b; k++) hits += counts[k - 1] || 0;
  return Math.min(0.99, Math.max(0.0005, hits / samples));
}

function ltProbLast(group, code) {
  const { rows } = ltGroupContext(group);
  if (!rows.find((r) => r.entry.code === code)) return 0.001;
  const { rankCounts, samples, n } = ltFullRankCache(group);
  return Math.max(0.0005, (rankCounts.get(code)?.[n - 1] || 0) / samples);
}

function ltProbChampionHalf(group, half) {
  return ltRanked(group)
    .filter((r) => r.entry.half === half)
    .reduce((s, r) => s + (r.advanceProb ?? 0) / 100, 0);
}

function ltTop10HalfLine(group) {
  const rows = ltRanked(group);
  const fhTotal = rows.filter((r) => r.entry.half === '上半场').length;
  const total = rows.length || 1;
  return Math.max(1, Math.round((10 * fhTotal) / total));
}

function ltProbTop10HalfOver(group, side) {
  const { rows, avgStep, sizeBoost } = ltGroupContext(group);
  const line = ltTop10HalfLine(group);
  const top = rows.slice(0, 10);
  const fh = top.filter((r) => r.entry.half === '上半场').length;
  const bubble = rows.slice(Math.max(0, line - 3), Math.min(rows.length, line + 8));
  const fhNearLine = bubble.filter((r) => r.entry.half === '上半场').length;
  const margin = fh - line;
  let pOver = 0.5 + margin * 0.14 + (fhNearLine - bubble.length / 2) * 0.04;
  const volatility = Math.min(0.28, 0.1 / avgStep);
  pOver = pOver * (1 - volatility) + 0.5 * volatility;
  if (rows.length <= 30) pOver = pOver * 0.9 + 0.05;
  pOver = Math.max(0.07, Math.min(0.93, pOver * (1 + (sizeBoost - 1) * 0.15)));
  return side === 'over' ? pOver : 1 - pOver;
}

function ltProbHalfPeak(group, half) {
  const { rows, avgStep } = ltGroupContext(group);
  const fhBest = rows.filter((r) => r.entry.half === '上半场').sort((a, b) => a.rank - b.rank)[0];
  const shBest = rows.filter((r) => r.entry.half === '下半场').sort((a, b) => a.rank - b.rank)[0];
  const diff = (fhBest?.prediction_score ?? -999) - (shBest?.prediction_score ?? -999);
  const scale = Math.max(1.2, avgStep * 1.6);
  const pFh = 1 / (1 + Math.exp(-diff / scale));
  return half === '上半场' ? pFh : 1 - pFh;
}

function ltProbAvgRankHalf(group, half) {
  const { rows, avgStep, sizeBoost } = ltGroupContext(group);
  const avg = (list) => list.length ? list.reduce((s, r) => s + r.rank, 0) / list.length : 999;
  const fh = rows.filter((r) => r.entry.half === '上半场');
  const sh = rows.filter((r) => r.entry.half === '下半场');
  const diff = avg(sh) - avg(fh);
  const scale = Math.max(0.9, 2.4 / sizeBoost / (avgStep / 2));
  const pFh = 1 / (1 + Math.exp(-diff / scale));
  return half === '上半场' ? pFh : 1 - pFh;
}

function ltSnapRows(snap, group) {
  return group === '外文组' ? snap.rankedYf : snap.rankedZh;
}

function ltProbDarkHorse(group, code) {
  const row = ltRanked(group).find((r) => r.entry.code === code);
  if (!row || (row.advanceProb ?? 100) >= 1) return 0.001;
  return ltProbTopN(group, code, 10);
}

function ltBaselineRank(group, code) {
  return DATA.baselineRanks?.[group]?.[code] ?? null;
}

function ltIsPredictedTop5(group, code) {
  const baselineRank = ltBaselineRank(group, code);
  return baselineRank != null && baselineRank <= 5;
}

function ltProbUpsetVictim(group, code) {
  const { rows, avgStep, tightBoost, sizeBoost } = ltGroupContext(group);
  const row = rows.find((r) => r.entry.code === code);
  const baselineRank = ltBaselineRank(group, code);
  if (!row || baselineRank == null || baselineRank > 5) return 0.001;

  const rank = row.rank;
  const top = rows.slice(0, Math.min(10, rows.length));
  const tenth = top[top.length - 1];
  const scoreGap = (row.prediction_score || 0) - (tenth?.prediction_score || 0);
  const delta = row.deltaBaseline ?? (baselineRank - rank);
  const gapInSteps = scoreGap / avgStep;

  if (rank > 10) {
    const dropBeyond = rank - 10;
    const base = 0.16 + dropBeyond * 0.04 + (6 - baselineRank) * 0.024;
    return Math.min(0.94, base * tightBoost * sizeBoost);
  }

  const rankPressure = 1 / (1 + Math.exp(-(rank - 8.4) / 1.15));
  const baselinePressure = 0.36 + (baselineRank - 1) * 0.12;
  const cushionVuln = 1 / (1 + Math.exp(gapInSteps - 0.9));
  const slideVuln = delta < 0
    ? Math.min(1, 0.4 + Math.abs(delta) * 0.11)
    : Math.max(0.1, 0.5 - delta * 0.055);

  const prob = rankPressure * baselinePressure * (0.12 + cushionVuln * 0.78) * slideVuln * tightBoost * sizeBoost;
  const floor = (0.004 + (baselineRank - 1) * 0.0025 + Math.max(0, rank - 5) * 0.0035) * tightBoost * sizeBoost;
  return Math.max(floor, Math.min(0.88, prob));
}

function ltProbTailDigit(digit) {
  return 0.1;
}

function ltQuoteTicket(type, picks) {
  const p = picks || {};
  if (type === 'A_champion_zh') return ltBookOdds(ltProbChampion('中文组', p.code));
  if (type === 'A_champion_yf') return ltBookOdds(ltProbChampion('外文组', p.code));
  if (type === 'A_double_champion') return ltQuoteDoubleChampion(p.zh, p.yf);
  if (type === 'A_top2_order') return ltBookOdds(ltProbTop2Order(p.group || '中文组', p.first, p.second));
  if (type === 'A_top2_any') return ltBookOdds(ltProbTop2Any(p.group || '中文组', p.a, p.b));
  if (type === 'B_top3') return ltBookOdds(ltProbTopN(p.group, p.code, 3));
  if (type === 'B_top5') return ltBookOdds(ltProbTopN(p.group, p.code, 5));
  if (type === 'B_top10') return ltBookOdds(ltProbTopN(p.group, p.code, 10));
  if (type === 'B_exact_rank') return ltBookOdds(ltProbExactRank(p.group, p.code, p.rank));
  if (type === 'B_rank_band') return ltBookOdds(ltProbRankBand(p.group, p.code, p.lo, p.hi));
  if (type === 'B_last') return ltBookOdds(ltProbLast(p.group, p.code));
  if (type === 'D_champion_half') return ltBookOdds(ltProbChampionHalf(p.group, p.half));
  if (type === 'D_top10_half_count') return ltBookOdds(ltProbTop10HalfOver(p.group || '中文组', p.side));
  if (type === 'D_cross_half_peak') return ltBookOdds(ltProbHalfPeak(p.group || '中文组', p.half));
  if (type === 'D_avg_rank_half') return ltBookOdds(ltProbAvgRankHalf(p.group || '中文组', p.half));
  if (type === 'H_dark_horse') return ltBookOdds(ltProbDarkHorse(p.group, p.code));
  if (type === 'H_upset_victim' || type === 'H_biggest_upset') return ltBookOdds(ltProbUpsetVictim(p.group, p.code));
  if (type === 'H_tail_digit') return ltBookOdds(ltProbTailDigit(p.digit));
  return 1.01;
}

function ltSetLiveOdds(id, odds, muted) {
  const el = document.getElementById(id);
  if (!el) return;
  if (muted || odds == null) {
    el.className = 'lt-odds muted';
    el.innerHTML = '<span class="tag">赔率</span>@—';
    return;
  }
  el.className = 'lt-odds';
  el.innerHTML = '<span class="tag">赔率</span>@' + ltFmtOdds(odds);
}

function ltWireLiveOdds(ids, quoteFn) {
  const run = () => {
    try {
      const odds = quoteFn();
      ids.forEach((id) => ltSetLiveOdds(id, odds, odds == null));
    } catch (_) {
      ids.forEach((id) => ltSetLiveOdds(id, null, true));
    }
  };
  run();
  return run;
}

function ltRanked(group) {
  return scoreGroupRows(group);
}

function ltChampion(group) {
  return ltRanked(group)[0] || null;
}

function ltSelectShell(id, withEmpty) {
  return '<select id="' + id + '">' + (withEmpty ? '<option value="">— 选择 —</option>' : '') + '</select>';
}

function ltFillEntrySelect(selectId, group, probFn, filterFn) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const cur = sel.value;
  let rows = ltRanked(group);
  if (filterFn) rows = rows.filter((r) => filterFn(r));
  const mapped = rows.map((row) => ({ row, code: row.entry.code, prob: probFn(row) }));
  mapped.sort((a, b) => b.prob - a.prob || a.code.localeCompare(b.code, 'en'));
  sel.innerHTML = '<option value="">— 选择 —</option>' + mapped.map(({ row, code, prob }) => (
    '<option value="' + code + '">' + escapeHtml(ltEntryOptionLabel(prob, row)) + '</option>'
  )).join('');
  if (cur) sel.value = cur;
}

function ltFillChampionSelect(selectId, group) {
  ltFillEntrySelect(selectId, group, (row) => ltProbChampion(group, row.entry.code));
}

function ltFillBinarySelect(selectId, options) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = options.map((opt) => (
    '<option value="' + opt.value + '">' + escapeHtml(ltFmtPct(opt.prob) + ' · ' + ltDisplayText(opt.label)) + '</option>'
  )).join('');
  if (cur) sel.value = cur;
}

function ltClearPendingBet() {
  ltEnsureState();
  state.lottery.pendingBet = null;
  ltRenderPendingConfirm();
}

function ltRenderPendingConfirm() {
  ltEnsureState();
  const bar = document.getElementById('ltPendingConfirm');
  const meta = document.getElementById('ltPendingMeta');
  const confirmBtn = document.getElementById('ltPendingConfirmBtn');
  const pending = state.lottery.pendingBet;
  if (!bar || !meta) return;
  if (!pending || ltIsCumulative()) {
    bar.style.display = 'none';
    meta.innerHTML = '';
    if (confirmBtn) confirmBtn.disabled = false;
    return;
  }
  const stake = ltStake();
  const odds = ltQuoteTicket(pending.type, pending.picks);
  const profit = Math.round(stake * (odds - 1) * 100) / 100;
  bar.style.display = '';
  meta.innerHTML = escapeHtml(ltDisplayText(pending.label)) + ' · ' + escapeHtml(ltDisplayText(pending.desc || ''))
    + '<br>' + ltOddsHtml(odds) + ' · 注 ' + stake + ' ' + LT_COIN_UNIT + ' · 可赢 <strong>' + ltFmtCoin(profit) + '</strong>'
    + ' <span style="opacity:0.85">（确认时锁定赔率）</span>';
  if (confirmBtn) confirmBtn.disabled = !!state.lottery.placingBet;
}

function ltQueueBet(ticket) {
  ltEnsureState();
  if (ltIsCumulative()) {
    ltAddParlayLeg(ticket);
    return;
  }
  state.lottery.pendingBet = { ...ticket };
  ltRenderPendingConfirm();
}

async function ltAddParlayLeg(ticket) {
  ltEnsureState();
  if (typeof acRequireAuth === 'function' && acEnabled() && !(await acRequireAuth())) return;
  state.lottery.parlayLegs.push(ltBuildLeg(ticket));
  ltRenderParlay();
  acScheduleSavePrefs?.();
}

async function ltExecutePendingBet() {
  ltEnsureState();
  const pending = state.lottery.pendingBet;
  if (!pending || state.lottery.placingBet) return;
  state.lottery.placingBet = true;
  ltRenderPendingConfirm();
  try {
    await ltAddTicket(pending);
    ltClearPendingBet();
  } finally {
    state.lottery.placingBet = false;
    ltRenderPendingConfirm();
  }
}

async function ltAddTicket(ticket) {
  ltEnsureState();
  if (ltIsCumulative()) {
    await ltAddParlayLeg(ticket);
    return;
  }
  if (typeof acRequireAuth === 'function' && acEnabled()) {
    if (!(await acRequireAuth())) return;
    const stake = ltStake();
    if (stake < 1) throw new Error('虚拟币不足');
    const odds = ltQuoteTicket(ticket.type, ticket.picks);
    await acPlaceBet({
      type: ticket.type,
      picks: ticket.picks,
      label: ticket.label,
      desc: ticket.desc,
      stake,
      odds,
    });
    acScheduleSavePrefs?.();
    return;
  }
  ticket.id = state.lottery.nextId++;
  ticket.createdAt = Date.now();
  ticket.stake = ticket.stake ?? ltStake();
  ticket.odds = ticket.odds ?? ltQuoteTicket(ticket.type, ticket.picks);
  state.lottery.tickets.unshift(ticket);
  ltRenderSlip();
}

async function ltConfirmParlay() {
  ltEnsureState();
  const legs = state.lottery.parlayLegs || [];
  if (legs.length < 2) throw new Error('累积串关至少需要 2 关');
  const stake = ltStake();
  const odds = ltParlayOdds(legs);
  const ticket = {
    type: 'Z_parlay',
    legs: legs.map((leg) => ({ ...leg })),
    label: '累积串关 ×' + legs.length,
    desc: legs.map((leg, i) => (i + 1) + '.' + leg.desc).join(' / '),
    stake,
    odds,
  };
  if (typeof acRequireAuth === 'function' && acEnabled()) {
    if (!(await acRequireAuth())) return;
    if (stake < 1) throw new Error('虚拟币不足');
    await acPlaceParlay(ticket);
    state.lottery.parlayLegs = [];
    ltRenderParlay();
    acScheduleSavePrefs?.();
    return;
  }
  ticket.id = state.lottery.nextId++;
  ticket.createdAt = Date.now();
  state.lottery.tickets.unshift(ticket);
  state.lottery.parlayLegs = [];
  ltRenderParlay();
  ltRenderSlip();
}

function ltSettleLeg(leg) {
  return ltSettleTicket({ type: leg.type, picks: leg.picks || {} });
}

function ltSettleTicket(ticket) {
  const snap = ltDrawSnapshot();
  const t = ticket.type;
  const p = ticket.picks || {};

  if (t === 'Z_parlay') {
    const legs = ticket.legs || [];
    if (!legs.length) return { status: 'pending', note: '空串关' };
    const results = legs.map((leg) => ltSettleLeg(leg));
    const status = results.every((r) => r.status === 'win') ? 'win' : results.some((r) => r.status === 'lose') ? 'lose' : 'pending';
    const hits = results.filter((r) => r.status === 'win').length;
    const note = hits + '/' + legs.length + ' 关 · ' + (status === 'win' ? '全中派彩' : status === 'lose' ? '串关破灭' : '待开奖');
    return { status, note, legResults: results };
  }

  if (t === 'A_champion_zh') {
    const win = snap.championZh?.entry?.code === p.code;
    return { status: win ? 'win' : 'lose', note: '开奖冠军：' + (snap.championZh?.entry?.code || '—') };
  }
  if (t === 'A_champion_yf') {
    const win = snap.championYf?.entry?.code === p.code;
    return { status: win ? 'win' : 'lose', note: '开奖冠军：' + (snap.championYf?.entry?.code || '—') };
  }
  if (t === 'A_double_champion') {
    const win = snap.championZh?.entry?.code === p.zh && snap.championYf?.entry?.code === p.yf;
    return { status: win ? 'win' : 'lose', note: '中文 ' + (snap.championZh?.entry?.code || '—') + ' · 外文 ' + (snap.championYf?.entry?.code || '—') };
  }
  if (t === 'A_top2_order') {
    const group = p.group || '中文组';
    const rows = ltSnapRows(snap, group);
    const win = rows[0]?.entry?.code === p.first && rows[1]?.entry?.code === p.second;
    return { status: win ? 'win' : 'lose', note: group + ' #1 ' + (rows[0]?.entry?.code || '—') + ' #2 ' + (rows[1]?.entry?.code || '—') };
  }
  if (t === 'A_top2_any') {
    const group = p.group || '中文组';
    const rows = ltSnapRows(snap, group);
    const top2 = new Set([rows[0]?.entry?.code, rows[1]?.entry?.code].filter(Boolean));
    const win = top2.has(p.a) && top2.has(p.b) && p.a !== p.b;
    return { status: win ? 'win' : 'lose', note: group + ' 冠亚军：' + [...top2].join(' / ') };
  }

  if (t === 'B_top3' || t === 'B_top5' || t === 'B_top10') {
    const n = t === 'B_top3' ? 3 : t === 'B_top5' ? 5 : 10;
    const rows = p.group === '外文组' ? snap.rankedYf : snap.rankedZh;
    const win = rows.slice(0, n).some((r) => r.entry.code === p.code);
    return { status: win ? 'win' : 'lose', note: 'Top' + n + ' 不含则未中 · 当前 #' + (rows.find((r) => r.entry.code === p.code)?.rank ?? '—') };
  }
  if (t === 'B_exact_rank') {
    const rows = p.group === '外文组' ? snap.rankedYf : snap.rankedZh;
    const row = rows.find((r) => r.entry.code === p.code);
    const win = row && row.rank === Number(p.rank);
    return { status: win ? 'win' : 'lose', note: (p.code || '—') + ' 当前 #' + (row?.rank ?? '—') };
  }
  if (t === 'B_rank_band') {
    const rows = p.group === '外文组' ? snap.rankedYf : snap.rankedZh;
    const row = rows.find((r) => r.entry.code === p.code);
    const lo = Number(p.lo);
    const hi = Number(p.hi);
    const win = row && row.rank >= lo && row.rank <= hi;
    return { status: win ? 'win' : 'lose', note: (p.code || '—') + ' 当前 #' + (row?.rank ?? '—') + '（区间 ' + lo + '–' + hi + '）' };
  }
  if (t === 'B_last') {
    const rows = p.group === '外文组' ? snap.rankedYf : snap.rankedZh;
    const last = rows[rows.length - 1];
    const win = last?.entry?.code === p.code;
    return { status: win ? 'win' : 'lose', note: '垫底：' + (last?.entry?.code || '—') };
  }

  if (t === 'D_champion_half') {
    const champ = p.group === '外文组' ? snap.championYf : snap.championZh;
    const half = champ?.entry?.half || '';
    const win = half === p.half;
    return { status: win ? 'win' : 'lose', note: '冠军来自：' + half };
  }
  if (t === 'D_top10_half_count') {
    const group = p.group || '中文组';
    const line = ltTop10HalfLine(group);
    const rows = ltSnapRows(snap, group).slice(0, 10);
    const fh = rows.filter((r) => r.entry.half === '上半场').length;
    const win = p.side === 'over' ? fh >= line : fh < line;
    return { status: win ? 'win' : 'lose', note: group + ' Top10 上半场 ' + fh + ' 席（线 ' + line + '）' };
  }
  if (t === 'D_cross_half_peak') {
    const group = p.group || '中文组';
    const rows = ltSnapRows(snap, group);
    const fhBest = rows.filter((r) => r.entry.half === '上半场').sort((a, b) => a.rank - b.rank)[0];
    const shBest = rows.filter((r) => r.entry.half === '下半场').sort((a, b) => a.rank - b.rank)[0];
    const winner = (fhBest?.rank || 999) < (shBest?.rank || 999) ? '上半场' : '下半场';
    const win = winner === p.half;
    return { status: win ? 'win' : 'lose', note: group + ' 更高名次：' + winner + '（' + (winner === '上半场' ? fhBest?.entry?.code : shBest?.entry?.code) + ' #' + Math.min(fhBest?.rank || 999, shBest?.rank || 999) + '）' };
  }
  if (t === 'D_avg_rank_half') {
    const group = p.group || '中文组';
    const rows = ltSnapRows(snap, group);
    const avg = (list) => list.length ? list.reduce((s, r) => s + r.rank, 0) / list.length : 999;
    const fh = rows.filter((r) => r.entry.half === '上半场');
    const sh = rows.filter((r) => r.entry.half === '下半场');
    const winner = avg(fh) < avg(sh) ? '上半场' : '下半场';
    const win = winner === p.half;
    return { status: win ? 'win' : 'lose', note: group + ' 平均名次 上 ' + avg(fh).toFixed(1) + ' vs 下 ' + avg(sh).toFixed(1) + ' → ' + winner };
  }

  if (t === 'H_dark_horse') {
    const group = p.group || '中文组';
    const row = ltSnapRows(snap, group).find((r) => r.entry.code === p.code);
    const win = row != null && row.rank <= 10;
    return {
      status: win ? 'win' : 'lose',
      note: group + ' · ' + p.code + ' · 现#' + (row?.rank ?? '—') + (win ? ' · 杀入 Top10' : ' · 未进 Top10'),
    };
  }
  if (t === 'H_upset_victim' || t === 'H_biggest_upset') {
    const group = p.group || '中文组';
    const row = ltSnapRows(snap, group).find((r) => r.entry.code === p.code);
    const baselineRank = ltBaselineRank(group, p.code);
    const win = baselineRank != null && baselineRank <= 5 && row && row.rank > 10;
    return {
      status: win ? 'win' : 'lose',
      note: group + ' · 预测#' + (baselineRank ?? '—') + ' · 现#' + (row?.rank ?? '—') + (win ? ' · 跌出 Top10' : ''),
    };
  }
  if (t === 'H_tail_digit') {
    const champ = p.group === '外文组' ? snap.championYf : snap.championZh;
    const digit = String(champ?.entry?.code || '').replace(/\\D/g, '').slice(-1);
    const win = digit === String(p.digit);
    return { status: win ? 'win' : 'lose', note: '冠军 ' + (champ?.entry?.code || '—') + ' 尾数 ' + (digit || '—') };
  }

  return { status: 'pending', note: '未知玩法' };
}

function ltDrawSnapshot() {
  const rankedZh = ltRanked('中文组');
  const rankedYf = ltRanked('外文组');
  return {
    rankedZh,
    rankedYf,
    championZh: rankedZh[0] || null,
    championYf: rankedYf[0] || null,
  };
}

function ltRenderParlay() {
  ltEnsureState();
  const legsEl = document.getElementById('ltParlayLegs');
  const sumEl = document.getElementById('ltParlaySummary');
  if (!legsEl) return;
  const legs = state.lottery.parlayLegs || [];
  if (!legs.length) {
    legsEl.innerHTML = '<div class="lt-empty" style="padding:8px 0">还没有关。选玩法后点「加入串关」。</div>';
    if (sumEl) sumEl.innerHTML = '';
    ltRenderJackpot();
    return;
  }
  legsEl.innerHTML = legs.map((leg, i) => (
    '<div class="lt-parlay-leg"><span class="n">' + (i + 1) + '</span>'
    + '<span>' + escapeHtml(ltDisplayText(leg.label)) + ' · ' + escapeHtml(ltDisplayText(leg.desc)) + '</span>'
    + ltOddsHtml(leg.odds)
    + '<button type="button" class="lt-btn lt-parlay-rm" data-leg-idx="' + i + '">移除</button></div>'
  )).join('');
  legsEl.querySelectorAll('.lt-parlay-rm').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.legIdx);
      if (Number.isFinite(idx)) state.lottery.parlayLegs.splice(idx, 1);
      ltRenderParlay();
    });
  });
  if (sumEl) {
    const combined = ltParlayOdds(legs);
    const stake = ltStake();
    const profit = Math.round(stake * (combined - 1) * 100) / 100;
    sumEl.innerHTML = '合计 ' + ltOddsHtml(combined)
      + ' · 注 ' + stake + ' ' + LT_COIN_UNIT + ' · 可赢 <strong>' + ltFmtCoin(profit) + '</strong>'
      + (legs.length < 2 ? ' <span style="color:#fbbf24">（还差 ' + (2 - legs.length) + ' 关）</span>' : '');
  }
  ltRenderJackpot();
}

function ltUpdateBetModeUi() {
  ltEnsureState();
  const cumulative = ltIsCumulative();
  document.getElementById('ltModeSingle')?.classList.toggle('active', !cumulative);
  document.getElementById('ltModeCumulative')?.classList.toggle('active', cumulative);
  const parlayPanel = document.getElementById('ltParlay');
  if (parlayPanel) parlayPanel.style.display = cumulative ? '' : 'none';
  document.querySelectorAll('.lt-bet-btn').forEach((btn) => {
    btn.textContent = cumulative ? '加入串关' : '选号';
  });
  if (cumulative) ltClearPendingBet();
  ltRenderParlay();
  ltRenderPendingConfirm();
}

function ltRenderSlip() {
  ltEnsureState();
  const el = document.getElementById('ltSlip');
  if (!el) return;
  if (!state.lottery.tickets.length) {
    el.innerHTML = '<div class="lt-empty">还没有注单。在左侧选玩法、看实时赔率后' + (ltIsCumulative() ? '加入串关。' : '下注。') + '</div>';
    ltRenderJackpot();
    return;
  }
  el.innerHTML = state.lottery.tickets.map((ticket) => {
    const stake = ticket.stake || 10;
    const odds = ticket.odds || 1.01;
    const payout = ltPayoutHtml(stake, odds);
    const parlayCls = ticket.type === 'Z_parlay' ? ' parlay' : '';
    let legHtml = '';
    if (ticket.type === 'Z_parlay' && ticket.legs?.length) {
      legHtml = ticket.legs.map((leg, i) => (
        '<div class="lt-parlay-leg"><span class="n">' + (i + 1) + '</span>'
        + escapeHtml(ltDisplayText(leg.desc || leg.label)) + ' ' + ltOddsHtml(leg.odds) + '</div>'
      )).join('');
    }
    return '<div class="lt-ticket' + parlayCls + '"><div class="k">' + escapeHtml(ltDisplayText(ticket.label)) + ' ' + ltOddsHtml(odds) + '</div>'
      + legHtml
      + (ticket.type === 'Z_parlay' ? '' : '<div class="meta">' + escapeHtml(ltDisplayText(ticket.desc || '')) + '</div>')
      + payout
      + '</div>';
  }).join('');
  ltRenderJackpot();
}

function ltBindAdd(btnId, buildTicket) {
  const btn = document.getElementById(btnId);
  if (!btn || btn.dataset.ltBound) return;
  btn.dataset.ltBound = '1';
  btn.addEventListener('click', async () => {
    try {
      const ticket = buildTicket();
      if (!ticket) return;
      if (ltIsCumulative()) {
        await ltAddTicket(ticket);
        return;
      }
      ltQueueBet(ticket);
    } catch (err) {
      alert((typeof acErrorMessage === 'function' ? acErrorMessage(err) : null) || err.message || String(err));
    }
  });
}

function ltReadSelect(id) {
  const v = document.getElementById(id)?.value;
  if (!v) throw new Error('请先选择作品');
  return v;
}

function ltMarketsA() {
  const groupSel = '<select id="ltA_pair_group"><option value="中文组">中文组</option><option value="外文组">外文组</option></select>';
  const pairSel = '<select id="ltA_o1"><option value="">— 选择 —</option></select><select id="ltA_o2"><option value="">— 选择 —</option></select>';
  const anySel = '<select id="ltA_a1"><option value="">— 选择 —</option></select><select id="ltA_a2"><option value="">— 选择 —</option></select>';
  return ''
    + '<div class="lt-card"><h4>中文组冠军</h4><p>精确猜中文组 #1（60 选 1）</p><div class="lt-form">' + ltSelectShell('ltA_zh', true) + '<span id="ltOdds_A_zh" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_A_zh">下注</button></div></div>'
    + '<div class="lt-card"><h4>外文组冠军</h4><p>精确猜外文组 #1（25 选 1）</p><div class="lt-form">' + ltSelectShell('ltA_yf', true) + '<span id="ltOdds_A_yf" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_A_yf">下注</button></div></div>'
    + '<div class="lt-card"><h4>双冠串关</h4><p>中文冠 + 外文冠同时猜中（串关赔率相乘）</p><div class="lt-form">' + ltSelectShell('ltA_dzh', true) + ltSelectShell('ltA_dyf', true) + '<span id="ltOdds_A_double" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_A_double">下注</button></div></div>'
    + '<div class="lt-card"><h4>冠亚军直选</h4><p>组内 #1、#2 顺序全对。赔率跟左侧<strong>综合分排名</strong>（支持/转化滑块）走，不是 Codex 锁定位。</p><div class="lt-form">' + groupSel + pairSel + '<span id="ltOdds_A_order" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_A_order">下注</button></div><span id="ltOdds_A_order_hint" class="lt-odds-hint"></span></div>'
    + '<div class="lt-card"><h4>冠亚军任序</h4><p>组内前两名的两首，顺序不限（两种顺序概率相加）</p><div class="lt-form">' + groupSel.replace('ltA_pair_group', 'ltA_any_group') + anySel + '<span id="ltOdds_A_any" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_A_any">下注</button></div><span id="ltOdds_A_any_hint" class="lt-odds-hint"></span></div>';
}

function ltMarketsB() {
  const groupSel = '<select id="ltB_group"><option value="中文组">中文组</option><option value="外文组">外文组</option></select>';
  const codeSel = '<select id="ltB_code"><option value="">— 选择 —</option></select>';
  return ''
    + '<div class="lt-card"><h4>进前三 / 前五 / 前十</h4><p>逐首估算：Plackett-Luce 抽样 + 与第 N 名<strong>分差</strong>（领先越多，进榜概率越高）</p><div class="lt-form">' + groupSel
    + '<select id="ltB_topn"><option value="3">Top 3</option><option value="5">Top 5</option><option value="10">Top 10</option></select>'
    + '<span id="ltB_code_wrap">' + codeSel + '</span><span id="ltOdds_B_top" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_B_top">下注</button></div></div>'
    + '<div class="lt-card"><h4>精确名次</h4><p>猜某首最终第几名（Plackett-Luce 全名次抽样）</p><div class="lt-form">' + groupSel.replace('ltB_group', 'ltB_group_ex')
    + '<span id="ltB_code_ex_wrap">' + codeSel.replace('ltB_code', 'ltB_code_ex') + '</span>'
    + '<input type="number" id="ltB_rank" min="1" max="60" value="1" style="width:64px" />'
    + '<span id="ltOdds_B_exact" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_B_exact">下注</button></div></div>'
    + '<div class="lt-card"><h4>名次区间</h4><p>最终排名落在 [低, 高] 闭区间</p><div class="lt-form">' + groupSel.replace('ltB_group', 'ltB_group_band')
    + '<span id="ltB_code_band_wrap">' + codeSel.replace('ltB_code', 'ltB_code_band') + '</span>'
    + '<input type="number" id="ltB_lo" min="1" max="60" value="4" style="width:56px" />–<input type="number" id="ltB_hi" min="1" max="60" value="10" style="width:56px" />'
    + '<span id="ltOdds_B_band" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_B_band">下注</button></div></div>'
    + '<div class="lt-card"><h4>组内垫底</h4><p>精确猜组内最后一名（Plackett-Luce 全名次抽样）</p><div class="lt-form">' + groupSel.replace('ltB_group', 'ltB_group_last')
    + '<span id="ltB_code_last_wrap">' + codeSel.replace('ltB_code', 'ltB_code_last') + '</span>'
    + '<span id="ltOdds_B_last" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_B_last">下注</button></div></div>';
}

function ltMarketsD() {
  const groupSel = '<select id="ltD_group"><option value="中文组">中文组</option><option value="外文组">外文组</option></select>';
  const halfSel = '<select id="ltD_half"><option value="上半场">上半场</option><option value="下半场">下半场</option></select>';
  return ''
    + '<div class="lt-card"><h4>冠军来自哪半场</h4><p>猜该组冠军是上半场还是下半场作品</p><div class="lt-form"><select id="ltD_ch_group"><option value="中文组">中文组</option><option value="外文组">外文组</option></select>' + halfSel + '<span id="ltOdds_D_champ_half" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_D_champ_half">下注</button></div></div>'
    + '<div class="lt-card"><h4>Top10 上半场占优</h4><p>组内前十里上半场席位数是否达到盘口线（随组别自动调整）</p><div class="lt-form">' + groupSel.replace('ltD_group', 'ltD_ou_group')
    + '<select id="ltD_ou"><option value="over">大 · 达线</option><option value="under">小 · 未达线</option></select>'
    + '<span id="ltD_ou_line" style="font-size:11px;color:#9f8f95"></span>'
    + '<span id="ltOdds_D_ou" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_D_ou">下注</button></div></div>'
    + '<div class="lt-card"><h4>跨半场最高名次</h4><p>组内上半场最高 vs 下半场最高，谁排名更靠前</p><div class="lt-form">' + groupSel.replace('ltD_group', 'ltD_peak_group') + halfSel.replace('ltD_half', 'ltD_peak') + '<span id="ltOdds_D_peak" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_D_peak">下注</button></div></div>'
    + '<div class="lt-card"><h4>半场平均名次</h4><p>组内各半场平均名次，猜哪边更靠前（更小）</p><div class="lt-form">' + groupSel.replace('ltD_group', 'ltD_avg_group') + halfSel.replace('ltD_half', 'ltD_avg') + '<span id="ltOdds_D_avg" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_D_avg">下注</button></div></div>';
}

function ltMarketsH() {
  const groupSel = '<select id="ltH_group"><option value="中文组">中文组</option><option value="外文组">外文组</option></select>';
  const darkSel = '<select id="ltH_dark"><option value="">— 选择 —</option></select>';
  const upsetSel = '<select id="ltH_upset"><option value="">— 选择 —</option></select>';
  return ''
    + '<div class="lt-card"><h4>黑马杀出重围</h4><p>所选作品组内胜率 &lt;1%，猜其最终冲入组内 Top10</p><div class="lt-form">' + groupSel + '<span id="ltH_dark_wrap">' + darkSel + '</span><span id="ltOdds_H_dark" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_H_dark">下注</button></div></div>'
    + '<div class="lt-card"><h4>爆冷受害者</h4><p>所选作品为组内<strong>预测 Top5</strong>（合并归一基准），但最终排名跌出 Top10</p><div class="lt-form"><select id="ltH_upset_group"><option value="中文组">中文组</option><option value="外文组">外文组</option></select><span id="ltH_upset_wrap">' + upsetSel + '</span><span id="ltOdds_H_upset" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_H_upset">下注</button></div></div>'
    + '<div class="lt-card"><h4>冠军编号尾数</h4><p>猜冠军编号最后一位数字 0–9（均分盘）</p><div class="lt-form"><select id="ltH_tail_group"><option value="中文组">中文组</option><option value="外文组">外文组</option></select><select id="ltH_digit"></select><span id="ltOdds_H_tail" class="lt-odds muted"><span class="tag">赔率</span>@—</span><button class="lt-btn primary" id="ltAdd_H_tail">下注</button></div></div>';
}

function ltFillDarkHorseSelect(selectId, group) {
  ltFillEntrySelect(selectId, group, (row) => ltProbDarkHorse(group, row.entry.code), (row) => (row.advanceProb ?? 100) < 1);
}

function ltFillUpsetVictimSelect(selectId, group) {
  ltFillEntrySelect(selectId, group, (row) => ltProbUpsetVictim(group, row.entry.code), (row) => ltIsPredictedTop5(group, row.entry.code));
}

function ltFillBTopSelect(selectId, group) {
  const n = Number(document.getElementById('ltB_topn')?.value || 3);
  ltFillEntrySelect(selectId, group, (row) => ltProbTopN(group, row.entry.code, n));
}

function ltFillBExactSelect(selectId, group) {
  const rank = Number(document.getElementById('ltB_rank')?.value || 1);
  ltFillEntrySelect(selectId, group, (row) => ltProbExactRank(group, row.entry.code, rank));
}

function ltFillBBandSelect(selectId, group) {
  const lo = Number(document.getElementById('ltB_lo')?.value || 4);
  const hi = Number(document.getElementById('ltB_hi')?.value || 10);
  ltFillEntrySelect(selectId, group, (row) => ltProbRankBand(group, row.entry.code, lo, hi));
}

function ltFillBLastSelect(selectId, group) {
  ltFillEntrySelect(selectId, group, (row) => ltProbLast(group, row.entry.code));
}

function ltFillTailDigitSelect() {
  ltFillBinarySelect('ltH_digit', Array.from({ length: 10 }, (_, d) => ({
    value: String(d),
    label: '尾数 ' + d,
    prob: ltProbTailDigit(String(d)),
  })));
}

function ltFillDHalfSelect(selectId, group, probFn) {
  ltFillBinarySelect(selectId, ['上半场', '下半场'].map((half) => ({
    value: half,
    label: half,
    prob: probFn(group, half),
  })));
}

function ltFillDOuSelect(group) {
  ltFillBinarySelect('ltD_ou', [
    { value: 'over', label: '大 · 达线', prob: ltProbTop10HalfOver(group, 'over') },
    { value: 'under', label: '小 · 未达线', prob: ltProbTop10HalfOver(group, 'under') },
  ]);
}

function ltWireMarketA() {
  const syncChamp = () => {
    ltFillChampionSelect('ltA_zh', '中文组');
    ltFillChampionSelect('ltA_yf', '外文组');
    ltFillChampionSelect('ltA_dzh', '中文组');
    ltFillChampionSelect('ltA_dyf', '外文组');
  };
  const syncOrder = () => {
    const group = document.getElementById('ltA_pair_group')?.value || '中文组';
    ltFillEntrySelect('ltA_o1', group, (row) => ltProbChampion(group, row.entry.code));
    ltFillEntrySelect('ltA_o2', group, (row) => ltProbExactRank(group, row.entry.code, 2));
  };
  const syncAny = () => {
    const group = document.getElementById('ltA_any_group')?.value || '中文组';
    ltFillEntrySelect('ltA_a1', group, (row) => ltProbTopN(group, row.entry.code, 2));
    ltFillEntrySelect('ltA_a2', group, (row) => ltProbTopN(group, row.entry.code, 2));
  };
  document.getElementById('ltA_pair_group')?.addEventListener('change', syncOrder);
  document.getElementById('ltA_any_group')?.addEventListener('change', syncAny);
  syncChamp();
  syncOrder();
  syncAny();
  return () => { syncChamp(); syncOrder(); syncAny(); };
}

function ltWireMarketB() {
  const sync = () => {
    ltFillBTopSelect('ltB_code', document.getElementById('ltB_group')?.value || '中文组');
    ltFillBExactSelect('ltB_code_ex', document.getElementById('ltB_group_ex')?.value || '中文组');
    ltFillBBandSelect('ltB_code_band', document.getElementById('ltB_group_band')?.value || '中文组');
    ltFillBLastSelect('ltB_code_last', document.getElementById('ltB_group_last')?.value || '中文组');
    const max = (document.getElementById('ltB_group_ex')?.value === '外文组') ? 25 : 60;
    document.getElementById('ltB_rank')?.setAttribute('max', String(max));
  };
  ['ltB_group', 'ltB_group_ex', 'ltB_group_band', 'ltB_group_last', 'ltB_topn', 'ltB_rank', 'ltB_lo', 'ltB_hi'].forEach((id) => {
    const el = document.getElementById(id);
    el?.addEventListener('change', sync);
    el?.addEventListener('input', sync);
  });
  sync();
  return sync;
}

function ltWireMarketD() {
  const sync = () => {
    const dChGroup = document.getElementById('ltD_ch_group')?.value || '中文组';
    const dOuGroup = document.getElementById('ltD_ou_group')?.value || '中文组';
    const dPeakGroup = document.getElementById('ltD_peak_group')?.value || '中文组';
    const dAvgGroup = document.getElementById('ltD_avg_group')?.value || '中文组';
    ltFillDHalfSelect('ltD_half', dChGroup, ltProbChampionHalf);
    ltFillDOuSelect(dOuGroup);
    ltFillDHalfSelect('ltD_peak', dPeakGroup, ltProbHalfPeak);
    ltFillDHalfSelect('ltD_avg', dAvgGroup, ltProbAvgRankHalf);
  };
  ['ltD_ch_group', 'ltD_ou_group', 'ltD_peak_group', 'ltD_avg_group'].forEach((id) => {
    document.getElementById(id)?.addEventListener('change', sync);
  });
  sync();
  return sync;
}

function ltWireMarketH() {
  const syncDark = () => ltFillDarkHorseSelect('ltH_dark', document.getElementById('ltH_group')?.value || '中文组');
  const syncUpset = () => ltFillUpsetVictimSelect('ltH_upset', document.getElementById('ltH_upset_group')?.value || '中文组');
  document.getElementById('ltH_group')?.addEventListener('change', syncDark);
  document.getElementById('ltH_upset_group')?.addEventListener('change', syncUpset);
  syncDark();
  syncUpset();
  ltFillTailDigitSelect();
  return () => { syncDark(); syncUpset(); ltFillTailDigitSelect(); };
}

function ltWireMarketAdds() {
  ltBindAdd('ltAdd_A_zh', () => ({ type: 'A_champion_zh', picks: { code: ltReadSelect('ltA_zh') }, label: '中文组冠军', desc: ltReadSelect('ltA_zh') }));
  ltBindAdd('ltAdd_A_yf', () => ({ type: 'A_champion_yf', picks: { code: ltReadSelect('ltA_yf') }, label: '外文组冠军', desc: ltReadSelect('ltA_yf') }));
  ltBindAdd('ltAdd_A_double', () => {
    const zh = ltReadSelect('ltA_dzh');
    const yf = ltReadSelect('ltA_dyf');
    return { type: 'A_double_champion', picks: { zh, yf }, label: '双冠串关', desc: zh + ' + ' + yf };
  });
  ltBindAdd('ltAdd_A_order', () => {
    const group = document.getElementById('ltA_pair_group')?.value || '中文组';
    const first = ltReadSelect('ltA_o1');
    const second = ltReadSelect('ltA_o2');
    if (first === second) throw new Error('冠亚军须为不同作品');
    return { type: 'A_top2_order', picks: { group, first, second }, label: '冠亚军直选', desc: group + ' #1 ' + first + ' #2 ' + second };
  });
  ltBindAdd('ltAdd_A_any', () => {
    const group = document.getElementById('ltA_any_group')?.value || '中文组';
    const a = ltReadSelect('ltA_a1');
    const b = ltReadSelect('ltA_a2');
    if (a === b) throw new Error('须选两首不同作品');
    return { type: 'A_top2_any', picks: { group, a, b }, label: '冠亚军任序', desc: group + ' · ' + a + ' · ' + b };
  });
  ltBindAdd('ltAdd_B_top', () => {
    const group = document.getElementById('ltB_group')?.value || '中文组';
    const n = Number(document.getElementById('ltB_topn')?.value || 3);
    const code = ltReadSelect('ltB_code');
    const type = n === 3 ? 'B_top3' : n === 5 ? 'B_top5' : 'B_top10';
    return { type, picks: { group, code }, label: '进前' + n, desc: group + ' · ' + code };
  });
  ltBindAdd('ltAdd_B_exact', () => {
    const group = document.getElementById('ltB_group_ex')?.value || '中文组';
    const code = ltReadSelect('ltB_code_ex');
    const rank = Number(document.getElementById('ltB_rank')?.value || 1);
    return { type: 'B_exact_rank', picks: { group, code, rank }, label: '精确名次', desc: group + ' · ' + code + ' = #' + rank };
  });
  ltBindAdd('ltAdd_B_band', () => {
    const group = document.getElementById('ltB_group_band')?.value || '中文组';
    const code = ltReadSelect('ltB_code_band');
    const lo = Number(document.getElementById('ltB_lo')?.value || 4);
    const hi = Number(document.getElementById('ltB_hi')?.value || 10);
    return { type: 'B_rank_band', picks: { group, code, lo, hi }, label: '名次区间', desc: group + ' · ' + code + ' ∈ #' + lo + '-#' + hi };
  });
  ltBindAdd('ltAdd_B_last', () => {
    const group = document.getElementById('ltB_group_last')?.value || '中文组';
    const code = ltReadSelect('ltB_code_last');
    return { type: 'B_last', picks: { group, code }, label: '组内垫底', desc: group + ' · ' + code };
  });
  ltBindAdd('ltAdd_D_champ_half', () => {
    const group = document.getElementById('ltD_ch_group')?.value || '中文组';
    const half = document.getElementById('ltD_half')?.value || '上半场';
    return { type: 'D_champion_half', picks: { group, half }, label: '冠军半场', desc: group + ' · ' + half };
  });
  ltBindAdd('ltAdd_D_ou', () => {
    const group = document.getElementById('ltD_ou_group')?.value || '中文组';
    const side = document.getElementById('ltD_ou')?.value || 'over';
    const line = ltTop10HalfLine(group);
    return { type: 'D_top10_half_count', picks: { group, side }, label: 'Top10 上半场席', desc: group + ' · ' + (side === 'over' ? '大 ≥' + line : '小 <' + line) };
  });
  ltBindAdd('ltAdd_D_peak', () => {
    const group = document.getElementById('ltD_peak_group')?.value || '中文组';
    const half = document.getElementById('ltD_peak')?.value || '上半场';
    return { type: 'D_cross_half_peak', picks: { group, half }, label: '跨半场最高名次', desc: group + ' · ' + half };
  });
  ltBindAdd('ltAdd_D_avg', () => {
    const group = document.getElementById('ltD_avg_group')?.value || '中文组';
    const half = document.getElementById('ltD_avg')?.value || '上半场';
    return { type: 'D_avg_rank_half', picks: { group, half }, label: '半场平均名次', desc: group + ' · ' + half + ' 更靠前' };
  });
  ltBindAdd('ltAdd_H_dark', () => {
    const group = document.getElementById('ltH_group')?.value || '中文组';
    const code = ltReadSelect('ltH_dark');
    const row = ltRanked(group).find((r) => r.entry.code === code);
    if (!row || (row.advanceProb ?? 100) >= 1) throw new Error('须选择组内胜率 <1% 的作品');
    return { type: 'H_dark_horse', picks: { group, code }, label: '黑马杀出重围', desc: group + ' · ' + code + ' · &lt;1%→Top10' };
  });
  ltBindAdd('ltAdd_H_upset', () => {
    const group = document.getElementById('ltH_upset_group')?.value || '中文组';
    const code = ltReadSelect('ltH_upset');
    if (!ltIsPredictedTop5(group, code)) throw new Error('须选择预测 Top5 作品');
    const br = ltBaselineRank(group, code);
    return { type: 'H_upset_victim', picks: { group, code }, label: '爆冷受害者', desc: group + ' · ' + code + ' · 预测#' + br + '→跌出Top10' };
  });
  ltBindAdd('ltAdd_H_tail', () => {
    const group = document.getElementById('ltH_tail_group')?.value || '中文组';
    const digit = String(document.getElementById('ltH_digit')?.value ?? '0');
    return { type: 'H_tail_digit', picks: { group, digit }, label: '冠军尾数', desc: group + ' · 尾数 ' + digit };
  });
}

function ltWireLiveOddsA() {
  const syncZh = ltWireLiveOdds(['ltOdds_A_zh'], () => {
    const code = document.getElementById('ltA_zh')?.value;
    if (!code) return null;
    return ltBookOdds(ltProbChampion('中文组', code));
  });
  const syncYf = ltWireLiveOdds(['ltOdds_A_yf'], () => {
    const code = document.getElementById('ltA_yf')?.value;
    if (!code) return null;
    return ltBookOdds(ltProbChampion('外文组', code));
  });
  const syncDouble = ltWireLiveOdds(['ltOdds_A_double'], () => {
    const zh = document.getElementById('ltA_dzh')?.value;
    const yf = document.getElementById('ltA_dyf')?.value;
    if (!zh || !yf) return null;
    return ltQuoteDoubleChampion(zh, yf);
  });
  const syncOrder = () => {
    const group = document.getElementById('ltA_pair_group')?.value || '中文组';
    const first = document.getElementById('ltA_o1')?.value;
    const second = document.getElementById('ltA_o2')?.value;
    if (!first || !second || first === second) {
      ltSetLiveOdds('ltOdds_A_order', null, true);
      ltSetTop2Hint('ltOdds_A_order_hint', '');
      return;
    }
    const prob = ltProbTop2Order(group, first, second);
    const odds = ltBookOdds(prob);
    ltSetLiveOdds('ltOdds_A_order', odds, false);
    const maps = ltEntryRankMaps(group);
    ltSetTop2Hint('ltOdds_A_order_hint', ltTop2ContextLine(group, first, second, prob), maps.blend.get(first) > 1 || maps.blend.get(second) > 2);
  };
  const syncAny = () => {
    const group = document.getElementById('ltA_any_group')?.value || '中文组';
    const a = document.getElementById('ltA_a1')?.value;
    const b = document.getElementById('ltA_a2')?.value;
    if (!a || !b || a === b) {
      ltSetLiveOdds('ltOdds_A_any', null, true);
      ltSetTop2Hint('ltOdds_A_any_hint', '');
      return;
    }
    const prob = ltProbTop2Any(group, a, b);
    const odds = ltBookOdds(prob);
    ltSetLiveOdds('ltOdds_A_any', odds, false);
    const maps = ltEntryRankMaps(group);
    const brA = maps.blend.get(a), brB = maps.blend.get(b);
    const pct = (prob * 100).toFixed(2);
    const line = '综合 #' + brA + '·#' + brB + ' · 支持 #' + maps.support.get(a) + '·#' + maps.support.get(b)
      + ' · 转化 #' + maps.conversion.get(a) + '·#' + maps.conversion.get(b) + ' · 约 ' + pct + '%';
    ltSetTop2Hint('ltOdds_A_any_hint', line, Math.min(brA, brB) > 2);
  };
  syncOrder();
  syncAny();
  const syncAll = () => { syncZh(); syncYf(); syncDouble(); syncOrder(); syncAny(); };
  ['ltA_zh', 'ltA_yf', 'ltA_dzh', 'ltA_dyf', 'ltA_pair_group', 'ltA_o1', 'ltA_o2', 'ltA_any_group', 'ltA_a1', 'ltA_a2'].forEach((id) => {
    document.getElementById(id)?.addEventListener('change', syncAll);
  });
  return syncAll;
}

function ltWireLiveOddsB() {
  const quoteTop = () => {
    const group = document.getElementById('ltB_group')?.value || '中文组';
    const code = document.getElementById('ltB_code')?.value;
    const n = Number(document.getElementById('ltB_topn')?.value || 3);
    if (!code) return null;
    return ltBookOdds(ltProbTopN(group, code, n));
  };
  const quoteExact = () => {
    const group = document.getElementById('ltB_group_ex')?.value || '中文组';
    const code = document.getElementById('ltB_code_ex')?.value;
    const rank = Number(document.getElementById('ltB_rank')?.value || 1);
    if (!code) return null;
    return ltBookOdds(ltProbExactRank(group, code, rank));
  };
  const quoteBand = () => {
    const group = document.getElementById('ltB_group_band')?.value || '中文组';
    const code = document.getElementById('ltB_code_band')?.value;
    const lo = Number(document.getElementById('ltB_lo')?.value || 4);
    const hi = Number(document.getElementById('ltB_hi')?.value || 10);
    if (!code) return null;
    return ltBookOdds(ltProbRankBand(group, code, lo, hi));
  };
  const quoteLast = () => {
    const group = document.getElementById('ltB_group_last')?.value || '中文组';
    const code = document.getElementById('ltB_code_last')?.value;
    if (!code) return null;
    return ltBookOdds(ltProbLast(group, code));
  };
  const syncTop = ltWireLiveOdds(['ltOdds_B_top'], quoteTop);
  const syncExact = ltWireLiveOdds(['ltOdds_B_exact'], quoteExact);
  const syncBand = ltWireLiveOdds(['ltOdds_B_band'], quoteBand);
  const syncLast = ltWireLiveOdds(['ltOdds_B_last'], quoteLast);
  const syncAll = () => { syncTop(); syncExact(); syncBand(); syncLast(); };
  ['ltB_group', 'ltB_topn', 'ltB_code', 'ltB_group_ex', 'ltB_code_ex', 'ltB_rank', 'ltB_group_band', 'ltB_code_band', 'ltB_lo', 'ltB_hi', 'ltB_group_last', 'ltB_code_last'].forEach((id) => {
    document.getElementById(id)?.addEventListener('change', syncAll);
    document.getElementById(id)?.addEventListener('input', syncAll);
  });
  return syncAll;
}

function ltWireLiveOddsD() {
  const syncChamp = ltWireLiveOdds(['ltOdds_D_champ_half'], () => {
    const group = document.getElementById('ltD_ch_group')?.value || '中文组';
    const half = document.getElementById('ltD_half')?.value || '上半场';
    return ltBookOdds(ltProbChampionHalf(group, half));
  });
  const syncOu = ltWireLiveOdds(['ltOdds_D_ou'], () => {
    const group = document.getElementById('ltD_ou_group')?.value || '中文组';
    const side = document.getElementById('ltD_ou')?.value || 'over';
    const line = ltTop10HalfLine(group);
    const lineEl = document.getElementById('ltD_ou_line');
    if (lineEl) lineEl.textContent = '线 ' + line + ' 席';
    return ltBookOdds(ltProbTop10HalfOver(group, side));
  });
  const syncPeak = ltWireLiveOdds(['ltOdds_D_peak'], () => {
    const group = document.getElementById('ltD_peak_group')?.value || '中文组';
    const half = document.getElementById('ltD_peak')?.value || '上半场';
    return ltBookOdds(ltProbHalfPeak(group, half));
  });
  const syncAvg = ltWireLiveOdds(['ltOdds_D_avg'], () => {
    const group = document.getElementById('ltD_avg_group')?.value || '中文组';
    const half = document.getElementById('ltD_avg')?.value || '上半场';
    return ltBookOdds(ltProbAvgRankHalf(group, half));
  });
  const syncAll = () => { syncChamp(); syncOu(); syncPeak(); syncAvg(); };
  ['ltD_ch_group', 'ltD_half', 'ltD_ou_group', 'ltD_ou', 'ltD_peak_group', 'ltD_peak', 'ltD_avg_group', 'ltD_avg'].forEach((id) => {
    document.getElementById(id)?.addEventListener('change', syncAll);
  });
  return syncAll;
}

function ltWireLiveOddsH() {
  const syncDark = ltWireLiveOdds(['ltOdds_H_dark'], () => {
    const group = document.getElementById('ltH_group')?.value || '中文组';
    const code = document.getElementById('ltH_dark')?.value;
    if (!code) return null;
    return ltBookOdds(ltProbDarkHorse(group, code));
  });
  const syncUpset = ltWireLiveOdds(['ltOdds_H_upset'], () => {
    const group = document.getElementById('ltH_upset_group')?.value || '中文组';
    const code = document.getElementById('ltH_upset')?.value;
    if (!code) return null;
    return ltBookOdds(ltProbUpsetVictim(group, code));
  });
  const syncTail = ltWireLiveOdds(['ltOdds_H_tail'], () => {
    const digit = String(document.getElementById('ltH_digit')?.value ?? '0');
    return ltBookOdds(ltProbTailDigit(digit));
  });
  document.getElementById('ltH_group')?.addEventListener('change', () => { syncDark(); });
  document.getElementById('ltH_dark')?.addEventListener('change', syncDark);
  document.getElementById('ltH_upset_group')?.addEventListener('change', () => { syncUpset(); });
  document.getElementById('ltH_upset')?.addEventListener('change', syncUpset);
  document.getElementById('ltH_digit')?.addEventListener('change', syncTail);
  syncTail();
  return () => { syncDark(); syncUpset(); syncTail(); };
}

function ltRefreshMarketsLive() {
  ltEnsureState();
  state.lottery.refreshMarketData?.();
  state.lottery.refreshOdds?.();
  ltRenderPendingConfirm();
}

function ltRenderMarkets() {
  ltEnsureState();
  const cat = state.lottery.activeCategory || 'A';
  const el = document.getElementById('ltMarkets');
  if (!el) return;
  document.querySelectorAll('.lt-cat-tab').forEach((btn) => btn.classList.toggle('active', btn.dataset.ltCat === cat));
  el.innerHTML = (cat === 'A' ? ltMarketsA() : cat === 'B' ? ltMarketsB() : cat === 'D' ? ltMarketsD() : ltMarketsH());
  ltWireMarketAdds();
  if (cat === 'A') {
    state.lottery.refreshMarketData = ltWireMarketA();
    state.lottery.refreshOdds = ltWireLiveOddsA();
  } else if (cat === 'B') {
    state.lottery.refreshMarketData = ltWireMarketB();
    state.lottery.refreshOdds = ltWireLiveOddsB();
  } else if (cat === 'D') {
    state.lottery.refreshMarketData = ltWireMarketD();
    state.lottery.refreshOdds = ltWireLiveOddsD();
  } else {
    state.lottery.refreshMarketData = ltWireMarketH();
    state.lottery.refreshOdds = ltWireLiveOddsH();
  }
  document.querySelectorAll('[id^="ltAdd_"]').forEach((btn) => btn.classList.add('lt-bet-btn'));
  ltUpdateBetModeUi();
}

function ltInitLotteryTab() {
  if (window.__ltInited) return;
  window.__ltInited = true;
  const stakeEl = document.getElementById('ltStake');
  if (stakeEl) {
    ltEnsureState();
    stakeEl.value = String(state.lottery.defaultStake ?? 10);
    stakeEl.addEventListener('input', () => {
      state.lottery.defaultStake = ltStake();
      ltRenderParlay();
      ltRenderPendingConfirm();
      acScheduleSavePrefs?.();
    });
  }
  document.getElementById('ltModeSingle')?.addEventListener('click', () => {
    ltEnsureState();
    state.lottery.betMode = 'single';
    ltUpdateBetModeUi();
    acScheduleSavePrefs?.();
  });
  document.getElementById('ltModeCumulative')?.addEventListener('click', () => {
    ltEnsureState();
    state.lottery.betMode = 'cumulative';
    ltUpdateBetModeUi();
    acScheduleSavePrefs?.();
  });
  document.getElementById('ltPendingConfirmBtn')?.addEventListener('click', async () => {
    try { await ltExecutePendingBet(); } catch (err) { alert((typeof acErrorMessage === 'function' ? acErrorMessage(err) : null) || err.message || String(err)); }
  });
  document.getElementById('ltPendingCancelBtn')?.addEventListener('click', () => ltClearPendingBet());
  document.getElementById('ltConfirmParlay')?.addEventListener('click', async () => {
    try { await ltConfirmParlay(); } catch (err) { alert((typeof acErrorMessage === 'function' ? acErrorMessage(err) : null) || err.message || String(err)); }
  });
  document.getElementById('ltClearParlay')?.addEventListener('click', () => {
    ltEnsureState();
    state.lottery.parlayLegs = [];
    ltRenderParlay();
  });
  document.getElementById('ltCatTabs')?.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-lt-cat]');
    if (!btn) return;
    ltEnsureState();
    state.lottery.activeCategory = btn.dataset.ltCat;
    ltRenderMarkets();
    acScheduleSavePrefs?.();
  });
  document.getElementById('ltClearSlip')?.addEventListener('click', async () => {
    if (typeof acEnabled === 'function' && acEnabled() && state.account?.active) {
      await acLoadLotteryFromServer();
      return;
    }
    ltEnsureState();
    state.lottery.tickets = [];
    ltRenderSlip();
  });
  document.getElementById('ltRefreshDraw')?.addEventListener('click', () => ltRenderSlip());
}

function renderLottery() {
  if (!DATA.includeLotteryTab) return;
  ltEnsureState();
  ltInitLotteryTab();
  ltUpdateWalletCapDisplay();
  ltUpdateStakeLimits();
  if (!window.__ltMarketsRendered) {
    window.__ltMarketsRendered = true;
    ltRenderMarkets();
  } else {
    ltRefreshMarketsLive();
  }
  ltRenderSlip();
  ltRenderJackpot();
  ltRenderPendingConfirm();
}
`;
}