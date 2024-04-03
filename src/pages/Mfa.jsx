import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { useFormik } from 'formik';
import { mfaCheck } from '../api';
import { authActions } from '../redux/slices/authSlice';

const Mfa = () => {
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async(values) => {
    setLoading(true);
    const payload = {
        code: values.otp,
    };
    await mfaCheck(payload).then(response => {
        if(response?.token){
            setLoading(false);
            localStorage.setItem("_et_",response?.token);
            dispatch(authActions.logUserIn(response?.user))
            dispatch(authActions.securityCheckPass());
            return navigate("/home");
        }
        setLoading(false);
    })
  }

  const { handleChange, handleSubmit, handleBlur, values, errors, touched, setFieldValue, isValid } =
    useFormik({
      initialValues: {
        otp: ""
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
              <h3 className="fw-bold mb-4">2FA Check</h3>
              <Form className="form_container" onSubmit={handleSubmit}>
                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Enter your OTP"
                    value={values.otp}
                    onChange={handleChange("otp")}
                  />
                  {errors.otp && (<p className='errors'>{errors.otp}</p>)}
                </FormGroup>
                <button type="submit" className="buy__button login__btn " disabled={loading}>
                  Submit
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Mfa;