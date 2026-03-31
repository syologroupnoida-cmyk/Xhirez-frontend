import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, Code, Lightbulb, Search, ArrowLeft, 
  Trophy, BookOpen, Bookmark, Share2, Printer, 
  CheckCircle, PlayCircle, Info, Filter, BarChart, Clock
} from 'lucide-react';
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from '../../components/footer/footer';

const fieldData = {
  "software-engineering": {
    name: "Software Engineering",
    description: "The most comprehensive roadmap to crack Tier-1 tech interviews. Covers everything from memory management to high-level system design.",
    icon: <Code className="w-10 h-10" />,
    bannerImg: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
    stats: { total: 156, duration: "30-45 Days", successRate: "92%" },
    sections: [
      {
        id: "dsa",
        title: "Data Structures & Algorithms",
        icon: <BarChart className="w-5 h-5" />,
        questions: [
          { q: "How to find the intersection of two linked lists?", a: "To find the intersection, you can use two pointers. Let length of L1 be N and L2 be M...", difficulty: "Medium", tags: ["Linked List", "Two Pointers"] },
          { q: "Implement LRU Cache with O(1) complexity.", a: "Use a combination of a Hash Map and a Double Linked List to achieve O(1) for both get and put operations.", difficulty: "Hard", tags: ["Design", "Hash Map"] }
        ]
      },
      {
        id: "sys-design",
        title: "System Design (HLD/LLD)",
        icon: <Lightbulb className="w-5 h-5" />,
        questions: [
          { q: "Design a scalable Notification System.", a: "Key components: Load Balancer, Notification Service, Message Queues (Kafka/RabbitMQ), and Third-party APIs...", difficulty: "Hard", tags: ["Scalability", "Backend"] }
        ]
      }
    ]
  }
};

const FieldDetails = () => {
  const { fieldId } = useParams();
  const field = fieldData[fieldId] || fieldData["software-engineering"]; // Fallback for demo
  
  const [activeTab, setActiveTab] = useState(field.sections[0].id);
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState([]);
  const [expanded, setExpanded] = useState(null);

  // Toggle Completion
  const toggleComplete = (id) => {
    setCompleted(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-blue-100">
      <UnifiedHeader />
      
      {/* 1. ULTRA HERO SECTION */}
      <div className="relative bg-[#0B1120] pt-24 pb-40 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link to="/" className="flex items-center gap-2 text-blue-400 font-bold mb-8 hover:translate-x-[-5px] transition-transform">
            <ArrowLeft size={18} /> Back to Library
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 text-white">
                  {field.icon}
                </div>
                <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest">
                  Verified Roadmap 2026
                </div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
                {field.name} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-6xl">Interview Masterclass</span>
              </h1>
              <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">{field.description}</p>
            </div>

            {/* Floating Stats Card */}
            <div className="lg:w-1/3 w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-slate-500 text-xs font-bold uppercase mb-1">Questions</p>
                  <p className="text-3xl font-black text-white">{field.stats.total}</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-500 text-xs font-bold uppercase mb-1">Placement</p>
                  <p className="text-3xl font-black text-emerald-400">{field.stats.successRate}</p>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)]">
                <PlayCircle size={22} /> Start Learning Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: PROGRESS & NAV */}
          <div className="lg:w-1/4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Bookmark className="text-blue-600" size={18} /> YOUR PROGRESS
                </h3>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-700" 
                    style={{ width: `${(completed.length / 10) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs font-bold text-slate-500">{completed.length} of 156 topics completed</p>
              </div>

              <div className="bg-white rounded-[2rem] p-4 shadow-xl border border-slate-100 overflow-hidden">
                {field.sections.map(section => (
                  <button 
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all font-bold text-sm mb-1 ${activeTab === section.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {section.icon} {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

         
          <div className="lg:w-3/4 pb-20">
            
            <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 flex flex-wrap items-center gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" placeholder="Search by topic, keyword or difficulty..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100"><Filter size={20}/></button>
                <button className="p-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100"><Printer size={20}/></button>
                <button className="p-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100"><Share2 size={20}/></button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {field.sections.find(s => s.id === activeTab).questions
                .filter(q => q.q.toLowerCase().includes(search.toLowerCase()))
                .map((item, idx) => (
                <div 
                  key={idx}
                  className={`group bg-white rounded-[2rem] border transition-all duration-300 ${expanded === idx ? 'border-blue-500 shadow-2xl ring-4 ring-blue-500/5' : 'border-slate-100 shadow-md hover:border-slate-300'}`}
                >
                  <div className="p-8">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${item.difficulty === 'Hard' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                          {item.difficulty}
                        </span>
                        {item.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-bold">#{tag}</span>
                        ))}
                      </div>
                      <button 
                        onClick={() => toggleComplete(`${activeTab}-${idx}`)}
                        className={`transition-colors ${completed.includes(`${activeTab}-${idx}`) ? 'text-emerald-500' : 'text-slate-200 hover:text-slate-300'}`}
                      >
                        <CheckCircle size={28} />
                      </button>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 leading-snug mb-6">{item.q}</h3>
                    
                    <button 
                      onClick={() => setExpanded(expanded === idx ? null : idx)}
                      className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest hover:gap-3 transition-all"
                    >
                      {expanded === idx ? 'Hide Solution' : 'View Solution'} <ChevronRight size={18} />
                    </button>

                    {expanded === idx && (
                      <div className="mt-8 p-8 bg-slate-50 rounded-3xl border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex gap-4">
                          <div className="w-1.5 h-auto bg-blue-600 rounded-full"></div>
                          <div>
                            <p className="text-slate-900 font-bold mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                              <Info size={16} /> Expert Analysis
                            </p>
                            <div className="text-slate-600 leading-relaxed space-y-4 font-medium">
                              {item.a}
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-200 flex gap-4">
                               <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-slate-800">Practice Code</button>
                               <button className="bg-white border border-slate-200 text-slate-600 px-6 py-2 rounded-xl text-xs font-bold hover:bg-slate-50">Save Note</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FieldDetails;