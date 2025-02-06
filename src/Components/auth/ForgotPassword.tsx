/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e : any) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center mb-4">
            <h2 className="fw-semibold fs-3">Forgot Password?</h2>
            <p className="text-muted">Enter your email to reset your password</p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Link to="/auth/login" className="text-primary">
              Back to Login
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
