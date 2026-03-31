import { useState, useEffect, useRef  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import { MantineProvider, Text } from '@mantine/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Routing from './Routing';
import ChangePasswordPage from './views/changePassword/changepassword';



function App() {

   const toastRef = useRef();

  useEffect(() => {
    window.showGlobalToast = (message = "Done!") => {
      const toastElement = toastRef.current;
      if (!toastElement) return;

      toastElement.querySelector(".toast-body").textContent = message;
      const toast = new bootstrap.Toast(toastElement, {
        delay: 2500,
        autohide: true,
      });
      toast.show();
    };
  }, []);

  return (

    <MantineProvider>

   
      <div
        ref={toastRef}
        className="toast position-fixed bottom-0 end-0 m-3"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">Notification</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Loading...</div>
      </div>

    <Router> 
      <div>
      <Routing/>
      </div>
    </Router>
    </MantineProvider>

   

  );
}

export default App;
