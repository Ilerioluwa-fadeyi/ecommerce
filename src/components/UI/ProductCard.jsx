import React from 'react'
// import productImg from '../../assets/images/arm-chair-01.jpg'
import {motion} from 'framer-motion'
import '../../styles/product-card.css'
import { Col } from 'reactstrap'
import { Link  } from 'react-router-dom'
import { toast } from 'react-toastify';


import { useDispatch } from 'react-redux'
import { cartActions } from '../../redux/slices/cartSlice'

const ProductCard = ({item }) => {

  const dispatch = useDispatch()

  const addToCart = () =>{
    dispatch(cartActions.addItem({
      id: item.id,
      productName: item.name,
      price: item.price,
      imgUrl: item.photo,
    })
    );
    toast.success('product added successfully')
  }

  return (
   <Col lg='3' md='4'>
   <div className="product__item">
    <div className="product__img">
    <motion.img whileHover={{scale:0.9}} src={item.photo} alt="" />
    </div>
   <div className='p-2 product__info'>
   <h3 className="product__name">
     <Link to={`/shop/${item.id }`}>{item.name}</Link>
    </h3>
    <span >{item.category}</span>
   </div>
    <div className="product__card-bottom d-flex align-items-center justify-content-between p-2 ">
      <span className="price">${item.price}</span>
      <motion.span whileTap={{scale:1.2}} onClick={addToCart}><i class="ri-add-line"></i></motion.span>
    </div>
   </div>
   </Col>
  )
}

export default ProductCard