import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-4">
      <Container>
        <Row className="mb-4"> {/* Adding bottom margin to the row */}
          {/* Column 1 */}
          <Col md={3}>
            <h6 className="font-weight-bold mb-3">For Candidates</h6>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-muted text-decoration-none">Browse Jobs</a></li>
              <li><a href="#!" className="text-muted text-decoration-none">Browse Categories</a></li>
              <li><a href="#!" className="text-muted text-decoration-none">Submit Resume</a></li>
              <li><a href="#!" className="text-muted text-decoration-none">Candidate Dashboard</a></li>
              <li><a href="#!" className="text-muted text-decoration-none">Job Alerts</a></li>
              <li><a href="#!" className="text-muted text-decoration-none">My Bookmarks</a></li>
            </ul>
          </Col>

          {/* Column 2 */}
          <Col md={3}>
            <h6 className="font-weight-bold mb-3">For Employers</h6>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-muted text-decoration-none">Browse Candidates</a></li>
              <li><a href="#!" className="text-muted text-decoration-none">Browse Categories</a></li>
              <li><a href="#!" className="text-muted text-decoration-none">Employer Dashboard</a></li>
              <li><a href="#!" className="text-muted text-decoration-none">Add Job</a></li>
              <li><a href="#!" className="text-muted text-decoration-none">Job Packages</a></li>
            </ul>
          </Col>

          {/* Column 3 */}
          <Col md={3}>
            <h6 className="font-weight-bold mb-3">Partner Sites</h6>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-muted text-decoration-none">Shortcodes</a></li>
              <li><a href="#!" className="text-muted text-decoration-none">Job Pago</a></li>
              <li><a href="#!" className="text-muted text-decoration-none">Job Pago Alternativo</a></li>
              <li><a href="#!" className="text-muted text-decoration-none">Resumo Pago</a></li>
              <li><a href="#!" className="text-muted text-decoration-none">Blog</a></li>
              <li><a href="#!" className="text-muted text-decoration-none">Contact</a></li>
            </ul>
          </Col>

          {/* Column 4 */}
          <Col md={3}>
            <h6 className="font-weight-bold mb-3">Contact Us</h6>
            <p className="text-muted mb-1">214 West Arnold St. New York, NY 10002</p>
            <p className="text-muted mb-1">+1 (345) 678-890</p>
            <p className="text-muted mb-1">support@xhirez.com</p>
            <div className="mt-3">
              <a href="#!" className="text-muted me-3 text-decoration-none"><i className="fab fa-facebook"></i></a>
              <a href="#!" className="text-muted text-decoration-none"><i className="fab fa-twitter"></i></a>
            </div>
          </Col>
        </Row>

        <hr className="my-4" /> {/* Adding margin between sections */}

        {/* Footer Bottom */}
        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">
              &copy; Copyright 2020 Xhirez All Rights Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
