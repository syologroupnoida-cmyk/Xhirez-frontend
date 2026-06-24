import React, { useState, useEffect } from "react";
import "../signup/SignUp";
import { useNavigate } from "@/router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEyeSlash, faEye, faUser } from "@fortawesome/free-solid-svg-icons"; 
import { API_ENDPOINTS } from '../apiConfig.jsx';
import Swal from 'sweetalert2';
import { Link } from "@/router-dom";
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

  const clearFieldError = (fieldName) => {
    setError((current) => {
      if (!current?.[fieldName]) {
        return current;
      }

      const nextError = { ...current };
      delete nextError[fieldName];
      return nextError;
    });
  };

  
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
   
    
      <div className="main-sec" style={styles.page}>
        <div style={styles.overlay}>
          <div style={styles.loginShell}>
            <div className="login-form" style={styles.card}>
                <div style={styles.logoWrap}>
                  <img
                    src="/assets/images/logo/Xhirez-Logo.png"
                    alt="Xhirez"
                    style={styles.logo}
                  />
                </div>
                <h1 style={styles.header}>Login Account</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                  <div className="formgroup" style={styles.formGroup}>
                    <FontAwesomeIcon icon={faEnvelope} size="1x" style={styles.fieldIcon} />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        clearFieldError("username");
                      }}
                      style={styles.input}
                      placeholder="Email or Username"
                    />
                  </div>
                  <p style={styles.errorText}>{error.username || ""}</p>

                  <div className="formgroup" style={styles.formGroup}>
                    <FontAwesomeIcon icon={faUser} size="1x" style={styles.fieldIcon} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        clearFieldError("password");
                      }}
                      style={styles.input}
                      placeholder="Password"
                    />
                    <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    style={styles.icon}
                    onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  <p style={styles.errorText}>{error.password || ""}</p>

                  <div className="mt-2" style={styles.optionRow}>
                    <h6
                      style={{
                        ...styles.label,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          style={styles.checkbox}
                        />
                        <span>Save Password</span>
                      </p>
                      <Link
                        to="/recoverPass"
                        style={{
                          ...styles.link,
                          textDecoration: "none",
                          color: "#fff",
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
                      marginTop: "16px",
                    }}
                  >
                    <button type="submit" style={styles.button} disabled={loading}>
                      {loading ? (
                        <span style={styles.buttonLoading}>
                          <span style={{ ...styles.dotSpinner, animationDelay: "0ms" }} />
                          <span style={{ ...styles.dotSpinner, animationDelay: "140ms" }} />
                          <span style={{ ...styles.dotSpinner, animationDelay: "280ms" }} />
                        </span>
                      ) : (
                        "Login to Account"
                      )}
                    </button>
                  </div>
                </form>
                <div className="loginor" style={styles.orDivider}>
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
                  <p style={styles.signupText}>
                    Don't have an account? <Link to="/signUp" style={styles.signupLink}>Sign Up</Link>
                  </p>
                </div>

                
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes xhLoginDots {
            0%, 80%, 100% {
              opacity: 0.35;
              transform: translateY(0);
            }
            40% {
              opacity: 1;
              transform: translateY(-3px);
            }
          }
        `}
      </style>
      <ToastContainer/>
    </>
  );
};


const styles = {
  page: {
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    padding: 0,
    margin: 0,
    backgroundImage: "url('/assets/images/banner/home-banner.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
  },
  overlay: {
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "18px 16px",
    background: "rgba(3, 12, 24, 0.58)",
    backdropFilter: "saturate(120%)",
  },
  loginShell: {
    width: "100%",
    maxWidth: 390,
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    padding: "20px 24px",
    borderRadius: 12,
    border: "1px solid rgba(255, 255, 255, 0.32)",
    background: "rgba(255, 255, 255, 0.16)",
    boxShadow: "0 24px 70px rgba(0, 0, 0, 0.32)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    color: "#fff",
  },
  logoWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 150,
    maxWidth: "78%",
    height: "auto",
    objectFit: "contain",
  },
  header: {
    margin: "0 0 14px",
    textAlign: "center",
    color: "#fff",
    fontSize: 24,
    fontWeight: 800,
  },
  form: {
    width: "100%",
  },
  formGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    minHeight: 44,
    padding: "0 12px",
    marginBottom: 12,
    borderRadius: 8,
    border: "1px solid rgba(255, 255, 255, 0.36)",
    background: "rgba(255, 255, 255, 0.82)",
    color: "#243041",
  },
  optionRow: {
    width: "100%",
    margin: "2px 0 10px",
    padding: 0,
    background: "transparent",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    margin: 0,
    lineHeight: 1,
  },
  checkbox: {
    width: 14,
    height: 14,
    margin: 0,
    flexShrink: 0,
  },
  fieldIcon: {
    position: "static",
    width: 14,
    color: "#243041",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    minWidth: 0,
    width: "auto",
    marginTop: 0,
    border: 0,
    outline: "none",
    background: "transparent",
    color: "#172033",
    fontSize: 14,
    fontWeight: 400,
    padding: "10px 0",
  },
  errorText: {
    minHeight: 14,
    margin: "-8px 0 2px",
    color: "#ff6b6b",
    fontSize: 10,
    lineHeight: "14px",
  },
  icon: {
    position: "static",
    width: 14,
    flexShrink: 0,
    cursor: "pointer",
    color: "#243041",
  },
  label: {
    width: "100%",
    margin: 0,
    color: "#fff",
    fontSize: 13,
    fontWeight: 500,
  },
  link: {
    color: "#d8f0ff",
    fontWeight: 700,
  },
  button: {
    width: "100%",
    minHeight: 40,
    marginTop: 8,
    border: 0,
    borderRadius: 10,
    background: "#07a1e3",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
  },
  buttonLoading: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  dotSpinner: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#d8f0ff",
    display: "inline-block",
    animation: "xhLoginDots 0.9s infinite ease-in-out",
  },
  orDivider: {
    margin: "12px 0",
  },
  signupText: {
    margin: "10px 0 0",
    color: "#fff",
  },
  signupLink: {
    color: "#d8f0ff",
    fontWeight: 800,
    textDecoration: "none",
  },
};

export default LoginPage;
