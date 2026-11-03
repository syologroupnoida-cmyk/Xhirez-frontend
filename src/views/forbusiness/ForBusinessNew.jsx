import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@/router-dom";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaUserTie,
  FaRocket,
  FaBuilding,
  FaShieldAlt,
  FaChartBar,
} from "react-icons/fa";
import {
  Brain,
  GraduationCap,
  Building2,
  RefreshCcw,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
  BadgeCheck,
  Gauge,
  Zap,
  Users,
  ShoppingCart,
  X,
  Check,
} from "lucide-react";
import UnifiedHeader from "../../components/header/UnifiedHeader";
import Footer from "../../components/footer/footer";

const CART_STORAGE_KEY = "xh_ecampus_cart";

const getPriceValue = (price) => {
  const value = Number(String(price || "0").replace(/[^\d.]/g, ""));
  return Number.isFinite(value) ? value : 0;
};

const getCourseId = (course) =>
  course.id ||
  String(course.title || "course")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const ForBusinessNew = () => {
  const [view, setView] = useState("student");
  const [page, setPage] = useState(0);
  const [courseCategory, setCourseCategory] = useState(
    "Artificial Intelligence (AI)"
  );
  const [trendingPage, setTrendingPage] = useState(0);

  const [cart, setCart] = useState([]);
  const [cartReady, setCartReady] = useState(false);
  const [cartNotice, setCartNotice] = useState("");

  const navigate = useNavigate();

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("authToken")
      : null;

  let user = null;

  try {
    user = token ? JSON.parse(token)?.users : null;
  } catch (error) {
    console.error("Unable to read user session:", error);
  }

  // Load saved cart once when the page opens.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(Array.isArray(parsedCart) ? parsedCart : []);
      }
    } catch (error) {
      console.error("Unable to load forbusiness cart:", error);
      setCart([]);
    } finally {
      setCartReady(true);
    }
  }, []);

  // Keep the cart available when the user navigates or refreshes.
  useEffect(() => {
    if (!cartReady) return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent("xh-ecampus-cart-updated", {
        detail: { count: cart.length, cart }
      }));
    } catch (error) {
      console.error("Unable to save forbusiness cart:", error);
    }
  }, [cart, cartReady]);

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total, course) =>
          total + Number(course.priceValue || getPriceValue(course.price)),
        0
      ),
    [cart]
  );

  const originalCartTotal = useMemo(
    () =>
      cart.reduce(
        (total, course) =>
          total +
          Number(
            course.oldPriceValue ||
              getPriceValue(course.oldPrice || course.price)
          ),
        0
      ),
    [cart]
  );

  const formatPrice = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const addToCart = (course) => {
    const courseId = getCourseId(course);

    setCart((previousCart) => {
      const alreadyAdded = previousCart.some(
        (item) => item.id === courseId
      );

      if (alreadyAdded) {
        setCartNotice("This course is already in your cart.");
        return previousCart;
      }

      const newCourse = {
        ...course,
        id: courseId,
        priceValue: getPriceValue(course.price),
        oldPriceValue: getPriceValue(course.oldPrice || course.price),
      };

      setCartNotice(`${course.title} added to your cart.`);

      return [...previousCart, newCourse];
    });
  };

  const removeFromCart = (courseId) => {
    setCart((previousCart) =>
      previousCart.filter((course) => course.id !== courseId)
    );
    setCartNotice("Course removed from your cart.");
  };

  const clearCart = () => {
    setCart([]);
    setCartNotice("Your cart has been cleared.");
  };

  const isInCart = (course) =>
    cart.some((item) => item.id === getCourseId(course));

  const handleCheckout = () => {
    if (!cart.length) {
      setCartNotice("Please add a course before checkout.");
      return;
    }

    navigate("/cart");
  };

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

  const studentFeatures = [
    {
      icon: <FaGraduationCap />,
      title: "Skill Masterclass",
      desc: "Industry-standard curated paths.",
      tone: "xh-ec-g1",
    },
    {
      icon: <FaLaptopCode />,
      title: "Code Arena",
      desc: "Real-world technical challenges.",
      tone: "xh-ec-g2",
    },
    {
      icon: <FaUserTie />,
      title: "AI Mock Bot",
      desc: "Instant behavioral & tech feedback.",
      tone: "xh-ec-g3",
    },
  ];

  const corporateFeatures = [
    {
      icon: <FaBuilding />,
      title: "Vetted Talent",
      desc: "Access pre-screened top 1% candidates.",
      tone: "xh-ec-g4",
    },
    {
      icon: <FaShieldAlt />,
      title: "Proctoring Tool",
      desc: "AI-monitored secure assessment bot.",
      tone: "xh-ec-g5",
    },
    {
      icon: <FaChartBar />,
      title: "Hiring Analytics",
      desc: "Data-driven recruitment insights.",
      tone: "xh-ec-g6",
    },
  ];

  const carouselPages = [
    [
      {
        title: "Generative AI",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=90",
        tone: "ai",
        url: "/generative-ai",
      },
      {
        title: "IT Certifications",
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=90",
        tone: "certifications",
        url: "/it-certification",
      },
      {
        title: "Data Science",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=90",
        tone: "data",
         url: "/data-science",  
      },
    ],
    [
      {
        title: "ChatGPT",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=90",
        tone: "chatgpt",
        url: "/chatgpt",
      },
      {
        title: "Prompt Engineering",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=90",
        tone: "prompt",
        url: "/prompt-engineering",
      },
      {
        title: "Microsoft Excel",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=90",
        tone: "excel",
        url: "/microsoft-excel",
      },
    ],
    [
      {
        title: "Large Language Models",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=90",
        tone: "llm",
        url: "/large-language-models",
      },
      {
        title: "Machine Learning",
        image:
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=90",
        tone: "ml",
        url: "/machine-learning",
      },
      {
        title: "AI Agents",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=90",
        tone: "agents",
        url: "/ai-agents",
      },
    ],
  ];

  const currentFeatures =
    view === "student" ? studentFeatures : corporateFeatures;

  const partnerLogos = [
    {
      name: "Google",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Amazon",
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Microsoft",
      src: "https://static.cdnlogo.com/logos/m/21/microsoft_800.png",
    },
    {
      name: "Apple",
      src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Meta",
      src: "https://static.cdnlogo.com/logos/m/42/meta_800.png",
    },
    {
      name: "Netflix",
      src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
  ];

  const perks = [
    {
      icon: <BadgeCheck size={20} />,
      tone: "blue",
      text: "AI-Verified Skills",
    },
    {
      icon: <Gauge size={20} />,
      tone: "orange",
      text: "Performance Metrics",
    },
    {
      icon: <Zap size={20} />,
      tone: "green",
      text: "Priority Hiring",
    },
    {
      icon: <Users size={20} />,
      tone: "purple",
      text: "Students and corporates on one platform",
    },
  ];

  const stories = [
    {
      quote: "Landed my dream job!",
      text: "Thanks to E-campus, I found an internship that directly led to a full-time offer at a top tech company. The skill development programs were game-changers.",
      name: "Ananya Sharma",
      role: "Software Engineer, Google",
      img: "https://i.pravatar.cc/150?img=1",
    },
    {
      quote: "Hiring became effortless.",
      text: "E-campus connected us with pre-vetted talent that perfectly matched our requirements. Our hiring efficiency improved by 40%.",
      name: "Ravi Kumar",
      role: "HR Director, Infosys",
      img: "https://i.pravatar.cc/150?img=2",
    },
    {
      quote: "Bridge between Academia & Industry.",
      text: "As a university, partnering with E-campus allowed us to provide our students with unparalleled career opportunities and industry exposure.",
      name: "Dr. Priya Singh",
      role: "Placement Head, IIT Delhi",
      img: "https://i.pravatar.cc/150?img=3",
    },
  ];

  const approach = [
    {
      icon: <Brain size={28} />,
      title: "AI-Powered Skill Mapping",
      desc: "We use advanced AI to assess student capabilities and map them to in-demand industry skills, ensuring precise development paths.",
    },
    {
      icon: <GraduationCap size={28} />,
      title: "Tailored Learning Paths",
      desc: "Customized educational content and practical projects align with individual student needs and corporate hiring trends.",
    },
    {
      icon: <Building2 size={28} />,
      title: "Seamless Corporate Integration",
      desc: "Our platform provides corporates with easy access to a talent pool, streamlined assessment tools, and detailed analytics for efficient hiring.",
    },
    {
      icon: <RefreshCcw size={28} />,
      title: "Continuous Feedback Loop",
      desc: "We foster an environment of continuous improvement through feedback from both students and employers, adapting to evolving market demands.",
    },
  ];

  const courseCategories = [
    "Artificial Intelligence (AI)",
    "Python",
    "Microsoft Excel",
    "AI Agents & Agentic AI",
    "Digital Marketing",
    "Amazon AWS",
  ];

  const courseCatalog = {
    "Artificial Intelligence (AI)": [
      {
        title: "Forward Deployed AI Engineer",
        instructor: "Amit Prabhu",
        rating: "4.4",
        reviews: "54",
        price: "₹449",
        oldPrice: "₹799",
        badge: "Bestseller",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Claude AI for Finance & Analysis",
        instructor: "Manas Roy",
        rating: "4.9",
        reviews: "81",
        price: "₹449",
        oldPrice: "₹799",
        badge: "Highest Rated",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "The Complete Full Stack AI Engineering Bootcamp",
        instructor: "Aritra Basak",
        rating: "4.4",
        reviews: "138",
        price: "₹449",
        oldPrice: "₹799",
        badge: "Premium",
        image:
          "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "AI Mastery Bootcamp: Build Projects",
        instructor: "School of AI",
        rating: "4.5",
        reviews: "1,210",
        price: "₹509",
        oldPrice: "₹3,389",
        badge: "Premium",
        image:
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=85",
      },
    ],
    Python: [
      {
        title: "Python Programming: From Zero to Projects",
        instructor: "Xhirez Learning",
        rating: "4.7",
        reviews: "2,410",
        price: "₹399",
        oldPrice: "₹999",
        badge: "Bestseller",
        image:
          "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Python for Data Analysis",
        instructor: "Data Skills Studio",
        rating: "4.6",
        reviews: "980",
        price: "₹449",
        oldPrice: "₹1,299",
        badge: "Popular",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Build AI Apps with Python",
        instructor: "Xhirez AI Lab",
        rating: "4.8",
        reviews: "742",
        price: "₹499",
        oldPrice: "₹1,499",
        badge: "Premium",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Python Automation Masterclass",
        instructor: "Tech Academy",
        rating: "4.5",
        reviews: "620",
        price: "₹399",
        oldPrice: "₹899",
        badge: "Trending",
        image:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=85",
      },
    ],
    "Microsoft Excel": [
      {
        title: "Excel Essentials to Advanced Dashboards",
        instructor: "Career Skills Lab",
        rating: "4.7",
        reviews: "1,450",
        price: "₹349",
        oldPrice: "₹999",
        badge: "Bestseller",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Excel Formulas for Business",
        instructor: "Xhirez Business",
        rating: "4.6",
        reviews: "890",
        price: "₹399",
        oldPrice: "₹899",
        badge: "Popular",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Power Query & Data Cleaning",
        instructor: "Analytics Pro",
        rating: "4.8",
        reviews: "720",
        price: "₹449",
        oldPrice: "₹1,099",
        badge: "Highest Rated",
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Excel for Data Analysis",
        instructor: "Data Skills Studio",
        rating: "4.5",
        reviews: "510",
        price: "₹349",
        oldPrice: "₹799",
        badge: "Trending",
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=85",
      },
    ],
    "AI Agents & Agentic AI": [
      {
        title: "Build AI Agents from Scratch",
        instructor: "Xhirez AI Lab",
        rating: "4.8",
        reviews: "620",
        price: "₹499",
        oldPrice: "₹1,499",
        badge: "Bestseller",
        image:
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Agentic AI & Workflow Automation",
        instructor: "Automation School",
        rating: "4.7",
        reviews: "410",
        price: "₹449",
        oldPrice: "₹1,199",
        badge: "Popular",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "RAG Apps and AI Assistants",
        instructor: "Developer Hub",
        rating: "4.6",
        reviews: "350",
        price: "₹499",
        oldPrice: "₹1,299",
        badge: "Premium",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "AI Agents for Real Projects",
        instructor: "Tech Academy",
        rating: "4.5",
        reviews: "285",
        price: "₹399",
        oldPrice: "₹999",
        badge: "Trending",
        image:
          "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=85",
      },
    ],
    "Digital Marketing": [
      {
        title: "Digital Marketing Strategy Masterclass",
        instructor: "Growth Studio",
        rating: "4.6",
        reviews: "1,120",
        price: "₹399",
        oldPrice: "₹999",
        badge: "Bestseller",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "SEO & Content Growth",
        instructor: "Marketing Lab",
        rating: "4.5",
        reviews: "730",
        price: "₹349",
        oldPrice: "₹899",
        badge: "Popular",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Social Media Campaigns",
        instructor: "Creator Academy",
        rating: "4.7",
        reviews: "680",
        price: "₹399",
        oldPrice: "₹999",
        badge: "Highest Rated",
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Performance Marketing & Ads",
        instructor: "Growth Studio",
        rating: "4.4",
        reviews: "490",
        price: "₹349",
        oldPrice: "₹799",
        badge: "Trending",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
      },
    ],
    "Amazon AWS": [
      {
        title: "AWS Cloud Practitioner Essentials",
        instructor: "Cloud Academy",
        rating: "4.7",
        reviews: "1,050",
        price: "₹449",
        oldPrice: "₹1,199",
        badge: "Bestseller",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Deploy Applications on AWS",
        instructor: "DevOps Studio",
        rating: "4.6",
        reviews: "670",
        price: "₹499",
        oldPrice: "₹1,299",
        badge: "Popular",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "AWS Solutions Architect Prep",
        instructor: "Cloud Academy",
        rating: "4.8",
        reviews: "810",
        price: "₹499",
        oldPrice: "₹1,499",
        badge: "Highest Rated",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Cloud Projects & DevOps",
        instructor: "Xhirez Tech",
        rating: "4.5",
        reviews: "430",
        price: "₹399",
        oldPrice: "₹999",
        badge: "Trending",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",
      },
    ],
  };

  const trendingCourses = [
    {
      title: "The Complete Claude Code & Claude Cowork Masterclass [2026]",
      instructor: "Ryan Ahmed, PhD",
      rating: "4.6",
      reviews: "11,291",
      price: "₹449",
      oldPrice: "₹799",
      badge: "Bestseller",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=85",
    },
    {
      title: "Forward Deployed AI Engineer",
      instructor: "Amit Prabhu",
      rating: "4.4",
      reviews: "54",
      price: "₹449",
      oldPrice: "₹799",
      badge: "Bestseller",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85",
    },
    {
      title: "AI Coder: Complete Claude Code & Coding Agents Course",
      instructor: "Ligency, Ed Donner",
      rating: "4.6",
      reviews: "13,051",
      price: "₹449",
      oldPrice: "₹799",
      badge: "Bestseller",
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=85",
    },
    {
      title: "AI Engineer Agentic Track: Complete Agent & MCP Course",
      instructor: "Ed Donner, Ligency",
      rating: "4.7",
      reviews: "50,637",
      price: "₹459",
      oldPrice: "₹799",
      badge: "Bestseller",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=85",
    },
    {
      title: "Practical Generative AI for Developers",
      instructor: "Xhirez AI Lab",
      rating: "4.8",
      reviews: "3,204",
      price: "₹499",
      oldPrice: "₹1,299",
      badge: "Premium",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",
    },
  ];

  const accelerators = [
    {
      title: "Cloud Engineer",
      rating: "4.7",
      reviews: "337K",
      hours: "28.9",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85",
      tone: "cloud",
    },
    {
      title: "Data Scientist",
      rating: "4.6",
      reviews: "229K",
      hours: "47.5",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
      tone: "data",
    },
    {
      title: "Digital Marketer",
      rating: "4.5",
      reviews: "4.2K",
      hours: "28.4",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
      tone: "marketing",
    },
  ];

  const lastPage = carouselPages.length - 1;
    return (
    <div className="xh-ec">
      <UnifiedHeader />

      <div style={{ paddingTop: 85 }}>
        {/* PROMO BANNER */}
        <section className="xh-ec-wrap">
          <div className="xh-ec-promo">
            <div className="xh-ec-promo-card">
              <span className="xh-ec-eyebrow">
                Dual Ecosystem Powered by AI
              </span>
              <h1>One Platform. Double the Impact.</h1>
              <p>
                Learn, prove your skills and get hired, or build a verified
                team. Get started on E-Campus today.
              </p>
              <button
                type="button"
                className="xh-ec-btn"
                onClick={handleGetStarted}
              >
                Get Started <FaRocket />
              </button>
            </div>

            <div className="xh-ec-promo-art" aria-hidden="true">
              <span className="xh-ec-shape xh-ec-shape-1" />
              <span className="xh-ec-shape xh-ec-shape-2" />
              <span className="xh-ec-shape xh-ec-shape-3" />
              <div className="xh-ec-promo-icon">
                <FaGraduationCap size={96} />
              </div>
              <div className="xh-ec-promo-chip xh-ec-chip-a">
                <FaLaptopCode /> Code Arena
              </div>
              <div className="xh-ec-promo-chip xh-ec-chip-b">
                <FaChartBar /> Hiring Analytics
              </div>
            </div>
          </div>
        </section>

        {/* LEARN ESSENTIAL SKILLS */}
        <section className="xh-ec-wrap xh-ec-section">
          <div className="xh-ec-skills">
            <div className="xh-ec-skills-text">
              <h2>
                Learn <em>Essential</em> Career and Life Skills
              </h2>
              <p>
                E-Campus helps you build in-demand skills fast and advance
                your career in a changing job market.
              </p>
            </div>

            <div className="xh-ec-skills-right">
              <div className="xh-ec-cards" key={page}>
                {carouselPages[page].map((f) => (
                  <button
                    type="button"
                    className="xh-ec-card"
                    key={f.title}
                    onClick={() =>
                      f.url ? navigate(f.url) : handleGetStarted()
                    }
                  >
                    <span
                      className={`xh-ec-card-art xh-ec-skill-art xh-ec-skill-${f.tone}`}
                    >
                      <img src={f.image} alt="" loading="lazy" />
                      <span className="xh-ec-skill-art-overlay" />
                    </span>
                    <span className="xh-ec-card-label">
                      <b>{f.title}</b>
                      <ArrowRight size={18} />
                    </span>
                  </button>
                ))}
              </div>

              <div className="xh-ec-pager">
                <button
                  type="button"
                  className="xh-ec-arrow"
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  aria-label="Previous"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="xh-ec-dots">
                  {carouselPages.map((_, i) => (
                    <button
                      type="button"
                      key={i}
                      className={i === page ? "is-on" : ""}
                      onClick={() => setPage(i)}
                      aria-label={`Page ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="xh-ec-arrow"
                  onClick={() =>
                    setPage(Math.min(lastPage, page + 1))
                  }
                  disabled={page === lastPage}
                  aria-label="Next"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS BY CATEGORY */}
        <section className="xh-ec-wrap xh-ec-section xh-ec-learning-section">
          <div className="xh-ec-learning-heading">
            <div>
              <span className="xh-ec-mini-label">LEARN WHAT'S NEXT</span>
              <h2 className="xh-ec-h2">
                Skills to Transform Your Career and Life
              </h2>
              <p className="xh-ec-sub">
                From critical skills to technical topics, E-Campus supports
                your professional development.
              </p>
            </div>
          </div>

          <div
            className="xh-ec-category-tabs"
            role="tablist"
            aria-label="Course categories"
          >
            {courseCategories.map((category) => (
              <button
                type="button"
                role="tab"
                aria-selected={courseCategory === category}
                className={
                  courseCategory === category ? "is-on" : ""
                }
                key={category}
                onClick={() => setCourseCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="xh-ec-course-grid" key={courseCategory}>
            {(
              courseCatalog[courseCategory] ||
              courseCatalog[courseCategories[0]]
            ).map((course) => (
              <article className="xh-ec-course-card" key={course.title}>
                <button
                  type="button"
                  className="xh-ec-course-image"
                  onClick={handleGetStarted}
                  aria-label={`Explore ${course.title}`}
                >
                  <img src={course.image} alt="" loading="lazy" />
                  <span className="xh-ec-course-image-overlay" />
                  <span
                    className={`xh-ec-course-badge ${
                      course.badge === "Premium"
                        ? "is-premium"
                        : course.badge === "Highest Rated"
                          ? "is-rated"
                          : ""
                    }`}
                  >
                    {course.badge}
                  </span>
                </button>

                <div className="xh-ec-course-content">
                  <h3>{course.title}</h3>
                  <p className="xh-ec-course-instructor">
                    {course.instructor}
                  </p>

                  <div className="xh-ec-course-stats">
                    <strong>{course.rating}</strong>
                    <span className="xh-ec-star">★</span>
                    <span>{course.reviews} ratings</span>
                  </div>

                  <div className="xh-ec-course-buy">
                    <span className="xh-ec-course-price">
                      {course.price} <del>{course.oldPrice}</del>
                    </span>

                    <button
                      type="button"
                      className={
                        isInCart(course) ? "is-added" : ""
                      }
                      onClick={() => addToCart(course)}
                      disabled={isInCart(course)}
                    >
                      {isInCart(course) ? (
                        <>
                          <Check size={14} /> Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={14} /> Add to cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Link
            to="/business-features"
            className="xh-ec-learning-link"
          >
            Show all {courseCategory} courses
            <ArrowRight size={17} />
          </Link>
        </section>

        {/* TRENDING COURSES */}
        <section className="xh-ec-wrap xh-ec-section xh-ec-learning-section xh-ec-trending-section">
          <div className="xh-ec-learning-heading xh-ec-trending-heading">
            <div>
              <span className="xh-ec-mini-label">
                POPULAR RIGHT NOW
              </span>
              <h2 className="xh-ec-h2">Trending Courses</h2>
            </div>

            <div className="xh-ec-trending-controls">
              <button
                type="button"
                aria-label="Previous trending courses"
                onClick={() =>
                  setTrendingPage(Math.max(0, trendingPage - 1))
                }
                disabled={trendingPage === 0}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                aria-label="Next trending courses"
                onClick={() =>
                  setTrendingPage(
                    Math.min(trendingCourses.length - 4, trendingPage + 1)
                  )
                }
                disabled={
                  trendingPage >= trendingCourses.length - 4
                }
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="xh-ec-course-grid xh-ec-trending-grid">
            {trendingCourses
              .slice(trendingPage, trendingPage + 4)
              .map((course) => (
                <article className="xh-ec-course-card" key={course.title}>
                  <button
                    type="button"
                    className="xh-ec-course-image"
                    onClick={handleGetStarted}
                    aria-label={`Explore ${course.title}`}
                  >
                    <img src={course.image} alt="" loading="lazy" />
                    <span className="xh-ec-course-image-overlay" />
                    <span className="xh-ec-course-badge">
                      {course.badge}
                    </span>
                  </button>

                  <div className="xh-ec-course-content">
                    <h3>{course.title}</h3>
                    <p className="xh-ec-course-instructor">
                      {course.instructor}
                    </p>

                    <div className="xh-ec-course-stats">
                      <strong>{course.rating}</strong>
                      <span className="xh-ec-star">★</span>
                      <span>{course.reviews} ratings</span>
                    </div>

                    <div className="xh-ec-course-buy">
                      <span className="xh-ec-course-price">
                        {course.price} <del>{course.oldPrice}</del>
                      </span>

                      <button
                        type="button"
                        className={
                          isInCart(course) ? "is-added" : ""
                        }
                        onClick={() => addToCart(course)}
                        disabled={isInCart(course)}
                      >
                        {isInCart(course) ? (
                          <>
                            <Check size={14} /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={14} /> Add to cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>

        {/* DARK BANNER */}
        <section className="xh-ec-wrap xh-ec-section">
          <div className="xh-ec-dark">
            <div className="xh-ec-dark-text">
              <h2>
                {view === "student"
                  ? "Build a Career Recruiters Can't Ignore"
                  : "Build a team that fuels your growth"}
              </h2>

              <p>
                {view === "student"
                  ? "Prove your skills with AI-verified assessments and get noticed by hiring companies."
                  : "Hire pre-screened talent with secure assessments and data-driven insights."}
              </p>

              <ul className="xh-ec-perks">
                {perks.map((p) => (
                  <li key={p.text}>
                    <span
                      className={`xh-ec-perk-ico xh-ec-perk-${p.tone}`}
                    >
                      {p.icon}
                    </span>
                    {p.text}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="xh-ec-btn xh-ec-btn-white"
                onClick={handleGetStarted}
              >
                Get Started <FaRocket className="xh-ec-blue" />
              </button>

              <Link to="/business-features" className="xh-ec-learn">
                Learn more
              </Link>
            </div>

            <div className="xh-ec-dark-art" aria-hidden="true">
              <div className="xh-ec-dark-main">
                <Sparkles size={64} />
                <b>{view === "student" ? "Student" : "Corporate"}</b>
                <small>E-Campus</small>
              </div>
              <div className="xh-ec-dark-side" />
            </div>
          </div>
        </section>

        {/* TRUSTED PARTNERS */}
        <section className="xh-ec-trust">
          <div className="xh-ec-wrap">
            <p>
              Trusted Partners{" "}
              <Link to="/business-features">
                Explore E-Campus <ArrowRight size={14} />
              </Link>
            </p>

            <div className="xh-ec-logos">
              {partnerLogos.map((partner) => (
                <img
                  key={partner.name}
                  src={partner.src}
                  alt={`${partner.name} Logo`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* STUDENT / CORPORATE TABS */}
        <section className="xh-ec-wrap xh-ec-section">
          <h2 className="xh-ec-h2">Skills for Your Career</h2>
          <p className="xh-ec-sub">
            From critical skills to hiring tools, E-Campus supports
            students and corporates alike.
          </p>

          <div className="xh-ec-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={view === "student"}
              className={view === "student" ? "is-on" : ""}
              onClick={() => setView("student")}
            >
              For Students
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={view === "corporate"}
              className={view === "corporate" ? "is-on" : ""}
              onClick={() => setView("corporate")}
            >
              For Corporate
            </button>
          </div>

          <div className="xh-ec-feature-grid" key={view}>
            {currentFeatures.map((f) => (
              <article className="xh-ec-feature" key={f.title}>
                <div className={`xh-ec-feature-art ${f.tone}`}>
                  <span>{f.icon}</span>
                </div>

                <h3>{f.title}</h3>
                <p>{f.desc}</p>

                <div className="xh-ec-feature-foot">
                  <span className="xh-ec-tag">
                    {view === "student" ? "For students" : "For corporate"}
                  </span>

                  <button
                    type="button"
                    className="xh-ec-btn xh-ec-btn-line"
                    onClick={handleGetStarted}
                  >
                    Get started
                  </button>
                </div>
              </article>
            ))}
          </div>

          <Link to="/business-features" className="xh-ec-showall">
            Show all E-Campus features <ArrowRight size={16} />
          </Link>
        </section>

        {/* STORIES */}
        <section className="xh-ec-wrap xh-ec-section">
          <h2 className="xh-ec-h2">Real Results, Real Stories.</h2>

          <div className="xh-ec-stories">
            {stories.map((s) => (
              <article className="xh-ec-story" key={s.name}>
                <Quote size={26} />
                <h4>{s.quote}</h4>
                <p>{s.text}</p>

                <div className="xh-ec-story-who">
                  <img src={s.img} alt={s.name} />
                  <div>
                    <b>{s.name}</b>
                    <small>{s.role}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CAREER ACCELERATORS */}
        <section className="xh-ec-wrap xh-ec-section xh-ec-learning-section">
          <div className="xh-ec-learning-heading">
            <div>
              <span className="xh-ec-mini-label">CAREER PATHWAYS</span>
              <h2 className="xh-ec-h2">
                Ready to Reimagine Your Career
              </h2>
              <p className="xh-ec-sub">
                Get the skills and real-world experience employers want
                with Career Accelerators.
              </p>
            </div>

            <span className="xh-ec-heading-mark" aria-hidden="true">
              ↗
            </span>
          </div>

          <div className="xh-ec-accelerator-grid">
            {accelerators.map((item) => (
              <button
                type="button"
                className="xh-ec-accelerator-card"
                key={item.title}
                onClick={handleGetStarted}
              >
                <span
                  className={`xh-ec-accelerator-image xh-ec-accelerator-${item.tone}`}
                >
                  <img src={item.image} alt="" loading="lazy" />
                  <span className="xh-ec-image-shade" />
                  <span className="xh-ec-accelerator-symbol">
                    {item.tone === "cloud"
                      ? "☁"
                      : item.tone === "data"
                        ? "▥"
                        : "↗"}
                  </span>
                </span>

                <span className="xh-ec-accelerator-info">
                  <strong>{item.title}</strong>
                  <span className="xh-ec-course-meta">
                    <span className="xh-ec-rating">★ {item.rating}</span>
                    <span>{item.reviews} ratings</span>
                    <span>{item.hours} total hours</span>
                  </span>
                </span>
              </button>
            ))}
          </div>

          <Link to="/business-features" className="xh-ec-learning-link">
            All Career Accelerators <ArrowRight size={17} />
          </Link>
        </section>
      </div>

      {/* CART NOTIFICATION */}
      {cartNotice && (
        <div className="xh-ec-cart-toast" role="status">
          <Check size={16} />
          <span>{cartNotice}</span>
          <button
            type="button"
            onClick={() => setCartNotice("")}
            aria-label="Close notification"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* FLOATING CART */}
      {cart.length > 0 && (
        <div className="xh-ec-floating-cart">
          <div className="xh-ec-floating-cart-info">
            <div className="xh-ec-cart-icon">
              <ShoppingCart size={21} />
              <span>{cart.length}</span>
            </div>

            <div className="xh-ec-cart-total">
              <strong>
                {cart.length} Course{cart.length > 1 ? "s" : ""} in cart
              </strong>
              <span>{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            type="button"
            className="xh-ec-cart-view"
            onClick={handleCheckout}
          >
            Checkout <ArrowRight size={17} />
          </button>

          <button
            type="button"
            className="xh-ec-cart-clear"
            onClick={clearCart}
            aria-label="Clear cart"
            title="Clear cart"
          >
            <X size={17} />
          </button>
        </div>
      )}

      <Footer />
            <style>{`
        .xh-ec, .xh-ec *, .xh-ec *::before, .xh-ec *::after {
          box-sizing: border-box;
        }

        .xh-ec {
          background: #fff;
          color: #1b2430;
          font-family: var(--xh-font, 'Roboto', system-ui, sans-serif);
        }

        .xh-ec h1, .xh-ec h2, .xh-ec h3, .xh-ec h4,
        .xh-ec p, .xh-ec ul {
          margin: 0;
          padding: 0;
        }

        .xh-ec ul { list-style: none; }
        .xh-ec button { font-family: inherit; cursor: pointer; }
        .xh-ec a { text-decoration: none; }
        .xh-ec-wrap { max-width: 1240px; margin: 0 auto; padding: 0 20px; }
        .xh-ec-section { padding-top: 56px; }
        .xh-ec-blue { color: #2f5cf6; }

        .xh-ec-h2 {
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 700;
          letter-spacing: -.01em;
          line-height: 1.15;
          margin-bottom: 8px;
          color: #1b2430;
        }

        .xh-ec-sub {
          font-size: 18px;
          color: #5b6573;
          margin-bottom: 22px;
        }

        .xh-ec-eyebrow {
          display: inline-block;
          font-size: 11px;
          letter-spacing: .18em;
          font-weight: 700;
          text-transform: uppercase;
          color: #2f5cf6;
          background: #eaf1ff;
          border: 1px solid #d3e2ff;
          padding: 6px 14px;
          border-radius: 999px;
        }

        .xh-ec-eyebrow-light {
          color: #9fd9f4;
          background: rgba(255,255,255,.1);
          border-color: rgba(255,255,255,.2);
        }

        /* BUTTONS */
        .xh-ec-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 0;
          background: #2f5cf6;
          color: #fff !important;
          font-size: 16px;
          font-weight: 700;
          padding: 13px 28px;
          border-radius: 6px;
          transition: background .15s, transform .15s;
        }

        .xh-ec-btn:hover { background: #1f47d6; }

        .xh-ec-btn-white {
          background: #fff;
          color: #1b2430 !important;
        }

        .xh-ec-btn-white:hover { background: #eef3ff; }

        .xh-ec-btn-line {
          background: #fff;
          color: #2f5cf6 !important;
          border: 1.5px solid #2f5cf6;
          padding: 8px 16px;
          font-size: 14px;
        }

        .xh-ec-btn-line:hover { background: #eef3ff; }

        .xh-ec-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 0;
          background: none;
          padding: 0;
          color: #2f5cf6 !important;
          font-weight: 700;
          font-size: 15px;
        }

        .xh-ec-link:hover { color: #1f47d6 !important; }

        /* GRADIENTS */
        .xh-ec-g1 { background: linear-gradient(135deg, #07a1e3, #5cc8f5); color: #fff; }
        .xh-ec-g2 { background: linear-gradient(135deg, #10b981, #6ee7b7); color: #fff; }
        .xh-ec-g3 { background: linear-gradient(135deg, #8b5cf6, #f472b6); color: #fff; }
        .xh-ec-g4 { background: linear-gradient(135deg, #ff5a3d, #ffa07a); color: #fff; }
        .xh-ec-g5 { background: linear-gradient(135deg, #2f5cf6, #7aa2ff); color: #fff; }
        .xh-ec-g6 { background: linear-gradient(135deg, #1e293b, #475569); color: #fff; }

        /* PROMO */
        .xh-ec-promo {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: center;
          min-height: 440px;
          margin-top: 24px;
          border-radius: 6px;
          overflow: hidden;
          background: #eef4fa;
        }

        .xh-ec-promo::before {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 70%;
          background: #e1ecf7;
          clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 100%);
        }

        .xh-ec-promo-card {
          position: relative;
          z-index: 2;
          background: #fff;
          margin: 40px 0 40px 44px;
          padding: 34px;
          border-radius: 4px;
          box-shadow: 0 2px 6px rgba(15,23,42,.1), 0 8px 24px rgba(15,23,42,.08);
          max-width: 560px;
        }

        .xh-ec-promo-card h1 {
          font-size: clamp(30px, 3.6vw, 46px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -.02em;
          margin: 16px 0 14px;
        }

        .xh-ec-promo-card p {
          font-size: 18px;
          line-height: 1.5;
          color: #4b5563;
          margin-bottom: 22px;
        }

        .xh-ec-promo-art {
          position: relative;
          z-index: 1;
          height: 100%;
          min-height: 380px;
        }

        .xh-ec-shape { position: absolute; display: block; }

        .xh-ec-shape-1 {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: #07a1e3;
          opacity: .9;
          left: 18%;
          top: 14%;
        }

        .xh-ec-shape-2 {
          width: 160px;
          height: 160px;
          border-radius: 24px;
          background: #ff5a3d;
          transform: rotate(14deg);
          right: 12%;
          top: 22%;
          opacity: .95;
        }

        .xh-ec-shape-3 {
          width: 0;
          height: 0;
          border-left: 70px solid transparent;
          border-right: 70px solid transparent;
          border-bottom: 120px solid #2f5cf6;
          left: 34%;
          bottom: 12%;
        }

        .xh-ec-promo-icon {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: #fff;
          color: #2f5cf6;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 16px 40px rgba(15,23,42,.18);
        }

        .xh-ec-promo-chip {
          position: absolute;
          background: #fff;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 22px rgba(15,23,42,.14);
          color: #1b2430;
        }

        .xh-ec-chip-a { left: 8%; bottom: 20%; }
        .xh-ec-chip-b { right: 6%; bottom: 10%; }
        .xh-ec-chip-a svg { color: #10b981; }
        .xh-ec-chip-b svg { color: #ff5a3d; }

        /* SKILLS CAROUSEL */
        .xh-ec-skills {
          display: grid;
          grid-template-columns: minmax(270px, .9fr) minmax(0, 3.1fr);
          gap: 28px;
          align-items: center;
        }

        .xh-ec-skills-text h2 {
          font-size: clamp(27px, 2.7vw, 40px);
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: 14px;
          letter-spacing: -.035em;
          color: #202b48;
        }

        .xh-ec-skills-text em { font-style: italic; }

        .xh-ec-skills-text p {
          max-width: 390px;
          font-size: 17px;
          line-height: 1.9;
          color: #65718a;
        }

        .xh-ec-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          animation: xhEcFade .35s ease;
        }

        @keyframes xhEcFade {
          from { opacity: 0; transform: translateX(14px); }
          to { opacity: 1; transform: none; }
        }

        .xh-ec-card {
          padding: 0;
          border: 0;
          background: #e8e8ef;
          border-radius: 20px;
          overflow: hidden;
          text-align: left;
          position: relative;
          height: 500px;
          display: block;
          box-shadow: none;
          transition: transform .18s, box-shadow .18s;
        }

        .xh-ec-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 38px rgba(28,35,69,.13);
        }

        .xh-ec-card-art {
          position: absolute;
          inset: 0;
          display: block;
          padding: 0;
          overflow: hidden;
          background: #dfe7f4;
        }

        .xh-ec-skill-art img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .55s ease;
        }

        .xh-ec-card:hover .xh-ec-skill-art img {
          transform: scale(1.045);
        }

        .xh-ec-skill-art-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(19,30,58,.02) 42%, rgba(19,30,58,.17) 100%);
        }

        .xh-ec-card-label {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 20px;
          background: #fff;
          border-radius: 11px;
          padding: 27px 20px 18px;
          min-height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #1b2430;
          box-shadow: 0 8px 22px rgba(21,29,54,.06);
        }

        .xh-ec-card-label b {
          font-size: 20px;
          font-weight: 500;
          line-height: 1.35;
        }

        .xh-ec-card-label svg {
          align-self: flex-end;
          width: 20px;
          height: 20px;
          color: #2c344c;
        }

        .xh-ec-pager {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-top: 28px;
        }

        .xh-ec-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(228,231,241,.65);
          background: #fff;
          box-shadow: 0 6px 20px rgba(31,41,75,.09);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #1b2430;
        }

        .xh-ec-arrow:disabled {
          opacity: .35;
          cursor: default;
          box-shadow: 0 1px 4px rgba(15,23,42,.1);
        }

        .xh-ec-dots {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .xh-ec-dots button {
          width: 15px;
          height: 15px;
          border-radius: 99px;
          border: 0;
          background: #e6e8f1;
          padding: 0;
          transition: width .2s, background .2s;
        }

        .xh-ec-dots button.is-on {
          width: 53px;
          background: #7134dc;
        }

        /* TABS AND FEATURE CARDS */
        .xh-ec-tabs {
          display: flex;
          gap: 6px;
          border-bottom: 1px solid #d6dbe5;
          margin-bottom: 26px;
          overflow-x: auto;
        }

        .xh-ec-tabs button {
          border: 0;
          background: none;
          padding: 14px 18px;
          font-size: 18px;
          color: #6a7380;
          border-bottom: 3px solid transparent;
          margin-bottom: -1px;
          white-space: nowrap;
        }

        .xh-ec-tabs button:hover { color: #1b2430; }

        .xh-ec-tabs button.is-on {
          color: #1b2430;
          font-weight: 600;
          border-bottom-color: #2f5cf6;
        }

        .xh-ec-feature-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          animation: xhEcFade .3s ease;
        }

        .xh-ec-feature {
          border: 1px solid #e3e8ef;
          border-radius: 14px;
          background: #fff;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: box-shadow .18s, transform .18s;
        }

        .xh-ec-feature:hover {
          box-shadow: 0 12px 28px rgba(15,23,42,.1);
          transform: translateY(-2px);
        }

        .xh-ec-feature-art {
          height: 170px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }

        .xh-ec-feature-art span {
          font-size: 64px;
          display: flex;
          filter: drop-shadow(0 8px 12px rgba(0,0,0,.2));
        }

        .xh-ec-feature h3 {
          font-size: 20px;
          font-weight: 700;
          line-height: 1.25;
        }

        .xh-ec-feature p {
          font-size: 15px;
          color: #5b6573;
          line-height: 1.5;
          flex: 1;
        }

        .xh-ec-feature-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 10px;
        }

        .xh-ec-tag {
          background: #d9f1fb;
          color: #0a6d93;
          font-size: 12px;
          font-weight: 700;
          padding: 5px 10px;
          border-radius: 4px;
        }

        .xh-ec-showall {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 22px;
          color: #2f5cf6 !important;
          font-weight: 700;
          font-size: 16px;
        }

        /* DARK BANNER */
        .xh-ec-dark {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
          gap: 40px;
          align-items: center;
          background: #141b2d;
          color: #fff;
          border-radius: 28px;
          padding: 60px;
          overflow: hidden;
        }

        .xh-ec-dark-text h2 {
          font-size: clamp(28px, 3.2vw, 42px);
          font-weight: 700;
          line-height: 1.12;
          margin-bottom: 14px;
        }

        .xh-ec-dark-text > p {
          font-size: 18px;
          line-height: 1.55;
          color: #c7cfdd;
          margin-bottom: 26px;
          max-width: 560px;
        }

        .xh-ec-perks {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px 22px;
          margin-bottom: 30px;
        }

        .xh-ec-perks li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 16px;
          line-height: 1.35;
        }

        .xh-ec-perk-ico {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .xh-ec-perk-blue { background: #cfe0ff; color: #2f5cf6; }
        .xh-ec-perk-orange { background: #ffd9cf; color: #e04a2d; }
        .xh-ec-perk-green { background: #c9f0e1; color: #0a8f64; }
        .xh-ec-perk-purple { background: #e6dcff; color: #6a4bd6; }

        .xh-ec-learn {
          display: inline-block;
          margin-left: 22px;
          color: #fff !important;
          font-weight: 700;
          border-bottom: 2px solid #fff;
          padding-bottom: 1px;
        }

        .xh-ec-dark-art {
          display: flex;
          gap: 18px;
          justify-content: flex-end;
        }

        .xh-ec-dark-main {
          flex: 1 1 auto;
          max-width: 420px;
          min-height: 360px;
          border-radius: 14px;
          background: linear-gradient(140deg, #f4f6fb 0%, #f4f6fb 40%, #2f5cf6 40%, #2f5cf6 70%, #07a1e3 70%);
          color: #1b2430;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .xh-ec-dark-main svg { color: #ff5a3d; }
        .xh-ec-dark-main b { font-size: 28px; font-weight: 700; }

        .xh-ec-dark-main small {
          font-size: 14px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #6a7380;
        }

        .xh-ec-dark-side {
          width: 120px;
          min-height: 360px;
          border-radius: 14px;
          background: linear-gradient(160deg, #5cc8f5, #2f5cf6 60%, #6a4bd6);
        }

        /* TRUSTED PARTNERS */
        .xh-ec-trust {
          background: #f5f6f8;
          margin-top: 56px;
          padding: 44px 0;
        }

        .xh-ec-trust p {
          text-align: center;
          font-size: 20px;
          color: #6a7380;
          margin-bottom: 26px;
        }

        .xh-ec-trust p a {
          margin-left: 10px;
          color: #2f5cf6 !important;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 18px;
        }

        .xh-ec-logos {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 28px 64px;
        }

        .xh-ec-logos img {
          height: 40px;
          width: auto;
          max-width: 140px;
          object-fit: contain;
          opacity: .55;
          filter: grayscale(1);
          transition: opacity .2s, filter .2s;
        }

        .xh-ec-logos img:hover {
          opacity: 1;
          filter: none;
        }

        /* STORIES */
        .xh-ec-stories {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          margin-top: 22px;
        }

        .xh-ec-story {
          border: 1px solid #e3e8ef;
          border-radius: 14px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #fff;
        }

        .xh-ec-story > svg { color: #1b2430; }
        .xh-ec-story h4 { font-size: 19px; font-weight: 700; }

        .xh-ec-story p {
          font-size: 16px;
          line-height: 1.55;
          color: #3b4452;
          flex: 1;
        }

        .xh-ec-story-who {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 12px;
        }

        .xh-ec-story-who img {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          object-fit: cover;
        }

        .xh-ec-story-who b {
          display: block;
          font-size: 15px;
          color: #1b2430;
        }

        .xh-ec-story-who small {
          font-size: 13px;
          color: #6a7380;
        }

        /* CAREER ACCELERATORS */
        .xh-ec-learning-section { padding-top: 64px; }

        .xh-ec-mini-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: #6257d9;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .16em;
        }

        .xh-ec-mini-label::before {
          content: "";
          width: 22px;
          height: 2px;
          background: #c7f36b;
        }

        .xh-ec-learning-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 24px;
          margin-bottom: 25px;
        }

        .xh-ec-learning-heading .xh-ec-sub {
          margin: 10px 0 0;
          max-width: 820px;
        }

        .xh-ec-heading-mark {
          display: grid;
          place-items: center;
          flex: 0 0 54px;
          width: 54px;
          height: 54px;
          border-radius: 16px;
          background: #eef0ff;
          color: #635bdf;
          font-size: 29px;
        }

        .xh-ec-accelerator-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .xh-ec-accelerator-card {
          display: block;
          width: 100%;
          min-width: 0;
          padding: 12px;
          text-align: left;
          border: 1px solid #e3e7f2;
          border-radius: 19px;
          background: #fff;
          color: #111a33;
          overflow: hidden;
          transition: transform .22s, box-shadow .22s, border-color .22s;
        }

        .xh-ec-accelerator-card:hover {
          transform: translateY(-5px);
          border-color: #c9c4ff;
          box-shadow: 0 18px 40px rgba(30,37,85,.11);
        }

        .xh-ec-accelerator-image {
          position: relative;
          display: block;
          height: 220px;
          overflow: hidden;
          border-radius: 12px;
          background: #e6eaff;
        }

        .xh-ec-accelerator-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .45s;
        }

        .xh-ec-accelerator-card:hover .xh-ec-accelerator-image img {
          transform: scale(1.055);
        }

        .xh-ec-image-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(18,28,63,.12), transparent 55%, rgba(17,26,51,.22));
        }

        .xh-ec-accelerator-symbol {
          position: absolute;
          left: 18px;
          top: 15px;
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(255,255,255,.9);
          color: #5144d8;
          font-size: 28px;
          box-shadow: 0 8px 24px rgba(16,23,42,.12);
        }

        .xh-ec-accelerator-info {
          display: block;
          padding: 16px 2px 4px;
        }

        .xh-ec-accelerator-info > strong {
          display: block;
          margin-bottom: 15px;
          font-size: 20px;
          line-height: 1.25;
          letter-spacing: -.025em;
        }

        .xh-ec-course-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          align-items: center;
          color: #65708a;
          font-size: 12px;
        }

        .xh-ec-course-meta > span {
          padding: 5px 7px;
          border: 1px solid #e2e6f0;
          border-radius: 5px;
          white-space: nowrap;
        }

        .xh-ec-course-meta .xh-ec-rating {
          color: #8d4d0b;
          background: #fff9e9;
          border-color: #f3e4b8;
        }

        .xh-ec-learning-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-top: 27px;
          color: #5144d8 !important;
          font-size: 15px;
          font-weight: 800;
        }

        .xh-ec-learning-link svg { transition: transform .18s; }

        .xh-ec-learning-link:hover svg {
          transform: translateX(4px);
        }

        /* COURSE CATEGORY TABS */
        .xh-ec-category-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          margin: 18px 0 24px;
          border-bottom: 1px solid #dfe3ef;
          scrollbar-width: thin;
        }

        .xh-ec-category-tabs button {
          flex: 0 0 auto;
          position: relative;
          padding: 14px 14px 16px;
          border: 0;
          border-bottom: 3px solid transparent;
          margin-bottom: -1px;
          background: transparent;
          color: #65708a;
          font: inherit;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          transition: color .18s, border-color .18s;
        }

        .xh-ec-category-tabs button:hover { color: #5144d8; }

        .xh-ec-category-tabs button.is-on {
          color: #111a33;
          border-bottom-color: #635bdf;
        }

        /* COURSE CARDS */
        .xh-ec-course-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          animation: xhEcFade .28s ease;
        }

        .xh-ec-course-card {
          min-width: 0;
          display: flex;
          flex-direction: column;
          border: 1px solid #e2e6f0;
          border-radius: 17px;
          padding: 12px;
          background: #fff;
          overflow: hidden;
          transition: transform .2s, box-shadow .2s, border-color .2s;
        }

        .xh-ec-course-card:hover {
          transform: translateY(-4px);
          border-color: #c9c4ff;
          box-shadow: 0 16px 35px rgba(30,37,85,.10);
        }

        .xh-ec-course-image {
          position: relative;
          display: block;
          width: 100%;
          height: 155px;
          padding: 0;
          overflow: hidden;
          border: 0;
          border-radius: 10px;
          background: #e7eaff;
          text-align: left;
        }

        .xh-ec-course-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .4s;
        }

        .xh-ec-course-card:hover .xh-ec-course-image img {
          transform: scale(1.05);
        }

        .xh-ec-course-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(16,23,42,.08), rgba(16,23,42,.34));
        }

        .xh-ec-course-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          padding: 5px 8px;
          border-radius: 5px;
          background: #c7f36b;
          color: #263b0b;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .01em;
        }

        .xh-ec-course-badge.is-premium {
          background: #635bdf;
          color: #fff;
        }

        .xh-ec-course-badge.is-rated {
          background: #ffe0a6;
          color: #7d4107;
        }

        .xh-ec-course-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 13px 2px 2px;
        }

        .xh-ec-course-content h3 {
          display: -webkit-box;
          min-height: 48px;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          color: #111a33;
          font-size: 16px;
          line-height: 1.45;
          letter-spacing: -.015em;
          font-weight: 750;
        }

        .xh-ec-course-instructor {
          overflow: hidden;
          margin: 6px 0 11px !important;
          color: #707a91;
          font-size: 12px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .xh-ec-course-stats {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;
          color: #6c7690;
          font-size: 11px;
        }

        .xh-ec-course-stats strong {
          color: #8b4b08;
          font-size: 13px;
        }

        .xh-ec-star {
          color: #d48a22;
          font-size: 15px;
        }

        .xh-ec-course-buy {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-top: auto;
          padding-top: 14px;
        }

        .xh-ec-course-price {
          color: #111a33;
          font-size: 16px;
          font-weight: 850;
          white-space: nowrap;
        }

        .xh-ec-course-price del {
          margin-left: 5px;
          color: #8790a4;
          font-size: 11px;
          font-weight: 500;
        }

        .xh-ec-course-buy button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 9px 10px;
          border: 1px solid #7667f8;
          border-radius: 8px;
          background: #fff;
          color: #5144d8;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
          transition: background .18s, color .18s;
        }

        .xh-ec-course-buy button:hover:not(:disabled) {
          background: #635bdf;
          color: #fff;
        }

        .xh-ec-course-buy button.is-added,
        .xh-ec-course-buy button:disabled {
          background: #edf9f2;
          border-color: #b9e7ca;
          color: #16834b;
          cursor: default;
          opacity: 1;
        }

        .xh-ec-trending-section { padding-bottom: 18px; }
        .xh-ec-trending-heading { align-items: center; }

        .xh-ec-trending-controls {
          display: flex;
          gap: 9px;
          flex-shrink: 0;
        }

        .xh-ec-trending-controls button {
          display: grid;
          place-items: center;
          width: 43px;
          height: 43px;
          border: 1px solid #e0e4ef;
          border-radius: 50%;
          background: #fff;
          color: #111a33;
          box-shadow: 0 6px 18px rgba(20,28,62,.07);
          transition: background .18s, color .18s;
        }

        .xh-ec-trending-controls button:hover:not(:disabled) {
          background: #111a33;
          color: #fff;
        }

        .xh-ec-trending-controls button:disabled {
          opacity: .35;
          cursor: not-allowed;
        }

        /* CART NOTIFICATION */
        .xh-ec-cart-toast {
          position: fixed;
          z-index: 10001;
          right: 24px;
          bottom: 105px;
          max-width: min(390px, calc(100% - 32px));
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 15px;
          border: 1px solid #ccebd8;
          border-radius: 10px;
          background: #f0fbf4;
          color: #176b3b;
          box-shadow: 0 10px 30px rgba(15,23,42,.13);
          font-size: 13px;
          font-weight: 600;
        }

        .xh-ec-cart-toast span { flex: 1; }

        .xh-ec-cart-toast button {
          display: grid;
          place-items: center;
          width: 25px;
          height: 25px;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: #176b3b;
        }

        /* FLOATING CART */
        .xh-ec-floating-cart {
          position: fixed;
          z-index: 10000;
          left: 50%;
          bottom: 22px;
          transform: translateX(-50%);
          width: min(560px, calc(100% - 30px));
          min-height: 72px;
          padding: 12px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: #fff;
          border: 1px solid #e1e5ef;
          border-radius: 14px;
          box-shadow: 0 12px 40px rgba(20,28,62,.18);
        }

        .xh-ec-floating-cart-info {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          color: #5144d8;
        }

        .xh-ec-cart-icon {
          position: relative;
          display: grid;
          place-items: center;
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          border-radius: 12px;
          background: #f0edff;
          color: #5144d8;
        }

        .xh-ec-cart-icon > span {
          position: absolute;
          top: -6px;
          right: -6px;
          display: grid;
          place-items: center;
          min-width: 19px;
          height: 19px;
          padding: 0 4px;
          border: 2px solid #fff;
          border-radius: 50px;
          background: #635bdf;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
        }

        .xh-ec-cart-total {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .xh-ec-cart-total strong {
          color: #111a33;
          font-size: 14px;
        }

        .xh-ec-cart-total span {
          color: #65708a;
          font-size: 13px;
          font-weight: 700;
        }

        .xh-ec-cart-view {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 18px;
          border: 0;
          border-radius: 8px;
          background: #635bdf;
          color: #fff;
          font-size: 14px;
          font-weight: 800;
          white-space: nowrap;
          transition: background .18s, transform .18s;
        }

        .xh-ec-cart-view:hover {
          background: #5144d8;
          transform: translateY(-1px);
        }

        .xh-ec-cart-clear {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          border: 0;
          border-radius: 50%;
          background: #f1f2f8;
          color: #555;
        }

        .xh-ec-cart-clear:hover {
          background: #ffe9e9;
          color: #c62828;
        }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .xh-ec-skills {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .xh-ec-skills-text p { max-width: 680px; }
          .xh-ec-card { height: 440px; }

          .xh-ec-course-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .xh-ec-accelerator-image { height: 190px; }
          .xh-ec-course-image { height: 175px; }
        }

        @media (max-width: 900px) {
          .xh-ec-promo { grid-template-columns: 1fr; }
          .xh-ec-promo-card { margin: 24px; }
          .xh-ec-promo-art { min-height: 300px; }

          .xh-ec-dark {
            grid-template-columns: 1fr;
            padding: 34px;
          }

          .xh-ec-dark-art { display: none; }

          .xh-ec-feature-grid,
          .xh-ec-stories {
            grid-template-columns: 1fr;
          }

          .xh-ec-cards {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
          }

          .xh-ec-card { height: 380px; }

          .xh-ec-card-label {
            left: 10px;
            right: 10px;
            bottom: 12px;
            min-height: 94px;
            padding: 17px 13px 13px;
          }

          .xh-ec-card-label b { font-size: 16px; }
        }

        @media (max-width: 700px) {
          .xh-ec-learning-section { padding-top: 48px; }

          .xh-ec-learning-heading {
            align-items: flex-start;
          }

          .xh-ec-heading-mark { display: none; }

          .xh-ec-accelerator-grid {
            grid-template-columns: 1fr;
          }

          .xh-ec-accelerator-image { height: 205px; }

          .xh-ec-course-grid {
            grid-template-columns: 1fr;
          }

          .xh-ec-course-image { height: 210px; }

          .xh-ec-course-content h3 { min-height: 0; }

          .xh-ec-trending-heading {
            align-items: flex-start;
          }

          .xh-ec-trending-controls { padding-top: 6px; }
          .xh-ec-course-buy { flex-wrap: wrap; }

          .xh-ec-perks { grid-template-columns: 1fr; }
          .xh-ec-approach-grid { grid-template-columns: 1fr; }

          .xh-ec-learn {
            margin: 16px 0 0;
            display: block;
            width: max-content;
          }

          .xh-ec-floating-cart {
            bottom: 12px;
            padding: 10px;
            gap: 8px;
          }

          .xh-ec-cart-view {
            padding: 10px 12px;
            font-size: 12px;
          }

          .xh-ec-cart-total strong { font-size: 12px; }
          .xh-ec-cart-total span { font-size: 12px; }
          .xh-ec-cart-clear { width: 28px; height: 28px; }
          .xh-ec-cart-toast { right: 15px; bottom: 94px; }
        }

        @media (min-width: 701px) and (max-width: 900px) {
          .xh-ec-accelerator-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .xh-ec-cards { grid-template-columns: 1fr; }
          .xh-ec-card { height: 350px; }

          .xh-ec-card-label {
            left: 14px;
            right: 14px;
            bottom: 14px;
            min-height: 100px;
            padding: 20px 16px 14px;
          }

          .xh-ec-card-label b { font-size: 19px; }
          .xh-ec-pager { margin-top: 20px; }

          .xh-ec-floating-cart {
            width: calc(100% - 20px);
          }

          .xh-ec-cart-icon {
            width: 36px;
            height: 36px;
          }

          .xh-ec-cart-view {
            gap: 4px;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default ForBusinessNew;