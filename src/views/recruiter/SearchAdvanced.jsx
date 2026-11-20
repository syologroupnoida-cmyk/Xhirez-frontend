// import React, { useMemo, useState, useSyncExternalStore } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { MenuItem, Select } from "@mui/material";
// import {
//   AssignmentInd,
//   BookmarkBorder,
//   BusinessCenter,
//   Comment,
//   ContentCopy,
//   Description,
//   Email,
//   ExpandMore,
//   FileDownload,
//   FolderOpen,
//   MoreVert,
//   Phone,
//   Place,
//   School,
//   Sms,
// } from "@mui/icons-material";
// import RecruiterPortalSeell from "./RecruiterPortalSeell";

// export const dummyCandidates = [
//   {
//     id: 1,
//     name: "Prashant Lambha",
//     highlight: "Prashant Lambha",
//     immediateJoiner: true,
//     experience: "1 Yrs 0 Month",
//     salary: "Rs. 1.8 Lacs",
//     location: "Noida",
//     current: "DevOps Internship | DevOps Insider",
//     education: [
//       "Master of Computer Application (MCA) | Dev Bhoomi Uttarakhand University | 2023",
//       "Bachelor of Computer Application (BCA) | Vivek College of Education (M J P Rohilkhand University) | 2021",
//     ],
//     preferredLocations: "Noida, Gurugram, Shahjahanpur",
//     skills: ["react.js", "terraform", "postman", "ci/cd", "javascript", "cloud engineer"],
//     otherSkills: ["terraform infrastructure", "devops", "responsive web design", "css", "linux"],
//     mayAlsoKnow: "react.js, terraform, postman, ci/cd, javascript, ubuntu, cloud engineer, gitops,...",
//     phone: "+91-9027441332",
//     updated: "06 Jun 2026",
//     active: "07 Jun 2026",
//     score: 100,
//     avatar: "P",
//     avatarColor: "#91a2b5",
//   },
//   {
//     id: 2,
//     name: "Prashant Lmabha",
//     highlight: "Prashant",
//     immediateJoiner: false,
//     experience: "1 Yrs 0 Month",
//     salary: "Rs. 2 Lacs",
//     location: "Other Uttar Pradesh",
//     current: "Frontend Developer | Creyman Solution Private Limited",
//     education: ["Bachelor of Computer Application (BCA) | Vivek College of Education | 2021", "Intermediate | UP Board | 2018"],
//     preferredLocations: "Noida, Delhi NCR, Gurugram",
//     skills: ["html", "css", "javascript", "react.js", "next.js", "tailwind"],
//     otherSkills: ["bootstrap", "git", "api integration", "redux", "figma"],
//     mayAlsoKnow: "html, css, javascript, react.js, next.js, git, bootstrap,...",
//     phone: "+91-9027441332",
//     updated: "04 Jun 2026",
//     active: "06 Jun 2026",
//     score: 92,
//     avatar: "P",
//     avatarColor: "#d9a85c",
//   },
// ];

// const toolbarActions = [
//   ["Save", FolderOpen],
//   ["Excel", Description],
//   ["Email", Email],
//   ["Resume", FileDownload],
//   ["IVR", Sms],
// ];

// const locations = ["Ahmedabad (4)", "Surat (1)", "Other Uttar Pradesh (1)", "Delhi (1)", "Noida (1)"];
// const industries = ["Others (4)", "Manufacturing (3)", "Medical / Healthcare (1)"];
// const functionalAreas = ["Others (3)", "Housekeeping (1)", "Production (1)", "Quality (QA-QC) (1)", "SBU Head / CEO / Director (1)"];
// const education = ["Others (5)", "Commerce (1)", "Other (1)", "Science (1)"];
// const otherFilters = [
//   "Hide Profile without Comments (8)",
//   "Show Profile with following comment tag:-",
//   "Others",
//   "Hide Private Profiles",
//   "Email Verified Only",
//   "Mobile Verified Only",
//   "Women Candidates Only",
//   "Hide Profiles without Resume",
// ];

// export default function SearchAdvanced() {
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState(String(router.query.anyKeywords || router.query.allKeywords || ""));
//   const [anyKeyword, setAnyKeyword] = useState(String(router.query.anyKeywords || ""));
//   const [allKeyword, setAllKeyword] = useState(String(router.query.allKeywords || ""));
//   const [searchScope, setSearchScope] = useState("full");
//   const [revealedPhones, setRevealedPhones] = useState({});
//   const foldersSnapshot = useSyncExternalStore(subscribeToFolderStore, getFolderSnapshot, getServerFolderSnapshot);
//   const folders = useMemo(() => JSON.parse(foldersSnapshot), [foldersSnapshot]);

//   const filteredCandidates = useMemo(() => {
//     const normalized = searchTerm.trim().toLowerCase();
//     if (!normalized) return dummyCandidates;

//     return dummyCandidates.filter((candidate) =>
//       [candidate.name, candidate.current, candidate.preferredLocations, candidate.mayAlsoKnow, ...candidate.skills, ...candidate.otherSkills]
//         .join(" ")
//         .toLowerCase()
//         .includes(normalized)
//     );
//   }, [searchTerm]);

//   const handleSearchWithinResults = (event) => {
//     event.preventDefault();
//     setSearchTerm([anyKeyword, allKeyword].filter(Boolean).join(" "));
//   };

//   const revealPhone = (candidateId) => {
//     setRevealedPhones((current) => ({ ...current, [candidateId]: true }));
//   };

//   const moveCandidateToFolder = (candidate, folderId) => {
//     if (!folderId) return;

//     const currentFolders = JSON.parse(window.localStorage.getItem("xh-recruiter-folders") || "[]");
//     const nextFolders = currentFolders.map((folder) => {
//       if (folder.id !== folderId) return folder;

//       const existingCandidates = folder.candidates || [];
//       const isAlreadyAdded = existingCandidates.some((item) => String(item.id) === String(candidate.id));
//       if (isAlreadyAdded) return folder;

//       return {
//         ...folder,
//         candidates: [
//           {
//             ...candidate,
//             movedAt: new Date().toISOString(),
//             resumeFileName: `${candidate.name.replace(/\s+/g, "-").toLowerCase()}-resume.txt`,
//           },
//           ...existingCandidates,
//         ],
//       };
//     });

//     window.localStorage.setItem("xh-recruiter-folders", JSON.stringify(nextFolders));
//     window.dispatchEvent(new Event("xh-recruiter-folders-updated"));
//   };

//   return (
//     <RecruiterPortalSeell active="Find Candidates">
//       <div className="min-h-screen bg-[#f7f7f8] text-[#2f3a4a]">
//         <section className="border-b border-slate-200 bg-white">
//           <div className="mx-auto flex max-w-[1220px] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
//             <div className="min-w-0">
//               <h5 className="m-0 text-xl font-bold leading-tight text-[#263241]">8 Candidates</h5>
//               <div className="mt-2 flex min-w-0 items-center gap-2 whitespace-nowrap text-sm text-slate-800">
//                 <span>for</span>
//                 <span className="text-black">Prashant Lambha</span>
//                 <span>...</span>
//                 <button type="button" className="inline-flex items-center gap-1 border-0 bg-transparent p-0 text-[#3047c7]">
//                   View details <ExpandMore className="text-slate-400" fontSize="small" />
//                 </button>
//               </div>
//             </div>

//             <div className="ml-auto flex w-full flex-nowrap justify-end gap-3 overflow-x-auto lg:w-auto">
//               {["Modify Search", "Save Search", "New Search", "Convert to Job Postings"].map((label) => (
//                 <button
//                   key={label}
//                   type="button"
//                   onClick={() => {
//                     if (label === "New Search") {
//                       router.push("/recruiter/advanced-search");
//                     }
//                   }}
//                   className="h-10 shrink-0 border border-[#2f4fc8] bg-white px-5 text-sm font-semibold text-[#273ebf]"
//                 >
//                   {label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </section>

