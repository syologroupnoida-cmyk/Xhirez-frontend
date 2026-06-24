import { Link, useLocation } from "@/router-dom";
import React from 'react';

const Seekernavlinks = ({ onInputClick }) => {
  const location = useLocation();

  const handleBrowseClick = () => {
    if (onInputClick) {
      onInputClick();
    }
  };

  const links = [
    { name: "Browse job", onClick: handleBrowseClick },
    { name: "Job For You", url: "/JobListInterface" },
    { name: "Profile", url: "/Profile" },
    { name: "Dashboard", url: "/profile-dashboard" },
  ];

  return (
    <div className="flex gap-4 sm:gap-1 lg:!bg-transparent lg:gap-10 sm:flex text-mine-shaft-300 h-16 items-center md:space-x-6 pl-4">
      {links.map((link, index) => (
        <div
          key={index}
          className={`${
            location.pathname === link.url ? "border-[#06A2E4] text-[#06A2E4]" : "border-transparent"
          } border-t-[4px] mt-0 h-16 items-center flex px-4`}
        >          {link.url ? (
            <Link to={link.url} onClick={link.onClick}>
              {link.name}
            </Link>
          ) : (
            <div
              onClick={link.onClick}
              className="cursor-pointer"
            >
              {link.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Seekernavlinks;