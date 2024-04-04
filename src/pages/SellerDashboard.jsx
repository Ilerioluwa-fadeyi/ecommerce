import React, { useState } from 'react';
import {useDispatch,useSelector} from "react-redux";
import { toast } from 'react-toastify';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import "../styles/seller.css";
import FileUploadInput from '../components/FileUploadInput';
import { CreateProduct, RegisterUser } from '../api';
import InputSelect from "../components/InputSelect";
import { productActions } from '../redux/slices/productSlice';
import { useFormik } from 'formik';

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

  const Change = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const createUser = async () => {
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

  const Submit = (e) => {
    e.preventDefault();
    createUser();
  };
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
  

      <Helmet title='Sign Up'>
         <section className="">
        <Container>
          <Row>
            
            <Col lg="6" className='m-auto text-center'>
              <h3 className="fw-bold mb-4">Create Product</h3>

              <Form className='seller-form' onSubmit={Submit} >
                <FormGroup className='form__group'>
                  <input
                    type="text"
                    name="productName"
                    placeholder="Product Name"
                    value={formData.productName}
                    onChange={Change}
                  />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={Change}
                  />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={Change}
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
                  <select className='w-full p-2 rounded-sm outline-none' name='category' onChange={Change}>
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
                    onChange={Change}
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
            {userProfile?.user_type === "Level 2" && (
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
            )}
            
          </Row>
        </Container>
      </section>
   </Helmet>

  );
};

export default SellerDashboard;
