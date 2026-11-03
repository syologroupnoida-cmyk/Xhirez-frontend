// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import {
// //   Container,
// //   Row,
// //   Col,
// //   Card,
// //   Badge,
// //   Pagination,
// //   Button,
// //   Form,
// //   Spinner
// // } from "react-bootstrap";
// // import {
// //   MapPin,
// //   Building2,
// //   Clock,
// //   BookmarkPlus,
// //   Briefcase,
// //   Search,
// //   ChevronRight
// // } from "lucide-react";
// // import UnifiedHeader from '../../components/header/UnifiedHeader';
// // import Footer from "../../components/footer/footer";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
// // import { Link, useLocation, useNavigate } from "@/router-dom";
// // import { API_ENDPOINTS } from "../apiConfig";
// // import { toast, ToastContainer } from "react-toastify";
// // import AuthorizationHeader from "../AuthorizationHeader";

// // const Alljobs = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const [jobs, setJobs] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
  
// //   // Pagination & Filter state
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [jobsPerPage] = useState(10);
// //   const [selectedFilters, setSelectedFilters] = useState({
// //     workMode: [],
// //     salary: [],
// //     location: []
// //   });

// //   const authData = sessionStorage.getItem("authToken");
// //   const user = authData ? JSON.parse(authData).users : null;
// //   const params = new URLSearchParams(location.search);
// //   const query = decodeURIComponent(params.get("query") || "").trim();
// //   const city = decodeURIComponent(params.get("location") || "").trim();

// //   useEffect(() => {
// //     fetchJobs(query, city);
// //   }, [query, city]);

