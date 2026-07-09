import fs from "node:fs/promises";
import path from "node:path";
import { authAccountCss, authAccountHtml, authAccountJs } from "./auth_account_embed.mjs";
import { lotteryTabCss, lotteryTabHtml, lotteryTabJs } from "./finals_lottery_tab_embed.mjs";

const ROOT = path.resolve(".");
const args = parseArgs(process.argv.slice(2));
const templatePath = path.join(ROOT, args.template ?? "outputs/bilibili-geying-s3-combined-prelim-playground-v13-dark.html");
const outputPath = path.join(ROOT, args.output ?? "outputs/bilibili-geying-s3-finals-combined-playground-v13-dark.html");
const qualifiedPath = path.join(ROOT, "config/geying-s3-prelim-confirmed-qualifiers.json");
const policyPath = path.join(ROOT, args.policy ?? "config/geying-s3-prelim-metric-policy.json");
const ageCalPath = path.join(ROOT, args.ageCalibration ?? "config/geying-s3-finals-combined-age-calibration.json");
const fhInputPath = path.join(ROOT, args.firstHalfInput ?? "outputs/bilibili-geying-s3-predicted-rankings-partial-sanlian-5050.csv");
const shInputPath = path.join(ROOT, args.secondHalfInput ?? "outputs/bilibili-geying-s3-second-half-partial-sanlian-5050-ps.csv");

const ageCalibration = JSON.parse(await fs.readFile(ageCalPath, "utf8"));
if (args.ageStrength != null) ageCalibration.strength = Number(args.ageStrength);

const MERGED_STAT_KEYS = ["views", "likes", "coins", "favorites", "shares", "replies", "danmaku"];
const MERGED_SANLIAN_RAW_KEYS = ["adjusted_raw_like", "adjusted_raw_coin", "adjusted_raw_favorite"];

const templateHtml = await fs.readFile(templatePath, "utf8");
const templateRaw = JSON.parse(extractAppData(templateHtml));
const qualified = JSON.parse(await fs.readFile(qualifiedPath, "utf8"));
const policy = JSON.parse(await fs.readFile(policyPath, "utf8"));

const halfByCode = new Map();
const allQualified = new Set();
for (const [halfKey, codes] of Object.entries(qualified.halves ?? {})) {
  for (const code of codes ?? []) {
    const upper = String(code).toUpperCase();
    allQualified.add(upper);
    halfByCode.set(upper, halfKey);
  }
}

const fhAllRows = parseCsv(await fs.readFile(fhInputPath, "utf8"));
const shAllRows = parseCsv(await fs.readFile(shInputPath, "utf8"));
const fhQualifiedRows = fhAllRows.filter((row) => allQualified.has(row.code.toUpperCase()));
const shQualifiedRows = shAllRows.filter((row) => allQualified.has(row.code.toUpperCase()));
const mergedRows = [...fhQualifiedRows, ...shQualifiedRows];
if (mergedRows.length !== allQualified.size) {
  const found = new Set(mergedRows.map((row) => row.code.toUpperCase()));
  const missing = [...allQualified].filter((code) => !found.has(code));
  throw new Error(`Missing ${missing.length} qualified entries in partial-sanlian CSVs: ${missing.slice(0, 8).join(", ")}`);
}

const GROUP_DISPLAY_ORDER = ["中文组", "外文组"];

const lockedByCode = buildMergedLockedByCode(mergedRows);
const groups = orderGroups([...new Set(mergedRows.map((row) => row.group))]);
const isQualified = (row) => allQualified.has(row.code.toUpperCase());
const entriesPerHalf = groups.flatMap((group) => [
  ...buildGroupEntries(fhAllRows, group, lockedByCode, isQualified),
  ...buildGroupEntries(shAllRows, group, lockedByCode, isQualified),
]);
const { rows: mergedRowsCalibrated, scalesByCode, referenceDaysByGroup, typicalFirstHalfScale } = calibrateMergedRows(
  mergedRows,
  halfByCode,
  ageCalibration,
);
const entriesMerged = groups.flatMap((group) => buildGroupEntries(mergedRowsCalibrated, group, lockedByCode));
const mergedComponentsByCode = new Map(entriesMerged.map((entry) => [entry.code, entry.components]));
const entries = entriesPerHalf.map((entry) => ({
  ...entry,
  half: halfByCode.get(entry.code) === "second_half" ? "下半场" : "上半场",
  age_scale: scalesByCode.get(entry.code) ?? 1,
  componentsMerged: mergedComponentsByCode.get(entry.code) ?? entry.components,
}));
const mergedCalNote = ageCalibration.enabled === false
  ? ""
  : `合并决赛归一化：上半场上架更久，已做温和时长校准（strength ${ageCalibration.strength}，上半场约 ×${typicalFirstHalfScale}，参照各组下半场中位上架天数）。`;

const weightPreset = buildWeightPreset(policy);
const normPresets = {
  "norm-per-half": { label: "半场归一化", normMode: "per-half" },
  "norm-merged-finals": { label: "合并决赛归一化（含上架校准）", normMode: "merged" },
};
const cutoffs = Object.fromEntries(
  groups.map((group) => {
    const n = entries.filter((entry) => entry.group === group).length;
    return [group, n];
  }),
);
const baselineRanks = rankWithWeights(entries, weightPreset, cutoffs, "componentsMerged");
const groupStats = Object.fromEntries(
  groups.map((group) => {
    const n = entries.filter((entry) => entry.group === group).length;
    return [group, {
      entryCount: n,
      ballotCap: Math.max(1, Math.floor(n * 0.5)),
      cutoff: cutoffs[group] ?? n,
      audienceCutoff: Math.max(1, Math.ceil(n * 0.08)),
    }];
  }),
);

const votingRules = JSON.parse(
  await fs.readFile(path.join(ROOT, policy.rulesSource ?? "config/geying-s3-prelim-voting-rules.json"), "utf8"),
);

