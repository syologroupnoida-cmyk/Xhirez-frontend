import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import toast from "react-hot-toast";

const useAutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("AuthorizationToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const exp = decoded.exp; 
        const now = Math.floor(Date.now() / 1000);

        const timeLeft = exp - now;

        if (timeLeft > 0) {
          const logoutTimer = setTimeout(() => {
            Cookies.remove("AuthorizationToken");
            sessionStorage.removeItem("authToken");
            localStorage.removeItem("authToken");
            toast.error("Session expired. Please log in again.");
            navigate("/login");
          }, timeLeft * 1000);

          return () => clearTimeout(logoutTimer); 
        } else {
          Cookies.remove("AuthorizationToken");
            sessionStorage.removeItem("authToken");
            localStorage.removeItem("authToken");
            toast.error("Session expired. Please log in again.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Invalid token format", error);
        Cookies.remove("AuthorizationToken");
        navigate("/login");
      }
    }
  }, [navigate]);
};

export default useAutoLogout;
