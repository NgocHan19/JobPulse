import React from 'react';
import images from '../../images';

const Footer = () => {
    return (
        <footer className="flex flex-col min-h-screen">
            <div className="relative bg-white w-full h-[680px] mt-auto">
                {/* Logo */}
                <img src={images['logo.png']} alt="JobPulse Logo" className="absolute left-[160px] top-[30px] w-[230px] h-[235.88px] bg-cover"/>
                
                {/* Hotline */}
                <div className="absolute left-[100px] top-[340px] w-[346px] h-[70px] text-black font-inter font-normal text-base leading-[35px]">
                    Hotline: 12345567 (Giờ hành chính) Email: abc@gmail.com
                </div>

                {/* Ứng dụng tải xuống */}
                <div className="absolute left-[100px] top-[420px] w-[209px] h-[50px] text-black font-inter font-bold text-lg leading-[50px] tracking-[0.05em]">
                    Ứng dụng tải xuống
                </div>

                {/* Icon ứng dụng */}
                <img src={images['logodownload.png']} alt="Screenshot 1" className="absolute left-[100px] top-[468px] w-[180px] h-[61.43px] bg-cover"/>
                <img src={images['logodownload1.png']} alt="Screenshot 2" className="absolute left-[300px] top-[470px] w-[180px] h-[56.25px] bg-cover"/>

                {/* Về JobPulse */}
                <div className="absolute left-[650px] top-[200px] w-[131px] h-[50px] text-black font-inter font-bold text-lg leading-[50px] tracking-[0.05em]">
                    Về JobPulse
                </div>

                {/* Hồ sơ và CV */}
                <div className="absolute left-[950px] top-[200px] w-[128px] h-[50px] text-black font-inter font-bold text-lg leading-[50px] tracking-[0.05em]">
                    Hồ sơ và CV
                </div>

                {/* Xây dựng sự nghiệp */}
                <div className="absolute left-[1250px] top-[200px] w-[214px] h-[50px] text-black font-inter font-bold text-lg leading-[50px] tracking-[0.05em]">
                    Xây dựng sự nghiệp
                </div>

                {/* Liên hệ */}
                <div className="absolute left-[100px] top-[300px] w-[77px] h-[50px] text-black font-inter font-bold text-lg leading-[50px] tracking-[0.05em]">
                    Liên hệ
                </div>

                {/* Cộng đồng JobPulse */}
                <div className="absolute left-[100px] top-[550px] w-[220px] h-[50px] text-black font-inter font-bold text-lg leading-[50px] tracking-[0.05em]">
                    Cộng đồng JobPulse
                </div>

                {/* Công ty cổ phần JobPulse */}
                <div className="absolute left-[650px] top-[60px] w-[444px] h-[50px] text-black font-inter font-bold text-[28px] leading-[50px] tracking-[0.05em]">
                    Công ty cổ phần JobPulse
                </div>

                {/* Branches */}
                <div className="absolute left-[680px] top-[100px] w-[136px] h-[49px] text-gray-400 font-inter font-normal text-sm leading-[50px] tracking-[0.05em]">
                    Trụ sở Australia:
                </div>
                <div className="absolute left-[680px] top-[140px] w-[172px] h-[49px] text-gray-400 font-inter font-normal text-sm leading-[50px] tracking-[0.05em]">
                    Chi nhánh Hà Nội:
                </div>

                {/* Additional Links */}
                <div className="absolute left-[650px] top-[250px] w-[144px] h-[175px] text-gray-400 font-inter font-normal text-sm leading-[25px] tracking-[0.05em]">
                    Giới thiệu Tuyển dụng Liên hệ Hỏi đáp Chính sách bảo mật Điều khoản dịch vụ Quy chế hoạt động
                </div>
                <div className="absolute left-[950px] top-[250px] w-[216px] h-[125px] text-gray-400 font-inter font-normal text-sm leading-[25px] tracking-[0.05em]">
                    Hồ sơ CV của bạn TopCV Profile Hướng dẫn viết CV Thư viện CV theo ngành nghề Review CV
                </div>
                <div className="absolute left-[1250px] top-[250px] w-[161px] h-[150px] text-gray-400 font-inter font-normal text-sm leading-[25px] tracking-[0.05em]">
                    Việc làm tốt nhất Việc làm lương cao Việc làm quản lý Việc làm IT Việc làm Senior Việc làm bán thời gian
                </div>

                {/* Thêm 4 icon dưới chữ "Cộng đồng JobPulse" */}
                <div className="absolute left-[100px] top-[600px] flex space-x-4">
                    <img src={images['FB.png']} alt="Icon 1" className="w-[40px] h-[40px]"/>
                    <img src={images['tiktok.png']} alt="Icon 2" className="w-[40px] h-[40px]"/>
                    <img src={images['insta.png']} alt="Icon 3" className="w-[40px] h-[40px]"/>
                    <img src={images['ytb.png']} alt="Icon 4" className="w-[40px] h-[40px]"/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;