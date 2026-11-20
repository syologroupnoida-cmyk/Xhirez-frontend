import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

const EXPERIENCE = [
  { label: "Fresher", value: "0" },
  { label: "1 - 2 years", value: "1-2" },
  { label: "3 - 5 years", value: "3-5" },
  { label: "6 - 10 years", value: "6-10" },
  { label: "10+ years", value: "10+" },
];

/* Outline icons (same look as the reference) */
const SearchIcon = () => (
  <svg className="xh-hr-ic" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b4a6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg className="xh-hr-ic" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7a7a88" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><line x1="3" y1="13" x2="21" y2="13" />
  </svg>
);
const PinIcon = () => (
  <svg className="xh-hr-ic" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7a7a88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

/* Illustration (inline SVG, no external image needed) */
const HeroArt = () => (
  <svg className="xh-hr-art" viewBox="0 0 520 440" role="img" aria-label="Job search illustration">
    <circle cx="270" cy="220" r="190" fill="#e3ecf1" />
    <rect x="90" y="110" width="270" height="190" rx="14" fill="#fff" stroke="#cfdde6" />
    <rect x="90" y="110" width="270" height="30" rx="14" fill="#1e7f66" />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(110 ${160 + i * 44})`}>
        <circle cx="14" cy="14" r="14" fill="#e8f1ee" />
        <rect x="38" y="4" width="130" height="8" rx="4" fill="#9fb3c4" />
        <rect x="38" y="18" width="90" height="7" rx="3.5" fill="#cfdce6" />
        <rect x="200" y="6" width="56" height="20" rx="10" fill="#e3f3ec" />
      </g>
    ))}
    <rect x="330" y="200" width="150" height="110" rx="12" fill="#fff" stroke="#cfdde6" />
    <polyline points="345,285 380,255 405,270 440,230 468,215" fill="none" stroke="#1e7f66" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="400" cy="340" r="42" fill="none" stroke="#1f5eff" strokeWidth="10" />
    <line x1="430" y1="370" x2="470" y2="410" stroke="#1f5eff" strokeWidth="12" strokeLinecap="round" />
    <rect x="130" y="330" width="90" height="62" rx="10" fill="#ff7a45" />
    <rect x="158" y="318" width="34" height="18" rx="6" fill="none" stroke="#ff7a45" strokeWidth="8" />
    <rect x="130" y="354" width="90" height="6" fill="#e8622d" />
    <polygon points="420,90 450,60 470,100" fill="#8ec9ff" />
    <circle cx="90" cy="90" r="10" fill="#ffd166" />
  </svg>
);

const HeroSection = ({
  query,
  location,
  handleInputChange,
  handlePostChange,
  handleSearch,
  detectLocation,
  keywords = [],
  setQuery,
}) => {
  const [experience, setExperience] = useState("");

  return (
    <section id="hero" className="xh-hr">
      <div className="xh-hr-inner">
        <div className="xh-hr-left">
          <p className="xh-hr-eyebrow">One Destination for</p>
          <h1 className="xh-hr-title">Jobs, Skills &amp; Career Growth</h1>

          <div className="xh-hr-steps">
            <span>Search</span><i /><span>Apply</span><i /><span>Get Hired</span><i /><span>Succeed</span>
          </div>

          <p className="xh-hr-sub">Find your next opportunity. For free!</p>

          {/* Search bar (same as reference) */}
          <form
            className="xh-hr-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(experience);
            }}
          >
            {/* 1. skills */}
            <div className="xh-hr-field xh-hr-field-skills">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search jobs by 'skills'"
                value={query}
                onChange={handleInputChange}
                aria-label="Search jobs by skills"
              />
            </div>

            {/* 2. experience */}
            <div className="xh-hr-field xh-hr-field-exp">
              <BriefcaseIcon />
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                aria-label="Your experience"
                required
              >
                <option value="" disabled hidden>Experience</option>
                {EXPERIENCE.map((x) => (
                  <option key={x.value} value={x.value}>{x.label}</option>
                ))}
              </select>
              <FontAwesomeIcon icon={faChevronDown} className="xh-hr-chev" />
            </div>

            {/* 3. area / city */}
            <div className="xh-hr-field xh-hr-field-loc">
              <PinIcon />
              <input
                type="text"
                placeholder="Search for a city"
                value={location}
                onChange={handlePostChange}
                aria-label="Search for a city"
              />
              <button
                type="button"
                className="xh-hr-loc"
                onClick={detectLocation}
                aria-label="Detect my location"
              >
                <FontAwesomeIcon icon={faLocationCrosshairs} />
              </button>
            </div>

            <button type="submit" className="xh-hr-btn">Search jobs</button>
          </form>

          <div className="xh-hr-chips">
            {keywords.slice(0, 4).map((kw) => (
              <button key={kw} type="button" className="xh-hr-chip" onClick={() => setQuery(kw)}>
                {kw}
              </button>
            ))}
          </div>
        </div>

        <HeroArt />
      </div>
    </section>
  );
};

export default HeroSection;