// //   const fetchJobs = async (title, city) => {
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const response = await axios.get(API_ENDPOINTS.FETCHJOBSBYCONDITION, {
// //         params: { title, city },
// //       });
// //       setJobs(response.data.data || []);
// //       setCurrentPage(1);
// //     } catch (err) {
// //       setError("Failed to fetch jobs.");
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const saveBookmark = async (jobId) => {
// //     if (!user) {
// //       toast.error("Please login to save jobs.");
// //       return;
// //     }
// //     try {
// //       const response = await AuthorizationHeader.get(API_ENDPOINTS.SAVEBOOKMARK, {
// //         params: { job_id: jobId, user_id: user.id },
// //       });
// //       response.data.status === 200 ? toast.success("Saved!") : toast.error("Already Saved.");
// //     } catch (error) { console.error(error); }
// //   };

// //   // Pagination Logic
// //   const indexOfLastJob = currentPage * jobsPerPage;
// //   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
// //   const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
// //   const totalPages = Math.ceil(jobs.length / jobsPerPage);

// //   return (
// //     <div className="bg-light min-vh-100">
// //       <UnifiedHeader />
// //       <ToastContainer />

// //       {/* Hero Search Section (Naukri Style) */}
// //       <div className="bg-white border-bottom py-4 shadow-sm">
// //         <Container>
// //           <div className="d-flex align-items-center gap-2 text-muted mb-2" style={{fontSize: '14px'}}>
// //             <span>Home</span> <ChevronRight size={14}/> <span>Jobs</span> <ChevronRight size={14}/> <strong>{query || 'All Jobs'}</strong>
// //           </div>
// //           <h5 className="fw-bold">{jobs.length} {query} Vacancies in {city || 'India'}</h5>
// //         </Container>
// //       </div>

// //       <Container className="py-4">
// //         <Row>
// //           {/* --- LEFT SIDEBAR FILTERS --- */}
// //           <Col lg={3} className="d-none d-lg-block">
// //             <Card className="border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
// //               <Card.Body>
// //                 <h6 className="fw-bold mb-3 border-bottom pb-2">All Filters</h6>
                
// //                 <div className="filter-section mb-4">
// //                   <p className="fw-semibold small mb-2">Work Mode</p>
// //                   {['Work from office', 'Remote', 'Hybrid'].map(mode => (
// //                     <Form.Check key={mode} type="checkbox" label={mode} className="small mb-1" />
// //                   ))}
// //                 </div>

// //                 <div className="filter-section mb-4">
// //                   <p className="fw-semibold small mb-2">Experience</p>
// //                   <Form.Range min="0" max="30" />
// //                   <div className="d-flex justify-content-between small text-muted">
// //                     <span>0 Yrs</span><span>30 Yrs</span>
// //                   </div>
// //                 </div>

// //                 <div className="filter-section mb-4">
// //                   <p className="fw-semibold small mb-2">Salary</p>
// //                   {['0-3 Lakhs', '3-6 Lakhs', '6-10 Lakhs', '10-15 Lakhs'].map(sal => (
// //                     <Form.Check key={sal} type="checkbox" label={sal} className="small mb-1" />
// //                   ))}
// //                 </div>

// //                 <Button variant="outline-primary" size="sm" className="w-100 mt-2">Apply Filters</Button>
// //               </Card.Body>
// //             </Card>
// //           </Col>

// //           {/* --- RIGHT SIDE JOB LISTINGS --- */}
// //           <Col lg={9}>
// //             {loading ? (
// //               <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
// //             ) : currentJobs.length > 0 ? (
// //               currentJobs.map((job) => (
// //                 <Card className="job-card border-0 shadow-sm mb-3 position-relative" key={job.id}>
// //                   <Card.Body className="p-4">
// //                     <Row>
// //                       <Col xs={10}>
// //                         <Link 
// //                           to={user ? `/applyjob/${job.id}` : "/login"} 
// //                           className="text-decoration-none text-dark"
// //                           onClick={(e) => !user && (e.preventDefault(), toast.error("Login required"), navigate("/login"))}
// //                         >
// //                           <h6 className="fw-bold mb-1 hover-primary">{job.jobtitle}</h6>
// //                           <div className="d-flex align-items-center gap-2 mb-2">
// //                             <span className="text-muted small fw-medium">{job.companyname}</span>
// //                             <Badge bg="success" className="d-flex align-items-center gap-1" style={{fontSize: '10px'}}>
// //                               4.1 <Star size={10} fill="white"/>
// //                             </Badge>
// //                           </div>

// //                           <div className="d-flex flex-wrap gap-3 text-muted mb-3 small">
// //                             <div className="d-flex align-items-center gap-1">
// //                               <Briefcase size={14}/> <span>{job.minExperience}-{job.maxExperience} Yrs</span>
// //                             </div>
// //                             <div className="d-flex align-items-center gap-1">
// //                               <span className="fw-bold">₹</span> <span>{job.minimumsalary} - {job.MaximumSalary} PA</span>
// //                             </div>
// //                             <div className="d-flex align-items-center gap-1">
// //                               <MapPin size={14}/> <span>{job.location}</span>
// //                             </div>
// //                           </div>

// //                           <div className="text-muted small mb-3">
// //                             <Clock size={14} className="me-1"/> {job.skills.substring(0, 100)}...
// //                           </div>
// //                         </Link>

// //                         <div className="d-flex gap-2">
// //                           {job.skills.split(",").slice(0, 4).map((skill, i) => (
// //                             <Badge key={i} bg="light" text="secondary" className="fw-normal border">{skill}</Badge>
// //                           ))}
// //                         </div>
// //                       </Col>

// //                       <Col xs={2} className="text-end">
// //                         <img 
// //                           src={job.comp_logo ? API_ENDPOINTS.FETCHIMAGE(job.comp_logo) : "https://via.placeholder.com/50"} 
// //                           alt="logo" 
// //                           className="rounded border"
// //                           style={{width: '50px', height: '50px', objectFit: 'contain'}}
// //                         />
// //                       </Col>
// //                     </Row>
// //                   </Card.Body>
// //                   <Card.Footer className="bg-white border-top-0 d-flex justify-content-between align-items-center px-4 pb-3">
// //                     <span className="text-muted small">{job.job_posttime || "Few days ago"}</span>
// //                     <Button variant="link" className="p-0 text-decoration-none text-primary small" onClick={() => saveBookmark(job.id)}>
// //                       <BookmarkPlus size={18} className="me-1"/> Save
// //                     </Button>
// //                   </Card.Footer>
// //                 </Card>
// //               ))
// //             ) : (
// //               <Card className="text-center p-5 border-0 shadow-sm">
// //                 <p className="mb-0">No jobs found matching your criteria.</p>
// //               </Card>
// //             )}

// //             {/* Pagination */}
// //             {totalPages > 1 && (
// //               <Pagination className="justify-content-center mt-4 custom-pagination">
// //                 <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(p-1, 1))} disabled={currentPage === 1} />
// //                 {[...Array(totalPages)].map((_, i) => (
// //                   <Pagination.Item key={i+1} active={i+1 === currentPage} onClick={() => setCurrentPage(i+1)}>
// //                     {i+1}
// //                   </Pagination.Item>
// //                 ))}
// //                 <Pagination.Next onClick={() => setCurrentPage(p => Math.min(p+1, totalPages))} disabled={currentPage === totalPages} />
// //               </Pagination>
// //             )}
// //           </Col>
// //         </Row>
// //       </Container>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default Alljobs;

// import React, { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Badge, Pagination, Button, Spinner } from "react-bootstrap";
// import {
//   MapPin,
//   Clock,
//   BookmarkPlus,
//   Briefcase,
//   Search,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
//   ChevronLeft,
//   X,
//   Star,
//   SlidersHorizontal,
// } from "lucide-react";
// import UnifiedHeader from "../../components/header/UnifiedHeader";
// import Footer from "../../components/footer/footer";
// import { Link, useLocation, useNavigate } from "@/router-dom";
// import { API_ENDPOINTS } from "../apiConfig";
// import { toast, ToastContainer } from "react-toastify";
// import AuthorizationHeader from "../AuthorizationHeader";

// /* ------------------------------------------------------------------ */
// /* Helpers                                                             */
// /* ------------------------------------------------------------------ */
// const num = (v) => {
//   const n = parseFloat(v);
//   return Number.isNaN(n) ? null : n;
// };
// // salary in rupees (e.g. 80000) or already in lakhs (e.g. 8) -> lakhs
// const toLakhs = (v) => {
//   const n = num(String(v ?? "").replace(/[^\d.]/g, ""));
//   if (n === null) return null;
//   return n >= 1000 ? n / 100000 : n;
// };
// const norm = (s) => String(s || "").toLowerCase().replace(/[-_\s]/g, "");
// const firstVal = (job, fields) => {
//   for (const f of fields) {
//     const v = job[f];
//     if (v !== undefined && v !== null && String(v).trim() !== "") return String(v);
//   }
//   return null;
// };

// const WORK_MODES = [
//   { label: "Work from office", re: /office|onsite|on-site|wfo/i },
//   { label: "Remote", re: /remote|wfh|work from home/i },
//   { label: "Hybrid", re: /hybrid/i },
// ];

// const POSTED_OPTIONS = [
//   { label: "Any time", days: 0 },
//   { label: "1 day", days: 1 },
//   { label: "7 days", days: 7 },
//   { label: "15 days", days: 15 },
//   { label: "1 month", days: 30 },
//   { label: "3 months", days: 90 },
// ];
// const SORT_OPTIONS = ["Relevance", "Latest", "Salary: high to low", "Experience: low to high"];
// const PER_PAGE_OPTIONS = [10, 20, 50, 100];

// /* Checkbox-list filters. A job is only filtered by one of these if the
//    job object actually contains one of the listed `fields`. */
// const OPTION_SECTIONS = [
//   { key: "employmentType", label: "Employment type", fields: ["employmenttype", "jobtype"], options: ["Full time", "Part time", "Contract", "Internship", "Freelance"] },
//   { key: "department", label: "Department and Role", fields: ["department", "role", "functionalarea"], options: ["Engineering", "Sales & Business Development", "Marketing", "Finance & Accounting", "Human Resources", "Operations", "Design", "Customer Support"] },
//   { key: "industry", label: "Industry", fields: ["industry", "industryType"], options: ["IT Services", "Banking & Finance", "Healthcare", "Education", "Retail & FMCG", "Manufacturing", "Telecom"] },
//   { key: "diversity", label: "Diversity hiring", badge: "New Add-on", fields: ["diversity"], options: ["Women", "Persons with disabilities", "Veterans", "Career restart"] },
//   { key: "noticePeriod", label: "Notice period", fields: ["noticeperiod", "noticePeriod"], options: ["Immediate", "15 days", "1 month", "2 months", "3 months"] },
//   { key: "age", label: "Age", fields: ["age", "agegroup"], options: ["18 - 25", "26 - 35", "36 - 45", "46+"] },
//   { key: "degree", label: "Degree/Course", fields: ["degree", "course", "qualification"], options: ["B.Tech / B.E.", "B.Sc", "B.Com", "BBA", "MBA / PGDM", "M.Tech", "Any graduate"] },
//   { key: "college", label: "College name", fields: ["college", "institute"], options: ["IIT", "NIT", "Delhi University", "Other premium institutes"] },
//   { key: "gradYear", label: "Year of degree completion", fields: ["gradyear", "passingyear"], options: ["2026", "2025", "2024", "2023", "2022 or earlier"] },
//   { key: "profileFresh", label: "New & modified profiles", fields: ["freshness"], options: ["New today", "Modified in last 7 days", "Modified in last 30 days"] },
// ];

// const emptyFilters = () => ({
//   keywords: "",
//   companies: [],
//   locations: [],
//   expMin: "",
//   expMax: "",
//   salMin: "",
//   salMax: "",
//   workModes: [],
//   extra: {},
// });

// const toggleIn = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

// /* ------------------------------------------------------------------ */
// /* Component                                                           */
// /* ------------------------------------------------------------------ */
// const Alljobs = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // list controls
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(10);
//   const [sortBy, setSortBy] = useState("Relevance");
//   const [postedDays, setPostedDays] = useState(0);
//   const [selectedIds, setSelectedIds] = useState([]);

//   // filters
//   const [f, setF] = useState(emptyFilters());
//   const [open, setOpen] = useState({ location: true, experience: true });
//   const [locSearch, setLocSearch] = useState("");
//   const [locExpanded, setLocExpanded] = useState(false);
//   const [coSearch, setCoSearch] = useState("");
//   const [coExpanded, setCoExpanded] = useState(false);
//   const [showMobileFilters, setShowMobileFilters] = useState(false);

//   const authData = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
//   const user = authData ? JSON.parse(authData).users : null;
//   const params = new URLSearchParams(location.search);
//   const query = decodeURIComponent(params.get("query") || "").trim();
//   const city = decodeURIComponent(params.get("location") || "").trim();

//   useEffect(() => {
//     fetchJobs(query, city);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [query, city]);

//   const fetchJobs = async (title, cityName) => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(API_ENDPOINTS.FETCHJOBSBYCONDITION, {
//         params: { title, city: cityName },
//       });
//       setJobs(response.data.data || []);
//       setCurrentPage(1);
//     } catch (err) {
//       setError("Failed to fetch jobs.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveBookmark = async (jobId, silent = false) => {
//     if (!user) {
//       toast.error("Please login to save jobs.");
//       return false;
//     }
//     try {
//       const response = await AuthorizationHeader.get(API_ENDPOINTS.SAVEBOOKMARK, {
//         params: { job_id: jobId, user_id: user.id },
//       });
//       if (!silent) {
//         response.data.status === 200 ? toast.success("Saved!") : toast.error("Already Saved.");
//       }
//       return response.data.status === 200;
//     } catch (e) {
//       console.error(e);
//       return false;
//     }
//   };

//   /* ---------- facet data (built from ALL fetched jobs) ---------- */
//   const locationCounts = useMemo(() => {
//     const m = {};
//     jobs.forEach((j) => {
//       String(j.location || "")
//         .split(/[,/]/)
//         .map((s) => s.trim())
//         .filter(Boolean)
//         .forEach((l) => { m[l] = (m[l] || 0) + 1; });
//     });
//     return Object.entries(m).sort((a, b) => b[1] - a[1]);
//   }, [jobs]);

//   const companyCounts = useMemo(() => {
//     const m = {};
//     jobs.forEach((j) => {
//       const c = (j.companyname || "").trim();
//       if (c) m[c] = (m[c] || 0) + 1;
//     });
//     return Object.entries(m).sort((a, b) => b[1] - a[1]);
//   }, [jobs]);

//   /* ---------- filtering + sorting ---------- */
//   const filteredJobs = useMemo(() => {
//     const kwWords = f.keywords.toLowerCase().split(/[,\s]+/).filter(Boolean);
//     const eMin = num(f.expMin), eMax = num(f.expMax);
//     const sMin = num(f.salMin), sMax = num(f.salMax);
//     const cutoff = postedDays ? Date.now() - postedDays * 86400000 : null;

//     let list = jobs.filter((job) => {
//       if (kwWords.length) {
//         const hay = `${job.jobtitle || ""} ${job.companyname || ""} ${job.skills || ""}`.toLowerCase();
//         if (!kwWords.every((w) => hay.includes(w))) return false;
//       }
//       if (f.companies.length && !f.companies.some((c) => c.toLowerCase() === (job.companyname || "").trim().toLowerCase())) return false;
//       if (f.locations.length) {
//         const jl = String(job.location || "").toLowerCase();
//         if (!f.locations.some((l) => jl.includes(l.toLowerCase()))) return false;
//       }

//       // experience overlap
//       if (eMin !== null || eMax !== null) {
//         const jMin = num(job.minExperience) ?? 0;
//         const jMax = num(job.maxExperience) ?? jMin;
//         if (eMin !== null && jMax < eMin) return false;
//         if (eMax !== null && jMin > eMax) return false;
//       }
//       // salary overlap (lakhs)
//       if (sMin !== null || sMax !== null) {
//         const jMin = toLakhs(job.minimumsalary);
//         const jMax = toLakhs(job.MaximumSalary) ?? jMin;
//         if (jMin !== null) {
//           if (sMin !== null && jMax < sMin) return false;
//           if (sMax !== null && jMin > sMax) return false;
//         }
//       }

//       // work mode
//       if (f.workModes.length) {
//         const v = firstVal(job, ["workmode", "workMode", "jobtype"]);
//         if (v !== null) {
//           const ok = f.workModes.some((label) => WORK_MODES.find((m) => m.label === label)?.re.test(v));
//           if (!ok) return false;
//         }
//       }

//       // posted within
//       if (cutoff) {
//         const d = new Date(job.job_posttime);
//         if (!Number.isNaN(d.getTime()) && d.getTime() < cutoff) return false;
//       }

//       // checkbox sections (only applied when the job carries that field)
//       for (const sec of OPTION_SECTIONS) {
//         const picked = f.extra[sec.key] || [];
//         if (!picked.length) continue;
//         const v = firstVal(job, sec.fields);
//         if (v === null) continue;
//         if (!picked.some((p) => norm(v).includes(norm(p)))) return false;
//       }
//       return true;
//     });

//     list = [...list];
//     if (sortBy === "Latest") {
//       list.sort((a, b) => new Date(b.job_posttime || 0) - new Date(a.job_posttime || 0));
//     } else if (sortBy === "Salary: high to low") {
//       list.sort((a, b) => (toLakhs(b.MaximumSalary) || 0) - (toLakhs(a.MaximumSalary) || 0));
//     } else if (sortBy === "Experience: low to high") {
//       list.sort((a, b) => (num(a.minExperience) || 0) - (num(b.minExperience) || 0));
//     }
//     return list;
//   }, [jobs, f, sortBy, postedDays]);

//   // back to page 1 whenever the result set changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [f, sortBy, perPage, postedDays]);

//   /* ---------- pagination ---------- */
//   const totalPages = Math.max(1, Math.ceil(filteredJobs.length / perPage));
//   const safePage = Math.min(currentPage, totalPages);
//   const currentJobs = filteredJobs.slice((safePage - 1) * perPage, safePage * perPage);

//   /* ---------- applied chips ---------- */
//   const chips = [];
//   f.locations.forEach((l) => chips.push({ id: `l-${l}`, label: l, remove: () => setF((p) => ({ ...p, locations: p.locations.filter((x) => x !== l) })) }));
//   f.companies.forEach((c) => chips.push({ id: `c-${c}`, label: c, remove: () => setF((p) => ({ ...p, companies: p.companies.filter((x) => x !== c) })) }));
//   f.workModes.forEach((m) => chips.push({ id: `w-${m}`, label: m, remove: () => setF((p) => ({ ...p, workModes: p.workModes.filter((x) => x !== m) })) }));
//   if (f.keywords.trim()) chips.push({ id: "kw", label: `"${f.keywords.trim()}"`, remove: () => setF((p) => ({ ...p, keywords: "" })) });
//   if (f.expMin !== "" || f.expMax !== "") chips.push({ id: "exp", label: `${f.expMin || 0} - ${f.expMax || "30+"} yrs`, remove: () => setF((p) => ({ ...p, expMin: "", expMax: "" })) });
//   if (f.salMin !== "" || f.salMax !== "") chips.push({ id: "sal", label: `₹${f.salMin || 0} - ${f.salMax || "any"} L`, remove: () => setF((p) => ({ ...p, salMin: "", salMax: "" })) });
//   OPTION_SECTIONS.forEach((sec) =>
//     (f.extra[sec.key] || []).forEach((v) =>
//       chips.push({
//         id: `${sec.key}-${v}`,
//         label: v,
//         remove: () => setF((p) => ({ ...p, extra: { ...p.extra, [sec.key]: (p.extra[sec.key] || []).filter((x) => x !== v) } })),
//       })
//     )
//   );

//   /* ---------- UI helpers (plain functions, NOT components: keeps input focus) ---------- */
//   const isOpen = (id) => !!open[id];
//   const toggleOpen = (id) => setOpen((p) => ({ ...p, [id]: !p[id] }));

//   const renderSection = (id, label, body, opts = {}) => (
//     <div className="xh-fl-sec" key={id}>
//       <div className="xh-fl-sec-head" onClick={() => toggleOpen(id)} role="button" tabIndex={0}>
//         <span className="xh-fl-sec-title">
//           {label}
//           {opts.badge && <em className="xh-fl-new">{opts.badge}</em>}
//         </span>
//         <span className="xh-fl-sec-right">
//           {opts.clear && isOpen(id) && (
//             <button type="button" className="xh-fl-clear" onClick={(e) => { e.stopPropagation(); opts.clear(); }}>Clear</button>
//           )}
//           {isOpen(id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//         </span>
//       </div>
//       {isOpen(id) && <div className="xh-fl-sec-body">{body}</div>}
//     </div>
//   );

//   const renderCheckList = (items, selected, onToggle, showCounts) =>
//     items.map((it) => {
//       const name = Array.isArray(it) ? it[0] : it;
//       const count = Array.isArray(it) ? it[1] : null;
//       return (
//         <label className="xh-fl-check" key={name}>
//           <input type="checkbox" checked={selected.includes(name)} onChange={() => onToggle(name)} />
//           <span className="xh-fl-check-label">{name}</span>
//           {showCounts && count !== null && <span className="xh-fl-count">{count}</span>}
//         </label>
//       );
//     });

//   const renderFacet = (id, label, data, selectedArr, key, search, setSearch, expanded, setExpanded, placeholder, moreWord) => {
//     const q = search.trim().toLowerCase();
//     const matched = data.filter(([n]) => !q || n.toLowerCase().includes(q));
//     const visible = expanded || q ? matched : matched.slice(0, 4);
//     const hidden = matched.length - visible.length;
//     return renderSection(
//       id,
//       `${label}${selectedArr.length ? ` (${selectedArr.length})` : ""}`,
//       <>
//         <div className="xh-fl-search">
//           <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} />
//           <Search size={16} />
//         </div>
//         {renderCheckList(visible, selectedArr, (n) => setF((p) => ({ ...p, [key]: toggleIn(p[key], n) })), true)}
//         {matched.length === 0 && <p className="xh-fl-empty">No match found</p>}
//         {hidden > 0 && (
//           <button type="button" className="xh-fl-more" onClick={() => setExpanded(true)}>+{hidden} more {moreWord}</button>
//         )}
//         {expanded && !q && matched.length > 4 && (
//           <button type="button" className="xh-fl-more" onClick={() => setExpanded(false)}>Show less</button>
//         )}
//       </>,
//       { clear: selectedArr.length ? () => setF((p) => ({ ...p, [key]: [] })) : null }
//     );
//   };

//   const allOnPageSelected = currentJobs.length > 0 && currentJobs.every((j) => selectedIds.includes(j.id));
//   const toggleSelectAll = () => {
//     const ids = currentJobs.map((j) => j.id);
//     setSelectedIds((prev) => (allOnPageSelected ? prev.filter((x) => !ids.includes(x)) : [...new Set([...prev, ...ids])]));
//   };
//   const saveSelected = async () => {
//     if (!selectedIds.length) return;
//     let ok = 0;
//     for (const id of selectedIds) {
//       if (await saveBookmark(id, true)) ok += 1;
//     }
//     if (user) toast.success(`${ok} of ${selectedIds.length} job(s) saved`);
//     setSelectedIds([]);
//   };

//   const fmtDate = (v) => {
//     if (!v) return "Few days ago";
//     const d = new Date(v);
//     return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString("en-GB");
//   };

//   /* ---------- sidebar ---------- */
//   const sidebar = (
//     <div className="xh-fl-panel">
//       <div className="xh-fl-top">
//         <span className="xh-fl-top-title"><SlidersHorizontal size={18} /> Filters</span>
//       </div>

//       {chips.length > 0 && (
//         <div className="xh-fl-applied">
//           <div className="xh-fl-applied-head">
//             <span>{chips.length} filter{chips.length > 1 ? "s" : ""} applied</span>
//             <button type="button" className="xh-fl-reset" onClick={() => { setF(emptyFilters()); setPostedDays(0); }}>Reset</button>
//           </div>
//           <div className="xh-fl-chips">
//             {chips.map((c) => (
//               <span className="xh-fl-chip" key={c.id}>
//                 {c.label}
//                 <button type="button" onClick={c.remove} aria-label={`Remove ${c.label}`}><X size={12} /></button>
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Keywords */}
//       {renderSection(
//         "keywords",
//         "Keywords",
//         <div className="xh-fl-search">
//           <input value={f.keywords} onChange={(e) => setF((p) => ({ ...p, keywords: e.target.value }))} placeholder="Skills, title or company" />
//           <Search size={16} />
//         </div>
//       )}

//       {/* Current company */}
//       {renderFacet("company", "Current company", companyCounts, f.companies, "companies", coSearch, setCoSearch, coExpanded, setCoExpanded, "Search company", "companies")}

//       {/* Location */}
//       {renderFacet("location", "Location", locationCounts, f.locations, "locations", locSearch, setLocSearch, locExpanded, setLocExpanded, "Search location", "locations")}

//       {/* Experience */}
//       {renderSection(
//         "experience",
//         "Experience (Years)",
//         <div className="xh-fl-range">
//           <input type="number" min="0" max="40" placeholder="Min" value={f.expMin} onChange={(e) => setF((p) => ({ ...p, expMin: e.target.value }))} />
//           <span>to</span>
//           <input type="number" min="0" max="40" placeholder="Max" value={f.expMax} onChange={(e) => setF((p) => ({ ...p, expMax: e.target.value }))} />
//         </div>
//       )}

//       {/* Salary */}
//       {renderSection(
//         "salary",
//         "Salary (INR-Lacs)",
//         <div className="xh-fl-range">
//           <input type="number" min="0" placeholder="Min" value={f.salMin} onChange={(e) => setF((p) => ({ ...p, salMin: e.target.value }))} />
//           <span>to</span>
//           <input type="number" min="0" placeholder="Max" value={f.salMax} onChange={(e) => setF((p) => ({ ...p, salMax: e.target.value }))} />
//         </div>
//       )}

//       {/* Work mode */}
//       {renderSection(
//         "workmode",
//         `Work Mode${f.workModes.length ? ` (${f.workModes.length})` : ""}`,
//         renderCheckList(WORK_MODES.map((m) => m.label), f.workModes, (n) => setF((p) => ({ ...p, workModes: toggleIn(p.workModes, n) })), false)
//       )}

//       {/* All the remaining checkbox sections */}
//       {OPTION_SECTIONS.map((sec) => {
//         const picked = f.extra[sec.key] || [];
//         return renderSection(
//           sec.key,
//           `${sec.label}${picked.length ? ` (${picked.length})` : ""}`,
//           renderCheckList(sec.options, picked, (n) => setF((p) => ({ ...p, extra: { ...p.extra, [sec.key]: toggleIn(p.extra[sec.key] || [], n) } })), false),
//           { badge: sec.badge, clear: picked.length ? () => setF((p) => ({ ...p, extra: { ...p.extra, [sec.key]: [] } })) : null }
//         );
//       })}
//     </div>
//   );

//   /* ---------- render ---------- */
//   return (
//     <div className="bg-light min-vh-100">
//       <UnifiedHeader />
//       <ToastContainer />

//       {/* Breadcrumb + title */}
//       <div className="bg-white border-bottom py-4 shadow-sm">
//         <Container>
//           <div className="d-flex align-items-center gap-2 text-muted mb-2" style={{ fontSize: "14px" }}>
//             <span>Home</span> <ChevronRight size={14} /> <span>Jobs</span> <ChevronRight size={14} /> <strong>{query || "All Jobs"}</strong>
//           </div>
//           <h5 className="fw-bold mb-0">{filteredJobs.length} {query} Vacancies in {city || "India"}</h5>
//         </Container>
//       </div>

//       <Container className="py-4">
//         <div className="d-lg-none mb-3">
//           <Button variant="outline-primary" size="sm" onClick={() => setShowMobileFilters((s) => !s)}>
//             <SlidersHorizontal size={16} className="me-1" /> Filters{chips.length ? ` (${chips.length})` : ""}
//           </Button>
//         </div>

//         <Row>
//           {/* --- LEFT SIDEBAR FILTERS --- */}
//           <Col lg={3} className={showMobileFilters ? "" : "d-none d-lg-block"}>
//             {sidebar}
//           </Col>

//           {/* --- RIGHT SIDE JOB LISTINGS --- */}
//           <Col lg={9}>
//             {/* Toolbar */}
//             <div className="xh-fl-toolbar">
//               <div className="xh-fl-tb-left">
//                 <label className="xh-fl-check xh-fl-selall">
//                   <input type="checkbox" checked={allOnPageSelected} onChange={toggleSelectAll} />
//                   <span className="xh-fl-check-label">Select all</span>
//                 </label>
//                 <button type="button" className="xh-fl-tb-btn" onClick={saveSelected} disabled={!selectedIds.length}>
//                   <BookmarkPlus size={16} /> Save selected{selectedIds.length ? ` (${selectedIds.length})` : ""}
//                 </button>
//               </div>

//               <div className="xh-fl-tb-right">
//                 <label>Posted in
//                   <select value={postedDays} onChange={(e) => setPostedDays(Number(e.target.value))}>
//                     {POSTED_OPTIONS.map((o) => <option key={o.label} value={o.days}>{o.label}</option>)}
//                   </select>
//                 </label>
//                 <label>Sort by
//                   <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//                     {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
//                   </select>
//                 </label>
//                 <label>Show
//                   <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
//                     {PER_PAGE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
//                   </select>
//                 </label>
//                 <span className="xh-fl-pager">
//                   <button type="button" onClick={() => setCurrentPage(Math.max(safePage - 1, 1))} disabled={safePage === 1} aria-label="Previous page"><ChevronLeft size={16} /></button>
//                   Page {safePage} of {totalPages}
//                   <button type="button" onClick={() => setCurrentPage(Math.min(safePage + 1, totalPages))} disabled={safePage === totalPages} aria-label="Next page"><ChevronRight size={16} /></button>
//                 </span>
//               </div>
//             </div>

//             {error && <p className="text-danger">{error}</p>}

//             {loading ? (
//               <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
//             ) : currentJobs.length > 0 ? (
//               currentJobs.map((job) => (
//                 <Card className="job-card border-0 shadow-sm mb-3 position-relative" key={job.id}>
//                   <Card.Body className="p-4">
//                     <Row>
//                       <Col xs={10}>
//                         <div className="d-flex align-items-start gap-3">
//                           <input
//                             type="checkbox"
//                             className="xh-fl-cardcheck"
//                             checked={selectedIds.includes(job.id)}
//                             onChange={() => setSelectedIds((p) => toggleIn(p, job.id))}
//                             aria-label="Select job"
//                           />
//                           <div className="flex-grow-1">
//                             <Link
//                               to={user ? `/applyjob/${job.id}` : "/login"}
//                               className="text-decoration-none text-dark"
//                               onClick={(e) => !user && (e.preventDefault(), toast.error("Login required"), navigate("/login"))}
//                             >
//                               <h6 className="fw-bold mb-1 hover-primary">{job.jobtitle}</h6>
//                               <div className="d-flex align-items-center gap-2 mb-2">
//                                 <span className="text-muted small fw-medium">{job.companyname}</span>
//                                 <Badge bg="success" className="d-flex align-items-center gap-1" style={{ fontSize: "10px" }}>
//                                   4.1 <Star size={10} fill="white" />
//                                 </Badge>
//                               </div>

//                               <div className="d-flex flex-wrap gap-3 text-muted mb-3 small">
//                                 <div className="d-flex align-items-center gap-1">
//                                   <Briefcase size={14} /> <span>{job.minExperience ?? 0}-{job.maxExperience ?? 0} Yrs</span>
//                                 </div>
//                                 <div className="d-flex align-items-center gap-1">
//                                   <span className="fw-bold">₹</span> <span>{job.minimumsalary} - {job.MaximumSalary} PA</span>
//                                 </div>
//                                 <div className="d-flex align-items-center gap-1">
//                                   <MapPin size={14} /> <span>{job.location}</span>
//                                 </div>
//                               </div>

//                               <div className="text-muted small mb-3">
//                                 <Clock size={14} className="me-1" /> {(job.skills || "").substring(0, 100)}...
//                               </div>
//                             </Link>

//                             <div className="d-flex gap-2 flex-wrap">
//                               {(job.skills || "").split(",").filter(Boolean).slice(0, 4).map((skill, i) => (
//                                 <Badge key={i} bg="light" text="secondary" className="fw-normal border">{skill.trim()}</Badge>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </Col>

//                       <Col xs={2} className="text-end">
//                         <img
//                           src={job.comp_logo ? API_ENDPOINTS.FETCHIMAGE(job.comp_logo) : "https://via.placeholder.com/50"}
//                           alt="logo"
//                           className="rounded border"
//                           style={{ width: "50px", height: "50px", objectFit: "contain" }}
//                         />
//                       </Col>
//                     </Row>
//                   </Card.Body>
//                   <Card.Footer className="bg-white border-top-0 d-flex justify-content-between align-items-center px-4 pb-3">
//                     <span className="text-muted small">{fmtDate(job.job_posttime)}</span>
//                     <Button variant="link" className="p-0 text-decoration-none text-primary small" onClick={() => saveBookmark(job.id)}>
//                       <BookmarkPlus size={18} className="me-1" /> Save
//                     </Button>
//                   </Card.Footer>
//                 </Card>
//               ))
//             ) : (
//               <Card className="text-center p-5 border-0 shadow-sm">
//                 <p className="mb-2">No jobs found matching your criteria.</p>
//                 {chips.length > 0 && (
//                   <div>
//                     <Button variant="outline-primary" size="sm" onClick={() => { setF(emptyFilters()); setPostedDays(0); }}>Reset filters</Button>
//                   </div>
//                 )}
//               </Card>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <Pagination className="justify-content-center mt-4 custom-pagination">
//                 <Pagination.Prev onClick={() => setCurrentPage(Math.max(safePage - 1, 1))} disabled={safePage === 1} />
//                 {[...Array(totalPages)].map((_, i) => (
//                   <Pagination.Item key={i + 1} active={i + 1 === safePage} onClick={() => setCurrentPage(i + 1)}>
//                     {i + 1}
//                   </Pagination.Item>
//                 ))}
//                 <Pagination.Next onClick={() => setCurrentPage(Math.min(safePage + 1, totalPages))} disabled={safePage === totalPages} />
//               </Pagination>
//             )}
//           </Col>
//         </Row>
//       </Container>
//       <Footer />

//       <style>{`
//         .xh-fl-panel { background:#fff; border:1px solid #e8eaf0; border-radius:12px; padding:6px 20px 14px; position:sticky; top:110px; max-height:calc(100vh - 126px); overflow-y:auto; }
//         .xh-fl-top { padding:14px 0 12px; border-bottom:1px solid #eceef3; }
//         .xh-fl-top-title { display:inline-flex; align-items:center; gap:8px; font-size:17px; font-weight:700; color:#1b1f2a; }

//         .xh-fl-applied { padding:14px 0 10px; border-bottom:1px solid #eceef3; }
//         .xh-fl-applied-head { display:flex; justify-content:space-between; align-items:center; font-size:14px; font-weight:600; color:#1b1f2a; }
//         .xh-fl-reset { border:0; background:transparent; color:#1f5eff; font-weight:600; font-size:14px; cursor:pointer; padding:0; }
//         .xh-fl-chips { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
//         .xh-fl-chip { display:inline-flex; align-items:center; gap:6px; background:#eef3ff; color:#1f4fd8; border-radius:999px; padding:5px 8px 5px 12px; font-size:12.5px; font-weight:500; }
//         .xh-fl-chip button { display:inline-flex; border:0; background:transparent; color:#1f4fd8; padding:0; cursor:pointer; }

//         .xh-fl-sec { border-bottom:1px solid #eceef3; }
//         .xh-fl-sec:last-child { border-bottom:0; }
//         .xh-fl-sec-head { display:flex; justify-content:space-between; align-items:center; padding:16px 0; cursor:pointer; user-select:none; }
//         .xh-fl-sec-title { font-size:14.5px; font-weight:600; color:#1b1f2a; display:inline-flex; align-items:center; gap:8px; }
//         .xh-fl-new { font-style:normal; font-size:10.5px; font-weight:600; color:#12805c; background:#dff5ec; padding:2px 7px; border-radius:6px; }
//         .xh-fl-sec-right { display:inline-flex; align-items:center; gap:12px; color:#3d4452; }
//         .xh-fl-clear { border:0; background:transparent; color:#1f5eff; font-size:13px; font-weight:600; cursor:pointer; padding:0; }
//         .xh-fl-sec-body { padding:0 0 16px; }

//         .xh-fl-search { position:relative; margin-bottom:12px; }
//         .xh-fl-search input { width:100%; height:40px; border:1px solid #dfe3ea; border-radius:8px; padding:0 38px 0 12px; font-size:14px; outline:0; }
//         .xh-fl-search input:focus { border-color:#1f5eff; box-shadow:0 0 0 3px rgba(31,94,255,.1); }
//         .xh-fl-search svg { position:absolute; right:12px; top:12px; color:#7a8294; }

//         .xh-fl-check { display:flex; align-items:center; gap:10px; margin:0 0 11px; cursor:pointer; font-size:13.5px; color:#2b3140; }
//         .xh-fl-check input { width:16px; height:16px; accent-color:#1f5eff; flex:none; margin:0; }
//         .xh-fl-check-label { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
//         .xh-fl-count { color:#7a8294; font-size:12.5px; }
//         .xh-fl-more { border:0; background:transparent; color:#1f5eff; font-size:13px; font-weight:600; padding:2px 0 0; cursor:pointer; }
//         .xh-fl-empty { font-size:13px; color:#7a8294; margin:0; }

//         .xh-fl-range { display:flex; align-items:center; gap:10px; }
//         .xh-fl-range input { flex:1; min-width:0; height:40px; border:1px solid #dfe3ea; border-radius:8px; padding:0 10px; font-size:14px; outline:0; }
//         .xh-fl-range input:focus { border-color:#1f5eff; box-shadow:0 0 0 3px rgba(31,94,255,.1); }
//         .xh-fl-range span { font-size:13px; color:#5b6373; }

//         .xh-fl-toolbar { display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; background:#fff; border:1px solid #e8eaf0; border-radius:12px; padding:10px 16px; margin-bottom:16px; }
//         .xh-fl-tb-left { display:flex; align-items:center; gap:18px; }
//         .xh-fl-selall { margin:0; }
//         .xh-fl-tb-btn { display:inline-flex; align-items:center; gap:6px; border:0; background:transparent; color:#1f5eff; font-size:13.5px; font-weight:600; cursor:pointer; padding:0; }
//         .xh-fl-tb-btn:disabled { color:#a2a9b8; cursor:not-allowed; }
//         .xh-fl-tb-right { display:flex; flex-wrap:wrap; align-items:center; gap:16px; font-size:13px; color:#3d4452; }
//         .xh-fl-tb-right label { display:inline-flex; align-items:center; gap:8px; margin:0; }
//         .xh-fl-tb-right select { height:32px; border:1px solid #dfe3ea; border-radius:6px; padding:0 8px; font-size:13px; background:#fff; outline:0; }
//         .xh-fl-pager { display:inline-flex; align-items:center; gap:8px; }
//         .xh-fl-pager button { display:inline-flex; border:0; background:transparent; color:#3d4452; padding:2px; cursor:pointer; }
//         .xh-fl-pager button:disabled { color:#c4c9d4; cursor:not-allowed; }
//         .xh-fl-cardcheck { width:16px; height:16px; margin-top:4px; accent-color:#1f5eff; flex:none; }
//       `}</style>
//     </div>
//   );
// };

// export default Alljobs;

// import React, { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Badge, Pagination, Button, Spinner } from "react-bootstrap";
// import {
//   MapPin,
//   Clock,
//   BookmarkPlus,
//   Briefcase,
//   Search,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
//   ChevronLeft,
//   X,
//   Star,
//   SlidersHorizontal,
// } from "lucide-react";
// import UnifiedHeader from "../../components/header/UnifiedHeader";
// import Footer from "../../components/footer/footer";
// import { Link, useLocation, useNavigate } from "@/router-dom";
// import { API_ENDPOINTS } from "../apiConfig";
// import { toast, ToastContainer } from "react-toastify";
// import AuthorizationHeader from "../AuthorizationHeader";

// /* ------------------------------------------------------------------ */
// /* Helpers                                                             */
// /* ------------------------------------------------------------------ */
// const num = (v) => {
//   const n = parseFloat(v);
//   return Number.isNaN(n) ? null : n;
// };
// // salary in rupees (e.g. 80000) or already in lakhs (e.g. 8) -> lakhs
// const toLakhs = (v) => {
//   const n = num(String(v ?? "").replace(/[^\d.]/g, ""));
//   if (n === null) return null;
//   return n >= 1000 ? n / 100000 : n;
// };
// const norm = (s) => String(s || "").toLowerCase().replace(/[-_\s]/g, "");
// const firstVal = (job, fields) => {
//   for (const f of fields) {
//     const v = job[f];
//     if (v !== undefined && v !== null && String(v).trim() !== "") return String(v);
//   }
//   return null;
// };
// const matches = (value, picked, exact) =>
//   exact ? norm(value) === norm(picked) : norm(value).includes(norm(picked));

// /* use the job's own field when it has one, otherwise guess from the title */
// const classify = (job, fields, rules) => {
//   const own = firstVal(job, fields);
//   if (own) return own;
//   const title = String(job.jobtitle || "");
//   for (const [label, re] of rules) if (re.test(title)) return label;
//   return "Other";
// };

// /* ------------------------------------------------------------------ */
// /* Static data                                                         */
// /* ------------------------------------------------------------------ */
// const EXP_MAX = 30; // slider end = "Any"

// const WORK_MODES = [
//   { label: "Work from office", re: /office|onsite|on-site|wfo/i },
//   { label: "Remote", re: /remote|wfh|work from home/i },
//   { label: "Hybrid", re: /hybrid/i },
// ];

// const POSTED_OPTIONS = [
//   { label: "Any time", days: 0 },
//   { label: "1 day", days: 1 },
//   { label: "7 days", days: 7 },
//   { label: "15 days", days: 15 },
//   { label: "1 month", days: 30 },
//   { label: "3 months", days: 90 },
// ];
// const SORT_OPTIONS = ["Relevance", "Latest", "Salary: high to low", "Experience: low to high"];
// const PER_PAGE_OPTIONS = [10, 20, 50, 100];

// const DEPARTMENT_RULES = [
//   ["IT & Information Security", /security|infosec|cyber|soc analyst/i],
//   ["Data Science & Analytics", /data (scien|analy|engineer)|analytics|machine learning|\bml\b|\bai\b|\bbi\b/i],
//   ["UX, Design & Architecture", /design|\bux\b|\bui\b|architect|graphic|creative/i],
//   ["Product Management", /product (manager|owner|management)/i],
//   ["Engineering - Hardware & Networks", /hardware|network|embedded|electronics|telecom|vlsi/i],
//   ["Engineering - Software & QA", /software|developer|engineer|programmer|front-?end|back-?end|full ?stack|\bqa\b|tester|testing|devops|java|python|react|node|\.net|android|ios|web|tech/i],
//   ["Project & Program Management", /project|program manager|scrum|delivery manager/i],
//   ["Sales & Business Development", /sales|business development|\bbd\b|account executive/i],
//   ["Marketing & Communication", /marketing|\bseo\b|content|social media|brand|copywriter|communication/i],
//   ["Human Resources", /\bhr\b|human resource|recruit|talent|payroll|people operations/i],
//   ["Finance & Accounting", /financ|account|audit|\btax\b|banking|investment/i],
//   ["Customer Success, Service & Operations", /customer|support|service desk|helpdesk|operations|bpo|call cent/i],
//   ["Teaching & Training", /teacher|trainer|faculty|tutor|lecturer/i],
//   ["Healthcare & Life Sciences", /nurse|doctor|pharma|clinical|medical|health/i],
//   ["Administration & Facilities", /admin|receptionist|office|facilit/i],
//   ["Legal & Regulatory", /legal|lawyer|compliance|advocate/i],
//   ["Production, Manufacturing & Engineering", /production|manufactur|mechanical|plant/i],
//   ["Procurement & Supply Chain", /procure|supply chain|logistics|warehouse|purchas/i],
// ];

// const ROLE_RULES = [
//   ["Quality Assurance and Testing", /\bqa\b|quality assurance|tester|testing|sdet/i],
//   ["DevOps", /devops|\bsre\b|site reliability|cloud/i],
//   ["Data Science & Machine Learning", /data scien|machine learning|\bml\b|\bai\b/i],
//   ["DBA / Data warehousing", /\bdba\b|database|data warehouse|\betl\b|\bsql\b/i],
//   ["IT Security", /security|cyber/i],
//   ["IT Network", /network/i],
//   ["IT Support", /support|helpdesk|service desk|desktop/i],
//   ["Hardware", /hardware|embedded/i],
//   ["UX / Design", /design|\bux\b|\bui\b/i],
//   ["Product Management", /product (manager|owner)/i],
//   ["Software Development", /software|developer|programmer|front-?end|back-?end|full ?stack|java|python|react|node|\.net|android|ios|web|engineer/i],
//   ["Sales", /sales|business development/i],
//   ["Marketing", /marketing|\bseo\b|content|social media/i],
//   ["HR & Recruitment", /\bhr\b|recruit|talent|payroll/i],
//   ["Accounting & Finance", /financ|account|audit|\btax\b/i],
//   ["Operations", /operation|customer|admin/i],
// ];

// const SALARY_BUCKETS = [
//   ["0-3 Lakhs", 0, 3], ["3-6 Lakhs", 3, 6], ["6-10 Lakhs", 6, 10], ["10-15 Lakhs", 10, 15],
//   ["15-25 Lakhs", 15, 25], ["25-50 Lakhs", 25, 50], ["50-75 Lakhs", 50, 75], ["75-100 Lakhs", 75, 100],
// ];
// const salaryLabels = (j) => {
//   const lo = toLakhs(j.minimumsalary);
//   if (lo === null) return [];
//   const hi = toLakhs(j.MaximumSalary) ?? lo;
//   return SALARY_BUCKETS.filter(([, a, b]) => hi >= a && lo < b).map((b) => b[0]);
// };

// const grp = (group, names) => names.map((name) => ({ name, group }));
// const INDUSTRY_OPTIONS = [
//   ...grp("IT Services", ["IT Services & Consulting"]),
//   ...grp("Professional Services", ["Recruitment / Staffing", "Management Consulting", "Law Enforcement / Security Services"]),
//   ...grp("Technology", ["Software Product", "Internet", "Emerging Technologies", "Hardware & Networking"]),
//   ...grp("Education", ["Education / Training"]),
//   ...grp("Media, Entertainment & Telecom", ["Telecom / ISP", "Advertising & Marketing", "Printing & Publishing"]),
//   ...grp("Healthcare & Life Sciences", ["Medical Services / Hospital", "Biotechnology"]),
//   ...grp("BPM", ["BPM / BPO", "Analytics / KPO / Research"]),
//   ...grp("BFSI", ["Banking", "Financial Services", "FinTech / Payments"]),
//   ...grp("Manufacturing & Production", ["Industrial Equipment / Machinery", "Fertilizers / Pesticides / Agro chemicals"]),
//   ...grp("Miscellaneous", ["Agriculture / Forestry / Fishing", "NGO / Social Services / Industry Associations"]),
//   ...grp("Consumer, Retail & Hospitality", ["Food Processing", "Gems & Jewellery", "Retail", "Travel & Tourism"]),
//   ...grp("Infrastructure, Transport & Real Estate", ["Power", "Real Estate"]),
// ];

// /* Every filter in the sidebar. `get(job)` returns the job's value(s) for it.
//    - options  : fixed list (shown even before data arrives, counts when known)
//    - exact    : match whole value instead of "contains"
//    - lenient  : a job that has no value for it is NOT removed by the filter
//    - derived  : only show once there are jobs to count */
// const FACETS = [
//   {
//     id: "workMode", label: "Work mode", exact: true, lenient: true, keepOrder: true,
//     options: WORK_MODES.map((m) => ({ name: m.label })),
//     get: (j) => {
//       const v = firstVal(j, ["workmode", "workMode", "jobtype"]);
//       return v === null ? [] : WORK_MODES.filter((m) => m.re.test(v)).map((m) => m.label);
//     },
//   },
//   {
//     id: "department", label: "Department", exact: true, derived: true,
//     options: [...DEPARTMENT_RULES.map((r) => ({ name: r[0] })), { name: "Other" }],
//     get: (j) => [classify(j, ["department", "functionalarea"], DEPARTMENT_RULES)],
//   },
//   {
//     id: "roleCategory", label: "Role category", exact: true, derived: true,
//     options: [...ROLE_RULES.map((r) => ({ name: r[0] })), { name: "Other" }],
//     get: (j) => [classify(j, ["rolecategory", "role"], ROLE_RULES)],
//   },
//   { id: "role", label: "Job role", exact: true, get: (j) => [(j.jobtitle || "").trim()].filter(Boolean) },
//   {
//     id: "location", label: "Location", exact: true,
//     get: (j) => String(j.location || "").split(/[,/]/).map((s) => s.trim()).filter(Boolean),
//   },
//   {
//     id: "salary", label: "Salary", exact: true, lenient: true, keepOrder: true,
//     options: SALARY_BUCKETS.map((b) => ({ name: b[0] })), get: salaryLabels,
//   },
//   {
//     id: "postedBy", label: "Posted by", lenient: true, keepOrder: true,
//     options: [{ name: "Company Jobs" }, { name: "Consultant Jobs" }],
//     get: (j) => { const v = firstVal(j, ["postedby", "posted_by"]); return v === null ? [] : [v]; },
//   },
//   {
//     id: "industry", label: "Industry", lenient: true, grouped: true,
//     options: INDUSTRY_OPTIONS,
//     get: (j) => { const v = firstVal(j, ["industry", "industryType", "industrytype"]); return v === null ? [] : [v]; },
//   },
//   { id: "company", label: "Top companies", exact: true, get: (j) => [(j.companyname || "").trim()].filter(Boolean) },
//   {
//     id: "education", label: "Education", lenient: true, keepOrder: true,
//     options: ["Any Graduate", "B.Tech / B.E.", "B.Sc", "B.Com", "BBA", "MCA", "MBA / PGDM", "M.Tech"].map((name) => ({ name })),
//     get: (j) => { const v = firstVal(j, ["degree", "course", "qualification"]); return v === null ? [] : [v]; },
//   },
//   {
//     id: "employmentType", label: "Employment type", lenient: true, keepOrder: true,
//     options: ["Full time", "Part time", "Contract", "Internship", "Freelance"].map((name) => ({ name })),
//     get: (j) => { const v = firstVal(j, ["employmenttype", "employmentType"]); return v === null ? [] : [v]; },
//   },
//   {
//     id: "noticePeriod", label: "Notice period", lenient: true, keepOrder: true,
//     options: ["Immediate", "15 days", "1 month", "2 months", "3 months"].map((name) => ({ name })),
//     get: (j) => { const v = firstVal(j, ["noticeperiod", "noticePeriod"]); return v === null ? [] : [v]; },
//   },
// ];

// const emptyFilters = () => ({ keywords: "", sel: {}, exp: EXP_MAX });
// const toggleIn = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
// const PREVIEW = 4; // options shown before "View More"

// /* ------------------------------------------------------------------ */
// /* Component                                                           */
// /* ------------------------------------------------------------------ */
// const Alljobs = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // list controls
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(10);
//   const [sortBy, setSortBy] = useState("Relevance");
//   const [postedDays, setPostedDays] = useState(0);
//   const [selectedIds, setSelectedIds] = useState([]);

//   // filters
//   const [f, setF] = useState(emptyFilters());
//   const [open, setOpen] = useState({ keywords: false });
//   const [showMobileFilters, setShowMobileFilters] = useState(false);

//   // "View More" popup
//   const [modal, setModal] = useState(null); // facet id
//   const [draft, setDraft] = useState([]);
//   const [modalSearch, setModalSearch] = useState("");

//   const authData = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
//   const user = authData ? JSON.parse(authData).users : null;
//   const params = new URLSearchParams(location.search);
//   const query = decodeURIComponent(params.get("query") || "").trim();
//   const city = decodeURIComponent(params.get("location") || "").trim();

//   useEffect(() => {
//     fetchJobs(query, city);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [query, city]);

//   useEffect(() => {
//     if (!modal) return undefined;
//     const onKey = (e) => e.key === "Escape" && setModal(null);
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [modal]);

//   const fetchJobs = async (title, cityName) => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(API_ENDPOINTS.FETCHJOBSBYCONDITION, {
//         params: { title, city: cityName },
//       });
//       setJobs(response.data.data || []);
//       setCurrentPage(1);
//     } catch (err) {
//       setError("Failed to fetch jobs.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveBookmark = async (jobId, silent = false) => {
//     if (!user) {
//       toast.error("Please login to save jobs.");
//       return false;
//     }
//     try {
//       const response = await AuthorizationHeader.get(API_ENDPOINTS.SAVEBOOKMARK, {
//         params: { job_id: jobId, user_id: user.id },
//       });
//       if (!silent) {
//         response.data.status === 200 ? toast.success("Saved!") : toast.error("Already Saved.");
//       }
//       return response.data.status === 200;
//     } catch (e) {
//       console.error(e);
//       return false;
//     }
//   };

//   /* ---------- facet options + counts (built from ALL fetched jobs) ---------- */
//   const facetData = useMemo(() => {
//     const out = {};
//     FACETS.forEach((fc) => {
//       const perJob = jobs.map((j) => fc.get(j));
//       const hasData = perJob.some((v) => v.length > 0);
//       let items;

//       if (fc.options) {
//         if (fc.derived && !jobs.length) {
//           items = [];
//         } else {
//           items = fc.options.map((o) => ({
//             ...o,
//             count: hasData ? perJob.filter((vals) => vals.some((v) => matches(v, o.name, fc.exact))).length : null,
//           }));
//           if (hasData) items = items.filter((i) => i.count > 0);
//           if (!fc.keepOrder && !fc.grouped && hasData) items.sort((a, b) => b.count - a.count);
//         }
//       } else {
//         const counts = {};
//         perJob.forEach((vals) => new Set(vals).forEach((v) => { counts[v] = (counts[v] || 0) + 1; }));
//         items = Object.entries(counts)
//           .sort((a, b) => b[1] - a[1])
//           .map(([name, count]) => ({ name, count }));
//       }
//       out[fc.id] = items;
//     });
//     return out;
//   }, [jobs]);

//   /* ---------- filtering + sorting ---------- */
//   const filteredJobs = useMemo(() => {
//     const kwWords = f.keywords.toLowerCase().split(/[,\s]+/).filter(Boolean);
//     const cutoff = postedDays ? Date.now() - postedDays * 86400000 : null;

//     let list = jobs.filter((job) => {
//       if (kwWords.length) {
//         const hay = `${job.jobtitle || ""} ${job.companyname || ""} ${job.skills || ""}`.toLowerCase();
//         if (!kwWords.every((w) => hay.includes(w))) return false;
//       }

//       // experience slider: the job must not need more than the chosen years
//       if (f.exp < EXP_MAX) {
//         const jMin = num(job.minExperience) ?? 0;
//         if (jMin > f.exp) return false;
//       }

//       // posted within
//       if (cutoff) {
//         const d = new Date(job.job_posttime);
//         if (!Number.isNaN(d.getTime()) && d.getTime() < cutoff) return false;
//       }

//       // every checkbox filter
//       for (const fc of FACETS) {
//         const picked = f.sel[fc.id] || [];
//         if (!picked.length) continue;
//         const vals = fc.get(job);
//         if (!vals.length) {
//           if (fc.lenient) continue;
//           return false;
//         }
//         if (!picked.some((p) => vals.some((v) => matches(v, p, fc.exact)))) return false;
//       }
//       return true;
//     });

//     list = [...list];
//     if (sortBy === "Latest") {
//       list.sort((a, b) => new Date(b.job_posttime || 0) - new Date(a.job_posttime || 0));
//     } else if (sortBy === "Salary: high to low") {
//       list.sort((a, b) => (toLakhs(b.MaximumSalary) || 0) - (toLakhs(a.MaximumSalary) || 0));
//     } else if (sortBy === "Experience: low to high") {
//       list.sort((a, b) => (num(a.minExperience) || 0) - (num(b.minExperience) || 0));
//     }
//     return list;
//   }, [jobs, f, sortBy, postedDays]);

//   // back to page 1 whenever the result set changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [f, sortBy, perPage, postedDays]);

//   /* ---------- pagination ---------- */
//   const totalPages = Math.max(1, Math.ceil(filteredJobs.length / perPage));
//   const safePage = Math.min(currentPage, totalPages);
//   const currentJobs = filteredJobs.slice((safePage - 1) * perPage, safePage * perPage);

//   /* ---------- applied chips ---------- */
//   const setSel = (id, arr) => setF((p) => ({ ...p, sel: { ...p.sel, [id]: arr } }));
//   const clearAll = () => { setF(emptyFilters()); setPostedDays(0); };

//   const chips = [];
//   FACETS.forEach((fc) =>
//     (f.sel[fc.id] || []).forEach((v) =>
//       chips.push({ id: `${fc.id}-${v}`, label: v, remove: () => setSel(fc.id, (f.sel[fc.id] || []).filter((x) => x !== v)) })
//     )
//   );
//   if (f.keywords.trim()) chips.push({ id: "kw", label: `"${f.keywords.trim()}"`, remove: () => setF((p) => ({ ...p, keywords: "" })) });
//   if (f.exp < EXP_MAX) chips.push({ id: "exp", label: `${f.exp} yrs exp`, remove: () => setF((p) => ({ ...p, exp: EXP_MAX })) });
//   if (postedDays) chips.push({ id: "fresh", label: POSTED_OPTIONS.find((o) => o.days === postedDays)?.label || "", remove: () => setPostedDays(0) });

//   /* ---------- UI helpers (plain functions, NOT components: keeps input focus) ---------- */
//   const isOpen = (id) => open[id] !== false && !(id === "keywords" && !open.keywords);
//   const toggleOpen = (id) => setOpen((p) => ({ ...p, [id]: !isOpen(id) }));

//   const renderSection = (id, label, body, opts = {}) => (
//     <div className="xh-fl-sec" key={id}>
//       <div className="xh-fl-sec-head" onClick={() => toggleOpen(id)} role="button" tabIndex={0}>
//         <span className="xh-fl-sec-title">{label}</span>
//         <span className="xh-fl-sec-right">
//           {opts.clear && isOpen(id) && (
//             <button type="button" className="xh-fl-clear" onClick={(e) => { e.stopPropagation(); opts.clear(); }}>Clear</button>
//           )}
//           {isOpen(id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//         </span>
//       </div>
//       {isOpen(id) && <div className="xh-fl-sec-body">{body}</div>}
//     </div>
//   );

//   const openModal = (fc) => {
//     setDraft(f.sel[fc.id] || []);
//     setModalSearch("");
//     setModal(fc.id);
//   };
//   const applyModal = () => {
//     setSel(modal, draft);
//     setModal(null);
//   };

//   const renderFacet = (fc) => {
//     const items = facetData[fc.id] || [];
//     if (!items.length) return null;
//     const selected = f.sel[fc.id] || [];
//     const picked = items.filter((i) => selected.includes(i.name));
//     const rest = items.filter((i) => !selected.includes(i.name));
//     const shown = [...picked, ...rest].slice(0, Math.max(PREVIEW, picked.length));

//     return renderSection(
//       fc.id,
//       fc.label,
//       <>
//         {shown.map((it) => (
//           <label className="xh-fl-check" key={it.name}>
//             <input type="checkbox" checked={selected.includes(it.name)} onChange={() => setSel(fc.id, toggleIn(selected, it.name))} />
//             <span className="xh-fl-check-label" title={it.name}>{it.name}</span>
//             {it.count !== null && it.count !== undefined && <span className="xh-fl-count">({it.count})</span>}
//           </label>
//         ))}
//         {items.length > shown.length && (
//           <button type="button" className="xh-fl-more" onClick={() => openModal(fc)}>View More</button>
//         )}
//       </>,
//       { clear: selected.length ? () => setSel(fc.id, []) : null }
//     );
//   };

//   const allOnPageSelected = currentJobs.length > 0 && currentJobs.every((j) => selectedIds.includes(j.id));
//   const toggleSelectAll = () => {
//     const ids = currentJobs.map((j) => j.id);
//     setSelectedIds((prev) => (allOnPageSelected ? prev.filter((x) => !ids.includes(x)) : [...new Set([...prev, ...ids])]));
//   };
//   const saveSelected = async () => {
//     if (!selectedIds.length) return;
//     let ok = 0;
//     for (const id of selectedIds) {
//       if (await saveBookmark(id, true)) ok += 1;
//     }
//     if (user) toast.success(`${ok} of ${selectedIds.length} job(s) saved`);
//     setSelectedIds([]);
//   };

//   const fmtDate = (v) => {
//     if (!v) return "Few days ago";
//     const d = new Date(v);
//     return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString("en-GB");
//   };

//   /* ---------- sidebar ---------- */
//   const expPct = (f.exp / EXP_MAX) * 100;
//   const sidebarFacets = (ids) => ids.map((id) => renderFacet(FACETS.find((x) => x.id === id)));

//   const sidebar = (
//     <div className="xh-fl-panel">
//       <div className="xh-fl-top">
//         <span className="xh-fl-top-title">All Filters</span>
//         <button
//           type="button"
//           className="xh-fl-applied-link"
//           onClick={clearAll}
//           disabled={!chips.length}
//           title={chips.length ? "Click to clear all filters" : "No filters applied"}
//         >
//           Applied ({chips.length})
//         </button>
//       </div>

//       {chips.length > 0 && (
//         <div className="xh-fl-applied">
//           <div className="xh-fl-chips">
//             {chips.map((c) => (
//               <span className="xh-fl-chip" key={c.id}>
//                 {c.label}
//                 <button type="button" onClick={c.remove} aria-label={`Remove ${c.label}`}><X size={12} /></button>
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Keywords */}
//       {renderSection(
//         "keywords",
//         "Keywords",
//         <div className="xh-fl-search">
//           <input value={f.keywords} onChange={(e) => setF((p) => ({ ...p, keywords: e.target.value }))} placeholder="Skills, title or company" />
//           <Search size={16} />
//         </div>
//       )}

