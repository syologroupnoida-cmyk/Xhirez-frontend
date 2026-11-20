// import React, { useState, useRef, useEffect } from "react";
// import { Container, Row, Col, Spinner } from "react-bootstrap";
// import Headernavbar from "../../components/header/seekerlogin";
// import Footer from "../../components/footer/footer";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Multiselect from "multiselect-react-dropdown";
// import {
//   faBriefcase,
//   faGraduationCap,
//   faTools,
//   faUser,
//   faFileAlt,
//   faTrashAlt,
//   faUpload,
//   faEdit,
//   faTrash,
//   faDownload,
// } from "@fortawesome/free-solid-svg-icons";
// import { API_ENDPOINTS } from "../apiConfig.jsx";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "@/router-dom";
// import AuthorizationHeader from "../AuthorizationHeader.jsx";
// import { toast, ToastContainer } from "react-toastify";

// const Fillprofile = () => {
//   // Initial data setup
//   const authData = sessionStorage.getItem("authToken");
//   const user = authData ? JSON.parse(authData).users : null;
//   const profileImage = user?.profileImage || null;

//   const navigate = useNavigate();

//   const steps = [
//     { id: 1, title: "Upload CV" },
//     { id: 2, title: "Personal Details" },
//     { id: 3, title: "Experience/Projects" },
//     { id: 4, title: "Skills" },
//     { id: 5, title: "Education" },
//   ];

//   // State management
//   const [step, setStep] = useState(1);
//   const [hover, setHover] = useState(false);
//   const [loadingStates, setLoadingStates] = useState({
//     location: false,
//     skills: false,
//     qualifications: false,
//     universities: false,
//   });


//   const [dynamicImageResume, setDynamicImageResume] = useState({
//      dynamicImage:"",
//      dynamicResume: ""
//   });


//   const [formData, setFormData] = useState({
//     // Personal Information
//     fullName: user?.fullName || "",
//     email: user?.email || "",
//     phoneNo: user?.phoneNo || "",
//     location: user?.location || "",
//     gender: user?.gender || "",
//     maxsalary: user?.maxsalary || "",
//     minsalary: user?.minsalary || "",
//     aboutMe: user?.aboutMe || "",
//     userCategory: user?.userCategory || "",
//     experiencePeriod: user?.experiencePeriod || "",
//     noticePeriod: user?.noticePeriod || "",
//     // skills: user?.skills || [],
//     skills: user?.skills
//       ? user.skills.map((skill) =>
//           typeof skill === "string" ? { name: skill } : skill
//         )
//       : [],
//     // For Project
//     projectTitle: "",
//     projectLink: "",
//     projectStartDate: "",
//     projectEndDate: "",
//     projects: user?.project || [],

//     // For Experience
//     jobProfile: "",
//     companyName: "",
//     jobStartDate: "",
//     jobEndDate: "",
//     // In your formData state initialization
//     currentlyworking: user?.currentlyWorking || false,
//     workExperiences: user?.workExperience || [],

//     //for education
//     degree: "",
//     university: "",
//     courseType: "",
//     specialization: "",
//     startDate: "",
//     endDate: "",
//     educationEntries: user?.education || [],
//   });

//   // For Dynamic Fetching Images

//   useEffect(()=>{

//     const fethPortalsData = async ()=> {

//        const authData = sessionStorage.getItem("authToken");
//        const user = authData ? JSON.parse(authData).users : null;

//       try {
        
//         const response = await AuthorizationHeader.get(API_ENDPOINTS.FETCHDATAFORUSERSPORTAL,{
//           params:{
//             email : user?.email
//           }
//         });
//         if(response.data.status === 200)
//         {
//           setDynamicImageResume(prev => ({
//           ...prev,
//           dynamicImage: response?.data?.data?.profileImage || "",
//           dynamicResume: response?.data?.data?.resume || "",
//           }));
//         }
//       } 
//       catch (error) {
//       }
//     }


//     fethPortalsData();

//   },[]);




//   // File upload states

//   const [resume, setResume] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [profileImageFile, setProfileImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Refs

//   const resumeInputRef = useRef(null);
//   const profileInputRef = useRef(null);

//   // Dropdown options

//   const [dropdownOptions, setDropdownOptions] = useState({
//     locations: [],
//     skills: [],
//     qualifications: [],
//     universities: [],

//     specializations: [
//       "Computer Science",
//       "Mechanical Engineering",
//       "Civil Engineering",
//       "Electrical Engineering",
//       "Data Science",
//       "Artificial Intelligence",
//       "Cybersecurity",
//       "Business Administration",
//       "Finance",
//       "Marketing",
//       "Graphic Design",
//       "Law",
//       "Psychology",
//       "Medicine",
//       "Architecture",
//       "Economics",
//       "Environmental Science",
//       "Education",
//       "Philosophy",
//       "Political Science",
//     ],

//     courseTypes: [
//       "Full-Time",
//       "Part-Time",
//       "Online",
//       "Distance Learning",
//       "Certification",
//       "Diploma",
//     ],
//     noticePeriods: [
//       "15 days",
//       "1 month",
//       "2 months",
//       "3 months",
//       "More than 3 months",
//       "Currently Serving Notice Period"
//     ],
//     salaryRanges: Array.from({ length: 26 }, (_, i) =>
//       i === 0 ? "0" : i === 25 ? "25+" : i.toString()
//     ),
//   });

//   // Format skills for multiselect
//   const formattedSkills = formData.skills.map((skill) =>
//     typeof skill === "string" ? { name: skill } : skill
//   );

//   // Clean up preview URL on unmount
//   useEffect(() => {
//     return () => {
//       if (previewUrl) URL.revokeObjectURL(previewUrl);
//     };
//   }, [previewUrl]);

//   // Fetch dropdown data on mount
//   useEffect(() => {
//     fetchDropdownData();
//   }, []);

//   // Data fetching functions
//   const fetchDropdownData = async () => {
//     try {
//       // Skills
//       setLoadingStates((prev) => ({ ...prev, skills: true }));
//       const skillsRes = await axios.get(API_ENDPOINTS.FETCH_SKILLS);
//       const processedSkills = skillsRes.data.data.map((item) => ({
//         name: item.Skills.trim().replace(/\s*Jobs\s*$/gi, ""),
//       }));
//       setDropdownOptions((prev) => ({ ...prev, skills: processedSkills }));

//       // Qualifications
//       setLoadingStates((prev) => ({ ...prev, qualifications: true }));
//       const qualRes = await AuthorizationHeader.get(API_ENDPOINTS.FETCH_QUALIFICATIONS);
//       const qualifications = qualRes.data.data.map((q) =>
//         q.qualification_name.trim()
//       );
//       setDropdownOptions((prev) => ({ ...prev, qualifications }));

//       // Universities
//       setLoadingStates((prev) => ({ ...prev, universities: true }));
//       const univRes = await AuthorizationHeader.get(API_ENDPOINTS.FETCHALLUNIVERSITIES);

//       const universities = [
//         ...new Set(univRes.data.map((u) => u.name.trim())),
//       ].sort();
//       setDropdownOptions((prev) => ({ ...prev, universities }));
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//     } finally {
//       setLoadingStates({
//         skills: false,
//         qualifications: false,
//         universities: false,
//         location: false,
//       });
//     }
//   };

//   const handleLocationSearch = async (value) => {
//     setFormData((prev) => ({ ...prev, location: value }));

//     if (value.length > 2) {
//       setLoadingStates((prev) => ({ ...prev, location: true }));
//       try {
//         const res = await axios.post(
//           "https://countriesnow.space/api/v0.1/countries/cities",
//           {
//             country: "India",
//           }
//         );
//         const filtered = res.data.data.filter((city) =>
//           city.toLowerCase().includes(value.toLowerCase())
//         );
//         setDropdownOptions((prev) => ({ ...prev, locations: filtered }));
//       } catch (error) {
//         console.error("Error fetching locations:", error);
//       } finally {
//         setLoadingStates((prev) => ({ ...prev, location: false }));
//       }
//     }
//   };

//   // Form handlers
//   // const handleInputChange = (e) => {
//   //   const { name, value, type, checked } = e.target;
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     [name]: type === "checkbox" ? checked : value,
//   //   }));
//   // };


//   const handleInputChange = (e) => {
 
//     const { name, value, type, checked } = e.target;

//   if (name === "phoneNo") {

//     const cleanedValue = value.replace(/\D/g, '').slice(0, 10);
//     setFormData((prev) => ({
//       ...prev,
//       [name]: cleanedValue,
//     }));
//   } 
//   else
//    {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }
// };


//   const handleFileUpload = (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (type === "resume") {
//       setResume(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     } else if (type === "profile") {
//       setProfileImageFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const triggerFileInput = (type) => {
//     if (type === "resume") {
//       resumeInputRef.current.click();
//     } else {
//       profileInputRef.current.click();
//     }
//   };

//   const handleRemoveFile = (type) => {
//     if (type === "resume") {
//       setResume(null);
//       setPreviewUrl(null);
//     } else {
//       setProfileImageFile(null);
//     }
//   };

//   // Update handleAddExperience
//   const handleAddExperience = () => {
//     const {
//       jobProfile,
//       companyName,
//       jobStartDate,
//       jobEndDate,
//       currentlyworking,
//     } = formData;

//     const newExperience = {
//       id: Date.now(),
//       jobProfile,
//       companyName,
//       jobStartDate,
//       currentlyworking: currentlyworking ? "yes" : "no",
//       jobEndDate: currentlyworking ? null : jobEndDate,
//     };

