import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faEye,
  faEyeSlash,
  faBriefcase,
  faBookOpen,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "@/router-dom";
import { API_ENDPOINTS } from "../apiConfig";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  mobile: "",
  workStatus: "",
  updates: false,
};

const validate = (f) => {
  const e = {};
  if (!f.fullName.trim()) e.fullName = "Full name is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email ID";
  if (f.password.length < 6) e.password = "Password must be at least 6 characters";
  if (!/^[6-9]\d{9}$/.test(f.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
  if (!f.workStatus) e.workStatus = "Select your work status";
  return e;
};

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [step, setStep] = useState("form"); // "form" | "otp"
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState("");

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const set = (name) => (e) => {
    let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (name === "mobile") value = value.replace(/\D/g, "").slice(0, 10);
    setForm((f) => ({ ...f, [name]: value }));
  };
  const blur = (name) => () => setTouched((t) => ({ ...t, [name]: true }));
  const showErr = (name) => touched[name] && errors[name];

  /* Step 1: send OTP to the email */
  const sendOtp = async (e) => {
    e?.preventDefault();
    setTouched({ fullName: true, email: true, password: true, mobile: true, workStatus: true });
    if (!isValid) return;

    setLoading("send");
    try {
      const res = await axios.get(API_ENDPOINTS.CHECKVERIFYEMAILOTPFORSIGNUP, {
        params: { email: form.email.trim() },
      });
      if (res.data?.status === 200) {
        toast.success("OTP sent to your email");
        setOtp(["", "", "", ""]);
        setStep("otp");
      } else {
        toast.error(res.data?.message || "Could not send OTP. This email may already be registered.");
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      toast.error("Something went wrong while sending the OTP.");
    } finally {
      setLoading("");
    }
  };

  /* Step 2: verify OTP, then create the account */
  const verifyAndRegister = async (e) => {
    e?.preventDefault();
    const code = otp.join("");
    if (code.length !== 4) {
      toast.error("Please enter the 4-digit OTP");
      return;
    }

    setLoading("register");
    try {
      const v = await axios.get(API_ENDPOINTS.VERIFYEMAILOTPFORSIGNUP, {
        params: { email: form.email.trim(), otp: code },
      });
      if (v.data?.status !== 200) {
        toast.error("Invalid OTP. Please try again.");
        return;
      }

      const r = await axios.post(API_ENDPOINTS.REGISTER, {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        mobile: form.mobile,        // sent along; backend must accept/ignore it
        workStatus: form.workStatus, // sent along; backend must accept/ignore it
        tokenid: "",
      });

      if (r.data?.status === 200) {
        toast.success("Registration successful! Please log in.");
        setTimeout(() => navigate("/login"), 1500);
      } else if (r.data?.status === 400) {
        toast.error("Please fill the form properly.");
      } else {
        toast.error("Email already exists. Please use another email.");
      }
    } catch (err) {
      console.error("Register error:", err);
      toast.error("An error occurred while registering.");
    } finally {
      setLoading("");
    }
  };

  const onOtpChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 3) document.getElementById(`rg-otp-${i + 1}`)?.focus();
  };
  const onOtpKey = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) document.getElementById(`rg-otp-${i - 1}`)?.focus();
  };

  return (
    <div className="xh-rg-page">
      <Head><title>Register | Xhirez</title></Head>

      {/* Top bar */}
      <header className="xh-rg-top">
        <div className="xh-rg-top-in">
          <Link to="/"><img src="/assets/images/logo/Xhirez-Logo.png" alt="Xhirez" className="xh-rg-logo" /></Link>
          <p>Already Registered? <Link to="/login">Login</Link> here</p>
        </div>
      </header>

      <main className="xh-rg-main">
        {/* Left benefits card */}
        <aside className="xh-rg-side">
          <div className="xh-rg-avatar"><FontAwesomeIcon icon={faUserTie} /></div>
          <h3>On registering, you can</h3>
          <ul>
            <li><FontAwesomeIcon icon={faCircleCheck} /> Build your profile and let recruiters find you</li>
            <li><FontAwesomeIcon icon={faCircleCheck} /> Get job postings delivered right to your email</li>
            <li><FontAwesomeIcon icon={faCircleCheck} /> Find a job and grow your career</li>
          </ul>
        </aside>

        {/* Form card */}
        <section className="xh-rg-card">
          <div className="xh-rg-card-grid">
            <div>
              <h1>Create your Xhirez profile</h1>
              <p className="xh-rg-lead">Search &amp; apply to jobs on Xhirez</p>

              {step === "form" ? (
                <form onSubmit={sendOtp} noValidate>
                  <div className="xh-rg-group">
                    <label>Full name<span>*</span></label>
                    <input
                      type="text" placeholder="What is your name?"
                      value={form.fullName} onChange={set("fullName")} onBlur={blur("fullName")}
                      className={showErr("fullName") ? "has-err" : ""}
                    />
                    {showErr("fullName") && <small className="xh-rg-err">{errors.fullName}</small>}
                  </div>

                  <div className="xh-rg-group">
                    <label>Email ID<span>*</span></label>
                    <input
                      type="email" placeholder="Tell us your Email ID"
                      value={form.email} onChange={set("email")} onBlur={blur("email")}
                      className={showErr("email") ? "has-err" : ""}
                    />
                    {showErr("email")
                      ? <small className="xh-rg-err">{errors.email}</small>
                      : <small className="xh-rg-hint">We'll send relevant jobs and updates to this email</small>}
                  </div>

                  <div className="xh-rg-group">
                    <label>Password<span>*</span></label>
                    <div className="xh-rg-pw">
                      <input
                        type={showPw ? "text" : "password"} placeholder="(Minimum 6 characters)"
                        value={form.password} onChange={set("password")} onBlur={blur("password")}
                        className={showErr("password") ? "has-err" : ""}
                      />
                      <button type="button" onClick={() => setShowPw((s) => !s)} aria-label="Show or hide password">
                        <FontAwesomeIcon icon={showPw ? faEyeSlash : faEye} />
                      </button>
                    </div>
                    {showErr("password")
                      ? <small className="xh-rg-err">{errors.password}</small>
                      : <small className="xh-rg-hint">This helps your account stay protected</small>}
                  </div>

                  <div className="xh-rg-group">
                    <label>Mobile number<span>*</span></label>
                    <div className={`xh-rg-phone ${showErr("mobile") ? "has-err" : ""}`}>
                      <b>+91</b>
                      <input
                        type="tel" placeholder="Enter your mobile number"
                        value={form.mobile} onChange={set("mobile")} onBlur={blur("mobile")}
                      />
                    </div>
                    {showErr("mobile")
                      ? <small className="xh-rg-err">{errors.mobile}</small>
                      : <small className="xh-rg-hint">Recruiters will contact you on this number</small>}
                  </div>

                  <div className="xh-rg-group">
                    <label>Work status<span>*</span></label>
                    <div className="xh-rg-status">
                      <button
                        type="button"
                        className={form.workStatus === "experienced" ? "is-on" : ""}
                        onClick={() => { setForm((f) => ({ ...f, workStatus: "experienced" })); setTouched((t) => ({ ...t, workStatus: true })); }}
                      >
                        <div>
                          <strong>I'm experienced</strong>
                          <p>I have work experience (excluding internships)</p>
                        </div>
                        <FontAwesomeIcon icon={faBriefcase} />
                      </button>
                      <button
                        type="button"
                        className={form.workStatus === "fresher" ? "is-on" : ""}
                        onClick={() => { setForm((f) => ({ ...f, workStatus: "fresher" })); setTouched((t) => ({ ...t, workStatus: true })); }}
                      >
                        <div>
                          <strong>I'm a fresher</strong>
                          <p>I am a student / Haven't worked after graduation</p>
                        </div>
                        <FontAwesomeIcon icon={faBookOpen} />
                      </button>
                    </div>
                    {showErr("workStatus") && <small className="xh-rg-err">{errors.workStatus}</small>}
                  </div>

                  <label className="xh-rg-check">
                    <input type="checkbox" checked={form.updates} onChange={set("updates")} />
                    <span>Send me important updates &amp; promotions via SMS, email, and <FontAwesomeIcon icon={faWhatsapp} className="xh-rg-wa" /> WhatsApp</span>
                  </label>

                  <p className="xh-rg-terms">
                    By clicking Register, you agree to the <Link to="/about">Terms and Conditions</Link> &amp; <Link to="/about">Privacy Policy</Link> of Xhirez
                  </p>

                  <button type="submit" className="xh-rg-submit" disabled={!isValid || loading === "send"}>
                    {loading === "send" ? "Sending OTP..." : "Register now"}
                  </button>
                </form>
              ) : (
                <form onSubmit={verifyAndRegister} noValidate>
                  <div className="xh-rg-otp-box">
                    <p>We sent a 4-digit OTP to <b>{form.email}</b></p>
                    <div className="xh-rg-otp">
                      {otp.map((d, i) => (
                        <input
                          key={i} id={`rg-otp-${i}`} inputMode="numeric" maxLength={1}
                          value={d} onChange={(e) => onOtpChange(i, e.target.value)} onKeyDown={(e) => onOtpKey(i, e)}
                          autoFocus={i === 0}
                        />
                      ))}
                    </div>
                    <button type="button" className="xh-rg-link" onClick={sendOtp} disabled={loading === "send"}>Resend OTP</button>
                    <button type="button" className="xh-rg-link" onClick={() => setStep("form")}>Change email</button>
                  </div>

                  <button type="submit" className="xh-rg-submit" disabled={otp.join("").length !== 4 || loading === "register"}>
                    {loading === "register" ? "Registering..." : "Verify & Register"}
                  </button>
                </form>
              )}
            </div>

            {/* Continue with Google */}
            <div className="xh-rg-or">
              <span className="xh-rg-or-line" />
              <div className="xh-rg-or-body">
                <em>Or</em>
                <div>
                  <p>Continue with</p>
                  <Link to="/login" className="xh-rg-google">
                    <FontAwesomeIcon icon={faGoogle} /> Google
                  </Link>
                </div>
              </div>
              <span className="xh-rg-or-line" />
            </div>
          </div>
        </section>
      </main>

      <footer className="xh-rg-foot">
        <div><Link to="/about">About Us</Link></div>
        <p>All rights reserved © {new Date().getFullYear()} Xhirez</p>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default Register;