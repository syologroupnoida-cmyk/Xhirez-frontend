import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import {
  InformationCircleIcon,
  ArrowRightIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

// Import Swiper styles
import "swiper/css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Card,
  Badge,
  Breadcrumb,
  InputGroup,
  FormControl,
  CardBody,
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
import { scroller } from "react-scroll";

import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from "../../components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faHome,
  faChevronRight,
  faBriefcase,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { use } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../apiConfig";
import { toast, ToastContainer } from "react-toastify";
import AuthorizationHeader from "../AuthorizationHeader";

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("section1");
   const [isLoading, setIsLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState("home"); // Renamed state

  const [totalViews, setTotalViews] = useState(0);
  const [totalResumeViews, setTotalResumeViews] = useState(0);
  const [jobList, setJobList] = useState([]);
  const [bookmarkList, setBookMarkList] = useState([]);

  const [dynamicImageResume, setDynamicImageResume] = useState({
         dynamicImage:"",
         dynamicResume: ""
      });

  const navigate = useNavigate();



  // Fetch Data from Session Storage
  const authData = sessionStorage.getItem("authToken");
  const user = authData ? JSON.parse(authData).users : null;


  
 // For Dynamic Fetching Images

  useEffect(()=>{

    const fethPortalsData = async ()=> {

       // Fetch Data from Session Storage
      const authData = sessionStorage.getItem("authToken");

      const user = authData ? JSON.parse(authData).users : null;

      try {
        
        const response = await AuthorizationHeader.get(API_ENDPOINTS.FETCHDATAFORUSERSPORTAL,{
          params:{
            email : user?.email
          }
        });
        if(response.data.status === 200)
        {
          setDynamicImageResume(prev => ({
          ...prev,
          dynamicImage: response.data.data.profileImage || "",
          dynamicResume: response.data.data.resume || "",
          }));

          setIsLoading(true); 
        }
      } 
      catch (error) {
         setIsLoading(false); 
      }
    }

    fethPortalsData();

  },[]);


  const imageUrl = dynamicImageResume?.dynamicImage
  ? API_ENDPOINTS.FETCHIMAGE(dynamicImageResume?.dynamicImage)
  : dynamicImageResume?.dynamicImage
    ? API_ENDPOINTS.FETCHIMAGE(dynamicImageResume?.dynamicImage)
    : "https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png";


  useEffect(() => {
    if (user?.jobStatus) {
      setStatus(user.jobStatus);
    }
  }, []);

  useEffect(() => {
    // Scroll to the selected section when the component mounts
    if (activeTab) {
      const element = document.getElementById(activeTab);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    // for fetching profile views

    AuthorizationHeader.get(API_ENDPOINTS.PROFILEVIEWS(user.id))
      .then((response) => {
        setTotalViews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile views data:", error);
      });

    // for fetching resume views

    AuthorizationHeader.get(API_ENDPOINTS.RESUMEVIEWS(user.id))
      .then((response) => {
        setTotalResumeViews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resume views data:", error);
      });

    // for fetching bookmarks jobs

    AuthorizationHeader.get(API_ENDPOINTS.FETCHBOOKMARKS, {
        params: {
          email: user.email,
        },
      })
      .then((response) => {
        setBookMarkList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching bookmark list:", error);
      });
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId); // Set the active tab when a tab is clicked

    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: "smooth" });
  };

  const fullCircumference = 2 * Math.PI * 45;

  const [status, setStatus] = useState("");

  const handleChange = async (event) => {
    const newStatus = event.target.value;

    setStatus(newStatus);

    try {
      await AuthorizationHeader.get(API_ENDPOINTS.UPDATEUSERJOBSTATUS, {
          params: {
            email: user.email,
            jobStatus: newStatus,
          },
        })
        .then((response) => {

          if( response.data.status === 200) {

          toast.success("Status updated successfully!");
         
            //  Update jobStatus in sessionStorage
            
              const authData = sessionStorage.getItem("authToken");
              if (authData) {
                const parsed = JSON.parse(authData);
                if (parsed.users) {
                  parsed.users.jobStatus = newStatus;
                  sessionStorage.setItem("authToken", JSON.stringify(parsed));
                }
              }

          } else {
            toast.error("Failed to update status. Please try again.");
          }

        })
        .catch((error) => {
          console.error("Error updating status:", error);
          toast.error("Failed to update status. Please try again.");
        });
    } catch (error) {
      console.error("Failed to update job status:", error);
      setStatus(status);
      toast.error("Failed to update status. Please try again.");
    }
  };

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.JOBLIST)
      .then((response) => {
        setJobList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job list:", error);
        toast.error("Failed to fetch job list. Please try again.");
      });
  }, []);

  // Progess Line for Profile Completion

  const totalFields = 7; // Adjust based on the total number of important profile fields
  const filledFields = [
    user?.fullName,
    user?.education?.length > 0,
    user?.location,
    user?.phoneNo,
    user?.email,
    user?.skills?.length > 0,
    user?.workExperience?.length > 0,
  ].filter(Boolean).length; // Count non-empty fields

  const completionPercentage = Math.round((filledFields / totalFields) * 100);
  const maxStroke = 283; // Stroke length for full circle
  const strokeDashoffset = maxStroke - (maxStroke * completionPercentage) / 100;

  return (
    <>
      <UnifiedHeader />

      <div className="profile-banner progg">
        <Container>
          <Row className="align-items-center ">
            <Col md={12}>
              <div className=" mt-3 text-center">
                <h2 className="text-4xl font-bold mb-2">My Profile</h2>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="dash  py-1">
        <div className="container  mt-0 pt-1">
          <div className="row">
            <div className="flex flex-col lg:flex-row">
              {/* Left Column */}
              <div className="w-full lg:h-full lg:w-1/4 p-1">
                <div className="max-w-2xl mx-auto py-6 px-3 bg-white border rounded-lg shadow-sm">
                  {/* Profile Header */}
                  <div className="flex flex-col  items-center mb-2">
                    <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gray-300">
                      {/* Progress SVG Circle (Background + Foreground) */}
                      <svg
                        className="absolute w-28 h-28 z-0"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="lightgray"
                          strokeWidth="5"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="green"
                          strokeWidth="5"
                          fill="none"
                          strokeDasharray={fullCircumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          className="transition-all duration-500"
                        />
                      </svg>

                      {/* Loader spinner while image is loading */}
                      {isLoading && (
                        <div className="absolute w-10 h-10 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin z-10" />
                      )}

                      {/* Profile Image */}
                      {/* <img
                        src={
                          dynamicImageResume.dynamicImage
                            ? API_ENDPOINTS.FETCHIMAGE(dynamicImageResume.dynamicImage ||  user.profileImage)
                            : "https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                        }
                        alt="Profile"
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
                        className={`w-20 h-20 rounded-full object-cover z-20 transition-opacity duration-300 ${
                          isLoading ? "opacity-0" : "opacity-100"
                        }`}
                      /> */}
                      <img
                        src={imageUrl}
                        alt="Profile"
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
                        className={`w-20 h-20 rounded-full object-cover z-20 transition-opacity duration-300 ${
                          isLoading ? "opacity-0" : "opacity-100"
                        }`}
                      />

                      {/* Completion Text Badge */}
                      <div className="absolute bottom-[-12px] text-xs text-green-700 bg-green-200 rounded-full px-2 py-0.5 font-semibold shadow">
                        {completionPercentage}%
                      </div>
                    </div>

                    <div className="text-center mt-3">
                      <h1 className="text-xl pb-1 font-semibold text-gray-800">
                        {user?.fullName}
                      </h1>

                      {/* Display education if it's an array and has data */}
                      {Array.isArray(user?.education) &&
                      user.education.length > 0 ? (
                        <p className="text-sm text-gray-600">
                          {user.education
                            .map(
                              (edu) =>
                                edu.degree || edu.course || edu.institution
                            )
                            .join(", ")}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600">
                          No education details
                        </p>
                      )}

                      {/* Display address if available */}
                      <p className="text-sm text-gray-600">
                        {user?.location || "N/A"}
                      </p>

                      {/* Format and display created_at if available */}
                      {user?.createdAt ? (
                        <p className="text-xs mt-1 text-gray-400">
                          {new Date(user.createdAt).toLocaleDateString("en-GB")}
                        </p>
                      ) : (
                        <p className="text-xs mt-1 text-gray-400">N/A</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center ">
                    <button
                      onClick={() => navigate("/fillprofile")}
                      className="px-4 py-2 bg-blue-600  text-base text-white font-semibold rounded-[30px] shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Update Profile
                    </button>
                  </div>
                  <div className="profile-perf-wrapper bg-[#ECF4FF] py-3 px-3 mt-4 rounded-md">
                    <div className="text-md font-semibold flex justify-between items-center gap-2">
                      Profile performance
                      <div className="relative group">
                        {/* Info Icon */}
                        <InformationCircleIcon className="w-5 h-5 text-gray-600 cursor-pointer" />

                        {/* Tooltip Box */}
                       <div className="absolute top-full left-[-76px] sm:left-1/2 sm:left-1/2 transform -translate-x-1/2 mt-2 
                w-48 sm:w-64 md:w-72 lg:w-80 
                bg-gray-800 text-white text-xs p-3 rounded-md shadow-lg 
                opacity-0 group-hover:!opacity-100 
                transition-opacity duration-300 
                pointer-events-none z-50 
                text-center sm:text-left">
   Profile performance shows how your profile is doing
                          among recruiters. "Search appearances" are how many
                          times your profile appeared in searches. "Recruiter
                          actions" are when a recruiter interacted with your
                          profile.
                        </div>
                      </div>
                    </div>

                    {/* Profile performance content */}
                    <div className="profile-perf-content mt-4 flex justify-center gap-6">
                      <div className="searchAppWrapper">
                        <div className="text-gray-600 text-lg">
                          Search appearances
                        </div>
                        <a className="countWrapper flex items-center text-blue-600 font-semibold gap-2">
                          <span className="count text-xl">
                            {totalViews ? totalViews : 0}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                          <ArrowRightIcon className="w-4 h-4 text-blue-600" />
                        </a>
                      </div>
                    </div>

                    {/* Widget Section */}
                    <div className="naukri-dashboard-ff-widget mt-6 p-2 bg-white border border-gray-200 rounded-md flex items-center justify-between">
                      <div className="flex items-center gap-[2px]">
                        <FireIcon className="w-20 h-20 text-orange-500" />
                        <p className="text-sm text-gray-700 font-medium">
                          Profile 100% complete? Expect 3X more job
                          opportunities!
                        </p>
                      </div>
                      <a
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                        href="#"
                      >
                        <ArrowRightIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <ul className="tabs jobsul border-t pt-2 mt-4">
                    <li
                      className={`tab-item ${
                        activeTab === "section1" ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveTab("section1");
                        scrollToSection("section1");
                      }}
                    >
                      {/* Left Side: Home Icon and Text */}
                      <div className="left-icon">
                        <FontAwesomeIcon icon={faHome} className="text-lg" />{" "}
                        {/* Home Icon */}
                        <span>Home</span> {/* Text */}
                      </div>

                      {/* Right Side: Chevron Icon */}
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-lg right-icon"
                      />
                    </li>

                    <li
                      className={`tab-item ${
                        activeTab === "section2" ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveTab("section2");
                        scrollToSection("section2");
                      }}
                    >
                      {/* Left Side: Briefcase Icon and Text */}
                      <div className="left-icon">
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          className="text-lg"
                        />{" "}
                        {/* Jobs Icon */}
                        <span>Jobs</span> {/* Text */}
                      </div>

                      {/* Right Side: Chevron Icon */}
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-lg right-icon"
                      />
                    </li>

                    <li
                      className={`tab-item ${
                        activeTab === "section3" ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveTab("section3");
                        scrollToSection("section3");
                      }}
                    >
                      {/* Left Side: Briefcase Icon and Text */}
                      <div className="left-icon">
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          className="text-lg"
                        />{" "}
                        {/* Companies Icon */}
                        <span>Companies</span> {/* Text */}
                      </div>

                      {/* Right Side: Chevron Icon */}
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-lg right-icon"
                      />
                    </li>
                    <li
                      className={`tab-item ${
                        activeTab === "section4" ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveTab("section4");
                        scrollToSection("section4");
                      }}
                    >
                      {/* Left Side: Custom Icon and Text for Section 4 */}
                      <div className="left-icon">
                        <FontAwesomeIcon
                          icon={faNewspaper}
                          className="text-lg"
                        />{" "}
                        {/* Custom Icon */}
                        <span>Bookmarks</span>
                      </div>

                      {/* Right Side: Chevron Icon */}
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-lg right-icon"
                      />
                    </li>
                  </ul>
                </div>
              </div>

              {/* Middle Scrollable Column */}
              <div className="w-full lg:w-1/6  rounded-md h-full sm:h-auto max-h-full sm:max-h-[820px] p-2 flex-1 overflow-y-none sm:overflow-y-auto  scrollbar-hide">
                <div className="tab-contentt ">
                  <div id="section1" className="tab-section  ">
                    <div className="space-y-6 shadow-sm rounded-lg ">
                      <div className="relative w-full rounded-lg overflow-hidden ">
                        <img
                          src="assets/images/main/first-top.jpg"
                          alt="Banner Background"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-center items-start py-2  pl-3 w-80">
                          <h1 className="text-[25px] font-bold text-black">
                            Sharpen Your Interview Skills with XHIREZ!
                          </h1>
                          <p className=" text-black-400 text-sm">
                            Tailored mock interviews to help you land your dream
                            job.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6 shadow-sm rounded-lg  bg-white mt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-1">
                        <div className=" px-6 my-3 flex flex-col border-r items-center text-center">
                          <div className="mb-0">
                            <img
                              src="assets/images/icon/target.gif"
                              alt="Target Icon"
                              width="100px"
                            />
                          </div>
                          <h3 className=" border border-blue-300  py-2 px-3 text-sm rounded-[30px] font-bold text-black mb-2">
                            Profile Views{" "}
                            <span className="text-sm font-semibold text-gray-800">{`(${
                              totalViews ? totalViews : 0
                            })`}</span>
                          </h3>
                        </div>

                        <div className="s p-6 flex flex-col items-center text-center">
                          <div className="mb-0">
                            <img
                              src="assets/images/icon/discrimination.gif"
                              alt="Target Icon"
                              width="100px"
                            />
                          </div>
                          <h3 className=" border border-blue-300  py-2 px-3 text-sm rounded-[30px] font-bold text-black mb-2">
                            Recruiter Actions{" "}
                            <span className="text-sm font-semibold text-gray-800">{`(${
                              totalResumeViews || 0
                            })`}</span>
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6 shadow-sm rounded-lg mt-4 ">
                      <div className="relative w-full rounded-lg overflow-hidden ">
                        {/* Background Image */}
                        <img
                          src="assets/images/main/first-top.jpg" // Replace with your image URL
                          alt="Banner Background"
                          className="w-full h-full object-cover"
                        />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-center items-start py-2  pl-3 w-80">
                          <h1 className="text-[25px] font-bold text-black">
                            Sharpen Your Interview Skills with XHIREZ!
                          </h1>
                          <p className=" text-black-400 text-sm">
                            Tailored mock interviews to help you land your dream
                            job.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="section2"
                    className="ttab-section bg-white space-y-6 shadow-sm rounded-lg mt-4 p-4 sm:mt-3 sm:p-3 md:mt-2 md:p-2"
                  >
                    <div className="flex items-center justify-between ">
                      {/* Left Side: Heading */}
                      <h2 className="text-[13px] sm:text-xl md:text-2xl font-semibold text-gray-800">
                        Recommended jobs for you
                      </h2>

                      {/* Right Side: View All */}
                      <Link
                        to="/JobListInterface"
                        className="text-sm font-semibold text-blue-600 hover:underline"
                      >
                        View all
                      </Link>
                    </div>
                  

                    <div className="tab-content mt-0 pt-4 " id="myTabContent">
                      <div
                        className={`tab-pane fade ${
                          selectedTab === "home" ? "show active" : ""
                        }`}
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div className="myjob ">
                          <Swiper
                            spaceBetween={10}
                            slidesPerView={3} // Default number of slides for larger screens
                            breakpoints={{
                              // Define breakpoints for responsive behavior
                              0: {
                                slidesPerView: 1, // For mobile screens
                                spaceBetween: 10,
                              },
                              768: {
                                slidesPerView: 3, // For tablets and desktops
                                spaceBetween:10,
                              },
                            }}
                            // onSlideChange={() => console.log("slide change")}
                            // onSwiper={(swiper) => console.log(swiper)}
                          >
                            {jobList.length > 0 &&
                              jobList.map((job, index) => (
                                <SwiperSlide key={job.id || job._id || index}>
                                  <div className="items-center bg-white py-1 px-2 rounded-lg border">
                                    <div className="flex-shrink-0 flex justify-between items-start">
                                      {job.comp_logo ? (
                                        <img
                                          src={API_ENDPOINTS.FETCHIMAGE(
                                            job?.comp_logo
                                          )}
                                          alt={`${job.companyname} Logo`}
                                          className="w-12 h-12 object-contain rounded-full"
                                          onError={(e) =>
                                            (e.target.style.display = "none")
                                          }
                                        />
                                      ) : (
                                        <div className="w-12 h-12 flex items-center justify-center text-lg font-bold text-blue-600 bg-blue-100 rounded-full">
                                          {job.companyname
                                            ?.charAt(0)
                                            .toUpperCase() || "N/A"}
                                        </div>
                                      )}
                                      <div className="text-sm mt-1 text-gray-500">
                                        {new Date(
                                          job.job_posttime
                                        ).toLocaleDateString("en-GB")}
                                      </div>
                                    </div>
                                    <div className="ml-1 mt-2">
                                      <h3 className="text-sm font-semibold">
                                        {job.jobtitle || "Laravel Developer"}
                                      </h3>
                                      <p className="text-sm text-gray-600">
                                        {job.companyname || "N/A"}
                                      </p>
                                      {/* Location */}
                                      <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <FontAwesomeIcon
                                          icon={faMapMarkerAlt}
                                          className="mr-1"
                                        />
                                        {job.location || "N/A"}
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))}
                          </Swiper>
                        </div>
                      </div>
                      <div
                        className={`tab-pane fade ${
                          selectedTab === "link-1" ? "show active" : ""
                        }`}
                        id="link-1"
                        role="tabpanel"
                        aria-labelledby="link-1-tab"
                      >
                        {" "}
                        <div className="myjob ">
                          <Swiper
                            spaceBetween={10}
                            slidesPerView={3} // Default number of slides for larger screens
                            breakpoints={{
                              // Define breakpoints for responsive behavior
                              0: {
                                slidesPerView: 1, // For mobile screens
                                spaceBetween: 10,
                              },
                              768: {
                                slidesPerView: 3, // For tablets and desktops
                                spaceBetween: 10,
                              },
                            }}
                            // onSlideChange={() => console.log("slide change")}
                            // onSwiper={(swiper) => console.log(swiper)}
                          >
                            {jobList.length > 0 &&
                              jobList.map((job, index) => (
                                <SwiperSlide key={job.id || job._id || index}>
                                  <div className="items-center bg-white py-1 px-2 rounded-lg border">
                                    <div className="flex-shrink-0 flex justify-between items-start">
                                      {job.comp_logo ? (
                                        <img
                                          src={API_ENDPOINTS.FETCHIMAGE(
                                            job?.comp_logo
                                          )}
                                          alt={`${job.companyname} Logo`}
                                          className="w-12 h-12 object-contain rounded-full"
                                          onError={(e) =>
                                            (e.target.style.display = "none")
                                          }
                                        />
                                      ) : (
                                        <div className="w-12 h-12 flex items-center justify-center text-lg font-bold text-blue-600 bg-blue-100 rounded-full">
                                          {job.companyname
                                            ?.charAt(0)
                                            .toUpperCase() || "N/A"}
                                        </div>
                                      )}
                                      <div className="text-sm mt-1 text-gray-500">
                                        {new Date(
                                          job.job_posttime
                                        ).toLocaleDateString("en-GB")}
                                      </div>
                                    </div>
                                    <div className="ml-1 mt-2">
                                      <h3 className="text-sm font-semibold">
                                        {job.jobtitle || "Laravel Developer"}
                                      </h3>
                                      <p className="text-sm text-gray-600">
                                        {job.companyname || "N/A"}
                                      </p>
                                      {/* Location */}
                                      <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <FontAwesomeIcon
                                          icon={faMapMarkerAlt}
                                          className="mr-1"
                                        />
                                        {job.location || "N/A"}
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))}
                          </Swiper>
                        </div>
                      </div>
                      <div
                        className={`tab-pane fade ${
                          selectedTab === "link-2" ? "show active" : ""
                        }`}
                        id="link-2"
                        role="tabpanel"
                        aria-labelledby="link-2-tab"
                      >
                        {" "}
                        <div className="myjob ">
                          <Swiper
                            spaceBetween={10}
                            slidesPerView={3} // Default number of slides for larger screens
                            breakpoints={{
                              // Define breakpoints for responsive behavior
                              0: {
                                slidesPerView: 1, // For mobile screens
                                spaceBetween: 10,
                              },
                              768: {
                                slidesPerView: 3, // For tablets and desktops
                                spaceBetween: 10,
                              },
                            }}
                            // onSlideChange={() => console.log("slide change")}
                            // onSwiper={(swiper) => console.log(swiper)}
                          >
                            {jobList.length > 0 &&
                              jobList.map((job, index) => (
                                <SwiperSlide key={job.id || job._id || index}>
                                  <div className="items-center bg-white py-1 px-2 rounded-lg border">
                                    <div className="flex-shrink-0 flex justify-between items-start">
                                      {job.comp_logo ? (
                                        <img
                                          src={API_ENDPOINTS.FETCHIMAGE(
                                            job?.comp_logo
                                          )}
                                          alt={`${job.companyname} Logo`}
                                          className="w-12 h-12 object-contain rounded-full"
                                          onError={(e) =>
                                            (e.target.style.display = "none")
                                          }
                                        />
                                      ) : (
                                        <div className="w-12 h-12 flex items-center justify-center text-lg font-bold text-blue-600 bg-blue-100 rounded-full">
                                          {job.companyname
                                            ?.charAt(0)
                                            .toUpperCase() || "N/A"}
                                        </div>
                                      )}
                                      <div className="text-sm mt-1 text-gray-500">
                                        {new Date(
                                          job.job_posttime
                                        ).toLocaleDateString("en-GB")}
                                      </div>
                                    </div>
                                    <div className="ml-1 mt-2">
                                      <h3 className="text-sm font-semibold">
                                        {job.jobtitle || "Laravel Developer"}
                                      </h3>
                                      <p className="text-sm text-gray-600">
                                        {job.companyname || "N/A"}
                                      </p>
                                      {/* Location */}
                                      <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <FontAwesomeIcon
                                          icon={faMapMarkerAlt}
                                          className="mr-1"
                                        />
                                        {job.location || "N/A"}
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))}
                          </Swiper>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="section3"
                    className="tab-section bg-white space-y-6 shadow-sm rounded-lg mt-4 p-4"
                  >
                    <div className="flex items-center justify-between ">
                      {/* Left Side: Heading */}
                      <h2 className="text-[13px] sm:text-xl md:text-2xl font-semibold text-gray-800">
                        Top Employers in the Industry
                      </h2>
                      {/* Right Side: View All */}
                      {/* <Link
                        to="#"
                        className="text-sm font-semibold text-blue-600 hover:underline"
                      >
                        View all
                      </Link> */}
                    </div>

                    <Swiper
                      spaceBetween={10}
                      slidesPerView={3} // Default number of slides for larger screens
                      breakpoints={{
                        // Define breakpoints for responsive behavior
                        0: {
                          slidesPerView: 1, // For mobile screens
                          spaceBetween: 10,
                        },
                        768: {
                          slidesPerView: 3, // For tablets and desktops
                          spaceBetween: 10,
                        },
                      }}
                      // onSlideChange={() => console.log("slide change")}
                      // onSwiper={(swiper) => console.log(swiper)}
                    >
                      {jobList.length > 0 &&
                        jobList.map((job, index) => (
                          <SwiperSlide key={job.id || job._id || index}>
                            <div className="flex flex-col items-center bg-white py-2 px-1 rounded-lg border shadow-sm hover:shadow-md transition">
                              <div className="flex items-center justify-center mb-2 w-20 h-20 bg-gray-100 rounded-full">
                                {job.comp_logo ? (
                                  <img
                                    className="w-20 h-20 object-contain rounded-full"
                                    src={API_ENDPOINTS.FETCHIMAGE(
                                      job.comp_logo
                                    )}
                                    alt={`${job.companyname} Logo`}
                                    onError={(e) =>
                                      (e.target.style.display = "none")
                                    }
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-blue-600 bg-blue-100 rounded-full">
                                    {job.companyname?.charAt(0).toUpperCase() ||
                                      "N"}
                                  </div>
                                )}
                              </div>

                              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                {job.companyname || "N/A"}
                              </h3>

                              <p className="text-sm text-gray-600 mb-1 font-medium text-center px-2">
                                {job.jobtitle}
                              </p>

                              {/* <div className="flex justify-center items-center mb-1 text-xs">
          <img
            className="w-3 h-3 mr-2"
            src="//static.naukimg.com/s/7/0/assets/images/src/widgets/naukri-mnj-top-comp-wdgt/v1/assets/star.0c3747c9.svg"
            alt="Rating"
          />
          <span className="font-semibold text-gray-800">3.7 |</span>
          <span className="text-gray-500 ml-2">485 reviews</span>
        </div> */}

                              <div className="text-sm text-gray-600 mb-1">
                                <strong>Location:</strong> {job.location}
                              </div>

                              <div className="text-sm text-gray-600 mb-1">
                                <strong>Type:</strong> {job.jobtype}
                              </div>

                              <div className="text-sm text-gray-600 mb-1">
                                <strong>Experience:</strong> {job.minExperience}
                                –{job.maxExperience} years
                              </div>

                              {/* <div className="text-sm text-gray-600 mb-1">
          <strong>Salary:</strong> ₹{job.minimumsalary}–₹{job.MaximumSalary}
        </div>

        <div className="text-sm text-gray-600 mb-1 text-center">
          <strong>Skills:</strong> {job.skills}
        </div> */}

                              <Link
                                to={`/applyjob/${job.id}`}
                                className="mt-2 text-sm text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition px-4 py-1 border border-blue-600 inline-block text-center"
                              >
                                View Jobs
                              </Link>
                            </div>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                  <div
                    id="section4"
                    className="tab-section space-y-6 bg-white shadow-sm rounded-lg mt-4 p-4"
                  >
                    <div className="flex items-center justify-between ">
                      {/* Left Side: Heading */}
                      <h2 className="text-[13px] sm:text-xl md:text-2xl font-semibold text-gray-800">
                        Handpicked Roles You've Bookmarked
                      </h2>
                      {/* Right Side: View All */}
                      {/* <Link
                        to="#"
                        className="text-sm font-semibold text-blue-600 hover:underline"
                      >
                        View all
                      </Link> */}
                    </div>
                    <Swiper
                      spaceBetween={10}
                      slidesPerView={3} // Default number of slides for larger screens
                      breakpoints={{
                        // Define breakpoints for responsive behavior
                        0: {
                          slidesPerView: 1, // For mobile screens
                          spaceBetween: 10,
                        },
                        768: {
                          slidesPerView: 3, // For tablets and desktops
                          spaceBetween: 10,
                        },
                      }}
                      // onSlideChange={() => console.log("slide change")}
                      // onSwiper={(swiper) => console.log(swiper)}
                    >
                      {bookmarkList?.map((job, index) => (
                        <SwiperSlide key={index}>
                          <div className="items-center bg-white py-1 px-2 rounded-lg border">
                            <div className="flex-shrink-0 flex justify-between">
                              {job.comp_logo ? (
                                <img
                                  src={API_ENDPOINTS.FETCHIMAGE(job.comp_logo)}
                                  alt={`${job.companyname} Logo`}
                                  className="w-12 h-12 object-contain rounded-full"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-lg">
                                  {job.companyname?.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div className="text-sm mt-3 text-gray-500">
                                {new Date(job.job_posttime).toLocaleDateString(
                                  "en-GB"
                                )}
                              </div>
                            </div>

                            <div className="ml-1 flex-grow">
                              <h3 className="text-sl font-semibold">
                                {job.jobtitle || "N/A"}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {job.companyname || "N/A"}
                              </p>

                              {/* Location */}
                              <div className="flex items-center text-sm text-gray-500 mb-1">
                                <FontAwesomeIcon
                                  icon={faMapMarkerAlt}
                                  className="mr-1"
                                />
                                {job.location || "N/A"}
                              </div>
                            </div>

                            {/* View Jobs Link */}
                            <Link
                              to={`/applyjob/${job.id}`}
                              className="mt-2 text-sm text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition px-4 py-1 border border-blue-600 inline-block text-center"
                            >
                              View Jobs
                            </Link>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="w-full lg:w-1/5 ">
                <div className="space-y-6 bg-white mx-1 mt-1 rounded-md shadow-md py-4 px-3">
                  <h2 className="text-xl font-semibold text-center mb-3">
                    Where are you in your job search journey?
                  </h2>
                  {status && (
                    <div className="mt-2 mb-3 text-center">
                      <p className="text-sm font-semibold text-green-600">
                        Your status: {status}
                      </p>
                    </div>
                  )}
                  <div className="space-y-4">
                    <label
                      className={`flex items-center space-x-3 border px-3 py-2 rounded-full cursor-pointer ${
                        status === "Actively searching jobs"
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="jobSearchStatus"
                        value="Actively searching jobs"
                        checked={status === "Actively searching jobs"}
                        onChange={handleChange}
                        className="form-radio text-blue-500"
                      />
                      <span className="text-sm">Actively searching jobs</span>
                    </label>

                    <label
                      className={`flex items-center space-x-3 border px-3 py-2 rounded-full cursor-pointer ${
                        status === "Preparing for interviews"
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="jobSearchStatus"
                        value="Preparing for interviews"
                        checked={status === "Preparing for interviews"}
                        onChange={handleChange}
                        className="form-radio text-blue-500"
                      />
                      <span className="text-sm">Preparing for interviews</span>
                    </label>

                    <label
                      className={`flex items-center space-x-3 border px-3 py-2 rounded-full cursor-pointer ${
                        status === "Appearing for interviews"
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="jobSearchStatus"
                        value="Appearing for interviews"
                        checked={status === "Appearing for interviews"}
                        onChange={handleChange}
                        className="form-radio text-blue-500"
                      />
                      <span className="text-sm">Appearing for interviews</span>
                    </label>

                    <label
                      className={`flex items-center space-x-3 border px-3 py-2 rounded-full cursor-pointer ${
                        status === "Received a job offer"
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="jobSearchStatus"
                        value="Received a job offer"
                        checked={status === "Received a job offer"}
                        onChange={handleChange}
                        className="form-radio text-blue-500"
                      />
                      <span className="text-sm">Received a job offer</span>
                    </label>

                    <label
                      className={`flex items-center space-x-3 border px-3 py-2 rounded-full cursor-pointer ${
                        status === "Casually exploring jobs"
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="jobSearchStatus"
                        value="Casually exploring jobs"
                        checked={status === "Casually exploring jobs"}
                        onChange={handleChange}
                        className="form-radio text-blue-500"
                      />
                      <span className="text-sm">Casually exploring jobs</span>
                    </label>

                    <label
                      className={`flex items-center space-x-3 border px-3 py-2 rounded-full cursor-pointer ${
                        status === "Not looking for jobs"
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="jobSearchStatus"
                        value="Not looking for jobs"
                        checked={status === "Not looking for jobs"}
                        onChange={handleChange}
                        className="form-radio text-blue-500"
                      />
                      <span className="text-sm">Not looking for jobs</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-6 bg-white mx-1 mt-3 rounded-md shadow-md py-3 px-2">
                  <div className="w-full max-w-md mx-auto ">
                    <h2 className="text-xl font-semibold text-center mb-1">
                      Apply on the Go
                    </h2>
                    <p className="text-sm text-center text-gray-700 mb-1">
                      Get real-time job updates on our App
                    </p>

                    <div className="justify-center ">
                      <Link
                        to=""
                        href="https://apps.apple.com/us/app"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="assets/images/icon/playstore.png" // Apple Store image
                          alt="Download on the App Store"
                          className="w-full h-auto"
                        />
                      </Link>

                      <Link
                        to=""
                        href="https://play.google.com/store/apps/details?id=com.yourapp" // Replace with actual Android link
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="assets/images/icon/ios.png" // Google Play image
                          alt="Get it on Google Play"
                          className="w-full h-auto"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <ToastContainer />
    </>
  );
};

export default ProfileDashboard;