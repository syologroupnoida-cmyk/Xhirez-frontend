import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMobileAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faLinkedin, faInstagram, faAppStoreIos, faGooglePlay } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    // Background changed to White with a subtle top border
    <footer className="xh-site-footer bg-white pt-24 pb-12 text-slate-500 border-t border-slate-100 overflow-hidden relative font-sans">
      
      {/* Decorative Light Gradients - Pure White par depth dene ke liye */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -z-10 opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[80px] -z-10 opacity-50"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand & App Links */}
          <div className="space-y-8">
            <div className="footer-brand">
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">
                X<span className="text-[#07A1E3]">hirez</span>
              </h2>
              <p className="text-[15px] leading-relaxed text-slate-500 max-w-xs">
                Xhirez is a modern job portal connecting candidates and employers seamlessly. 
                Empowering your professional journey with AI-driven matching.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-slate-900 text-[11px] font-bold uppercase tracking-[0.2em]">Get the Mobile App</p>
              <div className="flex flex-wrap gap-3">
                <a href="/#download" className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-2xl hover:bg-white hover:border-[#07A1E3] hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 no-underline text-slate-700 group">
                  <FontAwesomeIcon icon={faGooglePlay} className="text-xl group-hover:text-[#07A1E3]" />
                  <div className="text-[10px] leading-tight">Download on <br/><span className="text-xs font-bold text-slate-900">Play Store</span></div>
                </a>
                <a href="/#download" className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-2xl hover:bg-white hover:border-[#07A1E3] hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 no-underline text-slate-700 group">
                  <FontAwesomeIcon icon={faAppStoreIos} className="text-xl group-hover:text-[#07A1E3]" />
                  <div className="text-[10px] leading-tight">Available on <br/><span className="text-xs font-bold text-slate-900">App Store</span></div>
                </a>
              </div>
            </div>
          </div>

          {/* Candidates Links */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-8 relative inline-block">
              Candidates
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#07A1E3] rounded-full"></span>
            </h4>
            <ul className="list-none p-0 flex flex-col gap-4">
              {['Browse Jobs', 'Job Sectors', 'Remote Work', 'Walk-in Drives'].map((link) => (
                <li key={link}>
                  <a href={`/#${link.replace(/\s+/g, '').toLowerCase()}`} className="hover:text-[#07A1E3] hover:translate-x-1 inline-block transition-all no-underline text-sm font-medium text-slate-500">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-8 relative inline-block">
              Resources
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#07A1E3] rounded-full"></span>
            </h4>
            <ul className="list-none p-0 flex flex-col gap-4">
              {['She Can Code', 'Staffing Solutions', 'Campus Buddy', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a href={`/${link.replace(/\s+/g, '-').toLowerCase()}`} className="hover:text-[#07A1E3] hover:translate-x-1 inline-block transition-all no-underline text-sm font-medium text-slate-500">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-8 relative inline-block">
              Support Center
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#07A1E3] rounded-full"></span>
            </h4>
            <div className="flex flex-col gap-6">
              {[
                { icon: faLocationDot, text: "214 West Arnold St. New York, NY 10002" },
                { icon: faMobileAlt, text: "(+1) 345-6789" },
                { icon: faEnvelope, text: "support@xhirez.com" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center text-[#07A1E3] group-hover:bg-[#07A1E3] group-hover:text-white transition-colors duration-300">
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <p className="m-0 text-sm leading-relaxed text-slate-600 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
                  </div>
        
                  {/* Jobs by Location Section */}
                  <div className="border-t border-slate-100 pt-12 pb-8 mt-12">
                    <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-8 relative inline-block">
                      Jobs by Location
                      <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#07A1E3] rounded-full"></span>
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-3">
                      {/* Placeholder for locations. In a real app, this would come from an API */}
                      {[
                        "Noida", "Gurugram", "Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad",
                        "Jaipur", "Lucknow", "Chandigarh", "Indore", "Bhopal", "Patna", "Kochi", "Coimbatore", "Visakhapatnam", "Nagpur",
                        "Surat", "Thane", "Vadodara", "Ghaziabad", "Faridabad", "Amritsar", "Ludhiana", "Kanpur", "Varanasi", "Agra",
                        "Meerut", "Allahabad", "Ranchi", "Bhubaneswar", "Guwahati", "Dehradun", "Mysuru", "Mangaluru", "Nashik", "Rajkot"
                      ].map((location, index) => (
                        <a key={index} href={`/alljob?location=${encodeURIComponent(location)}`} className="xh-footer-job-link text-sm font-medium transition-colors">
                          View Jobs in {location}
                        </a>
                      ))}
                    </div>
                  </div>
        
                {/* Bottom Line */}
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                  <p className="m-0 text-sm text-slate-400 font-medium order-2 md:order-1">            © 2026 <span className="text-slate-900 font-bold">Xhirez</span>. 
            Built with ❤️ by <a href="https://www.successsign.com" className="text-[#07A1E3] no-underline font-bold hover:underline">SuccessSign</a>
          </p>
          
          <div className="flex gap-3 order-1 md:order-2">
            {[faFacebook, faTwitter, faLinkedin, faInstagram].map((icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#07A1E3] hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 no-underline border border-slate-100">
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
