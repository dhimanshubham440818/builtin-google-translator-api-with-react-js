import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProtected from "./components/auth/AdminProtected";
import UpdateProduct from "./components/auth/UpdateProduct";
import Registeration from "./components/Registeration";
import SingleProduct from "./components/SingleProduct";
import AddProduct from "./components/auth/AddProduct";
import Protected from "./components/auth/Protected";
import Profile from "./components/auth/Profile";
import AddToCart from "./components/AddToCart";
import NotFound from "./components/NotFound";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Login from "./components/Login";
import Home from "./components/Home";

// import "./App.css";
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
// function App() {
//   useEffect(() => {
//     var addScript = document.createElement('script');
//     addScript.setAttribute(
//       'src',
//       '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
//     );
//     document.body.appendChild(addScript);
//     window.googleTranslateElementInit = googleTranslateElementInit;
//   }, []);

//   const googleTranslateElementInit = () => {
//     new window.google.translate.TranslateElement(
//       {
//         pageLanguage: 'en',
//         includedLanguages: 'en,ms,ta,zh-CN', // include this for selected languages
//         layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
//       },
//       'google_translate_element'
//     );
//   };
//   return (
//     <div id="google_translate_element">
//       <BrowserRouter>
//         <Navbar />
//         <Routes>

//           <Route path="/registeration" element={<Registeration />} />
//           <Route path="/single/:id" element={<SingleProduct />} />
//           <Route path="/" element={<Home />} />



//           <Route path="/login" element={<Login />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/cart" element={<AddToCart />} />
//           <Route path="*" element={<NotFound />} />

//           <Route element={<Protected />}>
//             <Route path="/profile" element={<Profile />} />
//           </Route>

//           <Route element={<AdminProtected />}>
//             <Route path="/addproduct" element={<AddProduct />} />
//             <Route path="/update/:id" element={<UpdateProduct />} />
//           </Route>

//         </Routes>
//         <Footer />
//       </BrowserRouter>
//     </div>
//   );
// }


const App = () => {
  
  return (
    <>
      <div></div>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/registeration" element={<Registeration />} />
          <Route path="/single/:id" element={<SingleProduct />} />
          <Route path="/" element={<Home />} />



          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<Protected />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<AdminProtected />}>
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  );
};

export default App;
