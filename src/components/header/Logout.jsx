import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Cookies from 'js-cookie';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
        
        Cookies.remove("AuthorizationToken", { path: '/' });

        toast.success("You have been logged out successfully!", {
            position: "top-right",
            autoClose: 1000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        const timer = setTimeout(() => {
            navigate("/", { replace: true });
        }, 1000); 

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="p-6 max-w-sm w-full bg-white rounded-lg shadow-md">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    <p className="text-gray-700 font-medium">Logging out...</p>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Logout;