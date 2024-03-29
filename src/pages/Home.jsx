import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/betterbg.png";
import buyerImg from "../assets/images/buyer.png";
import sellerImg from "../assets/images/seller.png";

import "../styles/home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Home = () => {
  
  
  return (
      <div>

      <section className="hero__buyer">
        <Container>
          <Row>
            <Col lg="6" md="6">
            <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
              
            </Col>
            <Col lg="6" md="6">
            <div className="buyer__content1">
               
               <h2> Your One-Stop Shop for Everything</h2>
           
             </div>
            </Col>
          </Row>
        </Container>
      </section>

  
     
      <section className="hero__buyer">
        <Container>
          <Row>
            <Col lg="6" md="6">
            <div className="buyer__content">
               
               <h2> Are you someone that likes to buy unique treasures and everyday essentials? Explore our vast selection and discover your next favorite find!</h2>
               <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__button"
                >
                  <Link to="/buyerdashboard">Shop Now</Link>
                </motion.button>
             </div>
            </Col>
            <Col lg="6" md="6">
           

             <div className="hero__img">
                <img src={buyerImg} alt="" />
              </div>
              
            </Col>
          </Row>
        </Container>
      </section>

      <section className="hero__buyer">
        <Container>
          <Row>
            <Col lg="6" md="6">
            <div className="hero__img">
                <img src={sellerImg} alt="" />
              </div>
              
            </Col>
            <Col lg="6" md="6">
            <div className="buyer__content2">
               
               <h2> Are you someone that likes to sell goods and share your offerings with the world? Join our dynamic marketplace where every item has a story and every seller has a chance to shine!</h2>
               <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__button"
                >
                  <Link to="/sellerdashboard">Sell Now</Link>
                </motion.button>
             </div>
            </Col>
          </Row>
        </Container>
      </section>


     

         
     

     
                </div>
   
  );
};

export default Home;
