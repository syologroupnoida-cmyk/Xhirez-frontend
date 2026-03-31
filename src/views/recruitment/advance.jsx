import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown';
import Navbar from '../../components/header/recruitment-header';
import Footer from '../../components/footer/footer';
import { Container } from 'react-bootstrap';
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../apiConfig';
import { toast, ToastContainer } from 'react-toastify';
import { TagsInput } from "react-tag-input-component";
import AuthorizationHeader from '../AuthorizationHeader';

const AdvanceSearch = () => {
  // State for form data

  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    searchKeyword: '',
    keyword: '',
    keywordsAll: [],
    excludeKeywords: '',
    currentLocation: '',
    minSalary: '',
    maxSalary: '',
    minExperience: '',
    maxExperience: '',
    noticePeriod: '',
    designation: '',
    includePreviousDesignations: false,
    currentIndustry: '',
    currentDepartment: '',
    currentDegree: '',
    institutes: [],
    degrees: [],
    show: 'all',
    sortBy: 'relevance',
    minAge: '',
    maxAge: '',
    includeNoAge: false,
    genders: [],
    verifiedEmail: false,
    verifiedMobile: false,
    similarSkills: false,
    hideProfilesWithoutResume: false,
    searchTimeFrame: ''
  });

  // State for UI controls
  const [isBooleanSearch, setIsBooleanSearch] = useState(false);
  const [excludeKeywordsOpen, setExcludeKeywordsOpen] = useState(false);
  const [showEmployment, setShowEmployment] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [formErrors, setFormErrors] = useState({});



  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle multiselect changes
  const handleMultiSelectChange = (selectedList, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: selectedList.map(item => item.name)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();


    // Check if education section has any data
    const hasEducationData = 
      formData.institutes.length > 0 || 
      formData.degrees.length > 0 || 
      formData.currentDegree;
    
    // Validate form
    const errors = {};
    
    // Keyword is mandatory unless education section has data
    if (!hasEducationData && !formData.searchKeyword.trim()) {
      errors.searchKeyword = 'Keyword is required';
      toast.error('Keyword is required');
    }
    
    setFormErrors(errors);
    
    // If there are errors, don't submit
    if (Object.keys(errors).length > 0) {
      return;
    }


    setIsLoading(true);

    try {
      // Prepare the request data according to API requirements
      const requestData = {
        keyword: formData.searchKeyword,
        minsalary: formData.minSalary?.trim() || "",
        maxsalary: formData.maxSalary?.trim() || "",
        noticePeriod: formData.noticePeriod,
        designation: formData.designation,
        currentIndustry: formData.currentIndustry,
        currentDepartment: formData.currentDepartment,
        currentDegree: formData.currentDegree,
        institutes: formData.institutes,
        excludeKeyword: formData.excludeKeywords,
        includePreviousDesignations: formData.includePreviousDesignations,
        currentLocation: formData.currentLocation,
        minAge: formData.minAge,
        maxAge: formData.maxAge,
        includeNoAge: formData.includeNoAge,
        location: formData.currentLocation,
        experiencePeriod: formData.minExperience?.trim() || "",
        skills: formData.keywordsAll,
        education:  (formData.degrees && formData.degrees.length > 0) ||
            (formData.institutes && formData.institutes !== "")
              ? [{
                  degree: Array.isArray(formData.degrees) ? formData.degrees.join(',') : formData.degrees || '',
                  university: Array.isArray(formData.institutes) ? formData.institutes.join(',') : formData.institutes || ''
                }]
              : [],
        fullName: '', 
        checkResume: formData.hideProfilesWithoutResume.toString(),
        checkgender1: formData.genders.includes('Male') ? 'true' : 'false',
        checkgender2: formData.genders.includes('Female') ? 'true' : 'false',
        checkgender3: formData.genders.includes('Other') ? 'true' : 'false',
        verifiedEmail: formData.verifiedEmail ? 'true' : 'false',
        verifiedMnumber: formData.verifiedMobile ? 'true' : 'false',
        checkSimilarSkills: formData.similarSkills ? 'true' : 'false',
        phoneNo: '', 
        checkShowProfile: formData.show || 'all',
        checkSortBy: formData.sortBy || 'freshness',
        updatedAt : formData.searchTimeFrame || "",
      };


      const filteredRequestData = Object.fromEntries(
        Object.entries(requestData).filter(([_, value]) => {
          // Filter out empty strings, empty arrays, and default values
          if (value === "") return false;
          if (Array.isArray(value) && value.length === 0) return false;
          if (value === "false") return false;
          if (value === "all") return false;
          if (value === "freshness") return false;
          return true;
        })
      );
  
      // Make API call
      const response = await AuthorizationHeader.post(API_ENDPOINTS.GETADVANCESEARCH, requestData);
      
      setSearchResults(response.data);
      // console.log('Search results:', response.data);

      navigate('/searchedProfiles', { state: { searchResults: response.data, requestData: requestData, filteredRequestData: filteredRequestData } });
      
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Handle error (show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle sections
  const toggleSection = (section) => {
    if (section === "employment") setShowEmployment(!showEmployment);
    if (section === "education") setShowEducation(!showEducation);
    if (section === "additional") setShowAdditional(!showAdditional);
  };

  // Options for multiselects
  const searchOptions = isBooleanSearch
    ? [
        { name: "Key Skills", id: 2 },
        { name: "Any Boolean Keywords", id: 3 },
        { name: "Search by Boolean", id: 4 },
      ]
    : [
        { name: "Profile Title Or Key Skills", id: 2 },
        { name: "Key Skills", id: 3 },
        { name: "Profile Title", id: 4 },
      ];

  const options2 = [
    { name: 'Full Profile', id: '1' },
    { name: 'Profile Title', id: '2' },
    { name: 'Key Skills', id: '3' },
    { name: 'Profile Title', id: '4' },
  ];

  const options3 = [
    { name: 'BSC', id: '1' },
    { name: 'M-tect', id: '2' },
    { name: 'btech', id: '3' },
    { name: 'Profile Title', id: '4' },
  ];

  const [dropdownOptions, setDropdownOptions] = useState({
      qualifications: [],
      universities: [],
    });


  // Data fetching functions
    

    useEffect(() => {

      const fetchDropdownData = async () => {
      
      try {

        // For Qualifications Suggestions
        
        const qualRes = await AuthorizationHeader.get(API_ENDPOINTS.FETCH_QUALIFICATIONS);

        const qualifications = qualRes.data.data.map((q, index) => ({
          name: q.qualification_name.trim()
        }));
        
        setDropdownOptions(prev => ({ ...prev, qualifications }));
    
        
    
        // For Universities Suggestions 
        
        const univRes = await AuthorizationHeader.get(API_ENDPOINTS.FETCHALLUNIVERSITIES);

      const universities = [...new Set(univRes.data.map(u => u.name.trim()))].sort();

      const universityOptions = universities.map(name => ({ name }));

      setDropdownOptions(prev => ({
        ...prev,
        universities: universityOptions,
      }));
        
        
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      } 
    };


    fetchDropdownData();
  }, []);
  

// set location

  const handleLocationsSuggestionClick = (suggestion) => {
    
    setFormData(prev => ({
      ...prev,
      currentLocation: suggestion
    }));

    setLocationSuggestions(false); 
  };

   const handlePostChange = (e) => {
      const value = e.target.value;

      setFormData(prev => ({
        ...prev,
        currentLocation: value
      }));
  
      if (value) {
        axios.post("https://countriesnow.space/api/v0.1/countries/cities", {
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
          })
          .catch(() => setLocationSuggestions([]));
      } else {
        setLocationSuggestions([]);
      }
    };

  return (
    <>
      <Navbar />
      <section>
        <Container>
          <div className="w-full max-w-4xl mx-auto p-6 bg-gray-100 shadow-orange-50 border border-gray-300 rounded-md">
            {/* Search Type Toggle */}
            {/* <ul className="bg-white rounded-xl flex mb-6 p-2 justify-end">
              <li className="flex items-center">
                <div className="flex justify-end">
                  <span className="font-medium text-gray-700">Boolean Search</span>
                  <label className="ml-1 flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="toggleSearchType"
                      className="hidden"
                      checked={isBooleanSearch}
                      onChange={() => setIsBooleanSearch(!isBooleanSearch)}
                    />
                    <span
                      className={`relative inline-block w-10 h-4 transition-all rounded-full ${
                        isBooleanSearch ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-0 w-4 h-4 bg-white rounded-full transition-all ${
                          isBooleanSearch ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </span>
                  </label>
                </div>
              </li>

              <li className="ml-3 flex flex-col mb-0">
                <div className="relative flex">
                  <label htmlFor="id_searchin" className="text-sm font-medium text-gray-700 pt-[6px] pr-2">
                    Search keyword in
                  </label>
                  <select
                    name="searchin"
                    id="id_searchin"
                    className="block w-3/5 px-2 py-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.searchin}
                    onChange={handleInputChange}
                  >
                    <option value="1">Full Profile</option>
                    <option value="2">Profile Title</option>
                    <option value="3">Key Skills</option>
                    <option value="4">Profile Title</option>
                  </select>
                </div>
              </li>
            </ul> */}

            <div className="max-w-4xl bg-white rounded-3xl mx-auto py-9 px-4">
              <form onSubmit={handleSubmit}>
                {/* Keyword Search */}
                {/* <div className="mb-1">
                  <div className="relative">
                   <input
                        type="text"
                        name="searchKeyword"
                        className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 shadow-none focus:outline-none focus:none"
                        // placeholder="Type keywords to Exclude"
                        value={formData.searchKeyword}
                        onChange={handleInputChange}
                      />
                    <label
                      htmlFor="searchin"
                      className="absolute left-0 top-[-12px] bg-white font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                    >
                      {isBooleanSearch ? "Boolean Search" : "keywords"}
                    </label>
                    {formErrors.searchKeyword && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.searchKeyword}</p>
                    )}
                  </div>
                </div> */}


                <div className="mb-1">
                  <div className="relative">
                    <TagsInput
                      value={formData.searchKeyword.split(/\s*,\s*/).filter(Boolean)} 
                      onChange={(newTags) => {
                        setFormData((prev) => ({
                          ...prev,
                          searchKeyword: newTags.join(',')
                        }));
                      }}
                      name="searchKeyword"
                      placeHolder="Type keywords"
                      separators={[',','Enter']} 
                      className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 shadow-none focus:outline-none focus:none"

                    />
                    <label
                      htmlFor="searchKeyword"
                      className="absolute left-2 top-[-10px] bg-white font-semibold px-1 text-gray-700 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                      {isBooleanSearch ? "Boolean Search" : "Keywords"}
                    </label>
                    {formErrors.searchKeyword && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.searchKeyword}</p>
                    )}
                  </div>
                </div>

                {/* All of these keywords */}
                {/* <div className="mb-2 mt-5">
                  <div className="relative">
                    <Multiselect
                      className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none"
                      options={options2}
                      onSelect={(selectedList) => handleMultiSelectChange(selectedList, 'keywordsAll')}
                      onRemove={(selectedList) => handleMultiSelectChange(selectedList, 'keywordsAll')}
                      displayValue="name"
                      placeholder="Select options"
                      id="keywordsAll"
                      showArrow={true}
                    />
                    <label
                      htmlFor="keywords"
                      className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                    >
                      All of these keywords
                    </label>
                  </div>
                </div> */}

                {/* Exclude Keywords Toggle */}
                <div className="mb-9">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="excludeKeywords"
                      onChange={() => setExcludeKeywordsOpen(!excludeKeywordsOpen)}
                      className="mr-1 w-3 h-4"
                    />
                    <label htmlFor="excludeKeywords" className="text-sm text-gray-300">
                      Exclude Keywords
                    </label>
                  </div>

                  {excludeKeywordsOpen && (
                    <div className="mb-4 mt-2 relative bg-gray-50 p-4">
                      {/* <input
                        type="text"
                        name="excludeKeywords"
                        className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 shadow-none focus:outline-none focus:none"
                        placeholder="Type keywords to Exclude"
                        value={formData.excludeKeywords}
                        onChange={handleInputChange}
                      /> */}

                      <TagsInput
                      value={formData.excludeKeywords.split(/\s*,\s*/).filter(Boolean)} 
                      onChange={(newTags) => {
                        setFormData((prev) => ({
                          ...prev,
                          excludeKeywords: newTags.join(',')
                        }));
                      }}
                      name="excludeKeywords"
                      placeHolder="Type keywords"
                      separators={[',','Enter']}
                      className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 shadow-none focus:outline-none focus:none"

                    />
                    <label
                      htmlFor="searchKeyword"
                      className="absolute left-2 top-[-10px] bg-white font-semibold px-1 text-gray-700 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                    </label>
                    </div>
                  )}
                </div>

                {/* Current Location */}
                <div className="mb-9 mt-3">
                  <div className="relative">
                    {/* <select
                      name="currentLocation"
                      className="block peer w-full px-3 py-3 bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
                      value={formData.currentLocation}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a location</option>
                      <option value="New York">New York</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Chicago">Chicago</option>
                    </select> */}

                    <input
                        type="text"
                        name="currentLocation"
                        className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 shadow-none focus:outline-none focus:none"
                        value={formData.currentLocation}
                        onChange={handlePostChange}
                      />
                      {locationSuggestions.length > 0 && (
                      <ul
                        style={{
                          position: "absolute",
                          top: "54px",
                          left: "0",
                          right: "0",
                          background: "white",
                          border: "1px solid #ddd",
                          borderTop: "none",
                          listStyle: "none",
                          padding: "0",
                          margin: "0",
                          maxHeight: "150px",
                          overflowY: "auto",
                          borderRadius: "5px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          zIndex: "1",
                        }}
                      >
                        {locationSuggestions.map((locationSuggestions, index) => (
                          <li
                            key={index}
                            onClick={() => handleLocationsSuggestionClick(locationSuggestions)}
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                          >
                            {locationSuggestions}
                          </li>
                        ))}
                      </ul>
                    )}

                    <label
                      htmlFor="currentLocation"
                      className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                    >
                      Select Current Location
                    </label>
                  </div>
                </div>

                {/* Salary Selection */}
                <div className="mb-9 flex space-x-4">
                  <div className="w-full sm:w-1/2">
                    <div className="relative">
                      <input
                        type="number"
                        name="minSalary"
                        className="block w-full px-3 py-2 mt-4 bg-white border border-gray-300 rounded-lg"
                        value={formData.minSalary}
                        onChange={handleInputChange}
                      />
                      <label className="absolute left-0 top-[-12px] font-semibold mb-2 bg-white transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
                        Min Salary
                      </label>
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          id="includeZeroSalary"
                          checked={formData.includeZeroSalary}
                          onChange={handleInputChange}
                          className="h-3 w-5 text-blue-500 focus:ring-0 mr-0"
                        />
                        <label htmlFor="includeZeroSalary" className="text-sm text-gray-300">
                          Also include candidates with zero salary
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <div className="relative">
                      <input
                        type="number"
                        name="maxSalary"
                        className="block w-full px-3 py-2 mt-4 bg-white border border-gray-300 rounded-lg"
                        value={formData.maxSalary}
                        onChange={handleInputChange}
                      />
                      <label className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
                        Max Salary
                      </label>
                    </div>
                  </div>
                </div>

                {/* Experience Range */}
                <div className="mb-9 flex space-x-4">
                  <div className="w-full sm:w-1/2">
                    <div className="relative">
                      <select
                        name="minExperience"
                        className="peer block w-full px-3 py-[20px] bg-white border rounded-md border-gray-300 shadow-none focus:outline-none focus:none"
                        value={formData.minExperience}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Experience</option>
                        <option value="0">Fresher</option>
                        <option value="1">1+ Years</option>
                        <option value="2">2+ Years</option>
                        <option value="3">3+ Years</option>
                        <option value="4">4+ Years</option>
                        <option value="5">5+ Years</option>
                        <option value="6">6+ Years</option>
                        <option value="7">7+ Years</option>
                        <option value="8">8+ Years</option>
                        <option value="9">9+ Years</option>
                        <option value="10">10+ Years</option>
                      </select>
                      <label className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
                        Min Experience
                      </label>
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <div className="relative">
                      <select
                        name="maxExperience"
                        className="peer block w-full px-3 py-2 bg-white border rounded-md border-gray-300 shadow-none focus:outline-none focus:none"
                        value={formData.maxExperience}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Experience</option>
                        <option value="1">1+ Years</option>
                        <option value="2">2+ Years</option>
                        <option value="3">3+ Years</option>
                        <option value="4">4+ Years</option>
                        <option value="5">5+ Years</option>
                        <option value="6">6+ Years</option>
                        <option value="7">7+ Years</option>
                        <option value="8">8+ Years</option>
                        <option value="9">9+ Years</option>
                        <option value="10">10+ Years</option>
                        <option value="15">15+ Years</option>
                        <option value="20">20+ Years</option>
                      </select>
                      <label className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
                        Max Experience
                      </label>
                    </div>
                  </div>
                </div>

                {/* Notice Period */}
                <div className="mb-3 mt-4 relative">
                  <div className="relative">
                    <select
                      name="noticePeriod"
                      className="peer block w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:ring-0"
                      value={formData.noticePeriod}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Notice Period</option>
                      <option value="immediate">Immediate Joiner</option>
                      <option value="1 week">15 days</option>
                      <option value="1 month">1 month</option>
                      <option value="2 months">2 months</option>
                      <option value="3 months">3 months</option>
                    </select>
                    <label
                      htmlFor="noticePeriod"
                      className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:scale-75"
                    >
                      Notice Period
                    </label>
                  </div>
                </div>

                {/* Employment Details */}
                {/* <div className="bg-white rounded-xl border-none py-3 px-6 mt-6">
                  <div className="flex justify-between items-center bg-white">
                    <h2 className="text-lg font-medium">Employment Details</h2>
                    <button
                      type="button"
                      onClick={() => toggleSection("employment")}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {showEmployment ? "Hide" : "Show"}
                    </button>
                  </div>
                  {showEmployment && (
                    <div className="pl-0 border-t">
                      <div className="bg-white mt-2">
                        <div className="relative mt-5">
                          <select
                            name="designation"
                            className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
                            value={formData.designation}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Designation</option>
                            <option value="Software Engineer">Software Engineer</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="Data Scientist">Data Scientist</option>
                          </select>
                          <label
                            htmlFor="designation"
                            className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                          >
                            Search by Designation
                          </label>
                        </div>

                        <div className="flex items-center mb-5 space-x-2">
                          <input
                            type="checkbox"
                            id="includePreviousDesignations"
                            name="includePreviousDesignations"
                            checked={formData.includePreviousDesignations}
                            onChange={handleInputChange}
                            className="mr-0 mt-1 w-3 h-3"
                          />
                          <label htmlFor="includePreviousDesignations" className="text-sm text-gray-700">
                            Include Previous Designations
                          </label>
                        </div>

                        <div className="relative mt-8 mb-5">
                          <select
                            name="currentIndustry"
                            className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
                            value={formData.currentIndustry}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Industry</option>
                            <option value="Technology">Technology</option>
                            <option value="Finance">Finance</option>
                            <option value="Healthcare">Healthcare</option>
                          </select>
                          <label
                            htmlFor="currentIndustry"
                            className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                          >
                            Current Industry
                          </label>
                        </div>

                        <div className="relative mt-8">
                          <select
                            name="currentDepartment"
                            className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
                            value={formData.currentDepartment}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Department</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Marketing">Marketing</option>
                            <option value="HR">HR</option>
                          </select>
                          <label
                            htmlFor="currentDepartment"
                            className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                          >
                            Current Department / Functional Area
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div> */}

                {/* Education Details */}
                <div className="bg-white rounded-xl py-3 px-6 mt-6">
                  <div className="flex justify-between items-center pb-2">
                    <h2 className="text-lg font-medium">Education Details</h2>
                    <button
                      type="button"
                      onClick={() => toggleSection("education")}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {showEducation ? "Hide" : "Show"}
                    </button>
                  </div>
                  {showEducation && (
                    <div className="pl-4 border-t">

                      {/* <div className="relative mt-8">
                        <select
                          name="currentDegree"
                          className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
                          value={formData.currentDegree}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Degree</option>
                          <option value="Bachelor's">Bachelor's</option>
                          <option value="Master's">Master's</option>
                          <option value="PhD">PhD</option>
                        </select>
                        <label
                          htmlFor="currentDegree"
                          className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                        >
                          Current Degree
                        </label>
                      </div> */}

                      <div className="relative mt-8">
                        <select
                          name="institutes"
                          className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
                          value={formData.institutes}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Institute</option>
                          {dropdownOptions.universities.map((uni, index) => (
                            <option key={index} value={uni.name}>{uni.name}</option>
                          ))}
                        </select>
                        <label
                          htmlFor="institutes"
                          className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                        >
                          Select Institute(s)
                        </label>
                      </div>

                      <div className="relative mt-8">
                        <Multiselect
                          className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none"
                          options={dropdownOptions.qualifications}
                          onSelect={(selectedList) => handleMultiSelectChange(selectedList, 'degrees')}
                          onRemove={(selectedList) => handleMultiSelectChange(selectedList, 'degrees')}
                          displayValue="name"
                          id="degrees"
                          showArrow={true}
                        />
                        <label
                          htmlFor="currentDegree"
                          className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                        >
                          Select degree
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Parameters */}
                <div className="bg-white rounded-xl py-3 px-6 mt-6">
                  <div className="flex justify-between items-center pb-2">
                    <h2 className="text-lg font-medium">Additional Parameters</h2>
                    <button
                      type="button"
                      onClick={() => toggleSection("additional")}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {showAdditional ? "Hide" : "Show"}
                    </button>
                  </div>
                  {showAdditional && (
                    <div className="pl-4 border-t">
                      <div className="relative mt-8 mb-5">
                        <select
                          name="show"
                          className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
                          value={formData.show}
                          onChange={handleInputChange}
                        >
                          <option value="all">All Profile</option>
                          <option value="new">New Profile</option>
                        </select>
                        <label
                          htmlFor="institutes"
                          className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                        >
                          Show
                        </label>
                      </div>

                      <div className="relative mt-12">
                        <select
                          name="sortBy"
                          className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
                          value={formData.sortBy}
                          onChange={handleInputChange}
                        >
                          <option value="relevance">Relevance</option>
                          <option value="freshness">Freshness</option>
                        </select>
                        <label
                          htmlFor="institutes"
                          className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                        >
                          Sort By
                        </label>
                      </div>

                      {/* <div className="mb-9 mt-7 flex space-x-4">
                        <div className="w-full sm:w-1/2">
                          <div className="relative mt-8">
                            <select
                              name="minAge"
                              value={formData.minAge}
                              onChange={handleInputChange}
                              className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none"
                            >
                              <option value="">Select Min Age</option>
                              <option value="18">18</option>
                              <option value="25">25</option>
                              <option value="30">30</option>
                              <option value="35">35</option>
                              <option value="40">40</option>
                              <option value="50">50</option>
                            </select>
                            <label
                              htmlFor="minAge"
                              className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                            >
                              Min Age
                            </label>

                            <div className="mt-0">
                              <label className="flex items-center text-gray-700">
                                <input
                                  type="checkbox"
                                  name="includeNoAge"
                                  checked={formData.includeNoAge}
                                  onChange={handleInputChange}
                                  className="mr-2"
                                />
                                <span className="text-sm">Also include candidates with no age</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <div className="relative mt-8">
                            <select
                              name="maxAge"
                              value={formData.maxAge}
                              onChange={handleInputChange}
                              className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none"
                            >
                              <option value="">Select Max Age</option>
                              <option value="30">30</option>
                              <option value="40">40</option>
                              <option value="50">50</option>
                              <option value="60">60</option>
                              <option value="70">70</option>
                              <option value="80">80</option>
                            </select>
                            <label
                              htmlFor="maxAge"
                              className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                            >
                              Max Age
                            </label>
                          </div>
                        </div>
                      </div> */}

                      <div className="mt-4">
                        <h3 className="text-gray-700 font-semibold mb-2">Select Gender</h3>
                        <div className="flex items-center">
                          <label className="flex items-center text-gray-700 mr-4">
                            <input
                              type="checkbox"
                              name="genders"
                              value="Male"
                              checked={formData.genders.includes('Male')}
                              onChange={(e) => {
                                const { value, checked } = e.target;
                                setFormData(prev => ({
                                  ...prev,
                                  genders: checked
                                    ? [...prev.genders, value]
                                    : prev.genders.filter(gender => gender !== value)
                                }));
                              }}
                              className="mr-2"
                            />
                            Male
                          </label>
                          <label className="flex items-center text-gray-700 mr-4">
                            <input
                              type="checkbox"
                              name="genders"
                              value="Female"
                              checked={formData.genders.includes('Female')}
                              onChange={(e) => {
                                const { value, checked } = e.target;
                                setFormData(prev => ({
                                  ...prev,
                                  genders: checked
                                    ? [...prev.genders, value]
                                    : prev.genders.filter(gender => gender !== value)
                                }));
                              }}
                              className="mr-2"
                            />
                            Female
                          </label>
                          <label className="flex items-center text-gray-700">
                            <input
                              type="checkbox"
                              name="genders"
                              value="Other"
                              checked={formData.genders.includes('Other')}
                              onChange={(e) => {
                                const { value, checked } = e.target;
                                setFormData(prev => ({
                                  ...prev,
                                  genders: checked
                                    ? [...prev.genders, value]
                                    : prev.genders.filter(gender => gender !== value)
                                }));
                              }}
                              className="mr-2"
                            />
                            Other
                          </label>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="flex items-center text-gray-700">
                          <input
                            type="checkbox"
                            name="verifiedEmail"
                            checked={formData.verifiedEmail}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span className="text-sm">Only candidates with verified email</span>
                        </label>
                      </div>

                      <div className="mt-4">
                        <label className="flex items-center text-gray-700">
                          <input
                            type="checkbox"
                            name="verifiedMobile"
                            checked={formData.verifiedMobile}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span className="text-sm">Only candidates with verified mobile number</span>
                        </label>
                      </div>

                      <div className="mt-4">
                        <label className="flex items-center text-gray-700">
                          <input
                            type="checkbox"
                            name="similarSkills"
                            checked={formData.similarSkills}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span className="text-sm">Also include candidates with similar skills</span>
                        </label>
                      </div>

                      <div className="mt-4">
                        <label className="flex items-center text-gray-700">
                          <input
                            type="checkbox"
                            name="hideProfilesWithoutResume"
                            checked={formData.hideProfilesWithoutResume}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span className="text-sm">Hide profiles without resume</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Section */}
                <div className="mt-6 flex justify-between items-center">
                  <select
                    className="border-none bg-transparent"
                    name="searchTimeFrame"
                    value={formData.searchTimeFrame}
                    onChange={handleInputChange}
                  >
                    <option value="">Relevant By Time</option>
                    <option value="1">1 Day Ago</option>
                    <option value="5">5 Days Ago</option>
                    <option value="10">10 Days Ago</option>
                    <option value="30">1 Month Ago</option>
                    <option value="90">3 Months Ago</option>
                  </select>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Searching...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>

            {/* Display search results if available */}
            {searchResults.length > 0 && (
              <div className="mt-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Search Results</h2>
                <div className="space-y-4">
                  {searchResults.map((result, index) => (
                    <div key={index} className="border-b pb-4">
                      <h3 className="text-lg font-semibold">{result.full_name}</h3>
                      <p className="text-gray-600">{result.email}</p>
                      <p className="text-gray-600">{result.phone_number}</p>
                      <p className="text-gray-600">{result.address}</p>
                      <p className="text-gray-600">Experience: {result.experienceperiod} years</p>
                      <p className="text-gray-600">Skills: {result.skills}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
      <Footer />


      <ToastContainer/>
    </>
  );
};

export default AdvanceSearch;