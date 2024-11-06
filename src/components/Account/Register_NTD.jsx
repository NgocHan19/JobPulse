import React, { useState } from 'react';
import images from '../../images';
import { useNavigate } from 'react-router-dom';

function RegisterNTD() {
    const navigate = useNavigate();
    const [selectedIcon, setSelectedIcon] = useState('Nam'); 

    const handleIconClick = (iconType) => {
      setSelectedIcon(iconType); 
     };

  return (
    <div className="relative w-full h-[1250px]">
      <div className="absolute w-full h-[1250px] left-0 top-0 bg-white">
        <div className="absolute w-[610px] h-[44px] left-[100px] top-[60px] font-semibold text-4xl leading-[44px] text-[#1A73E8]">
          Đăng ký tài khoản Nhà Tuyển Dụng
        </div>
        <div className="absolute w-[1100px] h-[34px] left-[100px] top-[123px] font-normal text-xl leading-[34px] text-[#A2A2A2]">
          Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ tuyển dụng ứng dụng sâu AI & Hiring Funnel.
        </div>
        <div className="absolute w-[1300px] h-[200px] left-[100px] top-[190px] bg-white border border-[#1A73E8] rounded-lg">
          <div className="absolute w-[159px] h-[44px] left-[40px] top-[20px] font-semibold text-[36px] leading-[44px] text-[#1A73E8]">
            Quy định
          </div>
          <div className="absolute w-[1220px] h-[120px] left-[40px] top-[80px] font-normal text-[16px] leading-[30px] text-black">
            Để đảm bảo chất lượng dịch vụ, JobPulse không cho phép một người dùng tạo nhiều tài khoản khác nhau. Nếu phát hiện vi phạm, JobPulse sẽ ngừng cung cấp dịch vụ tới tất cả các tài khoản trùng lặp hoặc chặn toàn bộ truy cập tới hệ thống website của JobPulse. Đối với trường hợp khách hàng đã sử dụng hết 3 tin tuyển dụng miễn phí, JobPulse hỗ trợ kích hoạt đăng tin tuyển dụng không giới hạn sau khi quý doanh nghiệp cung cấp thông tin giấy phép kinh doanh.
          </div>
        </div>

        {/* Thông tin nhà tuyển dụng */}
        <div className="absolute w-[301px] h-[29px] left-[100px] top-[440px] font-semibold text-[24px] leading-[29px] text-black">
          Thông tin nhà tuyển dụng
        </div>

        {/* Thông tin cá nhân */}
        <div className="absolute left-[100px] top-[500px] w-full">
        <div className="flex justify-between space-x-4">
            {/* Họ và tên */}
            <div className="w-[700px]">
            <label className="text-[#868585] font-normal text-xl leading-[29px]">
                Họ và tên
            </label>
            <div className="w-[700px] h-[50px] mt-2 bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
                <img src={images['icon_account.png']} alt="Icon" className="w-[35px] h-[35px] ml-[15px]" />
                <input
                id="fullName"
                type="text"
                placeholder="Nhập họ tên..."
                className="ml-[15px] placeholder-[#A2A2A2] text-[20px] leading-[24px] outline-none w-full pr-[45px]"
                />
            </div>
            </div>

            {/* Giới tính */}
            <div className="w-full ">
            <label className="text-[#868585] text-xl mb-6 ml-[200px]">Giới tính *</label>
            <div className="flex space-x-6 mt-4 ml-[200px]">
                <div className="flex items-center text-black font-normal text-[18px] leading-[19px]" onClick={() => handleIconClick('Nam')}>
                <img
                    src={selectedIcon === 'Nam' ? images['icon_tick_green.png'] : images['icon_tick_empty.png']}
                    alt="Nam"
                    className="mr-2 w-[30px] h-[30px]"
                />
                Nam
                </div>
                <div className="flex items-center text-black font-normal text-[18px] leading-[19px]" onClick={() => handleIconClick('Nữ')}>
                <img
                    src={selectedIcon === 'Nữ' ? images['icon_tick_green.png'] : images['icon_tick_empty.png']}
                    alt="Nữ"
                    className="mr-2 w-[30px] h-[30px]"
                />
                Nữ
                </div>
            </div>
            </div>
        </div>

        {/* Số điện thoại */}
        <label className="absolute left-0 top-[120px] text-[#868585] font-normal text-xl leading-[29px]">
            Số điện thoại cá nhân
        </label>
        <div className="absolute left-0 top-[160px] w-[700px] h-[50px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
            <img src={images['icon_account.png']} alt="Icon" className="w-[35px] h-[35px] ml-[15px]" />
            <input
            id="phone"
            type="text"
            placeholder="Số điện thoại cá nhân"
            className="ml-[15px] placeholder-[#A2A2A2] text-[20px] leading-[24px] outline-none w-full pr-[45px]"
            />
        </div>

        {/* Công ty */}
        <label className="absolute left-0 top-[230px] text-[#868585] font-normal text-xl leading-[29px]">
            Công ty
        </label>
        <div className="absolute left-0 top-[270px] w-[700px] h-[50px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
            <img src={images['icon_account.png']} alt="Icon" className="w-[35px] h-[35px] ml-[15px]" />
            <input
            id="company"
            type="text"
            placeholder="Công ty"
            className="ml-[15px] placeholder-[#A2A2A2] text-[20px] leading-[24px] outline-none w-full pr-[45px]"
            />
        </div>

        {/* Địa điểm làm việc */}
        <label className="absolute left-0 top-[340px] text-[#868585] font-normal text-xl leading-[29px]">
            Địa điểm làm việc
        </label>
        <div className="absolute left-0 top-[380px] w-[700px] h-[50px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
            <img src={images['icon_account.png']} alt="Icon" className="w-[35px] h-[35px] ml-[15px]" />
            <input
            id="workplace"
            type="text"
            placeholder="Chọn tỉnh/ thành phố"
            className="ml-[15px] placeholder-[#A2A2A2] text-[20px] leading-[24px] outline-none w-full pr-[45px]"
            />
            <img src={images['icon_down_arrow_black.png']} alt="Icon" className="w-[35px] h-[35px] mr-[15px]" />
        </div>

        {/* Quận huyện */}
        <label className="absolute left-0 top-[450px] text-[#868585] font-normal text-xl leading-[29px]">
            Quận huyện
        </label>
        <div className="absolute left-0 top-[490px] w-[700px] h-[50px] bg-white border border-[#A3A3A3] rounded-[5px] flex items-center">
            <img src={images['icon_account.png']} alt="Icon" className="w-[35px] h-[35px] ml-[15px]" />
            <input
            id="district"
            type="text"
            placeholder="Chọn quận huyện"
            className="ml-[15px] placeholder-[#A2A2A2] text-[20px] leading-[24px] outline-none w-full pr-[45px]"
            />
        </div>
        </div>

        <button className="absolute w-[1200px] h-[60px] left-[100px] top-[1080px] bg-[#1A73E8] rounded-lg flex items-center justify-center">
            <div className="font-semibold text-[24px] text-[#FFFBFB]">
                Hoàn tất
            </div>
        </button>

        <button className="absolute w-[356px] h-[24px] left-[550px] top-[1160px] text-[#A2A2A2] text-[20px]" 
            onClick={() => navigate('/login')}>
            Bạn đã có tài khoản? Đăng nhập ngay
        </button>
      </div>
    </div>
  );
}

export default RegisterNTD;