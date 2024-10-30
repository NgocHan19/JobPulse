import React from "react";
import images from '../../images'; 

const Info = () => {
  return (
    <div className="absolute w-full h-[800px]">
      <div className="absolute w-full h-[800px] bg-[#F1F3F4]">
        <div className="absolute w-[900px] h-[482px] left-[80px] top-[50px]">
          <div className="absolute w-full h-full bg-white rounded-[25px]"></div>
          <h1 className="absolute w-[341px] h-[34px] left-[30px] top-[15px] font-bold text-[28px] text-[#525050]">
            Cài đặt thông tin cá nhân
          </h1>

          {/* Họ và tên */}
          <div className="absolute left-[50px] top-[65px]">
            <label className="w-[200px] h-[24px] text-[20px] text-black">Họ và tên</label>
            <div className="flex items-center mt-2">
              <input className="w-[700px] h-[40px] bg-white border border-[#525050] rounded-[10px] px-2" />
              <button className="w-[140px] h-[34px] font-bold text-[20px] text-[#609BEA] bg-transparent">Chỉnh sửa</button>
            </div>
          </div>

          {/* E-mail */}
          <div className="absolute left-[50px] top-[160px]">
            <label className="w-[200px] h-[24px] text-[20px] text-black">E-mail</label>
            <div className="flex items-center mt-2"> 
              <input className="w-[700px] h-[40px] bg-white border border-[#525050] rounded-[10px] px-2" />
              <button className="w-[140px] h-[34px] font-bold text-[20px] text-[#609BEA] bg-transparent">Chỉnh sửa</button>
            </div>
          </div>

          {/* Số điện thoại */}
          <div className="absolute left-[50px] top-[260px]">
            <label className="w-[200px] h-[24px] text-[20px] text-black">Số điện thoại</label>
            <div className="flex items-center mt-2"> 
              <input className="w-[700px] h-[40px] bg-white border border-[#525050] rounded-[10px] px-2" />
              <button className="w-[140px] h-[34px] font-bold text-[20px] text-[#609BEA] bg-transparent">Chỉnh sửa</button>
            </div>
          </div>

          {/* Button Lưu */}
          <div className="absolute w-[160px] h-[60px] left-[380px] top-[370px] bg-[#609BEA] rounded-[5px] flex items-center justify-center">
            <button className="text-[28px] font-bold text-white">Lưu</button>
          </div>
        </div>
      </div>

      {/* Phần thông tin bên phải */}
      <div className="absolute w-[420px] h-[482px] left-[1020px] top-[50px] bg-white rounded-[25px] flex flex-col items-center">
        <div className="absolute w-[80px] h-[80px] left-[30px] top-[20px]">
          <img src={images['icon_info.png']} alt="Profile" className="w-full h-full object-cover" />
        </div>

        <h2 className="absolute w-[155px] h-[48px] left-[150px] top-[30px] text-[20px] text-black">
          Chào bạn trở lại, (tên account)
        </h2>

        <div className="absolute w-[212px] h-[45px] left-[150px] top-[100px] bg-[#D9D9D9] rounded-[15px] flex items-center justify-center">
          <p className="text-[18px] text-black">Tài khoản đã xác thực</p>
        </div>
      </div>
    </div>
  );
};

export default Info;