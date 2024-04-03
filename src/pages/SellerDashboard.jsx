import React, { useState } from 'react';
import {useDispatch,useSelector} from "react-redux";
import products, {addProduct} from "../assets/data/products";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import "../styles/seller.css";
import FileUploadInput from '../components/FileUploadInput';
import { CreateProduct } from '../api';
import { productActions } from '../redux/slices/productSlice';

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.auth.profile);
  const [Loading, setLoading] = useState(false);
  const [File, setFile] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    shortDesc: '',
    category: '',
    quantity: '',
    imageFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleClick = async () => {
    if(userProfile?.user_type !== "Level 2"){
      return toast.error("User does not have required permission!")
    }
    setLoading(true);
    const payload = {
        name: formData.productName,
        price: parseInt(formData.price),
        quantity: parseInt(formData.quantity),
        description: formData.shortDesc,
        category: formData.category,
        photo: formData.imageFile,
    };
    await CreateProduct(payload).then(response => {
        if(response?.data){
            setLoading(false);
            // dispatch(productActions.addProduct(response?.message));
            toast.success("Product added successfully");
            setFile(null);
            setProgresspercent(0);
            return setFormData({
              productName: '',
              price: '',
              shortDesc: '',
              category: '',
              quantity: 0,
              imageFile: null,
            });
        }
        setLoading(false);
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick();
  };
  return (
  

      <Helmet title='Sign Up'>
         <section className="">
        <Container>
          <Row>
            
              <Col lg="6" className='m-auto text-center'>
            <h3 className="fw-bold mb-4">Welcome Seller</h3>

              <Form className='seller-form' onSubmit={handleSubmit} >
                <FormGroup className='form__group'>
                  <input
                    type="text"
                    name="productName"
                    placeholder="Product Name"
                    value={formData.productName}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className='form__group'>
                  {/* <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                  /> */}
                  <select className='w-full p-2 rounded-sm outline-none' name='category' onChange={handleChange}>
                    <option value="">Select Category</option>
                    <option value="furniture">Furniture</option>
                    <option value="skincare">Skin Care</option>
                  </select>
                </FormGroup>

                <FormGroup className='form__group'>
                  <textarea
                    name="shortDesc"
                    placeholder="Short Description"
                    value={formData.shortDesc}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FileUploadInput
                  location="petProfile"
                  label="Upload Photo:"
                  name="photo"
                  handleChange={setFormData}
                  File={File}
                  setFile={setFile}
                  progresspercent={progresspercent}
                  setProgresspercent={setProgresspercent}
                />


                <button type='submit' disabled={!formData.category || !formData.price || !formData.productName || !formData.shortDesc || !formData.imageFile || !formData.quantity} className="buy__button seller__btn ">
                  Add Product
                </button> 
               
              </Form>

            </Col>
            
          </Row>
        </Container>
      </section>
   </Helmet>

  );
};

export default SellerDashboard;
