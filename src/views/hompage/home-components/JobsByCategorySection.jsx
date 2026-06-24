import React from "react";
import { Link } from "@/router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faSuitcase,
  faHeart,
  faClock,
  faArrowRight,
  faChevronRight,
  faIndianRupeeSign,
  faBolt
} from "@fortawesome/free-solid-svg-icons";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import { API_ENDPOINTS } from "../../../views/apiConfig";

const JobsByCategorySection = ({ jobList }) => {
  const categories = [
    { title: "IT & Software", keywords: ["Software", "Developer", "Engineer", "IT", "Tech"] },
    { title: "Sales & Marketing", keywords: ["Sales", "Marketing", "Business Development"] },
    { title: "Finance", keywords: ["Financial", "Accountant", "Investment", "Tax"] },
    { title: "Human Resources", keywords: ["HR", "Recruitment", "Talent", "Payroll"] },
    { title: "Others", keywords: [] },
  ];

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <Container>
       
        <div className="text-center mb-16">
          <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 d-inline-block">
            Recommendations
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Hot <span className="text-blue-500">Jobs</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Explore personalized opportunities curated based on your interests and skills.
          </p>
        </div>

        <div className="job-category-tabs">
          <Tabs defaultActiveKey="IT & Software" id="modern-job-tabs" className="mb-12 justify-content-center border-0">
            {categories.map((category) => (
              <Tab 
                eventKey={category.title} 
                title={category.title} 
                key={category.title}
              >
                <Row className="g-4">
                  {(() => {
                    const filteredJobs = jobList.filter((job) => {
                      const title = job.jobtitle?.toLowerCase() || "";
                      if (category.title === "Others") {
                        const allKeywords = categories.flatMap(c => c.keywords);
                        return !allKeywords.some(kw => title.includes(kw.toLowerCase()));
                      }
                      return category.keywords.some((kw) => title.includes(kw.toLowerCase()));
                    });

                    return filteredJobs.length > 0 ? (
                      <>
                        {filteredJobs.slice(0, 6).map((job) => (
                          <Col lg={4} md={6} key={job.id}>
                            <div className="bg-white rounded-[32px] p-4 border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 group h-full d-flex flex-column">
                              
                              
                              <div className="d-flex justify-content-between align-items-start mb-4">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl p-2 d-flex align-items-center justify-center border border-gray-50 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                                  <img
                                    src={job.comp_logo ? API_ENDPOINTS.FETCHIMAGE(job.comp_logo) : "https://via.placeholder.com/150"}
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="w-9 h-9 rounded-xl bg-gray-50 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all border-0">
                                      <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                </div>
                              </div>

                              
                              <div className="mb-4">
                                <h5 className="text-xl font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                                  {job.jobtitle}
                                </h5>
                                <div className="d-flex align-items-center gap-2 mb-3">
                                  <span className="text-sm font-bold text-blue-500">{job.companyname}</span>
                                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                  <span className="text-xs font-bold text-gray-400 d-flex align-items-center gap-1">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {job.location}
                                  </span>
                                </div>

                                
                                <div className="d-flex flex-wrap gap-2">
                                  <div className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl text-[12px] font-black d-flex align-items-center gap-1">
                                    <FontAwesomeIcon icon={faIndianRupeeSign} className="text-[10px]" />
                                    {job.minimumsalary || "Best"} - {job.MaximumSalary || "Market"}
                                  </div>
                                  <div className="bg-gray-50 text-gray-500 px-3 py-1.5 rounded-xl text-[12px] font-black">
                                    {job.jobtype}
                                  </div>
                                </div>
                              </div>

                            
                              <div className="mt-auto pt-4 border-t border-gray-50 d-flex align-items-center justify-between">
                                <div className="d-flex align-items-center gap-1.5 text-[11px] font-black text-gray-400 uppercase tracking-wider">
                                  <FontAwesomeIcon icon={faClock} className="text-blue-400" />
                                  {job.job_posttime || "Now"}
                                </div>
                                <Link 
                                  to={`/applyjob/${job.id}`} 
                                  className="w-10 h-10 bg-blue-600 text-white rounded-xl d-flex items-center justify-center hover:bg-black transition-all shadow-lg shadow-blue-200"
                                >
                                  <FontAwesomeIcon icon={faArrowRight} />
                                </Link>
                              </div>
                            </div>
                          </Col>
                        ))}

                        <Col xs={12} className="text-center mt-12">
                          <Link to="/JobListInterface" className="group d-inline-flex align-items-center gap-3 bg-white px-8 py-3 rounded-2xl border-2 border-gray-100 text-gray-900 font-black no-underline hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">
                            Show me everything in {category.title}
                            <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full d-flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
                            </div>
                          </Link>
                        </Col>
                      </>
                    ) : (
                      <Col xs={12} className="text-center py-5">
                        <div className="bg-white border-2 border-dashed border-gray-200 rounded-[40px] py-16">
                          <FontAwesomeIcon icon={faBolt} className="text-4xl text-gray-200 mb-4" />
                          <p className="text-gray-400 font-black h4 mb-0">No active openings right now.</p>
                        </div>
                      </Col>
                    );
                  })()}
                </Row>
              </Tab>
            ))}
          </Tabs>
        </div>
      </Container>

      <style>{`
        #modern-job-tabs .nav-link { 
          background: transparent !important;
          border: none !important;
          color: #64748b !important;
          font-weight: 800 !important;
          font-size: 15px !important;
          padding: 12px 24px !important;
          position: relative !important;
          transition: all 0.3s ease !important;
        }
        #modern-job-tabs .nav-link.active {
          color: #3b82f6 !important;
        }
        #modern-job-tabs .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 20%;
          right: 20%;
          height: 4px;
          background: #3b82f6;
          border-radius: 10px;
        }
        #modern-job-tabs { border-bottom: 2px solid #f1f5f9 !important; }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default JobsByCategorySection;