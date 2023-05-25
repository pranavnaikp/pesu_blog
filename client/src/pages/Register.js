import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Form onSubmit={handleSubmit} className="mt-5">
            <h4 className="text-center">Register</h4>

            <Form.Group className="mb-3" controlId="name">
              <Form.Control
                type="text"
                placeholder="Name"
                value={inputs.name}
                name="name"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                value={inputs.email}
                name="email"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={inputs.password}
                name="password"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="mb-3">
              Submit
            </Button>

            <Button
              variant="link"
              onClick={() => navigate("/login")}
              className="mb-3"
            >
              Already Registered? Please Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
