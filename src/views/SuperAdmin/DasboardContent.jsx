import React, { useEffect, useState } from "react";
import { Card, Row, Col, Table, Button } from "react-bootstrap";
import {
  Users,
  Briefcase,
  Search,
  Award,
  TrendingUp,
  BriefcaseIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import { API_ENDPOINTS } from "../apiConfig";
import { Link } from "react-router-dom";
import AuthorizationHeader from '../AuthorizationHeader';


const DashboardContent = ({ activeModule }) => {
  const [filter, setFilter] = useState("week");

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRecruiters, setTotalRecruiters] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [primeRecruiters, setPrimeRecruiters] = useState(0);

  // Fetch dashboard data stats

  const [businessRequests, setBusinessRequests] = useState(0);
  const [databaseRequests, setDatabaseRequests] = useState(0);
  const [campusBuddyRequests, setCampusBuddyRequests] = useState(0);
  const [sheCanCodeRequests, setSheCanCodeRequests] = useState(0);

  // recent jobs data
  const [recentJobs, setRecentJobs] = useState([]);

  const [data, setData] = useState([]);

  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINDASHBOARDDATA)
      .then((response) => {
        if (response.data.status === 200) {
          setTotalUsers(response?.data?.data?.totalUsers || 0);
          setTotalRecruiters(response?.data?.data.totalRecruiters || 0);
          setTotalJobs(response?.data?.data?.activeJobs || 0);
          setPrimeRecruiters(response?.data?.data?.primeRecruiters || 0);

          setBusinessRequests(response?.data?.data?.businessRequest || 0);
          setDatabaseRequests(response?.data?.data?.databaseRequest || 0);
          setCampusBuddyRequests(response?.data?.data?.campusBuddy || 0);
          setSheCanCodeRequests(response?.data?.data?.sheCanCode || 0);
        }
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });

    // for recent jobs data

    AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINDASHBOARDRECENTPOSTEDJOBS)
      .then((response) => {
        if (response.data.status === 200) {
          setRecentJobs(response?.data?.data || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching recent jobs data:", error);
      });

    AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINDASHBOARDBARCHARDATA)
      .then((response) => {
        if (response.data.status === 200) {
          const apiData = response.data.data;

          const dayOrder = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ];

          const formattedData = dayOrder.map((day) => {
            const entry = apiData.find((d) => d.day_of_week === day);
            return {
              name: day.slice(0, 3),
              profileViews: entry ? entry.total_profile_views : 0,
              jobApplied: entry ? entry.total_applications : 0,
            };
          });

          setData(formattedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });


    AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINDASHBOARDPIECHARTDATA)
      .then((response) => {
        if (response.data.status === 200) {
          const apiData = response.data.data;

          const piechartData = apiData.map((item) => ({
            name: item?.skill || "Unknown",
            value: item?.demand || 0,
          }));

          setSkillsData(piechartData);
        }
      })
      .catch((error) => {
        console.error("Error fetching pie chart data:", error);
      });
  }, [activeModule]);



  const chartData = filter === "week" ? data : monthlyData;

  const COLORS = ["#06A0E3", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  // Icon mapping
  const iconMap = {
    Users,
    Briefcase,
    Search,
    Award,
    TrendingUp,
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Row className="g-4 ">
        {[
          {
            title: "Total Users",
            value: totalUsers,
            icon: Users,
            color: "bg-primary",
            textColor: "text-white",
          },
          {
            title: "Active Jobs",
            value: totalJobs,
            icon: Briefcase,
            color: "bg-green-500",
            textColor: "text-white",
          },
          {
            title: "Recruiters",
            value: totalRecruiters,
            icon: Search,
            color: "bg-blue-400",
            textColor: "text-white",
          },
          {
            title: "Premium Members",
            value: primeRecruiters,
            icon: Award,
            color: "bg-yellow-500",
            textColor: "text-white",
          },
        ].map((item, index) => (
          <Col key={index} xs={12} sm={6} lg={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`border-0 shadow-sm hover:shadow-md transition-shadow ${item.color} ${item.textColor} rounded-xl`}
              >
                <Card.Body className="d-flex justify-content-between align-items-center p-4">
                  <div>
                    <Card.Title className="text-sm font-semibold mb-2">
                      {item.title}
                    </Card.Title>
                    <Card.Text className="text-3xl font-bold">
                      {item.value}
                    </Card.Text>
                  </div>
                  <div className="rounded-full p-3 bg-white bg-opacity-20">
                    <item.icon className="w-6 h-6 text-[#0D6EFD]" />
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
      {/* Quick Actions */}
      <Row className="g-4">
        <Col xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <Card.Body className="p-6">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">
                  Quick Actions
                </h5>
                <div className="flex flex-wrap gap-3">
                  <Link to="/SuperAdmin/SuperAdminProfile">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-primary text-white rounded-lg text-md font-medium hover:bg-blue-600 transition-colors"
                    >
                      Manage Profile
                    </motion.button>
                  </Link>

                  <Link to="/SuperAdmin/ManageSuperAdmin">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg text-md font-medium hover:bg-green-600 transition-colors"
                    >
                      Manage Super Admins
                    </motion.button>
                  </Link>

                  <Link to="/SuperAdmin/users">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-md font-medium hover:bg-yellow-600 transition-colors"
                    >
                      Manage Users
                    </motion.button>
                  </Link>

                  <Link to="/SuperAdmin/company">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg text-md font-medium hover:bg-purple-600 transition-colors"
                    >
                      Manage Companies
                    </motion.button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Stats Overview */}
      <Row className="g-4">
        <Col xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <Card.Body className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-lg font-semibold text-gray-800">Stats</h5>
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <Row className="g-4">
                  {[
                    {
                      title: "Business Requests",
                      value: businessRequests,
                      color: "text-green-500",
                    },
                    {
                      title: "Database Proposal",
                      value: databaseRequests,
                      color: "text-green-500",
                    },
                    {
                      title: "Campus Buddy",
                      value: campusBuddyRequests,
                      color: "text-red-500",
                    },
                    {
                      title: "She Can Code",
                      value: sheCanCodeRequests,
                      color: "text-red-500",
                    },
                  ].map((item, index) => (
                    <Col key={index} xs={4} sm={3} lg={3} xl={3}>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h6 className="text-sm font-medium text-gray-600 mb-2">
                          {item.title}
                        </h6>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-gray-900">
                            {item.value}
                          </span>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Applications and Resource Status */}
      {/* <Row className="g-4">
        <Col xs={12} md={6}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <Card.Body className="p-6">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">Recent Applications</h5>
                <Row className="g-3">
                  <Col xs={12}>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-gray-700">UI/UX Design</p>
                      <div className="text-sm text-gray-600">5 Received, 1 On Hold, 3 Rejected</div>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-gray-700">React Developer</p>
                      <div className="text-sm text-gray-600">25 Received, 3 On Hold, 6 Rejected</div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col xs={12} md={6}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <Card.Body className="p-6">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">Resource Status</h5>
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="absolute h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="absolute h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: '15%' }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                  />
                  <motion.div
                    className="absolute h-full bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: '5%' }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <div>250 Present</div>
                  <div>4 Remote</div>
                  <div>2 Absent</div>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row> */}

      {/* Recent Job Postings */}
      <Row className="g-4">
        <Col xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <Card.Body className="p-6">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">
                  Recent Job Postings
                </h5>
                <Table responsive hover className="table-borderless">
                  <thead>
                    <tr className="text-gray-600 text-sm">
                      <th>Company</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Posted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentJobs.map((job) => (
                      <tr key={job.id} className="text-gray-700 text-sm">
                        <td>{job.companyname || "N/A"}</td>
                        <td>{job.industry || "N/A"}</td>
                        <td>
                          <span
                            className={`flex items-center gap-1 ${
                              job.status === 0 ||
                              job.status === "" ||
                              job.status === null
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {job.status === 0 ||
                            job.status === "" ||
                            job.status === null ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                Active
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" />
                                Inactive
                              </>
                            )}
                          </span>
                        </td>

                        <td>
                          {new Date(job.job_posttime).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Top Skills Demand */}
      <Row className="g-4">
        <Col xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <Card.Body className="p-6">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">
                  Top Skills in Demand
                </h5>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={skillsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {skillsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <Card.Body className="p-6">
                <div className="flex justify-between items-center mb-5">
                  <h5 className="text-lg font-semibold text-gray-800">
                    Job Analytics
                  </h5>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                        filter === "week"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      onClick={() => setFilter("week")}
                    >
                      Week
                    </motion.button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        fontSize: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar
                      dataKey="profileViews"
                      fill="#06A0E3"
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                    />
                    <Bar
                      dataKey="jobApplied"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
