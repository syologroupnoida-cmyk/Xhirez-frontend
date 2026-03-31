import React from 'react';
import UnifiedHeader from '../../components/header/UnifiedHeader';
import Footer from '../../components/footer/footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCompass, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faLock,faShield ,faPhone , faUser,faCircleCheck  } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Form, Button,Tabs,Tab } from 'react-bootstrap';

const Agency = () => {
  return (
    <>
       <div className="agency-banner">
          <UnifiedHeader />
          <Container >
          <Row className="align-items-center ">
            <Col md={6}>
              <div className="banner-content">
              <h2 className="text-3xl font-bold mb-2">A new stream of 
                  <span className="text-blue-500">  opportunities <br/></span> 
                  at your <span className="text-blue-500">fingertips</span>
                </h2>
              <p>Connect your candidates to open positions in our hiring marketplace and earn rewards for every placement.</p>
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
              <h3>Join a network where <span>everyone prospers</span></h3>
              <p><strong><span>X</span>h<span>i</span>rez</strong> platform connects companies to recruitment professionals and candidates, creating economic <br/>opportunity for all members.</p>
             </div>
            </div>
          </div>
          <div className="row justify-items-center">
           <div className="col-md-1"></div>
           <div className="col-md-10">
          <div className="row">
          <div className="col-md-6">
              <div className="bostbox">
                <h4><img src="assets/images/foragency/icons/expand.png" width={'30px'} alt="" />Expand Your Funnel</h4>
              <p>Gain access to new job opportunities daily--with ZERO business development effort. Upon registration you have immediate access to the Crowdstaffing hiring marketplace.</p>
                  </div>
            </div>
            <div className="col-md-6">
              <div className="bostbox">
                <h4><img src="assets/images/foragency/icons/get.png" width={'30px'} alt="" />Get Rewards for Performance</h4>
          <p>Earn payments for every placement. The more you participate and the better you perform, the more job opportunities you will receive. plus, you can earn exclusive access to certain client opportunities</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bostbox">
                <h4><img src="assets/images/foragency/icons/moneti.png" width={'30px'} alt="" />Monetize Your Candidate Pool</h4>
          <p>Managing resumes, taking notes, and setting up appointments are standard in any applicant tracking system. But our tech goes a step further, bringing revenue opportunities directly to you and your recruiters.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bostbox">
                <h4><img src="assets/images/foragency/icons/enjoy.png" width={'30px'} alt="" />Enjoy Carefree Placements</h4>
          <p>Once a candidate gets hired, you get paid within 10 days of when we collect payment from the client. Crowdstaffing can also manage the Employer of Record services</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bostbox">
                <h4><img src="assets/images/foragency/icons/brand.png" width={'30px'} alt="" />Represent Your Brand</h4>
          <p>Every employer and candidate that you interact with is a potential champion for your brand. Because we understand the value of your brand we've ensured that you can: customize your URL.</p>
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
            Request Demo
          </Button>
          </div>
        </Form>
      </div>
    </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-6 d-flex justify-content-center align-items-center ">
              <img src="assets/images/foragency/form-side.jpg" width={'100%'} alt="" />
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

export default Agency ;
