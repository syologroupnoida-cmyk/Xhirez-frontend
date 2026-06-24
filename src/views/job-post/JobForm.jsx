import React, { useMemo, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBriefcase,
  faBuilding,
  faCheck,
  faCircleCheck,
  faEnvelope,
  faIndianRupeeSign,
  faLocationDot,
  faPhone,
  faShieldHalved,
  faUserTie,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import RecruitFooter from "../recruiter/RecruitFooter";
import RecruitHeader from "../recruiter/RecruitHeader";

const steps = [
  {
    id: 1,
    title: "Job details",
    shortTitle: "Role",
    text: "Role, skills, location, salary, and hiring requirements.",
    icon: faBriefcase,
  },
  {
    id: 2,
    title: "Company details",
    shortTitle: "Company",
    text: "Company profile and hiring business information.",
    icon: faBuilding,
  },
  {
    id: 3,
    title: "Contact verification",
    shortTitle: "Verify",
    text: "Recruiter contact information for applicant responses.",
    icon: faShieldHalved,
  },
];

const formSections = {
  1: {
    eyebrow: "Step 1 of 3",
    title: "Tell us about the open role",
    description: "Keep the job title clear and add enough detail for candidates to self-match quickly.",
  },
  2: {
    eyebrow: "Step 2 of 3",
    title: "Add company information",
    description: "These details help candidates understand the employer and build trust in the posting.",
  },
  3: {
    eyebrow: "Step 3 of 3",
    title: "Verify recruiter contact",
    description: "Verified contact details improve response quality and help keep listings reliable.",
  },
};

const skillSuggestions = [
  "React",
  "Node.js",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "SQL",
  "AWS",
  "Digital Marketing",
  "Sales",
  "Communication",
  "Customer Support",
];

const citySuggestions = [
  { city: "Bengaluru", state: "Karnataka", country: "India" },
  { city: "Mumbai", state: "Maharashtra", country: "India" },
  { city: "Delhi", state: "Delhi", country: "India" },
  { city: "Gurugram", state: "Haryana", country: "India" },
  { city: "Noida", state: "Uttar Pradesh", country: "India" },
  { city: "Pune", state: "Maharashtra", country: "India" },
  { city: "Hyderabad", state: "Telangana", country: "India" },
  { city: "Chennai", state: "Tamil Nadu", country: "India" },
  { city: "Ahmedabad", state: "Gujarat", country: "India" },
  { city: "Kolkata", state: "West Bengal", country: "India" },
];

const stateSuggestions = [
  "Delhi",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

const countrySuggestions = ["India", "United States", "United Kingdom", "Canada", "Australia", "United Arab Emirates"];
const jobTypes = ["Full Time", "Part Time", "Contract", "Internship", "Remote", "Hybrid"];

const muiFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
    backgroundColor: "#fff",
    fontSize: "14px",
  },
  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
    borderColor: "#2f5cf6",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2f5cf6",
  },
};

const JobPostingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    experienceMin: "",
    experienceMax: "",
    salaryMin: "",
    salaryMax: "",
    location: "",
    jobType: "Full Time",
    functionalArea: "",
    industry: "",
    qualification: "",
    skills: [],
    vacancies: "1",
    companyName: "",
    companyAddress: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    website: "",
    industryCovered: "",
    operatingAreas: "",
    mobile: "",
    email: "",
    name: "",
    designation: "",
  });

  const completion = useMemo(() => Math.round((step / steps.length) * 100), [step]);
  const currentSection = formSections[step];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFieldValue = (name, value) => {
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleCityChange = (value) => {
    const selectedCity =
      typeof value === "string"
        ? citySuggestions.find((item) => item.city.toLowerCase() === value.toLowerCase())
        : value;

    setFormData((current) => ({
      ...current,
      city: typeof value === "string" ? value : value?.city || "",
      state: selectedCity?.state || current.state,
      country: selectedCity?.country || current.country,
    }));
  };

  const handleStateChange = (value) => {
    const nextState = value || "";
    setFormData((current) => ({
      ...current,
      state: nextState,
      country: stateSuggestions.includes(nextState) ? "India" : current.country,
    }));
  };

  const nextStep = () => setStep((current) => Math.min(current + 1, steps.length));
  const prevStep = () => setStep((current) => Math.max(current - 1, 1));

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Job posted successfully! (Demo)");
  };

  return (
    <main className="xh-recruit-page min-h-screen bg-[#f5f7fb] text-slate-950">
      <RecruitHeader />
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1800')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,31,0.94)_0%,rgba(12,27,53,0.9)_52%,rgba(47,92,246,0.34)_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-32 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#9db8ff]">
              Free job posting
            </p>
            <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-tight sm:text-4xl lg:text-[48px]">
              Post a job and reach relevant candidates faster
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/75">
              Create a clear job listing, add company context, and verify recruiter contact details in a simple guided flow.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm">
              {["Pan-India reach", "Verified recruiter details", "Fast candidate responses"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/10 px-4 py-2 shadow-sm backdrop-blur">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-[#7fb2ff]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[330px_1fr] lg:px-8">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="overflow-hidden rounded bg-white shadow-[0_12px_34px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
            <div className="bg-[linear-gradient(135deg,#eef4ff_0%,#ffffff_58%,#f3f7ff_100%)] p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Posting progress</p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="m-0 text-4xl font-black tracking-tight text-[#2f5cf6]">{completion}%</p>
                  <p className="m-0 mt-1 text-xs font-medium text-slate-500">complete</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#dbe7ff] bg-white text-lg font-bold text-[#2f5cf6] shadow-sm">
                  {step}/{steps.length}
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-[linear-gradient(90deg,#2f5cf6,#18a058)]" style={{ width: `${completion}%` }} />
              </div>
            </div>

            <div className="space-y-3 p-5">
              {steps.map((item) => {
                const isActive = item.id === step;
                const isDone = item.id < step;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStep(item.id)}
                    className={`group flex w-full gap-3 rounded border p-3 text-left transition ${
                      isActive
                        ? "border-[#2f5cf6] bg-[#eef4ff] shadow-sm"
                        : isDone
                          ? "border-[#b9d6ff] bg-white"
                          : "border-slate-200 bg-white hover:border-[#b9d6ff] hover:bg-[#fbfdff]"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 flex-none items-center justify-center rounded border text-sm transition ${
                        isActive || isDone
                          ? "border-[#2f5cf6] bg-[#2f5cf6] text-white"
                          : "border-slate-200 bg-slate-50 text-slate-500 group-hover:border-[#b9d6ff] group-hover:text-[#2f5cf6]"
                      }`}
                    >
                      <FontAwesomeIcon icon={isDone ? faCheck : item.icon} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-slate-950">{item.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">{item.text}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 rounded bg-[#07111f] p-5 text-white shadow-[0_12px_30px_rgba(15,23,42,0.16)]">
            <p className="text-sm font-bold">What happens after posting?</p>
            <div className="mt-4 space-y-3 text-xs leading-5 text-white/70">
              <p>Applications start flowing to your recruiter contact.</p>
              <p>You can shortlist candidates and manage responses from your dashboard.</p>
              <p>Clear job details help improve candidate quality and reduce back-and-forth.</p>
            </div>
          </div>
        </aside>

        <div>
          <form onSubmit={handleSubmit} className="rounded bg-white shadow-[0_16px_42px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
            <div className="border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f7faff_100%)] px-5 py-5 sm:px-6">
              <p className="text-xs font-bold uppercase tracking-wide text-[#2f5cf6]">{currentSection.eyebrow}</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">{currentSection.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{currentSection.description}</p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {steps.map((item, index) => {
                  const isActive = item.id === step;
                  const isDone = item.id < step;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setStep(item.id)}
                      className={`relative flex min-h-16 items-center gap-3 rounded border px-3 py-2 text-left transition ${
                        isActive
                          ? "border-[#2f5cf6] bg-white shadow-sm"
                          : isDone
                            ? "border-[#b9d6ff] bg-white"
                            : "border-slate-200 bg-white/70 hover:border-slate-300"
                      }`}
                    >
                      {index < steps.length - 1 && (
                        <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-slate-200 md:block" />
                      )}
                      <span
                        className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-xs ${
                          isActive || isDone ? "bg-[#2f5cf6] text-white" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isDone ? <FontAwesomeIcon icon={faCheck} /> : item.id}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-bold text-slate-950">{item.shortTitle}</span>
                        <span className="hidden text-[11px] text-slate-500 sm:block">{item.title}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#fbfcff] p-5 sm:p-6">
              {step === 1 && (
                <div className="rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded bg-[#eef4ff] text-[#2f5cf6]">
                    <FontAwesomeIcon icon={faBriefcase} />
                  </span>
                  <div>
                    <h3 className="m-0 text-sm font-bold text-slate-950">Role information</h3>
                    <p className="m-0 mt-1 text-xs text-slate-500">Add the core hiring requirements candidates will scan first.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextField name="jobTitle" value={formData.jobTitle} onChange={handleChange} required label="Job title" placeholder="Senior Software Engineer" fullWidth size="small" sx={muiFieldSx} className="md:col-span-2" />
                  <TextField type="number" name="experienceMin" value={formData.experienceMin} onChange={handleChange} label="Minimum experience" placeholder="0" fullWidth size="small" sx={muiFieldSx} />
                  <TextField type="number" name="experienceMax" value={formData.experienceMax} onChange={handleChange} label="Maximum experience" placeholder="5" fullWidth size="small" sx={muiFieldSx} />
                  <TextField
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    label="Minimum salary"
                    placeholder="400000"
                    fullWidth
                    size="small"
                    sx={muiFieldSx}
                    InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faIndianRupeeSign} /></InputAdornment> }}
                  />
                  <TextField
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    label="Maximum salary"
                    placeholder="900000"
                    fullWidth
                    size="small"
                    sx={muiFieldSx}
                    InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faIndianRupeeSign} /></InputAdornment> }}
                  />
                  <Autocomplete
                    freeSolo
                    options={citySuggestions.map((item) => item.city)}
                    value={formData.location}
                    onChange={(_, value) => handleFieldValue("location", value || "")}
                    onInputChange={(_, value) => handleFieldValue("location", value)}
                    renderInput={(params) => (
                      <TextField {...params} required label="Job location" placeholder="Mumbai, Pune, Remote" fullWidth size="small" sx={muiFieldSx} InputProps={{ ...params.InputProps, startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faLocationDot} /></InputAdornment> }} />
                    )}
                  />
                  <TextField select name="jobType" value={formData.jobType} onChange={handleChange} label="Job type" fullWidth size="small" sx={muiFieldSx}>
                    {jobTypes.map((item) => (
                      <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                  </TextField>
                  <TextField name="functionalArea" value={formData.functionalArea} onChange={handleChange} label="Functional area" placeholder="IT, Sales, Marketing" fullWidth size="small" sx={muiFieldSx} />
                  <TextField name="industry" value={formData.industry} onChange={handleChange} label="Industry" placeholder="Software, BFSI, Retail" fullWidth size="small" sx={muiFieldSx} />
                  <TextField name="qualification" value={formData.qualification} onChange={handleChange} label="Qualification" placeholder="B.Tech, MBA" fullWidth size="small" sx={muiFieldSx} />
                  <TextField type="number" name="vacancies" value={formData.vacancies} onChange={handleChange} label="Vacancies" fullWidth size="small" sx={muiFieldSx} />
                  <Autocomplete
                    multiple
                    freeSolo
                    options={skillSuggestions}
                    value={formData.skills}
                    onChange={(_, value) => handleFieldValue("skills", value)}
                    renderInput={(params) => (
                      <TextField {...params} label="Key skills" placeholder="Select or type skills" fullWidth size="small" sx={muiFieldSx} />
                    )}
                    className="md:col-span-2"
                  />
                  <TextField name="jobDescription" value={formData.jobDescription} onChange={handleChange} required label="Job description" placeholder="Describe responsibilities, must-have skills, and interview expectations." fullWidth multiline rows={5} sx={muiFieldSx} className="md:col-span-2" />
                </div>
                </div>
              )}

              {step === 2 && (
                <div className="rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded bg-[#eef4ff] text-[#2f5cf6]">
                    <FontAwesomeIcon icon={faBuilding} />
                  </span>
                  <div>
                    <h3 className="m-0 text-sm font-bold text-slate-950">Employer profile</h3>
                    <p className="m-0 mt-1 text-xs text-slate-500">Make the company context credible and easy to trust.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextField name="companyName" value={formData.companyName} onChange={handleChange} required label="Company name" placeholder="Company legal or brand name" fullWidth size="small" sx={muiFieldSx} className="md:col-span-2" />
                  <TextField name="companyAddress" value={formData.companyAddress} onChange={handleChange} label="Company address" placeholder="Office address or registered location" fullWidth multiline rows={3} sx={muiFieldSx} className="md:col-span-2" />
                  <Autocomplete
                    freeSolo
                    options={citySuggestions}
                    getOptionLabel={(option) => (typeof option === "string" ? option : option.city)}
                    value={citySuggestions.find((item) => item.city === formData.city) || formData.city}
                    onChange={(_, value) => handleCityChange(value)}
                    onInputChange={(_, value) => handleCityChange(value)}
                    renderInput={(params) => (
                      <TextField {...params} label="City" placeholder="Select or type city" fullWidth size="small" sx={muiFieldSx} />
                    )}
                  />
                  <Autocomplete
                    freeSolo
                    options={stateSuggestions}
                    value={formData.state}
                    onChange={(_, value) => handleStateChange(value)}
                    onInputChange={(_, value) => handleStateChange(value)}
                    renderInput={(params) => (
                      <TextField {...params} label="State" placeholder="Select or type state" fullWidth size="small" sx={muiFieldSx} />
                    )}
                  />
                  <Autocomplete
                    freeSolo
                    options={countrySuggestions}
                    value={formData.country}
                    onChange={(_, value) => handleFieldValue("country", value || "")}
                    onInputChange={(_, value) => handleFieldValue("country", value)}
                    renderInput={(params) => (
                      <TextField {...params} label="Country" placeholder="Select or type country" fullWidth size="small" sx={muiFieldSx} />
                    )}
                  />
                  <TextField name="pincode" value={formData.pincode} onChange={handleChange} label="Pincode" fullWidth size="small" sx={muiFieldSx} />
                  <TextField type="url" name="website" value={formData.website} onChange={handleChange} label="Website" placeholder="https://" fullWidth size="small" sx={muiFieldSx} />
                  <TextField name="industryCovered" value={formData.industryCovered} onChange={handleChange} label="Industry covered" fullWidth size="small" sx={muiFieldSx} />
                  <TextField name="operatingAreas" value={formData.operatingAreas} onChange={handleChange} label="Operating areas" fullWidth size="small" sx={muiFieldSx} />
                </div>
                </div>
              )}

              {step === 3 && (
                <div className="rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded bg-[#eef4ff] text-[#2f5cf6]">
                    <FontAwesomeIcon icon={faShieldHalved} />
                  </span>
                  <div>
                    <h3 className="m-0 text-sm font-bold text-slate-950">Recruiter verification</h3>
                    <p className="m-0 mt-1 text-xs text-slate-500">Confirm who candidates should hear from after applying.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded border border-[#b9d6ff] bg-[#eef4ff] p-4 text-sm leading-6 text-slate-700 md:col-span-2">
                    Verified contact details help applicants trust your listing and keep responses routed to the right recruiter.
                  </div>
                  <TextField
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    label="Mobile number"
                    placeholder="10-digit number"
                    fullWidth
                    size="small"
                    sx={muiFieldSx}
                    InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faPhone} /></InputAdornment> }}
                  />
                  <TextField
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    label="Email ID"
                    placeholder="recruiter@company.com"
                    fullWidth
                    size="small"
                    sx={muiFieldSx}
                    InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faEnvelope} /></InputAdornment> }}
                  />
                  <TextField
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    label="Contact person"
                    placeholder="Recruiter name"
                    fullWidth
                    size="small"
                    sx={muiFieldSx}
                    InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faUserTie} /></InputAdornment> }}
                  />
                  <TextField name="designation" value={formData.designation} onChange={handleChange} label="Designation" placeholder="HR Manager" fullWidth size="small" sx={muiFieldSx} />
                </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className="inline-flex h-11 items-center gap-2 rounded border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Previous
              </button>

              {step < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex h-11 items-center gap-2 rounded border border-[#2f5cf6] bg-[#2f5cf6] px-5 text-sm font-semibold text-white transition hover:bg-[#234ee3]"
                >
                  Next step
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex h-11 items-center gap-2 rounded border border-[#18a058] bg-[#18a058] px-5 text-sm font-semibold text-white transition hover:bg-[#138049]"
                >
                  Post job for free
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              ["Large candidate reach", "Postings are designed to attract relevant applicants across locations."],
              ["Structured applicant flow", "Keep role, company, and contact details organized from the start."],
              ["Better response quality", "Clear requirements help candidates understand fit before applying."],
            ].map(([title, text]) => (
              <div key={title} className="rounded bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <FontAwesomeIcon icon={faUsers} className="mb-3 text-[#2f5cf6]" />
                <h3 className="text-sm font-bold text-slate-950">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <RecruitFooter />
    </main>
  );
};

export default JobPostingForm;
