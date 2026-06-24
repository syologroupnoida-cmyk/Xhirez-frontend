import React from "react";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Navbar from "../../components/header/recruitment-header";
import Footer from "../../components/footer/footer";
import { Link } from "@/router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faBuilding, faEnvelope, faPhone, faCalendar, faIndustry, faGlobe, faUser, faBriefcase, faUsers } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_ENDPOINTS } from "../apiConfig";
import { toast, ToastContainer } from "react-toastify";
import AuthorizationHeader from "../AuthorizationHeader";

const Companydetail = () => {
  const authData = sessionStorage.getItem("authToken");
  const user = authData ? JSON.parse(authData).users : null;
  const email = user ? user.email : null;

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {
    socialLinks: {} 
  };
    let isValid = true;

    // Logo validation
    if (!logo) {
      newErrors.logo = "Company logo is required";
      isValid = false;
    }

    // Company Name validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
      isValid = false;
    } else if (formData.companyName.length > 100) {
      newErrors.companyName = "Company name must be less than 100 characters";
      isValid = false;
    }

    // Contact Number validation
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
      isValid = false;
    }else if (!/^\d{10}$/.test(formData.contactNumber)) {
  newErrors.contactNumber = "Please enter  10 numbers (digits only)";
  isValid = false;
    }

    // Website URL validation
    if (!formData.websiteUrl.trim()) {
  newErrors.websiteUrl = "Website URL is required";
  isValid = false;
    }
    // Year of Establishment validation
    if (!formData.yearOfEstablishment) {
      newErrors.yearOfEstablishment = "Year of establishment is required";
      isValid = false;
    } 

    // Industry Type validation
    if (!formData.industryType.trim()) {
      newErrors.industryType = "Industry type is required";
      isValid = false;
    }

    // Company Address validation
    if (!formData.companyAddress.trim()) {
      newErrors.companyAddress = "Company address is required";
      isValid = false;
    } else if (formData.companyAddress.length < 10) {
      newErrors.companyAddress = "Address is too short";
      isValid = false;
    }

    // Contact Person validation
    if (!formData.contactPersonName.trim()) {
      newErrors.contactPersonName = "Contact person name is required";
      isValid = false;
    } else if (!/^[a-zA-Z ]+$/.test(formData.contactPersonName)) {
      newErrors.contactPersonName = "Name should contain only letters";
      isValid = false;
    }

    // Designation validation
    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required";
      isValid = false;
    }

    // Employee Strength validation
    if (!formData.employeeStrength) {
      newErrors.employeeStrength = "Employee strength is required";
      isValid = false;
    } else if (formData.employeeStrength < 1) {
      newErrors.employeeStrength = "Employee strength must be at least 1";
      isValid = false;
    }

    // Social Media URL validations
     if (!formData.socialLinks.facebook.trim()) {
      newErrors.facebook = " URL is required";
      isValid = false;
     }

