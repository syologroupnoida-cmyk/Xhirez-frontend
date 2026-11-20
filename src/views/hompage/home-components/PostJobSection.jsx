import React from "react";
import { Link } from "@/router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faPenToSquare,
  faUsers,
  faHandshake,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const STEPS = [
  { icon: faPenToSquare, title: "Create your job", text: "Add the title, skills, salary and location in a few minutes." },
  { icon: faUsers, title: "Get applications", text: "Your job goes live and reaches relevant candidates right away." },
  { icon: faHandshake, title: "Hire the best", text: "Shortlist, chat with candidates and make your offer." },
];

const PERKS = ["Free to post", "Reach verified candidates", "Manage all applicants in one place"];

const PostJobSection = () => {
  // logged-in recruiters go straight to the form, everyone else signs in first
  let postUrl = "/employer-login";
  try {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
    const role = token ? JSON.parse(token)?.users?.userRole : null;
    if (role === "admin" || role === "primeadmin") postUrl = "/Jobpost";
  } catch (e) {
    /* ignore – fall back to the login page */
  }

  return (
    <section className="xh-pj-section" id="post-a-job">
      <div className="container">
        <div className="xh-pj-card">
          <span className="xh-pj-glow xh-pj-glow-a" />
          <span className="xh-pj-glow xh-pj-glow-b" />

          <div className="xh-pj-left">
            <span className="xh-pj-eyebrow">For Employers</span>
            <h2 className="xh-pj-title">
              Hiring? <span>Post a Job</span> for Free
            </h2>
            <p className="xh-pj-sub">
              Reach thousands of job seekers and find the right talent faster with Xhirez.
            </p>

            <ul className="xh-pj-perks">
              {PERKS.map((p) => (
                <li key={p}>
                  <FontAwesomeIcon icon={faCircleCheck} /> {p}
                </li>
              ))}
            </ul>

            <div className="xh-pj-actions">
              <Link to={postUrl} className="xh-pj-btn">
                Post a Job Free <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link to="/employer-login" className="xh-pj-link">Employer Login</Link>
            </div>
          </div>

          <div className="xh-pj-right">
            {STEPS.map((s, i) => (
              <div className="xh-pj-step" key={s.title}>
                <span className="xh-pj-num">{i + 1}</span>
                <span className="xh-pj-ic"><FontAwesomeIcon icon={s.icon} /></span>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostJobSection;