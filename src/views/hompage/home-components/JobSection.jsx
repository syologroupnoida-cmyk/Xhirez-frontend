import React from 'react';
import { Link } from "@/router-dom";

const JobSection = ({ title, data, type }) => (
  <div className="my-2 p-4">
    <h2 className="text-4xl text-center text-black font-semibold mb-10">
      {title}
    </h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
      {data.map((item, index) => {
        const label = item.region || item.policy || item.type || item.level;

        return (
          <Link
            key={index}
            to="/filteredJobList"
            state={{ filterType: type, value: label }}
            className="flex flex-col cursor-pointer items-center py-2 px-4 bg-[#F9FAFB] rounded-full hover:bg-gray-200 transition duration-300"
          >
            <h3 className="font-bold truncate">
              {label.length > 20 ? `${label.slice(0, 20)}...` : label}
            </h3>
            <p className="text-sm">{item.jobs} Jobs</p>
          </Link>
        );
      })}
    </div>
  </div>
);

export default JobSection;
