import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeft,
  faBriefcase,
  faCircleCheck,
  faDownload,
  faEllipsisVertical,
  faEnvelope,
  faGraduationCap,
  faIndianRupeeSign,
  faLocationDot,
  faMobileScreen,
  faPhone,
  faRotate,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import RecruiterPortalShell from "./RecruiterPortalShell";
import {
  addCandidateNote,
  deleteCandidateNote,
  getApiErrorMessage,
  getCandidate,
  listCandidateNotes,
  getSimilarCandidates,
  openCandidateResume,
  trackCandidateView,
} from "./recruiterApi";

export default function RecruiterCandidateDetail() {
  const router = useRouter();
  const candidateId = router.query.candidateId ? String(router.query.candidateId) : "";
  const [candidate, setCandidate] = useState(null);
  const [similarCandidates, setSimilarCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!candidateId) return;
    let cancelled = false;
    setLoading(true);
    getCandidate(candidateId)
      .then((result) => {
        if (cancelled) return;
        setCandidate(result);
        setError("");
        trackCandidateView(candidateId);
      })
      .catch((err) => {
        if (cancelled) return;
        setCandidate(null);
        setError(getApiErrorMessage(err, "Candidate not found."));
      })
      .finally(() => !cancelled && setLoading(false));
    getSimilarCandidates(candidateId).then((list) => !cancelled && setSimilarCandidates(list.slice(0, 8)));
    return () => {
      cancelled = true;
    };
  }, [candidateId]);

  const experienceRows = candidate?.experienceRows || [];
  const educationRows = candidate?.educationRows || [];

  return (
    <RecruiterPortalShell active="Find Candidates" hideFooter>
      <div className="min-h-screen bg-[#f7f7f8] py-5 text-[#34465a]">
        <div className="container mx-auto w-full max-w-[1588px] px-4">
          <Link href="/recruiter/search/advanced" className="xh-recruiter-folder-link mb-4 inline-flex items-center gap-2 text-xs font-semibold">
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            Back to candidates
          </Link>

          {router.isReady && !loading && !candidate ? (
            <section className="rounded bg-white px-6 py-14 text-center shadow-[0_8px_24px_rgba(15,23,42,0.10)]">
              <FontAwesomeIcon icon={faUser} className="text-5xl text-slate-300" />
              <h5 className="m-0 mt-5 text-base font-semibold text-slate-900">Candidate not found</h5>
              {error && <p className="m-0 mt-2 text-sm text-slate-500">{error}</p>}
            </section>
          ) : (
            candidate && (
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_290px]">
                <main className="min-w-0 space-y-3">
                  <section className="overflow-visible rounded bg-white shadow-[0_10px_34px_rgba(15,23,42,0.08)]">
                    <div
                      className="grid min-h-[210px] gap-3 border-b border-slate-100 p-4 md:grid-cols-[minmax(0,1fr)_240px]"
                      style={{
                        backgroundImage:
                          "linear-gradient(30deg, rgba(226,232,240,0.22) 12%, transparent 12.5%, transparent 87%, rgba(226,232,240,0.22) 87.5%, rgba(226,232,240,0.22)), linear-gradient(150deg, rgba(226,232,240,0.22) 12%, transparent 12.5%, transparent 87%, rgba(226,232,240,0.22) 87.5%, rgba(226,232,240,0.22))",
                        backgroundSize: "92px 160px",
                      }}
                    >
                      <div className="min-w-0 pt-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <h1 className="m-0 text-xl font-bold leading-tight text-[#263241]">
                            {candidate.name}
                          </h1>
                          <FontAwesomeIcon icon={faCircleCheck} className="text-base text-[#5fc874]" />
                          <span className="rounded-full bg-[#fff0e6] px-3 py-1 text-[11px] font-semibold text-[#d35b10]">
                            {candidate.openToWork ? "Open to Work" : "Not looking"}
                          </span>
                        </div>
                        <p className="m-0 mt-4 text-sm font-semibold leading-5 text-[#3c4d5f]">{candidate.current}</p>
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#3c4d5f]">
                          <MetaIcon icon={faBriefcase} text={candidate.experience} />
                          <MetaIcon icon={faIndianRupeeSign} text={candidate.salary} />
                          <MetaIcon icon={faLocationDot} text={candidate.location} />
                          <MetaIcon icon={faGraduationCap} text={(candidate.education[0] || "").split(" | ")[0] || "Other"} />
                        </div>
                        <p className="m-0 mt-5 text-xs font-semibold text-[#607080]">
                          Notice: <span className="text-[#263241]">{candidate.noticePeriod || "Not mentioned"}</span>
                          <span className="mx-3">.</span>
                          Preferred Location: <span className="text-[#263241]">{candidate.preferredLocations}</span>
                        </p>
                      </div>

                      <div className="self-center rounded border border-slate-200 bg-white">
                        <div className="flex h-[105px] items-center justify-center">
                          <span
                            className="flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold text-white"
                            style={{ backgroundColor: candidate.avatarColor }}
                          >
                            {candidate.avatar}
                          </span>
                        </div>
                        <div className="border-t border-slate-100 bg-[#f8f8f8] px-5 py-3">
                          <p className="m-0 text-center text-[11px] text-[#748194]">
                            {candidate.isEmailVerified ? "Email verified" : "Email not verified"}
                          </p>
                          <p className={`m-0 mt-1 text-center text-xs font-bold ${candidate.openToWork ? "text-[#35a348]" : "text-slate-500"}`}>
                            {candidate.openToWork ? "OPEN TO WORK" : "NOT LOOKING"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5">
                      <div className="flex flex-wrap items-center gap-5">
                        <button type="button" className="h-9 rounded-[10px] border border-[#cfdef2] bg-white px-4 text-xs font-bold text-[#5269c9]">
                          Comment
                        </button>
                        <FontAwesomeIcon icon={faEnvelope} className="text-xl text-[#5269c9]" />
                        <FontAwesomeIcon icon={faEllipsisVertical} className="text-base text-[#5269c9]" />
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <a
                          href={candidate.phone ? `https://wa.me/${candidate.phone.replace(/\D/g, "")}` : undefined}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#21b948] text-lg text-white no-underline hover:text-white"
                          aria-label="Open WhatsApp"
                        >
                          <FontAwesomeIcon icon={faWhatsapp} />
                        </a>
                        <button
                          type="button"
                          onClick={() => openCandidateResume(candidate.id)}
                          disabled={!candidate.hasResume}
                          className="inline-flex h-9 min-w-[190px] items-center justify-center gap-2 rounded border border-[#5b67c8] bg-[#eef1ff] px-4 text-xs font-semibold text-[#5b67c8] disabled:opacity-50"
                        >
                          <FontAwesomeIcon icon={faDownload} />
                          Download Resume
                        </button>
                        <PhoneCallDropdown candidate={candidate} />
                      </div>
                    </div>
                  </section>

                  <div className="flex items-center justify-end gap-5 text-xs font-semibold text-[#3c4d5f]">
                    <span>Active: {candidate.active}</span>
                    <span><FontAwesomeIcon icon={faRotate} className="mr-2 text-sm" />Updated: {candidate.updated}</span>
                  </div>

                  <div className="flex gap-5 border-b border-slate-200 text-lg font-normal leading-none text-black">
                    <span className="border-b-2 border-[#7048ff] pb-3 font-bold text-[#111827]">Profile Details</span>
                    <a href="#resume" className="pb-3 text-black no-underline">Attached Resume</a>
                  </div>

                  <DetailSection title="Summary">
                    <div className="rounded border border-slate-200 p-4">
                      <p className="m-0 text-xs leading-5 text-[#526171]">
                        {candidate.headline || `${candidate.current || "Candidate"} with ${candidate.experience} of experience.`}
                      </p>
                    </div>
                  </DetailSection>

                  <DetailSection title="Experience">
                      <div className="space-y-3">
                      {experienceRows.length === 0 && <p className="m-0 text-xs text-[#607080]">No experience added.</p>}
                      {experienceRows.map((row, index) => (
                        <ExperienceRow key={`${row.company}-${index}`} {...row} />
                      ))}
                    </div>
                  </DetailSection>

                  <div className="grid gap-3 lg:grid-cols-2">
                    <DetailSection title="Education">
                      <div className="space-y-3">
                        {educationRows.length === 0 && (
                          <p className="m-0 text-xs text-[#607080]">{candidate.education[0]}</p>
                        )}
                        {educationRows.map(([degree, institute, year, marks], index) => (
                          <div key={`${degree}-${index}`} className="flex gap-4">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dceafb] text-sm text-white">
                              <FontAwesomeIcon icon={faGraduationCap} />
                            </span>
                            <div>
                              <h5 className="m-0 text-base font-bold text-[#526171]">{degree}</h5>
                              <p className="m-0 mt-1 text-xs text-[#607080]">{institute}</p>
                              <p className="m-0 mt-1 text-xs text-[#607080]">{year}</p>
                              {marks && <p className="m-0 mt-1 text-xs font-bold text-[#607080]">Marks/Grades: {marks}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </DetailSection>

                    <DetailSection title="Skills">
                      <div className="max-h-[330px] overflow-y-auto rounded border border-slate-200">
                        {[...(candidate.skills || []), ...(candidate.otherSkills || [])].map((skill, index) => (
                          <div key={skill} className={`flex items-center justify-between px-4 py-2.5 text-xs ${index % 2 ? "bg-[#f3f8ff]" : "bg-white"}`}>
                            <span className="text-[#3c4d5f]">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </DetailSection>
                  </div>

                  <DetailSection title="More details">
                    <div className="grid gap-x-20 gap-y-3 text-xs text-[#33465a] md:grid-cols-2">
                      <DetailPair label="Current company" value={candidate.current.split(" | ")[1] || "Not mentioned"} />
                      <DetailPair label="Email" value={candidate.email || "Hidden by candidate"} />
                      <DetailPair label="Notice period" value={candidate.noticePeriod || "Not mentioned"} />
                      <DetailPair label="Gender:" value={candidate.gender || "Not mentioned"} />
                    </div>
                  </DetailSection>

                  <DetailSection title="Desired job details">
                    <div className="grid gap-x-10 gap-y-3 text-xs text-[#33465a] md:grid-cols-[160px_1fr]">
                      <DetailPair label="Job Location" value={candidate.preferredLocations} />
                      <DetailPair label="Expected salary" value={candidate.salary} />
                    </div>
                  </DetailSection>

                  <DetailSection id="resume" title="Resume">
                    <div className="mb-4 flex flex-wrap justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => openCandidateResume(candidate.id)}
                        disabled={!candidate.hasResume}
                        className="inline-flex h-9 min-w-[190px] items-center justify-center gap-2 rounded border border-[#5b67c8] bg-[#eef1ff] text-xs font-semibold text-[#5b67c8] disabled:opacity-50"
                      >
                        <FontAwesomeIcon icon={faDownload} />
                        Download Resume
                      </button>
                      <PhoneCallDropdown candidate={candidate} />
                    </div>
                    <div className="overflow-hidden bg-[#262626]">
                      <div className="flex h-12 items-center gap-5 bg-[#3a3a3a] px-5 text-[11px] text-white">
                        <span className="text-lg">=</span>
                        <span className="max-w-[260px] truncate font-semibold">{candidate.resumes[0]?.fileName || "No resume attached"}</span>
                        <span>100%</span>
                        <span>+</span>
                        <span className="ml-auto">Download</span>
                      </div>
                      <div className="mx-auto min-h-[360px] max-w-[1020px] bg-white p-10 text-center">
                        <h5 className="m-0 text-sm font-bold uppercase text-[#10a9d4]">
                          {candidate.name.toUpperCase()}
                        </h5>
                        <p className="m-0 mt-5 text-xs font-semibold text-slate-900">{candidate.current}</p>
                        <p className="m-0 mt-4 text-left text-xs leading-5 text-slate-700">
                          Skills: {[...(candidate.skills || []), ...(candidate.otherSkills || [])].join(", ")}
                        </p>
                        <p className="m-0 mt-3 text-left text-xs leading-5 text-slate-700">
                          Education: {(candidate.education || []).join("; ")}
                        </p>
                      </div>
                    </div>
                  </DetailSection>

                  <CandidateNotes candidateId={candidate.id} />
                </main>

                <aside className="hidden space-y-3 lg:block">
                  <div className="flex items-center justify-between">
                    <h5 className="m-0 text-sm font-bold text-[#526171]">Similar Candidates</h5>
                    <button type="button" className="border-0 bg-transparent p-0 text-xs text-[#5261c8]">
                      {similarCandidates.length} found
                    </button>
                  </div>
                  {similarCandidates.map((item) => (
                    <Link
                      key={item.id}
                      href={`/recruiter/candidates/${item.id}`}
                      className="xh-recruiter-folder-card block rounded border border-slate-200 bg-white p-3 no-underline transition hover:border-[#b9c4ff]"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <p className="m-0 text-base font-bold leading-5 text-[#354bc0]">{item.name}</p>
                      <p className="m-0 mt-1 text-xs font-semibold text-[#33465a]">{item.current}</p>
                    </Link>
                  ))}
                </aside>
              </div>
            )
          )}
        </div>
      </div>
    </RecruiterPortalShell>
  );
}

function MetaIcon({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-2">
      <FontAwesomeIcon icon={icon} className="text-slate-400" />
      {text}
    </span>
  );
}

function DetailSection({ title, children, id }) {
  return (
    <section id={id} className="rounded bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
      <h2 className="m-0 mb-3 text-lg font-bold leading-tight text-[#263241]">{title}</h2>
      {children}
    </section>
  );
}

function ExperienceRow({ title, company, period, duration, responsibilities, skills }) {
  return (
    <div className="rounded border border-slate-200 p-3 text-xs text-[#526171]">
      <h5 className="m-0 text-base font-bold text-[#3c4d5f]">{title}</h5>
      <p className="m-0 mt-2 text-sm text-[#526171]">{company}</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <p className="m-0">{period}</p>
        <p className="m-0">{duration}</p>
      </div>
      <p className="m-0 mt-3 font-bold">Roles & Responsibilities:</p>
      <p className="m-0 mt-1 leading-5">{responsibilities}</p>
      <p className="m-0 mt-3"><strong>Skills:</strong> {skills}</p>
    </div>
  );
}

function DetailPair({ label, value }) {
  return (
    <>
      <p className="m-0 font-bold text-[#33465a]">{label}</p>
      <p className="m-0 text-[#33465a]">{value}</p>
    </>
  );
}

function PhoneCallDropdown({ candidate }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const phoneDigits = candidate.phone.replace(/\D/g, "");

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="h-9 min-w-[190px] rounded bg-[#5b67c8] px-4 text-xs font-semibold text-white"
      >
        <FontAwesomeIcon icon={faMobileScreen} className="mr-3" />
        View {maskPhone(candidate.phone)}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-[90] w-[230px] rounded border border-slate-200 bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.18)]">
          <div className="absolute right-6 top-[-6px] h-3 w-3 rotate-45 border-l border-t border-slate-200 bg-white" />
          <div className="flex items-center justify-between gap-3 rounded bg-[#f8fbff] px-3 py-2">
            <span className="text-xs font-bold text-slate-800">{candidate.phone}</span>
            <a
              href={`tel:${phoneDigits}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5b67c8] text-white no-underline hover:text-white"
              aria-label={`Call ${candidate.phone}`}
            >
              <FontAwesomeIcon icon={faPhone} className="text-xs" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function maskPhone(phone) {
  if (!phone) return "phone (hidden)";
  const digits = phone.replace(/\D/g, "");
  const lastTen = digits.slice(-10);

  if (lastTen.length < 4) return phone;

  return `+91 ${lastTen.slice(0, 2)}xxxxxx${lastTen.slice(-2)}`;
}

function CandidateNotes({ candidateId }) {
  const [notes, setNotes] = useState([]);
  const [draft, setDraft] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    listCandidateNotes(candidateId)
      .then((list) => !cancelled && setNotes(list))
      .catch((err) => !cancelled && setError(getApiErrorMessage(err, "Could not load notes.")));
    return () => {
      cancelled = true;
    };
  }, [candidateId]);

  const save = async () => {
    if (!draft.trim()) return;
    setIsSaving(true);
    try {
      const note = await addCandidateNote(candidateId, draft.trim());
      setNotes((current) => [note, ...current]);
      setDraft("");
      setError("");
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not save note."));
    } finally {
      setIsSaving(false);
    }
  };

  const remove = async (noteId) => {
    try {
      await deleteCandidateNote(noteId);
      setNotes((current) => current.filter((note) => note.id !== noteId));
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not delete note."));
    }
  };

  return (
    <section className="mt-3 rounded bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.10)]">
      <h5 className="m-0 text-sm font-bold text-[#263241]">Your notes</h5>
      <p className="m-0 mt-1 text-xs text-[#748194]">Private to you. Candidates never see these.</p>
      {error && <p className="m-0 mt-2 text-xs text-red-600">{error}</p>}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start">
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={2000}
          rows={2}
          placeholder="Add a note (interview feedback, follow-up date...)"
          className="min-h-[56px] flex-1 rounded border border-[#cfdef2] px-3 py-2 text-sm outline-none focus:border-[#2f4fc8]"
        />
        <button
          type="button"
          onClick={save}
          disabled={!draft.trim() || isSaving}
          className="h-9 rounded border-0 bg-[#2f4fc8] px-4 text-xs font-bold text-white disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Add note"}
        </button>
      </div>
      <ul className="m-0 mt-4 list-none space-y-3 p-0">
        {notes.length === 0 && <li className="text-xs text-[#748194]">No notes yet.</li>}
        {notes.map((note) => (
          <li key={note.id} className="rounded border border-slate-100 bg-[#fbfbfd] px-3 py-2">
            <p className="m-0 whitespace-pre-wrap text-sm text-[#263241]">{note.note}</p>
            <div className="mt-1 flex items-center justify-between text-[11px] text-[#748194]">
              <span>{new Date(note.createdAt).toLocaleString("en-IN")}</span>
              <button
                type="button"
                onClick={() => remove(note.id)}
                className="border-0 bg-transparent p-0 text-[11px] font-semibold text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