//         <section className="mx-auto grid max-w-[1220px] grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[300px_minmax(0,1fr)]">
//           <aside className="lg:sticky lg:top-16 lg:max-h-[calc(100vh-72px)] lg:overflow-y-auto lg:pr-1">
//             <div className="space-y-3">
//               <FilterBox>
//                 <FilterRow label="Hide" value="Select" muted />
//               </FilterBox>

//               <FilterBox>
//                 <FilterRow label="Show" value="All Profiles" />
//                 <FilterRow label="Duration" value="6 Months" />
//                 <FilterRow label="Sort by" value="Relevance" />
//               </FilterBox>

//               <FilterBox>
//                 <h5 className="m-0 text-sm font-bold uppercase text-[#3b4250]">Search within results</h5>
//                 <div className="mt-3 space-y-2 text-sm text-slate-500">
//                   <label className="flex h-8 items-center gap-4 leading-none">
//                     <input
//                       type="radio"
//                       name="searchScope"
//                       value="full"
//                       checked={searchScope === "full"}
//                       onChange={(event) => setSearchScope(event.target.value)}
//                       className="m-0 h-4 w-4 shrink-0 accent-[#7557ff]"
//                     />
//                     Full Profile
//                   </label>
//                   <label className="flex h-8 items-center gap-4 leading-none">
//                     <input
//                       type="radio"
//                       name="searchScope"
//                       value="skills"
//                       checked={searchScope === "skills"}
//                       onChange={(event) => setSearchScope(event.target.value)}
//                       className="m-0 h-4 w-4 shrink-0 accent-[#7557ff]"
//                     />
//                     Profile title/key skills
//                   </label>
//                 </div>
//                 <form onSubmit={handleSearchWithinResults} className="mt-4 space-y-3">
//                   <input
//                     value={anyKeyword}
//                     onChange={(event) => setAnyKeyword(event.target.value)}
//                     className="h-9 w-full border-0 border-b border-slate-300 bg-transparent p-0 text-sm outline-none placeholder:text-slate-500"
//                     placeholder="Any keyword"
//                   />
//                   <input
//                     value={allKeyword}
//                     onChange={(event) => setAllKeyword(event.target.value)}
//                     className="h-9 w-full border-0 border-b border-slate-300 bg-transparent p-0 text-sm outline-none placeholder:text-slate-500"
//                     placeholder="All keyword"
//                   />
//                   <button type="submit" className="h-8 rounded bg-[#5b67c8] px-4 text-xs font-bold text-white">
//                     Search
//                   </button>
//                 </form>
//               </FilterBox>

//               <FilterBox>
//                 <h5 className="m-0 text-sm font-bold text-[#3b4250]">Filter with Key Skills</h5>
//                 <FilterSelect label="Skill" value="Select Skill" />
//                 <FilterSelect label="Experience" value="Select Experience" />
//                 <button type="button" className="mt-3 border-0 bg-transparent p-0 text-xs font-bold text-[#5b67c8]">
//                   Add
//                 </button>
//               </FilterBox>

//               <FilterBox>
//                 <CheckboxFilter label="Immediate Joiners" />
//                 <CheckboxFilter label="Open to Contractual Job" />
//               </FilterBox>

//               <FilterBox title="Experience">
//                 <RangeLine min="0 Yr" max="> 25 Yrs" />
//               </FilterBox>

//               <FilterBox title="Salary">
//                 <RangeLine min="< Rs 50,000 / Yr" max="> Rs 1 Crore / Yr" />
//               </FilterBox>

//               <FilterBox title="Location">
//                 {locations.map((item) => (
//                   <CheckboxFilter key={item} label={item} />
//                 ))}
//               </FilterBox>

//               <FilterBox title="Industry">
//                 {industries.map((item) => (
//                   <CheckboxFilter key={item} label={item} />
//                 ))}
//               </FilterBox>

//               <FilterBox title="Functional Area">
//                 {functionalAreas.map((item) => (
//                   <CheckboxFilter key={item} label={item} />
//                 ))}
//                 <button type="button" className="mt-2 border-0 bg-transparent p-0 text-xs font-bold text-[#5b67c8]">
//                   View all
//                 </button>
//               </FilterBox>

//               <FilterBox title="Degree">
//                 <CheckboxFilter label="Other (5)" />
//               </FilterBox>

//               <FilterBox title="Education">
//                 {education.map((item) => (
//                   <CheckboxFilter key={item} label={item} />
//                 ))}
//               </FilterBox>

//               <FilterBox title="Other">
//                 <p className="m-0 mb-2 text-xs font-bold text-slate-600">Comments Filter</p>
//                 {otherFilters.map((item) => (
//                   <CheckboxFilter key={item} label={item} />
//                 ))}
//               </FilterBox>
//             </div>
//           </aside>

//           <section className="min-w-0">
//             <div className="mb-3 flex flex-wrap items-center gap-3 bg-white px-4 py-3 text-[#2f4fc8] shadow-sm">
//               <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
//               {toolbarActions.map(([label, Icon]) => (
//                 <button key={label} type="button" className="inline-flex items-center gap-1 border-0 bg-transparent p-0 text-sm text-[#2f4fc8]">
//                   <Icon fontSize="small" />
//                   {label}
//                 </button>
//               ))}
//             </div>

//             <div className="space-y-4">
//               {filteredCandidates.map((candidate) => (
//                 <CandidateCard
//                   key={candidate.id}
//                   candidate={candidate}
//                   isPhoneRevealed={Boolean(revealedPhones[candidate.id])}
//                   onRevealPhone={() => revealPhone(candidate.id)}
//                   folders={folders}
//                   onMoveToFolder={(folderId) => moveCandidateToFolder(candidate, folderId)}
//                   onCreateFolder={() => window.dispatchEvent(new Event("xh-open-create-folder-modal"))}
//                 />
//               ))}

//               {filteredCandidates.length === 0 && (
//                 <div className="bg-white p-8 text-center text-sm text-slate-500 shadow-sm">No candidates matched this search.</div>
//               )}
//             </div>
//           </section>
//         </section>
//       </div>
//     </RecruiterPortalSeell>
//   );
// }

// function FilterBox({ children, title }) {
//   return (
//     <div className="rounded bg-white p-4 shadow-[0_5px_20px_rgba(15,23,42,0.08)]">
//       {title && <h5 className="m-0 mb-3 text-sm font-bold text-[#3b4250]">{title}</h5>}
//       {children}
//     </div>
//   );
// }

// function FilterRow({ label, value, muted = false }) {
//   return (
//     <div className="grid grid-cols-[88px_1fr] items-center gap-3 py-1.5">
//       <span className={`text-xs font-bold ${muted ? "text-slate-400" : "text-slate-500"}`}>{label}</span>
//       <button type="button" className="flex h-8 items-center justify-between border-0 border-b border-slate-300 bg-transparent p-0 text-left text-sm text-slate-500">
//         {value}
//         <ExpandMore className="text-slate-400" fontSize="small" />
//       </button>
//     </div>
//   );
// }

// function FilterSelect({ label, value }) {
//   return (
//     <label className="mt-3 block">
//       <span className="text-xs font-bold text-[#4b5563]">{label}</span>
//       <button type="button" className="mt-1 flex h-9 w-full items-center justify-between border-0 border-b border-slate-300 bg-transparent p-0 text-left text-sm text-slate-500">
//         {value}
//         <ExpandMore className="text-slate-400" fontSize="small" />
//       </button>
//     </label>
//   );
// }

