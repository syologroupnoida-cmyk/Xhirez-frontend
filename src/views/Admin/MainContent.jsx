import React from "react";
import { Container, Row, Col, Card, ProgressBar, ListGroup, Button } from "react-bootstrap";
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

import LatestApplications from "./LatestApplications";


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


const MainContent = () => {
  return (
    <Container fluid className="p-4" ResponsiveContainer>
      {/* Overview Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>5246</Card.Title>
              <Card.Text>Posted</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>107</Card.Title>
              <Card.Text>Review</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>835</Card.Title>
              <Card.Text>Shortlist Resumes</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>279</Card.Title>
              <Card.Text>Meeting</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Statistics and Traffic */}
      <Row className="mb-4">
        <Col md={8}>
        <Card>
                  <Card.Body className="bg-light">
                    <Card.Title>Monthly Data</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm bg-light" style={{ height: "365px" }}>
            <Card.Body>
              <Card.Title>Traffic</Card.Title>
              <div className="text-center">
                <h1>1.5 M</h1>
                <p>Traffic for the day</p>
                <ProgressBar now={40} label="40% Facebook" className="mb-3" />
                <ProgressBar now={60} variant="info" label="60% Google" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Latest Applications and Activity */}
      <Row>
        <Col md={6}>
          <Card className="shadow-sm bg-light" >
          <Card.Title style={{marginLeft:'20px', marginTop:'11px'}}>Latest Applications</Card.Title>
            <Card.Body>
             <LatestApplications />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm bg-light" >
            <Card.Body className="bg-light">
              <Card.Title>Activity</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-light">Dobrick published an article 2 hours ago</ListGroup.Item>
                <ListGroup.Item className="bg-light">Stella created an event 2 hours ago</ListGroup.Item>
                <ListGroup.Item className="bg-light">Peter submitted the reports 2 hours ago</ListGroup.Item>
                <ListGroup.Item className="bg-light">Natella updated the docs 2 hours ago</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;