const payload = {
  generatedAt: new Date().toISOString(),
  seasonHalf: "决赛",
  seasonHalfKey: "finals",
  cutoffs,
  entries,
  baselineRanks,
  groupStats,
  themeFxByCode: templateRaw.halves?.first_half?.themeFxByCode ?? {},
  confirmedQualifiers: [],
  metricPolicy: {
    label: policy.label,
    modelKey: policy.modelKey,
    rationale: policy.rationale,
    finalBlend: policy.finalBlend,
    supportWeights: policy.supportWeights,
    conversionWeights: policy.conversionWeights,
  },
  modelKey: policy.modelKey,
  theme: templateRaw.theme ?? "dark",
  variant: templateRaw.variant ?? "v13-dark",
  presets: normPresets,
  defaultPreset: "norm-per-half",
  defaultWeights: weightPreset,
  mergedAgeCalibration: {
    ...ageCalibration,
    referenceDaysByGroup,
    typicalFirstHalfScale,
    note: mergedCalNote,
  },
  includePkTab: templateRaw.includePkTab ?? true,
  includeApprovalTab: false,
  includeLotteryTab: true,
  includeMajorTab: templateRaw.includeMajorTab ?? true,
  votingRules,
  accountEnabled: process.env.ACCOUNT_WALLET !== "0",
  walletApiUrl: "/api/wallet",
  accountInitialCoins: Number(process.env.ACCOUNT_INITIAL_COINS) || 100,
  accountMaxStake: Number(process.env.ACCOUNT_MAX_STAKE) || 100,
  accountRateLimitPerMin: Number(process.env.ACCOUNT_RATE_LIMIT_PER_MIN) || 10,
};

let html = injectAppData(templateHtml, payload);
html = patchHtml(html);
html = patchAccountSystem(html);
html = patchFinalsLotteryTab(html);

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, html, "utf8");

const topByGroup = Object.fromEntries(
  groups.map((group) => {
    const sorted = [...entries]
      .filter((entry) => entry.group === group)
      .sort((a, b) => (b.locked_score ?? 0) - (a.locked_score ?? 0) || a.code.localeCompare(b.code, "en"));
    return [group, sorted.slice(0, 3).map((entry) => `${entry.code} #${entry.locked_rank} (${entry.locked_score})`)];
  }),
);

console.log(JSON.stringify({
  template: path.relative(ROOT, templatePath).replace(/\\/g, "/"),
  output: path.relative(ROOT, outputPath).replace(/\\/g, "/"),
  entries: entries.length,
  groups: Object.fromEntries(groups.map((group) => [group, entries.filter((entry) => entry.group === group).length])),
  top: topByGroup,
  mergedAgeCalibration: {
    strength: ageCalibration.strength,
    typicalFirstHalfScale,
    referenceDaysByGroup,
  },
}, null, 2));

function calibrateMergedRows(rows, halfByCode, cfg) {
  if (cfg.enabled === false) {
    return {
      rows,
      scalesByCode: new Map(rows.map((row) => [row.code, 1])),
      referenceDaysByGroup: {},
      typicalFirstHalfScale: 1,
    };
  }

  const exponent = cfg.exponent ?? 0.65;
  const strength = cfg.strength ?? 0.3;
  const minScale = cfg.minScale ?? 0.75;
  const maxScale = cfg.maxScale ?? 1.05;
  const fallbackDays = cfg.fallbackDaysOnline ?? { first_half: 27, second_half: 13 };

  const referenceDaysByGroup = {};
  for (const group of [...new Set(rows.map((row) => row.group))]) {
    const secondHalfDays = rows
      .filter((row) => row.group === group && halfByCode.get(row.code.toUpperCase()) === "second_half")
      .map((row) => daysOnlineForRow(row, halfByCode, fallbackDays))
      .filter((days) => days > 0)
      .sort((a, b) => a - b);
    referenceDaysByGroup[group] = clamp(median(secondHalfDays) || fallbackDays.second_half, 5, 90);
  }

  const scalesByCode = new Map();
  const calibratedRows = rows.map((row) => {
    const halfKey = halfByCode.get(row.code.toUpperCase()) ?? "second_half";
    if (halfKey !== "first_half") {
      scalesByCode.set(row.code, 1);
      return row;
    }
    const days = daysOnlineForRow(row, halfByCode, fallbackDays);
    const referenceDays = referenceDaysByGroup[row.group] ?? fallbackDays.second_half;
    const targetScale = (referenceDays / days) ** exponent;
    const ageScale = clamp(1 - strength * (1 - targetScale), minScale, maxScale);
    scalesByCode.set(row.code, round(ageScale, 3));
    return scaleRowForAgeCalibration(row, ageScale);
  });

  const firstHalfScales = [...scalesByCode.values()].filter((scale) => scale < 0.999);
  const typicalFirstHalfScale = round(
    firstHalfScales.length ? firstHalfScales.reduce((sum, scale) => sum + scale, 0) / firstHalfScales.length : 1,
    2,
  );

  return { rows: calibratedRows, scalesByCode, referenceDaysByGroup, typicalFirstHalfScale };
}

function daysOnlineForRow(row, halfByCode, fallbackDays) {
  const halfKey = halfByCode.get(row.code.toUpperCase()) ?? "second_half";
  return fallbackDays[halfKey] ?? (halfKey === "first_half" ? 27 : 13);
}

