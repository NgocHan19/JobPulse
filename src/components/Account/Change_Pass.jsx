import React, { useState } from "react";
import images from '../../images'; 

const Change_Pass = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và nhập lại mật khẩu không khớp!");
      return;
    }
    alert("Đổi mật khẩu thành công!");
    setEmail('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="absolute w-full h-full">
      <div className="absolute w-full h-full bg-[#F1F3F4]">
        <div className="absolute w-[900px] h-[560px] left-[80px] top-[50px]">
          <div className="absolute w-full h-full bg-white rounded-[25px]"></div>
          <h1 className="absolute w-[341px] h-[34px] left-[30px] top-[15px] font-bold text-[28px] text-[#525050]">
            Đổi mật khẩu đăng nhập
          </h1>

          {/* E-mail đăng nhập */}
          <div className="absolute left-[50px] top-[65px]">
            <label className="w-[200px] h-[24px] text-[20px] text-black">E-mail đăng nhập</label>
            <div className="flex items-center mt-2">
              <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[700px] h-[40px] bg-white border border-[#525050] rounded-[10px] px-2" 
              />
              <button className="w-[140px] h-[34px] font-bold text-[20px] text-[#609BEA] bg-transparent">Chỉnh sửa</button>
            </div>
          </div>

          {/* Mật khẩu hiện tại */}
          <div className="absolute left-[50px] top-[160px]">
            <label className="w-[200px] h-[24px] text-[20px] text-black">Mật khẩu hiện tại</label>
            <div className="flex items-center mt-2"> 
              <input 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-[700px] h-[40px] bg-white border border-[#525050] rounded-[10px] px-2" 
              />
              <button className="w-[140px] h-[34px] font-bold text-[20px] text-[#609BEA] bg-transparent">Chỉnh sửa</button>
            </div>
          </div>

          {/* Mật khẩu mới */}
          <div className="absolute left-[50px] top-[260px]">
            <label className="w-[200px] h-[24px] text-[20px] text-black">Mật khẩu mới</label>
            <div className="flex items-center mt-2"> 
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-[700px] h-[40px] bg-white border border-[#525050] rounded-[10px] px-2" 
              />
              <button className="w-[140px] h-[34px] font-bold text-[20px] text-[#609BEA] bg-transparent">Chỉnh sửa</button>
            </div>
          </div>

          {/* Nhập lại mật khẩu mới */}
          <div className="absolute left-[50px] top-[360px]">
            <label className="w-[200px] h-[24px] text-[20px] text-black">Nhập lại mật khẩu mới</label>
            <div className="flex items-center mt-2"> 
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-[700px] h-[40px] bg-white border border-[#525050] rounded-[10px] px-2" 
              />
              <button className="w-[140px] h-[34px] font-bold text-[20px] text-[#609BEA] bg-transparent">Chỉnh sửa</button>
            </div>
          </div>

          <div className="absolute w-[160px] h-[60px] left-[380px] top-[470px] bg-[#609BEA] rounded-[5px] flex items-center justify-center" onClick={handleChangePassword}>
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

export default Change_Pass;
