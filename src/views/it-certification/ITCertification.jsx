import React, { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@/router-dom";
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
/* IT Certification course catalog                                    */
/* ------------------------------------------------------------------ */

const IMG = {
  aws: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85",
  security: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=85",
  cloud: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",
  network: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85",
  data: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
  code: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=85",
  team: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
  server: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85",
};

const IMG_LIST = Object.values(IMG);

const IT_COURSES = [
  {
    id: 1,
    title: "Ultimate AWS Certified Solutions Architect Associate 2026",
    desc: "Full Practice Exam | Learn Cloud Computing | Pass the AWS Certified Solutions Architect Associate Certification SAA-C03!",
    instructor: "Stephane Maarek | AWS Certified Cloud Practitioner, Solutions Architect",
    rating: 4.7,
    ratings: 300297,
    hours: 27,
    lectures: 396,
    level: "All Levels",
    price: 3469,
    topic: "AWS Certified Solutions Architect - Associate",
    subcategory: "IT Certifications",
    language: "English",
    practice: ["Practice Tests", "Quizzes"],
    image: IMG.aws,
    badge: "Bestseller",
  },
  {
    id: 2,
    title: "[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02 2026",
    desc: "Full Practice Exam included + explanations | Learn Cloud Computing | Pass the AWS Cloud Practitioner CLF-C02 exam!",
    instructor: "Stephane Maarek | AWS Certified Cloud Practitioner",
    rating: 4.7,
    ratings: 297308,
    hours: 14.5,
    lectures: 277,
    level: "Beginner",
    price: 3469,
    topic: "AWS Certified Cloud Practitioner",
    subcategory: "IT Certifications",
    language: "English",
    practice: ["Practice Tests", "Quizzes"],
    image: IMG.aws,
    badge: "Bestseller",
  },
  {
    id: 3,
    title: "Master Microsoft Azure Fundamentals: AZ-900 Exam Prep 2026",
    desc: "Pass AZ-900 with quizzes, practice tests, a study guide and audio. Updated for 2026.",
    instructor: "Scott Duffy | Software Architect.ca",
    rating: 4.6,
    ratings: 143199,
    hours: 9.5,
    lectures: 91,
    level: "Beginner",
    price: 3779,
    topic: "AZ-900: Microsoft Azure Fundamentals",
    subcategory: "IT Certifications",
    language: "English",
    practice: ["Practice Tests"],
    image: IMG.cloud,
    badge: "Bestseller",
  },
  {
    id: 4,
    title: "Ultimate AWS Certified Developer Associate 2026 DVA-C02",
    desc: "Full Practice Exam with Explanations included! Pass the Amazon Web Services Certified Developer Certification.",
    instructor: "Stephane Maarek",
    rating: 4.7,
    ratings: 124889,
    hours: 31.5,
    lectures: 447,
    level: "All Levels",
    price: 3959,
    topic: "Amazon AWS",
    subcategory: "IT Certifications",
    language: "English",
    practice: ["Practice Tests", "Coding Exercises"],
    image: IMG.aws,
    badge: "Bestseller",
  },
  {
    id: 5,
    title: "CompTIA Security+ (SY0-701) Complete Course & Practice Exam",
    desc: "CompTIA Security+ Bootcamp - Your preparation for the world's best cybersecurity certification!",
    instructor: "Jason Dion • 3 Million+ Enrollments Worldwide",
    rating: 4.7,
    ratings: 124802,
    hours: 31,
    lectures: 265,
    level: "All Levels",
    price: 4649,
    topic: "CompTIA Security+",
    subcategory: "Network & Security",
    language: "English",
    practice: ["Practice Tests", "Quizzes"],
    image: IMG.security,
    badge: "Bestseller",
  },
  {
    id: 6,
    title: "Introduction to Service Management with ITIL 4",
    desc: "Learn about service management, four dimensions, guiding principles, service value system, and ITSM best practices.",
    instructor: "Jason Dion • Dion Training Solutions",
    rating: 4.5,
    ratings: 119128,
    hours: 2,
    lectures: 24,
    level: "Beginner",
    price: 3949,
    topic: "ITIL 4 Foundation",
    subcategory: "Operating Systems & Servers",
    language: "English",
    practice: ["Quizzes"],
    image: IMG.security,
    badge: "Bestseller",
  },
  {
    id: 7,
    title: "Certified Kubernetes Administrator (CKA) with Practice Tests",
    desc: "Prepare for the Certified Kubernetes Administrators Certification with live practice tests right in your browser.",
    instructor: "Mumshad Mannambeth, KodeKloud Training",
    rating: 4.7,
    ratings: 94740,
    hours: 26,
    lectures: 312,
    level: "All Levels",
    price: 3779,
    topic: "Kubernetes Administrator",
    subcategory: "Operating Systems & Servers",
    language: "English",
    practice: ["Practice Tests", "Coding Exercises"],
    image: IMG.server,
    badge: "Bestseller",
  },
  {
    id: 8,
    title: "Cisco CCNA 200-301 – The Complete Guide to Getting Certified",
    desc: "The top rated CCNA course with comprehensive videos, lab exercises, study notes and flashcards.",
    instructor: "Neil Anderson",
    rating: 4.8,
    ratings: 91577,
    hours: 43,
    lectures: 334,
    level: "Beginner",
    price: 4449,
    topic: "Cisco Certified Network Associate (CCNA)",
    subcategory: "Network & Security",
    language: "English",
    practice: ["Practice Tests", "Quizzes"],
    image: IMG.network,
    badge: "Bestseller",
  },
  {
    id: 9,
    title: "TOTAL: CompTIA A+ Core 1 (220-1201) Course + Practice Exam",
    desc: "Everything you need to pass A+ Certification Core 1 exam.",
    instructor: "Total Seminars, Mike Meyers, Dakota Snow",
    rating: 4.6,
    ratings: 89617,
    hours: 20.5,
    lectures: 153,
    level: "All Levels",
    price: 799,
    topic: "CompTIA A+",
    subcategory: "IT Certifications",
    language: "English",
    practice: ["Practice Tests"],
    image: IMG.team,
    badge: "Premium",
  },
  {
    id: 10,
    title: "AZ-900 Microsoft Azure Fundamentals",
    desc: "Beginner's guide to Microsoft Azure.",
    instructor: "Alan Rodrigues",
    rating: 4.5,
    ratings: 67184,
    hours: 14.5,
    lectures: 200,
    level: "Beginner",
    price: 4469,
    topic: "AZ-900: Microsoft Azure Fundamentals",
    subcategory: "IT Certifications",
    language: "English",
    practice: ["Quizzes"],
    image: IMG.cloud,
    badge: "Premium",
  },
  {
    id: 11,
    title: "Six Sigma: Certified Lean Six Sigma White Belt (Accredited)",
    desc: "Six Sigma White Belt Certification and seven basic tools of quality.",
    instructor: "Advanced Innovation Group Pro Excellence",
    rating: 4.6,
    ratings: 59056,
    hours: 2.5,
    lectures: 36,
    level: "Beginner",
    price: 3289,
    topic: "Six Sigma",
    subcategory: "IT Certifications",
    language: "English",
    practice: ["Quizzes"],
    image: IMG.data,
    badge: "Bestseller",
  },
  {
    id: 12,
    title: "The Complete Networking Fundamentals Course",
    desc: "Learn networking from the ground up with practical labs and real-world examples.",
    instructor: "Neil Anderson",
    rating: 4.7,
    ratings: 32450,
    hours: 16,
    lectures: 140,
    level: "Beginner",
    price: 2999,
    topic: "CompTIA Network+",
    subcategory: "Network & Security",
    language: "English",
    practice: ["Practice Tests", "Coding Exercises"],
    image: IMG.network,
    badge: "Bestseller",
  },
].map((c, i) => ({
  ...c,
  topics: [c.topic, c.subcategory],
  handsOn: c.practice.length > 0,
  oldPrice: Math.round(c.price * 1.8),
  subtitles: ["English", "Hindi"],
  premium: true,
  bestseller: c.badge === "Bestseller",
  isNew: i < 3,
}));

const ALL_COURSES = IT_COURSES;

const TOPIC_CHIPS = [
  "AWS Certified Solutions Architect - Associate",
  "AWS Certified Cloud Practitioner",
  "CompTIA A+",
  "Information Security",
  "Amazon AWS",
  "CompTIA Security+",
  "Cisco Certified Network Associate (CCNA)",
  "CompTIA Network+",
  "AWS Certified AI Practitioner",
  "Claude Certified Architect Foundations (CCAF)",
];

const CERT_COURSES = [
  {
    n: "Course 1 of 5",
    t: "AWS Certified Solutions Architect",
    d: "27 hours",
    image: IMG.aws,
  },
  {
    n: "Course 2 of 5",
    t: "AWS Cloud Practitioner",
    d: "14.5 hours",
    image: IMG.cloud,
  },
  {
    n: "Course 3 of 5",
    t: "Microsoft Azure Fundamentals",
    d: "9.5 hours",
    image: IMG.server,
  },
  {
    n: "Course 4 of 5",
    t: "CompTIA Security+",
    d: "31 hours",
    image: IMG.security,
  },
  {
    n: "Course 5 of 5",
    t: "Cisco CCNA",
    d: "43 hours",
    image: IMG.network,
  },
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
  { key: "topic", title: "Topic", options: TOPIC_CHIPS },
  {
    key: "subcategory",
    title: "Subcategory",
    options: [
      "IT Certifications",
      "Network & Security",
      "Operating Systems & Servers",
      "Database Design & Development",
      "Hardware",
      "Other IT & Software",
    ],
  },
  {
    key: "level",
    title: "Level",
    options: ["All Levels", "Beginner", "Intermediate", "Expert"],
  },
  {
    key: "language",
    title: "Language",
    options: ["English", "हिन्दी"],
  },
  { key: "price", title: "Price", options: ["Paid", "Free"] },
  {
    key: "handsOn",
    title: "Hands-on Practice",
    options: ["Has hands-on practice"],
  },
  {
    key: "subtitles",
    title: "Subtitles",
    options: ["English", "Hindi"],
  },
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
/* Reusable UI components                                              */
/* ------------------------------------------------------------------ */

function Stars({ value }) {
  return (
    <span className="xh-ga-stars" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          className={
            value >= i - 0.25 ? "on" : value >= i - 0.75 ? "half" : ""
          }
        />
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

    setEdge({
      left: el.scrollLeft > 8,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 8,
    });
  };

  const go = (dir) => {
    const el = ref.current;

    if (el) {
      el.scrollBy({
        left: dir * el.clientWidth * 0.85,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`xh-ga-rail ${className}`}>
      {edge.left && (
        <button
          type="button"
          className="xh-ga-rail-btn xh-ga-rail-l"
          onClick={() => go(-1)}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div className="xh-ga-rail-track" ref={ref} onScroll={sync}>
        {children}
      </div>

      {edge.right && (
        <button
          type="button"
          className="xh-ga-rail-btn xh-ga-rail-r"
          onClick={() => go(1)}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}

function CourseCard({
  course,
  inCart,
  onCart,
  onOpen,
  showInstructor = true,
}) {
  return (
    <article className="xh-ga-card">
      <button
        type="button"
        className="xh-ga-card-img"
        onClick={onOpen}
        aria-label={`Open ${course.title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={course.image} alt="" loading="lazy" />

        {course.premium && (
          <span className="xh-ga-premium">
            <BadgeCheck size={14} /> Premium
          </span>
        )}
      </button>

      <h3>{course.title}</h3>

      {showInstructor && (
        <p className="xh-ga-card-by">{course.instructor}</p>
      )}

      <div className="xh-ga-card-meta">
        {course.bestseller && (
          <span className="xh-ga-badge-best">Bestseller</span>
        )}

        <span className="xh-ga-pill">Course</span>

        <span className="xh-ga-pill">
          <Star size={12} className="on" /> {course.rating}
        </span>

        <span className="xh-ga-pill">
          {course.ratings.toLocaleString("en-IN")} ratings
        </span>
      </div>

      <div className="xh-ga-card-foot">
        <strong>{inr(course.price)}</strong>

        <button
          type="button"
          className={`xh-ga-btn-line ${inCart ? "is-in" : ""}`}
          onClick={onCart}
        >
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
      <button
        type="button"
        className="xh-ga-fhead"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span>{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {open && <div className="xh-ga-fbody">{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* IT Certification page                                               */
/* ------------------------------------------------------------------ */

const ITCertification = () => {
  const navigate = useNavigate();

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("authToken")
      : null;

  const user = token ? JSON.parse(token)?.users : null;

  const [cart, setCart] = useState([]);
  const [tab, setTab] = useState("popular");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [minRating, setMinRating] = useState(0);
  const [durations, setDurations] = useState([]);
  const [picked, setPicked] = useState({});
  const [openBlocks, setOpenBlocks] = useState({
    ratings: true,
    duration: true,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [ratingsMore, setRatingsMore] = useState(false);

  const listTop = useRef(null);

  const handleGetStarted = () => {
    if (user) {
      if (user.userRole === "user") {
        navigate("/dashboardJobs");
      } else if (
        user.userRole === "admin" ||
        user.userRole === "primeadmin"
      ) {
        navigate("/Recruitmenthero");
      }
    } else {
      navigate("/business-features");
    }
  };

  const toggleCart = (id) => {
    setCart((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const cartTotal = cart.reduce(
    (sum, id) =>
      sum + (ALL_COURSES.find((course) => course.id === id)?.price || 0),
    0
  );

  const bundle = [ALL_COURSES[0], ALL_COURSES[2]];
  const bundleTotal = Math.round(
    (bundle[0].price + bundle[1].price) * 0.3
  );

  const bundleAdded = bundle.every((course) => cart.includes(course.id));

  const addBundle = () => {
    setCart((current) =>
      Array.from(new Set([...current, ...bundle.map((course) => course.id)]))
    );
  };

  const startTabs = {
    popular: [...ALL_COURSES]
      .sort((a, b) => b.ratings - a.ratings)
      .slice(0, 8),

    new: ALL_COURSES.filter((course) => course.isNew).slice(0, 8),

    beginner: ALL_COURSES.filter(
      (course) => course.level === "Beginner"
    ).slice(0, 8),
  };

  const topAI = ALL_COURSES.filter((course) =>
    ["IT Certifications", "Network & Security"].includes(
      course.subcategory
    )
  ).slice(0, 8);

  const topChat = ALL_COURSES.filter((course) =>
    [
      "Operating Systems & Servers",
      "IT Certifications",
    ].includes(course.subcategory)
  ).slice(0, 8);

  const instructors = useMemo(() => {
    const map = {};

    ALL_COURSES.forEach((course) => {
      if (!map[course.instructor]) {
        map[course.instructor] = {
          name: course.instructor,
          courses: 0,
          students: 0,
          rating: 0,
          topics: new Set(),
        };
      }

      const instructor = map[course.instructor];

      instructor.courses += 1;
      instructor.students += course.ratings * 4;
      instructor.rating += course.rating;

      course.topics.forEach((topic) => {
        instructor.topics.add(topic);
      });
    });

    return Object.values(map)
      .map((instructor) => ({
        ...instructor,
        rating: (
          instructor.rating / instructor.courses
        ).toFixed(1),
        topics: Array.from(instructor.topics)
          .slice(0, 3)
          .join(", "),
      }))
      .sort((a, b) => b.students - a.students)
      .slice(0, 8);
  }, []);

  /* ---------------- Filtering and sorting ---------------- */

  const filtered = useMemo(() => {
    const match = (course) => {
      if (minRating && course.rating < minRating) {
        return false;
      }

      if (
        durations.length &&
        !durations.some((id) =>
          DURATIONS.find((duration) => duration.id === id).test(
            course.hours
          )
        )
      ) {
        return false;
      }

      const selected = (key) => picked[key] || [];

      if (
        selected("topic").length &&
        !selected("topic").includes(course.topic)
      ) {
        return false;
      }

      if (
        selected("subcategory").length &&
        !selected("subcategory").includes(course.subcategory)
      ) {
        return false;
      }

      if (
        selected("level").length &&
        !selected("level").includes(course.level)
      ) {
        return false;
      }

      if (
        selected("language").length &&
        !selected("language").includes(course.language)
      ) {
        return false;
      }

      if (
        selected("price").length &&
        !selected("price").includes(
          course.price === 0 ? "Free" : "Paid"
        )
      ) {
        return false;
      }

      if (selected("handsOn").length && !course.handsOn) {
        return false;
      }

      if (
        selected("subtitles").length &&
        !course.subtitles.some((subtitle) =>
          selected("subtitles").includes(subtitle)
        )
      ) {
        return false;
      }

      return true;
    };

    const list = ALL_COURSES.filter(match);

    const sortFunctions = {
      popular: (a, b) => b.ratings - a.ratings,
      rated: (a, b) =>
        b.rating - a.rating || b.ratings - a.ratings,
      new: (a, b) => b.id - a.id,
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
    };

    return list.sort(sortFunctions[sort]);
  }, [minRating, durations, picked, sort]);

  const pageCount = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const safePage = Math.min(page, pageCount);

  const visible = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const activeCount =
    (minRating ? 1 : 0) +
    durations.length +
    Object.values(picked).reduce(
      (count, values) => count + values.length,
      0
    );

  const durationCount = (duration) =>
    ALL_COURSES.filter((course) =>
      duration.test(course.hours)
    ).length;

  const ratingCount = (rating) =>
    ALL_COURSES.filter((course) => course.rating >= rating).length;

  const togglePick = (key, value) => {
    setPicked((current) => {
      const selected = current[key] || [];

      return {
        ...current,
        [key]: selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value],
      };
    });

    setPage(1);
  };

  const toggleDuration = (id) => {
    setDurations((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

    setPage(1);
  };

  const clearAll = () => {
    setMinRating(0);
    setDurations([]);
    setPicked({});
    setPage(1);
  };

  const goPage = (number) => {
    setPage(number);

    if (listTop.current) {
      listTop.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const toggleBlock = (key) => {
    setOpenBlocks((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const pagesToShow = () => {
    if (pageCount <= 5) {
      return Array.from(
        { length: pageCount },
        (_, index) => index + 1
      );
    }

    const output = [1];
    const start = Math.max(2, safePage - 1);
    const end = Math.min(pageCount - 1, safePage + 1);

    if (start > 2) output.push("…");

    for (let index = start; index <= end; index += 1) {
      output.push(index);
    }

    if (end < pageCount - 1) output.push("…2");

    output.push(pageCount);

    return output;
  };

  const filterPanel = (
    <div className="xh-ga-filters">
      {activeCount > 0 && (
        <button
          type="button"
          className="xh-ga-clear"
          onClick={clearAll}
        >
          <X size={14} /> Clear all filters ({activeCount})
        </button>
      )}

      <FilterBlock
        title="Ratings"
        open={!!openBlocks.ratings}
        onToggle={() => toggleBlock("ratings")}
      >
        {(ratingsMore
          ? [...RATING_OPTIONS, 2.5, 2.0]
          : RATING_OPTIONS
        ).map((rating) => (
          <label className="xh-ga-opt" key={rating}>
            <input
              type="radio"
              name="xh-ga-rating"
              checked={minRating === rating}
              onChange={() => {
                setMinRating(rating);
                setPage(1);
              }}
            />

            <Stars value={rating} />

            <span>{rating.toFixed(1)} &amp; up</span>

            <em>({ratingCount(rating)})</em>
          </label>
        ))}

        <button
          type="button"
          className="xh-ga-more"
          onClick={() => setRatingsMore(!ratingsMore)}
        >
          {ratingsMore ? "Show less" : "Show more"}
          {ratingsMore ? (
            <ChevronUp size={14} />
          ) : (
            <ChevronDown size={14} />
          )}
        </button>
      </FilterBlock>

      <FilterBlock
        title="Video Duration"
        open={!!openBlocks.duration}
        onToggle={() => toggleBlock("duration")}
      >
        {DURATIONS.map((duration) => (
          <label className="xh-ga-opt" key={duration.id}>
            <input
              type="checkbox"
              checked={durations.includes(duration.id)}
              onChange={() => toggleDuration(duration.id)}
            />

            <span>{duration.label}</span>

            <em>({durationCount(duration)})</em>
          </label>
        ))}
      </FilterBlock>

      {FILTER_SECTIONS.map((section) => (
        <FilterBlock
          key={section.key}
          title={section.title}
          open={!!openBlocks[section.key]}
          onToggle={() => toggleBlock(section.key)}
        >
          {section.options.map((option) => (
            <label className="xh-ga-opt" key={option}>
              <input
                type="checkbox"
                checked={(picked[section.key] || []).includes(
                  option
                )}
                onChange={() =>
                  togglePick(section.key, option)
                }
              />

              <span>{option}</span>
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
        {/* ================= TITLE ================= */}
        <section className="xh-ga-wrap xh-ga-title">
          <nav className="xh-ga-crumb" aria-label="Breadcrumb">
            <Link to="/business">E-Campus</Link>
            <ChevronRight size={14} />
            <span>IT Certification</span>
          </nav>

          <h1>IT Certification Courses</h1>

          <p>
            IT Certification relates to{" "}
            <b>IT &amp; Software</b>, <b>Business</b>
          </p>
        </section>

        {/* ================= CERTIFICATE BANNER ================= */}
        <section className="xh-ga-wrap xh-ga-block">
          <h2 className="xh-ga-h2">
            Learn IT Certifications with Xhirez
          </h2>

          <div className="xh-ga-cert">
            <span
              className="xh-ga-cert-bg"
              aria-hidden="true"
            />

            <div className="xh-ga-cert-card">
              <div className="xh-ga-cert-logo">
                <BadgeCheck size={22} />
                Xhirez E-Campus
              </div>

              <h3>IT Certification Professional Certificate</h3>

              <p>
                Build your IT certification skills and get more
                done, faster.
              </p>

              <div className="xh-ga-cert-meta">
                <span className="xh-ga-pill">
                  <Star size={12} className="on" /> 4.6
                </span>

                <span className="xh-ga-pill">
                  5 total hours
                </span>

                <span className="xh-ga-pill">
                  8 courses
                </span>
              </div>

              <button
                type="button"
                className="xh-ga-btn-outline"
                onClick={handleGetStarted}
              >
                Learn more
              </button>
            </div>

            <Rail className="xh-ga-cert-rail">
              {CERT_COURSES.map((course) => (
                <button
                  type="button"
                  className="xh-ga-cert-item"
                  key={course.t}
                  onClick={handleGetStarted}
                >
                  <span className="xh-ga-cert-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={course.image}
                      alt=""
                      loading="lazy"
                    />

                    <span className="xh-ga-cert-tag">
                      Xhirez
                    </span>
                  </span>

                  <strong>{course.t}</strong>

                  <span className="xh-ga-cert-foot">
                    <span className="xh-ga-pill">
                      {course.n}
                    </span>

                    <span className="xh-ga-pill">
                      {course.d}
                    </span>
                  </span>
                </button>
              ))}
            </Rail>
          </div>
        </section>

        {/* ================= BUNDLE ================= */}
        <section className="xh-ga-wrap xh-ga-block">
          <div className="xh-ga-bundle">
            <div className="xh-ga-bundle-info">
              <h2>
                Looking to advance your skills in IT
                Certification? We&apos;ve got you.
              </h2>

              <p>
                Get everything you need to reach your goals in
                one convenient bundle.
              </p>

              <ul>
                {[
                  "Top-rated courses",
                  "Popular with learners just like you",
                  "Guidance from real-world experts",
                ].map((item) => (
                  <li key={item}>
                    <Check size={18} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="xh-ga-bundle-total">
                Total: <strong>{inr(bundleTotal)}</strong>

                <span className="xh-ga-special">
                  <BadgeCheck size={16} />
                  Special Bundle Price
                </span>
              </div>

              <button
                type="button"
                className="xh-ga-btn"
                onClick={addBundle}
                disabled={bundleAdded}
              >
                {bundleAdded
                  ? "Bundle added to cart"
                  : "Add all to cart"}
              </button>
            </div>

            <div className="xh-ga-bundle-courses">
              {bundle.map((course, index) => (
                <React.Fragment key={course.id}>
                  <div className="xh-ga-bundle-item">
                    <div className="xh-ga-bundle-img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={course.image}
                        alt=""
                        loading="lazy"
                      />

                      <span className="xh-ga-premium">
                        <BadgeCheck size={14} />
                        Premium
                      </span>
                    </div>

                    <h3>{course.title}</h3>

                    <p className="xh-ga-card-by">
                      {course.instructor}
                    </p>

                    <div className="xh-ga-card-meta">
                      {course.bestseller && (
                        <span className="xh-ga-badge-best">
                          Bestseller
                        </span>
                      )}

                      <span className="xh-ga-pill">
                        Course
                      </span>

                      <span className="xh-ga-pill">
                        <Star size={12} className="on" />
                        {course.rating}
                      </span>

                      <span className="xh-ga-pill">
                        {course.ratings.toLocaleString("en-IN")} ratings
                      </span>
                    </div>

                    <div className="xh-ga-card-foot">
                      <strong>{inr(course.price)}</strong>

                      <button
                        type="button"
                        className={`xh-ga-btn-line ${
                          cart.includes(course.id) ? "is-in" : ""
                        }`}
                        onClick={() => toggleCart(course.id)}
                      >
                        {cart.includes(course.id)
                          ? "In cart"
                          : "Add to cart"}
                      </button>
                    </div>
                  </div>

                  {index === 0 && (
                    <span
                      className="xh-ga-plus"
                      aria-hidden="true"
                    >
                      <Plus size={20} />
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <p className="xh-ga-learners">
            <Users size={18} />
            2,740,953 learners
          </p>
        </section>

        {/* ================= COURSES TO GET STARTED ================= */}
        <section className="xh-ga-wrap xh-ga-block">
          <h2 className="xh-ga-h2">
            Courses to get you started
          </h2>

          <p className="xh-ga-sub">
            Explore courses from experienced, real-world experts.
          </p>

          <div className="xh-ga-tabs" role="tablist">
            {[
              ["popular", "Most popular"],
              ["new", "New"],
              ["beginner", "Beginner Favorites"],
            ].map(([id, label]) => (
              <button
                type="button"
                role="tab"
                aria-selected={tab === id}
                className={tab === id ? "is-on" : ""}
                key={id}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <Rail key={tab}>
            {startTabs[tab].map((course) => (
              <div
                className="xh-ga-rail-item"
                key={course.id}
              >
                <CourseCard
                  course={course}
                  inCart={cart.includes(course.id)}
                  onCart={() => toggleCart(course.id)}
                  onOpen={handleGetStarted}
                />
              </div>
            ))}
          </Rail>
        </section>

        {/* ================= STUDENTS ALSO LEARN ================= */}
        <section className="xh-ga-wrap xh-ga-block">
          <h2 className="xh-ga-h2">
            IT Certification students also learn
          </h2>

          <Rail className="xh-ga-chip-rail">
            <div className="xh-ga-chips">
              {TOPIC_CHIPS.map((topic) => (
                <button
                  type="button"
                  key={topic}
                  className="xh-ga-chip"
                  onClick={() => {
                    setPicked((current) => ({
                      ...current,
                      topic: [topic],
                    }));
                    setPage(1);

                    if (listTop.current) {
                      listTop.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  {topic}
                </button>
              ))}
            </div>
          </Rail>
        </section>

        {/* ================= TOP COURSES ================= */}
        <section className="xh-ga-wrap xh-ga-block">
          <h2 className="xh-ga-h2">
            Top courses in IT Certification and{" "}
            <Link
              to="/business-features"
              className="xh-ga-link-h"
            >
              Cloud &amp; IT Infrastructure
            </Link>
          </h2>

          <Rail>
            {topAI.map((course) => (
              <div
                className="xh-ga-rail-item"
                key={course.id}
              >
                <CourseCard
                  course={course}
                  inCart={cart.includes(course.id)}
                  onCart={() => toggleCart(course.id)}
                  onOpen={handleGetStarted}
                />
              </div>
            ))}
          </Rail>
        </section>

        <section className="xh-ga-wrap xh-ga-block">
          <h2 className="xh-ga-h2">
            Top courses in IT Certification and{" "}
            <Link
              to="/business-features"
              className="xh-ga-link-h"
            >
              AWS &amp; Cloud
            </Link>
          </h2>

          <Rail>
            {topChat.map((course) => (
              <div
                className="xh-ga-rail-item"
                key={course.id}
              >
                <CourseCard
                  course={course}
                  inCart={cart.includes(course.id)}
                  onCart={() => toggleCart(course.id)}
                  onOpen={handleGetStarted}
                />
              </div>
            ))}
          </Rail>
        </section>

        {/* ================= POPULAR INSTRUCTORS ================= */}
        <section className="xh-ga-wrap xh-ga-block">
          <h2 className="xh-ga-h2">
            Popular Instructors
          </h2>

          <p className="xh-ga-sub">
            These real-world experts are highly rated by learners
            like you.
          </p>

          <Rail>
            {instructors.map((instructor) => (
              <div
                className="xh-ga-rail-item"
                key={instructor.name}
              >
                <article className="xh-ga-ins">
                  <span className="xh-ga-ins-av">
                    {instructor.name
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </span>

                  <div>
                    <h3>{instructor.name}</h3>

                    <p>{instructor.topics}</p>

                    <span className="xh-ga-ins-rate">
                      <b>{instructor.rating}</b>
                      <Star size={14} className="on" />
                      Instructor Rating
                    </span>

                    <span className="xh-ga-ins-stat">
                      <b>
                        {instructor.students.toLocaleString("en-IN")}
                      </b>{" "}
                      students
                    </span>

                    <span className="xh-ga-ins-stat">
                      <b>{instructor.courses}</b> courses
                    </span>
                  </div>
                </article>
              </div>
            ))}
          </Rail>
        </section>

        {/* ================= ALL COURSES ================= */}
        <section
          className="xh-ga-wrap xh-ga-block"
          ref={listTop}
        >
          <h2 className="xh-ga-h2 xh-ga-h2-lg">
            All IT Certification courses
          </h2>

          <div className="xh-ga-guarantee">
            <Info size={26} />
            <b>
              Not sure? All courses have a 30-day money-back
              guarantee
            </b>
          </div>

          <div className="xh-ga-layout">
            <div className="xh-ga-toolbar">
              <button
                type="button"
                className="xh-ga-filter-btn"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal size={16} />
                Filter{activeCount ? ` (${activeCount})` : ""}
              </button>

              <label className="xh-ga-sort">
                <small>Sort by</small>

                <select
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value);
                    setPage(1);
                  }}
                >
                  {SORTS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <span className="xh-ga-count">
                {filtered.length.toLocaleString("en-IN")} results
              </span>
            </div>

            <aside className="xh-ga-side">
              {filterPanel}
            </aside>

            <div className="xh-ga-list">
              {visible.length === 0 && (
                <div className="xh-ga-empty">
                  <h3>No courses match these filters</h3>

                  <button
                    type="button"
                    className="xh-ga-btn-outline"
                    onClick={clearAll}
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {visible.map((course) => (
                <article
                  className="xh-ga-row"
                  key={course.id}
                >
                  <button
                    type="button"
                    className="xh-ga-row-img"
                    onClick={handleGetStarted}
                    aria-label={`Open ${course.title}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={course.image}
                      alt=""
                      loading="lazy"
                    />
                  </button>

                  <div className="xh-ga-row-body">
                    <div className="xh-ga-row-main">
                      <h3>{course.title}</h3>

                      <p className="xh-ga-row-desc">
                        {course.desc}
                      </p>

                      <p className="xh-ga-card-by">
                        {course.instructor}
                      </p>

                      <div className="xh-ga-row-rate">
                        <b>{course.rating}</b>

                        <Stars value={course.rating} />

                        <span>
                          ({course.ratings.toLocaleString("en-IN")})
                        </span>
                      </div>

                      <p className="xh-ga-row-info">
                        {course.hours} total hours ·{" "}
                        {course.lectures} lectures · {course.level}
                      </p>

                      <strong className="xh-ga-row-price">
                        {inr(course.price)}
                      </strong>

                      <div className="xh-ga-row-badges">
                        {course.premium && (
                          <span className="xh-ga-premium xh-ga-premium-flat">
                            <BadgeCheck size={14} />
                            Premium
                          </span>
                        )}

                        {course.bestseller && (
                          <span className="xh-ga-badge-best">
                            Bestseller
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`xh-ga-btn-line xh-ga-row-add ${
                        cart.includes(course.id) ? "is-in" : ""
                      }`}
                      onClick={() => toggleCart(course.id)}
                    >
                      {cart.includes(course.id) ? (
                        <>
                          <Check size={15} />
                          In cart
                        </>
                      ) : (
                        "Add to cart"
                      )}
                    </button>
                  </div>
                </article>
              ))}

              {filtered.length > PAGE_SIZE && (
                <nav
                  className="xh-ga-pager"
                  aria-label="Pagination"
                >
                  <button
                    type="button"
                    className="xh-ga-pg-arrow"
                    onClick={() =>
                      goPage(Math.max(1, safePage - 1))
                    }
                    disabled={safePage === 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {pagesToShow().map((number) =>
                    typeof number === "number" ? (
                      <button
                        type="button"
                        key={number}
                        className={`xh-ga-pg ${
                          number === safePage ? "is-on" : ""
                        }`}
                        onClick={() => goPage(number)}
                      >
                        {number}
                      </button>
                    ) : (
                      <span
                        className="xh-ga-dots"
                        key={number}
                      >
                        …
                      </span>
                    )
                  )}

                  <button
                    type="button"
                    className="xh-ga-pg-arrow"
                    onClick={() =>
                      goPage(Math.min(pageCount, safePage + 1))
                    }
                    disabled={safePage === pageCount}
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </nav>
              )}
            </div>
          </div>
        </section>

        {/* ================= VALUE STRIP ================= */}
        <section className="xh-ga-strip">
          <div className="xh-ga-wrap xh-ga-strip-in">
            {[
              [
                <PlayCircle size={20} key="play" />,
                "Learn in-demand skills with hundreds of video courses",
              ],
              [
                <Star size={20} key="star" />,
                "Choose courses taught by real-world experts",
              ],
              [
                <InfinityIcon size={20} key="infinity" />,
                "Learn at your own pace, with lifetime access on mobile and desktop",
              ],
            ].map(([icon, text]) => (
              <div className="xh-ga-strip-item" key={text}>
                <span>{icon}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ================= FLOATING CART ================= */}
      {cart.length > 0 && (
        <div className="xh-ga-cart" role="status">
          <ShoppingCart size={18} />

          <span>
            {cart.length} course{cart.length > 1 ? "s" : ""} ·{" "}
            <b>{inr(cartTotal)}</b>
          </span>

          <button type="button" onClick={handleGetStarted}>
            Checkout <ArrowRight size={15} />
          </button>

          <button
            type="button"
            className="xh-ga-cart-x"
            onClick={() => setCart([])}
            aria-label="Empty cart"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {showFilters && (
        <div
          className="xh-ga-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <div
            className="xh-ga-drawer-bg"
            onClick={() => setShowFilters(false)}
          />

          <div className="xh-ga-drawer-panel">
            <div className="xh-ga-drawer-head">
              <b>Filters</b>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <div className="xh-ga-drawer-body">
              {filterPanel}
            </div>

            <div className="xh-ga-drawer-foot">
              <button
                type="button"
                className="xh-ga-btn"
                onClick={() => setShowFilters(false)}
              >
                Show {filtered.length} results
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
            <style>{`
        .xh-ga, .xh-ga *, .xh-ga *::before, .xh-ga *::after {
          box-sizing: border-box;
        }

        .xh-ga {
          background: #fff;
          color: #1b2430;
          font-family: var(--xh-font, 'Roboto', system-ui, sans-serif);
        }

        .xh-ga h1,
        .xh-ga h2,
        .xh-ga h3,
        .xh-ga p,
        .xh-ga ul {
          margin: 0;
          padding: 0;
        }

        .xh-ga ul {
          list-style: none;
        }

        .xh-ga button {
          font-family: inherit;
          cursor: pointer;
        }

        .xh-ga a {
          text-decoration: none;
        }

        .xh-ga-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .xh-ga-block {
          padding-top: 52px;
        }

        .xh-ga-title {
          padding-top: 36px;
        }

        .xh-ga-crumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #6a7380;
          margin-bottom: 14px;
        }

        .xh-ga-crumb a {
          color: #2f5cf6 !important;
          font-weight: 600;
        }

        .xh-ga-title h1 {
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 800;
          letter-spacing: -.02em;
          line-height: 1.1;
        }

        .xh-ga-title p {
          margin-top: 10px;
          font-size: 18px;
          color: #6a7380;
        }

        .xh-ga-title p b {
          color: #2f5cf6;
          font-weight: 700;
        }

        .xh-ga-h2 {
          font-size: clamp(22px, 2.6vw, 28px);
          font-weight: 700;
          letter-spacing: -.01em;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .xh-ga-h2-lg {
          font-size: clamp(26px, 3vw, 34px);
          margin-bottom: 18px;
        }

        .xh-ga-sub {
          font-size: 17px;
          color: #6a7380;
          margin-bottom: 18px;
        }

        .xh-ga-link-h {
          color: #2f5cf6 !important;
          border-bottom: 2px solid #2f5cf6;
        }

        /* Buttons and shared elements */

        .xh-ga-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          background: #2f5cf6;
          color: #fff !important;
          font-weight: 700;
          font-size: 16px;
          padding: 15px 22px;
          border-radius: 8px;
          width: 100%;
          transition: background .15s;
        }

        .xh-ga-btn:hover {
          background: #1f47d6;
        }

        .xh-ga-btn:disabled {
          background: #8aa2f7;
          cursor: default;
        }

        .xh-ga-btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          border: 1.5px solid #2f5cf6;
          background: #fff;
          color: #2f5cf6 !important;
          font-weight: 700;
          font-size: 16px;
          padding: 14px 18px;
          border-radius: 8px;
          transition: background .15s;
        }

        .xh-ga-btn-outline:hover {
          background: #eef3ff;
        }

        .xh-ga-btn-line {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1.5px solid #2f5cf6;
          background: #fff;
          color: #2f5cf6 !important;
          font-weight: 700;
          font-size: 15px;
          padding: 10px 18px;
          border-radius: 8px;
          white-space: nowrap;
          transition: background .15s, color .15s;
        }

        .xh-ga-btn-line:hover {
          background: #eef3ff;
        }

        .xh-ga-btn-line.is-in {
          background: #2f5cf6;
          color: #fff !important;
        }

        .xh-ga-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border: 1px solid #d6dbe5;
          border-radius: 4px;
          padding: 2px 7px;
          font-size: 12px;
          color: #4b5563;
          background: #fff;
          white-space: nowrap;
        }

        .xh-ga svg.on {
          color: #b4690e;
          fill: #b4690e;
        }

        .xh-ga svg.half {
          color: #b4690e;
          fill: #e9c58f;
        }

        .xh-ga-badge-best {
          background: #d9f1fb;
          color: #0a5c80;
          font-weight: 700;
          font-size: 12px;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .xh-ga-premium {
          position: absolute;
          left: 10px;
          top: 10px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #2f5cf6;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 5px 9px;
          border-radius: 6px;
        }

        .xh-ga-premium-flat {
          position: static;
        }

        .xh-ga-stars {
          display: inline-flex;
          gap: 1px;
        }

        .xh-ga-stars svg {
          color: #c7cdd8;
          fill: #fff;
        }

        /* Horizontal course rails */

        .xh-ga-rail {
          position: relative;
        }

        .xh-ga-rail-track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x proximity;
          padding: 4px 2px 8px;
          scrollbar-width: none;
        }

        .xh-ga-rail-track::-webkit-scrollbar {
          display: none;
        }

        .xh-ga-rail-item {
          flex: 0 0 calc((100% - 48px) / 4);
          min-width: 250px;
          scroll-snap-align: start;
          display: flex;
        }

        .xh-ga-rail-btn {
          position: absolute;
          top: 40%;
          z-index: 3;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 0;
          background: #fff;
          color: #1b2430;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 14px rgba(15,23,42,.28);
          transition: transform .15s;
        }

        .xh-ga-rail-btn:hover {
          transform: scale(1.06);
        }

        .xh-ga-rail-l {
          left: -14px;
        }

        .xh-ga-rail-r {
          right: -14px;
        }

        /* Course cards */

        .xh-ga-card {
          width: 100%;
          border: 1px solid #e3e8ef;
          border-radius: 14px;
          background: #fff;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: box-shadow .2s, transform .2s;
        }

        .xh-ga-card:hover {
          box-shadow: 0 14px 30px rgba(15,23,42,.12);
          transform: translateY(-3px);
        }

        .xh-ga-card-img {
          position: relative;
          display: block;
          padding: 0;
          border: 0;
          background: #e8edf5;
          border-radius: 10px;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          margin-bottom: 8px;
        }

        .xh-ga-card-img img,
        .xh-ga-bundle-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .35s;
        }

        .xh-ga-card:hover .xh-ga-card-img img {
          transform: scale(1.05);
        }

        .xh-ga-card h3 {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 47px;
        }

        .xh-ga-card-by {
          font-size: 13px;
          color: #6a7380;
          line-height: 1.4;
        }

        .xh-ga-card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
          padding-top: 8px;
        }

        .xh-ga-card-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 10px;
        }

        .xh-ga-card-foot strong {
          font-size: 19px;
          font-weight: 700;
        }

        /* Certificate banner */

        .xh-ga-cert {
          position: relative;
          display: grid;
          grid-template-columns: 340px minmax(0, 1fr);
          gap: 26px;
          padding: 30px;
          border-radius: 22px;
          background: linear-gradient(
            120deg,
            #0b2a6b,
            #1646c9 55%,
            #07a1e3
          );
          overflow: hidden;
        }

        .xh-ga-cert-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 38%,
            rgba(255,255,255,.07) 38%,
            rgba(255,255,255,.07) 62%,
            transparent 62%
          );
          pointer-events: none;
        }

        .xh-ga-cert-card {
          position: relative;
          background: #fff;
          border-radius: 14px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-self: start;
        }

        .xh-ga-cert-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 20px;
          font-weight: 800;
          color: #2f5cf6;
        }

        .xh-ga-cert-card h3 {
          font-size: 30px;
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -.01em;
        }

        .xh-ga-cert-card p {
          font-size: 16px;
          line-height: 1.6;
          color: #4b5563;
        }

        .xh-ga-cert-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin: 4px 0 8px;
        }

        .xh-ga-cert-rail {
          min-width: 0;
        }

        .xh-ga-cert-rail .xh-ga-rail-track {
          align-items: stretch;
        }

        .xh-ga-cert-item {
          flex: 0 0 240px;
          background: #fff;
          border: 0;
          border-radius: 12px;
          padding: 14px;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scroll-snap-align: start;
          transition: transform .2s, box-shadow .2s;
        }

        .xh-ga-cert-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 30px rgba(0,0,0,.25);
        }

        .xh-ga-cert-thumb {
          position: relative;
          display: block;
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 16 / 10;
          background: #dfe7f5;
        }

        .xh-ga-cert-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .xh-ga-cert-tag {
          position: absolute;
          left: 8px;
          bottom: 8px;
          background: #fff;
          color: #2f5cf6;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 9px;
          border-radius: 99px;
        }

        .xh-ga-cert-item strong {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
          color: #1b2430;
          flex: 1;
        }

        .xh-ga-cert-foot {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        /* Bundle */

        .xh-ga-bundle {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
          gap: 30px;
          border: 1px solid #e3e8ef;
          border-radius: 16px;
          padding: 28px;
        }

        .xh-ga-bundle-info h2 {
          font-size: clamp(22px, 2.6vw, 30px);
          font-weight: 700;
          line-height: 1.25;
          margin-bottom: 10px;
        }

        .xh-ga-bundle-info > p {
          font-size: 18px;
          color: #4b5563;
          margin-bottom: 14px;
        }

        .xh-ga-bundle-info li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 17px;
          color: #4b5563;
          margin-bottom: 9px;
        }

        .xh-ga-bundle-info li svg {
          color: #2f5cf6;
        }

        .xh-ga-bundle-total {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 22px;
          margin: 18px 0 16px;
        }

        .xh-ga-bundle-total strong {
          font-size: 28px;
        }

        .xh-ga-special {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #c9f0e1;
          color: #0a5a40;
          font-size: 15px;
          font-weight: 700;
          padding: 8px 12px;
          border-radius: 8px;
        }

        .xh-ga-bundle-courses {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .xh-ga-bundle-item {
          border: 1px solid #e3e8ef;
          border-radius: 14px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .xh-ga-bundle-img {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          background: #e8edf5;
          margin-bottom: 6px;
        }

        .xh-ga-bundle-item h3 {
          font-size: 17px;
          font-weight: 700;
          line-height: 1.3;
        }

        .xh-ga-plus {
          position: absolute;
          left: 50%;
          top: 32%;
          transform: translate(-50%, -50%);
          z-index: 2;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid #d6dbe5;
          box-shadow: 0 2px 10px rgba(15,23,42,.18);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .xh-ga-learners {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 18px;
          font-size: 16px;
          color: #4b5563;
        }

        /* Tabs */

        .xh-ga-tabs {
          display: flex;
          gap: 6px;
          border-bottom: 1px solid #d6dbe5;
          margin-bottom: 20px;
          overflow-x: auto;
        }

        .xh-ga-tabs button {
          border: 0;
          background: none;
          padding: 12px 14px;
          font-size: 17px;
          color: #6a7380;
          border-bottom: 3px solid transparent;
          margin-bottom: -1px;
          white-space: nowrap;
        }

        .xh-ga-tabs button:hover {
          color: #1b2430;
        }

        .xh-ga-tabs button.is-on {
          color: #1b2430;
          font-weight: 700;
          border-bottom-color: #1b2430;
        }

        /* Topic chips */

        .xh-ga-chips {
          display: grid;
          grid-template-rows: repeat(2, auto);
          grid-auto-flow: column;
          grid-auto-columns: calc((100% - 64px) / 5);
          gap: 10px 16px;
          min-width: 100%;
        }

        .xh-ga-chip {
          min-width: 190px;
          min-height: 68px;
          border: 1px solid #d6dbe5;
          background: #fff;
          border-radius: 4px;
          font-size: 17px;
          font-weight: 600;
          color: #1b2430;
          padding: 10px 14px;
          transition: background .15s, border-color .15s;
        }

        .xh-ga-chip:hover {
          background: #f1f5ff;
          border-color: #2f5cf6;
          color: #2f5cf6;
        }

        .xh-ga-chip-rail .xh-ga-rail-btn {
          top: 38%;
        }

        /* Instructors */

        .xh-ga-ins {
          width: 100%;
          display: flex;
          gap: 16px;
          border: 1px solid #e3e8ef;
          border-radius: 14px;
          padding: 20px;
          background: #fff;
          transition: box-shadow .2s;
        }

        .xh-ga-ins:hover {
          box-shadow: 0 12px 26px rgba(15,23,42,.1);
        }

        .xh-ga-ins-av {
          flex: 0 0 76px;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, #2f5cf6, #07a1e3);
        }

        .xh-ga-ins h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .xh-ga-ins p {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.45;
          margin-bottom: 8px;
        }

        .xh-ga-ins-rate {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
          color: #b4690e;
          margin-bottom: 4px;
        }

        .xh-ga-ins-rate b {
          font-size: 16px;
        }

        .xh-ga-ins-stat {
          display: block;
          font-size: 14px;
          color: #1b2430;
        }

        /* All courses and filters */

        .xh-ga-guarantee {
          display: flex;
          align-items: center;
          gap: 14px;
          border: 1px solid #d6dbe5;
          border-radius: 40px;
          padding: 20px 26px;
          margin-bottom: 26px;
          font-size: 18px;
        }

        .xh-ga-guarantee svg {
          color: #2f5cf6;
          flex-shrink: 0;
        }

        .xh-ga-layout {
          display: grid;
          grid-template-columns: 340px minmax(0, 1fr);
          column-gap: 30px;
          align-items: start;
        }

        .xh-ga-toolbar {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .xh-ga-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #1b2430;
          background: #fff;
          border-radius: 8px;
          padding: 0 20px;
          height: 56px;
          font-weight: 700;
          font-size: 16px;
          color: #1b2430;
        }

        .xh-ga-filter-btn:hover {
          background: #f3f6fb;
        }

        .xh-ga-sort {
          display: flex;
          flex-direction: column;
          justify-content: center;
          border: 1px solid #1b2430;
          border-radius: 8px;
          height: 56px;
          padding: 4px 14px;
          min-width: 220px;
        }

        .xh-ga-sort small {
          font-size: 12px;
          color: #4b5563;
        }

        .xh-ga-sort select {
          border: 0;
          outline: 0;
          background: transparent;
          font-size: 16px;
          font-weight: 500;
          color: #1b2430;
          padding: 0;
          margin-left: -2px;
          cursor: pointer;
          font-family: inherit;
        }

        .xh-ga-count {
          margin-left: auto;
          font-size: 17px;
          font-weight: 700;
          color: #6a7380;
        }

        .xh-ga-filter-btn {
          display: none;
        }

        .xh-ga-filters {
          display: block;
        }

        .xh-ga-clear {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 0;
          background: #eef3ff;
          color: #2f5cf6;
          font-weight: 700;
          font-size: 14px;
          padding: 8px 12px;
          border-radius: 8px;
          margin-bottom: 8px;
        }

        .xh-ga-fblock {
          border-bottom: 1px solid #d6dbe5;
        }

        .xh-ga-fhead {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 0;
          background: none;
          padding: 20px 0;
          font-size: 20px;
          font-weight: 700;
          color: #1b2430;
          text-align: left;
        }

        .xh-ga-fbody {
          padding: 0 0 18px;
          display: grid;
          gap: 12px;
        }

        .xh-ga-opt {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          color: #1b2430;
          cursor: pointer;
        }

        .xh-ga-opt em {
          font-style: normal;
          color: #6a7380;
          font-size: 15px;
        }

        .xh-ga-opt input {
          width: 20px;
          height: 20px;
          accent-color: #2f5cf6;
          flex-shrink: 0;
          margin: 0;
        }

        .xh-ga-more {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border: 0;
          background: none;
          padding: 0;
          color: #2f5cf6;
          font-weight: 700;
          font-size: 15px;
          width: max-content;
        }

        /* Course list */

        .xh-ga-list {
          min-width: 0;
        }

        .xh-ga-row {
          display: grid;
          grid-template-columns: 260px minmax(0, 1fr);
          gap: 22px;
          padding: 20px 0;
          border-bottom: 1px solid #d6dbe5;
        }

        .xh-ga-row:first-child {
          padding-top: 0;
        }

        .xh-ga-row-img {
          display: block;
          padding: 0;
          border: 0;
          background: #e8edf5;
          border-radius: 10px;
          overflow: hidden;
          aspect-ratio: 16 / 10;
          align-self: start;
        }

        .xh-ga-row-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .35s;
        }

        .xh-ga-row:hover .xh-ga-row-img img {
          transform: scale(1.05);
        }

        .xh-ga-row-body {
          display: flex;
          gap: 20px;
          justify-content: space-between;
          min-width: 0;
        }

        .xh-ga-row-main {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .xh-ga-row-main h3 {
          font-size: 19px;
          font-weight: 700;
          line-height: 1.3;
        }

        .xh-ga-row-desc {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .xh-ga-row-rate {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #6a7380;
        }

        .xh-ga-row-rate b {
          color: #b4690e;
          font-size: 15px;
        }

        .xh-ga-row-info {
          font-size: 14px;
          color: #6a7380;
        }

        .xh-ga-row-price {
          font-size: 19px;
          margin-top: 2px;
        }

        .xh-ga-row-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }

        .xh-ga-row-add {
          align-self: flex-start;
        }

        .xh-ga-empty {
          text-align: center;
          border: 1px dashed #c4cddd;
          border-radius: 14px;
          padding: 48px 20px;
          display: grid;
          gap: 16px;
          justify-items: center;
        }

        .xh-ga-empty h3 {
          font-size: 20px;
        }

        .xh-ga-empty .xh-ga-btn-outline {
          width: auto;
        }

        /* Pagination */

        .xh-ga-pager {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 34px 0 8px;
        }

        .xh-ga-pg,
        .xh-ga-pg-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 0;
          background: none;
          font-size: 17px;
          font-weight: 700;
          color: #2f5cf6;
          position: relative;
        }

        .xh-ga-pg:hover {
          background: #eef3ff;
        }

        .xh-ga-pg.is-on::after {
          content: "";
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 4px;
          height: 3px;
          border-radius: 3px;
          background: #2f5cf6;
        }

        .xh-ga-pg-arrow {
          background: #fff;
          color: #1b2430;
          box-shadow: 0 2px 10px rgba(15,23,42,.16);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .xh-ga-pg-arrow:disabled {
          opacity: .35;
          cursor: default;
        }

        .xh-ga-dots {
          color: #2f5cf6;
          font-weight: 700;
        }

        /* Value strip */

        .xh-ga-strip {
          margin-top: 40px;
          border-top: 1px solid #d6dbe5;
          border-bottom: 1px solid #d6dbe5;
        }

        .xh-ga-strip-in {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 30px;
          padding-top: 28px;
          padding-bottom: 28px;
        }

        .xh-ga-strip-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .xh-ga-strip-item span {
          flex: 0 0 50px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #e9edf5;
          color: #1b2430;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .xh-ga-strip-item p {
          font-size: 18px;
          font-weight: 600;
          line-height: 1.35;
        }

        /* Floating cart */

        .xh-ga-cart {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 50;
          display: flex;
          align-items: center;
          gap: 12px;
          background: #141b2d;
          color: #fff;
          padding: 10px 10px 10px 18px;
          border-radius: 14px;
          box-shadow: 0 16px 36px rgba(15,23,42,.35);
          font-size: 15px;
        }

        .xh-ga-cart svg {
          color: #7aa2ff;
        }

        .xh-ga-cart button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 0;
          background: #2f5cf6;
          color: #fff;
          font-weight: 700;
          padding: 10px 14px;
          border-radius: 9px;
        }

        .xh-ga-cart .xh-ga-cart-x {
          background: rgba(255,255,255,.12);
          padding: 10px;
        }

        /* Mobile filter drawer */

        .xh-ga-drawer {
          position: fixed;
          inset: 0;
          z-index: 90;
        }

        .xh-ga-drawer-bg {
          position: absolute;
          inset: 0;
          background: rgba(8,12,24,.55);
        }

        .xh-ga-drawer-panel {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: min(420px, 92vw);
          background: #fff;
          display: flex;
          flex-direction: column;
          animation: xhGaSlide .25s ease;
        }

        @keyframes xhGaSlide {
          from {
            transform: translateX(-30px);
            opacity: 0;
          }
          to {
            transform: none;
            opacity: 1;
          }
        }

        .xh-ga-drawer-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid #e3e8ef;
          font-size: 20px;
        }

        .xh-ga-drawer-head button {
          border: 0;
          background: none;
          color: #1b2430;
        }

        .xh-ga-drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 4px 20px 20px;
        }

        .xh-ga-drawer-foot {
          padding: 14px 20px;
          border-top: 1px solid #e3e8ef;
        }

        /* Responsive layout */

        @media (max-width: 1100px) {
          .xh-ga-cert {
            grid-template-columns: 1fr;
          }

          .xh-ga-bundle {
            grid-template-columns: 1fr;
          }

          .xh-ga-rail-item {
            flex-basis: calc((100% - 32px) / 3);
          }

          .xh-ga-chips {
            grid-auto-columns: calc((100% - 32px) / 3);
          }
        }

        @media (max-width: 900px) {
          .xh-ga-layout {
            grid-template-columns: 1fr;
          }

          .xh-ga-side {
            display: none;
          }

          .xh-ga-filter-btn {
            display: inline-flex;
          }

          .xh-ga-row {
            grid-template-columns: 200px minmax(0, 1fr);
          }

          .xh-ga-strip-in {
            grid-template-columns: 1fr;
            gap: 18px;
          }
        }

        @media (max-width: 640px) {
          .xh-ga-rail-item {
            flex-basis: 78%;
          }

          .xh-ga-rail-btn {
            display: none;
          }

          .xh-ga-chips {
            grid-auto-columns: 62%;
          }

          .xh-ga-bundle {
            padding: 18px;
          }

          .xh-ga-bundle-courses {
            grid-template-columns: 1fr;
          }

          .xh-ga-plus {
            display: none;
          }

          .xh-ga-cert {
            padding: 16px;
          }

          .xh-ga-cert-card h3 {
            font-size: 24px;
          }

          .xh-ga-row {
            grid-template-columns: 1fr;
          }

          .xh-ga-row-body {
            flex-direction: column;
          }

          .xh-ga-row-add {
            align-self: stretch;
            justify-content: center;
          }

          .xh-ga-toolbar {
            flex-wrap: wrap;
          }

          .xh-ga-sort {
            flex: 1;
            min-width: 0;
          }

          .xh-ga-count {
            width: 100%;
            margin: 0;
          }

          .xh-ga-guarantee {
            border-radius: 18px;
            padding: 16px;
            font-size: 16px;
          }

          .xh-ga-cart {
            left: 12px;
            right: 12px;
            bottom: 12px;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
};

export default ITCertification;