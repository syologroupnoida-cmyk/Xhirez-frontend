// ─── Recruiter Portal API ────────────────────────────────────────────
// Single place where the recruiter portal talks to the backend
// (/api/v1/recruiter/*). Components use these helpers instead of
// localStorage or dummy data.
// ─────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useState } from "react";
import axios from "../apiClient";
import { API_BASE_URL } from "../apiConfig";

const V1 = `${API_BASE_URL}api/v1`;
export const FOLDERS_UPDATED_EVENT = "xh-recruiter-folders-updated";

const unwrap = (response) => response?.data?.data;

export function getApiErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  return error?.response?.data?.message || error?.message || fallback;
}

// ─── Candidates ──────────────────────────────────────────────────────

export async function searchCandidates(params = {}) {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );
  const data = unwrap(await axios.get(`${V1}/recruiter/candidates/search`, { params: clean }));
  return {
    items: (data?.items || []).map(toUiCandidate),
    pagination: data?.pagination || { total: 0, page: 1, limit: 10, totalPages: 1 },
  };
}

export async function getCandidate(candidateId) {
  const data = unwrap(await axios.get(`${V1}/recruiter/candidates/${candidateId}`));
  return toUiCandidate(data?.candidate);
}

export async function trackCandidateView(candidateId) {
  try {
    await axios.post(`${V1}/recruiter/candidates/${candidateId}/view`, {});
  } catch {
    // Tracking must never block the page.
  }
}

export async function getCandidateResumeUrl(candidateId) {
  const data = unwrap(await axios.get(`${V1}/recruiter/candidates/${candidateId}/resume`));
  return data?.resume?.fileUrl || data?.fileUrl || null;
}

export async function openCandidateResume(candidateId) {
  try {
    const url = await getCandidateResumeUrl(candidateId);
    if (!url) throw new Error("Resume not available for this candidate.");
    window.open(url, "_blank", "noopener,noreferrer");
  } catch (error) {
    window.alert(getApiErrorMessage(error, "Resume not available for this candidate."));
  }
}

export async function getSimilarCandidates(candidateId) {
  try {
    const data = unwrap(
      await axios.get(`${API_BASE_URL}HR/getSimilarUserList`, { params: { id: candidateId } })
    );
    const list = Array.isArray(data) ? data : data?.items || [];
    // Legacy shape: { id, full_name, job_profile, profile_image }
    return list.map((row) =>
      toUiCandidate({
        id: row.id,
        fullName: row.full_name || row.fullName,
        seekerProfile: { profileHeadline: row.job_profile, profileImage: row.profile_image },
      })
    );
  } catch {
    return [];
  }
}

export async function getRecruiterUsage() {
  return unwrap(await axios.get(`${V1}/recruiter/candidates/dashboard`));
}

export async function getRecruiterJobsDashboard() {
  return unwrap(await axios.get(`${V1}/recruiter/jobs/dashboard`));
}

export async function getRecruiterApplicationsDashboard() {
  return unwrap(await axios.get(`${V1}/recruiter/applications/dashboard`));
}

// ─── Bookmarks ───────────────────────────────────────────────────────

export async function listBookmarks(params = {}) {
  const data = unwrap(await axios.get(`${V1}/recruiter/candidates/bookmarks`, { params }));
  return {
    items: (data?.items || []).map((row) => ({ ...toUiCandidate(row.candidate), savedAt: row.savedAt })),
    pagination: data?.pagination,
  };
}

export async function bookmarkCandidate(candidateId) {
  return unwrap(await axios.post(`${V1}/recruiter/candidates/bookmarks`, { candidateId }));
}

export async function removeBookmark(candidateId) {
  return unwrap(await axios.delete(`${V1}/recruiter/candidates/bookmarks/${candidateId}`));
}

// ─── Folders ─────────────────────────────────────────────────────────

const toUiFolder = (folder) => ({
  id: folder.id,
  name: folder.folderName,
  createdAt: folder.createdAt,
  candidateCount: folder._count?.candidates ?? 0,
});

function notifyFoldersChanged() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(FOLDERS_UPDATED_EVENT));
}

export async function listFolders() {
  const data = unwrap(await axios.get(`${V1}/recruiter/candidates/folders`));
  return (data?.folders || []).map(toUiFolder);
}

export async function createFolder(folderName) {
  const data = unwrap(await axios.post(`${V1}/recruiter/candidates/folders`, { folderName }));
  notifyFoldersChanged();
  return toUiFolder(data.folder);
}