if (!formData.socialLinks.twitter.trim()) {
  newErrors.twitter = " URL is required";
  isValid = false;
    }

      if (!formData.socialLinks.linkedin.trim()) {
  newErrors.linkedin = " URL is required";
  isValid = false;
    }

    if (!formData.socialLinks.instagram.trim()) {
  newErrors.instagram = " URL is required";
  isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setErrors({...errors, logo: null});

    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setErrors({...errors, logo: "Only JPEG, PNG, JPG formats are allowed"});
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setErrors({...errors, logo: "File size exceeds 2MB limit"});
        return;
      }

      setLogoPreview(URL.createObjectURL(file));
      setLogo(file);
    }
  };

  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    contactNumber: "",
    websiteUrl: "",
    yearOfEstablishment: "",
    industryType: "",
    companyAddress: "",
    contactPersonName: "",
    designation: "",
    employeeStrength: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({...errors, [name]: null});
    }
    
    if (name in formData.socialLinks) {
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [name]: value
        }
      });
      
      // Clear social link errors when user types
      if (errors[name]) {
        setErrors({...errors, [name]: null});
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill the all fields");
      return;
    }

    const payload = new FormData();

    // Prepare compDetails JSON object
    const compDetails = {
      companyName: formData.companyName,
      companyEmail: email,
      contactNo: formData.contactNumber,
      websiteURL: formData.websiteUrl,
      yearofEstablish: formData.yearOfEstablishment,
      industryType: formData.industryType,
      companyAddress: formData.companyAddress,
      contactPersonName: formData.contactPersonName,
      designation: formData.designation,
      currentEmpStrength: formData.employeeStrength,
      facebookLink: formData.socialLinks.facebook,
      twitterLink: formData.socialLinks.twitter,
      instagramLink: formData.socialLinks.instagram,
      linkeddln: formData.socialLinks.linkedin,
    };

    // Append JSON string and file to FormData
    payload.append("compDetails", JSON.stringify(compDetails));
    if (logo) {
      payload.append("logo", logo);
    }
    else{
      toast.error("Logo is Required!");
    }

    setLoading(true);

    try {
      const response = await AuthorizationHeader.post(API_ENDPOINTS.UPDATECOMPANYDETAILS,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === 200) {
        toast.success("Company details updated successfully!");
      } else {
        toast.error("Failed to update company details. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background Blur when Loading */}
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

     <div className="px-4 sm:!px-8 md:!px-16 lg:!px-36 mt-4">
  <div className="relative w-full mb-5 pb-5 border-b h-64 sm:!h-80 overflow-hidden">
    <img
      src="/assets/images/job-icon/companydetal.jpg"
      className="rounded-2xl object-cover w-full h-full"
      alt="Company Detail"
    />
    <h3 className="absolute top-16 sm:!top-24 left-4 sm:!left-7 text-black font-semibold text-lg sm:!text-xl md:!text-2xl w-3/4 sm:!w-3/4 md:!w-2/5 capitalize">
      Complete Your Company Profile – Showcase Your Business with Us!
    </h3>
  </div>

  <div className="flex flex-col md:!flex-row gap-4">
    <div className="w-full md:!w-1/4 bg-white border rounded-lg p-6 flex flex-col items-center">
      {/* Logo Upload */}
      <div className="relative w-24 h-24 sm:!w-32 sm:!h-32 rounded-full overflow-hidden border-2 border-gray-300">
        {logo ? (
          <div className="group w-full h-full relative">
            <img src={logoPreview} alt="Company Logo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white">Replace</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
            📤 Upload Logo
          </div>
        )}
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleLogoChange}
        />
      </div>
      {errors.logo && <p className="text-red-500 text-sm mt-2">{errors.logo}</p>}

      {/* Navigation Buttons */}
      <div className="mt-6 sm:!mt-8 space-y-4 w-full">
        <Link to="/postedjob">
          <Button className="w-full bg-[#06A1E3] text-white py-2 rounded-lg">All Jobs</Button>
        </Link>
        <Link to="/bookmarkUsers" className="block w-full">
          <Button className="w-full bg-[#06A1E3] text-white py-2 rounded-lg">Save Candidate</Button>
        </Link>
        <Link to="/logout" className="block w-full">
        <Button className="w-full bg-[#06A1E3] text-white py-2 rounded-lg">
          Logout
        </Button>
        </Link>
      </div>
    </div>

    <div className="w-full md:!w-3/4 px-0 md:!px-5  sm:max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="shadow-sm mt-2 py-5 px-5 rounded-lg">
          <div className="flex flex-col sm:!flex-row gap-4">
            <div className="w-full relative">
              <label className="block mb-2 font-semibold">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                className={`w-full text-sm p-3 border rounded-lg pr-10 ${errors.companyName ? 'border-red-500' : ''}`}
              />
              <FontAwesomeIcon icon={faBuilding} className="absolute right-3 top-[50px] text-gray-400" />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
            </div>

            <div className="w-full relative">
              <label className="block mb-2 font-semibold">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter contact number"
                className={`w-full text-sm p-3 border rounded-lg pr-10 ${errors.contactNumber ? 'border-red-500' : ''}`}
              />
              <FontAwesomeIcon icon={faPhone} className="absolute right-3 top-[50px] text-gray-400" />
              {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
            </div>
          </div>

          <div className="flex flex-col sm:!flex-row gap-4 mt-3">
            <div className="w-full relative">
              <label className="block mb-2 font-semibold">Website URL</label>
              <input
                type="url"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                placeholder="Enter website URL"
                className={`w-full text-sm p-3 border rounded-lg pr-10 ${errors.websiteUrl ? 'border-red-500' : ''}`}
              />
              <FontAwesomeIcon icon={faGlobe} className="absolute right-3 top-[50px] text-gray-400" />
              {errors.websiteUrl && <p className="text-red-500 text-sm mt-1">{errors.websiteUrl}</p>}
            </div>

            <div className="w-full relative">
              <label className="block mb-2 font-semibold">Year of Establishment</label>
              <input
                type="number"
                name="yearOfEstablishment"
                value={formData.yearOfEstablishment}
                onChange={handleChange}
                placeholder="Enter year of establishment"
                className={`w-full text-sm p-3 border rounded-lg pr-10 ${errors.yearOfEstablishment ? 'border-red-500' : ''}`}
              />
              <FontAwesomeIcon icon={faCalendar} className="absolute right-3 top-[50px] text-gray-400" />
              {errors.yearOfEstablishment && <p className="text-red-500 text-sm mt-1">{errors.yearOfEstablishment}</p>}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="shadow-sm mt-3 py-5 px-5 rounded-lg">
          <div className="w-full relative">
            <label className="block mb-2 font-semibold">Industry Type</label>
            <input
              type="text"
              name="industryType"
              value={formData.industryType}
              onChange={handleChange}
              placeholder="Enter industry type"
              className={`w-full text-sm p-3 border rounded-lg pr-10 ${errors.industryType ? 'border-red-500' : ''}`}
            />
            <FontAwesomeIcon icon={faIndustry} className="absolute right-3 top-[50px] text-gray-400" />
            {errors.industryType && <p className="text-red-500 text-sm mt-1">{errors.industryType}</p>}
          </div>

          <div className="w-full mt-4">
            <label className="block mb-2 font-semibold">Company Address</label>
            <textarea
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              placeholder="Enter company address"
              className={`w-full text-sm p-3 h-32 border rounded-lg ${errors.companyAddress ? 'border-red-500' : ''}`}
            ></textarea>
            {errors.companyAddress && <p className="text-red-500 text-sm mt-1">{errors.companyAddress}</p>}
          </div>
        </div>

        {/* Contact Person Info Section */}
        <div className="shadow-sm mt-2 py-5 px-5 rounded-lg">
          <div className="flex flex-col sm:!flex-row gap-4">
            <div className="w-full relative">
              <label className="block mb-2 font-semibold">Contact Person Name</label>
              <input
                type="text"
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleChange}
                placeholder="Enter contact person name"
                className={`w-full text-sm p-3 border rounded-lg pr-10 ${errors.contactPersonName ? 'border-red-500' : ''}`}
              />
              <FontAwesomeIcon icon={faUser} className="absolute right-3 top-[50px] text-gray-400" />
              {errors.contactPersonName && <p className="text-red-500 text-sm mt-1">{errors.contactPersonName}</p>}
            </div>

            <div className="w-full relative">
              <label className="block mb-2 font-semibold">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Enter designation"
                className={`w-full text-sm p-3 border rounded-lg pr-10 ${errors.designation ? 'border-red-500' : ''}`}
              />
              <FontAwesomeIcon icon={faBriefcase} className="absolute right-3 top-[50px] text-gray-400" />
              {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
            </div>
          </div>

          <div className="w-full mt-4 relative">
            <label className="block mb-2 font-semibold">Current Employee Strength</label>
            <input
              name="employeeStrength"
              value={formData.employeeStrength}
              onChange={handleChange}
              type="number"
              placeholder="Enter employee strength"
              className={`w-full text-sm p-3 border rounded-lg pr-10 ${errors.employeeStrength ? 'border-red-500' : ''}`}
            />
            <FontAwesomeIcon icon={faUsers} className="absolute right-3 top-[50px] text-gray-400" />
            {errors.employeeStrength && <p className="text-red-500 text-sm mt-1">{errors.employeeStrength}</p>}
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="shadow-sm mt-2 py-5 px-5 rounded-lg">
          <label className="block mb-4 font-semibold">Social Media Links</label>

          <div className="flex flex-col sm:!flex-row gap-4">
            <div className="w-full relative">
              <label className="block mb-2 font-semibold">Facebook</label>
              <input
                type="url"
                name="facebook"
                value={formData.socialLinks.facebook}
                onChange={handleChange}
                placeholder="Enter Facebook link"
                className={`w-full p-3 border rounded-lg pr-10 ${errors.facebook ? 'border-red-500' : ''}`}
              />
              <FontAwesomeIcon icon={faFacebook} className="absolute right-3 top-[50px] text-gray-400" />
              {errors.facebook && <p className="text-red-500 text-sm mt-1">{errors.facebook}</p>}
            </div>

            <div className="w-full relative">
              <label className="block mb-2 font-semibold">Twitter</label>
              <input
                type="url"
                name="twitter"
                value={formData.socialLinks.twitter}
                onChange={handleChange}
                placeholder="Enter Twitter link"
                className={`w-full p-3 border rounded-lg pr-10 ${errors.twitter ? 'border-red-500' : ''}`}
              />
              <FontAwesomeIcon icon={faXTwitter} className="absolute right-3 top-[50px] text-gray-400" />
              {errors.twitter && <p className="text-red-500 text-sm mt-1">{errors.twitter}</p>}
            </div>
          </div>

          <div className="flex flex-col sm:!flex-row gap-4 mt-4">
            <div className="w-full relative">
              <label className="block mb-2 font-semibold">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleChange}
                placeholder="Enter LinkedIn link"
                className={`w-full p-3 border rounded-lg pr-10 ${errors.linkedin ? 'border-red-500' : ''}`}
              />
              <FontAwesomeIcon icon={faLinkedin} className="absolute right-3 top-[50px] text-gray-400" />
              {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>}
            </div>

            <div className="w-full relative">
              <label className="block mb-2 font-semibold">Instagram</label>
              <input
                type="url"
                name="instagram"
                value={formData.socialLinks.instagram}
                onChange={handleChange}
                placeholder="Enter Instagram link"
                className={`w-full p-3 border rounded-lg pr-10 ${errors.instagram ? 'border-red-500' : ''}`}
              />
              <FontAwesomeIcon icon={faInstagram} className="absolute right-3 top-[50px] text-gray-400" />
              {errors.instagram && <p className="text-red-500 text-sm mt-1">{errors.instagram}</p>}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg w-full"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  </div>
</div>

      <Footer />
      <ToastContainer />
    </>
  );
};

export default Companydetail;