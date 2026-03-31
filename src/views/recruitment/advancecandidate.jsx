import React ,{useState} from 'react';
import Select from 'react-select'
import Multiselect from 'multiselect-react-dropdown';
import Navbar from '../../components/header/recruitment-header';
import Footer from '../../components/footer/footer';
import { Container, Row, Col, Form, Button,Tabs,Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaUserTie, FaCog,FaChevronDown, FaChevronUp, FaClock, FaBullseye } from 'react-icons/fa';


const AdvanceSearch = () =>{
  const [selectedTime, setSelectedTime] = useState("");

  const handleSelect = (selectedList) => {
    console.log(selectedList); // Handle the selected options here
  };
  const handleRemove = (selectedList) => {
    setSelectedValues(selectedList);
  };

    const [minAge, setMinAge] = useState('');
    const [includeNoAge, setIncludeNoAge] = useState(false);  // Define the state for the checkbox
  
  
    const handleIncludeNoAgeChange = () => {
      setIncludeNoAge((prevState) => !prevState); // Toggle the state when checkbox is clicked
    };
  const [maxAge, setMaxAge] = useState('');

  const handleMinAgeChange = (e) => {
    setMinAge(e.target.value);
  };

  const handleMaxAgeChange = (e) => {
    setMaxAge(e.target.value);
  };
     // State for controlling the Boolean search toggle and checkboxes
  const [isBooleanSearch, setIsBooleanSearch] = useState(false);
  const [isZeroSalaryChecked, setIsZeroSalaryChecked] = useState(false);
  const [excludeKeywordsOpen, setExcludeKeywordsOpen] = useState(false);
  const [isITSkillsChecked, setIsITSkillsChecked] = useState(false);
  const [skills, setSkills] = useState([{ skill: "", experience: "" }]);
  // State to handle visibility of each section
  const [showEmployment, setShowEmployment] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState(false); // Filter for verified email
  const [verifiedMobile, setVerifiedMobile] = useState(false); // Filter for verified mobile number
  const [similarSkills, setSimilarSkills] = useState(false); // Filter for similar skills
  const [hideProfilesWithoutResume, setHideProfilesWithoutResume] = useState(false); // Filter for profiles without resume

  
  const handleVerifiedEmailChange = () => {
    setVerifiedEmail((prevState) => !prevState);
  };

  const handleVerifiedMobileChange = () => {
    setVerifiedMobile((prevState) => !prevState);
  };

  const handleSimilarSkillsChange = () => {
    setSimilarSkills((prevState) => !prevState);
  };

  const handleHideProfilesWithoutResumeChange = () => {
    setHideProfilesWithoutResume((prevState) => !prevState);
  };
  // State for the checkboxes
  const [isPreviousDesignationsChecked, setIsPreviousDesignationsChecked] = useState(false);


  // Toggle function for each section
  const toggleSection = (section) => {
    if (section === "employment") setShowEmployment(!showEmployment);
    if (section === "education") setShowEducation(!showEducation);
    if (section === "additional") setShowAdditional(!showAdditional);
  };



  // Toggle Boolean search state
  const handleSearchTypeToggle = () => {
    setIsBooleanSearch(!isBooleanSearch);
  };
  const [selectedGenders, setSelectedGenders] = useState([]);  // State for selected genders

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setSelectedGenders((prevSelectedGenders) =>
      prevSelectedGenders.includes(value)
        ? prevSelectedGenders.filter((gender) => gender !== value)  // Remove if already selected
        : [...prevSelectedGenders, value]  // Add if not selected
    );
  };


  const [selectedValues, setSelectedValues] = useState([]);

  // Options based on isBooleanSearch condition
  const options = isBooleanSearch
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
return(
<>
<Navbar/>
<section>
    <Container>
    <div class="w-full max-w-4xl mx-auto p-6 bg-gray-100 shadow-orange-50 border border-gray-300 rounded-md">
    {/* Search Type Toggle */}
    <ul className=" bg-white rounded-xl flex  mb-6  p-2 justify-end">
        <li className="flex items-center">
          <div className="flex justify-end">
            <span className="font-medium text-gray-700">Boolean Search</span>
            <label className="ml-1 flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="toggleSearchType"
                className="hidden"
                checked={isBooleanSearch}
                onChange={handleSearchTypeToggle}
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

        {/* Search Keyword Dropdown */}
        <li className="ml-3 flex flex-col mb-0">
         
          <div className="relative flex">
          <label htmlFor="id_searchin" className="text-sm  font-medium text-gray-700 pt-[6px] pr-2">
            Search keyword in
          </label>
            <select
              name="searchin"
              id="id_searchin"
              className="block w-3/5 px-2 py-1 bg-white border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1">Full Profile</option>
              <option value="2">Profile Title </option>
              <option value="3">Key Skills</option>
              <option value="4">Profile Title</option>
            </select>
          </div>
        </li>
      </ul>

      <div className="max-w-4xl bg-white rounded-3xl mx-auto py-9 px-4">
      <form>
  <div className="mb-1">
    <div className="relative">
    <Multiselect
      className="block peer w-full px-3 py-[7px] bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
        options={options}
        selectedValues={selectedValues}
        onSelect={handleSelect}
        onRemove={handleRemove}
        displayValue="name"
        placeholder="Select options"
        id="searchin"
        showArrow={true}
      />
    
      <label
        htmlFor="searchin"
        className="absolute left-0 top-[-12px]  bg-white font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
      >
        {isBooleanSearch ? "Boolean Search" : "keywords"}
      </label>
    </div>
  </div>

  
  {/* All of these keywords */}
  <div className="mb-2 mt-5">
    <div className="relative">
    <Multiselect
        className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none"
        options={options2}
        selectedValues={selectedValues}
        onSelect={handleSelect}
        onRemove={handleRemove}
        displayValue="name"
        placeholder="Select options"
        id="searchin"
        showArrow={true}
      />
      <label
        htmlFor="keywords"
        className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
      >
        All of these keywords
      </label>
    </div>
  </div>

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
      <div className="mb-4 mt-2 relative bg-gray-50 p-4 ">
        <input
          type="text"
          name="excludeKeywords"
          className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 shadow-none focus:outline-none focus:none"
          placeholder="Type keywords to Exclude"
        />
       
      </div>
    )}
  </div>

  {/* Current Location */}
  <div className="mb-9 mt-3">
    <div className="relative">
      <select
        name="currentLocation"
        className="block peer w-full px-3 py-3 bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
      >
        <option value="1" disabled selected hidden>
        </option>
        <option value="2">New York</option>
        <option value="3">Los Angeles</option>
        <option value="4">Chicago</option>
      </select>
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
        type="text"
        name="minSalary"
        className="block w-full px-3 py-2 mt-4 bg-white border border-gray-300 rounded-lg "
      />
        <label className="absolute left-0 top-[-12px] font-semibold mb-2 bg-white transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
          Min Salary
        </label>
        <input
          type="checkbox"
          id="includeZeroSalary"
          checked={isZeroSalaryChecked}
          onChange={() => setIsZeroSalaryChecked(!isZeroSalaryChecked)}
          className="h-3 w-5 text-blue-500 focus:ring-0 mr-0"
        />
        <label htmlFor="includeZeroSalary" className="text-sm text-gray-300">
          Also include candidates with zero salary
        </label>
      </div>
    </div>

    <div className="w-full sm:w-1/2">
      <div className="relative">
      <input
        type="text"
        name="maxSalary"
        className="block w-full px-3 py-2 mt-4 bg-white border border-gray-300 rounded-lg  "
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
        >
       
          <option value="" disabled selected hidden>Select Experience</option>
