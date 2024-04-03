import React,{useState} from "react";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import CommonSection from '../components/UI/CommonSection';

import { useSelector } from "react-redux";

import "../styles/checkout.css";
import { CreateOrder } from "../api";
import { useFormik } from "formik";

const Checkout = () => {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleClick = async (values,resetForm) => {
    const orderItems = cartItems.map(item => {return {id: item.id, quantity: item.quantity}})
    setLoading(true);
    const payload = {
        product: orderItems,
        card: values,
    };
    await CreateOrder(payload).then(response => {
        if(response?.message){
            setLoading(false);
            toast.success("Order Successful");
            resetForm();
            return navigate("/shop");;
        }
        setLoading(false);
    })
  }
  const { handleChange, handleSubmit, handleBlur, values, errors, touched, setFieldValue, isValid,resetForm } =
    useFormik({
      initialValues: {
        card_number: "", //123412341234
        cvv: "", //321
        exp_date: "" // 10/2026
      },
      onSubmit: () => handleClick(values,resetForm),
      onReset: () => null
  });

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />

      <Container>
        <Row>
          <Col lg="8" className="text-center">
            <h6 className="fw-bold mb-4">Billing Information</h6>
            <Form>
              <FormGroup className="form__group">
                <input
                    type="text" 
                    placeholder="Card Number"
                    value={values.card_number}
                    onChange={handleChange("card_number")}
                  />
              </FormGroup>

              <div className="flex gap-4">
                <FormGroup className="form__group">
                  <input 
                    type="text" 
                    placeholder="Expiry Date"
                    value={values.exp_date}
                    onChange={handleChange("exp_date")}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="text" 
                    placeholder="CVV"
                    value={values.cvv}
                    onChange={handleChange("cvv")}
                  />
                </FormGroup>
              </div>

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
              <button className="buy__button login__btn w-100" onClick={handleSubmit}>
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
