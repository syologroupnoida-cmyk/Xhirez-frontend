import React, { useState } from 'react';
import { Container, Row, Col, Button, Form as BootstrapForm } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaBriefcase } from 'react-icons/fa';

// Reusable Progress Card Component
const ProgressCard = ({ label }) => {
  return (
    <Col xs={3} className="text-center mb-4">
      <div style={{ width: '100px', height: '100px', position: 'relative' }}>
        <CircularProgressbar
          value={100}
          text=""
          styles={buildStyles({
            textColor: 'black',
            pathColor: '#007bff',
            trailColor: '#d6d6d6',
          })}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <FaBriefcase size={30} color="#007bff" />
        </div>
      </div>
      <small className="d-block mt-2">{label}</small>
    </Col>
  );
};

// Main PostJobForm Component
const PostJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    applicationDeadline: '',
    emailAddress: '',
    username: '',
    jobType: 'Basic',
    specialisms: '',
    offeredSalary: '25-30 K',
    careerLevel: '45-85 K',
    experience: '1 Year to 2 Year',
    gender: 'Male',
    industry: 'Industry1',
    qualification: 'Qualification1',
    country: 'UK',
    city: 'Birmingham',
    fullAddress: '',
    latitude: '51.5073509',
    longitude: '-0.12775829999998223',
    zoom: 16,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation example
    if (formData.jobTitle && formData.jobDescription && formData.emailAddress) {
      console.log('Form submitted:', formData);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <Container className="py-4">
      <h4 className="mb-4">Post a New Job</h4>
      <Row className="mb-4 justify-content-center">
        <ProgressCard label="Job Posted 1" />
        <ProgressCard label="Applications 3" />
        <ProgressCard label="Active Job 1" />
      </Row>

<BootstrapForm onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
  <Row className="g-3">
    <Col md={6}>
      <BootstrapForm.Group controlId="jobTitle">
        <BootstrapForm.Label>Job Title</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="UX/UI Designer"
          required
        />
      </BootstrapForm.Group>
    </Col>

    <Col md={6}>
      <BootstrapForm.Group controlId="jobDescription">
        <BootstrapForm.Label>Job Description</BootstrapForm.Label>
        <BootstrapForm.Control
          as="textarea"
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          rows="4"
          required
        />
      </BootstrapForm.Group>
    </Col>

    <Col md={6}>
      <BootstrapForm.Group controlId="applicationDeadline">
        <BootstrapForm.Label>Application Deadline Date</BootstrapForm.Label>
        <BootstrapForm.Control
          type="date"
          name="applicationDeadline"
          value={formData.applicationDeadline}
          onChange={handleChange}
          required
        />
      </BootstrapForm.Group>
    </Col>

    <Col md={6}>
      <BootstrapForm.Group controlId="emailAddress">
        <BootstrapForm.Label>Email Address</BootstrapForm.Label>
        <BootstrapForm.Control
          type="email"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
          required
        />
      </BootstrapForm.Group>
    </Col>

    <Col md={6}>
      <BootstrapForm.Group controlId="username">
        <BootstrapForm.Label>Username</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </BootstrapForm.Group>
    </Col>

    <Col md={6}>
      <BootstrapForm.Group controlId="jobType">
        <BootstrapForm.Label>Job Type</BootstrapForm.Label>
        <BootstrapForm.Control
          as="select"
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          required
        >
          <option value="">Select Job Type</option>
          <option value="Basic">Basic</option>
          <option value="Advanced">Advanced</option>
        </BootstrapForm.Control>
      </BootstrapForm.Group>
    </Col>

    <Col md={6}>
      <BootstrapForm.Group controlId="specialisms">
        <BootstrapForm.Label>Specialisms</BootstrapForm.Label>
        <BootstrapForm.Control
          as="select"
          name="specialisms"
          value={formData.specialisms}
          onChange={handleChange}
        >
          <option value="">Nothing selected</option>
          {/* Add other options here */}
        </BootstrapForm.Control>
      </BootstrapForm.Group>
    </Col>

    <Col md={6}>
      <BootstrapForm.Group controlId="offeredSalary">
        <BootstrapForm.Label>Offered Salary</BootstrapForm.Label>
        <BootstrapForm.Control
          as="select"
          name="offeredSalary"
          value={formData.offeredSalary}
          onChange={handleChange}
          required
        >
          <option value="25-30 K">25-30 K</option>
          {/* Add other options here */}
        </BootstrapForm.Control>
      </BootstrapForm.Group>
    </Col>

    <Col md={6}>
      <BootstrapForm.Group controlId="careerLevel">
        <BootstrapForm.Label>Career Level</BootstrapForm.Label>
        <BootstrapForm.Control
          as="select"
          name="careerLevel"
          value={formData.careerLevel}
          onChange={handleChange}
          required
        >
          <option value="45-85 K">45-85 K</option>
          {/* Add other options here */}
        </BootstrapForm.Control>
      </BootstrapForm.Group>
    </Col>

    <Col md={6}>
      <BootstrapForm.Group controlId="experience">
        <BootstrapForm.Label>Experience</BootstrapForm.Label>
        <BootstrapForm.Control
          as="select"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        >
          <option value="1 Year to 2 Year">1 Year to 2 Year</option>
          {/* Add other options here */}
        </BootstrapForm.Control>
      </BootstrapForm.Group>
    </Col>

    <Col md={6}>
      <BootstrapForm.Group controlId="gender">
        <BootstrapForm.Label>Gender</BootstrapForm.Label>
        <BootstrapForm.Control
          as="select"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="Male">Male</option>
          {/* Add other options here */}
        </BootstrapForm.Control>
      </BootstrapForm.Group>
    </Col>

    <Col md={6}>
      <BootstrapForm.Group controlId="industry">
        <BootstrapForm.Label>Industry</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
        />
      </BootstrapForm.Group>
    </Col>

    <Col md={6}>
      <BootstrapForm.Group controlId="qualification">
        <BootstrapForm.Label>Qualification</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
        />
      </BootstrapForm.Group>
    </Col>

    <Col md={6}>
      <BootstrapForm.Group controlId="country">
        <BootstrapForm.Label>Country</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </BootstrapForm.Group>
    </Col>

    <Col md={6}>
      <BootstrapForm.Group controlId="city">
        <BootstrapForm.Label>City</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </BootstrapForm.Group>
    </Col>

    <Col md={12}>
      <BootstrapForm.Group controlId="fullAddress">
        <BootstrapForm.Label>Full Address</BootstrapForm.Label>
        <BootstrapForm.Control
          as="textarea"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleChange}
          rows="2"
        />
      </BootstrapForm.Group>
    </Col>

    <Col md={4}>
      <BootstrapForm.Group controlId="latitude">
        <BootstrapForm.Label>Latitude</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
        />
      </BootstrapForm.Group>
    </Col>

    <Col md={4}>
      <BootstrapForm.Group controlId="longitude">
        <BootstrapForm.Label>Longitude</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
        />
      </BootstrapForm.Group>
    </Col>

    <Col md={4}>
      <BootstrapForm.Group controlId="zoom">
        <BootstrapForm.Label>Zoom</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text"
          name="zoom"
          value={formData.zoom}
          onChange={handleChange}
        />
      </BootstrapForm.Group>
    </Col>
  </Row>

  {/* <div className="text-center mt-4">
    <Button type="submit" className="btn btn-primary">
      Submit
    </Button>
  </div> */}
</BootstrapForm>


      <div className="mt-4">
        <iframe
          title="Google Maps"
          src={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}&z=${formData.zoom}&output=embed`}
          className="w-100"
          style={{ height: '300px', border: 'none' }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </Container>
  );
};

export default PostJobForm;
