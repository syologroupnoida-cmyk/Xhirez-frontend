import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faPaperPlane, faBookmark, faUserCheck, faMapMarkerAlt, faSuitcase, faUserTie, faGraduationCap, faIndianRupee, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faWhatsapp, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Navbar from "../../components/header/seekerlogin";
import Footer from "../../components/footer/footer";
import { Link } from 'react-router-dom';
import { API_BASE_URL, API_ENDPOINTS } from "../apiConfig";
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import AuthorizationHeader from "../AuthorizationHeader";

const JobShare = () => {

const navigate = useNavigate();

  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authData = localStorage.getItem("authToken");
  const user = authData ? JSON.parse(authData).users : null;
  const email = user ? user.email : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch job details based on the ID
  useEffect(() => {
    setLoading(true);
    axios.get(API_ENDPOINTS.FETCHJOBBYID(id))
      .then((response) => {
        if (response.data.status === 200) {
          setJob(response.data.data);
        } else {
          setError("Failed to fetch job details.");
        }
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        setError("Failed to fetch job details. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Function to handle Apply Job button click
  const handleApplyJob = async () => {

        if (!email) {
        toast.error("Please Login! For Apply to this Job");
        
        setTimeout(() => {
            navigate("/login");
        }, 2000);

        return; 
        }
        
    setLoading(true);
    try {
      const response = await AuthorizationHeader.get(API_ENDPOINTS.JOBAPPLY, {
        params: {
          email: email,
          jobId: id,
        },
      });
      if (response.data.status === 200) {
        toast.success("Job applied successfully!");
      } else {
        toast.error("Already Applied.");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate time ago
  const timeAgo = (date) => {
    if (!date) return "Unknown";
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    return `${seconds} seconds ago`;
  };

  // Function to handle Bookmark Job button click
  const handleBookmarkJob = async () => {
    setLoading(true);
    try {
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SAVEBOOKMARK, {
        params: {
          user_id: user?.id,
          job_id: id,
        },
      });
      if (response.data.status === 200) {
        toast.success("Job bookmarked successfully!");
      } else {
        toast.error("Already Bookmarked.");
      }
    } catch (error) {
      console.error("Error bookmarking job:", error);
      toast.error("An error occurred while bookmarking the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background Blur when Loading */}
      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backdropFilter: "blur(3px)",
            background: "rgba(255, 255, 255, 0.1)",
            zIndex: 3,
          }}
        >
          <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
        </div>
      )}

      {/* <Navbar /> */}
      <div className="bg-[#F8FAFC] pb-8 pt-1">
        <div className="container mt-0 pt-4">
          <div className="row">
            <div className="flex flex-col lg:flex-row">
              {/* Left Column */}
              <div className="w-full lg:w-1/6 sm:w-1/4 md:w-1/5 rounded-md h-full sm:h-auto max-h-full p-2 flex-1 overflow-y-none sm:overflow-y-auto scrollbar-hide">
                <div className="sm:h-34 h-44 border rounded-lg flex bg-white items-start sm:items-center relative mb-3 p-3 text-black">
                  <div className="flex items-center justify-start">
                    {job?.comp_logo ? (
                      <img
                        className="w-24 h-24 rounded-xl bg-gray-50 p-1"
                        src={API_ENDPOINTS.FETCHIMAGE(job.comp_logo)}
                        alt="Profile"
                        style={{ width: '130px', height: '80px', borderRadius: '10%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        className="w-24 h-24 rounded-xl bg-gray-50 p-4"
                        style={{
                          width: '100px',
                          height: '100px',
                          borderRadius: '50%',
                          backgroundColor: '#f0f0f0',
                          fontSize: '2rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {job?.companyName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="text-black pl-4">
                    <h2 className="text-xl font-semibold">{job?.industry}</h2>
                    <div className="flex items-center space-x-4 mt-2">
                      <FontAwesomeIcon icon={faBuilding} className="text-gray-700 text-sm pr-1" />
                      <span className="text-sm m-0">{job?.companyName}</span>
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-600 text-sm pr-1" />
                      <span className="text-sm m-0">{job?.location || "N/A"}</span>
                    </div>
                  </div>
                  <div className="flex sm:flex-col absolute left-4 right-4 sm:right-8 top-24 sm:top-6 items-end justify-between ml-0 sm:ml-4 mt-5">
                    <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={handleApplyJob}>
                      <FontAwesomeIcon className="mr-2" icon={faPaperPlane} />
                      Apply Job
                    </button>
                    {/* <div className="flex sm:flex-row flex-col items-end sm:items-center mt-[13px]">
                      <h6 className="text-lg mr-2">Share job:</h6>
                      <div className="flex space-x-4">
                        <Link to="https://www.facebook.com" target="_blank" className="bg-[#E7F1FD] flex items-center justify-center text-center p-3 w-8 h-8 rounded-full" rel="noopener noreferrer">
                          <FontAwesomeIcon className="text-blue-600 text-xl hover:text-blue-700" icon={faFacebookF} />
                        </Link>
                        <Link to="https://twitter.com" target="_blank" className="bg-[#E7F1FD] flex items-center justify-center text-center p-3 w-8 h-8 rounded-full" rel="noopener noreferrer">
                          <FontAwesomeIcon className="text-blue-400 bg-[#E7F1FD] text-xl hover:text-blue-500" icon={faTwitter} />
                        </Link>
                        <Link to="https://wa.me" target="_blank" className="bg-[#E9FAEF] flex items-center justify-center text-center p-3 w-8 h-8 rounded-full" rel="noopener noreferrer">
                          <FontAwesomeIcon className="text-green-600 bg-[#E7F1FD] text-xl hover:text-green-700" icon={faWhatsapp} />
                        </Link>
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* Job Description */}
                <div className="mb-3">
                  <h3 className="text-lg font-semibold py-2">Job Description:</h3>
                  <p className="text-gray-700">{job?.description || "N/A"}</p>
                </div>

                {/* Key Skills */}
                <div className="mb-5 mt-2">
                  <h3 className="text-lg font-semibold py-2 mt-3">Key Skills:</h3>
                  <div className="grid grid-cols-3 my-2 sm:grid-cols-3 md:grid-cols-6 gap-1">
                    {job?.skills
                      ? job.skills.split(",").map((skill, index) => (
                          <div key={index} className="text-center bg-slate-100 rounded-3xl p-2">
                            <h3 className="text-sm font-semibold font-medium">{skill.trim()}</h3>
                          </div>
                        ))
                      : "No skills defined"}
                  </div>
                </div>

                {/* Responsibilities and Duties */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2 mt-4">Responsibilities and Duties</h2>
                  <ul className="list-inside list-disc text-gray-700 space-y-2">
                    {job?.description.split(".").map((point, index) => (
                      point.trim() && <li key={index}>{point.trim()}</li>
                    ))}
                  </ul>
                </div>

                {/* Experience */}
                <div className="border-b pb-4">
                  <h2 className="text-lg font-semibold mb-2 mt-4">Experience:</h2>
                  <ul className="list-inside list-disc text-gray-700 space-y-2">
                    <li>
                      {job?.minExperience != null
                        ? `${job.minExperience}${job.minExperience !== 1 ? " years" : ""}`
                        : "N/A"} 
                      - 
                      {job?.maxExperience != null
                        ? `${job.maxExperience}${job.maxExperience !== 1 ? " years" : ""}`
                        : "N/A"}
                    </li>
                  </ul>
                </div>

                {/* Apply Job and Share Job Buttons */}
                <section className="sm:flex block justify-between items-center py-4 px-0 sm:px-6">
                  <div className="flex space-x-4 sm:mt-0 mb-3">
                    <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={handleApplyJob}>
                      <FontAwesomeIcon className="mr-2" icon={faPaperPlane} />
                      Apply Job
                    </button>
                    <button className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700" onClick={handleBookmarkJob}>
                      <FontAwesomeIcon className="mr-2" icon={faBookmark} />
                      Save Job
                    </button>
                  </div>
                  {/* <div className="flex itemskeyboard_arrow_down items-center">
                    <h6 className="text-lg mr-4">Share this job:</h6>
                    <div className="flex space-x-4">
                      <Link to="https://www.facebook.com" target="_blank" className="bg-[#E7F1FD] flex items-center justify-center text-center p-3 w-8 h-8 rounded-full" rel="noopener noreferrer">
                        <FontAwesomeIcon className="text-blue-600 text-xl hover:text-blue-700" icon={faFacebookF} />
                      </Link>
                      <Link to="https://twitter.com" target="_blank" className="bg-[#E7F1FD] flex items-center justify-center text-center p-3 w-8 h-8 rounded-full" rel="noopener noreferrer">
                        <FontAwesomeIcon className="text-blue-400 bg-[#E7F1FD] text-xl hover:text-blue-500" icon={faTwitter} />
                      </Link>
                      <Link to="https://wa.me" target="_blank" className="bg-[#E9FAEF] flex items-center justify-center text-center p-3 w-8 h-8 rounded-full" rel="noopener noreferrer">
                        <FontAwesomeIcon className="text-green-600 bg-[#E7F1FD] text-xl hover:text-green-700" icon={faWhatsapp} />
                      </Link>
                    </div>
                  </div> */}
                </section>
              </div>

              {/* Right Column: Job Information */}
              <div className="w-full h-full lg:w-1/4 p-1">
                <div className="bg-white border rounded-lg text-black">
                  <h3 className="py-3 px-4 border-b text-xl font-semibold text-[#05A2E4]">Job Information</h3>
                  <ul>
                    <li className="flex px-3 py-3">
                      <div className="flex items-center border-r">
                        <FontAwesomeIcon className="w-10 text-gray-500 text-xl" icon={faUserCheck} />
                      </div>
                      <div className="pl-3">
                        <h6 className="text-[15px] text-gray-600">Employee Type:</h6>
                        <p className="text-[#05A2E4]">{job?.jobType || "N/A"}</p>
                      </div>
                    </li>
                    <li className="flex px-3 py-3">
                      <div className="flex items-center border-r">
                        <FontAwesomeIcon className="w-10 text-gray-500 text-xl" icon={faMapMarkerAlt} />
                      </div>
                      <div className="pl-3">
                        <h6 className="text-[15px] text-gray-600">Location:</h6>
                        <p className="text-[#05A2E4]">{job?.location || "N/A"}</p>
                      </div>
                    </li>
                    <li className="flex px-3 py-3">
                      <div className="flex items-center border-r">
                        <FontAwesomeIcon className="w-10 text-gray-500 text-xl" icon={faSuitcase} />
                      </div>
                      <div className="pl-3">
                        <h6 className="text-[15px] text-gray-600">Job Type:</h6>
                        <p className="text-[#05A2E4]">{job?.industry || "N/A"}</p>
                      </div>
                    </li>
                    <li className="flex px-3 py-3">
                      <div className="flex items-center border-r">
                        <FontAwesomeIcon className="w-10 text-gray-500 text-xl" icon={faUserTie} />
                      </div>
                      <div className="pl-3">
                        <h6 className="text-[15px] text-gray-600">Experience:</h6>
                        <p className="text-[#05A2E4]">
                          {job?.minExperience != null && job?.maxExperience != null
                            ? `${job.minExperience.toString().includes("years") ? job.minExperience : job.minExperience + ""} - ${job.maxExperience.toString().includes("years") ? job.maxExperience : job.maxExperience + " years"}`
                            : "N/A"}
                        </p>
                      </div>
                    </li>
                    <li className="flex px-3 py-3">
                      <div className="flex items-center border-r">
                        <FontAwesomeIcon className="w-10 text-gray-500 text-xl" icon={faGraduationCap} />
                      </div>
                      <div className="pl-3">
                        <h6 className="text-[15px] text-gray-600">Qualifications:</h6>
                        <p className="text-[#05A2E4]">
                          {job?.qualification
                            ? job.qualification.split(",").map(q => q.trim()).join(", ")
                            : "N/A"}
                        </p>
                      </div>
                    </li>
                    <li className="flex px-3 py-3">
                      <div className="flex items-center border-r">
                        <FontAwesomeIcon className="w-10 text-gray-500 text-xl" icon={faIndianRupee} />
                      </div>
                      <div className="pl-3">
                        <h6 className="text-[15px] text-gray-600">Salary:</h6>
                        <p className="text-[#05A2E4]">₹ {job?.minimumSalary || "N/A"} - ₹ {job?.MaximumSalary || "N/A"}</p>
                      </div>
                    </li>
                    <li className="flex px-3 py-3">
                      <div className="flex items-center border-r">
                        <FontAwesomeIcon className="w-10 text-gray-500 text-xl" icon={faCalendarAlt} />
                      </div>
                      <div className="pl-3">
                        <h6 className="text-[15px] text-gray-600">Date posted:</h6>
                        <p className="text-[#05A2E4]">{job?.job_posttime || "N/A"}</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Company Information */}
                <div className="border rounded-lg bg-white px-3 py-3 mt-8">
                  <div className="widget-content">
                    <div className="company-title flex items-center mb-6">
                      <div className="company-logo w-30 h-14 mr-4">
                        {job?.comp_logo ? (
                          <img
                            className="w-100 h-24 rounded-xl bg-gray-50 p-1"
                            src={API_ENDPOINTS.FETCHIMAGE(job.comp_logo)}
                            alt="Profile"
                            style={{ width: '200px', height: '80px', borderRadius: '10%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div
                            className="w-24 h-24 rounded-xl bg-gray-50 p-1"
                            style={{ width: '130px', height: '80px', borderRadius: '10%', backgroundColor: '#f0f0f0', fontSize: '2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            {job?.companyName?.charAt(0).toUpperCase() || "?"}
                          </div>
                        )}
                      </div>
                      <div>
                        <h5 className="company-name text-xl font-semibold">{job?.companyName || "N/A"}</h5>
                        <Link to={job?.website_url || "#"} target="_blank" className="profile-link text-blue-600 hover:text-blue-800">View company profile</Link>
                      </div>
                    </div>
                    <ul className="company-info space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-700">Primary industry:</span>
                        <span className="text-gray-500">{job?.industry || "N/A"}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-700">Total Vacancy:</span>
                        <span className="text-gray-500">{job?.totalVacancies || "N/A"} vacancy</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-700">Founded in:</span>
                        <span className="text-gray-500">{job?.publish_year || "N/A"}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-700">Phone:</span>
                        <span className="text-gray-500">{job?.contact_no || "N/A"}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-700">Email:</span>
                        <span className="text-gray-500">{job?.email || "N/A"}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-700">Location:</span>
                        <span className="text-gray-500">{job?.location || "N/A"}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Social media:</span>
                        <div className="social-links flex space-x-4 mt-2">
                          <Link to={job?.facebook_url || "N/A"} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookF} className="text-blue-600 hover:text-blue-800 text-xl" />
                          </Link>
                          <Link to={job?.twitter_link || "N/A"} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} className="text-blue-400 hover:text-blue-500 text-xl" />
                          </Link>
                          <Link to={job?.insta_url || "N/A"} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} className="text-pink-600 hover:text-pink-700 text-xl" />
                          </Link>
                          <Link to={job?.linkedIn_url || "N/A"} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedinIn} className="text-blue-700 hover:text-blue-800 text-xl" />
                          </Link>
                        </div>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-700">Website:</span>
                        <Link to={job?.website_url || "N/A"} target="_blank" rel="noopener noreferrer" className="text-gray-500">
                          {job?.website_url || "N/A"}
                        </Link>
                      </li>
                    </ul>
                    <div className="btn-box w-full mt-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-right" />
    </>
  );
};

export default JobShare;