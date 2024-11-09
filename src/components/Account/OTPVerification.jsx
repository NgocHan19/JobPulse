import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OTPVerification = () => {
  const [otp, setOTP] = useState(Array(6).fill(''));
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerifyOTP = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    
      // Check if OTP array is filled
      if (otp.includes('')) {
        setErrorMessage('Bạn phải nhập mã OTP!');
        return;
      }
    
      try {
        const response = await fetch('http://localhost:5000/OTPVerification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, verificationToken: otp.join('') }), // Convert OTP array to a single string
        });
        const result = await response.json();
    
        if (response.ok) {
          setSuccessMessage(result.message);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setErrorMessage(result.message || 'Mã OTP không chính xác. Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    };

  const handleInputChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOTP(newOtp);

    if (e.target.value.length === 1 && index < 5) {
      const nextSibling = e.target.nextElementSibling;
      if (nextSibling) {
        nextSibling.focus();
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[800px] h-[370px] bg-[#F2F8FF] rounded-lg shadow-lg">
        <div className="absolute w-[745px] h-[325px] left-7 top-5 bg-white border border-gray-300 rounded-2xl p-8">
          <h2 className="text-center text-[#525050] font-bold text-2xl mb-2">Xác nhận email</h2>
          <p className="text-center text-[#A09696] font-semibold text-sm mb-8">Mã đã được gửi đến email</p>

          <div className="flex justify-center gap-4 mb-10">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleInputChange(e, index)}
                className="w-[50px] h-[50px] bg-white border border-[#BBB6B6] rounded-lg text-center text-lg font-semibold"
              />
            ))}
          </div>

          <div className="flex flex-col items-center">
            <button
              className="w-[400px] h-[60px] bg-[#1A73E8] text-white text-[24px] font-bold leading-[29px] rounded-[5px] flex items-center justify-center mb-4"
              onClick={handleVerifyOTP}
            >
              Xác nhận
            </button>
            {errorMessage && <div className="text-red-800 text-center">{errorMessage}</div>}
            {successMessage && <div className="text-green-800 text-center">{successMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;