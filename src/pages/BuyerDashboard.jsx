import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import heroImg from "../assets/images/hero-immg.png";

import "../styles/buyer.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../assets/data/products";


import ProductsList from "../components/UI/ProductsList";

import counterImg from "../assets/images/counter-timer-img.png";

import Clock from "../components/UI/Clock";
import { SignupValidations } from "../validation";
import InputSelect from "../components/InputSelect";
import { FetchProduct, RegisterUser } from "../api";

const BuyerDashboard = () => {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();

  const handleFetchProducts = async () => {
    await FetchProduct().then(response => {
      if(response?.data){
        const filteredBestSalesProducts = response?.data.filter(
          (item) => item.category === "furniture"
        );
        const filteredPopularProducts = products.filter(
          (item) => item.category === "skincare"
        );
    
        setBestSalesProducts(filteredBestSalesProducts);
        setPopularProducts(filteredPopularProducts);
      }
    })
    return 
  }

  useEffect(() => {
    handleFetchProducts();
  }, []);

  const handleClick = async (values,resetForm) => {
    setLoading(true);
    let payload = {
      full_name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      password: values.password,
      user_type: values.category,
      state: values.state,
      city: values.city,
    }
    await RegisterUser(payload).then(response => {
        if(response.data){
            setLoading(false);
            toast.success('User profile created successfully')
            return resetForm();
        }
        toast.error("Something went wrong")
        setLoading(false);
    })
  }

  const { handleChange, handleSubmit, handleBlur, values, errors, touched, setFieldValue, setFieldTouched,resetForm } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        state: "",
        user_type: "",
        password: "",
        confirm_password: ""
      },
      onSubmit: () => handleClick(values,resetForm),
      onReset: () => null
  });
  return (
    <div>

      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
               
                <h2>Welcome to Buy or Sell! Knock yourself out</h2>
            
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

  
     
      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            <ProductsList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__button store__btn"
                >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>

            <Col lg="6" md="12" className="text-end counter__img">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

     

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Popular in Category</h2>
            </Col>
            <ProductsList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>
      <Col lg="6" className='m-auto text-center mb-4'>
        <h3 className="fw-bold mb-4">Add User</h3>
        <Form id="add_user" className="form_container" onSubmit={handleSubmit}>
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
            <InputSelect
                placeholder="Select Role"
                name="sex"
                data={[{value: "Level 2", label: "Super Admin"},{value: "Level 1", label: "Admin"}]}
                value={values.category}
                onChange={(selected) => setFieldValue("category", selected?.value)}
                onBlur={setFieldTouched}
                error={errors.category}
                touched={touched.category}
            />
            {errors.category && (<p className='errors'>{errors.category}</p>)}
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
          <button type="submit" className="buy__button login__btn " disabled={Loading}>
            Add
          </button>
        </Form>
      </Col>
    </div>
  );
};

export default BuyerDashboard;
