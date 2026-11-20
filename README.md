# Xhirez Frontend

Web app for **Xhirez**, a job portal and recruitment platform. Job seekers search and apply for jobs and build a profile; recruiters post jobs, review applicants and search the candidate database; super admins run the platform.

- **Framework:** Next.js 16 (Pages Router, webpack dev server), React 19
- **UI:** Tailwind CSS, MUI, Mantine, Headless UI, Font Awesome, Heroicons
- **HTTP:** axios, through a shared client that sends cookies and refreshes the session automatically
- **Backend:** `../Xhirez-backend` (Express + Prisma + PostgreSQL)

> This Next.js version has breaking changes from older releases. Read the guides in `node_modules/next/dist/docs/` before changing framework-level code (see `AGENTS.md`).

---

## Getting started

Requirements: Node 20+ and the backend running on `http://localhost:8080`.

```bash
npm install        # .npmrc sets legacy-peer-deps=true (needed for multiselect-react-dropdown on React 19)
npm run dev        # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

### Configuration

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8080` | Backend base URL |

Set it in `.env.local` when the backend runs somewhere else.

### Running the backend locally

```bash
cd ../Xhirez-backend
npm install
npm run db:setup              # migrate + seed master data + create the SuperAdmin
npm run db:seed -- --demo     # optional: demo recruiter, company, candidates and jobs
npm run dev                   # http://localhost:8080
```

The demo accounts all use the password `Demo@12345`: `recruiter@demo.xhirez.local` and `asha.verma@demo.xhirez.local` (plus 4 more candidates).

---

## Project structure

```
src/
├── pages/          Next.js routes (one file per URL)
├── views/          Page-level screens used by pages/
│   ├── apiConfig.jsx    API base URL + legacy endpoint map
│   ├── apiClient.js     axios setup: cookies, CSRF header, automatic token refresh
│   └── recruiter/recruiterApi.js   v1 API helpers for the new recruiter portal
├── components/     Shared UI (header, footer, etc.)
└── router-dom.jsx  Small shim so older `<Link to="…">` code works with Next.js routing
```

### Authentication

Login stores HttpOnly `accessToken` / `refreshToken` cookies plus a readable `csrfToken` cookie. `apiClient.js` copies `csrfToken` into the `X-CSRF-Token` header on every write request, and when a request returns 401 it calls `POST /api/v1/auth/refresh` once and retries.

| Role | Who |
|---|---|
| `user` | Job seeker |
| `admin` | Recruiter |
| `primeadmin` | Premium recruiter (can also search and export the candidate database) |
| `SuperAdmin` | Platform administrator |

---

## Pages

### Public
| Route | Purpose |
|---|---|
| `/` | Home page: job search, sectors, initiatives |
| `/about`, `/features`, `/agency`, `/business`, `/business-features` | Marketing pages |
| `/business-field-guide/[fieldId]`, `/business-interview-guide/[companyId]` | Guides for businesses |
| `/career-counselling`, `/campus-buddy`, `/shecancode` | Programmes with request forms |
| `/initiatives/[initiativeTitle]/[blogIndex]` | Initiative / blog detail |
| `/jobShare/[id]`, `/profileShare/[email]` | Public share links for a job or a profile |

### Job seeker
| Route | Purpose |
|---|---|
| `/sign-up`, `/verify`, `/login`, `/logout` | Register (email OTP), log in, log out |
| `/recoverpass`, `/Changepassword` | Password recovery and change |
| `/alljob`, `/filteredJobsList`, `/jobs-by-sector`, `/JobListInterface`, `/dashboardJobs` | Job listings and search |
| `/applyjob/[id]` | Job detail and apply |
| `/profile`, `/Fillprofile`, `/profile-dashboard` | Build profile (education, experience, projects, skills, resume) and dashboard |

### Recruiter: older pages
| Route | Purpose |
|---|---|
| `/employer-login`, `/recruiterLogin`, `/recruitersignUp` | Recruiter login / sign-up |
| `/job-post`, `/jobpost`, `/postedjob`, `/edit-job/[id]` | Post, list and edit jobs |
| `/applicantsPage/[jobId]` | Applicants for a job |
| `/AdvanceSearch`, `/searchedProfiles`, `/candidateProfile`, `/candidateProfile/[userId]`, `/candudatedeatil`, `/bookMarkUsers` | Candidate search, profiles, saved candidates |
| `/companyprofile`, `/company-detail-update`, `/Companydetail` | Company profile |
| `/admin/*` | Company dashboard, job form, manage jobs, company profile, notifications, change password |

