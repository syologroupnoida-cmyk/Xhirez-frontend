import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Card,
  Badge,
  Pagination,
  Button,
} from "react-bootstrap";
import {
  Star,
  MapPin,
  Building2,
  Clock,
  BookmarkPlus,
} from "lucide-react";
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from "../../components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "@/router-dom";
import { API_ENDPOINTS } from "../apiConfig";
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import AuthorizationHeader from "../AuthorizationHeader";

const alljobsDashboard = () => {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5); // Number of jobs per page

  // Fetch user authentication token from session storage
  const authData = sessionStorage.getItem("authToken");
  const user = authData ? JSON.parse(authData).users : null;

  const params = new URLSearchParams(location.search);

  // for search page 3 parameters
  const jobTitle = decodeURIComponent(params.get("title") || "").trim();
  const cityFromJob = decodeURIComponent(params.get("location") || "").trim();
  const skill = decodeURIComponent(params.get("skill") || "").trim();

  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // for 3 parameters search
  useEffect(() => {
    if (jobTitle || cityFromJob || skill) {
      fetchJobsAnother(jobTitle, cityFromJob, skill);
    }
  }, [jobTitle, cityFromJob, skill]);

  const fetchJobsAnother = async (jobTitle, location, skill) => {
    setLoading(true);
    try {
      const response = await AuthorizationHeader.get(API_ENDPOINTS.FETCHSEARCHDETAILS,
        {
          params: {
            title: jobTitle ? jobTitle.replace(/jobs/i, "").trim() : "",
            location: location,
            experience: skill,
          }
        });

      if (response.data.status === 200) {
        setJobs([]);
        console.log("jobs are another:", response.data.data);
        const jobsData = response.data.data;
        setJobs(jobsData);
      }
      else {
        console.error("Failed to fetch notifications");
        setJobs([]);
        return;
      }

    } catch (error) {
      console.error("Error fetching notifications: ", error);
    } finally {
      setLoading(false);
    }
  }

  // Save Bookmark Functionality
  const saveBookmark = async (jobId) => {
    if (!user) {
      alert("You must be logged in to save bookmarks.");
      return;
    }

    try {
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SAVEBOOKMARK, {
        params: {
          job_id: jobId,
          user_id: user.id,
        },
      });
      if (response.data.status === 200) {
        toast.success("Bookmark Successfully.");
      } else {
        toast.error("Already Bookmarked.");
      }
    } catch (error) {
      console.error("Error saving bookmark:", error);
    }
  }

  return (
    <>
      {/* Background Blur when Loading */}
      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backdropFilter: "blur(3px)", // Strong blur effect
            background: "rgba(255, 255, 255, 0.1)",
            zIndex: 3,
          }}
        >
          <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
        </div>
      )}

      <UnifiedHeader />

      {/* Page Header */}
      <div className="profile-banner">
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <div className="mt-3 text-center">
                <h2 className="text-3xl font-bold mb-2">
                  Job <span>Vacancies</span>
                </h2>
                <Breadcrumb>
                  <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                  <Breadcrumb.Item active>Vacancies</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Job Listings */}
      <div className="alljobbox bg-[#F8FAFC] py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="mt-4">
              {/* Jobs List */}
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <Card className="shadow-sm mb-4" key={job.id}>
                    <Link
                      to={user ? `/applyjob/${job.id}` : "/login"}
                      onClick={(e) => {
                        if (!user) {
                          navigation.navigate("/login");
                          e.preventDefault();
                          alert("You must be logged in to view job details.");
                        }
                      }}
                      className="text-decoration-none cursor-pointer"
                    >
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <Card.Title>
                              {job.jobtitle || "Not Provided"}
                            </Card.Title>
                            <div className="d-flex review align-items-center gap-2 text-muted">
                              <strong>{job.companyname}</strong>
                            </div>
                          </div>
                          {job?.comp_logo && (
                            <img
                              className="sidelogo"
                              src={API_ENDPOINTS.FETCHIMAGE(job.comp_logo)}
                              alt="Profile"
                              style={{ width: '100px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                          ) || (
                               <div
                                      className="sidelogo d-flex align-items-center justify-content-center"
                                      style={{ 
                                        width: '100px', 
                                        height: '100px', 
                                        borderRadius: '50%',
                                        backgroundColor: '#f0f0f0',
                                        fontSize: '2rem',
                                        fontWeight: 'bold'
                                      }}
                                    >
                                      {job.companyname?.charAt(0).toUpperCase() || "?"}
                                    </div>
                            )}
                        </div>
                        <div className="d-flex gap-3 boxtab text-muted mt-3">
                          <div className="d-flex align-items-center gap-1">
                            <Clock />
                            <span>{job?.minExperience || '0'} - {job?.maxExperience || "N/A"} years</span>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <Building2 />
                            <span>{job?.minimumsalary || "Not disclosed"} - {job.MaximumSalary || "N/A"}</span>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <MapPin />
                            <span>{job?.location}, {job?.area}</span>
                          </div>
                        </div>
                        <p className="text-muted qualification mt-2">Qualification: {job.qualification || "N/A"} &nbsp; &nbsp; &nbsp; Qualification Year: {job?.qualificationyear || "N/A"} </p>
                        <div className="d-flex skill gap-2 flex-wrap mt-2">
                          {job.skills.split(",").map((skill, index) => (
                            <Badge key={index} bg="light" text="dark">{skill}</Badge>
                          ))}
                        </div>
                        <div className="d-flex boxtab justify-content-between align-items-center text-muted mt-3">
                          <span>{new Date(job?.job_posttime).toLocaleString("en-GB") || "N/A"}</span>
                        </div>
                      </Card.Body>
                    </Link>
                    <Button
                      variant="link"
                      onClick={() => saveBookmark(job.id)}
                      className="d-flex justify-content-end gap-1 text-purple hover-yellow"
                    >
                      <BookmarkPlus /> Save
                    </Button>
                  </Card>
                ))
              ) : (
                !loading && !error && <p>No jobs found.</p>
              )}

              {/* Pagination - Fixed Version */}
              {jobs.length > jobsPerPage && (
                <nav aria-label="Page navigation" className="mt-5">
                  <Pagination className="justify-content-center">
                    <Pagination.Prev
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <FontAwesomeIcon icon={faAnglesLeft} /> Previous
                    </Pagination.Prev>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Pagination.Item
                          key={pageNum}
                          active={pageNum === currentPage}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Pagination.Item>
                      );
                    })}

                    <Pagination.Next
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next <FontAwesomeIcon icon={faAnglesRight} />
                    </Pagination.Next>
                  </Pagination>
                </nav>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />

      <ToastContainer/>
    </>
  )
}

export default alljobsDashboard;