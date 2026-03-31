import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronRight, ChevronLeft, Briefcase } from 'lucide-react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const jobRoles = [
  { id: 1, title: 'Product Manager', count: '1.2K+ Jobs' },
  { id: 2, title: 'UI / UX Designer', count: '1.9K+ Jobs' },
  { id: 3, title: 'Research Analyst', count: '114 Jobs' },
  { id: 4, title: 'Branch Manager', count: '290 Jobs' },
  { id: 5, title: 'Business Analyst', count: '1.1K+ Jobs' },
  { id: 6, title: 'Software Engineer', count: '4.2K+ Jobs' },
  { id: 7, title: 'HR Manager', count: '320 Jobs' },
  { id: 8, title: 'Project Head', count: '150 Jobs' },
];

const JobListByRoles = () => {
  return (
    <section className="bg-white py-8 px-4">
      
      <div className="max-w-5xl mx-auto bg-orange-50/50 rounded-[2rem] p-6 md:p-10 relative overflow-hidden border border-orange-100/50">
        
        <div className="flex flex-col md:flex-row items-center gap-10">
          
          
          <div className="w-full md:w-[65%] order-2 md:order-1">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                Popular <span className="text-orange-600">Job Roles</span>
              </h2>
              <p className="text-slate-500 text-sm mt-1">Discover your next career move</p>
            </div>

            <div className="relative group">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={15}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3500 }}
                navigation={{ nextEl: '.btn-next', prevEl: '.btn-prev' }}
                pagination={{ clickable: true, el: '.dots-box' }}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 20 }
                }}
                className="pb-12"
              >
                
                <SwiperSlide>
                  <div className="space-y-3">
                    {jobRoles.slice(0, 3).map(role => (
                      <RoleCard key={role.id} role={role} />
                    ))}
                  </div>
                </SwiperSlide>

                
                <SwiperSlide>
                  <div className="space-y-3">
                    {jobRoles.slice(3, 6).map(role => (
                      <RoleCard key={role.id} role={role} />
                    ))}
                  </div>
                </SwiperSlide>

               
                <SwiperSlide>
                  <div className="space-y-3">
                    {jobRoles.slice(5, 8).map(role => (
                      <RoleCard key={role.id} role={role} />
                    ))}
                  </div>
                </SwiperSlide>
              </Swiper>

              
              <div className="flex items-center gap-4 mt-2">
                 <div className="dots-box flex gap-1.5"></div>
                 <div className="flex gap-2 ml-auto">
                    <button className="btn-prev p-2 bg-white rounded-full shadow-sm border hover:bg-orange-50 transition-colors">
                      <ChevronLeft className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="btn-next p-2 bg-white rounded-full shadow-sm border hover:bg-orange-50 transition-colors">
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    </button>
                 </div>
              </div>
            </div>
          </div>

         
          <div className="w-full md:w-[35%] order-1 md:order-2 flex flex-col items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-3xl border border-white shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
               <img 
                src="https://cdn-icons-png.flaticon.com/512/1063/1063376.png" 
                alt="Business" 
                className="w-24 h-24 md:w-32 md:h-32 mb-4 drop-shadow-lg"
               />
               <div className="text-center">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 bg-orange-50 px-2 py-1 rounded-md">Trending</span>
                 <p className="text-sm font-bold text-slate-700 mt-2">Business Growth</p>
               </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .dots-box .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #e2e8f0;
          opacity: 1;
        }
        .dots-box .swiper-pagination-bullet-active {
          width: 16px;
          background: #f97316;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};


const RoleCard = ({ role }) => (
  <Link to={`/alljob?query=${encodeURIComponent(role.title)}`} className="block"> 
    <div className="flex items-center justify-between p-4 bg-white/60 hover:bg-white border border-transparent hover:border-orange-200 rounded-2xl transition-all group cursor-pointer shadow-sm hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-500 transition-colors">
          <Briefcase className="w-4 h-4 text-orange-600 group-hover:text-white" />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-[14px] leading-tight">{role.title}</h4>
          <p className="text-[11px] text-slate-400 font-medium">{role.count}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-all" />
    </div>
  </Link>
);

export default JobListByRoles;