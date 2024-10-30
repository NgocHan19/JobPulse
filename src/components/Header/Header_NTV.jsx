import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import images from '../../images';

function Header_NTV() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false); 
    const menuRef = useRef(null); 
    const navigate = useNavigate(); 

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleMouseEnter = () => {
        setIsHovered(true); 
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleMenuMouseEnter = () => {
        setMenuVisible(true); 
    };

    const handleMenuMouseLeave = () => {
        setMenuVisible(false); 
    };

    // Hàm chuyển trang
    const handleNavigate = (path) => {
        navigate(path);
        setMenuVisible(false);
    };

    const [showJobApplication, setShowJobApplication] = useState(false);
    const [showCVManagement, setShowCVManagement] = useState(false);
    const [showCompanyManagement, setShowCompanyManagement] = useState(false);

    return (
        <div className="relative">
            <div className="absolute w-full h-[98px] bg-white shadow-md">
                <div className="flex items-center h-full px-10">
                    <div className="flex items-center">
                        <img src={images['logo.png']} alt="Logo" className="w-[80px] h-[81.88px]" />
                    </div>

                    <div className="flex space-x-10 ml-10">
                        <button 
                            className="font-bold text-lg text-black hover:text-[#1A73E8]"
                            onClick={() => setShowJobApplication(!showJobApplication)}
                        >
                            Việc làm
                        </button>
                        <button 
                            className="font-bold text-lg text-black hover:text-[#1A73E8]"
                            onClick={() => setShowCVManagement(!showCVManagement)}
                        >
                            Hồ sơ & CV
                        </button>
                        <button 
                            className="font-bold text-lg text-black hover:text-[#1A73E8]"
                            onClick={() => setShowCompanyManagement(!showCompanyManagement)}
                        >
                            Công ty
                        </button>
                    </div>

                          {/* Form showJobApplication*/}
                    {showJobApplication && (
                        <div className="absolute w-[250px] h-[250px] left-[150px] top-[70px] bg-white rounded-md shadow-lg mt-2 z-[9999]">
                        <div className="absolute w-[250px] h-[250px] bg-white rounded-md">
                            <button className="absolute w-[220px] h-[40px] bg-[#F1F3F4] rounded-md top-[15px] left-[15px] flex items-center px-2"
                                onClick={() => navigate('/home-logged-in')} >
                            <img src={images['icon_search_blue.png']} alt="Search Icon" className="w-[20px] h-[20px] mr-2" />
                            <span className="font-normal text-[16px] leading-[19px] text-black">Tìm kiếm</span>
                            </button>
                            <div className="absolute w-[220px] h-0 border border-[#E3DEDE] top-[65px] left-[15px]" />
                            <button className="absolute w-[220px] h-[40px] bg-[#F1F3F4] rounded-md top-[75px] left-[15px] flex items-center px-2"
                                onClick={() => navigate('/applied-jobs')} >
                            <img src={images['icon_bag_blue.png']} alt="Applied Jobs Icon" className="w-[20px] h-[20px] mr-2" />
                            <span className="font-normal text-[16px] leading-[19px] text-black">Việc làm đã ứng tuyển</span>
                            </button>
                            <div className="absolute w-[220px] h-0 border border-[#E3DEDE] top-[125px] left-[15px]" />
                            <button className="absolute w-[220px] h-[40px] bg-[#F1F3F4] rounded-md top-[135px] left-[15px] flex items-center px-2"
                                onClick={() => navigate('/saved-jobs')} >
                            <img src={images['icon_heart_blue.png']} alt="Saved Jobs Icon" className="w-[20px] h-[20px] mr-2" />
                            <span className="font-normal text-[16px] leading-[19px] text-black">Việc làm đã lưu</span>
                            </button>
                            <div className="absolute w-[220px] h-0 border border-[#E3DEDE] top-[185px] left-[15px]" />
                            <button className="absolute w-[220px] h-[40px] bg-[#F1F3F4] rounded-md top-[195px] left-[15px] flex items-center px-2"
                                onClick={() => navigate('/suitable-jobs')} >
                            <img src={images['icon_fit_blue.png']} alt="Matching Jobs Icon" className="w-[20px] h-[20px] mr-2" />
                            <span className="font-normal text-[16px] leading-[19px] text-black">Việc làm phù hợp</span>
                            </button>
                        </div>
                        </div>
                    )}

                    {/* Form showCVManagement */}
                    {showCVManagement && (
                        <div className="absolute w-[200px] h-[190px] left-[200px] top-[70px] bg-white rounded-md shadow-lg mt-2 z-[9999]">
                        <div className="absolute w-[200px] h-[190px] bg-white rounded-md">
                            <button className="absolute w-[170px] h-[40px] bg-[#F1F3F4] rounded-md top-[15px] left-[15px] flex items-center px-2"
                                onClick={() => navigate('/create-cv')} >
                            <img src={images['icon_create_cv_blue.png']} alt="Upload CV Icon" className="w-[20px] h-[20px] mr-2" />
                            <span className="font-normal text-[16px] leading-[19px] text-black">Tạo CV</span>
                            </button>

                            <div className="absolute w-[170px] h-0 border border-[#E3DEDE] top-[65px] left-[15px]" />

                            <button className="absolute w-[170px] h-[40px] bg-[#F1F3F4] rounded-md top-[75px] left-[15px] flex items-center px-2"
                                onClick={() => navigate('/upload-cv')} >
                            <img src={images['icon_upload_cv_blue.png']} alt="Manage CV Icon" className="w-[20px] h-[20px] mr-2" />
                            <span className="font-normal text-[16px] leading-[19px] text-black">Tải CV lên</span>
                            </button>

                            <div className="absolute w-[170px] h-0 border border-[#E3DEDE] top-[125px] left-[15px]" />

                            <button className="absolute w-[170px] h-[40px] bg-[#F1F3F4] rounded-md top-[135px] left-[15px] flex items-center px-2"
                                onClick={() => navigate('/cv-management')} >
                            <img src={images['icon_manage_cv.png']} alt="Manage CV Icon" className="w-[20px] h-[20px] mr-2" />
                            <span className="font-normal text-[16px] leading-[19px] text-black">Quản lý CV</span>
                            </button>

                        </div>
                        </div>
                    )}

                    {/* Form showCompanyManagement */}
                    {showCompanyManagement && (
                        <div className="absolute w-[220px] h-[130px] left-[300px] top-[70px] bg-white rounded-md shadow-lg mt-2 z-[9999]">
                        <div className="absolute w-[220px] h-[130px] bg-white rounded-md">
                            <button className="absolute w-[190px] h-[40px] bg-[#F1F3F4] rounded-md top-[15px] left-[15px] flex items-center px-2"
                                onClick={() => navigate('/company-top')}>
                            <img src={images['icon_top_company.png']} alt="Manage CV Icon" className="w-[20px] h-[20px] mr-2" />
                            <span className="font-normal text-[16px] leading-[19px] text-black">Top Công ty</span>
                            </button>

                            <div className="absolute w-[190px] h-0 border border-[#E3DEDE] top-[65px] left-[15px]" />

                            <button className="absolute w-[190px] h-[40px] bg-[#F1F3F4] rounded-md top-[75px] left-[15px] flex items-center px-2"
                                onClick={() => navigate('/company-list')}>
                            <img src={images['icon_company.png']} alt="Manage CV Icon" className="w-[20px] h-[20px] mr-2" />
                            <span className="font-normal text-[16px] leading-[19px] text-black">Danh sách công ty</span>
                            </button>
                        </div>
                        </div>
                    )}

                    {/* Notification và Account section */}
                    <div className="flex items-center ml-auto space-x-4">
                        <div className="relative flex items-center">
                            <div className="bg-white rounded-md" style={{ width: '148px', height: '41px', marginRight: '10px' }}>
                                <button className="absolute" style={{ width: '133px', height: '40px', left: '9px', top: '1px', fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#000000' }}>
                                    Bạn là nhà tuyển dụng?
                                </button>
                                <button
                                    className="absolute" 
                                    style={{
                                        width: '133px', height: '40px', left: '9px', top: '22px',
                                        fontFamily: 'Inter', fontWeight: 700, fontSize: '14px', lineHeight: '20px', 
                                        color: isHovered ? '#1A73E8' : '#000000'
                                    }} 
                                    onMouseEnter={handleMouseEnter} 
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Đăng tuyển ngay
                                </button>
                            </div>
                        </div>

                        {/* Notification */}
                        <button className="bg-[#E0EDFF] rounded-full flex items-center p-2">
                            <img src={images['icon_nofication.png']} alt="Notification" className="w-[30px] h-[30px]" />
                        </button>

                        {/* Account */}
                        <div className="relative"
                            onMouseEnter={handleMenuMouseEnter} // Giữ menu mở khi di chuột vào
                            onMouseLeave={handleMenuMouseLeave} // Đóng menu khi di chuột ra ngoài
                        >
                            <button className="bg-[#FAF9F9] rounded-full flex items-center p-2" onClick={toggleMenu}>
                                <img src={images['account.png']} alt="Account" className="w-[30px] h-[30px]" />
                                <img src={images['account1.png']} alt="Account" className="w-[20px] h-[20px] ml-[10px]" />
                            </button>

                            {menuVisible && (
                                <div ref={menuRef} className="absolute right-0 top-full mt-2 w-[280px] bg-white shadow-lg rounded-[10px] z-[9999] border border-[#FAF9F9] p-[10px]">
                                    <div className="flex flex-col gap-2">
                                        <button className="flex items-center py-3 px-4 text-left hover:text-[#1A73E8] bg-[#FAF9F9] rounded-md" onClick={() => handleNavigate('/Info')}>
                                            <img src={images['icon_info.png']} alt="Icon" className="w-5 h-5 mr-2" />
                                            Cài đặt thông tin cá nhân
                                        </button>
                                        <button className="flex items-center py-3 px-4 text-left hover:text-[#1A73E8] bg-[#FAF9F9] rounded-md" onClick={() => handleNavigate('/Change_Pass')}>
                                            <img src={images['icon_password.png']} alt="Icon" className="w-5 h-5 mr-2" />
                                            Đổi mật khẩu
                                        </button>
                                        <button className="flex items-center py-3 px-4 text-left hover:text-[#1A73E8] bg-[#FAF9F9] rounded-md">
                                            <img src={images['icon_recruiter.png']} alt="Icon" className="w-5 h-5 mr-2" />
                                            Nhà tuyển dụng xem hồ sơ
                                        </button>
                                        <button className="flex items-center py-3 px-4 text-left hover:text-[#1A73E8] bg-[#FAF9F9] rounded-md">
                                            <img src={images['icon_suggestion.png']} alt="Icon" className="w-5 h-5 mr-2" />
                                            Cài đặt gợi ý việc làm
                                        </button>
                                        <button className="flex items-center py-3 px-4 text-left hover:text-[#1A73E8] bg-[#FAF9F9] rounded-md">
                                            <img src={images['icon_notification.png']} alt="Icon" className="w-5 h-5 mr-2" />
                                            Cài đặt thông báo việc làm
                                        </button>
                                        <button className="flex items-center py-3 px-4 text-left hover:text-[#1A73E8] bg-[#FAF9F9] rounded-md">
                                            <img src={images['icon_email.png']} alt="Icon" className="w-5 h-5 mr-2" />
                                            Cài đặt nhận email
                                        </button>
                                        <button className="flex items-center py-3 px-4 text-left hover:text-[#1A73E8] bg-[#FAF9F9] rounded-md">
                                            <img src={images['icon_security.png']} alt="Icon" className="w-5 h-5 mr-2" />
                                            Cài đặt bảo mật
                                        </button>
                                        <button className="flex items-center py-3 px-4 text-left hover:text-[#1A73E8] bg-[#FAF9F9] rounded-md" onClick={() => handleNavigate('/Logout')}>
                                            <img src={images['icon_logout.png']} alt="Icon" className="w-5 h-5 mr-2" />
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Header_NTV;