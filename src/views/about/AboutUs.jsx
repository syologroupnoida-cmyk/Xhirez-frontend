import React from 'react';
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from '../../components/footer/footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faUsers, faGlobe, faHeart } from "@fortawesome/free-solid-svg-icons";

const AboutUs = () => {
  const stats = [
    { label: 'Talent Connected', value: '50k+' },
    { label: 'Top Companies', value: '1.2k+' },
    { label: 'Support Rate', value: '99.9%' },
    { label: 'Active Countries', value: '15+' },
  ];

  return (
    <>
      <UnifiedHeader />
      <div className="bg-[#FBFCFE] overflow-hidden">
        
        
        <section className="relative py-24 sm:py-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-50 pointer-events-none">
             <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-100 rounded-full blur-[120px]"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-[0.2em] text-blue-600 uppercase bg-blue-50 rounded-full">
                Our Story
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
                Empowering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Future of Work.</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                We are more than just a job board. We are a bridge between untapped potential and world-class opportunities, 
                redefining how talent meets ambition.
              </p>
            </div>
          </div>
        </section>

       
        <section className="pb-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-white p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-50">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-slate-500 font-bold text-sm uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

       
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <h2 className="text-4xl font-black text-slate-900 mb-6">Our Mission</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Founded in 2024, our goal was simple: stop the "search" and start the "connection". 
                  We believe that everyone deserves a job they love, and every company deserves 
                  extraordinary talent that drives growth.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: faRocket, text: 'Innovation in Recruitment', color: 'text-blue-600' },
                    { icon: faHeart, text: 'Human-Centric Approach', color: 'text-red-500' },
                    { icon: faGlobe, text: 'Global Accessibility', color: 'text-emerald-500' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <FontAwesomeIcon icon={item.icon} className={`${item.color} text-xl`} />
                      <span className="font-bold text-slate-800">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-6">
                
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 opacity-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                    alt="Team work" 
                    className="relative z-10 rounded-[3rem] shadow-2xl object-cover h-[500px] w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

       
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Ready to join our journey?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg hover:-translate-y-1">
                Explore Careers
              </button>
              <button className="bg-transparent border-2 border-slate-700 hover:border-slate-500 text-white px-10 py-4 rounded-full font-bold transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default AboutUs;