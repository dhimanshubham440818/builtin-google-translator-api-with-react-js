import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, removerToCart } from "../actions";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";
import CustomLoader from './CustomLoader'
import { BACK_END_BASE_URL } from '../config/index'

const Card = () => {
  let cartData = useSelector((state) => state.cartReducer.prd);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [key, setKey] = useState();
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getData();
  }, [cartData.length, currentPage, data.length]);

  function getData() {
    axios
      .get(`${BACK_END_BASE_URL}/pagination/?page=${currentPage}`)
      .then(function (response) {
        if (response.data.status) {
          setData(response.data.result.result);
          setPageCount(response.data.result.pageCount);
        }
      })
      .catch(function (error) {
        swal(error.message);
      });
  }

  function handlePageClick(e) {
    setCurrentPage(e.selected + 1)
  }

  function handlerSearch() { 
   if (!key) {
       getData();  
   } else {
    axios
      .get(`${BACK_END_BASE_URL}/search/${key}`)
      .then(function (response) {
        if (response.data.status) {
          if(response.data.result.length === 0){
            getData();
            swal("Product not exist try another one");
          }else{
            setData(response.data.result);
          }
        }
      })
      .catch(function (error) {
        swal(error.message);
      });
   }
  }

  return (
    <>
      {data.length === 0 ? (
        <div className="">
          <CustomLoader/>
        </div>
      ) : (
        <>
          <div className="containerfluid  bg-dark pt-2">
            <div className="container">
              <aside className="">
                <div className="d-flex align-items-center justify-content-between flex-column flex-xl-row text-center text-xl-start">
                  <div className="container">
                    <div className="row justify-content-end px-2">
                      <div className="col-lg-3">
                        <div className="input-group mb-2">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Search..."
                            aria-label="Search..."
                            value={key}
                            onChange={(e) => 
                              setKey(e.target.value)
                            }
                            aria-describedby="button-newsletter"
                          />
                          <button
                            className="btn btn-outline-light"
                            id="button-newsletter"
                            type="button"
                            onClick={handlerSearch}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
          <Header />
          <section className="my-5">
            <div className="container  my-3">
              <div className="row gx-5 mb-2">
                <div className="col-lg-8 col-xl-6">
                  <div className="">
                    <h2 className="fw-bolder text-uppercase text-decoration-underline">Products</h2>
                  </div>
                </div>
              </div>
              <div className="row gx-5">
                {data.length &&
                  data.map((item, index) => {
                    return (
                    
                        <div className="col-lg-4 mb-5" key={index}>
                          <div className="card h-100 shadow border-0">
                            <Link to={`/single/${item._id}`}>
                              <img
                                className="card-img-top"
                                src={item.image}
                                style={{ width: "100%", height: "350px" }}
                                alt="..."
                              />
                            </Link>

                            <div className="card-body d-flex flex-column  justify-content-between p-5" >
                              <div>
                              <h5 className="card-title mb-2 fw-bolds">{item.name}</h5>
                              <p
                                className="card-text mb-2"
                                style={{ textAlign: "justify" }}
                              >
                                {item.description}
                              </p>
                              <div className="d-flex justify-content-between"> 
                              <span className="fw-bolder">Size:  
                              <span className="text-uppercase"> {item.size}</span>
                              </span>
                              <span className="fw-bolder">₹ {item.price}</span>
                              </div>
                              </div>
                              <div>
                              {!cartData.some((ele) => ele._id === item._id) ? (
                                <div className="mt-3">
                                  <button
                                    className="btn btn-dark w-100"
                                    type="button"
                                    onClick={() => {
                                      dispatch(AddToCart(item));
                                    }}
                                  >
                                    Add To Cart
                                  </button>
                                </div>
                              ) : (
                                <div className="d-grid mt-3 gap-2">
                                  <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => {
                                      dispatch(removerToCart(item._id));
                                    }}
                                  >
                                    Remove To Cart
                                  </button>
                                </div>
                              )}
                              </div>
                            </div>
















                          </div>
                        </div>
                      
                    );
                  })}

                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={(e) => {
                    handlePageClick(e);
                  }}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  marginPagesDisplayed={2}
                  containerClassName="pagination justify-content-center"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  activeClassName="text-danger"
                />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Card;
