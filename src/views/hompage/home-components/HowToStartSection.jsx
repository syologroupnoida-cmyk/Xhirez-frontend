import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUserPlus, 
  faFileCircleCheck, 
  faRocket,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

const HowToStartSection = () => {
  const steps = [
    {
      icon: faUserPlus,
      title: "Quick Sign Up",
      text: "Create your professional profile in seconds.",
      color: "bg-blue-500",
    },
    {
      icon: faFileCircleCheck,
      title: "Smart Upload",
      text: "Showcase your skills with our AI resume builder.",
      color: "bg-purple-500",
    },
    {
      icon: faRocket,
      title: "Get Hired",
      text: "Connect with top employers and land your dream job.",
      color: "bg-emerald-500",
    }
  ];

  return (
    <section className="py-24 bg-[#f8fbff] overflow-hidden">
      <div className="container">
        <div className="row align-items-center">
          
         
          <div className="col-lg-6 relative z-10">
            <div className="mb-12">
              <span className="text-[#07A1E3] font-black text-xs uppercase tracking-[3px] mb-3 d-block">
                Working Process
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Your Career Journey <br />
                Made <span className="text-[#07A1E3]">Remarkably Simple.</span>
              </h2>
              <p className="text-gray-500 text-lg font-medium max-w-md">
                We’ve streamlined the path to your next big opportunity. Just follow these simple steps.
              </p>
            </div>

            
            <div className="relative d-flex flex-column gap-4">
             
              <div className="absolute left-8 top-10 bottom-10 w-[2px] border-l-2 border-dashed border-gray-200 -z-0 hidden md:block"></div>

              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="group relative d-flex align-items-center gap-5 bg-white p-4 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-gray-50 z-10"
                >
                  
                  <div className={`shrink-0 w-16 h-16 ${step.color} rounded-2xl d-flex align-items-center justify-center text-white text-2xl shadow-lg transition-transform group-hover:rotate-[360deg] duration-700`}>
                    <FontAwesomeIcon icon={step.icon} />
                  </div>

                
                  <div className="flex-grow">
                    <h5 className="font-black text-gray-900 m-0 text-xl">
                      {step.title}
                    </h5>
                    <p className="text-gray-500 m-0 text-sm font-medium mt-1">
                      {step.text}
                    </p>
                  </div>

                  
                  <div className="me-4 w-10 h-10 rounded-full bg-gray-50 d-flex align-items-center justify-center text-gray-300 group-hover:bg-[#07A1E3] group-hover:text-white transition-all">
                    <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="relative ps-lg-5">
              
            
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-[100px] -z-0"></div>
              
              <div className="relative z-10 rounded-[60px] overflow-hidden border-[15px] border-white shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700">
                <img 
                  src="/assets/images/banner/bussines-banner.jpg" 
                  className="w-full h-[550px] object-cover" 
                  alt="Career Success" 
                />
                
              
              </div>

              
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#07A1E3] rounded-[30px] d-flex align-items-center justify-center shadow-2xl z-20 animate-bounce">
                 <FontAwesomeIcon icon={faRocket} className="text-white text-3xl" />
              </div>
            </div>
          </div>

        </div>

       
        <div className="mt-20 text-center">
            <p className="text-gray-400 font-bold text-sm">
                Trusted by leading companies worldwide <span className="ms-2">★★★★★</span>
            </p>
        </div>
      </div>

      <style>{`
        .rounded-[32px] { border-radius: 32px; }
        .rounded-[60px] { border-radius: 60px; }
        .rounded-[30px] { border-radius: 30px; }
        .animate-bounce {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};

export default HowToStartSection;