function scaleRowForAgeCalibration(row, ageScale) {
  if (ageScale >= 0.999) return row;
  const out = { ...row };
  for (const key of MERGED_STAT_KEYS) {
    if (out[key] == null || out[key] === "") continue;
    const scaled = num(out[key]) * ageScale;
    out[key] = key === "views" ? String(Math.round(scaled)) : String(round(scaled, 4));
  }
  for (const key of MERGED_SANLIAN_RAW_KEYS) {
    if (out[key] == null || out[key] === "") continue;
    out[key] = String(round(num(out[key]) * ageScale, 6));
  }
  return out;
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function buildWeightPreset(metricPolicy) {
  return {
    blend: metricPolicy.finalBlend,
    support: metricPolicy.supportWeights,
    conversion: metricPolicy.conversionWeights,
  };
}

function orderGroups(groups) {
  return [...groups].sort((a, b) => {
    const ia = GROUP_DISPLAY_ORDER.indexOf(a);
    const ib = GROUP_DISPLAY_ORDER.indexOf(b);
    if (ia >= 0 && ib >= 0) return ia - ib;
    if (ia >= 0) return -1;
    if (ib >= 0) return 1;
    return a.localeCompare(b, "zh");
  });
}

function buildMergedLockedByCode(rows) {
  const byGroup = {};
  for (const row of rows) {
    (byGroup[row.group] ??= []).push(row);
  }
  const locked = new Map();
  for (const groupRows of Object.values(byGroup)) {
    const sorted = [...groupRows].sort(
      (a, b) => num(b.prediction_score) - num(a.prediction_score)
        || num(b.conversion_score) - num(a.conversion_score)
        || num(b.support_score) - num(a.support_score)
        || a.code.localeCompare(b.code, "en"),
    );
    sorted.forEach((row, index) => {
      locked.set(row.code, {
        predicted_rank: index + 1,
        prediction_score: num(row.prediction_score),
      });
    });
  }
  return locked;
}

function buildGroupEntries(sourceRows, group, lockedByCode, includeRow = () => true) {
  const normRows = sourceRows
    .filter((row) => row.group === group)
    .map((row) => ({
      views: num(row.views),
      shares: num(row.shares),
      replies: num(row.replies),
      danmaku: num(row.danmaku),
    }));

  const supportNorms = {
    views: minmaxBy(normRows, (row) => Math.log1p(row.views)),
    shares: minmaxBy(normRows, (row) => Math.log1p(row.shares)),
    replies: minmaxBy(normRows, (row) => Math.log1p(row.replies)),
    danmaku: minmaxBy(normRows, (row) => Math.log1p(row.danmaku)),
  };
  const conversionNorms = {
    shares_rate: minmaxBy(normRows, (row) => Math.log1p(row.shares / safeViews(row))),
    replies_rate: minmaxBy(normRows, (row) => Math.log1p(row.replies / safeViews(row))),
    danmaku_rate: minmaxBy(normRows, (row) => Math.log1p(row.danmaku / safeViews(row))),
  };

  const groupRows = sourceRows
    .filter((row) => row.group === group && includeRow(row))
    .map((row) => ({
      group,
      code: row.code,
      title: cleanTitle(row.title),
      bvid: row.bvid,
      views: num(row.views),
      likes: num(row.likes),
      coins: num(row.coins),
      favorites: num(row.favorites),
      shares: num(row.shares),
      replies: num(row.replies),
      danmaku: num(row.danmaku),
      locked_rank: num(lockedByCode.get(row.code)?.predicted_rank) || null,
      locked_score: num(lockedByCode.get(row.code)?.prediction_score) || null,
      components: {
        adjusted_raw_like: num(row.adjusted_raw_like),
        adjusted_raw_coin: num(row.adjusted_raw_coin),
        adjusted_raw_favorite: num(row.adjusted_raw_favorite),
        adjusted_rate_like: num(row.adjusted_rate_like),
        adjusted_rate_coin: num(row.adjusted_rate_coin),
        adjusted_rate_favorite: num(row.adjusted_rate_favorite),
      },
    }));

  return groupRows.map((row) => ({
    ...row,
    components: {
      ...row.components,
      views_norm: supportNorms.views(Math.log1p(row.views)),
      shares_norm: supportNorms.shares(Math.log1p(row.shares)),
      replies_norm: supportNorms.replies(Math.log1p(row.replies)),
      danmaku_norm: supportNorms.danmaku(Math.log1p(row.danmaku)),
      shares_rate_norm: conversionNorms.shares_rate(Math.log1p(row.shares / safeViews(row))),
      replies_rate_norm: conversionNorms.replies_rate(Math.log1p(row.replies / safeViews(row))),
      danmaku_rate_norm: conversionNorms.danmaku_rate(Math.log1p(row.danmaku / safeViews(row))),
    },
  }));
}

function rankWithWeights(entries, preset, cutoffsMap, componentsKey = "components") {
  const byGroup = {};
  for (const group of [...new Set(entries.map((entry) => entry.group))]) {
    const groupEntries = entries.filter((entry) => entry.group === group);
    const scored = groupEntries.map((entry) => scoreEntry(entry, preset, entry[componentsKey] ?? entry.components));
    scored.sort((a, b) => b.prediction_score - a.prediction_score
      || b.conversionScore - a.conversionScore
      || b.supportScore - a.supportScore
      || a.code.localeCompare(b.code, "en"));
    byGroup[group] = Object.fromEntries(scored.map((row, index) => [row.code, index + 1]));
  }
  return byGroup;
}

function scoreEntry(entry, preset, components = entry.components) {
  const sw = preset.support;
  const cw = preset.conversion;
  const c = components;
  const supportScore = 100 * (
    sw.views * c.views_norm
    + sw.likes * c.adjusted_raw_like
    + sw.coins * c.adjusted_raw_coin
    + sw.favorites * c.adjusted_raw_favorite
    + sw.shares * c.shares_norm
    + sw.replies * c.replies_norm
    + sw.danmaku * c.danmaku_norm
  );
  const conversionScore = 100 * (
    cw.likes_rate * c.adjusted_rate_like
    + cw.coins_rate * c.adjusted_rate_coin
    + cw.favorites_rate * c.adjusted_rate_favorite
    + cw.shares_rate * c.shares_rate_norm
    + cw.replies_rate * c.replies_rate_norm
    + cw.danmaku_rate * c.danmaku_rate_norm
  );
  return {
    code: entry.code,
    supportScore: round(supportScore, 2),
    conversionScore: round(conversionScore, 2),
    prediction_score: round(supportScore * preset.blend.supportScore + conversionScore * preset.blend.conversionScore, 2),
  };
}

function extractAppData(html) {
  const marker = '<script type="application/json" id="app-data">';
  const start = html.indexOf(marker);
  if (start < 0) throw new Error("app-data block not found");
  const dataStart = start + marker.length;
  const dataEnd = html.indexOf("</script>", dataStart);
  return html.slice(dataStart, dataEnd);
}

function injectAppData(html, payload) {
  const marker = '<script type="application/json" id="app-data">';
  const start = html.indexOf(marker);
  const dataStart = start + marker.length;
  const dataEnd = html.indexOf("</script>", dataStart);
  const json = JSON.stringify(payload).replaceAll("<", "\\u003c");
  return html.slice(0, dataStart) + json + html.slice(dataEnd);
}

function patchHtml(html) {
  let out = html;

  out = out.replace(
    "<title>歌影回战 S3 预赛 · 权重实时调参 · v13 Dark</title>",
    "<title>歌影回战 S3 决赛 · 权重实时调参 · v13 Dark</title>",
  );
  out = out.replace("<h1>权重实时调参</h1>", "<h1>决赛预测排名</h1>");
  out = out.replace(
    "<p class=\"hint\"><strong id=\"halfLabel\">上半场</strong> · 拖动滑块即时重算排名。滑块值为<strong>相对点数</strong>，每次拖动会自动归一化为 100% 权重，排名会立即变化。右侧百分比为<strong>晋级概率</strong>（sigmoid，以晋级线附近分数中点为基准），远离晋级线的条目会趋近 0% 或 100%。修改仅保存在浏览器内存。</p>",
    "<p class=\"hint\"><strong id=\"halfLabel\">决赛</strong> · 上下半场 85 首晋级作品合并排名。<strong>预设方案</strong>切换归一化口径（合并模式含上半场温和上架校准）。拖动<strong>综合分构成</strong>与<strong>指标权重</strong>即时重算。右侧百分比为<strong>组内胜率</strong>（同组 softmax 综合分，合计 100%）。名次变化以<strong>合并决赛归一化</strong>为参照。修改仅保存在浏览器内存。</p>",
  );
  out = out.replace(
    '<div class="half-toggle" id="sidebarHalfToggle" style="margin-bottom:12px">',
    '<div class="half-toggle" id="sidebarHalfToggle" style="display:none;margin-bottom:12px">',
  );
  out = out.replace(
    '<div class="half-toggle" id="halfToggle">',
    '<div class="half-toggle" id="halfToggle" style="display:none">',
  );
  out = out.replace(
    '      <label><input type="checkbox" id="moversOnly" /> 仅显示名次变化</label>\n      <label><input type="checkbox" id="advanceOnly" /> 仅显示预测晋级</label>\n      <label title="隐藏 B 站 qualified list 已晋级曲目，便于查看尚未晋级的作品"><input type="checkbox" id="hideConfirmed" /> 隐藏已晋级</label>\n      <label title="隐藏曲名与编号，避免录屏或直播时泄露预测"><input type="checkbox" id="hideEntryIdentity" /> 隐藏曲名编号</label>',
    '      <label><input type="checkbox" id="moversOnly" /> 仅显示名次变化</label>\n      <label title="隐藏曲名与编号，避免录屏或直播时泄露预测"><input type="checkbox" id="hideEntryIdentity" /> 隐藏曲名编号</label>',
  );
  out = out.replace(
    '      <label><input type="checkbox" id="moversOnly" /> 仅显示名次变化</label>\n      <label><input type="checkbox" id="advanceOnly" /> 仅显示预测晋级</label>\n      <label title="隐藏 B 站 qualified list 已晋级曲目，便于查看尚未晋级的作品"><input type="checkbox" id="hideConfirmed" /> 隐藏已晋级</label>',
    '      <label><input type="checkbox" id="moversOnly" /> 仅显示名次变化</label>\n      <label title="隐藏曲名与编号，避免录屏或直播时泄露预测"><input type="checkbox" id="hideEntryIdentity" /> 隐藏曲名编号</label>',
  );
  out = out.replace(
    '<div class="preset-row" id="presetButtons"></div>\n    </div>',
    '<div class="preset-row" id="presetButtons"></div>\n      <p class="hint" id="mergedCalNote" style="margin:8px 0 0;display:none"></p>\n    </div>',
  );
  out = out.replace(
    "  .btn:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(79, 70, 229, 0.25); }",
    "  .btn:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(79, 70, 229, 0.25); }\n  .btn.active { background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #fff; box-shadow: 0 6px 16px rgba(79, 70, 229, 0.35); }",
  );
  out = out.replace(
    "  body.dark .btn:hover { box-shadow: 0 6px 16px rgba(99, 102, 241, 0.25); }",
    "  body.dark .btn:hover { box-shadow: 0 6px 16px rgba(99, 102, 241, 0.25); }\n  body.dark .btn.active { background: linear-gradient(135deg, #4338ca, #6d28d9); color: #f8fafc; }",
  );

  const makeInitialStateOld = `function makeInitialState(dataSlice) {
  const presets = COMBINED ? RAW.presets : dataSlice.presets;
  const defaultKey = COMBINED ? RAW.defaultPreset : dataSlice.defaultPreset;
  const defaultPreset = presets[defaultKey];
  const groups = orderGroups([...new Set(dataSlice.entries.map((e) => e.group))]);
  return {
    blend: { ...defaultPreset.blend },
    supportPoints: pointsFromWeights(defaultPreset.support, SUPPORT_KEYS),
    conversionPoints: pointsFromWeights(defaultPreset.conversion, CONVERSION_KEYS),
    support: { ...defaultPreset.support },
    conversion: { ...defaultPreset.conversion },
    view: 'rankings',`;
  const makeInitialStateNew = `function finalsDefaultWeights(dataSlice) {
  return dataSlice.defaultWeights || {
    blend: dataSlice.metricPolicy?.finalBlend || { supportScore: 0.45, conversionScore: 0.55 },
    support: dataSlice.metricPolicy?.supportWeights || {},
    conversion: dataSlice.metricPolicy?.conversionWeights || {},
  };
}

function makeInitialState(dataSlice) {
  const presets = COMBINED ? RAW.presets : dataSlice.presets;
  const defaultKey = COMBINED ? RAW.defaultPreset : dataSlice.defaultPreset;
  const defaultPreset = dataSlice.seasonHalfKey === 'finals'
    ? finalsDefaultWeights(dataSlice)
    : presets[defaultKey];
  const groups = orderGroups([...new Set(dataSlice.entries.map((e) => e.group))]);
  return {
    blend: { ...defaultPreset.blend },
    supportPoints: pointsFromWeights(defaultPreset.support, SUPPORT_KEYS),
    conversionPoints: pointsFromWeights(defaultPreset.conversion, CONVERSION_KEYS),
    support: { ...defaultPreset.support },
    conversion: { ...defaultPreset.conversion },
    normMode: dataSlice.seasonHalfKey === 'finals' ? ((presets[defaultKey] || {}).normMode || 'per-half') : 'per-half',
    activePreset: dataSlice.seasonHalfKey === 'finals' ? (defaultKey || 'norm-per-half') : null,
    lottery: dataSlice.seasonHalfKey === 'finals' ? { activeCategory: 'A', tickets: [], nextId: 1, defaultStake: 10, betMode: 'single', parlayLegs: [] } : undefined,
    view: 'rankings',`;

  const applyPresetOld = `function applyPreset(key) {
  const p = (RAW.presets || DATA.presets)[key];
  if (!p) return;
  state.blend = { ...p.blend };
  state.supportPoints = pointsFromWeights(p.support, SUPPORT_KEYS);
  state.conversionPoints = pointsFromWeights(p.conversion, CONVERSION_KEYS);
  state.support = { ...p.support };
  state.conversion = { ...p.conversion };
  syncSlidersFromState();
  updateSums();
  rerender();
}`;
  const applyPresetNew = `function markActivePreset(key) {
  document.querySelectorAll('#presetButtons [data-preset]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.preset === key);
  });
}

function updateMergedCalNote() {
  const el = document.getElementById('mergedCalNote');
  if (!el || DATA.seasonHalfKey !== 'finals') return;
  const note = DATA.mergedAgeCalibration?.note || '';
  const show = state.normMode === 'merged' && note;
  el.style.display = show ? '' : 'none';
  el.textContent = show ? note : '';
}

function applyPreset(key) {
  const p = (RAW.presets || DATA.presets)[key];
  if (!p) return;
  if (DATA.seasonHalfKey === 'finals') {
    state.normMode = p.normMode || 'per-half';
    state.activePreset = key;
    markActivePreset(key);
    updateMergedCalNote();
    rerender();
    return;
  }
  state.blend = { ...p.blend };
  state.supportPoints = pointsFromWeights(p.support, SUPPORT_KEYS);
  state.conversionPoints = pointsFromWeights(p.conversion, CONVERSION_KEYS);
  state.support = { ...p.support };
  state.conversion = { ...p.conversion };
  syncSlidersFromState();
  updateSums();
  rerender();
}`;

  const scoreEntryOld = `function scoreEntry(entry) {
  const c = entry.components;
  const sw = state.support;
  const cw = state.conversion;`;
  const scoreEntryNew = `function entryComponents(entry) {
  if (DATA.seasonHalfKey === 'finals' && state.normMode === 'merged' && entry.componentsMerged) {
    return entry.componentsMerged;
  }
  return entry.components;
}

function scoreEntry(entry) {
  const c = entryComponents(entry);
  const sw = state.support;
  const cw = state.conversion;`;

  const rowPassesFiltersOld = `function rowPassesFilters(row) {
  const q = hideEntryIdentityEnabled() ? '' : document.getElementById('search').value.trim().toLowerCase();
  if (FINALS) {
    if (q && !(row.entry.code.toLowerCase().includes(q) || row.entry.title.toLowerCase().includes(q))) return false;
    return true;
  }
  const moversOnly = document.getElementById('moversOnly').checked;
  const advanceOnly = document.getElementById('advanceOnly').checked;
  if (hideConfirmedEnabled() && isConfirmedQualifier(row.entry.code)) return false;
  if (q && !(row.entry.code.toLowerCase().includes(q) || row.entry.title.toLowerCase().includes(q))) return false;
  if (advanceOnly && !row.advance) return false;
  if (moversOnly && !(row.deltaLocked && row.deltaLocked !== 0)) return false;
  return true;
}`;
  const rowPassesFiltersNew = `function rowPassesFilters(row) {
  const q = hideEntryIdentityEnabled() ? '' : document.getElementById('search').value.trim().toLowerCase();
  const moversOnly = document.getElementById('moversOnly').checked;
  const advanceOnly = document.getElementById('advanceOnly')?.checked === true;
  if (DATA.seasonHalfKey !== 'finals' && hideConfirmedEnabled() && isConfirmedQualifier(row.entry.code)) return false;
  if (q && !(row.entry.code.toLowerCase().includes(q) || row.entry.title.toLowerCase().includes(q))) return false;
  if (DATA.seasonHalfKey !== 'finals' && advanceOnly && !row.advance) return false;
  const moverDelta = DATA.seasonHalfKey === 'finals' ? row.deltaBaseline : row.deltaLocked;
  if (moversOnly && !(moverDelta && moverDelta !== 0)) return false;
  return true;
}`;

  const applyRowStateOld = `  const confirmed = isConfirmedQualifier(row.entry.code);
  el.className = ['row', confirmed ? 'confirmed-qual' : '', !tinted && row.advance ? 'advance' : '', row.cutoffLine ? 'cutoff' : ''].filter(Boolean).join(' ');`;
  const applyRowStateNew = `  const confirmed = DATA.seasonHalfKey !== 'finals' && isConfirmedQualifier(row.entry.code);
  el.className = ['row', confirmed ? 'confirmed-qual' : '', !tinted && row.advance ? 'advance' : '', row.cutoffLine ? 'cutoff' : ''].filter(Boolean).join(' ');`;

  const metaOld = `  if (FINALS) {
    const halfClass = row.entry.half === '上半场' ? 'pill confirmed' : 'pill up';
    metaEl.innerHTML = hideEntryIdentityEnabled()
      ? '<span class="' + halfClass + '">' + escapeHtml(row.entry.half || row.half || '') + '</span>'
      : '<span class="' + halfClass + '">' + escapeHtml(row.entry.half || row.half || '') + '</span>';
    if (tension.meta) metaEl.style.color = tension.meta;
  } else if (hideEntryIdentityEnabled()) {
    metaEl.innerHTML = (confirmed ? '<span class="pill confirmed">已晋级</span> · ' : '')
      + '默认4814 ' + deltaPill(row.deltaBaseline);
    if (tension.meta) metaEl.style.color = tension.meta;
  } else {
    metaEl.innerHTML = (confirmed ? '<span class="pill confirmed">已晋级</span> · ' : '')
      + 'Codex #' + (row.entry.locked_rank ?? '—') + ' ' + deltaPill(row.deltaLocked) + ' · 默认4814 ' + deltaPill(row.deltaBaseline);
    if (tension.meta) metaEl.style.color = tension.meta;
  }`;
  const metaNew = `  metaEl.innerHTML = hideEntryIdentityEnabled()
    ? (DATA.seasonHalfKey === 'finals'
      ? (escapeHtml(row.entry.half || '') + ' · 合并归一 ' + deltaPill(row.deltaBaseline))
      : ((confirmed ? '<span class="pill confirmed">已晋级</span> · ' : '') + '默认4814 ' + deltaPill(row.deltaBaseline)))
    : (DATA.seasonHalfKey === 'finals'
    ? (escapeHtml(row.entry.half || '') + ' · Codex #' + (row.entry.locked_rank ?? '—') + ' · 合并归一 ' + deltaPill(row.deltaBaseline))
    : ((confirmed ? '<span class="pill confirmed">已晋级</span> · ' : '')
    + 'Codex #' + (row.entry.locked_rank ?? '—') + ' ' + deltaPill(row.deltaLocked) + ' · 默认4814 ' + deltaPill(row.deltaBaseline)));
  if (tension.meta) metaEl.style.color = tension.meta;`;

  const headOld = `const headNote = FINALS ? ((DATA.groupStats[group]?.entryCount || rows.length) + ' 首') : ('晋级线 Top ' + cutoff);
    return '<div class="group-panel ' + panelClass + '" data-group="' + group + '"><div class="group-head"><h3>' + group + '</h3><span class="group-count" style="font-size:12px">' + headNote + '</span></div><div class="list">' + rows + '</div></div>';`;
  const headNew = `const headNote = DATA.seasonHalfKey === 'finals'
    ? ('决赛排名 · ' + (DATA.groupStats[group]?.entryCount || rows.length) + ' 首')
    : ('晋级线 Top ' + cutoff);
    return '<div class="group-panel ' + panelClass + '" data-group="' + group + '"><div class="group-head"><h3>' + group + '</h3><span class="group-count" style="font-size:12px">' + headNote + '</span></div><div class="list">' + rows + '</div></div>';`;

  const countOld = `  let countText = FINALS
    ? (visibleCodes.size + ' / ' + (DATA.groupStats[group]?.entryCount || rows.length) + ' 首')
    : ('晋级线 Top ' + cutoff + ' · 显示 ' + visibleCodes.size + ' 项');`;
  const countNew = `  let countText = DATA.seasonHalfKey === 'finals'
    ? ('决赛排名 · 显示 ' + visibleCodes.size + ' 项')
    : ('晋级线 Top ' + cutoff + ' · 显示 ' + visibleCodes.size + ' 项');`;

  const presetButtonsOld = `  document.getElementById('presetButtons').innerHTML = Object.entries(RAW.presets || DATA.presets).map(([key, p]) =>
    '<button class="btn" data-preset="' + key + '">' + p.label + '</button>'
  ).join('');
  document.getElementById('presetButtons').addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-preset]');
    if (btn) applyPreset(btn.dataset.preset);
  });`;
  const presetButtonsNew = `document.getElementById('presetButtons').innerHTML = Object.entries(RAW.presets || DATA.presets).map(([key, p]) =>
  '<button class="btn" data-preset="' + key + '">' + p.label + '</button>'
).join('');
document.getElementById('presetButtons').addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-preset]');
  if (btn) applyPreset(btn.dataset.preset);
});
if (DATA.seasonHalfKey === 'finals') {
  markActivePreset(state.activePreset || RAW.defaultPreset || DATA.defaultPreset || 'norm-per-half');
  updateMergedCalNote();
}`;

  const listenersOld = `if (FINALS) {
  document.getElementById('search').addEventListener('input', rerender);
} else {
  ['search', 'moversOnly', 'advanceOnly', 'hideConfirmed'].forEach(id => document.getElementById(id).addEventListener('input', rerender));
  document.getElementById('moversOnly').addEventListener('change', rerender);
  document.getElementById('advanceOnly').addEventListener('change', rerender);
  document.getElementById('hideConfirmed').addEventListener('change', rerender);
}`;
  const listenersNew = `['search', 'moversOnly'].forEach((id) => document.getElementById(id)?.addEventListener('input', rerender));
document.getElementById('moversOnly')?.addEventListener('change', rerender);
if (DATA.seasonHalfKey !== 'finals') {
  ['advanceOnly', 'hideConfirmed'].forEach((id) => document.getElementById(id)?.addEventListener('input', rerender));
  document.getElementById('advanceOnly')?.addEventListener('change', rerender);
  document.getElementById('hideConfirmed')?.addEventListener('change', rerender);
}`;

  const pkMetricOld = `'<div class="pk-metric"><div class="k">较默认4814</div><div class="v">' + (row.deltaBaseline == null ? '—' : deltaPill(row.deltaBaseline).replace(/<[^>]+>/g, '')) + '</div></div>' +`;
  const pkMetricNew = `'<div class="pk-metric"><div class="k">' + (DATA.seasonHalfKey === 'finals' ? '较合并归一' : '较默认4814') + '</div><div class="v">' + (row.deltaBaseline == null ? '—' : deltaPill(row.deltaBaseline).replace(/<[^>]+>/g, '')) + '</div></div>' +`;

  const scoreGroupOld = `function scoreGroupRows(group) {
  if (FINALS) {
    const finalsRows = RAW.finalsByGroup[group] || [];
    const entryByCode = Object.fromEntries(DATA.entries.filter((e) => e.group === group).map((e) => [e.code, e]));
    return finalsRows.map((row) => {
      const entry = entryByCode[row.code] || { code: row.code, title: '', half: row.half, group, views: 0 };
      return {
        entry,
        rank: row.rank,
        prediction_score: row.final_score,
        supportScore: row.peer_review_score,
        conversionScore: row.final_score,
        advanceProb: row.tensionPct,
        final_score: row.final_score,
        peer_review_score: row.peer_review_score,
        deltaLocked: null,
        deltaBaseline: null,
        advance: true,
        cutoffLine: false,
      };
    });
  }
  const cutoff = DATA.cutoffs[group] ?? 999;
  const rows = DATA.entries.filter(e => e.group === group).map(entry => {
    const scored = scoreEntry(entry);
    return { entry, ...scored };
  });
  rows.sort((a, b) => b.prediction_score - a.prediction_score || b.conversionScore - a.conversionScore || b.supportScore - a.supportScore || a.entry.code.localeCompare(b.entry.code, 'en'));
  const line = advancementLine(rows, cutoff);
  return rows.map((row, i) => {
    const rank = i + 1;
    const locked = row.entry.locked_rank;
    const deltaLocked = locked ? locked - rank : null;
    const baselineRank = DATA.baselineRanks[group]?.[row.entry.code] ?? null;
    const deltaBaseline = baselineRank ? baselineRank - rank : null;
    const advanceProb = advancementProbability(row.prediction_score, line);
    return { ...row, rank, deltaLocked, deltaBaseline, advance: rank <= cutoff, cutoffLine: rank === cutoff + 1, advanceProb };
  });
}`;
  const scoreGroupNew = `function groupWinProbabilities(rows) {
  if (!rows.length) return new Map();
  const scores = rows.map((row) => Number(row.prediction_score) || 0);
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  const temp = Math.max(2, (max - min) / 4);
  const weights = scores.map((score) => Math.exp((score - max) / temp));
  const sum = weights.reduce((a, b) => a + b, 0) || 1;
  return new Map(rows.map((row, i) => [row.entry.code, Math.round((weights[i] / sum) * 1000) / 10]));
}

function finalsPctLabel() {
  return DATA.seasonHalfKey === 'finals' ? '组内胜率' : '晋级概率';
}

function scoreGroupRows(group) {
  const cutoff = DATA.cutoffs[group] ?? 999;
  const rows = DATA.entries.filter(e => e.group === group).map(entry => {
    const scored = scoreEntry(entry);
    return { entry, ...scored };
  });
  rows.sort((a, b) => b.prediction_score - a.prediction_score || b.conversionScore - a.conversionScore || b.supportScore - a.supportScore || a.entry.code.localeCompare(b.entry.code, 'en'));
  const line = advancementLine(rows, cutoff);
  const winMap = DATA.seasonHalfKey === 'finals' ? groupWinProbabilities(rows) : null;
  return rows.map((row, i) => {
    const rank = i + 1;
    const locked = row.entry.locked_rank;
    const deltaLocked = locked ? locked - rank : null;
    const baselineRank = DATA.baselineRanks[group]?.[row.entry.code] ?? null;
    const deltaBaseline = baselineRank ? baselineRank - rank : null;
    const advanceProb = DATA.seasonHalfKey === 'finals'
      ? (winMap.get(row.entry.code) ?? 0)
      : advancementProbability(row.prediction_score, line);
    return { ...row, rank, deltaLocked, deltaBaseline, advance: rank <= cutoff, cutoffLine: rank === cutoff + 1, advanceProb };
  });
}`;

  const subElOld = `  subEl.textContent = '晋级概率 · 支持 ' + row.supportScore.toFixed(1) + ' · 转化 ' + row.conversionScore.toFixed(1);`;
  const subElNew = `  subEl.textContent = finalsPctLabel() + ' · 支持 ' + row.supportScore.toFixed(1) + ' · 转化 ' + row.conversionScore.toFixed(1);`;

  const pkProbOld = `'<div class="pk-metric"><div class="k">晋级概率</div><div class="v" style="color:' + tension.text + '">' + row.advanceProb.toFixed(1) + '%</div></div>' +`;
  const pkProbNew = `'<div class="pk-metric"><div class="k">' + finalsPctLabel() + '</div><div class="v" style="color:' + tension.text + '">' + row.advanceProb.toFixed(1) + '%</div></div>' +`;

  const apMetaOld = `'<div class="meta">晋级概率 ' + row.advanceProb.toFixed(1) + '% · 综合 ' + row.prediction_score.toFixed(1) + '</div></div>' +`;
  const apMetaNew = `'<div class="meta">' + finalsPctLabel() + ' ' + row.advanceProb.toFixed(1) + '% · 综合 ' + row.prediction_score.toFixed(1) + '</div></div>' +`;

  const rulesNoteOld = `+ '<p class="rules-note">「实时排名」右侧 <strong>晋级概率</strong> = S 型曲线（分数相对晋级线中点的距离），仅供可视化，非官方计分。</p>'`;
  const rulesNoteNew = `+ (DATA.seasonHalfKey === 'finals'
        ? '<p class="rules-note">「实时排名」右侧 <strong>组内胜率</strong> = 同组 softmax(综合分)，组内合计 100%，表示预测夺冠概率代理，非官方计分。</p>'
        : '<p class="rules-note">「实时排名」右侧 <strong>晋级概率</strong> = S 型曲线（分数相对晋级线中点的距离），仅供可视化，非官方计分。</p>')`;

  const replacements = [
    [makeInitialStateOld, makeInitialStateNew],
    [applyPresetOld, applyPresetNew],
    [scoreEntryOld, scoreEntryNew],
    [rowPassesFiltersOld, rowPassesFiltersNew],
    [applyRowStateOld, applyRowStateNew],
    [metaOld, metaNew],
    [headOld, headNew],
    [countOld, countNew],
    [presetButtonsOld, presetButtonsNew],
    [listenersOld, listenersNew],
    [pkMetricOld, pkMetricNew],
    [scoreGroupOld, scoreGroupNew],
    [subElOld, subElNew],
    [pkProbOld, pkProbNew],
    [apMetaOld, apMetaNew],
    [rulesNoteOld, rulesNoteNew],
  ];

  out = out.replace("<h2>晋级概率字体</h2>", "<h2>组内胜率字体</h2>");
  out = out.replace(
    "悬停行时生效，颜色跟随该格晋级概率。「主题覆层」模式下，有动画的曲目各自播放对应覆层。",
    "悬停行时生效，颜色跟随该格组内胜率。「主题覆层」模式下，有动画的曲目各自播放对应覆层。",
  );
  for (const [old, neu] of replacements) {
    if (!out.includes(old)) throw new Error(`finals HTML patch failed: missing ${old.slice(0, 40)}...`);
    out = out.replace(old, neu);
  }

  return out;
}

function patchAccountSystem(html) {
  let out = html;
  out = out.replace("</style>", `${authAccountCss()}\n</style>`);
  out = out.replace(
    '<main class="main">',
    `<main class="main">\n    ${authAccountHtml()}`,
  );
  out = out.replace(
    "updateSums();\nif (COMBINED) updateHalfChrome();\nelse updateConfirmedToggleVisibility();\nrerender();",
    `${authAccountJs()}\nacInit();\n\nupdateSums();\nif (COMBINED) updateHalfChrome();\nelse updateConfirmedToggleVisibility();\nrerender();`,
  );
  if (!out.includes("function acInit()")) {
    throw new Error("account system JS injection failed");
  }
  return out;
}

function patchFinalsLotteryTab(html) {
  let out = html;
  out = out.replace(
    '<button class="main-tab" data-view="approval">模拟票选</button>',
    '<button class="main-tab" data-view="lottery">福利彩票</button>',
  );
  out = out.replace(
    /<section class="main-view" id="view-approval">[\s\S]*?<\/section>\s*(?=<section class="main-view" id="view-major">)/,
    `${lotteryTabHtml()}\n    `,
  );
  if (!out.includes('id="view-lottery"')) {
    throw new Error("finals lottery tab HTML injection failed");
  }
  out = out.replace("</style>", `${lotteryTabCss()}\n</style>`);
  const switchViewOld = `  if (view === 'pk') renderPk();
  if (view === 'approval') renderApproval();
  if (view === 'major' && typeof mjRenderMajor === 'function') mjRenderMajor();
  if (view === 'rules') renderRules();`;
  const switchViewNew = `  if (view === 'pk') renderPk();
  if (view === 'lottery') renderLottery();
  if (view === 'approval') renderApproval();
  if (view === 'major' && typeof mjRenderMajor === 'function') mjRenderMajor();
  if (view === 'rules') renderRules();`;
  out = out.replace(switchViewOld, switchViewNew);
  const rerenderOld1 = `  if (DATA.includeApprovalTab && state.view === 'approval' && typeof renderApproval === 'function') renderApproval();`;
  const rerenderNew1 = `  if (DATA.includeLotteryTab && state.view === 'lottery') renderLottery();
  if (DATA.includeApprovalTab && state.view === 'approval' && typeof renderApproval === 'function') renderApproval();`;
  out = out.replace(rerenderOld1, rerenderNew1);
  const rerenderOld2 = `  if (DATA.includeApprovalTab && state.view === 'approval') renderApproval();`;
  const rerenderNew2 = `  if (DATA.includeLotteryTab && state.view === 'lottery') renderLottery();
  if (DATA.includeApprovalTab && state.view === 'approval') renderApproval();`;
  out = out.replace(rerenderOld2, rerenderNew2);
  out = out.replace(
    "function renderApproval() {",
    `${lotteryTabJs()}\nfunction renderApproval() {`,
  );
  if (!out.includes("function renderLottery()")) {
    throw new Error("finals lottery JS injection failed");
  }

  const apBootStart = "document.getElementById('apModeTabs').addEventListener('click', (ev) => {";
  const apBootEnd = "document.getElementById('apAudVoters').addEventListener('change', () => apRunAudience(false, AP_AUD_RERUN));\n\n\n";
  const apBootStartIdx = out.indexOf(apBootStart);
  const apBootEndIdx = out.indexOf(apBootEnd);
  if (apBootStartIdx < 0 || apBootEndIdx < 0) {
    throw new Error("finals approval boot guard patch failed");
  }
  out = `${out.slice(0, apBootStartIdx)}if (DATA.includeApprovalTab) {\n${out.slice(apBootStartIdx, apBootEndIdx + apBootEnd.length)}}${out.slice(apBootEndIdx + apBootEnd.length)}`;

  return out;
}

function cleanTitle(title) {
  return String(title ?? "").replace(/^【Y[CF]\d{3,4}】/, "").replace("【歌影回战S3】", "").trim();
}

function minmaxBy(rows, valueFn) {
  const values = rows.map(valueFn);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return (value) => (max === min ? 0 : (value - min) / (max - min));
}

function safeViews(row) { return Math.max(1, row.views); }
function num(v) { const n = Number(v); return Number.isFinite(n) ? n : 0; }
function round(v, d) { return Math.round(v * 10 ** d) / 10 ** d; }

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const n = text[i + 1];
    if (quoted) {
      if (c === '"' && n === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += c;
  }
  if (field || row.length) { row.push(field.replace(/\r$/, "")); rows.push(row); }
  const headers = rows.shift()?.map((h) => h.replace(/^\uFEFF/, "")) ?? [];
  return rows.filter((r) => r.some((x) => x !== "")).map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])));
}

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith("--")) continue;
    const key = argv[i].slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const next = argv[i + 1];
    parsed[key] = next && !next.startsWith("--") ? argv[++i] : true;
  }
  return parsed;
}