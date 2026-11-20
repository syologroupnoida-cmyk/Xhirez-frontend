import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faBriefcase,
  faCheck,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faShieldHalved,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "@/router-dom";
import { API_ENDPOINTS } from "../apiConfig.jsx";

const initialFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  otp: ["", "", "", ""],
};

const benefits = [
  "Post jobs and manage applicants from one dashboard",
  "Search relevant candidates faster with smart filters",
  "Track hiring activity across company and consultancy workflows",
];

export default function RecruiterSignUp() {
  const [formData, setFormData] = useState(initialFormData);
  const [isAgreed, setIsAgreed] = useState(false);
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState({
    isSendingOtp: false,
    isVerifyingOtp: false,
    isSigningUp: false,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (error[name]) {
      setError((current) => ({ ...current, [name]: "" }));
    }
  };

  const handleOtpChange = (event, index) => {
    const { value } = event.target;
    if (!/^[0-9]?$/.test(value)) return;

    const nextOtp = [...formData.otp];
    nextOtp[index] = value;
    setFormData((current) => ({ ...current, otp: nextOtp }));
    setError((current) => ({ ...current, otp: "" }));

    if (value && index < 3) {
      document.getElementById(`recruiter-otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (event, index) => {
    if (event.key === "Backspace" && !formData.otp[index] && index > 0) {
      document.getElementById(`recruiter-otp-${index - 1}`)?.focus();
    }
  };

  const validateEmailStep = () => {
    const validationErrors = {};

    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Enter a valid work email";
    }

    setError(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validateSignup = () => {
    const validationErrors = {};

    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    }

    if (!isOtpVerified) {
      validationErrors.otp = "Please verify OTP before signing up";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else {
      const passwordErrors = [];

      if (!/[A-Z]/.test(formData.password)) passwordErrors.push("one uppercase letter");
      if (!/\d/.test(formData.password)) passwordErrors.push("one number");
      if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password)) {
        passwordErrors.push("one special character");
      }
      if (formData.password.length < 6) passwordErrors.push("minimum 6 characters");

      if (passwordErrors.length > 0) {
        validationErrors.password = `Password must include ${passwordErrors.join(", ")}`;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (!isAgreed) {
      validationErrors.terms = "You must agree to the Terms & Conditions";
    }

    setError(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateEmailStep()) return;

    setLoading((current) => ({ ...current, isSendingOtp: true }));

    try {
      const response = await axios.get(API_ENDPOINTS.CHECKVERIFYEMAILOTPFORSIGNUP, {
        params: { email: formData.email },
      });

      if (response.data.status === 200) {
        toast.success("OTP sent to your email");
        setIsOtpSent(true);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error("An error occurred while sending OTP.");
    } finally {
      setLoading((current) => ({ ...current, isSendingOtp: false }));
    }
  };

  const handleVerifyOtp = async () => {
    const otp = formData.otp.join("");

    if (otp.length !== 4) {
      setError((current) => ({ ...current, otp: "Please enter a 4-digit OTP" }));
      return;
    }

    setLoading((current) => ({ ...current, isVerifyingOtp: true }));

    try {
      const response = await axios.get(API_ENDPOINTS.VERIFYEMAILOTPFORSIGNUP, {
        params: { email: formData.email, otp },
      });

      if (response.data.status === 200) {
        toast.success("OTP verified successfully");
        setIsOtpVerified(true);
        setError((current) => ({ ...current, otp: "" }));
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      toast.error("An error occurred while verifying OTP.");
    } finally {
      setLoading((current) => ({ ...current, isVerifyingOtp: false }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateSignup()) return;

    setLoading((current) => ({ ...current, isSigningUp: true }));

    try {
      const response = await axios.post(API_ENDPOINTS.REGISTERADMIN, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.status === 200) {
        toast.success("Recruiter signup successful");
        setTimeout(() => {
          navigate("/employer-login");
          setFormData(initialFormData);
          setIsOtpSent(false);
          setIsOtpVerified(false);
          setIsAgreed(false);
        }, 1800);
      } else if (response.data.status === 400) {
        toast.error("Please fill the form properly");
      } else {
        toast.error("Email already exists. Please use another email.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError((current) => ({ ...current, general: "An error occurred while registering." }));
    } finally {
      setLoading((current) => ({ ...current, isSigningUp: false }));
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-black font-sans text-white">
      <section
        className="relative flex min-h-screen items-center justify-center px-4 py-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 70%, rgba(44,91,255,0.42), transparent 35%), linear-gradient(180deg, #000 0%, rgba(0,0,0,0.92) 45%, #06133a 100%)",
        }}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/images/banner/recruitment.jpg"
        >
          <source
            src="https://videos.pexels.com/video-files/3184295/3184295-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/45" />

        <section className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_420px]">
          <div className="hidden lg:block">
            <Image
              src="/assets/images/logo/Xhirez-Logo.png"
              alt="Xhirez"
              width={180}
              height={56}
              className="mb-10 h-14 w-auto brightness-0 invert"
            />
            <p className="mb-5 text-[14px] font-bold uppercase tracking-[0.3em] text-white">
              Recruiter onboarding
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.16] text-white lg:text-[52px]">
              Create your hiring account and start building better pipelines
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/70">
              Verify your work email, create your recruiter access, and move into Xhirez hiring tools with a clean setup flow.
            </p>
            <div className="mt-8 space-y-3">
              {benefits.map((benefit) => (
                <p key={benefit} className="m-0 flex items-center gap-3 text-sm font-semibold text-white/85">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2f5cf6] text-[10px]">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  {benefit}
                </p>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[420px] rounded bg-white p-7 text-slate-900 shadow-2xl">
            <div className="mb-7 text-center">
              <Image
                src="/assets/images/logo/Xhirez-Logo.png"
                alt="Xhirez"
                width={160}
                height={48}
                className="mx-auto mb-4 h-12 w-auto object-contain"
              />
              <div className="mx-auto flex w-fit rounded-full bg-[#f1f1f1] p-1">
                <span className="rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-950">
                  Recruiter sign up
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-3">
              <FormField icon={faUser} error={error.fullName}>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-normal text-black outline-none"
                  placeholder="Full name"
                />
              </FormField>

              <FormField icon={faEnvelope} error={error.email}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isOtpSent}
                  className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-normal text-black outline-none disabled:text-slate-500"
                  placeholder="Work email"
                />
              </FormField>

              {!isOtpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading.isSendingOtp}
                  className="h-12 w-full rounded border-0 bg-[#2f5cf6] text-sm font-semibold text-white transition hover:bg-[#234ee3] disabled:cursor-not-allowed disabled:opacity-75"
                >
                  {loading.isSendingOtp ? "Sending OTP..." : "Send OTP"}
                </button>
              )}

              {isOtpSent && !isOtpVerified && (
                <>
                  <div className="grid grid-cols-4 gap-2">
                    {formData.otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`recruiter-otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(event) => handleOtpChange(event, index)}
                        onKeyDown={(event) => handleOtpKeyDown(event, index)}
                        className="h-12 rounded border border-[#d4dbe8] bg-white text-center text-base font-bold text-black outline-none transition focus:border-[#2f5cf6] focus:ring-2 focus:ring-[#2f5cf6]/10"
                        aria-label={`OTP digit ${index + 1}`}
                      />
                    ))}
                  </div>
                  <p className="m-0 min-h-3 text-[10px] leading-3 text-red-500">{error.otp || ""}</p>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={loading.isVerifyingOtp}
                    className="h-12 w-full rounded border border-[#2f5cf6] bg-white text-sm font-bold text-[#2f5cf6] transition hover:bg-[#2f5cf6] hover:text-white disabled:cursor-not-allowed disabled:opacity-75"
                  >
                    {loading.isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                  </button>
                </>
              )}

              {isOtpVerified && (
                <>
                  <div className="flex items-center gap-2 rounded bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                    <FontAwesomeIcon icon={faShieldHalved} />
                    Email verified. Create your password.
                  </div>

                  <PasswordField
                    value={formData.password}
                    name="password"
                    placeholder="Password"
                    show={showPassword}
                    onChange={handleChange}
                    onToggle={() => setShowPassword((current) => !current)}
                    error={error.password}
                  />

                  <PasswordField
                    value={formData.confirmPassword}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    show={showConfirmPassword}
                    onChange={handleChange}
                    onToggle={() => setShowConfirmPassword((current) => !current)}
                    error={error.confirmPassword}
                  />

                  <label className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                    <input
                      type="checkbox"
                      checked={isAgreed}
                      onChange={(event) => setIsAgreed(event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300"
                    />
                    <span>
                      I agree to the{" "}
                      <Link href="/terms-and-conditions" className="font-bold text-[#2f5cf6] no-underline">
                        Terms & Conditions
                      </Link>
                    </span>
                  </label>
                  <p className="m-0 min-h-3 text-[10px] leading-3 text-red-500">{error.terms || ""}</p>

                  <button
                    type="submit"
                    disabled={loading.isSigningUp}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded border-0 bg-[#2f5cf6] text-sm font-semibold text-white transition hover:bg-[#234ee3] disabled:cursor-not-allowed disabled:opacity-75"
                  >
                    {loading.isSigningUp ? "Creating account..." : "Create account"}
                    {!loading.isSigningUp && <FontAwesomeIcon icon={faArrowRight} className="text-xs" />}
                  </button>
                </>
              )}
            </form>

            {error.general && <p className="mt-3 text-center text-xs text-red-500">{error.general}</p>}

            <div className="mt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/employer-login" className="font-bold text-[#2f5cf6] no-underline hover:text-[#2f5cf6]">
                Log in
              </Link>
            </div>

            <div className="mt-6 flex justify-center gap-3 text-slate-400">
              {[faFacebook, faTwitter, faLinkedin].map((icon) => (
                <span key={icon.iconName} className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                  <FontAwesomeIcon icon={icon} className="text-sm" />
                </span>
              ))}
            </div>
          </div>
        </section>
      </section>
      <ToastContainer />
    </main>
  );
}

function FormField({ icon, error, children }) {
  return (
    <div className="space-y-1">
      <label className="block w-full">
        <span className="flex h-12 w-full items-center gap-3 rounded border border-[#d4dbe8] bg-white px-4 transition focus-within:border-[#2f5cf6] focus-within:ring-2 focus-within:ring-[#2f5cf6]/10">
          <FontAwesomeIcon icon={icon} className="text-sm text-slate-400" />
          {children}
        </span>
      </label>
      <p className="m-0 min-h-3 text-[10px] leading-3 text-red-500">{error || ""}</p>
    </div>
  );
}

function PasswordField({ name, value, placeholder, show, onChange, onToggle, error }) {
  return (
    <FormField icon={faLock} error={error}>
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-normal text-black outline-none"
        placeholder={placeholder}
      />
      <button
        type="button"
        className="flex h-6 w-6 items-center justify-center border-0 bg-transparent p-0 text-slate-400"
        onClick={onToggle}
        aria-label={show ? "Hide password" : "Show password"}
      >
        <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
      </button>
    </FormField>
  );
}
