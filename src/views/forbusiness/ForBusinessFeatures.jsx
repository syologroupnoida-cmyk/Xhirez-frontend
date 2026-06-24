import React from 'react';
import { Link } from "@/router-dom"; // Added Link import
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from '../../components/footer/footer';
import { 
  Users, Search, ClipboardList, BookOpen, // Existing
  Target, BarChart3, ChevronRight, CheckCircle2, // Existing
  Code, Database, Megaphone, Briefcase, Building2, Lightbulb, FileText, Settings, Award // New icons
} from 'lucide-react';

const ForBusinessFeatures = () => {
  const interviewFields = [
    {
      title: "Software Engineering",
      desc: "DSA, System Design, Languages, and Development Life Cycle.",
      icon: <Code className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Data Science & AI/ML",
      desc: "Algorithms, Statistics, Machine Learning, and Data Modeling.",
      icon: <Database className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Marketing & Sales",
      desc: "Strategy, SEO, Digital Campaigns, and Market Analysis.",
      icon: <Megaphone className="w-6 h-6" />,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Human Resources",
      desc: "Recruitment, Employee Relations, Policies, and Talent Management.",
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Finance & Accounting",
      desc: "Financial Modeling, Analysis, Regulations, and Reporting.",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Product Management",
      desc: "Product Lifecycle, Strategy, User Experience, and Market Fit.",
      icon: <Target className="w-6 h-6" />,
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "Operations & Logistics",
      desc: "Supply Chain, Process Optimization, and Operational Efficiency.",
      icon: <Settings className="w-6 h-6" />,
      color: "bg-teal-100 text-teal-600"
    },
    {
      title: "Consulting",
      desc: "Case Studies, Problem Solving, and Client Management.",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-pink-100 text-pink-600"
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fa] font-sans">
      <UnifiedHeader />
      {/* Existing Hero Section content starts here, ensuring proper padding below header */}
      <div className="bg-[#1a2b4b] py-16 px-6 relative overflow-hidden text-white pt-40"> {/* Added pt-40 for header spacing */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="bg-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Interview & Assessment Hub</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
              Master Your <br /> 
              <span className="text-blue-400">Hiring Process.</span>
            </h1>
            <p className="text-gray-300 mt-6 text-lg leading-relaxed">
              Access comprehensive interview questions, assessment tests, and company-specific guides for all major industries.
            </p>
            <div className="mt-8 flex gap-4">
              <input 
                type="text" 
                placeholder="Enter your work email" 
                className="hidden sm:block flex-1 p-4 rounded text-gray-900 focus:outline-none"
              />
              <button className="bg-blue-500 hover:bg-blue-400 px-8 py-4 rounded font-bold transition-all">
                Get Free Demo
              </button>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
             {/* Abstract Dashboard UI Elements */}
             <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md border border-white/20 w-80 shadow-2xl">
                <div className="h-4 w-32 bg-white/20 rounded mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-12 bg-white/5 rounded flex items-center px-3 gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/30"></div>
                      <div className="flex-1 h-2 bg-white/20 rounded"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                   <div className="text-xs text-blue-300">Candidates Matched</div>
                   <div className="text-xl font-bold">1,240</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Interview Resources by Field */}
      <div className="max-w-6xl mx-auto py-12 px-6 relative z-10"> {/* Adjusted top margin and padding */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Interview Resources by <span className="text-blue-600">Field</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Changed to 4 columns for desktop */}
          {interviewFields.map((item) => (
            <Link to={`/business-field-guide/${item.title.toLowerCase().replace(/ & /g, '-').replace(/\//g, '-').replace(/ /g, '-')}`} key={item.title} className="block"> {/* Changed to Link component */}
              <div className="bg-white p-6 rounded-lg shadow-xl border-b-4 border-transparent hover:border-blue-500 transition-all group cursor-pointer h-full flex flex-col justify-between"> {/* Added h-full and flex for consistent card height */}
                <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
                </div>
                <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm">
                  Explore <ChevronRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Company Interview Guides */}
      <div className="max-w-6xl mx-auto py-24 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Interview Guides for <span className="text-blue-600">Top Companies</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: "google", name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", desc: "Comprehensive guides for Google's rigorous interviews." },
            { id: "amazon", name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", desc: "Master the Amazon leadership principles and technical rounds." },
            { id: "microsoft", name: "Microsoft", logo: "https://static.cdnlogo.com/logos/m/21/microsoft_800.png", desc: "Prepare for coding challenges and system design questions." },
            { id: "apple", name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", desc: "Insight into Apple's product-focused interview process." },
            { id: "meta", name: "Meta (Facebook)", logo: "https://static.cdnlogo.com/logos/m/42/meta_800.png", desc: "Excelling in Meta's behavioral and technical interviews." },
            { id: "netflix", name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", desc: "Strategies for Netflix's culture and engineering interviews." },
          ].map((company) => (
            <Link to={`/business-interview-guide/${company.id}`} key={company.id} className="block"> {/* Changed to Link component */}
              <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 text-center cursor-pointer h-full flex flex-col justify-between"> {/* Added h-full and flex for consistent card height */}
                <img src={company.logo} alt={company.name} className="h-16 mx-auto mb-4 object-contain" /> {/* Dynamic image path */}
                <div>
                  <h3 className="font-bold text-gray-800 text-xl mb-2">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.desc}</p>
                </div>
                <div className="mt-6 inline-flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm"> {/* Removed button, now part of Link */}
                  View Guide <ChevronRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForBusinessFeatures;