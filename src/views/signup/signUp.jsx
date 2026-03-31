import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock, faUser, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../apiConfig.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import CSS
import { Link } from "react-router-dom";
import icon from '../../../public/assets/images/logo/Xhirez-Logo.png';
import backlogo from '../../../public/assets/images/logo/Xhirez-Logo-Background.png';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ["", "", "", ""], // Array for 4-digit OTP
  });

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

  // Handle form field changes with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Real-time validation for fullName
    if (name === "fullName" && !value.trim()) {
      setError((prev) => ({ ...prev, fullName: "Full name is required" }));
    } else if (name === "fullName") {
      setError((prev) => ({ ...prev, fullName: null }));
    }
  };

  // Handle OTP input changes
  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) { 
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData((prevData) => ({
        ...prevData,
        otp: newOtp,
      }));

      // Auto-focus next input
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // Handle OTP input key navigation
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  // Handle sending OTP
  const handleSendOtp = async () => {
    let validationErrors = {};


    if (!formData.fullName.trim()) {
      setError((prev) => ({ ...prev, fullName: "Full name is required" }));
      return;
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
      setError(validationErrors);
      return;
    }

    setError({});
    setLoading((prev) => ({ ...prev, isSendingOtp: true }));

    try {
      const response = await axios.get(API_ENDPOINTS.CHECKVERIFYEMAILOTPFORSIGNUP, {
        params: {
          email: formData.email,
        },
      });

      if (response.data.status === 200) {
        toast.success("OTP sent to your email!");
        setIsOtpSent(true);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error("An error occurred while sending OTP.");
    } finally {
      setLoading((prev) => ({ ...prev, isSendingOtp: false }));
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    const otp = formData.otp.join("");
    if (otp.length !== 4) {
      setError({ otp: "Please enter a 4-digit OTP" });
      return;
    }

    setLoading((prev) => ({ ...prev, isVerifyingOtp: true }));

    try {
      const response = await axios.get(API_ENDPOINTS.VERIFYEMAILOTPFORSIGNUP, {
        params: {
          email: formData.email,
          otp: otp,
        },
      });

      if (response.data.status === 200) {
        toast.success("OTP verified successfully!");
        setIsOtpVerified(true);
        setError({});
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      toast.error("An error occurred while verifying OTP.");
    } finally {
      setLoading((prev) => ({ ...prev, isVerifyingOtp: false }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else {
      const errors = [];
    
      if (!/[A-Z]/.test(formData.password)) {
        errors.push("at least one uppercase letter");
      }
    
      if (!/\d/.test(formData.password)) {
        errors.push("at least one number");
      }
    
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
        errors.push("at least one special character");
      }
    
      if (formData.password.length < 6) {
        errors.push("minimum 6 characters");
      }
    
      if (errors.length > 0) {
        validationErrors.password = "Password must include " + errors.join(", ");
      }
    }
    
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!isAgreed) {
      validationErrors.terms = "You must agree to the Terms & Conditions!";
    }

    if (!isOtpVerified) {
      validationErrors.otp = "Please verify OTP before signing up";
    }

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setError({});
    setLoading((prev) => ({ ...prev, isSigningUp: true }));

    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.status === 200) {
        toast.success("User signUp successfully!");
        setTimeout(() => {
          navigate('/login'); 
          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            otp: ["", "", "", ""],
          });
        }, 2000);
        setIsOtpSent(false);
        setIsOtpVerified(false);
      } else if (response.data.status === 400) {
        toast.error("Please fill the form properly");
      } else {
        toast.error("Email Already Exists please Change it!");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError({ general: "An error occurred while registering." });
    } finally {
      setLoading((prev) => ({ ...prev, isSigningUp: false }));
    }
  };

  return (
    <div className="main-sec">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="logo text-start">
              <img src={icon} width="100%" alt="Logo" />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="login-form">
              <h1 style={styles.header}>Create Account</h1>
              <form onSubmit={handleSubmit} style={styles.form}>
                <div className="formgroup" style={styles.formGroup}>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
                  <FontAwesomeIcon icon={faUser} size="1x" />
                </div>
                {error.fullName && <p style={styles.error}>{error.fullName}</p>}

                <div className="formgroup" style={styles.formGroup}>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" disabled={isOtpSent} />
                  <FontAwesomeIcon icon={faEnvelope} size="1x" />
                </div>
                {error.email && <p style={styles.error}>{error.email}</p>}

                {!isOtpSent && (
                  <div className="formgroup mt-2">
                    <button type="button" style={styles.button} onClick={handleSendOtp} disabled={loading.isSendingOtp}>
                      {loading.isSendingOtp && <span style={styles.spinner}></span>}
                      {loading.isSendingOtp ? "Loading..." : "Send OTP"}
                    </button>
                  </div>
                )}

                {isOtpSent && !isOtpVerified && (
                  <div className="formgroup" style={{ ...styles.formGroup, display: 'flex', gap: '5px', justifyContent: 'center' }}>
                    {formData.otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        style={{ width: '40px', textAlign: 'center', fontSize: '16px' }}
                      />
                    ))}
                  </div>
                )}
                {error.otp && <p style={styles.error}>{error.otp}</p>}

                {isOtpSent && !isOtpVerified && (
                  <div className="formgroup mt-2">
                    <button type="button" style={styles.button} onClick={handleVerifyOtp} disabled={loading.isVerifyingOtp}>
                      {loading.isVerifyingOtp && <span style={styles.spinner}></span>}
                      {loading.isVerifyingOtp ? "Loading..." : "Verify OTP"}
                    </button>
                  </div>
                )}

                {isOtpVerified && (
                  <>
                    <div className="formgroup" style={styles.formGroup}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                      />
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={styles.icon} onClick={() => setShowPassword(!showPassword)} />
                    </div>
                    {error.password && <p style={styles.error}>{error.password}</p>}

                    <div className="formgroup" style={styles.formGroup}>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                      />
                      <FontAwesomeIcon
                        icon={showConfirmPassword ? faEye : faEyeSlash}
                        style={styles.icon}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    </div>
                    {error.confirmPassword && <p style={styles.error}>{error.confirmPassword}</p>}

                    <div className="formgroupp">
                      <label className="checkboxContainer">
                        <input type="checkbox" checked={isAgreed} onChange={handleCheckboxChange} />
                        I agree to{" "}
                        <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                          Terms & Conditions
                        </a>
                      </label>
                    </div>
                    {error.terms && <p style={styles.error}>{error.terms}</p>}

                    <div className="formgroup mt-2">
                      <button type="submit" style={styles.button} disabled={loading.isSigningUp}>
                        {loading.isSigningUp && <span style={styles.spinner}></span>}
                        {loading.isSigningUp ? "Loading..." : "Sign Up"}
                      </button>
                    </div>
                  </>
                )}
              </form>

              <div className="login-sig text-center">
                <p>
                  Already have an account? <Link to="/login">Log In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="bottom-login">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="logo text-center">
                  {/* <img
                    src="assets/images/logo/Xhirez-Logo-Background.png"
                    width="100%"
                    alt=""
                  /> */}
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <div className="logo-text text-center">
                  <p>Xhirez @2025 All Rights Reserved</p>
                </div>
              </div>
               <div className="col-md-4 d-flex justify-content-center align-items-center">
                  <div className="social-icon" style={{ display: "flex", gap: "10px" }}>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faFacebook} style={{fontSize:"25px"}}  color="#fff" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faTwitter} style={{fontSize:"25px"}}  color="#fff" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faLinkedin} style={{fontSize:"25px"}}  color="#fff" />
                    </a>
                  </div>
                </div>        
            </div>
          </div>
        </div>

      <ToastContainer />
      
    </div>
  );
};

const styles = {
  error: { color: "red", fontSize: "10px", marginBottom: "5px" },
  spinner: {
    display: "inline-block",
    width: "16px",
    height: "16px",
    border: "2px solid #fff",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    marginRight: "8px",
    verticalAlign: "middle",
  },
  // Define the keyframes for the spinner animation
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

export default SignUpPage