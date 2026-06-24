import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Breadcrumb, Card, Badge, Button, Spinner,} from "react-bootstrap";
import {MapPin, Building2, Clock, BookmarkPlus,} from "lucide-react";
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from "../../components/footer/footer";
import { Link, useLocation, useNavigate } from "@/router-dom";
import { toast, ToastContainer } from "react-toastify";
import { API_ENDPOINTS } from "../apiConfig";
import AuthorizationHeader from "../AuthorizationHeader";

const JobListBySectors = () => {

  const navigate = useNavigate();


 const location = useLocation();
 const industry = location.state?.industry || "";

  const [error, setError] = useState(null);
   const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);


const authData = sessionStorage.getItem("authToken");
const user = authData ? JSON.parse(authData).users : null;


  useEffect(() => {

    window.scrollTo(0, 0);

    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_ENDPOINTS.JOBLIST);
        const jobList = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        if (!jobList.length) {
          console.warn("No jobs returned from API");
          setFilteredJobs([]);
          return;
        }

    
      const normalize = (str) =>
        str?.trim().toLowerCase().replace(/\s+/g, " ");

        const filteredJobs = industry
        ? jobList.filter((job) =>
            typeof job.industry === "string" &&
            normalize(job.industry) === normalize(industry)
            )
        : [];


        setFilteredJobs(filteredJobs);

      } catch (err) {
        setError("Failed to load jobs. Please try again later.");
        setFilteredJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [industry]);


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

  
  return (
    <>
      {loading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
             style={{ backdropFilter: "blur(3px)", background: "rgba(255, 255, 255, 0.1)", zIndex: 3 }}>
          <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
        </div>
      )}

      <UnifiedHeader />

      <div className="profile-banner">
        <Container>
          <Row className="align-items-center">
            <Col md={12} className="text-center mt-3">
              <h2 className="text-3xl font-bold mb-2">
                Sector: {industry || "Not specified"}
              </h2>
              <Breadcrumb>
                <Breadcrumb.Item active>Jobs Filtered By Sector</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="alljobbox bg-[#F8FAFC] py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="mt-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Card className="shadow-sm mb-4" key={job.id} >
                    <Link
                      to={user ? `/applyjob/${job.id}` : "/login"}
                      onClick={(e) => {
                        if (!user) {
                          e.preventDefault();
                          toast.error("You must be logged in to view job details.");
                          setTimeout(() => navigate("/login"), 3000);
                        }
                      }}
                      className="text-decoration-none cursor-pointer"
                    >
                      <Card.Body >
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <Card.Title>{job.jobtitle || "Not Provided"}</Card.Title>
                            <div className="d-flex review align-items-center gap-2 text-muted">
                              <strong>{job.companyname}</strong>
                            </div>
                          </div>
                          {job?.comp_logo ? (
                            <img
                              src={API_ENDPOINTS.FETCHIMAGE(job.comp_logo)}
                              alt="Company Logo"
                              style={{ width: "100px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
                            />
                          ) : (
                            <div
                              className="d-flex align-items-center justify-content-center bg-secondary text-white"
                              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                            >
                              {job.companyname?.charAt(0).toUpperCase() || "?"}
                            </div>
                          )}
                        </div>
                        <div className="d-flex gap-3 boxtab text-muted mt-3">
                          <div className="d-flex align-items-center gap-1">
                            <Clock />
                            <span>{job.minExperience} - {job.maxExperience} years</span>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <Building2 />
                            <span>{job.minimumsalary} - {job.MaximumSalary}</span>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <MapPin />
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <p className="text-muted qualification mt-2">
                          Qualification: {job.qualification} &nbsp;&nbsp; Year: {job.qualificationyear}
                        </p>
                        <div className="d-flex skill gap-2 flex-wrap mt-2">
                          {job.skills?.split(",").map((skill, index) => (
                            <Badge key={index} bg="light" text="dark">{skill}</Badge>
                          ))}
                        </div>
                        <div className="d-flex justify-content-between text-muted mt-3">
                          <span>{job.job_posttime || "Recently posted"}</span>
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
                !loading && (
                  <Card className="text-center p-5">
                    <h4>No jobs found for sector: {industry}</h4>
                  </Card>
                )
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
};

export default JobListBySectors;