  // const API_BASE_URL = "https://xhirez.com/api/";
const API_BASE_URL = "http://localhost:8080/";
// const API_BASE_URL = "http://72.60.202.147:8080/";


const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}auth/login`,
  REGISTER: `${API_BASE_URL}auth/register`,
  JOBLIST: `${API_BASE_URL}Jobs/fetchAllJobs`,
  JOBPOSTING: `${API_BASE_URL}Jobs/JobPost`,
  EDITJOBS: `${API_BASE_URL}Jobs/updateJobById`,
  FETCHJOBSDETAILS: (id) => `${API_BASE_URL}Jobs/fetchJobById/${id}`,
  FETCHALLJOBS: `${API_BASE_URL}Jobs/fetchAllJobsByEmail`,
  APPLICANTLISTBYID: `${API_BASE_URL}HR/applicantsListById`,
  JOB_FILTERS: `${API_BASE_URL}Jobs/fetchJobFilter`,
  FETCHSUGGESTIONS: (value) => `${API_BASE_URL}Jobs/fetchSuggestion/${value}`,
  VISITRESUME: (resume) => `${API_BASE_URL}auth/getResume/${resume}`,
  FETCHJOBBYID: (jobId) => `${API_BASE_URL}Jobs/fetchJobById/${jobId}`,
  JOBAPPLY: `${API_BASE_URL}Jobs/apply`,
  UPLOADRESUME : `${API_BASE_URL}auth/uploadResume`,
  FETCHRESUME: (resume) => `${API_BASE_URL}auth/getResume/${resume}`,
  FETCHIMAGE : (image) => `${API_BASE_URL}auth/getimage/${image}`,
  // FETCHIMAGE : `${API_BASE_URL}auth/getimage`,
  UPDATEPROFILEIMAGE : `${API_BASE_URL}auth/updateProfileImage`,
  FETCHJOBSBYCONDITION : `${API_BASE_URL}Jobs/fetchJobByCondition`,
  UPDATEPROFILE: `${API_BASE_URL}auth/updateUserProfile`,

  FETCHSHARINGPROFILE : (email) => `${API_BASE_URL}auth/sharedProfile/${email}`,

  FETCH_JOB_TITLES: (query) => `${API_BASE_URL}Jobs/fetchJobTitle?query=${query}`,
  DELETEEDUCATIONDETAILS: (userid, id) => `${API_BASE_URL}auth/deleteEducation/${userid}/${id}`,
  DELETEEXPERIENCEDETAILS: (userid, id) => `${API_BASE_URL}auth/deleteExperience/${userid}/${id}`,
  DELETEPROJECTDETAILS: (userid, id) => `${API_BASE_URL}auth/deleteProjects/${userid}/${id}`,

  
  
  // For Fill Profile 

  FETCHDATAFORUSERSPORTAL : `${API_BASE_URL}auth/fetchImageResumeDynamicallyForUsers`,

  FETCHUSERPORTALEDUCATION : `${API_BASE_URL}auth/fetchUsersEducationData`,
  FETCHUSERPORTALPROJECTS : `${API_BASE_URL}auth/fetchUsersProjectsData`,
  FETCHUSERPORTALEXPERIENCE : `${API_BASE_URL}auth/fetchUsersExperienceData`,


  //For Recruiter check how much logins

  FETCHRECRUITERFIRSTTIMELOGIN : `${API_BASE_URL}HR/hrCheckLogsByEmail`,



  FETCH_JOB_TITLE: `${API_BASE_URL}Jobs/fetchJobTitle`,
  FETCH_QUALIFICATIONS: `${API_BASE_URL}Jobs/fetchQualificationList`,
  FETCH_INDUSTRIES: `${API_BASE_URL}Jobs/fetchIndustry`,
  FETCH_SKILLS: `${API_BASE_URL}Jobs/fetchSkills`,

  FETCHNOTIFICATIONS: `${API_BASE_URL}auth/findJobsByUserSkills`,
  FETCHSEARCHDETAILS: `${API_BASE_URL}Jobs/filteringJobs`,

  VALIDATEGOOGLEREGISTER: `${API_BASE_URL}auth/validateGoogleEmail`,
  FETCHGOOGLEDETAILS: `${API_BASE_URL}auth/fetchGoogleDetails`,
  

  CREATEBUSINESSREQUEST: `${API_BASE_URL}HR/createBusinessRequest`,
  CAMPUSBUDDYREQUEST: `${API_BASE_URL}HR/campusBuddyRequest`,
  SHECANCODEREQUEST: `${API_BASE_URL}HR/shecancodeReq`,


  CREATEDATABASEREQUEST : `${API_BASE_URL}HR/createDatabaseRequest`,

  SAVEBOOKMARK: `${API_BASE_URL}auth/bookmark`,

  DELETEJOBS: (id) => `${API_BASE_URL}Jobs/delete/${id}`,
  
  FETCHALLUNIVERSITIES : `${API_BASE_URL}HR/fetchAllUniversities`,

  
  // For Dashboard

  PROFILEVIEWS: (id)=> `${API_BASE_URL}Appearance/viewProfileCount/${id}`,
  RESUMEVIEWS: (id)=> `${API_BASE_URL}Appearance/viewResumeCount/${id}`,
  UPDATEUSERJOBSTATUS: `${API_BASE_URL}auth/updateUserJobStatus`,
  FETCHBOOKMARKS: `${API_BASE_URL}auth/getBookmarks`,


  FETCHPROFILEVIEWSNOTIFICATIONS : (id)=> `${API_BASE_URL}auth/fetchProfileViewsNotifications/${id}`,
  FETCHRESUMEVIEWSNOTIFICATIONS : (id)=> `${API_BASE_URL}auth/fetchResumeDownloadNotifications/${id}`,


  // For Admin
  FETCHBOOKMARKEDUSERS: `${API_BASE_URL}Appearance/getSavedCandidates`,
  FETCHUSERPROFILE: `${API_BASE_URL}HR/fetchApplicants`,

  REGISTERADMIN: `${API_BASE_URL}HR/register`,
  FETCHCOMPANYDETAILS: `${API_BASE_URL}HR/getCompanyDetails`,
  UPDATECOMPANYDETAILS: `${API_BASE_URL}HR/updateCompDetails`,
  GETADVANCESEARCH: `${API_BASE_URL}HR/getAdvanceSearch`,

  SAVEPROFILEVIEW: `${API_BASE_URL}Appearance/saveProfileView`,
  SAVEUSERS: `${API_BASE_URL}Appearance/savedUsers`,
  SAVERESUMEVIEWS : `${API_BASE_URL}Appearance/saveResumeView`,

  
  // FOR ADVANCE SEARCH SIMILAR USERS

  FETCHSIMILARUSERSLIST : `${API_BASE_URL}HR/getSimilarUserList`,




  // FETCH ALL SECTORS FOR HOME PAGE DYNAMICALLY

  FETCHALLSECTORS : `${API_BASE_URL}common/fetchAllSectors`,
  


  // Super Admin


  SUPERADMINGETALLUSERS : `${API_BASE_URL}Super/getAllUsers`,
  SUPERADMINUPDATEUSERSTATUS : `${API_BASE_URL}Super/updateUserActivationStatus`,
  SUPERADMINUPDATEDELETIONACTION : `${API_BASE_URL}Super/updateUserDeleteAction`,
  


  SUPERADMINGETALLADMIN : `${API_BASE_URL}Super/getAllAdmin`,
  SUPERADMINUPDATEADMINROLE : `${API_BASE_URL}Super/updateAdminRole`,
  SUPERADMINUPDATEADMINACTIVESTATUS : `${API_BASE_URL}Super/updateAdminActivateStatus`,
  SUPERADMINUPDATEADMINACTIONSTATUS : `${API_BASE_URL}Super/updateAdminActionStatus`,




  SUPERADMINGETALLSKILLS : `${API_BASE_URL}Super/getAdminAllSkills`,
  SUPERADMININSERTNEWSKILLS : `${API_BASE_URL}Super/addSkill`,
  SUPERADMINUPDATESKILLS  : `${API_BASE_URL}Super/updateAdminSkills`,



  SUPERADMINGETALLQUALIFICATIONS : `${API_BASE_URL}Super/getAdminAllQualifications`,
  SUPERADMININSERTNEWQUALIFICATION : `${API_BASE_URL}Super/addQualification`,
  SUPERADMINUPDATEQUALIFICATION : `${API_BASE_URL}Super/updateAdminQualification`,
  SUPERADMINDELETEQUALIFICATION : `${API_BASE_URL}Super/deleteAdminQualificationCourse`,



  SUPERADMINGETCOMPANYDETAILSBYEMAIL : `${API_BASE_URL}Super/getAdminCompanyData`,
  SUPERADMINUPDATECOMPANYUSERSTATUS : `${API_BASE_URL}Super/updateAdminCompanyUserStatus`,
  SUPERADMINUPDATECOMPANYUSERACTIONSTATUS : `${API_BASE_URL}Super/updateAdminCompanyDisableUserAction`,




  SUPERADMINGETALLINDUSTRIES : `${API_BASE_URL}Super/getAdminIndustryData`,
  SUPERADMININSERTNEWINDUSTRY : `${API_BASE_URL}Super/addIndustry`,
  SUPERADMINUPDATEINDUSTRY : `${API_BASE_URL}Super/updateAdminIndustryData`,
  SUPERADMINDELETEINDUSTRY : `${API_BASE_URL}Super/deleteAdminIndustryData`,




  SUPERADMINGETALLDEPARTMENTS : `${API_BASE_URL}Super/getAdminAllDepartments`,
  SUPERADMININSERTNEWDEPARTMENT : `${API_BASE_URL}Super/addDepartment`,
  SUPERADMINUPDATEDEPARTMENT : `${API_BASE_URL}Super/updateAdminDepartment`,



  
  SUPERADMINBUSINESSREQUEST: `${API_BASE_URL}Super/getBusinessReqData`,
  SUPERADMINDATABASEREQUEST: `${API_BASE_URL}Super/getDBProposalUser`,
  SUPERADMINCAMPUSBUDDYREQUEST: `${API_BASE_URL}Super/getCampusBuddyData`,
  SUPERADMINSHECANCODEREQUEST: `${API_BASE_URL}Super/getSheCanCodeData`,




  SUPERADMINGETALLACCOUNTS: `${API_BASE_URL}Super/getAllSuperAdminAccounts`,
  CREATESUPERADMINNEWACCOUNT : `${API_BASE_URL}Super/createSuperAdminAccount`,
  UPDATESUPERADMINACTIVESTATUS : `${API_BASE_URL}Super/updateSuperAdminActiveStatus`,
  UPDATESUPERADMINACTIONSTATUS: `${API_BASE_URL}Super/updateSuperAdminActionStatus`,



  UPDATESUPERADMINPROFILEDATA : `${API_BASE_URL}Super/updateSuperAdminProfileData`,




  SUPERADMINGETALLDESIGNATION : `${API_BASE_URL}Super/getAllDesignation`,
  SUPERADMININSERTNEWDESIGNATION : `${API_BASE_URL}Super/addJobTitles`,
  SUPERADMINUPDATEDESIGNATION  : `${API_BASE_URL}Super/updateAdminDesignation`,


  

  SUPERADMINDASHBOARDDATA : `${API_BASE_URL}Super/getSuperAdminDashboardData`,
  SUPERADMINDASHBOARDRECENTPOSTEDJOBS : `${API_BASE_URL}Super/getSuperAdminDashboardRecentJobs`,
  SUPERADMINDASHBOARDBARCHARDATA : `${API_BASE_URL}Super/getSuperAdminDashboardBarChart`,
  SUPERADMINDASHBOARDPIECHARTDATA : `${API_BASE_URL}Super/getSuperAdminDashboardPieChart`,



  SUPERADMINGETDELETEDUSERS : `${API_BASE_URL}Super/fetchAllDeletedUsers`,
  SUPERADMINUPDATEDELETEDUSERS : `${API_BASE_URL}Super/updateUsersDeletedAction`,



  SUPERADMINGETDELTEDADMINSACTIONS : `${API_BASE_URL}Super/fetchAllDeletedRecruiters`,
  SUPERADMINUPDATEDELETEDADMINS : `${API_BASE_URL}Super/updateRecruiterDeletedAction`,




  // For Forget Password

  CHECKVERIFYEMAILFOROTP : `${API_BASE_URL}auth/checkUserEmailForOtp`,
  FORGETUSERPASSWORDAFTEROTP : `${API_BASE_URL}auth/forgetUserPassword`,
  VERIFYEMAILOTP : `${API_BASE_URL}auth/verifyOtpEmail`,



  
  // For Register With Verify Email

  CHECKVERIFYEMAILOTPFORSIGNUP : `${API_BASE_URL}auth/checkUserEmailOtpForSignUp`,
  VERIFYEMAILOTPFORSIGNUP : `${API_BASE_URL}auth/verifyOtpEmailForSignUp`,
  

  
  // For Save LoginLog History
  SAVELOGINLOGHISTORY: `${API_BASE_URL}auth/saveLoginLog`,


};

export { API_BASE_URL, API_ENDPOINTS };