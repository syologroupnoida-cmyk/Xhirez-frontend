import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBriefcase,
  faBuilding,
  faChartLine,
  faCheckCircle,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faMagnifyingGlass,
  faRobot,
  faShieldHalved,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import RecruitHeader from "./RecruitHeader";
import RecruitFooter from "./RecruitFooter";
import { useNavigate } from "@/router-dom";
import { API_ENDPOINTS } from "../apiConfig.jsx";

const solutions = [
  {
    title: "Talent sourcing",
    icon: faMagnifyingGlass,
    desc: "Search active candidates by role, skills, location, and experience.",
  },
  {
    title: "Job posting",
    icon: faBriefcase,
    desc: "Publish openings and receive relevant applications in one place.",
  },
  {
    title: "Candidate screening",
    icon: faCheckCircle,
    desc: "Shortlist faster with clear profile signals and recruiter notes.",
  },
  {
    title: "Employer branding",
    icon: faBuilding,
    desc: "Showcase your company story to candidates before outreach.",
  },
  {
    title: "Hiring automation",
    icon: faRobot,
    desc: "Reduce repeated work with smarter workflows and follow-ups.",
  },
  {
    title: "Assisted hiring",
    icon: faUsers,
    desc: "Get guided support for urgent, bulk, or specialist requirements.",
  },
];

const brands = [
  { name: "Enterprises", desc: "High-volume hiring across multiple teams and locations." },
  { name: "Small & medium business", desc: "Simple job posting and candidate access for lean teams." },
  { name: "Consultants & agency", desc: "Manage multiple mandates and client pipelines with clarity." },
];

const proofStats = [
  { value: "10 Cr+", label: "registered jobseekers" },
  { value: "70 L+", label: "monthly active candidates" },
  { value: "5 L+", label: "recruiters use hiring tools" },
  { value: "24x7", label: "candidate access" },
];

const products = [
  {
    title: "Resume Database",
    tags: ["Search", "Shortlist", "Contact"],
    desc: "Discover relevant candidates with filtered search and saved lists.",
    image: "/assets/images/banner/recruitment.jpg",
    cta: "View database plans",
  },
  {
    title: "Job Posting",
    tags: ["Advertise", "Track", "Hire"],
    desc: "Publish openings and manage applications from one dashboard.",
    image: "/assets/images/banner/jobpost.jpg",
    cta: "Post a job",
  },
  {
    title: "AI Match",
    tags: ["Ranking", "Insights", "Speed"],
    desc: "Prioritize candidates with smart matching and hiring signals.",
    image: "/assets/images/feature/form-side.jpg",
    cta: "Explore AI hiring",
  },
  {
    title: "Recruiter Support",
    tags: ["Assisted", "Pipeline", "Follow-up"],
    desc: "Use expert support for high-volume or urgent requirements.",
    image: "/assets/images/banner/recruiter-side.png",
    cta: "Request assistance",
  },
];

const heroVideo = "https://videos.pexels.com/video-files/3184295/3184295-uhd_2560_1440_25fps.mp4";

const hiringModes = {
  company: {
    label: "Your company",
    title: "Hire for your own teams",
    desc: "Build role pipelines, track applicants, and move candidates from shortlist to offer with a clear employer workflow.",
  },
  consultancy: {
    label: "Your consultancy",
    title: "Manage hiring for clients",
    desc: "Organize multiple mandates, search candidate pools quickly, and keep client requirements easy to compare.",
  },
};

const testimonials = [
  {
    name: "Kreeti Mathur",
    role: "HR Manager",
    quote:
      "The dashboard makes it easy to source, compare, and move candidates through hiring without losing context.",
  },
  {
    name: "Naveen Malhotra",
    role: "Talent Acquisition Lead",
    quote:
      "We use Xhirez for quick hiring drives because the candidate search and posting flow is simple for our team.",
  },
  {
    name: "Padma Thyagarajan",
    role: "People Operations Head",
    quote:
      "The platform helps us keep recruitment organized, especially when multiple roles are open at the same time.",
  },
];

