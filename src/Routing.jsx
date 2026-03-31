import React from 'react'
import AdminDashboard from './views/Admin/AdminDashboard';
import MainContent from './views/Admin/MainContent';
import ManageJobs from './views/Admin/ManageJobs';
import CompanyProfile from './views/Admin/CompanyProfile';
import LoginPage from './views/loginpage/login';
import HomePage from './views/hompage/home'
import SignUpPage from './views/signup/signUp';
import ChangePasswordPage from './views/changePassword/changepassword';
import OTPVerificationPage from './views/verificationPage/varifycode';
import Otpcodesent from './views/verificationPage/sendcode';
import AdminChangePassword from './views/changePassword/AdminChangePassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Agency from './views/foragency/foragency';
import ForBusinessNew from './views/forbusiness/ForBusinessNew';
import ForBusinessFeatures from './views/forbusiness/ForBusinessFeatures';
import CompanyDetails from './views/forbusiness/CompanyDetails';
import FieldDetails from './views/forbusiness/FieldDetails'; // New Import for FieldDetails
import Features from './views/feature/Features';
import JobListInterface from'./views/ListingInterface/JobListInterface'
import Profile from './views/profile/profile';
import Fillprofile from './views/profile/fillprofile';
import ProfileDashboard from './views/profile/profile-dashboard'
import Recruitmenthero from './views/hompage/recruitment-home'
import AdvanceSearch from './views/recruitment/advance'
import Advancejoblist from './views/recruitment/advancejoblist'
import Jobpost from './views/recruitment/job-posting';
import Postedjob from './views/recruitment/postedjobs';
import ApplicantsPage from './views/recruitment/appliedcandidate';
import RecruitmenttopbarEmployer from './views/recruitment/recruiterlogin';
import RecruitersignUp from './views/recruitment/recruitersignup';
import RecruiterLogin from './views/recruitment/recruiterlogin';
import Popup from './views/recruitment/popup';
import Candudatedeatil from './views/recruitment/advancecandidate'
import Campusbuddy from './views/campusBuddy/campusbuddy';
import CareerCounselling from './views/career-counselling/CareerCounselling';
import Companyprofile from './views/recruitment/company-profile';
import Applyjob from './views/jobapply/jobapply';
import ProtectedRoute from './ProtectedRoute';
// import ManageNotifications from './views/SuperAdmin/ManageNotification';
import Logout from './components/header/Logout';
import AllJobs from './views/ListingInterface/alljobs';
import AllJobsDashboard from './views/ListingInterface/alljobsDashboard';
import SkillsMultiselect from './views/hompage/data';
import EditJob from './views/recruitment/editJob';
import Shecancode from './views/shecancode/shecancode'
import Companydetail from './views/recruitment/company-profile';
import Companydetailupdate from './views/recruitment/company-profile-update';
import CandidateDetails from './views/recruitment/CandidateDetails';
import BookmarkUsers from './views/recruitment/BookmarkUsers';
import FilteredJobsList from './views/ListingInterface/filteredJobList';


// import SuperAdmin Routes

import SuperAdminDashboard from './views/SuperAdmin/SuperAdminDashboard';
import DasboardContent from './views/SuperAdmin/DasboardContent';
import UserManagement from './views/SuperAdmin/UserMangement';
import ProfileManagement from './views/SuperAdmin/AdminProfileManagement';
import ManageNotifications from './views/SuperAdmin/ManageNotification';
import ManageSkills from './views/SuperAdmin/ManageSkills';
import IndustryManagement from './views/SuperAdmin/industryManagement';
import QualificationManagement from './views/SuperAdmin/ManageCourses';
import CompanyManagement from './views/SuperAdmin/companyManagement';
import ManageDepartment from './views/SuperAdmin/ManageDepartment';
import BuisnessRequest from './views/SuperAdmin/businessRequest';
import DatabaseRequest from './views/SuperAdmin/DatabaseRequest';
import CampusbuddyData from './views/SuperAdmin/CampusBuddy';
 import SheCanCodeData from './views/SuperAdmin/SheCanCode';
import SuperAdminProfile from './views/SuperAdmin/SuperAdminProfile';
import SuperAdminManagement from './views/SuperAdmin/SuperAdminManagement';
import ManageDesignation from './views/SuperAdmin/ManageDesignation';
import ProfileShare from './views/ShareProfile/profileShare';
import JobShare from './views/ShareProfile/jobShare';
import DeletedUsers from './views/SuperAdmin/DeletedUsers';
import DeletedAdmins from './views/SuperAdmin/DeletedAdmins';
import JobListBySectors from './views/hompage/JobListBySectors';
import AboutUs from './views/about/AboutUs';
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop


import InitiativeBlogDetail from './views/hompage/initiative-details/InitiativeBlogDetail';

