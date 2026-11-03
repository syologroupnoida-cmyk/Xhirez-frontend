import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Laptop,
  MapPin,
  Play,
  Search,
  ShieldCheck,
  Star,
  Users,
  Video,
  Wallet,
  HeartHandshake,
  Target,
  Compass,
} from "lucide-react";

import UnifiedHeader from "../../components/header/UnifiedHeader";
import Footer from "../../components/footer/footer";
import ConsultationFormModal from "./ConsultationFormModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CareerCounselling = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [careerSearch, setCareerSearch] = useState("");
  const [activeFaq, setActiveFaq] = useState(0);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const categories = [
    { title: "After Class 10", subtitle: "Choose the right stream", icon: GraduationCap, color: "blue" },
    { title: "After Class 12", subtitle: "Courses and colleges", icon: BookOpen, color: "green" },
    { title: "College & Degree", subtitle: "Find your best-fit course", icon: Target, color: "purple" },
    { title: "IT & Technology", subtitle: "Explore tech careers", icon: Laptop, color: "orange" },
    { title: "Government Exams", subtitle: "Plan your preparation", icon: ShieldCheck, color: "pink" },
    { title: "Career Change", subtitle: "Take the next step", icon: Compass, color: "teal" },
    { title: "Engineering", subtitle: "Discover specialisations", icon: BriefcaseBusiness, color: "blue" },
    { title: "Medical & Healthcare", subtitle: "Explore healthcare paths", icon: HeartHandshake, color: "green" },
    { title: "Business & Finance", subtitle: "Build a business career", icon: Wallet, color: "purple" },
  ];

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 6);

  const counsellors = [
    {
      name: "Senior Career Counsellor",
      role: "Career Planning & Guidance",
      experience: "10+ years experience",
      mode: "Online",
      location: "Pan India",
      fee: "View session options",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80",
      rating: "Profile details",
    },
    {
      name: "Education Guidance Expert",
      role: "College & Course Selection",
      experience: "Experienced mentor",
      mode: "Online",
      location: "Pan India",
      fee: "View session options",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
      rating: "Profile details",
    },
    {
      name: "Career Transition Mentor",
      role: "Skills, Jobs & Career Change",
      experience: "Professional guidance",
      mode: "Online",
      location: "Pan India",
      fee: "View session options",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80",
      rating: "Profile details",
    },
  ];

  const sessions = [
    { title: "Career Clarity Session", description: "Discuss your interests, strengths and next steps.", icon: Compass, tag: "Career planning" },
    { title: "Stream & Course Guidance", description: "Compare subjects, degrees and education options.", icon: GraduationCap, tag: "Students" },
    { title: "Job & Skills Roadmap", description: "Plan skills, job roles and a practical learning path.", icon: BriefcaseBusiness, tag: "Graduates & professionals" },
    { title: "Competitive Exam Planning", description: "Organise your goals, timeline and preparation strategy.", icon: Target, tag: "Exam preparation" },
  ];

  const faqs = [
    {
      question: "Who can use Xhirez Career Counselling?",
      answer: "School students, college students, graduates and working professionals can use career guidance to explore options and plan their next step.",
    },
    {
      question: "Can I speak with a counsellor online?",
      answer: "Yes. You can use the consultation flow to enquire about online guidance and the available session options.",
    },
    {
      question: "What happens during a career counselling session?",
      answer: "You can discuss your interests, current situation and goals, then work with a counsellor to identify options and practical next steps.",
    },
    {
      question: "Is the career assessment a final decision about my future?",
      answer: "No. An assessment is a starting point for reflection. Use its results alongside your interests, research and advice from a qualified counsellor.",
    },
  ];

  const filteredCategories = useMemo(() => {
    const query = careerSearch.trim().toLowerCase();
    if (!query) return visibleCategories;
    return categories.filter((item) =>
      `${item.title} ${item.subtitle}`.toLowerCase().includes(query)
    );
  }, [careerSearch, showAllCategories]);

  const openConsultation = () => setIsModalOpen(true);

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-violet-50 text-violet-600",
    orange: "bg-orange-50 text-orange-600",
    pink: "bg-pink-50 text-pink-600",
    teal: "bg-teal-50 text-teal-600",
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <UnifiedHeader />

      <main className="pt-[85px]">
        {/* UrbanPro-inspired hero: search-led, airy, light blue */}
        <section className="relative overflow-hidden bg-[#dff5fc]">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:min-h-[510px] lg:grid-cols-2 lg:gap-14 lg:py-16">
            <div className="relative z-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                Your Future Starts with Clarity
              </p>
              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-800 sm:text-5xl lg:text-[58px]">
                Find the Right Career.
                <span className="mt-1 block font-medium text-slate-700">Build Your Future.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Explore career options, compare learning paths and connect with guidance to make your next move with confidence.
              </p>

              <div className="mt-7 max-w-xl rounded-2xl bg-white p-3 shadow-[0_12px_35px_rgba(37,99,235,0.12)] sm:p-4">
                <label htmlFor="career-search" className="sr-only">What do you need career guidance for?</label>
                <div className="flex items-center gap-3 border-b border-slate-100 px-2 pb-3">
                  <Search className="shrink-0 text-slate-400" size={21} />
                  <input
                    id="career-search"
                    value={careerSearch}
                    onChange={(event) => setCareerSearch(event.target.value)}
                    placeholder="What do you need guidance for?"
                    className="w-full border-0 bg-transparent py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0 sm:text-base"
                  />
                  {careerSearch && (
                    <button type="button" onClick={() => setCareerSearch("")} className="text-xs font-semibold text-blue-600">
                      Clear
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (careerSearch.trim()) {
                      document.getElementById("career-categories")?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      openConsultation();
                    }
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-4 font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Explore Career Guidance <ArrowRight size={18} />
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> Student-friendly guidance</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> Online consultation options</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="absolute -left-4 top-8 h-32 w-32 rounded-full bg-white/60 blur-2xl" />
              <div className="relative rounded-[2rem] bg-white p-3 shadow-[0_25px_70px_rgba(37,99,235,0.15)] sm:rounded-[2.5rem] sm:p-4">
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85"
                  alt="People discussing career goals together"
                  className="h-[300px] w-full rounded-[1.5rem] object-cover sm:h-[390px] sm:rounded-[2rem]"
                />
                <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:bottom-7 sm:-left-8 sm:px-5 sm:py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Users size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Guidance for Every Stage</p>
                    <p className="text-xs text-slate-500">School to Professional Life</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-2 -top-4 hidden rounded-2xl bg-white px-4 py-3 shadow-lg sm:block">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <ShieldCheck className="text-blue-600" size={18} /> Your goals, your roadmap
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact trust / value strip */}
        <section className="relative z-10 mx-auto -mt-5 max-w-7xl px-5 sm:px-8">
          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.08)] sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Goal-focused", subtitle: "Guidance built around you", color: "bg-blue-50 text-blue-600" },
              { icon: Users, title: "Personal support", subtitle: "Explore options with a mentor", color: "bg-emerald-50 text-emerald-600" },
              { icon: Target, title: "Clear next steps", subtitle: "Turn ideas into an action plan", color: "bg-violet-50 text-violet-600" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`flex items-center justify-center gap-4 px-5 py-6 sm:py-7 ${index ? "border-t border-slate-100 sm:border-l sm:border-t-0" : ""}`}>
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.color}`}><Icon size={23} /></div>
                  <div>
                    <p className="font-bold text-slate-800">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Category cards */}
        <section id="career-categories" className="scroll-mt-28 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">Explore your options</p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">Find Guidance For Every Career Stage</h2>
                <p className="mt-3 max-w-2xl text-slate-500">From choosing a stream to planning your next job, start with the question that matters to you.</p>
              </div>
              <button type="button" onClick={() => setShowAllCategories((value) => !value)} className="inline-flex items-center gap-2 self-start font-semibold text-blue-600 hover:text-blue-700 sm:self-auto">
                {showAllCategories ? "Show less" : "View all"} <ArrowRight size={17} />
              </button>
            </div>

            {careerSearch.trim() && (
              <p className="mb-4 text-sm text-slate-500">
                {filteredCategories.length ? `Showing ${filteredCategories.length} matching option(s)` : "No matching category found. Try “college”, “IT” or “career”."}
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    type="button"
                    key={category.title}
                    onClick={() => {
                      setCareerSearch(category.title);
                      openConsultation();
                    }}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg sm:p-5"
                  >
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${colorClasses[category.color]}`}><Icon size={25} /></div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-slate-800">{category.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">{category.subtitle}</p>
                    </div>
                    <ArrowRight size={18} className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Session cards, inspired by UrbanPro's Learn Live section */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">Choose your next step</p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">Career Guidance Sessions</h2>
              <p className="mt-3 text-slate-500">Start with the type of support that fits your current goal.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {sessions.map((session) => {
                const Icon = session.icon;
                return (
                  <article key={session.title} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg">
                    <div className="flex items-center gap-3 p-5 pb-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon size={23} /></div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">{session.tag}</span>
                    </div>
                    <div className="flex flex-1 flex-col px-5 pb-5">
                      <h3 className="text-lg font-bold text-slate-800">{session.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{session.description}</p>
                      <button type="button" onClick={openConsultation} className="mt-5 flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white">
                        Enquire now <ArrowRight size={17} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Counsellor profiles */}
        <section className="bg-[#f3f8ff] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">Get expert support</p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">Meet Your Career Guides</h2>
                <p className="mt-3 text-slate-500">Explore the kind of expertise you need and enquire about a session.</p>
              </div>
              <button type="button" onClick={openConsultation} className="inline-flex items-center gap-2 self-start font-semibold text-blue-600 hover:text-blue-700">
                Find a counsellor <ArrowRight size={17} />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {counsellors.map((person) => (
                <article key={person.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex gap-4 p-5">
                    <img src={person.image} alt={person.name} className="h-24 w-24 shrink-0 rounded-xl object-cover" loading="lazy" />
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-800">{person.name}</h3>
                      <p className="mt-1 text-sm text-blue-600">{person.role}</p>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500"><BriefcaseBusiness size={14} /> {person.experience}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><Video size={14} /> {person.mode} <span className="mx-1">·</span><MapPin size={14} /> {person.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-[#eff6ff] px-5 py-4">
                    <span className="text-sm font-semibold text-slate-600">{person.fee}</span>
                    <button type="button" onClick={openConsultation} className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-900">Enquire <ArrowRight size={16} /></button>
                  </div>
                </article>
              ))}
            </div>
            {/* <p className="mt-4 text-xs text-slate-500">Note: Replace these sample profile cards with your verified counsellor data before publishing.</p> */}
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Simple And Supportive</p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">Find the right guidance. Start moving forward.</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { number: "01", title: "Tell us your goal", description: "Share your education stage, interests and what you want help deciding." },
                { number: "02", title: "Explore your options", description: "Review relevant career paths and enquire about suitable counselling." },
                { number: "03", title: "Build your roadmap", description: "Discuss your next steps and turn your goals into a practical plan." },
              ].map((step, index) => (
                <div key={step.number} className="relative text-center">
                  {index < 2 && <div className="absolute left-[65%] top-7 hidden h-px w-[70%] bg-emerald-200 md:block" />}
                  <div className={`relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border text-lg font-bold ${index === 2 ? "border-emerald-600 bg-emerald-600 text-white" : "border-emerald-600 bg-white text-emerald-700"}`}>{step.number}</div>
                  <h3 className="mt-5 text-lg font-bold text-slate-800">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <button type="button" onClick={openConsultation} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 font-bold text-white shadow-md transition hover:bg-blue-700">
                Start your journey <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Learning modes */}
        <section className="bg-[#eff6ff] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">Guidance That Fits Your Life</h2>
              <p className="mt-3 text-slate-500">Choose a way to get started that works for you.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { title: "Online counselling", text: "Connect remotely and discuss your questions from wherever you are.", icon: Video, tone: "text-blue-600 bg-blue-50" },
                { title: "One-on-one guidance", text: "Focus on your individual interests, challenges and career goals.", icon: Users, tone: "text-emerald-600 bg-emerald-50" },
                { title: "Self-guided exploration", text: "Browse career categories and prepare your questions before a session.", icon: Search, tone: "text-violet-600 bg-violet-50" },
              ].map((mode) => {
                const Icon = mode.icon;
                return (
                  <button type="button" key={mode.title} onClick={openConsultation} className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:shadow-md sm:p-6">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${mode.tone}`}><Icon size={23} /></span>
                    <span><span className="block font-bold text-slate-800">{mode.title}</span><span className="mt-2 block text-sm leading-6 text-slate-500">{mode.text}</span></span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA panel */}
        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-7xl rounded-3xl bg-[#d7f5ec] px-6 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="mx-auto max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-800 sm:text-5xl">Whatever your next step, start with the right guidance.</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">Explore your options, ask questions and build a plan that fits your ambitions.</p>
            <button type="button" onClick={openConsultation} className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 font-bold text-white shadow-sm transition hover:bg-blue-700">
              Book a consultation <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">Frequently asked questions</h2>
              <p className="mt-3 text-slate-500">A few things to know before you get started.</p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={faq.question} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <button type="button" aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-800 hover:bg-slate-50">
                    {faq.question}
                    <ChevronDown size={19} className={`shrink-0 text-slate-500 transition-transform ${activeFaq === index ? "rotate-180" : ""}`} />
                  </button>
                  {activeFaq === index && <p className="px-5 pb-5 text-sm leading-7 text-slate-600">{faq.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ConsultationFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CareerCounselling;
