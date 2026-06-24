import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams, useNavigation  } from "@/router-dom";
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faDownload,
  faLocationDot,
  faWallet,
  faBriefcase,
  faPhone,
  faEnvelope,
  faTools,
  faUser,
  faEdit,
  faGraduationCap,
  faFileAlt,
  faShareAlt,
  faCheckCircle,
  faIndianRupeeSign,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import { FaClock } from 'react-icons/fa';
import Badge from 'react-bootstrap/Badge';

import Navbar from "../../components/header/recruitment-header";
import Footer from "../../components/footer/footer";
import axios from 'axios';
import { API_ENDPOINTS } from '../apiConfig';
import { Spinner } from "react-bootstrap";
import AuthorizationHeader from '../AuthorizationHeader';

const CandidateDetails = () => {
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidateDetails, setCandidateDetails] = useState(null);
  const [similarCandidates , setSimilarCandidates] = useState([]);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [hover, setHover] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [resumeLoading, setResumeLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginUserId, setLoginUserId] = useState(null);

  const [sharingEmail, setSharingEmail] = useState("");

  // parameter id from the URL
  const location = useLocation();
  const userId = location?.state?.userId;


  useEffect(() => {
            const authToken = localStorage.getItem('authToken');
            const user = authToken ? JSON.parse(authToken).users : null;
            if (user) {
                setLoginUserId(user.id || '');
            }
        }, []);


   // For sharing profile

  const encodedEmail = encodeURIComponent(sharingEmail);
  const baseUrl = `${window.location.origin}`;   // dynamic base frontend url
  const shareUrl = `${baseUrl}/profileShare/${encodedEmail}`; 


  const handleclick = () => {
    setIsLoading(true);
    window.scrollTo(0, 0);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  
  useEffect(() => {
    const fetchSimilarCandidates = async () => {
      try {
        const response = await AuthorizationHeader.get(API_ENDPOINTS.FETCHSIMILARUSERSLIST, {
          params: {
            id: userId,
          },
        });
        if (response.data.status === 200) {
          const candidates = response.data.data;
          setSimilarCandidates(candidates);

          const total = candidates.length;

          setTotalCandidates(total);
        } else {
          console.error(
            "Error fetching candidate details:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching candidate details:", error);
      }
    };

    fetchSimilarCandidates();
  }, [userId]);            


  useEffect(() => {
    const fetchCandidateDetails = async () => {
      try {
        const response = await AuthorizationHeader.get(API_ENDPOINTS.FETCHUSERPROFILE, {
          params: {
            id: userId
          }
        });

        if(response.data.status === 200) {
          setCandidateDetails(response.data.data);

          setSharingEmail(response?.data?.data?.email);
        } else {
          console.error('Error fetching candidate details:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching candidate details:', error);
      }
    };
    fetchCandidateDetails();
  }, [userId]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleResumeLoad = () => {
    setResumeLoading(false);
  };


  if (!candidateDetails) {
    return <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-center">
      <div className="text-xl">Loading candidate details...</div>
    </div>;
  }

  const forSaveResumeViews = async (id) => {
    
    // for fetching profile views
    if (loginUserId && id) {
          try {
            const response= await AuthorizationHeader.get(API_ENDPOINTS.SAVERESUMEVIEWS, {
                 params: {
                  profileId: id,  
                    viewedBy: loginUserId,            
                },
            });
          } catch (error) {
              console.error('Error logging profile view:', error);
          }
      }
  }

  return (
    <>
     {/* Background Blur when Loading */}
          {isLoading && (
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

      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side: Candidate Details */}
            <div className="lg:w-2/3">
                 <div className="flex bg-white justify-between items-center rounded-md shadow-sm mb-4 py-3 px-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {candidateDetails.fullName}'s Profile
              </h2>
              <div className="flex gap-3">
                {candidateDetails.resume ? (
                <a
                  href={`${API_ENDPOINTS.FETCHRESUME(candidateDetails.resume)}?forceDownload=true`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 text-white text-sm sm:text-base rounded hover:bg-green-700"
                  onClick={()=> forSaveResumeViews(candidateDetails.id)}
                >
                  <FontAwesomeIcon icon={faFileAlt} className="mr-1.5 sm:mr-2" />
                  Download Resume
                </a>
                 ) : (
                    <span className="text-gray-500 italic">Resume not available</span>
                  )}
              </div>
            </div>
              <div className="bg-white rounded-md shadow-sm mb-1 pt-5 pb-3 pl-2 pr-4">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Profile Image */}
                  <div className="md:w-1/4 flex flex-col items-center">
                    <div
                      className="relative w-32 h-32 rounded-full border overflow-hidden"
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                    >
                      {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                          <div className="animate-pulse rounded-full bg-gray-300 w-full h-full"></div>
                        </div>
                      )}
                      <img
                        src={
                          candidateDetails.profileImage
                            ? API_ENDPOINTS.FETCHIMAGE(
                                candidateDetails.profileImage
                              )
                            : "https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                        }
                        alt="Profile"
                        className={`w-full h-full object-cover ${
                          imageLoading ? "opacity-0" : "opacity-100"
                        }`}
                        onLoad={handleImageLoad}
                        onError={() => setImageLoading(false)}
                      />
                    </div>
                  </div>

                  {/* Candidate Information */}
                  <div className="md:w-3/4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {candidateDetails.fullName}
                    </h3>
                    <ul className="space-y-2 flex justify-between py-2 mb-2">
                      <li className="flex items-center">
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          className="text-gray-500 mr-2"
                        />
                        <span>
                          {candidateDetails.experiencePeriod || "0"} Years
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="text-gray-500 mr-2"
                        />
                        <span>
                          {candidateDetails.location ||
                            "Location not specified"}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FontAwesomeIcon
                          icon={faIndianRupeeSign}
                          className="text-gray-500 mr-2"
                        />
                        <span>
                          {candidateDetails.minsalary || "0"} -{" "}
                          {candidateDetails.maxsalary || "0"} Lakh
                        </span>
                      </li>
                    </ul>

                    <div className="max-w-2xl mx-auto py-2 mb-3">
                      <div className="flex items-start mb-1">
                        <div className="w-1/4 text-gray-500 font-semibold">
                          Current Status
                        </div>
                        <div className="w-3/4 flex items-center justify-between">
                          <p className="text-gray-600 text-sm">
                            <strong>
                              {candidateDetails.jobStatus ||
                                "Job status not specified"}
                            </strong>
                          </p>
                          {candidateDetails.noticePeriod && (
                            <div className="flex items-center">
                              <FaClock className="text-gray-400 mr-1" />
                              <p className="text-gray-500 text-sm">
                                {candidateDetails.noticePeriod}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-1/4 text-gray-500 font-semibold">
                          Highest Degree
                        </div>
                        <div className="w-3/4">
                          {candidateDetails.education &&
                          candidateDetails.education.length > 0 ? (
                            <p className="text-gray-600 text-sm">
                              <b>{candidateDetails.education[0].degree}</b>{" "}
                              {candidateDetails.education[0].university}
                            </p>
                          ) : (
                            <p className="text-gray-600 text-sm">
                              No education information provided
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <ul className="w-full flex justify-between mt-2">
                      <li className="flex items-center w-1/2 border-r">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="text-gray-500 mr-2"
                        />
                        <span>
                          {candidateDetails.phoneNo || "Phone not provided"}
                        </span>
                        {candidateDetails.verifiedMnumber && (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-green-500 ml-2"
                          />
                        )}
                      </li>
                      <li className="flex items-center">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="text-gray-500 mr-2"
                        />
                        <span>
                          {candidateDetails.email || "Email not provided"}
                        </span>
                        {candidateDetails.verifiedEmail && (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-green-500 ml-2"
                          />
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex justify-end items-center mt-5 gap-3">
                  {/* Call */}
                  <a
                    href={`tel:${candidateDetails.phoneNo}`}
                    className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                    title="Call"
                  >
                    <FaPhone size={20} />
                  </a>

                  {/* Email */}
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=${candidateDetails.email}`}
                    target='_blank'
                    className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    title="Email"
                  >
                    <FaEnvelope size={20} />
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${candidateDetails.phoneNo?.replace(/\+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                    title="WhatsApp"
                  >
                    <FaWhatsapp size={20} />
                  </a>
                </div>
              </div>
              <div className="flex justify-end">
                <p className="text-sm text-gray-500 pr-4 border-r">
                  Modified on: {new Date(candidateDetails.updatedAt).toLocaleDateString("en-GB")}
                </p>
                {/* <p className="text-sm ml-4 text-gray-500">
                  Last Active: {new Date().toLocaleDateString()}
                </p> */}
              </div>

              <div className="user-card bg-white rounded-md shadow-sm mb-4 mt-4">
                <h4 className="border-b py-3 text-xl font-bold px-3 flex items-center">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Profile Details
                </h4>

                <div className="sm:px-3 pb-4">
                  <div className="my-3">
                    <p className="user-card text-gray-600 py-2 min-h-20 flex items-center px-3 border-l-4 rounded-lg">
                      {candidateDetails.aboutMe ||
                        "No profile description provided"}
                    </p>
                  </div>

                  <div className="user-card mt-6">
                    <h4 className="border-b py-2 text-xl font-bold px-0 flex items-center">
                      <FontAwesomeIcon icon={faTools} className="mr-2" />
                      Key Skills
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {candidateDetails.skills &&
                      candidateDetails.skills.length > 0 ? (
                        candidateDetails.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            bg="light"
                            text="dark"
                            className="px-3 py-1 border"
                          >
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-gray-500">No skills listed</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="border-b py-2 text-xl font-bold px-0 flex items-center">
                      <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                      Experience
                    </h4>
                  

                   
                    {candidateDetails.userCategory === "fresher" ? (
                      <div className="user-card" style={{ minHeight: "200px" }}>
                        <h6>
                          <FontAwesomeIcon className="pro-icon" icon={faCode} />
                          Projects
                        </h6>
                        <ul className="user-content">
                          {candidateDetails.project &&
                          candidateDetails.project.length > 0 ? (
                            candidateDetails.project.map((project, index) => (
                              <li key={index}>
                                <h5 className="mt-1">{project.projectTitle}</h5>
                                <p>{project.projectLink}</p>
                                <p cl>
                                  {new Date(
                                    project.projectStartDate
                                  ).toLocaleDateString("en-GB")}{" "}
                                  -{" "}
                                  {new Date(
                                    project.projectEndDate
                                  ).toLocaleDateString("en-GB")}
                                </p>

                                <br />
                              </li>
                            ))
                          ) : (
                            <p>No projects added</p>
                          )}
                        </ul>
                      </div>
                    ) : (
                      <div className="user-card" style={{ minHeight: "200px" }}>
                        <h6>
                          <FontAwesomeIcon
                            className="pro-icon"
                            icon={faBriefcase}
                          />
                          Experience
                        </h6>
                        <ul className="user-content">
                          {candidateDetails.workExperience &&
                          candidateDetails.workExperience.length > 0 ? (
                            candidateDetails.workExperience.map(
                              (exp, index) => (
                                <li key={index}>
                                  <h5 className="mb-1">{exp.jobProfile}</h5>
                                  <p>{exp.companyName}</p>
                                  <p>
                                    {exp.jobStartDate || "N/A"} -{" "}
                                    {exp.jobEndDate || "Currently Working"}
                                  </p>
                                </li>
                              )
                            )
                          ) : (
                            <p>No experience added</p>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className=" user-card mt-6">
                    <h4 className="border-b py-2 text-xl font-bold px-0 flex items-center">
                      <FontAwesomeIcon
                        icon={faGraduationCap}
                        className="mr-2"
                      />
                      Education
                    </h4>
                    {candidateDetails.education &&
                    candidateDetails.education.length > 0 ? (
                      <ul className="mt-2 space-y-4">
                        {candidateDetails.education.map((edu, index) => (
                          <li key={index}>
                            <h5 className="font-medium">{edu.degree}</h5>
                            <p className="text-gray-600">{edu.university}</p>
                            <p className="text-gray-500 text-sm">
                              Specialization:{" "}
                              {edu.specialization || "Not specified"}
                            </p>
                            <p className="text-gray-500 text-sm">
                              Course Type: {edu.courseType || "Not specified"}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {edu.startDate} - {edu.endDate}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 mt-2">
                        No education information provided
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <h4 className="border-b py-2 text-xl font-bold px-0 flex items-center">
                      <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                      Resume
                    </h4>
                    <div className="user-card mt-2">
                      <div className="flex items-center justify-between">
                        <p>Uploaded Resume</p>
                        <div className="flex gap-2">
                          {candidateDetails.resume ? (
                          <a
                            href={`${API_ENDPOINTS.FETCHRESUME(candidateDetails.resume)}?forceDownload=true`}
                            rel="noopener noreferrer"
                            target="_blank"
                            title="Download Resume"
                            className="text-blue-600 hover:text-blue-800"
                            onClick={()=> forSaveResumeViews(candidateDetails.id)}
                          >
                            <FontAwesomeIcon icon={faDownload} />
                          </a>
                          ) : (
                            <FontAwesomeIcon
                              icon={faDownload}
                              title="Resume not available"
                              className="text-gray-400 cursor-not-allowed"
                            />
                          )}
                          <button
                            onClick={toggleModal}
                            title="View Full Page"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </div>
                      </div>
                      {candidateDetails.resume ? (
                        <div className="mt-4">
                          <div className="w-full h-[400px] border overflow-auto">
                            {resumeLoading && (
                              <div className="h-full flex items-center justify-center bg-gray-100">
                                <div className="animate-pulse text-gray-500">
                                  Loading resume preview...
                                </div>
                              </div>
                            )}
                            <iframe
                              src={`${API_ENDPOINTS.FETCHRESUME(candidateDetails.resume)}`}
                              rel="noopener noreferrer"
                              title="Resume Preview"
                              className={`w-full object-contain h-full ${
                                resumeLoading ? "hidden" : "block"
                              }`}
                              onLoad={handleResumeLoad}
                              onError={() => setResumeLoading(false)}
                            />
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 mt-2">
                          No resume available for preview
                        </p>
                      )}
                    </div>

                    {/* Modal for Full-Page Preview */}
                    {isModalOpen && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white w-full max-w-4xl h-[90vh] rounded-lg p-4 relative">
                          <button
                            onClick={toggleModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                          >
                            ✕
                          </button>
                          <div className="w-full h-full object-contain overflow-auto">
                            {candidateDetails.resume ? (
                              <>
                                {resumeLoading && (
                                  <div className="h-full flex items-center justify-center bg-gray-100">
                                    <div className="animate-pulse text-gray-500">
                                      Loading resume...
                                    </div>
                                  </div>
                                )}
                                <iframe
                                  src={`${API_ENDPOINTS.FETCHRESUME(
                                    candidateDetails.resume
                                  )}?forceDownload=true`}
                                  title="Resume Full Preview"
                                  className={`w-full h-full ${
                                    resumeLoading ? "hidden" : "block"
                                  }`}
                                  onClick={()=> forSaveResumeViews(candidateDetails.id)}
                                  onLoad={handleResumeLoad}
                                  onError={() => setResumeLoading(false)}
                                />
                              </>
                            ) : (
                              <p className="text-gray-500">
                                No resume available for preview
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Social Share */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FontAwesomeIcon icon={faShareAlt} className="mr-2" />
                  Share Profile
                </h4>
                 <div className="flex gap-4 mt-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/facebook-new.png"
                      alt="Facebook"
                      className="w-8 h-8"
                    />
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/linkedin.png"
                      alt="LinkedIn"
                      className="w-8 h-8"
                    />
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check+out+this+profile!`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/twitter--v1.png"
                      alt="Twitter"
                      className="w-8 h-8"
                    />
                  </a>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/whatsapp.png"
                      alt="WhatsApp"
                      className="w-8 h-8"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Related Candidates */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {totalCandidates} Related Candidates
                </h3>
                <div className="space-y-4">
                  {similarCandidates && similarCandidates.length > 0 ? (
                    similarCandidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                      >
                        <img
                          src={
                            candidate.profile_image
                              ? API_ENDPOINTS.FETCHIMAGE(
                                  candidate.profile_image
                                )
                              : "https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                          }
                          alt="Profile"
                          className={`w-12 h-12 rounded-full object-cover ${
                            imageLoading ? "opacity-0" : "opacity-100"
                          }`}
                        />

                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {candidate.full_name || "N/A"}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {candidate.job_profile || "N/A"}
                          </p>
                          <Link
                            to={`/candidateProfile`} state={{userId : candidate.id}} onClick={handleclick}
                            className="text-blue-600 hover:underline text-sm"
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No related candidates found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CandidateDetails;