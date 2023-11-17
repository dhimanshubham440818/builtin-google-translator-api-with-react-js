import swal from 'sweetalert';
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { AddToCart, removerToCart } from '../actions/index'
import { useSelector } from 'react-redux'
import { BACK_END_BASE_URL } from '../config';

const SingleProduct = () => {

  const cartData = useSelector((state) => state.cartReducer)
  const dispatch = useDispatch();
  const user = window.localStorage.getItem("user");
  const navTo = useNavigate()
  const [data, setData] = useState({});
  const params = useParams();

  let userRole;
  if (user) {
    userRole = user.split(" ")[0];
  }

  useEffect(() => {
    axios
      .get(`${BACK_END_BASE_URL}/products/${params.id}`)
      .then(function (response) {
        if (response.data.status) {
          setData(response.data.result)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function handlerDelete() {
    const access_token = window.localStorage.getItem("access_token");
    if (access_token) {
      axios.delete(`${BACK_END_BASE_URL}/products/${params.id}`, { headers: { authorization: access_token } })
        .then(function (response) {
          if (response.data.status) {
            swal("Product Deleted Successfully");
            navTo('/');
          }
        })
        .catch(function (error) {
          swal(error.response.data.message);
        })
    }
  }
  return (
    <>
      <section>
        <div class="container mt-5 mb-5">
          <div class="row d-flex justify-content-center">
            <div class="col-md-10">
              <div class="card">
                <div class="row">
                  <div class="col-md-6">
                    <div class="images">
                      <div class="text-center p-4">
                        <img id="main-image" src={data.image} style={{ width: '100%', height: '100%' }} />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="product p-4">
                      <div class="mt-4 mb-3">
                        <h5 class="text-uppercase">{data.name}</h5>
                        <div class="price d-flex flex-row align-items-center">
                          <span class="act-price">${data.price}</span>
                        </div>
                      </div>
                      <p class="about">{data.description}</p>
                      <div class="sizes mt-4">
                        <h6 class="text-uppercase">{data.size}</h6>
                      </div>
                      {!cartData.prd.some((item) => item._id === data._id) ?
                        <div class="d-grid mt-3 gap-2">
                          <button class="btn btn-dark" type="button" onClick={() => { dispatch(AddToCart(data)) }}>
                            Add To Cart
                          </button>
                        </div>
                        :
                        <div class="d-grid mt-3 gap-2">
                          <button class="btn btn-danger" type="button" onClick={() => { dispatch(removerToCart(data._id)) }}>
                            Remove To Cart
                          </button>
                        </div>
                      }
                      {userRole === "admin" ?
                        <>
                          <div class="row mt-3 text-center ">
                            <div class="col-6">
                              <Link to={`/update/${data._id}`} class="btn btn-dark w-100" type="button">
                                Update Product
                              </Link>
                            </div>
                            <div class="col-6">
                              <button class="btn btn-dark w-100" type="button" onClick={handlerDelete}>
                                Delete Product
                              </button>
                            </div>
                          </div>
                        </> : null
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
