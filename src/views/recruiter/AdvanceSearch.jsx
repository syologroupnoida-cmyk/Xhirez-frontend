import React, { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faXmark,
  faMagnifyingGlass,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

const advancedSections = [
  {
    title: "Employment Details",
    fields: [
      { key: "currentIndustry", label: "Current Industry", placeholder: "Select current industry", type: "select" },
      { key: "functionalArea", label: "Functional Area", placeholder: "Select functional area", type: "select" },
      { key: "currentCompany", label: "Current Company", placeholder: "Enter company name", type: "input" },
      { key: "employmentType", label: "Employment Type", placeholder: "Any", type: "select" },
    ],
  },
  {
    title: "Education Details",
    fields: [
      { key: "highestQualification", label: "Highest Qualification", placeholder: "Select qualification", type: "select" },
      { key: "course", label: "Course", placeholder: "Select course", type: "select" },
      { key: "specialization", label: "Specialization", placeholder: "Enter specialization", type: "input" },
      { key: "institute", label: "Institute", placeholder: "Enter institute name", type: "input" },
    ],
  },
  {
    title: "Additional Parameters",
    fields: [
      { key: "gender", label: "Gender", placeholder: "Any", type: "select" },
      { key: "languagesKnown", label: "Languages Known", placeholder: "Enter languages", type: "input" },
      { key: "candidateActiveIn", label: "Candidate Active In", placeholder: "6 Months", type: "select" },
      { key: "excludeViewedCvs", label: "Exclude Viewed CVs", placeholder: "No", type: "select" },
    ],
  },
];

const initialFormData = {
  anyKeywords: [],
  allKeywords: [],
  location: "",
  minSalary: "",
  maxSalary: "",
  minExp: "",
  maxExp: "",
  noticePeriod: "Any",
  activeIn: "6 Months",
  currentIndustry: "",
  functionalArea: "",
  currentCompany: "",
  employmentType: "",
  highestQualification: "",
  course: "",
  specialization: "",
  institute: "",
  gender: "",
  languagesKnown: "",
  candidateActiveIn: "",
  excludeViewedCvs: "",
};

export default function AdvanceSearch() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [keywordDrafts, setKeywordDrafts] = useState({
    anyKeywords: "",
    allKeywords: "",
  });
  const [openSections, setOpenSections] = useState({
    "Employment Details": false,
    "Education Details": false,
    "Additional Parameters": false,
  });

  const updateField = (field) => (event) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSearch = (event) => {
    event.preventDefault();

    router.push({
      pathname: "/recruiter/search/advanced",
      query: Object.fromEntries(
        Object.entries(formData)
          .map(([key, value]) => [key, Array.isArray(value) ? value.join(" ") : value])
          .filter(([, value]) => value !== "")
      ),
    });
  };

  const toggleSection = (title) => {
    setOpenSections((current) => ({ ...current, [title]: !current[title] }));
  };

  const addKeyword = (field) => {
    const keyword = keywordDrafts[field].trim();
    if (!keyword) return;

    setFormData((current) => ({
      ...current,
      [field]: current[field].includes(keyword) ? current[field] : [...current[field], keyword],
    }));
    setKeywordDrafts((current) => ({ ...current, [field]: "" }));
  };

  const removeKeyword = (field, keyword) => {
    setFormData((current) => ({
      ...current,
      [field]: current[field].filter((item) => item !== keyword),
    }));
  };

  const updateKeywordDraft = (field) => (event) => {
    setKeywordDrafts((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleKeywordKeyDown = (field) => (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addKeyword(field);
    }
  };

  return (
    <main className="min-h-screen bg-white pb-28 font-sans text-[#263241]">
      <form id="advanced-candidate-search" onSubmit={handleSearch} className="mx-auto mt-7 w-[calc(100%-48px)] max-w-[1040px] space-y-5">
        <section className="rounded-[10px] bg-white px-8 py-11 shadow-[0_2px_22px_rgba(15,23,42,0.18)] sm:px-12 lg:px-20">
          <div className="mb-11 flex flex-col gap-5 border-b border-[#edf0f3] pb-7 lg:flex-row lg:justify-end lg:gap-9">
            <label className="inline-flex items-center gap-4 text-base text-[#607080]">
              Boolean Search
              <span className="relative inline-flex h-5 w-10 items-center rounded-full bg-[#d9d9d9]">
                <span className="ml-1 h-4 w-4 rounded-full bg-[#646464]" />
              </span>
            </label>
            <button type="button" className="inline-flex items-center gap-2 rounded-[10px] border-0 bg-transparent p-0 text-base text-[#607080]">
              Search keyword in <span className="font-bold text-[#526171]">Full Profile</span>
              <FontAwesomeIcon icon={faChevronDown} className="text-sm text-[#a5abb2]" />
            </button>
          </div>

          <div className="space-y-10">
            <div className="grid grid-cols-12 gap-y-10">
              <div className="col-span-12 w-full">
                <KeywordChipInput
                  label="Any of these keywords"
                  keywords={formData.anyKeywords}
                  value={keywordDrafts.anyKeywords}
                  onChange={updateKeywordDraft("anyKeywords")}
                  onKeyDown={handleKeywordKeyDown("anyKeywords")}
                  onBlur={() => addKeyword("anyKeywords")}
                  onRemove={(keyword) => removeKeyword("anyKeywords", keyword)}
                  placeholder="Search IT skills with experience"
                />
              </div>
              <div className="col-span-12 w-full">
                <KeywordChipInput
                  label="All of these keywords"
                  keywords={formData.allKeywords}
                  value={keywordDrafts.allKeywords}
                  onChange={updateKeywordDraft("allKeywords")}
                  onKeyDown={handleKeywordKeyDown("allKeywords")}
                  onBlur={() => addKeyword("allKeywords")}
                  onRemove={(keyword) => removeKeyword("allKeywords", keyword)}
                  placeholder="Enter mandatory keywords"
                />
              </div>
            </div>

            <div className="grid gap-x-10 gap-y-10 lg:grid-cols-2">
              <UnderlineInput
                label="Select Current Location"
                value={formData.location}
                onChange={updateField("location")}
                placeholder=""
                dropdown
              />
              <UnderlineSelect
                label="Notice Period"
                value={formData.noticePeriod}
                onChange={updateField("noticePeriod")}
                options={["Any", "Immediate", "15 Days", "30 Days", "60 Days"]}
                compactLabel
              />
            </div>

            <div className="grid gap-x-10 gap-y-10 lg:grid-cols-2">
              <UnderlineSelect
                label="Min Salary"
                value={formData.minSalary}
                onChange={updateField("minSalary")}
                options={["", "1 LPA", "2 LPA", "5 LPA", "10 LPA"]}
              />
              <UnderlineSelect
                label="Max Salary"
                value={formData.maxSalary}
                onChange={updateField("maxSalary")}
                options={["", "5 LPA", "10 LPA", "20 LPA", "30 LPA"]}
              />
            </div>

            <label className="-mt-5 flex items-center gap-3 text-base text-[#34455a]">
              <input type="checkbox" defaultChecked className="h-[21px] w-[21px] accent-[#7447ff]" />
              Also include the candidates with zero salary.
            </label>

            <div className="grid gap-x-10 gap-y-10 lg:grid-cols-2">
              <UnderlineSelect
                label="Min Exp"
                value={formData.minExp}
                onChange={updateField("minExp")}
                options={["", "0 Years", "1 Year", "3 Years", "5 Years"]}
              />
              <UnderlineSelect
                label="Max Exp"
                value={formData.maxExp}
                onChange={updateField("maxExp")}
                options={["", "2 Years", "5 Years", "8 Years", "10+ Years"]}
              />
            </div>

            <label className="flex items-center gap-5 text-base leading-none text-[#34455a]">
              <input type="checkbox" defaultChecked className="h-[21px] w-[21px] shrink-0 accent-[#7447ff]" />
              <span>
                Include candidates who prefer to relocate to above locations{" "}
                <button type="button" className="rounded-[10px] border-0 bg-transparent p-0 text-sm font-bold text-[#7447ff]">
                  Change Preferred Location
                </button>
              </span>
            </label>
          </div>
        </section>

        {advancedSections.map((section) => (
          <section key={section.title} className="rounded-[10px] bg-white px-8 py-9 shadow-[0_2px_18px_rgba(15,23,42,0.14)] sm:px-12 lg:px-20">
            <button
              type="button"
              onClick={() => toggleSection(section.title)}
              className="flex w-full items-center justify-between rounded-[10px] border-0 bg-transparent p-0 text-left"
            >
              <h5 className="m-0 text-[12px] font-semibold text-[#263241]">{section.title}</h5>
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#7447ff]">
                {openSections[section.title] ? "Hide" : "Show"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-[10px] transition-transform ${openSections[section.title] ? "rotate-180" : ""}`}
                />
              </span>
            </button>
            {openSections[section.title] && (
              <div className="mt-9 grid gap-x-10 gap-y-10 lg:grid-cols-2">
                {section.fields.map((field) =>
                  field.type === "select" ? (
                    <UnderlineSelect
                      key={field.key}
                      label={field.label}
                      value={formData[field.key]}
                      onChange={updateField(field.key)}
                      options={[field.placeholder, "Any", "Yes", "No"]}
                    />
                  ) : (
                    <UnderlineInput
                      key={field.key}
                      label={field.label}
                      value={formData[field.key]}
                      onChange={updateField(field.key)}
                      placeholder={field.placeholder}
                    />
                  )
                )}
              </div>
            )}
          </section>
        ))}
      </form>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white py-4 shadow-[0_-4px_16px_rgba(15,23,42,0.08)]">
        <div className="mx-auto flex max-w-[850px] flex-col items-center justify-center gap-5 px-4 sm:flex-row">
          <label className="flex shrink-0 items-center gap-2 whitespace-nowrap text-base text-[#647384]">
            Candidates active in
            <select
              value={formData.activeIn}
              onChange={updateField("activeIn")}
              className="border-0 bg-transparent text-base font-bold text-[#5e6d7c] outline-none"
            >
              <option>6 Months</option>
              <option>3 Months</option>
              <option>1 Year</option>
            </select>
          </label>
          <button
            type="submit"
            form="advanced-candidate-search"
            style={{ borderRadius: "50px" }}
            className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-[50px] border-0 bg-[#5d6cc8] px-7 text-base font-bold text-white shadow-[0_8px_18px_rgba(91,103,200,0.22)]"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-base" />
            Search Candidates
          </button>
          <button
            type="submit"
            form="advanced-candidate-search"
            className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-[50px] border-2 border-[#9d69e8] bg-white px-7 text-base font-bold text-[#5b4bc4]"
          >
            Search with AI
            <FontAwesomeIcon icon={faWandMagicSparkles} className="text-base" />
          </button>
        </div>
      </div>
    </main>
  );
}

function UnderlineInput({ label, value, onChange, placeholder, withCheckbox = false, dropdown = false }) {
  return (
    <label className="block">
      <span className="block text-[16px] font-normal leading-6 text-[#607080]">{label}</span>
      <span className="mt-1 flex h-10 items-center border-b border-[#d4d9de]">
        {withCheckbox && <span className="mr-3 h-[21px] w-[21px] rounded border border-[#d5d8dc] bg-white" />}
        <input
          value={value}
          onChange={onChange}
          className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[14px] leading-5 text-[#263241] outline-none placeholder:text-[14px] placeholder:text-[#9aa6b3]"
          placeholder={placeholder}
        />
        {dropdown && <FontAwesomeIcon icon={faChevronDown} className="ml-3 text-base text-[#a5abb2]" />}
      </span>
    </label>
  );
}

function KeywordChipInput({ label, keywords, value, onChange, onKeyDown, onBlur, onRemove, placeholder }) {
  return (
    <label className="block w-full">
      <span className="block text-[16px] font-normal leading-6 text-[#607080]">{label}</span>
      <span className="mt-1 flex min-h-10 w-full flex-wrap items-center gap-2 border-b border-[#d4d9de] py-1">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="inline-flex h-7 items-center gap-2 rounded-full border border-[#cbd5e1] bg-[#f8fbff] px-3 text-[12px] font-semibold text-[#33465a]"
          >
            {keyword}
            <button
              type="button"
              onClick={() => onRemove(keyword)}
              className="flex aspect-square h-5 w-5 shrink-0 items-center justify-center rounded-[999px] border-0 bg-transparent p-0 text-[10px] leading-none text-[#526171]"
              aria-label={`Remove ${keyword}`}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </span>
        ))}
        <input
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          className="h-8 min-w-[220px] flex-1 border-0 bg-transparent p-0 text-[14px] leading-5 text-[#263241] outline-none placeholder:text-[14px] placeholder:text-[#9aa6b3]"
          placeholder={keywords.length ? "Add another keyword" : placeholder}
        />
      </span>
    </label>
  );
}

function UnderlineSelect({ label, value, onChange, options, compactLabel = false }) {
  return (
    <label className="block">
      <span className={`block font-normal text-[#607080] ${compactLabel ? "text-[14px]" : "text-[16px]"}`}>{label}</span>
      <span className="relative mt-1 block h-10 border-b border-[#d4d9de]">
        <select
          value={value}
          onChange={onChange}
          className="h-full w-full appearance-none border-0 bg-transparent p-0 pr-8 text-[14px] text-[#172033] outline-none"
        >
          {options.map((option) => (
            <option key={option || "blank"} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-1 top-3 text-base text-[#a5abb2]" />
      </span>
    </label>
  );
}
