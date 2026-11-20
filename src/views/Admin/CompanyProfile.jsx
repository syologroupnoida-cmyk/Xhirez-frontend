import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Nav, Form, Button } from 'react-bootstrap';
import { FileImage, Building, Briefcase, Users, Lock, LogOut, Trash2, Plus, FileText } from 'lucide-react';

const CompanyProfile = () => {
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };
  const [formData, setFormData] = useState({
    companyName: 'WiproLimited',
    email: 'WiproLimited888@gmail.com',
    phone: '+90 587 656 56 32',
    website: 'www.careerjet.com',
    estSince: '22/05/2010',
    teamSize: '50-100',
    categories: '',
    allowSearch: 'Yes',
    aboutCompany: 'Wipro Ltd is a leading India based provider of IT Services, including Business Process Outsourcing (BPO) services, globally... The company provides the integrated business, technology and process solution on a global delivery platform to customers across Americas, Europe, Middle East and Asia Pacific.',
    facebook: '#',
    twitter: '#',
    linkedin: '#',
    googlePlus: '#',
    country: 'United Kingdom',
    city: 'London',
    fullAddress: 'London, United Kingdom',
    latitude: '51.5073509',
    longitude: '-0.12775829999999223',
    zoom: '16'
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={11}>
          
              <div className="d-flex justify-content-between align-items-center mb-4">
               
                
                {/* Image Upload Section */}
             
                  <Col md={3}>
                  <h6 className="mb-3 fw-bold">Company Profile</h6>

                    <div className="position-relative" style={{ width: '150px', height: '150px' }}>
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="img-fluid border rounded"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center bg-white border rounded"
                             style={{ width: '100%', height: '100%' }}>
                          <FileImage size={40} className="text-muted" />
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md={9} className="d-flex align-items-center">
                    <div>
                      <Button 
                        variant="info" 
                        className="text-white mb-2" 
                        size="md"
                        style={{width: '150px'}}
                        onClick={handleBrowseClick}
                      >
                        Browse
                      </Button>
                      <Form.Control
                        ref={fileInputRef}
                        type="file"
                        className="d-none"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </div>
                  </Col>
              </div>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Website</Form.Label>
                      <Form.Control
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Est. Since</Form.Label>
                      <Form.Control
                        type="text"
                        name="estSince"
                        value={formData.estSince}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Team Size</Form.Label>
                      <Form.Select
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleInputChange}
                      >
                        <option>50-100</option>
                        <option>100-500</option>
                        <option>500+</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Categories</Form.Label>
                      <Form.Select
                        name="categories"
                        value={formData.categories}
                        onChange={handleInputChange}
                      >
                        <option>Nothing selected</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Allow in Search & Listing</Form.Label>
                      <Form.Select
                        name="allowSearch"
                        value={formData.allowSearch}
                        onChange={handleInputChange}
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>About Company</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="aboutCompany"
                    value={formData.aboutCompany}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <h6 className="mb-3">Social Network</h6>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Facebook</Form.Label>
                      <Form.Control
                        type="text"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Twitter</Form.Label>
                      <Form.Control
                        type="text"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>LinkedIn</Form.Label>
                      <Form.Control
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Google Plus</Form.Label>
                      <Form.Control
                        type="text"
                        name="googlePlus"
                        value={formData.googlePlus}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h6 className="mb-3">Contact Information</h6>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                      >
                        <option>United Kingdom</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      >
                        <option>London</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Full Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Row>
                  <Col md={4} className="mb-3">
                    <Form.Group>
                      <Form.Label>Latitude</Form.Label>
                      <Form.Control
                        type="text"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group>
                      <Form.Label>Longitude</Form.Label>
                      <Form.Control
                        type="text"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group>
                      <Form.Label>Zoom</Form.Label>
                      <Form.Control
                        type="text"
                        name="zoom"
                        value={formData.zoom}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div >
                <iframe
                    title="Google Maps"
                    src={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}&z=${formData.zoom}&output=embed`}
                    className="w-100"
                    style={{ height: '300px', border: 'none' }}
                    allowFullScreen
                    loading="lazy"
                ></iframe>
                </div>
              </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyProfile;