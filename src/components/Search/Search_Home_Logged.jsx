import React, { useState, useEffect, useRef } from 'react';
import images from '../../images';

const provincesAndCities = [
  "Tất cả tỉnh/thành phố", "Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Nha Trang",
  "Biên Hòa", "Bắc Ninh", "Bắc Giang", "Thừa Thiên Huế", "Hưng Yên", "Nam Định",
  "Ninh Bình", "Quảng Ninh", "Vĩnh Phúc", "Tuyên Quang", "Hà Tĩnh", "Thanh Hóa",
  "Quảng Bình", "Quảng Trị", "Hà Nam", "Lào Cai", "Lạng Sơn", "Hòa Bình",
  "Điện Biên", "Yên Bái", "Phú Thọ", "Ninh Thuận", "Bình Thuận",
  "Khánh Hòa", "Đắk Lắk", "Đắk Nông", "Gia Lai", "Kon Tum", "Bình Định",
  "Quảng Ngãi", "Phú Yên", "Hà Giang", "Sơn La", "Lai Châu", "Long An",
  "Tiền Giang", "Bến Tre", "Trà Vinh", "Vĩnh Long", "Đồng Tháp",
  "An Giang", "Kiên Giang", "Cà Mau", "Sóc Trăng", "Bạc Liêu", "Hậu Giang"
];

const jobCategories = [
  "Tất cả ngành nghề", "Kinh doanh", "Công nghệ thông tin", "Tài chính", "Giáo dục", 
  "Y tế", "Kỹ thuật", "Xây dựng", "Bán hàng", "Dịch vụ khách hàng"
];

const Searach_Home_Logged = () => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showJobDropdown, setShowJobDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Địa điểm");
  const [selectedJobCategory, setSelectedJobCategory] = useState("Tất cả ngành nghề");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const locationRef = useRef(null);
  const jobRef = useRef(null);

  const imagesArray = [images['img_test1.png'], images['img_test2.png'], images['img_test3.png'], images['img_test4.png'], images['img_test5.png'], images['img_test6.png']];

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setShowLocationDropdown(false);
  };

  const handleJobClick = (category) => {
    setSelectedJobCategory(category);
    setShowJobDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (locationRef.current && !locationRef.current.contains(event.target)) {
      setShowLocationDropdown(false);
    }
    if (jobRef.current && !jobRef.current.contains(event.target)) {
      setShowJobDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesArray.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [imagesArray.length]);

  return (
    <div className="absolute w-full h-[500px] left-0 z-40">
      <div className="absolute w-full h-[420px] bg-gradient-to-b from-[#1A73E8]/30 to-[#1A73E8]/60" />
      <div className="absolute w-[1200px] h-[50px] left-[180px] bg-white rounded-[30px] flex items-center justify-between top-[10%] transform -translate-y-1/2 px-5 gap-5">
        
        <input
          type="text"
          placeholder="Vị trí ứng tuyển"
          className="w-[300px] h-[30px] px-2 text-[#CDCDCD] font-semibold text-base leading-[22px] border-none outline-none rounded-[5px]"
        />

        <div className="w-[1px] h-[30px] bg-[#A2A2A2] rotate-180 mx-[10px]" />

        <div className="relative z-50" ref={locationRef}>
          <div className="flex items-center gap-5">
            <img src={images['icon_location_black.png']} alt="Location Icon" className="w-[25px] h-[25px]" />
            <span className="text-[#545454] font-bold text-base leading-[22px]">{selectedCity}</span>
            <img
              src={images['icon_downarrow.png']}
              alt="Dropdown Icon"
              className="w-[20px] h-[20px] cursor-pointer"
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            />
          </div>
          {showLocationDropdown && (
            <div className="absolute left-0 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-50">
              {provincesAndCities.map((city, index) => (
                <p
                  key={index}
                  className={`font-normal text-base cursor-pointer px-4 py-2 hover:bg-gray-200 ${selectedCity === city ? 'text-[#1A73E8]' : 'text-black'}`}
                  onClick={() => handleCityClick(city)}
                >
                  {city}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="w-[1px] h-[30px] bg-[#A2A2A2] rotate-180 mx-[10px]" />

        <div className="relative z-50" ref={jobRef}>
          <div className="flex items-center gap-5">
            <img src={images['icon_box_black.png']} alt="Job Icon" className="w-[25px] h-[25px]" />
            <span className="text-[#545454] font-bold text-base leading-[22px]">{selectedJobCategory}</span>
            <img
              src={images['icon_downarrow.png']}
              alt="Dropdown Icon"
              className="w-[20px] h-[20px] cursor-pointer"
              onClick={() => setShowJobDropdown(!showJobDropdown)}
            />
          </div>
          {showJobDropdown && (
            <div className="absolute left-0 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-50">
              {jobCategories.map((category, index) => (
                <p
                  key={index}
                  className={`font-normal text-base cursor-pointer px-4 py-2 hover:bg-gray-200 ${selectedJobCategory === category ? 'text-[#1A73E8]' : 'text-black'}`}
                  onClick={() => handleJobClick(category)}
                >
                  {category}
                </p>
              ))}
            </div>
          )}
        </div>

        <button className="w-[150px] h-[40px] bg-[#1A73E8] rounded-[20px] flex items-center justify-center gap-2">
          <img src={images['icon_search_white.png']} alt="Search Icon" className="w-[25px] h-[25px]" />
          <span className="text-white font-bold text-[18px] leading-[22px]">Tìm kiếm</span>
        </button>
      </div>

      <div className="absolute w-full h-[200px] top-[25%] flex items-center justify-center rounded-[10px] mt-[20px] z-10">
        <img src={imagesArray[currentImageIndex]} alt="Slider Image" className="w-[900px] h-[300px] rounded-[10px]" />
      </div>
    </div>
  );
};

export default Searach_Home_Logged;