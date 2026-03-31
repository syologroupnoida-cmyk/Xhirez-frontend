import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { faEnvelope, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { API_ENDPOINTS } from '../apiConfig';
import { toast, ToastContainer } from 'react-toastify';

const OTPVerificationPages = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sendedEmail, setSendedEmail] = useState('');
  const [timer, setTimer] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false); 
  const [isResending, setIsResending] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { emailOrPhone } = location.state || {};

  // Set initial OTP and email from location state
  useEffect(() => {

    if (!emailOrPhone) {
      toast.error('No email or phone number provided.');
      navigate('/recoverPass'); 
    }
  }, [emailOrPhone]);



  useEffect(() => {
  const updateRemainingTime = () => {
    const expiry = localStorage.getItem('otpExpiry');
    if (expiry) {
      const remaining = Math.floor((Number(expiry) - Date.now()) / 1000);
      if (remaining > 0) {
        setTimer(remaining);
      } else {
        setTimer(0);
        if (!error) { 
          setError('OTP expired, please resend the OTP');
          setSuccess('');
          localStorage.removeItem('otpExpiry');
        }
        clearInterval(interval); 
      }
    } else {
      setTimer(0);
    }
  };

  const interval = setInterval(updateRemainingTime, 1000);
  updateRemainingTime(); 
  return () => clearInterval(interval);
}, []);



  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-box-${index + 1}`).focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setError("");
    setSuccess("");

    const otpString = otp.join("");
    if (otpString.length < 4) {
      setError("Please enter a 4-digit OTP.");
      setSuccess("");
      setIsVerifying(false);
      return;
    }

    const apiotp = otpString;

    axios.get(API_ENDPOINTS.VERIFYEMAILOTP, {
        params: { email: emailOrPhone, otp: apiotp },
      })
      .then((response) => {
        if (response.data.status === 200) {
          toast.success( response.data.statusText || "OTP verified successfully! Redirecting to change password...");

          setSuccess("OTP verified successfully!");

          localStorage.removeItem("otpExpiry");

          setTimeout(() => {
            setError("");
            setIsVerifying(false);
            navigate("/Changepassword", {state: { emailOrPhone: emailOrPhone },});
          }, 1200);
        } else {
          setError("Invalid OTP!");
          toast.error( response.data.statusText || "Invalid OTP! Please try again.");
          setSuccess("");
          setIsVerifying(false);
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        setError("Otp Expired, Please resend the OTP");
        setSuccess("");
        setIsVerifying(false);
      })
      .finally(() => {
        setIsVerifying(false);
      });
  };

  const handleResendOtp = () => {
    setIsResending(true); // Show spinner
    axios.get(API_ENDPOINTS.CHECKVERIFYEMAILFOROTP, {
        params: { email: emailOrPhone },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setSuccess('OTP resent successfully! Please check your email or phone.');
          setSendedEmail(sendedEmail);
          setError('');
          setOtp(['', '', '', '']);
          localStorage.setItem("otpExpiry", Date.now() + 120000); // 2 minutes
          setTimer(120);
          toast.success('OTP resent successfully! Please check your email or phone.');
        } else {
          setError(response.data.statusText || 'Failed to resend OTP.');
        }
        setIsResending(false); // Hide spinner
      })
      .catch((error) => {
        setError('An error occurred while resending the OTP.');
        console.error('Error resending OTP:', error);
        setIsResending(false); // Hide spinner
      });
  };

  return (
    <>
      <div className="main-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="logo text-start">
                <img src="assets/images/logo/Xhirez-Logo.png" width="100%" alt="" />
              </div>
            </div>

            <div className="col-md-3">
              <div className="login-form">
                <h1 style={styles.header}>Verify Code</h1>
                <p className="veri-para">Enter your registered email below to receive password reset code.</p>
                <p style={styles.timer}>Time remaining: {timer} seconds</p>
                <form onSubmit={handleVerifyOtp} style={styles.form}>
                  <div className="otp-boxes" style={styles.otpBoxContainer}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-box-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        style={styles.otpBox}
                      />
                    ))}
                  </div>

                  {error && <p style={styles.error}>{error}</p>}
                  {success && <p style={styles.success}>{success}</p>}

                  <div
                    className="formgroup mt-2"
                    style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
                  >
                    <button type="submit" style={styles.button} disabled={isVerifying}>
                      {isVerifying ? (
                        <>
                          <span style={styles.spinner}></span> Verifying...
                        </>
                      ) : (
                        'Verify OTP'
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center resendbtn" style={styles.resendContainer}>
                  <button onClick={handleResendOtp} style={styles.resendButton} disabled={isResending}>
                    {isResending ? (
                      <>
                        <span style={styles.spinner}></span> Resending...
                      </>
                    ) : (
                      'Resend OTP'
                    )}
                  </button>
                </div>
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
                <img src="assets/images/logo/Xhirez-Logo-Background.png" width="100%" alt="" />
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <div className="logo-text text-center">
                <p>Xhirez @2025 All Rights Reserved</p>
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <div className="social-icon" style={{ display: 'flex', gap: '10px' }}>
                <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '25px', color: '#fff' }} />
                </Link>
                <Link to="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '25px', color: '#fff' }} />
                </Link>
                <Link to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '25px', color: '#fff' }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
      
    </>
  );
};

// Inline styles for simplicity
const styles = {
  header: {
    // Add header styles if needed, e.g., fontSize: '24px', fontWeight: 'bold'
  },
  form: {
    // Add form styles if needed
  },
  otpBoxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  otpBox: {
    // Add otpBox styles if needed, e.g., width: '40px', height: '40px', textAlign: 'center'
  },
  button: {
    // Add button styles if needed, e.g., padding: '10px 20px', backgroundColor: '#007bff'
    position: 'relative',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
  success: {
    color: 'green',
    fontSize: '14px',
  },
  resendContainer: {
    marginTop: '10px',
  },
  resendButton: {
    fontSize: '13px',
    color: '#000',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    position: 'relative',
  },
  timer: {
    fontSize: '14px',
    color: 'red',
    marginBottom: '10px',
  },
  spinner: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid #fff',
    borderTop: '2px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '8px',
  },
};

const globalStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default OTPVerificationPages;