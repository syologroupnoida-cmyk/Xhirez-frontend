import React, { useState } from 'react';
import { Form, Button, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AdminChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError('All fields are required!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New Password and Confirm Password do not match!');
      return;
    }

    setSuccess('Password changed successfully!');
    setError('');
    setTimeout(() => {
      setSuccess('');
    }, 2000);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <Row className="mb-4">
          <Col>
            <h6 className="">Change Password</h6>

            <hr />
          </Col>
        </Row>
        

        <Row className="mb-3">
          <Col md={4}>
            <Form.Label className="mb-0">Old Password</Form.Label>
          </Col>
          <Col md={4}>
            <InputGroup>
              <Form.Control
                type={showOldPassword ? 'text' : 'password'}
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <InputGroup.Text
                onClick={() => setShowOldPassword(!showOldPassword)}
                style={{ cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Label className="mb-0">New Password</Form.Label>
          </Col>
          <Col md={4}>
            <InputGroup>
              <Form.Control
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputGroup.Text
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{ cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Label className="mb-0">Confirm New Password</Form.Label>
          </Col>
          <Col md={4}>
            <InputGroup>
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputGroup.Text
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        {error && (
          <Row className="mb-3">
            <Col>
              <p className="text-danger text-center">{error}</p>
            </Col>
          </Row>
        )}
        {success && (
          <Row className="mb-3">
            <Col>
              <p className="text-success text-center">{success}</p>
            </Col>
          </Row>
        )}

        <Row>
          <Col className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Set Password
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AdminChangePassword;
