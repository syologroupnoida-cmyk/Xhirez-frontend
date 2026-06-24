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

export const dummyCandidates = [
  {
    id: 1,
    name: "Prashant Lambha",
    highlight: "Prashant Lambha",
    immediateJoiner: true,
    experience: "1 Yrs 0 Month",
    salary: "Rs. 1.8 Lacs",
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
    avatarColor: "#91a2b5",
  },
  {
    id: 2,
    name: "Prashant Lmabha",
    highlight: "Prashant",
    immediateJoiner: false,
    experience: "1 Yrs 0 Month",
    salary: "Rs. 2 Lacs",
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
    avatarColor: "#d9a85c",
  },
];

const toolbarActions = [
  ["Save", FolderOpen],
  ["Excel", Description],
  ["Email", Email],
  ["Resume", FileDownload],
  ["IVR", Sms],
];

const locations = ["Ahmedabad (4)", "Surat (1)", "Other Uttar Pradesh (1)", "Delhi (1)", "Noida (1)"];
const industries = ["Others (4)", "Manufacturing (3)", "Medical / Healthcare (1)"];
const functionalAreas = ["Others (3)", "Housekeeping (1)", "Production (1)", "Quality (QA-QC) (1)", "SBU Head / CEO / Director (1)"];
const education = ["Others (5)", "Commerce (1)", "Other (1)", "Science (1)"];
const otherFilters = [
  "Hide Profile without Comments (8)",
  "Show Profile with following comment tag:-",
  "Others",
  "Hide Private Profiles",
  "Email Verified Only",
  "Mobile Verified Only",
  "Women Candidates Only",
  "Hide Profiles without Resume",
];

