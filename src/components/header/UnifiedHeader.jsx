import React from 'react';
import Header from './header';
import Headernavbar from './seekerlogin';
import RecruiterNavbar from './recruitment-header'; // Corrected import path

const UnifiedHeader = () => {
    const token = sessionStorage.getItem("authToken");
    const user = token ? JSON.parse(token)?.users : null;

    if (user) {
        if (user.userRole === 'user') {
            return <Headernavbar />;
        } else if (user.userRole === 'admin' || user.userRole === 'primeadmin') {
            return <RecruiterNavbar />;
        }
    }
    
    return <Header style={{ background: 'red', height: '100px', zIndex: 1000 }} />; 
};

export default UnifiedHeader;