const processSteps = [
  ["01", "Choose a product", "Pick job posting, candidate database, AI match, or assisted hiring."],
  ["02", "Share your requirement", "Add role details, hiring location, skills, salary, and timeline."],
  ["03", "Connect with candidates", "Review matches, shortlist profiles, and move applicants forward."],
];

export default function RecruiterLogin() {
  const savedLogin =
    typeof window !== "undefined" && localStorage.getItem("rememberMe") === "true"
      ? {
          username: localStorage.getItem("username") || "",
          password: localStorage.getItem("password") || "",
          rememberMe: true,
        }
      : { username: "", password: "", rememberMe: false };

  const [showPassword, setShowPassword] = useState(false);
  const [activeSolution, setActiveSolution] = useState(solutions[0].title);
  const [activeProduct, setActiveProduct] = useState(products[0].title);
  const [hiringMode, setHiringMode] = useState("company");
  const [loginTab, setLoginTab] = useState("sales");
  const [username, setUsername] = useState(savedLogin.username);
  const [password, setPassword] = useState(savedLogin.password);
  const [rememberMe, setRememberMe] = useState(savedLogin.rememberMe);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [geoLocation, setGeoLocation] = useState({ lat: null, lon: null });

  const navigate = useNavigate();

  const selectedProduct = products.find((product) => product.title === activeProduct) || products[0];
  const selectedHiringMode = hiringModes[hiringMode];
  const selectedSolution = solutions.find((solution) => solution.title === activeSolution) || solutions[0];

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        console.log("Location access denied or not available.");
      }
    );
  }, []);

  const validateLoginForm = () => {
    const validationErrors = {};

    if (!username.trim()) {
      validationErrors.username = "Email or Username is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username) && username.includes("@")) {
      validationErrors.username = "Invalid email format";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    }

    setError(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const saveLoginHistory = (users) => {
    axios
      .get(API_ENDPOINTS.SAVELOGINLOGHISTORY, {
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
  };

  const storeAuthToken = (response, users) => {
    localStorage.setItem("authToken", JSON.stringify({ users }));
    sessionStorage.setItem("authToken", JSON.stringify({ users }));

    const authorizationToken = response.data?.accesstoken;
    if (!authorizationToken) return;

    const decoded = jwtDecode(authorizationToken);
    const tokenExpirationTime = new Date(decoded.exp * 1000);

    Cookies.set("AuthorizationToken", authorizationToken, {
      expires: tokenExpirationTime,
      secure: true,
      sameSite: "Strict",
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setError({});
    setLoading(true);

    if (!validateLoginForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, null, {
        params: {
          email: username,
          password,
        },
      });

      if (response?.data?.status === 200) {
        const users = response?.data?.data;

        if (users.userRole === "admin" || users.userRole === "primeadmin") {
          storeAuthToken(response, users);

          let logCount = 0;
          const countResponse = await axios.get(API_ENDPOINTS.FETCHRECRUITERFIRSTTIMELOGIN, {
            params: { email: users?.email || "" },
          });

          if (countResponse.data) {
            logCount = parseInt(countResponse.data, 10);
          }

          saveLoginHistory(users);

          Swal.fire({
            title: "Login Successful!",
            text: "You will be redirected shortly.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            const authToken = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
            if (authToken) {
              navigate(logCount !== 0 ? "/Recruitmenthero" : "/Companydetail");
            }
          });
        } else if (users.userRole === "SuperAdmin") {
          storeAuthToken(response, users);
          saveLoginHistory(users);

          Swal.fire({
            title: "Login Successful!",
            text: "You will be redirected shortly.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            const authToken = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
            if (authToken) {
              navigate("/Superadmin");
            }
          });
        } else {
          toast.error("You are not an Admin");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }

        if (rememberMe) {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
          localStorage.setItem("rememberMe", rememberMe);
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberMe");
        }
      } else if (response.data?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password!",
        });
        setError({ general: "Invalid email or password!" });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: err.response?.data?.message || "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="xh-recruit-page min-h-screen bg-[#f5f7fb] text-[#102033] font-sans">
      <section className="relative min-h-[760px] overflow-hidden bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/images/banner/recruitment.jpg"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,rgba(44,91,255,0.42),transparent_35%),linear-gradient(180deg,#000_0%,rgba(0,0,0,0.92)_45%,#06133a_100%)]" />

        <RecruitHeader />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:px-8">
          <div className="relative z-10">
            <p className="mb-5 text-[14px] font-bold uppercase tracking-[0.3em] text-white">
              Talent decoded
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.16] text-white lg:text-[54px]">
              Decode India&apos;s largest talent pool with the power of AI
            </h1>
            <div className="mt-6 space-y-3 text-[21px] font-semibold text-white">
              <p className="m-0 flex items-center gap-4">
                <FontAwesomeIcon icon={faUsers} className="text-lg" />
                10 crore+ registered jobseekers for all your talent needs
              </p>
              <p className="m-0 flex items-center gap-4">
                <FontAwesomeIcon icon={faChartLine} className="text-lg" />
                Most advanced recruitment AI
              </p>
            </div>

            <Link
              href="/business"
              className="mt-14 inline-flex items-center gap-3 whitespace-nowrap rounded bg-[#2f5cf6] px-5 py-3 text-base font-bold text-white no-underline shadow-sm hover:bg-[#234ee3] hover:text-white"
            >
              Explore products
            </Link>
          </div>

          <section className="relative z-10 mx-auto w-full max-w-[400px] translate-x-8 rounded bg-white p-7 shadow-2xl">
            <div className="mx-auto mb-6 flex h-12 w-full gap-1 rounded-full bg-[#f1f1f1] p-1">
              <button
                type="button"
                onClick={() => setLoginTab("sales")}
                className={`xh-recruit-form-tab h-full min-w-0 flex-1 border-0 px-3 text-sm font-bold leading-none transition ${
                  loginTab === "sales" ? "xh-recruit-form-tab-active" : "bg-transparent text-slate-500"
                }`}
              >
                Sales enquiry
              </button>
              <button
                type="button"
                onClick={() => setLoginTab("login")}
                className={`xh-recruit-form-tab h-full min-w-0 flex-1 border-0 px-3 text-sm font-bold leading-none transition ${
                  loginTab === "login" ? "xh-recruit-form-tab-active" : "bg-transparent text-slate-500"
                }`}
              >
                Register/Log in
              </button>
            </div>

            {loginTab === "sales" ? (
              <form className="flex flex-col gap-3">
                <input
                  type="text"
                  className="h-12 w-full rounded border border-[#d4dbe8] bg-white px-4 text-sm font-normal text-black outline-none transition placeholder:text-slate-500 focus:border-[#2f5cf6] focus:ring-2 focus:ring-[#2f5cf6]/10"
                  placeholder="Full name"
                />
                <input
                  type="tel"
                  className="h-12 w-full rounded border border-[#d4dbe8] bg-white px-4 text-sm font-normal text-black outline-none transition placeholder:text-slate-500 focus:border-[#2f5cf6] focus:ring-2 focus:ring-[#2f5cf6]/10"
                  placeholder="Mobile number"
                />
                <input
                  type="email"
                  className="h-12 w-full rounded border border-[#d4dbe8] bg-white px-4 text-sm font-normal text-black outline-none transition placeholder:text-slate-500 focus:border-[#2f5cf6] focus:ring-2 focus:ring-[#2f5cf6]/10"
                  placeholder="Work email"
                />

                <div className="pt-1">
                  <p className="mb-2 text-xs font-medium uppercase text-slate-700">HIRING FOR</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(hiringModes).map(([key, mode]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setHiringMode(key)}
                        className={`h-12 rounded border text-sm font-normal transition ${
                          hiringMode === key
                            ? "border-[#2f5cf6] bg-[#eef4ff] text-[#2f5cf6]"
                            : "border-slate-300 bg-white text-slate-500"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 h-12 w-full rounded border border-[#2f5cf6] bg-white text-base font-bold text-[#2f5cf6] transition hover:bg-[#2f5cf6] hover:text-white"
                >
                  Request callback
                </button>
              </form>
            ) : (
              <>
                <form onSubmit={handleLoginSubmit} className="w-full space-y-3">
                  <label className="block w-full">
                    <span className="flex h-12 w-full items-center gap-3 rounded border border-[#d4dbe8] bg-white px-4 transition focus-within:border-[#2f5cf6] focus-within:ring-2 focus-within:ring-[#2f5cf6]/10">
                      <FontAwesomeIcon icon={faEnvelope} className="text-sm text-slate-400" />
                      <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-normal text-black outline-none"
                        placeholder="Email / Username"
                      />
                    </span>
                    <p className="m-0 min-h-3 pt-1 text-[10px] leading-3 text-red-500">{error.username || ""}</p>
                  </label>

                  <label className="block w-full">
                    <span className="flex h-12 w-full items-center gap-3 rounded border border-[#d4dbe8] bg-white px-4 transition focus-within:border-[#2f5cf6] focus-within:ring-2 focus-within:ring-[#2f5cf6]/10">
                      <FontAwesomeIcon icon={faLock} className="text-sm text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-normal text-black outline-none"
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        className="flex h-6 w-6 items-center justify-center border-0 bg-transparent p-0 text-slate-400"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </button>
                    </span>
                    <p className="m-0 min-h-3 pt-1 text-[10px] leading-3 text-red-500">{error.password || ""}</p>
                  </label>

                  <div className="flex items-center justify-between text-sm leading-none">
                    <label className="flex items-center gap-2 text-slate-500">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(event) => setRememberMe(event.target.checked)}
                        className="h-4 w-4 accent-[#2f5cf6]"
                      />
                      Remember me
                    </label>
                    <Link href="/recoverpass" className="font-semibold text-[#2f5cf6] no-underline hover:text-[#2f5cf6]">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full rounded border-0 bg-[#2f5cf6] text-sm font-semibold text-white transition hover:bg-[#234ee3] disabled:cursor-not-allowed disabled:opacity-75"
                  >
                    {loading ? "Logging in..." : "Log in"}
                  </button>
                  {error.general && <p className="m-0 text-center text-xs text-red-500">{error.general}</p>}
                </form>

                <div className="mt-7 text-center text-sm text-slate-500">
                  Don&apos;t have a registered email?{" "}
                  <Link href="/recruiter/sign-up" className="font-bold text-[#2f5cf6] no-underline hover:text-[#2f5cf6]">
                    Create account
                  </Link>
                </div>
              </>
            )}
          </section>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 border-b border-slate-100 pb-8 sm:grid-cols-2 lg:grid-cols-4">
            {proofStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="m-0 text-3xl font-bold text-[#2f5cf6]">{stat.value}</p>
                <p className="m-0 mt-1 text-sm font-semibold text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="pt-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#2f5cf6]">One-stop hiring solution</p>
            <h2 className="m-0 text-3xl font-bold text-slate-950">Everything you need to hire faster</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Choose the right tool for sourcing, posting, screening, branding, and assisted recruitment.
            </p>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {solutions.map((item) => (
              <button
                type="button"
                key={item.title}
                onClick={() => setActiveSolution(item.title)}
                className={`min-h-[138px] rounded border bg-white p-4 text-left transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] ${
                  activeSolution === item.title ? "border-[#2f5cf6] shadow-sm ring-2 ring-[#2f5cf6]/10" : "border-slate-200"
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded bg-[#eef3ff] text-[#2f5cf6]">
                  <FontAwesomeIcon icon={item.icon} className="text-sm" />
                </span>
                <h3 className="mb-0 mt-3 text-sm font-bold text-slate-950">{item.title}</h3>
              </button>
            ))}
          </div>

          <div className="mx-auto mt-6 max-w-3xl rounded border border-[#dbe5ff] bg-[#f7faff] px-5 py-4 text-center">
            <h3 className="m-0 text-base font-bold text-slate-950">{selectedSolution.title}</h3>
            <p className="m-0 mt-2 text-sm leading-6 text-slate-600">{selectedSolution.desc}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f7fb] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#2f5cf6]">Products</p>
              <h2 className="m-0 text-3xl font-bold text-slate-950">Recruitment products for every hiring need</h2>
            </div>
            <Link
              href="/business"
              className="inline-flex w-fit items-center gap-2 rounded bg-[#2f5cf6] px-5 py-3 text-sm font-bold text-white no-underline hover:bg-[#244ee0] hover:text-white"
            >
              Explore all products
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.title}
                className={`overflow-hidden rounded border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.10)] ${
                  activeProduct === product.title ? "border-[#2f5cf6]" : "border-slate-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveProduct(product.title)}
                  className="block w-full border-0 bg-transparent p-0 text-left"
                >
                  <div className="h-32 bg-slate-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={420}
                      height={220}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="m-0 text-base font-bold text-slate-950">{product.title}</h3>
                    <p className="m-0 mt-2 min-h-[60px] text-sm leading-6 text-slate-500">{product.desc}</p>
                    <div className="my-4 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-[#eef3ff] px-3 py-1 text-xs font-semibold text-[#2f5cf6]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#2f5cf6]">
                      {product.cta}
                      <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-5 rounded border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[220px_1fr_auto] md:items-center">
            <div className="h-28 overflow-hidden rounded bg-slate-100">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                width={300}
                height={180}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#2f5cf6]">Selected product</p>
              <h3 className="m-0 text-xl font-bold text-slate-950">{selectedProduct.title}</h3>
              <p className="m-0 mt-2 text-sm leading-6 text-slate-500">{selectedProduct.desc}</p>
            </div>
            <Link
              href="/business"
              className="inline-flex items-center justify-center rounded border border-[#2f5cf6] px-5 py-3 text-sm font-bold text-[#2f5cf6] no-underline hover:bg-[#2f5cf6] hover:text-white"
            >
              Know more
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#2f5cf6]">Business type</p>
            <h2 className="m-0 text-3xl font-bold text-slate-950">Built for companies and hiring agencies</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Whether you hire for your own teams or manage roles for clients, Xhirez keeps every recruitment workflow simple.
            </p>
            <div className="mt-6 inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
              {Object.entries(hiringModes).map(([key, mode]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setHiringMode(key)}
                  className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                    hiringMode === key ? "bg-[#2f5cf6] text-white" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
            <div className="mt-6 border-l-4 border-[#2f5cf6] bg-[#f7faff] p-5">
              <h3 className="m-0 text-lg font-bold text-slate-950">{selectedHiringMode.title}</h3>
              <p className="m-0 mt-2 text-sm leading-6 text-slate-600">{selectedHiringMode.desc}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {brands.map((brand) => (
              <article key={brand.name} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded bg-[#eef3ff] text-[#2f5cf6]">
                  <FontAwesomeIcon icon={faBuilding} className="text-sm" />
                </span>
                <h3 className="mb-0 mt-4 text-base font-bold text-slate-950">{brand.name}</h3>
                <p className="m-0 mt-2 text-sm leading-6 text-slate-500">{brand.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f7fb] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#2f5cf6]">How it works</p>
            <h2 className="m-0 text-3xl font-bold text-slate-950">Start hiring in three simple steps</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {processSteps.map(([step, title, desc]) => (
              <article key={step} className="rounded border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-sm font-bold text-[#2f5cf6]">{step}</span>
                <h3 className="mb-0 mt-3 text-lg font-bold text-slate-950">{title}</h3>
                <p className="m-0 mt-2 text-sm leading-6 text-slate-500">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#2f5cf6]">Trusted by recruiters</p>
              <h2 className="m-0 text-3xl font-bold text-slate-950">Recruitment teams use Xhirez to move faster</h2>
            </div>
            <Link
              href="/job-post"
              className="inline-flex w-fit items-center gap-2 rounded bg-[#2f5cf6] px-5 py-3 text-sm font-bold text-white no-underline hover:bg-[#244ee0] hover:text-white"
            >
              Post a job
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
                <p className="m-0 text-sm leading-6 text-slate-600">{`"${item.quote}"`}</p>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="m-0 text-sm font-bold text-slate-950">{item.name}</p>
                  <p className="m-0 mt-1 text-xs font-semibold text-slate-500">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RecruitFooter />
      <ToastContainer />
    </main>
  );
}
