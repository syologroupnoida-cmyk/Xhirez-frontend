import React from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { FaCommentDots, FaBell, FaUserCircle } from "react-icons/fa";

const CustomNavbar = () => {
  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "#f0f8ff", // Light blue background color
        height: "120px", // Setting the height of the navbar
      }}
      className="d-flex align-items-center responsive"
    >
      <Container responsive>
        <Navbar.Brand href="#" style={{ marginLeft: "90px" }}>
         <Navbar.Brand href="/"><img src="assets/images/logo/Xhirez-Logo.png" width='150px' alt="logo" /></Navbar.Brand>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" style={{ marginLeft: "50px" }}>
          <Nav className="me-auto ms-5">
            <Nav.Link href="#for-businesses" className="text-dark">
              For Businesses
            </Nav.Link>
            <Nav.Link href="#for-staffing-agencies" className="text-dark">
              For Staffing Agencies
            </Nav.Link>
            <Nav.Link href="#features" className="text-dark">
              Features
            </Nav.Link>
          {/* </Nav>
          <Nav className="align-items-center"> */}
            <Nav.Link href="#chat" className="text-dark">
              <FaCommentDots size={24} />
            </Nav.Link>
            <Nav.Link href="#notifications" className="text-dark mx-3">
              <FaBell size={24} />
            </Nav.Link>
            <Nav.Link href="#profile" className="text-dark">
              <FaUserCircle size={40} style={{ color: "#007bff" }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
