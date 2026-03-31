import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Badge,
  Breadcrumb,
  Spinner,
} from "react-bootstrap";
import {
  Star,
  MapPin,
  Building2,
  Clock,
  BookmarkPlus,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from "../../components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket, faLocationDot, faWallet, faBriefcase, faPhone, faGraduationCap, faShareAlt,
  faEnvelope, faCheckCircle, faTools, faUser, faFileAlt, faArrowRightFromBracket,
  faUpload, faEdit, faTrash, faDownload, faSignOutAlt,
  faCalendarCheck,
  faCode
} from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS } from "../apiConfig";
import AuthorizationHeader from "../AuthorizationHeader";
import Swal from 'sweetalert2';


const Profile = () => {
  const [image, setImage] = useState(null);
  const [hover, setHover] = useState(false);
  const [resume, setResume] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);


   const [dynamicImageResume, setDynamicImageResume] = useState({
       dynamicImage:"",
       dynamicResume: ""
    });
    


  // Fetch user data from sessionStorage
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      const user = JSON.parse(authToken).users;
      setUserData(user);
      setEmail(user?.email);
    }


    const fetchUserAndPortalData = async () => {

    const authToken = sessionStorage.getItem("authToken");

    if (!authToken) return;

    try {
      const user = JSON.parse(authToken).users;

      if (!user?.email) return;

      setUserData(user);
      setEmail(user.email);

      const response = await AuthorizationHeader.get(API_ENDPOINTS.FETCHDATAFORUSERSPORTAL, {
        params: {
          email: user.email,
        },
      });

      if (response?.data?.status === 200 && response?.data?.data) {
        setDynamicImageResume(prev => ({
          ...prev,
          dynamicImage: response.data.data.profileImage || "",
          dynamicResume: response.data.data.resume || "",
        }));
      } else {
        console.warn("Unexpected API response", response);
      }
    } catch (error) {
      console.error("Error loading user or fetching portal data:", error);
    }
  };



    fetchUserAndPortalData();

  }, []);


  // For sharing profile

  const encodedEmail = encodeURIComponent(email);
  const baseUrl = `${window.location.origin}`;   // dynamic base frontend url
  const shareUrl = `${baseUrl}/profileShare/${encodedEmail}`; 

  // Handle Profile Image Upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Please select a valid image file!',
        confirmButtonColor: '#3085d6',
      }); 
      return;
    }

    // Preview selected image
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    // Upload to API
    const formData = new FormData();
    formData.append("email", email);
    formData.append("file", file);

    try {

      setLoading(true);

      const response = await AuthorizationHeader.post(API_ENDPOINTS.UPDATEPROFILEIMAGE,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.status === 200) {
       Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Profile image updated successfully!',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          window.location.reload();
        });
      } else {
         Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Failed to update profile image. Please try again.',
        confirmButtonColor: '#3085d6',
      }); 
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
    finally{
      setLoading(false);      
    }
  };

  // Handle Resume Upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
       Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Please upload a valid resume (PDF or DOC format)!',
        confirmButtonColor: '#3085d6',
      }); 
      return;
    }

    // Preview resume
    setResume(file);
    setPreviewUrl(URL.createObjectURL(file));

    // Upload to API
    const formData = new FormData();
    formData.append("email", email);
    formData.append("file", file);

    try {

      setLoading(true);

      const response = await AuthorizationHeader.post(API_ENDPOINTS.UPLOADRESUME,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: '"Resume uploaded successfully!"',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Failed to upload resume. Please try again.',
        confirmButtonColor: '#3085d6',
      }); 
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      setLoading(false);
    }
    finally{
      setLoading(false);
    }
  };

  // Handle Resume Delete
  const handleDelete = () => {
    setResume(null);
    setPreviewUrl(null);
  };

  // Open file input
  const triggerFileInput = () => {
    document.getElementById("resumeInput").click();
  };

  if (!userData) {
    return <div>Loading...</div>;
  }


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

      <UnifiedHeader />

      <div className="profile-banner">
        <Container>
          <Row className="align-items-center ">
            <Col md={12}>
              <div className="mt-4 text-center">
                <h2 className="text-4xl font-bold mb-2">My Profile</h2>
               
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="user-box">
                <div className="card">
                  <div className="profile-edit">
                    <h6><Link to="/fillprofile"><FontAwesomeIcon icon={faEdit} />Edit Profile</Link></h6>
                  </div>
                  <div className="profile-logout">
                    <h6><Link to="/logout"><FontAwesomeIcon icon={faArrowRightFromBracket} />Log Out</Link></h6>
                  </div>
                  <div className="row ">
                    <div className="col-md-3 bro-con " style={{ borderRight: '1px solid #ddd' }}>
                      <div className="user-img">
                        <div
                          className="img-wrapper"
                          onMouseEnter={() => setHover(true)}
                          onMouseLeave={() => setHover(false)}
                        >
                          


                           <img
                           src={
                           image
                              ? image
                              : dynamicImageResume?.dynamicImage
                              ? API_ENDPOINTS.FETCHIMAGE(dynamicImageResume?.dynamicImage)
                              : "https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                          }
                            alt="Profile"
                            className="profile-image"
                          />

                          {!image && (
                            <label htmlFor="imageUpload" className="upload-btn">
                              <span>  <FontAwesomeIcon icon={faArrowUpFromBracket} />
                              </span>
                            </label>
                          )}

                          {image && (
                            <label
                              htmlFor="imageUpload"
                              className={`edit-btn ${hover ? "show" : ""}`}
                            >
                              <span> ✎</span>
                            </label>
                          )}

                          <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="user-text">
                        <div className="user-head ">
                          <div className="user-per">
                            <h3>
                              {userData?.fullName}
                            </h3>
                            {/* <span>{userData.userCategory || "Web Developer"}</span> */}
                          </div>
                          <div className="working">
                          
                            <h6>
                            <p>Profile Last Updated :- {userData?.updatedAt ? new Date(userData.updatedAt).toLocaleDateString('en-GB') : 'N/A'}</p>
                            </h6>
                          </div>
                        </div>
                        <div className="user-deatils">
                          <div className="row">
                            <div className="col-md-6" style={{ borderRight: '1px solid #ddd' }}>
                              <ul>
                                <li><FontAwesomeIcon icon={faLocationDot} /> <span>{userData.location || "Not Specified"}</span></li>
                                <li><FontAwesomeIcon icon={faWallet} /> <span>{userData.minsalary && userData.maxsalary ? `${userData.minsalary} - ${userData.maxsalary}LPA` : "Not Specified"}</span></li>
                                <li><FontAwesomeIcon icon={faBriefcase} /> <span>{userData.experiencePeriod || "Not Specified"}Years</span></li>
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <ul>
                                <li><FontAwesomeIcon icon={faPhone} /> <span>{userData.phoneNo || "Not Specified"}</span> {userData.phoneNo && (
                                  <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    style={{ color: "#1cc88a", marginLeft: "8px" }}
                                  />)}</li>
                                <li><FontAwesomeIcon icon={faEnvelope} /> <span>{userData.email}</span> {userData.email && (
                                  <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    style={{ color: "#1cc88a", marginLeft: "8px" }}
                                  />)}</li>
                                <li><FontAwesomeIcon icon={faCalendarCheck} /><span>{userData?.noticePeriod ? `${userData?.noticePeriod}`: "15 Days or less notice period"} </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="user-profile">
                  <div className="user-card skill">
                    <h6> <FontAwesomeIcon className="pro-icon" icon={faTools} />
                      Key skills</h6>
                    <div className="d-flex skill gap-2 flex-wrap">
                    {Array.isArray(userData.skills) && userData.skills.length > 0 ? (
                      userData.skills.map((skill, index) => (
                        <Badge key={index} bg="light" text="dark" className="m-3">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p>No skills added</p>
                    )}
                    </div>
                  </div>

                  <div className="user-card skill">
                    <h6><FontAwesomeIcon className="pro-icon" icon={faUser} />About Me</h6>
                    <div className="user-content">
                      <p>{userData.aboutMe || "No description provided."}</p>
                    </div>
                  </div>
                  
                  {/* Conditional rendering based on userCategory */}

                  
                  {userData.userCategory === "fresher" ? (
                      <div className="user-card" style={{ minHeight: "200px" }}>
                        <h6><FontAwesomeIcon className="pro-icon" icon={faCode} />Projects</h6>
                        <ul className="user-content">
                          {userData.project && userData.project.length > 0 ? (
                            userData.project.map((project, index) => (
                              <li key={index} >
                                <h5 className="mt-1">{project.projectTitle}</h5>
                                <p>{project.projectLink}</p>
                                <p cl>{new Date(project.projectStartDate).toLocaleDateString("en-GB")} - {new Date(project.projectEndDate).toLocaleDateString("en-GB")}</p>
                              
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
                        <h6><FontAwesomeIcon className="pro-icon" icon={faBriefcase} />Experience</h6>
                        <ul className="user-content">
                          {userData.workExperience && userData.workExperience.length > 0 ? (
                            userData.workExperience.map((exp, index) => (
                              <li key={index}>
                                <h5 className="mb-1">{exp.jobProfile}</h5>
                                <p>{exp.companyName}</p>
                                <p>{exp.jobStartDate || "N/A"} - {exp.jobEndDate || "Currently Working"}</p>
                              </li>
                            ))
                          ) : (
                            <p>No experience added</p>
                          )}
                        </ul>
                      </div>
                    )}
                  
                  
                  <div className="user-card " style={{ minHeight: '200px' }}>
                    <h6><FontAwesomeIcon className="pro-icon" icon={faGraduationCap} />Education</h6>
                    <ul className="user-content">
                    {userData.education && userData.education.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {userData.education.map((edu, index) => (
                          <li key={index} className="list-group-item border-0">
                            <h5 className="mb-1">{edu.degree} in {edu.specialization}</h5>
                            <p className="mb-0 text-muted">{edu.university}</p>
                            <p className="text-muted small">
                              {edu.startDate} - {edu.endDate}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted text-center">No education details added</p>
                    )}
                    </ul>
                  </div>


                  {/* Resume Download and showing */}

                  <div className="user-card resume-card mt-4">
                      <h6>
                        <FontAwesomeIcon className="pro-icon" icon={faFileAlt} /> Resume
                      </h6>
                      <div className="resume-content text-center">
                            {dynamicImageResume?.dynamicResume ? (
                              // <div>
                              //   <p className="text-left mt-4">Uploaded Resume: {userData.resume}</p>
                              //   <a
                              //     href={API_ENDPOINTS.FETCHRESUME(userData.resume)}
                              //     rel="noopener noreferrer"
                              //     className="btn btn-success btn-sm"
                              //     target="_blank"
                              //   >
                              //     <FontAwesomeIcon icon={faDownload} /> Download Resume
                              //   </a>
                              // </div>
                              <div>
                                <p className="text-left mt-4">Uploaded Resume: {dynamicImageResume?.dynamicResume}</p>
                                <a
                                  href={API_ENDPOINTS.FETCHRESUME(dynamicImageResume?.dynamicResume || userData.resume)}
                                  rel="noopener noreferrer"
                                  className="btn btn-success btn-sm"
                                  target="_blank"
                                >
                                  <FontAwesomeIcon icon={faDownload} /> Download Resume
                                </a>
                              </div>
                            ) : (
                              <p>No resume uploaded</p>
                            )}
                      </div>
                    </div>


                  <div className="user-card">
                    <div className="row">
                      <div className="col-md-6" style={{ borderRight: '1px solid #eee' }}>
                        <div className="resume-container">
                          <h6><FontAwesomeIcon className="pro-icon" icon={faFileAlt} />Resume Upload</h6>
                          <div className="resume-actions">
                            <input
                              id="resumeInput"
                              type="file"
                              accept=".pdf"
                              style={{ display: "none" }}
                              onChange={handleUpload}
                            />
                            {!resume && (
                              <button onClick={triggerFileInput} className="action-btn upload-btn" title="Upload Resume">
                                <FontAwesomeIcon icon={faUpload} />
                              </button>
                            )}

                            {resume && (
                              <>
                                <button onClick={triggerFileInput} className="action-btn edit-btn" title="Update Resume">
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={handleDelete} className="action-btn delete-btn" title="Delete Resume">
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <Link to={previewUrl} download={resume.name} title="Download Resume">
                                  <button className="action-btn download-btn">
                                    <FontAwesomeIcon icon={faDownload} />
                                  </button>
                                </Link>
                              </>
                            )}
                          </div>

                          {resume && (
                            <div className="resume-preview">
                              <p>Preview:</p>
                              {resume.type.startsWith("image/") ? (
                                // <img src={previewUrl} alt="Resume Preview" />
                                <img src={dynamicImageResume.dynamicResume || previewUrl} alt="Resume Preview" />
                              ) : (
                                // <iframe src={previewUrl} width="100%" height="100%" title="Resume Preview"></iframe>
                                <iframe src={dynamicImageResume.dynamicResume || previewUrl} width="100%" height="100%" title="Resume Preview"></iframe>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="social-card">
                          <h6>
                            <FontAwesomeIcon className="pro-icon" icon={faShareAlt} />Share Your Profile
                          </h6>
                          <div className="login-icon text-start d-flex gap-2">
                            <a
                              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src="assets/images/icon/facebook.png" width="100%" alt="Facebook" />
                            </a>
                            <a
                              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src="assets/images/icon/linkedin.png" width="100%" alt="LinkedIn" />
                            </a>
                            <a
                              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=Check%20out%20this%20profile!`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src="assets/images/icon/twitter.png" width="100%" alt="Twitter" />
                            </a>
                            <a
                              href={`https://api.whatsapp.com/send?text=${shareUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src="assets/images/icon/whatsapp.png" width="100%" alt="WhatsApp" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
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
    </>
  );
};

export default Profile;