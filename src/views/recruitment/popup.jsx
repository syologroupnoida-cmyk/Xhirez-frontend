import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../apiConfig';
import { toast ,Toaster } from 'react-hot-toast';
import AuthorizationHeader from '../AuthorizationHeader';

const Popup = () => {
  const [showPopup, setShowPopup] = useState(true);  
  const [isClosed, setIsClosed] = useState(false);  
  const [loading, setLoading] = useState(false);



  const authData = sessionStorage.getItem("authToken");
  const user = authData ? JSON.parse(authData).users : null;


  
  useEffect(() => {
    let interval;

   
    if (isClosed) {
      interval = setInterval(() => {
        setShowPopup(true);
        setIsClosed(false);  
      }, 3 * 60 * 1000);  
    }

    return () => clearInterval(interval);
  }, [isClosed]);


  const handleClosePopup = () => {
    setShowPopup(false);
    setIsClosed(true);  
  };

  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    // email: ,
    company: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    let validationErrors = {};
    if (!formData.name) validationErrors.name = 'Name is required';
    // if (!formData.email) validationErrors.email = 'Email is required';
    if (!formData.company) validationErrors.company = 'Company name is required';
    if (!formData.message) validationErrors.message = 'Message is required';

    setErrors(validationErrors);

    // If there are validation errors, prevent form submission
    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      fullName: formData.name,
      email: user?.email || formData?.email,
      companyName: formData.company,
      message: formData.message,
    };


    setLoading(true);

    try {
      const response = await AuthorizationHeader.post(API_ENDPOINTS.CREATEDATABASEREQUEST, payload);

      if (response.data.status === 200) {
       toast.success('Request submitted successfully!', {
        autoClose: 3000, 
      });
        setFormData({
          name: '',
          company: '',
          message: '',
        });
      } else {
        toast.error('Already submitted a request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    finally {
      setShowPopup(false);
      setIsClosed(true);
      setLoading(false);
    }
  };

  return (
    <div>
     {showPopup && (
       <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#0000003c] bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
 
     <div className="bg-white w-3/4 md:w-1/2 lg:w-1/2 py-6 pl-6  relative rounded-lg shadow-lg"
     >
      <div className="text-center">
      <h3 className="text-3xl text-center font-bold">Get <span className='text-[#07A1E3]'>Verified Candidate</span> Profiles</h3>
      <p className="mt-2">
        We provide skilled candidates for your hiring needs. Just fill the form and receive a list of matching resumes tailored to your requirement.
      </p>

      </div>
       <div className="absolute right-3 top-2">
          <button onClick={handleClosePopup} className="text-xl font-semibold text-red-600">X</button>
       </div>
       <div className="grid grid-cols-2 gap-4">
         {/* Left side - Text + Form */}
         <div className="col-span-2 md:col-span-1 ">
         
   
         <form className="mt-4" onSubmit={handleSubmit}>
      <div className="mb-2">
        <input
          type="text"
          id="name"
          name="name"
          className="w-full text-sm p-2 border rounded mt-1"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      {/* <div className="mb-2">
        <input
          type="email"
          id="email"
          name="email"
          className="w-full text-sm p-2 border rounded mt-1"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div> */}
      <div className="mb-2">
        <input
          type="text"
          id="company"
          name="company"
          className="w-full text-sm p-2 border rounded mt-1"
          placeholder="Enter your company name"
          value={formData.company}
          onChange={handleChange}
        />
        {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
      </div>
      <div className="mb-2">
        <textarea
          id="message"
          name="message"
          className="w-full text-sm p-2 border h-24 rounded mt-1"
          placeholder="Write your message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>
     <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center"
        disabled={loading}
      >
        {loading ?
         <>
            Submitting...
          </> 
         : (
          "Submit"
        )}
      </button>
    </form>

         </div>
   
         {/* Right side - Empty */}
         <div className="hidden md:block border-l">
          <img src="/assets/images/popup/bg.jpg" alt="" />
         </div>
       </div>
     </div>
   </div>
   
    )}

   <Toaster position="top-right" reverseOrder={false} />

  </div>
  );
};

export default Popup;