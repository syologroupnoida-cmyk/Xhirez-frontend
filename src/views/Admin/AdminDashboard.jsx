import React from "react";
import { Outlet } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Row,
  Col,
  Image,
  Card,
  Button,
  Form,
  ListGroup,
  Dropdown,
  DropdownButton,
  Badge,
  Figure,
  Table,
} from "react-bootstrap";
// Uncomment the following imports if needed
// import { AiOutlineUser } from "react-icons/ai";
// import { BsFillBellFill } from "react-icons/bs";
// import { FaRegComment } from "react-icons/fa";
// import { IoMdSend } from "react-icons/io";
// import { FiStar } from "react-icons/fi";
// import { BiMapPin } from "react-icons/bi";
// import { AiOutlineMail } from "react-icons/ai";
// import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomNavbar from "../Admin/CustomerNavbar";
import Sidebar from "../Admin/Sidebar";
import Footer from "../../components/footer/footer";


const data = [
  {
    name: "January",
    uv: 10,
  },
  {
    name: "February",
    uv: 30,
  },
  {
    name: "March",
    uv: 45,
  },
  {
    name: "April",
    uv: 5,
  },
  {
    name: "May",
    uv: 10,
  },
  {
    name: "June",
    uv: 48,
  },
  {
    name: "July",
    uv: 10,
  },
];

const AdminDashboard = () => {
  return (
    <div className="responsive">
     <CustomNavbar />
    <Container fluid className="responsive">
      {/* Navbar */}
     

      <div style={{ display: "flex" }} className="responsive">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div style={{ flex: 1, padding: "20px", backgroundColor: "white" }} className="responsive">
        <Outlet />
          {/* <MainContent /> */}
          {/* <ManageJobs /> */}
          {/* <JobPostingForm /> */}
          {/* <CompanyProfile /> */}
        </div>
      </div>

      {/* Footer */}
      <Footer />
      </Container>
      </div>
  );
};

export default AdminDashboard;
