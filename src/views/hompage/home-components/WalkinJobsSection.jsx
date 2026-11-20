import React from "react";
import { Link } from "@/router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faChevronLeft,
  faChevronRight,
  faIndianRupeeSign,
  faLocationDot,
  faArrowRight,
  faCalendarCheck
} from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { API_ENDPOINTS } from "../../../views/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const WalkinJobsSection = ({ jobList }) => {
  return (
    <section className="bg-[#f0f4f8] py-20 overflow-hidden">
      <div className="container relative">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Walk-in <span className="text-[#07A1E3] relative">Drives
                <svg className="absolute -bottom-2 left-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="#07A1E3" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="text-gray-500 mt-3 font-medium">Direct interviews, no waiting. Catch them today!</p>
          </div>

          
          <div className="flex gap-3">
            <button className="walkin-prev w-12 h-12 rounded-2xl bg-white shadow-md text-gray-400 hover:bg-[#07A1E3] hover:text-white transition-all flex items-center justify-center border-0">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="walkin-next w-12 h-12 rounded-2xl bg-white shadow-md text-gray-400 hover:bg-[#07A1E3] hover:text-white transition-all flex items-center justify-center border-0">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

        
        <div className="relative px-2">
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            navigation={{ nextEl: ".walkin-next", prevEl: ".walkin-prev" }}
            modules={[Navigation, Pagination]}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1100: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {jobList.map((job, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-[40px] p-6 shadow-xl shadow-gray-200/50 border border-white hover:border-[#07A1E3]/30 transition-all duration-500 group relative overflow-hidden h-full">
                  
                
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-500"></div>

                 
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="w-20 h-20 bg-white rounded-3xl shadow-inner border border-gray-50 p-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {job.comp_logo ? (
                        <img
                          src={API_ENDPOINTS.FETCHIMAGE(job.comp_logo)}
                          alt="Logo"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-2xl font-black text-[#07A1E3]">{job.companyname?.charAt(0)}</div>
                      )}
                    </div>
                    <button className="text-gray-300 hover:text-red-500 transition-colors text-xl bg-transparent border-0 p-0">
                      <FontAwesomeIcon icon={faBookmark} />
                    </button>
                  </div>

                  
                  <div className="mb-6 relative z-10">
                    <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-3">
                      <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse"></span>
                      Active Drive
                    </div>
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-[#07A1E3] transition-colors leading-snug line-clamp-1">
                      {job.jobtitle}
                    </h3>
                    <p className="text-gray-400 font-bold text-sm uppercase tracking-tighter mt-1">
                      {job.companyname}
                    </p>
                  </div>

                  
                  <div className="grid grid-cols-1 gap-3 mb-8 relative z-10">
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#07A1E3] shadow-sm">
                        <FontAwesomeIcon icon={faIndianRupeeSign} className="text-xs" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold m-0 leading-none mb-1">SALARY PACKAGE</p>
                        <p className="text-sm font-black text-gray-700 m-0">₹{job.minimumsalary} - {job.MaximumSalary}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-orange-500 shadow-sm">
                        <FontAwesomeIcon icon={faLocationDot} className="text-xs" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-gray-400 font-bold m-0 leading-none mb-1">WALK-IN LOCATION</p>
                        <p className="text-sm font-black text-gray-700 m-0 truncate">{job.location}</p>
                      </div>
                    </div>
                  </div>

                  
                  <div className="flex items-center justify-between pt-5 border-t border-dashed border-gray-200 relative z-10">
                    <div className="flex items-center gap-2 text-gray-400 font-bold text-xs">
                      <FontAwesomeIcon icon={faCalendarCheck} className="text-[#07A1E3]" />
                      {new Date(job.job_posttime).toLocaleDateString("en-GB")}
                    </div>
                    <Link
                      to={`/applyjob/${job.id}`}
                      className="inline-flex items-center gap-2 bg-[#1A1C21] text-white px-5 py-2.5 rounded-2xl font-black text-sm hover:bg-[#07A1E3] transition-all no-underline shadow-lg shadow-gray-300"
                    >
                      Visit Now
                      <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        
        <div className="text-center mt-10">
          <Link 
            to="/JobListInterface" 
            className="group inline-flex items-center gap-4 text-gray-900 font-black no-underline hover:text-[#07A1E3] transition-colors"
          >
            <span className="text-lg">Discover all walk-in opportunities</span>
            <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:border-[#07A1E3] group-hover:translate-x-2 transition-all">
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WalkinJobsSection;