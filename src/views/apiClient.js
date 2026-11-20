import axios from "axios";
import Cookies from "js-cookie";

let installed = false;
let refreshPromise;

export function configureApiClient(baseURL) {
  if (installed) return;
  installed = true;
  const base = new URL(baseURL);
  const apiPath = (config) => {
    const url = new URL(config.url || "", config.baseURL || baseURL);
    return url.origin === base.origin && url.pathname.startsWith(base.pathname)
      ? url.pathname.slice(base.pathname.length).replace(/^\//, "") : null;
  };
  axios.interceptors.request.use(config => {
    const path = apiPath(config);
    if (path === null) return config;
    config.withCredentials = true;
    const csrf = Cookies.get("csrfToken");
    if (csrf) config.headers["X-CSRF-Token"] = csrf;
    const mutations = /^(auth\/(login|register|checkUserEmailOtpForSignUp|verifyOtpEmailForSignUp|checkUserEmailForOtp|forgetUserPassword|bookmark|updateUserJobStatus)|Jobs\/apply|Appearance\/(saveProfileView|saveResumeView|savedUsers)|Super\/(add|update|delete|create))/;
    if (mutations.test(path)) {
      config.method = "post";
      config.data = { ...(config.params || {}), ...(typeof config.data === "object" && config.data || {}) };
      config.params = undefined;
    }
    if (/^auth\/delete(Education|Experience|Projects)\//.test(path) || /^Jobs\/delete\//.test(path)) config.method = "delete";
    if (path === "Jobs/updateJobById") config.method = "put";
    if (path === "Jobs/apply") config.data.jobId = config.data.jobId || config.data.job_id || config.data.id;
    if (/^Super\/(add|updateAdmin)/.test(path) && config.data) {
      const data = config.data;
      data.name ??= data.skill || data.skills || data.qualification || data.industry || data.department || data.designation || data.jobTitle;
    }
    return config;
  });
  axios.interceptors.response.use(response => {
    const path = apiPath(response.config);
    if (path === null) return response;
    if (path === "auth/login" || path === "auth/validateGoogleEmail") {
      response.data.data = response.data.data.user;
      Cookies.remove("AuthorizationToken", { path: "/" });
      if (typeof window !== "undefined") localStorage.removeItem("password");
    }
    if (/^Jobs\//.test(path)) {
      const adapt = job => job && typeof job === "object" ? { ...job,
        jobtitle: job.jobTitle, companyname: job.companyName, comp_logo: job.companyLogo,
        description: job.jobDescription, qualification: job.requiredQualifications,
        skills: job.requiredSkills, minexperience: job.minExperience, maxexperience: job.maxExperience,
        numberOfOpening: job.vacancies,
      } : job;
      response.data.data = Array.isArray(response.data.data) ? response.data.data.map(adapt) : adapt(response.data.data);
    }
    return response;
  }, async error => {
    const config = error.config;
    const path = config && apiPath(config);
    if (path === null || !config || error.response?.status !== 401 || config._retried || /^(api\/v1\/auth|auth\/(login|register|validateGoogleEmail))/.test(path)) throw error;
    config._retried = true;
    try {
      if (!refreshPromise) refreshPromise = axios.post(`${baseURL}api/v1/auth/refresh`, {}).finally(() => { refreshPromise = null; });
      await refreshPromise;
      return axios(config);
    } catch (refreshError) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
      }
      throw refreshError;
    }
  });
}

export default axios;
