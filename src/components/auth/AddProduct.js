import { useFormik } from "formik";
import React, { useState } from "react";
import productSchema from "../../validators/productSchema";
import swal from 'sweetalert';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from '../CustomLoader'
import axios from "axios";
import { BACK_END_BASE_URL } from "../../config";
const initialStatus = {
  name: "",
  price: "",
  size: "",
  category: "",
  description: "",
  image: "",
};

const AddProduct = () => {
  const [isimage, setIsImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const {
    values,
    errors,
    setFieldValue,    
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialStatus,
    validationSchema: productSchema,
    onSubmit: (values, action) => {
      setLoader(true)
      productHandler(values, action);
      action.resetForm();
    },
  });  
  function productHandler(data, action){
    const access_token = window.localStorage.getItem("access_token");
    if(access_token){
      const formData = new FormData();
      formData.append('image', data.image);
      delete values.image;
      formData.append('data', JSON.stringify(values));
      axios.post(`${BACK_END_BASE_URL}/products`, formData , { headers: { authorization: access_token } })
        .then(function (response) {
            if(response.data) {
              setLoader(false)
            swal("Product Added Successfully");
          }
        })
        .catch(function (error) {
          setLoader(false)
          swal(error.response.data.message);
        })}
    }
    return (
    <>
     {loader ?
     <>
        <CustomLoader/>     
     </>
     :
     <>
      {/* <!-- Page content--> */}
      <section className="py-5">
        <div className="container px-5">
          {/* <!-- Contact form--> */}
          <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
            <div className="text-center mb-5">
              <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                <i className="bi bi-envelope"></i>
              </div>
              <h1 className="fw-bolder">Add Product</h1>
            </div>
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-8 col-xl-6 mb-3 order-2 order-2">
                <form id="contactForm" onSubmit={handleSubmit}>
                  {/* <!-- Name input--> */}
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="name123"
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="name123">Name</label>
                    <p className="text-danger">
                      {errors && touched.name ? errors.name : null}
                    </p>
                  </div>
                  {/* <!-- Email address input--> */}
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="price"
                      type="text"
                      autoComplete="off"
                      placeholder="name@example.com"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="price">Price</label>
                    <p className="text-danger">
                      {errors && touched.price ? errors.price : null}
                    </p>
                  </div>
                  {/* <!-- Password input--> */}
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="size"
                      type="text"
                      placeholder="Size"
                      autoComplete="off"
                      name="size"
                      value={values.size}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="size">Size</label>
                    <p className="text-danger">
                      {errors && touched.size ? errors.size : null}
                    </p>
                  </div>
                  {/* <!-- category input--> */}
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="category"
                      type="text"
                      placeholder="category"
                      autoComplete="off"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="size">category</label>
                    <p className="text-danger">
                      {errors && touched.category ? errors.category : null}
                    </p>
                  </div>
                  {/* <!-- description input--> */}
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      id="description"
                      type="text"
                      placeholder="Description"
                      style={{ height: "10rem" }}
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                    <label htmlFor="description">Description</label>
                    <p className="text-danger">
                      {errors && touched.description
                        ? errors.description
                        : null}
                    </p>
                  </div>
                  {/* <!-- image input--> */}
                  <div className="form-floating mb-3">
                    <div>
                      {/* <label for="formFileLg" className="form-label">Large file input example</label> */}
                      <input
                        className="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        name="image"
                      onChange={(e)=>{
                        setIsImage(URL.createObjectURL(e.target.files[0]));
                        setFieldValue('image', e.target.files[0])
                      }}
                      onBlur={handleBlur}
                      />
                    </div>
                    <p className="text-danger">
                      {errors && touched.image ? errors.image : null}
                    </p>
                  </div>

                  {/* <!-- Submit Button--> */}
                  <div className="d-grid">
                    <button
                      className="btn btn-dark btn-lg"
                      id="submitButton"
                      type="submit"
                    >
                      ADD Product
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-lg-8 col-xl-6 mb-3">
               {
                isimage?
               <img className="rounded  border border-1 " src={isimage} alt="product image" style={{width:'100%', height:'100%'}} />
                :
               <img className="rounded  border border-1 " src="images/default.jpg" alt="product image" style={{width:'100%', height:'100%'}} />
               }
              </div>
            </div>            
          </div>
        </div>
      </section>
     </>

     }
    </>
  );
};

export default AddProduct;
