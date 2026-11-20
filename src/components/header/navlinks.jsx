import { Link, useLocation } from "@/router-dom";

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
      <div className="flex gap-1 text-mine-shaft-300 z-0 h-full items-center">
        {links.map((link, index) => (
          <div
            key={index}
            className={`xh-nav-item ${location.pathname === link.url ? "is-active" : ""}`}
          >
            <Link to={link.url} className="xh-nav-link">
              {link.name}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navlinks;