<option value="fresher">Fresher</option>
<option value="less_than_1_year">Less than 1 Year</option>
<option value="1_year">1+ Years</option>
<option value="2_years">2+ Years</option>
<option value="3_years">3+ Years</option>
<option value="4_years">4+ Years</option>
<option value="5_years">5+ Years</option>
<option value="6_years">6+ Years</option>
<option value="7_years">7+ Years</option>
<option value="8_years">8+ Years</option>
<option value="9_years">9+ Years</option>
<option value="10_years">10+ Years</option>
<option value="more_than_10_years">More than 10 Years</option>

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
        >  <option value="" disabled selected hidden>Select Experience</option>
          <option value="1_plus">1+ Years</option>
    <option value="2_plus">2+ Years</option>
    <option value="3_plus">3+ Years</option>
    <option value="4_plus">4+ Years</option>
    <option value="5_plus">5+ Years</option>
    <option value="6_plus">6+ Years</option>
    <option value="7_plus">7+ Years</option>
    <option value="8_plus">8+ Years</option>
    <option value="9_plus">9+ Years</option>
    <option value="10_plus">10+ Years</option>
    <option value="11_plus">11+ Years</option>
    <option value="12_plus">12+ Years</option>
    <option value="13_plus">13+ Years</option>
    <option value="14_plus">14+ Years</option>
    <option value="15_plus">15+ Years</option>
    <option value="16_plus">16+ Years</option>
    <option value="17_plus">17+ Years</option>
    <option value="18_plus">18+ Years</option>
    <option value="19_plus">19+ Years</option>
    <option value="20_plus">20+ Years</option>
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
      >
       
    <option value="" disabled selected hidden>Select Notice Period</option>
    <option value="immediate">Immediate Joiner</option>
    <option value="1_week">1 Week</option>
    <option value="2_weeks">2 Weeks</option>
    <option value="3_weeks">3 Weeks</option>
    <option value="1_month">1 Month</option>
    <option value="1_3_months">1-3 Months</option>
    <option value="3_6_months">3-6 Months</option>
    <option value="6_plus_months">More than 6 Months</option>
    <option value="negotiable">Negotiable</option>
      </select>
      <label
        htmlFor="noticePeriod"
        className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:scale-75"
      >
        Notice Period
      </label>
    </div>
  </div>
</form>

    </div>
  
      {/* Employment Details Tab */}
      <div className="bg-white rounded-xl border-none py-3 px-6 mt-6">
        <div className="flex justify-between items-center bg-white">
          <h2 className="text-lg font-medium">Employment Details</h2>
          <button
            onClick={() => toggleSection("employment")}
            className="text-blue-500 hover:text-blue-700"
          >
            {showEmployment ? "Hide" : "Show"}
          </button>
        </div>
        {/* Employment Content */}
        <div
          className={`pl-0 border-t transform transition-all duration-300 ${
            showEmployment ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          
          <div className="bg-white  mt-2">
             
  <div className="relative mt-5  ">
    <select
      name="designation"
      className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
    >
      <option value="1"></option>
      <option value="2">Software Engineer</option>
      <option value="3">Product Manager</option>
      <option value="4">Data Scientist</option>
    </select>
    <label
      htmlFor="designation"
      className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
    >
      Search by Designation
    </label>
  </div>

  {/* Include Previous Designations */}
  <div className="flex items-center mb-5 space-x-2">
    <input
      type="checkbox"
      id="includePreviousDesignations"
      checked={isPreviousDesignationsChecked}
      onChange={() => setIsPreviousDesignationsChecked(!isPreviousDesignationsChecked)}
      className="mr-0 mt-1 w-3 h-3"
    />
    <label htmlFor="includePreviousDesignations" className="text-sm text-gray-700">
      Include Previous Designations
    </label>
  </div>

  {/* Current Industry */}
  <div className="relative mt-8 mb-5">
    <select
      name="currentIndustry"
      className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
    >
      <option value="1"></option>
      <option value="2">Technology</option>
      <option value="3">Finance</option>
      <option value="4">Healthcare</option>
    </select>
    <label
      htmlFor="currentIndustry"
      className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
    >
      Current Industry
    </label>
  </div>

  
  {/* Current Department / Functional Area */}
  <div className="relative mt-8">
    <select name="currentDepartment" className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:none">
      <option value="1"></option>
      <option value="2">Engineering</option>
      <option value="3">Marketing</option>
      <option value="4">HR</option>
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
      </div>

      {/* Education Details Tab */}
      <div className="bg-white rounded-xl py-3 px-6 mt-6">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-lg font-medium">Education Details</h2>
          <button
            onClick={() => toggleSection("education")}
            className="text-blue-500 hover:text-blue-700"
          >
            {showEducation ? "Hide" : "Show"}
          </button>
        </div>
        {/* Education Content */}
        <div
          className={`pl-4 border-t transform transition-all duration-300 ${
            showEducation ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } `}
        >
         <div className="relative mt-8">
  <select name="currentDegree" className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:none">
    <option value="1" disabled></option>
    <option value="2">Bachelor's</option>
    <option value="3">Master's</option>
    <option value="4">PhD</option>
  </select>
  <label
    htmlFor="currentDegree"
    className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
  >
    Current Degree
  </label>
</div>


<div className="relative mt-8">
  <select
    name="institutes"
    className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
   
  >
    <option value="1" disabled></option>
    <option value="2">Institute B</option>
    <option value="3">Institute C</option>
    <option value="4">Institute D</option>
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
        options={options3}
        selectedValues={selectedValues}
        onSelect={handleSelect}
        onRemove={handleRemove}
        displayValue="name"
        id="searchin"
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
      </div>

      {/* Additional Parameters Tab */}
      <div className="bg-white rounded-xl py-3 px-6 mt-6">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-lg font-medium">Additional Parameters</h2>
          <button
            onClick={() => toggleSection("additional")}
            className="text-blue-500 hover:text-blue-700"
          >
            {showAdditional ? "Hide" : "Show"}
          </button>
        </div>
        {/* Additional Content */}
        <div className={`pl-4  border-t transform transition-all duration-300 ${
            showAdditional ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`} >
            

         <div className="relative mt-8 mb-5 ">
  <select
    name="Show"
    className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
   
  >
    <option value="1" disabled></option>
    <option value="2">All Profile</option>
    <option value="3">New Profile</option>
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
    name="Show"
    className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none focus:none"
   
  >
    <option value="1" disabled></option>
    <option value="2">Relevence</option>
    <option value="3">Freshness</option>
    </select>
  <label
    htmlFor="institutes"
    className="absolute left-0 top-[-12px] bg-white font-600 font-semibold mb-2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
  >
    Short By
  </label>
</div>
<div>

<div className="mb-9  mt-7 flex space-x-4">
<div className="w-full sm:w-1/2">
   {/* Min Age Dropdown */}
   <div className="relative mt-8">
   <select
  name="minAge"
  value={minAge}
  onChange={handleMinAgeChange}
  className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none"
>
  <option value="" disabled>Select Min Age</option>
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

{/* New checkbox for including candidates with no age */}
<div className="mt-0">
  <label className="flex items-center text-gray-700">
    <input
      type="checkbox"
      checked={includeNoAge}
      onChange={handleIncludeNoAgeChange}
      className="mr-2"
    />
    <span className="text-sm">Also include candidates with no age</span>
  </label>
</div>

      </div>
</div>
<div className="w-full sm:w-1/2">
  {/* Max Age Dropdown */}
  <div className="relative mt-8">
        <select
          name="maxAge"
          value={maxAge}
          onChange={handleMaxAgeChange}
          className="block peer w-full px-3 py-2 bg-white border rounded-md border-gray-300 focus:outline-none"
        >
          <option value="" disabled>Select Max Age</option>
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

</div>
       {/* Gender Checkbox Group */}
       <div className="mt-4">
        <h3 className="text-gray-700 font-semibold mb-2">Select Gender</h3>
        <div className="flex items-center">
          <label className="flex items-center text-gray-700 mr-4">
            <input
              type="checkbox"
              value="Male"
              checked={selectedGenders.includes('Male')}
              onChange={handleGenderChange}
              className="mr-2"
            />
            Male
          </label>
          <label className="flex items-center text-gray-700 mr-4">
            <input
              type="checkbox"
              value="Female"
              checked={selectedGenders.includes('Female')}
              onChange={handleGenderChange}
              className="mr-2"
            />
            Female
          </label>
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              value="Other"
              checked={selectedGenders.includes('Other')}
              onChange={handleGenderChange}
              className="mr-2"
            />
            Other
          </label>
        </div>
      </div>
{/* Verified Email */}
<div className="mt-4">
        <label className="flex items-center text-gray-700">
          <input
            type="checkbox"
            checked={verifiedEmail}
            onChange={handleVerifiedEmailChange}
            className="mr-2"
          />
          <span className="text-sm">Only candidates with verified email</span>
        </label>
      </div>

      {/* Verified Mobile Number */}
      <div className="mt-4">
        <label className="flex items-center text-gray-700">
          <input
            type="checkbox"
            checked={verifiedMobile}
            onChange={handleVerifiedMobileChange}
            className="mr-2"
          />
          <span className="text-sm">Only candidates with verified mobile number</span>
        </label>
      </div>

      {/* Include Candidates with Similar Skills */}
      <div className="mt-4">
        <label className="flex items-center text-gray-700">
          <input
            type="checkbox"
            checked={similarSkills}
            onChange={handleSimilarSkillsChange}
            className="mr-2"
          />
          <span className="text-sm">Also include candidates with similar skills</span>
        </label>
      </div>

      {/* Hide Profiles Without Resume */}
      <div className="mt-4">
        <label className="flex items-center text-gray-700">
          <input
            type="checkbox"
            checked={hideProfilesWithoutResume}
            onChange={handleHideProfilesWithoutResumeChange}
            className="mr-2"
          />
          <span className="text-sm">Hide profiles without resume</span>
        </label>
      </div>
    
    </div>
        </div>
      </div>
      <div className=" mt-6 flex justify-between items-center">
      {/* Left Dropdown */}
      <select
        className="border-none bg-transparent"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      >
        <option value="" disabled>Relevent By Time</option>
        <option value="1_day">1 Day Ago</option>
        <option value="5_days">5 Days Ago</option>
        <option value="10_days">10 Days Ago</option>
        <option value="1_month">1 Month Ago</option>
        <option value="3_months">3 Months Ago</option>
      </select>

      {/* Right Button */}
      <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
        Submit
      </button>
    </div>
    </div>
    </Container>
</section>

<Footer />

</>
);
    }

    export default AdvanceSearch;