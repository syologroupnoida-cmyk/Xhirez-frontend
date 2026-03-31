import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot, faBriefcase, faLocationCrosshairs,
  faArrowRight, faGraduationCap, faCode, faUserGroup, faCompass
} from "@fortawesome/free-solid-svg-icons";

const HeroSection = ({ query, location, handleInputChange, handlePostChange, handleSearch, detectLocation, suggestions, keywords, setQuery }) => {
  const [index, setIndex] = useState(0);

  const slides = [
    {
      title: "E-Campus",
      heading: <>Learn & <span className="text-blue-400">Scale Up</span></>,
      subtext: "Master new skills with our curated certification programs.",
      bgImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      icon: faGraduationCap
    },
    {
      title: "She Can Code",
      heading: <>Women in <span className="text-pink-400">Technology</span></>,
      subtext: "Exclusive mentorship and tech roles for women leaders.",
      bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      icon: faCode
    },
    {
      title: "Campus Buddy",
      heading: <>Your <span className="text-orange-400">Campus Partner</span></>,
      subtext: "Simplifying internships and first-jobs for students.",
      bgImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
      icon: faUserGroup
    },
    {
      title: "Career Counselling",
      heading: <>Navigate <span className="text-green-400">Your Future</span></>,
      subtext: "Get expert guidance to choose the right career path.",
      bgImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
      icon: faCompass
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    /* mt-[125px] lagaya hai taaki header se na phase */
    <div id="hero" className="relative h-[550px] md:h-[600px] mt-20 overflow-hidden bg-black">
      
      {/* --- BACKGROUND IMAGES WITH SMOOTH CROSS-FADE --- */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${
            index === i ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{ 
            backgroundImage: `url(${slide.bgImage})`,
            transitionProperty: 'opacity, transform'
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/65"></div>
        </div>
      ))}

      <Container className="relative z-20 h-full flex flex-col justify-center items-center">
        
        {/* --- CONTENT WITH FADE-IN ANIMATION --- */}
        <div 
          key={`content-${index}`} 
          className="text-center max-w-3xl mx-auto mb-10 animate-in fade-in zoom-in duration-1000"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md">
            <FontAwesomeIcon icon={slides[index].icon} className="text-white text-xs" />
            <span className="text-[11px] font-bold text-white uppercase tracking-[3px]">
              {slides[index].title}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            {slides[index].heading}
          </h1>
          <p className="text-base text-gray-200 font-medium max-w-xl mx-auto opacity-90">
            {slides[index].subtext}
          </p>
        </div>

        {/* --- STATIC SEARCH BAR --- */}
        <div className="w-full max-w-3xl mx-auto">
          <div className="bg-white p-2 rounded-2xl md:rounded-full shadow-2xl border border-white/10">
            <Form className="flex flex-col md:flex-row items-center gap-1">
              
              <div className="relative flex-[1.3] w-full">
                <FontAwesomeIcon icon={faBriefcase} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                <Form.Control
                  type="text"
                  placeholder="Job title or Skills"
                  value={query}
                  onChange={handleInputChange}
                  className="!border-none !shadow-none h-12 pl-14 text-sm font-bold text-gray-700 bg-transparent"
                />
              </div>

              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="relative flex-1 w-full">
                <FontAwesomeIcon icon={faLocationDot} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                <Form.Control
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={handlePostChange}
                  className="!border-none !shadow-none h-12 pl-14 text-sm font-bold text-gray-700 bg-transparent"
                />
                <button type="button" onClick={detectLocation} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 hover:scale-110 transition">
                  <FontAwesomeIcon icon={faLocationCrosshairs} />
                </button>
              </div>

              <Button 
                onClick={handleSearch}
                className="w-full md:w-auto px-10 h-12 !bg-blue-600 hover:!bg-blue-700 !rounded-xl md:!rounded-full !border-none font-bold text-base shadow-lg transition-all"
              >
                Search <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs" />
              </Button>
            </Form>
          </div>

          {/* Trending Tags */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {keywords.slice(0, 4).map((kw, i) => (
              <button
                key={i}
                onClick={() => setQuery(kw)}
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white hover:text-black transition-all backdrop-blur-sm"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;