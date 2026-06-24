'use client';

import { useState } from 'react';

const heroImage =
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=80';

const sliderImages = [
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    title: 'Hire faster with smarter tools',
    text: 'Search, shortlist, and connect with relevant candidates across roles and cities.',
  },
  {
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    title: 'Recruitment support for teams',
    text: 'Get assisted hiring workflows for screening, engagement, and faster closures.',
  },
  {
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    title: 'Build your employer brand',
    text: 'Showcase your workplace and reach candidates who match your hiring intent.',
  },
];

const services = [
  ['Job Posting', 'Reach out to the best talent across the nation.'],
  ['Smart Search', 'Access candidate databases with an advanced keyword search engine.'],
  ['Assisted Hiring', 'Get quality leads and fill job openings faster.'],
  ['Branding Solutions', 'Highlight your company as a great place to work.'],
  ['Hackathons/Assessments', 'Screen candidates with branded assessments.'],
  ['ATS Integration', 'Push jobs to Shine through a single click.'],
];

const stats = [
  ['5k+', 'Jobs posted everyday'],
  ['24k+', 'Active recruiters'],
  ['73k+', 'Job applications daily'],
];

const talentPool = [
  ['Java', '951784'],
  ['Graphic designer', '154389'],
  ['Full-stack developer', '800896'],
  ['HTML', '853138'],
  ['ReactJS', '38961'],
  ['Sales', '2519139'],
  ['HR', '931854'],
  ['Business Development', '833803'],
];

const testimonials = [
  {
    name: 'Sathya Moorthy',
    role: 'Senior HR Analyst, Capgemini',
    text: 'Shine.com offers an excellent experience. Recruiters can effortlessly build an effective talent pool.',
  },
  {
    name: 'Ajay Kumar',
    role: 'Manager - Talent Acquisition, LTIMindtree',
    text: 'The platform efficiency and candidate connections notably elevate the hiring process.',
  },
  {
    name: 'Priyanka Ghone',
    role: 'Talent Acquisition & Resourcing',
    text: 'Shine smart tools help us connect with better matches quickly and improve hiring outcomes.',
  },
];

const faqs = [
  ['How can I request for a callback?', 'Fill your name, email, phone number, and location. Our recruitment experts will contact you shortly.'],
  ['How can I make payment?', 'After successful registration or sign in, select your preferred plan and continue to the payment page.'],
  ['How can I get a customized plan?', 'Contact our recruitment specialist at 8010062222 for a plan based on your hiring needs.'],
  ['What should I do if my payment failed?', 'If your transaction was not authorized, the amount is usually returned to your bank account.'],
];

const locations = ['Select Location--', 'Mumbai', 'Delhi NCR', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'];

const submitToDummyApi = (formName, payload) =>
  new Promise((resolve) => {
    window.setTimeout(() => {
      console.log(`${formName} dummy api:`, payload);
      resolve({ ok: true });
    }, 600);
  });

function FormField({ label, name, type = 'text', value, onChange, placeholder, required = true }) {
  return (
    <label className="relative block pt-2">
      <input
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ' '}
        className="peer h-11 w-full rounded-[4px] border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition focus:border-[#089cde] focus:ring-1 focus:ring-[#089cde]"
      />
      <span className="absolute left-3 top-0 bg-white px-1 text-xs font-medium leading-4 text-zinc-600 peer-focus:text-[#089cde]">
        {label}
      </span>
    </label>
  );
}