// function CheckboxFilter({ label }) {
//   return (
//     <label className="flex h-8 w-full min-w-0 items-center gap-5 text-sm leading-none text-[#9aa4b1]">
//       <span className="inline-flex h-8 w-4 shrink-0 items-center justify-center">
//         <input type="checkbox" className="m-0 h-3.5 w-3.5 rounded-[3px] border border-[#d7dce2] bg-white accent-[#5b67c8] shadow-[0_1px_3px_rgba(15,23,42,0.10)]" />
//       </span>
//       <span className="inline-flex h-8 min-w-0 flex-1 items-center overflow-hidden text-ellipsis whitespace-nowrap leading-none">{label}</span>
//     </label>
//   );
// }

// function RangeLine({ min, max }) {
//   return (
//     <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 text-sm text-[#66717f]">
//       <label className="block">
//         <span className="block text-xs text-[#7a8594]">Min</span>
//         <button type="button" className="mt-2 flex h-9 w-full items-center justify-between border-0 border-b border-slate-300 bg-transparent p-0 text-left text-sm text-[#66717f]">
//           {min}
//           <ExpandMore className="text-slate-400" fontSize="small" />
//         </button>
//       </label>
//       <span className="pb-2 text-lg text-[#66717f]">To</span>
//       <label className="block">
//         <span className="block text-xs text-[#7a8594]">Max</span>
//         <button type="button" className="mt-2 flex h-9 w-full items-center justify-between border-0 border-b border-slate-300 bg-transparent p-0 text-left text-sm text-[#66717f]">
//           {max}
//           <ExpandMore className="text-slate-400" fontSize="small" />
//         </button>
//       </label>
//     </div>
//   );
// }

// function CandidateCard({ candidate, isPhoneRevealed, onRevealPhone, folders, onMoveToFolder, onCreateFolder }) {
//   const displayPhone = isPhoneRevealed ? candidate.phone : maskPhone(candidate.phone);
//   const allSkills = [...candidate.skills, ...candidate.otherSkills];
//   const visibleSkills = allSkills.slice(0, 6);
//   const [selectedFolder, setSelectedFolder] = useState("");

//   return (
//     <article className="bg-white shadow-sm">
//       <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_230px]">
//         <div className="min-w-0">
//           <div className="flex items-start gap-3">
//             <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" />
//             <div className="min-w-0 flex-1">
//               <div className="flex flex-wrap items-center gap-2">
//                 <h5 className="m-0 text-xl font-bold leading-tight text-black">
//                   <Link
//                     href={`/recruiter/candidates/${candidate.id}`}
//                     className="text-[#2f4fc8] no-underline hover:text-[#2f4fc8]"
//                     style={{ color: "#2f4fc8", textDecoration: "none" }}
//                   >
//                     <span>{candidate.highlight}</span>
//                     {candidate.name.replace(candidate.highlight, "")}
//                   </Link>
//                 </h5>
//                 {candidate.immediateJoiner && (
//                   <span className="rounded-full bg-[#edf2ff] px-3 py-1 text-xs font-bold text-[#1f4eea]">Immediate Joiner</span>
//                 )}
//               </div>

//               <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#566373]">
//                 <MetaDot text={candidate.experience} />
//                 <MetaDot text={candidate.salary} />
//                 <MetaDot text={candidate.location} />
//               </div>

//               <InfoLine icon={BusinessCenter} text={`Current: ${candidate.current}`} />
//               <InfoLine icon={School} text={candidate.education[0]} />
//               <p className="m-0 ml-8 text-sm leading-5 text-[#657383]">{candidate.education[1]}</p>
//               <InfoLine icon={Place} text={`Pref. Location: ${candidate.preferredLocations}`} />

//               <div className="group mt-3 flex items-start gap-3">
//                 <AssignmentInd className="mt-1 text-[#99a2af]" fontSize="small" />
//                 <div className="flex min-w-0 flex-wrap gap-2">
//                   {visibleSkills.map((skill) => (
//                     <span key={skill} className="rounded-full border border-[#cbd8e5] bg-[#f8fbfd] px-3 py-1 text-xs font-semibold text-[#687584]">
//                       {skill}
//                     </span>
//                   ))}
//                   {allSkills.length > visibleSkills.length && (
//                     <span className="rounded-full border border-[#cbd8e5] bg-[#f8fbfd] px-3 py-1 text-xs font-semibold text-[#687584] group-hover:hidden">
//                       +{allSkills.length - visibleSkills.length} more
//                     </span>
//                   )}
//                   {allSkills.slice(visibleSkills.length).map((skill) => (
//                     <span
//                       key={skill}
//                       className="hidden rounded-full border border-[#cbd8e5] bg-[#f8fbfd] px-3 py-1 text-xs font-semibold text-[#687584] group-hover:inline-flex"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <p className="m-0 mt-3 border-t border-slate-200 pt-2 text-sm text-[#566373]">
//                 <strong>May also know:</strong> {candidate.mayAlsoKnow}
//               </p>
//             </div>
//           </div>
//         </div>

//         <aside className="rounded border border-slate-200 bg-white">
//           <div className="flex h-[118px] items-center justify-center">
//             <span
//               className="flex h-16 w-16 items-center justify-center rounded-full text-4xl font-bold text-white"
//               style={{ backgroundColor: candidate.avatarColor }}
//             >
//               {candidate.avatar}
//             </span>
//           </div>
//           <div className="bg-[#f6f6f6] px-4 py-4">
//             <div className="text-right text-sm font-bold text-[#34a646]">{candidate.score}%</div>
//             <div className="mt-1 h-2.5 rounded-full bg-gradient-to-r from-[#ff4f45] via-[#ffc53d] to-[#22c55e]" />
//             <p className="m-0 mt-1 text-center text-xs text-[#738095]">Response Likelihood</p>
//             <p className="m-0 mt-2 text-center text-sm font-bold text-[#35a348]">PROACTIVE</p>
//           </div>
//         </aside>
//       </div>

//       <div className="grid gap-3 border-t border-slate-100 bg-[#fbfbfd] px-[20px] py-3 lg:grid-cols-[1fr_auto] lg:items-center">
//         <div className="flex flex-wrap items-center gap-3">
//           <button type="button" className="inline-flex h-8 items-center gap-2 rounded border border-[#cfdef2] bg-white px-[20px] text-xs font-bold text-[#3349b9]">
//             <Comment fontSize="small" />
//             Comment
//           </button>
//           <div className="inline-flex h-8 min-w-[164px] items-center rounded border border-[#cfdef2] bg-white">
//             <Select
//               value={selectedFolder}
//               displayEmpty
//               variant="standard"
//               disableUnderline
//               onChange={(event) => {
//                 if (event.target.value === "__create_folder__") {
//                   setSelectedFolder("");
//                   onCreateFolder();
//                   return;
//                 }