### Recruiter: new portal (`/recruiter/*`)
| Route | Purpose |
|---|---|
| `/recruiter/login`, `/recruiter/sign-up` | Login / sign-up |
| `/recruiter/dashboard` | Usage, jobs and applications overview |
| `/recruiter/advanced-search`, `/recruiter/advance-search`, `/recruiter/search/advanced` | Candidate search |
| `/recruiter/candidates/[candidateId]` | Candidate detail, notes, resume |
| `/recruiter/folders`, `/recruiter/folders/[folderId]` | Talent folders |
| `/recruiter/pricing` | Plans |

### Super admin (`/SuperAdmin/*`)
| Route | Purpose |
|---|---|
| `/SuperAdmin` | Dashboard with charts and recent jobs |
| `users`, `company`, `ManageSuperAdmin`, `SuperAdminProfile`, `profileManagement` | Users, recruiters/companies, admin accounts |
| `skills`, `industry`, `department`, `Designation`, `courses` | Master data |
| `BusinessRequests`, `CampusBuddy`, `SheCanCode`, `DataBaseReq` | Requests submitted from the public forms |
| `DeletedUser`, `DeletedAdmin` | Deleted accounts |

Some routes duplicate each other (the three advanced-search routes, the two recruiter logins, `jobpost` vs `job-post`). They are left over from the move to the new recruiter portal.

---

## Backend APIs used by the frontend

The backend has two API sets on the same server:

- **Legacy API** at the root (`/auth/*`, `/Jobs/*`, `/HR/*`, `/Appearance/*`, `/Super/*`, `/common/*`). Most pages use it.
- **v1 API** at `/api/v1/*`, the newer design. The new recruiter portal, sign-up and a few forms use it.

**Status:** every endpoint below is implemented on the backend. None of the frontend's calls points to a missing route.

Access: 🌐 public · 🔓 login optional · 🔒 login required (role shown)

### v1 API (`/api/v1`)
| Endpoint | Used by | Access |
|---|---|---|
| `POST /auth/register`, `POST /auth/verify-email`, `POST /auth/resend-otp` | Sign-up + OTP | 🌐 |
| `POST /auth/login` | Sign-up (auto login) | 🌐 |
| `POST /auth/refresh` | `apiClient.js` (automatic) | 🌐 (refresh cookie) |
| `POST /profile/resumes` | Sign-up resume upload | 🔒 user |
| `POST /initiatives` | Career counselling form | 🔓 |
| `POST /recruiter/jobs` | Job form | 🔒 admin, primeadmin |
| `GET /recruiter/jobs/dashboard`, `GET /recruiter/applications/dashboard` | Recruiter dashboard | 🔒 admin, primeadmin |
| `GET /recruiter/candidates/search`, `GET /recruiter/candidates/export` | Candidate search / CSV | 🔒 primeadmin |
| `GET /recruiter/candidates/dashboard` | Usage panel | 🔒 admin, primeadmin |
| `GET /recruiter/candidates/:id`, `POST …/:id/view`, `GET …/:id/resume` | Candidate detail | 🔒 admin, primeadmin |
| `GET/POST /recruiter/candidates/:id/notes`, `DELETE /recruiter/candidates/notes/:noteId` | Candidate notes | 🔒 admin, primeadmin |
| `GET/POST/DELETE /recruiter/candidates/bookmarks` | Saved candidates | 🔒 admin, primeadmin |
| `GET/POST/PATCH/DELETE /recruiter/candidates/folders…` | Folders and their candidates | 🔒 admin, primeadmin |
| `GET/POST/DELETE /recruiter/candidates/saved-searches` | Saved searches | 🔒 admin, primeadmin |
| `POST /recruiter/candidates/email` | Email candidates | 🔒 admin, primeadmin |

### Legacy `/auth`
| Endpoint | Used by | Access |
|---|---|---|
| `POST login`, `POST register` | Login / old sign-up | 🌐 |
| `checkUserEmailOtpForSignUp`, `verifyOtpEmailForSignUp` | Sign-up OTP | 🌐 |
| `checkUserEmailForOtp`, `verifyOtpEmail`, `POST forgetUserPassword` | Password recovery | 🌐 |
| `POST validateGoogleEmail`, `GET fetchGoogleDetails` | Google login | 🌐 |
| `GET sharedProfile/:email`, `GET getimage/:image`, `GET getResume/:resume` | Share links, images, resumes | 🌐 |
| `GET saveLoginLog` | Login log | 🌐 |
| `POST updateUserProfile` | Profile form | 🔒 user |
| `GET fetchUsersEducationData` / `ExperienceData` / `ProjectsData` | Profile | 🔒 user |
| `DELETE deleteEducation` / `deleteExperience` / `deleteProjects` `/:userid/:id` | Profile | 🔒 user |
| `POST uploadResume`, `POST updateProfileImage` | Profile | 🔒 user |
| `bookmark` (GET/POST), `GET getBookmarks` | Saved jobs | 🔒 user |
| `GET fetchProfileViewsNotifications/:id`, `GET fetchResumeDownloadNotifications/:id` | Profile dashboard | 🔒 user |
| `POST findJobsByUserSkills` | Recommended jobs | 🔒 user |
| `GET fetchImageResumeDynamicallyForUsers`, `POST updateUserJobStatus` | Profile | 🔒 user |