function SelectField({ label, name, value, onChange, children }) {
  return (
    <label className="relative block pt-2">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-11 w-full cursor-pointer rounded-[4px] border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-[#089cde] focus:ring-1 focus:ring-[#089cde]"
      >
        {children}
      </select>
      <span className="absolute left-3 top-0 bg-white px-1 text-xs font-medium leading-4 text-zinc-600">
        {label}
      </span>
    </label>
  );
}

function Logo() {
  return (
    <a href="#" className="flex cursor-pointer items-center gap-2" aria-label="Shine Recruiter home">
      <div className="grid h-9 w-9 place-items-center rounded bg-[#089cde] text-xs font-black text-white">
        S
      </div>
      <div className="leading-none">
        <p className="text-xl font-black tracking-normal text-[#404040]">shine</p>
        <p className="text-[11px] font-semibold uppercase tracking-normal text-[#089cde]">recruiter</p>
      </div>
    </a>
  );
}

function LoginPopup({ open, onClose, onResetPassword }) {
  const [login, setLogin] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) {
    return null;
  }

  const handleChange = (event) => {
    setLogin((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    await submitToDummyApi('login', login);
    setLoading(false);
    setMessage('Login details submitted.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
      <div className="relative w-full max-w-md rounded-[4px] bg-white shadow-2xl">
        <button
          type="button"
          aria-label="Close login popup"
          onClick={onClose}
          className="absolute right-3 top-3 grid h-8 w-8 cursor-pointer place-items-center rounded-[4px] text-2xl leading-none text-zinc-400 hover:bg-zinc-100 hover:text-zinc-950"
        >
          x
        </button>

        <div className="border-b border-zinc-200 px-7 py-5">
          <h2 className="text-2xl font-bold text-zinc-950">Recruiter Login</h2>
          <p className="mt-1 text-sm text-zinc-500">Sign in to continue to your recruiter dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-7 py-6">
          <FormField label="Username" name="username" value={login.username} onChange={handleChange} placeholder="Enter username" />

          <div>
            <FormField
              label="Password"
              name="password"
              type="password"
              value={login.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={onResetPassword}
              className="mt-2 cursor-pointer text-sm font-semibold text-[#089cde] hover:text-[#067fb5]"
            >
              Forgot password?
            </button>
          </div>

          {message ? <p className="rounded-[4px] border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full cursor-pointer rounded-[4px] bg-[#089cde] text-sm font-bold text-white hover:bg-[#067fb5] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Submitting...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

function ResetPasswordPopup({ open, onClose }) {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    await submitToDummyApi('password-reset', { username });
    setLoading(false);
    setMessage('Password reset request submitted.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
      <div className="relative w-full max-w-md rounded-[4px] bg-white shadow-2xl">
        <button
          type="button"
          aria-label="Close password reset popup"
          onClick={onClose}
          className="absolute right-3 top-3 grid h-8 w-8 cursor-pointer place-items-center rounded-[4px] text-2xl leading-none text-zinc-400 hover:bg-zinc-100 hover:text-zinc-950"
        >
          x
        </button>

        <div className="border-b border-zinc-200 px-7 py-5">
          <h2 className="text-2xl font-bold text-zinc-950">Reset Password</h2>
          <p className="mt-1 text-sm text-zinc-500">Enter your username to request a password reset.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-7 py-6">
          <FormField
            label="Username"
            name="resetUsername"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter username"
          />

          {message ? <p className="rounded-[4px] border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full cursor-pointer rounded-[4px] bg-[#089cde] text-sm font-bold text-white hover:bg-[#067fb5] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

function CallbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    companyType: 'Company',
    location: locations[0],
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    await submitToDummyApi('callback', formData);
    setLoading(false);
    setMessage('Callback request submitted.');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full rounded-[4px] bg-white p-5 shadow-2xl">
      <h2 className="text-xl font-bold text-zinc-950">Get a Call Back</h2>
      <div className="mt-4 space-y-3">
        <FormField label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <FormField label="Business Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Business Email" />
        <FormField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" />
        <div className="grid grid-cols-2 gap-3">
          <label className="flex h-11 cursor-pointer items-center gap-2 rounded-[4px] border border-zinc-300 px-3 text-sm">
            <input type="radio" name="companyType" value="Company" checked={formData.companyType === 'Company'} onChange={handleChange} />
            Company
          </label>
          <label className="flex h-11 cursor-pointer items-center gap-2 rounded-[4px] border border-zinc-300 px-3 text-sm">
            <input type="radio" name="companyType" value="Consultant" checked={formData.companyType === 'Consultant'} onChange={handleChange} />
            Consultant
          </label>
        </div>
        <SelectField label="Location" name="location" value={formData.location} onChange={handleChange}>
          {locations.map((location) => (
            <option key={location}>{location}</option>
          ))}
        </SelectField>
        {message ? <p className="rounded-[4px] border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="h-11 w-full cursor-pointer rounded-[4px] bg-[#089cde] text-sm font-bold text-white hover:bg-[#067fb5] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Submitting...' : 'Get a Call Back'}
        </button>
      </div>
    </form>
  );
}

function ServiceCard({ service, index }) {
  return (
    <article className="border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-[#eaf7fd] text-sm font-black text-[#089cde]">
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className="mt-4 text-lg font-bold text-zinc-950">{service[0]}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{service[1]}</p>
    </article>
  );
}

function ImageSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = sliderImages[activeSlide];

  const goToPrevious = () => {
    setActiveSlide((current) => (current === 0 ? sliderImages.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveSlide((current) => (current === sliderImages.length - 1 ? 0 : current + 1));
  };

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-[#089cde]">Recruitment Highlights</p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-zinc-950">Solutions that work across hiring stages</h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={goToPrevious}
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-[4px] border border-zinc-300 bg-white text-xl text-zinc-700 hover:border-[#089cde] hover:text-[#089cde]"
            >
              &lt;
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={goToNext}
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-[4px] border border-zinc-300 bg-white text-xl text-zinc-700 hover:border-[#089cde] hover:text-[#089cde]"
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="grid overflow-hidden rounded-[4px] border border-zinc-200 bg-zinc-950 shadow-lg md:grid-cols-[1.2fr_0.8fr]">
          <div
            className="min-h-[260px] bg-cover bg-center md:min-h-[420px]"
            role="img"
            aria-label={slide.title}
            style={{ backgroundImage: `url(${slide.src})` }}
          />
          <div className="flex flex-col justify-center p-8 text-white md:p-10">
            <p className="text-sm font-bold text-[#089cde]">0{activeSlide + 1} / 0{sliderImages.length}</p>
            <h3 className="mt-4 text-3xl font-black tracking-normal">{slide.title}</h3>
            <p className="mt-4 text-base leading-7 text-zinc-300">{slide.text}</p>
            <button type="button" className="mt-7 w-fit cursor-pointer rounded-[4px] bg-[#089cde] px-5 py-3 text-sm font-bold text-white hover:bg-[#067fb5]">
              Explore Services
            </button>
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {sliderImages.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Go to ${item.title}`}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 cursor-pointer rounded-[4px] transition-all ${activeSlide === index ? 'w-8 bg-[#089cde]' : 'w-2.5 bg-zinc-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RecruiterLogin() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="border-b border-zinc-200 bg-zinc-50 text-xs text-zinc-600">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap gap-4">
            <a href="#" className="cursor-pointer hover:text-[#089cde]">Home</a>
            <a href="#" className="cursor-pointer hover:text-[#089cde]">For Startups & SMEs</a>
            <a href="#" className="cursor-pointer hover:text-[#089cde]">Job Seeker?</a>
            <a href="#" className="cursor-pointer hover:text-[#089cde]">Future of Work</a>
          </nav>
          <div className="flex flex-wrap gap-4">
            <span>+91-9289906715</span>
            <span>recruiterservices@shine.com</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="flex flex-wrap items-center gap-5 text-sm">
            <a href="#" className="cursor-pointer font-medium text-zinc-600 hover:text-[#089cde]">Help Center</a>
            <a href="#" className="cursor-pointer font-medium text-zinc-600 hover:text-[#089cde]">About Us</a>
            <a href="#" className="cursor-pointer font-medium text-zinc-600 hover:text-[#089cde]">Contact Us</a>
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="cursor-pointer rounded-[4px] bg-[#089cde] px-5 py-2.5 font-bold text-white shadow-sm hover:bg-[#067fb5]"
            >
              Recruiter Login
            </button>
          </div>
        </div>
      </header>

      <section className="bg-zinc-950">
        <div
          className="bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(90deg, rgba(18,18,18,0.82) 0%, rgba(18,18,18,0.62) 42%, rgba(18,18,18,0.2) 100%), url(${heroImage})` }}
        >
          <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
            <div className="grid min-h-[430px] gap-8 md:grid-cols-[1fr_360px] md:items-center">
              <div className="max-w-2xl text-white">
                <p className="text-sm font-bold uppercase tracking-normal text-[#9be2ff]">Recruitment Solutions & Employer Login Services</p>
                <h1 className="mt-4 text-4xl font-black leading-tight tracking-normal md:text-5xl">
                  Top Companies Hiring on Shine
                </h1>
                <p className="mt-4 max-w-xl text-lg leading-8 text-white/90">
                  Discover job posting, smart search, assisted hiring, branding, assessments, and ATS integration for your recruitment needs.
                </p>
                <button
                  type="button"
                  onClick={() => setLoginOpen(true)}
                  className="mt-7 cursor-pointer rounded-[4px] bg-[#089cde] px-7 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#067fb5]"
                >
                  Start Hiring
                </button>
              </div>
              <div className="w-full md:justify-self-end">
                <CallbackForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ImageSlider />

      <section className="bg-[#eef9fe] pt-14">
        <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-[#089cde]">STARTUPS & SME</p>
              <h2 className="mt-2 text-xl font-black text-zinc-950">Post a Job for Free*</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">Publish roles quickly and connect with relevant applicants.</p>
            </div>
            <div className="bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-[#089cde]">ASSESSMENTS</p>
              <h2 className="mt-2 text-xl font-black text-zinc-950">Conduct Hackathon</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">Screen candidates through branded hiring challenges.</p>
            </div>
            <div className="bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-[#089cde]">SMART SEARCH</p>
              <h2 className="mt-2 text-xl font-black text-zinc-950">Find Right Candidates</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">Use smarter filters to reach better matching talent.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-black tracking-normal text-zinc-950">Our Services</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service[0]} service={service} index={index} />
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 py-10 text-white">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 text-center sm:grid-cols-3 sm:px-6 lg:px-8">
          {stats.map((stat) => (
            <div key={stat[0]}>
              <p className="text-4xl font-black text-[#089cde]">{stat[0]}</p>
              <p className="mt-2 text-sm text-zinc-300">{stat[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
        <div>
          <h2 className="text-3xl font-black tracking-normal text-zinc-950">Hire from the Pool of 50M+ Candidates</h2>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            Our upgraded ML powered search engine reduces your effort in talent discovery. You can also outsource hiring needs to a dedicated team for initial screening.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-zinc-200 bg-[#eef9fe] p-5">
            <h3 className="font-bold text-zinc-950">Engage with Talent Pool</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Reach skilled candidates and fulfill recruitment needs faster.</p>
          </div>
          <div className="border border-zinc-200 bg-[#eef9fe] p-5">
            <h3 className="font-bold text-zinc-950">Build a Strong Brand</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Become a preferred workplace among the candidate community.</p>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-black tracking-normal text-zinc-950">Explore Talent Pool</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {talentPool.map((item) => (
              <article key={item[0]} className="border border-zinc-200 bg-white p-5 text-center shadow-sm">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#eaf7fd] text-xs font-black text-[#089cde]">
                  {item[0].slice(0, 2).toUpperCase()}
                </div>
                <h3 className="mt-3 font-bold text-zinc-950">{item[0]}</h3>
                <p className="mt-1 text-sm text-zinc-500">{item[1]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-black tracking-normal text-zinc-950">What our Customer Says..</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-sm leading-6 text-zinc-600">&quot;{testimonial.text}&quot;</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[#089cde] font-black text-white">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-950">{testimonial.name}</h3>
                  <p className="text-xs text-zinc-500">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-black tracking-normal text-zinc-950">FAQs</h2>
          <div className="mt-8 divide-y divide-zinc-200 border border-zinc-200 bg-white">
            {faqs.map((faq, index) => (
              <details key={faq[0]} className="group p-5">
                <summary className="cursor-pointer list-none font-bold text-zinc-950">
                  {index + 1}. {faq[0]}
                </summary>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{faq[1]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#272727] text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <h2 className="text-2xl font-black tracking-normal">Great career starts here!</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300">
              If you are looking for any information, please feel free to contact us. We will be glad to help.
            </p>
          </div>
          <div className="text-sm leading-7 text-zinc-300">
            <p>8010062222</p>
            <p>recruiterservices@shine.com</p>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-zinc-400">
          Copyright {currentYear} Shine Recruiter. All rights reserved.
        </div>
      </footer>

      <LoginPopup
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onResetPassword={() => {
          setLoginOpen(false);
          setResetOpen(true);
        }}
      />
      <ResetPasswordPopup open={resetOpen} onClose={() => setResetOpen(false)} />
    </main>
  );
}
