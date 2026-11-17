import React from "react";
import {useState, useEffect} from "react";
import Header from "./Component/Header/Navbar";
import Footer from "./Component/Footer/Footer";
import Info from "./Component/Pages/Info";
import Contact from "./Component/Pages/Contact";
import Home from "./Component/Pages/Home";
import Register from "./Component/Pages/Register";
import Service from "./Component/Pages/Service";
import Singin from "./Component/Pages/Singin";


function App() {

  return (
    <div className="App">
      <Header />

     
      <Contact />
      <Home />
      <Register />
      <Service />
      <Singin />

       <Info />

      <Footer />    

    </div>
  );
}
export default App;       
