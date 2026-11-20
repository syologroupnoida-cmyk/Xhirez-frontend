import React from "react";
import { Link } from "@/router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlay, 
  faCheckCircle, 
  faUsers, 
  faMagnifyingGlass, 
  faComments, 
  faGlobe 
} from "@fortawesome/free-solid-svg-icons";

const WhyChooseUsSection = () => {
  const features = [
    { icon: faUsers, title: "Best talented people", color: "bg-blue-100 text-blue-600" },
    { icon: faMagnifyingGlass, title: "Easy to find candidates", color: "bg-orange-100 text-orange-600" },
    { icon: faComments, title: "Easy to communicate", color: "bg-emerald-100 text-emerald-600" },
    { icon: faGlobe, title: "Global recruitment", color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container">
        <div className="row align-items-center">
          
          
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="relative d-flex gap-4 align-items-center">
              
              
              <div className="w-50 pt-12">
                <img
                  src="/assets/images/banner/home-banner.jpg"
                  className="rounded-[40px] shadow-2xl w-full object-cover h-[450px]"
                  alt="Team working"
                />
              </div>

              
              <div className="w-50 d-flex flex-column gap-4">
                <img
                  src="/assets/images/feature/feature-banner.jpg"
                  className="rounded-[30px] shadow-xl w-full h-[200px] object-cover"
                  alt="Recruitment"
                />
                
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-blue-600/20 rounded-[30px] group-hover:bg-blue-600/40 transition-all d-flex align-items-center justify-center z-10">
                    <div className="w-16 h-16 bg-white rounded-full d-flex align-items-center justify-center shadow-lg animate-bounce-slow">
                      <FontAwesomeIcon icon={faPlay} className="text-blue-600 ml-1" />
                    </div>
                  </div>
                  <img
                    src="/assets/images/foragency/banner-agency.jpg"
                    className="rounded-[30px] shadow-xl w-full h-[200px] object-cover"
                    alt="Video testimonial"
                  />
                </div>
              </div>

              
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-50 rounded-full -z-10 animate-pulse"></div>
            </div>
          </div>

         
          <div className="col-lg-5 offset-lg-1">
            <div className="why-content">
              <span className="text-blue-600 font-black text-sm uppercase tracking-[3px] mb-3 d-block">
                Our Value Proposition
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Why choose us among <span className="text-blue-500">other job sites?</span>
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Predominantly we emphasize on quality jobs and qualified applicants. 
                Our platform bridges the gap between ambitious job-seekers and top-tier recruiters 
                with just a single click.
              </p>

              
              <div className="row g-4">
                {features.map((item, index) => (
                  <div className="col-sm-6" key={index}>
                    <div className="d-flex align-items-center gap-3 group">
                      <div className={`w-12 h-12 ${item.color} rounded-2xl d-flex align-items-center justify-center transition-all group-hover:scale-110 shadow-sm`}>
                        <FontAwesomeIcon icon={item.icon} />
                      </div>
                      <span className="font-bold text-gray-700 text-sm leading-tight">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

             
              <div className="mt-10">
                <Link to="/about" className="inline-flex align-items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200 no-underline">
                  Learn More About Us
                  <FontAwesomeIcon icon={faCheckCircle} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .rounded-[40px] { border-radius: 40px; }
        .rounded-[30px] { border-radius: 30px; }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUsSection;
