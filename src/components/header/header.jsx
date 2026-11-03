import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "@/router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const OFFERS = [
  "Post your first job for FREE – limited offer",
  "New: AI-powered resume builder is live!",
  "Download the app for real-time job alerts",
];

const JOB_MENU = [
  { name: "Browse all jobs", url: "/alljob" },
  { name: "Jobs by sector", url: "/jobs-by-sector" },
  { name: "Remote jobs", url: "/alljob?query=remote" },
];
const EMPLOYER_MENU = [
  { name: "Employer login", url: "/employer-login" },
  { name: "Recruiter sign up", url: "/recruiter/sign-up" },
  { name: "Hiring solutions", url: "/business" },
];
const LINKS = [
  { name: "Campus Buddy", url: "/campus-buddy" },
  { name: "She Can Code", url: "/Shecancode" },
  { name: "E-Campus", url: "/business" },
  { name: "Career Counselling", url: "/career-counselling" },
];

const Dropdown = ({ label, items }) => (
  <li className="xh-tb-drop">
    <button type="button" className="xh-tb-drop-btn">
      {label} <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: 11 }} />
    </button>
    <div className="xh-tb-drop-menu">
      {items.map((i) => (
        <Link key={i.name} to={i.url}>{i.name}</Link>
      ))}
    </div>
  </li>
);

const Header = () => {
  const [offer, setOffer] = useState(0);
  const [promoOpen, setPromoOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const t = setInterval(() => setOffer((p) => (p + 1) % OFFERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  // lets the hero (and other pages) shift up when the promo strip is closed
  useEffect(() => {
    document.documentElement.classList.toggle("xh-promo-hidden", !promoOpen);
    return () => document.documentElement.classList.remove("xh-promo-hidden");
  }, [promoOpen]);

  return (
    <div className="xh-tb-header">
      {promoOpen && (
        <div className="xh-tb-promo">
          <p className="xh-tb-promo-text">{OFFERS[offer]}</p>
          <Link to="/employer-login" className="xh-tb-promo-btn">Post a Job Free</Link>
          <button className="xh-tb-promo-close" onClick={() => setPromoOpen(false)} aria-label="Close offer">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}

      <nav className="xh-tb-nav">
        <Link to="/" className="xh-tb-logo">
          <img src="/assets/images/logo/Xhirez-Logo.png" alt="Xhirez" />
        </Link>

        <ul className="xh-tb-links">
          <Dropdown label="Jobs" items={JOB_MENU} />
          {LINKS.map((l) => (
            <li key={l.name}>
              <Link to={l.url} className={`xh-tb-link ${pathname === l.url ? "is-active" : ""}`}>{l.name}</Link>
            </li>
          ))}
          <Dropdown label="For Employers" items={EMPLOYER_MENU} />
        </ul>

        { /* puSees language / login / CTA to the right (replaces the search bar's spacing) */ }
        <div className="xh-tb-spacer" />

        <LanguageSwitcher />
        <Link to="/login" className="xh-tb-login">Login</Link>
        {<Link to="/signUp" className="xh-tb-btn-register">Register</Link> }
        <button className="xh-tb-burger" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
          <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="xh-tb-mobile">
          {[...JOB_MENU, ...LINKS, ...EMPLOYER_MENU, { name: "Login", url: "/login" }].map((l) => (
            <Link key={l.name} to={l.url} onClick={() => setMobileOpen(false)}>{l.name}</Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;