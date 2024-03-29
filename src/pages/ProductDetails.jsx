import React, { useState, useRef, useEffect } from "react";

import { useParams } from "react-router-dom";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from "reactstrap";

import products from "../assets/data/products";
import CommonSection from '../components/UI/CommonSection';

import "../styles/product-details.css";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProductsList";

import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();

  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const {
    imgUrl,
    productName,
    avgRating,
    price,
    reviews,
    description,
    shortDesc,
    category,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category);

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    console.log(reviewObj);
    toast.success("Review sent successfully");
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );

    toast.success("Product added successfully");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>

            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-3 mb-3">
                  <div className="">
                    <span>
                      <i class="ri-star-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-half-s-fill"></i>
                    </span>
                  </div>

                  <p>
                    (<span>{avgRating}</span> ratings)
                  </p>
                </div>

                <div className="d-flex align-items-center gap-3 ">
                  <span className="product__price">${price}</span>
                  <span>Category: {category.toUpperCase()}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>

                <motion.button
                  whileTap={{ scale: 1.1 }}
                  className="buy__button"
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="">
        <Container>
          <Row>
            <Col lg="12" className="">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : " "}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : " "}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({reviews.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {reviews?.map((item, index) => (
                        <li key={index} className="mb-4">
                          <h6>John doe</h6>
                          <span>{item.rating} (average rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="review__form">
                      <form action="" onSubmit={submitHandler}>
                        <h4>How would you rate this product? </h4>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            required
                            ref={reviewUser}
                          />
                        </div>

                        <div className="form__group d-flex align-items-center gap-3 rating__group">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1<i class="ri-star-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            2<i class="ri-star-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            3<i class="ri-star-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            4<i class="ri-star-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            5<i class="ri-star-fill"></i>
                          </motion.span>
                        </div>

                        <div className="form__group">
                          <textarea
                            rows={4}
                            type="text"
                            placeholder="Review Message..."
                            required
                            ref={reviewMsg}
                          />
                        </div>

                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="buy__button"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>

            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
