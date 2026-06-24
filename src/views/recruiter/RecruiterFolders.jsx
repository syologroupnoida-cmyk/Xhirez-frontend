import React, { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import RecruiterPortalShell from "./RecruiterPortalShell";

export default function RecruiterFolders() {
  const foldersSnapshot = useSyncExternalStore(subscribeToFolderStore, getFolderSnapshot, getServerFolderSnapshot);
  const folders = useMemo(() => JSON.parse(foldersSnapshot), [foldersSnapshot]);

  return (
    <RecruiterPortalShell active="Folders" hideFooter>
      <div className="mx-auto max-w-[1120px] px-4 py-8">
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-[10px] bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.08)] md:flex-row md:items-center">
          <div>
            <h5 className="m-0 text-lg font-semibold text-slate-900">Manage Folders</h5>
            <p className="m-0 mt-1 text-sm text-slate-500">View and open your saved candidate folders.</p>
          </div>
          <span className="inline-flex h-10 items-center rounded-[50px] bg-[#eef1ff] px-4 text-sm font-semibold text-[#4f5ed4]">
            {folders.length} folders
          </span>
        </div>

        {folders.length === 0 ? (
          <section className="rounded-[10px] bg-white px-6 py-14 text-center shadow-[0_12px_34px_rgba(15,23,42,0.08)]">
            <FontAwesomeIcon icon={faFolder} className="text-5xl text-slate-300" />
            <h5 className="m-0 mt-5 text-base font-semibold text-slate-900">No folders created yet</h5>
            <p className="mx-auto mt-2 max-w-[420px] text-sm text-slate-500">
              Use the Folders menu in the header and choose Create Folder to start organizing candidates.
            </p>
          </section>
        ) : (
          <div className="grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            {folders.map((folder) => (
              <div key={folder.id} className="relative flex flex-col items-center text-center">
                <Link href={`/recruiter/folders/${folder.id}`} className="xh-recruiter-folder-card flex flex-col items-center text-center no-underline">
                  <div className="flex h-20 w-24 items-center justify-center rounded-[10px] bg-[#eef1ff] text-[#4f5ed4] transition hover:bg-[#e4e8ff]">
                    <FontAwesomeIcon icon={faFolder} className="text-5xl" />
                  </div>
                  <h5 className="m-0 mt-2 max-w-[120px] truncate text-sm font-semibold text-slate-800">{folder.name}</h5>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </RecruiterPortalShell>
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