const Routing = () => {
  return (
    <>
     <ScrollToTop /> {/* Wrap Routes with ScrollToTop */}
     <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Changepassword" element={<ChangePasswordPage />} />
        <Route path="/recoverpass" element={<Otpcodesent />} />
        <Route path="/verify" element={<OTPVerificationPage />} />
        <Route path="/agency" element={<Agency />} />
        <Route path="/business" element={<ForBusinessNew />} />
        <Route path="/business-features" element={<ForBusinessFeatures />} />
        <Route path="/business-interview-guide/:companyId" element={<CompanyDetails />} />
        <Route path="/business-field-guide/:fieldId" element={<FieldDetails />} /> {/* New Dynamic Route for Field Details */}
        <Route path="/features" element={<Features />} />
        <Route path="/alljob" element={<AllJobs />} />
        <Route path="/SkillsMultiselect" element={<SkillsMultiselect />} />
        <Route path="/Companydetail" element={<Companydetail/>} />
        <Route path="/shecancode" element={<Shecancode/>} />
        <Route path="/campus-buddy" element={<Campusbuddy/>}/>
        <Route path="/career-counselling" element={<CareerCounselling />} />
        <Route path="/filteredJobsList" element={<FilteredJobsList/>}/>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/initiatives/:initiativeTitle/:blogIndex" element={<InitiativeBlogDetail />} />


        <Route path="jobs-by-sector" element={<JobListBySectors/>} />


        <Route path="/profileShare/:email" element={<ProfileShare/>}/>
        <Route path="/jobShare/:id" element={<JobShare/>}/>

        {/* Protected Routes */}

      <Route path="/JobListInterface" element={<ProtectedRoute element={<JobListInterface />} />} />
      <Route path="/Profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="/Fillprofile" element={<ProtectedRoute element={<Fillprofile />} />} />
      <Route path="/profile-dashboard" element={<ProtectedRoute element={<ProfileDashboard />} />} />
      <Route path="/applyjob/:id" element={<ProtectedRoute element={<Applyjob />} />} />
      <Route path="/dashboardJobs" element={<ProtectedRoute element={<AllJobsDashboard />} />} />
      {/* <Route path="/applyjob" element={<ProtectedRoute element={<Applyjob />} />} /> */}

         {/* For Admin */}

        {/* <Route path="/Recruitmenthero"  element={<ProtectedRoute element={<Recruitmenthero />} requiredRole="primeadmin" />} />
        <Route path="/AdvanceSearch" element={<ProtectedRoute element={<AdvanceSearch />} requiredRole="admin" />} />
        <Route path="/jobpost" element={<ProtectedRoute element={<Jobpost/>} requiredRole="admin" />} />
        <Route path="/postedjob" element={<ProtectedRoute element={<Postedjob />} requiredRole="admin" />} />
        <Route path="/applicantsPage/:jobId" element={<ProtectedRoute element={<ApplicantsPage />} requiredRole="admin" />} />
        <Route path="/bookMarkUsers" element={<ProtectedRoute element={<BookmarkUsers />} requiredRole="admin" />} />
        <Route path="/candidateProfile/:userId" element={<ProtectedRoute element={<CandidateDetails />} requiredRole="admin" />} /> */}

        <Route path="/Recruitmenthero" element={<ProtectedRoute element={<Recruitmenthero />} allowedRoles={["admin", "primeadmin"]} />} />
        <Route path="/AdvanceSearch" element={<ProtectedRoute element={<AdvanceSearch />} allowedRoles={["primeadmin"]} />} />
        <Route path="/jobpost" element={<ProtectedRoute element={<Jobpost />} allowedRoles={["admin", "primeadmin"]} />} />
        <Route path="/postedjob" element={<ProtectedRoute element={<Postedjob />} allowedRoles={["admin", "primeadmin"]} />} />
        <Route path="/applicantsPage/:jobId" element={<ProtectedRoute element={<ApplicantsPage />} allowedRoles={["admin", "primeadmin"]} />} />
        <Route path="/bookMarkUsers" element={<ProtectedRoute element={<BookmarkUsers />} allowedRoles={["admin", "primeadmin"]} />} />
        <Route path="/candidateProfile" element={<ProtectedRoute element={<CandidateDetails />} allowedRoles={["admin", "primeadmin"]} />} />



        <Route path="/searchedProfiles" element={<Advancejoblist/>} />
        <Route path="/employer-login" element={<RecruitmenttopbarEmployer/>} />
        <Route path="/recruitersignUp" element={<RecruitersignUp/>} />
        <Route path="/recruiterLogin" element={<RecruiterLogin/>} />
        <Route path="/Popup" element={<Popup/>} />
        <Route path="/candudatedeatil" element={<Candudatedeatil/>} />
        <Route path="/companyprofile" element={<CompanyProfile/>} />
        <Route path="/company-detail-update" element={<Companydetailupdate/>} />

        <Route path="/edit-job/:id" element={<EditJob />} />


       {/* Protected Admin Routes */}

       <Route path="/admin/*" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />}>
        <Route index element={<MainContent />} />
        <Route path="managejobs" element={<ManageJobs />} />
        <Route path="companyprofile" element={<CompanyProfile />} />
        <Route path="jobpostingForm" element={<ManageNotifications />} />
        <Route path="notification" element={<AdminChangePassword />} />
      </Route>
      

        {/* SuperAdmin Routes */}

        <Route path="/SuperAdmin/*" element={<ProtectedRoute element={<SuperAdminDashboard  />} allowedRoles={["SuperAdmin"]} />}>
          <Route index element={<DasboardContent />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="profileManagement" element={<ProfileManagement />} />
          {/* <Route path="notification" element={<ManageNotifications />} /> */}
          <Route path="skills" element={<ManageSkills />} />
          <Route path="industry" element={<IndustryManagement />} />
          <Route path="courses" element={<QualificationManagement />} />
          <Route path="company" element={<CompanyManagement />} />
          <Route path="department" element={<ManageDepartment />} />
          <Route path="BusinessRequests" element={<BuisnessRequest />} />
          <Route path="DataBaseReq" element={<DatabaseRequest />} />
          <Route path="CampusBuddy" element={<CampusbuddyData />} />
          <Route path="SheCanCode" element={<SheCanCodeData />} />
          <Route path="SuperAdminProfile" element={<SuperAdminProfile />} />
          <Route path="ManageSuperAdmin" element={<SuperAdminManagement/>} />
          <Route path="Designation" element={<ManageDesignation />} />
          <Route path="DeletedUser" element={<DeletedUsers />} />
          <Route path="DeletedAdmin" element={<DeletedAdmins />} />

          
        </Route> 
      
      </Routes>
    </>
  )
}

export default Routing