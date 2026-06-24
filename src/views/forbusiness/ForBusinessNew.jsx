import React, { useState } from 'react';
import { Link } from "@/router-dom";
import { useNavigate } from "@/router-dom";
import { 
  FaGraduationCap, FaLaptopCode, FaUserTie, FaRocket, 
  FaCheckCircle, FaBuilding, FaShieldAlt, FaChartBar 
} from 'react-icons/fa';
import { Brain, GraduationCap, Building2, RefreshCcw } from 'lucide-react'; // New Lucide Icons
import { motion, AnimatePresence } from 'framer-motion';
// Ye imports zaroori hain fixed error ke liye
import { Container, Row, Col } from 'react-bootstrap'; 
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from '../../components/footer/footer';

const ForBusinessNew = () => {
    const [view, setView] = useState('student'); // 'student' or 'corporate'
    const navigate = useNavigate();
    const token = sessionStorage.getItem("authToken");
    const user = token ? JSON.parse(token)?.users : null;

    const handleGetStarted = () => {
        if (user) {
            if (user.userRole === 'user') {
                navigate('/dashboardJobs'); 
            } else if (user.userRole === 'admin' || user.userRole === 'primeadmin') {
                navigate('/Recruitmenthero'); 
            }
        } else {
            // Redirect to the new business features page regardless of student or corporate view
            navigate('/business-features');
        }
    };

    const studentFeatures = [
        { icon: <FaGraduationCap />, title: 'Skill Masterclass', desc: 'Industry-standard curated paths.', color: 'from-blue-500 to-cyan-400' },
        { icon: <FaLaptopCode />, title: 'Code Arena', desc: 'Real-world technical challenges.', color: 'from-green-500 to-emerald-400' },
        { icon: <FaUserTie />, title: 'AI Mock Bot', desc: 'Instant behavioral & tech feedback.', color: 'from-purple-500 to-pink-400' },
    ];

    const corporateFeatures = [
        { icon: <FaBuilding />, title: 'Vetted Talent', desc: 'Access pre-screened top 1% candidates.', color: 'from-orange-500 to-red-400' },
        { icon: <FaShieldAlt />, title: 'Proctoring Tool', desc: 'AI-monitored secure assessment bot.', color: 'from-indigo-500 to-blue-400' },
        { icon: <FaChartBar />, title: 'Hiring Analytics', desc: 'Data-driven recruitment insights.', color: 'from-slate-700 to-slate-900' },
    ];

    const partnerLogos = [
        { name: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { name: "Amazon", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
        { name: "Microsoft", src: "https://static.cdnlogo.com/logos/m/21/microsoft_800.png" },
        { name: "Apple", src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
        { name: "Meta", src: "https://static.cdnlogo.com/logos/m/42/meta_800.png" },
        { name: "Netflix", src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    ];

    return (
        <div className="bg-[#fcfcfd] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-600">
            <UnifiedHeader />

            {/* --- Hero Section (pt-40 for Header distance) --- */}
            <section className="pt-40 pb-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100">
                            Dual Ecosystem Powered by AI
                        </span>
                        
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8">
                            One Platform. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Double</span> the Impact.
                        </h1>

                        {/* --- VIEW TOGGLE --- */}
                        <div className="flex justify-center mb-12">
                            <div className="bg-slate-100 p-1.5 rounded-[20px] flex gap-1 border border-slate-200">
                                <button 
                                    onClick={() => setView('student')}
                                    className={`px-8 py-3 rounded-[15px] text-sm font-bold transition-all duration-300 ${view === 'student' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    For Students
                                </button>
                                <button 
                                    onClick={() => setView('corporate')}
                                    className={`px-8 py-3 rounded-[15px] text-sm font-bold transition-all duration-300 ${view === 'corporate' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    For Corporate
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- MAIN CONTENT (Container, Row, Col Fix Applied) --- */}
            <section className="pb-24 px-4">
                <Container>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={view}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Row className="g-5 align-items-center">
                                {/* Left Side: Feature Grid */}
                                <Col lg={6}>
                                    <div className="space-y-4">
                                        {(view === 'student' ? studentFeatures : corporateFeatures).map((f, i) => (
                                            <div key={i} className="group p-6 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl hover:border-blue-100 transition-all duration-500">
                                                <div className="flex items-center gap-5">
                                                    <div className={`w-14 h-14 shrink-0 flex items-center justify-center text-white rounded-2xl bg-gradient-to-br ${f.color} shadow-lg shadow-blue-50 group-hover:rotate-6 transition-transform`}>
                                                        <span className="text-2xl">{f.icon}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-black text-slate-800 mb-1">{f.title}</h3>
                                                        <p className="text-slate-500 text-sm font-medium leading-relaxed">{f.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Col>

                                {/* Right Side: Visual Banner */}
                                <Col lg={6}>
                                    <div className={`relative p-12 rounded-[3.5rem] ${view === 'student' ? 'bg-blue-600' : 'bg-slate-900'} text-white overflow-hidden shadow-2xl min-h-[400px] flex flex-col justify-center`}>
                                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                                        
                                        <h2 className="text-4xl font-black mb-6 leading-tight">
                                            {view === 'student' ? "Build a career recruiters can't ignore." : "Build a team that fuels your growth."}
                                        </h2>
                                        
                                        <div className="space-y-4 mb-10">
                                            {['AI-Verified Skills', 'Performance Metrics', 'Priority Hiring'].map((t, idx) => (
                                                <div key={idx} className="flex items-center gap-3 font-bold opacity-90">
                                                    <FaCheckCircle className="text-cyan-300" /> {t}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex gap-4">
                                            <button onClick={handleGetStarted} className="inline-flex items-center gap-2 bg-white text-slate-900 font-black py-4 px-10 rounded-2xl hover:scale-105 transition-all shadow-xl">
                                                Get Started <FaRocket className="text-blue-600" />
                                            </button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </motion.div>
                    </AnimatePresence>
                </Container>
            </section>

            {/* --- SUCCESS STORIES SECTION --- */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] text-purple-600 uppercase bg-purple-50 rounded-full border border-purple-100">
                        Impact
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-12">
                        Real Results, Real Stories.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-slate-50 p-8 rounded-3xl shadow-lg border border-slate-100 space-y-4 text-left">
                            <p className="text-xl font-bold text-slate-800">"Landed my dream job!"</p>
                            <p className="text-slate-600 leading-relaxed">
                                "Thanks to E-campus, I found an internship that directly led to a full-time offer at a top tech company. 
                                The skill development programs were game-changers."
                            </p>
                            <div className="flex items-center gap-3 pt-4">
                                <img src="https://i.pravatar.cc/150?img=1" alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <p className="font-bold text-slate-900">Ananya Sharma</p>
                                    <p className="text-sm text-slate-500">Software Engineer, Google</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl shadow-lg border border-slate-100 space-y-4 text-left">
                            <p className="text-xl font-bold text-slate-800">"Hiring became effortless."</p>
                            <p className="text-slate-600 leading-relaxed">
                                "E-campus connected us with pre-vetted talent that perfectly matched our requirements. 
                                Our hiring efficiency improved by 40%."
                            </p>
                            <div className="flex items-center gap-3 pt-4">
                                <img src="https://i.pravatar.cc/150?img=2" alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <p className="font-bold text-slate-900">Ravi Kumar</p>
                                    <p className="text-sm text-slate-500">HR Director, Infosys</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl shadow-lg border border-slate-100 space-y-4 text-left">
                            <p className="text-xl font-bold text-slate-800">"Bridge between Academia & Industry."</p>
                            <p className="text-slate-600 leading-relaxed">
                                "As a university, partnering with E-campus allowed us to provide our students with unparalleled career opportunities 
                                and industry exposure."
                            </p>
                            <div className="flex items-center gap-3 pt-4">
                                <img src="https://i.pravatar.cc/150?img=3" alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <p className="font-bold text-slate-900">Dr. Priya Singh</p>
                                    <p className="text-sm text-slate-500">Placement Head, IIT Delhi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- OUR APPROACH SECTION (Enhanced) --- */}
            <section className="py-24 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
                {/* Decorative Shapes */}
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2"></div>

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] text-blue-200 uppercase bg-blue-700/50 rounded-full border border-blue-600/70">
                        Methodology
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black leading-tight mb-12">
                        Our Proven Approach to <span className="text-blue-300">Success</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> {/* Changed to 4 columns on large screens */}
                        {[
                            { icon: <Brain size={32} />, title: "AI-Powered Skill Mapping", desc: "We use advanced AI to assess student capabilities and map them to in-demand industry skills, ensuring precise development paths." },
                            { icon: <GraduationCap size={32} />, title: "Tailored Learning Paths", desc: "Customized educational content and practical projects align with individual student needs and corporate hiring trends." },
                            { icon: <Building2 size={32} />, title: "Seamless Corporate Integration", desc: "Our platform provides corporates with easy access to a talent pool, streamlined assessment tools, and detailed analytics for efficient hiring." },
                            { icon: <RefreshCcw size={32} />, title: "Continuous Feedback Loop", desc: "We foster an environment of continuous improvement through feedback from both students and employers, adapting to evolving market demands." }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/10 p-8 rounded-3xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                            >
                                <div className="w-16 h-16 shrink-0 bg-white text-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-black mb-3 leading-snug text-white">
                                    {item.title}
                                </h3>
                                <p className="text-blue-100 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* --- COMPACT TRUST BAR --- */}
            <section className="py-12 bg-slate-50/50">
                <Container className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Trusted Partners</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
                        {partnerLogos.map((partner, index) => (
                            <img 
                                key={index} 
                                src={partner.src} 
                                alt={`${partner.name} Logo`} 
                                className="h-10 md:h-12 object-contain" // Adjust height as needed
                            />
                        ))}
                    </div>
                </Container>
            </section>


            <Footer />
        </div>
    );
};

export default ForBusinessNew;