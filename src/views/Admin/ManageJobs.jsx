import React from 'react';
import { Container, Row, Col, Card, Nav, Button, Form, ListGroup } from 'react-bootstrap';
import { Building, Briefcase, MapPin, Calendar, Clock } from 'lucide-react';

const ManageJobs = () => {
  const jobStats = {
    jobsPosted: 2,
    applications: 3,
    activeJobs: 1
  };

  const jobs = [
    {
      title: "General Ledger Accountant",
      location: "RG40, Wokingham",
      created: "Dec 03, 2017",
      expiry: "Oct 22, 2018",
      applications: 17,
      status: "Inactive"
    },
    {
      title: "Financed Bank",
      location: "London, United Kingdom",
      created: "Dec 03, 2017",
      expiry: "Oct 22, 2018",
      applications: 14,
      status: "Active"
    },
    {
      title: "UX/UI Designer",
      location: "RG40, Wokingham",
      created: "Dec 03, 2017",
      expiry: "Oct 22, 2018",
      applications: 5,
      status: "Active"
    }
  ];

  return (
    <Container fluid className="p-4">
        <h7 className="mb-5">Manage Jobs</h7>

      <Row className="mb-4">
  <Col md={4}>
    <div className="d-flex align-items-center  p-3 rounded">
      <div className="bg-primary rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '50px', height: '50px' }}>
        <Briefcase size={24} color="white" />
      </div>
      <div>
        <small className="text-muted fw-bold">{jobStats.jobsPosted} Jobs Posted</small>
      </div>
    </div>
  </Col>
  <Col md={4}>
    <div className="d-flex align-items-center p-3 rounded">
      <div className="bg-success rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '50px', height: '50px' }}>
        <Building size={24} color="white" />
      </div>
      <div>
        <small className="text-muted fw-bold">{jobStats.applications} Applications</small>
      </div>
    </div>
  </Col>
  <Col md={4}>
    <div className="d-flex align-items-center p-3 rounded">
      <div className="bg-danger rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '50px', height: '50px' }}>
        <Briefcase size={24} color="white" />
      </div>
      <div>
        <small className="text-muted fw-bold">{jobStats.activeJobs} Active Jobs</small>
      </div>
    </div>
  </Col>
</Row>

              <br />

               
              {/* Search and Sort */}
              <Row className="mb-4">
              <Col md={3} lg={2}>
                <Form.Control
                    type="text"
                    placeholder="Search Jobs"
                    className="mb-2"
                />
                </Col>

                <Col md={6} style={{ display: 'flex', alignItems: 'center', marginLeft: '500px' , marginTop: '-70px'}}>
                <Form.Label className="ms-5">Sort By:</Form.Label>
                  <Form.Select style={{ width: '200px', display: 'inline-block' }} className='ms-2' >

                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Most Applications</option>
                  </Form.Select>
                </Col>
              </Row>

              {/* Jobs List */}
     
     
     
      <Row>
        {/* Main Content */}
        <Col md={12} lg={12} xl={12} sm={12} xs={12} style={{ flex: 1, padding: "20px", backgroundColor: "white"  }} className="responsive">
          <Card className="mb-4">
            <Card.Body style={{ height: "600px" }}>
                <Row>

                    <Col> <small> Job Title  </small></Col>
                    <Col style={{marginLeft:"170px"}}><small>Applications</small>  </Col>
                    <Col style={{marginRight:"190px"}}><small>Status</small></Col>
                </Row>
               
                <hr />
                {jobs.map((job, index) => (
                  <ListGroup.Item key={index} className="mb-3" style={{fontSize:"0.8rem"}}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <h6 className="mb-1">{job.title}</h6>
                        <small className="text-muted d-flex align-items-center">
                          <MapPin size={14} className="me-1" />
                          {job.location} <br />
                        </small>
                        Created: {job.created}  &nbsp;
                          Expiry: {job.expiry}
                      </Col>
                
                      <Col md={2} className='ms-5'>
                        <span className="d-block">{job.applications} Application(s)</span>
                      </Col>
                      <Col md={1}  className='ms-5'>
                        <span className={`badge ${job.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                          {job.status}
                        </span>
                      </Col>
                      <Col md={2} className='ms-5'>
                        <div className="d-flex gap-2">
                          <Button variant="outline-primary" size="sm">
                            <Building size={16} />
                          </Button>
                          <Button variant="outline-success" size="sm">
                            <Building size={16} />
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            <Building size={16} />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <hr />
                  </ListGroup.Item>
                ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageJobs;