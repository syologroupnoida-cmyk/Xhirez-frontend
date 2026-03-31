import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faUser, faBell, faSignOutAlt, faCog, faMagnifyingGlass, faTimes, faUserPlus, faEye, faDownload, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Paper } from "@mantine/core";
import { Link } from 'react-router-dom';
import Navlinks from './seekernavlink';
import Topbar from './seekertopbar';
import fabimage from '../../../public/assets/images/logo/Xhirez-Logo.png';
import axios from 'axios';
import { API_ENDPOINTS } from '../../views/apiConfig';
import { useNavigate } from 'react-router-dom';
import AuthorizationHeader from '../../views/AuthorizationHeader';
import { toast, ToastContainer } from 'react-toastify';

const Seekernavbar = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const dropdownStyles = {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    maxHeight: '200px',
    overflowY: 'auto',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    zIndex: 10,
  };

  const dropdownItemStyles = {
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#333',
    backgroundColor: 'white',
    transition: 'background-color 0.3s',
  };

  dropdownItemStyles[':hover'] = {
    backgroundColor: '#f0f0f0',
  };

  const [userName, setUserName] = useState('');
  const [hovered, setHovered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [jobTitles, setJobTitles] = useState([]);
  const [loadingJob, setLoadingJob] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [skill, setSkill] = useState('');
  const [isNavExpanded, setIsNavExpanded] = useState(false); // Separate state for nav links
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); // Separate state for search bar
  const [loginId, setLoginId] = useState('');
  const [profileViewNotification , setProfileViewNotification] =useState([]);
  const [resumeDownloadNotifications , setResumeDownloadNotifications] = useState([]);

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken') || localStorage.getItem('authToken');
    if (authToken) {
      const parsedToken = JSON.parse(authToken);
      const name = parsedToken?.users?.fullName;

      setLoginId(parsedToken?.users?.id);
      setUserName(name);
    }
  }, []);


  useEffect(() => {

    const fetchProfileViews = async () => {
      try {
        if (loginId) {
          const response = await AuthorizationHeader.get(API_ENDPOINTS.FETCHPROFILEVIEWSNOTIFICATIONS(loginId));
          if (response.data.status === 200) {
            setProfileViewNotification(response.data.data || []);
          }
        }
      } catch (error) {
        console.error("Error fetching profile views:", error);
      }
    };

    const fetchResumeDownloads = async () => {
      try {
        if (loginId) {
          const response = await AuthorizationHeader.get(API_ENDPOINTS.FETCHRESUMEVIEWSNOTIFICATIONS(loginId));
          if (response.data.status === 200) {
            setResumeDownloadNotifications(response.data.data || []);
          }
        }
      } catch (error) {
        console.error("Error fetching resume downloads:", error);
      }
    };

    fetchProfileViews();
    fetchResumeDownloads();
  }, [loginId]);

  const handleNavToggle = () => {
    setIsNavExpanded(!isNavExpanded);
    if (isSearchExpanded) setIsSearchExpanded(false); // Close search bar if open
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isNavExpanded) setIsNavExpanded(false); // Close nav links if open
  };

  const handleJobTitleChange = (e) => {
    const value = e.target.value;
    setJobTitle(value);

    if (value) {
      setLoadingJob(true);
      AuthorizationHeader.get(API_ENDPOINTS.FETCHSUGGESTIONS(value))
        .then((response) => {
          if (response.data) {
            const formattedSuggestions = response.data.map((item) => item.Data || item);
            setJobTitles(formattedSuggestions);
          } else {
            setJobTitles([]);
          }
          setLoadingJob(false);
        })
        .catch((error) => {
          console.error("Error fetching job titles:", error);
          setLoadingJob(false);
        });
    } else {
      setJobTitles([]);
      setLoadingJob(false);
    }
  };

  const handleJobSuggestionClick = (suggestion) => {
    setJobTitle(suggestion);
    setJobTitles([]);
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value) {
      setLoadingLocation(true);
      axios
        .post("https://countriesnow.space/api/v0.1/countries/cities", {
          country: "India",
        })
        .then((response) => {
          if (response.data?.data) {
            const filteredCities = response.data.data.filter((city) =>
              city.toLowerCase().startsWith(value.toLowerCase())
            );
            setLocationSuggestions(filteredCities);
          } else {
            setLocationSuggestions([]);
          }
          setLoadingLocation(false);
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

  const handleLocationSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setLocationSuggestions([]);
  };

  const handleSearch = () => {
    if (!jobTitle || !location || !skill) {
      toast.error("Please enter all the details to search.");
      return;
    }
    navigate(`/dashboardJobs?title=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}&skill=${encodeURIComponent(skill)}`);
    setIsSearchExpanded(false); // Close search bar after search
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const authData = sessionStorage.getItem("authToken");
        const user = authData ? JSON.parse(authData).users : null;

        if (user) {
          const skills = user.skills;

          if (skills && skills.length > 0) {
            const response = await AuthorizationHeader.post(
              API_ENDPOINTS.FETCHNOTIFICATIONS,
              { skills }
            );

            if (response.data.status !== 200) {
              console.error("Failed to fetch notifications");
              return;
            }
            const jobs = response.data.data;

            if (Array.isArray(jobs)) {
              setNotifications(jobs);
            } else {
              setNotifications([]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching notifications: ", error);
      }
    };

    fetchNotifications();
  }, []);

  const triggerInputClick = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
      inputRef.current.click();
    }
  };

  return (
    <>
      <ToastContainer/>

      {Topbar()}
      <nav className="bg-[#ECF4FF] w-full max-w-full pt-1 md:!pt-0  relative md:flex justify-between h-16 items-center px-4 sm:px-8 md:px-12 lg:!px-[120px]">
        
        {isNavExpanded && (
          <div className="absolute top-16 left-0 py-6 px-4 w-full bg-white z-50 md:hidden">
            <Navlinks onInputClick={triggerInputClick} />
          </div>
        )}
        <div className="hidden md:block">
          <Navlinks onInputClick={triggerInputClick} />
        </div>

        {/* Right Section (Search, Hamburger, Notification, Avatar) */}
        <div className="avtar flex items-center gap-3 sm:gap-3 justify-between md:justify-end">
          {/* Search Bar */}
          <div id="serrach" className="flex items-center gap-2">
            <div className="w-full max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto">
              {!isSearchExpanded ? (
                <div
                  onClick={handleSearchToggle}
                  className="relative bg-white rounded-full w-36 sm:w-full py-1 md:!py-2 pl-4 pr-16 sm:pr-20 cursor-pointer shadow-sm flex items-center"
                >
                  <input
                    ref={inputRef}
                    id="job-search-input"
                    className="cursor-pointer rounded-full w-full text-xs sm:text-sm focus:outline-none bg-transparent"
                    placeholder="Job title, Location"
                    readOnly
                    onClick={handleSearchToggle}
                  />
                  <div className="text-white px-3 py-1 text-xs sm:text-sm flex justify-center items-center w-16 sm:w-20 rounded-full absolute top-1/2 -translate-y-1/2 right-1 bg-[#05A2E4]">
                    Search
                  </div>
                </div>
              ) : (
                <>
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleSearchToggle}></div>
                  <div
                    className="fixed inset-x-4 top-1/4 z-50 gap-4 sm:left-[5%] sm:right-[5%] md:left-[10%] md:right-[10%] lg:left-[15%] lg:right-[15%] bg-white shadow-md p-4 rounded-xl flex flex-col sm:flex-row items-center backdrop-blur-sm transition-all duration-500 transform scale-95 sm:scale-100"
                    style={{ animation: "zoomInFromBottom 0.5s ease-out" }}
                  >
                    <div className="w-full relative">
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={jobTitle}
                        onChange={handleJobTitleChange}
                        className="border w-full px-3 py-2 rounded-lg text-sm focus:outline-none"
                      />
                      {loadingJob && (
                        <div className="absolute text-xs mt-1 text-gray-500">Loading job titles...</div>
                      )}
                      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
                      {jobTitles.length > 0 && (
                        <ul style={{ ...dropdownStyles, fontSize: '12px' }}>
                          {jobTitles.map((title, index) => (
                            <li
                              key={index}
                              onClick={() => handleJobSuggestionClick(title)}
                              style={dropdownItemStyles}
                            >
                              {title}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="w-full relative">
                      <input
                        type="text"
                        placeholder="Location (City)"
                        value={location}
                        onChange={handleLocationChange}
                        className="border w-full px-3 py-2 rounded-lg text-sm focus:outline-none"
                      />
                      {loadingLocation && (
                        <div className="absolute text-xs mt-1 text-gray-500">Loading locations...</div>
                      )}
                      {locationSuggestions.length > 0 && (
                        <ul style={{ ...dropdownStyles, fontSize: '12px' }}>
                          {locationSuggestions.map((city, index) => (
                            <li
                              key={index}
                              onClick={() => handleLocationSuggestionClick(city)}
                              style={dropdownItemStyles}
                            >
                              {city}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="w-full">
                      <select
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        className="border w-full px-3 py-2 rounded-lg text-sm focus:outline-none"
                      >
                        <option value="" disabled>Select Experience</option>
                        <option value="0-1 years">0-1 years</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>
                    <div className="w-full">
                      <button
                        onClick={handleSearch}
                        className="bg-[#05A2E4] text-white w-full px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 text-sm"
                      >
                        <FontAwesomeIcon className="pr-2" icon={faMagnifyingGlass} />
                        Search
                      </button>
                    </div>
                    <div
                      onClick={handleSearchToggle}
                      className="absolute top-2 right-2 p-1 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faTimes} className="text-gray-600 text-base" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

         <div className='flex gap-3'>
          {/* Hamburger Menu for Navigation */}
          <button
            type="button"
            className="md:hidden text-grey focus:outline-none"
            aria-label="Toggle navigation"
            onClick={handleNavToggle}
          >
            <span className="block w-5 h-0.5 bg-[#05A2E4] mb-1"></span>
            <span className="block w-5 h-0.5 bg-[#05A2E4] mb-1"></span>
            <span className="block w-5 h-0.5 bg-[#05A2E4]"></span>
          </button>


          <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
           >
          <div className="relative flex items-center justify-center w-10 h-10 bg-transparent text-[#05A2E4] rounded-full cursor-pointer border-2 border-[#05A2E4]">
            <FontAwesomeIcon icon={faBell} className="text-sm sm:text-base" />
            {(profileViewNotification.length > 0 ||
              resumeDownloadNotifications.length > 0 ||
              notifications.length > 0) && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></div>
            )}
          </div>

          {isHovered && (
            <div className="absolute right-0 mt-2 w-64 sm:w-72 z-50 bg-white rounded-xl shadow-lg p-3 max-h-60 overflow-y-auto">
              <h2 className="text-base sm:text-lg font-bold mb-2">Notifications</h2>

              {/* Profile Views Section */}
              {profileViewNotification.length > 0 && (
                <>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Profile Views</h3>
                  <ul className="mb-2">
                    {profileViewNotification.map((notif, index) => (
                      <li key={`pv-${index}`} className="flex gap-2 items-start mb-1">
                        <FontAwesomeIcon icon={faEye} className="text-gray-600 pt-1" />
                        <div className="text-gray-700 text-sm">
                         {notif?.message}
                          <div className="text-xs text-gray-400">
                            {new Date(notif?.viewTime).toLocaleString()}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <hr className="my-2" />
                </>
            )}

      {/* Resume Downloads Section */}
      {resumeDownloadNotifications.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Resume Downloads</h3>
          <ul className="mb-2">
            {resumeDownloadNotifications.map((notif, index) => (
              <li key={`rd-${index}`} className="flex gap-2 items-start mb-1">
                <FontAwesomeIcon icon={faDownload} className="text-gray-600 pt-1" />
                <div className="text-gray-700 text-sm">
                   {notif?.message}
                  <div className="text-xs text-gray-400">
                    {new Date(notif?.viewTime).toLocaleString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <hr className="my-2" />
        </>
      )}

      {/* Job Recommendations Section */}
      {notifications.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Job Recommendations</h3>
          <ul className="mb-2">
            {notifications.map((notif, index) => (
              <li key={`sj-${index}`} className="flex gap-2 items-start mb-1">
                <FontAwesomeIcon icon={faBriefcase} className="text-gray-600 pt-1" />
                <div className="text-gray-700 text-sm">
                  <Link to={`/applyjob/${notif?.id}`} className="hover:text-blue-600">
                    {notif?.companyname} - {notif?.jobtitle}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* No Notifications Fallback */}
      {profileViewNotification.length === 0 &&
        resumeDownloadNotifications.length === 0 &&
        notifications.length === 0 && (
          <div className="text-gray-500 text-sm">No notifications</div>
        )}
    </div>
  )}
</div>


          {/* Avatar and Profile Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar
              className="border-2 border-[#05A2E4] bg-[#E0F4FF] text-[#05A2E4] font-bold text-sm sm:text-base  !rounded-full"
              radius="xl"
            >
              {userName ? userName.charAt(0).toUpperCase() : ''}
            </Avatar>
            {hovered && (
              <Paper shadow="md" className="absolute right-0 mt-2 w-36 sm:w-40 bg-white p-3 rounded-xl text-sm z-50">
                <ul className="space-y-2">
                  <li className="border-b">
                    {userName && (
                      <div className="text-center text-xs sm:text-sm font-semibold text-[#05A2E4] pb-2">
                        Hey, {userName}
                      </div>
                    )}
                  </li>
                  <li className="flex items-center justify-between bg-white py-1 px-2 rounded hover:text-[#07A1E3] transition duration-300">
                    <Link to="/profile">Profile</Link>
                    <FontAwesomeIcon icon={faUser} className="text-xs" />
                  </li>
                  <li className="flex items-center justify-between bg-white py-1 px-2 rounded hover:text-[#07A1E3] transition duration-300">
                    <Link to="/logout">Log Out</Link>
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-xs" />
                  </li>
                </ul>
              </Paper>
            )}
          </div>
         </div>
        </div>

        {/* Custom CSS */}
        <style>{`
          @keyframes zoomInFromBottom {
            0% {
              transform: scale(0.8) translateY(20px);
              opacity: 0;
            }
            100% {
              transform: scale(1) translateY(0);
              opacity: 1;
            }
          }
          @media (max-width: 768px) {
            .avtar {
              gap: 0.5rem;
            }
            #serrach input {
              font-size: 0.75rem;
              padding: 0.5rem;
            }
            #serrach .w-20 {
              width: 4rem;
              font-size: 0.75rem;
              padding: 0.25rem;
            }
            .fixed.inset-x-2 {
              padding: 0.75rem;
            }
            
            .absolute.w-36 {
              width: 120px;
            }
          }
          @media (min-width: 768px) and (max-width: 1024px) {
            .avtar {
              gap: 0.75rem;
            }
            #serrach input {
              font-size: 0.875rem;
            }
            #serrach .w-20 {
              width: 5rem;
            }
            .fixed.inset-x-4 {
              padding: 1rem;
            }
            .absolute.w-64 {
              width: 280px;
            }
            .absolute.w-36 {
              width: 160px;
            }
          }
        `}</style>
      </nav>
    </>
  );
};

export default Seekernavbar;