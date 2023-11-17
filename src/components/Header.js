import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            {/* <!-- Header--> */}
            <header className="bg-dark">
                <div className="container">
                    <div className="row gx-5 align-items-center justify-content-center">
                        <div className="col-lg-8 col-xl-7 col-xxl-6 pb-4">
                            <div className="text-center text-xl-start">
                                <h1 className="display-5 fw-bolder text-white mb-2">DressUp is a vibrant and stylish e-commerce</h1>
                                <p className="lead fw-normal text-white-50 mb-4">"DressUp" is a vibrant and stylish e-commerce web application that caters to all your fashion needs. With a wide range of clothing, accessories, and footwear, DressUp offers a one-stop shopping experience for individuals who want to express their unique style and stay up-to-date with the latest fashion trends.</p>
                                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                    <Link className="btn btn-light btn-lg px-4 me-sm-3" to="/contact">Contact</Link>
                                    <Link className="btn btn-outline-light btn-lg px-4" to="/about">Learn More</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img className="img-fluid rounded-3 my-4" style={{ width: '600px', height: '400px' }} src="images/banner.jpg" alt="..." /></div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header