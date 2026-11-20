import React, { useMemo, useRef, useState } from "react";
import { Link } from "@/router-dom";
import { useNavigate } from "@/router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Info,
  Infinity as InfinityIcon,
  PlayCircle,
  Plus,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  Users,
  X,
} from "lucide-react";
import UnifiedHeader from "../../components/header/UnifiedHeader";
import Footer from "../../components/footer/footer";

/* ------------------------------------------------------------------ */
/* Sample catalog. Replace `ALL_COURSES` with your real course API.    */
/* ------------------------------------------------------------------ */
const IMG = {
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  code: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
  robot: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  net: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  data: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  space: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  laptop: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
  team: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
  chart: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  desk: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
};
const IMG_LIST = Object.values(IMG);

const SEED = [
  ["The Complete Prompt Engineering for AI Bootcamp (2026)", "Learn practical prompt design for ChatGPT, Claude, Gemini and modern AI tools.", "Mike Taylor, James Phoenix", 4.5, 169176, 20.5, 200, "All Levels", 499, ["Prompt Engineering", "ChatGPT", "Generative AI (GenAI)"], true],
  ["Prompt Engineering for Everyone Bootcamp", "Craft better prompts for ChatGPT, Claude, Gemini and other AI platforms.", "Navid Shirzadi, PhD, P.Eng.", 4.5, 36749, 4, 34, "Beginner", 459, ["Prompt Engineering", "ChatGPT"], true],
  ["Prompt Engineering for Work", "Write better, plan faster and think clearer with everyday AI prompting.", "Steve Ballinger, MBA", 4.5, 30764, 1, 14, "Beginner", 449, ["Prompt Engineering", "ChatGPT"], true],
  ["Prompt and Context Engineering 101 for ChatGPT & Claude", "Learn frameworks for ChatGPT, Claude, Claude Code, Cowork and MCP.", "Mike Wheeler, Ezekiel Wheeler, Evan Wheeler", 4.3, 26103, 2.5, 34, "All Levels", 479, ["Prompt Engineering", "ChatGPT", "Claude AI"], true],
  ["Prompt Engineering: ChatGPT & AI Prompts For Work Success!", "Use pattern prompts, templates and advanced prompts to get better results.", "Steve Ballinger, MBA", 4.5, 16575, 2, 33, "Beginner", 569, ["Prompt Engineering", "ChatGPT"], true],
  ["Generative AI Essentials: Prompt Engineering Masterclass", "Master prompt engineering with ChatGPT, Copilot, Gemini and Claude.", "Maven Analytics, Chris Bruehl", 4.5, 16217, 3, 45, "All Levels", 449, ["Prompt Engineering", "Generative AI (GenAI)"], true],
  ["Prompt Engineering Frameworks & Methodologies", "Design, tune and evaluate high-performing prompts for large language models.", "Start-Tech Academy, Abhishek Bansal", 4.5, 15456, 3, 28, "Intermediate", 449, ["Prompt Engineering", "Large Language Models (LLM)"], true],
  ["Complete Prompt Engineering Practical Course C|PEPC", "Go from prompt engineering basics to advanced generative AI workflows.", "Dey Academy, NextGen Tech", 4.6, 7908, 9, 115, "All Levels", 529, ["Prompt Engineering", "Generative AI (GenAI)"], true],
  ["Complete Prompt Engineering, ChatGPT & AI Bootcamp", "Unlock AI with 2,000+ prompts, Midjourney, ChatGPT and Python.", "Saad A", 4.4, 2676, 35.5, 287, "All Levels", 599, ["Prompt Engineering", "ChatGPT", "Midjourney"], true],
  ["Prompt Engineering PRO: AI Prompt Engineering FAST-TRACK", "Go from zero to hero and craft useful AI prompts faster.", "ExpertEase Global", 4.4, 1997, 2.5, 26, "Beginner", 479, ["Prompt Engineering", "ChatGPT"], false],
  ["Practical AI for Work (ChatGPT, Claude, Copilot)", "Use leading AI assistants to improve everyday professional work.", "Gustavo Escobar Henriquez, Federico Garay", 4.6, 2552, 6, 52, "Beginner", 449, ["ChatGPT", "Claude AI", "Generative AI (GenAI)"], true],
  ["The Ultimate ChatGPT Course for Beginners 2026", "A practical A-to-Z introduction to ChatGPT and generative AI.", "Joshua George, ClickSlice Ltd", 4.7, 2997, 5, 48, "Beginner", 569, ["ChatGPT", "Prompt Engineering"], true],
  ["AI for Every Employee: Understanding and Using AI", "Understand how AI tools can support work, communication and productivity.", "Kurt Anderson", 4.5, 4752, 2, 22, "Beginner", 449, ["Artificial Intelligence (AI)", "Generative AI (GenAI)"], false],
  ["Complete Claude AI Masterclass: Beginner to Advanced", "Learn Claude AI workflows, prompting and practical productivity use cases.", "Skilledemia Academy", 4.7, 15, 4, 38, "All Levels", 449, ["Claude AI", "Prompt Engineering"], true],
  ["AI Critical Thinking: The Complete Guide to Modern Thinking", "Build critical thinking skills for working effectively with AI systems.", "Silviu Marisca", 4.8, 699, 3, 30, "Intermediate", 449, ["Artificial Intelligence (AI)", "Prompt Engineering"], false],
  ["ChatGPT & Generative AI: Prompt Engineering for Business", "Apply prompt engineering to business communication and workflows.", "Xhirez AI Academy", 4.5, 3800, 5, 42, "Beginner", 499, ["ChatGPT", "Prompt Engineering"], true],
  ["AI Agents & Agentic AI: A Practical Introduction", "Understand AI agents, tool use and agentic workflows.", "Xhirez AI Academy", 4.6, 2100, 7, 60, "Intermediate", 699, ["AI Agents & Agentic AI", "Large Language Models (LLM)"], true],
  ["Prompt Engineering with ChatGPT Masterclass", "Create reliable prompts for writing, research, analysis and automation.", "Xhirez Learning", 4.5, 5200, 6, 55, "Beginner", 499, ["Prompt Engineering", "ChatGPT"], false],
  ["AI Content Generation with ChatGPT", "Create useful content ideas, drafts and marketing assets with AI.", "Digital Skills Studio", 4.4, 3200, 4, 36, "Beginner", 399, ["AI Content Generation", "ChatGPT"], false],
  ["Large Language Models (LLM) Fundamentals", "Explore how large language models work and how to use them responsibly.", "AI & Data Institute", 4.6, 1800, 8, 68, "Intermediate", 799, ["Large Language Models (LLM)", "Generative AI (GenAI)"], true],
  ["Midjourney and AI Art Prompting Masterclass", "Write image prompts and develop creative AI image workflows.", "Creative AI School", 4.5, 4100, 5, 44, "Beginner", 549, ["Midjourney", "AI Art Generation"], true],
  ["Google Gemini and AI Prompting Essentials", "Use Gemini for research, writing, planning and productivity.", "Xhirez Learning", 4.4, 1900, 3, 28, "Beginner", 399, ["Google Gemini (Bard)", "Prompt Engineering"], false],
  ["Prompt Engineering Interview Preparation", "Prepare for prompt engineering and generative AI role interviews.", "Career Prep Studio", 4.5, 950, 3, 25, "Intermediate", 349, ["Prompt Engineering", "Generative AI (GenAI)"], false],
  ["Free Introduction to ChatGPT and Prompt Engineering", "Explore ChatGPT basics and the foundations of writing effective prompts.", "Xhirez Learning", 4.3, 6200, 1, 12, "Beginner", 0, ["ChatGPT", "Prompt Engineering"], true],
].map((r, i) => ({
  id: i + 1, title: r[0], desc: r[1], instructor: r[2], rating: r[3],
  ratings: r[4], hours: r[5], lectures: r[6], level: r[7], price: r[8],
  topics: r[9], handsOn: r[10], oldPrice: r[8] ? Math.round(r[8] * 1.8) : 0,
  language: i % 7 === 3 ? "Hindi" : "English",
  subtitles: i % 3 === 0 ? ["English", "Hindi"] : ["English"],
  premium: i % 2 === 0, bestseller: r[4] > 9000, isNew: i >= 18,
  image: IMG_LIST[i % IMG_LIST.length],
}));

