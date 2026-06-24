import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChevronDown,
  faCircleCheck,
  faCirclePlay,
  faEnvelope,
  faPhone,
  faSearch,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const primaryNavItems = [{ label: "Home", href: "/recruiter/dashboard" }];

const secondaryNavItems = [{ label: "Jobs", href: "/job-post" }];

const candidateMenuItems = [
  { label: "Advanced Search", href: "/recruiter/advanced-search" },
  { label: "Recent Searches", href: "/recruiter/advanced-search#recent-searches" },
  { label: "Saved Searches", href: "/recruiter/advanced-search#saved-searches" },
];

const folderMenuItems = [
  { label: "Create Folder", action: "create" },
  { label: "Manage Folders", href: "/recruiter/folders" },
  { label: "Reported Candidate", href: "/recruiter/dashboard#reported-candidate" },
  { label: "Bookmarked Candidates", href: "/recruiter/dashboard#bookmarked-candidates" },
  { label: "Download Branded Resume", href: "/recruiter/dashboard#download-branded-resume" },
];

const navLinkClass =
  "xh-recruiter-header-nav-link inline-flex h-16 items-center gap-1 whitespace-nowrap border-0 bg-transparent px-3 text-[16px] font-normal text-white no-underline transition hover:text-white";

const activeNavClass = "text-white";

