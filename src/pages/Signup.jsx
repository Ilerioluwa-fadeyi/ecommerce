import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { useFormik } from 'formik';
import { SignupValidations } from '../validation';
import { toast } from 'react-toastify';
import { RegisterUser } from '../api';

const SignUp = () => {
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const handleClick = async (values) => {
    setLoading(true);
    let payload = {
      full_name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      password: values.password,
      user_type: "Level 2",
      state: values.state,
      city: values.city,
    }
    await RegisterUser(payload).then(response => {
        if(response.data){
            setLoading(false);
            toast.success('User profile created successfully')
            return navigate("/");
        }
        toast.error("Something went wrong")
        setLoading(false);
    })
  }
  const { handleChange, handleSubmit, handleBlur, values, errors, touched, setFieldValue, isValid } =
    useFormik({
      validationSchema: SignupValidations,
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        state: "",
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
                    value={values.city}
                    onChange={handleChange("city")}
                  />
                  {errors.city && (<p className='errors'>{errors.city}</p>)}
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your State"
                    value={values.state}
                    onChange={handleChange("state")}
                  />
                  {errors.state && (<p className='errors'>{errors.state}</p>)}
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
                <button type="submit" className="buy__button login__btn ">
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