export async function renameFolder(folderId, folderName) {
  const data = unwrap(await axios.patch(`${V1}/recruiter/candidates/folders/${folderId}`, { folderName }));
  notifyFoldersChanged();
  return toUiFolder(data.folder);
}

export async function deleteFolder(folderId) {
  await axios.delete(`${V1}/recruiter/candidates/folders/${folderId}`);
  notifyFoldersChanged();
}

export async function listFolderCandidates(folderId, params = { page: 1, limit: 50 }) {
  const data = unwrap(await axios.get(`${V1}/recruiter/candidates/folders/${folderId}/candidates`, { params }));
  return {
    items: (data?.items || []).map((row) => ({ ...toUiCandidate(row.candidate), addedAt: row.addedAt })),
    pagination: data?.pagination,
  };
}

export async function addCandidateToFolder(folderId, candidateId) {
  await axios.post(`${V1}/recruiter/candidates/folders/${folderId}/candidates`, { candidateId });
  notifyFoldersChanged();
}

export async function removeCandidateFromFolder(folderId, candidateId) {
  await axios.delete(`${V1}/recruiter/candidates/folders/${folderId}/candidates/${candidateId}`);
  notifyFoldersChanged();
}

/** Live list of the recruiter's folders; refetches whenever any folder changes. */
export function useRecruiterFolders() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setFolders(await listFolders());
      setError("");
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not load folders."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(FOLDERS_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(FOLDERS_UPDATED_EVENT, refresh);
  }, [refresh]);

  return { folders, loading, error, refresh };
}

// ─── Mapping backend candidate → portal card shape ───────────────────

const AVATAR_COLORS = ["#91a2b5", "#d9a85c", "#7c9cbf", "#8fb98a", "#c48bb5", "#e08e6d"];

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function formatExperience(total) {
  if (total === null || total === undefined || total === "") return "Fresher";
  const text = String(total).trim();
  return /[a-z]/i.test(text) ? text : `${text} Yrs`;
}

function formatSalary(value) {
  if (!value) return "Not disclosed";
  const text = String(value).trim();
  return /rs|₹|lac|lpa/i.test(text) ? text : `Rs. ${text}`;
}

function formatPeriod(start, end, current) {
  const to = current ? "Present" : end || "";
  return [start, to].filter(Boolean).join(" - ");
}

export function toUiCandidate(c) {
  if (!c) return null;
  const sp = c.seekerProfile || {};
  const skills = sp.keySkills || [];
  const name = c.fullName || "Candidate";
  const designation = [sp.currentDesignation, sp.currentCompany].filter(Boolean).join(" | ");
  const educations = (c.educations || []).map((e) =>
    [[e.qualification, e.course, e.specialization].filter(Boolean).join(" - "), e.university, e.graduationYear || e.endDate]
      .filter(Boolean)
      .join(" | ")
  );
  if (educations.length === 0 && (sp.highestQualification || sp.course)) {
    educations.push(
      [[sp.highestQualification, sp.course].filter(Boolean).join(" - "), sp.university, sp.graduationYear]
        .filter(Boolean)
        .join(" | ")
    );
  }
  const colorIndex = [...String(c.id || name)].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % AVATAR_COLORS.length;

  return {
    id: c.id,
    name,
    highlight: name,
    email: c.email || "",
    phone: c.mobile || "",
    isEmailVerified: Boolean(c.isEmailVerified),
    immediateJoiner: /immediate|0|15 days/i.test(sp.noticePeriod || ""),
    noticePeriod: sp.noticePeriod || "",
    openToWork: sp.isOpenToWork !== false,
    experience: formatExperience(sp.totalExperience),
    salary: formatSalary(sp.expectedSalary),
    location: sp.currentLocation || sp.currentCity || "",
    current: designation || sp.profileHeadline || (sp.workStatus === "fresher" ? "Fresher" : ""),
    headline: sp.profileHeadline || "",
    education: educations.length ? educations : ["Education not added"],
    preferredLocations: (sp.preferredLocations || []).join(", "),
    skills: skills.slice(0, 6),
    otherSkills: skills.slice(6),
    mayAlsoKnow: skills.join(", "),
    updated: formatDate(c.updatedAt),
    active: formatDate(c.updatedAt),
    score: null,
    avatar: name.charAt(0).toUpperCase(),
    avatarColor: AVATAR_COLORS[colorIndex],
    profileImage: sp.profileImage || null,
    gender: sp.gender || "",
    experienceRows: (c.experiences || []).map((x) => ({
      title: x.designation || "",
      company: x.company || "",
      period: formatPeriod(x.startDate, x.endDate, x.currentlyWorking),
      duration: "",
      responsibilities: x.description || "",
      skills: "",
    })),
    educationRows: (c.educations || []).map((e) => [
      [e.qualification, e.course || e.specialization].filter(Boolean).join(" | "),
      e.university || "",
      String(e.graduationYear || e.endDate || ""),
      "",
    ]),
    projects: c.projects || [],
    resumes: c.resumes || [],
    hasResume: (c.resumes || []).length > 0,
  };
}

