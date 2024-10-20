import React, { useState } from 'react';
import images from '../../images';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Thay thế phần này bằng API thực tế của bạn để xác thực người dùng
      const response = await fetch('/api/login', { // Đường dẫn API của bạn
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Đăng nhập thành công!");
        setEmail('');
        setPassword('');
        navigate("/");
      } else {
        alert("Email hoặc mật khẩu không chính xác!");
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  return (
    <div className="relative w-full h-[1080px] bg-white">
      <h1 className="absolute left-[154px] top-[65px] text-[#1A73E8] font-bold text-[36px] leading-[44px]">
        Chào mừng bạn đã quay trở lại
      </h1>

      <p className="absolute left-[154px] top-[123px] text-[#A2A2A2] font-normal text-[28px] leading-[34px]">
        Vui lòng đăng nhập để tiếp tục
      </p>

      <label className="absolute left-[154px] top-[200px] text-[#868585] font-normal text-[24px] leading-[29px]">Email</label>
      <div className="absolute left-[154px] top-[240px] w-[827px] h-[60px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
        <img src={images['icon_email.png']} alt="Icon" className="w-[30px] h-[30px] ml-[15px]" />
        <input
          type="email"
          placeholder="Nhập email..."
          className="ml-[15px] placeholder-[#A2A2A2] text-[20px] leading-[24px] outline-none w-full pr-[45px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <label className="absolute left-[154px] top-[340px] text-[#868585] font-normal text-[24px] leading-[29px]">Mật khẩu</label>
      <div className="absolute left-[154px] top-[380px] w-[827px] h-[60px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
        <img src={images['icon_pass.png']} alt="Icon" className="w-[30px] h-[30px] ml-[15px]" />
        <input
          type="password"
          placeholder="Nhập mật khẩu..."
          className="ml-[15px] placeholder-[#A2A2A2] text-[20px] leading-[24px] outline-none w-full pr-[45px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="absolute left-[154px] top-[485px] w-[827px] h-[60px] bg-[#1A73E8] rounded-[5px] flex items-center justify-center" onClick={handleLogin}>
        <p className="text-white font-bold text-[24px] leading-[29px]">Đăng nhập</p>
      </div>

      <button className="absolute left-[398px] top-[580px] text-[#A2A2A2] font-normal text-[20px] leading-[24px]">Bạn chưa có tài khoản? Đăng ký ngay</button>
      <p className="absolute left-[350px] top-[684px] text-[#A2A2A2] font-normal text-[20px] leading-[24px]">Vui lòng gọi tới số 0123456789 (giờ hành chính).</p>
      <p className="absolute left-[402px] top-[643px] text-[#5E5D5D] font-bold text-[20px] leading-[24px]">Bạn gặp khó khăn khi tạo tài khoản?</p>
      
      <div className="absolute left-[226px] top-[670px] w-[700px] h-0 border border-[#D9D9D9]" />
    </div>
  );
};

export default Login;