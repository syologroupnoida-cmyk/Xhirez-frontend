import React from "react";
import { Link } from "@/router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faChevronLeft,
  faChevronRight,
  faMapMarkerAlt,
  faIndianRupeeSign,
  faBriefcase,
  faCalendarDays
} from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { API_ENDPOINTS } from "../../../views/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const RemoteJobsSection = ({ jobList }) => {
  return (
    <section className="bg-bg-light-gray py-20">
      <div className="container">
       
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="text-left">
            <span className="text-primary-blue font-bold uppercase tracking-widest text-xs mb-2 block">
              Work From Anywhere
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-text-dark-gray leading-tight">
              Latest Remote <span className="text-primary-blue">Jobs</span>
            </h2>
          </div>
          
          
          <div className="flex gap-3">
            <button className="prev-btn w-12 h-12 rounded-full border-2 border-gray-200 text-text-dark-gray/70 hover:border-primary-blue hover:text-primary-blue hover:bg-white transition-all duration-300 flex items-center justify-center">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="next-btn w-12 h-12 rounded-full border-2 border-gray-200 text-gray-400 hover:border-primary-blue hover:text-primary-blue hover:bg-white transition-all duration-300 flex items-center justify-center">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

        <div className="relative">
          <Swiper
            spaceBetween={25}
            slidesPerView={3}
            navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
            modules={[Navigation]}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {jobList
              .filter((job) => job.jobtype === "Remote")
              .map((job, index) => (
                <SwiperSlide key={index} className="pb-10">
                 
                  <div className="bg-white rounded-[30px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-white hover:border-primary-blue/20 hover:shadow-[0_20px_40px_rgba(74,144,226,0.1)] transition-all duration-500 group">
                    
                   
                    <div className="flex justify-between items-center mb-6">
                      <div className="px-3 py-1 rounded-lg bg-secondary-teal/10 text-secondary-teal text-[10px] font-black uppercase tracking-wider">
                        Remote 
                      </div>
                      <button className="w-8 h-8 rounded-full bg-bg-light-gray text-text-dark-gray/50 hover:text-primary-blue hover:bg-primary-blue/10 transition-all">
                        <FontAwesomeIcon icon={faBookmark} className="text-sm" />
                      </button>
                    </div>

                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-bg-light-gray border border-bg-light-gray p-2 flex items-center justify-center overflow-hidden shrink-0 group-hover:bg-white transition-colors">
                        {job.comp_logo ? (
                          <img
                            src={API_ENDPOINTS.FETCHIMAGE(job?.comp_logo)}
                            alt="Logo"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-xl font-bold text-gray-300">{job.companyname?.charAt(0)}</div>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="text-xl font-bold text-[#1A1C21] truncate mb-1 group-hover:text-[#07A1E3] transition-colors">
                          {job.jobtitle}
                        </h3>
                        <p className="text-sm font-semibold text-gray-400 truncate uppercase tracking-tighter">
                          {job.companyname || "Anonymous"}
                        </p>
                      </div>
                    </div>

                    
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-gray-50">
                        <span className="text-[10px] text-gray-400 block mb-1 font-bold">SALARY</span>
                        <div className="text-sm font-black text-gray-700">
                          ₹{job.minimumsalary} - {job.MaximumSalary}
                        </div>
                      </div>
                      <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-gray-100">
                        <span className="text-[10px] text-gray-400 block mb-1 font-bold">LOCATION</span>
                        <div className="text-sm font-black text-gray-700 truncate">
                          {job.location}
                        </div>
                      </div>
                    </div>

                   
                    <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-200">
                      <Link
                        to={`/applyjob/${job.id}`}
                        className="flex items-center gap-2 text-[#07A1E3] font-extrabold hover:translate-x-1 transition-transform no-underline"
                      >
                        <FontAwesomeIcon icon={faTelegram} className="text-2xl" />
                        <span className="text-sm">Apply Now</span>
                      </Link>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-gray-300">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        {new Date(job?.job_posttime).toLocaleDateString("en-GB")}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        
        <div className="mt-4 text-center">
          <Link 
            to="/JobListInterface" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1A1C21] text-white font-bold rounded-2xl hover:bg-[#07A1E3] transition-all duration-300 shadow-xl shadow-gray-200 no-underline"
          >
            Explore More Remote Jobs
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RemoteJobsSection;