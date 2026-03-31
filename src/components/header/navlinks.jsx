import { Link, useLocation } from "react-router-dom";

const Navlinks = () => {
  const links = [
    { name: "Campus Buddy", url: "/campus-buddy" },
    { name: "She Can Code", url: "/shecancode" },
     { name: "E-Campus", url: "/business" },
    { name: "Career Counselling", url: "/career-counselling" }, 
  ];
  
  const location = useLocation();

  return (
    <>
      <div className="flex gap-2 sm:gap-3  text-mine-shaft-300 z-0 h-full items-center md:space-x-6 pl-4">
        {links.map((link, index) => (
          <div key={index} className={`${ location.pathname == "" + link.url? "border-[#06A2E4] text-[#06A2E4]" : "border-transparent"} border-t-[4px] py-3 px-4 items-center flex`}
          >
            <Link to={link.url}>
              {link.name}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navlinks;