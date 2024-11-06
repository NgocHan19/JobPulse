import React from 'react';
import images from '../../images';

const Menu = () => {
  return (
    <div className="absolute w-full h-[1080px] left-0 top-0">
      <div className="absolute w-[220px] h-[1080px] left-0 top-0 bg-white rounded-r-[10px]">
        <div className="absolute w-[180px] h-[110px] left-[3px] top-[5px]">
          <div className="absolute w-[200px] h-[120px] left-[6px] top-[5px] bg-gradient-to-b from-[#1A73E8] via-[#1A73E8] to-[#1A73E8] opacity-60 rounded-tl-[10px] rounded-tr-[10px]">
            <img
              src={images['account_ntd.png']}
              alt="Icon"
              className="absolute w-[50px] h-[50px] left-[10px] top-[10px] object-cover"
            />
            <div className="absolute w-[15px] h-[15px] left-[48px] top-[51px]">
              <img
                src="image.png"  
                alt="Icon"
                className="absolute w-[9.38px] h-[9.38px] left-[51px] top-[54px] object-cover"
              />
            </div>
          </div>

          <div className="absolute w-[100px] h-[17px] left-[78px] top-[20px] text-white text-[14px] leading-[17px]">
            Tên NTD
          </div>
          <div className="absolute w-[100px] h-[12px] left-[76px] top-[50px] text-white text-[10px] leading-[12px]">
            Nhà tuyển dụng
          </div>

          <div className="absolute w-[170px] h-[25px] left-[25px] top-[79px] bg-white rounded-[10px] flex items-center justify-center">
            <div className="text-black text-[10px] leading-[12px]">
                Tài khoản đã xác thực
            </div>
            </div>
        </div>

        <button className="absolute w-[161px] h-[20px] left-[21px] top-[134px]">
          <div className="absolute w-[134px] h-[19px] left-[10px] top-[20px] font-semibold text-[18px] leading-[19px] text-[#1A73E8]">
            Công ty
          </div>
          <img
            src="image.png"  
            alt="Icon"
            className="absolute w-[20px] h-[20px] left-[10px] top-[20px] object-cover"
          />
        </button>

        <button className="absolute w-[161px] h-[20px] left-[21px] top-[179px]">
          <div className="absolute w-[134px] h-[19px] left-[20px] top-[35px] text-black text-[18px] leading-[19px]">
            Quản lý CV
          </div>
          <img
            src="image.png"
            alt="Icon"
            className="absolute w-[20px] h-[20px] left-[10px] top-[35px] object-cover"
          />
        </button>

        <button className="absolute w-[161px] h-[20px] left-[20px] top-[45px]">
          <div className="absolute w-[134px] h-[19px] left-[40px] top-[225px] text-black text-[18px] leading-[19px]">
            Tin tuyển dụng
          </div>
          <img
            src="image.png" 
            alt="Icon"
            className="absolute w-[20px] h-[20px] left-[10px] top-[225px] object-cover"
          />
        </button>
      </div>
    </div>
  );
};

export default Menu;