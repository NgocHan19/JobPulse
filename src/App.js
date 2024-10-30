import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import HomePage_Login from './components/HomePage/HomePage_Login';
import Logout from './components/Account/Logout';
import Header_NTV from './components/Header/Header_NTV';
import Info from './components/Account/Info';
import Change_Pass from './components/Account/Change_Pass';

import VerifyAccount from './components/Account/VerifyAccount';
import Verify from './components/Account/Verify';

import Form_Authen from './components/Account/Form_Authen';
import Saved_Jobs from './components/Saved_Jobs/Saved_Jobs';
import Form_Saved_Empty from './components/Saved_Jobs/Form_Saved_Empty';
import Search_Logged from './components/Search/Search_Logged';
import Search_Home_Logged from './components/Search/Search_Home_Logged';




function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<><Header /><HomePage /><Footer /></>} />        

        <Route path="/home" element={<><Header /><HomePage /><Footer /></>} />
        <Route path="/home-logged-in" element={<><Header_NTV /><HomePage_Login /><Footer /></>} />
        <Route path="/search-home" element={<Search_Home_Logged />} />

        <Route path="/register" element={<Register />} />
        <Route path="/authen" element={<Form_Authen />} /> 
        <Route path="/login" element={<Login />} />

        <Route path="/homepage" element={<><Header_NTV /><HomePage /><Footer /></>} />
        <Route path="/verifyD" element={<VerifyAccount />} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/Info" element={<Info />} />

        <Route path="/logout" element={<Logout />} />
        <Route path="/info" element={<Info />} />
        <Route path="/change-pass" element={<Change_Pass />} />
        <Route path="/saved-jobs" element={<><Header /><Search_Logged /><Saved_Jobs /><Footer /></>} />
        <Route path="/saved-jobs-empty" element={<Form_Saved_Empty />} />

      </Routes>
    </Router>
  );
}

export default App;