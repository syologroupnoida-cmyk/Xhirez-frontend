import React, { useState, useEffect } from "react";
import "../signup/signUp";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons"; 
import { API_ENDPOINTS } from '../apiConfig.jsx';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [geoLocation, setGeoLocation] = useState({ lat: null, lon: null });

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

        if (response.data?.status === 200) {
          const users = response.data.data;



         
          const authorizationToken = response.data?.accesstoken;

          if (authorizationToken) {
          const decoded = jwtDecode(authorizationToken); 
          const exp = decoded.exp;  
          
          const tokenExpirationTime = new Date(exp * 1000); 

          Cookies.set("AuthorizationToken", authorizationToken, {
            expires: tokenExpirationTime,
            secure: true,
            sameSite: "Strict",
          });
        }



          const userRole = users?.userRole;

         
          
          if (userRole === "user") {
            const { fullName } = users;
            const authPayload = JSON.stringify({ users, fullName });


             
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




            localStorage.setItem("authToken", authPayload);
            sessionStorage.setItem("authToken", authPayload);

            
            if (rememberMe) {
              localStorage.setItem("username", username);
              localStorage.setItem("password", password);
              localStorage.setItem("rememberMe", rememberMe.toString());
            } else {
              localStorage.removeItem("username");
              localStorage.removeItem("password");
              localStorage.removeItem("rememberMe");
            }

            Swal.fire({
              title: "Login Successful!",
              text: "You will be redirected shortly.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {
              navigate("/profile-dashboard");
            });

          } else if (userRole === "admin" ||  userRole === "primeadmin" || userRole === "SuperAdmin") {
            toast.error("You are Not a User");
            setTimeout(() => {
              navigate("/employer-login");
            }, 3000);
          } else {
            navigate("/login");
          }

          setError("");
        } else if (response.data?.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Invalid email or password!",
          });
          setError("Invalid email or password!");
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


  const handleGoogleLoginSuccess = async (response) => {

    setLoading(true);
    
    const { credential } = response;
    const decoded = jwtDecode(credential);

    const { email, name, sub } = decoded;
    
    const fullName = name;
    const tokenid=sub;


    const password = "12345678";  
  
    try {
      
      const response = await axios.get(API_ENDPOINTS.VALIDATEGOOGLEREGISTER, {
        params: { email, tokenid },
      });

      if (response.data.data === 0) {

        try {
          const response = await axios.post(API_ENDPOINTS.REGISTER, {
            email,
            fullName,
            tokenid,
            password,
          });

        if (response.data.status === 200) {

          const user = {
            email : email,
            fullName : fullName,
          }

           const response = await axios.post(API_ENDPOINTS.LOGIN, null, {
             params: {
               email: user.email,
               password: password,
             },
           });


           if (response.data?.status === 200) {
             const users = response.data.data;

             
             const authorizationToken = response.data?.accesstoken;

             if (authorizationToken) {
               const decoded = jwtDecode(authorizationToken);
               const exp = decoded.exp; 

               const tokenExpirationTime = new Date(exp * 1000); 

               Cookies.set("AuthorizationToken", authorizationToken, {
                 expires: tokenExpirationTime,
                 secure: true,
                 sameSite: "Strict",
               });
             }

             

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
               .then((logResponse) => {})
               .catch((logError) => {});


             const { fullName } = users;
             localStorage.setItem("authToken",JSON.stringify({ users, fullName }));
             sessionStorage.setItem("authToken",JSON.stringify({ users, fullName }));
           }

         
  
            Swal.fire({
              title: "Google Registration Successful!",
              text: "You will be redirected shortly.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            })

            navigate("/profile-dashboard");
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
            });
          }
        } catch (registerError) {
          console.error("Error during registration:", registerError);
          toast.error("Google Registration Failed.");
        }
      } else {
       
        


        try {
          const response = await axios.post(API_ENDPOINTS.LOGIN, null, {
             params: {
               email: email,
               password: password,
             },
           });

           if (response.data?.status === 200) {
             const users = response.data.data;

            
             const authorizationToken = response.data?.accesstoken;

             if (authorizationToken) {
               const decoded = jwtDecode(authorizationToken);
               const exp = decoded.exp;

               const tokenExpirationTime = new Date(exp * 1000);

               Cookies.set("AuthorizationToken", authorizationToken, {
                 expires: tokenExpirationTime,
                 secure: true,
                 sameSite: "Strict",
               });
             }

             

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
               .then((logResponse) => {})
               .catch((logError) => {});


             const { fullName } = users;
             localStorage.setItem("authToken",JSON.stringify({ users, fullName }));
             sessionStorage.setItem("authToken",JSON.stringify({ users, fullName }));

              Swal.fire({
              title: "Login Successful!",
              text: "You will be redirected shortly.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            })

             navigate("/profile-dashboard");
             
           }
          else {
           
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
            });

          }
        } catch (fetchError) {
          console.error("Error fetching user details:", fetchError);
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
          });
        }
        
      }
    } catch (error) {
      console.error("Validation API error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
      });
    }
    finally{
      setLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    console.error('Google Login Failed');
    toast.error("Google Login Failed!");
  };


  return (
    <>
   
    
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
                  src="assets/images/logo/Xhirez-Logo.png"
                  width="100%"
                  alt=""
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="login-form">
                <h1 style={styles.header}>Login Account</h1>
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
                      <Link
                        to="/recoverPass"
                        style={{
                          ...styles.link,
                          textDecoration: "none",
                          color: "#007bff",
                        }}
                      >
                        Forgot Password?
                      </Link>
                    </h6>
                  </div>
                

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
                </form>
                <div className="loginor">
                  <span>OR</span>
                </div>
                
                <GoogleOAuthProvider  clientId="392980644053-jvuvu8q5f2nh4jeg4au7268ichl93jeg.apps.googleusercontent.com">
                  <div className="login-icon flex justify-center text-center">

                  <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={handleGoogleLoginError}
                      text="signin"
                      useOneTap
                      render={(renderProps) => (
                        <button onClick={renderProps.onClick} className="custom-google-button">
                          Login with Google
                        </button>
                      )}
                    />
                    </div>
                </GoogleOAuthProvider>
                <div className="login-sig text-center">
                  <p>
                    Don't have an account? <Link to="/signUp">Sign Up</Link>
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
      </div>

      <ToastContainer/>
    </>
  );
};


const styles = {};

export default LoginPage;