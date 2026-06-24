import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Navbar from "../../components/header/recruitment-header";
import Footer from "../../components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBuilding,
  faEnvelope,
  faPhone,
  faCalendar,
  faIndustry,
  faGlobe,
  faUser,
  faBriefcase,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_ENDPOINTS } from "../apiConfig";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "@/router-dom";
import AuthorizationHeader from "../AuthorizationHeader";
const Companydetailupdate = () => {
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(null);
  const [preview, setPreview] =useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const authData = sessionStorage.getItem("authToken");
  const user = authData ? JSON.parse(authData).users : null;


   const validateForm = () => {
    const newErrors = {
    socialLinks: {} 
  };
    let isValid = true;

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
    
      if (file) {
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validTypes.includes(file.type)) {
          alert("Only JPEG, PNG, JPG formats are allowed.");
          return;
        }
    
        if (file.size > 2 * 1024 * 1024) {
          alert("File size exceeds 2MB limit.");
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
      instagram: "",
    },
  });

  useEffect(() => {
    const fetchAllDetails = async () => {
      const response = await AuthorizationHeader.get(API_ENDPOINTS.FETCHCOMPANYDETAILS, {
        params: {
          email: user.email,
        },
      });
      if (response.data.status === 200) {
        const data = response?.data?.data;

        setFormData({
          companyName: data?.companyName || "",
          companyEmail: data?.companyEmail || "",
          contactNumber: data?.contactNo || "",
          websiteUrl: data?.websiteUrl || "",
          yearOfEstablishment: data?.yearOfEstablish || "",
          industryType: data?.industryType || "",
          companyAddress: data?.companyAddress || "",
          contactPersonName: data?.contactPersonName || "",
          designation: data?.designation || "",
          employeeStrength: data?.currentEmpStrength || "",
          socialLinks: {
            facebook: data?.facebookLink || "",
            twitter: data?.twitterLink || "",
            linkedin: data?.linkedinLink || "",
            instagram: data?.instagramLink || "",
          },
        });

        // also set logo here

        setPreview(data?.compLogo);

      }
      else{
        setFormData([]);

        setFormData({companyEmail: user?.email})
      }
    };

    fetchAllDetails();

  }, [user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.socialLinks) {
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [name]: value,
        },
      });
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
        companyEmail: user.email,   
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
      // else{
      //   alert("Please update a logo image.");
      //   return;
      // }
      
    setLoading(true);

      try {
        const response = await AuthorizationHeader.post(
          API_ENDPOINTS.UPDATECOMPANYDETAILS,
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
          alert("Failed to update company details. Please try again.");
          toast.error("Failed to update company details. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Something went wrong. Please try again.");
      }
      finally{
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
       Complete your company profile now and get matched with the right candidates faster!
    
    </h3>
  </div>

  <div className="flex flex-col md:!flex-row gap-4 sm:!gap-6">
    <div className="w-full md:!w-1/4 bg-white border rounded-lg p-4 sm:!p-6 flex flex-col items-center">
      {/* Logo Upload */}
      <div className="relative w-24 h-24 sm:!w-28 sm:!h-28 md:!w-32 md:!h-32 rounded-full overflow-hidden border-2 border-gray-300">
        {logoPreview ? (
          <div className="group w-full h-full relative">
            <img src={logoPreview} alt="Company Logo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-sm">Replace</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            <img
              src={API_ENDPOINTS.FETCHIMAGE(preview)}
              alt="Company Logo"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleLogoChange}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 sm:!mt-8 space-y-3 sm:!space-y-4 w-full">
        <Link to="/postedjob">
        <Button className="w-full bg-[#06A1E3] text-white py-2 rounded-md hover:bg-[#0487c5] text-sm sm:!text-base">
          All Jobs
        </Button>
        </Link>

         <Link to="/bookmarkUsers" className="block w-full">
        <Button className="w-full bg-[#06A1E3] text-white py-2 rounded-md hover:bg-[#0487c5] text-sm sm:!text-base">
          Save Candidate
        </Button>
        </Link>
        <Link to="/logout" className="block w-full">
        <Button className="w-full bg-[#06A1E3] text-white py-2 rounded-md hover:bg-[#0487c5] text-sm sm:!text-base">
        Logout
        </Button>
        </Link>
      </div>
    </div>

    <div className="w-full md:!w-3/4 px-0 sm:!px-5 overflow-y-auto h-auto md:!h-[calc(100vh-200px)] scrollbar-hide">
      <form className="space-y-4 sm:!space-y-6" onSubmit={handleSubmit}>
        <div className="shadow-sm mt-2 py-4 sm:!py-5 px-4 sm:!px-5 rounded-lg bg-white">
          <div className="flex flex-col sm:!flex-row gap-4 sm:!gap-6">
            <div className="w-full relative">
              <label className="block mb-2 font-semibold text-sm sm:!text-base">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData?.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full text-sm p-2 sm:!p-[10px] border rounded-lg pr-10 focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={faBuilding}
                className="absolute right-3 top-9 sm:!top-10 text-gray-400"
              />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
            </div>

            {/* <div className="w-full relative">
              <label className="block mb-2 font-semibold text-sm sm:!text-base">Company Email</label>
              <input
                type="email"
                name="companyEmail"
                value={formData?.companyEmail}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full text-sm p-2 sm:!p-[10px] border rounded-lg pr-10 bg-gray-100 cursor-not-allowed"
                readOnly
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute right-3 top-9 sm:!top-10 text-gray-400"
              />
              {errors.companyEmail && <p className="text-red-500 text-sm mt-1">{errors.companyEmail}</p>}
            </div> */}
          </div>

          <div className="flex flex-col sm:!flex-row gap-4 sm:!gap-6 mt-3 sm:!mt-4">
            <div className="w-full relative">
              <label className="block mb-2 font-semibold text-sm sm:!text-base">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData?.contactNumber}
                onChange={handleChange}
                placeholder="Enter contact number"
                className="w-full text-sm p-2 sm:!p-[10px] border rounded-lg pr-10 focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={faPhone}
                className="absolute right-3 top-9 sm:!top-10 text-gray-400"
              />
              {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
            </div>

            <div className="w-full relative">
              <label className="block mb-2 font-semibold text-sm sm:!text-base">Website URL</label>
              <input
                type="url"
                name="websiteUrl"
                value={formData?.websiteUrl}
                onChange={handleChange}
                placeholder="Enter website URL"
                className="w-full text-sm p-2 sm:!p-[10px] border rounded-lg pr-10 focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={faGlobe}
                className="absolute right-3 top-9 sm:!top-10 text-gray-400"
              />
              {errors.websiteUrl && <p className="text-red-500 text-sm mt-1">{errors.websiteUrl}</p>}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="shadow-sm mt-3 py-4 sm:!py-5 px-4 sm:!px-5 rounded-lg bg-white">
          <div className="flex flex-col sm:!flex-row gap-4 sm:!gap-6">
            <div className="w-full relative">
              <label className="block mb-2 font-semibold text-sm sm:!text-base">Year of Establishment</label>
              <input
                type="number"
                name="yearOfEstablishment"
                value={formData?.yearOfEstablishment}
                onChange={handleChange}
                placeholder="Enter year of establishment"
                className="w-full text-sm p-2 sm:!p-[10px] border rounded-lg pr-10 focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={faCalendar}
                className="absolute right-3 top-9 sm:!top-10 text-gray-400"
              />
              {errors.yearOfEstablishment && <p className="text-red-500 text-sm mt-1">{errors.yearOfEstablishment}</p>}
            </div>

            <div className="w-full relative">
              <label className="block mb-2 font-semibold text-sm sm:!text-base">Industry Type</label>
              <input
                type="text"
                name="industryType"
                value={formData?.industryType}
                onChange={handleChange}
                placeholder="Enter industry type"
                className="w-full text-sm p-2 sm:!p-[10px] border rounded-lg pr-10 focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={faIndustry}
                className="absolute right-3 top-9 sm:!top-10 text-gray-400"
              />
              {errors.industryType && <p className="text-red-500 text-sm mt-1">{errors.industryType}</p>}
            </div>
          </div>

          <div className="flex mt-3 sm:!mt-4 relative">
            <div className="w-full">
              <label className="block mb-2 font-semibold text-sm sm:!text-base">Company Address</label>
              <textarea
                name="companyAddress"
                value={formData?.companyAddress}
                onChange={handleChange}
                placeholder="Enter company address"
                className="w-full text-sm p-2 sm:!p-[10px] h-32 sm:!h-40 border rounded-lg focus:ring-2 focus:ring-blue-400"
              ></textarea>
              {errors.companyAddress && <p className="text-red-500 text-sm mt-1">{errors.companyAddress}</p>}
            </div>
          </div>
        </div>

        {/* Contact Person Info Section */}
        <div className="shadow-sm mt-2 py-4 sm:!py-5 px-4 sm:!px-5 rounded-lg bg-white">
          <div className="flex flex-col sm:!flex-row gap-4 sm:!gap-6">
            <div className="w-full relative">
              <label className="block mb-2 font-semibold text-sm sm:!text-base">Contact Person Name</label>
              <input
                type="text"
                name="contactPersonName"
                value={formData?.contactPersonName}
                onChange={handleChange}
                placeholder="Enter contact person name"
                className="w-full text-sm p-2 sm:!p-[10px] border rounded-lg pr-10 focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="absolute right-3 top-9 sm:!top-10 text-gray-400"
              />
              {errors.contactPersonName && <p className="text-red-500 text-sm mt-1">{errors.contactPersonName}</p>}
            </div>

            <div className="w-full relative">
              <label className="block mb-2 font-semibold text-sm sm:!text-base">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData?.designation}
                onChange={handleChange}
                placeholder="Enter designation"
                className="w-full text-sm p-2 sm:!p-[10px] border rounded-lg pr-10 focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={faBriefcase}
                className="absolute right-3 top-9 sm:!top-10 text-gray-400"
              />
              {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
            </div>
          </div>

          <div className="flex mt-3 sm:!mt-4 relative">
            <div className="w-full relative">
              <label className="block mb-2 font-semibold text-sm sm:!text-base">Current Employee Strength</label>
              <input
                type="number"
                name="employeeStrength"
                value={formData?.employeeStrength}
                onChange={handleChange}
                placeholder="Enter employee strength"
                className="w-full text-sm p-2 sm:!p-[10px] border rounded-lg pr-10 focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={faUsers}
                className="absolute right-3 top-9 sm:!top-10 text-gray-400"
              />
              {errors.employeeStrength && <p className="text-red-500 text-sm mt-1">{errors.employeeStrength}</p>}
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="shadow-sm mt-2 py-4 sm:!py-5 px-4 sm:!px-5 rounded-lg bg-white">
          <label className="block mb-4 font-semibold text-sm sm:!text-base">Social Media Links</label>

          <div className="flex flex-col sm:!flex-row gap-4 sm:!gap-6">
            <div className="w-full relative">
              <label className="block mb-2 font-semibold text-sm sm:!text-base">Facebook</label>
              <input
                type="url"
                name="facebook"
                value={formData?.socialLinks?.facebook}
                onChange={handleChange}
                placeholder="Enter Facebook link"
                className="w-full text-sm p-2 sm:!p-[10px] border rounded-lg pr-10 focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={faFacebook}
                className="absolute right-3 top-9 sm:!top-10 text-gray-400"
              />
              {errors.facebook && <p className="text-red-500 text-sm mt-1">{errors.facebook}</p>}
            </div>

            <div className="w-full relative">
              <label className="block mb-2 font-semibold text-sm sm:!text-base">Twitter</label>
              <input
                type="url"
                name="twitter"
                value={formData?.socialLinks?.twitter}
                onChange={handleChange}
                placeholder="Enter Twitter link"
                className="w-full text-sm p-2 sm:!p-[10px] border rounded-lg pr-10 focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={faXTwitter}
                className="absolute right-3 top-9 sm:!top-10 text-gray-400"
              />
              {errors.twitter && <p className="text-red-500 text-sm mt-1">{errors.twitter}</p>}
            </div>
          </div>

          <div className="flex flex-col sm:!flex-row gap-4 sm:!gap-6 mt-3 sm:!mt-4">
            <div className="w-full relative">
              <label className="block mb-2 font-semibold text-sm sm:!text-base">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={formData?.socialLinks?.linkedin}
                onChange={handleChange}
                placeholder="Enter LinkedIn link"
                className="w-full text-sm p-2 sm:!p-[10px] border rounded-lg pr-10 focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={faLinkedin}
                className="absolute right-3 top-9 sm:!top-10 text-gray-400"
              />
              {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>}
            </div>

            <div className="w-full relative">
              <label className="block mb-2 font-semibold text-sm sm:!text-base">Instagram</label>
              <input
                type="url"
                name="instagram"
                value={formData?.socialLinks?.instagram}
                onChange={handleChange}
                placeholder="Enter Instagram link"
                className="w-full text-sm p-2 sm:!p-[10px] border rounded-lg pr-10 focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={faInstagram}
                className="absolute right-3 top-9 sm:!top-10 text-gray-400"
              />
              {errors.instagram && <p className="text-red-500 text-sm mt-1">{errors.instagram}</p>}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#06A1E3] hover:bg-[#0487c5] text-white p-2 sm:!p-3 rounded-lg w-full sm:!w-auto px-6 sm:!px-8 text-sm sm:!text-base mt-4"
        >
          Save Profile
        </button>
      </form>
    </div>
  </div>
</div>

      <Footer />

      <ToastContainer/>
    </>
  );
};

export default Companydetailupdate;