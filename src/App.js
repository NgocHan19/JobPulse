import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import Logout from './components/Account/Logout';
import Header_NTV from './components/Header/Header_NTV';
import Info from './components/Account/Info';
import Change_Pass from './components/Account/Change_Pass';
import Form_Authen from './components/Account/Form_Authen';


function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<><Header /><HomePage /><Footer /></>} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/homepage" element={<><Header_NTV /><HomePage /><Footer /></>} />
    //   </Routes>
    // </Router>
    <Form_Authen/>
  );
}

export default App;