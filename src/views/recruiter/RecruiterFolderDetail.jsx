import React, { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload, faFolderOpen, faTrashCan, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import RecruiterPortalShell from "./RecruiterPortalShell";

export default function RecruiterFolderDetail() {
  const router = useRouter();
  const [isDeleteFolderOpen, setIsDeleteFolderOpen] = useState(false);
  const foldersSnapshot = useSyncExternalStore(subscribeToFolderStore, getFolderSnapshot, getServerFolderSnapshot);
  const folders = useMemo(() => JSON.parse(foldersSnapshot), [foldersSnapshot]);
  const folder = useMemo(
    () => folders.find((item) => item.id === router.query.folderId) || null,
    [folders, router.query.folderId]
  );

  const deleteCurrentFolder = () => {
    if (!folder) return;

    const nextFolders = folders.filter((item) => item.id !== folder.id);
    window.localStorage.setItem("xh-recruiter-folders", JSON.stringify(nextFolders));
    window.dispatchEvent(new Event("xh-recruiter-folders-updated"));
    router.push("/recruiter/folders");
  };

  const deleteCandidateFromFolder = (candidateId) => {
    if (!folder) return;

    const nextFolders = folders.map((item) =>
      item.id === folder.id
        ? { ...item, candidates: (item.candidates || []).filter((candidate) => String(candidate.id) !== String(candidateId)) }
        : item
    );
    window.localStorage.setItem("xh-recruiter-folders", JSON.stringify(nextFolders));
    window.dispatchEvent(new Event("xh-recruiter-folders-updated"));
  };

  return (
    <RecruiterPortalShell active="Folders" hideFooter>
      <div className="mx-auto max-w-[1120px] px-4 py-8">
        <Link href="/recruiter/folders" className="xh-recruiter-folder-link mb-4 inline-flex items-center gap-2 text-sm font-semibold">
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          Back to folders
        </Link>

        {router.isReady && !folder ? (
          <section className="rounded-[10px] bg-white px-6 py-14 text-center shadow-[0_12px_34px_rgba(15,23,42,0.08)]">
            <FontAwesomeIcon icon={faFolderOpen} className="text-5xl text-slate-300" />
            <h5 className="m-0 mt-5 text-base font-semibold text-slate-900">Folder not found</h5>
            <p className="m-0 mt-2 text-sm text-slate-500">This folder may have been removed.</p>
          </section>
        ) : (
          folder && (
            <>
              <section className="rounded-[10px] bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.08)]">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eef1ff] text-[#4f5ed4]">
                      <FontAwesomeIcon icon={faFolderOpen} className="text-xl" />
                    </span>
                    <div>
                      <h5 className="m-0 text-lg font-semibold text-slate-900">{folder.name}</h5>
                      <p className="m-0 mt-1 text-sm text-slate-500">{folder.candidates?.length || 0} candidates saved in this folder</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsDeleteFolderOpen(true)}
                      className="inline-flex h-10 items-center justify-center rounded-[50px] border-0 bg-[#dc2626] px-5 text-sm font-semibold text-white hover:bg-[#b91c1c]"
                    >
                      Delete Folder
                    </button>
                    <Link
                    href="/recruiter/search/advanced"
                      className="inline-flex h-10 items-center justify-center rounded-[50px] bg-[#5b67c8] px-5 text-sm font-semibold text-white no-underline hover:text-white"
                      style={{ color: "#ffffff", textDecoration: "none" }}
                    >
                      Add Candidates
                    </Link>
                  </div>
                </div>
              </section>

              {(folder.candidates || []).length === 0 ? (
                <section className="mt-5 rounded-[10px] bg-white px-6 py-14 text-center shadow-[0_12px_34px_rgba(15,23,42,0.08)]">
                  <FontAwesomeIcon icon={faUserPlus} className="text-5xl text-slate-300" />
                  <h5 className="m-0 mt-5 text-base font-semibold text-slate-900">No candidates in this folder</h5>
                  <p className="mx-auto mt-2 max-w-[430px] text-sm text-slate-500">
                    Open candidate search results and add profiles here when you are ready to shortlist them.
                  </p>
                </section>
              ) : (
                <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                  {folder.candidates.map((candidate) => (
                    <article key={candidate.id} className="relative rounded-[10px] bg-white p-4 text-center shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
                      <button
                        type="button"
                        onClick={() => deleteCandidateFromFolder(candidate.id)}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-red-100 bg-white text-red-500 shadow-sm hover:bg-red-50"
                        aria-label={`Delete ${candidate.name} resume`}
                      >
                        <FontAwesomeIcon icon={faTrashCan} className="text-[11px]" />
                      </button>
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef1ff] text-lg font-bold text-[#4f5ed4]">
                        {candidate.avatar || candidate.name.charAt(0)}
                      </div>
                      <Link
                        href={`/recruiter/candidates/${candidate.id}`}
                        className="mt-3 block truncate text-sm font-semibold text-[#2f4fc8] no-underline"
                        style={{ color: "#2f4fc8", textDecoration: "none" }}
                      >
                        {candidate.name}
                      </Link>
                      <p className="m-0 mt-1 line-clamp-2 min-h-[34px] text-xs leading-4 text-slate-500">{candidate.current}</p>
                      <p className="m-0 mt-2 truncate text-[11px] text-slate-400">{candidate.location}</p>
                        <a
                          href={buildResumeDataUri(candidate)}
                          download={candidate.resumeFileName || `${candidate.name.replace(/\s+/g, "-").toLowerCase()}-resume.txt`}
                          className="mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-[50px] bg-[#eef1ff] px-3 text-xs font-semibold text-[#4f5ed4] no-underline"
                        >
                          <FontAwesomeIcon icon={faDownload} className="text-xs" />
                          Resume
                        </a>
                    </article>
                  ))}
                </section>
              )}
            </>
          )
        )}
      </div>

      <Dialog open={isDeleteFolderOpen} onClose={() => setIsDeleteFolderOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontSize: 16, fontWeight: 700 }}>Delete folder?</DialogTitle>
        <DialogContent sx={{ color: "#64748b", fontSize: 14 }}>
          Sure, you want to delete this folder?
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            type="button"
            onClick={() => setIsDeleteFolderOpen(false)}
            variant="outlined"
            size="small"
            sx={{ borderColor: "#cbd5e1", borderRadius: "10px", color: "#475569", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={deleteCurrentFolder}
            variant="contained"
            size="small"
            sx={{ backgroundColor: "#dc2626", borderRadius: "10px", textTransform: "none", "&:hover": { backgroundColor: "#b91c1c" } }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </RecruiterPortalShell>
  );
}

function buildResumeDataUri(candidate) {
  const resumeText = [
    `Name: ${candidate.name}`,
    `Current: ${candidate.current}`,
    `Experience: ${candidate.experience}`,
    `Salary: ${candidate.salary}`,
    `Location: ${candidate.location}`,
    `Preferred Locations: ${candidate.preferredLocations}`,
    `Education: ${(candidate.education || []).join("; ")}`,
    `Skills: ${[...(candidate.skills || []), ...(candidate.otherSkills || [])].join(", ")}`,
    `Phone: ${candidate.phone}`,
  ].join("\n");

  return `data:text/plain;charset=utf-8,${encodeURIComponent(resumeText)}`;
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
