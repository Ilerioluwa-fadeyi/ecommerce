import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/seller.css";

const Contact = () => {
  return (
    <Helmet title="Sign Up">
      <section className="">
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Leave us a message</h3>

              <Form className="seller-form">
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="productName"
                    placeholder="Your Name"
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="productName"
                    placeholder="Your Email"
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <textarea name="shortDesc" placeholder="Message" />
                </FormGroup>

                <button type="submit" className="buy__button seller__btn ">
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
