import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New User Created:', { email, password });
    // Add sign-up logic here, such as Firebase or your backend API
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <div className="form-wrapper p-4 shadow">
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Create Account
              </Button>
            </Form>

            <p className="text-center mt-4">
              Already have an account?{' '}
              <a href="/login" className="text-primary">
                Login
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
