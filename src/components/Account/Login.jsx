import React, { useState } from 'react';
import images from '../../images';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu quá trình loading

    // Giả lập quá trình đăng nhập thành công
    setTimeout(() => {
        alert("Đăng nhập thành công!"); // Thông báo đăng nhập thành công
        setLoading(false); // Kết thúc quá trình loading
        navigate('/home-logged-in'); // Chuyển đến trang HomePage
    }, 1000); // Thay đổi thời gian nếu cần
};

  return (
    <div className="relative w-full h-[1080px] bg-white">
      <h1 className="absolute left-[154px] top-[65px] text-[#1A73E8] font-bold text-4xl leading-[44px]">
        Chào mừng bạn đã quay trở lại
      </h1>

      <p className="absolute left-[154px] top-[123px] text-[#A2A2A2] font-normal text-xl leading-[34px]">
        Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
      </p>

      <label className="absolute left-[154px] top-[200px] text-[#868585] font-normal text-2xl leading-[29px]">Email</label>
      <div className="absolute left-[154px] top-[240px] w-[827px] h-[60px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
        <img src={images['icon_email.png']} alt="Icon" className="w-[30px] h-[30px] ml-[15px]" />
        <input
          type="email"
          placeholder="Nhập email..."
          className="ml-[15px] placeholder-[#A2A2A2] text-lg leading-[24px] outline-none w-full pr-[45px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <label className="absolute left-[154px] top-[340px] text-[#868585] font-normal text-2xl leading-[29px]">Mật khẩu</label>
      <div className="absolute left-[154px] top-[380px] w-[827px] h-[60px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
        <img src={images['icon_pass.png']} alt="Icon" className="w-[30px] h-[30px] ml-[15px]" />
        <input
          type="password"
          placeholder="Nhập mật khẩu..."
          className="ml-[15px] placeholder-[#A2A2A2] text-lg leading-[24px] outline-none w-full pr-[45px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div
        className="absolute left-[154px] top-[485px] w-[827px] h-[60px] bg-[#1A73E8] rounded-[5px] flex items-center justify-center"
        onClick={loading ? null : handleLogin}
        style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        <p className="text-white font-bold text-[24px] leading-[29px]">
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </p>
      </div>

      <button
        className="absolute left-[398px] top-[580px] text-[#A2A2A2] font-normal text-[20px] leading-[24px]"
        onClick={() => navigate('/register')}
      >
        Bạn chưa có tài khoản? Đăng ký ngay
      </button>
      <p className="absolute left-[350px] top-[684px] text-[#A2A2A2] font-normal text-[20px] leading-[24px]">
        Vui lòng gọi tới số 0123456789 (giờ hành chính).
      </p>
      <p className="absolute left-[402px] top-[643px] text-[#5E5D5D] font-bold text-[20px] leading-[24px]">
        Bạn gặp khó khăn khi tạo tài khoản?
      </p>

      <div className="absolute left-[226px] top-[625px] w-[700px] h-0 border border-[#D9D9D9]" />
    </div>
  );
}

export default Login;
