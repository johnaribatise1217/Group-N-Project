import { ChangeEvent, FormEvent, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {auth} from '../../firebase/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate} from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    level: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const successNotify = (message: string) => toast.success(message)
  const failureNotify = (message : string) => toast.error(message)

  const handleRegister = async(e: FormEvent) => {
    e.preventDefault()
    localStorage.setItem("firstname", formData.firstName)
    localStorage.setItem("lastname", formData.lastName)
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      if(userCredential && userCredential.user){
        localStorage.setItem("isLoggedIn", "false");
        successNotify("user account created successfully")
        //navigate to the login page after 
        setTimeout(()=> {
          navigate("/auth/login")
        }, 3000)
      }
    } catch(error : any){
      console.log(error)
      failureNotify("Error occurred, try again")
    }
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center mb-4">
            <h2 className="fw-semibold fs-3">Create an Account</h2>
            <p className="text-muted">Join GroupN-notes today</p>
          </div>

          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label className="fw-semibold">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label className="fw-semibold">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formDepartment">
                  <Form.Label className="fw-semibold">Department</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formLevel">
                  <Form.Label className="fw-semibold">Level</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button onClick={handleRegister} variant="primary" className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Link to="/auth/login" className="text-primary">
              Already have an account? Login here
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
