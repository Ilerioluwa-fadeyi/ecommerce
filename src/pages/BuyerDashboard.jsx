import React, { useState, useEffect } from "react";
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-immg.png";

import "../styles/buyer.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../assets/data/products";


import ProductsList from "../components/UI/ProductsList";

import counterImg from "../assets/images/counter-timer-img.png";

import Clock from "../components/UI/Clock";

const BuyerDashboard = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
  
    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );
    const filteredPopularProducts = products.filter(
      (item) => item.category === "skincare"
    );

    setBestSalesProducts(filteredBestSalesProducts);
    setPopularProducts(filteredPopularProducts);
  }, []);
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
              <h2 className="section__title">Pouplar in Category</h2>
            </Col>
            <ProductsList data={popularProducts} />
          </Row>
        </Container>
      </section>
                </div>
   
  );
};

export default BuyerDashboard;
