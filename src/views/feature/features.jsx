import React from 'react';
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from '../../components/footer/footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCompass, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faLock,faShield ,faPhone , faUser,faCircleCheck  } from "@fortawesome/free-solid-svg-icons";


import { Container, Row, Col, Form, Button,Tabs,Tab } from 'react-bootstrap';

const Features = () => {
  return (
    <>
       <div className="features-banner">
          <UnifiedHeader />
          <Container >
          <Row className="align-items-center ">
            <Col md={6}>
              <div className="banner-content">
              <h2 className="text-3xl font-bold mb-2">A <span>modern recruiting</span> platform with a built-in hiring 
                  <span className="text-blue-500"> <br/>marketplace</span>
                </h2>
              <p className='mb-5'>Earn cash rewards on every placement</p>
                  <a href="#" className=''>Get An Account</a>
                 
              </div>
            </Col>
            <Col
              md={6}
              className="black-side"

            ></Col>
          </Row>
        </Container>
      </div>
    
      <div className="bostbus">
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 mt-5'>
             <div className="bostbus-head text-center">
              <h3>Built with <span>recruiter</span> and <span>staffing agency</span> success in mind</h3>
              </div>
            </div>
          </div>
          <div className="row justify-items-center">
           <div className="col-md-1"></div>
           <div className="col-md-10">
          <div className="row">
          <div className="col-md-6">
              <div className="bostbox">
                <h4><img src="assets/images/feature/icon/hiring.png" width={'35px'} alt="" />Hiring Marketplace</h4>
             <p>Grow your business with instant access to the Xhirez hiring marketplace where clients post open positions--and you can too, especially if you'd like extra support recruiting for hard-to-find roles. Showcase your capabilities to new clients and get support on your own roles whenever needed</p>
                    </div>
            </div>
            <div className="col-md-6">
              <div className="bostbox">
                <h4><img src="assets/images/feature/icon/performing.png" width={'35px'} alt="" />Performance Tracking</h4>
         <p>Access reports that track your recruiters' activities, progress, and performance as well as your agency's overall success</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bostbox">
                <h4><img src="assets/images/feature/icon/reqution.png" width={'35px'} alt="" />Requisition Management</h4>
        <p>SetSet up your agency profile, manage your brand, and invite team members. You can also set up teams, manage recruiter account access-levels, and track individual performance</p>
               </div>
            </div>
            <div className="col-md-6">
              <div className="bostbox">
                <h4><img src="assets/images/feature/icon/recruiter.png" width={'35px'} alt="" />Recruitment Marketing</h4>
          <p>Empower every recruiter to market and promote the jobs you're working on with built-in social marketing features.</p>
               </div>
            </div>
            <div className="col-md-6">
              <div className="bostbox">
                <h4><img src="assets/images/feature/icon/applicant.png" width={'35px'} alt="" />Applicant Tracking</h4>
          <p>Track every candidate submission during the entire hiring lifecycle. ransparent workflows that reflect each employer's hiring process give you visibility on every candidate's progress and allow you to interact with stakeholders as needed throughout the hiring process</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bostbox">
                <h4><img src="assets/images/feature/icon/talent.png" width={'35px'} alt="" />Talent Pools</h4>
             <p>Organize your candidate pools with tags, keep your teams up-to-date with notes, set follow-up reminders, and schedule interviews. Plus. our smart algorithms will notify you when your candidates match a new job opening in the hiring marketplace.</p>
               </div>
            </div>
            <div className="col-md-6">
              <div className="bostbox">
                <h4><img src="assets/images/feature/icon/employee.png" width={'35px'} alt="" />Employee Management</h4>
        <p>Xhiez can help agencies that require full employee management. including candidate onboarding, offer management. Employer of Record services, payroll, and compliance.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bostbox">
                <h4><img src="assets/images/feature/icon/collabration.png" width={'35px'} alt="" />Communication and Collaboration</h4>
             <p>Manage all your correspondence with your recruiting team members, hiring managers and candidates from one central place with our messaging system. Followup with hiring managers on candidates. schedule interviews, take notes, tag stakeholders in comments and more</p>
              </div>
            </div>
          </div>
           </div>
           <div className="col-md-1"></div>
            
          </div>
        </div>
      </div>
      <div className="requestaccess">
        <div className="container">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-4">
            <div className="d-flex justify-content-center  align-items-center  bg-light">
      <div className="bg-white business-form p-4 shadow rounded w-100">
        {/* Main Title */}
        <h1 className="text-center mb-4">Request Access</h1>
        
        {/* Form */}
        <Form>
          {/* Full Name */}
          <Form.Group className="mb-3" controlId="formFullName">
            
            <div className="d-flex align-items-center">
              <Form.Control type="text" placeholder="full name" />
              <FontAwesomeIcon
                      icon={faUser}
                      size="1x"
                     style={{ position: 'absolute', right: '10px', top: '35%', color: '#bfbfbf' }} 
                    />
            </div>
          </Form.Group>

          {/* Business Email */}
          <Form.Group className="mb-3" controlId="formBusinessEmail">
           
            <Form.Control type="email" placeholder="Enter your business email" />
            <FontAwesomeIcon icon={faEnvelope} size="1x" style={{ position: 'absolute', right: '10px', top: '35%', color: '#bfbfbf' }} />

          </Form.Group>

          {/* Phone Number */}
          <Form.Group className="mb-3" controlId="formPhoneNumber">
           
            <Form.Control type="text" placeholder="phone number" />
            <FontAwesomeIcon icon={faPhone } size="1x" style={{ position: 'absolute', right: '10px', top: '35%', color: '#bfbfbf' }} />

          </Form.Group>

          {/* Company Name */}
          <Form.Group className="mb-3" controlId="formCompanyName">
           
            <Form.Control type="text" placeholder="Enter your company name" />
            <FontAwesomeIcon icon={faShield  } size="1x" style={{ position: 'absolute', right: '10px', top: '35%', color: '#bfbfbf' }} />

          </Form.Group>

          {/* Tell Us What You Do */}
          <Form.Group className="mb-3" controlId="formWhatYouDo">
           
            <Form.Control type="text" placeholder="Describe what you do" />
            <FontAwesomeIcon icon={faCircleCheck } size="1x" style={{ position: 'absolute', right: '10px', top: '35%', color: '#bfbfbf' }} />

          </Form.Group>

          {/* Regions You’re Looking to Hire */}
          <Form.Group className="mb-3">   <div className="d-flex flex-column">
              <Form.Check type="checkbox" label="I confirm that I am representative of the organization who is legally authorized to sign the agreement on behalf of the organization" />
             
            </div>
          </Form.Group>

          {/* Submit Button */}
          <div className="btn-form text-center">
          <Button variant="primary" type="submit"  className=''>
            Request Access
          </Button>
          </div>
        </Form>
      </div>
    </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-6 d-flex justify-content-center align-items-center ">
              <img src="assets/images/feature/form-side.jpg" width={'100%'} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
            
      <Footer />
        </div>
        <div className="col-md-1"></div>
      </div>
      </div>
    </>
  );
};

export default Features ;
