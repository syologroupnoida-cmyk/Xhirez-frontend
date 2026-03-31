import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import Navbar from "../../components/header/recruitment-header";
import Footer from "../../components/footer/footer";
import react, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCaretDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthorizationHeader from "../AuthorizationHeader";

const Jobpost = (prop) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => ({
    value: currentYear - i,
    label: `${currentYear - i}`,
  }));

  const authData = sessionStorage.getItem("authToken");
  const user = authData ? JSON.parse(authData).users : null;
  const email = user ? user.email : "";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: '',
    jobType: "",
    vacancies: "",
    location: "",
    jobDescription: "",
    qualification: [],
    qualificationyear: "",
    industry: "",
    minSalary: "",
    maxSalary: "",
    experiencemin: "",
    experiencemax: "",
    skills: [],
    gender: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Added errors state for validation
  const Cancel = () =>{
    navigate("/Recruitmenthero")
  }

  const initialFormData = {
    companyName: "",
    jobTitle: "",
    jobType: "",
    vacancies: "",
    location: "",
    jobDescription: "",
    qualification: [],
    qualificationyear: "",
    industry: "",
    minSalary: "",
    maxSalary: "",
    experiencemin: "",
    experiencemax: "",
    skills: [],
    gender: "",
  };

  // Validation function
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.companyName || formData.companyName.length < 2) {
        newErrors.companyName = "Company Name is required and must be at least 2 characters.";
      }
      if (!formData.jobType) {
        newErrors.jobType = "Job Type is required.";
      }
      if (!formData.jobTitle || formData.jobTitle.length < 2) {
        newErrors.jobTitle = "Job Title is required and must be at least 2 characters.";
      }
      if (!formData.vacancies || isNaN(formData.vacancies) || Number(formData.vacancies) <= 0) {
        newErrors.vacancies = "Vacancies must be a number greater than zero.";
      }
      if (!formData.gender) {
        newErrors.gender = "Gender is required.";
      }
      if (!formData.location || formData.location.length < 2) {
        newErrors.location = "Location is required and must be at least 2 characters.";
      }
    } else if (step === 2) {
      if (!formData.qualification || formData.qualification.length === 0) {
        newErrors.qualification = "At least one qualification is required.";
      }
      if (!formData.qualificationyear) {
        newErrors.qualificationyear = "Graduation Year is required.";
      }
      if (!formData.industry || formData.industry.length < 2) {
        newErrors.industry = "Industry is required and must be at least 2 characters.";
      }
    } else if (step === 3) {
      if (!formData.experiencemin || isNaN(formData.experiencemin) || formData.experiencemin < 0) {
        newErrors.experiencemin = "Minimum Experience must be a non-negative number.";
      }
      if (!formData.experiencemax || isNaN(formData.experiencemax) || formData.experiencemax < 0) {
        newErrors.experiencemax = "Maximum Experience must be a non-negative number.";
      }
      if (
        formData.experiencemin &&
        formData.experiencemax &&
        parseFloat(formData.experiencemax) < parseFloat(formData.experiencemin)
      ) {
        newErrors.experiencemax = "Maximum Experience must be greater than or equal to Minimum Experience.";
      }
      if (!formData.minSalary || isNaN(formData.minSalary) || formData.minSalary <= 0) {
        newErrors.minSalary = "Minimum Salary must be a positive number.";
      }
      if (!formData.maxSalary || isNaN(formData.maxSalary) || formData.maxSalary <= 0) {
        newErrors.maxSalary = "Maximum Salary must be a positive number.";
      }
      if (
        formData.minSalary &&
        formData.maxSalary &&
        parseFloat(formData.maxSalary) < parseFloat(formData.minSalary)
      ) {
        newErrors.maxSalary = "Maximum Salary must be greater than or equal to Minimum Salary.";
      }
      if (!formData.skills || formData.skills.length === 0) {
        newErrors.skills = "At least one skill is required.";
      }
      if (!formData.jobDescription || formData.jobDescription.length < 10) {
        newErrors.jobDescription = "Job Description is required and must be at least 10 characters.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    setErrors({}); // Clear errors when going back
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setLoading(true);
      const jobData = {
        companyName: formData.companyName,
        jobTitle: formData.jobTitle,
        numberOfOpening: formData.vacancies,
        jobType: formData.jobType,
        location: formData.location,
        gender: formData.gender,
        qualification: formData.qualification,
        graduationYear: formData.qualificationyear,
        industry: formData.industry,
        minimumSalary: formData.minSalary,
        maximumSalary: formData.maxSalary,
        minexperience: formData.experiencemin,
        maxexperience: formData.experiencemax,
        skills: formData.skills,
        description: formData.jobDescription,
        email: email,
      };

      try {
        const response = await AuthorizationHeader.post(API_ENDPOINTS.JOBPOSTING, jobData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200 || response.status === 201) {
          toast.success("Job posted successfully!");
          setFormData(initialFormData);

          navigate("/postedjob");
        } else {
          toast.error("Failed to post job. Please try again.");
        }
      } catch (error) {
        console.error("Error posting job:", error);
        toast.error("An error occurred while posting the job.");
      } finally {
        setLoading(false);
      }
    }
  };

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, location: value }));
    setErrors((prev) => ({ ...prev, location: "" })); // Clear location error

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
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        })
        .finally(() => setLoadingLocation(false));
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleLocationSuggestionClick = (suggestion) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      location: suggestion
    }));
    setLocationSuggestions([]);
    setErrors((prev) => ({ ...prev, location: "" })); // Clear location error
  };

  const steps = ["Job & Company Details", "Qualifications & Industry", "Salary & Experience"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // If the field should contain only numbers
    if (["vacancies", "qualificationyear", "experiencemax", "experiencemin", "minSalary", "maxSalary"].includes(name)) {
      if (/\D/.test(value)) {
        alert("Only numbers are allowed in this field!");
      }
      updatedValue = value.replace(/\D/g, "");
    }
    // Fix for jobDescription (Now allows special characters)
    else if (["companyName", "jobDescription"].includes(name)) {
      if (/[^A-Za-z\s.,!?]/.test(value)) {
        alert("Only letters, spaces, and punctuation are allowed!");
      }
      updatedValue = value
        .replace(/[^A-Za-z\s.,!?]/g, "")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field
  };

  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [qualificationOptions, setQualificationOptions] = useState([]);

  // Job Titles API Call
  useEffect(() => {
    AuthorizationHeader.get(API_ENDPOINTS.FETCH_JOB_TITLES(""))
      .then((res) => {
        setJobs(res.data.data);
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  // Job Title Suggestions
  const handleJobChange = (e) => {
    const searchText = e.target.value;
    setQuery(searchText);
    setFormData(prevState => ({
      ...prevState,
      jobTitle: searchText,
    }));
    setErrors((prev) => ({ ...prev, jobTitle: "" })); // Clear jobTitle error

    if (searchText.length > 0) {
      const filteredJobs = jobs
        .filter((job) =>
          job?.JobTitle?.toLowerCase().includes(searchText.toLowerCase())
        )
        .slice(0, 10);
      setSuggestions(filteredJobs);
    } else {
      setSuggestions([]);
    }
  };

  // Select Job Title
  const handleJobSelect = (title) => {
    setQuery(title);
    setFormData(prevState => ({
      ...prevState,
      jobTitle: title,
    }));
    setSuggestions([]);
    setErrors((prev) => ({ ...prev, jobTitle: "" })); // Clear jobTitle error
  };

  const fetchQualifications = async () => {
    try {
      // Replace with your actual API call
      const response = await fetch("YOUR_API_URL");
      const data = await response.json();
      setQualificationOptions(data.map((q) => q.qualification_name));
    } catch (error) {
      console.error("Error fetching qualifications:", error);
    }
  };

  const [qualiquery, setQualiQuery] = useState("");
  const [qualification, setQualification] = useState([]);
  const [qualisuggestion, setQualiSuggestion] = useState([]);

  useEffect(() => {
    AuthorizationHeader.get(API_ENDPOINTS.FETCH_QUALIFICATIONS)
      .then((res) => {
        setQualification(res.data.data.map((q) => q.qualification_name));
      })
      .catch((err) => console.error("Error fetching qualifications:", err));
  }, []);

  const [industryQuery, setIndustryQuery] = useState("");
  const [industries, setIndustries] = useState([]);
  const [industrySuggestions, setIndustrySuggestions] = useState([]);

  // Industry API Call
  useEffect(() => {
    AuthorizationHeader.get(API_ENDPOINTS.FETCH_INDUSTRIES)
      .then((res) => {
        setIndustries(res.data.data);
      })
      .catch((err) => console.error("Error fetching industries:", err));
  }, []);

  // Industry Suggestions
  const handleIndustryChange = (e) => {
    const searchText = e.target.value;
    setIndustryQuery(searchText);
    setFormData((prevState) => ({
      ...prevState,
      industry: searchText,
    }));
    setErrors((prev) => ({ ...prev, industry: "" })); // Clear industry error

    if (searchText.length > 0) {
      const filteredIndustries = industries
        .filter((industryObj) =>
          industryObj.industry &&
          industryObj.industry.toLowerCase().includes(searchText.toLowerCase())
        )
        .slice(0, 10);
      setIndustrySuggestions(filteredIndustries);
    } else {
      setIndustrySuggestions([]);
    }
  };

  // Select Industry
  const handleIndustrySelect = (title) => {
    setIndustryQuery(title);
    setFormData((prevState) => ({
      ...prevState,
      industry: title,
    }));
    setIndustrySuggestions([]);
    setErrors((prev) => ({ ...prev, industry: "" })); // Clear industry error
  };

  const [skillsOptions, setSkillsOptions] = useState([]);

  useEffect(() => {
    axios.get(API_ENDPOINTS.FETCH_SKILLS)
      .then((res) => {
        const fetchedSkills = res.data.data.map((item) => item.Skills.trim());
        const trimmedSkills = fetchedSkills.map((skill) =>
          skill.replace(/\s*Jobs\s*$/gi, "").trim()
        );
        setSkillsOptions(trimmedSkills);
      })
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  const handleMultiselectChange = (selectedList, fieldName) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: selectedList,
    }));
    setErrors((prev) => ({ ...prev, [fieldName]: "" })); // Clear multiselect error
  };

  return (
    <>
      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backdropFilter: "blur(3px)",
            background: "rgba(255, 255, 255, 0.1)",
            zIndex: 3,
          }}
        >
          <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
        </div>
      )}
      
      <Navbar />
      <div className="bg-gray-50 ">
        <Container className="py-4">
          <div className="jobpoatmain ">
            <div className=" w-full sm:!w-1/2 mx-auto relative">
              <form className="p-3" onSubmit={handleSubmit}>
                {/* Pagination Steps */}
                <div className="flex sm:!rotate-90 justify-left items-center mb-5 absolute left-2 sm:!left-[-73%] top-10 sm:top-1/4 h-[200px]">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-10 text-center sm:rotate-[-90deg] h-12 flex items-center justify-center">Step</div>
                      <div
                        className={`w-12 h-12 flex sm:rotate-[-90deg] items-center justify-center rounded-full text-white font-bold 
                        ${currentStep === index + 1 ? "bg-[#05A3E5]" : "bg-gray-300"}`}
                      >
                        {index + 1}
                      </div>
                      {index !== steps.length - 1 && <div className="w-10 h-[3px] bg-gray-400"></div>}
                    </div>
                  ))}
                </div>

                {currentStep === 1 && (
                  <div>
                    <div className="relative mb-5 pb-20 sm:pb-5 border-b overflow-hidden">
                      <img src="assets/images/jobpost/company-detail.jpg" className="rounded-2xl" width={'100%'} alt="" />
                      <h3 className="absolute  top-5 sm:!top-14 w-1/2 sm:!w-1/2 left-7 text-black font-semibold capitalize text-sm sm:!text-2xl">
                        Enter job and company details
                      </h3>
                    </div>
                    <div className="sm:flex block sm:space-x-4 mb-0 mt-3">
                      <div className="sm:flex-1 mt-8 sm:mt-0">
                        <label htmlFor="companyName" className="block text-sm pl-[2px] font-semibold text-gray-700">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          className={`mt-1 py-[8px] px-[8px] w-full bg-white border rounded-md ${errors.companyName ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Company Name"
                        />
                        {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                      </div>
                      <div className="sm:flex-1 mt-8 sm:mt-0">
                        <label htmlFor="jobType" className="block text-sm pl-[2px] font-semibold text-gray-700">
                          Job Type
                        </label>
                        <select
                          id="jobType"
                          name="jobType"
                          value={formData.jobType}
                          onChange={handleChange}
                          className={`mt-1 py-[10px] px-[8px] w-full bg-white border rounded-md ${errors.jobType ? "border-red-500" : "border-gray-300"}`}
                        >
                          <option value="" disabled>Select</option>
                          <option value="full-time">Full-Time</option>
                          <option value="part-time">Part-Time</option>
                          <option value="freelance">Freelance</option>
                          <option value="internship">Internship</option>
                          <option value="contract">Contract</option>
                          <option value="temporary">Temporary</option>
                          <option value="remote">Remote</option>
                          <option value="walk-in">Walk-In</option>
                          <option value="work-from-home">Work From Home</option>
                        </select>
                        {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>}
                      </div>
                    </div>
                    <div className="mt-6 mb-4 relative">
                      <label htmlFor="jobTitle" className="block text-sm pl-[2px] font-semibold text-gray-700">
                        Job Title
                      </label>
                      <input
                        type="text"
                        className={`w-full p-2 border rounded ${errors.jobTitle ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Search job title..."
                        value={query}
                        onChange={handleJobChange}
                      />
                      {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
                      {suggestions.length > 0 && (
                        <ul
                          className="border border-gray-300 mt-1 rounded shadow-lg bg-white max-h-40 overflow-y-auto"
                          style={{
                            scrollbarWidth: "thin",
                            scrollbarColor: "#888 #f1f1f1",
                          }}
                        >
                          {suggestions.map((job, index) => {
                            const trimmedJobTitle =
                              job.JobTitle?.replace(/\s*Jobs\s*$/gi, "").trim() || "Unknown Title";
                            return (
                              <li
                                key={index}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleJobSelect(trimmedJobTitle)}
                              >
                                {trimmedJobTitle}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                    <div className="sm:flex block mb-6 mt-0">
                      <div className="sm:flex-1 mt-8 mr-2 sm:mt-0">
                        <label htmlFor="vacancies" className="block text-sm pl-[2px] font-semibold text-gray-700">
                          Vacancies
                        </label>
                        <input
                          type="tel"
                          id="vacancies"
                          name="vacancies"
                          value={formData.vacancies}
                          onChange={handleChange}
                          className={`mt-1 py-[8px] px-[8px] w-full bg-white border rounded-md ${errors.vacancies ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Vacancies"
                        />
                        {errors.vacancies && <p className="text-red-500 text-sm mt-1">{errors.vacancies}</p>}
                      </div>
                      <div className="sm:flex-1 mt-8 ml-2 sm:mt-0">
                        <label htmlFor="gender" className="block text-sm pl-[2px] font-semibold text-gray-700">
                          Select Gender
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className={`mt-1 py-[10px] px-[8px] w-full bg-white border rounded-md ${errors.gender ? "border-red-500" : "border-gray-300"}`}
                        >
                          <option value="" disabled>Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="anyone">Anyone Can Apply</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                      </div>
                    </div>
                    <div className="sm:flex-1 mt-8 sm:mt-0 relative">
                      <label htmlFor="location" className="block text-sm pl-[2px] font-semibold text-gray-700">
                        Location
                      </label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={formData.location}
                          placeholder="Location"
                          onChange={handleLocationChange}
                          className={`mt-1 py-[8px] px-[8px] w-full bg-white border rounded-md ${errors.location ? "border-red-500" : "border-gray-300"}`}
                        />
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          className="absolute right-2 text-gray-500 cursor-pointer"
                        />
                      </div>
                      {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                      {loadingLocation && <div className="absolute text-sm text-gray-500">Loading locations...</div>}
                      {locationSuggestions.length > 0 && (
                        <ul
                          style={{
                            position: "absolute",
                            background: "white",
                            border: "1px solid #ddd",
                            listStyle: "none",
                            padding: "0",
                            margin: "0",
                            maxHeight: "150px",
                            overflowY: "auto",
                            width: "100%",
                            zIndex: "1",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#888 #f1f1f1",
                          }}
                        >
                          {locationSuggestions.map((city, index) => (
                            <li
                              key={index}
                              onClick={() => handleLocationSuggestionClick(city)}
                              style={{
                                padding: "10px",
                                cursor: "pointer",
                                fontSize: "14px",
                              }}
                            >
                              {city}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  <div className="flex justify-between gap-2 mt-7 w-full">
  {/* Left side - Cancel Button */}
  <div>
    <button
      onClick={Cancel}
      className="px-8 py-2 bg-[#05A3E5] text-white font-semibold rounded-md hover:bg-[#000000]"
    >
      ❌ Cancel
    </button>
  </div>

  {/* Right side - Next Button */}
  <div>
    <button
      type="button"
      onClick={nextStep}
      className="px-8 py-2 bg-[#05A3E5] text-white font-semibold rounded-md hover:bg-[#000000]"
    >
      Next <FontAwesomeIcon className="pl-2" icon={faArrowRight} />
    </button>
  </div>
</div>

                    
                  </div>
                )}
                {currentStep === 2 && (
                  <div>
                    <div className="relative mb-5 pb-20 sm:pb-5 border-b overflow-hidden">
                      <img src="assets/images/jobpost/step2.jpg" className="rounded-2xl" width={'100%'} alt="" />
                      <h3 className="absolute  top-5 sm:!top-14 w-1/2 sm:!w-1/2 left-7 text-black font-semibold capitalize text-sm sm:!text-2xl">
                        Add qualifications and industry info
                      </h3>
                    </div>
                    <div className="mt-8">
                      <label htmlFor="qualification" className="block text-sm pl-[2px] font-semibold text-gray-700">
                        Qualification
                      </label>
                      <Multiselect
                         className={`mt-1 w-full sm:w-3/4 lg:w-1/2 max-w-[600px] bg-white min-h-[45px] border rounded-md focus:outline-none ${errors.qualification ? "border-red-500" : "border-gray-300"}`}
 options={qualification}
                        selectedValues={formData.qualification}
                        onSelect={(selectedList) => handleMultiselectChange(selectedList, "qualification")}
                        onRemove={(selectedList) => handleMultiselectChange(selectedList, "qualification")}
                        displayValue="name"
                        placeholder="Select qualifications"
                        isObject={false}
                      />
                      {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
                    </div>
                    <div className="mt-8">
                      <label htmlFor="qualificationyear" className="block text-sm pl-[2px] font-semibold text-gray-700">
                        Graduation Year
                      </label>
                      <Select
                        options={years}
                        value={years.find((option) => option.value === parseInt(formData.qualificationyear))}
                        onChange={(selectedOption) =>
                          setFormData((prev) => ({
                            ...prev,
                            qualificationyear: selectedOption.value,
                          }))
                        }
                        placeholder="Select Graduation Year"
                        className={`mt-1 w-full sm:w-3/4 lg:w-full max-w-[600px] ${errors.qualificationyear ? "border-red-500" : ""}`}
                      />
                      {errors.qualificationyear && <p className="text-red-500 text-sm mt-1">{errors.qualificationyear}</p>}
                    </div>
                    <div className="mt-8">
                      <label htmlFor="industry" className="block text-sm pl-[2px] font-semibold text-gray-700">
                        Industry
                      </label>
                      <input
                        type="text"
                        className={`w-full p-2 border rounded ${errors.industry ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Search industry..."
                        value={industryQuery}
                        onChange={handleIndustryChange}
                      />
                      {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                      {industrySuggestions.length > 0 && (
                        <ul className="border border-gray-300 mt-1 rounded shadow-lg bg-white max-h-40 overflow-y-auto">
                          {industrySuggestions.map((industryObj, index) => {
                            const trimmedIndustryName =
                              industryObj.industry?.replace(/\s*Jobs\s*$/gi, "").trim() || "Unknown Industry";
                            return (
                              <li
                                key={index}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleIndustrySelect(trimmedIndustryName)}
                              >
                                {trimmedIndustryName}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                   <div className="flex justify-between gap-2 items-center my-5">
                    <div className="flex space-x-2">
                    {/* Left - Back */}
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>

                      <button
                        onClick={Cancel}
                        className="bg-blue-500 text-white px-6 py-2 rounded font-semibold hover:bg-blue-600"
                      >
                        ❌ Cancel
                      </button>
                    </div>
  

  {/* Right - Next */}
  <button
    type="button"
    onClick={nextStep}
    className="px-8 py-2 bg-[#05A3E5] text-white font-semibold rounded-md hover:bg-[#000000]"
  >
    Next <FontAwesomeIcon icon={faArrowRight} />
  </button>
</div>

                  </div>
                )}
                {currentStep === 3 && (
                  <div>
                    <div className="relative mb-5 pb-20 sm:pb-5 border-b overflow-hidden">
                      <img src="assets/images/jobpost/step3.jpg" className="rounded-2xl" width={'100%'} alt="" />
                       <h3 className="absolute  top-5 sm:!top-14 w-1/2 sm:!w-1/2 left-7 text-black font-semibold capitalize text-sm sm:!text-2xl">
                        Set salary, experience, and skills.
                      </h3>
                    </div>
                    <div className="sm:flex block sm:space-x-4 mb-6 mt-7">
                      <div className="sm:flex-1 mt-8 sm:mt-0">
                        <label htmlFor="experiencemin" className="block text-sm pl-[2px] font-semibold text-gray-700">
                          Min Experience (in years)
                        </label>
                        <input
                          type="text"
                          id="experiencemin"
                          name="experiencemin"
                          value={formData.experiencemin}
                          onChange={handleChange}
                          className={`mt-1 py-[10px] px-[8px] w-full bg-white border rounded-md ${errors.experiencemin ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Min. Experience"
                        />
                        {errors.experiencemin && <p className="text-red-500 text-sm mt-1">{errors.experiencemin}</p>}
                      </div>
                      <div className="sm:flex-1 mt-8 sm:mt-0">
                        <label htmlFor="experiencemax" className="block text-sm pl-[2px] font-semibold text-gray-700">
                          Max Experience (in years)
                        </label>
                        <input
                          type="text"
                          id="experiencemax"
                          name="experiencemax"
                          value={formData.experiencemax}
                          onChange={handleChange}
                          className={`mt-1 py-[10px] px-[8px] w-full bg-white border rounded-md ${errors.experiencemax ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Max. Experience"
                        />
                        {errors.experiencemax && <p className="text-red-500 text-sm mt-1">{errors.experiencemax}</p>}
                      </div>
                    </div>
                    <div className="sm:flex block sm:space-x-4 mb-6 mt-6">
                      <div className="sm:flex-1 mt-8 sm:mt-0">
                        <label htmlFor="minSalary" className="block text-sm pl-[2px] font-semibold text-gray-700">
                          Minimum Salary (in ₹)
                        </label>
                        <input
                          type="tel"
                          id="minSalary"
                          name="minSalary"
                          value={formData.minSalary}
                          onChange={handleChange}
                          className={`mt-1 py-[10px] px-[8px] w-full bg-white border rounded-md ${errors.minSalary ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Min. Salary"
                        />
                        {errors.minSalary && <p className="text-red-500 text-sm mt-1">{errors.minSalary}</p>}
                      </div>
                      <div className="sm:flex-1 mt-8 sm:mt-0">
                        <label htmlFor="maxSalary" className="block text-sm pl-[2px] font-semibold text-gray-700">
                          Maximum Salary (in ₹)
                        </label>
                        <input
                          type="tel"
                          id="maxSalary"
                          name="maxSalary"
                          value={formData.maxSalary}
                          onChange={handleChange}
                          className={`mt-1 py-[10px] px-[8px] w-full bg-white border rounded-md ${errors.maxSalary ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Max. Salary"
                        />
                        {errors.maxSalary && <p className="text-red-500 text-sm mt-1">{errors.maxSalary}</p>}
                      </div>
                    </div>
                    <div className="sm:flex block sm:space-x-4 mb-6 mt-6">
                      <div className="sm:flex-1 mt-8 sm:mt-0">
                        <label htmlFor="skills" className="block text-sm pl-[2px] font-semibold text-gray-700">
                          Required Skills
                        </label>
                        <Multiselect
                          className={`mt-1 w-full sm:w-3/4 lg:w-1/2 max-w-[600px] bg-white min-h-[45px] border rounded-md focus:ring-2 focus:ring-blue-400 ${errors.skills ? "border-red-500" : "border-gray-300"}`}
                          options={skillsOptions}
                          selectedValues={formData.skills}
                          onSelect={(selectedList) => handleMultiselectChange(selectedList, "skills")}
                          onRemove={(selectedList) => handleMultiselectChange(selectedList, "skills")}
                          displayValue="name"
                          placeholder="Select skills"
                          isObject={false}
                        />
                        {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
                      </div>
                    </div>
                    <div className="sm:flex block sm:space-x-4 mb-20 mt-6">
                      <div className="sm:flex-1">
                        <label className="block text-gray-700 font-bold mb-2">Job Description*</label>
                        <textarea
                          name="jobDescription"
                          value={formData.jobDescription || ""}
                          onChange={handleChange}
                          className={`mt-1 w-full p-2 border rounded-md ${errors.jobDescription ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Job Description"
                          rows="4"
                        />
                        {errors.jobDescription && <p className="text-red-500 text-sm mt-1">{errors.jobDescription}</p>}
                      </div>
                    </div>
                   <div className="flex justify-between gap-2 items-center mt-4">
                    {/* Left Group - Back + Cancel */}
                    <div className="flex  space-x-2">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                      </button>

                      <button
                        type="button"
                        onClick={Cancel}
                        className="bg-blue-500 text-white px-6 py-2 rounded font-semibold hover:bg-blue-600"
                      >
                        ❌ Cancel
                      </button>
                    </div>

                      {/* Right - Post Job */}
                      <button
                        type="submit"
                        className="px-8 py-2 bg-[#05A3E5] text-white font-semibold rounded-md hover:bg-[#000000]"
                      >
                        Post Job
                      </button>
                    </div>

                  </div>
                )}
              </form>
            </div>
          </div>
          <ToastContainer />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Jobpost;