const ALL_COURSES = SEED;

const TOPIC_CHIPS = [
  "ChatGPT", "Artificial Intelligence (AI)", "AI Agents & Agentic AI", "Midjourney", "AI Art Generation",
  "Generative AI (GenAI)", "AI Content Generation", "Large Language Models (LLM)", "Claude AI", "Google Gemini (Bard)",
];

const CERT_COURSES = [
  { n: "Course 1 of 8", t: "Prompt Engineering Fundamentals", d: "1.2 hours", image: IMG.ai },
  { n: "Course 2 of 8", t: "AI for Brainstorming and Planning", d: "22 mins", image: IMG.team },
  { n: "Course 3 of 8", t: "AI for Research and Insights", d: "26 mins", image: IMG.chart },
  { n: "Course 4 of 8", t: "AI for Writing and Communicating", d: "30 mins", image: IMG.desk },
  { n: "Course 5 of 8", t: "Advanced Prompt Workflows", d: "28 mins", image: IMG.laptop },
];

const DURATIONS = [
  { id: "0-1", label: "0-1 Hour", test: (h) => h <= 1 },
  { id: "1-3", label: "1-3 Hours", test: (h) => h > 1 && h <= 3 },
  { id: "3-6", label: "3-6 Hours", test: (h) => h > 3 && h <= 6 },
  { id: "6-17", label: "6-17 Hours", test: (h) => h > 6 && h <= 17 },
  { id: "17+", label: "17+ Hours", test: (h) => h > 17 },
];

const RATING_OPTIONS = [4.5, 4.0, 3.5, 3.0];

const FILTER_SECTIONS = [
  { key: "topic", title: "Topic", options: ["Prompt Engineering", "ChatGPT", "Generative AI (GenAI)", "Large Language Models (LLM)", "AI Agents & Agentic AI", "Artificial Intelligence (AI)", "AI Art Generation", "AI Content Generation", "Midjourney", "Claude AI", "Google Gemini (Bard)"] },
  { key: "level", title: "Level", options: ["Beginner", "Intermediate", "Advanced", "All Levels"] },
  { key: "language", title: "Language", options: ["English", "Hindi"] },
  { key: "price", title: "Price", options: ["Paid", "Free"] },
  { key: "handsOn", title: "Hands-on Practice", options: ["Has hands-on practice"] },
  { key: "subtitles", title: "Subtitles", options: ["English", "Hindi"] },
];

const SORTS = [
  { id: "popular", label: "Most Popular" },
  { id: "rated", label: "Highest Rated" },
  { id: "new", label: "Newest" },
  { id: "low", label: "Price: Low to High" },
  { id: "high", label: "Price: High to Low" },
];

const PAGE_SIZE = 6;
const inr = (n) => (n === 0 ? "Free" : `₹${n.toLocaleString("en-IN")}.00`);

/* ------------------------------------------------------------------ */
/* small pieces                                                        */
/* ------------------------------------------------------------------ */
function Stars({ value }) {
  return (
    <span className="xh-ga-stars" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={13} className={value >= i - 0.25 ? "on" : value >= i - 0.75 ? "half" : ""} />
      ))}
    </span>
  );
}

