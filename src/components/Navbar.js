import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux'
import swal from "sweetalert";
import { BACK_END_BASE_URL } from "../config";
import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import '../../src/App.css'
const Navbar = () => {
 
  const cartData = useSelector((state) => state.cartReducer)
  const access_token = window.localStorage.getItem("access_token");
  const refresh_token = window.localStorage.getItem("refresh_token");
  const user = window.localStorage.getItem("user");
  const navTo = useNavigate();

  let userRole;
  let userName;
  if (user) {
    userName = user.split(" ")[1];
    userRole = user.split(" ")[0];
  }
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        includedLanguages: "en,hi,zh-CN",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  function logoutHandler() {
    if (access_token) {
      window.localStorage.clear();
      axios
        .post(
          `${BACK_END_BASE_URL}/logout`,
          { refresh_token },
          { headers: { authorization: access_token } }
        )
        .then(function (response) {
          navTo("/");
        })
        .catch(function (error) {
          console.log(error)
          swal(error.response.data.message);
        });
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-4">
          <Link className="navbar-brand" to="/">
          DressUp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart <span className="">{cartData.prd.length}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              {!userName ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/registeration">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownPortfolio"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userName}
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownPortfolio"
                  >
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" onClick={logoutHandler}>
                        Logout
                      </Link>
                    </li>
                    {userRole === "admin" ? (
                      <li>
                        <Link className="dropdown-item" to="/addproduct">
                          Add Product
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                </li>
              )}
              <li className="nav-item">
                <div  id="google_translate_element" className="nav-link" to="/">
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
