import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload, faFolderOpen, faTrashCan, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import RecruiterPortalShell from "./RecruiterPortalShell";
import {
  deleteFolder,
  getApiErrorMessage,
  listFolderCandidates,
  openCandidateResume,
  removeCandidateFromFolder,
  useRecruiterFolders,
} from "./recruiterApi";

export default function RecruiterFolderDetail() {
  const router = useRouter();
  const [isDeleteFolderOpen, setIsDeleteFolderOpen] = useState(false);
  const folderId = router.query.folderId ? String(router.query.folderId) : "";
  const { folders, loading: foldersLoading } = useRecruiterFolders();
  const folderMeta = folders.find((item) => item.id === folderId) || null;
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");

  const loadCandidates = useCallback(async () => {
    if (!folderId) return;
    try {
      const result = await listFolderCandidates(folderId);
      setCandidates(result.items);
      setError("");
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not load folder candidates."));
    }
  }, [folderId]);

  useEffect(() => {
    loadCandidates();
  }, [loadCandidates]);

  const folder = folderMeta ? { ...folderMeta, candidates } : null;

  const deleteCurrentFolder = async () => {
    if (!folder) return;
    try {
      await deleteFolder(folder.id);
      router.push("/recruiter/folders");
    } catch (err) {
      setIsDeleteFolderOpen(false);
      setError(getApiErrorMessage(err, "Could not delete folder."));
    }
  };

  const deleteCandidateFromFolder = async (candidateId) => {
    if (!folder) return;
    try {
      await removeCandidateFromFolder(folder.id, candidateId);
      setCandidates((current) => current.filter((candidate) => String(candidate.id) !== String(candidateId)));
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not remove candidate."));
    }
  };

  return (
    <RecruiterPortalShell active="Folders" hideFooter>
      <div className="mx-auto max-w-[1120px] px-4 py-8">
        <Link href="/recruiter/folders" className="xh-recruiter-folder-link mb-4 inline-flex items-center gap-2 text-sm font-semibold">
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          Back to folders
        </Link>

        {error && (
          <p className="mb-4 rounded-[10px] bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {router.isReady && !foldersLoading && !folder ? (
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
                        <button
                          type="button"
                          onClick={() => openCandidateResume(candidate.id)}
                          className="mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-[50px] border-0 bg-[#eef1ff] px-3 text-xs font-semibold text-[#4f5ed4]"
                        >
                          <FontAwesomeIcon icon={faDownload} className="text-xs" />
                          Resume
                        </button>
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
