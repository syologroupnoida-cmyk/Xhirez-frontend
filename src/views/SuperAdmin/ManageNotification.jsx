import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
  Table,
} from "react-bootstrap";

const ManageNotification = () => {
  // State to manage notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  // State to manage user notification preferences (for Super Admin)
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: true, sms: false, push: true },
    { id: 2, name: "Jane Smith", email: false, sms: true, push: false },
    { id: 3, name: "Alex Johnson", email: true, sms: true, push: true },
  ]);

  // Handle change of notification settings for Super Admin users
  const handleUserChange = (userId, event) => {
    const { name, checked } = event.target;
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, [name]: checked } : user
      )
    );
  };

  // Handle save changes (just for demo purposes)
  const handleSaveChanges = () => {
    // In a real-world scenario, you would send this data to an API
    alert("Notification settings saved successfully!");
  };

  return (
    <Container fluid className="my-4">
      <h2 className="text-center mb-4">Manage Notifications for Users</h2>
      <Row>
        <Col md={8} className="offset-md-2">
          <Card>
            <Card.Body>
              <h5>Choose Your Notification Preferences</h5>
              <Form>
                <Form.Group controlId="emailNotification">
                  <Form.Check
                    type="checkbox"
                    label="Email Notifications"
                    name="email"
                    checked={notifications.email}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        email: e.target.checked,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="smsNotification">
                  <Form.Check
                    type="checkbox"
                    label="SMS Notifications"
                    name="sms"
                    checked={notifications.sms}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        sms: e.target.checked,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="pushNotification">
                  <Form.Check
                    type="checkbox"
                    label="Push Notifications"
                    name="push"
                    checked={notifications.push}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        push: e.target.checked,
                      })
                    }
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {/* User Notification Management Section */}
          <Card className="mt-4">
            <Card.Body>
              <h5>Manage Notifications for Users</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>SMS</th>
                    <th>Push</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          name="email"
                          checked={user.email}
                          onChange={(e) => handleUserChange(user.id, e)}
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          name="sms"
                          checked={user.sms}
                          onChange={(e) => handleUserChange(user.id, e)}
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          name="push"
                          checked={user.push}
                          onChange={(e) => handleUserChange(user.id, e)}
                        />
                      </td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() =>
                            alert(`Managing notifications for ${user.name}`)
                          }
                        >
                          Manage
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageNotification;