//                 onMoveToFolder(event.target.value);
//                 setSelectedFolder("");
//               }}
//               renderValue={(value) => {
//                 if (!value) return "Move to Folder";
//                 return folders.find((folder) => folder.id === value)?.name || "Move to Folder";
//               }}
//               sx={{
//                 height: 32,
//                 minWidth: 164,
//                 width: "100%",
//                 color: "#3349b9",
//                 fontSize: 12,
//                 fontWeight: 700,
//                 "& .MuiSelect-select": {
//                   alignItems: "center",
//                   display: "flex",
//                   height: "32px !important",
//                   minHeight: "32px !important",
//                   padding: "0 30px 0 12px !important",
//                   textAlign: "left",
//                 },
//                 "& .MuiSelect-icon": {
//                   color: "#3349b9",
//                   fontSize: 20,
//                   right: 6,
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                 },
//               }}
//             >
//               <MenuItem value="" disabled>
//                 Move to Folder
//               </MenuItem>
//               {folders.length === 0 ? (
//                 <MenuItem value="__create_folder__" sx={{ color: "#2f4fc8", fontSize: 13, fontWeight: 700 }}>
//                   Create folder first
//                 </MenuItem>
//               ) : (
//                 folders.map((folder) => (
//                   <MenuItem key={folder.id} value={folder.id}>
//                     {folder.name}
//                   </MenuItem>
//                 ))
//               )}
//             </Select>
//           </div>
//           <BookmarkBorder className="text-slate-400" fontSize="small" />
//           <MoreVert className="text-[#4a62c7]" fontSize="small" />
//         </div>
//         <div className="flex flex-wrap items-center justify-end gap-3">
//           <span className="text-xs text-[#2f3a4a]">Profile Viewed</span>
//           <button
//             type="button"
//             onClick={onRevealPhone}
//             className="rounded border border-daSeed border-[#3b5bdb] bg-white px-3 py-2 text-sm font-bold text-black"
//             aria-label={isPhoneRevealed ? "Phone number revealed" : "Reveal phone number"}
//           >
//             <Phone fontSize="small" className="mr-1 text-slate-600" />
//             {displayPhone}
//             <ContentCopy fontSize="small" className="ml-4 text-[#8795d9]" />
//           </button>
//         </div>
//         {isPhoneRevealed && (
//           <div className="lg:col-start-2">
//             <div className="rounded bg-[#eef1ff] px-4 py-3 shadow-sm">
//               <p className="m-0 text-xs font-bold text-[#4054b2]">Candidate looking for job?</p>
//               <div className="mt-2 flex gap-3">
//                 <span className="rounded border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Yes</span>
//                 <span className="rounded border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-600">No</span>
//               </div>
//             </div>
//           </div>
//         )}
//         <div className="text-right text-xs text-[#6b7684] lg:col-start-2">
//           <p className="m-0">Updated: {candidate.updated}</p>
//           <p className="m-0 mt-1">Active: {candidate.active}</p>
//         </div>
//       </div>
//     </article>
//   );
// }

// function subscribeToFolderStore(callback) {
//   window.addEventListener("storage", callback);
//   window.addEventListener("xh-recruiter-folders-updated", callback);

//   return () => {
//     window.removeEventListener("storage", callback);
//     window.removeEventListener("xh-recruiter-folders-updated", callback);
//   };
// }

// function getFolderSnapshot() {
//   return window.localStorage.getItem("xh-recruiter-folders") || "[]";
// }

// function getServerFolderSnapshot() {
//   return "[]";
// }

// function maskPhone(phone) {
//   const digits = phone.replace(/\D/g, "");
//   if (digits.length < 4) return phone;

//   return `${digits.slice(-10, -8)}xxxxxx${digits.slice(-2)}`;
// }

// function MetaDot({ text }) {
//   return (
//     <span className="inline-flex items-center gap-2">
//       <span className="h-1.5 w-1.5 bg-slate-300" />
//       {text}
//     </span>
//   );
// }

// function InfoLine({ icon: Icon, text }) {
//   return (
//     <p className="m-0 mt-3 flex items-start gap-3 text-sm leading-5 text-[#4d5c6e]">
//       <Icon className="mt-0.5 text-[#99a2af]" fontSize="small" />
//       <span>{text}</span>
//     </p>
//   );
// }

import React, { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MenuItem, Select } from "@mui/material";
import {
  AssignmentInd,
  BookmarkBorder,
  BusinessCenter,
  Comment,
  ContentCopy,
  Description,
  Email,
  ExpandMore,
  FileDownload,
  FolderOpen,
  MoreVert,
  Phone,
  Place,
  School,
  Sms,
} from "@mui/icons-material";
import RecruiterPortalShell from "./RecruiterPortalShell";

const AV = ["#91a2b5", "#d9a85c", "#7aa6d6", "#8fbf9f", "#c98fb0", "#e08e79", "#7f8fd6", "#a3b86c"];

