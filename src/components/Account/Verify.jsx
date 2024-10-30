// src/Verify.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ''; // Lấy email từ location.state
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  // Hàm kiểm tra mã xác thực OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/verify', {
        email, // Sử dụng email từ location.state
        code,
      });
      setMessage(response.data.message);

      // Nếu xác thực thành công
      if (response.data.success) {
        setTimeout(() => {
          navigate('/login'); // Chuyển đến trang đăng nhập
        }, 2000); // Đợi 2 giây trước khi chuyển hướng
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Đã xảy ra lỗi.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[800px] h-[370px] bg-[#F2F8FF] rounded-lg shadow-lg">
        <div className="absolute w-[745px] h-[325px] left-7 top-5 bg-white border border-gray-300 rounded-2xl p-8">
          <h2 className="text-center text-[#525050] font-bold text-2xl mb-2">Xác nhận email</h2>
          <p className="text-center text-[#A09696] font-semibold text-sm mb-8">Mã đã được gửi đến email: <span className="font-bold">{email}</span></p>

          <div className="flex justify-center gap-4 mb-10">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-[50px] h-[50px] bg-white border border-[#BBB6B6] rounded-lg text-center text-lg font-semibold"
                onInput={(e) => {
                  if (e.target.value.length === 1) {
                    const nextSibling = e.target.nextElementSibling;
                    if (nextSibling) {
                      nextSibling.focus();
                    }
                  }
                }}
                onChange={(e) => setCode(prev => prev + e.target.value)} // Ghép từng chữ số vào mã OTP
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-[#609BEA] font-semibold text-sm mb-8 cursor-pointer">Gửi lại mã</p>
          </div>

          <button
            onClick={handleVerify} // Gọi hàm handleVerify khi nhấn
            className="absolute bottom-5 right-7 w-[140px] h-[49px] bg-[#609BEA] text-white text-lg font-bold rounded-lg"
          >
            Xác nhận
          </button>
        </div>
      </div>
      {message && <p className="text-center text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default Verify;
