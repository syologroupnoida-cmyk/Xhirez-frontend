// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Toaster, toast } from "react-hot-toast";
// import { motion } from "framer-motion";
// import { API_ENDPOINTS } from "../apiConfig";

// const SuperAdminProfile = () => {

//  const authData = sessionStorage.getItem("authToken");
//  const user = authData ? JSON.parse(authData).users : null;


//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
    
//     if (user) {
//       setFormData({
//         name: user?.fullName || "",
//         email: user?.email || "",
//         mobile: user?.phoneNo || "",
//         password: user?.password || "",
//       });
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "mobile" && value.length > 10) return;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await AuthorizationHeader.get(API_ENDPOINTS.UPDATESUPERADMINPROFILEDATA, {
//         params: {
//             name: formData.name,
//             email: formData.email,
//             mobileNo : formData.mobile,
//             password: formData.password,
//         },
//       });

//       if (response.data.status === 200) {

//         toast.success(response.data.message || "Profile updated successfully");
       
//         const authDataRaw = sessionStorage.getItem("authToken");
        
//         if (authDataRaw) {
//             try {
//             const authData = JSON.parse(authDataRaw);

//             authData.users = {
//                 ...authData.users,
//                 fullName: formData.name,    
//                 email: formData.email,      
//                 phoneNo: formData.mobile, 
//                 password: formData.password,  
//             };

//             sessionStorage.setItem("authToken", JSON.stringify(authData));
            
//             } catch (e) {
//             console.error("Failed to update authToken in sessionStorage", e);
//             }
//         }
//       } else {
//         toast.error(response.data.message || "Failed to update profile");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error updating profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
//       {/* Full-width container */}
//       <div className="w-full mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full"
//         >
//           <div className="text-dark mb-4 ml-3">
//             <h2 className="text-2xl text-dark md:text-2xl font-bold">
//               Manage Profile
//             </h2>
//           </div>
//           {/* Full-width card with max-width constraint for better readability */}
//           <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-6xl mx-auto">

//             {/* Form - using grid layout for full width */}
//             <form onSubmit={handleSubmit} className="p-6 md:p-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Name */}
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Full Name
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="name"
//                       name="name"
//                       type="text"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="John Doe"
//                       required
//                       className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     />
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                       <svg
//                         className="h-5 w-5 text-gray-400"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Email Address
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="Enter your email"
//                       required
//                       readOnly
//                       className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     />
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                       <svg
//                         className="h-5 w-5 text-gray-400"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                         <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Mobile */}
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="mobile"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Mobile Number
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="mobile"
//                       name="mobile"
//                       type="tel"
//                       value={formData.mobile}
//                       onChange={handleChange}
//                       placeholder="Enter your mobile number"
//                       maxLength={10}
//                       pattern="\d{10}"
//                       required
//                       className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     />
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                       <svg
//                         className="h-5 w-5 text-gray-400"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Password */}
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="password"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     New Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="password"
//                       name="password"
//                       type={showPassword ? "text" : "password"}
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder="Enter your password"
//                       className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 flex items-center pr-3"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       <svg
//                         className="h-5 w-5 text-gray-400 hover:text-gray-600"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         {showPassword ? (
//                           <>
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                             />
//                           </>
//                         ) : (
//                           <>
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                             />
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                             />
//                           </>
//                         )}
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Submit button - centered in its own row */}
//               <div className="mt-8 text-center">
//                 <motion.button
//                   type="submit"
//                   disabled={loading}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className={`inline-flex items-center justify-center py-3 px-8 rounded-lg text-white font-medium ${
//                     loading
//                       ? "bg-blue-400 cursor-not-allowed"
//                       : "bg-blue-600 hover:bg-blue-700"
//                   } transition-all shadow-md`}
//                 >
//                   {loading ? (
//                     <>
//                       <svg
//                         className="animate-spin h-5 w-5 mr-2 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Updating...
//                     </>
//                   ) : (
//                     "Update Profile"
//                   )}
//                 </motion.button>
//               </div>
//             </form>
//           </div>
//         </motion.div>
//       </div>

//       <Toaster
//         position="top-center"
//         toastOptions={{
//           duration: 4000,
//           style: {
//             background: "#363636",
//             color: "#fff",
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//             borderRadius: "12px",
//             padding: "16px 24px",
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default SuperAdminProfile;






import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { API_ENDPOINTS } from "../apiConfig";
import AuthorizationHeader from "../AuthorizationHeader";

const SuperAdminProfile = () => {

 const authData = sessionStorage.getItem("authToken");
 const user = authData ? JSON.parse(authData).users : null;


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    
    if (user) {
      setFormData({
        name: user?.fullName || "",
        email: user?.email || "",
        mobile: user?.phoneNo || "",
        password:  "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" && value.length > 10) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      // Use the new password if provided; otherwise, use the original user.password
      const passwordToSend = formData.password || user?.password || "";

      const response = await AuthorizationHeader.get(API_ENDPOINTS.UPDATESUPERADMINPROFILEDATA, {
        params: {
            name: formData.name,
            email: formData.email,
            mobileNo : formData.mobile,
            password: passwordToSend,
        },
      });

      if (response.data.status === 200) {

        toast.success(response.data.message || "Profile updated successfully");
       
        const authDataRaw = sessionStorage.getItem("authToken");
        
        if (authDataRaw) {
            try {
            const authData = JSON.parse(authDataRaw);

            authData.users = {
                ...authData.users,
                fullName: formData.name,    
                email: formData.email,      
                phoneNo: formData.mobile, 
                password: passwordToSend,  
            };

            sessionStorage.setItem("authToken", JSON.stringify(authData));
            setFormData((prev) => ({ ...prev, password: "" }));
            } catch (e) {
            console.error("Failed to update authToken in sessionStorage", e);
            }
        }
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Full-width container */}
      <div className="w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="text-dark mb-4 ml-3">
            <h2 className="text-2xl text-dark md:text-2xl font-bold">
              Manage Profile
            </h2>
          </div>
          {/* Full-width card with max-width constraint for better readability */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-6xl mx-auto">

            {/* Form - using grid layout for full width */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Mobile */}
                <div className="space-y-2">
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      maxLength={10}
                      pattern="\d{10}"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password ( <span className="text-danger">Leave Blank If You Wants to keep current password</span> )
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {showPassword ? (
                          <>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </>
                        ) : (
                          <>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit button - centered in its own row */}
              <div className="mt-8 text-center">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center justify-center py-3 px-8 rounded-lg text-white font-medium ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } transition-all shadow-md`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            borderRadius: "12px",
            padding: "16px 24px",
          },
        }}
      />
    </div>
  );
};

export default SuperAdminProfile;