//       {sidebarFacets(["workMode", "department", "roleCategory", "role", "location", "salary", "postedBy", "industry", "company"])}

//       {/* Freshness */}
//       <div className="xh-fl-sec" key="freshness">
//         <div className="xh-fl-sec-head xh-fl-fresh">
//           <span className="xh-fl-sec-title">Freshness</span>
//           <span className="xh-fl-select-wrap">
//             <select value={postedDays} onChange={(e) => setPostedDays(Number(e.target.value))} aria-label="Freshness">
//               {POSTED_OPTIONS.map((o) => <option key={o.label} value={o.days}>{o.days === 0 ? "Select" : o.label}</option>)}
//             </select>
//             <ChevronDown size={18} />
//           </span>
//         </div>
//       </div>

//       {/* Experience slider */}
//       {renderSection(
//         "experience",
//         "Experience",
//         <div className="xh-nk-slider">
//           <div className="xh-nk-bubble" style={{ left: `calc(${expPct}% + ${(8 - expPct * 0.16).toFixed(2)}px)` }}>
//             {f.exp >= EXP_MAX ? "Any" : f.exp}
//           </div>
//           <input
//             type="range"
//             min="0"
//             max={EXP_MAX}
//             step="1"
//             value={f.exp}
//             style={{ "--pct": `${expPct}%` }}
//             onChange={(e) => setF((p) => ({ ...p, exp: Number(e.target.value) }))}
//             aria-label="Experience in years"
//           />
//           <div className="xh-nk-slider-labels"><span>0 Yrs</span><span>Any</span></div>
//         </div>
//       )}

//       {sidebarFacets(["education", "employmentType", "noticePeriod"])}
//     </div>
//   );

//   /* ---------- "View More" popup ---------- */
//   const popupFacet = FACETS.find((x) => x.id === modal);
//   let popup = null;
//   if (popupFacet) {
//     const q = modalSearch.trim().toLowerCase();
//     const all = facetData[popupFacet.id] || [];
//     const list = all.filter((i) => !q || i.name.toLowerCase().includes(q));
//     const entries = [];
//     let lastGroup = null;
//     list.forEach((i) => {
//       if (popupFacet.grouped && i.group && i.group !== lastGroup) {
//         entries.push({ heading: i.group });
//         lastGroup = i.group;
//       }
//       entries.push(i);
//     });
//     const rows = Math.max(1, Math.min(10, entries.length));

//     popup = (
//       <div className="xh-nk-overlay" onClick={() => setModal(null)}>
//         <div className="xh-nk-pop" role="dialog" aria-label={popupFacet.label} onClick={(e) => e.stopPropagation()}>
//           <div className="xh-nk-pop-head">
//             <h4>{popupFacet.label}</h4>
//             <button type="button" className="xh-nk-x" onClick={() => setModal(null)} aria-label="Close"><X size={18} /></button>
//           </div>

//           {all.length > 8 && (
//             <div className="xh-nk-pop-search">
//               <Search size={18} />
//               <input autoFocus value={modalSearch} onChange={(e) => setModalSearch(e.target.value)} placeholder={`Search ${popupFacet.label}`} />
//             </div>
//           )}

//           <div className="xh-nk-pop-grid" style={{ gridTemplateRows: `repeat(${rows}, auto)` }}>
//             {entries.map((e, idx) =>
//               e.heading ? (
//                 <div className="xh-nk-group" key={`g-${e.heading}-${idx}`}>{e.heading}</div>
//               ) : (
//                 <label className="xh-fl-check xh-nk-opt" key={e.name}>
//                   <input type="checkbox" checked={draft.includes(e.name)} onChange={() => setDraft((d) => toggleIn(d, e.name))} />
//                   <span className="xh-fl-check-label" title={e.name}>{e.name}</span>
//                   {e.count !== null && e.count !== undefined && <span className="xh-fl-count">({e.count})</span>}
//                 </label>
//               )
//             )}
//             {entries.length === 0 && <p className="xh-fl-empty">No match found</p>}
//           </div>

//           <div className="xh-nk-pop-foot">
//             <button type="button" className="xh-nk-apply" onClick={applyModal}>Apply</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ---------- render ---------- */
//   return (
//     <div className="bg-light min-vh-100">
//       <UnifiedHeader />
//       <ToastContainer />

//       {/* Breadcrumb + title */}
//       <div className="bg-white border-bottom py-4 shadow-sm">
//         <Container>
//           <div className="d-flex align-items-center gap-2 text-muted mb-2" style={{ fontSize: "14px" }}>
//             <span>Home</span> <ChevronRight size={14} /> <span>Jobs</span> <ChevronRight size={14} /> <strong>{query || "All Jobs"}</strong>
//           </div>
//           <h5 className="fw-bold mb-0">{filteredJobs.length} {query} Vacancies in {city || "India"}</h5>
//         </Container>
//       </div>

//       <Container className="py-4">
//         <div className="d-lg-none mb-3">
//           <Button variant="outline-primary" size="sm" onClick={() => setShowMobileFilters((s) => !s)}>
//             <SlidersHorizontal size={16} className="me-1" /> Filters{chips.length ? ` (${chips.length})` : ""}
//           </Button>
//         </div>

//         <Row>
//           {/* --- LEFT SIDEBAR FILTERS --- */}
//           <Col lg={3} className={showMobileFilters ? "" : "d-none d-lg-block"}>
//             {sidebar}
//           </Col>

//           {/* --- RIGHT SIDE JOB LISTINGS --- */}
//           <Col lg={9}>
//             {/* Toolbar */}
//             <div className="xh-fl-toolbar">
//               <div className="xh-fl-tb-left">
//                 <label className="xh-fl-check xh-fl-selall">
//                   <input type="checkbox" checked={allOnPageSelected} onChange={toggleSelectAll} />
//                   <span className="xh-fl-check-label">Select all</span>
//                 </label>
//                 <button type="button" className="xh-fl-tb-btn" onClick={saveSelected} disabled={!selectedIds.length}>
//                   <BookmarkPlus size={16} /> Save selected{selectedIds.length ? ` (${selectedIds.length})` : ""}
//                 </button>
//               </div>

