import React, { useState } from 'react';
import images from '../../images';

const Management_Company = () => {
    const [selectedIcon, setSelectedIcon] = useState();

    const handleIconClick = (path) => {
      setSelectedIcon(path);
    };

  return (
    <div className="relative w-full h-full bg-[#FAF9F9]">
      <div className="absolute w-full h-[1080px] left-0 top-0 bg-[#FAF9F9]" >
      <button className="absolute w-[183px] h-[29px] left-[30px] top-[20px] text-[#7D7D7D] font-bold text-[20px] leading-[29px]">
        Quản lý công ty
      </button>

      <div className="absolute w-[1220px] h-[106px] left-[30px] top-[70px] bg-white rounded-[15px] flex items-center">
        <img src={images['icon_account.png']} alt="icon" className="w-[50px] h-[50px] ml-[40px]" />
        <div className="font-bold text-[32px] leading-[39px] text-black ml-[20px]">
            Thông Tin Công ty
        </div>
        <div className="absolute right-[40px] top-[30px] flex space-x-4">
            <button className="bg-yellow-500 rounded-lg w-[140px] h-[40px] flex items-center justify-center px-2">
                <img src={images['icon_edit_white.png']} alt="Chỉnh sửa" className="mr-2 w-6 h-6" />
                <span className="text-white font-semibold text-base">Chỉnh sửa</span>
            </button>

            <button className="bg-red-600 rounded-lg w-[50px] h-[40px] flex items-center justify-center px-2">
                <img src={images['icon_delete_white.png']} alt="Xóa" className="w-6 h-6" />
            </button>
        </div>
      </div>

      <div className="relative w-full h-[760px] left-[30px] top-[200px]">
        <div className="absolute w-[1220px] h-[760px] bg-white rounded-[15px]">
            <button className="absolute w-[150px] h-[150px] left-[60px] top-[20px]">
                <img
                    className="absolute w-[120px] h-[120px] bg-cover bg-center"
                    src={images['img_company.png']}
                    alt="Image"
                />
            </button>
            {/* Tên công ty */}
            <div className="absolute w-[137px] h-[29px] left-[260px] top-[30px] font-bold text-[24px] leading-[29px] text-[#A09696]">
            Tên công ty
            </div>
            <input
            type="text"
            className="absolute w-[280px] h-[35px] left-[260px] top-[80px] bg-white border border-[#525050] rounded-[10px]"
            />

            {/* Quy mô */}
            <div className="absolute w-[90px] h-[29px] left-[600px] top-[30px] font-bold text-[24px] leading-[29px] text-[#A09696]">
            Quy mô
            </div>
            <input
            type="text"
            className="absolute w-[280px] h-[35px] left-[600px] top-[80px] bg-white border border-[#525050] rounded-[10px]"
            />

            {/* Lĩnh vực */}
            <div className="absolute w-[102px] h-[29px] left-[920px] top-[30px] font-bold text-[24px] leading-[29px] text-[#A09696]">
            Lĩnh vực
            </div>
            <input
            type="text"
            className="absolute w-[280px] h-[35px] left-[920px] top-[80px] bg-white border border-[#525050] rounded-[10px]"
            />

            {/* Địa chỉ */}
            <div className="absolute w-[80px] h-[29px] left-[920px] top-[170px] font-bold text-[24px] leading-[29px] text-[#A09696]">
            Địa chỉ
            </div>
            <input
            type="text"
            className="absolute w-[280px] h-[35px] left-[920px] top-[220px] bg-white border border-[#525050] rounded-[10px]"
            />

            {/* Website công ty */}
            <div className="absolute w-[191px] h-[29px] left-[260px] top-[170px] font-bold text-[24px] leading-[29px] text-[#A09696]">
            Website công ty
            </div>
            <input
            type="url"
            className="absolute w-[280px] h-[35px] left-[260px] top-[220px] bg-white border border-[#525050] rounded-[10px]"
            />

            {/* URL giấy phép */}
            <div className="absolute w-[167px] h-[29px] left-[600px] top-[170px] font-bold text-[24px] leading-[29px] text-[#A09696]">
            URL giấy phép
            </div>
            <input
            type="url"
            className="absolute w-[280px] h-[35px] left-[600px] top-[220px] bg-white border border-[#525050] rounded-[10px]"
            />

            {/* Giới thiệu */}
            <div className="absolute w-[114px] h-[29px] left-[260px] top-[320px] font-bold text-[24px] leading-[29px] text-[#A09696]">
            Giới thiệu
            </div>
            <textarea
            className="absolute w-[643px] h-[287px] left-[260px] top-[370px] bg-white border border-[#525050] rounded-[10px]"
            placeholder=""
            />

            {/* image 44: Image */}
            <div className="absolute w-[350px] h-[458.89px] left-[1100px] top-[542px]">
            <img
                className="absolute w-full h-full bg-cover bg-center"
                src="image.png"
                alt="Large Image"
            />
            </div>

            <button className="absolute bottom-[50px] left-[450px] flex items-center space-x-2 cursor-pointer"
                onClick={() => handleIconClick('/job-details')}>
                <div className="font-inter font-medium text-base leading-[17px] text-[#1A73E8]"
                     >Xem công ty ở phía người tìm việc</div>
                <img src={images['icon_detail.png']} alt="icon" className="w-[20px] h-[20px]"/>
            </button>

        </div>
        </div>
      </div>
      </div>
  );
};

export default Management_Company;