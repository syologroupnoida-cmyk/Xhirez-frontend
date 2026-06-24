import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBars,
  faChevronDown,
  faPhone,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const offeringProducts = [
  ["Job Posting", "Find & attract relevant talent"],
  ["Resdex", "Access India's largest database"],
  ["Expert Assist", "Our assisted hiring solution"],
  ["Employer Branding", "Showcase your brand presence"],
  ["Talent Pulse", "Make informed hiring decisions"],
  ["AI REX", "Reduce time to hire from days to hours."],
];

export default function RecruitHeader() {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isOfferOpen, setIsOfferOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isHeaderScrolled ? "border-b border-slate-200 bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <Link href="/" className="xh-recruit-logo-link flex items-center gap-3">
            <Image
              src="/assets/images/logo/Xhirez-Logo.png"
              alt="Xhirez"
              width={190}
              height={56}
              className={`h-11 w-auto object-contain transition ${isHeaderScrolled ? "" : "brightness-0 invert"}`}
            />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setIsOfferOpen(true)}
              onMouseLeave={() => setIsOfferOpen(false)}
            >
              <button
                type="button"
                className={`inline-flex items-center whitespace-nowrap border-0 bg-transparent p-0 font-semibold ${
                  isHeaderScrolled ? "text-slate-900" : "text-white"
                }`}
              >
                Our offerings
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`ml-2 text-xs transition-transform ${isOfferOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOfferOpen && (
                <div className="absolute left-[-48px] top-full z-[80] pt-2">
                  <div className="absolute left-[118px] top-1 h-3 w-3 rotate-45 rounded bg-white" />
                  <div className="relative grid w-[430px] grid-cols-[120px_1fr_125px] overflow-hidden rounded bg-white shadow-[0_14px_34px_rgba(0,0,0,0.16)]">
                    <aside className="min-h-[178px] bg-gradient-to-br from-[#fff1d8] via-[#fff4ea] to-[#f1e5ff] p-2.5">
                      <h3 className="text-[11px] font-bold leading-[14px] text-[#424242]">
                        With Free Job Posting, hire local talent at zero cost
                      </h3>
                      <p className="mt-1 text-[8px] leading-[10px] text-[#444]">
                        Unlimited free postings with <strong>one active job at a time</strong>
                      </p>
                      <p className="mt-1 text-[8px] leading-[10px] text-[#444]">
                        Get up to <strong>50 candidates/job</strong> while your post remains visible for 7 days
                      </p>
                      <Link href="/jobpost" className="mt-1.5 inline-flex items-center gap-1 text-[8px] font-bold text-[#2f5cf6]">
                        Free Job Posting <FontAwesomeIcon icon={faArrowRight} className="text-[7px]" />
                      </Link>
                      <div className="mt-2 flex justify-center">
                        <Image
                          src="/assets/images/banner/recruiter-side.png"
                          alt="Recruiter"
                          width={210}
                          height={250}
                          className="h-[48px] w-auto object-contain"
                        />
                      </div>
                    </aside>

                    <section className="p-2.5">
                      <p className="mb-1.5 text-[8px] font-bold uppercase tracking-wide text-[#8a8a8a]">By products</p>
                      <div className="space-y-1">
                        {offeringProducts.map(([title, desc]) => (
                          <Link key={title} href="/business" className="block text-[#111827]">
                            <h4 className="m-0 text-[11px] font-semibold leading-[13px] text-black">{title}</h4>
                            <p className="m-0 mt-0.5 text-[10px] font-normal leading-[12px] text-black">{desc}</p>
                          </Link>
                        ))}
                      </div>
                    </section>

                    <section className="p-2.5">
                      <p className="mb-1.5 text-[8px] font-bold uppercase tracking-wide text-[#8a8a8a]">By business type</p>
                      <div className="space-y-1.5">
                        {["Enterprises", "Small & medium business", "Consultants & agency"].map((item) => (
                          <Link key={item} href="/business" className="block text-[11px] font-bold leading-[14px] text-[#111827]">
                            {item}
                          </Link>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        <nav className="hidden items-center gap-4 text-sm font-semibold lg:flex">
          <Link href="tel:18001025558" className={`${isHeaderScrolled ? "xh-recruit-light-link" : "xh-recruit-dark-link"} inline-flex items-center whitespace-nowrap`}>
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            1800-102-5558 <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-xs" />
          </Link>
          <Link
            href="/recruit/pricing"
            className="xh-recruit-header-action inline-flex items-center whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#2f5cf6] no-underline hover:text-[#2f5cf6]"
          >
            Buy online
          </Link>
          <Link
            href="/job-post"
            className={`xh-recruit-header-action inline-flex items-center whitespace-nowrap rounded-md border px-4 py-2 text-sm font-semibold no-underline ${
              isHeaderScrolled
                ? "border-slate-300 text-slate-900 hover:text-slate-900"
                : "border-white/70 text-white hover:text-white"
            }`}
          >
            Post a job{" "}
            <span className="ml-2 rounded-full border border-[#24a33d] bg-transparent px-2 py-0.5 text-[10px] font-bold leading-none text-[#24a33d]">
              FREE
            </span>
          </Link>
          <FontAwesomeIcon icon={faShoppingCart} className={`text-2xl ${isHeaderScrolled ? "text-slate-900" : "text-white"}`} />
          <FontAwesomeIcon icon={faBars} className={`text-2xl ${isHeaderScrolled ? "text-slate-900" : "text-white"}`} />
        </nav>
      </div>
    </header>
  );
}
