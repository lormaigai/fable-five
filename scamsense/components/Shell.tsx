"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { t, type Lang } from "@/lib/i18n";

const LangContext = createContext<Lang>("en");

export function useLang(): Lang {
  return useContext(LangContext);
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("scamsense-lang");
    if (saved === "zh" || saved === "en") setLang(saved);
  }, []);

  function toggleLang() {
    const next: Lang = lang === "en" ? "zh" : "en";
    setLang(next);
    localStorage.setItem("scamsense-lang", next);
  }

  const links = [
    { href: "/", label: t("navCheck", lang) },
    { href: "/library", label: t("navLibrary", lang) },
    { href: "/family", label: t("navFamily", lang) },
  ];

  return (
    <LangContext.Provider value={lang}>
      <div className="container">
        <div className="topbar">
          <Link href="/" className="brand">
            🛡️ Scam<span>Sense</span>
          </Link>
          <button className="lang-toggle" onClick={toggleLang} aria-label="Switch language">
            {lang === "en" ? "中文" : "English"}
          </button>
        </div>
        <nav className="nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={pathname === l.href ? "active" : ""}>
              {l.label}
            </Link>
          ))}
        </nav>
        {children}
        <p className="footnote">{t("poweredBy", lang)}</p>
      </div>
    </LangContext.Provider>
  );
}