export const dummyCandidates = [
  {
    id: 1,
    name: "Prashant Lambha",
    highlight: "Prashant Lambha",
    immediateJoiner: true,
    experience: "1 Yrs 0 Month",
    expYears: 1,
    salary: "Rs. 1.8 Lacs",
    salaryLacs: 1.8,
    location: "Noida",
    current: "DevOps Internship | DevOps Insider",
    education: [
      "Master of Computer Application (MCA) | Dev Bhoomi Uttarakhand University | 2023",
      "Bachelor of Computer Application (BCA) | Vivek College of Education (M J P Rohilkhand University) | 2021",
    ],
    preferredLocations: "Noida, Gurugram, Shahjahanpur",
    skills: ["react.js", "terraform", "postman", "ci/cd", "javascript", "cloud engineer"],
    otherSkills: ["terraform infrastructure", "devops", "responsive web design", "css", "linux"],
    mayAlsoKnow: "react.js, terraform, postman, ci/cd, javascript, ubuntu, cloud engineer, gitops,...",
    phone: "+91-9027441332",
    updated: "06 Jun 2026",
    active: "07 Jun 2026",
    score: 100,
    avatar: "P",
    avatarColor: AV[0],
    industry: "IT / Software",
    functionalArea: "IT Software - DevOps",
    degree: "Master's",
    gender: "M",
    emailVerified: true,
    mobileVerified: true,
    hasResume: true,
    isPrivate: false,
    contract: false,
  },
  {
    id: 2,
    name: "Prashant Lmabha",
    highlight: "Prashant",
    immediateJoiner: false,
    experience: "1 Yrs 0 Month",
    expYears: 1,
    salary: "Rs. 2 Lacs",
    salaryLacs: 2,
    location: "Other Uttar Pradesh",
    current: "Frontend Developer | Creyman Solution Private Limited",
    education: ["Bachelor of Computer Application (BCA) | Vivek College of Education | 2021", "Intermediate | UP Board | 2018"],
    preferredLocations: "Noida, Delhi NCR, Gurugram",
    skills: ["html", "css", "javascript", "react.js", "next.js", "tailwind"],
    otherSkills: ["bootstrap", "git", "api integration", "redux", "figma"],
    mayAlsoKnow: "html, css, javascript, react.js, next.js, git, bootstrap,...",
    phone: "+91-9027441332",
    updated: "04 Jun 2026",
    active: "06 Jun 2026",
    score: 92,
    avatar: "P",
    avatarColor: AV[1],
    industry: "IT / Software",
    functionalArea: "IT Software - Frontend",
    degree: "Bachelor's",
    gender: "M",
    emailVerified: true,
    mobileVerified: false,
    hasResume: true,
    isPrivate: false,
    contract: true,
  },
  {
    id: 3,
    name: "Neha Sharma",
    highlight: "Neha",
    immediateJoiner: true,
    experience: "3 Yrs 4 Month",
    expYears: 3,
    salary: "Rs. 5.5 Lacs",
    salaryLacs: 5.5,
    location: "Delhi",
    current: "Digital Marketing Executive | BrightEdge Media",
    education: ["MBA (Marketing) | Delhi University | 2021", "B.Com | Delhi University | 2019"],
    preferredLocations: "Delhi, Noida, Gurugram",
    skills: ["seo", "google ads", "social media", "content strategy", "analytics", "email marketing"],
    otherSkills: ["canva", "wordpress", "copywriting"],
    mayAlsoKnow: "seo, google ads, social media, analytics, canva, wordpress,...",
    phone: "+91-9810012345",
    updated: "10 Jun 2026",
    active: "11 Jun 2026",
    score: 88,
    avatar: "N",
    avatarColor: AV[4],
    industry: "Advertising / Media",
    functionalArea: "Sales & Marketing",
    degree: "Master's",
    gender: "F",
    emailVerified: true,
    mobileVerified: true,
    hasResume: true,
    isPrivate: false,
    contract: false,
  },
  {
    id: 4,
    name: "Rahul Verma",
    highlight: "Rahul",
    immediateJoiner: false,
    experience: "6 Yrs 0 Month",
    expYears: 6,
    salary: "Rs. 12 Lacs",
    salaryLacs: 12,
    location: "Bengaluru",
    current: "Senior Software Engineer | CloudNine Technologies",
    education: ["B.Tech (Computer Science) | VTU | 2018"],
    preferredLocations: "Bengaluru, Hyderabad, Pune",
    skills: ["java", "spring boot", "microservices", "aws", "kafka", "sql"],
    otherSkills: ["docker", "kubernetes", "jenkins", "mongodb"],
    mayAlsoKnow: "java, spring boot, microservices, aws, kafka, docker, kubernetes,...",
    phone: "+91-9900112233",
    updated: "08 Jun 2026",
    active: "09 Jun 2026",
    score: 95,
    avatar: "R",
    avatarColor: AV[2],
    industry: "IT / Software",
    functionalArea: "IT Software - Backend",
    degree: "Bachelor's",
    gender: "M",
    emailVerified: true,
    mobileVerified: true,
    hasResume: true,
    isPrivate: false,
    contract: false,
  },
  {
    id: 5,
    name: "Anjali Patel",
    highlight: "Anjali",
    immediateJoiner: true,
    experience: "2 Yrs 2 Month",
    expYears: 2,
    salary: "Rs. 3.2 Lacs",
    salaryLacs: 3.2,
    location: "Ahmedabad",
    current: "HR Executive | Apex Manufacturing Pvt Ltd",
    education: ["MBA (HR) | Gujarat University | 2022", "BBA | Gujarat University | 2020"],
    preferredLocations: "Ahmedabad, Surat, Vadodara",
    skills: ["recruitment", "onboarding", "payroll", "hr operations", "ms excel", "employee engagement"],
    otherSkills: ["hrms", "labour law", "talent acquisition"],
    mayAlsoKnow: "recruitment, onboarding, payroll, hr operations, ms excel,...",
    phone: "+91-9825011223",
    updated: "05 Jun 2026",
    active: "08 Jun 2026",
    score: 84,
    avatar: "A",
    avatarColor: AV[3],
    industry: "Manufacturing",
    functionalArea: "Human Resources",
    degree: "Master's",
    gender: "F",
    emailVerified: false,
    mobileVerified: true,
    hasResume: true,
    isPrivate: false,
    contract: false,
  },
  {
    id: 6,
    name: "Mohit Joshi",
    highlight: "Mohit",
    immediateJoiner: false,
    experience: "9 Yrs 6 Month",
    expYears: 9,
    salary: "Rs. 9 Lacs",
    salaryLacs: 9,
    location: "Surat",
    current: "Production Manager | Shree Textiles",
    education: ["B.E. (Mechanical) | SVNIT | 2015"],
    preferredLocations: "Surat, Ahmedabad, Mumbai",
    skills: ["production planning", "lean manufacturing", "quality control", "team handling", "erp", "six sigma"],
    otherSkills: ["inventory", "vendor management"],
    mayAlsoKnow: "production planning, lean manufacturing, quality control, erp,...",
    phone: "+91-9879012345",
    updated: "01 Jun 2026",
    active: "03 Jun 2026",
    score: 78,
    avatar: "M",
    avatarColor: AV[5],
    industry: "Manufacturing",
    functionalArea: "Production",
    degree: "Bachelor's",
    gender: "M",
    emailVerified: true,
    mobileVerified: false,
    hasResume: false,
    isPrivate: false,
    contract: true,
  },
  {
    id: 7,
    name: "Sneha Iyer",
    highlight: "Sneha",
    immediateJoiner: false,
    experience: "4 Yrs 8 Month",
    expYears: 4,
    salary: "Rs. 7 Lacs",
    salaryLacs: 7,
    location: "Ahmedabad",
    current: "QA Engineer | MediCare Systems",
    education: ["B.Sc (Chemistry) | Gujarat University | 2019"],
    preferredLocations: "Ahmedabad, Pune",
    skills: ["manual testing", "selenium", "test cases", "jira", "api testing", "sql"],
    otherSkills: ["postman", "regression testing"],
    mayAlsoKnow: "manual testing, selenium, test cases, jira, api testing,...",
    phone: "+91-9825098765",
    updated: "09 Jun 2026",
    active: "10 Jun 2026",
    score: 81,
    avatar: "S",
    avatarColor: AV[6],
    industry: "Medical / Healthcare",
    functionalArea: "Quality (QA-QC)",
    degree: "Bachelor's",
    gender: "F",
    emailVerified: true,
    mobileVerified: true,
    hasResume: true,
    isPrivate: true,
    contract: false,
  },
  {
    id: 8,
    name: "Vikram Singh",
    highlight: "Vikram",
    immediateJoiner: true,
    experience: "14 Yrs 0 Month",
    expYears: 14,
    salary: "Rs. 28 Lacs",
    salaryLacs: 28,
    location: "Ahmedabad",
    current: "Director - Operations | Orbit Industries",
    education: ["MBA (Operations) | IIM Ahmedabad | 2011", "B.Tech | NIT Surat | 2009"],
    preferredLocations: "Ahmedabad, Mumbai, Delhi",
    skills: ["operations", "p&l", "strategy", "leadership", "supply chain", "budgeting"],
    otherSkills: ["negotiation", "business development"],
    mayAlsoKnow: "operations, p&l, strategy, leadership, supply chain, budgeting,...",
    phone: "+91-9898001122",
    updated: "11 Jun 2026",
    active: "12 Jun 2026",
    score: 90,
    avatar: "V",
    avatarColor: AV[7],
    industry: "Manufacturing",
    functionalArea: "SBU Head / CEO / Director",
    degree: "Master's",
    gender: "M",
    emailVerified: true,
    mobileVerified: true,
    hasResume: true,
    isPrivate: false,
    contract: false,
  },
];

const toolbarActions = [
  ["Save", FolderOpen],
  ["Excel", Description],
  ["Email", Email],
  ["Resume", FileDownload],
  ["IVR", Sms],
];

const EXP_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25];
const SAL_OPTIONS = [0, 1, 2, 3, 5, 7, 10, 15, 20, 30, 50, 100];
const SORTS = ["Relevance", "Experience (High to Low)", "Salary (High to Low)", "Salary (Low to High)", "Last Active"];

const OTHER_FILTERS = [
  { id: "emailVerified", label: "Email Verified Only", test: (c) => c.emailVerified },
  { id: "mobileVerified", label: "Mobile Verified Only", test: (c) => c.mobileVerified },
  { id: "women", label: "Women Candidates Only", test: (c) => c.gender === "F" },
  { id: "hasResume", label: "Hide Profiles without Resume", test: (c) => c.hasResume },
  { id: "noPrivate", label: "Hide Private Profiles", test: (c) => !c.isPrivate },
];

const emptyFilters = () => ({
  immediate: false,
  contract: false,
  expMin: "",
  expMax: "",
  salMin: "",
  salMax: "",
  skills: [],
  location: [],
  industry: [],
  functionalArea: [],
  degree: [],
  other: [],
});

const toDate = (value) => new Date(value).getTime() || 0;

function countBy(list, key) {
  const map = {};
  list.forEach((item) => {
    map[item[key]] = (map[item[key]] || 0) + 1;
  });
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
}

function subscribeToFolderStore(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("xh-recruiter-folders-updated", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("xh-recruiter-folders-updated", callback);
  };
}

