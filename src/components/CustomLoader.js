import React from 'react'
import ClipLoader from "react-spinners/FadeLoader";

const CustomLoader = () => {
  return (
    <div class="container-fluid d-flex align-items-center justify-content-center vh-100 " style={{background:" rgba(0, 0, 0, 0.7)"}}>    
        <ClipLoader
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>
  )
}

export default CustomLoader;