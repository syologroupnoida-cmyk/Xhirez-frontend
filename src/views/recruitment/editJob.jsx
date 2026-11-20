import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import Navbar from "../../components/header/recruitment-header";
import Footer from "../../components/footer/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCaretDown, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "@/router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthorizationHeader from "../AuthorizationHeader";

const initialFormData = {
  companyName: "",
  jobTitle: "",
  jobType: "",
  totalvacancies: "",
  location: "",
  description: "",
  qualification: [],
  qualificationyear: "",
  industry: "",
  minimumSalary: "",
  maximumSalary: "",
  minexperience: "",
  maxexperience: "",
  skills: [],
  email: "",
  gender: "",
};

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const authData = sessionStorage.getItem("authToken");
  const user = authData ? JSON.parse(authData).users : null;
  const email = user ? user.email : "";

  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [qualiquery, setQualiQuery] = useState("");
  const [qualification, setQualification] = useState([]);
  const [qualisuggestion, setQualiSuggestion] = useState([]);
  const [industryQuery, setIndustryQuery] = useState("");
  const [industries, setIndustries] = useState([]);
  const [industrySuggestions, setIndustrySuggestions] = useState([]);
  const [skillsOptions, setSkillsOptions] = useState([]);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleMultiselectChange = (selectedList, selectedItem, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedList,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!formData.companyName || !formData.jobTitle || !formData.totalvacancies) {
      toast.error("Please fill in all required fields (Company Name, Job Title, Vacancies)!");
      setLoading(false);
      return;
    }

    if (formData.minimumSalary && formData.maximumSalary && parseInt(formData.minimumSalary) > parseInt(formData.maximumSalary)) {
      toast.error("Minimum salary cannot be greater than maximum salary!");
      setLoading(false);
      return;
    }

    if (formData.minexperience && formData.maxexperience && parseInt(formData.minexperience) > parseInt(formData.maxexperience)) {
      toast.error("Minimum experience cannot be greater than maximum experience!");
      setLoading(false);
      return;
    }

    const jobData = {
      companyName: formData.companyName,
      jobTitle: formData.jobTitle,
      numberOfOpening: parseInt(formData.totalvacancies, 10) || 0,
      jobType: formData.jobType,
      location: formData.location,
      gender: formData.gender,
      qualification: formData.qualification,
      graduationYear: parseInt(formData.qualificationyear, 10) || 0,
      industry: formData.industry,
      minimumSalary: parseInt(formData.minimumSalary, 10) || 0,
      maximumSalary: parseInt(formData.maximumSalary, 10) || 0,
      minexperience: parseInt(formData.minexperience, 10) || 0,
      maxexperience: parseInt(formData.maxexperience, 10) || 0,
      skills: formData.skills,
      description: formData.description,
      id: parseInt(id, 10),
      email: email,
    };

    try {
      const response = await AuthorizationHeader.post(API_ENDPOINTS.EDITJOBS, jobData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === 200 || response.data.status === 201) {
         toast.success("Job updated successfully!");
          setTimeout(() => {
            setFormData(initialFormData);
            navigate("/postedjob");
          }, 1500);
      } else {
        toast.error("job Update Failed!");
      }
    } catch (error) {
      toast.error("Failed to update job. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, location: value }));

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
    setFormData((prev) => ({ ...prev, location: suggestion }));
    setLocationSuggestions([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (["totalvacancies", "qualificationyear", "maxexperience", "minexperience", "minimumSalary", "maximumSalary"].includes(name)) {
      if (/\D/.test(value)) {
        toast.error("Only numbers are allowed in this field!");
        return;
      }
      updatedValue = value.replace(/\D/g, "");
    } else if (name === "companyName") {
      if (/[^A-Za-z0-9\s.,!?&-]/.test(value)) {
        toast.error("Invalid characters detected in Company Name!");
        return;
      }
      updatedValue = value.replace(/[^A-Za-z0-9\s.,!?&-]/g, "");
    } else if (name === "description") {
      updatedValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleCancel = () =>{
    navigate("/postedjob")
  }

  const handleJobChange = (e) => {
    const searchText = e.target.value;
    setQuery(searchText);
    setFormData((prev) => ({ ...prev, jobTitle: searchText }));

    if (searchText.length > 0) {
      const filteredJobs = jobs
        .filter((job) => job.JobTitle?.toLowerCase().includes(searchText.toLowerCase()))
        .slice(0, 10);
      setSuggestions(filteredJobs);
    } else {
      setSuggestions([]);
    }
  };

  const handleJobSelect = (title) => {
    setQuery(title);
    setFormData((prev) => ({ ...prev, jobTitle: title }));
    setSuggestions([]);
  };

  const handleQualificationChange = (e) => {
    const searchquali = e.target.value;
    setQualiQuery(searchquali);

    if (searchquali.length > 0) {
      const filterqualification = qualification
        .filter((q) => q.toLowerCase().includes(searchquali.toLowerCase()))
        .slice(0, 10);
      setQualiSuggestion(filterqualification);
    } else {
      setQualiSuggestion([]);
    }
  };

  const handleQualificationSelect = (title) => {
    setQualiQuery("");
    setFormData((prev) => ({
      ...prev,
      qualification: prev.qualification.includes(title) ? prev.qualification : [...prev.qualification, title],
    }));
    setQualiSuggestion([]);
  };

  const handleIndustryChange = (e) => {
    const searchText = e.target.value;
    setIndustryQuery(searchText);

    if (searchText.length > 0) {
      const filteredIndustries = industries
        .filter((industryObj) => industryObj.industry?.toLowerCase().includes(searchText.toLowerCase()))
        .slice(0, 10);
      setIndustrySuggestions(filteredIndustries);
    } else {
      setIndustrySuggestions([]);
    }
  };

  const handleIndustrySelect = (title) => {
    setIndustryQuery(title);
    setFormData((prev) => ({ ...prev, industry: title }));
    setIndustrySuggestions([]);
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await AuthorizationHeader.get(API_ENDPOINTS.FETCHJOBSDETAILS(id));
        if (response.data.status === 200 && response.data.data) {
          setFormData({
            ...initialFormData,
            jobTitle: response.data.data.jobtitle || "",
            totalvacancies: response.data.data.totalVacancies || "",
            minexperience: response.data.data.minExperience || "",
            maxexperience: response.data.data.maxExperience || "",
            maximumSalary: response.data.data.MaximumSalary || "",
            // industry: response.data.data.industry || "",
            ...response.data.data,
            qualification: Array.isArray(response.data.data.qualification)
              ? response.data.data.qualification
              : response.data.data.qualification
              ? [response.data.data.qualification]
              : [],
            skills: Array.isArray(response.data.data.skills)
              ? response.data.data.skills
              : response.data.data.skills
              ? [response.data.data.skills]
              : [],
          });

          setIndustryQuery(response.data.data.industry || "");
        } else {
          console.error("Error fetching job:", response.data.statusText);
          toast.error("Failed to fetch job details!");
        }
      } catch (error) {
        toast.error("Failed to fetch job details!");
      }
    };
    fetchJobDetails();
  }, [id]);

  useEffect(() => {
    AuthorizationHeader.get(API_ENDPOINTS.FETCH_JOB_TITLES(""))
      .then((res) => {
        if (res.data?.data) {
          setJobs(res.data.data);
        } else {
          console.error("Invalid job titles response:", res.data);
        }
      })
      .catch((err) => console.error("Error fetching job titles:", err));
  }, []);

  useEffect(() => {
    AuthorizationHeader.get(API_ENDPOINTS.FETCH_QUALIFICATIONS)
      .then((res) => {
        if (res.data?.data) {
          setQualification(res.data.data.map((q) => q.qualification_name || q));
        } else {
          console.error("Invalid qualifications response:", res.data);
        }
      })
      .catch((err) => console.error("Error fetching qualifications:", err));
  }, []);

  useEffect(() => {
    AuthorizationHeader.get(API_ENDPOINTS.FETCH_INDUSTRIES)
      .then((res) => {
        if (res.data?.data) {
          setIndustries(res.data.data);
        } else {
          console.error("Invalid industries response:", res.data);
        }
      })
      .catch((err) => console.error("Error fetching industries:", err));
  }, []);

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.FETCH_SKILLS)
      .then((res) => {
        if (res.data?.data) {
          const fetchedSkills = res.data.data.map((item) => item.Skills?.trim() || item);
          const trimmedSkills = fetchedSkills.map((skill) =>
            (skill || "").toString().replace(/\s*Jobs\s*$/gi, "").trim()
          );

          setSkillsOptions(trimmedSkills);
        } else {
          console.error("Invalid skills response:", res.data);
        }
      })
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  const steps = ["Job & Company Details", "Qualifications & Industry", "Salary & Experience"];

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
      <div className="bg-gray-50">
        <Container className="py-4">
          <div className="jobpoatmain">
            <div className="w-full sm:!w-1/2 mx-auto relative">
              <form className="p-3" onSubmit={handleSubmit}>
                <div className="flex sm:!rotate-90 justify-left items-center mb-5 absolute left-2 sm:!left-[-73%] top-[-70px] sm:top-1/4 h-[200px]">
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
                    <div className="relative mb-5 pb-5 border-b overflow-hidden">
                      <img
                        src="/assets/images/jobpost/company-detail.jpg"
                        className="rounded-2xl"
                        width="100%"
                        alt=""
                      />
                      <h3 className="absolute top-14 w-1/2 left-7 text-black font-semibold capitalize text-2xl">
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
                          className="mt-1 py-[8px] px-[8px] w-full bg-white border-gray-300 rounded-md"
                          required
                          placeholder="Company Name"
                        />
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
                          className="mt-1 py-[10px] px-[8px] w-full bg-white border-gray-300 rounded-md"
                          required
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          <option value="full-time">Full-Time</option>
                          <option value="part-time">Part-Time</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-6 mb-4 relative">
                      <label htmlFor="jobTitle" className="block text-sm pl-[2px] font-semibold text-gray-700">
                        Job Title
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Search job title..."
                        value={formData.jobTitle}
                        onChange={handleJobChange}
                      />
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
                        <label
                          htmlFor="totalvacancies"
                          className="block text-sm pl-[2px] font-semibold text-gray-700"
                        >
                          Vacancies
                        </label>
                        <input
                          type="tel"
                          id="totalvacancies"
                          name="totalvacancies"
                          value={formData.totalvacancies}
                          onChange={handleChange}
                          className="mt-1 py-[8px] px-[8px] w-full bg-white border-gray-300 rounded-md"
                          required
                          placeholder="Vacancies"
                        />
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
                          className="mt-1 py-[10px] px-[8px] w-full bg-white border-gray-300 rounded-md"
                          required
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="Any">Any</option>
                        </select>
                      </div>
                    </div>
                    <div className="sm:flex-1 mt-8 sm:mt-0 relative">
                      <label htmlFor="location" className="block text-sm-tags pl-[2px] font-semibold text-gray-700">
                        Location
                      </label>
                      <div className="flex items-center border-gray-300 rounded-md">
                        <input
                          type="text"
                          value={formData.location}
                          placeholder="Location"
                          onChange={handleLocationChange}
                          className="mt-1 py-[8px] px-[8px] w-full bg-white border-gray-300 rounded-md"
                        />
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          className="absolute right-2 text-gray-500 cursor-pointer"
                        />
                      </div>
                      {loadingLocation && (
                        <div className="absolute text-sm text-gray-500">Loading locations...</div>
                      )}
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
                              <div className="flex justify-between mt-7 w-full">
                            {/* Left side - Cancel Button */}
                            <div>
                              <button
                              type="button"
                                onClick={handleCancel}
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
                    <div className="relative mb-5 pb-5 border-b overflow-hidden">
                      <img
                        src="/assets/images/jobpost/step2.jpg"
                        className="rounded-2xl"
                        width="100%"
                        alt=""
                      />
                      <h3 className="absolute top-14 w-1/2 capitalize left-7 text-black font-semibold text-2xl">
                        Add qualifications and industry info
                      </h3>
                    </div>
                    <div className="mt-8">
                      <label htmlFor="qualification" className="block text-sm pl-[2px] font-semibold text-gray-700">
                        Qualification
                      </label>
                      <Multiselect
                        className="mt-1 w-full sm:w-3/4 lg:w-1/2 max-w-[600px] bg-white min-h-[45px] border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
                        options={qualification}
                        selectedValues={formData.qualification}
                        onSelect={(selectedList, selectedItem) =>
                          handleMultiselectChange(selectedList, selectedItem, "qualification")
                        }
                        onRemove={(selectedList, selectedItem) =>
                          handleMultiselectChange(selectedList, selectedItem, "qualification")
                        }
                        placeholder="Select qualifications"
                        isObject={false}
                      />
                    </div>
                    <div className="mt-8">
                      <label
                        htmlFor="qualificationyear"
                        className="block text-sm pl-[2px] font-semibold text-gray-700"
                      >
                        Graduation Year
                      </label>
                      <input
                        type="text"
                        id="qualificationyear"
                        name="qualificationyear"
                        value={formData.qualificationyear}
                        onChange={handleChange}
                        className="mt-1 py-[8px] px-[8px] w-full bg-white border-gray-300 rounded-md"
                        required
                        placeholder="Qualification Year"
                      />
                    </div>
                    <div className="mt-8">
                      <label htmlFor="industry" className="block text-sm pl-[2px] font-semibold text-gray-700">
                        Industry
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Search industry..."
                        value={industryQuery}
                        onChange={handleIndustryChange}
                      />
                      {industrySuggestions.length > 0 && (
                        <ul
                          className="border border-gray-300 mt-1 rounded shadow-lg bg-white max-h-40 overflow-y-auto"
                          style={{
                            scrollbarWidth: "thin",
                            scrollbarColor: "#888 #f1f1f1",
                          }}
                        >
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
                    <div className="flex justify-between my-5">
                      <div className="flex space-x-2">
                    {/* Left - Back */}
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-8 mt-4 py-2 bg-[#05A3E5] bg-gray-500 text-white font-semibold rounded-md hover:bg-[#000000]"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>

                      <button
                      type="button"
                        onClick={handleCancel}
                        className="px-8 mt-4 py-2 bg-[#05A3E5] text-white font-semibold rounded-md hover:bg-[#000000]"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-8 mt-4 py-2 bg-[#05A3E5] text-white font-semibold rounded-md hover:bg-[#000000]"
                      >
                        Next <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div>
                    <div className="relative mb-5 pb-5 border-b overflow-hidden">
                      <img
                        src="/assets/images/jobpost/step3.jpg"
                        className="rounded-2xl"
                        width="100%"
                        alt=""
                      />
                      <h3 className="absolute w-1/2 top-14 left-7 capitalize text-black font-semibold text-2xl">
                        Set salary, experience, and skills.
                      </h3>
                    </div>
                    <div className="sm:flex block sm:space-x-4 mb-6 mt-7">
                      <div className="sm:flex-1 mt-8 sm:mt-0">
                        <label
                          htmlFor="minexperience"
                          className="block text-sm pl-[2px] font-semibold text-gray-700"
                        >
                          Min Experience (in years)
                        </label>
                        <input
                          type="text"
                          id="minexperience"
                          name="minexperience"
                          value={formData.minexperience}
                          onChange={handleChange}
                          className="mt-1 py-[10px] px-[8px] w-full bg-white border-gray-300 rounded-md"
                          required
                          placeholder="Min. Experience"
                        />
                      </div>
                      <div className="sm:flex-1 mt-8 sm:mt-0">
                        <label
                          htmlFor="maxexperience"
                          className="block text-sm pl-[2px] font-semibold text-gray-700"
                        >
                          Max Experience (in years)
                        </label>
                        <input
                          type="text"
                          id="maxexperience"
                          name="maxexperience"
                          value={formData.maxexperience}
                          onChange={handleChange}
                          className="mt-1 py-[10px] px-[8px] w-full bg-white border-gray-300 rounded-md"
                          required
                          placeholder="Max. Experience"
                        />
                      </div>
                    </div>
                    <div className="sm:flex block sm:space-x-4 mb-6 mt-6">
                      <div className="sm:flex-1 mt-8 sm:mt-0">
                        <label
                          htmlFor="minimumSalary"
                          className="block text-sm pl-[2px] font-semibold text-gray-700"
                        >
                          Minimum Salary (in ₹)
                        </label>
                        <input
                          type="tel"
                          id="minimumSalary"
                          name="minimumSalary"
                          value={formData.minimumSalary}
                          onChange={handleChange}
                          className="mt-1 py-[10px] px-[8px] w-full bg-white border-gray-300 rounded-md"
                          required
                          placeholder="Min. Salary"
                        />
                      </div>
                      <div className="sm:flex-1 mt-8 sm:mt-0">
                        <label
                          htmlFor="maximumSalary"
                          className="block text-sm pl-[2px] font-semibold text-gray-700"
                        >
                          Maximum Salary (in ₹)
                        </label>
                        <input
                          type="tel"
                          id="maximumSalary"
                          name="maximumSalary"
                          value={formData.maximumSalary}
                          onChange={handleChange}
                          className="mt-1 py-[10px] px-[8px] w-full bg-white border-gray-300 rounded-md"
                          required
                          placeholder="Max. Salary"
                        />
                      </div>
                    </div>
                    <div className="sm:flex block sm:space-x-4 mb-6 mt-6">
                      <div className="sm:flex-1 mt-8 sm:mt-0">
                        <label htmlFor="skills" className="block text-sm pl-[2px] font-semibold text-gray-700">
                          Required Skills
                        </label>
                        <Multiselect
                          className="mt-1 w-full sm:w-3/4 lg:w-1/2 max-w-[600px] py bg-white min-h-[45px] border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
                          options={skillsOptions}
                          selectedValues={formData.skills}
                          onSelect={(selectedList, selectedItem) =>
                            handleMultiselectChange(selectedList, selectedItem, "skills")
                          }
                          onRemove={(selectedList, selectedItem) =>
                            handleMultiselectChange(selectedList, selectedItem, "skills")
                          }
                          placeholder="Select skills"
                          isObject={false}
                        />
                      </div>
                    </div>
                    <div className="sm:flex block sm:space-x-4 mb-20 mt-6">
                      <div className="sm:flex-1">
                        <label className="block text-gray-700 font-bold mb-2">Job Description*</label>
                        <textarea
                          name="description"
                          value={formData.description || ""}
                          onChange={handleChange}
                          className="mt-1 w-full p-2 border rounded-md"
                          placeholder="Job Description"
                          rows="4"
                        />
                      </div>
                    </div>
                    
                     <div className="flex justify-between my-5">
                      <div className="flex space-x-2">
                    {/* Left - Back */}
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-8 mt-4 py-2  bg-gray-500 text-white font-semibold rounded-md hover:bg-[#000000]"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>

                      <button
                      type="button"
                        onClick={handleCancel}
                        className="px-8 mt-4 py-2 bg-[#05A3E5] text-white font-semibold rounded-md hover:bg-[#000000]"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                      <button
                        type="submit"
                        className="px-8 mt-4 py-2 bg-[#05A3E5] text-white font-semibold rounded-md hover:bg-[#000000]"
                      >
                        Update Job
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
          <ToastContainer/>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default EditJob;