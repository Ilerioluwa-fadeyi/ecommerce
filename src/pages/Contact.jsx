import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import "../styles/seller.css";
import { ContactFormValidations } from "../validation";
import { ContactForm } from "../api";

const Contact = () => {
  const [loading, setLoading] = useState(null);

  const handleClick = async(values,resetForm) => {
    setLoading(true);
    const payload = {
        email: values.email,
        message: values.message
    };
    await ContactForm(payload).then(response => {
        if(response?.message){
            setLoading(false);
            toast.success("Your message has been delivered successfully")
            return resetForm();
        }
        setLoading(false);
    })
  }

  const { handleChange, handleSubmit, handleBlur, values, errors, touched, setFieldValue, isValid, resetForm} =
    useFormik({
      validationSchema: ContactFormValidations,
      initialValues: {
        email: "",
        message: ""
      },
      onSubmit: () => handleClick(values,resetForm),
      onReset: () => null
  });

  return (
    <Helmet title="Sign Up">
      <section className="">
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Leave us a message</h3>

              <Form className="seller-form" onSubmit={handleSubmit} >
                <FormGroup className="form__group">
                  <input
                    type="email"
                    name="email" 
                    placeholder="Your Email"
                    value={values.email}
                    onChange={handleChange("email")}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <textarea 
                    name="message" 
                    placeholder="Message" 
                    value={values.message}
                    onChange={handleChange("message")}
                  />
                </FormGroup>

                <button type="submit" className="buy__button seller__btn " disabled={loading} >
                  Send Message
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
