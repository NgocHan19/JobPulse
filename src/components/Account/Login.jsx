import React from 'react';
import images from '../../images';

const Login = () => {
  return (
    <div className="relative w-full h-[1080px] bg-white">
      <h1 className="absolute left-[154px] top-[65px] text-[#1A73E8] font-bold text-[36px] leading-[44px]">
        Chào mừng bạn đã quay trở lại
      </h1>

      <p className="absolute left-[154px] top-[123px] text-[#A2A2A2] font-normal text-[28px] leading-[34px]">
        Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
      </p>

      <label className="absolute left-[154px] top-[201px] text-[#868585] font-normal text-[24px] leading-[29px]">
        Email
      </label>
      <div className="absolute left-[154px] top-[241px] w-[827px] h-[60px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
        <img src={images['icon_email.png']} alt="Email Icon" className="ml-[15px] w-[30px] h-[30px]" />
        <input type="email" placeholder="Nhập email..." className="ml-[15px] placeholder-[#A2A2A2] text-[20px] leading-[24px] outline-none w-full pr-[45px]" />
        </div>

      <label className="absolute left-[154px] top-[341px] text-[#868585] font-normal text-[24px] leading-[29px]">
        Mật khẩu
      </label>
      <div className="absolute left-[154px] top-[381px] w-[827px] h-[60px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
        <img src={images['icon_pass.png']} alt="Password Icon" className="ml-[15px] w-[30px] h-[30px]" />
        <input
          type="password" 
          placeholder="Nhập mật khẩu..." 
          className="ml-[15px] placeholder-[#A2A2A2] text-[20px] leading-[24px] outline-none w-full pr-[45px]"
        />
      </div>

      <div className="absolute left-[154px] top-[485px] w-[827px] h-[60px] bg-[#1A73E8] rounded-[5px] flex items-center justify-center">
        <p className="text-white font-bold text-[24px] leading-[29px]">Đăng nhập</p>
      </div>

      <button className="absolute left-[398px] top-[562px] text-[#A2A2A2] font-normal text-[20px] leading-[24px]">
        Bạn chưa có tài khoản? Đăng ký ngay
      </button>

      <p className="absolute left-[350px] top-[666px] text-[#A2A2A2] font-normal text-[20px] leading-[24px]">
        Vui lòng gọi tới số 0123456789 (giờ hành chính).
      </p>

      <p className="absolute left-[402px] top-[625px] text-[#5E5D5D] font-bold text-[20px] leading-[24px]">
        Bạn gặp khó khăn khi tạo tài khoản?
      </p>

      <div className="absolute left-[226px] top-[608px] w-[700px] h-0 border border-[#D9D9D9]" />
    </div>
  );
};

export default Login;