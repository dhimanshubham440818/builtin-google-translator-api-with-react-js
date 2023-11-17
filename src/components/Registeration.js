import swal from 'sweetalert';
import axios from "axios";
import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import registerSchema from "../validators/registerSchema";
import { BACK_END_BASE_URL } from '../config';

const initialStatus = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Registeration = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialStatus,
      validationSchema: registerSchema,
      onSubmit: (values, action) => {
        registerHandler(values, action);

      },
    })

  function registerHandler(data, action) {
    axios.post(`${BACK_END_BASE_URL}/register`, data)
      .then(function (response) {
        if (response.data.status) {
          swal("Register Successfully");
          action.resetForm();
          navigate('/login');
        }
      })
      .catch(function (error) {
        swal(error.response.data.message);
      })
  }
  return (
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
              <h1 className="fw-bolder">Sing Up</h1>
            </div>
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-8 col-xl-6">
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
                      id="email"
                      type="email"
                      autoComplete="off"
                      placeholder="name@example.com"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="email">Email address</label>
                    <p className="text-danger">
                      {errors && touched.email ? errors.email : null}
                    </p>
                  </div>
                  {/* <!-- Password input--> */}
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="Password">Password</label>
                    <p className="text-danger">
                      {" "}
                      {errors && touched.password
                        ? errors.password
                        : null}{" "}
                    </p>
                  </div>
                  {/* <!-- Confirm Password input--> */}
                  <div className="form-floating mb-2">
                    <input
                      className="form-control"
                      id="cpass"
                      type="password"
                      placeholder="Confirm password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="pas">Confirm Password</label>
                    <p className="text-danger">
                      {" "}
                      {errors && touched.confirmPassword
                        ? errors.confirmPassword
                        : null}{" "}
                    </p>
                  </div>
                  <div className="mb-4">
                    <Link className="" to="/login">
                      already have an account
                    </Link>
                  </div>
                  {/* <!-- Submit Button--> */}
                  <div className="d-grid">
                    <button
                      className="btn btn-dark btn-lg"
                      id="submitButton"
                      type="submit"
                    >
                      Sing Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

};
export default Registeration;
