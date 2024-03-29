import React from "react";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import CommonSection from '../components/UI/CommonSection';

import { useSelector } from "react-redux";

import "../styles/checkout.css";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />

      <Container>
        <Row>
          <Col lg="8" className="text-center">
            <h6 className="fw-bold mb-4">Billing Information</h6>
            <Form>
              <FormGroup className="form__group">
                <input type="text" placeholder="Enter your name" />
              </FormGroup>

              <FormGroup className="form__group">
                <input type="text" placeholder="Enter your Email" />
              </FormGroup>

              <FormGroup className="form__group">
                <input type="text" placeholder="Phone Number" />
              </FormGroup>

              <FormGroup className="form__group">
                <input type="text" placeholder="Address" />
              </FormGroup>

              <FormGroup className="form__group">
                <input type="text" placeholder="City" />
              </FormGroup>

              <FormGroup className="form__group">
                <input type="text" placeholder="Postal code" />
              </FormGroup>

              <FormGroup className="form__group">
                <input type="text" placeholder="Country" />
              </FormGroup>
            </Form>
          </Col>

          <Col lg="4" className="text-center">
            <div className="checkout__cart">
              <h6>
                Total Qty: <span>{totalQty} items</span>
              </h6>

              <h6>
                Subtotal: <span>${totalAmount}</span>
              </h6>

              <h6>
                <span>
                  Shipping:
                  <br />
                  free shipping{" "}
                </span>{" "}
                <span>$0</span>
              </h6>

              <h4>
                Total Cost: <span>${totalAmount}</span>
              </h4>
              <button className="buy__button login__btn w-100">
                Place an Order
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

export default Checkout;
