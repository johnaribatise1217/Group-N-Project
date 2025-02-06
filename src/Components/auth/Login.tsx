import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase/firebase"
import React, {useState} from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = ({setIsLoggedIn}:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const successNotify = (message: string) => toast.success(message)
  const failureNotify = (message : string) => toast.error(message)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isLogggedIn = await signInWithEmailAndPassword(auth, email, password);
      if(isLogggedIn && isLogggedIn.user){
        const firstname = localStorage.getItem("firstname") || "User";
        const lastname = localStorage.getItem("lastname") || "";

        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true)
        successNotify(`Welcome back, ${firstname} ${lastname}`)
      }
      setTimeout(() => {
        navigate("/")  
      }, 3000)
    } catch (error) {
      failureNotify("incorrect credentials")
      console.log(error)
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center mb-4">
            <h2 className="fw-semibold fs-3">Continue with GroupN-notes</h2>
            <p className="text-muted">Login to your account</p>
          </div>

          <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="mt-3 mb-3">
              <Link to="/forgot-password" className="text-primary">
                Forgot password?
              </Link>
            </div>

            <Button variant="primary" onClick={handleLogin} className="w-100" type="submit">
              Sign In
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Link to="/auth/signup" className="text-primary">
              Don't have an account? Click here to create one
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login
