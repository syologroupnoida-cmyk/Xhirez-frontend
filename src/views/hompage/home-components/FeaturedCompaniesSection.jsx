import React, { useState } from "react";
import { Link } from "@/router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const COLORS = ["#2563eb", "#f97316", "#10b981", "#8b5cf6", "#ef4444", "#0ea5e9"];
const TINTS = ["#f4f7fb", "#fff8f1", "#f3fbf7", "#f7f5ff", "#fff5f5", "#f1f9ff"];

/*
  SAMPLE DATA - replace with your real companies / API.
  logo : optional. Put a real logo URL or a file from /public, e.g.
         "/assets/images/companies/tech-corp.png"
         If it is empty or fails to load, the built-in logo mark is shown.
  mark : which built-in logo mark to use as the fallback (chip, globe, nova, care, peak, bolt)
*/
const COMPANIES = [
  { name: "Tech Corp", rating: "3.8", reviews: "5K+", tagline: "Leader in digital product engineering.", logo: "", mark: "chip" },
  { name: "Global Soft", rating: "3.0", reviews: "3K+", tagline: "Where passion changes lives.", logo: "", mark: "globe" },
  { name: "Nova Systems", rating: "3.6", reviews: "46K+", tagline: "Global professional services firm.", logo: "", mark: "nova" },
  { name: "Care Labs", rating: "2.9", reviews: "3", tagline: "We aim to simplify the business of care.", logo: "", mark: "care" },
  { name: "Apex Labs", rating: "4.0", reviews: "12K+", tagline: "Building technology that moves people.", logo: "", mark: "peak" },
  { name: "Spark Labs", rating: "3.9", reviews: "800+", tagline: "Fast-growing startup with big ideas.", logo: "", mark: "bolt" },
];

/* Built-in logo marks (original simple shapes, white on the brand colour) */
const MARKS = {
  chip: (
    <>
      <rect x="18" y="18" width="28" height="28" rx="6" fill="none" stroke="#fff" strokeWidth="4" />
      <rect x="27" y="27" width="10" height="10" rx="2" fill="#fff" />
      <path d="M26 12v6M38 12v6M26 46v6M38 46v6M12 26h6M12 38h6M46 26h6M46 38h6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  globe: (
    <>
      <circle cx="32" cy="32" r="18" fill="none" stroke="#fff" strokeWidth="4" />
      <ellipse cx="32" cy="32" rx="8" ry="18" fill="none" stroke="#fff" strokeWidth="3" />
      <path d="M14 32h36" stroke="#fff" strokeWidth="3" />
    </>
  ),
  nova: (
    <path d="M32 10l5.5 16.5L54 32l-16.5 5.5L32 54l-5.5-16.5L10 32l16.5-5.5z" fill="#fff" />
  ),
  care: (
    <>
      <path d="M26 14h12v12h12v12H38v12H26V38H14V26h12z" fill="#fff" />
    </>
  ),
  peak: (
    <>
      <path d="M10 50L28 16l10 18 6-10 10 26z" fill="#fff" />
    </>
  ),
  bolt: (
    <path d="M36 8L16 36h14l-4 20 22-30H34z" fill="#fff" />
  ),
};

function CompanyLogo({ company, color }) {
  const [failed, setFailed] = useState(false);
  const showImage = company.logo && !failed;

  return (
    <div
      style={{
        width: 64,
        height: 64,
        margin: "0 auto 16px",
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: showImage ? "#fff" : color,
        border: showImage ? "1px solid #e5e9f0" : "none",
      }}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }}
        />
      ) : MARKS[company.mark] ? (
        <svg viewBox="0 0 64 64" width="64" height="64" role="img" aria-label={`${company.name} logo`}>
          {MARKS[company.mark]}
        </svg>
      ) : (
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 26 }}>{company.name.charAt(0)}</span>
      )}
    </div>
  );
}

/* Inline styles on purpose: Bootstrap's .p-5 / .w-* utilities clash with Tailwind here */
const S = {
  section: { background: "#fff", padding: "24px 0 64px" },
  wrap: { maxWidth: 1240, margin: "0 auto", padding: "0 16px" },
  title: { textAlign: "center", fontSize: 30, fontWeight: 800, color: "#1b2430", margin: "0 0 28px" },
  card: { height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", textAlign: "center", background: "#fff", border: "1px solid #e5e9f0", borderRadius: 16, padding: "20px 18px 22px" },
  nameBox: { borderRadius: 12, padding: "14px 10px", marginBottom: 16 },
  name: { fontWeight: 800, color: "#1b2430", fontSize: 16 },
  meta: { fontSize: 14, color: "#6b7685", marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  tag: { flex: 1, fontSize: 15, lineHeight: 1.35, color: "#3b4452", margin: "0 0 18px" },
  btn: { display: "inline-block", alignSelf: "center", padding: "10px 32px", borderRadius: 999, background: "#eaf1ff", color: "#1f5eff", fontWeight: 700, textDecoration: "none" },
  arrow: { position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "1px solid #e5e9f0", boxShadow: "0 4px 14px rgba(15,23,42,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#3b4452", cursor: "pointer", padding: 0 },
  prev: { left: -8 },
  next: { right: -8 },
};

const FeaturedCompaniesSection = () => (
  <section style={S.section}>
    {/* arrow hover + hide an arrow when there is nothing more to scroll */}
    <style>{`
      .feat-co-prev:hover, .feat-co-next:hover { background: #f4f7ff !important; color: #1f5eff !important; }
      .feat-co-prev.swiper-button-disabled, .feat-co-next.swiper-button-disabled { opacity: 0; pointer-events: none; }
    `}</style>
    <div style={S.wrap}>
      <h2 style={S.title}>Featured companies actively hiring</h2>

      <div style={{ position: "relative" }}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{ nextEl: ".feat-co-next", prevEl: ".feat-co-prev" }}
          breakpoints={{
            0: { slidesPerView: 1.15 },
            640: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4.2 },
          }}
          style={{ paddingBottom: 6 }}
        >
          {COMPANIES.map((c, i) => (
            <SwiperSlide key={c.name} style={{ height: "auto" }}>
              <div style={S.card}>
                <CompanyLogo company={c} color={COLORS[i % COLORS.length]} />

                <div style={{ ...S.nameBox, background: TINTS[i % TINTS.length] }}>
                  <div style={S.name}>{c.name}</div>
                  <div style={S.meta}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <FontAwesomeIcon icon={faStar} style={{ color: "#fbbf24", fontSize: 12 }} />
                      <b style={{ color: "#3b4452" }}>{c.rating}</b>
                    </span>
                    <span style={{ width: 1, height: 12, background: "#d5dce4" }} />
                    <span>{c.reviews} reviews</span>
                  </div>
                </div>

                <p style={S.tag}>{c.tagline}</p>

                <Link to={`/alljob?query=${encodeURIComponent(c.name)}`} style={S.btn}>
                  View jobs
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="feat-co-prev" style={{ ...S.arrow, ...S.prev }} aria-label="Previous">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="feat-co-next" style={{ ...S.arrow, ...S.next }} aria-label="Next">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  </section>
);

export default FeaturedCompaniesSection;