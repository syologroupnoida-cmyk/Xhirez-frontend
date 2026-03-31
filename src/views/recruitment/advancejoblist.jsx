import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Breadcrumb, Accordion, Card, Badge, Pagination, InputGroup, FormControl, CardBody, Offcanvas } from 'react-bootstrap';
import { Star, Edit, MapPin, Building2, Clock, BookmarkPlus, CheckCircle, Briefcase, GraduationCap, ChevronUp, ChevronDown } from 'lucide-react';
import { FaDownload, FaFileExcel, FaSave, FaSpinner, FaFilter } from 'react-icons/fa';
import Navbar from '../../components/header/recruitment-header';
import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesLeft, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css';
import { Calendar, Info } from 'react-bootstrap-icons';
import { API_ENDPOINTS } from '../apiConfig';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import axios from 'axios';
import AuthorizationHeader from '../AuthorizationHeader';

const Advancejoblist = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(40);
  const [sliderValue, setSliderValue] = useState(0);
  const [filters, setFilters] = useState({
    workMode: false,
    experience: false,
    department: false,
    salary: false,
  });
  const [searchOption, setSearchOption] = useState(1);
  const [anyKeyword, setAnyKeyword] = useState('');
  const [allKeyword, setAllKeyword] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
    const [isDownloadingExcel, setIsDownloadingExcel] = useState(false);
  const [filteredRequestData, setFilteredRequestData] = useState({});
  const [salaryRange, setSalaryRange] = useState([]);
  const [locations, setLocations] = useState([]);
  const [educations, setEducations] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [roleCategories, setRoleCategories] = useState([]);
  const [loginUserId, setLoginUserId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  useEffect(() => {
    if (location.state?.searchResults) {
      setSearchResults(location.state.searchResults.data || []);
      setFilteredResults(location.state.searchResults.data || []);
      setFilteredRequestData(location.state.filteredRequestData || {});
    } else {
      setSearchResults(mockJobs);
      setFilteredResults(mockJobs);
    }
  }, [location.state]);

  useEffect(() => {
          const authToken = localStorage.getItem('authToken');
          const user = authToken ? JSON.parse(authToken).users : null;
          if (user) {
              setLoginUserId(user.id || '');
          }
      }, []);

  useEffect(() => {
    const totalItems = filteredResults.length;
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
    setCurrentPage(1);
  }, [filteredResults, itemsPerPage]);

  useEffect(() => {
    applyFilters();
  }, [searchResults, sliderValue, salaryRange, locations, educations, jobTypes, roleCategories, anyKeyword, allKeyword, searchOption]);

  const applyFilters = () => {
    let results = [...searchResults];
    if (sliderValue > 0) {
      results = results.filter(candidate => 
        candidate.experienceperiod && candidate.experienceperiod >= sliderValue
      );
    }
    if (salaryRange.length > 0) {
      results = results.filter(candidate => {
        if (!candidate.min_salary) return false;
        return salaryRange.some(range => {
          const [min, max] = range.split('-').map(Number);
          return candidate.min_salary >= min && candidate.min_salary <= max;
        });
      });
    }
    if (locations.length > 0) {
      results = results.filter(candidate => 
        candidate.address && locations.some(loc => 
          candidate.address.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }
    if (educations.length > 0) {
      results = results.filter(candidate => 
        candidate.education && educations.some(edu => 
          candidate.education.toLowerCase().includes(edu.toLowerCase())
        )
      );
    }
    if (jobTypes.length > 0) {
      results = results.filter(candidate => 
        candidate.job_type && jobTypes.includes(candidate.job_type)
      );
    }
    if (roleCategories.length > 0) {
      results = results.filter(candidate => 
        candidate.role_category && roleCategories.includes(candidate.role_category)
      );
    }
    if (anyKeyword || allKeyword) {
      const anyKeywords = anyKeyword.toLowerCase().split(' ').filter(k => k);
      const allKeywords = allKeyword.toLowerCase().split(' ').filter(k => k);
      results = results.filter(candidate => {
        const searchString = [
          candidate.full_name,
          candidate.job_profile,
          candidate.company_name,
          candidate.address,
          candidate.aboutme,
          candidate.skills,
          candidate.experienceperiod,
          candidate.min_salary,
          candidate.max_salary,
          candidate.notice_period
        ].join(' ').toLowerCase();
        if (searchOption === 1) {
          const anyMatch = anyKeywords.length === 0 || 
            anyKeywords.some(keyword => searchString.includes(keyword));
          const allMatch = allKeywords.length === 0 || 
            allKeywords.every(keyword => searchString.includes(keyword));
          return anyMatch && allMatch;
        } else {
          const titleSkillsString = [
            candidate.full_name,
            candidate.job_profile,
            candidate.skills
          ].join(' ').toLowerCase();
          const anyMatch = anyKeywords.length === 0 || 
            anyKeywords.some(keyword => titleSkillsString.includes(keyword));
          const allMatch = allKeywords.length === 0 || 
            allKeywords.every(keyword => titleSkillsString.includes(keyword));
          return anyMatch && allMatch;
        }
      });
    }
    setFilteredResults(results);
  };

  const highlightKeywords = (text) => {
    if (!text || (!anyKeyword && !allKeyword)) return text;
    const keywords = [
      ...anyKeyword.toLowerCase().split(' ').filter(k => k),
      ...allKeyword.toLowerCase().split(' ').filter(k => k)
    ];
    if (keywords.length === 0) return text;
    return text.split(' ').map((word, i) => {
      const lowerWord = word.toLowerCase();
      if (keywords.some(keyword => lowerWord.includes(keyword))) {
        return <mark key={i}>{word}</mark>;
      }
      return word + ' ';
    });
  };

  const toggleSalaryRange = (range) => {
    setSalaryRange(prev => 
      prev.includes(range) 
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  };

  const toggleLocation = (location) => {
    setLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const toggleEducation = (education) => {
    setEducations(prev => 
      prev.includes(education) 
        ? prev.filter(e => e !== education)
        : [...prev, education]
    );
  };

  const toggleJobType = (jobType) => {
    setJobTypes(prev => 
      prev.includes(jobType) 
        ? prev.filter(j => j !== jobType)
        : [...prev, jobType]
    );
  };

  const toggleRoleCategory = (roleCategory) => {
    setRoleCategories(prev => 
      prev.includes(roleCategory) 
        ? prev.filter(r => r !== roleCategory)
        : [...prev, roleCategory]
    );
  };

  const handleJobSelect = (id) => {
    setSelectedJobs((prevSelectedJobs) =>
      prevSelectedJobs.includes(id)
        ? prevSelectedJobs.filter((jobId) => jobId !== id)
        : [...prevSelectedJobs, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedJobs.length === filteredResults.length) {
      setSelectedJobs([]);
    } else {
      const allIds = filteredResults.map(job => job.id);
      setSelectedJobs(allIds);
    }
  };

  const areAllJobsSelected = filteredResults.length > 0 && selectedJobs.length === filteredResults.length;

  const downloadSelectedResumes = async () => {
    if (selectedJobs.length === 0) {
      alert('Please select at least one resume to download');
      return;
    }
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder('resumes');
      const selectedCandidates = filteredResults.filter(candidate => 
        selectedJobs.includes(candidate.id)
      );
      await Promise.all(selectedCandidates.map(async (candidate) => {
        if (candidate.resume) {
          const response = await fetch(API_ENDPOINTS.FETCHRESUME(candidate.resume));
          if (response.ok) {
            const blob = await response.blob();
            folder.file(candidate.resume, blob);
          }
        }
      }));
      const content = await zip.generateAsync({ type: 'blob' });
      FileSaver.saveAs(content, 'Candidates Resume.zip');
    } catch (error) {
      console.error('Error creating ZIP file:', error);
      alert('Error downloading resumes. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  const handleSliderChange = (event) => {
    setSliderValue(Number(event.target.value));
  };

  const toggleFilterSection = (section) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [section]: !prevFilters[section],
    }));
  };

  const handleSearchOptionChange = (value) => {
    setSearchOption(Number(value));
  };

  const handleAnyKeywordChange = (event) => {
    setAnyKeyword(event.target.value);
  };

  const handleAllKeywordChange = (event) => {
    setAllKeyword(event.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredResults.slice(startIndex, endIndex);
  };

  const downloadExcelReport = async () => {
    if (selectedJobs.length === 0) {
      alert('Please select at least one candidate to download Excel report');
      return;
    }
    
      const formatedDate = (datetime) => {
      if (!datetime) return '';
      const datePart = datetime.split(' ')[0];
      const [year, month, day] = datePart.split('-');
      return `${day}/${month}/${year}`;
    };
    setIsDownloadingExcel(true);

    try {
      const selectedCandidates = filteredResults.filter(candidate => 
        selectedJobs.includes(candidate.id)
      );

      function formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return isNaN(d) ? '' : d.toLocaleDateString();
      }

      const excelData = selectedCandidates.map(candidate => ({
        'Full Name': candidate.full_name || '',
        'Email': candidate.email || '',
        'Phone Number': candidate.phone_number || '',
        'Gender': candidate.gender || '',
        'Location': candidate.address || '',
        'About Me': candidate.aboutme || '',
        'Skills': candidate.skills || '',
        'Experience': candidate.experienceperiod ? `${candidate.experienceperiod} years` : 'Fresher',
        'Min Salary': candidate.min_salary ? `${candidate.min_salary} LPA` : '',
        'Max Salary': candidate.max_salary ? `${candidate.max_salary} LPA` : '',
        'Salary Range': candidate.min_salary && candidate.max_salary 
          ? `${candidate.min_salary} - ${candidate.max_salary} LPA`
          : 'Not specified',
        'Notice Period': candidate.notice_period || '',
        'Job Profile': candidate.job_profile || '',
        'Company Name': candidate.company_name || '',
        'Job Start Date': candidate.jobStartDate || '',
        'Job End Date': candidate.jobEndDate || '',
        'Currently Working': candidate.currentlyworking === 'yes' ? 'Yes' : (candidate.currentlyworking === 'no' ? 'No' : ''),
        'Updated At': formatDate(candidate.updated_at),
        'Created At': formatDate(candidate.created_at),
      }));
      const escapeCsvValue = value => {
        const v = value.toString();
        return v.includes(',') || v.includes('"') || v.includes('\n')
          ? `"${v.replace(/"/g, '""')}"`
          : v;
      };
      const headers = Object.keys(excelData[0]).join(',');
      const rows = excelData.map(obj => Object.values(obj).map(escapeCsvValue).join(','));
      const csvContent = [headers, ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Candidates.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating Excel report:', error);
      alert('Error generating Excel report. Please try again.');
    } finally {
      setIsDownloadingExcel(false);
    }
  };


  const forProfileViews = async (id) => {
    
    // for fetching profile views
    if (loginUserId && id) {
          try {
            const response= await AuthorizationHeader.get(API_ENDPOINTS.SAVEPROFILEVIEW, {
                   params: {
                    profileId: id,  
                    viewedBy: loginUserId,              
                  },
              });
          } catch (error) {
              console.error('Error logging profile view:', error);
          }
      }
  }
  // For save Resume Views
  const forSaveResumeViews = async (id) => {
    
    // for fetching profile views
    if (loginUserId && id) {
          try {
            const response= await AuthorizationHeader.get(API_ENDPOINTS.SAVERESUMEVIEWS, {
                 params: {
                  profileId: id,  
                    viewedBy: loginUserId,            
                },
            });
          } catch (error) {
              console.error('Error logging profile view:', error);
          }
      }
  }

  return (
    <>
      <Navbar />
      <div className="job-listing py-4 sm:py-6">
        <Container>
          <Row>
            <Col xs={12}>
              <Row>
                {/* Filter Toggle Button for Mobile */}
                <Col xs={12} className="d-md-none mb-3">
                  <Button
                    variant="outline-primary"
                    onClick={() => setShowFilters(true)}
                    className="w-100 d-flex align-items-center justify-content-center"
                  >
                    <FaFilter className="mr-2" /> Show Filters
                  </Button>
                </Col>

                {/* Filter Sidebar/Offcanvas */}
                <Col xs={12} md={3} className="d-none d-md-block">
                  <div className="job-listing-filter bg-white py-4 px-2 sticky-top" style={{ top: '0px' }}>
                    <Accordion defaultActiveKey={["0", "1", "2", "3", "4", "5", "6", "7"]} alwaysOpen>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Search within results</Accordion.Header>
                        <Accordion.Body>
                          <div className="p-3">
                            <div className="flex justify-between mb-3">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  className="mr-2"
                                  value="1"
                                  checked={searchOption === 1}
                                  onChange={() => handleSearchOptionChange(1)}
                                />
                                <span className="text-sm">Full Profile</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  className="mr-2"
                                  value="2"
                                  checked={searchOption === 2}
                                  onChange={() => handleSearchOptionChange(2)}
                                />
                                <span className="text-sm">Profile title/key skills</span>
                              </label>
                            </div>
                            <div className="form-group relative mb-3">
                              <label className="absolute top-0 left-3 bg-white px-1 text-sm text-gray-600 -translate-y-2.5" htmlFor="id_searchinsearch_any">
                                Any keyword
                              </label>
                              <input
                                type="text"
                                id="id_searchinsearch_any"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={anyKeyword}
                                onChange={handleAnyKeywordChange}
                              />
                            </div>
                            <div className="form-group relative">
                              <label className="absolute top-0 left-3 bg-white px-1 text-sm text-gray-600 -translate-y-2.5" htmlFor="id_searchinsearch_all">
                                All keyword
                              </label>
                              <input
                                type="text"
                                id="id_searchinsearch_all"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={allKeyword}
                                onChange={handleAllKeywordChange}
                                placeholder="Enter all keywords"
                              />
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Experience</Accordion.Header>
                        <Accordion.Body>
                          <div className="range-slider-container px-3">
                            <div className="range-slider">
                              <span
                                className="rs-label text-sm"
                                style={{
                                  left: `${(sliderValue / 50) * 100}%`,
                                }}
                              >
                                {sliderValue} years
                              </span>
                              <input
                                className="rs-range w-full"
                                type="range"
                                value={sliderValue}
                                min="0"
                                max="50"
                                onChange={handleSliderChange}
                                aria-label="Adjust the slider value"
                              />
                            </div>
                            <div className="box-minmax flex justify-between text-sm mt-2">
                              <span>0</span>
                              <span>50</span>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>Salary</Accordion.Header>
                        <Accordion.Body>
                          <div className="px-3">
                            {['0-3', '3-6', '6-10', '10-15', '15-20'].map((range, i) => (
                              <div className="point-sel flex items-center mb-2" key={`salary-${i}`}>
                                <Form.Check 
                                  type="checkbox"
                                  id={`salary-checkbox${i+1}`}
                                  checked={salaryRange.includes(range)}
                                  onChange={() => toggleSalaryRange(range)}
                                  className="mr-2"
                                />
                                <label htmlFor={`salary-checkbox${i+1}`} className="text-sm">
                                  {range} Lakhs
                                </label>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="4">
                        <Accordion.Header>Location</Accordion.Header>
                        <Accordion.Body>
                          <div className="px-3">
                            <div className="mb-2">
                              <input type="text" className="form-control text-sm px-3 py-2" placeholder="Search location..." />
                            </div>
                            {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'].map((location, i) => (
                              <div className="point-sel flex items-center mb-2" key={`location-${i}`}>
                                <Form.Check 
                                  type="checkbox"
                                  id={`location-checkbox${i+1}`}
                                  checked={locations.includes(location)}
                                  onChange={() => toggleLocation(location)}
                                  className="mr-2"
                                />
                                <label htmlFor={`location-checkbox${i+1}`} className="text-sm">
                                  {location}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="5">
                        <Accordion.Header>Education</Accordion.Header>
                        <Accordion.Body>
                          <div className="px-3">
                            {['Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate (Ph.D.)'].map((education, i) => (
                              <div className="point-sel flex items-center mb-2" key={`education-${i}`}>
                                <Form.Check 
                                  type="checkbox"
                                  id={`education-checkbox${i+1}`}
                                  checked={educations.includes(education)}
                                  onChange={() => toggleEducation(education)}
                                  className="mr-2"
                                />
                                <label htmlFor={`education-checkbox${i+1}`} className="text-sm">
                                  {education}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="6">
                        <Accordion.Header>Job Type</Accordion.Header>
                        <Accordion.Body>
                          <div className="px-3">
                            {['Full-Time', 'Part-Time'].map((jobType, i) => (
                              <div className="point-sel flex items-center mb-2" key={`jobtype-${i}`}>
                                <Form.Check 
                                  type="checkbox"
                                  id={`jobtype-checkbox${i+1}`}
                                  checked={jobTypes.includes(jobType)}
                                  onChange={() => toggleJobType(jobType)}
                                  className="mr-2"
                                />
                                <label htmlFor={`jobtype-checkbox${i+1}`} className="text-sm">
                                  {jobType}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="7">
                        <Accordion.Header>Role Category</Accordion.Header>
                        <Accordion.Body>
                          <div className="px-3">
                            {['Software Development', 'Quality Assurance'].map((roleCategory, i) => (
                              <div className="point-sel flex items-center mb-2" key={`role-${i}`}>
                                <Form.Check 
                                  type="checkbox"
                                  id={`role-checkbox${i+1}`}
                                  checked={roleCategories.includes(roleCategory)}
                                  onChange={() => toggleRoleCategory(roleCategory)}
                                  className="mr-2"
                                />
                                <label htmlFor={`role-checkbox${i+1}`} className="text-sm">
                                  {roleCategory}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </Col>

                {/* Offcanvas for Filters on Mobile */}
                <Offcanvas show={showFilters} onHide={() => setShowFilters(false)} placement="start" className="w-11/12 sm:w-3/4">
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="text-lg font-semibold">Filters</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body className="p-3">
                    <Accordion defaultActiveKey={["0", "1", "2", "3", "4", "5", "6", "7"]} alwaysOpen>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Search within results</Accordion.Header>
                        <Accordion.Body>
                          <div className="p-3">
                            <div className="flex justify-between mb-3">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  className="mr-2"
                                  value="1"
                                  checked={searchOption === 1}
                                  onChange={() => handleSearchOptionChange(1)}
                                />
                                <span className="text-sm">Full Profile</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  className="mr-2"
                                  value="2"
                                  checked={searchOption === 2}
                                  onChange={() => handleSearchOptionChange(2)}
                                />
                                <span className="text-sm">Profile title/key skills</span>
                              </label>
                            </div>
                            <div className="form-group relative mb-3">
                              <label className="absolute top-0 left-3 bg-white px-1 text-sm text-gray-600 -translate-y-2.5" htmlFor="id_searchinsearch_any_mobile">
                                Any keyword
                              </label>
                              <input
                                type="text"
                                id="id_searchinsearch_any_mobile"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={anyKeyword}
                                onChange={handleAnyKeywordChange}
                              />
                            </div>
                            <div className="form-group relative">
                              <label className="absolute top-0 left-3 bg-white px-1 text-sm text-gray-600 -translate-y-2.5" htmlFor="id_searchinsearch_all_mobile">
                                All keyword
                              </label>
                              <input
                                type="text"
                                id="id_searchinsearch_all_mobile"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={allKeyword}
                                onChange={handleAllKeywordChange}
                                placeholder="Enter all keywords"
                              />
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Experience</Accordion.Header>
                        <Accordion.Body>
                          <div className="range-slider-container px-3">
                            <div className="range-slider">
                              <span
                                className="rs-label text-sm"
                                style={{
                                  left: `${(sliderValue / 50) * 100}%`,
                                }}
                              >
                                {sliderValue} years
                              </span>
                              <input
                                className="rs-range w-full"
                                type="range"
                                value={sliderValue}
                                min="0"
                                max="50"
                                onChange={handleSliderChange}
                                aria-label="Adjust the slider value"
                              />
                            </div>
                            <div className="box-minmax flex justify-between text-sm mt-2">
                              <span>0</span>
                              <span>50</span>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>Salary</Accordion.Header>
                        <Accordion.Body>
                          <div className="px-3">
                            {['0-3', '3-6', '6-10', '10-15', '15-20'].map((range, i) => (
                              <div className="point-sel flex items-center mb-2" key={`salary-mobile-${i}`}>
                                <Form.Check 
                                  type="checkbox"
                                  id={`salary-checkbox-mobile${i+1}`}
                                  checked={salaryRange.includes(range)}
                                  onChange={() => toggleSalaryRange(range)}
                                  className="mr-2"
                                />
                                <label htmlFor={`salary-checkbox-mobile${i+1}`} className="text-sm">
                                  {range} Lakhs
                                </label>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="4">
                        <Accordion.Header>Location</Accordion.Header>
                        <Accordion.Body>
                          <div className="px-3">
                            <div className="mb-2">
                              <input type="text" className="form-control text-sm px-3 py-2" placeholder="Search location..." />
                            </div>
                            {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'].map((location, i) => (
                              <div className="point-sel flex items-center mb-2" key={`location-mobile-${i}`}>
                                <Form.Check 
                                  type="checkbox"
                                  id={`location-checkbox-mobile${i+1}`}
                                  checked={locations.includes(location)}
                                  onChange={() => toggleLocation(location)}
                                  className="mr-2"
                                />
                                <label htmlFor={`location-checkbox-mobile${i+1}`} className="text-sm">
                                  {location}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="5">
                        <Accordion.Header>Education</Accordion.Header>
                        <Accordion.Body>
                          <div className="px-3">
                            {['Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate (Ph.D.)'].map((education, i) => (
                              <div className="point-sel flex items-center mb-2" key={`education-mobile-${i}`}>
                                <Form.Check 
                                  type="checkbox"
                                  id={`education-checkbox-mobile${i+1}`}
                                  checked={educations.includes(education)}
                                  onChange={() => toggleEducation(education)}
                                  className="mr-2"
                                />
                                <label htmlFor={`education-checkbox-mobile${i+1}`} className="text-sm">
                                  {education}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="6">
                        <Accordion.Header>Job Type</Accordion.Header>
                        <Accordion.Body>
                          <div className="px-3">
                            {['Full-Time', 'Part-Time'].map((jobType, i) => (
                              <div className="point-sel flex items-center mb-2" key={`jobtype-mobile-${i}`}>
                                <Form.Check 
                                  type="checkbox"
                                  id={`jobtype-checkbox-mobile${i+1}`}
                                  checked={jobTypes.includes(jobType)}
                                  onChange={() => toggleJobType(jobType)}
                                  className="mr-2"
                                />
                                <label htmlFor={`jobtype-checkbox-mobile${i+1}`} className="text-sm">
                                  {jobType}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="7">
                        <Accordion.Header>Role Category</Accordion.Header>
                        <Accordion.Body>
                          <div className="px-3">
                            {['Software Development', 'Quality Assurance'].map((roleCategory, i) => (
                              <div className="point-sel flex items-center mb-2" key={`role-mobile-${i}`}>
                                <Form.Check 
                                  type="checkbox"
                                  id={`role-checkbox-mobile${i+1}`}
                                  checked={roleCategories.includes(roleCategory)}
                                  onChange={() => toggleRoleCategory(roleCategory)}
                                  className="mr-2"
                                />
                                <label htmlFor={`role-checkbox-mobile${i+1}`} className="text-sm">
                                  {roleCategory}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Offcanvas.Body>
                </Offcanvas>

                <Col xs={12} md={9}>
                  <div className="p-3 sm:p-4 shadow-sm bg-white mb-4 sticky-top" style={{ top: '0px', zIndex: '10' }}>
                    <div className="flex sm:flex-row justify-between items-start sm:items-center gap-3">
                      <p className="text-muted mb-0">
                        <span className="text-base sm:text-lg font-semibold">{filteredResults.length} Candidates</span> for All Keywords
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto">
                        <form id="itemsPerPageForm" className="flex items-center w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
                          <label className="text-sm mr-2" htmlFor="itemsPerPage">
                            Show:
                          </label>
                          <select
                            className="border p-1 rounded-md text-sm w-full sm:w-24"
                            id="itemsPerPage"
                            name="srp_result_per_page"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                          >
                            <option value="40">40</option>
                            <option value="60">60</option>
                            <option value="80">80</option>
                          </select>
                        </form>
                        <div className="hidden sm:flex items-center text-sm">
                          <span>Page: {currentPage} of {totalPages}</span>
                          <div className="flex ml-2 gap-1">
                            <button className="rounded-lg bg-gray-100 px-2 py-1" onClick={goToPreviousPage} disabled={currentPage === 1}>
                              <FontAwesomeIcon icon={faAngleLeft} />
                            </button>
                            <button className="rounded-lg bg-gray-100 px-2 py-1" onClick={goToNextPage} disabled={currentPage === totalPages}>
                              <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <Form.Check
                        type="checkbox"
                        label={areAllJobsSelected ? 'Deselect All' : 'Select All'}
                        checked={areAllJobsSelected}
                        onChange={handleSelectAll}
                        disabled={filteredResults.length === 0}
                        className="text-sm"
                      />
                      <Button
                        className="bg-white p-0 flex text-black items-center border-none text-sm"
                        onClick={downloadSelectedResumes}
                        disabled={selectedJobs.length === 0}
                      >
                        {isDownloading ? (
                          <>
                            <FaSpinner className="mr-2 fa-spin" />
                            Preparing Download...
                          </>
                        ) : (
                          <>
                            <FaDownload className="mr-2" />
                            Download Selected ({selectedJobs.length})
                          </>
                        )}
                      </Button>
                      <Button
                        className="bg-white p-0 flex text-black items-center border-none text-sm"
                        onClick={downloadExcelReport}
                        disabled={selectedJobs.length === 0 || isDownloadingExcel}
                      >
                        {isDownloadingExcel ? (
                          <>
                            <FaSpinner className="mr-2 fa-spin" />
                            Preparing Excel...
                          </>
                        ) : (
                          <>
                            <FaFileExcel className="mr-2" />
                            Excel ({selectedJobs.length})
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="h-full">
                    <div className="d-grid gap-3">
                      {getCurrentPageItems().map((candidate) => (
                        <Col key={`${candidate.id}-${candidate.job_profile || ''}`} xs={12}>
                          <Card className="shadow-sm ">
                            <Card.Body className="sm:!pl-[30px] pt-20  " >
                              <Form.Check
                                type="checkbox"
                                checked={selectedJobs.includes(candidate.id)}
                                onChange={() => handleJobSelect(candidate.id)}
                                className="position-absolute top-5 left-2"
                              />
                              <Link to={`/candidateProfile`} state={{ userId: candidate.id }} onClick={() => forProfileViews(candidate.id)} className="text-decoration-none mt-16 sm:pt-0 text-dark">
                                <div className="d-flex flex-column sm:flex-row justify-content-between align-items-start gap-3">
                                  <div className="flex-1">
                                    <div className="d-flex flex-wrap align-items-center gap-2">
                                      <Card.Title className="text-base sm:text-lg mb-0">
                                        {highlightKeywords(candidate.full_name)}
                                      </Card.Title>
                                      {candidate.currentlyworking === "yes" && (
                                        <span className="text-sm text-[#247265] bg-[#CEF2E8] py-1 px-3 rounded-full">
                                          Currently Working
                                        </span>
                                      )}
                                    </div>
                                    <div className="d-flex flex-wrap gap-2 text-muted text-sm mt-2">
                                      <div className="d-flex align-items-center gap-1">
                                        <Briefcase size={14} />
                                        <span>{highlightKeywords(candidate.job_profile || 'Not specified')}</span>
                                      </div>
                                      <div className="d-flex align-items-center gap-1">
                                        <Building2 size={14} />
                                        <span>{highlightKeywords(candidate.company_name || 'Not specified')}</span>
                                      </div>
                                      <div className="d-flex align-items-center gap-1">
                                        <MapPin size={14} />
                                        <span>{highlightKeywords(candidate.address || 'Location not specified')}</span>
                                      </div>
                                    </div>
                                    <div className="d-flex flex-wrap gap-2 text-muted text-sm mt-2">
                                      <div className="d-flex align-items-center gap-1">
                                        <Clock size={14} />
                                        <span>{candidate.experienceperiod ? `${candidate.experienceperiod} years` : 'Fresher'}</span>
                                      </div>
                                      <div className="d-flex align-items-center gap-1">
                                        <Star size={14} />
                                        <span>
                                          {candidate.min_salary && candidate.max_salary 
                                            ? `${candidate.min_salary} - ${candidate.max_salary} LPA`
                                            : 'Salary not specified'}
                                        </span>
                                      </div>
                                    </div>
                                    {candidate.jobStartDate && (
                                      <div className="d-flex align-items-center text-sm text-muted mt-2">
                                        <Calendar size={14} className="mr-1" />
                                        <span>
                                          <strong>Experience:</strong> {formatDate(candidate.jobStartDate)} -{' '}
                                          {candidate.currentlyworking === "yes" 
                                            ? 'Present' 
                                            : candidate.jobEndDate ? formatDate(candidate.jobEndDate) : 'Not specified'}
                                        </span>
                                      </div>
                                    )}
                                    <div className="text-sm text-muted mt-2">
                                      <strong>About:</strong> {highlightKeywords(candidate.aboutme || 'No description provided')}
                                    </div>
                                    {candidate.skills && (
                                      <div className="d-flex flex-wrap gap-2 mt-2">
                                        <Edit size={14} />
                                        {candidate.skills.split(',').map((skill, index) => (
                                          <Badge bg="light" text="dark" key={index} className="text-sm">
                                            {highlightKeywords(skill.trim())}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  <img
                              className="sidelogo"
                              src={
                                candidate.profile_image
                                  ? API_ENDPOINTS.FETCHIMAGE(candidate.profile_image)
                                  : "https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                              }
                              alt="Profile"
                              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                            />
                                </div>
                              </Link>
                              <div className="d-flex justify-content-between align-items-center mt-3">
                                {candidate.resume ? (
                                <a
                                  href={API_ENDPOINTS.FETCHRESUME(candidate.resume)}
                                  rel="noopener noreferrer"
                                  className="btn btn-outline-primary btn-sm text-sm px-3 py-1"
                                  target="_blank"
                                  onClick={()=> forSaveResumeViews(candidate.id)}
                                >
                                  <FaDownload className="mr-1" /> Download Resume
                                </a>
                                ) : (
                                <span className="text-gray-500 italic">Resume not available</span>
                              )}
                                <div className="text-muted text-xs sm:text-sm">
                                  Last updated: {formatDate(candidate.updated_at) || 'Not Updated Yet'}
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </div>
                    <nav aria-label="Page navigation" className="mt-4">
                      <Pagination className="justify-content-center flex-wrap">
                        <Pagination.Prev onClick={goToPreviousPage} disabled={currentPage === 1}>
                          <FontAwesomeIcon icon={faAnglesLeft} /> Previous
                        </Pagination.Prev>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <Pagination.Item
                            key={i + 1}
                            active={i + 1 === currentPage}
                            onClick={() => setCurrentPage(i + 1)}
                            className="text-sm"
                          >
                            {i + 1}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={goToNextPage} disabled={currentPage === totalPages}>
                          Next <FontAwesomeIcon icon={faAnglesRight} />
                        </Pagination.Next>
                      </Pagination>
                    </nav>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Advancejoblist;