//               <div className="xh-fl-tb-right">
//                 <label>Posted in
//                   <select value={postedDays} onChange={(e) => setPostedDays(Number(e.target.value))}>
//                     {POSTED_OPTIONS.map((o) => <option key={o.label} value={o.days}>{o.label}</option>)}
//                   </select>
//                 </label>
//                 <label>Sort by
//                   <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//                     {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
//                   </select>
//                 </label>
//                 <label>Show
//                   <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
//                     {PER_PAGE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
//                   </select>
//                 </label>
//                 <span className="xh-fl-pager">
//                   <button type="button" onClick={() => setCurrentPage(Math.max(safePage - 1, 1))} disabled={safePage === 1} aria-label="Previous page"><ChevronLeft size={16} /></button>
//                   Page {safePage} of {totalPages}
//                   <button type="button" onClick={() => setCurrentPage(Math.min(safePage + 1, totalPages))} disabled={safePage === totalPages} aria-label="Next page"><ChevronRight size={16} /></button>
//                 </span>
//               </div>
//             </div>

//             {error && <p className="text-danger">{error}</p>}

//             {loading ? (
//               <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
//             ) : currentJobs.length > 0 ? (
//               currentJobs.map((job) => (
//                 <Card className="job-card border-0 shadow-sm mb-3 position-relative" key={job.id}>
//                   <Card.Body className="p-4">
//                     <Row>
//                       <Col xs={10}>
//                         <div className="d-flex align-items-start gap-3">
//                           <input
//                             type="checkbox"
//                             className="xh-fl-cardcheck"
//                             checked={selectedIds.includes(job.id)}
//                             onChange={() => setSelectedIds((p) => toggleIn(p, job.id))}
//                             aria-label="Select job"
//                           />
//                           <div className="flex-grow-1">
//                             <Link
//                               to={user ? `/applyjob/${job.id}` : "/login"}
//                               className="text-decoration-none text-dark"
//                               onClick={(e) => !user && (e.preventDefault(), toast.error("Login required"), navigate("/login"))}
//                             >
//                               <h6 className="fw-bold mb-1 hover-primary">{job.jobtitle}</h6>
//                               <div className="d-flex align-items-center gap-2 mb-2">
//                                 <span className="text-muted small fw-medium">{job.companyname}</span>
//                                 <Badge bg="success" className="d-flex align-items-center gap-1" style={{ fontSize: "10px" }}>
//                                   4.1 <Star size={10} fill="white" />
//                                 </Badge>
//                               </div>

//                               <div className="d-flex flex-wrap gap-3 text-muted mb-3 small">
//                                 <div className="d-flex align-items-center gap-1">
//                                   <Briefcase size={14} /> <span>{job.minExperience ?? 0}-{job.maxExperience ?? 0} Yrs</span>
//                                 </div>
//                                 <div className="d-flex align-items-center gap-1">
//                                   <span className="fw-bold">₹</span> <span>{job.minimumsalary} - {job.MaximumSalary} PA</span>
//                                 </div>
//                                 <div className="d-flex align-items-center gap-1">
//                                   <MapPin size={14} /> <span>{job.location}</span>
//                                 </div>
//                               </div>

//                               <div className="text-muted small mb-3">
//                                 <Clock size={14} className="me-1" /> {(job.skills || "").substring(0, 100)}...
//                               </div>
//                             </Link>

//                             <div className="d-flex gap-2 flex-wrap">
//                               {(job.skills || "").split(",").filter(Boolean).slice(0, 4).map((skill, i) => (
//                                 <Badge key={i} bg="light" text="secondary" className="fw-normal border">{skill.trim()}</Badge>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </Col>

//                       <Col xs={2} className="text-end">
//                         <img
//                           src={job.comp_logo ? API_ENDPOINTS.FETCHIMAGE(job.comp_logo) : "https://via.placeholder.com/50"}
//                           alt="logo"
//                           className="rounded border"
//                           style={{ width: "50px", height: "50px", objectFit: "contain" }}
//                         />
//                       </Col>
//                     </Row>
//                   </Card.Body>
//                   <Card.Footer className="bg-white border-top-0 d-flex justify-content-between align-items-center px-4 pb-3">
//                     <span className="text-muted small">{fmtDate(job.job_posttime)}</span>
//                     <Button variant="link" className="p-0 text-decoration-none text-primary small" onClick={() => saveBookmark(job.id)}>
//                       <BookmarkPlus size={18} className="me-1" /> Save
//                     </Button>
//                   </Card.Footer>
//                 </Card>
//               ))
//             ) : (
//               <Card className="text-center p-5 border-0 shadow-sm">
//                 <p className="mb-2">No jobs found matching your criteria.</p>
//                 {chips.length > 0 && (
//                   <div>
//                     <Button variant="outline-primary" size="sm" onClick={() => { setF(emptyFilters()); setPostedDays(0); }}>Reset filters</Button>
//                   </div>
//                 )}
//               </Card>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <Pagination className="justify-content-center mt-4 custom-pagination">
//                 <Pagination.Prev onClick={() => setCurrentPage(Math.max(safePage - 1, 1))} disabled={safePage === 1} />
//                 {[...Array(totalPages)].map((_, i) => (
//                   <Pagination.Item key={i + 1} active={i + 1 === safePage} onClick={() => setCurrentPage(i + 1)}>
//                     {i + 1}
//                   </Pagination.Item>
//                 ))}
//                 <Pagination.Next onClick={() => setCurrentPage(Math.min(safePage + 1, totalPages))} disabled={safePage === totalPages} />
//               </Pagination>
//             )}
//           </Col>
//         </Row>
//       </Container>
//       {popup}
//       <Footer />

//       <style>{`
//         /* ---------- sidebar panel ---------- */
//         .xh-fl-panel { background:#fff; border:1px solid #e8eaf0; border-radius:16px; padding:8px 22px 14px; position:sticky; top:110px; max-height:calc(100vh - 126px); overflow-y:auto; scrollbar-width:thin; }
//         .xh-fl-top { display:flex; justify-content:space-between; align-items:center; padding:16px 0 14px; border-bottom:1px solid #eceef3; }
//         .xh-fl-top-title { font-size:18px; font-weight:700; color:#1b1f2a; }
//         .xh-fl-applied-link { border:0; background:transparent; padding:0; color:#1f5eff; font-weight:600; font-size:15px; cursor:pointer; }
//         .xh-fl-applied-link:disabled { color:#1f5eff; opacity:.55; cursor:default; }

//         .xh-fl-applied { padding:12px 0 6px; border-bottom:1px solid #eceef3; }
//         .xh-fl-chips { display:flex; flex-wrap:wrap; gap:8px; }
//         .xh-fl-chip { display:inline-flex; align-items:center; gap:6px; background:#eef3ff; color:#1f4fd8; border-radius:999px; padding:5px 8px 5px 12px; font-size:12.5px; font-weight:500; max-width:100%; }
//         .xh-fl-chip button { display:inline-flex; border:0; background:transparent; color:#1f4fd8; padding:0; cursor:pointer; }

//         .xh-fl-sec { border-bottom:1px solid #eceef3; }
//         .xh-fl-sec:last-child { border-bottom:0; }
//         .xh-fl-sec-head { display:flex; justify-content:space-between; align-items:center; padding:18px 0 14px; cursor:pointer; user-select:none; }
//         .xh-fl-sec-title { font-size:16px; font-weight:600; color:#1b1f2a; }
//         .xh-fl-sec-right { display:inline-flex; align-items:center; gap:12px; color:#3d4452; }
//         .xh-fl-clear { border:0; background:transparent; color:#1f5eff; font-size:13px; font-weight:600; cursor:pointer; padding:0; }
//         .xh-fl-sec-body { padding:0 0 18px; }

//         .xh-fl-search { position:relative; margin-bottom:6px; }
//         .xh-fl-search input { width:100%; height:42px; border:1px solid #dfe3ea; border-radius:999px; padding:0 40px 0 16px; font-size:14px; outline:0; }
//         .xh-fl-search input:focus { border-color:#1f5eff; box-shadow:0 0 0 3px rgba(31,94,255,.1); }
//         .xh-fl-search svg { position:absolute; right:14px; top:13px; color:#7a8294; }

//         /* checkbox (same look in sidebar, popup, toolbar) */
//         .xh-fl-check { display:flex; align-items:center; gap:12px; margin:0 0 14px; cursor:pointer; font-size:15px; color:#2b3140; line-height:1.25; }
//         .xh-fl-check input { appearance:none; -webkit-appearance:none; width:20px; height:20px; flex:none; margin:0; border:2px solid #b4bbc9; border-radius:5px; background:#fff; cursor:pointer; display:inline-grid; place-content:center; transition:.15s; }
//         .xh-fl-check input:hover { border-color:#1f5eff; }
//         .xh-fl-check input:checked { background:#1f5eff; border-color:#1f5eff; }
//         .xh-fl-check input:checked::after { content:""; width:10px; height:6px; border-left:2.5px solid #fff; border-bottom:2.5px solid #fff; transform:translateY(-1px) rotate(-45deg); }
//         .xh-fl-check-label { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
//         .xh-fl-count { color:#7a8294; font-size:14px; flex:none; }
//         .xh-fl-more { border:0; background:transparent; color:#1f5eff; font-size:15px; font-weight:600; padding:2px 0 0 32px; cursor:pointer; }
//         .xh-fl-empty { font-size:13px; color:#7a8294; margin:0; }

//         /* freshness select */
//         .xh-fl-fresh { cursor:default; }
//         .xh-fl-select-wrap { position:relative; display:inline-flex; align-items:center; color:#3d4452; }
//         .xh-fl-select-wrap select { appearance:none; -webkit-appearance:none; border:0; background:transparent; font-size:15px; color:#5b6373; padding:0 24px 0 0; outline:0; cursor:pointer; text-align:right; }
//         .xh-fl-select-wrap svg { position:absolute; right:0; pointer-events:none; }

//         /* experience slider */
//         .xh-nk-slider { position:relative; padding-top:44px; }
//         .xh-nk-bubble { position:absolute; top:0; transform:translateX(-50%); min-width:40px; height:36px; padding:0 10px; display:flex; align-items:center; justify-content:center; background:#111827; color:#fff; font-size:13px; font-weight:700; border-radius:50% 50% 50% 50% / 60% 60% 40% 40%; }
//         .xh-nk-bubble::after { content:""; position:absolute; bottom:-6px; left:50%; transform:translateX(-50%); border:7px solid transparent; border-top-color:#111827; border-bottom:0; }
//         .xh-nk-slider input[type=range] { -webkit-appearance:none; appearance:none; width:100%; height:5px; border-radius:99px; outline:0; cursor:pointer; background:linear-gradient(90deg,#111827 0%,#111827 var(--pct),#d9dde6 var(--pct),#d9dde6 100%); }
//         .xh-nk-slider input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; border-radius:50%; background:#111827; border:0; }
//         .xh-nk-slider input[type=range]::-moz-range-thumb { width:16px; height:16px; border-radius:50%; background:#111827; border:0; }
//         .xh-nk-slider-labels { display:flex; justify-content:space-between; margin-top:14px; font-size:14px; color:#6b7385; }

//         /* ---------- "View More" popup ---------- */
//         .xh-nk-overlay { position:fixed; inset:0; z-index:2000; background:rgba(15,27,45,.28); display:flex; align-items:center; justify-content:center; padding:16px; }
//         .xh-nk-pop { background:#fff; border-radius:14px; box-shadow:0 24px 60px rgba(15,27,45,.28); padding:26px 30px 22px; width:fit-content; min-width:min(360px,92vw); max-width:min(1040px,94vw); max-height:88vh; display:flex; flex-direction:column; }
//         .xh-nk-pop-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; }
//         .xh-nk-pop-head h4 { margin:0; font-size:20px; font-weight:700; color:#1b1f2a; }
//         .xh-nk-x { border:0; background:transparent; color:#6b7385; display:inline-flex; padding:4px; cursor:pointer; }
//         .xh-nk-x:hover { color:#111827; }
//         .xh-nk-pop-search { position:relative; width:min(300px,100%); margin-bottom:22px; }
//         .xh-nk-pop-search svg { position:absolute; left:14px; top:12px; color:#7a8294; }
//         .xh-nk-pop-search input { width:100%; height:44px; border:1px solid #dfe3ea; border-radius:999px; padding:0 16px 0 44px; font-size:15px; outline:0; }
//         .xh-nk-pop-search input:focus { border-color:#1f5eff; box-shadow:0 0 0 3px rgba(31,94,255,.1); }
//         .xh-nk-pop-grid { display:grid; grid-auto-flow:column; grid-auto-columns:minmax(250px,max-content); column-gap:44px; row-gap:0; overflow:auto; padding-bottom:14px; align-content:start; min-height:0; }
//         .xh-nk-pop-grid::-webkit-scrollbar { height:8px; width:8px; }
//         .xh-nk-pop-grid::-webkit-scrollbar-thumb { background:#9aa6c2; border-radius:99px; }
//         .xh-nk-pop-grid::-webkit-scrollbar-track { background:#eceff6; border-radius:99px; }
//         .xh-nk-opt { margin:0; padding:9px 0; max-width:300px; }
//         .xh-nk-group { padding:9px 0; font-size:15px; color:#7a88b8; font-weight:500; }
//         .xh-nk-pop-foot { display:flex; justify-content:flex-end; margin-top:8px; }
//         .xh-nk-apply { border:0; background:#1f5eff; color:#fff; font-weight:700; font-size:16px; padding:11px 34px; border-radius:999px; cursor:pointer; box-shadow:0 6px 16px rgba(31,94,255,.32); transition:.2s; }
//         .xh-nk-apply:hover { background:#1448d6; transform:translateY(-1px); }

//         /* ---------- toolbar ---------- */
//         .xh-fl-toolbar { display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; background:#fff; border:1px solid #e8eaf0; border-radius:12px; padding:10px 16px; margin-bottom:16px; }
//         .xh-fl-tb-left { display:flex; align-items:center; gap:18px; }
//         .xh-fl-selall { margin:0; }
//         .xh-fl-tb-btn { display:inline-flex; align-items:center; gap:6px; border:0; background:transparent; color:#1f5eff; font-size:13.5px; font-weight:600; cursor:pointer; padding:0; }
//         .xh-fl-tb-btn:disabled { color:#a2a9b8; cursor:not-allowed; }
//         .xh-fl-tb-right { display:flex; flex-wrap:wrap; align-items:center; gap:16px; font-size:13px; color:#3d4452; }
//         .xh-fl-tb-right label { display:inline-flex; align-items:center; gap:8px; margin:0; }
//         .xh-fl-tb-right select { height:32px; border:1px solid #dfe3ea; border-radius:6px; padding:0 8px; font-size:13px; background:#fff; outline:0; }
//         .xh-fl-pager { display:inline-flex; align-items:center; gap:8px; }
//         .xh-fl-pager button { display:inline-flex; border:0; background:transparent; color:#3d4452; padding:2px; cursor:pointer; }
//         .xh-fl-pager button:disabled { color:#c4c9d4; cursor:not-allowed; }
//         .xh-fl-cardcheck { width:16px; height:16px; margin-top:4px; accent-color:#1f5eff; flex:none; }
//       `}</style>
//     </div>
//   );
// };

// export default Alljobs;



import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Badge, Pagination, Button, Spinner } from "react-bootstrap";
import {
  MapPin,
  Clock,
  BookmarkPlus,
  Briefcase,
  Search,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  X,
  Star,
  SlidersHorizontal,
} from "lucide-react";
import UnifiedHeader from "../../components/header/UnifiedHeader";
import Footer from "../../components/footer/footer";
import { Link, useLocation, useNavigate } from "@/router-dom";
import { API_ENDPOINTS } from "../apiConfig";
import { toast, ToastContainer } from "react-toastify";
import AuthorizationHeader from "../AuthorizationHeader";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const num = (v) => {
  const n = parseFloat(v);
  return Number.isNaN(n) ? null : n;
};
// salary in rupees (e.g. 80000) or already in lakhs (e.g. 8) -> lakhs
const toLakhs = (v) => {
  const n = num(String(v ?? "").replace(/[^\d.]/g, ""));
  if (n === null) return null;
  return n >= 1000 ? n / 100000 : n;
};
const norm = (s) => String(s || "").toLowerCase().replace(/[-_\s]/g, "");
const firstVal = (job, fields) => {
  for (const f of fields) {
    const v = job[f];
    if (v !== undefined && v !== null && String(v).trim() !== "") return String(v);
  }
  return null;
};
const matches = (value, picked, exact) =>
  exact ? norm(value) === norm(picked) : norm(value).includes(norm(picked));

/* use the job's own field when it has one, otherwise guess from the title */
const classify = (job, fields, rules) => {
  const own = firstVal(job, fields);
  if (own) return own;
  const title = String(job.jobtitle || "");
  for (const [label, re] of rules) if (re.test(title)) return label;
  return "Other";
};

/* ------------------------------------------------------------------ */
/* Static data                                                         */
/* ------------------------------------------------------------------ */
const EXP_MAX = 30; // slider end = "Any"

