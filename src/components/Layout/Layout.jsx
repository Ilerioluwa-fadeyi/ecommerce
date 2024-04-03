import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import {useLocation,useNavigate} from 'react-router-dom'
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import Routers from "../../routes/Routers"

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const twofaStatus = useSelector((state) => state.auth.twofaStatus);

  useEffect(() => {
    // if(!twofaStatus && isLoggedIn) {
    //   navigate("/2fa");
    // } else if (isLoggedIn && location.pathname === "/login" || isLoggedIn && location.pathname === "/signup" || isLoggedIn && location.pathname === "/forgot-password" && location.pathname === "/reset-password"){
    //   navigate("/home");
    // } else if (!isLoggedIn){
    //   navigate('/');
    // }
  
  }, []);

  console.log('====================================');
  console.log(location);
  console.log('====================================');

  return <>
   <Header/>
    <div><Routers/></div>
    <Footer isLoggedIn={isLoggedIn} twofaStatus={twofaStatus} />
  </>
  
}

export default Layout