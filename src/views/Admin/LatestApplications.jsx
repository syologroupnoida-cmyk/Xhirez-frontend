import React from "react";
import { Card, Row, Col, Badge, Button, Container } from "react-bootstrap";

const LatestApplications = () => {
  const applications = [
    {
      name: "Rahim Malik",
      role: "App Designer",
      location: "Canada",
      rating: 4.5,
      verified: true,
    },
    {
      name: "Karam Kumar",
      role: "iOS Marketing Specialist",
      location: "India",
      rating: 4.5,
      verified: true,
    },
    {
      name: "Nateila John",
      role: "Front-End Developer",
      location: "USA",
      rating: 4.5,
      verified: true,
    },
  ];

  const RatingStars = ({ rating }) => {
    return (
      <div className="d-flex">
        {[...Array(5)].map((_, index) => (
          <i
            key={index}
            className={`bi bi-star${
              index < Math.floor(rating) ? "-fill" : ""
            } text-warning`}
          ></i>
        ))}
      </div>
    );
  };

  return (
      <Row className="g-3">
        {applications.map((application, index) => (
          <Col key={index} xs={12}>
            {/* User Info */}
            <div className="d-flex align-items-center mb-2">
              {/* Profile Icon */}
              <div className="me-3">
                <div className="position-relative">
                  <div
                    className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fs-5"
                    style={{ width: "40px", height: "40px" }}
                  >
                    {application.name.charAt(0)}
                  </div>
                  <Badge
                    bg="warning"
                    className="position-absolute bottom-0 end-0"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {application.rating}
                  </Badge>
                </div>
              </div>
              {/* User Details */}
              <div>
                <h6 className="mb-1">
                  {application.name}{" "}
                  {application.verified && (
                    <i className="bi bi-check-circle-fill text-primary"></i>
                  )}
                </h6>
                <p className="text-muted mb-0">{application.role}</p>
                <RatingStars rating={application.rating} />
              </div>
            </div>
            {/* Location and Hire Button */}
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                <i className="bi bi-geo-alt-fill me-1"></i>
                {application.location}
              </div>
              {/* Adjusted Hire button */}
              <Button
                variant="primary"
                size="sm"
                style={{ marginTop: "-100px", width:"100px" }} // Adjusted margin for alignment
              >
                Hire
              </Button>
            </div>
          </Col>
        ))}
      </Row>
  );
};

export default LatestApplications;