// DEMO ONLY: fictional jobs for local UI testing; nothing is saved to the database.
const SAMPLE_JOBS = [
  {
    id: "demo-101",
    jobtitle: "Frontend Developer",
    companyname: "TechNova Solutions",
    minExperience: 0,
    maxExperience: 2,
    minimumsalary: "300000",
    MaximumSalary: "600000",
    location: "Noida, Uttar Pradesh",
    skills: "React.js, JavaScript, HTML, CSS",
    job_posttime: new Date().toISOString(),
    comp_logo: "",
    workmode: "Hybrid",
    employmenttype: "Full time",
    degree: "B.Tech / B.E.",
    department: "Engineering - Software & QA",
    rolecategory: "Software Development",
    industry: "Software Product",
  },
  {
    id: "demo-102",
    jobtitle: "Full Stack Developer",
    companyname: "WebCraft Technologies",
    minExperience: 0,
    maxExperience: 1,
    minimumsalary: "400000",
    MaximumSalary: "800000",
    location: "Bengaluru, Karnataka",
    skills: "React.js, Node.js, Express.js, MongoDB",
    job_posttime: new Date().toISOString(),
    comp_logo: "",
    workmode: "Work from office",
    employmenttype: "Full time",
    degree: "B.Tech / B.E.",
    department: "Engineering - Software & QA",
    rolecategory: "Software Development",
    industry: "Software Product",
  },
  {
    id: "demo-103",
    jobtitle: "Data Analyst Intern",
    companyname: "DataBridge Analytics",
    minExperience: 0,
    maxExperience: 0,
    minimumsalary: "180000",
    MaximumSalary: "300000",
    location: "Remote",
    skills: "SQL, Python, Excel, Power BI",
    job_posttime: new Date().toISOString(),
    comp_logo: "",
    workmode: "Remote",
    employmenttype: "Internship",
    degree: "Any Graduate",
    department: "Data Science & Analytics",
    rolecategory: "Data Science & Machine Learning",
    industry: "Analytics / KPO / Research",
  },
  {
    id: "demo-104",
    jobtitle: "Java Developer Trainee",
    companyname: "BrightByte Systems",
    minExperience: 0,
    maxExperience: 1,
    minimumsalary: "250000",
    MaximumSalary: "450000",
    location: "Gurugram, Haryana",
    skills: "Java, OOP, SQL, Spring Boot",
    job_posttime: new Date().toISOString(),
    comp_logo: "",
    workmode: "Work from office",
    employmenttype: "Full time",
    degree: "B.Tech / B.E.",
    department: "Engineering - Software & QA",
    rolecategory: "Software Development",
    industry: "IT Services & Consulting",
  },
  {
    id: "demo-105",
    jobtitle: "UI/UX Design Intern",
    companyname: "PixelNest Studio",
    minExperience: 0,
    maxExperience: 0,
    minimumsalary: "150000",
    MaximumSalary: "240000",
    location: "Delhi, India",
    skills: "Figma, Wireframing, Prototyping, UI Design",
    job_posttime: new Date().toISOString(),
    comp_logo: "",
    workmode: "Hybrid",
    employmenttype: "Internship",
    degree: "Any Graduate",
    department: "UX, Design & Architecture",
    rolecategory: "Design",
    industry: "Design / Creative",
  },
  {
    id: "demo-106",
    jobtitle: "Remote React Developer",
    companyname: "CloudTech Solutions (Demo)",
    minExperience: 0,
    maxExperience: 2,
    minimumsalary: "400000",
    MaximumSalary: "800000",
    location: "Remote, India",
    skills: "React.js, JavaScript, Next.js, REST APIs",
    job_posttime: new Date().toISOString(),
    comp_logo: "",
    workmode: "Remote",
    employmenttype: "Full time",
    degree: "B.Tech / B.E.",
    department: "Engineering - Software & QA",
    rolecategory: "Software Development",
    industry: "Software Product",
  },
  {
    id: "demo-107",
    jobtitle: "Remote Data Analyst",
    companyname: "DataSphere Analytics (Demo)",
    minExperience: 0,
    maxExperience: 2,
    minimumsalary: "300000",
    MaximumSalary: "600000",
    location: "Work from Home, India",
    skills: "SQL, Python, Excel, Power BI",
    job_posttime: new Date().toISOString(),
    comp_logo: "",
    workmode: "Remote",
    employmenttype: "Full time",
    degree: "Any Graduate",
    department: "Data Science & Analytics",
    rolecategory: "Data Science & Machine Learning",
    industry: "Analytics / KPO / Research",
  },
  {
    id: "demo-108",
    jobtitle: "Remote Customer Support Associate",
    companyname: "ConnectNow Services (Demo)",
    minExperience: 0,
    maxExperience: 1,
    minimumsalary: "220000",
    MaximumSalary: "360000",
    location: "Remote, India",
    skills: "Communication, Email Support, Customer Service",
    job_posttime: new Date().toISOString(),
    comp_logo: "",
    workmode: "Work from Home",
    employmenttype: "Full time",
    degree: "Any Graduate",
    department: "Customer Success, Service & Operations",
    rolecategory: "Operations",
    industry: "BPM / BPO",
  },
  {
    id: "demo-109",
    jobtitle: "Remote UI/UX Designer",
    companyname: "PixelNest Studio (Demo)",
    minExperience: 0,
    maxExperience: 2,
    minimumsalary: "300000",
    MaximumSalary: "550000",
    location: "Remote, India",
    skills: "Figma, UI Design, UX Research, Prototyping",
    job_posttime: new Date().toISOString(),
    comp_logo: "",
    workmode: "Remote",
    employmenttype: "Full time",
    degree: "Any Graduate",
    department: "UX, Design & Architecture",
    rolecategory: "UX / Design",
    industry: "Design / Creative",
  },
];

const WORK_MODES = [
  { label: "Work from office", re: /office|onsite|on-site|wfo/i },
  { label: "Remote", re: /remote|wfh|work from home/i },
  { label: "Hybrid", re: /hybrid/i },
];

const POSTED_OPTIONS = [
  { label: "Any time", days: 0 },
  { label: "1 day", days: 1 },
  { label: "7 days", days: 7 },
  { label: "15 days", days: 15 },
  { label: "1 month", days: 30 },
  { label: "3 months", days: 90 },
];
const SORT_OPTIONS = ["Relevance", "Latest", "Salary: high to low", "Experience: low to high"];
const PER_PAGE_OPTIONS = [10, 20, 50, 100];

const DEPARTMENT_RULES = [
  ["IT & Information Security", /security|infosec|cyber|soc analyst/i],
  ["Data Science & Analytics", /data (scien|analy|engineer)|analytics|machine learning|\bml\b|\bai\b|\bbi\b/i],
  ["UX, Design & Architecture", /design|\bux\b|\bui\b|architect|graphic|creative/i],
  ["Product Management", /product (manager|owner|management)/i],
  ["Engineering - Hardware & Networks", /hardware|network|embedded|electronics|telecom|vlsi/i],
  ["Engineering - Software & QA", /software|developer|engineer|programmer|front-?end|back-?end|full ?stack|\bqa\b|tester|testing|devops|java|python|react|node|\.net|android|ios|web|tech/i],
  ["Project & Program Management", /project|program manager|scrum|delivery manager/i],
  ["Sales & Business Development", /sales|business development|\bbd\b|account executive/i],
  ["Marketing & Communication", /marketing|\bseo\b|content|social media|brand|copywriter|communication/i],
  ["Human Resources", /\bhr\b|human resource|recruit|talent|payroll|people operations/i],
  ["Finance & Accounting", /financ|account|audit|\btax\b|banking|investment/i],
  ["Customer Success, Service & Operations", /customer|support|service desk|helpdesk|operations|bpo|call cent/i],
  ["Teaching & Training", /teacher|trainer|faculty|tutor|lecturer/i],
  ["Healthcare & Life Sciences", /nurse|doctor|pharma|clinical|medical|health/i],
  ["Administration & Facilities", /admin|receptionist|office|facilit/i],
  ["Legal & Regulatory", /legal|lawyer|compliance|advocate/i],
  ["Production, Manufacturing & Engineering", /production|manufactur|mechanical|plant/i],
  ["Procurement & Supply Chain", /procure|supply chain|logistics|warehouse|purchas/i],
];

const ROLE_RULES = [
  ["Quality Assurance and Testing", /\bqa\b|quality assurance|tester|testing|sdet/i],
  ["DevOps", /devops|\bsre\b|site reliability|cloud/i],
  ["Data Science & Machine Learning", /data scien|machine learning|\bml\b|\bai\b/i],
  ["DBA / Data warehousing", /\bdba\b|database|data warehouse|\betl\b|\bsql\b/i],
  ["IT Security", /security|cyber/i],
  ["IT Network", /network/i],
  ["IT Support", /support|helpdesk|service desk|desktop/i],
  ["Hardware", /hardware|embedded/i],
  ["UX / Design", /design|\bux\b|\bui\b/i],
  ["Product Management", /product (manager|owner)/i],
  ["Software Development", /software|developer|programmer|front-?end|back-?end|full ?stack|java|python|react|node|\.net|android|ios|web|engineer/i],
  ["Sales", /sales|business development/i],
  ["Marketing", /marketing|\bseo\b|content|social media/i],
  ["HR & Recruitment", /\bhr\b|recruit|talent|payroll/i],
  ["Accounting & Finance", /financ|account|audit|\btax\b/i],
  ["Operations", /operation|customer|admin/i],
];

const SALARY_BUCKETS = [
  ["0-3 Lakhs", 0, 3], ["3-6 Lakhs", 3, 6], ["6-10 Lakhs", 6, 10], ["10-15 Lakhs", 10, 15],
  ["15-25 Lakhs", 15, 25], ["25-50 Lakhs", 25, 50], ["50-75 Lakhs", 50, 75], ["75-100 Lakhs", 75, 100],
];
const salaryLabels = (j) => {
  const lo = toLakhs(j.minimumsalary);
  if (lo === null) return [];
  const hi = toLakhs(j.MaximumSalary) ?? lo;
  return SALARY_BUCKETS.filter(([, a, b]) => hi >= a && lo < b).map((b) => b[0]);
};

const grp = (group, names) => names.map((name) => ({ name, group }));
const INDUSTRY_OPTIONS = [
  ...grp("IT Services", ["IT Services & Consulting"]),
  ...grp("Professional Services", ["Recruitment / Staffing", "Management Consulting", "Law Enforcement / Security Services"]),
  ...grp("Technology", ["Software Product", "Internet", "Emerging Technologies", "Hardware & Networking"]),
  ...grp("Education", ["Education / Training"]),
  ...grp("Media, Entertainment & Telecom", ["Telecom / ISP", "Advertising & Marketing", "Printing & Publishing"]),
  ...grp("Healthcare & Life Sciences", ["Medical Services / Hospital", "Biotechnology"]),
  ...grp("BPM", ["BPM / BPO", "Analytics / KPO / Research"]),
  ...grp("BFSI", ["Banking", "Financial Services", "FinTech / Payments"]),
  ...grp("Manufacturing & Production", ["Industrial Equipment / Machinery", "Fertilizers / Pesticides / Agro chemicals"]),
  ...grp("Miscellaneous", ["Agriculture / Forestry / Fishing", "NGO / Social Services / Industry Associations"]),
  ...grp("Consumer, Retail & Hospitality", ["Food Processing", "Gems & Jewellery", "Retail", "Travel & Tourism"]),
  ...grp("Infrastructure, Transport & Real Estate", ["Power", "Real Estate"]),
];

/* Every filter in the sidebar. `get(job)` returns the job's value(s) for it.
   - options  : fixed list (shown even before data arrives, counts when known)
   - exact    : match whole value instead of "contains"
   - lenient  : a job that has no value for it is NOT removed by the filter
   - derived  : only show once there are jobs to count */
const FACETS = [
  {
    id: "workMode", label: "Work mode", exact: true, lenient: true, keepOrder: true,
    options: WORK_MODES.map((m) => ({ name: m.label })),
    get: (j) => {
      const v = firstVal(j, ["workmode", "workMode", "jobtype"]);
      return v === null ? [] : WORK_MODES.filter((m) => m.re.test(v)).map((m) => m.label);
    },
  },
  {
    id: "department", label: "Department", exact: true,
    options: [...DEPARTMENT_RULES.map((r) => ({ name: r[0] })), { name: "Other" }],
    get: (j) => [classify(j, ["department", "functionalarea"], DEPARTMENT_RULES)],
  },
  {
    id: "roleCategory", label: "Role category", exact: true,
    options: [...ROLE_RULES.map((r) => ({ name: r[0] })), { name: "Other" }],
    get: (j) => [classify(j, ["rolecategory", "role"], ROLE_RULES)],
  },
  { id: "role", label: "Job role", exact: true, get: (j) => [(j.jobtitle || "").trim()].filter(Boolean) },
  {
    id: "location", label: "Location", exact: true,
    // Keep the Location filter visible even when the jobs API fails or returns no records.
    options: [
      "Delhi / NCR", "Bengaluru", "Indore", "Pune", "Mumbai (All Areas)", "Hyderabad",
      "Chennai", "Mumbai", "Noida", "New Delhi", "Ahmedabad", "Gurugram", "Kolkata",
      "Surat", "Coimbatore", "Jaipur", "Nagpur", "Nashik", "Kochi", "Thane", "Vadodara",
      "Navi Mumbai", "Rajkot", "Chandigarh", "Imphal", "Patna", "Remote", "India",
    ].map((name) => ({ name })),
    get: (j) => String(j.location || "").split(/[,/]/).map((s) => s.trim()).filter(Boolean),
  },
  {
    id: "salary", label: "Salary", exact: true, lenient: true, keepOrder: true,
    options: SALARY_BUCKETS.map((b) => ({ name: b[0] })), get: salaryLabels,
  },
  {
    id: "postedBy", label: "Posted by", lenient: true, keepOrder: true,
    options: [{ name: "Company Jobs" }, { name: "Consultant Jobs" }],
    get: (j) => { const v = firstVal(j, ["postedby", "posted_by"]); return v === null ? [] : [v]; },
  },
  {
    id: "industry", label: "Industry", lenient: true, grouped: true,
    options: INDUSTRY_OPTIONS,
    get: (j) => { const v = firstVal(j, ["industry", "industryType", "industrytype"]); return v === null ? [] : [v]; },
  },
  { id: "company", label: "Top companies", exact: true, get: (j) => [(j.companyname || "").trim()].filter(Boolean) },
  {
    id: "education", label: "Education", lenient: true, keepOrder: true,
    // Expanded to match the Education filter options in your reference screenshot.
    // Keep the names here consistent with the values used by the filter modal.
    options: [
      "MCA",
      "M.Tech",
      "MS/M.Sc (Science)",
      "PG Diploma",
      "Any Postgraduate",
      "MBA/PGDM",
      "CS",
      "M.A",
      "M.Com",
      "MCM",
      "Master in IT Management",
      "CA",
      "B.Tech / B.E.",
      "B.C.A.",
      "B.Sc",
      "Any Graduate",
      "B.Com",
      "Diploma",
      "B.B.A. / B.M.S.",
      "B.A. - Bachelor of Arts",
      "Other Graduate",
      "BBA",
      "B.E.",
      "B.Tech",
      "BCA",
      "B.Sc (IT)",
      "B.Sc (Computer Science)",
      "B.Sc (Nursing)",
      "B.Pharm",
      "B.Ed",
      "LLB",
      "BDS",
      "MBBS",
      "B.Arch",
      "B.Des",
      "BHM",
      "B.P.Ed",
      "B.Voc",
      "B.Com (Hons)",
      "BBA/BBM",
      "BA (Hons)",
      "M.Sc",
      "M.Com (Hons)",
      "M.Ed",
      "LLM",
      "M.Pharm",
      "M.Arch",
      "M.Des",
      "M.Phil",
      "Ph.D / Doctorate",
      "10th Pass",
      "12th Pass",
      "ITI",
      "Other",
    ].map((name) => ({ name })),
    get: (j) => {
      const v = firstVal(j, ["degree", "course", "qualification", "education", "educationlevel"]);
      return v === null ? [] : [v];
    },
  },
  {
    id: "employmentType", label: "Employment type", lenient: true, keepOrder: true,
    options: ["Full time", "Part time", "Contract", "Internship", "Freelance"].map((name) => ({ name })),
    get: (j) => { const v = firstVal(j, ["employmenttype", "employmentType"]); return v === null ? [] : [v]; },
  },
  {
    id: "noticePeriod", label: "Notice period", lenient: true, keepOrder: true,
    options: ["Immediate", "15 days", "1 month", "2 months", "3 months"].map((name) => ({ name })),
    get: (j) => { const v = firstVal(j, ["noticeperiod", "noticePeriod"]); return v === null ? [] : [v]; },
  },
];

