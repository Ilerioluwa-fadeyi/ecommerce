import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { useFormik } from 'formik';
import { SignupValidations } from '../validation';

const SignUp = () => {
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
      validationSchema: SignupValidations,
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        password: "",
        confirm_password: ""
      },
      onSubmit: () => handleClick(values),
      onReset: () => null
  });

  return (
    <Helmet title="Sign Up">
      <section className="">
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Sign Up</h3>
              <Form className="form_container" onSubmit={handleSubmit}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    value={values.firstName}
                    onChange={handleChange("firstName")}
                  />
                  {errors.firstName && (<p className='errors'>{errors.firstName}</p>)}
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    value={values.lastName}
                    onChange={handleChange("lastName")}
                  />
                  {errors.lastName && (<p className='errors'>{errors.lastName}</p>)}
                </FormGroup>
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
                    type="text"
                    placeholder="Enter your Address"
                    value={values.address}
                    onChange={handleChange("address")}
                  />
                  {errors.address && (<p className='errors'>{errors.address}</p>)}
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
                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Confirm your Password"
                    value={values.confirm_password}
                    onChange={handleChange("confirm_password")}
                  />
                  {errors.confirm_password && (<p className='errors'>{errors.confirm_password}</p>)}
                </FormGroup>
                <button type="submit" className="buy__button login__btn " onClick={navigateToHome}>
                  Register
                </button>
                <p> Remember your password? <Link to="/login">Log in here</Link> </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default SignUp;