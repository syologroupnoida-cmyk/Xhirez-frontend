import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@/router-dom";
import { useNavigate } from "@/router-dom";
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from "../../components/footer/footer";
import HeroSection from "./home-components/HeroSection/HeroSection";
import JobSection from "./home-components/JobSection";
import ChooseSectorSection from "./home-components/ChooseSectorSection";
import RemoteJobsSection from "./home-components/RemoteJobsSection";
import JobsByCategorySection from "./home-components/JobsByCategorySection";
import WalkinJobsSection from "./home-components/WalkinJobsSection";
import WhyChooseUsSection from "./home-components/WhyChooseUsSection";
import BrowseJobsSection from "./home-components/BrowseJobsSection";
import HowToStartSection from "./home-components/HowToStartSection";
import AppLinksSection from "./home-components/AppLinksSection";
import JobListByRoles from "./home-components/JobListByRoles"; 
import { API_ENDPOINTS } from "../apiConfig";
import { toast, ToastContainer } from "react-toastify";
import initiatives from '../../data/initiativesData'; // Moved to top-level
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import Headernavbar from "../../components/header/seekerlogin";
import RecruiterNavbar from '../../components/header/recruitment-header';




const Hero = () => {

    const token = sessionStorage.getItem("authToken");
    const user = token ? JSON.parse(token)?.users : null;


  const [jobList, setJobList] = useState([]);



  useEffect(() => {
    setJobList([
      { id: 1, jobtitle: "Software Engineer", companyname: "Tech Corp", location: "Remote", jobtype: "Remote", minimumsalary: "80000", MaximumSalary: "120000", job_posttime: "2024-01-15T10:00:00Z", comp_logo: "" },
      { id: 2, jobtitle: "Marketing Manager", companyname: "Market Pros", location: "New York", jobtype: "Full-time", minimumsalary: "70000", MaximumSalary: "100000", job_posttime: "2024-01-14T11:00:00Z", comp_logo: "" },
      { id: 3, jobtitle: "UX Designer", companyname: "Creative Studio", location: "Remote", jobtype: "Remote", minimumsalary: "75000", MaximumSalary: "110000", job_posttime: "2024-01-13T12:00:00Z", comp_logo: "" },
      { id: 4, jobtitle: "Data Analyst", companyname: "Data Insights", location: "Chicago", jobtype: "Full-time", minimumsalary: "65000", MaximumSalary: "95000", job_posttime: "2024-01-12T13:00:00Z", comp_logo: "" },
      { id: 5, jobtitle: "Project Manager", companyname: "Build It Inc", location: "Remote", jobtype: "Remote", minimumsalary: "90000", MaximumSalary: "130000", job_posttime: "2024-01-11T14:00:00Z", comp_logo: "" },
      { id: 6, jobtitle: "Accountant", companyname: "Accurate Books", location: "Dallas", jobtype: "Full-time", minimumsalary: "60000", MaximumSalary: "85000", job_posttime: "2024-01-10T15:00:00Z", comp_logo: "" },
      { id: 7, jobtitle: "Frontend Developer", companyname: "Web Solutions", location: "Remote", jobtype: "Remote", minimumsalary: "85000", MaximumSalary: "125000", job_posttime: "2024-01-09T16:00:00Z", comp_logo: "" },
      { id: 8, jobtitle: "HR Specialist", companyname: "People First", location: "Boston", jobtype: "Full-time", minimumsalary: "55000", MaximumSalary: "75000", job_posttime: "2024-01-08T17:00:00Z", comp_logo: "" },
    ]);
  }, []);


  const [keywords, setKeywords] = useState([]); 

  useEffect(() => {
      setKeywords(["Software Engineer", "Marketing Manager", "UX Designer", "Data Analyst", "Project Manager", "Accountant", "Frontend Developer", "HR Specialist"]);
  }, []);

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      setSuggestions(
        ["Software Engineer", "Marketing Manager", "UX Designer", "Data Analyst"]
          .filter((s) => s.toLowerCase().includes(value.toLowerCase()))
      );
    } else {
      setSuggestions([]);
    }
  };

  const handlePostChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value) {
      setLocationSuggestions(
        ["Remote", "New York", "Chicago", "Dallas", "Boston"]
          .filter((s) => s.toLowerCase().includes(value.toLowerCase()))
      );
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions(false);
  };

  const handleLocationsSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setLocationSuggestions([]);
  };

  const detectLocation = async () => {

    const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

    if (permissionStatus.state === 'denied') {
      Swal.fire({
        icon: 'info',
        title: 'Enable Location Access',
        html: 'Location access is blocked. Please enable it from your browser settings:<br/><br/>' +
              '<strong>Chrome:</strong> Click the lock icon in the address bar → Site settings → Location → Allow',
        confirmButtonText: 'Got it!',
      });
      return;
    }


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
          setLocationSuggestions([]);
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      });
    }
  };

  const handleSearch = () => {
    if (!query || !location) {
      toast.error("Please fill all the details!");
      return;
    }

   

    navigate(
      `/alljob?query=${encodeURIComponent(query)}&location=${encodeURIComponent(
        location
      )}`
    );
  };


  
  const dynamicJobsByLocation = Object.entries(
    jobList.reduce((acc, job) => {
      const location = job.location && job.location.trim() !== ""
        ? job.location.trim()
        : "Unknown Location";
      
      const normalizedLocation = location.toLowerCase();
      acc[normalizedLocation] = (acc[normalizedLocation] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([location, jobs]) => ({
      region: location
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "), 
      jobs,
    }))
    .sort((a, b) => b.jobs - a.jobs);


    

  const dynamicJobsByType = Object.entries(
    jobList.reduce((acc, job) => {
      const type = job.jobtype && job.jobtype.trim() !== ""
        ? job.jobtype.trim()
        : "N/A";
      const normalizedType = type.toLowerCase();
      acc[normalizedType] = (acc[normalizedType] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([type, jobs]) => ({
      type: type
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      jobs,
    }))
    .sort((a, b) => b.jobs - a.jobs);



 
  const experienceRanges = [
    { level: "Internship", min: 0, max: 0 },
    { level: "0 - 2 Years Experience", min: 0, max: 2 },
    { level: "3 - 4 Years Experience", min: 3, max: 4 },
    { level: "5 Years+ Experience", min: 5, max: Infinity },
  ];

  const dynamicJobsByExperience = experienceRanges.map((range) => {
    const jobs = jobList.filter((job) => {
      const minExp = job.minExperience ?? 0;
      const maxExp = job.maxExperience ?? 0;
      
      return (
        (minExp <= range.max && maxExp >= range.min) ||
        (minExp === 0 && maxExp === 0 && range.level === "Internship")
      );
    }).length;
    return { level: range.level, jobs };
  }).filter((range) => range.jobs > 0); 


 

  return (
    <>
      <UnifiedHeader />

      <main className="xh-home-page">
      <HeroSection query={query} location={location} handleInputChange={handleInputChange} handlePostChange={handlePostChange} handleSearch={handleSearch} detectLocation={detectLocation} handleSuggestionClick={handleSuggestionClick} handleLocationsSuggestionClick={handleLocationsSuggestionClick} suggestions={suggestions} locationSuggestions={locationSuggestions} keywords={keywords} setQuery={setQuery} />

      <ChooseSectorSection />

      <JobListByRoles /> 

      
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
          <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 d-inline-block">
          Initiatives
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          Explore Our <span className="text-blue-500">Initiatives</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
          Discover the programs and resources designed to empower your journey.
          </p>
        </div>

          <div className="space-y-5"> 
            {initiatives.map((initiative) => (
              <div key={initiative.title} className="p-8 sm:p-10 lg:p-12 relative"> {/* Added 'relative' for absolute positioning */}
                <h3 className="text-3xl font-black text-gray-900 sm:text-4xl mb-8 pb-2 border-b-4 border-blue-500 text-center mx-auto w-fit">
                  {initiative.title.includes(" ") ? (
                    <>
                      {initiative.title.substring(0, initiative.title.lastIndexOf(" "))}{" "}
                      <span className="text-blue-500">{initiative.title.substring(initiative.title.lastIndexOf(" ") + 1)}</span>
                    </>
                  ) : (
                    initiative.title
                  )}
                </h3>
                {initiative.blogs.length > 3 && ( // Only show nav for Swiper, positioned absolutely
                    <div className="absolute top-10 right-10 flex items-center space-x-4 z-10"> {/* Absolute positioned container */}
                        <div className={`swiper-pagination-${initiative.title.replace(/\s/g, '-')} text-center`}></div> {/* Pagination */}
                        <div className="flex space-x-2"> {/* Grouped Navigation Buttons */}
                            <div className={`swiper-button-prev-${initiative.title.replace(/\s/g, '-')} bg-blue-500 text-white p-3 rounded-full shadow-md cursor-pointer hover:bg-blue-600 transition-all flex items-center justify-center w-10 h-10`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                            <div className={`swiper-button-next-${initiative.title.replace(/\s/g, '-')} bg-blue-500 text-white p-3 rounded-full shadow-md cursor-pointer hover:bg-blue-600 transition-all flex items-center justify-center w-10 h-10`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
                {initiative.blogs.length > 3 ? (
                  <div className="relative"> {/* Original Swiper wrapper, without navigation */}
                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={30}
                      slidesPerView={1}
                      breakpoints={{
                        640: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 30,
                        },
                      }}
                      navigation={{
                        nextEl: `.swiper-button-next-${initiative.title.replace(/\s/g, '-')}`,
                        prevEl: `.swiper-button-prev-${initiative.title.replace(/\s/g, '-')}`,
                      }}
                      pagination={{ clickable: true, el: `.swiper-pagination-${initiative.title.replace(/\s/g, '-')}` }}
                      className="mySwiper !pb-10" // !pb-10 for pagination dots
                    >
                      {initiative.blogs.map((blog, index) => (
                        <SwiperSlide key={index}>
                          <article className="flex flex-col items-start p-6 rounded-2xl bg-white hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-100 hover:border-blue-200"> {/* Individual blog card styling */}
                            <div className="relative w-full mb-4 aspect-video overflow-hidden rounded-xl"> 
                              <img src={blog.imageUrl} alt={blog.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                            </div>
                            <div className="group relative">
                              <h4 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-blue-600">
                                <Link to={`/initiatives/${encodeURIComponent(initiative.title)}/${index}`}> 
                                  <span className="absolute inset-0" />
                                  {blog.title}
                                </Link>
                              </h4>
                              <p className="mt-2 text-sm leading-6 text-gray-600 line-clamp-3">{blog.description}</p>
                              <div className="mt-4">
                                <Link
                                  to={`/initiatives/${encodeURIComponent(initiative.title)}/${index}`}
                                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm inline-flex items-center"
                                >
                                  Read more
                                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                                  </svg>
                                </Link>
                              </div>
                            </div>
                          </article>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                ) : (
                  <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {initiative.blogs.map((blog, index) => (
                      <article key={index} className="flex flex-col items-start p-6 rounded-2xl bg-white hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-100 hover:border-blue-200"> {/* Individual blog card styling */}
                        <div className="relative w-full mb-4 aspect-video overflow-hidden rounded-xl"> 
                          <img src={blog.imageUrl} alt={blog.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <div className="group relative">
                          <h4 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-blue-600">
                            <Link to={`/initiatives/${encodeURIComponent(initiative.title)}/${index}`}> 
                              <span className="absolute inset-0" />
                              {blog.title}
                            </Link>
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600 line-clamp-3">{blog.description}</p>
                          <div className="mt-4">
                            <Link
                              to={`/initiatives/${encodeURIComponent(initiative.title)}/${index}`}
                              className="text-blue-600 hover:text-blue-800 font-semibold text-sm inline-flex items-center"
                            >
                              Read more
                              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
                <div className="mt-12 text-center">
                  <Link to={initiative.link} className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300">
                    View {initiative.title}
                    <svg className="ml-3 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    

      <RemoteJobsSection jobList={jobList} />


      <JobsByCategorySection jobList={jobList} />

      
      <section className="relative py-10 px-6 overflow-hidden rounded-3xl mx-auto max-w-7xl shadow-xl"> 
       
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
        >
          
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>

        
        <div className="relative max-w-5xl mx-auto text-white text-center z-10 space-y-4">
          <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            Level Up Your Career
          </span>
          <h2 className="text-2xl md:text-3xl font-black leading-tight"> 
            Unlock Your <span className="text-blue-300">True Potential</span> with Expert Guidance
          </h2>
          <p className="text-base md:text-lg font-medium opacity-90">
            Our certified career coaches provide personalized strategies for your professional growth and enduring success.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold text-base hover:bg-blue-600 transition-all shadow-lg">
            Get Started Today
          </button>
        </div>
      </section>
     





      

      <div className="max-w-7xl mx-auto px-8 py-20 bg-[#ffffff] text-slate-900 font-sans">
  
  
  <header className="max-w-3xl mb-24">
    <h1 className="text-6xl font-light tracking-tight mb-6">
      Find your <span className="font-semibold italic">next move.</span>
    </h1>
    <div className="h-1 w-20 bg-blue-600 mb-6"></div>
    <p className="text-slate-500 text-xl leading-relaxed">
      Browse through our refined selection of global opportunities, organized by your preferences.
    </p>
  </header>

  <div className="space-y-32">
    
    
    <section>
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-10">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">01 — Location</h2>
        <span className="h-[1px] flex-grow bg-slate-100 hidden md:block"></span>
        <p className="text-sm text-slate-400 italic">Where do you want to work?</p>
      </div>
      
      
      <div className="overflow-hidden group">
        <div className="max-h-[350px] overflow-y-auto pr-4 scroll-smooth hover:scrollbar-thin">
          <JobSection
            data={dynamicJobsByLocation}
            type="location"
            className="flex flex-wrap gap-x-4 gap-y-6" 
          />
        </div>
      </div>
    </section>

   
    <section>
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-10">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-purple-600">02 — Job Type</h2>
        <span className="h-[1px] flex-grow bg-slate-100 hidden md:block"></span>
        <p className="text-sm text-slate-400 italic">Contract, Full-time, or Hybrid</p>
      </div>

      <div className="max-h-[300px] overflow-y-auto">
        <JobSection 
          data={dynamicJobsByType} 
          type="type" 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        />
      </div>
    </section>

   
    <section className="bg-slate-50 rounded-[40px] p-12 lg:p-16 border border-slate-100">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-2">03 — Expertise</h2>
          <h3 className="text-3xl font-bold">Experience Level</h3>
        </div>
        <div className="hidden sm:block text-right">
            <p className="text-4xl font-light text-slate-200">Growth</p>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        <JobSection
          data={dynamicJobsByExperience}
          type="experience"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        />
      </div>
    </section>

  </div>

 
</div>
      <WalkinJobsSection jobList={jobList} />

      <WhyChooseUsSection />

      <BrowseJobsSection />

      <HowToStartSection />

      <AppLinksSection />

      






      </main>
      <Footer />
      <ToastContainer/>
    </>
  );
};

export default Hero;
