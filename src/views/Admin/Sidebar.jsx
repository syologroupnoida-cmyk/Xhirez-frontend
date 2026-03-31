import React, { useState } from "react";
import { Card, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaBriefcase,
  FaListAlt,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Toggle Button */}
      <button
        className="btn btn-primary btn-sm d-md-none"
        onClick={handleShow}
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: 1050,
        }}
      >
        ☰
      </button>

      {/* Sidebar for Larger Screens */}
      <div
        className="d-none d-md-block"
        style={{
          marginTop: "3px",
          width: "350px",
          height: "100vh",
          backgroundColor: "#f8f9fa",
          padding: "20px 100px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <SidebarContent />
      </div>

      {/* Sidebar for Smaller Screens */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarContent />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

const SidebarContent = () => {
  return (
    <>
      <Card className="mb-3 text-center">
        <div className="mb-4">
          <img
            src="https://i.ibb.co/1fqLDb8/company-logo.png"
            alt="Company Logo"
            style={{
              width: "50px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
          <p>
            <strong>Hi, Wipro Limited</strong>
            <br />
            Bothell, WA, USA
          </p>
        </div>
      </Card>

      <nav>
        <ul style={{ listStyleType: "none", padding: 0, marginLeft:"" }}>
          <li className="mb-3">
            <NavLink
              to="/admin"
              className="nav-link"
              end
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#333",
                fontWeight: isActive ? "bold" : "normal",
                fontSize: "0.85rem",
              })}
            >
              <MdDashboard className="me-2" />
              Dashboard
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/admin/companyprofile"
              className="nav-link"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#333",
                fontWeight: isActive ? "bold" : "normal",
                fontSize: "0.85rem",
              })}
            >
              <FaUserCircle className="me-2" />
              Company Profile
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/admin/jobpostingForm"
              className="nav-link"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#333",
                fontWeight: isActive ? "bold" : "normal",
                fontSize: "0.85rem",
              })}
            >
              <FaBriefcase className="me-2" />
              Post a New Job
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/admin/managejobs"
              className="nav-link"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#333",
                fontWeight: isActive ? "bold" : "normal",
                fontSize: "0.85rem",
              })}
            >
              <FaListAlt className="me-2" />
              Manage Jobs
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/admin/shortlisted-resumes"
              className="nav-link"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#333",
                fontWeight: isActive ? "bold" : "normal",
                fontSize: "0.85rem",
              })}
            >
              <FaListAlt className="me-2" />
              Shortlisted Resumes
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/admin/adminchangepass"
              className="nav-link"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#333",
                fontWeight: isActive ? "bold" : "normal",
                fontSize: "0.85rem",
              })}
            >
              <FaKey className="me-2" />
              Change Password
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className="nav-link"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#333",
                fontWeight: isActive ? "bold" : "normal",
                fontSize: "0.85rem",
              })}
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