### Legacy `/Jobs`
| Endpoint | Used by | Access |
|---|---|---|
| `GET fetchAllJobs`, `filteringJobs`, `fetchJobByCondition`, `fetchSuggestion/:value` | Job listings and search | 🌐 |
| `GET fetchJobTitle`, `fetchQualificationList`, `fetchIndustry`, `fetchSkills`, `fetchJobFilter` | Dropdowns and filters | 🌐 |
| `GET fetchJobById/:id` | Job detail | 🔓 |
| `POST apply` | Apply to a job | 🔒 user |
| `POST JobPost`, `PUT updateJobById`, `DELETE delete/:id`, `GET fetchAllJobsByEmail` | Recruiter job management | 🔒 admin, primeadmin |

### Legacy `/HR`
| Endpoint | Used by | Access |
|---|---|---|
| `POST register`, `GET fetchAllUniversities` | Recruiter sign-up, dropdowns | 🌐 |
| `POST createBusinessRequest`, `campusBuddyRequest`, `shecancodeReq`, `createDatabaseRequest` | Public programme forms | 🔓 |
| `GET getCompanyDetails`, `POST updateCompDetails` | Company profile | 🔒 admin, primeadmin |
| `GET applicantsListById`, `GET fetchApplicants` | Applicants | 🔒 admin, primeadmin |
| `GET getAdvanceSearch` | Old candidate search | 🔒 primeadmin |
| `GET getSimilarUserList`, `GET hrCheckLogsByEmail` | Candidate detail, logs | 🔒 admin, primeadmin |

### Legacy `/Appearance`
| Endpoint | Used by | Access |
|---|---|---|
| `POST saveProfileView`, `saveResumeView`, `savedUsers`; `GET getSavedCandidates` | Recruiter candidate views and saves | 🔒 admin, primeadmin |
| `GET viewProfileCount/:id`, `viewResumeCount/:id` | View counters | 🔒 any logged-in user |

### Legacy `/Super` (all 🔒 SuperAdmin)
| Area | Endpoints |
|---|---|
| Dashboard | `getSuperAdminDashboardData`, `…RecentJobs`, `…BarChart`, `…PieChart` |
| Users and recruiters | `getAllUsers`, `getAllAdmin`, `getAdminCompanyData`, `updateUserActivationStatus`, `updateAdminActivateStatus`, `updateAdminRole`, `updateAdminActionStatus`, `updateAdminCompanyUserStatus`, `updateAdminCompanyDisableUserAction` |
| Deleted accounts | `fetchAllDeletedUsers`, `fetchAllDeletedRecruiters`, `updateUserDeleteAction`, `updateUsersDeletedAction`, `updateRecruiterDeletedAction` |
| Super admin accounts | `getAllSuperAdminAccounts`, `createSuperAdminAccount`, `updateSuperAdminActiveStatus`, `updateSuperAdminActionStatus`, `updateSuperAdminProfileData` |
| Master data | `getAdminAllSkills`/`addSkill`/`updateAdminSkills`, `getAdminAllQualifications`/`addQualification`/`updateAdminQualification`/`deleteAdminQualificationCourse`, `getAdminIndustryData`/`addIndustry`/`updateAdminIndustryData`/`deleteAdminIndustryData`, `getAdminAllDepartments`/`addDepartment`/`updateAdminDepartment`, `getAllDesignation`/`addJobTitles`/`updateAdminDesignation` |
| Requests | `getBusinessReqData`, `getCampusBuddyData`, `getSheCanCodeData`, `getDBProposalUser` |

### Legacy `/common`
| Endpoint | Used by | Access |
|---|---|---|
| `GET fetchAllSectors` | Home page sectors | 🌐 |

### Backend v1 features with no page yet
Seeker applications dashboard / history / withdraw, v1 notifications, company verification and member management, super-admin v1 company/recruiter/user management.

---

## API tests (Postman)

A Postman collection that checks these endpoints lives in `../Xhirez-backend/postman/` (about 120 requests, 431 assertions, all passing against the local demo data). See the README there for how to run it.
