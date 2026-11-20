import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "@/router-dom";
import { Bell, User, Settings, LogOut, UserPlus, UserCog } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

const TopNavbar = () => {

  const authData = sessionStorage.getItem("authToken");
  const user = authData ? JSON.parse(authData).users : null;
  const name = user.fullName;


  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);

  // Mock Notifications
  const notifications = [
    'New user registered',
    'Order #1234 has been placed',
    'Server maintenance scheduled for tonight',
  ];

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    navigate('/');
   

    setTimeout(() => {
       toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 2000,
    });
    }, 50);
  };

  // User menu items
  const userMenuItems = [
    {
      label: 'Manage Profile',
      icon: <UserCog className="w-4 h-4 mr-2" />,
      action: () => navigate('/SuperAdmin/SuperAdminProfile'),
    },
    {
      label: 'Add SuperAdmin',
      icon: <UserPlus className="w-4 h-4 mr-2" />,
      action: () => navigate('/SuperAdmin/ManageSuperAdmin'),
    },
    {
      label: 'Logout',
      icon: <LogOut className="w-4 h-4 mr-2" />,
      action: handleLogout,
      isDanger: true,
    },
  ];

  // Handle mouse enter with delay
  const handleMouseEnter = () => {
    clearHoverTimeout();
    setShowUserMenu(true);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    setHoverTimeout(setTimeout(() => {
      setShowUserMenu(false);
    }, 400)); 
  };

  // Clear timeout
  const clearHoverTimeout = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && 
          userMenuRef.current && 
          !userMenuRef.current.contains(event.target) &&
          userButtonRef.current &&
          !userButtonRef.current.contains(event.target)) {
        setShowUserMenu(false);
        clearHoverTimeout();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearHoverTimeout();
    };
  }, [showUserMenu, hoverTimeout]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white text-gray-900 shadow-none md:!shadow-md z-50 ml-14 md:ml-0 h-16 flex items-center">
      <ToastContainer/>
      <div className="w-full px-1 sm:px-6 lg:px-8 shadow-none md:shadow-lg flex justify-between items-center">
        {/* Brand/Welcome Text */}
        <div className="w-auto h-16 flex items-center space-x-2">
          <img
            src="/assets/images/logo/Xhirez-Logo.png"
            alt="Logo"
            className="w-[250px] hidden border-r md:block h-full object-contain"
          />
          <h2 className="text-gray-900 w-48 pl-4 font-semibold text-lg hidden md:block">
            Welcome <span className='text-[#0CA5E5]'>{name}</span>
          </h2>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications Dropdown */}
          {/* <div className="relative">
            <button
              className="p-2 text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-gray-100"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 custom-scrollbar max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((note, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      {note}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">No new notifications</div>
                )}
              </div>
            )}
          </div> */}

          {/* Settings */}
          {/* <button className="p-2 text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button> */}

          {/* User Profile Dropdown */}
       <div className="relative">
  <button
    ref={userButtonRef}
    className="w-8 h-8 text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors rounded-full flex items-center justify-center"
    onClick={() => {
      setShowUserMenu(!showUserMenu);
      clearHoverTimeout();
    }}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    {user?.fullName?.charAt(0)?.toUpperCase() || 'N'}
  </button>

  {showUserMenu && (
    <div 
      ref={userMenuRef}
      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="py-1">
        {userMenuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.action();
              setShowUserMenu(false);
              clearHoverTimeout();
            }}
            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
              item.isDanger 
                ? 'text-red-600 hover:bg-red-50' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )}
</div>

        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;