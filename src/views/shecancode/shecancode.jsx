import React, { useState } from 'react';
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from '../../components/footer/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaPaintBrush, FaTasks, FaUsers, FaLaptopCode, FaRocket, FaChevronDown } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const Shecancode = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { label: "Women Empowered", value: "5,000+" },
    { label: "Placement Rate", value: "85%" },
    { label: "Global Mentors", value: "150+" },
    { label: "Tech Workshops", value: "200+" },
  ];

  const curriculum = [
    {
      title: "Front-End Fundamentals",
      icon: <FaCode />,
      topics: ["Semantic HTML5", "Modern CSS & Flexbox", "JavaScript ES6+", "React.js Basics"]
    },
    {
      title: "Product & UI/UX Design",
      icon: <FaPaintBrush />,
      topics: ["User Research", "Wireframing in Figma", "Prototyping", "Design Systems"]
    },
    {
      title: "Agile Management",
      icon: <FaTasks />,
      topics: ["Scrum Framework", "Jira & Trello", "Version Control (Git)", "Soft Skills"]
    }
  ];

  return (
    <div className="bg-[#FCFDFF] font-sans selection:bg-blue-100 text-slate-900">
      <UnifiedHeader />

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block px-4 py-1.5 mb-6 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-sm font-bold tracking-wide">
              CAMPAIGN 2026 • EQUAL OPPORTUNITIES
            </div>
            <h1 className="text-6xl lg:text-7xl font-black leading-tight mb-8">
              She Can <span className="text-blue-500">Code.</span>
            </h1>
            <p className="text-slate-600 text-xl leading-relaxed mb-10">
              Xhirez presents a dedicated initiative for young women. We don't just teach syntax; we build careers in engineering, design, and leadership to bridge the global gender gap.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setShowForm(true)} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold shadow-2xl hover:bg-blue-600 transition-all">Join the Campaign</button>
              <a href="/assets/brochures/shecancode_brochure.pdf" download="shecancode_brochure.pdf" className="bg-white border border-slate-200 text-slate-900 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all text-center inline-block">Download Brochure</a>
            </div>
          </motion.div>
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <img src="/assets/images/shecancode/background.jpg" className="relative rounded-[3rem] shadow-xl z-10 grayscale-[30%] hover:grayscale-0 transition-all duration-700" alt="Workshops" />
          </div>
        </div>
      </section>

      {/* --- Stats Section --- */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <h3 className="text-4xl font-black text-slate-900 mb-2">{s.value}</h3>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Comprehensive Curriculum --- */}
      <section className="py-24 px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6 text-slate-900">A Curriculum Built for <span className="text-blue-500 italic">Impact</span></h2>
            <p className="text-slate-500 text-lg leading-relaxed">Currently, women hold only 25% of tech roles. Our program is designed to provide the specific skills needed to excel in the current global labor market.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {curriculum.map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100">
                <div className="text-4xl text-blue-500 mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-6">{item.title}</h3>
                <ul className="space-y-4">
                  {item.topics.map((t, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Workshop Experience Section --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">The Workshop Experience</h2>
            <div className="space-y-6">
              {[
                { icon: <FaLaptopCode />, title: "3 Weeks Hands-on Learning", desc: "5 hours per week of intensive coding sessions with live feedback." },
                { icon: <FaUsers />, title: "1-on-1 Expert Mentorship", desc: "Get paired with female leads from top companies like Google & Meta." },
                { icon: <FaRocket />, title: "Real-world Portfolio", desc: "Build a landing page from scratch and deploy it to a live server." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-3xl hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 transition-all">
                  <div className="text-2xl text-blue-500 mt-1">{item.icon}</div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
            <h3 className="text-2xl font-bold mb-8 italic">Candidate Testimonial</h3>
            <p className="text-xl leading-relaxed text-slate-300 mb-8 italic">
              "As an Arts & Humanities graduate, I never thought coding was for me. But within a month, I confidently created a landing page from scratch. The community at She Can Code is empowering and transformative."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold">AS</div>
              <div>
                <p className="font-bold">Ananya Sharma</p>
                <p className="text-xs text-slate-500 tracking-widest uppercase">Front-end Developer Grad</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Got Questions?</h2>
          <div className="space-y-4">
            {[
              { q: "Do I need prior coding experience?", a: "Not at all! Our workshops are designed for beginners to intermediate learners." },
              { q: "Is the workshop completely free?", a: "We offer both free introductory sessions and premium intensive bootcamps." },
              { q: "Will I get a certificate?", a: "Yes, every candidate receives a verified digital certificate upon completion." }
            ].map((faq, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left font-bold hover:bg-slate-50 transition-colors"
                >
                  {faq.q} <FaChevronDown className={`transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <p className="p-6 pt-0 text-slate-500 leading-relaxed text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Minimal Modal Form --- */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-[2.5rem] p-10 max-w-md w-full relative shadow-2xl">
              <button onClick={() => setShowForm(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 text-2xl">×</button>
              <h3 className="text-3xl font-black mb-2">Join the Movement.</h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">Leave your details and we'll send you the workshop dates and admission details.</p>
              <form className="space-y-4">
                <input placeholder="Your Full Name" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
                <input placeholder="Email Address" type="email" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
                <button className="w-full py-4 bg-blue-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all mt-4">Send Application</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Shecancode;