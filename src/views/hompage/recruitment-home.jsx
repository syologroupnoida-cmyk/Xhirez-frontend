import React, { useEffect, useState } from 'react';
import Navbar from '../../components/header/recruitment-header';
import Footer from '../../components/footer/footer';
import Popup from '../recruitment/popup';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { FaUserTie, FaCog, FaChevronDown, FaChevronUp, FaClock, FaBullseye } from 'react-icons/fa';
import axios from 'axios';
import { API_ENDPOINTS } from '../apiConfig';
import homeBanner from '../../../public/assets/images/banner/recruitment.jpg';

const Recruitmenthero = () => {
  const authToken = sessionStorage.getItem('authToken');
  const user = authToken ? JSON.parse(authToken).users : null;
  const userRole = user?.userRole;

  const [jobList, setJobList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    axios.get(API_ENDPOINTS.JOBLIST)
      .then((response) => {
        setJobList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching job list:', error);
      });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I post a job opening?',
      answer:
        'To post a job opening, navigate to the "Job Listings" section of your dashboard and click the "Add Job" button. Fill out the job details and click "Submit" to publish the job.',
    },
    {
      question: 'Can I edit or delete a job listing?',
      answer:
        'Yes! You can edit or delete any job listing. Go to the "My Jobs" section, select the job, and click "Edit" or "Delete".',
    },
    {
      question: 'How can I manage candidates who have applied to my jobs?',
      answer:
        'In the "Applications" tab, you can view all candidates who have applied to your job listings. You can filter applications, shortlist candidates, or schedule interviews.',
    },
    {
      question: 'How can I communicate with candidates?',
      answer:
        'You can send messages to candidates through the platform\'s messaging system. Simply click on the candidate\'s profile and use the message option.',
    },
    {
      question: 'Can I track the progress of my job postings?',
      answer:
        'Yes! Our dashboard offers real-time analytics on views, applications, and responses to track the progress of your job postings.',
    },
    {
      question: 'Can I schedule interviews directly through the platform?',
      answer:
        'Yes, you can schedule interviews directly through the platform. Simply select the candidate and choose a time for the interview.',
    },
  ];

  return (
    <>
    {userRole === "primeadmin" ? null : <Popup />}
      <Navbar />
      {/* Hero Banner */}
    <div style={{backgroundImage : `url(${homeBanner})`}} className="recruiter-banner bg-[url('assets/images/banner/recruitment.jpg')] bg-cover bg-center ">
        <Container>
          <Row className="align-items-center ">
            <Col lg={5} md={8}>
              <div className="banner-content pt-[250px] pb-44 ">
                <h2>
                  Find the <span>Right Talent</span> for Your Business,{" "}
                  <span>Fast!</span>{" "}
                </h2>
                <p className="pb-3 w-3/4">
                  Post Your Job Openings and Connect with Skilled Professionals
                  Today!
                </p>
                {/* <Link
                  to="/AdvanceSearch"
                  className="rounded-3xl border-[#07A1E3] bg-[#07A1E3] font-semibold text-white py-3 px-4 ml-3"
                >
                  Search Candidates
                </Link> */}
                {userRole === "primeadmin" ? (
                <Link
                  to="/AdvanceSearch"
                  className="rounded-3xl border-[#07A1E3] bg-[#07A1E3] font-semibold text-white py-3 px-4 ml-3"
                >
                  Search Candidates
                </Link>
                  ) : (
                    <span
                    className="rounded-3xl border-[#07A1E3] bg-[#07A1E3] font-semibold text-white py-3 px-4 ml-3 opacity-50 cursor-not-allowed"
                    title="Only accessible by PrimeAdmin users"
                  >
                    Search Candidates
                  </span>
                  )}
                <Link
                  to="/Jobpost"
                  className="rounded-3xl border-[#07A1E3] bg-[#07A1E3] font-semibold text-white py-3 px-4 ml-3"
                >
                  Post A Job
                </Link>
              </div>
            </Col>
            <Col md={6} className="black-side"></Col>
          </Row>
        </Container>
      </div>
      {/* Top Companies */}
      <Container>
        <div className="py-10 sm:py-16">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-10 heading-line">
            Top <span className="text-[#05A2E4]">Companies</span> Hiring on{' '}
            <span className="text-[#05A2E4]">Xhirez</span>
          </h2>
          <div className="overflow-hidden">
            <div className="flex animate-marquee space-x-4 sm:space-x-6 md:space-x-8">
              {jobList.map((job, index) => (
                <div key={index} className="flex-shrink-0">
                  {job.comp_logo ? (
                    <img
                      src={API_ENDPOINTS.FETCHIMAGE(job?.comp_logo)}
                      alt={`${job.companyname} Logo`}
                      className="h-8 sm:h-10 md:h-12 lg:h-14 object-contain"
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-sm sm:text-base font-bold text-blue-600 bg-blue-100 rounded-full">
                      {job.companyname?.charAt(0).toUpperCase() || 'N/A'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* How It Works */}
      <Container>
        <div className="py-8 sm:py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-8/12 p-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
                How Does <span className="text-[#05A2E4]">It Work?</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Our platform makes job recruitment easier and more effective for both employers and candidates. Whether you're an employer looking to hire top talent or a job seeker searching for the perfect opportunity, we streamline the entire process. Our platform doesn’t just make recruitment more efficient; it also makes it more accessible. We offer a range of tools for employers and job seekers, from simple search filters to AI-powered recommendations. Everything you need is right at your fingertips, making the hiring process faster, more transparent, and more effective than ever.
              </p>
            </div>
            <div className="w-full md:w-4/12 p-4">
              <img
                src="/assets/images/banner/recruiter-side.png"
                alt="Recruitment Process"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Hiring Goals */}
      <div className="bg-gray-50">
        <Container>
          <div className="py-10 sm:py-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-6 sm:mb-8 heading-line">
              How <span className="text-[#05A2E4]">Xhirez Recruiters</span> Simplify Your{' '}
              <span className="text-[#05A2E4]">Hiring Goals</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <FaUserTie className="text-4xl sm:text-5xl md:text-6xl text-[#06A1E3] bg-[#ECF4FF] rounded-full p-2 sm:p-3 mb-4" />
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Access to Top Talent</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Xhirez recruiters tap into a wide network of skilled candidates, ensuring you find the right fit quickly for your business needs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <FaCog className="text-4xl sm:text-5xl md:text-6xl text-[#06A1E3] bg-[#ECF4FF] rounded-full p-2 sm:p-3 mb-4" />
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Efficient Hiring Process</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  From sourcing to screening, Xhirez streamlines every step of recruitment, saving you time and effort while maintaining high candidate quality.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <FaClock className="text-4xl sm:text-5xl md:text-6xl text-[#06A1E3] bg-[#ECF4FF] rounded-full p-2 sm:p-3 mb-4" />
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Faster Time-to-Hire</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  With advanced tools and industry expertise, Xhirez accelerates the hiring process, helping you fill roles faster and keep your business moving forward.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <FaBullseye className="text-4xl sm:text-5xl md:text-6xl text-[#06A1E3] bg-[#ECF4FF] rounded-full p-2 sm:p-3 mb-4" />
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Custom Hiring Strategies</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Xhirez works closely with you to develop a tailored recruitment plan, ensuring you meet your specific goals and hire the right people for your company’s culture.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center md:text-left heading-line mb-4 sm:mb-6">
                Frequently <span className="text-[#05A2E4]">Asked</span> Questions
              </h2>
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border border-gray-200 p-3 sm:p-4">
                  <div
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <h3 className="text-sm sm:text-base font-semibold text-black">{faq.question}</h3>
                    <div className="text-gray-500">
                      {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </div>
                  {openIndex === index && (
                    <p className="mt-2 text-xs sm:text-sm text-gray-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="hidden md:block">
              <img
                src="/assets/images/recruitment/FQA.avif"
                alt="FAQ illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-gray-50">
        <Container>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center md:text-left heading-line mb-6 sm:mb-8">
            Latest <span className="text-[#05A2E4]">Blog</span> Posts
          </h2>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
          >
            {Array(4)
              .fill()
              .map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full cursor-pointer border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md">
                    <Link to="#" className="block">
                      <img
                        src="/assets/images/blogs/first.jpeg"
                        alt="Blog"
                        className="w-full h-32 sm:h-40 object-cover"
                      />
                      <h2 className="p-2 text-xs sm:text-sm font-semibold text-gray-800 bg-gray-100">
                        Your Blog Title Here
                      </h2>
                      <div className="flex justify-between px-1 py-2 text-xs sm:text-sm text-gray-600 bg-gray-50">
                        <span className="font-bold">Company Name</span>
                        <span className="italic">5 days ago</span>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Recruitmenthero;