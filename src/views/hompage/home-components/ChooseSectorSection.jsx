import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCode, faChartLine, faBullhorn, faStethoscope, 
  faGraduationCap, faGear, faArrowRight, faCoins, faHeadset 
} from "@fortawesome/free-solid-svg-icons";

const ChooseSectorSection = () => {
  const [topSectors, setTopSectors] = useState([]);

  const sectorStyleMap = {
    "IT & Software": { icon: faCode, color: "#3B82F6", shadow: "shadow-blue-100" },
    "Finance": { icon: faCoins, color: "#10B981", shadow: "shadow-emerald-100" },
    "Marketing": { icon: faBullhorn, color: "#6366F1", shadow: "shadow-indigo-100" },
    "Healthcare": { icon: faStethoscope, color: "#EF4444", shadow: "shadow-red-100" },
    "Education": { icon: faGraduationCap, color: "#F59E0B", shadow: "shadow-amber-100" },
    "Engineering": { icon: faGear, color: "#64748B", shadow: "shadow-slate-100" },
    "Sales": { icon: faChartLine, color: "#06B6D4", shadow: "shadow-cyan-100" },
    "Customer Service": { icon: faHeadset, color: "#D946EF", shadow: "shadow-pink-100" },
  };

  useEffect(() => {
    const data = [
      { id: "it", sector: "IT & Software", jobs: "1,240" },
      { id: "fin", sector: "Finance", jobs: "850" },
      { id: "mkt", sector: "Marketing", jobs: "620" },
      { id: "hc", sector: "Healthcare", jobs: "430" },
      { id: "edu", sector: "Education", jobs: "310" },
      { id: "eng", sector: "Engineering", jobs: "890" },
      { id: "sls", sector: "Sales", jobs: "1,100" },
      { id: "cs", sector: "Customer Service", jobs: "245" },
    ];
    setTopSectors(data);
  }, []);

  return (
    <section className="py-24 bg-[#FCFDFF]">
      <div className="container">
        
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl font-extrabold text-[#1E293B] mb-6 tracking-tight">
            Popular <span className="text-primary-blue relative">Categories
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-primary-blue/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
              </svg>
            </span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Choose your dream career from the best sectors. <br className="d-none d-md-block" /> 
            We've curated the most active job markets for you.
          </p>
        </div>

       
        <div className="row g-4">
          {topSectors.map((s, i) => {
            const style = sectorStyleMap[s.sector] || sectorStyleMap["IT & Software"];
            
            return (
              <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                <Link
                  to="/jobs-by-sector"
                  state={{ industry: s.sector }}
                  className="group relative block p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-primary-blue/30 transition-all duration-500 no-underline shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,0.15)] overflow-hidden"
                >
                 
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-50 rounded-full group-hover:bg-primary-blue/5 transition-colors duration-500" />

                 
                  <div 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[10deg]`}
                    style={{ backgroundColor: `${style.color}15`, color: style.color }}
                  >
                    <FontAwesomeIcon icon={style.icon} className="text-2xl" />
                  </div>
                  
                 
                  <div className="relative z-10">
                    <h5 className="text-[#1E293B] font-bold text-xl mb-2 group-hover:text-primary-blue transition-colors">
                      {s.sector}
                    </h5>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium text-sm">
                        {s.jobs} Jobs Available
                      </span>
                      <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-primary-blue group-hover:text-white group-hover:border-primary-blue transition-all duration-300">
                        <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ChooseSectorSection;