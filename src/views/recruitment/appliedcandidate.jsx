import React, { useState, useEffect } from 'react';
import { useParams } from "@/router-dom";
import axios from 'axios';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaDownload,
  FaCalendarAlt,
  FaRegClipboard,
  FaBookmark,
  FaIndustry,
  FaBuilding,
  FaFilePdf
} from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Navbar from '../../components/header/recruitment-header';
import Footer from '../../components/footer/footer';
import { API_ENDPOINTS } from '../apiConfig';
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import AuthorizationHeader from '../AuthorizationHeader';

const ApplicantsPage = () => {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const user = authToken ? JSON.parse(authToken).users : null;
        if (user) {
            setUserId(user.id || null);
        }
    }, []);

    useEffect(() => {
        if (jobId) {
            fetchApplicants(jobId);
        }
    }, [jobId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchApplicants = async (jobId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await AuthorizationHeader.get(API_ENDPOINTS.APPLICANTLISTBYID, {
                params: { id: jobId },
            });
            if (response.data && response.data.data) {
                setApplicants(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching applicants:', error);
            setError('Failed to fetch applicants. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = async (applicant) => {
      if (userId && applicant.user_id) {
          try {
            const response= await AuthorizationHeader.get(API_ENDPOINTS.SAVEPROFILEVIEW, {
                   params: {
                    profileId: applicant.user_id,  // ✅ Applicant's actual user ID
                      viewedBy: userId,               // ✅ Logged-in user ID
                  },
              });
          } catch (error) {
              console.error('Error logging profile view:', error);
          }
      }
      setSelectedApplicant(applicant);
  };

  const handleBookmarkUser = async (applicant) => {
    if (userId && applicant.user_id) {
        try {
            const response = await AuthorizationHeader.get(API_ENDPOINTS.SAVEUSERS, {
                params: {
                    userid: userId, // Logged-in user (who is bookmarking)
                    bookmarkuserid: applicant.user_id, // The user being bookmarked
                },
            });

            if(response.data.status === 200)
            {
                toast.success("User bookmarked Sucessfully!");
            }
            else{
                toast.error("Already bookmarked!");
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    }
};


  const handleRequiteActionDetails = async (applicant) => {
    if (userId && applicant.user_id) {
        try {
          const response= await AuthorizationHeader.get(API_ENDPOINTS.SAVERESUMEVIEWS, {
                 params: {
                  profileId: applicant.user_id,  // ✅ Applicant's actual user ID
                    viewedBy: userId,               // ✅ Logged-in user ID
                },
            });
        } catch (error) {
            console.error('Error logging profile view:', error);
        }
    }
    setSelectedApplicant(applicant);
  
};

  
    return (
        <>
            {loading && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        backdropFilter: 'blur(3px)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        zIndex: 3,
                    }}
                >
                    <Spinner animation="border" variant="primary" style={{ width: '4rem', height: '4rem' }} />
                </div>
            )}

            <Navbar />

            <div className="max-w-5xl mx-auto my-10 p-12 bg-white  rounded-lg">
                <h2 className="text-3xl font-semibold text-center mb-6">Applicants</h2>

                {applicants.length > 0 ? (
                    applicants.map((applicant) => (
                        <div 
      key={applicant.application_id} 
      className="relative mb-6 p-4 sm:p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
            {applicant.applicant_name}
          </h3>
        </div>
        <button
          onClick={() => handleBookmarkUser(applicant)}
          className="absolute top-4 right-4 bg-blue-50 text-blue-600 rounded-full p-2.5 w-9 h-9 flex items-center justify-center hover:bg-blue-100 transition-colors duration-200"
          title="Bookmark applicant"
          aria-label={`Bookmark ${applicant.applicant_name}`}
        >
          <FaBookmark className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
        <div className="space-y-2">
          <p className="flex items-center">
            <FaMapMarkerAlt className="w-4 h-4 mr-2 text-gray-400" /> 
            <span>
              <strong className="font-medium">Company:</strong> {applicant.companyname || 'N/A'}
            </span>
          </p>
          <p className="flex items-center">
            <FaPhone className="w-4 h-4 mr-2 text-gray-400" /> 
            <span>
              <strong className="font-medium">Mobile:</strong> {applicant.applicant_phone || 'Not Provided'}
            </span>
          </p>
          <p className="flex items-center">
            <FaEnvelope className="w-4 h-4 mr-2 text-gray-400" /> 
            <span>
              <strong className="font-medium">Email:</strong> 
              <a href={`mailto:${applicant.applicant_email}`} className="text-blue-600 hover:underline truncate">
                {applicant.applicant_email}
              </a>
            </span>
          </p>
        </div>
        <div className="space-y-2">
          <p className="flex items-center">
            <FaCalendarAlt className="w-4 h-4 mr-2 text-gray-400" /> 
            <span>
              <strong className="font-medium">Applied on:</strong> {applicant.applied_date}
            </span>
          </p>
          <p className="flex items-center">
            <FaRegClipboard className="w-4 h-4 mr-2 text-gray-400" /> 
            <span>
              <strong className="font-medium">Industry:</strong> {applicant.industry || 'N/A'}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mt-4">
        <div className="flex space-x-2">
          {applicant.applicant_phone && (
            <>
              <a
                href={`tel:${applicant.applicant_phone}`}
                className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition-colors duration-200"
                aria-label={`Call ${applicant.applicant_name}`}
              >
                <FaPhone className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${applicant.applicant_phone}`}
                className="bg-teal-100 text-teal-600 p-2 rounded-full hover:bg-teal-200 transition-colors duration-200"
                aria-label={`WhatsApp ${applicant.applicant_name}`}
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </>
          )}
          <a
            href={`mailto:${applicant.applicant_email}`}
            className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition-colors duration-200"
            aria-label={`Email ${applicant.applicant_name}`}
          >
            <FaEnvelope className="w-4 h-4" />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {applicant.applicant_resume ? (
            <a
              href={API_ENDPOINTS.FETCHRESUME(applicant.applicant_resume)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              onClick={() => handleRequiteActionDetails(applicant)}
            >
              <FaDownload className="w-4 h-4 mr-2" /> Download Resume
            </a>
          ) : (
            <span className="text-gray-500 text-sm py-2 px-4">No Resume Uploaded</span>
          )}
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
            onClick={() => handleViewDetails(applicant)}
            aria-label={`View details of ${applicant.applicant_name}`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No applicants found for this job.</p>
                )}

                {selectedApplicant && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md"
                        onClick={() => setSelectedApplicant(null)}
                    >
                        <div
      className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-3xl shadow-2xl relative transition-transform transform scale-95 hover:scale-100 mx-4 sm:mx-auto"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-labelledby="applicant-modal-title"
    >
      <button
        onClick={() => setSelectedApplicant(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition-colors duration-200"
        aria-label="Close modal"
      >
        <IoIosClose size={28} />
      </button>

      <h3
        id="applicant-modal-title"
        className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 border-b pb-2 truncate"
      >
        {selectedApplicant.applicant_name || 'Not Defined'}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-gray-700 text-sm sm:text-base">
        <div className="space-y-2 sm:space-y-3">
          <p className="flex items-center">
            <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2" />
            <span>
              <strong className="font-medium">Email: </strong>
              <a
                href={`mailto:${selectedApplicant.applicant_email}`}
                className="text-blue-600 hover:underline truncate"
              >
                {selectedApplicant.applicant_email || 'Not Provided'}
              </a>
            </span>
          </p>
          <p className="flex items-center">
            <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
            <span>
              <strong className="font-medium">Mobile: </strong>
              {selectedApplicant.applicant_phone || 'Not Provided'}
            </span>
          </p>
          <p className="flex items-center">
            <FaIndustry className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2" />
            <span>
              <strong className="font-medium">Industry: </strong>
              {selectedApplicant.industry || 'N/A'}
            </span>
          </p>
        </div>
        <div className="space-y-2 sm:space-y-3">
          <p className="flex items-center">
            <FaBuilding className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mr-2" />
            <span>
              <strong className="font-medium">Company: </strong>
              {selectedApplicant.companyname || 'N/A'}
            </span>
          </p>
          <p className="flex items-center">
            <FaCalendarAlt className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2" />
            <span>
              <strong className="font-medium">Applied on: </strong>
              {selectedApplicant.applied_date || 'Not Provided'}
            </span>
          </p>
        </div>
      </div>

      {selectedApplicant.applicant_resume ? (
        <div className="mt-4 sm:mt-6">
          <p className="flex items-center text-base sm:text-lg font-semibold text-gray-800 mb-2">
            <FaFilePdf className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2" />
            Resume:
          </p>
          <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden rounded-md shadow-md border border-gray-200">
            <iframe
              src={API_ENDPOINTS.FETCHRESUME(selectedApplicant.applicant_resume)}
              width="100%"
              height="100%"
              title={`Resume of ${selectedApplicant.applicant_name}`}
              className="absolute top-0 left-0"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-4 sm:mt-6 text-center text-sm sm:text-base">
          No Resume Uploaded
        </p>
      )}
    </div>
                    </div>
                )}
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default ApplicantsPage;