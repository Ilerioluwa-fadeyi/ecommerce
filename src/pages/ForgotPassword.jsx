import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { useFormik } from 'formik';
import { ForgotPaswordValidations } from '../validation';
import { forgotPassword, LoginUser } from '../api';
import { authActions } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async(values,resetForm) => {
    setLoading(true);
    await forgotPassword(values.email).then(response => {
        if(response?.message){
            setLoading(false);
            toast.success('Kindly check your email for further instructions')
            return resetForm()
        }
        setLoading(false);
    })
  }

  const { handleChange, handleSubmit, handleBlur, values, errors, touched, setFieldValue, resetForm } =
    useFormik({
      validationSchema: ForgotPaswordValidations,
      initialValues: {
        email: ""
      },
      onSubmit: () => handleClick(values,resetForm),
      onReset: () => null
  });

  return (
    <Helmet title="Log In">
      <section className="">
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Forgot Password</h3>
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
                <button type="submit" className="buy__button login__btn " disabled={loading}>
                  Submit
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

export default ForgotPassword;