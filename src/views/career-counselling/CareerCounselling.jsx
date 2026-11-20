import React, { useState } from 'react';
import { 
  CheckCircle2, Star, Users, Briefcase, Rocket, 
  ArrowRight, Play, Globe, ShieldCheck, Zap, 
  BarChart, Target, Settings, Brain, Search, 
  FileText, Lightbulb, Compass, Award, HelpCircle,
  GraduationCap, Stethoscope, Landmark, Palette, Gavel, Cpu 
} from 'lucide-react';
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from '../../components/footer/footer';
import ConsultationFormModal from './ConsultationFormModal'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CareerCounselling = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const questions = [
    { text: "I enjoy solving complex problems.", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { text: "I am comfortable working in a team.", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { text: "I am passionate about learning new technologies.", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { text: "I prefer clear, structured tasks over ambiguous ones.", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { text: "I take initiative in projects and leadership roles.", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  ];

  const handleAnswer = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      <UnifiedHeader />
      
      <div className="pt-[85px]"> 
        
      
        <section className="relative bg-white pt-20 pb-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-3/5 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-black tracking-widest uppercase border border-blue-100">
                <Zap size={14} /> Path to Your Dream Career
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
                Stop Guessing. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 underline decoration-blue-200 decoration-8 underline-offset-4">Start Growing.</span>
              </h1>
              <p className="text-slate-500 text-lg lg:text-xl max-w-xl leading-relaxed font-medium">
                Identify your true potential with our AI-powered assessments and 1-on-1 expert mentorship. Clarity is just a session away.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                  Start Free Career Test
                </button>
                <button className="flex items-center gap-3 px-8 py-5 text-slate-700 font-black hover:text-blue-600 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-blue-600"><Play size={20} fill="currentColor"/></div>
                  See How it Works
                </button>
              </div>
            </div>
            <div className="lg:w-2/5">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop" alt="Counselling Illustration" className="rounded-[3rem] shadow-2xl border-8 border-white rotate-2"/>
            </div>
          </div>
        </section>

       
        <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4">Feeling Lost?</h2>
            <h3 className="text-4xl font-black mb-16">You're not alone. Let's solve this.</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { stage: "After 10th", text: "Stuck between Science, Commerce or Arts?", icon: <GraduationCap /> },
                { stage: "After 12th", text: "Finding the right college vs. the right degree?", icon: <BookOpenText /> },
                { stage: "Graduation", text: "Confused between Jobs, Masters or Upskilling?", icon: <Briefcase /> }
              ].map((p, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 mx-auto text-blue-600">
                    {React.cloneElement(p.icon, { size: 32 })}
                  </div>
                  <h4 className="font-black text-xl mb-3">{p.stage}</h4>
                  <p className="text-slate-500 font-medium text-sm">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

       
        <section className="py-24 px-6 bg-white relative">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-20">
               <h3 className="text-4xl font-black">Your 4-Step Journey to Success</h3>
             </div>
             <div className="grid md:grid-cols-4 gap-12 relative">
                <div className="absolute top-1/4 left-0 right-0 h-1 bg-blue-50 hidden md:block z-0"></div>
                {[
                  { step: "01", title: "Assessment", desc: "Scientific psychometric tests to find your vibe." },
                  { step: "02", title: "Personal Report", desc: "A 20-page deep dive into your strengths." },
                  { step: "03", title: "Expert Advice", desc: "1-on-1 talk with mentors from top fields." },
                  { step: "04", title: "Final Roadmap", desc: "Step-by-step plan for the next 5 years." }
                ].map((s, i) => (
                  <div key={i} className="relative z-10 text-center space-y-4">
                    <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center font-black mx-auto shadow-xl shadow-blue-200">
                      {s.step}
                    </div>
                    <h4 className="font-black text-lg">{s.title}</h4>
                    <p className="text-slate-400 text-sm font-medium px-4">{s.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        
        <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden rounded-[4rem] mx-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
              <h2 className="text-blue-400 font-black tracking-widest text-xs uppercase">The Career Test</h2>
              <h3 className="text-4xl font-black italic">Discover your true aptitude.</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                Our AI analyzes over 56 parameters across logic, creativity, and personality traits to find your perfect professional fit.
              </p>
              <ul className="space-y-4 pt-4">
                {["Aptitude & Logical Reasoning", "Interests & Passion Analysis", "Emotional Intelligence (EQ)"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-sm">
                    <CheckCircle2 size={18} className="text-emerald-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/10 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-lg min-h-[420px] flex flex-col justify-center">
              {!isFinished ? (
                <div className="transition-all duration-300">
                  <div className="flex justify-between text-[10px] font-black uppercase mb-4 tracking-[0.2em]">
                    <span className="text-slate-300">Question {currentIndex + 1} / {questions.length}</span>
                    <span className="text-blue-400">{Math.round(((currentIndex + 1) / questions.length) * 100)}% Complete</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mb-10 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full transition-all duration-700 ease-in-out" 
                      style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="min-h-[120px]">
                    <p key={currentIndex} className="text-2xl font-bold mb-10 leading-snug animate-in fade-in slide-in-from-right-8 duration-500">
                      "{questions[currentIndex].text}"
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {questions[currentIndex].options.map((opt, i) => (
                      <button 
                        key={i} 
                        onClick={handleAnswer}
                        className="p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-blue-600 hover:border-blue-400 hover:scale-[1.02] transition-all duration-200 font-bold text-sm"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6 animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-3xl font-black">Analysis Finished!</h4>
                  <p className="text-slate-400 font-medium">We've processed your responses. Your profile is ready.</p>
                  <button 
                    onClick={() => { setIsFinished(false); setCurrentIndex(0); }}
                    className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-sm hover:bg-blue-500 hover:text-white transition-all shadow-lg"
                  >
                    View Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

       
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black">Explore 100+ Career Paths</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Engineering", icon: <Cpu />, color: "bg-blue-50 text-blue-600" },
              { name: "Medical", icon: <Stethoscope />, color: "bg-red-50 text-red-600" },
              { name: "Finance", icon: <Landmark />, color: "bg-emerald-50 text-emerald-600" },
              { name: "Creative Art", icon: <Palette />, color: "bg-purple-50 text-purple-600" },
              { name: "Law", icon: <Gavel />, color: "bg-amber-50 text-amber-600" },
              { name: "Startups", icon: <Rocket />, color: "bg-orange-50 text-orange-600" }
            ].map((c, i) => (
              <div key={i} className="group cursor-pointer">
                <div className={`${c.color} p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 group-hover:scale-105 transition-all shadow-sm`}>
                  {React.cloneElement(c.icon, { size: 32 })}
                  <span className="font-black text-xs uppercase tracking-wider">{c.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        
        <section className="py-24 px-6 bg-slate-50">
           <div className="max-w-7xl mx-auto">
              <h3 className="text-4xl font-black mb-16 text-center">Meet Your Mentors</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: "Dr. Ananya Iyer", role: "Sr. Career Psychologist", exp: "12+ Yrs", img: "https://i.pravatar.cc/150?u=a1" },
                  { name: "Sameer Verma", role: "IIM Grad / Tech Mentor", exp: "8+ Yrs", img: "https://i.pravatar.cc/150?u=a2" },
                  { name: "Rahul Deshmukh", role: "Education Strategist", exp: "15+ Yrs", img: "https://i.pravatar.cc/150?u=a3" }
                ].map((m, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <img src={m.img} alt={m.name} className="w-full h-64 object-cover rounded-3xl mb-6" />
                    <h4 className="font-black text-xl">{m.name}</h4>
                    <p className="text-blue-600 text-sm font-bold mb-4">{m.role}</p>
                    <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase">
                      <Star size={14} className="text-amber-400 fill-current" /> {m.exp} Experience
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </section>

        
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black">Simple, Student-Friendly Plans</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
             <div className="p-10 bg-white border border-slate-200 rounded-[3rem] space-y-8">
                <h4 className="text-xl font-black">Beginner (Free)</h4>
                <div className="text-4xl font-black">₹0</div>
                <ul className="space-y-4 font-bold text-slate-500 text-sm">
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-blue-600" size={18}/> Basic Aptitude Test</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-blue-600" size={18}/> 3 Career Path Suggestions</li>
                </ul>
                <button className="w-full py-4 border-2 border-slate-100 rounded-2xl font-black hover:bg-slate-50 transition-all">Start Free</button>
             </div>
             <div className="p-10 bg-blue-600 text-white rounded-[3rem] space-y-8 shadow-2xl shadow-blue-200 relative">
                <div className="absolute top-4 right-8 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase">Most Popular</div>
                <h4 className="text-xl font-black opacity-80">Premium Mentorship</h4>
                <div className="text-4xl font-black">₹1,499</div>
                <ul className="space-y-4 font-bold text-sm">
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-white" size={18}/> 1-on-1 Expert Session</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-white" size={18}/> 20+ Page Comprehensive Report</li>
                </ul>
                <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black hover:bg-slate-50 transition-all">Get Premium</button>
             </div>
          </div>
        </section>

       
        <section className="py-24 px-6 bg-slate-900 text-white">
           <div className="max-w-3xl mx-auto">
             <h3 className="text-3xl font-black text-center mb-12">Frequently Asked Questions</h3>
             <div className="space-y-4">
                {[
                  { q: "How accurate is the career test?", a: "Our test has a 94% accuracy rate based on global standards." },
                  { q: "Can parents join the session?", a: "Absolutely! We encourage parents to be part of the expert session." }
                ].map((faq, i) => (
                  <div key={i} className="border border-white/10 rounded-2xl p-6 bg-white/5 cursor-pointer" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                    <p className="font-black text-lg mb-3">{faq.q}</p>
                    {activeFaq === i && <p className="text-slate-400 text-sm font-medium animate-in fade-in duration-300">{faq.a}</p>}
                  </div>
                ))}
             </div>
           </div>
        </section>

        
        <section className="py-32 px-6 text-center">
          <div className="max-w-4xl mx-auto bg-blue-50 py-20 px-10 rounded-[4rem] border border-blue-100">
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-8">Ready to define <br/> your future?</h2>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-xl shadow-blue-200">
              Book Your Session Now
            </button>
          </div>
        </section>

      </div> 
      <Footer />
      <ConsultationFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

const BookOpenText = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/><path d="M6 8h2"/><path d="M6 12h2"/><path d="M16 8h2"/><path d="M16 12h2"/></svg>
);

export default CareerCounselling;