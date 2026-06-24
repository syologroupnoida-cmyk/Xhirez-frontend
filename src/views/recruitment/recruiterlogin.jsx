import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../signup/SignUp";
import { useNavigate } from "@/router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBriefcase,
  faDatabase,
  faEnvelope,
  faEyeSlash,
  faEye,
  faHeadset,
  faShieldHalved,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from '../apiConfig.jsx';
import Swal from 'sweetalert2';
import { Link } from "@/router-dom";
import { toast, ToastContainer,  } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

const hiringSolutions = [
  {
    icon: faBriefcase,
    title: "Job Posting",
    description: "Publish openings with structured role details and reach candidates who are actively exploring.",
  },
  {
    icon: faDatabase,
    title: "Resume Database",
    description: "Search profiles by skills, location, salary, experience, and hiring intent in one place.",
  },
  {
    icon: faHeadset,
    title: "Assisted Hiring",
    description: "Get guided shortlisting support when you need faster movement on priority roles.",
  },
  {
    icon: faShieldHalved,
    title: "Verified Employer Tools",
    description: "Manage recruiter access, candidate communication, and hiring activity with confidence.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Define the role",
    description: "Add the job title, must-have skills, location, and experience range for sharper matching.",
  },
  {
    step: "02",
    title: "Find relevant talent",
    description: "Use search filters and saved searches to build a focused candidate pipeline.",
  },
  {
    step: "03",
    title: "Engage and hire",
    description: "Contact candidates, track responses, and move qualified profiles into your hiring flow.",
  },
];

const proofStats = [
  { value: "50M+", label: "candidate profiles" },
  { value: "24x7", label: "recruiter access" },
  { value: "3x", label: "faster shortlisting tools" },
];