//     setFormData((prev) => ({
//       ...prev,
//       workExperiences: [...prev.workExperiences, newExperience],
//       // Reset fields
//       jobProfile: "",
//       companyName: "",
//       jobStartDate: "",
//       jobEndDate: "",
//       currentlyworking: false,
//     }));
//   };

//   // handle add projects
//   const handleAddProjects = () => {
//     const {
//       projectTitle,
//       projectLink,
//       jobStartDate,
//       jobEndDate,
//       currentlyworking,
//     } = formData;

//     const newProject = {
//       id: Date.now(),
//       projectTitle,
//       projectLink,
//       projectStartDate: jobStartDate,
//       projectEndDate: currentlyworking ? null : jobEndDate,
//       currentlyworking,
//     };

//     setFormData((prev) => ({
//       ...prev,
//       projects: [...prev.projects, newProject],
//       projectTitle: "",
//       projectLink: "",
//       jobStartDate: "",
//       jobEndDate: "",
//       currentlyworking: false,
//     }));
//   };
//   const handleAddEducation = () => {
//     const {
//       degree,
//       university,
//       courseType,
//       specialization,
//       startDate,
//       endDate,
//     } = formData;

//     const newEducation = {
//       id: Date.now(),
//       degree,
//       university,
//       courseType,
//       specialization,
//       startDate,
//       endDate,
//     };

//     setFormData((prev) => ({
//       ...prev,
//       educationEntries: [...prev.educationEntries, newEducation],
//       degree: "",
//       university: "",
//       courseType: "",
//       specialization: "",
//       startDate: "",
//       endDate: "",
//     }));
//   };

//   const handleRemoveItem = (type, id) => {
//     const updateSessionStorage = (key, updatedArray) => {
//       const authToken = JSON.parse(sessionStorage.getItem("authToken")) || {};
//       authToken.users[key] = updatedArray;
//       sessionStorage.setItem("authToken", JSON.stringify(authToken));
//     };

//     if (type === "experience") {
//       AuthorizationHeader.get(API_ENDPOINTS.DELETEEXPERIENCEDETAILS(user.id, id))
//         .then((response) => {
//           if (response.data.status === 200) {
//             //  setFormData(prev => ({
//             // ...prev,
//             // workExperiences: prev.workExperiences.filter(exp => exp.id !== id)
//             // }));

//             setFormData((prev) => {
//               const updatedExp = prev.workExperiences.filter(
//                 (exp) => exp.id !== id
//               );
//               updateSessionStorage("workExperience", updatedExp);
//               return { ...prev, workExperiences: updatedExp };
//             });

//             Swal.fire({
//               icon: "success",
//               title: "Deleted!",
//               text: response.data.message,
//               confirmButtonColor: "#3085d6",
//             });
//           } else {
//             Swal.fire({
//               icon: "error",
//               title: "Error",
//               text: response.data.message,
//               confirmButtonColor: "#3085d6",
//             });
//           }
//         })
//         .catch((error) => {
//           console.error("Error deleting experience:", error);
//         });
//     } else if (type === "education") {
//       AuthorizationHeader.get(API_ENDPOINTS.DELETEEDUCATIONDETAILS(user.id, id))
//         .then((response) => {
//           if (response.data.status === 200) {
//             //  setFormData(prev => ({
//             //     ...prev,
//             //     educationEntries: prev.educationEntries.filter(edu => edu.id !== id)
//             //   }));

//             setFormData((prev) => {
//               const updatedEdu = prev.educationEntries.filter(
//                 (edu) => edu.id !== id
//               );
//               updateSessionStorage("education", updatedEdu); // sessionStorage key is "education"
//               return { ...prev, educationEntries: updatedEdu };
//             });

//             Swal.fire({
//               icon: "success",
//               title: "Deleted!",
//               text: response.data.message,
//               confirmButtonColor: "#3085d6",
//             });
//           } else {
//             Swal.fire({
//               icon: "error",
//               title: "Error",
//               text: response.data.message,
//               confirmButtonColor: "#3085d6",
//             });
//           }
//         })
//         .catch((error) => {
//           console.error("Error deleting experience:", error);
//         });
//     } else if (type === "project") {
//       AuthorizationHeader.get(API_ENDPOINTS.DELETEPROJECTDETAILS(user.id, id))
//         .then((response) => {
//           if (response.data.status === 200) {
//             // setFormData(prev => ({
//             //   ...prev,
//             //   projects: prev.projects.filter(project => project.id !== id)
//             // }));

//             setFormData((prev) => {
//               const updatedProjects = prev.projects.filter((p) => p.id !== id);
//               updateSessionStorage("project", updatedProjects); // sessionStorage key is "project"
//               return { ...prev, projects: updatedProjects };
//             });

//             Swal.fire({
//               icon: "success",
//               title: "Deleted!",
//               text: response.data.message,
//               confirmButtonColor: "#3085d6",
//             });
//           } else {
//             Swal.fire({
//               icon: "error",
//               title: "Error",
//               text: response.data.message,
//               confirmButtonColor: "#3085d6",
//             });
//           }
//         })
//         .catch((error) => {
//           console.error("Error deleting experience:", error);
//         });
//     }
//   };

//   // Form submission
//   const handleSubmitProfile = async (e) => {

//     if (e?.preventDefault) e.preventDefault();

//     setLoading(true);

//     try {

//       if (formData.phoneNo.length !== 10) {
//       toast.error("Phone number must be exactly 10 digits");
//       setLoading(false);
//       return;
//     }

//       const profileFormData = new FormData();
//       const resumeFormData = new FormData();

//       const currentSkills =
//         formData.skills.length > 0
//           ? formData.skills
//           : user?.skills?.map((skill) =>
//               typeof skill === "string" ? { name: skill } : skill
//             ) || [];

//       const payload = {
//         // Personal Information
//         fullName: formData.fullName,
//         email: formData.email,
//         phoneNo: formData.phoneNo,
//         location: formData.location,
//         gender: formData.gender,
//         maxsalary: formData.maxsalary,
//         minsalary: formData.minsalary,
//         aboutMe: formData.aboutMe,
//         userCategory: formData.userCategory,
//         experiencePeriod: formData.experiencePeriod,
//         noticePeriod: formData.noticePeriod,

//         // Collections

//         skills: currentSkills.map((skill) => skill.name).filter(Boolean),

//         // Work Experiences

//         // In your handleSubmitProfile function:
//         workExperience: formData.workExperiences.map((exp) => ({
//           jobProfile: exp.jobProfile,
//           companyName: exp.companyName,
//           jobStartDate: exp.jobStartDate,
//           // Only send end date if not currently working
//           ...(exp.currentlyworking === "yes"
//             ? { currentlyworking: "yes" }
//             : { jobEndDate: exp.jobEndDate }),
//         })),

//         // Projects
//         project: formData.projects.map((proj) => ({
//           projectTitle: proj.projectTitle,
//           projectLink: proj.projectLink,
//           projectStartDate: proj.projectStartDate,
//           projectEndDate: proj.projectEndDate,
//         })),

//         // Education
//         education: formData.educationEntries.map((edu) => ({
//           degree: edu.degree,
//           specialization: edu.specialization,
//           university: edu.university,
//           startDate: edu.startDate,
//           endDate: edu.endDate,
//           courseType: edu.courseType,
//         })),
//       };

//       const requests = [AuthorizationHeader.post(API_ENDPOINTS.UPDATEPROFILE, payload)];

//       if (profileImageFile) {
//         profileFormData.append("file", profileImageFile);
//         profileFormData.append("email", formData.email);
//         requests.push(
//           AuthorizationHeader.post(API_ENDPOINTS.UPDATEPROFILEIMAGE, profileFormData, {
//             headers: { "Content-Type": "multipart/form-data" },
//           })
//         );
//       }

//       if (resume) {
//         resumeFormData.append("file", resume);
//         resumeFormData.append("email", formData.email);
//         requests.push(
//           AuthorizationHeader.post(API_ENDPOINTS.UPLOADRESUME, resumeFormData, {
//             headers: { "Content-Type": "multipart/form-data" },
//           })
//         );
//       }

//       // Execute all requests in parallel
//       await Promise.all(requests);

//       // Update session storage
//       // const updatedUser = {
//       //   ...user,
//       //   ...formData,
//       //   profileImage: profileImageFile
//       //     ? URL.createObjectURL(profileImageFile)
//       //     : user.profileImage,
//       //   resume: resume ? resume.name : user.resume,
//       //   skills:
//       //     formData.skills
//       //       ?.map((skill) => skill?.name || "")
//       //       .filter((name) => name) || [],
//       // };
//       // sessionStorage.setItem(
//       //   "authToken",
//       //   JSON.stringify({ users: updatedUser })
//       // );



//       // ✅ Update sessionStorage dynamically
//         const authData = sessionStorage.getItem("authToken");
//         if (authData) {
//           const parsed = JSON.parse(authData);
//           const updatedUser = {
//             ...parsed.users,
//             ...payload,
//             profileImage: profileImageFile
//               ? URL.createObjectURL(profileImageFile)
//               : parsed.users.profileImage,
//             resume: resume ? resume.name : parsed.users.resume,
//           };

//           sessionStorage.setItem(
//             "authToken",
//             JSON.stringify({ ...parsed, users: updatedUser })
//           );
//         }

//       navigate("/Profile");

//       Swal.fire({
//         icon: "success",
//         title: "Profile Updated!",
//         text: "Your profile has been successfully updated.",
//         showConfirmButton: false,
//         timer: 2000,
//         confirmButtonColor: "#3085d6",
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Update Failed",
//         text: error.response?.data?.message || error.message,
//         confirmButtonColor: "#3085d6",
//       });
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step navigation
//   const nextStep = () => step < steps.length && setStep(step + 1);
//   const prevStep = () => step > 1 && setStep(step - 1);

