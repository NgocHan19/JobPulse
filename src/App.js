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
import VerifyAccount from './components/Account/VerifyAccount';
import Verify from './components/Account/Verify';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><HomePage /><Footer /></>} />        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<><Header_NTV /><HomePage /><Footer /></>} />
        <Route path="/verifyD" element={<VerifyAccount />} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/Info" element={<Info />} />
      </Routes>
    </Router>
  );
}

export default App;