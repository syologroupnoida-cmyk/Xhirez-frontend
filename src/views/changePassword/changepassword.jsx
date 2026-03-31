import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { API_ENDPOINTS } from '../apiConfig';

const ChangePasswordPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const { emailOrPhone} = location.state || {};

   useEffect(() => {
     if (!emailOrPhone) {
       toast.error('No email or phone number provided.');
       navigate('/recoverPass'); 
     }
    }, [emailOrPhone, navigate]);



    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            setError('All fields are required!');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New Password and Confirm Password do not match!');
            return;
        }

        const user = {
            email: emailOrPhone,
            password: newPassword,
        }

        axios.post(API_ENDPOINTS.FORGETUSERPASSWORDAFTEROTP, {
            email: user.email,
            password: user.password
        })
        .then((response) => {
            if (response.data.status === 200) {
                
             setSuccess('Password Updated successfully!');
             toast.success('Password Updated successfully!');
              setError('');
                setTimeout(() => {
                    navigate('/');
                }, 2000); 
            }
            else {
                setError(response.data.statusText || 'An error occurred while changing the password.');
            }
        })
        .catch((error) => {
            console.error('Error changing password:', error);
            setError('An error occurred while changing the password. Please try again later.');
        }
        );

       
    };

    return (
        <>
            <div className="main-sec">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="logo text-start">
                                <img src="assets/images/logo/Xhirez-Logo.png" width="100%" alt="Logo" />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="login-form">
                                <h1 style={styles.header}>Change Password</h1>
                                <form onSubmit={handleSubmit} style={styles.form}>
                                    {/* New Password */}
                                    <div className="formgroup" style={styles.formGroup}>
                                        <input
                                            type={showNewPassword ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            style={styles.input}
                                            placeholder="New Password"
                                        />
                                        <FontAwesomeIcon
                                            icon={showNewPassword ? faEyeSlash : faEye}
                                            style={styles.icon}
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        />
                                    </div>
                                    {/* Confirm New Password */}
                                    <div className="formgroup" style={styles.formGroup}>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            style={styles.input}
                                            placeholder="Confirm New Password"
                                        />
                                        <FontAwesomeIcon
                                            icon={showConfirmPassword ? faEyeSlash : faEye}
                                            style={styles.icon}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        />
                                    </div>
                                    {error && <p style={styles.error}>{error}</p>}
                                    {success && <p style={styles.success}>{success}</p>}
                                    <div className="formgroup mt-2" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <button type="submit" style={styles.button}>
                                            Set Password
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
                                <img src="assets/images/logo/Xhirez-Logo-Background.png" width="100%" alt="Background Logo" />
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                            <div className="logo-text text-center">
                                <p>Xhirez @2025 All Rights Reserved</p>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                            <div className="social-icon" style={{ display: 'flex', gap: '10px' }}>
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faFacebook} size="25px" color="#fff" />
                                </a>
                                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faTwitter} size="25px" color="#fff" />
                                </a>
                                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faLinkedin} size="25px" color="#fff" />
                                </a>
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
    header: { fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' },
    form: { maxWidth: '400px', margin: '0 auto' },
    formGroup: { position: 'relative', marginBottom: '20px' },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '13px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    icon: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#75757E',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: { color: 'red', fontSize: '14px', textAlign: 'center' },
    success: { color: 'green', fontSize: '14px', textAlign: 'center' },
};

export default ChangePasswordPage;
