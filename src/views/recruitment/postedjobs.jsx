import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaEye, FaRegBookmark, FaMapMarkerAlt, FaMoneyBillWave, FaUsers } from "react-icons/fa";
import { Link } from "@/router-dom";
import Navbar from '../../components/header/recruitment-header';
import Footer from '../../components/footer/footer';
import { Container, Row, Col, Breadcrumb, Modal, Button, Card, Spinner, Pagination } from 'react-bootstrap';
import axios from "axios";
import { API_ENDPOINTS } from "../apiConfig";
import { useNavigate } from "@/router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthorizationHeader from "../AuthorizationHeader";

const PostedJob = () => {
  const navigate = useNavigate();
  const [jobPosts, setJobPosts] = useState([]);
  const [applicants, setApplicants] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    const fetchJobs = async () => {
      const authData = localStorage.getItem("authToken");
      const user = authData ? JSON.parse(authData).users : null;
      const email = user?.email;

      try {
        const response = await AuthorizationHeader.get(API_ENDPOINTS.FETCHALLJOBS,
        {
           params:
           { 
            email
           }
        });
        if (response.data.status === 200) {
          console.log("Data", response.data.data);
          
          setJobPosts(response.data.data);
        } else {
          console.error("Failed to fetch jobs:", response.data.statusText);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    jobPosts.forEach(job => fetchApplicants(job.id));
  }, [jobPosts]);

  const fetchApplicants = async (jobId) => {
    try {
      const response = await AuthorizationHeader.get(API_ENDPOINTS.APPLICANTLISTBYID, { params: { id: jobId } });
      if (response.data.status === 200 && Array.isArray(response.data.data)) {
        setApplicants(prev => ({ ...prev, [jobId]: response.data.data }));
      } else {
        console.error("Failed to fetch applicants:", response.data.statusText);
      }
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await AuthorizationHeader.put(API_ENDPOINTS.DELETEJOBS(id));
      if (response.data.status === 200) {
        toast.success("Job Deleted Successfully");
        setJobPosts(jobPosts.filter(job => job.id !== id));
      } else {
        console.error("Failed to fetch applicants:", response.data.statusText);
        toast.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const handleEditClick = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  // Pagination Logic
  const totalPages = Math.ceil(jobPosts.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobPosts.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backdropFilter: "blur(4px)",
            background: "rgba(255, 255, 255, 0.1)",
            zIndex: 3,
          }}
        >
          <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
        </div>
      )}

      <Navbar />
      <div className="bg-[#ECF4FF] bg-cover bg-center py-10">
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <div className="text-center">
                <h2 className="text-4xl text-black font-bold mb-2">
                  Your <span className='text-[#05A2E4]'>Posted Jobs</span>
                </h2>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="my-5">
        <Row>
          {currentJobs.map((job) => (
            <Col md={12} key={job.id} className="mb-4">
              <Card className="shadow-sm border-0 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <Card.Body className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  {/* Left Side - Job Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{job.companyname}</h3>
                    <h5 className="text-gray-600 mt-2">{job.industry}</h5>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center mt-3 space-y-2 sm:space-y-0 sm:space-x-3 text-gray-700">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-blue-500 mr-2" />
                        <span>{job?.location || "Not Filled"}</span>
                      </div>
                      <div className="flex items-center">
                        <FaMoneyBillWave className="text-green-500 mr-2" />
                        <span>{job.minimumsalary}-{job.MaximumSalary}</span>
                      </div>
                      <div className="flex items-center">
                        <FaUsers className="text-purple-500 mr-2" />
                        <span>{job.totalvacancies} Openings</span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.skills.split(',').map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Actions */}
                  <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <Link
                      to={`/applicantsPage/${job.id}`}
                      className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                    >
                      <FaRegBookmark className="mr-2" />
                      {applicants[job.id]?.[0]?.total_applicants || 0} Applicants
                    </Link>
                    <button
                      className="text-yellow-600 bg-yellow-200 p-2 rounded-full hover:bg-yellow-300 transition-all"
                      onClick={() => handleEditClick(job.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeletePost(job.id)}
                      className="text-red-600 bg-red-200 p-2 rounded-full hover:bg-red-300 transition-all"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination Controls */}
        {jobPosts.length > jobsPerPage && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        )}
      </Container>

      <Footer />

      <ToastContainer />
    </>
  );
};

export default PostedJob;