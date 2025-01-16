import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Row, Col, ListGroup, Alert } from "react-bootstrap";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";

function MeetingForm() {

  const navigate = useHistory();
  const finishCreateMeeting = () => {
    navigate.push("/admin");
  };

  // State to manage input fields
  const [meetingName, setMeetingName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // State to manage the list of attendees
  const [attendees, setAttendees] = useState([]);

  // State for validation feedback
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Validate inputs
    if (!name || !email) {
      setError("Both name and email are required.");
      return;
    }
    if (attendees.some((attendee) => attendee.email === email)) {
      setError("This email is already added to the meeting.");
      return;
    }

    // Add attendee and clear input fields
    setAttendees([...attendees, { name, email }]);
    setName("");
    setEmail("");
    setError("");
  };

  const handleCreateMeeting = () => {
    finishCreateMeeting();
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Create New Meeting</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="g-0">
        <Form onSubmit={handleCreateMeeting}>
          <Col md={6}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formMeetingName">
                  <Form.Label>Meeting Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Meeting Name"
                    value={meetingName}
                    onChange={(e) => setMeetingName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="startTime">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="Enter time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="endTime">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="Enter time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
            </Row>
            <Button variant="primary" type="submit">
              Create Meeting
            </Button>
          </Col>
        </Form>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Row><h4>Add people to the Meeting</h4></Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Add Person
            </Button>
            {/* <Button
            onClick={() => finishCreateMeeting()}>
            Create Meeting
          </Button> */}
            <h3 className="mt-4">Attendees</h3>
            {attendees.length === 0 ? (
              <p>No attendees added yet.</p>
            ) : (
              <ListGroup>
                {attendees.map((person, index) => (
                  <ListGroup.Item key={index}>
                    {person.name} ({person.email})
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

function NewMeetingPage() {
  return (
    <>
      <div className="wrapper">
        <div className="main-panel">
          <AdminNavbar />
          <div className="content">
            <MeetingForm />
          </div>
          <Footer>
          </Footer>
        </div>
      </div>
    </>
  );
}

export default NewMeetingPage;