//   const Cancel = () =>{
//     navigate("/profile-dashboard")
//   }

//   // Step indicator component
//  const renderStepIndicator = () => (
//     <div className="flex  sm:flex-row justify-center items-center mb-4 sm:mb-8 static top-20 left-0 right-0 sm:left-auto sm:right-auto z-50 p-2 sm:p-0 shadow-none">
//       {steps.map((s, index) => (
//         <div key={s.id} className="flex items-center sm:flex-row flex-col">
//           <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-[#111] font-bold text-sm sm:text-base transition-all duration-300 mx-1 sm:mx-2">
//             Step
//           </div>
//           <div
//             className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-white font-bold text-sm sm:text-base transition-all duration-300 ${
//               step >= s.id ? "bg-[#05A3E5]" : "bg-gray-300"
//             }`}
//           >
//             {s.id}
//           </div>
//           {index !== steps.length - 1 && (
//             <div className="w-4 h-px sm:w-6 sm:h-px bg-gray-400 mx-1 sm:mx-2"></div>
//           )}
//         </div>
//       ))}
//     </div>
//   );

//   // Step components
//   const renderStep1 = () => (
//     <div className="mt-12 sm:mt-4 mb-6 flex items-center justify-center">
//       <div className="w-full max-w-3xl bg-white p-4 sm:p-6 rounded-lg shadow-md">
//         <h2 className="mb-4 text-xl sm:text-2xl font-bold flex items-center">
//           <FontAwesomeIcon className="pro-icon mr-2 text-lg sm:text-xl" icon={faFileAlt} />
//           Upload Your CV
//         </h2>
//         <div className="resume-container">
//           <div className="resume-actions mb-4">
//             <input
//               ref={resumeInputRef}
//               type="file"
//               accept=".pdf,.jpg,.jpeg,.png"
//               style={{ display: "none" }}
//               onChange={(e) => handleFileUpload(e, "resume")}
//             />
//             {!resume ? (
//               <button
//                 onClick={() => triggerFileInput("resume")}
//                 className="action-btn upload-btn bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto hover:bg-blue-600 transition-colors"
//               >
//                 <FontAwesomeIcon icon={faUpload} className="mr-2" /> Upload Resume
//               </button>
//             ) : (
//               <div className="button-group flex flex-col sm:flex-row gap-2">
//                 <button
//                   onClick={() => triggerFileInput("resume")}
//                   className="icon-btn update-btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
//                 >
//                   <FontAwesomeIcon icon={faEdit} className="mr-2" />
//                   <span className="tooltip-text">Update</span>
//                 </button>
//                 <button
//                   onClick={() => handleRemoveFile("resume")}
//                   className="icon-btn delete-btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
//                 >
//                   <FontAwesomeIcon icon={faTrash} className="mr-2" />
//                   <span className="tooltip-text">Delete</span>
//                 </button>
//                 <a
//                   href={previewUrl}
//                   download={resume.name}
//                   className="icon-btn download-btn bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
//                 >
//                   <FontAwesomeIcon icon={faDownload} className="mr-2" />
//                   <span className="tooltip-text">Download</span>
//                 </a>
//               </div>
//             )}
//           </div>
//           {(previewUrl || dynamicImageResume.dynamicResume) && (
//             <div className="resume-preview mt-4">
//               <p className="text-sm font-medium mb-2">Preview:</p>
//               {previewUrl ? (
//                 resume?.type?.startsWith("image/") ? (
//                   <img src={previewUrl} alt="Resume Preview" className="w-full h-auto max-h-64 object-contain rounded-md border" />
//                 ) : (
//                   <iframe
//                     src={previewUrl ? previewUrl : "No Preview"}
//                     width="100%"
//                     height="200px"
//                     title="Resume Preview"
//                     className="border rounded-md"
//                   ></iframe>
//                 )
//               ) : (
//                 <iframe
//                   src={API_ENDPOINTS.FETCHRESUME(dynamicImageResume.dynamicResume) || "No Resume Upload"}
//                   width="100%"
//                   height="200px"
//                   title="Resume Preview"
//                   className="border rounded-md"
//                 ></iframe>
//               )}
//             </div>
//           )}
//           <button
//             onClick={nextStep}
//             className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full sm:w-auto float-right hover:bg-blue-600 transition-colors"
//           >
//             Next →
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderStep2 = () => (
//     <div className="mt-12 sm:mt-4 flex items-center justify-center">
//       <div className="w-full max-w-3xl bg-white p-4 sm:p-6 rounded-lg shadow-md">
//         <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center">
//           <FontAwesomeIcon className="pro-icon mr-2 text-lg sm:text-xl" icon={faUser} /> Personal Details
//         </h2>
//         <div className="grid grid-cols-1 gap-4">
//           <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
//             <div className="w-full sm:w-3/4">
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleInputChange}
//                 className="mt-1 w-full p-2 border rounded-md"
//                 placeholder="Your Name"
//               />
//               <textarea
//                 name="aboutMe"
//                 value={formData.aboutMe}
//                 onChange={handleInputChange}
//                 className="mt-2 w-full p-2 border rounded-md"
//                 placeholder="About you (skills, experience, background)"
//                 rows="4"
//               />
//             </div>
//             <div className="profile-upload flex justify-center">
//               <input
//                 ref={profileInputRef}
//                 type="file"
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 onChange={(e) => handleFileUpload(e, "profile")}
//               />
//               <div
//                 className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden flex items-center justify-center cursor-pointer border-4 border-gray-300"
//                 onMouseEnter={() => setHover(true)}
//                 onMouseLeave={() => setHover(false)}
//                 onClick={() => triggerFileInput("profile")}
//               >
//                 {/* <img
//                   src={
//                     profileImageFile instanceof File
//                       ? URL.createObjectURL(profileImageFile)
//                       : profileImageFile || API_ENDPOINTS.FETCHIMAGE(profileImage)
//                   }
//                   className="w-full h-full object-cover"
//                   alt="Profile"
//                 /> */}

