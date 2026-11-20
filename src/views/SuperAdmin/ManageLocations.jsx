// ManageLocations.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ManageLocations = () => {
  const [locations, setLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Fetch locations from an API
  }, []);

  const handleAddLocation = () => {
    // Add location logic here
  };

  return (
    <div>
      <h3>Manage Locations</h3>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Location</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            <tr key={index}>
              <td>{location.id}</td>
              <td>{location.name}</td>
              <td>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter location name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddLocation}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageLocations;
