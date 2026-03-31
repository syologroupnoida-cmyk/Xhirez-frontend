import React, { useState, useEffect } from "react";
import "../signup/signUp";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons"; 
import { API_ENDPOINTS } from '../apiConfig.jsx';
import Swal from 'sweetalert2';
import { Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { toast, ToastContainer,  } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [geoLocation, setGeoLocation] = useState({ lat: null, lon: null });
  const [checkLogs, setCheckLogs] =useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedUsername && savedPassword && savedRememberMe) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(savedRememberMe);
    }
  }, []);


  
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
    <>

       {/* Background Blur when Loading */}
       {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backdropFilter: "blur(3px)", 
            background: "rgba(255, 255, 255, 0.1)",
            zIndex: 3,
          }}
        >
          <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
        </div>
      )}


      <div className="main-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="logo text-start">
                <img
                  src="/src/assets/images/logo/Xhirez-Logo.png"
                  width="100%"
                  alt=""
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="login-form recruiterlogin">
               <h1 style={styles.header}>Recruiter Login</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                  <div className="formgroup" style={styles.formGroup}>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={styles.input}
                      placeholder="Email or Username"
                    />
                    <FontAwesomeIcon icon={faEnvelope} size="1x" />
                  </div>
                  {error.username && <p style={{ color: "red" , fontSize:"10px"}}>{error.username}</p>}

                  <div className="formgroup" style={styles.formGroup}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={styles.input}
                      placeholder="Password"
                    />
                    <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    style={styles.icon}
                    onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  {error.password && <p style={{ color: "red" , fontSize:"10px" }}>{error.password}</p>}

                  <div className="formgroup mt-2" style={styles.formGroup}>
                    <h6
                      style={{
                        ...styles.label,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span>Save Password</span>
                      </p>
                     
                    </h6>
                  </div>
                  {/* Only render error if it's a string */}
                  {/* {error && typeof error === 'string' && (
                    <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
                  )} */}

                  <div
                    className="formgroup mt-2"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <button type="submit" style={styles.button}>
                      Login to Account
                    </button>
                  </div>
                  <div className="login-sig text-center">
                  <p>
                    Don't have an account? <Link to="/recruitersignUp">Sign Up</Link>
                  </p>
                </div>
                </form>
                {/* <div className="loginor">
                  <span>OR</span>
                </div>
                <div className="login-icon flex justify-center text-center">
                  <a href="#">
                    <img
                      src="/src/assets/images/icon/google.png"
                      width={"100%"}
                      alt=""
                    />
                  </a>
                  <a href="#">
                    <img
                      src="/src/assets/images/icon/linkedin.png"
                      width={"100%"}
                      alt=""
                    />
                  </a>
                  <a href="#">
                    <img
                      src="/src/assets/images/icon/twitter.png"
                      width={"100%"}
                      alt=""
                    />
                  </a>
                </div>
                <div className="login-sig text-center">
                  <p>
                    Don't have an account? <a href="/signUp">Sign Up</a>
                  </p>
                </div> */}
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
                    src="/src/assets/images/logo/Xhirez-Logo-Background.png"
                    width="100%"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <div className="logo-text text-center">
                  <p>Xhirez @2025 All Rights Reserves</p>
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
      </div>
      <ToastContainer/>
    </>
  );
};

// Inline styles for simplicity
const styles = {};

export default LoginPage;