//                 <img
//                   src={
//                     profileImageFile instanceof File
//                       ? URL.createObjectURL(profileImageFile)
//                       : profileImageFile || API_ENDPOINTS.FETCHIMAGE(dynamicImageResume.dynamicImage || "")
//                   }
//                   className="w-full h-full object-cover"
//                   alt="Profile"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md"
//               placeholder="Email"
//               readOnly
//             />
//             <input
//               type="tel"
//               name="phoneNo"
//               value={formData.phoneNo}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md"
//               placeholder="Phone Number"
//               maxLength={10}
//               pattern="\d{10}"
//               required
//             />
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={(e) => handleLocationSearch(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//                 placeholder="Location (City)"
//               />
//               {loadingStates.location && (
//                 <div className="absolute top-10 right-2 text-sm text-gray-500">Loading...</div>
//               )}
//               {dropdownOptions.locations.length > 0 && (
//                 <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto rounded-md shadow-sm">
//                   {dropdownOptions.locations.map((city, index) => (
//                     <li
//                       key={index}
//                       onClick={() => {
//                         setFormData((prev) => ({ ...prev, location: city }));
//                         setDropdownOptions((prev) => ({ ...prev, locations: [] }));
//                       }}
//                       className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
//                     >
//                       {city}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleInputChange}
//               className={`w-full p-2 border rounded-md ${formData.gender === "" ? "text-gray-500" : "text-black"}`}
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//               <option value="prefer_not_to_say">Prefer Not to Say</option>
//             </select>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <select
//               name="minsalary"
//               value={formData.minsalary}
//               onChange={handleInputChange}
//               className={`w-full p-2 border rounded-md ${formData.minsalary === "" ? "text-gray-500" : "text-black"}`}
//             >
//               <option value="">Min Salary (LPA)</option>
//               {dropdownOptions.salaryRanges.map((salary, index) => (
//                 <option key={index} value={salary}>
//                   {salary} {salary === "25+" ? "" : "LPA"}
//                 </option>
//               ))}
//             </select>
//             <select
//               name="maxsalary"
//               value={formData.maxsalary}
//               onChange={handleInputChange}
//               className={`w-full p-2 border rounded-md ${formData.maxsalary === "" ? "text-gray-500" : "text-black"}`}
//             >
//               <option value="">Max Salary (LPA)</option>
//               {dropdownOptions.salaryRanges.map((salary, index) => (
//                 <option key={index} value={salary}>
//                   {salary} {salary === "25+" ? "" : "LPA"}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block mb-2 font-medium text-sm">User Category</label>
//             <select
//               name="userCategory"
//               value={formData.userCategory || ""}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md"
//             >
//               <option value="">Select Category</option>
//               <option value="fresher">Fresher</option>
//               <option value="experienced">Experienced</option>
//             </select>
//           </div>
//           {formData.userCategory === "experienced" && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-2 font-medium text-sm">Years of Experience</label>
//                 <input
//                   type="number"
//                   name="experiencePeriod"
//                   value={formData.experiencePeriod || ""}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                   placeholder="e.g., 3"
//                   min="0"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2 font-medium text-sm">Notice Period</label>
//                 <select
//                   name="noticePeriod"
//                   value={formData.noticePeriod || ""}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 >
//                   <option value="">Select Notice Period</option>
//                   {dropdownOptions.noticePeriods.map((period, index) => (
//                     <option key={index} value={period}>{period}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="flex flex-col sm:flex-row justify-between mt-6 gap-2">
//           <div className="flex flex-col sm:flex-row gap-2">
//             <button
//               onClick={prevStep}
//               className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
//             >
//               ← Back
//             </button>
//             <button
//               onClick={Cancel}
//               className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-red-600 transition-colors"
//             >
//               ❌ Cancel
//             </button>
//           </div>
//           <button
//             onClick={nextStep}
//             className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
//           >
//             Next →
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderStep3 = () => {
//     const isExperienced = formData.userCategory === "experienced";
//     const entries = isExperienced
//       ? formData.workExperiences
//       : formData.projects;

//     return (
//        <div className="mt-12 sm:mt-4 flex items-center justify-center">
//         <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4 sm:p-6">
//           <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center">
//             <FontAwesomeIcon className="pro-icon mr-2 text-lg sm:text-xl" icon={faBriefcase} />
//             {isExperienced ? "Work Experience" : "Projects"}
//           </h2>
//           <div className="grid grid-cols-1 gap-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   {isExperienced ? "Job Title" : "Project Title"}
//                 </label>
//                 <input
//                   type="text"
//                   name={isExperienced ? "jobProfile" : "projectTitle"}
//                   value={isExperienced ? formData.jobProfile : formData.projectTitle}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                   placeholder={isExperienced ? "Job Title" : "Project Title"}
//                 />
//               </div>
//               {!isExperienced && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Project Link</label>
//                   <input
//                     type="text"
//                     name="projectLink"
//                     value={formData.projectLink}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                     placeholder="Project Link"
//                   />
//                 </div>
//               )}
//               {isExperienced && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Company Name</label>
//                   <input
//                     type="text"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                     placeholder="Company Name"
//                   />
//                 </div>
//               )}
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   {isExperienced ? "Start Date" : "Project Date"}
//                 </label>
//                 <input
//                   type="date"
//                   name="jobStartDate"
//                   value={formData.jobStartDate}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>
//               {(!isExperienced || !formData.currentlyworking) && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">End Date</label>
//                   <input
//                     type="date"
//                     name="jobEndDate"
//                     value={formData.jobEndDate}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                   />
//                 </div>
//               )}
//             </div>
//             {isExperienced && (
//               <div className="mb-2 flex items-center">
//                 <input
//                   type="checkbox"
//                   name="currentlyworking"
//                   checked={formData.currentlyworking}
//                   onChange={handleInputChange}
//                   className="mr-2"
//                   id="currentlyWorking"
//                 />
//                 <label htmlFor="currentlyWorking" className="text-sm font-medium">
//                   Currently Working Here
//                 </label>
//               </div>
//             )}
//             <button
//               onClick={() => {
//                 if (isExperienced) {
//                   if (!formData.companyName || !formData.jobStartDate || !formData.jobProfile) {
//                     Swal.fire("Error", "Please fill all experience fields", "error");
//                     return;
//                   }
//                   handleAddExperience();
//                 } else {
//                   if (!formData.projectTitle || !formData.projectLink) {
//                     Swal.fire("Error", "Please fill all project fields", "error");
//                     return;
//                   }
//                   handleAddProjects();
//                 }
//               }}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full sm:w-auto hover:bg-blue-600 transition-colors"
//             >
//               {isExperienced ? "Add Experience" : "Add Project"}
//             </button>
//           </div>
//           <div className="mt-6">
//             <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
//               Your {isExperienced ? "Experiences" : "Projects"}
//             </h3>
//             {entries.length > 0 ? (
//               entries.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex flex-col sm:flex-row justify-between gap-4 border border-gray-300 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 mb-4 rounded-xl"
//                 >
//                   <div className="flex-1">
//                     {isExperienced ? (
//                       <>
//                         <p className="text-lg font-semibold text-indigo-600 mb-2">
//                           {item.companyName}
//                         </p>
//                         <ul className="mt-2 space-y-1 text-gray-600 text-sm">
//                           <li>{item.jobProfile}</li>
//                           <li>
//                             📅 {item.jobStartDate} -{" "}
//                             {item.jobEndDate && item.jobEndDate.trim() !== "" ? item.jobEndDate : "Currently working"}
//                           </li>
//                         </ul>
//                       </>
//                     ) : (
//                       <>
//                         <p className="text-lg font-semibold text-indigo-600 mb-2">
//                           {item.projectTitle}
//                         </p>
//                         <ul className="mt-2 space-y-1 text-gray-600 text-sm">
//                           {item.projectLink && (
//                             <li>
//                               <a
//                                 href={item.projectLink}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-600 hover:underline break-words"
//                               >
//                                 🔗 {item.projectLink}
//                               </a>
//                             </li>
//                           )}
//                           <li>
//                             📅 {item.projectStartDate} - {item.projectEndDate}
//                           </li>
//                         </ul>
//                       </>
//                     )}
//                   </div>
//                   <button
//                     onClick={() => handleRemoveItem(isExperienced ? "experience" : "project", item.id)}
//                     className="self-start sm:self-center text-red-500 hover:text-red-700 text-lg transition-colors duration-200"
//                     title="Remove"
//                   >
//                     ✖
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-sm italic">
//                 No {isExperienced ? "experiences" : "projects"} added yet.
//               </p>
//             )}
//           </div>
//           <div className="flex flex-col sm:flex-row justify-between mt-6 gap-2">
//             <div className="flex flex-col sm:flex-row gap-2">
//               <button
//                 onClick={() => {
//                   if (entries.length === 0) {
//                     const confirmBack = window.confirm(
//                       `You haven't added any ${isExperienced ? "experience" : "project"}. Are you sure you want to go back?`
//                     );
//                     if (confirmBack) prevStep();
//                   } else {
//                     prevStep();
//                   }
//                 }}
//                 className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
//               >
//                 ← Back
//               </button>
//               <button
//                 onClick={Cancel}
//                 className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-red-600 transition-colors"
//               >
//                 ❌ Cancel
//               </button>
//             </div>
//             <button
//               onClick={() => {
//                 if (entries.length === 0) {
//                   const confirmNext = window.confirm(
//                     `You haven't added any ${isExperienced ? "experience" : "project"}. Are you sure you want to proceed?`
//                   );
//                   if (confirmNext) nextStep();
//                 } else {
//                   nextStep();
//                 }
//               }}
//               className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
//               >
//                 Next →
//               </button>
//             </div>
//           </div>
//         </div>
//     );
//   };

//   const renderStep4 = () => (
//         <div className="mt-12 sm:mt-4 flex items-center justify-center">
//           <div className="w-full max-w-3xl bg-white p-4 sm:p-6 rounded-lg shadow-md">
//             <h2 className="mb-4 text-xl sm:text-2xl font-bold flex items-center">
//               <FontAwesomeIcon className="pro-icon mr-2 text-lg sm:text-xl" icon={faTools} />
//               Skills
//             </h2>
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Skills</label>
//               <div className="relative">
//                 <Multiselect
//                   options={(dropdownOptions.skills || []).filter((item) => item && item.name)}
//                   selectedValues={(formattedSkills || []).filter((item) => item && item.name)}
//                   onSelect={(selectedList) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       skills: selectedList.map((item) =>
//                         typeof item === "string" ? { name: item } : item
//                       ),
//                     }));
//                   }}
//                   onRemove={(selectedList) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       skills: selectedList.map((item) =>
//                         typeof item === "string" ? { name: item } : item
//                       ),
//                     }));
//                   }}
//                   displayValue="name"
//                   placeholder="Select skills"
//                   loading={loadingStates.skills}
//                   emptyRecordMsg="No skills found"
//                   style={{
//                     chips: { background: "#05A3E5" },
//                     searchBox: {
//                       border: "1px solid #d1d5db",
//                       borderRadius: "0.375rem",
//                       padding: "0.5rem",
//                     },
//                     optionContainer: { border: "1px solid #d1d5db" },
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row justify-between gap-2">
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <button
//                   onClick={prevStep}
//                   className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
//                 >
//                   ← Back
//                 </button>
//                 <button
//                   onClick={Cancel}
//                   className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-red-600 transition-colors"
//                 >
//                   ❌ Cancel
//                 </button>
//               </div>
//               <button
//                 onClick={() => {
//                   if (formData.skills.length === 0) {
//                     Swal.fire({
//                       icon: "question",
//                       title: "No Skills Selected",
//                       text: "Are you sure you want to proceed without selecting any skills?",
//                       showCancelButton: true,
//                       confirmButtonText: "Yes, Proceed",
//                       cancelButtonText: "Cancel",
//                       customClass: {
//                         confirmButton: "bg-blue-500 text-white px-4 py-2 rounded",
//                         cancelButton: "bg-gray-300 text-black px-4 py-2 rounded",
//                       },
//                     }).then((result) => {
//                       if (result.isConfirmed) {
//                         nextStep();
//                       }
//                     });
//                   } else {
//                     nextStep();
//                   }
//                 }}
//                 className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
//               >
//                 Next →
//               </button>
//             </div>
//           </div>
//         </div>
//       );
    
//       const renderStep5 = () => (
//         <div className="mt-12 sm:mt-4 flex items-center justify-center">
//           <div className="w-full max-w-3xl bg-white p-4 sm:p-6 rounded-lg shadow-md">
//             <h2 className="mb-4 text-xl sm:text-2xl font-bold flex items-center">
//               <FontAwesomeIcon className="pro-icon mr-2 text-lg sm:text-xl" icon={faGraduationCap} />
//               Education
//             </h2>
//             <div className="w-full">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Degree</label>
//                   <select
//                     name="degree"
//                     value={formData.degree}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                   >
//                     <option value="">Select Degree</option>
//                     {dropdownOptions.qualifications.map((degree, index) => (
//                       <option key={index} value={degree}>{degree}</option>
//                     ))}
//                   </select>
//                 </div>
//                 {formData.degree && (
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Course Type</label>
//                     <select
//                       name="courseType"
//                       value={formData.courseType}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border rounded-md"
//                     >
//                       <option value="">Select Course Type</option>
//                       {dropdownOptions.courseTypes.map((type, index) => (
//                         <option key={index} value={type}>{type}</option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//                 {formData.courseType && (
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Specialization</label>
//                     <select
//                       name="specialization"
//                       value={formData.specialization}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border rounded-md"
//                     >
//                       <option value="">Select Specialization</option>
//                       {dropdownOptions.specializations.map((spec, index) => (
//                         <option key={index} value={spec}>{spec}</option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//                 {formData.specialization && (
//                   <div>
//                     <label className="block text-sm font-medium mb-1">University</label>
//                     <select
//                       name="university"
//                       value={formData.university}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border rounded-md"
//                     >
//                       <option value="">Select University</option>
//                       {dropdownOptions.universities.map((univ, index) => (
//                         <option key={index} value={univ}>{univ}</option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//                 {formData.university && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Start Date</label>
//                       <input
//                         type="date"
//                         name="startDate"
//                         value={formData.startDate}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border rounded-md"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">End Date</label>
//                       <input
//                         type="date"
//                         name="endDate"
//                         value={formData.endDate}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border rounded-md"
//                       />
//                     </div>
//                   </>
//                 )}
//               </div>
//               {formData.educationEntries && (
//                 <button
//                   onClick={() => {
//                     if (
//                       !formData.degree ||
//                       !formData.specialization ||
//                       !formData.university ||
//                       !formData.courseType ||
//                       !formData.startDate ||
//                       !formData.endDate
//                     ) {
//                       Swal.fire("Error", "Please fill all education fields before adding a new one", "error");
//                       return;
//                     }
//                     handleAddEducation();
//                   }}
//                   className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full sm:w-auto hover:bg-blue-600 transition-colors"
//                 >
//                   Add Education
//                 </button>
//               )}
//               <div className="mt-6">
//                 <h3 className="text-lg sm:text-xl font-semibold mb-2">Your Education</h3>
//                 {formData.educationEntries.length > 0 ? (
//                   formData.educationEntries.map((entry) => (
//                     <div
//                       key={entry.id}
//                       className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 bg-white shadow-sm p-4 mb-4 rounded-lg hover:shadow-md transition-shadow"
//                     >
//                       <div className="flex-1">
//                         <p className="text-md font-bold text-gray-900">{entry.degree}</p>
//                         <p className="text-sm font-semibold text-gray-800">{entry.specialization}</p>
//                         <ul className="mt-2 space-y-1 text-gray-600 text-sm">
//                           <li>🏫 {entry.university}</li>
//                           <li>📅 {entry.startDate} - {entry.endDate}</li>
//                         </ul>
//                       </div>
//                       <button
//                         onClick={() => handleRemoveItem("education", entry.id)}
//                         className="self-start sm:self-center text-red-500 hover:text-red-700 text-lg transition-colors mt-2 sm:mt-0"
//                       >
//                         ✖
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500 text-sm">No education entries added yet</p>
//                 )}
//               </div>
//               <div className="flex flex-col sm:flex-row justify-between mt-6 gap-2">
//                 <div className="flex flex-col sm:flex-row gap-2">
//                   <button
//                     onClick={() => {
//                       if (formData.educationEntries.length === 0) {
//                         const confirmBack = window.confirm(
//                           "You haven't added any education. Are you sure you want to go back?"
//                         );
//                         if (confirmBack) prevStep();
//                       } else {
//                         prevStep();
//                       }
//                     }}
//                     className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
//                   >
//                     ← Back
//                   </button>
//                   <button
//                     onClick={Cancel}
//                     className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-red-600 transition-colors"
//                   >
//                     ❌ Cancel
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => {
//                     if (formData.educationEntries.length === 0) {
//                       Swal.fire({
//                         icon: "warning",
//                         title: "Education Required",
//                         text: "Please add at least one education entry before submitting your profile.",
//                         confirmButtonColor: "#3085d6",
//                       });
//                     } else {
//                       handleSubmitProfile();
//                     }
//                   }}
//                   className="bg-blue-500 text-white px-6 py-2 rounded-md w-full sm:w-auto hover:bg-blue-600 transition-colors"
//                 >
//                   Submit Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       );

//   return (
//     <>
//       {/* Background Blur when Loading */}
//       {loading && (
//         <div
//           className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
//           style={{
//             backdropFilter: "blur(3px)",
//             background: "rgba(255, 255, 255, 0.1)",
//             zIndex: 3,
//           }}
//         >
//           <Spinner
//             animation="border"
//             variant="primary"
//             style={{ width: "3rem", height: "3rem" }}
//           />
//         </div>
//       )}

//       <UnifiedHeader />
//       <div className="profile-banner">
//         <Container>
//           <Row className="align-items-center">
//             <Col md={12}>
//               <div className="mt-3 text-center">
//                 <h2 className="text-3xl font-bold mb-2">
//                   Fill <span>Your</span> Profile
//                 </h2>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       <div className="profile">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="form justify-center relative">
//                 {renderStepIndicator()}
//                 {step === 1 && renderStep1()}
//                 {step === 2 && renderStep2()}
//                 {step === 3 && renderStep3()}
//                 {step === 4 && renderStep4()}
//                 {step === 5 && renderStep5()}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />

//       <ToastContainer autoClose={2000} />
//     </>
//   );
// };

// export default Fillprofile;





























/****************************************************************Proper Working *****************************************************/












import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UnifiedHeader from "../../components/header/UnifiedHeader";
import Footer from "../../components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Multiselect from "multiselect-react-dropdown";
import {
  faBriefcase,
  faGraduationCap,
  faTools,
  faUser,
  faFileAlt,
  faTrashAlt,
  faUpload,
  faEdit,
  faTrash,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../apiConfig.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "@/router-dom";
import AuthorizationHeader from "../AuthorizationHeader.jsx";
import { toast, ToastContainer } from "react-toastify";

const Fillprofile = () => {
  // Initial data setup
  const authData = sessionStorage.getItem("authToken");
  const user = authData ? JSON.parse(authData).users : null;
  const profileImage = user?.profileImage || null;

  const navigate = useNavigate();

  const steps = [
    { id: 1, title: "Upload CV" },
    { id: 2, title: "Personal Details" },
    { id: 3, title: "Experience/Projects" },
    { id: 4, title: "Skills" },
    { id: 5, title: "Education" },
  ];

  // State management
  const [step, setStep] = useState(1);
  const [hover, setHover] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    location: false,
    skills: false,
    qualifications: false,
    universities: false,
  });

  const [dynamicImageResume, setDynamicImageResume] = useState({
    dynamicImage: "",
    dynamicResume: "",
  });


  const [deleteLoading, setDeleteLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNo: user?.phoneNo || "",
    location: user?.location || "",
    gender: user?.gender || "",
    maxsalary: user?.maxsalary || "",
    minsalary: user?.minsalary || "",
    aboutMe: user?.aboutMe || "",
    userCategory: user?.userCategory || "",
    experiencePeriod: user?.experiencePeriod || "",
    noticePeriod: user?.noticePeriod || "",
    skills: user?.skills
      ? user.skills.map((skill) =>
          typeof skill === "string" ? { name: skill } : skill
        )
      : [],
    // For Project
    projectTitle: "",
    projectLink: "",
    projectStartDate: "",
    projectEndDate: "",
    projects: user?.project || [],

    // For Experience
    jobProfile: "",
    companyName: "",
    jobStartDate: "",
    jobEndDate: "",
    currentlyworking: user?.currentlyWorking || false,
    workExperiences: user?.workExperience || [],

    //for education
    degree: "",
    university: "",
    courseType: "",
    specialization: "",
    startDate: "",
    endDate: "",
    educationEntries: user?.education || [],
  });

  // For Dynamic Fetching Images, Education, Projects, and Work Experience
  useEffect(() => {
    const fetchPortalsData = async () => {
      if (!user?.email || !user?.id) {
        toast.error("User information missing. Please log in again.");
        return;
      }

      try {
        // Fetch profile image and resume
        const [imageResumeRes, educationRes, projectsRes, workExperienceRes] =
          await Promise.all([
            AuthorizationHeader.get(API_ENDPOINTS.FETCHDATAFORUSERSPORTAL, {
              params: { email: user?.email },
            }),
            AuthorizationHeader.get(API_ENDPOINTS.FETCHUSERPORTALEDUCATION, {
              params: { id: user?.id },
            }),
            AuthorizationHeader.get(API_ENDPOINTS.FETCHUSERPORTALPROJECTS, {
              params: { id: user?.id },
            }),
            AuthorizationHeader.get(API_ENDPOINTS.FETCHUSERPORTALEXPERIENCE, {
              params: { id: user?.id },
            }),
          ]);

        // Update dynamicImageResume
        if (imageResumeRes.data.status === 200) {
              setDynamicImageResume(prev => ({
              ...prev,
              dynamicImage: imageResumeRes.data.data.profileImage || "",
              dynamicResume: imageResumeRes.data.data.resume || "",
            }));
        }

        // Update formData with education, projects, and work experience
        setFormData((prev) => ({
          ...prev,
          educationEntries:
            educationRes.data.status === 200 && Array.isArray(educationRes.data.data)
              ? educationRes.data.data
              : prev.educationEntries,
            projects:
            projectsRes.data.status === 200 && Array.isArray(projectsRes.data.data)
              ? projectsRes.data.data
              : prev.projects,
          workExperiences:
            workExperienceRes.data.status === 200 &&
            Array.isArray(workExperienceRes.data.data)
              ? workExperienceRes.data.data
              : prev.workExperiences,
        }));
      } catch (error) {
        console.log("Data Not Found", error);
        toast.error("Failed to fetch profile data. Please try again.");
      }
    };

    fetchPortalsData();
  }, [user?.email, user?.id]);

  // File upload states
  const [resume, setResume] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Refs
  const resumeInputRef = useRef(null);
  const profileInputRef = useRef(null);

  // Dropdown options
  const [dropdownOptions, setDropdownOptions] = useState({
    locations: [],
    skills: [],
    qualifications: [],
    universities: [],
    specializations: [
      "Computer Science",
      "Mechanical Engineering",
      "Civil Engineering",
      "Electrical Engineering",
      "Data Science",
      "Artificial Intelligence",
      "Cybersecurity",
      "Business Administration",
      "Finance",
      "Marketing",
      "Graphic Design",
      "Law",
      "Psychology",
      "Medicine",
      "Architecture",
      "Economics",
      "Environmental Science",
      "Education",
      "Philosophy",
      "Political Science",
    ],
    courseTypes: [
      "Full-Time",
      "Part-Time",
      "Online",
      "Distance Learning",
      "Certification",
      "Diploma",
    ],
    noticePeriods: [
      "15 days",
      "1 month",
      "2 months",
      "3 months",
      "More than 3 months",
      "Currently Serving Notice Period",
    ],
    salaryRanges: Array.from({ length: 26 }, (_, i) =>
      i === 0 ? "0" : i === 25 ? "25+" : i.toString()
    ),
  });

  // Format skills for multiselect
  const formattedSkills = formData.skills.map((skill) =>
    typeof skill === "string" ? { name: skill } : skill
  );

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Fetch dropdown data on mount
  useEffect(() => {
    fetchDropdownData();
  }, []);

  // Data fetching functions
  const fetchDropdownData = async () => {
    try {
      // Skills
      setLoadingStates((prev) => ({ ...prev, skills: true }));
      const skillsRes = await axios.get(API_ENDPOINTS.FETCH_SKILLS);
      const processedSkills = skillsRes.data.data.map((item) => ({
        name: item.Skills.trim().replace(/\s*Jobs\s*$/gi, ""),
      }));
      setDropdownOptions((prev) => ({ ...prev, skills: processedSkills }));

      // Qualifications
      setLoadingStates((prev) => ({ ...prev, qualifications: true }));
      const qualRes = await AuthorizationHeader.get(
        API_ENDPOINTS.FETCH_QUALIFICATIONS
      );
      const qualifications = qualRes.data.data.map((q) =>
        q.qualification_name.trim()
      );
      setDropdownOptions((prev) => ({ ...prev, qualifications }));

      // Universities
      setLoadingStates((prev) => ({ ...prev, universities: true }));
      const univRes = await AuthorizationHeader.get(
        API_ENDPOINTS.FETCHALLUNIVERSITIES
      );

      const universities = [...new Set(univRes.data.map((u) => u.name.trim()))].sort();
      setDropdownOptions((prev) => ({ ...prev, universities }));
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    } finally {
      setLoadingStates({
        skills: false,
        qualifications: false,
        universities: false,
        location: false,
      });
    }
  };

  const handleLocationSearch = async (value) => {
    setFormData((prev) => ({ ...prev, location: value }));

    if (value.length > 2) {
      setLoadingStates((prev) => ({ ...prev, location: true }));
      try {
        const res = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            country: "India",
          }
        );
        const filtered = res.data.data.filter((city) =>
          city.toLowerCase().includes(value.toLowerCase())
        );
        setDropdownOptions((prev) => ({ ...prev, locations: filtered }));
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoadingStates((prev) => ({ ...prev, location: false }));
      }
    }
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "phoneNo") {
      const cleanedValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        [name]: cleanedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "resume") {
      setResume(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else if (type === "profile") {
      setProfileImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = (type) => {
    if (type === "resume") {
      resumeInputRef.current.click();
    } else {
      profileInputRef.current.click();
    }
  };

  const handleRemoveFile = (type) => {
    if (type === "resume") {
      setResume(null);
      setPreviewUrl(null);
    } else {
      setProfileImageFile(null);
    }
  };

  // Update handleAddExperience
  const handleAddExperience = () => {
    const {
      jobProfile,
      companyName,
      jobStartDate,
      jobEndDate,
      currentlyworking,
    } = formData;

    const newExperience = {
      id: Date.now(),
      jobProfile,
      companyName,
      jobStartDate,
      currentlyworking: currentlyworking ? "yes" : "no",
      jobEndDate: currentlyworking ? null : jobEndDate,
    };

    setFormData((prev) => ({
      ...prev,
      workExperiences: [...prev.workExperiences, newExperience],
      // Reset fields
      jobProfile: "",
      companyName: "",
      jobStartDate: "",
      jobEndDate: "",
      currentlyworking: false,
    }));
  };

  // handle add projects
  const handleAddProjects = () => {
    const {
      projectTitle,
      projectLink,
      jobStartDate,
      jobEndDate,
      currentlyworking,
    } = formData;

    const newProject = {
      id: Date.now(),
      projectTitle,
      projectLink,
      projectStartDate: jobStartDate,
      projectEndDate: currentlyworking ? null : jobEndDate,
      currentlyworking,
    };

    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
      projectTitle: "",
      projectLink: "",
      jobStartDate: "",
      jobEndDate: "",
      currentlyworking: false,
    }));
  };

  const handleAddEducation = () => {
    const {
      degree,
      university,
      courseType,
      specialization,
      startDate,
      endDate,
    } = formData;

    const newEducation = {
      id: Date.now(),
      degree,
      university,
      courseType,
      specialization,
      startDate,
      endDate,
    };

    setFormData((prev) => ({
      ...prev,
      educationEntries: [...prev.educationEntries, newEducation],
      degree: "",
      university: "",
      courseType: "",
      specialization: "",
      startDate: "",
      endDate: "",
    }));
  };

  const handleRemoveItem = (type, id) => {
    const updateSessionStorage = (key, updatedArray) => {
      const authToken = JSON.parse(sessionStorage.getItem("authToken")) || {};
      authToken.users[key] = updatedArray;
      sessionStorage.setItem("authToken", JSON.stringify(authToken));
    };

    if (type === "experience") {

      setDeleteLoading(true);

      AuthorizationHeader.get(API_ENDPOINTS.DELETEEXPERIENCEDETAILS(user.id, id))
        .then((response) => {
          if (response.data.status === 200) {
            setFormData((prev) => {
              const updatedExp = prev.workExperiences.filter(
                (exp) => exp.id !== id
              );
              updateSessionStorage("workExperience", updatedExp);
              return { ...prev, workExperiences: updatedExp };
            });

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: response.data.message,
              confirmButtonColor: "#3085d6",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: response.data.message,
              confirmButtonColor: "#3085d6",
            });
          }
        })
        .catch((error) => {
          console.error("Error deleting experience:", error);
        })
        .finally(() => {
          setDeleteLoading(false);
        });
    } else if (type === "education") {

      setDeleteLoading(true);

      AuthorizationHeader.get(API_ENDPOINTS.DELETEEDUCATIONDETAILS(user.id, id))
        .then((response) => {
          if (response.data.status === 200) {
            setFormData((prev) => {
              const updatedEdu = prev.educationEntries.filter(
                (edu) => edu.id !== id
              );
              updateSessionStorage("education", updatedEdu);
              return { ...prev, educationEntries: updatedEdu };
            });

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: response.data.message,
              confirmButtonColor: "#3085d6",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: response.data.message,
              confirmButtonColor: "#3085d6",
            });
          }
        })
        .catch((error) => {
          console.error("Error deleting education:", error);
        })
        .finally(() => {
          setDeleteLoading(false);
        });
    } else if (type === "project") {

      setDeleteLoading(true);

      AuthorizationHeader.get(API_ENDPOINTS.DELETEPROJECTDETAILS(user.id, id))
        .then((response) => {
          if (response.data.status === 200) {
            setFormData((prev) => {
              const updatedProjects = prev.projects.filter((p) => p.id !== id);
              updateSessionStorage("project", updatedProjects);
              return { ...prev, projects: updatedProjects };
            });

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: response.data.message,
              confirmButtonColor: "#3085d6",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: response.data.message,
              confirmButtonColor: "#3085d6",
            });
          }
        })
        .catch((error) => {
          console.error("Error deleting project:", error);
        })
        .finally(() => {
          setDeleteLoading(false);
        });
    }
  };

  // Form submission
  const handleSubmitProfile = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    setLoading(true);

    try {
      if (formData.phoneNo.length !== 10) {
        toast.error("Phone number must be exactly 10 digits");
        setLoading(false);
        return;
      }

      const profileFormData = new FormData();
      const resumeFormData = new FormData();

      const currentSkills =
        formData.skills.length > 0
          ? formData.skills
          : user?.skills?.map((skill) =>
              typeof skill === "string" ? { name: skill } : skill
            ) || [];

      const payload = {
        // Personal Information
        fullName: formData.fullName,
        email: formData.email,
        phoneNo: formData.phoneNo,
        location: formData.location,
        gender: formData.gender,
        maxsalary: formData.maxsalary,
        minsalary: formData.minsalary,
        aboutMe: formData.aboutMe,
        userCategory: formData.userCategory,
        experiencePeriod: formData.experiencePeriod,
        noticePeriod: formData.noticePeriod,

        // Collections
        skills: currentSkills.map((skill) => skill.name).filter(Boolean),

        // Work Experiences
        workExperience: formData.workExperiences.map((exp) => ({
          jobProfile: exp.jobProfile,
          companyName: exp.companyName,
          jobStartDate: exp.jobStartDate,
          ...(exp.currentlyworking === "yes"
            ? { currentlyworking: "yes" }
            : { jobEndDate: exp.jobEndDate }),
        })),

        // Projects
        project: formData.projects.map((proj) => ({
          projectTitle: proj.projectTitle,
          projectLink: proj.projectLink,
          projectStartDate: proj.projectStartDate,
          projectEndDate: proj.projectEndDate,
        })),

        // Education
        education: formData.educationEntries.map((edu) => ({
          degree: edu.degree,
          specialization: edu.specialization,
          university: edu.university,
          startDate: edu.startDate,
          endDate: edu.endDate,
          courseType: edu.courseType,
        })),
      };

      const requests = [
        AuthorizationHeader.post(API_ENDPOINTS.UPDATEPROFILE, payload),
      ];

      if (profileImageFile) {
        profileFormData.append("file", profileImageFile);
        profileFormData.append("email", formData.email);
        requests.push(
          AuthorizationHeader.post(
            API_ENDPOINTS.UPDATEPROFILEIMAGE,
            profileFormData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          )
        );
      }

      if (resume) {
        resumeFormData.append("file", resume);
        resumeFormData.append("email", formData.email);
        requests.push(
          AuthorizationHeader.post(API_ENDPOINTS.UPLOADRESUME, resumeFormData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        );
      }

      // Execute all requests in parallel
      await Promise.all(requests);

      // Update sessionStorage dynamically
      const authData = sessionStorage.getItem("authToken");
      if (authData) {
        const parsed = JSON.parse(authData);
        const updatedUser = {
          ...parsed.users,
          ...payload,
          profileImage: profileImageFile
            ? URL.createObjectURL(profileImageFile)
            : parsed.users.profileImage,
          resume: resume ? resume.name : parsed.users.resume,
        };

        sessionStorage.setItem(
          "authToken",
          JSON.stringify({ ...parsed, users: updatedUser })
        );
      }

      navigate("/Profile");

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been successfully updated.",
        showConfirmButton: false,
        timer: 2000,
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || error.message,
        confirmButtonColor: "#3085d6",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Step navigation
  const nextStep = () => step < steps.length && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const Cancel = () => {
    navigate("/profile-dashboard");
  };

  // Step indicator component
  const renderStepIndicator = () => (
    <div className="flex sm:flex-row justify-center items-center mb-4 sm:mb-8 static top-20 left-0 right-0 sm:left-auto sm:right-auto z-50 p-2 sm:p-0 shadow-none">
      {steps.map((s, index) => (
        <div key={s.id} className="flex items-center sm:flex-row flex-col">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-[#111] font-bold text-sm sm:text-base transition-all duration-300 mx-1 sm:mx-2">
            Step
          </div>
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-white font-bold text-sm sm:text-base transition-all duration-300 ${
              step >= s.id ? "bg-[#05A3E5]" : "bg-gray-300"
            }`}
          >
            {s.id}
          </div>
          {index !== steps.length - 1 && (
            <div className="w-4 h-px sm:w-6 sm:h-px bg-gray-400 mx-1 sm:mx-2"></div>
          )}
        </div>
      ))}
    </div>
  );

  // Step components
  const renderStep1 = () => (
    <div className="mt-12 sm:mt-4 mb-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="mb-4 text-xl sm:text-2xl font-bold flex items-center">
          <FontAwesomeIcon
            className="pro-icon mr-2 text-lg sm:text-xl"
            icon={faFileAlt}
          />
          Upload Your CV
        </h2>
        <div className="resume-container">
          <div className="resume-actions mb-4">
            <input
              ref={resumeInputRef}
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={(e) => handleFileUpload(e, "resume")}
            />
            {!resume ? (
              <button
                onClick={() => triggerFileInput("resume")}
                className="action-btn upload-btn bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto hover:bg-blue-600 transition-colors"
              >
                <FontAwesomeIcon icon={faUpload} className="mr-2" /> Upload Resume
              </button>
            ) : (
              <div className="button-group flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => triggerFileInput("resume")}
                  className="icon-btn update-btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  <span className="tooltip-text">Update</span>
                </button>
                <button
                  onClick={() => handleRemoveFile("resume")}
                  className="icon-btn delete-btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  <span className="tooltip-text">Delete</span>
                </button>
                <a
                  href={previewUrl}
                  download={resume.name}
                  className="icon-btn download-btn bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                  <span className="tooltip-text">Download</span>
                </a>
              </div>
            )}
          </div>
          {(previewUrl || dynamicImageResume.dynamicResume) && (
            <div className="resume-preview mt-4">
              <p className="text-sm font-medium mb-2">Preview:</p>
              {previewUrl ? (
                resume?.type?.startsWith("image/") ? (
                  <img
                    src={previewUrl}
                    alt="Resume Preview"
                    className="w-full h-auto max-h-64 object-contain rounded-md border"
                  />
                ) : (
                  <iframe
                    src={previewUrl ? previewUrl : "No Preview"}
                    width="100%"
                    height="200px"
                    title="Resume Preview"
                    className="border rounded-md"
                  ></iframe>
                )
              ) : (
                <iframe
                  src={
                    API_ENDPOINTS.FETCHRESUME(dynamicImageResume.dynamicResume || user.resume) || "No Resume Upload"
                  }
                  width="100%"
                  height="200px"
                  title="Resume Preview"
                  className="border rounded-md"
                ></iframe>
              )}
            </div>
          )}
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full sm:w-auto float-right hover:bg-blue-600 transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="mt-12 sm:mt-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center">
          <FontAwesomeIcon
            className="pro-icon mr-2 text-lg sm:text-xl"
            icon={faUser}
          />{" "}
          Personal Details
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-full sm:w-3/4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-1 w-full p-2 border rounded-md"
                placeholder="Your Name"
              />
              <textarea
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleInputChange}
                className="mt-2 w-full p-2 border rounded-md"
                placeholder="About you (skills, experience, background)"
                rows="4"
              />
            </div>
            <div className="profile-upload flex justify-center">
              <input
                ref={profileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileUpload(e, "profile")}
              />
              <div
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden flex items-center justify-center cursor-pointer border-4 border-gray-300"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => triggerFileInput("profile")}
              >
                <img
                  src={
                    profileImageFile instanceof File
                      ? URL.createObjectURL(profileImageFile)
                      : profileImageFile ||
                        API_ENDPOINTS.FETCHIMAGE(
                          dynamicImageResume.dynamicImage || ""
                        )
                  }
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              placeholder="Email"
              readOnly
            />
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              placeholder="Phone Number"
              maxLength={10}
              pattern="\d{10}"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={(e) => handleLocationSearch(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Location (City)"
              />
              {loadingStates.location && (
                <div className="absolute top-10 right-2 text-sm text-gray-500">
                  Loading...
                </div>
              )}
              {dropdownOptions.locations.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto rounded-md shadow-sm">
                  {dropdownOptions.locations.map((city, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, location: city }));
                        setDropdownOptions((prev) => ({
                          ...prev,
                          locations: [],
                        }));
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${
                formData.gender === "" ? "text-gray-500" : "text-black"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer Not to Say</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="minsalary"
              value={formData.minsalary}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${
                formData.minsalary === "" ? "text-gray-500" : "text-black"
              }`}
            >
              <option value="">Min Salary (LPA)</option>
              {dropdownOptions.salaryRanges.map((salary, index) => (
                <option key={index} value={salary}>
                  {salary} {salary === "25+" ? "" : "LPA"}
                </option>
              ))}
            </select>
            <select
              name="maxsalary"
              value={formData.maxsalary}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${
                formData.maxsalary === "" ? "text-gray-500" : "text-black"
              }`}
            >
              <option value="">Max Salary (LPA)</option>
              {dropdownOptions.salaryRanges.map((salary, index) => (
                <option key={index} value={salary}>
                  {salary} {salary === "25+" ? "" : "LPA"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium text-sm">User Category</label>
            <select
              name="userCategory"
              value={formData.userCategory || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Category</option>
              <option value="fresher">Fresher</option>
              <option value="experienced">Experienced</option>
            </select>
          </div>
          {formData.userCategory === "experienced" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium text-sm">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="experiencePeriod"
                  value={formData.experiencePeriod || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g., 3"
                  min="0"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-sm">
                  Notice Period
                </label>
                <select
                  name="noticePeriod"
                  value={formData.noticePeriod || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Notice Period</option>
                  {dropdownOptions.noticePeriods.map((period, index) => (
                    <option key={index} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={prevStep}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={Cancel}
              className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-red-600 transition-colors"
            >
              ❌ Cancel
            </button>
          </div>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const isExperienced = formData.userCategory === "experienced";
    const entries = isExperienced
      ? Array.isArray(formData.workExperiences)
        ? formData.workExperiences
        : []
      : Array.isArray(formData.projects)
      ? formData.projects
      : [];
      

    return (
      <div className="mt-12 sm:mt-4 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center">
            <FontAwesomeIcon
              className="pro-icon mr-2 text-lg sm:text-xl"
              icon={faBriefcase}
            />
            {isExperienced ? "Work Experience" : "Projects"}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {isExperienced ? "Job Title" : "Project Title"}
                </label>
                <input
                  type="text"
                  name={isExperienced ? "jobProfile" : "projectTitle"}
                  value={
                    isExperienced ? formData.jobProfile : formData.projectTitle
                  }
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder={isExperienced ? "Job Title" : "Project Title"}
                />
              </div>
              {!isExperienced && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Project Link
                  </label>
                  <input
                    type="text"
                    name="projectLink"
                    value={formData.projectLink}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Project Link"
                  />
                </div>
              )}
              {isExperienced && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Company Name"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {isExperienced ? "Start Date" : "Project Date"}
                </label>
                <input
                  type="date"
                  name="jobStartDate"
                  value={formData.jobStartDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              {(!isExperienced || !formData.currentlyworking) && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="jobEndDate"
                    value={formData.jobEndDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              )}
            </div>
            {isExperienced && (
              <div className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  name="currentlyworking"
                  checked={formData.currentlyworking}
                  onChange={handleInputChange}
                  className="mr-2"
                  id="currentlyWorking"
                />
                <label
                  htmlFor="currentlyWorking"
                  className="text-sm font-medium"
                >
                  Currently Working Here
                </label>
              </div>
            )}
            <button
              onClick={() => {
                if (isExperienced) {
                  if (
                    !formData.companyName ||
                    !formData.jobStartDate ||
                    !formData.jobProfile
                  ) {
                    Swal.fire(
                      "Error",
                      "Please fill all experience fields",
                      "error"
                    );
                    return;
                  }
                  handleAddExperience();
                } else {
                  if (!formData.projectTitle || !formData.projectLink) {
                    Swal.fire(
                      "Error",
                      "Please fill all project fields",
                      "error"
                    );
                    return;
                  }
                  handleAddProjects();
                }
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full sm:w-auto hover:bg-blue-600 transition-colors"
            >
              {isExperienced ? "Add Experience" : "Add Project"}
            </button>
          </div>
          <div className="mt-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Your {isExperienced ? "Experiences" : "Projects"}
            </h3>
            {entries.length > 0 ? (
              entries.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between gap-4 border border-gray-300 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 mb-4 rounded-xl"
                >
                  <div className="flex-1">
                    {isExperienced ? (
                      <>
                        <p className="text-lg font-semibold text-indigo-600 mb-2">
                          {item.companyName || "N/A"}
                        </p>
                        <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                          <li>{item.jobProfile || "N/A"}</li>
                          <li>
                            📅 {item.jobStartDate || "N/A"} -{" "}
                            {item.jobEndDate && item.jobEndDate.trim() !== ""
                              ? item.jobEndDate
                              : "Currently working"}
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <p className="text-lg font-semibold text-indigo-600 mb-2">
                          {item.projectTitle || "N/A"}
                        </p>
                        <ul className="mt-2 space-y-1 text-gray-600 sm:text-sm">
                          {item.projectLink && (
                            <li>
                              <a
                                href={item.projectLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline break-words"
                              >
                                🔗 {item.projectLink}
                              </a>
                            </li>
                          )}
                          <li>
                            📅 {item.projectStartDate || "N/A"} -{" "}
                            {item.projectEndDate || "N/A"}
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      handleRemoveItem(isExperienced ? "experience" : "project", item.id)
                    }
                    className="self-start sm:self-center text-red-500 hover:text-red-700 text-lg transition-colors duration-200"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic">
                No {isExperienced ? "experiences" : "projects"} added yet.
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-between mt-6 gap-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  if (entries.length === 0) {
                    const confirmBack = window.confirm(
                      `You haven't added any ${
                        isExperienced ? "experience" : "project"
                      }. Are you sure you want to go back?`
                    );
                    if (confirmBack) prevStep();
                  } else {
                    prevStep();
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={Cancel}
                className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-red-600 transition-colors"
              >
                ❌ Cancel
              </button>
            </div>
            <button
              onClick={() => {
                if (entries.length === 0) {
                  const confirmNext = window.confirm(
                    `You haven't added any ${
                      isExperienced ? "experience" : "project"
                    }. Are you sure you want to proceed?`
                  );
                  if (confirmNext) nextStep();
                } else {
                  nextStep();
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
  );
};

  const renderStep4 = () => (
    <div className="mt-12 sm:mt-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="mb-4 text-xl sm:text-2xl font-bold flex items-center">
          <FontAwesomeIcon
            className="pro-icon mr-2 text-lg sm:text-xl"
            icon={faTools}
          />
          Skills
        </h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Your Skills
          </label>
          <div className="relative">
            <Multiselect
              options={(dropdownOptions.skills || []).filter(
                (item) => item && item.name
              )}
              selectedValues={(formattedSkills || []).filter(
                (item) => item && item.name
              )}
              onSelect={(selectedList) => {
                setFormData((prev) => ({
                  ...prev,
                  skills: selectedList.map((item) =>
                    typeof item === "string" ? { name: item } : item
                  ),
                }));
              }}
              onRemove={(selectedList) => {
                setFormData((prev) => ({
                  ...prev,
                  skills: selectedList.map((item) =>
                    typeof item === "string" ? { name: item } : item
                  ),
                }));
              }}
              displayValue="name"
              placeholder="Select Skills"
              loading={loadingStates.skills}
              emptyRecordMsg="No skills found"
              style={{
                chips: { background: "#05A3E5" },
                searchBox: {
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  padding: "0.5rem",
                },
                optionContainer: { border: "1px solid #d1d5db" },
              }}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={prevStep}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={Cancel}
              className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-red-600 transition-colors"
            >
              ❌ Cancel
            </button>
          </div>
          <button
            onClick={() => {
              if (formData.skills.length === 0) {
                Swal.fire({
                  icon: "question",
                  title: "No Skills Selected",
                  text: "Are you sure you want to proceed without selecting any skills?",
                  showCancelButton: true,
                  confirmButtonText: "Yes, Proceed",
                  cancelButtonText: "Cancel",
                  customClass: {
                    confirmButton: "bg-blue-500 text-white px-4 py-2 rounded",
                    cancelButton: "bg-gray-300 text-black px-4 py-2 rounded",
                  },
                }).then((result) => {
                  if (result.isConfirmed) {
                    nextStep();
                  }
                });
              } else {
                nextStep();
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="mt-12 sm:mt-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="mb-4 text-xl sm:text-2xl font-bold flex items-center">
          <FontAwesomeIcon
            className="pro-icon mr-2 text-lg sm:text-xl"
            icon={faGraduationCap}
          />
          Education
        </h2>
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Degree</label>
              <select
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Degree</option>
                {dropdownOptions.qualifications.map((degree, index) => (
                  <option key={index} value={degree}>
                    {degree}
                  </option>
                ))}
              </select>
            </div>
            {formData.degree && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Course Type
                </label>
                <select
                  name="courseType"
                  value={formData.courseType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Course Type</option>
                  {dropdownOptions.courseTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {formData.courseType && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Specialization
                </label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Specialty</option>
                  {dropdownOptions.specializations.map((spec, index) => (
                    <option key={index} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {formData.specialization && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  University
                </label>
                <select
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select University</option>
                  {dropdownOptions.universities.map((univ, index) => (
                    <option key={index} value={univ}>
                      {univ}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {formData.university && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </>
            )}
          </div>
          {formData.educationEntries && (
            <button
              onClick={() => {
                if (
                  !formData.degree ||
                  !formData.specialization ||
                  !formData.university ||
                  !formData.courseType ||
                  !formData.startDate ||
                  !formData.endDate
                ) {
                  Swal.fire(
                    "Error",
                    "Please fill all education fields before adding a new one",
                    "error"
                  );
                  return;
                }
                handleAddEducation();
              }}
              className="mt-4 px-2 py-2 bg-blue-500 text-white rounded-md w-full sm:w-auto hover:bg-blue-600 transition-colors"
            >
              Add Education
            </button>
          )}
          <div className="mt-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Your Education
            </h3>
            {Array.isArray(formData.educationEntries) &&
            formData.educationEntries.length > 0 ? (
              formData.educationEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b justify-between items-start sm:items-center border-gray-200 sm:p-4 mb-4 rounded-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <p className="text-md font-bold text-gray-900">
                      {entry.degree || "N/A"}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {entry.specialization || "N/A"}
                    </p>
                    <ul className="mt-2 space-y-1 text-gray-600 sm:text-sm">
                      <li>🏫 {entry.university || "N/A"}</li>
                      <li>
                        📅 {entry.startDate || "N/A"} - {entry.endDate || "N/A"}
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleRemoveItem("education", entry.id)}
                    className="self-start sm:self-center text-red-500 sm:text-red-700 hover:text-red-700 sm:hover:text-red-900 text-sm sm:text-lg transition-colors mt-2 sm:mt-0"
                  >
                    ×
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 sm:text-sm">
                No education entries added yet.
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-between mt-6 gap-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  if (formData.educationEntries.length === 0) {
                    const confirmBack = window.confirm(
                      "You haven't added any education entries. Would you like to go back?"
                    );
                    if (confirmBack) prevStep();
                  } else {
                    prevStep();
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={Cancel}
                className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-red-600 transition-colors"
              >
                ❌ Cancel
              </button>
            </div>
            <button
              onClick={() => {
                if (formData.educationEntries.length === 0) {
                  Swal.fire({
                    icon: "warning",
                    title: "Education Required",
                    text: "Please add at least one education entry before submitting your profile.",
                    confirmButtonColor: "#3085d6",
                  });
                } else {
                  handleSubmitProfile();
                }
              }}
              className="bg-blue-500 text-white px-6 py-2 rounded-md w-full sm:w-auto hover:bg-blue-600 transition-colors"
            >
              Submit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>

     {/* Background Blur when Loading */}
      { (loading || deleteLoading) && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backdropFilter: "blur(3px)",
            background: "rgba(255, 255, 255, 0.1)",
            zIndex: 3,
          }}
        >
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
      )}

      <UnifiedHeader />
      <div className="profile-banner">
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <div className="mt-3 text-center">
                <h2 className="text-3xl font-bold mb-2">
                  Fill <span>Your</span> Profile
                </h2>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form justify-center relative">
                {renderStepIndicator()}
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
                {step === 5 && renderStep5()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <ToastContainer autoClose={2000} />
    </>
  );
};

export default Fillprofile;