export default function SearchAdvanced() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(String(router.query.anyKeywords || router.query.allKeywords || ""));
  const [anyKeyword, setAnyKeyword] = useState(String(router.query.anyKeywords || ""));
  const [allKeyword, setAllKeyword] = useState(String(router.query.allKeywords || ""));
  const [searchScope, setSearchScope] = useState("full");
  const [revealedPhones, setRevealedPhones] = useState({});
  const foldersSnapshot = useSyncExternalStore(subscribeToFolderStore, getFolderSnapshot, getServerFolderSnapshot);
  const folders = useMemo(() => JSON.parse(foldersSnapshot), [foldersSnapshot]);

  const filteredCandidates = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return dummyCandidates;

    return dummyCandidates.filter((candidate) =>
      [candidate.name, candidate.current, candidate.preferredLocations, candidate.mayAlsoKnow, ...candidate.skills, ...candidate.otherSkills]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [searchTerm]);

  const handleSearchWithinResults = (event) => {
    event.preventDefault();
    setSearchTerm([anyKeyword, allKeyword].filter(Boolean).join(" "));
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

  return (
    <RecruiterPortalShell active="Find Candidates">
      <div className="min-h-screen bg-[#f7f7f8] text-[#2f3a4a]">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-[1220px] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h5 className="m-0 text-xl font-bold leading-tight text-[#263241]">8 Candidates</h5>
              <div className="mt-2 flex min-w-0 items-center gap-2 whitespace-nowrap text-sm text-slate-800">
                <span>for</span>
                <span className="text-black">Prashant Lambha</span>
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
                    if (label === "New Search") {
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
                <FilterRow label="Hide" value="Select" muted />
              </FilterBox>

              <FilterBox>
                <FilterRow label="Show" value="All Profiles" />
                <FilterRow label="Duration" value="6 Months" />
                <FilterRow label="Sort by" value="Relevance" />
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
                <FilterSelect label="Skill" value="Select Skill" />
                <FilterSelect label="Experience" value="Select Experience" />
                <button type="button" className="mt-3 border-0 bg-transparent p-0 text-xs font-bold text-[#5b67c8]">
                  Add
                </button>
              </FilterBox>

              <FilterBox>
                <CheckboxFilter label="Immediate Joiners" />
                <CheckboxFilter label="Open to Contractual Job" />
              </FilterBox>

              <FilterBox title="Experience">
                <RangeLine min="0 Yr" max="> 25 Yrs" />
              </FilterBox>

              <FilterBox title="Salary">
                <RangeLine min="< Rs 50,000 / Yr" max="> Rs 1 Crore / Yr" />
              </FilterBox>

              <FilterBox title="Location">
                {locations.map((item) => (
                  <CheckboxFilter key={item} label={item} />
                ))}
              </FilterBox>

              <FilterBox title="Industry">
                {industries.map((item) => (
                  <CheckboxFilter key={item} label={item} />
                ))}
              </FilterBox>

              <FilterBox title="Functional Area">
                {functionalAreas.map((item) => (
                  <CheckboxFilter key={item} label={item} />
                ))}
                <button type="button" className="mt-2 border-0 bg-transparent p-0 text-xs font-bold text-[#5b67c8]">
                  View all
                </button>
              </FilterBox>

              <FilterBox title="Degree">
                <CheckboxFilter label="Other (5)" />
              </FilterBox>

              <FilterBox title="Education">
                {education.map((item) => (
                  <CheckboxFilter key={item} label={item} />
                ))}
              </FilterBox>

              <FilterBox title="Other">
                <p className="m-0 mb-2 text-xs font-bold text-slate-600">Comments Filter</p>
                {otherFilters.map((item) => (
                  <CheckboxFilter key={item} label={item} />
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
                <div className="bg-white p-8 text-center text-sm text-slate-500 shadow-sm">No candidates matched this search.</div>
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

function FilterRow({ label, value, muted = false }) {
  return (
    <div className="grid grid-cols-[88px_1fr] items-center gap-3 py-1.5">
      <span className={`text-xs font-bold ${muted ? "text-slate-400" : "text-slate-500"}`}>{label}</span>
      <button type="button" className="flex h-8 items-center justify-between border-0 border-b border-slate-300 bg-transparent p-0 text-left text-sm text-slate-500">
        {value}
        <ExpandMore className="text-slate-400" fontSize="small" />
      </button>
    </div>
  );
}

function FilterSelect({ label, value }) {
  return (
    <label className="mt-3 block">
      <span className="text-xs font-bold text-[#4b5563]">{label}</span>
      <button type="button" className="mt-1 flex h-9 w-full items-center justify-between border-0 border-b border-slate-300 bg-transparent p-0 text-left text-sm text-slate-500">
        {value}
        <ExpandMore className="text-slate-400" fontSize="small" />
      </button>
    </label>
  );
}

function CheckboxFilter({ label }) {
  return (
    <label className="flex h-8 w-full min-w-0 items-center gap-5 text-sm leading-none text-[#9aa4b1]">
      <span className="inline-flex h-8 w-4 shrink-0 items-center justify-center">
        <input type="checkbox" className="m-0 h-3.5 w-3.5 rounded-[3px] border border-[#d7dce2] bg-white accent-[#5b67c8] shadow-[0_1px_3px_rgba(15,23,42,0.10)]" />
      </span>
      <span className="inline-flex h-8 min-w-0 flex-1 items-center overflow-hidden text-ellipsis whitespace-nowrap leading-none">{label}</span>
    </label>
  );
}

function RangeLine({ min, max }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 text-sm text-[#66717f]">
      <label className="block">
        <span className="block text-xs text-[#7a8594]">Min</span>
        <button type="button" className="mt-2 flex h-9 w-full items-center justify-between border-0 border-b border-slate-300 bg-transparent p-0 text-left text-sm text-[#66717f]">
          {min}
          <ExpandMore className="text-slate-400" fontSize="small" />
        </button>
      </label>
      <span className="pb-2 text-lg text-[#66717f]">To</span>
      <label className="block">
        <span className="block text-xs text-[#7a8594]">Max</span>
        <button type="button" className="mt-2 flex h-9 w-full items-center justify-between border-0 border-b border-slate-300 bg-transparent p-0 text-left text-sm text-[#66717f]">
          {max}
          <ExpandMore className="text-slate-400" fontSize="small" />
        </button>
      </label>
    </div>
  );
}

function CandidateCard({ candidate, isPhoneRevealed, onRevealPhone, folders, onMoveToFolder, onCreateFolder }) {
  const displayPhone = isPhoneRevealed ? candidate.phone : maskPhone(candidate.phone);
  const allSkills = [...candidate.skills, ...candidate.otherSkills];
  const visibleSkills = allSkills.slice(0, 6);
  const [selectedFolder, setSelectedFolder] = useState("");

  return (
    <article className="bg-white shadow-sm">
      <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_230px]">
        <div className="min-w-0">
          <div className="flex items-start gap-3">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h5 className="m-0 text-xl font-bold leading-tight text-black">
                  <Link
                    href={`/recruiter/candidates/${candidate.id}`}
                    className="text-[#2f4fc8] no-underline hover:text-[#2f4fc8]"
                    style={{ color: "#2f4fc8", textDecoration: "none" }}
                  >
                    <span>{candidate.highlight}</span>
                    {candidate.name.replace(candidate.highlight, "")}
                  </Link>
                </h5>
                {candidate.immediateJoiner && (
                  <span className="rounded-full bg-[#edf2ff] px-3 py-1 text-xs font-bold text-[#1f4eea]">Immediate Joiner</span>
                )}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#566373]">
                <MetaDot text={candidate.experience} />
                <MetaDot text={candidate.salary} />
                <MetaDot text={candidate.location} />
              </div>

              <InfoLine icon={BusinessCenter} text={`Current: ${candidate.current}`} />
              <InfoLine icon={School} text={candidate.education[0]} />
              <p className="m-0 ml-8 text-sm leading-5 text-[#657383]">{candidate.education[1]}</p>
              <InfoLine icon={Place} text={`Pref. Location: ${candidate.preferredLocations}`} />

              <div className="group mt-3 flex items-start gap-3">
                <AssignmentInd className="mt-1 text-[#99a2af]" fontSize="small" />
                <div className="flex min-w-0 flex-wrap gap-2">
                  {visibleSkills.map((skill) => (
                    <span key={skill} className="rounded-full border border-[#cbd8e5] bg-[#f8fbfd] px-3 py-1 text-xs font-semibold text-[#687584]">
                      {skill}
                    </span>
                  ))}
                  {allSkills.length > visibleSkills.length && (
                    <span className="rounded-full border border-[#cbd8e5] bg-[#f8fbfd] px-3 py-1 text-xs font-semibold text-[#687584] group-hover:hidden">
                      +{allSkills.length - visibleSkills.length} more
                    </span>
                  )}
                  {allSkills.slice(visibleSkills.length).map((skill) => (
                    <span
                      key={skill}
                      className="hidden rounded-full border border-[#cbd8e5] bg-[#f8fbfd] px-3 py-1 text-xs font-semibold text-[#687584] group-hover:inline-flex"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <p className="m-0 mt-3 border-t border-slate-200 pt-2 text-sm text-[#566373]">
                <strong>May also know:</strong> {candidate.mayAlsoKnow}
              </p>
            </div>
          </div>
        </div>

        <aside className="rounded border border-slate-200 bg-white">
          <div className="flex h-[118px] items-center justify-center">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full text-4xl font-bold text-white"
              style={{ backgroundColor: candidate.avatarColor }}
            >
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

      <div className="grid gap-3 border-t border-slate-100 bg-[#fbfbfd] px-[20px] py-3 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="inline-flex h-8 items-center gap-2 rounded border border-[#cfdef2] bg-white px-[20px] text-xs font-bold text-[#3349b9]">
            <Comment fontSize="small" />
            Comment
          </button>
          <div className="inline-flex h-8 min-w-[164px] items-center rounded border border-[#cfdef2] bg-white">
            <Select
              value={selectedFolder}
              displayEmpty
              variant="standard"
              disableUnderline
              onChange={(event) => {
                if (event.target.value === "__create_folder__") {
                  setSelectedFolder("");
                  onCreateFolder();
                  return;
                }

                onMoveToFolder(event.target.value);
                setSelectedFolder("");
              }}
              renderValue={(value) => {
                if (!value) return "Move to Folder";
                return folders.find((folder) => folder.id === value)?.name || "Move to Folder";
              }}
              sx={{
                height: 32,
                minWidth: 164,
                width: "100%",
                color: "#3349b9",
                fontSize: 12,
                fontWeight: 700,
                "& .MuiSelect-select": {
                  alignItems: "center",
                  display: "flex",
                  height: "32px !important",
                  minHeight: "32px !important",
                  padding: "0 30px 0 12px !important",
                  textAlign: "left",
                },
                "& .MuiSelect-icon": {
                  color: "#3349b9",
                  fontSize: 20,
                  right: 6,
                  top: "50%",
                  transform: "translateY(-50%)",
                },
              }}
            >
              <MenuItem value="" disabled>
                Move to Folder
              </MenuItem>
              {folders.length === 0 ? (
                <MenuItem value="__create_folder__" sx={{ color: "#2f4fc8", fontSize: 13, fontWeight: 700 }}>
                  Create folder first
                </MenuItem>
              ) : (
                folders.map((folder) => (
                  <MenuItem key={folder.id} value={folder.id}>
                    {folder.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </div>
          <BookmarkBorder className="text-slate-400" fontSize="small" />
          <MoreVert className="text-[#4a62c7]" fontSize="small" />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <span className="text-xs text-[#2f3a4a]">Profile Viewed</span>
          <button
            type="button"
            onClick={onRevealPhone}
            className="rounded border border-dashed border-[#3b5bdb] bg-white px-3 py-2 text-sm font-bold text-black"
            aria-label={isPhoneRevealed ? "Phone number revealed" : "Reveal phone number"}
          >
            <Phone fontSize="small" className="mr-1 text-slate-600" />
            {displayPhone}
            <ContentCopy fontSize="small" className="ml-4 text-[#8795d9]" />
          </button>
        </div>
        {isPhoneRevealed && (
          <div className="lg:col-start-2">
            <div className="rounded bg-[#eef1ff] px-4 py-3 shadow-sm">
              <p className="m-0 text-xs font-bold text-[#4054b2]">Candidate looking for job?</p>
              <div className="mt-2 flex gap-3">
                <span className="rounded border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Yes</span>
                <span className="rounded border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-600">No</span>
              </div>
            </div>
          </div>
        )}
        <div className="text-right text-xs text-[#6b7684] lg:col-start-2">
          <p className="m-0">Updated: {candidate.updated}</p>
          <p className="m-0 mt-1">Active: {candidate.active}</p>
        </div>
      </div>
    </article>
  );
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

function maskPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return phone;

  return `${digits.slice(-10, -8)}xxxxxx${digits.slice(-2)}`;
}

function MetaDot({ text }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-1.5 w-1.5 bg-slate-300" />
      {text}
    </span>
  );
}

function InfoLine({ icon: Icon, text }) {
  return (
    <p className="m-0 mt-3 flex items-start gap-3 text-sm leading-5 text-[#4d5c6e]">
      <Icon className="mt-0.5 text-[#99a2af]" fontSize="small" />
      <span>{text}</span>
    </p>
  );
}
