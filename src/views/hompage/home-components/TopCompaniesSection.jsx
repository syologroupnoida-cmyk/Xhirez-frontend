import React from "react";
import { Link } from "@/router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const COLORS = ["#2563eb", "#f97316", "#10b981", "#8b5cf6", "#ef4444", "#0ea5e9"];

// SAMPLE DATA - replace with your real companies / API
const GROUPS = [
  { title: "MNCs", hiring: "2.3K+", query: "MNC", companies: ["Tech Corp", "Global Soft", "Nova Systems", "Apex Labs"] },
  { title: "Fintech", hiring: "144", query: "Fintech", companies: ["Pay Wave", "Coin Base", "Fin Cloud", "Cash Flow"] },
  { title: "FMCG & Retail", hiring: "186", query: "Retail", companies: ["Fresh Mart", "Daily Needs", "Shop Hub", "Value Store"] },
  { title: "Startups", hiring: "755", query: "Startup", companies: ["Spark Labs", "Next Idea", "Build It", "Launch Pad"] },
  { title: "Edtech", hiring: "170", query: "Edtech", companies: ["Learn Hub", "Skill Up", "Study Wave", "Edu Path"] },
];

/* Inline styles on purpose: Bootstrap's .p-5 / .w-* utilities clash with Tailwind here */
const S = {
  section: { background: "#fff", padding: "40px 0 24px" },
  wrap: { maxWidth: 1240, margin: "0 auto", padding: "0 16px" },
  title: { textAlign: "center", fontSize: 30, fontWeight: 800, color: "#1b2430", margin: "0 0 28px" },
  card: { display: "block", height: "100%", boxSizing: "border-box", background: "#fff", border: "1px solid #e5e9f0", borderRadius: 16, padding: "20px 20px 22px", textDecoration: "none", color: "inherit", transition: "all .2s" },
  head: { display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 800, color: "#1b2430" },
  sub: { fontSize: 14, color: "#6b7685", margin: "6px 0 16px" },
  logos: { display: "flex", gap: 8, flexWrap: "nowrap" },
  tile: { width: 52, height: 52, flex: "0 0 52px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 18 },
  next: { position: "absolute", right: -8, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "1px solid #e5e9f0", boxShadow: "0 4px 14px rgba(15,23,42,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#3b4452", cursor: "pointer" },
};

const TopCompaniesSection = () => (
  <section style={S.section}>
    <div style={S.wrap}>
      <h2 style={S.title}>Top companies hiring now</h2>

      <div style={{ position: "relative" }}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{ nextEl: ".top-co-next", prevEl: ".top-co-prev" }}
          breakpoints={{
            0: { slidesPerView: 1.15 },
            640: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4.2 },
          }}
          style={{ paddingBottom: 6 }}
        >
          {GROUPS.map((g, gi) => (
            <SwiperSlide key={g.title} style={{ height: "auto" }}>
              <Link to={`/alljob?query=${encodeURIComponent(g.query)}`} style={S.card}>
                <div style={S.head}>
                  {g.title}
                  <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 11, color: "#6b7685" }} />
                </div>
                <p style={S.sub}>{g.hiring} are actively hiring</p>
                <div style={S.logos}>
                  {g.companies.map((c, ci) => (
                    <div key={c} title={c} style={{ ...S.tile, background: COLORS[(gi + ci) % COLORS.length] }}>
                      {c.charAt(0)}
                    </div>
                  ))}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="top-co-next" style={S.next} aria-label="Next">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  </section>
);

export default TopCompaniesSection;