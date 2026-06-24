import React from "react";
import { Link } from "@/router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons"; 

const AppLinksSection = () => {
  return (
    <div className="applinks" id="downloadLinks">
      <div className="container">
        <div className="row">
          <div className="col-md-6 bro-con">
            <div className="links-content">
              <h4>Browse Hundreds of Jobs</h4>
              <p>
                We are efficiently delivering tons of jobs straight to your
                pocket.
              </p>
              <div className="app-download">
                <Link to="#">
                  <div className="btn-icon">
                    <FontAwesomeIcon icon={faApple} className="app-ic" />
                  </div>
                  <div className="btn-text">
                    <p>Download on the </p>
                    <h6>App Store</h6>
                  </div>
                </Link>
                <Link to="#">
                  <div className="btn-icon">
                    <FontAwesomeIcon icon={faGooglePlay} className="app-ic" />
                  </div>
                  <div className="btn-text">
                    <p>Download on the </p>
                    <h6>App Store</h6>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="brow-link-img">
              <img
                src="/assets/images/banner/home-banner.jpg"
                width={"100%"}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLinksSection;
