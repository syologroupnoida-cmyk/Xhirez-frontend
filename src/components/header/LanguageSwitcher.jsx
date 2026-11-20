import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "mr", label: "मराठी (Marathi)" },
  { code: "gu", label: "ગુજરાતી (Gujarati)" },
  { code: "bn", label: "বাংলা (Bengali)" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "te", label: "తెలుగు (Telugu)" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "ur", label: "اردو (Urdu)" },
];

const getCurrentLang = () => {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  return m ? m[1] : "en";
};

const setLangCookie = (code) => {
  const host = window.location.hostname;
  if (code === "en") {
    const past = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = `googtrans=; ${past}; path=/`;
    document.cookie = `googtrans=; ${past}; path=/; domain=${host}`;
  } else {
    document.cookie = `googtrans=/en/${code}; path=/`;
    document.cookie = `googtrans=/en/${code}; path=/; domain=${host}`;
  }
};

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const ref = useRef(null);

  // Load Google Translate once (hidden widget does the real work)
  useEffect(() => {
    setLang(getCurrentLang());
    if (document.getElementById("gt-script")) return;

    window.googleTranslateInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
    };
    const s = document.createElement("script");
    s.id = "gt-script";
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const choose = (code) => {
    setLangCookie(code);
    setOpen(false);
    window.location.reload(); // Google Translate applies the cookie on load
  };

  return (
    <div className="xh-lang notranslate" ref={ref}>
      <div id="google_translate_element" style={{ display: "none" }} />
      <button
        type="button"
        className="xh-lang-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        aria-expanded={open}
      >
        <span className="xh-lang-text">Lang</span>
        <FontAwesomeIcon icon={faChevronDown} className="xh-lang-chev" />
      </button>

      {open && (
        <div className="xh-lang-menu">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              className={`xh-lang-item ${lang === l.code ? "is-active" : ""}`}
              onClick={() => choose(l.code)}
            >
              <span>{l.label}</span>
              {lang === l.code && <FontAwesomeIcon icon={faCheck} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;