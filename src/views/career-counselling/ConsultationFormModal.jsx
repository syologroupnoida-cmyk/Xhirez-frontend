import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaComment, FaPaperPlane, FaShieldAlt, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ConsultationFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.message.trim()) newErrors.message = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Consultation request sent successfully!");
      onClose();
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error); 
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal 
      show={isOpen} 
      onHide={onClose} 
      centered 
      size="xl" 
      contentClassName="border-0 rounded-[2rem] shadow-2xl overflow-hidden"
    >
      <div className="flex flex-col md:flex-row min-h-[400px]"> 
        
       
        <div className="md:w-[28%] bg-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <FaShieldAlt size={20} />
            </div>
            <h3 className="text-xl font-black leading-tight mb-2">Advance Your Career.</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed font-medium">
              Join 5,000+ professionals. <br /> Get 1-on-1 expert advice.
            </p>
          </div>
          
          <div className="relative z-10 flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Experts Online Now
          </div>

          
          <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
        </div>

        
        <div className="md:w-[72%] bg-white p-8 lg:px-12 relative flex flex-col justify-center">
          <button 
            onClick={onClose} 
            className="absolute top-6 right-8 text-slate-300 hover:text-slate-900 transition-colors"
          >
            <FaTimes size={18} />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Get Free Consultation</h2>
            <p className="text-slate-500 text-xs font-medium">Expert guidance to bridge your skill gap.</p>
          </div>

          <Form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              
              
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 ml-1">Full Name</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <FaUser size={12} />
                  </span>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange}
                    placeholder="Rahul Sharma"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border-2 transition-all outline-none font-bold text-sm ${errors.name ? 'border-red-200 bg-red-50' : 'border-transparent focus:bg-white focus:border-blue-600'}`}
                  />
                </div>
              </div>

              
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 ml-1">Work Email</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <FaEnvelope size={12} />
                  </span>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="name@company.com"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border-2 transition-all outline-none font-bold text-sm ${errors.email ? 'border-red-200 bg-red-50' : 'border-transparent focus:bg-white focus:border-blue-600'}`}
                  />
                </div>
              </div>

             
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 ml-1">Mobile</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <FaPhone size={12} />
                  </span>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border-2 transition-all outline-none font-bold text-sm ${errors.phone ? 'border-red-200 bg-red-50' : 'border-transparent focus:bg-white focus:border-blue-600'}`}
                  />
                </div>
              </div>

              
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 ml-1">Career Goal</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <FaComment size={12} />
                  </span>
                  <input
                    type="text" name="message" value={formData.message} onChange={handleChange}
                    placeholder="e.g. Switching to FAANG"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border-2 transition-all outline-none font-bold text-sm ${errors.message ? 'border-red-200 bg-red-50' : 'border-transparent focus:bg-white focus:border-blue-600'}`}
                  />
                </div>
              </div>

            </div>

           
            <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center md:text-left">
                🔒 Secured by 256-bit Encryption
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-sm transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Processing...' : 'Request Call Back'} <FaPaperPlane size={14} />
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default ConsultationFormModal;