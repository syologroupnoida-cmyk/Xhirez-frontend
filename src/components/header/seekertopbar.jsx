import React, { useState, useEffect } from 'react';
import { Row, Col, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../views/recruitment/recruiterlogin';
import { faUserTie,faMagnifyingGlass, faTimes,  faPhoneVolume, faSearch, faMobileAlt, faHeadset} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "@/router-dom";
import axios from 'axios';
import { API_ENDPOINTS } from '../../views/apiConfig';
import AuthorizationHeader from '../../views/AuthorizationHeader';


const Topbar = () => {

  const navigate = useNavigate();

   const [skill, setSkill] = useState("");
  const [jobTitle, setJobTitle] = useState(''); // Store the job title
  const [jobTitles, setJobTitles] = useState([]); // Store job title suggestions
   const [loadingJob, setLoadingJob] = useState(false); // Job loading state
  const [loadingLocation, setLoadingLocation] = useState(false); // Location loading state
  const [error, setError] = useState(''); // Store any error message
 // Function to handle job title input change
 const handleJobTitleChange = (e) => {
  const value = e.target.value;
  setJobTitle(value);

  if (value) {
    setLoadingJob(true);
    AuthorizationHeader.get(API_ENDPOINTS.FETCHSUGGESTIONS(value))
      .then((response) => {
        if (response.data) {
          const formattedSuggestions = response.data.map((item) => item.Data);
          setJobTitles(formattedSuggestions);
          setLoadingJob(false);
        } else {
          setJobTitles([]);
          setLoadingJob(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
        setError("Failed to fetch job titles");
        setLoadingJob(false);
      });
  } else {
    setJobTitles([]);
    setLoadingJob(false);
  }
};
// Function to handle when a job title suggestion is clicked
const handleJobSuggestionClick = (suggestion) => {
  setJobTitle(suggestion);
  setJobTitles([]);
};


// Function to handle location input change
const handleLocationChange = (e) => {
  const value = e.target.value;
  setLocation(value);

  if (value) {
    setLoadingLocation(true);
    axios
      .post("https://countriesnow.space/api/v0.1/countries/cities", {
        country: "India",  // You can dynamically change the country if needed
      })
      .then((response) => {
        if (response.data?.data) {
          const filteredCities = response.data.data.filter((city) =>
            city.toLowerCase().startsWith(value.toLowerCase()) // Filter based on user input
          );
          setLocationSuggestions(filteredCities);
          setLoadingLocation(false);
        } else {
          setLocationSuggestions([]);
          setLoadingLocation(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
        setLocationSuggestions([]);
        setLoadingLocation(false);
      });
  } else {
    setLocationSuggestions([]);
    setLoadingLocation(false);
  }
};


// Function to handle when a location suggestion is clicked
const handleLocationSuggestionClick = (suggestion) => {
  setLocation(suggestion);
  setLocationSuggestions([]);
};

  
    const [isExpanded, setIsExpanded] = useState(false);
    const handleSearchExpand = () => {
      setIsExpanded(!isExpanded);
    };
    
    // Manage open states for hover elements
    const [openElement, setOpenElement] = useState(null);
    
    const handleElementToggle = (element) => {
      setOpenElement(prev => prev === element ? null : element);
    };

  const [location, setLocation] = useState('');  
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  
  // for search jobs using three parameters

  const handleSearch = () => {
    if (!jobTitle || !location || !skill) {  
      alert("Please enter all the details to search."); 
      return;
    }
  
    navigate(`/alljob?title=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}&skill=${encodeURIComponent(skill)}`);

  };

 
    return (
        <>
          <div className="bg-[#ECF4FF] py-1 border-b rounded-[10px]">
          <Container>
          <Row className="items-center">
  {/* Left Column for Logo */}
  <Col xs={12} md={6} className=" md:mb-0">
    <div className="flex justify-center md:justify-start items-center">
      <Link to="/">
        <img
          src="/assets/images/logo/Xhirez-Logo.png"
          alt="Xhirez"
          className="w-48 sm:w-[162px]"
        />
      </Link>
    </div>
  </Col>

  {/* Right Column for App Download & Support */}
  <Col xs={12} md={6} className="flex justify-between sm:justify-center mb-1 md:flex-row md:justify-end items-center sm:gap-6">
    {/* App Download Button */}
    <div
      className="relative"
      onMouseEnter={() => handleElementToggle('app')}
      onMouseLeave={() => handleElementToggle(null)}
    >
      <div className="relative text-gray-500 sm:pl-7 pl-9 rounded-full cursor-pointer text-center md:text-left">
        <FontAwesomeIcon
          className="mr-2 absolute left-0 sm:left-[-13px] top-[-3px] text-[#05A2E4] border-2 border-[#05A2E4] px-2 py-[6px] rounded-full"
          icon={faMobileAlt}
        />
        Download Our App
      </div>

      {openElement === 'app' && (
        <div className="absolute right-0 mt-1 w-full left-0 sm:w-64 z-20 bg-white rounded-2xl shadow-sm p-4">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-center mb-1">Apply on the Go</h2>
            <p className="text-sm text-center text-gray-700 mb-1">
              Get real-time job updates on our App
            </p>
            <div className="justify-center flex flex-col items-center gap-2">
              <Link
                to="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/icon/playstore.png"
                  alt="Download on the App Store"
                  className="w-full"
                />
              </Link>
              <Link
                to="https://apps.apple.com/us/app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/icon/ios.png"
                  alt="Get it on Google Play"
                  className="w-full"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* 24x7 Support */}
    <div
      className="relative"
      onMouseEnter={() => handleElementToggle('support')}
      onMouseLeave={() => handleElementToggle(null)}
    >
      <div className="relative text-gray-500 pl-7 rounded-full cursor-pointer text-center md:text-left">
        <FontAwesomeIcon
          className="mr-2 absolute left-[-13px] top-[-3px] text-[#05A2E4] border-2 border-[#05A2E4] px-2 py-[7px] rounded-full"
          icon={faHeadset}
        />
        24*7 Support
      </div>

      {openElement === 'support' && (
        <div className="absolute right-0 mt-1 w-64 z-20 bg-white rounded-2xl shadow-sm p-4">
          <div className="w-full max-w-md mx-auto">
            <h3 className="text-start pb-1">Always Here to Assist You!</h3>
            <Link
              to="tel:+91 7011741092"
              className="text-xl font-semibold text-black text-center mb-1"
            >
              <FontAwesomeIcon
                className="text-[#05A2E4] mr-2"
                icon={faPhoneVolume}
              />
              +91 7011741092
            </Link>
          </div>
        </div>
      )}
    </div>
  </Col>
</Row>

        </Container>
      </div>
    </>
  );
};

export default Topbar;
