import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { useFormik } from 'formik';
import { LoginValidations } from '../validation';
import { LoginUser } from '../api';
import { authActions } from '../redux/slices/authSlice';

const Login = () => {
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async(values) => {
    setLoading(true);
    const payload = {
        email: values.email,
        password: values.password
    };
    await LoginUser(payload).then(response => {
        if(response?.token){
            setLoading(false);
            // setProfileData({...response?.user})
            localStorage.setItem("_et_", response?.token);
            dispatch(authActions.logUserIn(response?.user));
            return navigate("/home");;
        }
        setLoading(false);
    })
  }

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
                <button type="submit" className="buy__button login__btn " disabled={loading}>
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