const LoginPage = () => {
  const savedLogin =
    typeof window !== "undefined" && localStorage.getItem("rememberMe") === "true"
      ? {
          username: localStorage.getItem("username") || "",
          password: localStorage.getItem("password") || "",
          rememberMe: true,
        }
      : { username: "", password: "", rememberMe: false };

  const [username, setUsername] = useState(savedLogin.username);
  const [password, setPassword] = useState(savedLogin.password);
  const [rememberMe, setRememberMe] = useState(savedLogin.rememberMe);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [geoLocation, setGeoLocation] = useState({ lat: null, lon: null });

  const navigate = useNavigate();
  
    // For fetching Latitude and Longitude
  
     useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setGeoLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          err => {
            console.log('Location access denied or not available.');
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    }, []);
  

  const validateForm = () => {
    let validationErrors = {};

    if (!username.trim()) {
      validationErrors.username = "Email or Username is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username) && username.includes("@")) {
      validationErrors.username = "Invalid email format";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } 
    // else if (password.length < 6) {
    //   validationErrors.password = "Password must be at least 6 characters long";
    // }

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return false;
    }

    setError({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, null, {
        params: {
          email: username,
          password: password,
        },
      });

      if (response?.data?.status === 200) {
        
        let logCount = 0; 

        const users=response?.data?.data;

        if(users.userRole === 'admin' || users.userRole === 'primeadmin')
        { 
          
        localStorage.setItem('authToken', JSON.stringify({users})); 
        sessionStorage.setItem('authToken', JSON.stringify({users}));



          // Set the Authorization header for all apis in the cookies through api response
                     const authorizationToken = response.data?.accesstoken;
        
                     if (authorizationToken) {
                       const decoded = jwtDecode(authorizationToken);
                       const exp = decoded.exp; // fetch the expiration time from the token
        
                       const tokenExpirationTime = new Date(exp * 1000); // convert to milliseconds
        
                       Cookies.set("AuthorizationToken", authorizationToken, {
                         expires: tokenExpirationTime,
                         secure: true,
                         sameSite: "Strict",
                       });
                     }

            // For checking the Logs of how much time logins 
                     const countResponse = await axios.get(API_ENDPOINTS.FETCHRECRUITERFIRSTTIMELOGIN,{
                      params:{
                        email: users?.email || ""
                      }
                     })

                    if(countResponse.data)
                    {
                      logCount = parseInt(countResponse.data, 10);
                    }

                     

        // Save login log history
            axios.get(API_ENDPOINTS.SAVELOGINLOGHISTORY, {
              params: {
                name: users?.fullName || "",
                email: users?.email || "",
                userRole: users?.userRole || "",
                latitude: geoLocation.lat || "",
                longitude: geoLocation.lon || "",
              },
            })
            .catch((logError) => {
              console.error("Login log history failed", logError);
            });


            Swal.fire({
              title: "Login Successful!",
              text: "You will be redirected shortly.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {

              const authToken = sessionStorage.getItem('authToken') || localStorage.getItem('authToken');

              if (authToken) {

                if(logCount !== 0)
                {
                  navigate('/Recruitmenthero'); 
                }
                else{
                  navigate('/Companydetail'); 
                }
              }
            });

        }
        else if(users.userRole === 'SuperAdmin')
        {

           localStorage.setItem('authToken', JSON.stringify({users})); 
           sessionStorage.setItem('authToken', JSON.stringify({users}));


             // Set the Authorization header for all apis in the cookies through api response
                        const authorizationToken = response.data?.accesstoken;
           
                        if (authorizationToken) {
                          const decoded = jwtDecode(authorizationToken);
                          const exp = decoded.exp; // fetch the expiration time from the token
           
                          const tokenExpirationTime = new Date(exp * 1000); // convert to milliseconds
           
                          Cookies.set("AuthorizationToken", authorizationToken, {
                            expires: tokenExpirationTime,
                            secure: true,
                            sameSite: "Strict",
                          });
                        }


           // Save login log history
            axios.get(API_ENDPOINTS.SAVELOGINLOGHISTORY, {
              params: {
                name: users?.fullName || "",
                email: users?.email || "",
                userRole: users?.userRole || "",
                latitude: geoLocation.lat || "",
                longitude: geoLocation.lon || "",
              },
            })
            .catch((logError) => {
              console.error("Login log history failed", logError);
            });


            Swal.fire({
              title: "Login Successful!",
              text: "You will be redirected shortly.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {

              const authToken = sessionStorage.getItem('authToken') || localStorage.getItem('authToken');

              if (authToken) {
                navigate('/Superadmin'); 
              }
            });
        }
        else{
          toast.error("You are not an Admin");
          
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }      

        setError("");

        if (rememberMe) {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
          localStorage.setItem("rememberMe", rememberMe);
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberMe");
        }
      } 

      else if (response.data?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid email or password!',
        });
        setError("Invalid email or password!");
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'An error occurred',
        text: err.response?.data?.message || "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1f2937]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center no-underline">
              <Image
                src="/assets/images/logo/Xhirez-Logo.png"
                alt="Xhirez"
                width={150}
                height={48}
                className="h-11 w-auto object-contain"
                priority
              />
            </Link>
            <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
              <Link to="/" className="text-slate-700 no-underline hover:text-[#1d6ed8]">
                Home
              </Link>
              <Link to="/recruiter/pricing" className="text-slate-700 no-underline hover:text-[#1d6ed8]">
                Buy Online
              </Link>
              <Link to="/business" className="text-slate-700 no-underline hover:text-[#1d6ed8]">
                Products
              </Link>
            </nav>
          </div>
          <div className="hidden items-center gap-5 text-sm font-semibold text-slate-600 md:flex">
            <a href="tel:18001025558" className="text-slate-600 no-underline hover:text-[#1d6ed8]">
              1800-102-5558
            </a>
            <Link to="/job-post" className="rounded border border-[#1d6ed8] px-4 py-2 text-[#1d6ed8] no-underline hover:bg-[#eef6ff]">
              Post a Job
            </Link>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden bg-white">
        <section className="relative overflow-hidden">
          <video
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/images/banner/recruitment.jpg"
            aria-hidden="true"
          >
            <source src="https://videos.pexels.com/video-files/3184295/3184295-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(247,251,255,0.92)_52%,rgba(255,255,255,0.98)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />

          <div className="relative mx-auto grid min-h-[720px] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_410px] lg:px-8">
            <div className="mx-auto max-w-2xl text-center lg:mx-0">
              <p className="mb-3 text-sm font-bold text-[#1d6ed8]">Welcome</p>
              <h1 className="text-4xl font-bold leading-tight text-slate-800 md:text-[46px]">
                Hire talent with Xhirez!
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-xl leading-8 text-slate-500">
                Find, engage, and hire talent on India&apos;s modern recruitment platform.
              </p>
              <div className="mx-auto mt-5 flex max-w-lg items-center justify-center divide-x divide-slate-300 border-y border-slate-200 bg-white/70 py-3 text-sm font-semibold text-slate-500 backdrop-blur">
                <span className="px-4">Job Posting</span>
                <span className="px-4">Resume Database</span>
                <span className="px-4">Assisted Hiring</span>
              </div>
              <Link
                to="/business"
                className="mt-5 inline-flex items-center gap-2 rounded border border-[#1d6ed8] bg-white px-5 py-2 text-sm font-bold text-[#1d6ed8] no-underline shadow-sm hover:bg-[#eef6ff]"
              >
                Know more
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>

              <div className="relative mx-auto mt-8 h-[300px] max-w-[520px]">
                <Image
                  src="/assets/images/banner/recruiter-side.png"
                  alt="Hiring candidates"
                  width={520}
                  height={360}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>

            <aside className="mx-auto w-full max-w-[410px] rounded bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.14)] ring-1 ring-slate-200">
            <div className="mb-6">
              <div className="mb-5 grid grid-cols-2 overflow-hidden rounded border border-slate-200 bg-slate-50 p-1">
                <button type="button" className="h-10 rounded text-sm font-bold text-slate-500 transition hover:text-[#1d6ed8]">
                  Sales enquiry
                </button>
                <Link
                  to="/recruiter/sign-up"
                  className="flex h-10 items-center justify-center rounded bg-white text-sm font-bold text-[#1d6ed8] no-underline shadow-sm"
                >
                  Register/Log in
                </Link>
              </div>
              <h2 className="m-0 text-xl font-bold text-slate-900">Login to recruiter account</h2>
              <p className="m-0 mt-2 text-sm text-slate-500">Access candidate search, job posting, and hiring tools.</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Registered email ID
                </label>
                <span className="flex h-12 w-full items-center gap-3 rounded border border-[#d4dbe8] bg-white px-4 transition focus-within:border-[#1d6ed8] focus-within:ring-2 focus-within:ring-[#1d6ed8]/10">
                  <FontAwesomeIcon icon={faEnvelope} className="text-sm text-slate-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-normal text-black outline-none"
                    placeholder="Enter registered email ID"
                  />
                </span>
                <p className="m-0 min-h-4 pt-1 text-[11px] leading-3 text-red-500">{error.username || ""}</p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Password
                </label>
                <span className="flex h-12 w-full items-center gap-3 rounded border border-[#d4dbe8] bg-white px-4 transition focus-within:border-[#1d6ed8] focus-within:ring-2 focus-within:ring-[#1d6ed8]/10">
                  <FontAwesomeIcon icon={faUser} className="text-sm text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-normal text-black outline-none"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    className="flex h-6 w-6 items-center justify-center border-0 bg-transparent p-0 text-slate-400"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </button>
                </span>
                <p className="m-0 min-h-4 pt-1 text-[11px] leading-3 text-red-500">{error.password || ""}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-500">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 accent-[#1d6ed8]"
                  />
                  Remember me
                </label>
                <Link to="/recoverpass" className="font-semibold text-[#1d6ed8] no-underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded border-0 bg-[#1d6ed8] text-sm font-bold text-white shadow-sm transition hover:bg-[#155ebc] disabled:cursor-not-allowed disabled:opacity-75"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-6 rounded bg-[#f7fbff] p-4 text-center text-sm text-slate-600">
              New to Xhirez?{" "}
              <Link to="/recruiter/sign-up" className="font-bold text-[#1d6ed8] no-underline">
                Create recruiter account
              </Link>
            </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-bold text-[#1d6ed8]">Recruitment solutions</p>
              <h2 className="m-0 text-3xl font-bold text-slate-900">Everything recruiters need to move faster</h2>
              <p className="mt-3 text-base leading-7 text-slate-500">
                Build your hiring pipeline with posting, search, assisted services, and account tools designed for daily recruiter work.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {hiringSolutions.map((solution) => (
                <article
                  key={solution.title}
                  className="rounded border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(15,23,42,0.10)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded bg-[#eef6ff] text-[#1d6ed8]">
                    <FontAwesomeIcon icon={solution.icon} />
                  </span>
                  <h3 className="mb-2 mt-4 text-lg font-bold text-slate-900">{solution.title}</h3>
                  <p className="m-0 text-sm leading-6 text-slate-500">{solution.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7fbff] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-2 text-sm font-bold text-[#1d6ed8]">How it works</p>
              <h2 className="m-0 text-3xl font-bold text-slate-900">A clearer hiring workflow from login to shortlist</h2>
              <p className="mt-3 text-base leading-7 text-slate-500">
                Start with the role, search with intent, and keep candidate engagement organized from the same recruiter account.
              </p>
              <Link
                to="/job-post"
                className="mt-6 inline-flex items-center gap-2 rounded bg-[#1d6ed8] px-5 py-3 text-sm font-bold text-white no-underline shadow-sm hover:bg-[#155ebc]"
              >
                Post a Job
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>
            <div className="grid gap-4">
              {workflowSteps.map((item) => (
                <article key={item.step} className="flex gap-4 rounded border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[#1d6ed8] text-sm font-bold text-white">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="m-0 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="m-0 mt-1 text-sm leading-6 text-slate-500">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 rounded border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] lg:grid-cols-[1fr_1.2fr] lg:p-8">
            <div>
              <p className="mb-2 text-sm font-bold text-[#1d6ed8]">Why recruiters choose Xhirez</p>
              <h2 className="m-0 text-3xl font-bold text-slate-900">Built for relevant reach, not noisy responses</h2>
              <p className="mt-3 text-base leading-7 text-slate-500">
                Xhirez helps recruiters focus on candidates who match the role, respond faster, and fit the hiring brief.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {proofStats.map((stat) => (
                <div key={stat.label} className="rounded bg-[#f7fbff] p-5 text-center">
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="rounded bg-[#102a43] p-5 text-white lg:flex lg:items-center lg:justify-between">
                <div>
                  <h3 className="m-0 text-xl font-bold">Ready to start your next hire?</h3>
                  <p className="m-0 mt-2 text-sm text-blue-100">
                    Login to continue or create a recruiter account to access Xhirez hiring tools.
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-3 lg:mt-0">
                  <Link to="/recruiter/sign-up" className="rounded bg-white px-5 py-3 text-sm font-bold text-[#102a43] no-underline">
                    Create account
                  </Link>
                  <Link to="/business" className="rounded border border-white/40 px-5 py-3 text-sm font-bold text-white no-underline hover:bg-white/10">
                    View solutions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-xs text-slate-500">
        Help Center | About Us | Fraud Alert | Terms & Conditions | Privacy Policy
      </footer>
      <ToastContainer/>
    </div>
  );
};

export default LoginPage;
