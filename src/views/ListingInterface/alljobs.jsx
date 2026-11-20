import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Pagination,
  Button,
  Form,
  Spinner
} from "react-bootstrap";
import {
  MapPin,
  Building2,
  Clock,
  BookmarkPlus,
  Briefcase,
  Search,
  ChevronRight
} from "lucide-react";
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from "../../components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "@/router-dom";
import { API_ENDPOINTS } from "../apiConfig";
import { toast, ToastContainer } from "react-toastify";
import AuthorizationHeader from "../AuthorizationHeader";

const Alljobs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Pagination & Filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
  const [selectedFilters, setSelectedFilters] = useState({
    workMode: [],
    salary: [],
    location: []
  });

  const authData = sessionStorage.getItem("authToken");
  const user = authData ? JSON.parse(authData).users : null;
  const params = new URLSearchParams(location.search);
  const query = decodeURIComponent(params.get("query") || "").trim();
  const city = decodeURIComponent(params.get("location") || "").trim();

  useEffect(() => {
    fetchJobs(query, city);
  }, [query, city]);

  const fetchJobs = async (title, city) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(API_ENDPOINTS.FETCHJOBSBYCONDITION, {
        params: { title, city },
      });
      setJobs(response.data.data || []);
      setCurrentPage(1);
    } catch (err) {
      setError("Failed to fetch jobs.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveBookmark = async (jobId) => {
    if (!user) {
      toast.error("Please login to save jobs.");
      return;
    }
    try {
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SAVEBOOKMARK, {
        params: { job_id: jobId, user_id: user.id },
      });
      response.data.status === 200 ? toast.success("Saved!") : toast.error("Already Saved.");
    } catch (error) { console.error(error); }
  };

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="bg-light min-vh-100">
      <UnifiedHeader />
      <ToastContainer />

      {/* Hero Search Section (Naukri Style) */}
      <div className="bg-white border-bottom py-4 shadow-sm">
        <Container>
          <div className="d-flex align-items-center gap-2 text-muted mb-2" style={{fontSize: '14px'}}>
            <span>Home</span> <ChevronRight size={14}/> <span>Jobs</span> <ChevronRight size={14}/> <strong>{query || 'All Jobs'}</strong>
          </div>
          <h5 className="fw-bold">{jobs.length} {query} Vacancies in {city || 'India'}</h5>
        </Container>
      </div>

      <Container className="py-4">
        <Row>
          {/* --- LEFT SIDEBAR FILTERS --- */}
          <Col lg={3} className="d-none d-lg-block">
            <Card className="border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
              <Card.Body>
                <h6 className="fw-bold mb-3 border-bottom pb-2">All Filters</h6>
                
                <div className="filter-section mb-4">
                  <p className="fw-semibold small mb-2">Work Mode</p>
                  {['Work from office', 'Remote', 'Hybrid'].map(mode => (
                    <Form.Check key={mode} type="checkbox" label={mode} className="small mb-1" />
                  ))}
                </div>

                <div className="filter-section mb-4">
                  <p className="fw-semibold small mb-2">Experience</p>
                  <Form.Range min="0" max="30" />
                  <div className="d-flex justify-content-between small text-muted">
                    <span>0 Yrs</span><span>30 Yrs</span>
                  </div>
                </div>

                <div className="filter-section mb-4">
                  <p className="fw-semibold small mb-2">Salary</p>
                  {['0-3 Lakhs', '3-6 Lakhs', '6-10 Lakhs', '10-15 Lakhs'].map(sal => (
                    <Form.Check key={sal} type="checkbox" label={sal} className="small mb-1" />
                  ))}
                </div>

                <Button variant="outline-primary" size="sm" className="w-100 mt-2">Apply Filters</Button>
              </Card.Body>
            </Card>
          </Col>

          {/* --- RIGHT SIDE JOB LISTINGS --- */}
          <Col lg={9}>
            {loading ? (
              <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
            ) : currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <Card className="job-card border-0 shadow-sm mb-3 position-relative" key={job.id}>
                  <Card.Body className="p-4">
                    <Row>
                      <Col xs={10}>
                        <Link 
                          to={user ? `/applyjob/${job.id}` : "/login"} 
                          className="text-decoration-none text-dark"
                          onClick={(e) => !user && (e.preventDefault(), toast.error("Login required"), navigate("/login"))}
                        >
                          <h6 className="fw-bold mb-1 hover-primary">{job.jobtitle}</h6>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="text-muted small fw-medium">{job.companyname}</span>
                            <Badge bg="success" className="d-flex align-items-center gap-1" style={{fontSize: '10px'}}>
                              4.1 <Star size={10} fill="white"/>
                            </Badge>
                          </div>

                          <div className="d-flex flex-wrap gap-3 text-muted mb-3 small">
                            <div className="d-flex align-items-center gap-1">
                              <Briefcase size={14}/> <span>{job.minExperience}-{job.maxExperience} Yrs</span>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                              <span className="fw-bold">₹</span> <span>{job.minimumsalary} - {job.MaximumSalary} PA</span>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                              <MapPin size={14}/> <span>{job.location}</span>
                            </div>
                          </div>

                          <div className="text-muted small mb-3">
                            <Clock size={14} className="me-1"/> {job.skills.substring(0, 100)}...
                          </div>
                        </Link>

                        <div className="d-flex gap-2">
                          {job.skills.split(",").slice(0, 4).map((skill, i) => (
                            <Badge key={i} bg="light" text="secondary" className="fw-normal border">{skill}</Badge>
                          ))}
                        </div>
                      </Col>

                      <Col xs={2} className="text-end">
                        <img 
                          src={job.comp_logo ? API_ENDPOINTS.FETCHIMAGE(job.comp_logo) : "https://via.placeholder.com/50"} 
                          alt="logo" 
                          className="rounded border"
                          style={{width: '50px', height: '50px', objectFit: 'contain'}}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer className="bg-white border-top-0 d-flex justify-content-between align-items-center px-4 pb-3">
                    <span className="text-muted small">{job.job_posttime || "Few days ago"}</span>
                    <Button variant="link" className="p-0 text-decoration-none text-primary small" onClick={() => saveBookmark(job.id)}>
                      <BookmarkPlus size={18} className="me-1"/> Save
                    </Button>
                  </Card.Footer>
                </Card>
              ))
            ) : (
              <Card className="text-center p-5 border-0 shadow-sm">
                <p className="mb-0">No jobs found matching your criteria.</p>
              </Card>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="justify-content-center mt-4 custom-pagination">
                <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(p-1, 1))} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item key={i+1} active={i+1 === currentPage} onClick={() => setCurrentPage(i+1)}>
                    {i+1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(p => Math.min(p+1, totalPages))} disabled={currentPage === totalPages} />
              </Pagination>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Alljobs;