import React from "react";
import { Link } from "@/router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faChevronLeft,
  faChevronRight,
  faLocationDot,
  faIndianRupeeSign,
  faCalendarDays,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../../../views/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const RemoteJobsSection = ({ jobList }) => {
  return (
    <section className="xh-jb-section">
      <div className="container">
        <div className="xh-jb-head">
          <div className="xh-jb-head-text">
            <span className="xh-jb-eyebrow">Work From Anywhere</span>
            <h2 className="xh-jb-title">
              Latest Remote <span>Jobs</span>
            </h2>
          </div>
          <div className="xh-jb-arrows">
            <button className="prev-btn xh-jb-arrow" aria-label="Previous">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="next-btn xh-jb-arrow" aria-label="Next">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

        <div className="relative">
          <Swiper
            centerInsufficientSlides={true}
            spaceBetween={28}
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
                <SwiperSlide key={index} className="xh-jb-slide">
                  <article className="xh-jb-card">
                    <span className="xh-jb-bar" />

                    <div className="xh-jb-top">
                      <span className="xh-jb-tag"><i /> Remote</span>
                      <button className="xh-jb-save" aria-label="Save job">
                        <FontAwesomeIcon icon={faBookmark} />
                      </button>
                    </div>

                    <div className="xh-jb-main">
                      <div className="xh-jb-logo">
                        {job.comp_logo ? (
                          <img src={API_ENDPOINTS.FETCHIMAGE(job?.comp_logo)} alt="Logo" />
                        ) : (
                          <b>{job.companyname?.charAt(0)}</b>
                        )}
                      </div>
                      <div className="xh-jb-info">
                        <h3>{job.jobtitle}</h3>
                        <p>{job.companyname || "Anonymous"}</p>
                      </div>
                    </div>

                    <div className="xh-jb-meta">
                      <div className="xh-jb-chip">
                        <span className="xh-jb-chip-ic xh-jb-ic-green"><FontAwesomeIcon icon={faIndianRupeeSign} /></span>
                        <div>
                          <small>SALARY</small>
                          <strong>₹{job.minimumsalary} - {job.MaximumSalary}</strong>
                        </div>
                      </div>
                      <div className="xh-jb-chip">
                        <span className="xh-jb-chip-ic xh-jb-ic-blue"><FontAwesomeIcon icon={faLocationDot} /></span>
                        <div>
                          <small>LOCATION</small>
                          <strong>{job.location}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="xh-jb-foot">
                      <span className="xh-jb-date">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        {new Date(job?.job_posttime).toLocaleDateString("en-GB")}
                      </span>
                      <Link to={`/applyjob/${job.id}`} className="xh-jb-apply">
                        Apply Now <FontAwesomeIcon icon={faArrowRight} />
                      </Link>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div className="xh-jb-more">
          <Link to="/JobListInterface" className="xh-jb-more-btn">
            Explore More Remote Jobs
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RemoteJobsSection;