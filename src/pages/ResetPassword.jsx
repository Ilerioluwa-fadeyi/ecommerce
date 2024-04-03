import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import '../styles/login.css';
import { useFormik } from 'formik';
import { ResetPasswordValidations } from '../validation';
import { resetPassword } from '../api';
import { authActions } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathName = useLocation().search;
  const handleClick = async(values,resetForm) => {
    setLoading(true);
    const payload = {
        token: pathName.replace("?token=",""),
        password: values.password,
    };
    await resetPassword(payload).then(response => {
        if(response?.message){
            setLoading(false);
            toast.success("Password reset successful")
            resetForm();
            return navigate("/");;
        }
        setLoading(false);
    })
  }

  const { handleChange, handleSubmit, handleBlur, values, errors, touched, setFieldValue, isValid,resetForm } =
    useFormik({
      validationSchema: ResetPasswordValidations,
      initialValues: {
        password: "",
        confirm_password: "",
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
              <h3 className="fw-bold mb-4">Reset Password</h3>
              <Form className="form_container" onSubmit={handleSubmit}>
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
                    placeholder="Enter your Password"
                    value={values.confirm_password}
                    onChange={handleChange("confirm_password")}
                  />
                  {errors.confirm_password && (<p className='errors'>{errors.confirm_password}</p>)}
                </FormGroup>
                <button type="submit" className="buy__button login__btn " disabled={loading}>
                  Reset
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ResetPassword;