import React, { useRef, useEffect } from "react";
import "./header.css";
import { motion } from "framer-motion";
import logo from "../../assets/images/eco-logo.png";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Container, Row } from "reactstrap";
import userIcon from "../../assets/images/user-icon.png";
import { useSelector } from "react-redux";

// import useAuth from "../../custom-hooks/useAuth";
// import { signOut } from "firebase/auth";
// import { auth } from "../../firebase.config";

import {toast} from 'react-toastify'


const nav__link = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  // {
  //   path: "cart",
  //   display: "Cart",
  // },
];

const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionRef = useRef(null);
  

  const menuRef = useRef(null);
  const navigate = useNavigate();



  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__menu");
      } else {
        headerRef.current.classList.remove("sticky__menu");
      }
    });
  };


  
  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const navigateToCart = () => {
    navigate("./cart");
  };

  const toggleProfileActions = () =>   
 {  
  const profileActions = profileActionRef.current;
  profileActions.style.display = profileActions.style.display === "none" ? "block" : "none";
 }

   
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img className="logo-img" src={logo} alt="logo" />
              <div>
                <h1><i>Buyorsell.com</i></h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__link.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
             
              <span className="cart__icon" onClick={navigateToCart}>
                <i class="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

             
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i class="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

//   <li className="nav__item">
//     <NavLink to='shop'>Shop</NavLink>
//   </li>
//  <li className="nav__item">
//   <NavLink to='cart'>Cart</NavLink>
//  </li>
