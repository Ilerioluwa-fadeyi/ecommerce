import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { useFormik } from 'formik';
import { LoginValidations } from '../validation';

const Login = () => {
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };


  const navigateToHome = () => {
    navigate("/home");
  };

  const { handleChange, handleSubmit, handleBlur, values, errors, touched, setFieldValue, isValid } =
    useFormik({
      validationSchema: LoginValidations,
      initialValues: {
        email: "",
        password: ""
      },
      onSubmit: () => handleClick(values),
      onReset: () => null
  });

  return (
    <Helmet title="Log In">
      <section className="">
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Login</h3>
              <Form className="form_container" onSubmit={handleSubmit}>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    value={values.email}
                    onChange={handleChange("email")}
                  />
                  {errors.email && (<p className='errors'>{errors.email}</p>)}
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    value={values.password}
                    onChange={handleChange("password")}
                  />
                  {errors.password && (<p className='errors'>{errors.password}</p>)}
                </FormGroup>
                <button type="submit" className="buy__button login__btn " onClick={navigateToHome}>
                  Login
                </button>
                <p> Don't have an account? <Link to="/signup">Create one here</Link> </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
