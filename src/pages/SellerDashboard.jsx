import React, { useState } from 'react';
import products, {addProduct} from "../assets/data/products";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/seller.css";

const SellerDashboard = () => {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    shortDesc: '',
    imageFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          imageUrl: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    const { imageFile, ...productData } = formData;
  
    // Example: Upload image file to server using FormData
    const formDataToSend = new FormData(); // Rename formData to avoid conflict
    formDataToSend.append('image', imageFile);
  
    // Example: Fetch API to send form data to server
    fetch('/api/uploadImage', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        // After image upload, add product with image URL to products array
        const addNewProduct = {
          ...productData,
          imgUrl: data.imageUrl, // Assuming server responds with image URL
        };
        addProduct(addNewProduct);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };
  

  return (
  

      <Helmet title='Sign Up'>
         <section className="">
        <Container>
          <Row>
            
              <Col lg="6" className='m-auto text-center'>
            <h3 className="fw-bold mb-4">Welcome Seller</h3>

              <Form className='seller-form' >
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
                  
        <textarea
          name="shortDesc"
          placeholder="Short Description"
          value={formData.shortDesc}
          onChange={handleChange}
        />
                </FormGroup>

                <FormGroup className='form__group'>
                <input
          type="file"
          accept="image/*"
          name="imageFile"
          onChange={handleChange}
        />
                </FormGroup>


                <button type='submit' className="buy__button seller__btn ">
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
