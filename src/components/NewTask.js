import React from "react";
import { useHistory } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

function NewTask() {
  const navigate = useHistory();
  const finishCreateTask = () => {
    navigate.push("/admin");
  };
  return (
    <>
      <Container fluid>
        <h2 className="mb-4">Create New Task</h2>
        <Form onSubmit={finishCreateTask}>
          <Row classname="mb-4">
            <Col className="pr-1" md="5">
              <Form.Group>
                <label>Task Description</label>
                <Form.Control
                  placeholder="Description"
                  type="text"
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row classname="mt-4 mb-4">
            <Col className="pr-1" md="6">
              <Form.Group>
                <label>Deadline</label>
                <Form.Control
                  type="text"
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          
          <Button
            className="btn-fill pull-right mt-4"
            type="submit"
            variant="info"
          >
            Create Task
          </Button>
          <div className="clearfix"></div>
        </Form>
      </Container>
    </>
  );
}

function NewTaskPage() {
  return (
    <>
      <div className="wrapper">
        {/* <Sidebar color={color} image={hasImage ? image : ""} routes={routes} /> */}
        <div className="main-panel">
          <AdminNavbar />
          <div className="content">
            <NewTask />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
export default NewTaskPage;