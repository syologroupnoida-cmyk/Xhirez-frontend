import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Breadcrumb, Accordion, Card, Badge, Pagination, InputGroup, FormControl, CardBody } from 'react-bootstrap';
import { Star, MapPin, Building2, Clock, BookmarkPlus, ChevronUp, ChevronDown } from 'lucide-react';
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from '../../components/footer/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesLeft, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from "@/router-dom";
import { API_ENDPOINTS } from '../apiConfig';
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import AuthorizationHeader from '../AuthorizationHeader';
// import './JobListInterface.css'; // Assuming you have a CSS file for custom styles

const JobListInterface = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobFilters, setJobFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State for filter toggle on mobile
  const jobsPerPage = 10;

  const [selectedFilters, setSelectedFilters] = useState({
    department: [],
    experience: 0,
    salary: [],
    workmode: [],
  });

  const authData = sessionStorage.getItem("authToken");
  const user = authData ? JSON.parse(authData).users : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchJobsAndFilters = async () => {
      try {
        const [jobsResponse, filtersResponse] = await Promise.all([
          axios.get(API_ENDPOINTS.JOBLIST),
          AuthorizationHeader.get(API_ENDPOINTS.JOB_FILTERS),
        ]);
        setJobs(jobsResponse.data);
        setFilteredJobs(jobsResponse.data);
        setJobFilters(filtersResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobsAndFilters();
  }, []);

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(Number(value));
    setSelectedFilters(prev => ({
      ...prev,
      experience: Number(value)
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => {
      const updatedFilters = { ...prev };
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value);
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }
      return updatedFilters;
    });
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...jobs];

      if (selectedFilters.department.length > 0) {
        filtered = filtered.filter(job => {
          const jobValues = [
            job.jobtitle?.toLowerCase(),
            job.industry?.toLowerCase(),
            ...(job.skills ? job.skills.split(',').map(s => s.trim().toLowerCase()) : [])
          ].filter(Boolean);

          return selectedFilters.department.some(filter => 
            jobValues.some(value => value.includes(filter.toLowerCase()))
          );
        });
      }

      if (selectedFilters.experience > 0) {
        filtered = filtered.filter(job => 
          selectedFilters.experience >= job.minExperience && 
          selectedFilters.experience <= job.maxExperience
        );
      }

      if (selectedFilters.salary.length > 0) {
        filtered = filtered.filter(job => {
          const jobMinSalary = parseInt(job.minimumsalary) || 0;
          const jobMaxSalary = parseInt(job.MaximumSalary) || Infinity;
          return selectedFilters.salary.some(salaryRange => {
            const [minStr, maxStr] = salaryRange.split('-').map(s => s.trim());
            const filterMin = Math.floor((parseInt(minStr) || 0) * 100000 / 12);
            const filterMax = Math.ceil((parseInt(maxStr) || Infinity) * 100000 / 12);
            return jobMinSalary <= filterMax && jobMaxSalary >= filterMin;
          });
        });
      }

      if (selectedFilters.workmode.length > 0) {
        filtered = filtered.filter(job => {
          const jobType = (job.jobtype || '').toLowerCase().replace(/[-\s]/g, '');
          return selectedFilters.workmode.some(mode => 
            mode.toLowerCase().replace(/[-\s]/g, '') === jobType
          );
        });
      }

      setFilteredJobs(filtered);
      setCurrentPage(1);
    };

    applyFilters();
  }, [selectedFilters, jobs]);

  const filteredDepartments = jobFilters.filter(job => 
    job.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const saveBookmark = async (jobId) => {
    if (!user) {
      toast.error("You must be logged in to save bookmarks.");
      return;
    }

    setLoading(true);
    try {
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SAVEBOOKMARK, {
        params: {
          job_id: jobId,
          user_id: user.id,
        },
      });
      if (response.data.status === 200) {
        toast.success("Job bookmarked successfully!");
      } else {
        toast.error("Job already saved!");
      }
    } catch (error) {
      console.error("Error saving bookmark:", error);
    } finally {
      setLoading(false);
    }
  };

  const countActiveFilters = () => {
    let count = 0;
    count += selectedFilters.department.length;
    if (selectedFilters.experience > 0) count++;
    count += selectedFilters.salary.length;
    count += selectedFilters.workmode.length;
    return count;
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <>
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
    
      <UnifiedHeader />
      <div className="listing-banner">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="banner-content">
                <h2 className="text-3xl font-bold mb-2">Find Your <span>Dream Job</span> Today!</h2>
              </div>
            </Col>
            <Col md={6} className="black-side"></Col>
          </Row>
        </Container>
      </div>
      <div className="job-listing">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                {/* Toggle Button for Mobile */}
                <div className="d-md-none mb-3">
                  <Button
                    variant="primary"
                    onClick={toggleFilter}
                    className="w-100 d-flex align-items-center justify-content-center gap-2"
                  >
                    <FontAwesomeIcon icon={faFilter} />
                    {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                    {countActiveFilters() > 0 && (
                      <Badge bg="secondary" className="ms-2">{countActiveFilters()}</Badge>
                    )}
                  </Button>
                </div>

                {/* Filter Panel */}
                <div className={`col-md-3 filter-panel ${isFilterOpen ? 'd-block' : 'd-none d-md-block'}`}>
                  <div className="job-listing-top sticky-top">
                    <div className="job-listing-filter">
                      <div className="joblistingheader">
                        <h5>All Filters</h5>
                        <div className="d-flex align-items-center">
                          {countActiveFilters() > 0 && (
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="text-danger me-2"
                              onClick={() => {
                                setSelectedFilters({
                                  department: [],
                                  experience: 0,
                                  salary: [],
                                  workmode: [],
                                });
                                setSliderValue(0);
                              }}
                            >
                              Clear All
                            </Button>
                          )}
                          <p className="mb-0">
                            <Link to="#">
                              Applied<span>({countActiveFilters()})</span>
                            </Link>
                          </p>
                        </div>
                      </div>
                      <Accordion defaultActiveKey={["0", "1", "2", "3"]} alwaysOpen>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Department</Accordion.Header>
                          <Accordion.Body>
                            <div className="point-search mb-2">
                              <FormControl
                                type="text"
                                placeholder="Search departments..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                            </div>
                            <div className="scrollable-body">
                              {filteredDepartments.map((job, index) => (
                                <div className="point-sel" key={index}>
                                  <Form.Check
                                    type="checkbox"
                                    className="mb-2"
                                    id={`dept-checkbox${index}`}
                                    value={job.department}
                                    onChange={() => handleFilterChange("department", job.department)}
                                    checked={selectedFilters.department.includes(job.department)}
                                  />
                                  <label htmlFor={`dept-checkbox${index}`} className="label-style">
                                    <p>
                                      <span className="depart-line">{job.department}</span>
                                    </p>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Experience</Accordion.Header>
                          <Accordion.Body>
                            <div className="range-slider-container">
                              <div className="range-slider">
                                <span
                                  className="rs-label"
                                  style={{
                                    left: `${(sliderValue / 50) * 100}%`,
                                  }}
                                >
                                  {sliderValue} {sliderValue === 1 ? 'year' : 'years'}
                                </span>
                                <input
                                  className="rs-range"
                                  type="range"
                                  value={sliderValue}
                                  min="0"
                                  max="50"
                                  onChange={handleSliderChange}
                                  aria-label="Adjust the slider value"
                                />
                              </div>
                              <div className="box-minmax">
                                <span>0</span>
                                <span>50+</span>
                              </div>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                          <Accordion.Header>Salary</Accordion.Header>
                          <Accordion.Body>
                            <div className="scrollable-body">
                              {jobFilters.filter(job => job.salary).map((job, index) => (
                                <div className="point-sel" key={index}>
                                  <Form.Check
                                    type="checkbox"
                                    className="mb-2"
                                    id={`salary-checkbox${index}`}
                                    onChange={() => handleFilterChange("salary", job.salary)}
                                    checked={selectedFilters.salary.includes(job.salary)}
                                  />
                                  <label htmlFor={`salary-checkbox${index}`} className="label-style">
                                    <p>
                                      <span className="depart-line">{job.salary}</span>
                                    </p>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                          <Accordion.Header>Work Mode</Accordion.Header>
                          <Accordion.Body>
                            <div className="scrollable-body">
                              {jobFilters.filter(job => job.workmode).map((job, index) => (
                                <div className="point-sel" key={index}>
                                  <Form.Check
                                    type="checkbox"
                                    className="mb-2"
                                    id={`workmode-checkbox${index}`}
                                    onChange={() => handleFilterChange("workmode", job.workmode)}
                                    checked={selectedFilters.workmode.includes(job.workmode)}
                                  />
                                  <label htmlFor={`workmode-checkbox${index}`} className="label-style">
                                    <p>
                                      <span className="depart-line">{job.workmode}</span>
                                    </p>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </div>
                </div>

                {/* Job List */}
                <div className="col-md-9">
                  <CardBody className='alljob'>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <p className="text-muted mb-0">
                        {indexOfFirstJob + 1} - {Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} Jobs
                      </p>
                    </div>
                    <div className="d-grid gap-3">
                      {currentJobs.length > 0 ? (
                        currentJobs.map((job) => (
                          <Card className="shadow-sm mb-3" key={job.id}>
                            <Link to={`/applyjob/${job.id}`} className="text-decoration-none">
                              <Card.Body>
                                <div className="d-flex justify-content-between align-items-start">
                                  <div>
                                    <Card.Title>
                                      {job.jobtitle || "Not disclosed"}
                                    </Card.Title>
                                    <div className="d-flex review align-items-center gap-2 text-muted mt-2">
                                      <strong>{job.companyname}</strong>
                                    </div>
                                  </div>
                                  {job.comp_logo ? (
                                    <img
                                      className="sidelogo"
                                      src={API_ENDPOINTS.FETCHIMAGE(job.comp_logo)}
                                      alt="Profile"
                                      style={{ width: '100px', height: '75px', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                  ) : (
                                    <div
                                      className="sidelogo d-flex align-items-center justify-content-center"
                                      style={{ 
                                        width: '100px', 
                                        height: '70px', 
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
                                    <span>
                                      {job.minExperience || "Not disclosed"} - {job.maxExperience || "Not disclosed"} years
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center gap-1">
                                    <Building2 />
                                    <span>{job.minimumsalary || "Not disclosed"} - {job.MaximumSalary || "Not disclosed"}</span>
                                  </div>
                                  <div className="d-flex align-items-center gap-1">
                                    <MapPin />
                                    <span>{job.location || "Not disclosed"}</span>
                                  </div>
                                </div>
                                <p className="text-muted qualification mt-2 fw-bold">
                                  Qualification: {job.qualification || "Not defined"}       
                                  Qualification Year: {job.qualificationyear || "Not defined"}
                                </p>
                                <div className="d-flex skill gap-2 flex-wrap mt-3">
                                  {job.skills?.split(",").map((skill, index) => (
                                    <Badge key={index} bg="light" text="dark">{skill.trim()}</Badge>
                                  ))}
                                </div>
                                <div className="d-flex boxtab justify-content-end align-items-center text-muted mt-1">
                                  <span>{job.job_posttime || "1 Day Ago"}</span>
                                </div>
                              </Card.Body>
                            </Link>
                            <Button variant="link" className="d-flex justify-content-end text-purple" onClick={() => saveBookmark(job.id)}>
                              <BookmarkPlus /> Save
                            </Button>
                          </Card>
                        ))
                      ) : (
                        <Card className="shadow-sm mb-3">
                          <Card.Body>
                            <h5 className="text-center">No jobs found matching your filters</h5>
                          </Card.Body>
                        </Card>
                      )}
                    </div>
                  </CardBody>
                  {filteredJobs.length > jobsPerPage && (
                    <nav aria-label="Page navigation">
                      <Pagination className="justify-content-center">
                        <Pagination.Prev 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          <FontAwesomeIcon icon={faAnglesLeft} /> Previous
                        </Pagination.Prev>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <Pagination.Item
                            key={i + 1}
                            active={i + 1 === currentPage}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          Next <FontAwesomeIcon icon={faAnglesRight} />
                        </Pagination.Next>
                      </Pagination>
                    </nav>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <Footer />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default JobListInterface;
// This comment is added to force re-transpilation.