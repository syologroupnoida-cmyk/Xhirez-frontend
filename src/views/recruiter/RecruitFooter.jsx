import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function RecruitFooter() {
  return (
    <footer className="bg-[#102033] py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Image
            src="/assets/images/logo/Xhirez-Logo.png"
            alt="Xhirez"
            width={170}
            height={50}
            className="mb-4 h-11 w-auto brightness-0 invert"
          />
          <p className="text-sm leading-6 text-white/70">Recruiter tools for modern hiring teams.</p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/70">Contact</h3>
          <p className="flex items-center gap-2 text-sm text-white/80">
            <FontAwesomeIcon icon={faPhone} />
            +91 9266381188
          </p>
          <p className="mt-2 text-sm text-white/60">Mon-Sat, 10 AM - 6 PM</p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/70">Quick links</h3>
          <div className="flex flex-wrap gap-2">
            {["Pricing", "Job posting", "Database", "Support"].map((item) => (
              <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