function getFolderSnapshot() {
  return window.localStorage.getItem("xh-recruiter-folders") || "[]";
}

function getServerFolderSnapshot() {
  return "[]";
}

export default function SearchAdvanced() {
  const router = useRouter();
  const initialAny = String(router.query.anyKeywords || "");
  const initialAll = String(router.query.allKeywords || "");
  const [anyKeyword, setAnyKeyword] = useState(initialAny);
  const [allKeyword, setAllKeyword] = useState(initialAll);
  const [applied, setApplied] = useState({ any: initialAny, all: initialAll });
  const [searchScope, setSearchScope] = useState("full");
  const [show, setShow] = useState("All Profiles");
  const [sortBy, setSortBy] = useState("Relevance");
  const [skillPick, setSkillPick] = useState("");
  const [filters, setFilters] = useState(emptyFilters);
  const [revealedPhones, setRevealedPhones] = useState({});
  const foldersSnapshot = useSyncExternalStore(subscribeToFolderStore, getFolderSnapshot, getServerFolderSnapshot);
  const folders = useMemo(() => JSON.parse(foldersSnapshot), [foldersSnapshot]);

  const facets = useMemo(
    () => ({
      location: countBy(dummyCandidates, "location"),
      industry: countBy(dummyCandidates, "industry"),
      functionalArea: countBy(dummyCandidates, "functionalArea"),
      degree: countBy(dummyCandidates, "degree"),
      skills: [...new Set(dummyCandidates.flatMap((c) => [...c.skills, ...c.otherSkills]))].sort(),
    }),
    []
  );

  const filteredCandidates = useMemo(() => {
    const anyTerms = applied.any.toLowerCase().split(/[\s,]+/).filter(Boolean);
    const allTerms = applied.all.toLowerCase().split(/[\s,]+/).filter(Boolean);
    const expMax = filters.expMax === "" ? Infinity : Number(filters.expMax);
    const expMin = filters.expMin === "" ? 0 : Number(filters.expMin);
    const salMax = filters.salMax === "" ? Infinity : Number(filters.salMax);
    const salMin = filters.salMin === "" ? 0 : Number(filters.salMin);

    const list = dummyCandidates.filter((c) => {
      const haystack = (
        searchScope === "skills"
          ? [c.name, c.current, ...c.skills, ...c.otherSkills]
          : [c.name, c.current, c.preferredLocations, c.mayAlsoKnow, c.location, c.industry, c.functionalArea, ...c.education, ...c.skills, ...c.otherSkills]
      )
        .join(" ")
        .toLowerCase();

      if (anyTerms.length && !anyTerms.some((t) => haystack.includes(t))) return false;
      if (allTerms.length && !allTerms.every((t) => haystack.includes(t))) return false;
      if (show === "Immediate Joiners" && !c.immediateJoiner) return false;
      if (show === "Verified Profiles" && !(c.emailVerified && c.mobileVerified)) return false;
      if (filters.immediate && !c.immediateJoiner) return false;
      if (filters.contract && !c.contract) return false;
      if (c.expYears < expMin || c.expYears > expMax) return false;
      if (c.salaryLacs < salMin || c.salaryLacs > salMax) return false;
      if (filters.skills.length) {
        const own = [...c.skills, ...c.otherSkills];
        if (!filters.skills.every((s) => own.includes(s))) return false;
      }
      if (filters.location.length && !filters.location.includes(c.location)) return false;
      if (filters.industry.length && !filters.industry.includes(c.industry)) return false;
      if (filters.functionalArea.length && !filters.functionalArea.includes(c.functionalArea)) return false;
      if (filters.degree.length && !filters.degree.includes(c.degree)) return false;
      for (const id of filters.other) {
        const rule = OTHER_FILTERS.find((o) => o.id === id);
        if (rule && !rule.test(c)) return false;
      }
      return true;
    });

    const sorted = [...list];
    if (sortBy === "Experience (High to Low)") sorted.sort((a, b) => b.expYears - a.expYears);
    else if (sortBy === "Salary (High to Low)") sorted.sort((a, b) => b.salaryLacs - a.salaryLacs);
    else if (sortBy === "Salary (Low to High)") sorted.sort((a, b) => a.salaryLacs - b.salaryLacs);
    else if (sortBy === "Last Active") sorted.sort((a, b) => toDate(b.active) - toDate(a.active));
    else sorted.sort((a, b) => b.score - a.score);
    return sorted;
  }, [applied, filters, searchScope, show, sortBy]);

  const activeCount =
    filters.skills.length +
    filters.location.length +
    filters.industry.length +
    filters.functionalArea.length +
    filters.degree.length +
    filters.other.length +
    (filters.immediate ? 1 : 0) +
    (filters.contract ? 1 : 0) +
    (filters.expMin !== "" || filters.expMax !== "" ? 1 : 0) +
    (filters.salMin !== "" || filters.salMax !== "" ? 1 : 0);

  const setField = (key, value) => setFilters((cur) => ({ ...cur, [key]: value }));
  const toggleIn = (key, value) =>
    setFilters((cur) => ({
      ...cur,
      [key]: cur[key].includes(value) ? cur[key].filter((v) => v !== value) : [...cur[key], value],
    }));

  const clearAll = () => {
    setFilters(emptyFilters());
    setShow("All Profiles");
    setSortBy("Relevance");
  };

  const handleSearchWithinResults = (event) => {
    event.preventDefault();
    setApplied({ any: anyKeyword.trim(), all: allKeyword.trim() });
  };

  const addSkill = () => {
    if (!skillPick || filters.skills.includes(skillPick)) return;
    setFilters((cur) => ({ ...cur, skills: [...cur.skills, skillPick] }));
    setSkillPick("");
  };

  const revealPhone = (candidateId) => {
    setRevealedPhones((current) => ({ ...current, [candidateId]: true }));
  };

  const moveCandidateToFolder = (candidate, folderId) => {
    if (!folderId) return;

    const currentFolders = JSON.parse(window.localStorage.getItem("xh-recruiter-folders") || "[]");
    const nextFolders = currentFolders.map((folder) => {
      if (folder.id !== folderId) return folder;

      const existingCandidates = folder.candidates || [];
      const isAlreadyAdded = existingCandidates.some((item) => String(item.id) === String(candidate.id));
      if (isAlreadyAdded) return folder;

      return {
        ...folder,
        candidates: [
          {
            ...candidate,
            movedAt: new Date().toISOString(),
            resumeFileName: `${candidate.name.replace(/\s+/g, "-").toLowerCase()}-resume.txt`,
          },
          ...existingCandidates,
        ],
      };
    });

    window.localStorage.setItem("xh-recruiter-folders", JSON.stringify(nextFolders));
    window.dispatchEvent(new Event("xh-recruiter-folders-updated"));
  };

  const searchLabel = [applied.any, applied.all].filter(Boolean).join(" + ") || "All profiles";

  return (
    <RecruiterPortalShell active="Find Candidates">
      <div className="min-h-screen bg-[#f7f7f8] text-[#2f3a4a]">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-[1220px] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h5 className="m-0 text-xl font-bold leading-tight text-[#263241]">
                {filteredCandidates.length} {filteredCandidates.length === 1 ? "Candidate" : "Candidates"}
              </h5>
              <div className="mt-2 flex min-w-0 items-center gap-2 whitespace-nowrap text-sm text-slate-800">
                <span>for</span>
                <span className="max-w-[260px] truncate text-black">{searchLabel}</span>
                <span>...</span>
                <button type="button" className="inline-flex items-center gap-1 border-0 bg-transparent p-0 text-[#3047c7]">
                  View details <ExpandMore className="text-slate-400" fontSize="small" />
                </button>
              </div>
            </div>

            <div className="ml-auto flex w-full flex-nowrap justify-end gap-3 overflow-x-auto lg:w-auto">
              {["Modify Search", "Save Search", "New Search", "Convert to Job Postings"].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    if (label === "New Search" || label === "Modify Search") {
                      router.push("/recruiter/advanced-search");
                    }
                  }}
                  className="h-10 shrink-0 border border-[#2f4fc8] bg-white px-5 text-sm font-semibold text-[#273ebf]"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1220px] grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-16 lg:max-h-[calc(100vh-72px)] lg:overflow-y-auto lg:pr-1">
            <div className="space-y-3">
              <FilterBox>
                <div className="flex items-center justify-between">
                  <h5 className="m-0 text-sm font-bold uppercase text-[#3b4250]">All Filters</h5>
                  {activeCount > 0 && (
                    <button type="button" onClick={clearAll} className="border-0 bg-transparent p-0 text-xs font-bold text-[#2f4fc8]">
                      Clear all ({activeCount})
                    </button>
                  )}
                </div>
                <FilterRow label="Show" value={show} onChange={setShow} options={["All Profiles", "Immediate Joiners", "Verified Profiles"]} />
                <FilterRow label="Sort by" value={sortBy} onChange={setSortBy} options={SORTS} />
              </FilterBox>

              <FilterBox>
                <h5 className="m-0 text-sm font-bold uppercase text-[#3b4250]">Search within results</h5>
                <div className="mt-3 space-y-2 text-sm text-slate-500">
                  <label className="flex h-8 items-center gap-4 leading-none">
                    <input
                      type="radio"
                      name="searchScope"
                      value="full"
                      checked={searchScope === "full"}
                      onChange={(event) => setSearchScope(event.target.value)}
                      className="m-0 h-4 w-4 shrink-0 accent-[#7557ff]"
                    />
                    Full Profile
                  </label>
                  <label className="flex h-8 items-center gap-4 leading-none">
                    <input
                      type="radio"
                      name="searchScope"
                      value="skills"
                      checked={searchScope === "skills"}
                      onChange={(event) => setSearchScope(event.target.value)}
                      className="m-0 h-4 w-4 shrink-0 accent-[#7557ff]"
                    />
                    Profile title/key skills
                  </label>
                </div>
                <form onSubmit={handleSearchWithinResults} className="mt-4 space-y-3">
                  <input
                    value={anyKeyword}
                    onChange={(event) => setAnyKeyword(event.target.value)}
                    className="h-9 w-full border-0 border-b border-slate-300 bg-transparent p-0 text-sm outline-none placeholder:text-slate-500"
                    placeholder="Any keyword"
                  />
                  <input
                    value={allKeyword}
                    onChange={(event) => setAllKeyword(event.target.value)}
                    className="h-9 w-full border-0 border-b border-slate-300 bg-transparent p-0 text-sm outline-none placeholder:text-slate-500"
                    placeholder="All keyword"
                  />
                  <button type="submit" className="h-8 rounded bg-[#5b67c8] px-4 text-xs font-bold text-white">
                    Search
                  </button>
                </form>
              </FilterBox>

              <FilterBox>
                <h5 className="m-0 text-sm font-bold text-[#3b4250]">Filter with Key Skills</h5>
                <label className="mt-3 block">
                  <span className="text-xs font-bold text-[#4b5563]">Skill</span>
                  <select
                    value={skillPick}
                    onChange={(event) => setSkillPick(event.target.value)}
                    className="mt-1 h-9 w-full border-0 border-b border-slate-300 bg-transparent p-0 text-sm text-slate-600 outline-none"
                  >
                    <option value="">Select Skill</option>
                    {facets.skills.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="button" onClick={addSkill} className="mt-3 border-0 bg-transparent p-0 text-xs font-bold text-[#5b67c8]">
                  Add
                </button>
                {filters.skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {filters.skills.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleIn("skills", s)}
                        className="rounded-full border border-[#cbd8e5] bg-[#f8fbfd] px-3 py-1 text-xs font-semibold text-[#52606f]"
                      >
                        {s} ×
                      </button>
                    ))}
                  </div>
                )}
              </FilterBox>

              <FilterBox>
                <CheckboxFilter label="Immediate Joiners" checked={filters.immediate} onChange={() => setField("immediate", !filters.immediate)} />
                <CheckboxFilter label="Open to Contractual Job" checked={filters.contract} onChange={() => setField("contract", !filters.contract)} />
              </FilterBox>

              <FilterBox title="Experience">
                <RangeLine
                  options={EXP_OPTIONS}
                  minValue={filters.expMin}
                  maxValue={filters.expMax}
                  minLabel="0 Yr"
                  maxLabel="Any"
                  format={(v) => `${v} ${v === 1 ? "Yr" : "Yrs"}`}
                  onMin={(v) => setField("expMin", v)}
                  onMax={(v) => setField("expMax", v)}
                />
              </FilterBox>

              <FilterBox title="Salary">
                <RangeLine
                  options={SAL_OPTIONS}
                  minValue={filters.salMin}
                  maxValue={filters.salMax}
                  minLabel="0 Lacs"
                  maxLabel="Any"
                  format={(v) => `${v} Lacs`}
                  onMin={(v) => setField("salMin", v)}
                  onMax={(v) => setField("salMax", v)}
                />
              </FilterBox>

              <FilterBox title="Location">
                {facets.location.map(([name, n]) => (
                  <CheckboxFilter key={name} label={`${name} (${n})`} checked={filters.location.includes(name)} onChange={() => toggleIn("location", name)} />
                ))}
              </FilterBox>

              <FilterBox title="Industry">
                {facets.industry.map(([name, n]) => (
                  <CheckboxFilter key={name} label={`${name} (${n})`} checked={filters.industry.includes(name)} onChange={() => toggleIn("industry", name)} />
                ))}
              </FilterBox>

              <FilterBox title="Functional Area">
                {facets.functionalArea.map(([name, n]) => (
                  <CheckboxFilter
                    key={name}
                    label={`${name} (${n})`}
                    checked={filters.functionalArea.includes(name)}
                    onChange={() => toggleIn("functionalArea", name)}
                  />
                ))}
              </FilterBox>

              <FilterBox title="Degree">
                {facets.degree.map(([name, n]) => (
                  <CheckboxFilter key={name} label={`${name} (${n})`} checked={filters.degree.includes(name)} onChange={() => toggleIn("degree", name)} />
                ))}
              </FilterBox>

              <FilterBox title="Other">
                {OTHER_FILTERS.map((o) => (
                  <CheckboxFilter key={o.id} label={o.label} checked={filters.other.includes(o.id)} onChange={() => toggleIn("other", o.id)} />
                ))}
              </FilterBox>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-3 bg-white px-4 py-3 text-[#2f4fc8] shadow-sm">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
              {toolbarActions.map(([label, Icon]) => (
                <button key={label} type="button" className="inline-flex items-center gap-1 border-0 bg-transparent p-0 text-sm text-[#2f4fc8]">
                  <Icon fontSize="small" />
                  {label}
                </button>
              ))}
              <span className="ml-auto text-xs text-slate-500">
                Showing {filteredCandidates.length} of {dummyCandidates.length}
              </span>
            </div>

            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isPhoneRevealed={Boolean(revealedPhones[candidate.id])}
                  onRevealPhone={() => revealPhone(candidate.id)}
                  folders={folders}
                  onMoveToFolder={(folderId) => moveCandidateToFolder(candidate, folderId)}
                  onCreateFolder={() => window.dispatchEvent(new Event("xh-open-create-folder-modal"))}
                />
              ))}

              {filteredCandidates.length === 0 && (
                <div className="bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
                  No candidates matched this search.{" "}
                  <button type="button" onClick={clearAll} className="border-0 bg-transparent p-0 font-bold text-[#2f4fc8]">
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </section>
        </section>
      </div>
    </RecruiterPortalShell>
  );
}

