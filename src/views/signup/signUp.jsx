import React, { useMemo, useState } from "react";
import Head from "next/head";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import {
  BadgeOutlined,
  CheckCircle,
  CloudUploadOutlined,
  EmailOutlined,
  LockOutlined,
  PhoneIphoneOutlined,
  SchoolOutlined,
  Visibility,
  VisibilityOff,
  Work,
} from "@mui/icons-material";
import { useNavigate, Link } from "@/router-dom";

const steps = ["Account", "Verify", "Profile", "Education", "Complete"];
const DUMMY_OTP = "1234";

const initialForm = {
  fullName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  workStatus: "fresher",
  currentCity: "",
  keySkills: [],
  preferredRole: "",
  totalExperience: "",
  currentCompany: "",
  currentDesignation: "",
  projectTitle: "",
  projectLink: "",
  projectStartDate: "",
  projectEndDate: "",
  projects: [],
  highestQualification: "",
  course: "",
  specialization: [],
  university: "",
  courseType: "Full time",
  graduationYear: "",
  profileHeadline: "",
  expectedSalary: "",
  noticePeriod: "",
  preferredLocations: [],
  jobTypes: ["Full time"],
  resumeName: "",
  otp: ["", "", "", ""],
  agree: true,
};

const currentYear = new Date().getFullYear();
const graduationYears = Array.from({ length: 12 }, (_, index) => currentYear - index);

const qualifications = [
  "Diploma",
  "Bachelor Degree",
  "Master Degree",
  "Computer Diploma",
  "Other",
];

const courseOptionsByQualification = {
  Diploma: ["Polytechnic Diploma", "Engineering Diploma", "ITI", "Vocational Diploma", "Other Diploma"],
  "Bachelor Degree": ["B.Tech/B.E.", "BCA", "B.Sc", "B.Com", "BA", "BBA", "Other Bachelor Course"],
  "Master Degree": ["M.Tech/M.E.", "MCA", "M.Sc", "M.Com", "MA", "MBA", "Other Master Course"],
  "Computer Diploma": ["ADCA", "DCA", "PGDCA", "Web Development Diploma", "Software Engineering Diploma", "Other Computer Diploma"],
  Other: ["Certification Course", "Professional Course", "Other"],
};

const specializationOptionsByCourse = {
  "B.Tech/B.E.": ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil", "Electrical"],
  "BCA": ["Computer Applications", "Software Development", "Data Science", "Web Development"],
  "B.Sc": ["Computer Science", "Information Technology", "Mathematics", "Statistics", "Physics"],
  "B.Com": ["Accounting", "Finance", "Banking", "Taxation"],
  "BA": ["English", "Economics", "Psychology", "Mass Communication"],
  "BBA": ["Marketing", "Finance", "Human Resources", "International Business"],
  "M.Tech/M.E.": ["Computer Science", "Data Science", "Artificial Intelligence", "Cyber Security"],
  "MCA": ["Computer Applications", "Software Engineering", "Cloud Computing", "Data Analytics"],
  "M.Sc": ["Computer Science", "Information Technology", "Data Science", "Statistics"],
  "MBA": ["Marketing", "Finance", "Human Resources", "Operations", "Business Analytics"],
  "ADCA": ["Computer Applications", "Office Automation", "Programming", "Database Management"],
  "DCA": ["Computer Applications", "MS Office", "Web Basics", "Database Management"],
  "PGDCA": ["Computer Applications", "Software Development", "Data Management", "Networking"],
  "Web Development Diploma": ["Frontend Development", "Backend Development", "Full Stack Development", "UI/UX Design"],
  "Software Engineering Diploma": ["Software Development", "Testing", "DevOps", "Database Management"],
};

const defaultSpecializationOptions = [
  "Computer Science",
  "Information Technology",
  "Software Development",
  "Data Science",
  "Artificial Intelligence",
  "Cyber Security",
  "Web Development",
  "Finance",
  "Marketing",
  "Human Resources",
  "Operations",
  "Other",
];

const courseTypes = ["Full time", "Part time", "Distance learning"];

const noticePeriods = ["Immediate", "15 days", "30 days", "45 days", "60 days", "90 days"];

const jobTypeOptions = ["Full time", "Part time", "Contract", "Internship", "Remote"];

const skillSuggestions = [
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Java",
  "Python",
  "SQL",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Bootstrap",
  "UI/UX Design",
  "Digital Marketing",
  "SEO",
  "Sales",
  "Business Development",
  "Customer Support",
  "Data Analysis",
  "Excel",
  "Communication",
  "Problem Solving",
  "Project Management",
];