function Rail({ children, className = "" }) {
  const ref = useRef(null);
  const [edge, setEdge] = useState({ left: false, right: true });

  const sync = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ left: el.scrollLeft > 8, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 8 });
  };
  const go = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className={`xh-ga-rail ${className}`}>
      {edge.left && (
        <button type="button" className="xh-ga-rail-btn xh-ga-rail-l" onClick={() => go(-1)} aria-label="Scroll left">
          <ChevronLeft size={20} />
        </button>
      )}
      <div className="xh-ga-rail-track" ref={ref} onScroll={sync}>
        {children}
      </div>
      {edge.right && (
        <button type="button" className="xh-ga-rail-btn xh-ga-rail-r" onClick={() => go(1)} aria-label="Scroll right">
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}

function CourseCard({ course, inCart, onCart, onOpen, showInstructor = true }) {
  return (
    <article className="xh-ga-card">
      <button type="button" className="xh-ga-card-img" onClick={onOpen} aria-label={`Open ${course.title}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={course.image} alt="" loading="lazy" />
        {course.premium && (
          <span className="xh-ga-premium">
            <BadgeCheck size={14} /> Premium
          </span>
        )}
      </button>
      <h3>{course.title}</h3>
      {showInstructor && <p className="xh-ga-card-by">{course.instructor}</p>}
      <div className="xh-ga-card-meta">
        {course.bestseller && <span className="xh-ga-badge-best">Bestseller</span>}
        <span className="xh-ga-pill">Course</span>
        <span className="xh-ga-pill">
          <Star size={12} className="on" /> {course.rating}
        </span>
        <span className="xh-ga-pill">{course.ratings.toLocaleString("en-IN")} ratings</span>
      </div>
      <div className="xh-ga-card-foot">
        <strong>{inr(course.price)}</strong>
        <button type="button" className={`xh-ga-btn-line ${inCart ? "is-in" : ""}`} onClick={onCart}>
          {inCart ? (
            <>
              <Check size={15} /> In cart
            </>
          ) : (
            "Add to cart"
          )}
        </button>
      </div>
    </article>
  );
}

function FilterBlock({ title, open, onToggle, children }) {
  return (
    <div className="xh-ga-fblock">
      <button type="button" className="xh-ga-fhead" onClick={onToggle} aria-expanded={open}>
        <span>{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <div className="xh-ga-fbody">{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */
const PromptEngineeringCourses = () => {
  const navigate = useNavigate();
  const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
  const user = token ? JSON.parse(token)?.users : null;

  const [cart, setCart] = useState([]);
  const [tab, setTab] = useState("popular");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [minRating, setMinRating] = useState(0);
  const [durations, setDurations] = useState([]);
  const [picked, setPicked] = useState({});
  const [openBlocks, setOpenBlocks] = useState({ ratings: true, duration: true });
  const [showFilters, setShowFilters] = useState(false);
  const [ratingsMore, setRatingsMore] = useState(false);
  const listTop = useRef(null);

  const handleGetStarted = () => {
    if (user) {
      if (user.userRole === "user") navigate("/dashboardJobs");
      else if (user.userRole === "admin" || user.userRole === "primeadmin") navigate("/Recruitmenthero");
    } else {
      navigate("/business-features");
    }
  };

  const toggleCart = (id) => setCart((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const cartTotal = cart.reduce((sum, id) => sum + (ALL_COURSES.find((c) => c.id === id)?.price || 0), 0);

  const bundle = [ALL_COURSES[7], ALL_COURSES[8]];
  const bundleTotal = Math.round((bundle[0].price + bundle[1].price) * 0.3);
  const bundleAdded = bundle.every((c) => cart.includes(c.id));
  const addBundle = () => setCart((c) => Array.from(new Set([...c, ...bundle.map((b) => b.id)])));

  const startTabs = {
    popular: [...ALL_COURSES].sort((a, b) => b.ratings - a.ratings).slice(0, 8),
    new: ALL_COURSES.filter((c) => c.isNew).slice(0, 8),
    beginner: ALL_COURSES.filter((c) => c.level === "Beginner").slice(0, 8),
  };
  const topML = ALL_COURSES.filter((c) => c.topics.includes("ChatGPT") || c.topics.includes("Prompt Engineering")).slice(0, 8);
  const topAnalytics = ALL_COURSES.filter((c) => c.topics.includes("Generative AI (GenAI)") || c.topics.includes("Large Language Models (LLM)") || c.topics.includes("AI Agents & Agentic AI")).slice(0, 8);

  const instructors = useMemo(() => {
    const map = {};
    ALL_COURSES.forEach((c) => {
      if (!map[c.instructor]) map[c.instructor] = { name: c.instructor, courses: 0, students: 0, rating: 0, topics: new Set() };
      const m = map[c.instructor];
      m.courses += 1;
      m.students += c.ratings * 4;
      m.rating += c.rating;
      c.topics.forEach((t) => m.topics.add(t));
    });
    return Object.values(map)
      .map((m) => ({ ...m, rating: (m.rating / m.courses).toFixed(1), topics: Array.from(m.topics).slice(0, 3).join(", ") }))
      .sort((a, b) => b.students - a.students)
      .slice(0, 8);
  }, []);

  /* ---------- filtering ---------- */
  const filtered = useMemo(() => {
    const match = (c) => {
      if (minRating && c.rating < minRating) return false;
      if (durations.length && !durations.some((id) => DURATIONS.find((d) => d.id === id).test(c.hours))) return false;
      const s = (k) => picked[k] || [];
      if (s("topic").length && !c.topics.some((t) => s("topic").includes(t))) return false;
      if (s("level").length && !s("level").includes(c.level)) return false;
      if (s("language").length && !s("language").includes(c.language)) return false;
      if (s("price").length && !s("price").includes(c.price === 0 ? "Free" : "Paid")) return false;
      if (s("handsOn").length && !c.handsOn) return false;
      if (s("subtitles").length && !c.subtitles.some((x) => s("subtitles").includes(x))) return false;
      return true;
    };
    const list = ALL_COURSES.filter(match);
    const by = {
      popular: (a, b) => b.ratings - a.ratings,
      rated: (a, b) => b.rating - a.rating || b.ratings - a.ratings,
      new: (a, b) => b.id - a.id,
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
    }[sort];
    return list.sort(by);
  }, [minRating, durations, picked, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const activeCount = (minRating ? 1 : 0) + durations.length + Object.values(picked).reduce((n, a) => n + a.length, 0);

  const durationCount = (d) => ALL_COURSES.filter((c) => d.test(c.hours)).length;
  const ratingCount = (r) => ALL_COURSES.filter((c) => c.rating >= r).length;

  const togglePick = (key, value) => {
    setPicked((p) => {
      const cur = p[key] || [];
      return { ...p, [key]: cur.includes(value) ? cur.filter((x) => x !== value) : [...cur, value] };
    });
    setPage(1);
  };
  const toggleDuration = (id) => {
    setDurations((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));
    setPage(1);
  };
  const clearAll = () => {
    setMinRating(0);
    setDurations([]);
    setPicked({});
    setPage(1);
  };
  const goPage = (n) => {
    setPage(n);
    if (listTop.current) listTop.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const toggleBlock = (k) => setOpenBlocks((o) => ({ ...o, [k]: !o[k] }));

  const pagesToShow = () => {
    if (pageCount <= 5) return Array.from({ length: pageCount }, (_, i) => i + 1);
    const out = [1];
    const start = Math.max(2, safePage - 1);
    const end = Math.min(pageCount - 1, safePage + 1);
    if (start > 2) out.push("…");
    for (let i = start; i <= end; i += 1) out.push(i);
    if (end < pageCount - 1) out.push("…2");
    out.push(pageCount);
    return out;
  };

  const filterPanel = (
    <div className="xh-ga-filters">
      {activeCount > 0 && (
        <button type="button" className="xh-ga-clear" onClick={clearAll}>
          <X size={14} /> Clear all filters ({activeCount})
        </button>
      )}

      <FilterBlock title="Ratings" open={!!openBlocks.ratings} onToggle={() => toggleBlock("ratings")}>
        {(ratingsMore ? [...RATING_OPTIONS, 2.5, 2.0] : RATING_OPTIONS).map((r) => (
          <label className="xh-ga-opt" key={r}>
            <input type="radio" name="xh-ga-rating" checked={minRating === r} onChange={() => { setMinRating(r); setPage(1); }} />
            <Stars value={r} /> <span>{r.toFixed(1)} &amp; up</span> <em>({ratingCount(r)})</em>
          </label>
        ))}
        <button type="button" className="xh-ga-more" onClick={() => setRatingsMore(!ratingsMore)}>
          {ratingsMore ? "Show less" : "Show more"} {ratingsMore ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </FilterBlock>

      <FilterBlock title="Video Duration" open={!!openBlocks.duration} onToggle={() => toggleBlock("duration")}>
        {DURATIONS.map((d) => (
          <label className="xh-ga-opt" key={d.id}>
            <input type="checkbox" checked={durations.includes(d.id)} onChange={() => toggleDuration(d.id)} />
            <span>{d.label}</span> <em>({durationCount(d)})</em>
          </label>
        ))}
      </FilterBlock>

      {FILTER_SECTIONS.map((sec) => (
        <FilterBlock key={sec.key} title={sec.title} open={!!openBlocks[sec.key]} onToggle={() => toggleBlock(sec.key)}>
          {sec.options.map((o) => (
            <label className="xh-ga-opt" key={o}>
              <input type="checkbox" checked={(picked[sec.key] || []).includes(o)} onChange={() => togglePick(sec.key, o)} />
              <span>{o}</span>
            </label>
          ))}
        </FilterBlock>
      ))}
    </div>
  );

  return (
    <div className="xh-ga">
      <UnifiedHeader />

      <div style={{ paddingTop: 85 }}>
        {/* ============ TITLE ============ */}
        <section className="xh-ga-wrap xh-ga-title">
          <nav className="xh-ga-crumb" aria-label="Breadcrumb">
            <Link to="/business">E-Campus</Link> <ChevronRight size={14} /> <span>Prompt Engineering</span>
          </nav>
          <h1>Prompt Engineering Courses</h1>
          <p>
            Prompt Engineering relates to <b>IT &amp; Software</b>, <b>Development</b>
          </p>
        </section>

        {/* ============ CERTIFICATE BANNER ============ */}
        <section className="xh-ga-wrap xh-ga-block">
          <h2 className="xh-ga-h2">Learn AI with Xhirez</h2>
          <div className="xh-ga-cert">
            <span className="xh-ga-cert-bg" aria-hidden="true" />
            <div className="xh-ga-cert-card">
              <div className="xh-ga-cert-logo">
                <BadgeCheck size={22} /> Xhirez E-Campus
              </div>
              <h3>AI Prompt Engineering Professional Certificate</h3>
              <p>Build your AI fluency and get more done, faster.</p>
              <div className="xh-ga-cert-meta">
                <span className="xh-ga-pill">
                  <Star size={12} className="on" /> 4.6
                </span>
                <span className="xh-ga-pill">5 total hours</span>
                <span className="xh-ga-pill">8 courses</span>
              </div>
              <button type="button" className="xh-ga-btn-outline" onClick={handleGetStarted}>
                Learn more
              </button>
            </div>

            <Rail className="xh-ga-cert-rail">
              {CERT_COURSES.map((c) => (
                <button type="button" className="xh-ga-cert-item" key={c.t} onClick={handleGetStarted}>
                  <span className="xh-ga-cert-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt="" loading="lazy" />
                    <span className="xh-ga-cert-tag">Xhirez</span>
                  </span>
                  <strong>{c.t}</strong>
                  <span className="xh-ga-cert-foot">
                    <span className="xh-ga-pill">{c.n}</span>
                    <span className="xh-ga-pill">{c.d}</span>
                  </span>
                </button>
              ))}
            </Rail>
          </div>
        </section>

        {/* ============ BUNDLE ============ */}
        <section className="xh-ga-wrap xh-ga-block">
          <div className="xh-ga-bundle">
            <div className="xh-ga-bundle-info">
              <h2>Looking to advance your skills in Prompt Engineering? We&apos;ve got you.</h2>
              <p>Get everything you need to reach your goals in one convenient bundle.</p>
              <ul>
                {["Top-rated courses", "Popular with learners just like you", "Guidance from real-world experts"].map((t) => (
                  <li key={t}>
                    <Check size={18} /> {t}
                  </li>
                ))}
              </ul>
              <div className="xh-ga-bundle-total">
                Total: <strong>{inr(bundleTotal)}</strong>
                <span className="xh-ga-special">
                  <BadgeCheck size={16} /> Special Bundle Price
                </span>
              </div>
              <button type="button" className="xh-ga-btn" onClick={addBundle} disabled={bundleAdded}>
                {bundleAdded ? "Bundle added to cart" : "Add all to cart"}
              </button>
            </div>

            <div className="xh-ga-bundle-courses">
              {bundle.map((c, i) => (
                <React.Fragment key={c.id}>
                  <div className="xh-ga-bundle-item">
                    <div className="xh-ga-bundle-img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.image} alt="" loading="lazy" />
                      <span className="xh-ga-premium">
                        <BadgeCheck size={14} /> Premium
                      </span>
                    </div>
                    <h3>{c.title}</h3>
                    <p className="xh-ga-card-by">{c.instructor}</p>
                    <div className="xh-ga-card-meta">
                      {c.bestseller && <span className="xh-ga-badge-best">Bestseller</span>}
                      <span className="xh-ga-pill">Course</span>
                      <span className="xh-ga-pill">
                        <Star size={12} className="on" /> {c.rating}
                      </span>
                      <span className="xh-ga-pill">{c.ratings.toLocaleString("en-IN")} ratings</span>
                    </div>
                    <div className="xh-ga-card-foot">
                      <strong>{inr(c.price)}</strong>
                      <button type="button" className={`xh-ga-btn-line ${cart.includes(c.id) ? "is-in" : ""}`} onClick={() => toggleCart(c.id)}>
                        {cart.includes(c.id) ? "In cart" : "Add to cart"}
                      </button>
                    </div>
                  </div>
                  {i === 0 && (
                    <span className="xh-ga-plus" aria-hidden="true">
                      <Plus size={20} />
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <p className="xh-ga-learners">
            <Users size={18} /> 1,026,321 Prompt Engineering learners
          </p>
        </section>

        {/* ============ COURSES TO GET YOU STARTED ============ */}
        <section className="xh-ga-wrap xh-ga-block">
          <h2 className="xh-ga-h2">Courses to get you started</h2>
          <p className="xh-ga-sub">Explore courses from experienced, real-world experts.</p>
          <div className="xh-ga-tabs" role="tablist">
            {[
              ["popular", "Most popular"],
              ["new", "New"],
              ["beginner", "Beginner Favorites"],
            ].map(([id, label]) => (
              <button type="button" role="tab" aria-selected={tab === id} className={tab === id ? "is-on" : ""} key={id} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>
          <Rail key={tab}>
            {startTabs[tab].map((c) => (
              <div className="xh-ga-rail-item" key={c.id}>
                <CourseCard course={c} inCart={cart.includes(c.id)} onCart={() => toggleCart(c.id)} onOpen={handleGetStarted} />
              </div>
            ))}
          </Rail>
        </section>

        {/* ============ STUDENTS ALSO LEARN ============ */}
        <section className="xh-ga-wrap xh-ga-block">
          <h2 className="xh-ga-h2">Prompt Engineering students also learn</h2>
          <Rail className="xh-ga-chip-rail">
            <div className="xh-ga-chips">
              {TOPIC_CHIPS.map((t) => (
                <button type="button" key={t} className="xh-ga-chip" onClick={handleGetStarted}>
                  {t}
                </button>
              ))}
            </div>
          </Rail>
        </section>

        {/* ============ TOP COURSES ROWS ============ */}
        <section className="xh-ga-wrap xh-ga-block">
          <h2 className="xh-ga-h2">
            Top courses in Prompt Engineering and <Link to="/business-features" className="xh-ga-link-h">ChatGPT</Link>
          </h2>
          <Rail>
            {topML.map((c) => (
              <div className="xh-ga-rail-item" key={c.id}>
                <CourseCard course={c} inCart={cart.includes(c.id)} onCart={() => toggleCart(c.id)} onOpen={handleGetStarted} />
              </div>
            ))}
          </Rail>
        </section>

        <section className="xh-ga-wrap xh-ga-block">
          <h2 className="xh-ga-h2">
            Top courses in Prompt Engineering and <Link to="/business-features" className="xh-ga-link-h">Generative AI (GenAI)</Link>
          </h2>
          <Rail>
            {topAnalytics.map((c) => (
              <div className="xh-ga-rail-item" key={c.id}>
                <CourseCard course={c} inCart={cart.includes(c.id)} onCart={() => toggleCart(c.id)} onOpen={handleGetStarted} />
              </div>
            ))}
          </Rail>
        </section>

        {/* ============ POPULAR INSTRUCTORS ============ */}
        <section className="xh-ga-wrap xh-ga-block">
          <h2 className="xh-ga-h2">Popular Instructors</h2>
          <p className="xh-ga-sub">These real-world experts are highly rated by learners like you.</p>
          <Rail>
            {instructors.map((ins) => (
              <div className="xh-ga-rail-item" key={ins.name}>
                <article className="xh-ga-ins">
                  <span className="xh-ga-ins-av">{ins.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                  <div>
                    <h3>{ins.name}</h3>
                    <p>{ins.topics}</p>
                    <span className="xh-ga-ins-rate">
                      <b>{ins.rating}</b> <Star size={14} className="on" /> Instructor Rating
                    </span>
                    <span className="xh-ga-ins-stat">
                      <b>{ins.students.toLocaleString("en-IN")}</b> students
                    </span>
                    <span className="xh-ga-ins-stat">
                      <b>{ins.courses}</b> courses
                    </span>
                  </div>
                </article>
              </div>
            ))}
          </Rail>
        </section>

        {/* ============ ALL COURSES ============ */}
        <section className="xh-ga-wrap xh-ga-block" ref={listTop}>
          <h2 className="xh-ga-h2 xh-ga-h2-lg">All Prompt Engineering courses</h2>
          <div className="xh-ga-guarantee">
            <Info size={26} /> <b>Not sure? All courses have a 30-day money-back guarantee</b>
          </div>

          <div className="xh-ga-layout">
            <div className="xh-ga-toolbar">
              <button type="button" className="xh-ga-filter-btn" onClick={() => setShowFilters(true)}>
                <SlidersHorizontal size={16} /> Filter{activeCount ? ` (${activeCount})` : ""}
              </button>
              <label className="xh-ga-sort">
                <small>Sort by</small>
                <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              <span className="xh-ga-count">{filtered.length.toLocaleString("en-IN")} results</span>
            </div>

            <aside className="xh-ga-side">{filterPanel}</aside>

            <div className="xh-ga-list">
              {visible.length === 0 && (
                <div className="xh-ga-empty">
                  <h3>No courses match these filters</h3>
                  <button type="button" className="xh-ga-btn-outline" onClick={clearAll}>
                    Clear all filters
                  </button>
                </div>
              )}

              {visible.map((c) => (
                <article className="xh-ga-row" key={c.id}>
                  <button type="button" className="xh-ga-row-img" onClick={handleGetStarted} aria-label={`Open ${c.title}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt="" loading="lazy" />
                  </button>
                  <div className="xh-ga-row-body">
                    <div className="xh-ga-row-main">
                      <h3>{c.title}</h3>
                      <p className="xh-ga-row-desc">{c.desc}</p>
                      <p className="xh-ga-card-by">{c.instructor}</p>
                      <div className="xh-ga-row-rate">
                        <b>{c.rating}</b> <Stars value={c.rating} /> <span>({c.ratings.toLocaleString("en-IN")})</span>
                      </div>
                      <p className="xh-ga-row-info">
                        {c.hours} total hours · {c.lectures} lectures · {c.level}
                      </p>
                      <strong className="xh-ga-row-price">{inr(c.price)}</strong>
                      <div className="xh-ga-row-badges">
                        {c.premium && (
                          <span className="xh-ga-premium xh-ga-premium-flat">
                            <BadgeCheck size={14} /> Premium
                          </span>
                        )}
                        {c.bestseller && <span className="xh-ga-badge-best">Bestseller</span>}
                      </div>
                    </div>
                    <button type="button" className={`xh-ga-btn-line xh-ga-row-add ${cart.includes(c.id) ? "is-in" : ""}`} onClick={() => toggleCart(c.id)}>
                      {cart.includes(c.id) ? (
                        <>
                          <Check size={15} /> In cart
                        </>
                      ) : (
                        "Add to cart"
                      )}
                    </button>
                  </div>
                </article>
              ))}

              {filtered.length > PAGE_SIZE && (
                <nav className="xh-ga-pager" aria-label="Pagination">
                  <button type="button" className="xh-ga-pg-arrow" onClick={() => goPage(Math.max(1, safePage - 1))} disabled={safePage === 1} aria-label="Previous page">
                    <ChevronLeft size={18} />
                  </button>
                  {pagesToShow().map((p) =>
                    typeof p === "number" ? (
                      <button type="button" key={p} className={`xh-ga-pg ${p === safePage ? "is-on" : ""}`} onClick={() => goPage(p)}>
                        {p}
                      </button>
                    ) : (
                      <span className="xh-ga-dots" key={p}>
                        …
                      </span>
                    )
                  )}
                  <button type="button" className="xh-ga-pg-arrow" onClick={() => goPage(Math.min(pageCount, safePage + 1))} disabled={safePage === pageCount} aria-label="Next page">
                    <ChevronRight size={18} />
                  </button>
                </nav>
              )}
            </div>
          </div>
        </section>

        {/* ============ VALUE STRIP ============ */}
        <section className="xh-ga-strip">
          <div className="xh-ga-wrap xh-ga-strip-in">
            {[
              [<PlayCircle size={20} key="a" />, "Learn in-demand skills with hundreds of video courses"],
              [<Star size={20} key="b" />, "Choose courses taught by real-world experts"],
              [<InfinityIcon size={20} key="c" />, "Learn at your own pace, with lifetime access on mobile and desktop"],
            ].map(([icon, text]) => (
              <div className="xh-ga-strip-item" key={text}>
                <span>{icon}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* floating cart */}
      {cart.length > 0 && (
        <div className="xh-ga-cart" role="status">
          <ShoppingCart size={18} />
          <span>
            {cart.length} course{cart.length > 1 ? "s" : ""} · <b>{inr(cartTotal)}</b>
          </span>
          <button type="button" onClick={handleGetStarted}>
            Checkout <ArrowRight size={15} />
          </button>
          <button type="button" className="xh-ga-cart-x" onClick={() => setCart([])} aria-label="Empty cart">
            <X size={15} />
          </button>
        </div>
      )}

      {/* mobile filter drawer */}
      {showFilters && (
        <div className="xh-ga-drawer" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="xh-ga-drawer-bg" onClick={() => setShowFilters(false)} />
          <div className="xh-ga-drawer-panel">
            <div className="xh-ga-drawer-head">
              <b>Filters</b>
              <button type="button" onClick={() => setShowFilters(false)} aria-label="Close filters">
                <X size={20} />
              </button>
            </div>
            <div className="xh-ga-drawer-body">{filterPanel}</div>
            <div className="xh-ga-drawer-foot">
              <button type="button" className="xh-ga-btn" onClick={() => setShowFilters(false)}>
                Show {filtered.length} results
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        .xh-ga, .xh-ga *, .xh-ga *::before, .xh-ga *::after { box-sizing: border-box; }
        .xh-ga { background: #fff; color: #1b2430; font-family: var(--xh-font, 'Roboto', system-ui, sans-serif); }
        .xh-ga h1, .xh-ga h2, .xh-ga h3, .xh-ga p, .xh-ga ul { margin: 0; padding: 0; }
        .xh-ga ul { list-style: none; }
        .xh-ga button { font-family: inherit; cursor: pointer; }
        .xh-ga a { text-decoration: none; }
        .xh-ga-wrap { max-width: 1240px; margin: 0 auto; padding: 0 20px; }
        .xh-ga-block { padding-top: 52px; }

        .xh-ga-title { padding-top: 36px; }
        .xh-ga-crumb { display: flex; align-items: center; gap: 6px; font-size: 14px; color: #6a7380; margin-bottom: 14px; }
        .xh-ga-crumb a { color: #6d28d9 !important; font-weight: 600; }
        .xh-ga-title h1 { font-size: clamp(30px, 4vw, 44px); font-weight: 800; letter-spacing: -.02em; line-height: 1.1; }
        .xh-ga-title p { margin-top: 10px; font-size: 18px; color: #6a7380; }
        .xh-ga-title p b { color: #6d28d9; font-weight: 700; }
        .xh-ga-h2 { font-size: clamp(22px, 2.6vw, 28px); font-weight: 700; letter-spacing: -.01em; line-height: 1.2; margin-bottom: 8px; }
        .xh-ga-h2-lg { font-size: clamp(26px, 3vw, 34px); margin-bottom: 18px; }
        .xh-ga-sub { font-size: 17px; color: #6a7380; margin-bottom: 18px; }
        .xh-ga-link-h { color: #6d28d9 !important; border-bottom: 2px solid #6d28d9; }

        /* shared atoms */
        .xh-ga-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; background: #6d28d9; color: #fff !important; font-weight: 700; font-size: 16px; padding: 15px 22px; border-radius: 8px; width: 100%; transition: background .15s; }
        .xh-ga-btn:hover { background: #5b21b6; }
        .xh-ga-btn:disabled { background: #b69af0; cursor: default; }
        .xh-ga-btn-outline { display: inline-flex; align-items: center; justify-content: center; width: 100%; border: 1.5px solid #6d28d9; background: #fff; color: #6d28d9 !important; font-weight: 700; font-size: 16px; padding: 14px 18px; border-radius: 8px; transition: background .15s; }
        .xh-ga-btn-outline:hover { background: #f3e8ff; }
        .xh-ga-btn-line { display: inline-flex; align-items: center; gap: 6px; border: 1.5px solid #6d28d9; background: #fff; color: #6d28d9 !important; font-weight: 700; font-size: 15px; padding: 10px 18px; border-radius: 8px; white-space: nowrap; transition: background .15s, color .15s; }
        .xh-ga-btn-line:hover { background: #f3e8ff; }
        .xh-ga-btn-line.is-in { background: #6d28d9; color: #fff !important; }
        .xh-ga-pill { display: inline-flex; align-items: center; gap: 4px; border: 1px solid #d6dbe5; border-radius: 4px; padding: 2px 7px; font-size: 12px; color: #4b5563; background: #fff; white-space: nowrap; }
        .xh-ga svg.on { color: #b4690e; fill: #b4690e; }
        .xh-ga svg.half { color: #b4690e; fill: #e9c58f; }
        .xh-ga-badge-best { background: #d9f1fb; color: #0a5c80; font-weight: 700; font-size: 12px; padding: 3px 8px; border-radius: 4px; }
        .xh-ga-premium { position: absolute; left: 10px; top: 10px; display: inline-flex; align-items: center; gap: 5px; background: #6d28d9; color: #fff; font-size: 12px; font-weight: 700; padding: 5px 9px; border-radius: 6px; }
        .xh-ga-premium-flat { position: static; }
        .xh-ga-stars { display: inline-flex; gap: 1px; }
        .xh-ga-stars svg { color: #c7cdd8; fill: #fff; }

        /* rail */
        .xh-ga-rail { position: relative; }
        .xh-ga-rail-track { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x proximity; padding: 4px 2px 8px; scrollbar-width: none; }
        .xh-ga-rail-track::-webkit-scrollbar { display: none; }
        .xh-ga-rail-item { flex: 0 0 calc((100% - 48px) / 4); min-width: 250px; scroll-snap-align: start; display: flex; }
        .xh-ga-rail-btn { position: absolute; top: 40%; z-index: 3; width: 46px; height: 46px; border-radius: 50%; border: 0; background: #fff; color: #1b2430; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 2px 14px rgba(15,23,42,.28); transition: transform .15s; }
        .xh-ga-rail-btn:hover { transform: scale(1.06); }
        .xh-ga-rail-l { left: -14px; }
        .xh-ga-rail-r { right: -14px; }

        /* course card */
        .xh-ga-card { width: 100%; border: 1px solid #e3e8ef; border-radius: 14px; background: #fff; padding: 16px; display: flex; flex-direction: column; gap: 6px; transition: box-shadow .2s, transform .2s; }
        .xh-ga-card:hover { box-shadow: 0 14px 30px rgba(15,23,42,.12); transform: translateY(-3px); }
        .xh-ga-card-img { position: relative; display: block; padding: 0; border: 0; background: #e8edf5; border-radius: 10px; overflow: hidden; aspect-ratio: 16 / 9; margin-bottom: 8px; }
        .xh-ga-card-img img, .xh-ga-bundle-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .35s; }
        .xh-ga-card:hover .xh-ga-card-img img { transform: scale(1.05); }
        .xh-ga-card h3 { font-size: 18px; font-weight: 700; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 47px; }
        .xh-ga-card-by { font-size: 13px; color: #6a7380; line-height: 1.4; }
        .xh-ga-card-meta { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding-top: 8px; }
        .xh-ga-card-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 10px; }
        .xh-ga-card-foot strong { font-size: 19px; font-weight: 700; }

        /* certificate */
        .xh-ga-cert { position: relative; display: grid; grid-template-columns: 340px minmax(0, 1fr); gap: 26px; padding: 30px; border-radius: 22px; background: linear-gradient(120deg, #073f49, #075b63 55%, #0b3e48); overflow: hidden; }
        .xh-ga-cert-bg { position: absolute; inset: 0; background: linear-gradient(115deg, transparent 38%, rgba(255,255,255,.07) 38%, rgba(255,255,255,.07) 62%, transparent 62%); pointer-events: none; }
        .xh-ga-cert-card { position: relative; background: #fff; border-radius: 14px; padding: 24px; display: flex; flex-direction: column; gap: 10px; align-self: start; }
        .xh-ga-cert-logo { display: inline-flex; align-items: center; gap: 8px; font-size: 20px; font-weight: 800; color: #6d28d9; }
        .xh-ga-cert-card h3 { font-size: 30px; font-weight: 700; line-height: 1.12; letter-spacing: -.01em; }
        .xh-ga-cert-card p { font-size: 16px; line-height: 1.6; color: #4b5563; }
        .xh-ga-cert-meta { display: flex; flex-wrap: wrap; gap: 6px; margin: 4px 0 8px; }
        .xh-ga-cert-rail { min-width: 0; }
        .xh-ga-cert-rail .xh-ga-rail-track { align-items: stretch; }
        .xh-ga-cert-item { flex: 0 0 240px; background: #fff; border: 0; border-radius: 12px; padding: 14px; text-align: left; display: flex; flex-direction: column; gap: 10px; scroll-snap-align: start; transition: transform .2s, box-shadow .2s; }
        .xh-ga-cert-item:hover { transform: translateY(-4px); box-shadow: 0 16px 30px rgba(0,0,0,.25); }
        .xh-ga-cert-thumb { position: relative; display: block; border-radius: 8px; overflow: hidden; aspect-ratio: 16 / 10; background: #dfe7f5; }
        .xh-ga-cert-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .xh-ga-cert-tag { position: absolute; left: 8px; bottom: 8px; background: #fff; color: #6d28d9; font-size: 11px; font-weight: 800; padding: 3px 9px; border-radius: 99px; }
        .xh-ga-cert-item strong { font-size: 18px; font-weight: 700; line-height: 1.3; color: #1b2430; flex: 1; }
        .xh-ga-cert-foot { display: flex; flex-wrap: wrap; gap: 6px; }

        /* bundle */
        .xh-ga-bundle { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 30px; border: 1px solid #e3e8ef; border-radius: 16px; padding: 28px; }
        .xh-ga-bundle-info h2 { font-size: clamp(22px, 2.6vw, 30px); font-weight: 700; line-height: 1.25; margin-bottom: 10px; }
        .xh-ga-bundle-info > p { font-size: 18px; color: #4b5563; margin-bottom: 14px; }
        .xh-ga-bundle-info li { display: flex; align-items: center; gap: 10px; font-size: 17px; color: #4b5563; margin-bottom: 9px; }
        .xh-ga-bundle-info li svg { color: #6d28d9; }
        .xh-ga-bundle-total { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 22px; margin: 18px 0 16px; }
        .xh-ga-bundle-total strong { font-size: 28px; }
        .xh-ga-special { display: inline-flex; align-items: center; gap: 6px; background: #c9f0e1; color: #0a5a40; font-size: 15px; font-weight: 700; padding: 8px 12px; border-radius: 8px; }
        .xh-ga-bundle-courses { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .xh-ga-bundle-item { border: 1px solid #e3e8ef; border-radius: 14px; padding: 14px; display: flex; flex-direction: column; gap: 6px; }
        .xh-ga-bundle-img { position: relative; border-radius: 10px; overflow: hidden; aspect-ratio: 16 / 9; background: #e8edf5; margin-bottom: 6px; }
        .xh-ga-bundle-item h3 { font-size: 17px; font-weight: 700; line-height: 1.3; }
        .xh-ga-plus { position: absolute; left: 50%; top: 32%; transform: translate(-50%, -50%); z-index: 2; width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 1px solid #d6dbe5; box-shadow: 0 2px 10px rgba(15,23,42,.18); display: inline-flex; align-items: center; justify-content: center; }
        .xh-ga-learners { display: flex; align-items: center; gap: 10px; margin-top: 18px; font-size: 16px; color: #4b5563; }

        /* tabs */
        .xh-ga-tabs { display: flex; gap: 6px; border-bottom: 1px solid #d6dbe5; margin-bottom: 20px; overflow-x: auto; }
        .xh-ga-tabs button { border: 0; background: none; padding: 12px 14px; font-size: 17px; color: #6a7380; border-bottom: 3px solid transparent; margin-bottom: -1px; white-space: nowrap; }
        .xh-ga-tabs button:hover { color: #1b2430; }
        .xh-ga-tabs button.is-on { color: #1b2430; font-weight: 700; border-bottom-color: #1b2430; }

        /* chips */
        .xh-ga-chips { display: grid; grid-template-rows: repeat(2, auto); grid-auto-flow: column; grid-auto-columns: calc((100% - 64px) / 5); gap: 10px 16px; min-width: 100%; }
        .xh-ga-chip { min-width: 190px; min-height: 68px; border: 1px solid #d6dbe5; background: #fff; border-radius: 4px; font-size: 17px; font-weight: 600; color: #1b2430; padding: 10px 14px; transition: background .15s, border-color .15s; }
        .xh-ga-chip:hover { background: #f1f5ff; border-color: #6d28d9; color: #6d28d9; }
        .xh-ga-chip-rail .xh-ga-rail-btn { top: 38%; }

        /* instructors */
        .xh-ga-ins { width: 100%; display: flex; gap: 16px; border: 1px solid #e3e8ef; border-radius: 14px; padding: 20px; background: #fff; transition: box-shadow .2s; }
        .xh-ga-ins:hover { box-shadow: 0 12px 26px rgba(15,23,42,.1); }
        .xh-ga-ins-av { flex: 0 0 76px; width: 76px; height: 76px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 800; color: #fff; background: linear-gradient(135deg, #6d28d9, #07a1e3); }
        .xh-ga-ins h3 { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
        .xh-ga-ins p { font-size: 14px; color: #4b5563; line-height: 1.45; margin-bottom: 8px; }
        .xh-ga-ins-rate { display: flex; align-items: center; gap: 5px; font-size: 14px; color: #b4690e; margin-bottom: 4px; }
        .xh-ga-ins-rate b { font-size: 16px; }
        .xh-ga-ins-stat { display: block; font-size: 14px; color: #1b2430; }

        /* all courses */
        .xh-ga-guarantee { display: flex; align-items: center; gap: 14px; border: 1px solid #d6dbe5; border-radius: 40px; padding: 20px 26px; margin-bottom: 26px; font-size: 18px; }
        .xh-ga-guarantee svg { color: #6d28d9; flex-shrink: 0; }
        .xh-ga-layout { display: grid; grid-template-columns: 340px minmax(0, 1fr); column-gap: 30px; align-items: start; }
        .xh-ga-toolbar { grid-column: 1 / -1; display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
        .xh-ga-filter-btn { display: inline-flex; align-items: center; gap: 8px; border: 1px solid #1b2430; background: #fff; border-radius: 8px; padding: 0 20px; height: 56px; font-weight: 700; font-size: 16px; color: #1b2430; }
        .xh-ga-filter-btn:hover { background: #f3f6fb; }
        .xh-ga-sort { display: flex; flex-direction: column; justify-content: center; border: 1px solid #1b2430; border-radius: 8px; height: 56px; padding: 4px 14px; min-width: 220px; }
        .xh-ga-sort small { font-size: 12px; color: #4b5563; }
        .xh-ga-sort select { border: 0; outline: 0; background: transparent; font-size: 16px; font-weight: 500; color: #1b2430; padding: 0; margin-left: -2px; cursor: pointer; font-family: inherit; }
        .xh-ga-count { margin-left: auto; font-size: 17px; font-weight: 700; color: #6a7380; }
        .xh-ga-filter-btn { display: none; }

        .xh-ga-filters { display: block; }
        .xh-ga-clear { display: inline-flex; align-items: center; gap: 6px; border: 0; background: #f3e8ff; color: #6d28d9; font-weight: 700; font-size: 14px; padding: 8px 12px; border-radius: 8px; margin-bottom: 8px; }
        .xh-ga-fblock { border-bottom: 1px solid #d6dbe5; }
        .xh-ga-fhead { width: 100%; display: flex; align-items: center; justify-content: space-between; border: 0; background: none; padding: 20px 0; font-size: 20px; font-weight: 700; color: #1b2430; text-align: left; }
        .xh-ga-fbody { padding: 0 0 18px; display: grid; gap: 12px; }
        .xh-ga-opt { display: flex; align-items: center; gap: 10px; font-size: 16px; color: #1b2430; cursor: pointer; }
        .xh-ga-opt em { font-style: normal; color: #6a7380; font-size: 15px; }
        .xh-ga-opt input { width: 20px; height: 20px; accent-color: #6d28d9; flex-shrink: 0; margin: 0; }
        .xh-ga-more { display: inline-flex; align-items: center; gap: 4px; border: 0; background: none; padding: 0; color: #6d28d9; font-weight: 700; font-size: 15px; width: max-content; }

        .xh-ga-list { min-width: 0; }
        .xh-ga-row { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 22px; padding: 20px 0; border-bottom: 1px solid #d6dbe5; }
        .xh-ga-row:first-child { padding-top: 0; }
        .xh-ga-row-img { display: block; padding: 0; border: 0; background: #e8edf5; border-radius: 10px; overflow: hidden; aspect-ratio: 16 / 10; align-self: start; }
        .xh-ga-row-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .35s; }
        .xh-ga-row:hover .xh-ga-row-img img { transform: scale(1.05); }
        .xh-ga-row-body { display: flex; gap: 20px; justify-content: space-between; min-width: 0; }
        .xh-ga-row-main { min-width: 0; display: flex; flex-direction: column; gap: 5px; }
        .xh-ga-row-main h3 { font-size: 19px; font-weight: 700; line-height: 1.3; }
        .xh-ga-row-desc { font-size: 15px; color: #4b5563; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .xh-ga-row-rate { display: flex; align-items: center; gap: 6px; font-size: 14px; color: #6a7380; }
        .xh-ga-row-rate b { color: #b4690e; font-size: 15px; }
        .xh-ga-row-info { font-size: 14px; color: #6a7380; }
        .xh-ga-row-price { font-size: 19px; margin-top: 2px; }
        .xh-ga-row-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
        .xh-ga-row-add { align-self: flex-start; }
        .xh-ga-empty { text-align: center; border: 1px dashed #c4cddd; border-radius: 14px; padding: 48px 20px; display: grid; gap: 16px; justify-items: center; }
        .xh-ga-empty h3 { font-size: 20px; }
        .xh-ga-empty .xh-ga-btn-outline { width: auto; }

        .xh-ga-pager { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 34px 0 8px; }
        .xh-ga-pg, .xh-ga-pg-arrow { width: 44px; height: 44px; border-radius: 50%; border: 0; background: none; font-size: 17px; font-weight: 700; color: #6d28d9; position: relative; }
        .xh-ga-pg:hover { background: #f3e8ff; }
        .xh-ga-pg.is-on::after { content: ""; position: absolute; left: 10px; right: 10px; bottom: 4px; height: 3px; border-radius: 3px; background: #6d28d9; }
        .xh-ga-pg-arrow { background: #fff; color: #1b2430; box-shadow: 0 2px 10px rgba(15,23,42,.16); display: inline-flex; align-items: center; justify-content: center; }
        .xh-ga-pg-arrow:disabled { opacity: .35; cursor: default; }
        .xh-ga-dots { color: #6d28d9; font-weight: 700; }

        /* strip */
        .xh-ga-strip { margin-top: 40px; border-top: 1px solid #d6dbe5; border-bottom: 1px solid #d6dbe5; }
        .xh-ga-strip-in { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 30px; padding-top: 28px; padding-bottom: 28px; }
        .xh-ga-strip-item { display: flex; align-items: center; gap: 16px; }
        .xh-ga-strip-item span { flex: 0 0 50px; width: 50px; height: 50px; border-radius: 50%; background: #e9edf5; color: #1b2430; display: inline-flex; align-items: center; justify-content: center; }
        .xh-ga-strip-item p { font-size: 18px; font-weight: 600; line-height: 1.35; }

        /* cart pill */
        .xh-ga-cart { position: fixed; right: 20px; bottom: 20px; z-index: 50; display: flex; align-items: center; gap: 12px; background: #141b2d; color: #fff; padding: 10px 10px 10px 18px; border-radius: 14px; box-shadow: 0 16px 36px rgba(15,23,42,.35); font-size: 15px; }
        .xh-ga-cart svg { color: #7aa2ff; }
        .xh-ga-cart button { display: inline-flex; align-items: center; gap: 6px; border: 0; background: #6d28d9; color: #fff; font-weight: 700; padding: 10px 14px; border-radius: 9px; }
        .xh-ga-cart .xh-ga-cart-x { background: rgba(255,255,255,.12); padding: 10px; }

        /* drawer */
        .xh-ga-drawer { position: fixed; inset: 0; z-index: 90; }
        .xh-ga-drawer-bg { position: absolute; inset: 0; background: rgba(8,12,24,.55); }
        .xh-ga-drawer-panel { position: absolute; left: 0; top: 0; bottom: 0; width: min(420px, 92vw); background: #fff; display: flex; flex-direction: column; animation: xhGaSlide .25s ease; }
        @keyframes xhGaSlide { from { transform: translateX(-30px); opacity: 0; } to { transform: none; opacity: 1; } }
        .xh-ga-drawer-head { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-bottom: 1px solid #e3e8ef; font-size: 20px; }
        .xh-ga-drawer-head button { border: 0; background: none; color: #1b2430; }
        .xh-ga-drawer-body { flex: 1; overflow-y: auto; padding: 4px 20px 20px; }
        .xh-ga-drawer-foot { padding: 14px 20px; border-top: 1px solid #e3e8ef; }

        /* responsive */
        @media (max-width: 1100px) {
          .xh-ga-cert { grid-template-columns: 1fr; }
          .xh-ga-bundle { grid-template-columns: 1fr; }
          .xh-ga-rail-item { flex-basis: calc((100% - 32px) / 3); }
          .xh-ga-chips { grid-auto-columns: calc((100% - 32px) / 3); }
        }
        @media (max-width: 900px) {
          .xh-ga-layout { grid-template-columns: 1fr; }
          .xh-ga-side { display: none; }
          .xh-ga-filter-btn { display: inline-flex; }
          .xh-ga-row { grid-template-columns: 200px minmax(0, 1fr); }
          .xh-ga-strip-in { grid-template-columns: 1fr; gap: 18px; }
        }
        @media (max-width: 640px) {
          .xh-ga-rail-item { flex-basis: 78%; }
          .xh-ga-rail-btn { display: none; }
          .xh-ga-chips { grid-auto-columns: 62%; }
          .xh-ga-bundle { padding: 18px; }
          .xh-ga-bundle-courses { grid-template-columns: 1fr; }
          .xh-ga-plus { display: none; }
          .xh-ga-cert { padding: 16px; }
          .xh-ga-cert-card h3 { font-size: 24px; }
          .xh-ga-row { grid-template-columns: 1fr; }
          .xh-ga-row-body { flex-direction: column; }
          .xh-ga-row-add { align-self: stretch; justify-content: center; }
          .xh-ga-toolbar { flex-wrap: wrap; }
          .xh-ga-sort { flex: 1; min-width: 0; }
          .xh-ga-count { width: 100%; margin: 0; }
          .xh-ga-guarantee { border-radius: 18px; padding: 16px; font-size: 16px; }
          .xh-ga-cart { left: 12px; right: 12px; bottom: 12px; justify-content: space-between; }
        }
      `}</style>
    </div>
  );
};

export default PromptEngineeringCourses;