// ─── Recent searches (per-browser convenience only) ─────────────────

const RECENT_SEARCHES_KEY = "xh-recruiter-recent-searches";

export function getRecentSearches() {
  try {
    return JSON.parse(window.localStorage.getItem(RECENT_SEARCHES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function rememberSearch(term) {
  const value = String(term || "").trim();
  if (!value) return;
  try {
    const next = [value, ...getRecentSearches().filter((item) => item !== value)].slice(0, 8);
    window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode); recent searches are optional.
  }
}

// ─── Notes on candidates ─────────────────────────────────────────────

export async function listCandidateNotes(candidateId) {
  const data = unwrap(await axios.get(`${V1}/recruiter/candidates/${candidateId}/notes`));
  return data?.notes || [];
}

export async function addCandidateNote(candidateId, note) {
  const data = unwrap(await axios.post(`${V1}/recruiter/candidates/${candidateId}/notes`, { note }));
  return data?.note;
}

export async function deleteCandidateNote(noteId) {
  await axios.delete(`${V1}/recruiter/candidates/notes/${noteId}`);
}

// ─── Saved searches ──────────────────────────────────────────────────

export async function listSavedSearches() {
  const data = unwrap(await axios.get(`${V1}/recruiter/candidates/saved-searches`));
  return data?.searches || [];
}

export async function saveCandidateSearch(name, filters) {
  const clean = Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => key !== "page" && key !== "limit" && value !== undefined && value !== "")
  );
  const data = unwrap(await axios.post(`${V1}/recruiter/candidates/saved-searches`, { name, filters: clean }));
  return data?.search;
}

export async function deleteSavedSearch(searchId) {
  await axios.delete(`${V1}/recruiter/candidates/saved-searches/${searchId}`);
}

/** Convert stored API filters back into the search page's URL query. */
export function savedSearchToQuery(filters = {}) {
  const query = {};
  if (filters.q) query.anyKeywords = filters.q;
  if (filters.location) query.location = filters.location;
  if (filters.minExperience !== undefined) query.minExp = String(filters.minExperience);
  if (filters.maxExperience !== undefined) query.maxExp = String(filters.maxExperience);
  if (filters.qualification) query.highestQualification = filters.qualification;
  if (filters.gender) query.gender = filters.gender;
  if (String(filters.hasResume) === "true") query.hideWithoutResume = "true";
  return query;
}

// ─── Export & email ──────────────────────────────────────────────────

export async function downloadCandidatesCsv(filters, max = 200) {
  const params = Object.fromEntries(
    Object.entries({ ...filters, max }).filter(([key, value]) => key !== "page" && key !== "limit" && value !== undefined && value !== "")
  );
  const response = await axios.get(`${V1}/recruiter/candidates/export`, { params, responseType: "blob" });
  const disposition = response.headers?.["content-disposition"] || "";
  const fileName = /filename="([^"]+)"/.exec(disposition)?.[1] || "xhirez-candidates.csv";
  const url = window.URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
  return Number(response.headers?.["x-export-count"] || 0);
}

export async function emailCandidates({ candidateIds, subject, message }) {
  return unwrap(await axios.post(`${V1}/recruiter/candidates/email`, { candidateIds, subject, message }));
}

/** Error responses for blob requests arrive as Blobs; read the JSON message. */
export async function getBlobErrorMessage(error, fallback) {
  const blob = error?.response?.data;
  if (blob && typeof blob.text === "function") {
    try {
      return JSON.parse(await blob.text()).message || fallback;
    } catch {
      return fallback;
    }
  }
  return getApiErrorMessage(error, fallback);
}