const citySuggestions = [
  "Ahmedabad",
  "Bengaluru",
  "Chandigarh",
  "Chennai",
  "Delhi",
  "Gurugram",
  "Hyderabad",
  "Indore",
  "Jaipur",
  "Kochi",
  "Kolkata",
  "Mumbai",
  "Noida",
  "Pune",
  "Surat",
];

const threeColumnGrid = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
  gap: 1.5,
  "& > .MuiGrid-root": {
    width: "auto",
    maxWidth: "none",
    padding: "0 !important",
  },
};

const twoColumnGrid = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
  gap: 1.5,
  "& > .MuiGrid-root": {
    width: "auto",
    maxWidth: "none",
    padding: "0 !important",
  },
};

const compactFieldSx = {
  "& .MuiInputBase-root": {
    minHeight: 42,
  },
  "& .MuiInputBase-input": {
    paddingTop: "10px",
    paddingBottom: "10px",
    fontSize: 14,
  },
  "& .MuiInputLabel-root": {
    fontSize: 14,
  },
  "& .MuiFormHelperText-root": {
    marginTop: "3px",
    fontSize: 11,
    lineHeight: 1.2,
  },
};

function passwordHelp(password) {
  const checks = [
    password.length >= 6,
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  ];

  return {
    score: checks.filter(Boolean).length,
    label: ["Weak", "Basic", "Good", "Strong", "Excellent"][checks.filter(Boolean).length],
  };
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const passwordMeta = useMemo(() => passwordHelp(formData.password), [formData.password]);
  const courseOptions = courseOptionsByQualification[formData.highestQualification] || [];
  const specializationOptions = specializationOptionsByCourse[formData.course] || defaultSpecializationOptions;

  const updateField = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const handleMobileChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((current) => ({ ...current, mobile: value }));
    setErrors((current) => ({ ...current, mobile: "" }));
  };

  const showMessage = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const validateAccount = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) nextErrors.fullName = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      nextErrors.mobile = "Enter a 10 digit mobile number";
    }
    if (passwordMeta.score < 3) {
      nextErrors.password = "Use 6+ chars with uppercase, number and special character";
    }
    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agree) {
      nextErrors.agree = "Please accept the terms to continue";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateProfile = () => {
    const nextErrors = {};

    if (!formData.currentCity.trim()) nextErrors.currentCity = "Current city is required";
    if (!formData.keySkills.length) nextErrors.keySkills = "Add at least one skill";
    if (!formData.preferredRole.trim()) nextErrors.preferredRole = "Preferred job role is required";

    if (formData.workStatus === "experienced") {
      if (!formData.totalExperience.trim()) nextErrors.totalExperience = "Experience is required";
      if (!formData.currentCompany.trim()) nextErrors.currentCompany = "Company is required";
      if (!formData.currentDesignation.trim()) nextErrors.currentDesignation = "Designation is required";
      if (!formData.projects.length) nextErrors.projects = "Add at least one project";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateEducation = () => {
    const nextErrors = {};

    if (!formData.highestQualification) nextErrors.highestQualification = "Qualification is required";
    if (!formData.course.trim()) nextErrors.course = "Course is required";
    if (!formData.specialization.length) nextErrors.specialization = "Add at least one specialization";
    if (!formData.university.trim()) nextErrors.university = "University or institute is required";
    if (!formData.graduationYear) nextErrors.graduationYear = "Passing year is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateCompletion = () => {
    const nextErrors = {};

    if (!formData.profileHeadline.trim()) nextErrors.profileHeadline = "Profile headline is required";
    if (!formData.preferredLocations.length) nextErrors.preferredLocations = "Add at least one preferred location";
    if (!formData.expectedSalary.trim()) nextErrors.expectedSalary = "Expected salary is required";
    if (!formData.noticePeriod) nextErrors.noticePeriod = "Notice period is required";
    if (!formData.jobTypes.length) nextErrors.jobTypes = "Choose at least one job type";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const sendOtp = async () => {
    if (!validateAccount()) return;

    setLoading("otp");
    await new Promise((resolve) => setTimeout(resolve, 350));
    setActiveStep(1);
    showMessage(`Dummy OTP sent. Use ${DUMMY_OTP} to verify.`);
    setLoading("");
  };

  const verifyOtp = async () => {
    const otp = formData.otp.join("");

    if (otp.length !== 4) {
      setErrors((current) => ({ ...current, otp: "Enter the 4 digit OTP" }));
      return false;
    }

    setLoading("verify");
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (otp === DUMMY_OTP) {
      setIsOtpVerified(true);
      showMessage("Email verified");
      setLoading("");
      return true;
    }

    setErrors((current) => ({ ...current, otp: `Invalid OTP. Use ${DUMMY_OTP} for dummy verification.` }));
    setLoading("");
    return false;
  };

  const handleSkillsChange = (_event, value) => {
    const normalized = value
      .map((item) => item.trim())
      .filter(Boolean)
      .filter((item, index, array) => array.findIndex((other) => other.toLowerCase() === item.toLowerCase()) === index);

    setFormData((current) => ({ ...current, keySkills: normalized }));
    setErrors((current) => ({ ...current, keySkills: "" }));
  };

  const normalizeList = (value) =>
    value
      .map((item) => item.trim())
      .filter(Boolean)
      .filter((item, index, array) => array.findIndex((other) => other.toLowerCase() === item.toLowerCase()) === index);

  const handlePreferredLocationsChange = (_event, value) => {
    setFormData((current) => ({ ...current, preferredLocations: normalizeList(value) }));
    setErrors((current) => ({ ...current, preferredLocations: "" }));
  };

  const handleQualificationChange = (_event, value) => {
    setFormData((current) => ({
      ...current,
      highestQualification: value || "",
      course: "",
      specialization: [],
    }));
    setErrors((current) => ({ ...current, highestQualification: "", course: "", specialization: "" }));
  };

  const handleQualificationInputChange = (_event, value) => {
    setFormData((current) => ({
      ...current,
      highestQualification: value || "",
      course: courseOptionsByQualification[value] ? current.course : "",
      specialization: courseOptionsByQualification[value] ? current.specialization : [],
    }));
    setErrors((current) => ({ ...current, highestQualification: "" }));
  };

  const handleCourseChange = (_event, value) => {
    setFormData((current) => ({
      ...current,
      course: value || "",
      specialization: [],
    }));
    setErrors((current) => ({ ...current, course: "", specialization: "" }));
  };

  const handleCourseInputChange = (_event, value) => {
    setFormData((current) => ({
      ...current,
      course: value || "",
      specialization: specializationOptionsByCourse[value] ? current.specialization : [],
    }));
    setErrors((current) => ({ ...current, course: "" }));
  };

  const handleSpecializationChange = (_event, value) => {
    setFormData((current) => ({ ...current, specialization: normalizeList(value) }));
    setErrors((current) => ({ ...current, specialization: "" }));
  };

  const handleJobTypeToggle = (jobType) => () => {
    setFormData((current) => {
      const exists = current.jobTypes.includes(jobType);
      const jobTypes = exists ? current.jobTypes.filter((item) => item !== jobType) : [...current.jobTypes, jobType];
      return { ...current, jobTypes };
    });
    setErrors((current) => ({ ...current, jobTypes: "" }));
  };

  const handleCityChange = (_event, value) => {
    setFormData((current) => ({ ...current, currentCity: value || "" }));
    setErrors((current) => ({ ...current, currentCity: "" }));
  };

  const handleCityInputChange = (_event, value) => {
    setFormData((current) => ({ ...current, currentCity: value || "" }));
    setErrors((current) => ({ ...current, currentCity: "" }));
  };

  const handleAddProject = () => {
    const nextErrors = {};

    if (!formData.projectTitle.trim()) nextErrors.projectTitle = "Project title is required";
    if (!formData.projectLink.trim()) nextErrors.projectLink = "Project link is required";
    if (!formData.projectStartDate) nextErrors.projectStartDate = "Start date is required";
    if (!formData.projectEndDate) nextErrors.projectEndDate = "End date is required";

    if (Object.keys(nextErrors).length) {
      setErrors((current) => ({ ...current, ...nextErrors }));
      return;
    }

    const project = {
      id: Date.now(),
      title: formData.projectTitle.trim(),
      link: formData.projectLink.trim(),
      startDate: formData.projectStartDate,
      endDate: formData.projectEndDate,
    };

    setFormData((current) => ({
      ...current,
      projects: [...current.projects, project],
      projectTitle: "",
      projectLink: "",
      projectStartDate: "",
      projectEndDate: "",
    }));
    setErrors((current) => ({
      ...current,
      projects: "",
      projectTitle: "",
      projectLink: "",
      projectStartDate: "",
      projectEndDate: "",
    }));
  };

  const handleRemoveProject = (projectId) => {
    setFormData((current) => ({
      ...current,
      projects: current.projects.filter((project) => project.id !== projectId),
    }));
  };

  const completeRegistration = async () => {
    if (!isOtpVerified) {
      setActiveStep(1);
      setErrors((current) => ({ ...current, otp: `Verify email with dummy OTP ${DUMMY_OTP}` }));
      return;
    }

    if (!validateCompletion()) return;

    setLoading("register");
    await new Promise((resolve) => setTimeout(resolve, 500));
    showMessage("Profile completed successfully");
    setLoading("");
    setTimeout(() => navigate("/profile-dashboard"), 700);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      sendOtp();
      return;
    }

    if (activeStep === 1) {
      verifyOtp().then((verified) => {
        if (verified) setActiveStep(2);
      });
      return;
    }

    if (activeStep === 2) {
      if (validateProfile()) setActiveStep(3);
      return;
    }

    if (activeStep === 3) {
      if (validateEducation()) setActiveStep(4);
      return;
    }

    completeRegistration();
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const nextOtp = [...formData.otp];
    nextOtp[index] = value;
    setFormData((current) => ({ ...current, otp: nextOtp }));
    setErrors((current) => ({ ...current, otp: "" }));

    if (value && index < 3) {
      document.getElementById(`signup-otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace" && !formData.otp[index] && index > 0) {
      document.getElementById(`signup-otp-${index - 1}`)?.focus();
    }
  };

  const resumeLabel = formData.resumeName || "Upload resume (PDF, DOC, DOCX)";

  return (
    <>
      <Head>
        <title>Create Xhirez Account</title>
        <meta
          name="description"
          content="Create your Xhirez candidate profile and get discovered by recruiters."
        />
      </Head>

      <Box sx={{ height: "100vh", overflow: "hidden", bgcolor: "#f5f7fb", py: { xs: 1.5, md: 3 } }}>
        <Container maxWidth="xl" sx={{ height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              alignItems: "stretch",
              gap: 3,
              height: "100%",
              minHeight: 0,
            }}
          >
            <Box sx={{ width: { xs: "100%", lg: 390 }, flexShrink: 0, display: "flex" }}>
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  height: "100%",
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  bgcolor: "#071527",
                  color: "#fff",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    bgcolor: "rgba(7,161,227,0.18)",
                    right: -80,
                    top: -70,
                  }}
                />
                <Stack spacing={3} sx={{ position: "relative", zIndex: 1 }}>
                  <Box component="img" src="/assets/images/logo/Xhirez-Logo.png" alt="Xhirez" sx={{ width: 170 }} />
                  <Box>
                    <Typography variant="h4" fontWeight={900} sx={{ lineHeight: 1.1 }}>
                      Create your profile. Get found faster.
                    </Typography>
                    <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.72)" }}>
                      Build a recruiter-ready candidate profile in a few guided steps.
                    </Typography>
                  </Box>

                  <Stack spacing={2}>
                    {[
                      "Get matched with relevant jobs",
                      "Verify your email with OTP",
                      "Add resume, skills and job preferences",
                    ].map((item) => (
                      <Stack key={item} direction="row" spacing={1.5} alignItems="center">
                        <CheckCircle sx={{ color: "#07a1e3" }} />
                        <Typography variant="body2">{item}</Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.72)" }}>
                    Already registered?{" "}
                    <Link to="/login" className="text-white font-bold no-underline">
                      Log in
                    </Link>
                  </Typography>
                </Stack>
              </Paper>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0, display: "flex" }}>
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  maxHeight: "100%",
                  p: { xs: 2, md: 3 },
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 0,
                }}
              >
                <Stack spacing={2} sx={{ height: "100%", minHeight: 0 }}>
                  <Box>
                    <Typography variant="h5" fontWeight={900} color="#101828">
                      Candidate Registration
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tell us about yourself so Xhirez can personalize your job search.
                    </Typography>
                  </Box>

                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", pr: { xs: 0, md: 1 } }}>
                  {activeStep === 0 && (
                    <Stack spacing={2}>
                      <Grid container spacing={0} sx={twoColumnGrid}>
                        {[
                          { value: "fresher", title: "I am a fresher", icon: <SchoolOutlined />, note: "Student or no full-time experience" },
                          { value: "experienced", title: "I have experience", icon: <Work />, note: "Worked after graduation" },
                        ].map((option) => (
                          <Grid item xs={12} sm={6} key={option.value}>
                            <Paper
                              elevation={0}
                              onClick={() => setFormData((current) => ({ ...current, workStatus: option.value }))}
                              sx={{
                                p: 1.5,
                                borderRadius: 2,
                                cursor: "pointer",
                                border: "2px solid",
                                borderColor: formData.workStatus === option.value ? "#07a1e3" : "#e5e7eb",
                                bgcolor: formData.workStatus === option.value ? "#eff9fe" : "#fff",
                              }}
                            >
                              <Stack direction="row" spacing={1.5} alignItems="center">
                                <Box sx={{ color: "#07a1e3" }}>{option.icon}</Box>
                                <Box>
                                  <Typography fontWeight={800}>{option.title}</Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {option.note}
                                  </Typography>
                                </Box>
                              </Stack>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>

                      <Grid container spacing={0} sx={threeColumnGrid}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            sx={compactFieldSx}
                            label="Full name"
                            value={formData.fullName}
                            onChange={updateField("fullName")}
                            error={Boolean(errors.fullName)}
                            helperText={errors.fullName}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <BadgeOutlined />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            sx={compactFieldSx}
                            label="Email ID"
                            value={formData.email}
                            onChange={updateField("email")}
                            error={Boolean(errors.email)}
                            helperText={errors.email || "OTP will be sent here"}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailOutlined />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            sx={compactFieldSx}
                            label="Mobile number"
                            value={formData.mobile}
                            onChange={handleMobileChange}
                            error={Boolean(errors.mobile)}
                            helperText={errors.mobile}
                            inputProps={{ maxLength: 10, inputMode: "numeric" }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PhoneIphoneOutlined />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            sx={compactFieldSx}
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={updateField("password")}
                            error={Boolean(errors.password)}
                            helperText={errors.password || `Strength: ${passwordMeta.label}`}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockOutlined />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={() => setShowPassword((value) => !value)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <LinearProgress
                            variant="determinate"
                            value={(passwordMeta.score / 4) * 100}
                            sx={{ mt: 1, borderRadius: 999, height: 6 }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            sx={compactFieldSx}
                            label="Confirm password"
                            type={showPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={updateField("confirmPassword")}
                            error={Boolean(errors.confirmPassword)}
                            helperText={errors.confirmPassword}
                          />
                        </Grid>
                      </Grid>

                      <FormControlLabel
                        control={<Checkbox checked={formData.agree} onChange={updateField("agree")} />}
                        label="I agree to Xhirez Terms and Privacy Policy"
                      />
                      {errors.agree && <Alert severity="error">{errors.agree}</Alert>}
                    </Stack>
                  )}

                  {activeStep === 2 && (
                    <Stack spacing={2}>
                      <Box>
                        <Typography fontWeight={900}>Build your profile</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Recruiters use these details to shortlist candidates.
                        </Typography>
                      </Box>

                      <Grid container spacing={0} sx={threeColumnGrid}>
                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            freeSolo
                            options={citySuggestions}
                            value={formData.currentCity}
                            inputValue={formData.currentCity}
                            onChange={handleCityChange}
                            onInputChange={handleCityInputChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                sx={compactFieldSx}
                                label="Current city"
                                error={Boolean(errors.currentCity)}
                                helperText={errors.currentCity || "Type city name and choose a suggestion"}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            sx={compactFieldSx}
                            label="Preferred job role"
                            value={formData.preferredRole}
                            onChange={updateField("preferredRole")}
                            error={Boolean(errors.preferredRole)}
                            helperText={errors.preferredRole}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ gridColumn: { md: "span 3" } }}>
                          <Autocomplete
                            multiple
                            freeSolo
                            options={skillSuggestions}
                            value={formData.keySkills}
                            onChange={handleSkillsChange}
                            filterSelectedOptions
                            renderTags={() => null}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                sx={compactFieldSx}
                                label="Key skills"
                                placeholder="Type skill and choose from suggestions"
                                error={Boolean(errors.keySkills)}
                                helperText={errors.keySkills || "Click a suggestion to add it below"}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sx={{ gridColumn: { md: "span 3" } }}>
                          <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            sx={{
                              minHeight: 30,
                              gap: 1,
                            }}
                          >
                            {formData.keySkills.map((skill) => (
                              <Chip
                                key={skill}
                                label={skill}
                                size="small"
                                onDelete={() =>
                                  handleSkillsChange(
                                    null,
                                    formData.keySkills.filter((item) => item !== skill)
                                  )
                                }
                              />
                            ))}
                          </Stack>
                        </Grid>

                        {formData.workStatus === "experienced" && (
                          <>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                size="small"
                                sx={compactFieldSx}
                                label="Total experience"
                                value={formData.totalExperience}
                                onChange={updateField("totalExperience")}
                                error={Boolean(errors.totalExperience)}
                                helperText={errors.totalExperience}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                size="small"
                                sx={compactFieldSx}
                                label="Current company"
                                value={formData.currentCompany}
                                onChange={updateField("currentCompany")}
                                error={Boolean(errors.currentCompany)}
                                helperText={errors.currentCompany}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                size="small"
                                sx={compactFieldSx}
                                label="Current designation"
                                value={formData.currentDesignation}
                                onChange={updateField("currentDesignation")}
                                error={Boolean(errors.currentDesignation)}
                                helperText={errors.currentDesignation}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ gridColumn: { md: "span 3" } }}>
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 1.5,
                                  border: "1px solid #e5e7eb",
                                  borderRadius: 2,
                                  bgcolor: "#fbfdff",
                                }}
                              >
                                <Stack spacing={1.5}>
                                  <Box>
                                    <Typography fontWeight={900}>Projects</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      Add multiple projects from your experienced profile.
                                    </Typography>
                                  </Box>

                                  <Grid container spacing={0} sx={threeColumnGrid}>
                                    <Grid item xs={12} sm={6}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        sx={compactFieldSx}
                                        label="Project title"
                                        value={formData.projectTitle}
                                        onChange={updateField("projectTitle")}
                                        error={Boolean(errors.projectTitle)}
                                        helperText={errors.projectTitle}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        sx={compactFieldSx}
                                        label="Project link"
                                        value={formData.projectLink}
                                        onChange={updateField("projectLink")}
                                        error={Boolean(errors.projectLink)}
                                        helperText={errors.projectLink || "GitHub, portfolio or live URL"}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        sx={compactFieldSx}
                                        type="date"
                                        label="Project start date"
                                        value={formData.projectStartDate}
                                        onChange={updateField("projectStartDate")}
                                        error={Boolean(errors.projectStartDate)}
                                        helperText={errors.projectStartDate}
                                        InputLabelProps={{ shrink: true }}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        sx={compactFieldSx}
                                        type="date"
                                        label="Project end date"
                                        value={formData.projectEndDate}
                                        onChange={updateField("projectEndDate")}
                                        error={Boolean(errors.projectEndDate)}
                                        helperText={errors.projectEndDate}
                                        InputLabelProps={{ shrink: true }}
                                      />
                                    </Grid>
                                  </Grid>

                                  <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} spacing={1.5}>
                                    <Button variant="outlined" onClick={handleAddProject} sx={{ textTransform: "none", alignSelf: "flex-start" }}>
                                      Add project
                                    </Button>
                                    {errors.projects && (
                                      <Typography variant="caption" color="error">
                                        {errors.projects}
                                      </Typography>
                                    )}
                                  </Stack>

                                  {formData.projects.length > 0 && (
                                    <Stack spacing={1}>
                                      {formData.projects.map((project) => (
                                        <Paper
                                          key={project.id}
                                          elevation={0}
                                          sx={{
                                            p: 1.25,
                                            border: "1px solid #e5e7eb",
                                            borderRadius: 2,
                                          }}
                                        >
                                          <Stack
                                            direction={{ xs: "column", sm: "row" }}
                                            justifyContent="space-between"
                                            spacing={1}
                                          >
                                            <Box>
                                              <Typography fontWeight={800}>{project.title}</Typography>
                                              <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-word" }}>
                                                {project.link}
                                              </Typography>
                                              <Typography variant="caption" color="text.secondary">
                                                {project.startDate} - {project.endDate}
                                              </Typography>
                                            </Box>
                                            <Button
                                              color="error"
                                              onClick={() => handleRemoveProject(project.id)}
                                              sx={{ textTransform: "none", alignSelf: { sm: "center" } }}
                                            >
                                              Remove
                                            </Button>
                                          </Stack>
                                        </Paper>
                                      ))}
                                    </Stack>
                                  )}
                                </Stack>
                              </Paper>
                            </Grid>
                          </>
                        )}

                        <Grid item xs={12}>
                          <Button
                            component="label"
                            variant="outlined"
                            startIcon={<CloudUploadOutlined />}
                            sx={{
                              width: "100%",
                              minHeight: 42,
                              justifyContent: "flex-start",
                              borderStyle: "dashed",
                              borderRadius: 2,
                              textTransform: "none",
                              gridColumn: { md: "span 3" },
                            }}
                          >
                            {resumeLabel}
                            <input
                              hidden
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(event) =>
                                setFormData((current) => ({
                                  ...current,
                                  resumeName: event.target.files?.[0]?.name || "",
                                }))
                              }
                            />
                          </Button>
                        </Grid>
                      </Grid>

                    </Stack>
                  )}

                  {activeStep === 3 && (
                    <Stack spacing={2}>
                      <Box>
                        <Typography fontWeight={900}>Add your education</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Add your latest education so recruiters can understand your background.
                        </Typography>
                      </Box>

                      <Grid container spacing={0} sx={threeColumnGrid}>
                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            freeSolo
                            options={qualifications}
                            value={formData.highestQualification}
                            inputValue={formData.highestQualification}
                            onChange={handleQualificationChange}
                            onInputChange={handleQualificationInputChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                sx={compactFieldSx}
                                label="Highest qualification"
                                placeholder="Diploma, Bachelor Degree, Master Degree"
                                error={Boolean(errors.highestQualification)}
                                helperText={errors.highestQualification || "Choose or type your qualification"}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            freeSolo
                            options={courseOptions}
                            value={formData.course}
                            inputValue={formData.course}
                            onChange={handleCourseChange}
                            onInputChange={handleCourseInputChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                sx={compactFieldSx}
                                label="Course"
                                placeholder="Select course"
                                error={Boolean(errors.course)}
                                helperText={errors.course || "Course list changes by qualification"}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ gridColumn: { md: "span 3" } }}>
                          <Autocomplete
                            multiple
                            freeSolo
                            options={specializationOptions}
                            value={formData.specialization}
                            onChange={handleSpecializationChange}
                            filterSelectedOptions
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => {
                                const tagProps = getTagProps({ index });
                                return <Chip key={option} label={option} size="small" {...tagProps} />;
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                sx={compactFieldSx}
                                label="Specialization"
                                placeholder="Select multiple specializations"
                                error={Boolean(errors.specialization)}
                                helperText={errors.specialization || "Example: Computer Science, Data Science, Web Development"}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            sx={compactFieldSx}
                            label="University / Institute"
                            value={formData.university}
                            onChange={updateField("university")}
                            error={Boolean(errors.university)}
                            helperText={errors.university}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            sx={compactFieldSx}
                            select
                            label="Course type"
                            value={formData.courseType}
                            onChange={updateField("courseType")}
                          >
                            {courseTypes.map((courseType) => (
                              <MenuItem key={courseType} value={courseType}>
                                {courseType}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            sx={compactFieldSx}
                            select
                            label="Passing year"
                            value={formData.graduationYear}
                            onChange={updateField("graduationYear")}
                            error={Boolean(errors.graduationYear)}
                            helperText={errors.graduationYear}
                          >
                            {graduationYears.map((year) => (
                              <MenuItem key={year} value={year}>
                                {year}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                    </Stack>
                  )}

                  {activeStep === 4 && (
                    <Stack spacing={2}>
                      <Box>
                        <Typography fontWeight={900}>Complete your profile</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Add your headline and preferences before opening your Xhirez profile.
                        </Typography>
                      </Box>

                      <Grid container spacing={0} sx={threeColumnGrid}>
                        <Grid item xs={12} sx={{ gridColumn: { md: "span 3" } }}>
                          <TextField
                            fullWidth
                            multiline
                            minRows={2}
                            size="small"
                            sx={compactFieldSx}
                            label="Profile headline"
                            value={formData.profileHeadline}
                            onChange={updateField("profileHeadline")}
                            error={Boolean(errors.profileHeadline)}
                            helperText={errors.profileHeadline || "Example: Frontend developer skilled in React and Next.js"}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ gridColumn: { md: "span 3" } }}>
                          <Autocomplete
                            multiple
                            freeSolo
                            options={citySuggestions}
                            value={formData.preferredLocations}
                            onChange={handlePreferredLocationsChange}
                            filterSelectedOptions
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => {
                                const tagProps = getTagProps({ index });
                                return <Chip key={option} label={option} size="small" {...tagProps} />;
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                sx={compactFieldSx}
                                label="Preferred work locations"
                                placeholder="Type and select locations"
                                error={Boolean(errors.preferredLocations)}
                                helperText={errors.preferredLocations}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            sx={compactFieldSx}
                            label="Expected salary"
                            value={formData.expectedSalary}
                            onChange={updateField("expectedSalary")}
                            error={Boolean(errors.expectedSalary)}
                            helperText={errors.expectedSalary || "Example: 6 LPA"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            sx={compactFieldSx}
                            select
                            label="Notice period"
                            value={formData.noticePeriod}
                            onChange={updateField("noticePeriod")}
                            error={Boolean(errors.noticePeriod)}
                            helperText={errors.noticePeriod}
                          >
                            {noticePeriods.map((noticePeriod) => (
                              <MenuItem key={noticePeriod} value={noticePeriod}>
                                {noticePeriod}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sx={{ gridColumn: { md: "span 3" } }}>
                          <Typography variant="body2" fontWeight={800} sx={{ mb: 1 }}>
                            Job type
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {jobTypeOptions.map((jobType) => (
                              <Chip
                                key={jobType}
                                label={jobType}
                                clickable
                                color={formData.jobTypes.includes(jobType) ? "primary" : "default"}
                                variant={formData.jobTypes.includes(jobType) ? "filled" : "outlined"}
                                onClick={handleJobTypeToggle(jobType)}
                              />
                            ))}
                          </Stack>
                          {errors.jobTypes && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
                              {errors.jobTypes}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Stack>
                  )}

                  {activeStep === 1 && (
                    <Stack spacing={3} alignItems="center" sx={{ py: 2 }}>
                      <EmailOutlined sx={{ fontSize: 54, color: "#07a1e3" }} />
                      <Box textAlign="center">
                        <Typography variant="h6" fontWeight={900}>
                          Verify your email
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Enter the 4 digit OTP sent to {formData.email}
                        </Typography>
                      </Box>

                      <Stack
                        direction="row"
                        spacing={1.25}
                        justifyContent="center"
                        alignItems="center"
                        flexWrap="wrap"
                        useFlexGap
                      >
                        <Stack direction="row" spacing={1.25} justifyContent="center">
                          {formData.otp.map((digit, index) => (
                            <TextField
                              key={index}
                              id={`signup-otp-${index}`}
                              value={digit}
                              onChange={(event) => handleOtpChange(index, event.target.value)}
                              onKeyDown={(event) => handleOtpKeyDown(index, event)}
                              inputProps={{
                                maxLength: 1,
                                inputMode: "numeric",
                                style: { textAlign: "center", fontSize: 22, padding: "9px 0" },
                              }}
                              size="small"
                              sx={{
                                width: 50,
                                "& input": {
                                  textAlign: "center",
                                },
                              }}
                            />
                          ))}
                        </Stack>
                        <Button disabled={loading === "otp"} onClick={sendOtp} sx={{ textTransform: "none", minWidth: "auto" }}>
                          Resend OTP
                        </Button>
                      </Stack>

                      {errors.otp && <Alert severity="error">{errors.otp}</Alert>}
                      {isOtpVerified && <Alert severity="success">Email verified. You can complete registration.</Alert>}
                    </Stack>
                  )}
                  </Box>

                  <Divider />

                  <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2}>
                    <Button
                      disabled={activeStep === 0 || Boolean(loading)}
                      onClick={() => setActiveStep((step) => Math.max(0, step - 1))}
                      sx={{ textTransform: "none" }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      disabled={Boolean(loading)}
                      onClick={handleNext}
                      sx={{
                        minWidth: 180,
                        height: 46,
                        borderRadius: 2,
                        bgcolor: "#07a1e3",
                        textTransform: "none",
                        fontWeight: 900,
                        "&:hover": { bgcolor: "#0588c0" },
                      }}
                    >
                      {loading === "otp"
                        ? "Sending OTP..."
                        : loading === "verify"
                          ? "Verifying..."
                          : loading === "register"
                            ? "Completing profile..."
                            : activeStep === 1
                              ? "Verify email"
                              : activeStep === 2
                              ? "Save profile"
                              : activeStep === 3
                              ? "Save education"
                              : activeStep === 4
                              ? "Finish"
                              : "Continue"}
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4500}
        onClose={() => setSnackbar((current) => ({ ...current, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((current) => ({ ...current, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
