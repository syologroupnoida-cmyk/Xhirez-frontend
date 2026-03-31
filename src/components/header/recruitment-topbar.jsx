import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMobileAlt, faHeadset, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Recruitmenttopbar = () => {
  const [location, setLocation] = useState('');
  const [isAppDropdownOpen, setIsAppDropdownOpen] = useState(false);
  const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);

  
    const [isExpanded, setIsExpanded] = useState(false);
    const handleSearchExpand = () => {
      setIsExpanded(!isExpanded);
    };
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          if (data.address?.city) {
            setLocation(data.address.city);
          } else if (data.address?.town) {
            setLocation(data.address.town);
          }
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      });
    }
  };

  useEffect(() => {
    detectLocation();
  }, []);

  const toggleAppDropdown = (e) => {
    e.stopPropagation();
    setIsAppDropdownOpen(!isAppDropdownOpen);
    setIsSupportDropdownOpen(false);
  };

  const toggleSupportDropdown = (e) => {
    e.stopPropagation();
    setIsSupportDropdownOpen(!isSupportDropdownOpen);
    setIsAppDropdownOpen(false);
  };

  const handleMouseEnterApp = () => {
    if (window.innerWidth >= 768) {
      setIsAppDropdownOpen(true);
      setIsSupportDropdownOpen(false);
    }
  };

  const handleMouseLeaveApp = () => {
    if (window.innerWidth >= 768) {
      setIsAppDropdownOpen(false);
    }
  };

  const handleMouseEnterSupport = () => {
    if (window.innerWidth >= 768) {
      setIsSupportDropdownOpen(true);
      setIsAppDropdownOpen(false);
    }
  };

  const handleMouseLeaveSupport = () => {
    if (window.innerWidth >= 768) {
      setIsSupportDropdownOpen(false);
    }
  };

  return (
    <div className="bg-[#ECF4FF] py-2 border-b">
      <Container>
        <Row className="flex items-center justify-between">
          <Col xs={12} sm={6} md={4} className="mb-2 hidden sm:block sm:mb-0">
            <div className="top-left flex items-center justify-center sm:justify-start">
              <div className="relative pl-6">
                <FontAwesomeIcon
                  className="mr-2 absolute left-0 sm:left-[-13px] top-[-3px] text-[#05A2E4] border-2 border-[#05A2E4] px-2 py-[6px] rounded-full"
                  icon={faLocationDot}
                />
                <span className="text-gray-500 text-xs sm:text-sm">{location || 'Detecting...'}</span>
              </div>
            </div>
          </Col>
           <Col xs={12} md={6} className="flex justify-between sm:justify-center mb-1 md:flex-row md:justify-end items-center sm:gap-6">
              {/* App Download Button */}
              <div
                className="relative"
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
              >
                <div className="relative text-gray-500 sm:pl-7 pl-9 rounded-full cursor-pointer text-center md:text-left">
                  <FontAwesomeIcon
                    className="mr-2 absolute left-0 sm:left-[-13px] top-[-3px] text-[#05A2E4] border-2 border-[#05A2E4] px-2 py-[6px] rounded-full"
                    icon={faMobileAlt}
                  />
                  Download Our App
                </div>
          
                {isHovered1 && (
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
                            src="../assets/images/icon/playstore.png"
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
                            src="../assets/images/icon/ios.png"
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
                onMouseEnter={() => setIsHovered2(true)}
                onMouseLeave={() => setIsHovered2(false)}
              >
                <div className="relative text-gray-500 pl-7 rounded-full cursor-pointer text-center md:text-left">
                  <FontAwesomeIcon
                    className="mr-2 absolute left-[-13px] top-[-3px] text-[#05A2E4] border-2 border-[#05A2E4] px-2 py-[7px] rounded-full"
                    icon={faHeadset}
                  />
                  24*7 Support
                </div>
          
                {isHovered2 && (
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
  );
};

export default Recruitmenttopbar;