export default function RecruiterPortalShell({ children, active = "Home", hideFooter = false }) {
  const router = useRouter();
  const [isCandidateMenuOpen, setIsCandidateMenuOpen] = useState(false);
  const [isFolderMenuOpen, setIsFolderMenuOpen] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isFolderSuccessOpen, setIsFolderSuccessOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [createdFolderName, setCreatedFolderName] = useState("");
  const candidateMenuRef = useRef(null);
  const folderMenuRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!candidateMenuRef.current?.contains(event.target)) {
        setIsCandidateMenuOpen(false);
      }
      if (!folderMenuRef.current?.contains(event.target)) {
        setIsFolderMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const openCreateFolderModal = () => {
    setIsFolderMenuOpen(false);
    setFolderName("");
    setIsCreateFolderOpen(true);
  };

  useEffect(() => {
    window.addEventListener("xh-open-create-folder-modal", openCreateFolderModal);
    return () => window.removeEventListener("xh-open-create-folder-modal", openCreateFolderModal);
  }, []);

  const createFolder = () => {
    const trimmedName = folderName.trim();
    if (!trimmedName) return;

    const existingFolders = JSON.parse(window.localStorage.getItem("xh-recruiter-folders") || "[]");
    const newFolder = {
      id: `${Date.now()}`,
      name: trimmedName,
      createdAt: new Date().toISOString(),
      candidates: [],
    };

    window.localStorage.setItem("xh-recruiter-folders", JSON.stringify([newFolder, ...existingFolders]));
    window.dispatchEvent(new Event("xh-recruiter-folders-updated"));
    setIsCreateFolderOpen(false);
    setCreatedFolderName(trimmedName);
    setFolderName("");
    setIsFolderSuccessOpen(true);
  };

  const closeFolderSuccess = () => {
    setIsFolderSuccessOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] font-sans text-[#1f2937]">
      <header className="sticky top-0 z-50 bg-[#061a3a] shadow-sm">
        <div className="container mx-auto flex h-16 max-w-[1120px] items-center gap-5 px-4">
          <Link href="/recruiter/dashboard" className="flex h-16 w-[126px] items-center justify-center px-1">
            <Image
              src="/assets/images/logo/Xhirez-Logo.png"
              alt="Xhirez"
              width={170}
              height={56}
              className="max-h-12 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center gap-1 md:flex">
            {primaryNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`${navLinkClass} ${active === item.label ? activeNavClass : ""}`}
              >
                {item.label}
              </Link>
            ))}

            <div className="relative" ref={candidateMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setIsCandidateMenuOpen((current) => !current);
                  setIsFolderMenuOpen(false);
                }}
                className={`${navLinkClass} ${active === "Find Candidates" ? activeNavClass : ""}`}
                aria-expanded={isCandidateMenuOpen}
              >
                Find Candidates
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-[9px] text-white transition-transform ${isCandidateMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isCandidateMenuOpen && (
                <div className="absolute left-0 top-full z-[70] w-56 rounded-b-[4px] border border-slate-200 bg-white py-3 shadow-[0_12px_28px_rgba(15,23,42,0.18)]">
                  <div className="absolute left-6 top-[-6px] h-3 w-3 rotate-45 border-l border-t border-slate-200 bg-white" />
                  {candidateMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsCandidateMenuOpen(false)}
                      className="xh-recruiter-folder-link block px-3 py-1.5 text-[14px] font-normal leading-6 no-underline transition hover:bg-[#f4f6ff]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {secondaryNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`${navLinkClass} ${active === item.label ? activeNavClass : ""}`}
              >
                {item.label}
              </Link>
            ))}

            <div className="relative" ref={folderMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setIsFolderMenuOpen((current) => !current);
                  setIsCandidateMenuOpen(false);
                }}
                className={`${navLinkClass} ${active === "Folders" || isFolderMenuOpen ? "bg-white/10 text-white" : ""}`}
                aria-expanded={isFolderMenuOpen}
              >
                Folders
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-[9px] text-white transition-transform ${isFolderMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isFolderMenuOpen && (
                <div className="absolute left-0 top-full z-[70] w-56 rounded-b-[4px] border border-slate-200 bg-white py-3 shadow-[0_12px_28px_rgba(15,23,42,0.18)]">
                  <div className="absolute left-6 top-[-6px] h-3 w-3 rotate-45 border-l border-t border-slate-200 bg-white" />
                  {folderMenuItems.map((item) =>
                    item.action === "create" ? (
                      <button
                        key={item.label}
                        type="button"
                        onClick={openCreateFolderModal}
                        className="xh-recruiter-folder-link block w-full border-0 bg-transparent px-3 py-1.5 text-left text-[14px] font-normal leading-6 transition hover:bg-[#f4f6ff]"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsFolderMenuOpen(false)}
                        className="xh-recruiter-folder-link block px-3 py-1.5 text-[14px] font-normal leading-6 no-underline transition hover:bg-[#f4f6ff]"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button type="button" className="flex aspect-square h-10 w-10 items-center justify-center rounded-[100px] border-2 border-white bg-transparent text-white">
              <FontAwesomeIcon icon={faCirclePlay} className="text-xs" />
            </button>
            <button type="button" className="flex aspect-square h-10 w-10 items-center justify-center rounded-[100px] border-2 border-white bg-transparent text-white">
              <FontAwesomeIcon icon={faBell} className="text-xs" />
            </button>
            <button type="button" className="flex aspect-square h-10 w-10 items-center justify-center rounded-[100px] border-2 border-white bg-transparent text-white">
              <FontAwesomeIcon icon={faUser} className="text-xs" />
            </button>
          </div>
        </div>
      </header>

      <Dialog
        open={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            width: 360,
            borderRadius: "10px",
            boxShadow: "0 18px 44px rgba(15, 23, 42, 0.24)",
          },
        }}
      >
        <DialogTitle sx={{ alignItems: "center", display: "flex", fontSize: 16, fontWeight: 700, justifyContent: "space-between", pb: 1.5 }}>
          Create Folder
          <IconButton
            aria-label="Close create folder"
            onClick={() => setIsCreateFolderOpen(false)}
            size="small"
            sx={{ border: "1px solid #e2e8f0", height: 30, width: 30 }}
          >
            <FontAwesomeIcon icon={faTimes} className="text-[11px]" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <TextField
            value={folderName}
            onChange={(event) => setFolderName(event.target.value)}
            autoFocus
            fullWidth
            required
            label="Folder name"
            placeholder="Enter folder name"
            size="small"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                createFolder();
              }
            }}
            sx={{
              mt: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                fontSize: 14,
              },
              "& .MuiInputLabel-root": {
                fontSize: 13,
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: 13,
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ gap: 1, px: 3, pb: 2.5, pt: 1 }}>
          <Button
            type="button"
            onClick={() => setIsCreateFolderOpen(false)}
            variant="outlined"
            size="small"
            sx={{ borderColor: "#cbd5e1", borderRadius: "10px", color: "#475569", px: 2.2, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={createFolder}
            disabled={!folderName.trim()}
            variant="contained"
            size="small"
            sx={{ backgroundColor: "#5b67c8", borderRadius: "10px", px: 2.4, textTransform: "none", "&:hover": { backgroundColor: "#4f5ab5" } }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isFolderSuccessOpen}
        onClose={closeFolderSuccess}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            width: 340,
            borderRadius: "10px",
            p: 1,
            textAlign: "center",
          },
        }}
      >
        <DialogContent sx={{ px: 3, py: 3, textAlign: "center" }}>
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#e9f8ef] text-[#22a447]">
            <FontAwesomeIcon icon={faCircleCheck} className="text-xl" />
          </span>
          <h5 className="m-0 text-center text-base font-semibold text-slate-900">Folder created successfully</h5>
          <p className="m-0 mt-2 text-center text-sm text-slate-500">
            {createdFolderName ? `"${createdFolderName}" is ready to use.` : "Your folder is ready to use."}
          </p>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", px: 3, pb: 2.5 }}>
          <Button
            type="button"
            onClick={closeFolderSuccess}
            variant="contained"
            size="small"
            sx={{ backgroundColor: "#5b67c8", borderRadius: "10px", px: 3, textTransform: "none", "&:hover": { backgroundColor: "#4f5ab5" } }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <main>{children}</main>

      {!hideFooter && (
        <footer className="container mx-auto mt-16 max-w-[1000px] border-t border-slate-200 px-4 py-8 text-xs text-slate-500">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap gap-6">
              {["Help Center", "About Us", "Fraud Alert", "Terms & Conditions", "Privacy Policy"].map((item) => (
                <Link key={item} href="#" className="text-slate-500 no-underline hover:text-[#5b67c8]">
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-5 text-[#4f5ed4]">
              <span className="inline-flex items-center gap-1">
                <FontAwesomeIcon icon={faPhone} /> 8010062222
              </span>
              <span className="inline-flex items-center gap-1">
                <FontAwesomeIcon icon={faEnvelope} /> recruiterservices@xhirez.com
              </span>
            </div>
          </div>
          <p className="m-0 mt-5 text-right text-slate-500">Xhirez @2026</p>
        </footer>
      )}
    </div>
  );
}

export function SearchInput({ placeholder = "Search" }) {
  return (
    <label className="flex h-10 w-full items-center gap-2 rounded border border-slate-200 bg-white px-3 text-sm shadow-sm">
      <FontAwesomeIcon icon={faSearch} className="text-slate-400" />
      <input className="min-w-0 flex-1 border-0 bg-transparent outline-none" placeholder={placeholder} />
    </label>
  );
}
