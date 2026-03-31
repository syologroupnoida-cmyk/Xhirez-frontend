import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { API_ENDPOINTS } from "../../views/apiConfig";
import { toast ,Toaster } from 'react-hot-toast';

import AuthorizationHeader from '../../views/AuthorizationHeader';
import { Spinner } from 'react-bootstrap';

const Recruiternavlinks = () => {
  
   const navigate = useNavigate();


   const authData = sessionStorage.getItem('authToken');
  const user = authData ? JSON.parse(authData).users : null;
  const userRole = user?.userRole;
 
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
      name: '',
      email: user?.email || '',
      company: '',
      message: '',
    });
    const [errors, setErrors] = useState({
      name: '',
      // email: '',
      company: '',
      message: '',
    });


  



  const handleClick = () => {
    setIsModalOpen(true);
  };
   const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsClosed(true);
  };
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
    if (!formData.company) validationErrors.company = 'Company name is required';
    if (!formData.message) validationErrors.message = 'Message is required';
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    
    
    const payload = {
      fullName: formData.name,
      email: user?.email || '',
      companyName: formData.company,
      message: formData.message,
    };


    setLoading(true);

    try {

      const response = await AuthorizationHeader.post(API_ENDPOINTS.CREATEDATABASEREQUEST, payload);

      if (response.data.status === 200) {
          setFormData({
            name: '',
            company: '',
            message: '',
          });

          // Show toast after slight delay (optional UX improvement)
          setTimeout(() => {
            toast.success('Request submitted successfully!', {
                   autoClose: 3000, 
            });
          }, 500);
        } else {
          toast.error('You have already submitted a request.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Error submitting form.');
      } finally {
        setIsModalOpen(false);
        setIsClosed(true);
        setLoading(false);
      }
  };


  const links = [
    { name: 'Company Profile', url: '/Companydetail' },
    { name: 'Post Job', url: '/Jobpost' },
    { name: 'All Jobs', url: '/postedjob' },
    { name: 'Advance Search', url: '/advanceSearch', requiredRole: 'primeadmin' },
  ];

  const location = useLocation();

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-gray-700 text-sm sm:text-base items-center w-full md:w-auto pl-4">

      {links.map((link, index) => {
        const isRestricted = link.requiredRole && userRole !== link.requiredRole;

        return (
          <div
            key={index}
            className={`${
              location.pathname === link.url ? 'border-[#06A2E4] text-[#06A2E4]' : 'border-transparent'
            } border-b-2 md:border-t-4 md:border-b-0 h-full flex items-center justify-center px-4 py-1 md:py-0`}
          >            {isRestricted ? (
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className="flex items-center space-x-1 text-gray-700 rounded cursor-not-allowed opacity-60"
                      title="Available only for primeadmin users"
                    >
                      <span>Advance Search</span>
                      <InformationCircleIcon className="w-5 h-5 text-gray-500" />
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 mt-2 w-64 sm:w-72 bg-white rounded-lg p-3 ring-1 ring-black ring-opacity-5">
                        <h3 className="text-sm font-semibold text-gray-800">Requires Prime Access</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          This feature is only available to <strong>PrimeAdmin users</strong>. Upgrade your account to unlock full access.
                        </p>
                        <button className="mt-4 px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm" onClick={handleClick}>
                          Upgrade Now
                        </button>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            ) : (
              <Link
                to={link.url}
                className="hover:text-[#06A2E4] transition duration-300"
              >
                {link.name}
              </Link>
            )}
          </div>
        );
      })}


      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-[#0000003c] bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white w-3/4 md:w-1/2 lg:w-1/2 py-6 pl-6 relative rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold">
                Get <span className="text-[#07A1E3]">Verified Candidate</span> Profiles
              </h3>
              <p className="mt-2">
                We provide skilled candidates for your hiring needs. Just fill the form and receive a list of matching resumes tailored to your requirement.
              </p>
            </div>
            <div className="absolute right-3 top-2">
              <button onClick={handleCloseModal} className="text-xl font-semibold text-red-600">
                X
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Left side - Text + Form */}
              <div className="col-span-2 md:col-span-1">
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
              {/* Right side - Image */}
              <div className="hidden md:block border-l">
                <img src="/assets/images/popup/bg.jpg" alt="Popup background" />
              </div>
            </div>
          </div>
        </div>
      )}

   <Toaster position="top-right" reverseOrder={false} />

    </div>
  );
};

export default Recruiternavlinks;