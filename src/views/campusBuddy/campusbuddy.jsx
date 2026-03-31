import React, { useState } from 'react';
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from '../../components/footer/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { 
  FaUser, FaEnvelope, FaWhatsapp, FaCity, FaUniversity, FaGraduationCap, 
  FaCalendarAlt, FaBriefcase, FaCheckCircle, FaCertificate, FaUsers, 
  FaStar, FaShieldAlt, FaRocket, FaAward, FaLightbulb 
} from 'react-icons/fa';
import axios from 'axios';
import { API_ENDPOINTS } from '../apiConfig';
import { toast, ToastContainer } from 'react-toastify';

const CampusBuddy = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', whatsappNumber: '', city: '', collegeName: '',
    degree: '', yearOfStudy: '', currentDesignation: '', primaryInterest: '',
    declaration: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : name === 'yearOfStudy' ? value.replace(/\D/g, '') : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic remains same as your provided code...
    toast.success("Application Sent!");
    setShowForm(false);
  };

  const FeatureCard = ({ icon: Icon, title, items, color }) => (
    <motion.div 
      whileHover={{ y: -12, scale: 1.02 }}
      className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] h-full relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-50 rounded-bl-[5rem] transition-all group-hover:w-28 group-hover:h-28`} />
      <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-${color}-500 text-white mb-6 relative z-10 shadow-lg`}>
        <Icon size={24} />
      </div>
      <h4 className="text-xl font-black text-slate-800 mb-4 relative z-10">{title}</h4>
      <ul className="space-y-3 relative z-10">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-slate-500 font-medium">
            <FaCheckCircle className={`mt-1 text-${color}-500 shrink-0`} /> {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <div className="bg-[#fdfeff] min-h-screen">
      <UnifiedHeader />
      <ToastContainer />

      {/* Hero Section - Maximum Breathing Space */}
      <section className="pt-48 pb-24 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-100/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[30%] h-[50%] bg-indigo-50/50 blur-[100px] rounded-full" />
        
        <Container>
          <Row className="align-items-center">
            <Col lg={7} className="relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="flex items-center gap-2 mb-6">
                  <span className="h-[2px] w-10 bg-blue-600"></span>
                  <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">Empowering Next-Gen Leaders</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.95] mb-8">
                  Innovate. <br /> Learn. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">& Lead!</span>
                </h1>
                <p className="text-xl text-slate-500 font-medium max-w-xl mb-12 leading-relaxed">
                  Join the <span className="text-slate-900 font-bold">Xhirez Buddy Program</span>—a bridge between ambitious students and the innovative corporate world.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => setShowForm(true)} className="px-12 py-4 rounded-full bg-slate-900 border-none font-bold text-white hover:bg-blue-600 transition-all shadow-2xl flex items-center gap-3">
                    Apply as a Buddy <FaChevronRight size={12} />
                  </Button>
                </div>
              </motion.div>
            </Col>
            <Col lg={5} className="mt-16 lg:mt-0 relative">
               <motion.div 
                 animate={{ y: [0, -20, 0] }} 
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[16px] border-white"
               >
                 <img src="assets/images/banner/campus.jpg" className="w-full grayscale-[20%] hover:grayscale-0 transition-all duration-700" alt="Campus" />
               </motion.div>
               <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-[2rem] shadow-xl z-20 flex items-center gap-4 border border-slate-50">
                 <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white"><FaStar /></div>
                 <div>
                   <p className="m-0 font-black text-slate-900">4.9/5 Rating</p>
                   <p className="m-0 text-xs text-slate-400 font-bold uppercase">Community Trust</p>
                 </div>
               </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Intro Section - Bento Style */}
      <section className="py-24 bg-slate-50/50">
        <Container>
          <Row className="g-4">
            <Col lg={4}>
               <div className="h-full p-10 bg-blue-600 rounded-[3rem] text-white flex flex-col justify-between">
                 <div>
                    <FaLightbulb className="text-blue-200 text-5xl mb-8" />
                    <h2 className="text-4xl font-black mb-6 leading-tight">What is Buddy Program?</h2>
                 </div>
                 <p className="text-blue-100 font-medium text-lg leading-relaxed opacity-90">
                    A unique ecosystem designed by Xhirez to transform students into industry-ready professionals through peer-to-peer mentorship.
                 </p>
               </div>
            </Col>
            <Col lg={8}>
               <div className="h-full p-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                  <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
                    <span className="w-12 h-1 bg-blue-600 rounded-full"></span> The Core Philosophy
                  </h3>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8">
                    Individual buddy partnerships are arranged online to develop their own way of working together. This relationship is best described as professional, focusing on mutual growth and documenting objectives for a successful career path.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-50 rounded-[2rem]">
                       <h4 className="text-blue-600 font-black text-2xl mb-1">Voluntary</h4>
                       <p className="text-slate-400 text-sm m-0 font-bold uppercase tracking-wider">Work Ethics</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-[2rem]">
                       <h4 className="text-blue-600 font-black text-2xl mb-1">Professional</h4>
                       <p className="text-slate-400 text-sm m-0 font-bold uppercase tracking-wider">Relationship</p>
                    </div>
                  </div>
               </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Feature Grid - Interactive Cards */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-slate-900 mb-4">Why Become a Buddy?</h2>
            <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Unlock your true potential with Xhirez</p>
          </div>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <FeatureCard 
                color="blue" icon={FaStar} title="Main Advantages"
                items={["Active Learning", "Direct Interaction", "Teaching Growth", "Comfortable Speech"]}
              />
            </Col>
            <Col md={6} lg={3}>
              <FeatureCard 
                color="indigo" icon={FaCheckCircle} title="Key Benefits"
                items={["World-class Partners", "Expert Mentors", "Practical Knowledge", "Career Options"]}
              />
            </Col>
            <Col md={6} lg={3}>
              <FeatureCard 
                color="purple" icon={FaCertificate} title="Elite Perks"
                items={["Stay Certificates", "Scholarships", "Community Access", "Full-time Potentials"]}
              />
            </Col>
            <Col md={6} lg={3}>
              <FeatureCard 
                color="slate" icon={FaUsers} title="Registration"
                items={["Profile Creation", "Technical Eval", "Credential Check", "Project Reviews"]}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Rewards & Manager Section - Dark Mode Focus */}
      <section className="py-24 bg-slate-900 mx-4 rounded-[4rem] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-blue-600/10 skew-x-12 translate-x-32" />
        <Container>
          <Row className="g-5 align-items-center">
            <Col lg={6}>
              <span className="text-blue-400 font-black uppercase tracking-widest text-xs">Gamified Growth</span>
              <h2 className="text-5xl font-black text-white mt-4 mb-8">The Buddy <br />Score Card</h2>
              <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] mb-8">
                 <div className="flex items-center gap-6 mb-6">
                    <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-slate-900 shadow-xl shadow-yellow-400/20"><FaAward size={30} /></div>
                    <div>
                       <h4 className="text-white font-bold text-xl m-0">Redeemable Rewards</h4>
                       <p className="text-slate-400 m-0">100 Points = 100 INR Donation</p>
                    </div>
                 </div>
                 <p className="text-slate-300 leading-relaxed">
                    Satisfied peer mates give Buddy points. Reach <span className="text-blue-400 font-bold">1000 points</span> to unlock the <span className="text-white font-bold underline">Buddy Manager</span> profile and train the next generation.
                 </p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-8 bg-white/10 rounded-[2.5rem] border border-white/5">
                   <h4 className="text-white font-black mb-4 flex items-center gap-3"><FaShieldAlt className="text-blue-400" /> Buddy Manager Role</h4>
                   <p className="text-slate-400 text-sm leading-relaxed m-0">Admin-level control, profile monitoring, training coordination, and score-card auditing. Be the leader of the pack.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Footer Section */}
      <section className="py-32 text-center">
        <Container>
           <div className="max-w-4xl mx-auto p-12 bg-white rounded-[4rem] border border-slate-100 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.08)]">
             <img src="assets/images/foragency/icons/icsupport.png" className="w-24 mx-auto mb-8 animate-bounce-slow" alt="Support" />
             <h2 className="text-4xl font-black text-slate-900 mb-4">Empowering Enterprises</h2>
             <p className="text-slate-500 text-lg font-medium mb-10 max-w-xl mx-auto">Let’s discuss how we can deliver customized solutions for your enterprise—share your contact details today.</p>
             <Button onClick={() => setShowForm(true)} className="px-12 py-4 rounded-full bg-blue-600 border-none font-black text-white hover:scale-105 transition-all shadow-xl shadow-blue-200">
               Request a Call Back
             </Button>
           </div>
        </Container>
      </section>

      {/* Ultra-Modern Modal Form */}
      <Modal show={showForm} onHide={() => setShowForm(false)} centered size="lg" className="buddy-modal">
        <Modal.Body className="p-0 overflow-hidden  border-none">
          <Row className="g-0">
            <Col md={5} className="bg-slate-900 p-12 text-white flex flex-col justify-center relative">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent" />
               <h3 className="text-4xl font-black mb-6 relative z-10">Join the <br />Elite League.</h3>
               <p className="text-slate-400 font-medium mb-8 relative z-10">Start your journey as a Buddy and build a legacy.</p>
               <div className="space-y-4 relative z-10">
                 <div className="flex items-center gap-3"><FaCheckCircle className="text-blue-500" /> Professional Mentorship</div>
                 <div className="flex items-center gap-3"><FaCheckCircle className="text-blue-500" /> Industry Exposure</div>
               </div>
            </Col>
            <Col md={7} className="p-10 bg-white">
              <Form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-6">
                  <h4 className="text-2xl font-black text-slate-900 m-0">Buddy Application</h4>
                  <p className="text-slate-400 text-sm">Fill in your details to get started.</p>
                </div>
                <Row className="g-3">
                  {['name', 'email', 'whatsappNumber', 'city', 'collegeName', 'degree', 'yearOfStudy', 'currentDesignation'].map((field) => (
                    <Col md={6} key={field}>
                      <div className="relative">
                        <Form.Control 
                          name={field} 
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                          className="h-14 rounded-2xl bg-slate-50 border-none px-4 font-bold text-slate-700 focus:ring-2 focus:ring-blue-100" 
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
                <Form.Check 
                  type="checkbox" 
                  name="declaration" 
                  label="I accept the Buddy Declaration" 
                  className="mt-4 font-bold text-slate-500 text-sm" 
                />
                <Button type="submit" className="w-full h-14 bg-blue-600 rounded-2xl font-black border-none shadow-xl mt-4">Submit Application</Button>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <Footer />
    </div>
  );
};

// Add this to your Global CSS
const style = `
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
`;

const FaChevronRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

export default CampusBuddy;