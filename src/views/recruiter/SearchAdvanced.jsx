import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
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
import {
  addCandidateNote,
  addCandidateToFolder,
  bookmarkCandidate,
  downloadCandidatesCsv,
  emailCandidates,
  getApiErrorMessage,
  getBlobErrorMessage,
  listSavedSearches,
  openCandidateResume,
  rememberSearch,
  saveCandidateSearch,
  savedSearchToQuery,
  searchCandidates,
  useRecruiterFolders,
} from "./recruiterApi";

const toolbarActions = [
  ["Save", FolderOpen],
  ["Excel", Description],
  ["Email", Email],
  ["Resume", FileDownload],
  ["IVR", Sms],
];

const otherFilters = [
  "Hide Profile without Comments",
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
  const [candidates, setCandidates] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const { folders } = useRecruiterFolders();
  const [selectedIds, setSelectedIds] = useState({});
  const [savedSearches, setSavedSearches] = useState([]);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({ subject: "", message: "" });
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    listSavedSearches()
      .then(setSavedSearches)
      .catch(() => setSavedSearches([]));
  }, []);

  const apiFilters = useMemo(() => {
    const q = router.query;
    const pick = (key) => (q[key] ? String(q[key]) : undefined);
    const gender = pick("gender");
    return {
      q: searchTerm || undefined,
      location: pick("location"),
      minExperience: pick("minExp"),
      maxExperience: pick("maxExp"),
      qualification: pick("highestQualification") || pick("course"),
      gender: gender === "Male" || gender === "Female" ? gender : undefined,
      hasResume: q.hideWithoutResume === "true" ? "true" : undefined,
      sortBy: "newest",
    };
  }, [router.query, searchTerm]);

  useEffect(() => {
    if (!router.isReady) return;
    let cancelled = false;
    setLoading(true);
    rememberSearch(apiFilters.q);
    searchCandidates({ ...apiFilters, page, limit: 10 })
      .then((result) => {
        if (cancelled) return;
        setCandidates(result.items);
        setSelectedIds({});
        setTotal(result.pagination.total);
        setTotalPages(result.pagination.totalPages);
        setError("");
      })
      .catch((err) => {
        if (cancelled) return;
        setCandidates([]);
        setTotal(0);
        setError(getApiErrorMessage(err, "Could not search candidates."));
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [apiFilters, page, router.isReady]);

  useEffect(() => {
    setPage(1);
  }, [apiFilters]);

  const filteredCandidates = candidates;
  const facet = (getter) => {
    const counts = {};
    candidates.forEach((candidate) => {
      const value = getter(candidate);
      if (value) counts[value] = (counts[value] || 0) + 1;
    });
    return Object.entries(counts).map(([value, count]) => `${value} (${count})`);
  };
  const locations = facet((candidate) => candidate.location);
  const industries = [];
  const functionalAreas = facet((candidate) => candidate.current.split(" | ")[0]);
  const education = facet((candidate) => (candidate.education[0] || "").split(" | ")[0]);

  const handleSearchWithinResults = (event) => {
    event.preventDefault();
    setSearchTerm([anyKeyword, allKeyword].filter(Boolean).join(" "));
  };

  const revealPhone = (candidateId) => {
    setRevealedPhones((current) => ({ ...current, [candidateId]: true }));
  };

  const moveCandidateToFolder = async (candidate, folderId) => {
    if (!folderId) return;
    try {
      await addCandidateToFolder(folderId, candidate.id);
      const folderName = folders.find((folder) => folder.id === folderId)?.name || "folder";
      setNotice(`${candidate.name} added to ${folderName}.`);
    } catch (err) {
      setNotice(getApiErrorMessage(err, "Could not add candidate to folder."));
    }
  };

  const selectedCandidates = candidates.filter((candidate) => selectedIds[candidate.id]);
  const allSelected = candidates.length > 0 && selectedCandidates.length === candidates.length;

  const toggleCandidate = (candidateId) =>
    setSelectedIds((current) => ({ ...current, [candidateId]: !current[candidateId] }));

  const toggleAll = () =>
    setSelectedIds(allSelected ? {} : Object.fromEntries(candidates.map((candidate) => [candidate.id, true])));

  const handleSaveSearch = async () => {
    const name = window.prompt("Name this search", searchTerm || router.query.location || "My search");
    if (!name || !name.trim()) return;
    try {
      const saved = await saveCandidateSearch(name.trim(), apiFilters);
      setSavedSearches((current) => [saved, ...current.filter((item) => item.id !== saved.id)]);
      setNotice(`Search "${saved.name}" saved.`);
    } catch (err) {
      setNotice(getApiErrorMessage(err, "Could not save this search."));
    }
  };

  const handleExport = async () => {
    setIsBusy(true);
    try {
      const count = await downloadCandidatesCsv(apiFilters, 500);
      setNotice(`Exported ${count} candidates to CSV (opens in Excel).`);
    } catch (err) {
      setNotice(await getBlobErrorMessage(err, "Could not export candidates."));
    } finally {
      setIsBusy(false);
    }
  };

  const handleDownloadResumes = () => {
    const withResume = selectedCandidates.filter((candidate) => candidate.hasResume).slice(0, 5);
    if (withResume.length === 0) {
      setNotice("Select candidates who have a resume to download.");
      return;
    }
    withResume.forEach((candidate) => openCandidateResume(candidate.id));
    if (selectedCandidates.length > withResume.length) {
      setNotice("Opened up to 5 resumes. Candidates without a visible resume were skipped.");
    }
  };

  const openEmailDialog = () => {
    if (selectedCandidates.length === 0) {
      setNotice("Select one or more candidates to email.");
      return;
    }
    setIsEmailOpen(true);
  };

  const sendEmail = async () => {
    setIsBusy(true);
    try {
      const result = await emailCandidates({
        candidateIds: selectedCandidates.map((candidate) => candidate.id),
        subject: emailForm.subject.trim(),
        message: emailForm.message.trim(),
      });
      setIsEmailOpen(false);
      setEmailForm({ subject: "", message: "" });
      const parts = [`Sent ${result.sent}`];
      if (result.devLogged) parts.push(`${result.devLogged} printed in the backend terminal (SMTP not configured)`);
      if (result.failed) parts.push(`${result.failed} failed`);
      if (result.skipped) parts.push(`${result.skipped} skipped (private profile)`);
      setNotice(`Email: ${parts.join(", ")}.`);
    } catch (err) {
      setNotice(getApiErrorMessage(err, "Could not send email."));
    } finally {
      setIsBusy(false);
    }
  };

  const toolbarHandlers = {
    Save: handleSaveSearch,
    Excel: handleExport,
    Email: openEmailDialog,
    Resume: handleDownloadResumes,
  };

  const saveCandidate = async (candidate) => {
    try {
      await bookmarkCandidate(candidate.id);
      setNotice(`${candidate.name} bookmarked.`);
    } catch (err) {
      setNotice(getApiErrorMessage(err, "Could not bookmark candidate."));
    }
  };

  return (
    <RecruiterPortalShell active="Find Candidates">
      <div className="min-h-screen bg-[#f7f7f8] text-[#2f3a4a]">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-[1220px] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h5 className="m-0 text-xl font-bold leading-tight text-[#263241]">{loading ? "Searching..." : `${total} Candidates`}</h5>
              <div className="mt-2 flex min-w-0 items-center gap-2 whitespace-nowrap text-sm text-slate-800">
                <span>for</span>
                <span className="text-black">{searchTerm || router.query.location || "All candidates"}</span>
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
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                aria-label="Select all candidates on this page"
                className="h-4 w-4 rounded border-slate-300"
              />
              {selectedCandidates.length > 0 && (
                <span className="text-xs font-semibold text-slate-600">{selectedCandidates.length} selected</span>
              )}
              {toolbarActions.map(([label, Icon]) => {
                const handler = toolbarHandlers[label];
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={handler}
                    disabled={!handler || isBusy}
                    title={handler ? undefined : "IVR calling is not available yet"}
                    className="inline-flex items-center gap-1 border-0 bg-transparent p-0 text-sm text-[#2f4fc8] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Icon fontSize="small" />
                    {label === "Save" ? "Save Search" : label}
                  </button>
                );
              })}
              {savedSearches.length > 0 && (
                <div className="ml-auto inline-flex h-8 min-w-[180px] items-center rounded border border-[#cfdef2] bg-white">
                  <Select
                    value=""
                    displayEmpty
                    variant="standard"
                    disableUnderline
                    onChange={(event) => {
                      const search = savedSearches.find((item) => item.id === event.target.value);
                      if (search) {
                        router.push({ pathname: router.pathname, query: savedSearchToQuery(search.filters) });
                      }
                    }}
                    renderValue={() => "Saved searches"}
                    sx={{ width: "100%", height: 30, fontSize: 12, fontWeight: 700, color: "#3349b9", "& .MuiSelect-select": { py: 0, px: 1.5 } }}
                  >
                    {savedSearches.map((search) => (
                      <MenuItem key={search.id} value={search.id} sx={{ fontSize: 13 }}>
                        {search.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
            </div>

            <Dialog open={isEmailOpen} onClose={() => !isBusy && setIsEmailOpen(false)} fullWidth maxWidth="sm">
              <DialogTitle sx={{ fontSize: 18, fontWeight: 700 }}>
                Email {selectedCandidates.length} candidate{selectedCandidates.length === 1 ? "" : "s"}
              </DialogTitle>
              <DialogContent>
                <TextField
                  label="Subject"
                  value={emailForm.subject}
                  onChange={(event) => setEmailForm((current) => ({ ...current, subject: event.target.value }))}
                  fullWidth
                  size="small"
                  margin="dense"
                  inputProps={{ maxLength: 150 }}
                />
                <TextField
                  label="Message"
                  value={emailForm.message}
                  onChange={(event) => setEmailForm((current) => ({ ...current, message: event.target.value }))}
                  fullWidth
                  multiline
                  minRows={6}
                  margin="dense"
                  inputProps={{ maxLength: 5000 }}
                  helperText="Candidates see your name and email so they can reply to you directly."
                />
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={() => setIsEmailOpen(false)} disabled={isBusy}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={sendEmail}
                  disabled={isBusy || emailForm.subject.trim().length < 3 || emailForm.message.trim().length < 10}
                >
                  {isBusy ? "Sending..." : "Send"}
                </Button>
              </DialogActions>
            </Dialog>

            {error && <div className="mb-3 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">{error}</div>}
            {notice && (
              <div className="mb-3 flex items-center justify-between bg-[#eef1ff] px-4 py-3 text-sm text-[#2f4fc8] shadow-sm">
                <span>{notice}</span>
                <button type="button" onClick={() => setNotice("")} className="border-0 bg-transparent text-[#2f4fc8]">
                  Dismiss
                </button>
              </div>
            )}

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
                  onSave={() => saveCandidate(candidate)}
                  isSelected={Boolean(selectedIds[candidate.id])}
                  onToggleSelect={() => toggleCandidate(candidate.id)}
                  onNotice={setNotice}
                />
              ))}

              {!loading && !error && filteredCandidates.length === 0 && (
                <div className="bg-white p-8 text-center text-sm text-slate-500 shadow-sm">No candidates matched this search.</div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 py-2 text-sm">
                  <button
                    type="button"
                    disabled={page <= 1 || loading}
                    onClick={() => setPage((current) => current - 1)}
                    className="h-9 border border-[#2f4fc8] bg-white px-4 font-semibold text-[#273ebf] disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="text-slate-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={page >= totalPages || loading}
                    onClick={() => setPage((current) => current + 1)}
                    className="h-9 border border-[#2f4fc8] bg-white px-4 font-semibold text-[#273ebf] disabled:opacity-40"
                  >
                    Next
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

function CandidateCard({
  candidate,
  isPhoneRevealed,
  onRevealPhone,
  folders,
  onMoveToFolder,
  onCreateFolder,
  onSave,
  isSelected,
  onToggleSelect,
  onNotice,
}) {
  const displayPhone = isPhoneRevealed ? candidate.phone : maskPhone(candidate.phone);
  const allSkills = [...candidate.skills, ...candidate.otherSkills];
  const visibleSkills = allSkills.slice(0, 6);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [isSavingComment, setIsSavingComment] = useState(false);

  const saveComment = async () => {
    if (!comment.trim()) return;
    setIsSavingComment(true);
    try {
      await addCandidateNote(candidate.id, comment.trim());
      setComment("");
      setIsCommentOpen(false);
      onNotice(`Comment saved on ${candidate.name}. See it on their profile.`);
    } catch (err) {
      onNotice(getApiErrorMessage(err, "Could not save comment."));
    } finally {
      setIsSavingComment(false);
    }
  };

  return (
    <article className="bg-white shadow-sm">
      <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_230px]">
        <div className="min-w-0">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={Boolean(isSelected)}
              onChange={onToggleSelect}
              aria-label={`Select ${candidate.name}`}
              className="mt-1 h-4 w-4 rounded border-slate-300"
            />
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
            <p className="m-0 text-center text-xs text-[#738095]">Updated {candidate.updated || "—"}</p>
            <p className={`m-0 mt-2 text-center text-sm font-bold ${candidate.openToWork ? "text-[#35a348]" : "text-slate-500"}`}>
              {candidate.openToWork ? "OPEN TO WORK" : "NOT LOOKING"}
            </p>
            {candidate.noticePeriod && (
              <p className="m-0 mt-1 text-center text-xs text-[#738095]">Notice: {candidate.noticePeriod}</p>
            )}
          </div>
        </aside>
      </div>

      <div className="grid gap-3 border-t border-slate-100 bg-[#fbfbfd] px-[20px] py-3 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCommentOpen((open) => !open)}
            className="inline-flex h-8 items-center gap-2 rounded border border-[#cfdef2] bg-white px-[20px] text-xs font-bold text-[#3349b9]"
          >
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
          <button type="button" onClick={onSave} aria-label={`Bookmark ${candidate.name}`} className="border-0 bg-transparent p-0">
            <BookmarkBorder className="text-slate-400 hover:text-[#2f4fc8]" fontSize="small" />
          </button>
          {candidate.hasResume && (
            <button
              type="button"
              onClick={() => openCandidateResume(candidate.id)}
              className="inline-flex h-8 items-center gap-1 rounded border border-[#cfdef2] bg-white px-3 text-xs font-bold text-[#3349b9]"
            >
              <FileDownload fontSize="small" />
              Resume
            </button>
          )}
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
      {isCommentOpen && (
        <div className="flex flex-col gap-2 border-t border-slate-100 bg-white px-[20px] py-3 sm:flex-row sm:items-start">
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            maxLength={2000}
            rows={2}
            placeholder="Private note about this candidate (only you can see it)"
            className="min-h-[56px] flex-1 rounded border border-[#cfdef2] px-3 py-2 text-sm outline-none focus:border-[#2f4fc8]"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={saveComment}
              disabled={!comment.trim() || isSavingComment}
              className="h-9 rounded border-0 bg-[#2f4fc8] px-4 text-xs font-bold text-white disabled:opacity-50"
            >
              {isSavingComment ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setIsCommentOpen(false)}
              className="h-9 rounded border border-[#cfdef2] bg-white px-4 text-xs font-bold text-[#3349b9]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function maskPhone(phone) {
  if (!phone) return "Hidden by candidate";
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
