import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyAccount = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyAccount = async () => {
      const token = new URLSearchParams(location.search).get('token');
      if (!token) {
        setMessage('Mã xác thực không hợp lệ.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/verify?token=${token}`);
        const result = await response.text();

        if (response.ok) {
          setMessage('Tài khoản đã được xác thực thành công. Bạn có thể đăng nhập.');
          setTimeout(() => {
            navigate('/login'); // Điều hướng đến trang đăng nhập sau khi xác thực
          }, 3000); // Điều hướng sau 3 giây
        } else {
          setMessage(result);
        }
      } catch (error) {
        setMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
        console.error('Error:', error);
      }
    };

    verifyAccount();
  }, [location, navigate]);

  return (
    <div className="container">
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyAccount;
