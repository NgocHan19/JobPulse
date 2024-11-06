import React from "react";
import { useNavigate } from "react-router-dom";
import images from '../../images';

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-[565px] h-[235px] drop-shadow-md">
        <div className="absolute w-full h-full bg-[#F2F8FF] rounded-lg"></div>
        <div className="absolute w-[507px] h-[188px] left-[28px] top-[22px] bg-white border border-[#D8D8D8] rounded-[25px] box-border"></div>
        <h1 className="absolute w-[143px] h-[34px] left-[211px] top-[40px] text-[28px] font-bold text-[#525050]">
          Đăng Xuất
        </h1>
        <p className="absolute w-[353px] h-[27px] left-[106px] top-[89px] text-[22px] font-bold text-[#A09696]">
          Bạn chắc chắn muốn đăng xuất ?
        </p>

        <div className="absolute w-[160px] h-[49px] left-[296px] top-[137px] bg-[#609BEA] rounded-[10px]">
          <button
            onClick={handleLogout}
            className="absolute w-[110px] h-[27px] left-[25px] top-[7px] text-[22px] font-bold text-white"
          >
            Đăng xuất
          </button>
        </div>

        <div className="absolute w-[163px] h-[49px] left-[107px] top-[137px] bg-[#609BEA] rounded-[10px]">
          <button
            onClick={handleGoBack}
            className="absolute w-[86px] h-[27px] left-[35px] top-[7px] text-[22px] font-bold text-white"
          >
            Quay lại
          </button>
        </div>

        <div className="absolute w-[25px] h-[25px] left-[535px] top-[4px]">
          <img src={images['icon_back.png']} alt="Back Icon" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Logout;