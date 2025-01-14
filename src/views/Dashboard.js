import React from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import ScrollableTable from "components/ScrollableTable/ScrollableTable";
import ScrollableTableWithDone from "components/ScrollableTable/ScrollableTableWithDone";
import Iframe from "components/IFrame/IFrame";

const email = "https://calendar.google.com/calendar/embed?src=" + encodeURI("limkongkiat768@gmail.com");
function Dashboard() {
  const meetingData = [
    {title: 'Library Project Discussion', start: "14:00", end: "15:00", organizer: "Boss"},
    {title: 'Test 1', start: "16:00", end: "17:00", organizer: "g"},
    {title: 'Test 2', start: "18:00", end: "19:00", organizer: "Boss"},
  ];
  const taskData = [
    {title: "Test 1", deadline: "abc", done: false},
    {title: "Test 2", deadline: "abc", done: false},
    {title: "Test 3", deadline: "abc", done: false},
    {title: "Test 4", deadline: "abc", done: false},
    {title: "Test 5", deadline: "abc", done: false},
    {title: "Test 6", deadline: "abc", done: false},
    {title: "Test 7", deadline: "abc", done: false},
    {title: "Test 8", deadline: "abc", done: false},
    {title: "Test 9", deadline: "abc", done: false},
    {title: "Test 10", deadline: "abc", done: false},
  ];

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Meetings</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <ScrollableTable data={meetingData}/>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Tasks</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <ScrollableTableWithDone data={taskData}/>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <iframe src={email} width="3000" height="600"/>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
