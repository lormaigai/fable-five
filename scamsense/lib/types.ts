export type Verdict = "danger" | "caution" | "safe";

export interface Bilingual {
  en: string;
  zh: string;
}

export interface Tactic {
  name: Bilingual;
  explanation: Bilingual;
}

export interface AnalysisResult {
  verdict: Verdict;
  confidence: number; // 0-100
  scamType: Bilingual;
  headline: Bilingual;
  tactics: Tactic[];
  advice: Bilingual[];
}

export interface CheckRecord {
  id: string;
  familyCode: string;
  verdict: Verdict;
  scamTypeEn: string;
  headlineEn: string;
  headlineZh: string;
  snippet: string;
  source: "web" | "telegram" | "library";
  createdAt: string;
}
