export type Lang = "en" | "zh";

export const T = {
  appName: { en: "ScamSense", zh: "防骗卫士 ScamSense" },
  tagline: {
    en: "Check anything suspicious in 5 seconds",
    zh: "5秒钟检查任何可疑信息",
  },
  navCheck: { en: "Check a message", zh: "检查信息" },
  navLibrary: { en: "Scam examples", zh: "骗局例子" },
  navFamily: { en: "Family dashboard", zh: "家人看板" },
  step1: { en: "Paste the suspicious message here", zh: "把可疑信息粘贴到这里" },
  orUpload: { en: "OR upload a screenshot", zh: "或者上传截图" },
  uploadButton: { en: "📷 Choose screenshot", zh: "📷 选择截图" },
  removeImage: { en: "✕ Remove", zh: "✕ 移除" },
  placeholder: {
    en: "Example: \"Your parcel is held at customs, pay $2.99 now...\"",
    zh: "例如：“您的包裹被海关扣留，请立即支付2.99元……”",
  },
  checkButton: { en: "🔍 CHECK NOW", zh: "🔍 立即检查" },
  checking: { en: "Checking... please wait", zh: "正在检查……请稍候" },
  verdictDanger: { en: "DANGER — very likely a scam", zh: "危险 — 极可能是骗局" },
  verdictCaution: { en: "BE CAREFUL — suspicious signs", zh: "请小心 — 有可疑迹象" },
  verdictSafe: { en: "LOOKS SAFE — no scam signs found", zh: "看起来安全 — 没有发现骗局迹象" },
  confidence: { en: "Confidence", zh: "把握程度" },
  tacticsTitle: { en: "⚠️ Tricks this message uses", zh: "⚠️ 这条信息使用的骗术" },
  adviceTitle: { en: "✅ What you should do now", zh: "✅ 您现在应该怎么做" },
  checkAnother: { en: "Check another message", zh: "检查另一条信息" },
  familyCodeLabel: {
    en: "Family code (optional) — alerts your family",
    zh: "家庭代码（可选）— 通知您的家人",
  },
  familyCodePlaceholder: { en: "e.g. TAN2026", zh: "例如 TAN2026" },
  errorGeneric: { en: "Something went wrong. Please try again.", zh: "出错了，请再试一次。" },
  errorEmpty: { en: "Please paste a message or upload a screenshot first.", zh: "请先粘贴信息或上传截图。" },
  libraryTitle: { en: "Real scam examples", zh: "真实骗局例子" },
  libraryIntro: {
    en: "Five real scam patterns. Tap one to see how ScamSense explains the tricks.",
    zh: "五种真实骗局。点一下就能看到防骗卫士如何拆解骗术。",
  },
  viewAnalysis: { en: "See the analysis", zh: "查看分析" },
  runLive: { en: "▶ Re-run live with AI", zh: "▶ 用AI实时重新分析" },
  theMessage: { en: "The message", zh: "骗局信息原文" },
  familyTitle: { en: "Family dashboard", zh: "家人看板" },
  familyIntro: {
    en: "See every check your parents ran, and get alerted when something dangerous appears. Enter your shared family code.",
    zh: "查看父母检查过的每一条信息，出现危险时第一时间知道。请输入你们共享的家庭代码。",
  },
  familyLoad: { en: "View checks", zh: "查看记录" },
  familyEmpty: {
    en: "No checks yet for this code. Run a check on the home page with this family code.",
    zh: "这个代码还没有记录。请在首页使用此家庭代码进行检查。",
  },
  familyRedAlert: { en: "dangerous message(s) detected", zh: "条危险信息" },
  statsChecked: { en: "messages checked", zh: "条信息已检查" },
  statsCaught: { en: "scams caught", zh: "个骗局被识破" },
  poweredBy: {
    en: "AI-powered. Catches NEW scams by their tactics — not just known bad numbers.",
    zh: "AI驱动。凭骗术模式识破新骗局——不只是拦截已知号码。",
  },
} as const;

export function t(key: keyof typeof T, lang: Lang): string {
  return T[key][lang];
}