const emptyFilters = () => ({ keywords: "", sel: {}, exp: EXP_MAX });
const toggleIn = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
const PREVIEW = 4; // options shown before "View More"

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
const Alljobs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usingSampleJobs, setUsingSampleJobs] = useState(false);

  // list controls
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("Relevance");
  const [postedDays, setPostedDays] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);

  // filters
  const [f, setF] = useState(emptyFilters());
  const [open, setOpen] = useState({ keywords: false });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // "View More" popup
  const [modal, setModal] = useState(null); // facet id
  const [draft, setDraft] = useState([]);
  const [modalSearch, setModalSearch] = useState("");

  const authData = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
  const user = authData ? JSON.parse(authData).users : null;
  const params = new URLSearchParams(location.search);
  const query = (params.get("query") || "").trim();
  const city = (params.get("location") || "").trim();
  const isRemoteQuery = /\bremote\b|\bwfh\b|work\s*from\s*home/i.test(query);
  // Enable fictional sample data only with ?demoJobs=1. Normal API remains default.
  const demoJobs = params.get("demoJobs") === "1";

  useEffect(() => {
    fetchJobs(query, city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, city, demoJobs]);

  useEffect(() => {
    if (!modal) return undefined;
    const onKey = (e) => e.key === "Escape" && setModal(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  const fetchJobs = async (title, cityName) => {
    setLoading(true);
    setError("");

    // Demo mode never calls the backend and never writes to the database.
    if (demoJobs) {
      setJobs(SAMPLE_JOBS);
      setUsingSampleJobs(true);
      setCurrentPage(1);
      setSelectedIds([]);
      setLoading(false);
      return;
    }

    // Existing production API behavior is preserved when demoJobs is not enabled.
    try {
      const response = await axios.get(API_ENDPOINTS.FETCHJOBSBYCONDITION, {
        params: { title, city: cityName },
      });
      const apiJobs = Array.isArray(response.data?.data) ? response.data.data : [];
      // If the backend returns no records for a remote search, use clearly labelled
      // local demo listings so the frontend layout can still be tested.
      if (title && /\bremote\b|\bwfh\b|work\s*from\s*home/i.test(title) && apiJobs.length === 0) {
        setJobs(SAMPLE_JOBS.filter((job) => /\bremote\b|\bwfh\b|work\s*from\s*home/i.test(`${job.workmode || ""} ${job.location || ""}`)));
        setUsingSampleJobs(true);
        setError("No remote vacancies were returned by the API — showing fictional demo listings for frontend preview.");
      } else {
        setJobs(apiJobs);
        setUsingSampleJobs(false);
      }
      setCurrentPage(1);
      setSelectedIds([]);
    } catch (err) {
      // Keep the page usable while the backend is unavailable. These jobs are
      // local demo data only and are never inserted into the database.
      console.error("Job API request failed; showing sample vacancies instead:", err);
      setJobs(SAMPLE_JOBS);
      setUsingSampleJobs(true);
      setError("Backend unavailable — showing sample vacancies for preview.");
      setCurrentPage(1);
      setSelectedIds([]);
    } finally {
      setLoading(false);
    }
  };

  const saveBookmark = async (jobId, silent = false) => {
    // Sample jobs have fake IDs; never send them to the bookmark API.
    if (String(jobId).startsWith("demo-")) {
      if (!silent) toast.info("Sample jobs cannot be saved.");
      return false;
    }
    if (!user) {
      toast.error("Please login to save jobs.");
      return false;
    }
    try {
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SAVEBOOKMARK, {
        params: { job_id: jobId, user_id: user.id },
      });
      if (!silent) {
        response.data.status === 200 ? toast.success("Saved!") : toast.error("Already Saved.");
      }
      return response.data.status === 200;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  /* ---------- facet options + counts (built from ALL fetched jobs) ---------- */
  const facetData = useMemo(() => {
    const out = {};
    FACETS.forEach((fc) => {
      const perJob = jobs.map((j) => fc.get(j));
      const hasData = perJob.some((v) => v.length > 0);
      let items;

      if (fc.options) {
        // Always render configured options, even when the API returns an empty list.
        // Counts remain hidden until jobs have loaded; once loaded, unused options are pruned.
        items = fc.options.map((o) => ({
          ...o,
          count: hasData ? perJob.filter((vals) => vals.some((v) => matches(v, o.name, fc.exact))).length : null,
        }));
        if (hasData) items = items.filter((i) => i.count > 0);
        if (!fc.keepOrder && !fc.grouped && hasData) items.sort((a, b) => b.count - a.count);
      } else {
        const counts = {};
        perJob.forEach((vals) => new Set(vals).forEach((v) => { counts[v] = (counts[v] || 0) + 1; }));
        items = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .map(([name, count]) => ({ name, count }));
      }
      out[fc.id] = items;
    });
    return out;
  }, [jobs]);

  /* ---------- filtering + sorting ---------- */
  const filteredJobs = useMemo(() => {
    const kwWords = f.keywords.toLowerCase().split(/[,\s]+/).filter(Boolean);
    const cutoff = postedDays ? Date.now() - postedDays * 86400000 : null;

    let list = jobs.filter((job) => {
      // ?query=remote filters by work-mode/location/title/description fields.
      // Work-mode fields are checked independently so unrelated skills don't match "remote".
      if (isRemoteQuery) {
        const remoteText = [
          job.workmode, job.workMode, job.jobtype, job.workType,
          job.location, job.jobLocation, job.jobtitle, job.description,
        ].filter(Boolean).join(" ");
        if (!/\bremote\b|\bwfh\b|work\s*from\s*home/i.test(remoteText)) return false;
      }

      if (kwWords.length && !isRemoteQuery) {
        const hay = `${job.jobtitle || ""} ${job.companyname || ""} ${job.skills || ""}`.toLowerCase();
        if (!kwWords.every((w) => hay.includes(w))) return false;
      }

      // experience slider: the job must not need more than the chosen years
      if (f.exp < EXP_MAX) {
        const jMin = num(job.minExperience) ?? 0;
        if (jMin > f.exp) return false;
      }

      // posted within
      if (cutoff) {
        const d = new Date(job.job_posttime);
        if (!Number.isNaN(d.getTime()) && d.getTime() < cutoff) return false;
      }

      // every checkbox filter
      for (const fc of FACETS) {
        const picked = f.sel[fc.id] || [];
        if (!picked.length) continue;
        const vals = fc.get(job);
        if (!vals.length) {
          if (fc.lenient) continue;
          return false;
        }
        if (!picked.some((p) => vals.some((v) => matches(v, p, fc.exact)))) return false;
      }
      return true;
    });

    list = [...list];
    if (sortBy === "Latest") {
      list.sort((a, b) => new Date(b.job_posttime || 0) - new Date(a.job_posttime || 0));
    } else if (sortBy === "Salary: high to low") {
      list.sort((a, b) => (toLakhs(b.MaximumSalary) || 0) - (toLakhs(a.MaximumSalary) || 0));
    } else if (sortBy === "Experience: low to high") {
      list.sort((a, b) => (num(a.minExperience) || 0) - (num(b.minExperience) || 0));
    }
    return list;
  }, [jobs, f, sortBy, postedDays, isRemoteQuery]);

  // back to page 1 whenever the result set changes
  useEffect(() => {
    setCurrentPage(1);
  }, [f, sortBy, perPage, postedDays]);

  /* ---------- pagination ---------- */
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const currentJobs = filteredJobs.slice((safePage - 1) * perPage, safePage * perPage);

  /* ---------- applied chips ---------- */
  const setSel = (id, arr) => setF((p) => ({ ...p, sel: { ...p.sel, [id]: arr } }));
  const clearAll = () => { setF(emptyFilters()); setPostedDays(0); };

  const chips = [];
  FACETS.forEach((fc) =>
    (f.sel[fc.id] || []).forEach((v) =>
      chips.push({ id: `${fc.id}-${v}`, label: v, remove: () => setSel(fc.id, (f.sel[fc.id] || []).filter((x) => x !== v)) })
    )
  );
  if (f.keywords.trim()) chips.push({ id: "kw", label: `"${f.keywords.trim()}"`, remove: () => setF((p) => ({ ...p, keywords: "" })) });
  if (f.exp < EXP_MAX) chips.push({ id: "exp", label: `${f.exp} yrs exp`, remove: () => setF((p) => ({ ...p, exp: EXP_MAX })) });
  if (postedDays) chips.push({ id: "fresh", label: POSTED_OPTIONS.find((o) => o.days === postedDays)?.label || "", remove: () => setPostedDays(0) });

  /* ---------- UI helpers (plain functions, NOT components: keeps input focus) ---------- */
  const isOpen = (id) => open[id] !== false && !(id === "keywords" && !open.keywords);
  const toggleOpen = (id) => setOpen((p) => ({ ...p, [id]: !isOpen(id) }));

  const renderSection = (id, label, body, opts = {}) => (
    <div className="xh-fl-sec" key={id}>
      <div className="xh-fl-sec-head" onClick={() => toggleOpen(id)} role="button" tabIndex={0}>
        <span className="xh-fl-sec-title">{label}</span>
        <span className="xh-fl-sec-right">
          {opts.clear && isOpen(id) && (
            <button type="button" className="xh-fl-clear" onClick={(e) => { e.stopPropagation(); opts.clear(); }}>Clear</button>
          )}
          {isOpen(id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </div>
      {isOpen(id) && <div className="xh-fl-sec-body">{body}</div>}
    </div>
  );

  const openModal = (fc) => {
    setDraft(f.sel[fc.id] || []);
    setModalSearch("");
    setModal(fc.id);
  };
  const applyModal = () => {
    setSel(modal, draft);
    setModal(null);
  };

  const renderFacet = (fc) => {
    const items = facetData[fc.id] || [];
    if (!items.length) return null;
    const selected = f.sel[fc.id] || [];
    const picked = items.filter((i) => selected.includes(i.name));
    const rest = items.filter((i) => !selected.includes(i.name));
    const shown = [...picked, ...rest].slice(0, Math.max(PREVIEW, picked.length));

    return renderSection(
      fc.id,
      fc.label,
      <>
        {shown.map((it) => (
          <label className="xh-fl-check" key={it.name}>
            <input type="checkbox" checked={selected.includes(it.name)} onChange={() => setSel(fc.id, toggleIn(selected, it.name))} />
            <span className="xh-fl-check-label" title={it.name}>{it.name}</span>
            {it.count !== null && it.count !== undefined && <span className="xh-fl-count">({it.count})</span>}
          </label>
        ))}
        {items.length > shown.length && (
          <button type="button" className="xh-fl-more" onClick={() => openModal(fc)}>View More</button>
        )}
      </>,
      { clear: selected.length ? () => setSel(fc.id, []) : null }
    );
  };

  const allOnPageSelected = currentJobs.length > 0 && currentJobs.every((j) => selectedIds.includes(j.id));
  const toggleSelectAll = () => {
    const ids = currentJobs.map((j) => j.id);
    setSelectedIds((prev) => (allOnPageSelected ? prev.filter((x) => !ids.includes(x)) : [...new Set([...prev, ...ids])]));
  };
  const saveSelected = async () => {
    if (!selectedIds.length) return;
    let ok = 0;
    for (const id of selectedIds) {
      if (await saveBookmark(id, true)) ok += 1;
    }
    if (user) toast.success(`${ok} of ${selectedIds.length} job(s) saved`);
    setSelectedIds([]);
  };

  const fmtDate = (v) => {
    if (!v) return "Few days ago";
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString("en-GB");
  };

  /* ---------- sidebar ---------- */
  const expPct = (f.exp / EXP_MAX) * 100;
  const sidebarFacets = (ids) => ids.map((id) => renderFacet(FACETS.find((x) => x.id === id)));

  const sidebar = (
    <div className="xh-fl-panel">
      <div className="xh-fl-top">
        <span className="xh-fl-top-title">All Filters</span>
        <button
          type="button"
          className="xh-fl-applied-link"
          onClick={clearAll}
          disabled={!chips.length}
          title={chips.length ? "Click to clear all filters" : "No filters applied"}
        >
          Applied ({chips.length})
        </button>
      </div>

      {chips.length > 0 && (
        <div className="xh-fl-applied">
          <div className="xh-fl-chips">
            {chips.map((c) => (
              <span className="xh-fl-chip" key={c.id}>
                {c.label}
                <button type="button" onClick={c.remove} aria-label={`Remove ${c.label}`}><X size={12} /></button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Keywords */}
      {renderSection(
        "keywords",
        "Keywords",
        <div className="xh-fl-search">
          <input value={f.keywords} onChange={(e) => setF((p) => ({ ...p, keywords: e.target.value }))} placeholder="Skills, title or company" />
          <Search size={16} />
        </div>
      )}

      {sidebarFacets(["workMode", "department", "roleCategory", "role", "location", "salary", "postedBy", "industry", "company"])}

      {/* Freshness */}
      <div className="xh-fl-sec" key="freshness">
        <div className="xh-fl-sec-head xh-fl-fresh">
          <span className="xh-fl-sec-title">Freshness</span>
          <span className="xh-fl-select-wrap">
            <select value={postedDays} onChange={(e) => setPostedDays(Number(e.target.value))} aria-label="Freshness">
              {POSTED_OPTIONS.map((o) => <option key={o.label} value={o.days}>{o.days === 0 ? "Select" : o.label}</option>)}
            </select>
            <ChevronDown size={18} />
          </span>
        </div>
      </div>

      {/* Experience slider */}
      {renderSection(
        "experience",
        "Experience",
        <div className="xh-nk-slider">
          <div className="xh-nk-bubble" style={{ left: `calc(${expPct}% + ${(8 - expPct * 0.16).toFixed(2)}px)` }}>
            {f.exp >= EXP_MAX ? "Any" : f.exp}
          </div>
          <input
            type="range"
            min="0"
            max={EXP_MAX}
            step="1"
            value={f.exp}
            style={{ "--pct": `${expPct}%` }}
            onChange={(e) => setF((p) => ({ ...p, exp: Number(e.target.value) }))}
            aria-label="Experience in years"
          />
          <div className="xh-nk-slider-labels"><span>0 Yrs</span><span>Any</span></div>
        </div>
      )}

      {sidebarFacets(["education", "employmentType", "noticePeriod"])}
    </div>
  );

  /* ---------- "View More" popup ---------- */
  const popupFacet = FACETS.find((x) => x.id === modal);
  let popup = null;
  if (popupFacet) {
    const q = modalSearch.trim().toLowerCase();
    const all = facetData[popupFacet.id] || [];
    const list = all.filter((i) => !q || i.name.toLowerCase().includes(q));
    const entries = [];
    let lastGroup = null;
    list.forEach((i) => {
      if (popupFacet.grouped && i.group && i.group !== lastGroup) {
        entries.push({ heading: i.group });
        lastGroup = i.group;
      }
      entries.push(i);
    });
    const rows = Math.max(1, Math.min(10, entries.length));

    popup = (
      <div className="xh-nk-overlay" onClick={() => setModal(null)}>
        <div className="xh-nk-pop" role="dialog" aria-label={popupFacet.label} onClick={(e) => e.stopPropagation()}>
          <div className="xh-nk-pop-head">
            <h4>{popupFacet.label}</h4>
            <button type="button" className="xh-nk-x" onClick={() => setModal(null)} aria-label="Close"><X size={18} /></button>
          </div>

          {all.length > 8 && (
            <div className="xh-nk-pop-search">
              <Search size={18} />
              <input autoFocus value={modalSearch} onChange={(e) => setModalSearch(e.target.value)} placeholder={`Search ${popupFacet.label}`} />
            </div>
          )}

          <div className="xh-nk-pop-grid" style={{ gridTemplateRows: `repeat(${rows}, auto)` }}>
            {entries.map((e, idx) =>
              e.heading ? (
                <div className="xh-nk-group" key={`g-${e.heading}-${idx}`}>{e.heading}</div>
              ) : (
                <label className="xh-fl-check xh-nk-opt" key={e.name}>
                  <input type="checkbox" checked={draft.includes(e.name)} onChange={() => setDraft((d) => toggleIn(d, e.name))} />
                  <span className="xh-fl-check-label" title={e.name}>{e.name}</span>
                  {e.count !== null && e.count !== undefined && <span className="xh-fl-count">({e.count})</span>}
                </label>
              )
            )}
            {entries.length === 0 && <p className="xh-fl-empty">No match found</p>}
          </div>

          <div className="xh-nk-pop-foot">
            <button type="button" className="xh-nk-apply" onClick={applyModal}>Apply</button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- render ---------- */
  return (
    <div className="bg-light min-vh-100">
      <UnifiedHeader />
      <ToastContainer />

      {/* Breadcrumb + title */}
      <div className="bg-white border-bottom py-4 shadow-sm">
        <Container>
          <div className="d-flex align-items-center gap-2 text-muted mb-2" style={{ fontSize: "14px" }}>
            <span>Home</span> <ChevronRight size={14} /> <span>Jobs</span> <ChevronRight size={14} /> <strong>{query || "All Jobs"}</strong>
          </div>
          <h5 className="fw-bold mb-0">{filteredJobs.length} {query} Vacancies in {city || "India"}</h5>
        </Container>
      </div>

      <Container className="py-4">
        <div className="d-lg-none mb-3">
          <Button variant="outline-primary" size="sm" onClick={() => setShowMobileFilters((s) => !s)}>
            <SlidersHorizontal size={16} className="me-1" /> Filters{chips.length ? ` (${chips.length})` : ""}
          </Button>
        </div>

        <Row>
          {/* --- LEFT SIDEBAR FILTERS --- */}
          <Col lg={3} className={showMobileFilters ? "" : "d-none d-lg-block"}>
            {sidebar}
          </Col>

          {/* --- CENTER JOB VACANCIES --- */}
          <Col lg={6} className="xh-fl-results-column">
            {/* Toolbar */}
            <div className="xh-fl-toolbar">
              <div className="xh-fl-tb-left">
                <label className="xh-fl-check xh-fl-selall">
                  <input type="checkbox" checked={allOnPageSelected} onChange={toggleSelectAll} />
                  <span className="xh-fl-check-label">Select all</span>
                </label>
                <button type="button" className="xh-fl-tb-btn" onClick={saveSelected} disabled={!selectedIds.length}>
                  <BookmarkPlus size={16} /> Save selected{selectedIds.length ? ` (${selectedIds.length})` : ""}
                </button>
              </div>

              <div className="xh-fl-tb-right">
                <label>Posted in
                  <select value={postedDays} onChange={(e) => setPostedDays(Number(e.target.value))}>
                    {POSTED_OPTIONS.map((o) => <option key={o.label} value={o.days}>{o.label}</option>)}
                  </select>
                </label>
                <label>Sort by
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </label>
                <label>Show
                  <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
                    {PER_PAGE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </label>
                <span className="xh-fl-pager">
                  <button type="button" onClick={() => setCurrentPage(Math.max(safePage - 1, 1))} disabled={safePage === 1} aria-label="Previous page"><ChevronLeft size={16} /></button>
                  Page {safePage} of {totalPages}
                  <button type="button" onClick={() => setCurrentPage(Math.min(safePage + 1, totalPages))} disabled={safePage === totalPages} aria-label="Next page"><ChevronRight size={16} /></button>
                </span>
              </div>
            </div>

            {error && (
              <div className="alert alert-warning py-2 px-3 mb-3" role="status" style={{ fontSize: "13px", borderRadius: "10px" }}>
                {error} {usingSampleJobs && <span>Sample listings are for UI testing only; these are not verified live vacancies.</span>}
              </div>
            )}
            {usingSampleJobs && (
              <div className="alert alert-info py-2 px-3 mb-3" role="status" style={{ fontSize: "13px", borderRadius: "10px" }}>
                Demo preview: sample listings are fictional and are not live job postings.
              </div>
            )}

            {loading ? (
              <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
            ) : currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <Card className="job-card border-0 shadow-sm mb-3 position-relative" key={job.id}>
                  <Card.Body className="p-4">
                    <Row>
                      <Col xs={10}>
                        <div className="d-flex align-items-start gap-3">
                          <input
                            type="checkbox"
                            className="xh-fl-cardcheck"
                            checked={selectedIds.includes(job.id)}
                            onChange={() => setSelectedIds((p) => toggleIn(p, job.id))}
                            aria-label="Select job"
                          />
                          <div className="flex-grow-1">
                            <Link
                              to={user ? `/applyjob/${job.id}` : "/login"}
                              className="text-decoration-none text-dark"
                              onClick={(e) => !user && (e.preventDefault(), toast.error("Login required"), navigate("/login"))}
                            >
                              <h6 className="fw-bold mb-1 hover-primary">{job.jobtitle}</h6>
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <span className="text-muted small fw-medium">{job.companyname}</span>
                                <Badge bg="success" className="d-flex align-items-center gap-1" style={{ fontSize: "10px" }}>
                                  4.1 <Star size={10} fill="white" />
                                </Badge>
                              </div>

                              <div className="d-flex flex-wrap gap-3 text-muted mb-3 small">
                                <div className="d-flex align-items-center gap-1">
                                  <Briefcase size={14} /> <span>{job.minExperience ?? 0}-{job.maxExperience ?? 0} Yrs</span>
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                  <span className="fw-bold">₹</span> <span>{job.minimumsalary} - {job.MaximumSalary} PA</span>
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                  <MapPin size={14} /> <span>{job.location}</span>
                                </div>
                              </div>

                              <div className="text-muted small mb-3">
                                <Clock size={14} className="me-1" /> {(job.skills || "").substring(0, 100)}...
                              </div>
                            </Link>

                            <div className="d-flex gap-2 flex-wrap">
                              {(job.skills || "").split(",").filter(Boolean).slice(0, 4).map((skill, i) => (
                                <Badge key={i} bg="light" text="secondary" className="fw-normal border">{skill.trim()}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col xs={2} className="text-end">
                        <img
                          src={job.comp_logo ? API_ENDPOINTS.FETCHIMAGE(job.comp_logo) : "https://via.placeholder.com/50"}
                          alt="logo"
                          className="rounded border"
                          style={{ width: "50px", height: "50px", objectFit: "contain" }}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer className="bg-white border-top-0 d-flex justify-content-between align-items-center px-4 pb-3">
                    <span className="text-muted small">{fmtDate(job.job_posttime)}</span>
                    <Button variant="link" className="p-0 text-decoration-none text-primary small" onClick={() => saveBookmark(job.id)}>
                      <BookmarkPlus size={18} className="me-1" /> Save
                    </Button>
                  </Card.Footer>
                </Card>
              ))
            ) : (
              <Card className="text-center p-5 border-0 shadow-sm">
                <p className="mb-2">No jobs found matching your criteria.</p>
                {chips.length > 0 && (
                  <div>
                    <Button variant="outline-primary" size="sm" onClick={() => { setF(emptyFilters()); setPostedDays(0); }}>Reset filters</Button>
                  </div>
                )}
              </Card>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="justify-content-center mt-4 custom-pagination">
                <Pagination.Prev onClick={() => setCurrentPage(Math.max(safePage - 1, 1))} disabled={safePage === 1} />
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item key={i + 1} active={i + 1 === safePage} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(Math.min(safePage + 1, totalPages))} disabled={safePage === totalPages} />
              </Pagination>
            )}
          </Col>

          {/* --- FEATURED COMPANIES (Naukri Campus-inspired right rail) --- */}
          <Col lg={3} className="xh-fl-featured-column">
            <Card className="xh-fl-featured-card border-0">
              <Card.Body>
                <h6 className="xh-fl-featured-title">See featured companies</h6>
                <p className="xh-fl-featured-subtitle">Explore opportunities from popular employers</p>
                <div className="xh-fl-company-tile">
                  <span className="xh-fl-company-mark xh-fl-mark-blue">C</span>
                  <span><strong>Conduent</strong><small>Technology &amp; services</small></span>
                </div>
                <div className="xh-fl-company-tile">
                  <span className="xh-fl-company-mark xh-fl-mark-teal">C</span>
                  <span><strong>Chetu</strong><small>Software solutions</small></span>
                </div>
                <div className="xh-fl-company-tile">
                  <span className="xh-fl-company-mark xh-fl-mark-orange">I</span>
                  <span><strong>Infosys</strong><small>IT &amp; consulting</small></span>
                </div>
                <div className="xh-fl-company-tile">
                  <span className="xh-fl-company-mark xh-fl-mark-purple">A</span>
                  <span><strong>AXS Solutions</strong><small>Technology</small></span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {popup}
      <Footer />

      <style>{`
        /* ---------- Naukri Campus-inspired job listing layout ---------- */
        .xh-fl-results-column { min-width: 0; }
        .xh-fl-results-column .job-card { border-radius: 22px !important; box-shadow: 0 8px 28px rgba(24, 34, 58, .07) !important; margin-bottom: 18px !important; overflow: hidden; }
        .xh-fl-results-column .job-card .card-body { padding: 24px !important; }
        .xh-fl-results-column .job-card h6 { font-size: 17px; line-height: 1.4; color: #151b2b; }
        .xh-fl-results-column .job-card .card-footer { padding: 0 24px 20px !important; }
        .xh-fl-featured-column { min-width: 0; }
        .xh-fl-featured-card { border: 1px solid #e4e8f0 !important; border-radius: 14px !important; position: sticky; top: 110px; }
        .xh-fl-featured-card .card-body { padding: 20px 18px; }
        .xh-fl-featured-title { margin: 0 0 8px; color: #171c2b; font-size: 17px; line-height: 1.4; font-weight: 700; }
        .xh-fl-featured-subtitle { color: #70798b; font-size: 13px; line-height: 1.5; margin-bottom: 18px; }
        .xh-fl-company-tile { display: flex; align-items: center; gap: 11px; padding: 12px 0; border-top: 1px solid #edf0f5; min-width: 0; }
        .xh-fl-company-mark { width: 43px; height: 43px; flex: 0 0 43px; display: grid; place-items: center; border: 1px solid #e5e9f1; border-radius: 11px; font-size: 23px; font-weight: 800; background: #fff; }
        .xh-fl-mark-blue { color: #315fce; } .xh-fl-mark-teal { color: #00a1a8; } .xh-fl-mark-orange { color: #f07828; } .xh-fl-mark-purple { color: #6b52b8; }
        .xh-fl-company-tile strong { display: block; color: #202638; font-size: 13px; }
        .xh-fl-company-tile small { display: block; color: #7a8292; font-size: 11px; margin-top: 3px; }
        @media (max-width: 991.98px) {
          .xh-fl-results-column { margin-top: 12px; }
          .xh-fl-featured-column { margin-top: 18px; }
          .xh-fl-featured-card { position: static; }
        }
        /* ---------- sidebar panel ---------- */
        .xh-fl-panel { background:#fff; border:1px solid #e8eaf0; border-radius:16px; padding:8px 22px 14px; position:sticky; top:110px; max-height:calc(100vh - 126px); overflow-y:auto; scrollbar-width:thin; }
        .xh-fl-top { display:flex; justify-content:space-between; align-items:center; padding:16px 0 14px; border-bottom:1px solid #eceef3; }
        .xh-fl-top-title { font-size:18px; font-weight:700; color:#1b1f2a; }
        .xh-fl-applied-link { border:0; background:transparent; padding:0; color:#1f5eff; font-weight:600; font-size:15px; cursor:pointer; }
        .xh-fl-applied-link:disabled { color:#1f5eff; opacity:.55; cursor:default; }

        .xh-fl-applied { padding:12px 0 6px; border-bottom:1px solid #eceef3; }
        .xh-fl-chips { display:flex; flex-wrap:wrap; gap:8px; }
        .xh-fl-chip { display:inline-flex; align-items:center; gap:6px; background:#eef3ff; color:#1f4fd8; border-radius:999px; padding:5px 8px 5px 12px; font-size:12.5px; font-weight:500; max-width:100%; }
        .xh-fl-chip button { display:inline-flex; border:0; background:transparent; color:#1f4fd8; padding:0; cursor:pointer; }

        .xh-fl-sec { border-bottom:1px solid #eceef3; }
        .xh-fl-sec:last-child { border-bottom:0; }
        .xh-fl-sec-head { display:flex; justify-content:space-between; align-items:center; padding:18px 0 14px; cursor:pointer; user-select:none; }
        .xh-fl-sec-title { font-size:16px; font-weight:600; color:#1b1f2a; }
        .xh-fl-sec-right { display:inline-flex; align-items:center; gap:12px; color:#3d4452; }
        .xh-fl-clear { border:0; background:transparent; color:#1f5eff; font-size:13px; font-weight:600; cursor:pointer; padding:0; }
        .xh-fl-sec-body { padding:0 0 18px; }

        .xh-fl-search { position:relative; margin-bottom:6px; }
        .xh-fl-search input { width:100%; height:42px; border:1px solid #dfe3ea; border-radius:999px; padding:0 40px 0 16px; font-size:14px; outline:0; }
        .xh-fl-search input:focus { border-color:#1f5eff; box-shadow:0 0 0 3px rgba(31,94,255,.1); }
        .xh-fl-search svg { position:absolute; right:14px; top:13px; color:#7a8294; }

        /* checkbox (same look in sidebar, popup, toolbar) */
        .xh-fl-check { display:flex; align-items:center; gap:12px; margin:0 0 14px; cursor:pointer; font-size:15px; color:#2b3140; line-height:1.25; }
        .xh-fl-check input { appearance:none; -webkit-appearance:none; width:20px; height:20px; flex:none; margin:0; border:2px solid #b4bbc9; border-radius:5px; background:#fff; cursor:pointer; display:inline-grid; place-content:center; transition:.15s; }
        .xh-fl-check input:hover { border-color:#1f5eff; }
        .xh-fl-check input:checked { background:#1f5eff; border-color:#1f5eff; }
        .xh-fl-check input:checked::after { content:""; width:10px; height:6px; border-left:2.5px solid #fff; border-bottom:2.5px solid #fff; transform:translateY(-1px) rotate(-45deg); }
        .xh-fl-check-label { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .xh-fl-count { color:#7a8294; font-size:14px; flex:none; }
        .xh-fl-more { border:0; background:transparent; color:#1f5eff; font-size:15px; font-weight:600; padding:2px 0 0 32px; cursor:pointer; }
        .xh-fl-empty { font-size:13px; color:#7a8294; margin:0; }

        /* freshness select */
        .xh-fl-fresh { cursor:default; }
        .xh-fl-select-wrap { position:relative; display:inline-flex; align-items:center; color:#3d4452; }
        .xh-fl-select-wrap select { appearance:none; -webkit-appearance:none; border:0; background:transparent; font-size:15px; color:#5b6373; padding:0 24px 0 0; outline:0; cursor:pointer; text-align:right; }
        .xh-fl-select-wrap svg { position:absolute; right:0; pointer-events:none; }

        /* experience slider */
        .xh-nk-slider { position:relative; padding-top:44px; }
        .xh-nk-bubble { position:absolute; top:0; transform:translateX(-50%); min-width:40px; height:36px; padding:0 10px; display:flex; align-items:center; justify-content:center; background:#111827; color:#fff; font-size:13px; font-weight:700; border-radius:50% 50% 50% 50% / 60% 60% 40% 40%; }
        .xh-nk-bubble::after { content:""; position:absolute; bottom:-6px; left:50%; transform:translateX(-50%); border:7px solid transparent; border-top-color:#111827; border-bottom:0; }
        .xh-nk-slider input[type=range] { -webkit-appearance:none; appearance:none; width:100%; height:5px; border-radius:99px; outline:0; cursor:pointer; background:linear-gradient(90deg,#111827 0%,#111827 var(--pct),#d9dde6 var(--pct),#d9dde6 100%); }
        .xh-nk-slider input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; border-radius:50%; background:#111827; border:0; }
        .xh-nk-slider input[type=range]::-moz-range-thumb { width:16px; height:16px; border-radius:50%; background:#111827; border:0; }
        .xh-nk-slider-labels { display:flex; justify-content:space-between; margin-top:14px; font-size:14px; color:#6b7385; }

        /* ---------- "View More" popup ---------- */
        .xh-nk-overlay { position:fixed; inset:0; z-index:2000; background:rgba(15,27,45,.28); display:flex; align-items:center; justify-content:center; padding:16px; }
        .xh-nk-pop { background:#fff; border-radius:14px; box-shadow:0 24px 60px rgba(15,27,45,.28); padding:26px 30px 22px; width:fit-content; min-width:min(360px,92vw); max-width:min(1040px,94vw); max-height:88vh; display:flex; flex-direction:column; }
        .xh-nk-pop-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; }
        .xh-nk-pop-head h4 { margin:0; font-size:20px; font-weight:700; color:#1b1f2a; }
        .xh-nk-x { border:0; background:transparent; color:#6b7385; display:inline-flex; padding:4px; cursor:pointer; }
        .xh-nk-x:hover { color:#111827; }
        .xh-nk-pop-search { position:relative; width:min(300px,100%); margin-bottom:22px; }
        .xh-nk-pop-search svg { position:absolute; left:14px; top:12px; color:#7a8294; }
        .xh-nk-pop-search input { width:100%; height:44px; border:1px solid #dfe3ea; border-radius:999px; padding:0 16px 0 44px; font-size:15px; outline:0; }
        .xh-nk-pop-search input:focus { border-color:#1f5eff; box-shadow:0 0 0 3px rgba(31,94,255,.1); }
        .xh-nk-pop-grid { display:grid; grid-auto-flow:column; grid-auto-columns:minmax(250px,max-content); column-gap:44px; row-gap:0; overflow:auto; padding-bottom:14px; align-content:start; min-height:0; }
        .xh-nk-pop-grid::-webkit-scrollbar { height:8px; width:8px; }
        .xh-nk-pop-grid::-webkit-scrollbar-thumb { background:#9aa6c2; border-radius:99px; }
        .xh-nk-pop-grid::-webkit-scrollbar-track { background:#eceff6; border-radius:99px; }
        .xh-nk-opt { margin:0; padding:9px 0; max-width:300px; }
        .xh-nk-group { padding:9px 0; font-size:15px; color:#7a88b8; font-weight:500; }
        .xh-nk-pop-foot { display:flex; justify-content:flex-end; margin-top:8px; }
        .xh-nk-apply { border:0; background:#1f5eff; color:#fff; font-weight:700; font-size:16px; padding:11px 34px; border-radius:999px; cursor:pointer; box-shadow:0 6px 16px rgba(31,94,255,.32); transition:.2s; }
        .xh-nk-apply:hover { background:#1448d6; transform:translateY(-1px); }

        /* ---------- toolbar ---------- */
        .xh-fl-toolbar { display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; background:#fff; border:1px solid #e8eaf0; border-radius:12px; padding:10px 16px; margin-bottom:16px; }
        .xh-fl-tb-left { display:flex; align-items:center; gap:18px; }
        .xh-fl-selall { margin:0; }
        .xh-fl-tb-btn { display:inline-flex; align-items:center; gap:6px; border:0; background:transparent; color:#1f5eff; font-size:13.5px; font-weight:600; cursor:pointer; padding:0; }
        .xh-fl-tb-btn:disabled { color:#a2a9b8; cursor:not-allowed; }
        .xh-fl-tb-right { display:flex; flex-wrap:wrap; align-items:center; gap:16px; font-size:13px; color:#3d4452; }
        .xh-fl-tb-right label { display:inline-flex; align-items:center; gap:8px; margin:0; }
        .xh-fl-tb-right select { height:32px; border:1px solid #dfe3ea; border-radius:6px; padding:0 8px; font-size:13px; background:#fff; outline:0; }
        .xh-fl-pager { display:inline-flex; align-items:center; gap:8px; }
        .xh-fl-pager button { display:inline-flex; border:0; background:transparent; color:#3d4452; padding:2px; cursor:pointer; }
        .xh-fl-pager button:disabled { color:#c4c9d4; cursor:not-allowed; }
        .xh-fl-cardcheck { width:16px; height:16px; margin-top:4px; accent-color:#1f5eff; flex:none; }
      `}</style>
    </div>
  );
};

export default Alljobs;