function FilterBox({ children, title }) {
  return (
    <div className="rounded bg-white p-4 shadow-[0_5px_20px_rgba(15,23,42,0.08)]">
      {title && <h5 className="m-0 mb-3 text-sm font-bold text-[#3b4250]">{title}</h5>}
      {children}
    </div>
  );
}

function CandidateCard({ candidate, isPhoneRevealed, onRevealPhone, folders, onMoveToFolder, onCreateFolder }) {
  const [selectedFolder, setSelectedFolder] = useState("");
  const displayPhone = isPhoneRevealed ? candidate.phone : maskPhone(candidate.phone);
  const skills = [...candidate.skills, ...candidate.otherSkills];

  const handleFolderChange = (event) => {
    const folderId = event.target.value;
    setSelectedFolder("");

    if (folderId === "__create_folder__") {
      onCreateFolder();
      return;
    }

    if (folderId) onMoveToFolder(folderId);
  };

  return (
    <article className="bg-white shadow-sm">
      <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_230px]">
        <div className="min-w-0">
          <div className="flex items-start gap-3">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h5 className="m-0 text-xl font-bold leading-tight">
                  <Link href={`/recruiter/candidates/${candidate.id}`} className="text-[#2f4fc8] no-underline">
                    {candidate.name}
                  </Link>
                </h5>
                {candidate.immediateJoiner && (
                  <span className="rounded-full bg-[#edf2ff] px-3 py-1 text-xs font-bold text-[#1f4eea]">Immediate Joiner</span>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-[#566373]">
                <span>{candidate.experience}</span>
                <span>{candidate.salary}</span>
                <span>{candidate.location}</span>
              </div>
              <p className="m-0 mt-3 text-sm text-[#4d5c6e]">{candidate.current}</p>
              {candidate.education.map((item) => (
                <p key={item} className="m-0 mt-2 text-sm text-[#657383]">{item}</p>
              ))}
              <p className="m-0 mt-2 text-sm text-[#4d5c6e]">Pref. Location: {candidate.preferredLocations}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-[#cbd8e5] bg-[#f8fbfd] px-3 py-1 text-xs font-semibold text-[#687584]">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="m-0 mt-3 border-t border-slate-200 pt-2 text-sm text-[#566373]">
                <strong>May also know:</strong> {candidate.mayAlsoKnow}
              </p>
            </div>
          </div>
        </div>

        <aside className="rounded border border-slate-200 bg-white">
          <div className="flex h-[118px] items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full text-4xl font-bold text-white" style={{ backgroundColor: candidate.avatarColor }}>
              {candidate.avatar}
            </span>
          </div>
          <div className="bg-[#f6f6f6] px-4 py-4">
            <div className="text-right text-sm font-bold text-[#34a646]">{candidate.score}%</div>
            <div className="mt-1 h-2.5 rounded-full bg-gradient-to-r from-[#ff4f45] via-[#ffc53d] to-[#22c55e]" />
            <p className="m-0 mt-1 text-center text-xs text-[#738095]">Response Likelihood</p>
            <p className="m-0 mt-2 text-center text-sm font-bold text-[#35a348]">PROACTIVE</p>
          </div>
        </aside>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 bg-[#fbfbfd] px-5 py-3">
        <button type="button" className="inline-flex h-8 items-center gap-2 rounded border border-[#cfdef2] bg-white px-5 text-xs font-bold text-[#3349b9]">
          <Comment fontSize="small" />
          Comment
        </button>
        <div className="inline-flex h-8 min-w-[164px] items-center rounded border border-[#cfdef2] bg-white">
          <Select value={selectedFolder} displayEmpty variant="standard" disableUnderline onChange={handleFolderChange} fullWidth>
            <MenuItem value="" disabled>Move to Folder</MenuItem>
            {folders.length === 0 ? (
              <MenuItem value="__create_folder__">Create folder first</MenuItem>
            ) : (
              folders.map((folder) => <MenuItem key={folder.id} value={folder.id}>{folder.name}</MenuItem>)
            )}
            {folders.length > 0 && <MenuItem value="__create_folder__">Create folder</MenuItem>}
          </Select>
        </div>
        <BookmarkBorder className="text-slate-400" fontSize="small" />
        <MoreVert className="text-[#4a62c7]" fontSize="small" />
        <span className="ml-auto text-xs text-[#2f3a4a]">Profile Viewed</span>
        <button
          type="button"
          onClick={onRevealPhone}
          className="rounded border border-[#3b5bdb] bg-white px-3 py-2 text-sm font-bold text-black"
          aria-label={isPhoneRevealed ? "Phone number revealed" : "Reveal phone number"}
        >
          <Phone fontSize="small" className="mr-1 text-slate-600" />
          {displayPhone}
          <ContentCopy fontSize="small" className="ml-4 text-[#8795d9]" />
        </button>
        <div className="w-full text-right text-xs text-[#6b7684]">
          <span>Updated: {candidate.updated}</span>
          <span className="ml-4">Active: {candidate.active}</span>
        </div>
      </div>
      {isPhoneRevealed && (
        <div className="border-t border-slate-100 bg-[#eef1ff] px-5 py-3">
          <p className="m-0 text-xs font-bold text-[#4054b2]">Candidate looking for job?</p>
          <div className="mt-2 flex gap-3">
            <span className="rounded border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Yes</span>
            <span className="rounded border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-600">No</span>
          </div>
        </div>
      )}
    </article>
  );
}

function maskPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return phone;

  return `${digits.slice(-10, -8)}xxxxxx${digits.slice(-2)}`;
}

function FilterRow({ label, value, onChange, options }) {
  return (
    <div className="grid grid-cols-[88px_1fr] items-center gap-3 py-1.5">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 w-full border-0 border-b border-slate-300 bg-transparent p-0 text-sm text-slate-600 outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function CheckboxFilter({ label, checked, onChange }) {
  return (
    <label className="flex h-8 w-full min-w-0 cursor-pointer items-center gap-5 text-sm leading-none text-[#5d6978]">
      <span className="inline-flex h-8 w-4 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="m-0 h-3.5 w-3.5 rounded-[3px] border border-[#d7dce2] bg-white accent-[#5b67c8] shadow-[0_1px_3px_rgba(15,23,42,0.10)]"
        />
      </span>
      <span className="inline-flex h-8 min-w-0 flex-1 items-center overflow-hidden text-ellipsis whitespace-nowrap leading-none">{label}</span>
    </label>
  );
}

function RangeLine({ options, minValue, maxValue, minLabel, maxLabel, format, onMin, onMax }) {
  const selectClass = "mt-2 h-9 w-full border-0 border-b border-slate-300 bg-transparent p-0 text-sm text-[#66717f] outline-none";
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 text-sm text-[#66717f]">
      <label className="block">
        <span className="block text-xs text-[#7a8594]">Min</span>
        <select value={minValue} onChange={(event) => onMin(event.target.value)} className={selectClass}>
          <option value="">{minLabel}</option>
          {options.slice(1).map((o) => (
            <option key={o} value={o}>
              {format(o)}
            </option>
          ))}
        </select>
      </label>
      <span className="pb-2 text-lg text-[#66717f]">To</span>
      <label className="block">
        <span className="block text-xs text-[#7a8594]">Max</span>
        <select value={maxValue} onChange={(event) => onMax(event.target.value)} className={selectClass}>
          <option value="">{maxLabel}</option>
          {options.slice(1).map((o) => (
            <option key={o} value={o}>
              {format(o)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

// ⬇ keep your existing  function CandidateCard(...)  and everything below it