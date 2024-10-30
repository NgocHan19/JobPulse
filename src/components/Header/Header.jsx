import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import images from '../../images';

function Header() {
  const navigate = useNavigate();
  const [showJobApplication, setShowJobApplication] = useState(false);
  const [showCVManagement, setShowCVManagement] = useState(false);
  const [showCompanyManagement, setShowCompanyManagement] = useState(false);

  return (
    <div className="relative ">
      <div className="flex items-center justify-between bg-white h-[98px] px-10">
        <div className="flex items-center">
          <img src={images['logo.png']} alt="Logo" className="w-[80px] h-[81.88px]" />
        </div>

        <div className="flex space-x-16">
          <button 
            className="font-bold text-lg text-black hover:text-[#1A73E8]"
            onClick={() => setShowJobApplication(!showJobApplication)}
          >
            Việc làm
          </button>
          <button 
            className="font-bold text-lg text-black hover:text-[#1A73E8]"
            onClick={() => setShowCVManagement(!showCVManagement)}
          >
            Hồ sơ & CV
          </button>
          <button 
            className="font-bold text-lg text-black hover:text-[#1A73E8]"
            onClick={() => setShowCompanyManagement(!showCompanyManagement)}
          >
            Công ty
          </button>
        </div>

        <div className="flex space-x-4">
          <button 
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            onClick={() => navigate('/Register')} 
          >
            Đăng ký
          </button>
          <button 
            className="bg-white border border-blue-600 text-blue-600 font-bold py-2 px-4 rounded hover:bg-blue-50 transition duration-300"
            onClick={() => navigate('/Login')} 
          >
            Đăng nhập
          </button>
        </div>
      </div>

      {/* Form showJobApplication*/}
      {showJobApplication && (
        <div className="absolute w-[250px] h-[250px] left-[350px] top-[70px] bg-white rounded-md shadow-lg mt-2 z-[9999]">
          <div className="absolute w-[250px] h-[250px] bg-white rounded-md">
            <button className="absolute w-[220px] h-[40px] bg-[#F1F3F4] rounded-md top-[15px] left-[15px] flex items-center px-2"
                onClick={() => navigate('/home-logged-in')} >
              <img src={images['icon_search_blue.png']} alt="Search Icon" className="w-[20px] h-[20px] mr-2" />
              <span className="font-normal text-[16px] leading-[19px] text-black">Tìm kiếm</span>
            </button>
            <div className="absolute w-[220px] h-0 border border-[#E3DEDE] top-[65px] left-[15px]" />
            <button className="absolute w-[220px] h-[40px] bg-[#F1F3F4] rounded-md top-[75px] left-[15px] flex items-center px-2"
                onClick={() => navigate('/applied-jobs')} >
              <img src={images['icon_bag_blue.png']} alt="Applied Jobs Icon" className="w-[20px] h-[20px] mr-2" />
              <span className="font-normal text-[16px] leading-[19px] text-black">Việc làm đã ứng tuyển</span>
            </button>
            <div className="absolute w-[220px] h-0 border border-[#E3DEDE] top-[125px] left-[15px]" />
            <button className="absolute w-[220px] h-[40px] bg-[#F1F3F4] rounded-md top-[135px] left-[15px] flex items-center px-2"
                onClick={() => navigate('/saved-jobs')} >
              <img src={images['icon_heart_blue.png']} alt="Saved Jobs Icon" className="w-[20px] h-[20px] mr-2" />
              <span className="font-normal text-[16px] leading-[19px] text-black">Việc làm đã lưu</span>
            </button>
            <div className="absolute w-[220px] h-0 border border-[#E3DEDE] top-[185px] left-[15px]" />
            <button className="absolute w-[220px] h-[40px] bg-[#F1F3F4] rounded-md top-[195px] left-[15px] flex items-center px-2"
                onClick={() => navigate('/suitable-jobs')} >
              <img src={images['icon_fit_blue.png']} alt="Matching Jobs Icon" className="w-[20px] h-[20px] mr-2" />
              <span className="font-normal text-[16px] leading-[19px] text-black">Việc làm phù hợp</span>
            </button>
          </div>
        </div>
      )}

      {/* Form showCVManagement */}
      {showCVManagement && (
        <div className="absolute w-[200px] h-[190px] left-[600px] top-[70px] bg-white rounded-md shadow-lg mt-2 z-[9999]">
          <div className="absolute w-[200px] h-[190px] bg-white rounded-md">
            <button className="absolute w-[170px] h-[40px] bg-[#F1F3F4] rounded-md top-[15px] left-[15px] flex items-center px-2"
                onClick={() => navigate('/create-cv')} >
              <img src={images['icon_create_cv_blue.png']} alt="Upload CV Icon" className="w-[20px] h-[20px] mr-2" />
              <span className="font-normal text-[16px] leading-[19px] text-black">Tạo CV</span>
            </button>

            <div className="absolute w-[170px] h-0 border border-[#E3DEDE] top-[65px] left-[15px]" />

            <button className="absolute w-[170px] h-[40px] bg-[#F1F3F4] rounded-md top-[75px] left-[15px] flex items-center px-2"
                onClick={() => navigate('/upload-cv')} >
              <img src={images['icon_upload_cv_blue.png']} alt="Manage CV Icon" className="w-[20px] h-[20px] mr-2" />
              <span className="font-normal text-[16px] leading-[19px] text-black">Tải CV lên</span>
            </button>

            <div className="absolute w-[170px] h-0 border border-[#E3DEDE] top-[125px] left-[15px]" />

            <button className="absolute w-[170px] h-[40px] bg-[#F1F3F4] rounded-md top-[135px] left-[15px] flex items-center px-2"
                onClick={() => navigate('/cv-management')} >
              <img src={images['icon_manage_cv.png']} alt="Manage CV Icon" className="w-[20px] h-[20px] mr-2" />
              <span className="font-normal text-[16px] leading-[19px] text-black">Quản lý CV</span>
            </button>

          </div>
        </div>
      )}

      {/* Form showCompanyManagement */}
      {showCompanyManagement && (
        <div className="absolute w-[220px] h-[130px] left-[800px] top-[70px] bg-white rounded-md shadow-lg mt-2 z-[9999]">
          <div className="absolute w-[220px] h-[130px] bg-white rounded-md">
            <button className="absolute w-[190px] h-[40px] bg-[#F1F3F4] rounded-md top-[15px] left-[15px] flex items-center px-2">
              <img src={images['icon_top_company.png']} alt="Manage CV Icon" className="w-[20px] h-[20px] mr-2" />
              <span className="font-normal text-[16px] leading-[19px] text-black">Top Công ty</span>
            </button>

            <div className="absolute w-[190px] h-0 border border-[#E3DEDE] top-[65px] left-[15px]" />

            <button className="absolute w-[190px] h-[40px] bg-[#F1F3F4] rounded-md top-[75px] left-[15px] flex items-center px-2">
              <img src={images['icon_company.png']} alt="Manage CV Icon" className="w-[20px] h-[20px] mr-2" />
              <span className="font-normal text-[16px] leading-[19px] text-black">Danh sách công ty</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;