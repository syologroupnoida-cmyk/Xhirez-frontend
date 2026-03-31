import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Paper } from '@mantine/core';
import Recruiternavlinks from './recruiter-navlinks';
import Recruitmenttopbar from './recruitment-topbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../../views/apiConfig';
import fabimage from '../../../public/assets/images/logo/Xhirez-Logo.png';
import AuthorizationHeader from '../../views/AuthorizationHeader';

const Recruitmentnavbar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [userName, setUserName] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false); // Toggle for nav links
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Toggle for profile sidebar
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false); // Toggle for avatar dropdown

  const authToken = sessionStorage.getItem('authToken');
  const user = authToken ? JSON.parse(authToken).users : null;

  useEffect(() => {
    if (user) {
      setUserName(user.fullName);
      setEmail(user?.email);
    }
  }, []);

  const [formData, setFormData] = useState({
    companyName: '',
    contactNumber: '',
    industryType: '',
    companyAddress: '',
    yearOfEstablish: '',
  });

  useEffect(() => {
    const fetchAllDetails = async () => {
      try {
        const response = await AuthorizationHeader.get(API_ENDPOINTS.FETCHCOMPANYDETAILS, {
          params: { email: user?.email || '' },
        });
        if (response.data.status === 200) {
          const data = response?.data?.data;
          setFormData({
            companyName: data?.companyName || '',
            contactNumber: data?.contactNo || '',
            industryType: data?.industryType || '',
            companyAddress: data?.companyAddress || '',
            yearOfEstablish: data?.yearOfEstablish || '',
          });
          setProfileImageUrl(data?.compLogo);
        } else {
          setFormData([]);
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
        setFormData([]);
      }
    };

    if (user?.email) {
      fetchAllDetails();
    }
  }, [user?.email]);

  const handleClick = () => {
    navigate('/company-detail-update');
  };

  const toggleNav = (e) => {
    e.stopPropagation(); // Prevent event propagation to avatar dropdown
    setIsNavOpen(!isNavOpen);
    setIsProfileOpen(false); // Close profile sidebar
    setIsAvatarDropdownOpen(false); // Close avatar dropdown
  };

  const toggleProfile = (e) => {
    e.stopPropagation(); // Prevent event propagation
    setIsProfileOpen(!isProfileOpen);
    setIsNavOpen(false); // Close nav links
    setIsAvatarDropdownOpen(false); // Close avatar dropdown
  };

  const toggleAvatarDropdown = (e) => {
    e.stopPropagation(); // Prevent event propagation
    setIsAvatarDropdownOpen(!isAvatarDropdownOpen);
    setIsNavOpen(false); // Close nav links
    setIsProfileOpen(false); // Close profile sidebar
  };

  const handleAvatarMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setIsAvatarDropdownOpen(true);
    }
  };

  const handleAvatarMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setIsAvatarDropdownOpen(false);
    }
  };

  return (
    <>
      <Recruitmenttopbar />
      <nav className="bg-[#ECF4FF] w-full flex items-center justify-between h-16 px-4 sm:px-6 md:!px-12 lg:!px-24 relative">
        {/* Logo */}
        <Link to="/Recruitmenthero">
          <img src={fabimage} alt="logo" className="sm:h-20 h-14  w-auto" />
        </Link>

        {/* Hamburger Menu for Nav Links (Mobile/Tablet) */}
        <button
          type="button"
          className="text-[#05A2E4] md:hidden focus:outline-none"
          onClick={toggleNav}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} className="text-2xl" />
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isNavOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row items-center absolute md:static top-16 left-0 w-full md:w-auto bg-[#ECF4FF] md:bg-transparent z-50 md:z-auto transition-all duration-300 ease-in-out px-4 py-4 md:p-0`}
        >
          <Recruiternavlinks />
        </div>

        {/* Avatar and Profile Toggle */}
        <div className="flex items-center space-x-4">
         <div
  className="relative"
  onMouseEnter={handleAvatarMouseEnter}
  onMouseLeave={handleAvatarMouseLeave}
>
  <Avatar
    className="border-2 border-[#05A2E4] bg-[#E0F4FF] text-[#05A2E4] font-bold cursor-pointer"
    radius="xl"
    size="md"
    onClick={toggleAvatarDropdown}
  >
    {userName ? userName.charAt(0).toUpperCase() : 'U'}
  </Avatar>
  {isAvatarDropdownOpen && (
    <Paper
      className="absolute right-0 mt-1 w-40 bg-white p-3 rounded-lg border border-gray-200 z-50"
      onMouseEnter={handleAvatarMouseEnter} // Keep dropdown open when hovering over it
      onMouseLeave={handleAvatarMouseLeave} // Close when leaving both avatar and dropdown
    >
      <ul className="space-y-2">
        <li className="flex items-center justify-between py-1 px-3 rounded hover:bg-[#07A1E3] hover:text-white transition duration-300">
          <Link to="/logout">Log Out</Link>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </li>
      </ul>
    </Paper>
  )}
</div>
          {/* Profile Sidebar Toggle */}
          <button onClick={toggleProfile} className="text-2xl text-[#05A2E4]">
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>

        {/* Sliding Profile Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full bg-white text-[#05A2E4] z-[999] py-6 px-4 transition-transform transform ${
            isProfileOpen ? 'translate-x-0' : 'translate-x-full'
          } w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4`}
        >
          <button
            onClick={toggleProfile}
            className="absolute top-5 right-5 text-[#05A2E4] text-2xl"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center mb-4">
              {profileImageUrl ? (
                <img
                  src={API_ENDPOINTS.FETCHIMAGE(profileImageUrl)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl text-white font-semibold">
                  {userName ? userName.charAt(0).toUpperCase() : 'A'}
                </span>
              )}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">{formData.companyName || 'N/A'}</h3>
              <p className="text-md text-gray-600">{formData.industryType || 'N/A'}</p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Address:</span> {formData.companyAddress || 'N/A'}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                <span className="font-bold">Establish at:</span> {formData.yearOfEstablish || 'N/A'}
              </p>
            </div>
            <button
              onClick={handleClick}
              className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Recruitmentnavbar;