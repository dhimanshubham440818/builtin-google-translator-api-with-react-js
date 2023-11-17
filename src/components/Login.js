import swal from 'sweetalert';
import React, { useState } from "react";
import { useFormik } from "formik";
import loginSchema from '../validators/loginSchema'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { BACK_END_BASE_URL } from '../config';
const initialStatus = {
    email: "",
    password: "",
};
const Login = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialStatus,
        validationSchema: loginSchema,
        onSubmit: (values, action) => {
            loginHandler(values);
            action.resetForm();
        },
    });

    function loginHandler(data) {
        axios.post(`${BACK_END_BASE_URL}/login`, data)
            .then(function (response) {
                window.localStorage.setItem("access_token", `bearer ${response.data.result.access_token}`);
                window.localStorage.setItem("refresh_token", `bearer ${response.data.result.refresh_token}`);
                window.localStorage.setItem("user", response.data.result.role + " " + response.data.result.name);
                navigate('/');
            })
            .catch(function (error) {
                swal(error.response.data.message);
            });

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
                            <h1 className="fw-bolder">Sing In</h1>
                        </div>
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-8 col-xl-6">
                                <form id="contactForm" onSubmit={handleSubmit}>
                                    {/* <!-- Email address input--> */}
                                    <div className="form-floating mb-3">
                                        <input
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="off"
                                            placeholder="name@example.com"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <label htmlFor="email">Email address</label>
                                        <p className="text-danger" > {errors && touched.email ? errors.email : null} </p>
                                    </div>
                                    {/* <!-- Password input--> */}
                                    <div className="form-floating mb-3">
                                        <input
                                            className="form-control"
                                            id="pass"
                                            type={show ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <label htmlFor="pas">Password</label>
                                        <p className="text-danger" > {errors && touched.password ? errors.password : null} </p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                onChange={() => { setShow(show ? false : true) }}
                                                id="flexCheckDefault"
                                            />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Show
                                            </label>
                                        </div>
                                        <div>
                                            <Link to="">forgot password</Link>
                                        </div>
                                    </div>
                                    {/* <!-- Submit Button--> */}
                                    <div className="d-grid">
                                        <button
                                            className="btn btn-dark btn-lg"
                                            id="submitButton"
                                            type="submit"
                                        >
                                            Sing In
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
export default Login;