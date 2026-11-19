import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faChartSimple,
  faChevronLeft,
  faChevronRight,
  faCirclePlay,
  faRobot,
  faUserCheck,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import RecruiterPortalShell from "./RecruiterPortalShell";

const updates = [
  {
    title: "Advance Industry Filter",
    desc: "Control current and previous industry candidates in search",
    action: "Try now",
    icon: faBuilding,
    tone: "blue",
  },
  {
    title: "Connect",
    desc: "with the interested candidates",
    action: "Get Started",
    icon: faUsers,
    tone: "amber",
  },
  {
    title: "Pre-Assessed Candidates",
    desc: "Hire from the assessed pool of candidates",
    action: "Hire Now",
    icon: faUserCheck,
    tone: "blue",
  },
];

const usage = [
  { value: "0", label: "jobs posted in last 30 days" },
  { value: "4", label: "jobs remaining overall" },
  { value: "145", label: "CV viewed in last 30 days" },
  { value: "0", label: "emails sent in last 30 days" },
];

export default function RecruiterDashboard() {
  return (
    <RecruiterPortalShell active="Home">
      <div className="mx-auto max-w-[1840px] px-4 py-7 lg:px-12">
        <div className="mb-5">
          <h5 className="m-0 text-xl font-semibold tracking-tight text-slate-800">Recruiter Dashboard</h5>
          <p className="m-0 mt-1 text-sm text-slate-500">Manage search, jobs, and hiring activity from one workspace.</p>
        </div>
        <section className="max-w-[1060px] rounded border border-[#d7d9f2] bg-white px-2 py-2 text-xs shadow-sm">
          <p className="m-0 mb-1 font-bold text-slate-900">Important Notice:</p>
          <p className="m-0 leading-5 text-slate-600">
            Xhirez never sends emails asking for your username and password. If you receive any such emails, please do not respond and contact your account manager. You can also inform us at{" "}
            <a href="mailto:compliance@xhirez.com" className="font-semibold text-[#4f5ed4]">
              compliance@xhirez.com
            </a>
            .
          </p>
        </section>

        <div className="mt-4 grid gap-6 xl:grid-cols-[1.12fr_0.62fr]">
          <div className="space-y-4">
            <section className="rounded bg-white p-0 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between px-0 pt-4">
                <span className="relative bg-[#7a6df0] px-2 py-1 text-sm font-bold text-white">
                  Whats New ?
                  <span className="absolute -right-3 top-0 h-0 w-0 border-y-[12px] border-l-[12px] border-y-transparent border-l-[#7a6df0]" />
                </span>
                <div className="mr-3 flex gap-4 text-[#7a6df0]">
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </div>
              <div className="grid gap-3 p-3 md:grid-cols-3">
                {updates.map((item) => (
                  <article
                    key={item.title}
                    className={`flex min-h-[92px] items-center gap-4 rounded border p-4 ${
                      item.tone === "amber" ? "border-[#f7b955] bg-[#fff8e8]" : "border-[#9dd9f5] bg-[#e7f7ff]"
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} className={`text-3xl ${item.tone === "amber" ? "text-[#d66be8]" : "text-[#3e9fd0]"}`} />
                    <div>
                      <h5 className="m-0 text-sm font-bold text-slate-900">{item.title}</h5>
                      <p className="m-0 text-xs leading-4 text-slate-700">{item.desc}</p>
                      <Link href="/recruiter/advanced-search" className="text-xs font-bold text-[#6b4df5] no-underline">
                        {item.action}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="min-h-[98px] rounded bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <h5 className="m-0 text-sm font-medium text-slate-900">Recent Jobs</h5>
              <p className="m-0 mt-7 text-xs text-slate-700">No recent jobs</p>
            </section>

            <section className="relative overflow-hidden rounded bg-[#cdbcf1] px-4 py-5">
              <div className="relative z-10">
                <h5 className="m-0 text-xl font-bold text-black">Just Launched: New Era Of Hiring Like Never Before!</h5>
                <ul className="m-0 mt-3 list-none space-y-1 p-0 text-sm text-black">
                  <li>✓ Next gen AI-Powered search</li>
                  <li>✓ Get Double the responses for your job postings</li>
                  <li>✓ Experience 2x responses for mailers</li>
                </ul>
              </div>
              <div className="absolute right-16 top-5 hidden h-24 w-24 rotate-12 rounded-3xl bg-white/30 shadow-inner md:block" />
              <FontAwesomeIcon icon={faRobot} className="absolute right-24 top-8 hidden text-6xl text-[#614ed7] md:block" />
            </section>

            <section className="rounded bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.08)]">
              <div className="mb-6 flex items-center justify-between">
                <h5 className="m-0 text-sm font-medium text-slate-900">Usage Limits</h5>
                <Link href="#" className="text-xs text-[#4f5ed4] no-underline">
                  view all
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {usage.map((item) => (
                  <div key={item.label}>
                    <p className="m-0 text-2xl font-semibold text-slate-600">{item.value}</p>
                    <p className="m-0 text-xs text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-3">
            <section className="relative overflow-hidden rounded bg-white p-7 shadow-[0_12px_34px_rgba(15,23,42,0.08)]">
              <div className="absolute -left-4 -top-5 h-20 w-12 rounded-full bg-[#dfeaff]" />
              <div className="absolute -right-5 bottom-0 h-24 w-36 rounded-t-full bg-[#e3e7ff]" />
              <div className="relative z-10">
                <h5 className="m-0 text-xl font-bold text-slate-900">Find your next Great Hire</h5>
                <p className="m-0 mt-1 text-sm text-slate-600">Choose from 50M candidates with exactly the skills you are seeking.</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href="/recruiter/advanced-search"
                    className="rounded-full bg-[#5b67c8] px-6 py-2 text-sm font-bold text-white no-underline hover:text-white"
                  >
                    Find Candidates
                  </Link>
                  <button type="button" className="inline-flex h-9 items-center gap-2 rounded border border-[#dbe2f0] bg-[#f8fbff] px-4 text-xs text-[#5b67c8] shadow-sm">
                    <FontAwesomeIcon icon={faCirclePlay} className="text-lg" />
                    Watch Search Tutorial
                  </button>
                </div>
              </div>
            </section>

            <section className="rounded bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.07)]">
              <h5 className="m-0 text-sm font-medium text-slate-900">Recent Searches</h5>
              <div className="mt-5 flex flex-wrap gap-2">
                {["ravi", "business development,bde,bdm", "furniture designer,"].map((item) => (
                  <span key={item} className="border border-slate-200 bg-white px-3 py-1 text-xs text-[#4550b8]">
                    {item}
                  </span>
                ))}
              </div>
              <button type="button" className="mx-auto mt-4 block rounded border border-[#dbe2f0] bg-[#f8fbff] px-4 py-2 text-xs text-[#5b67c8] shadow-sm">
                Watch Job Posting Tutorial
              </button>
            </section>

            <section className="rounded bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.07)]">
              <div className="mb-3 flex items-center gap-3">
                <h5 className="m-0 text-sm font-bold text-slate-800">Hire the right talent</h5>
                <FontAwesomeIcon icon={faCirclePlay} className="text-xl text-[#5b67c8]" />
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/job-post" className="rounded-full bg-[#5b67c8] px-6 py-2 text-sm font-bold text-white no-underline hover:text-white">
                  Post A Job
                </Link>
                <Link href="/jobpost" className="rounded-full bg-[#ffa726] px-6 py-2 text-sm font-bold text-black no-underline hover:text-black">
                  Post A Walkin
                </Link>
              </div>
            </section>
          </aside>
        </div>

        <button
          type="button"
          className="fixed bottom-28 right-4 flex h-12 w-12 items-center justify-center rounded-l bg-[#5b67c8] text-white shadow-lg"
          aria-label="Recruiter support"
        >
          <span className="absolute -top-2 right-7 rounded-full bg-red-500 px-1.5 text-[10px] font-bold">50+</span>
          <FontAwesomeIcon icon={faChartSimple} />
        </button>
      </div>
    </RecruiterPortalShell>
  );
}
