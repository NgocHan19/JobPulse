import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import Register_NTD from './components/Account/Register_NTD';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import HomePage_Login from './components/HomePage/HomePage_Login';
import Logout from './components/Account/Logout';
import Header_NTV from './components/Header/Header_NTV';
import Info from './components/Account/Info';
import Change_Pass from './components/Account/Change_Pass';
import Verify from './components/Account/Verify';
import Form_Authen from './components/Account/Form_Authen';
import Saved_Jobs from './components/Saved_Jobs/Saved_Jobs';
import Form_Saved_Empty from './components/Saved_Jobs/Form_Saved_Empty';
import Search_Logged from './components/Search/Search_Logged';
import Search_Home_Logged from './components/Search/Search_Home_Logged';
import Job_Details from './components/Job_Details/Job_Details';
import Company_List from './components/Company/Company_List';
import Top_Company from './components/Company/Top_Company';
import Management_Company from './components/Company/Management_Company';
import Form_Applied_Empty from './components/Applied_Jobs/Form_Applied_Empty';
import Applied_Jobs from './components/Applied_Jobs/Applied_Jobs';
import UploadCV from './components/CV/UploadCV';
import CreateCV from './components/CV/CreateCV';
import ManagementCV from './components/CV/ManagementCV';
import OTPVerification from './components/Account/OTPVerification';
import Menu from './components/Menu_NTD/Menu';

import MenuManagementLayout from './components/Menu_NTD/MenuManagementLayout ';
import { useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<><Header /><HomePage /><Footer /></>} />
        <Route path="/home-logged-in" element={<><Header_NTV /><HomePage /><Footer /></>} />
        <Route path="/search-home" element={<Search_Home_Logged />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-ntd" element={<Register_NTD />} />
        <Route path="/authen" element={<Form_Authen />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/info" element={<><Header_NTV /><Info /><Footer /></>} />
        <Route path="/change-pass" element={<><Header_NTV /><Change_Pass /><Footer /></>} />
        <Route path="/saved-jobs" element={<><Header_NTV /><Search_Logged /><Saved_Jobs /><Footer /></>} />
        <Route path="/saved-jobs-empty" element={<Form_Saved_Empty />} />
        <Route path="/applied-jobs" element={<><Header_NTV /><Search_Logged /><Applied_Jobs /><Footer /></>} />
        <Route path="/form-applied-empty" element={<Form_Applied_Empty />} />
        {/* <Route path="/job-details" element={<><Header_NTV /><Search_Logged /><Job_Details /><Footer /></>} /> */}
        <Route path="/job-details/:jobId" element={<><Header_NTV /><Search_Logged /><Job_Details /><Footer /></>} />
        <Route path="/company-list" element={<><Header_NTV /><Company_List /><Footer /></>} />
        <Route path="/company-top" element={<><Header_NTV /><Top_Company /><Footer /></>} />
        <Route path="/upload-cv" element={<><Header_NTV /><UploadCV /><Footer /></>} />
        <Route path="/create-cv" element={<><Header_NTV /><CreateCV /><Footer /></>} />
        <Route path="/cv-management" element={<><Header_NTV /><ManagementCV /><Footer /></>} />
        <Route path="/OTPVerification" element={<><Header /><OTPVerification /><Footer /></>} />

        {/* <Route path="/menu" element={<Menu />} />
        <Route path="/management-company" element={<Management_Company />} /> */}
        <Route path="/management-company" element={<MenuManagementLayout />} />
      </Routes>
    </Router>
  );

}

export default App;
