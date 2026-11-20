import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaPhone, FaWhatsapp, FaEnvelope, FaDownload, 
  FaMapMarkerAlt, FaCalendarAlt, FaFilePdf, FaTools,
  FaVenusMars, FaBriefcase, FaUserTie, FaHome
} from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import Navbar from '../../components/header/recruitment-header';
import Footer from '../../components/footer/footer';
import { API_ENDPOINTS } from '../apiConfig';
import { Spinner } from "react-bootstrap";
import AuthorizationHeader from '../AuthorizationHeader';

const BookmarkUsers = () => {
  const [bookmarkedUsers, setBookmarkedUsers] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authData = localStorage.getItem("authToken");
  const user = authData ? JSON.parse(authData).users : null;

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBookmarkedUsers = async () => {
      try {
        setLoading(true);
        const response = await AuthorizationHeader.get(API_ENDPOINTS.FETCHBOOKMARKEDUSERS, {
          params: { userId: user.id },
        });
        
        if (response.data.status === 200) {
          setBookmarkedUsers(response.data.data);
        } else {
          setBookmarkedUsers([]);
          setError("No bookmarked candidates found.");
        }
      } catch (err) {
        console.error("Error fetching bookmarked users:", err);
        setError("Failed to fetch bookmarked candidates. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) {
      fetchBookmarkedUsers();
    }
  }, [user?.id]);

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <Spinner animation="border" variant="primary" style={{ width: "4rem", height: "4rem" }} />
        </div>
      )}

      <Navbar />

      <main className="container mx-auto md:px-6 lg:px-14">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Bookmarked Candidates</h1>
          
          {/* Error Message */}
          {error && !loading && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>{error}</p>
            </div>
          )}

          {/* Candidates List */}
          {bookmarkedUsers.length > 0 ? (
            <div className="space-y-6">
              {bookmarkedUsers.map((applicant) => (
                <div key={applicant.id} className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">
                      {applicant.full_name}
                    </h2>
                    <span className="text-sm text-gray-500">
                      Last updated: {new Date(applicant.updated_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    {/* Left Column */}
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FaPhone className="text-blue-500 mr-3 min-w-[16px]" />
                        <span><strong>Phone:</strong> {applicant.phone_number || "Not provided"}</span>
                      </div>
                      <div className="flex items-center">
                        <FaEnvelope className="text-blue-500 mr-3 min-w-[16px]" />
                        <span><strong>Email:</strong> {applicant.email}</span>
                      </div>
                      <div className="flex items-center">
                        <FaVenusMars className="text-blue-500 mr-3 min-w-[16px]" />
                        <span><strong>Gender:</strong> {applicant.gender || "Not specified"}</span>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FaBriefcase className="text-blue-500 mr-3 min-w-[16px]" />
                        <span><strong>Experience:</strong> {applicant.experienceperiod || 0} years</span>
                      </div>
                      <div className="flex items-center">
                        <FaUserTie className="text-blue-500 mr-3 min-w-[16px]" />
                        <span><strong>Status:</strong> {applicant.job_status || "Not specified"}</span>
                      </div>
                      <div className="flex items-center">
                        <FaHome className="text-blue-500 mr-3 min-w-[16px]" />
                        <span><strong>Address:</strong> {applicant.address || "Not specified"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-4">
                    <div className="flex items-start">
                      <FaTools className="text-blue-500 mr-3 mt-1 min-w-[16px]" />
                      <div>
                        <strong>Skills:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {applicant.skills ? (
                            applicant.skills.split(',').map((skill, index) => (
                              <span 
                                key={index} 
                                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                              >
                                {skill.trim()}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500">No skills listed</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
                    <div className="flex space-x-3">
                      {applicant.phone_number && (
                        <>
                          <a 
                            href={`tel:${applicant.phone_number}`} 
                            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
                            aria-label="Call candidate"
                          >
                            <FaPhone />
                          </a>
                          <a 
                            href={`https://wa.me/${applicant.phone_number}`} 
                            className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors"
                            aria-label="Message on WhatsApp"
                          >
                            <FaWhatsapp />
                          </a>
                        </>
                      )}
                      <a 
                        href={`mailto:${applicant.email}`} 
                        className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
                        aria-label="Email candidate"
                      >
                        <FaEnvelope />
                      </a>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      {applicant.resume ? (
                        <a
                          href={API_ENDPOINTS.FETCHRESUME(applicant.resume)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                          <FaDownload className="mr-2" /> Download Resume
                        </a>
                      ) : (
                        <span className="text-gray-500 py-2">No resume available</span>
                      )}
                      <button 
                        onClick={() => setSelectedApplicant(applicant)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No bookmarked candidates found.</p>
              </div>
            )
          )}
        </div>
      </main>

      {/* Candidate Detail Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-800">{selectedApplicant.full_name}</h2>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="text-gray-500 hover:text-red-500 transition-colors"
                aria-label="Close modal"
              >
                <IoIosClose size={28} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Personal Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaPhone className="text-blue-500 mr-3 min-w-[16px]" />
                      <span><strong>Phone:</strong> {selectedApplicant.phone_number || "Not provided"}</span>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="text-blue-500 mr-3 min-w-[16px]" />
                      <span><strong>Email:</strong> {selectedApplicant.email}</span>
                    </div>
                    <div className="flex items-center">
                      <FaVenusMars className="text-blue-500 mr-3 min-w-[16px]" />
                      <span><strong>Gender:</strong> {selectedApplicant.gender || "Not specified"}</span>
                    </div>
                    <div className="flex items-center">
                      <FaHome className="text-blue-500 mr-3 min-w-[16px]" />
                      <span><strong>Address:</strong> {selectedApplicant.address || "Not specified"}</span>
                    </div>
                  </div>
                </div>

                {/* Professional Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Professional Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaBriefcase className="text-blue-500 mr-3 min-w-[16px]" />
                      <span><strong>Experience:</strong> {selectedApplicant.experienceperiod || 0} years</span>
                    </div>
                    <div className="flex items-center">
                      <FaUserTie className="text-blue-500 mr-3 min-w-[16px]" />
                      <span><strong>Job Status:</strong> {selectedApplicant.job_status || "Not specified"}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-blue-500 mr-3 min-w-[16px]" />
                      <span><strong>Profile Updated:</strong> {new Date(selectedApplicant.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedApplicant.skills ? (
                    selectedApplicant.skills.split(',').map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No skills listed</span>
                  )}
                </div>
              </div>

              {/* Resume Section */}
              {selectedApplicant.resume && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Resume</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <iframe
                      src={API_ENDPOINTS.FETCHRESUME(selectedApplicant.resume)}
                      width="100%"
                      height="500"
                      title={`${selectedApplicant.full_name}'s Resume`}
                      className="border-0"
                    />
                  </div>
                  <div className="mt-4 flex justify-center">
                    <a
                      href={API_ENDPOINTS.FETCHRESUME(selectedApplicant.resume)}
                      download={`${selectedApplicant.full_name}_Resume.pdf`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <FaDownload className="mr-2" /> Download Resume
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedApplicant(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default BookmarkUsers;