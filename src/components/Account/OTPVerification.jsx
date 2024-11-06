import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OTPVerification = () => {
  const [otp, setOTP] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Lấy email từ trang đăng ký

  const handleVerifyOTP = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!otp) {
      setErrorMessage('Bạn phải nhập mã OTP!');
      return;
    }

    try {
      // Gửi OTP và email tới backend để xác thực
      const response = await fetch('http://localhost:5000/OTPVerification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verificationToken: otp }), // gửi OTP và email
      });
      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message);
        setTimeout(() => {
          navigate('/login'); // Điều hướng đến trang đăng nhập sau khi xác thực thành công
        }, 2000); // Thời gian đợi 2 giây trước khi chuyển hướng
      } else {
        setErrorMessage(result.message || 'Mã OTP không chính xác. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div className="relative w-full h-[500px] bg-white flex flex-col items-center justify-center">
      <h2 className="text-[#1A73E8] font-bold text-4xl mb-4">Xác Thực OTP</h2>
      <p className="text-[#A2A2A2] font-normal text-xl mb-8">Nhập mã OTP đã được gửi đến email của bạn</p>

      <div className="w-[400px] h-[60px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
        <input
          type="text"
          placeholder="Nhập mã OTP..."
          className="ml-[15px] placeholder-[#A2A2A2] text-[20px] leading-[24px] outline-none w-full pr-[15px]"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
      </div>

      <button
        className="mt-6 w-[400px] h-[60px] bg-[#1A73E8] text-white text-[24px] font-bold leading-[29px] rounded-[5px]"
        onClick={handleVerifyOTP}
      >
        Xác Thực
      </button>

      {errorMessage && <div className="mt-4 text-red-800">{errorMessage}</div>}
      {successMessage && <div className="mt-4 text-green-800">{successMessage}</div>}
    </div>
  );
};

export default OTPVerification;
