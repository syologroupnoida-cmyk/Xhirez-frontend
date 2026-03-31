import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSearch, 
  faArrowRight, 
  faCircleCheck,
  faArrowTrendUp
} from "@fortawesome/free-solid-svg-icons";

const BrowseJobsSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container">
        
        <div className="relative rounded-[60px] bg-[#0F172A] p-6 md:p-12 lg:p-16 shadow-[0_40px_100px_-15px_rgba(15,23,42,0.3)] border border-white/5 overflow-hidden">
          
          
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]"></div>

          <div className="row align-items-center g-5 relative z-10">
           
            <div className="col-lg-7">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                  <FontAwesomeIcon icon={faArrowTrendUp} className="text-blue-400 text-xs" />
                  <span className="text-blue-400 font-black text-[10px] uppercase tracking-[2px]">Real-time Opportunities</span>
                </div>

                <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-[1.1]">
                  Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 italic">10,000+</span> New Openings
                </h2>

                <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
                  We bridge the gap between your ambition and the world's leading companies. 
                  Our smart filters and personalized listings ensure you find a role that 
                  actually matches your lifestyle and goals.
                </p>

               
                <div className="grid grid-cols-2 gap-4 mb-12">
                  {['Verified Employers', 'Instant Apply', 'No Hidden Fees', 'Daily Updates'].map((text, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/80 font-bold text-sm">
                      <FontAwesomeIcon icon={faCircleCheck} className="text-blue-500" />
                      {text}
                    </div>
                  ))}
                </div>

                
                <div className="flex flex-wrap gap-5">
                  <button
                    className="group relative bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg font-black transition-all border-0 shadow-xl shadow-blue-500/20 overflow-hidden"
                    onClick={() => {
                      const section = document.getElementById("hero");
                      section?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Start Hunting <FontAwesomeIcon icon={faSearch} className="text-sm group-hover:scale-125 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </button>

                  <button className="flex items-center gap-3 text-white font-black hover:text-blue-400 transition-colors bg-transparent border-0 px-4">
                    View Salary Insights <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </button>
                </div>
              </div>
            </div>

            
            <div className="col-lg-5">
              <div className="relative">
                
                <div className="relative z-10 rounded-[50px] overflow-hidden border-[8px] border-white/5 shadow-2xl rotate-[-2deg] hover:rotate-0 transition-all duration-700 group">
                  <img 
                    src="assets/images/main/brows.jpg" 
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" 
                    alt="Success Career" 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                </div>

               
                <div className="absolute -top-6 -right-6 bg-white p-5 rounded-3xl shadow-2xl z-20 animate-bounce-slow hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <FontAwesomeIcon icon={faArrowTrendUp} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold m-0 uppercase">Growth Rate</p>
                      <p className="text-xl font-black text-gray-900 m-0">+24%</p>
                    </div>
                  </div>
                </div>

                
                <div className="absolute -bottom-10 -left-10 bg-[#1e293b] border border-white/10 p-5 rounded-3xl shadow-2xl z-20 hidden md:block">
                  <p className="text-white/60 text-xs font-bold mb-2">Popular Roles This Week</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-white text-[10px] font-bold tracking-wider">#TECH</span>
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-white text-[10px] font-bold tracking-wider">#SALES</span>
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-white text-[10px] font-bold tracking-wider">#MARKETING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .rounded-[60px] { border-radius: 60px; }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};

export default BrowseJobsSection;