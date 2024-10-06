import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import images from '../../images';

function Header() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-white h-[98px] px-10">
        <div className="flex items-center">
          <img src={images['logo.png']} alt="Logo" className="w-[80px] h-[81.88px]" />
        </div>

        <div className="flex space-x-10  ml-2">
          <button className="font-bold text-lg text-black hover:text-[#1A73E8]">
            Việc làm
          </button>
          <button className="font-bold text-lg text-black hover:text-[#1A73E8]">
            Hồ sơ & CV
          </button>
          <button className="font-bold text-lg text-black hover:text-[#1A73E8]">
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
    </div>
  );
}

export default Header;