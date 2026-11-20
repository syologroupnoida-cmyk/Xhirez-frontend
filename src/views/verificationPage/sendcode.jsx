// src/loginpage/loginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "@/router-dom"; // Import useNavigate
import "./varifycode";
import "./sendcode";
import { Link } from "@/router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { API_ENDPOINTS } from "../apiConfig";

const Otpcodesent = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [apiOtpResponse, setApiOtpResponse] = useState(null);

  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();

    setIsSending(true);

    if (!emailOrPhone) {
      setError("Email or Phone number is required!");
      setIsSending(false); 
      return;
    }

    axios.get(API_ENDPOINTS.CHECKVERIFYEMAILFOROTP, {
        params: { email: emailOrPhone },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setIsOtpSent(true);
          setSuccess(
            "OTP sent successfully! Please check your email!"
          );

          setError("");
          localStorage.setItem("otpExpiry", Date.now() + 120000);  // also add 2 minutes in the otpexpiry in localstorage
          navigate("/verify", {state: { emailOrPhone },});

        } else {
          setError(response.data.statusText || "Failed to send OTP.");
          return;
        }
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        setError("Failed to send OTP. Please try again.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <>
      <div className="main-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="logo text-start">
                <img
                  src="/assets/images/logo/Xhirez-Logo.png"
                  width="100%"
                  alt=""
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="login-form">
                <h1 style={styles.header}>OTP Verification</h1>
                <form onSubmit={handleSendOtp} style={styles.form}>
                  {!isOtpSent && (
                    <div className="formgroup" style={styles.formGroup}>
                      <input
                        type="text"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        style={styles.input}
                        placeholder="Enter Email or Phone"
                      />
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        size="1x"
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "55%",
                          color: "#75757E",
                        }}
                      />
                    </div>
                  )}

                  {isOtpSent && (
                    <div className="formgroup" style={styles.formGroup}>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={styles.input}
                        placeholder="Enter OTP"
                      />
                      <FontAwesomeIcon
                        icon={faMobileAlt}
                        size="1x"
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "55%",
                          color: "#75757E",
                        }}
                      />
                    </div>
                  )}

                  {error && (
                    <p className="text-danger" style={styles.error}>
                      {error}
                    </p>
                  )}
                  {success && (
                    <p className="text-success" style={styles.success}>
                      {success}
                    </p>
                  )}

                  <div
                    className="formgroup mt-2"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                   <button type="submit" style={styles.button} disabled={isSending}>
                      {isSending ? (
                        <>
                          <span style={styles.spinner}></span> Sending...
                        </>
                      ) : (
                        'Send OTP'
                      )}
                    </button>
                  </div>
                </form>
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
                <img
                  src="/assets/images/logo/Xhirez-Logo-Background.png"
                  width="100%"
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <div className="logo-text text-center">
                <p>Xhirez @2025 All Rights Reserved</p>
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <div
                className="social-icon"
                style={{ display: "flex", gap: "10px" }}
              >
                <Link
                  to="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} color="#fff" />
                </Link>
                <Link
                  to="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} color="#fff" />
                </Link>
                <Link
                  to="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} color="#fff" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Inline styles for simplicity
// Inline styles for simplicity
const styles = {
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  formGroup: {
    position: 'relative',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    position: 'relative',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    margin: '5px 0',
  },
  success: {
    color: 'green',
    fontSize: '14px',
    margin: '5px 0',
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

export default Otpcodesent;
