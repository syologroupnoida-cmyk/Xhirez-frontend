import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, faBuilding, 
  faRocket, faUser, faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "@/router-dom";
import Navlinks from './navlinks';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentOffer, setCurrentOffer] = useState(0);
  const dropdownRef = useRef(null);

  const offers = [
    "✨ New: AI-Powered Resume Builder is now Live!",
    "🚀 Post your first job for FREE - Limited Offer",
    "📱 Download the app for real-time job alerts"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownBaseClass = "absolute right-0 top-full mt-0 bg-white rounded-[4px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-gray-50 p-2 z-[1000] transition-all duration-300 transform origin-top animate-in fade-in zoom-in-95";

  return (
    <div className="xh-site-header fixed top-0 w-full z-[999] font-sans" ref={dropdownRef}>
      
    
      <div className="xh-header-promo bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#1e293b] text-white overflow-hidden">
        <Container className="flex justify-center items-center px-6">
          <div className="flex items-center gap-3 transition-opacity duration-500">
         
            <p className="xh-promo-text text-[12px] font-medium tracking-tight opacity-90">
              {offers[currentOffer]}
            </p>
          </div>
        </Container>
      </div>

      
      <header className="xh-header-bar bg-white/80 backdrop-blur-xl border-b border-gray-100 h-[70px] flex items-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
        <Container className="flex items-center justify-between px-6 lg:px-10">
          
         
          <div className="flex items-center">
            <Link to="/" className="xh-logo-link flex items-center gap-3 transition-all hover:opacity-90">
              <img
                src="/assets/images/logo/Xhirez-Logo.png"
                alt="Xhirez"
                className="xh-logo-image"
              />
              <span className="xh-logo-text">Xhirez</span>
            </Link>
          </div>

         
          <div className="flex items-center justify-end gap-3">
            <nav className="hidden xl:flex items-center">
              <Navlinks />
            </nav>
            <Link
              to="/login"
              onClick={() => setActiveDropdown(null)}
              className="xh-header-button group flex items-center justify-center gap-2 text-[13px] font-normal transition-all border bg-white border-[#2f5cf6] text-[#2f5cf6] hover:bg-[#f4f7ff] no-underline"
            >
              <FontAwesomeIcon icon={faUser} className="text-[12px] opacity-70" />
              <span>Login</span>
            </Link>

            <Link
              to="/signUp"
              onClick={() => setActiveDropdown(null)}
              className="xh-header-button flex items-center justify-center gap-2 text-[13px] font-normal transition-all border border-[#ff5a3d] shadow-sm bg-[#ff5a3d] text-white hover:bg-[#ea4528] hover:border-[#ea4528] hover:shadow-lg hover:shadow-orange-100 active:scale-95 no-underline"
            >
              <span>Register</span>
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('employers')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`xh-header-employer-trigger flex items-center justify-center gap-2 px-2 text-[13px] font-normal text-gray-700 hover:text-[#2f5cf6] transition-colors ${activeDropdown === 'employers' ? 'is-open' : ''}`}
              >
                <span>For employers</span>
                <FontAwesomeIcon icon={faChevronDown} className={`text-[10px] opacity-60 transition-transform ${activeDropdown === 'employers' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'employers' && (
                <div className={`${dropdownBaseClass} w-44`}>
                  <Link to="/business" className="flex items-center justify-between p-2 rounded-[4px] hover:bg-gray-50 transition group no-underline">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-[4px] flex items-center justify-center"><FontAwesomeIcon icon={faRocket} /></div>
                      <span className="text-[12px] font-normal text-gray-800">Buy now</span>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} className="text-[10px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-gray-500" />
                  </Link>
                  <Link to="/employer-login" className="flex items-center justify-between p-2 rounded-[4px] hover:bg-gray-50 transition group no-underline">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-[4px] flex items-center justify-center"><FontAwesomeIcon icon={faBuilding} /></div>
                      <span className="text-[12px] font-normal text-gray-800">Employer Login</span>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} className="text-[10px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-gray-500" />
                  </Link>
                </div>
              )}
            </div>

          </div>
        </Container>
      </header>
    </div>
  );
};

export default Header;
