import React, { useState } from 'react';
import images from '../../images';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false); 

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); 
    };

    return (
        <div className="relative w-full h-[1080px] bg-white">
            <h1 className="absolute left-[154px] top-[65px] text-[#1A73E8] font-bold text-[36px] leading-[44px]">Chào mừng bạn đến với JobPulse</h1>
            <p className="absolute left-[154px] top-[123px] text-[#A2A2A2] font-normal text-[28px] leading-[34px]">Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</p>

            <label className="absolute left-[154px] top-[200px] text-[#868585] font-normal text-[24px] leading-[29px]">Họ và tên</label>
            <div className="absolute left-[154px] top-[240px] w-[827px] h-[60px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
                <img src={images['icon_account.png']} alt="Icon" className="w-[35px] h-[35px] ml-[15px]" />
                <input type="text" placeholder="Nhập họ tên..." className="ml-[15px] placeholder-[#A2A2A2] text-[20px] leading-[24px] outline-none w-full pr-[45px]" />
            </div>

            <label className="absolute left-[154px] top-[340px] text-[#868585] font-normal text-[24px] leading-[29px]">Email</label>
            <div className="absolute left-[154px] top-[380px] w-[827px] h-[60px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
                <img src={images['icon_email.png']} alt="Icon" className="w-[30px] h-[30px] ml-[15px]" />
                <input type="email" placeholder="Nhập email..." className="ml-[15px] placeholder-[#A2A2A2] text-[20px] leading-[24px] outline-none w-full pr-[45px]" />
            </div>

            <label className="absolute left-[154px] top-[480px] text-[#868585] font-normal text-[24px] leading-[29px]">Mật khẩu</label>
            <div className="absolute left-[154px] top-[520px] w-[827px] h-[60px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
                <img src={images['icon_pass.png']} alt="Icon" className="w-[30px] h-[30px] ml-[15px]" />
                <input 
                    type="password" 
                    placeholder="Nhập mật khẩu..." 
                    className="ml-[15px] placeholder-[#A2A2A2] text-[20px] leading-[24px] outline-none w-full pr-[45px]" 
                />
            </div>

            <label className="absolute left-[154px] top-[620px] text-[#868585] font-normal text-[24px] leading-[29px]">Xác nhận mật khẩu</label>
            <div className="absolute left-[154px] top-[660px] w-[827px] h-[60px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
                <img src={images['icon_pass.png']} alt="Icon" className="w-[30px] h-[30px] ml-[15px]" />
                <input 
                    type="password" 
                    placeholder="Nhập lại mật khẩu..." 
                    className="ml-[15px] placeholder-[#A2A2A2] text-[20px] leading-[24px] outline-none w-full pr-[45px]" 
                />
            </div>

            {/* Checkbox để đồng ý với điều khoản */}
            <div className="absolute left-[154px] top-[738px] flex items-center">
                <input 
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={handleCheckboxChange} 
                    className="mr-[10px] h-[20px] w-[20px]" 
                />
                <p className="text-[#A2A2A2] font-normal text-[20px] leading-[24px]">
                    Tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của JobPulse
                </p>
            </div>

            <button className="absolute left-[154px] top-[796px] w-[827px] h-[60px] bg-[#1A73E8] rounded-[5px] text-[#FFFBFB] font-bold text-[24px]">Đăng ký</button>
            
            <button className="absolute left-[398px] top-[873px] text-[#A2A2A2] font-normal text-[20px] leading-[24px]">Bạn đã có tài khoản? Đăng nhập ngay</button>
            <p className="absolute left-[350px] top-[977px] text-[#A2A2A2] font-normal text-[20px] leading-[24px]">Vui lòng gọi tới số 0123456789 (giờ hành chính).</p>
            <p className="absolute left-[402px] top-[936px] text-[#5E5D5D] font-bold text-[20px] leading-[24px]">Bạn gặp khó khăn khi tạo tài khoản?</p>
            
            <div className="absolute left-[226px] top-[920px] w-[700px] h-0 border border-[#D9D9D9]" />
        </div>
    );
};

export default Register;