import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBriefcase, faChevronDown, faBuilding, 
  faRocket, faMobileScreenButton, faUser, faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
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

  const dropdownBaseClass = "absolute right-0 mt-4 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-gray-50 p-2 z-[1000] transition-all duration-300 transform origin-top animate-in fade-in zoom-in-95";

  return (
    <div className="fixed top-0 w-full z-[999] font-sans" ref={dropdownRef}>
      
    
      <div className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#1e293b] text-white py-1.5 overflow-hidden">
        <Container className="flex justify-center items-center">
          <div className="flex items-center gap-3 transition-opacity duration-500">
         
            <p className="text-[13px] font-medium tracking-tight opacity-90">
              {offers[currentOffer]}
            </p>
          </div>
        </Container>
      </div>

      
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 h-[85px] flex items-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
        <Container className="flex items-center justify-between">
          
         
          <div className="flex items-center gap-14">
            <Link to="/" className="transition-all hover:opacity-80">
            
              <img src="/assets/images/logo/Xhirez-Logo.png" alt="logo" className="h-16 w-auto" />
            </Link>
            <nav className="hidden xl:flex items-center gap-10">
              <Navlinks />
            </nav>
          </div>

         
          <div className="flex items-center gap-3">
            
            
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'auth' ? null : 'auth')}
                className={`group flex items-center gap-2.5 px-6 py-2.5 text-[14px] font-semibold rounded-full transition-all border ${
                  activeDropdown === 'auth'
                  ? 'bg-gray-900 border-gray-900 text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-900'
                }`}
              >
                <FontAwesomeIcon icon={faUser} className="text-[12px] opacity-70" />
                <span>Sign In</span>
                <FontAwesomeIcon icon={faChevronDown} className={`text-[10px] opacity-50 transition-transform ${activeDropdown === 'auth' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'auth' && (
                <div className={`${dropdownBaseClass} w-64`}>
                  <Link to="/login" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><FontAwesomeIcon icon={faBriefcase} /></div>
                      <span className="text-sm font-bold text-gray-800">Candidate Login</span>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} className="text-[10px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </Link>
                  <Link to="/employer-login" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center"><FontAwesomeIcon icon={faBuilding} /></div>
                      <span className="text-sm font-bold text-gray-800">Employer Login</span>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} className="text-[10px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </Link>
                </div>
              )}
            </div>

            
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'app' ? null : 'app')}
                className={`flex items-center gap-2.5 px-7 py-3 text-[14px] font-bold rounded-full transition-all shadow-sm ${
                  activeDropdown === 'app'
                  ? 'bg-blue-800 text-white shadow-inner'
                  : 'bg-[#0052cc] text-white hover:bg-[#0747a6] hover:shadow-lg hover:shadow-blue-200 active:scale-95'
                }`}
              >
                <FontAwesomeIcon icon={faMobileScreenButton} />
                Get Started
              </button>

              {activeDropdown === 'app' && (
                <div className={`${dropdownBaseClass} w-72 p-4`}>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Download App</p>
                  <div className="grid grid-cols-1 gap-2">
                    <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-600 hover:text-white transition-all group">
                       <img src="assets/images/icon/playstore.png" alt="GP" className="h-6" />
                       <div className="flex flex-col">
                         <span className="text-[10px] opacity-70 leading-none">Android</span>
                         <span className="text-sm font-bold leading-tight">Google Play</span>
                       </div>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-black hover:text-white transition-all group">
                       <img src="assets/images/icon/ios.png" alt="AS" className="h-6" />
                       <div className="flex flex-col">
                         <span className="text-[10px] opacity-70 leading-none">iOS App</span>
                         <span className="text-sm font-bold leading-tight">App Store</span>
                       </div>
                    </a>
                  </div>
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