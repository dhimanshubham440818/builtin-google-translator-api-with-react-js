import { useDispatch, useSelector } from "react-redux";
import { decrease, empty, increase, removerToCart } from "../actions";
import { Link } from "react-router-dom";
const AddToCart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartReducer);

  return (
    <>
      {
        cartData.prd.length === 0 ?
          <>
            <div className=''>
              <img src="images/empty.png" style={{ width: '100%', height: '655px ' }} alt="..."></img>
            </div>
          </>
          :
          <>
            {/* <!-- Page content--> */}
            <section className="py-5">
              <div className="container px-5">
                <div className="bg-lsight rounded-3 py-5 px-4 px-md-5 mb-5">
                  <div className="row gx-5 ">
                    <div className="col-md-12">

                      <section className="h-100" style={{ backgroundColor: "#eee;" }}>
                        <div className="container h-100 py-5">
                          <div className="row d-flex align-items-center h-100">
                            <div className="col-md-12">
                              <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-normal mb-0 text-black">
                                  Shopping Cart
                                </h3>
                                <div className="text-danger">
                                  <span>empty</span>
                                  <button
                                    className="btn text-danger"
                                    onClick={() => { dispatch(empty()) }}
                                  >
                                    <i
                                      style={{ fontSize: "25px" }}
                                      className="bi bi-trash"
                                      onClick={() => { dispatch(removerToCart()) }}
                                    ></i>
                                  </button>
                                </div>

                              </div>
                              {
                                cartData.prd.map((item, index) => {
                                  return (
                                    <>
                                      <div className="card rounded-3 mb-4" key={item._id}>
                                        <div className="card-body p-4">
                                          <div className="row d-flex justify-content-between align-items-center">
                                            <div className="col-md-2 col-lg-2 col-xl-2">
                                              <img
                                                src={item.image}
                                                className="img-fluid rounded-3"
                                                alt="Cotton T-shirt"
                                              />
                                            </div>
                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                              <p className="lead fw-normal ">{item.name}</p>
                                              <p>
                                                <span className="text-muted">price: {item.price}</span>
                                              </p>
                                              <p>
                                                <span className="text-muted">size: {item.size}</span>
                                              </p>
                                            </div>
                                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                              <button
                                                className="btn text-dark"
                                                onClick={() => { dispatch(decrease(item._id)) }}
                                              >
                                                <i className="bi bi-dash"></i>
                                              </button>

                                              <div className="mt-1">{item.quantity}</div>
                                              <button
                                                className="btn"
                                                onClick={() => { dispatch(increase(item._id)) }}
                                              >
                                                <i className="bi bi-plus"></i>
                                              </button>
                                            </div>
                                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                              <h5 className="mb-0">{item.total}</h5>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                              <Link href="#!" className="text-danger">
                                                <i
                                                  style={{ fontSize: "25px" }}
                                                  className="bi bi-trash"
                                                  onClick={() => { dispatch(removerToCart(item._id)) }}
                                                ></i>
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )
                                })
                              }
                              <div className="card">
                                <div className="card-body d-md-flex justify-content-between align-items-center">
                                  <div className="">
                                  <button
                                    type="button"
                                    className="btn btn-dark btn-block btn-lg"
                                  >
                                    Proceed to Pay
                                  </button> 
                                  </div>
                                  <div className="my-2">
                                    <span className=" fw-bold">TOTAL: </span>
                                    <span className=" fw-bold text-danger">{cartData.total}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
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

export default AddToCart;
