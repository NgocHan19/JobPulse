import React, { useState } from 'react';
import images from '../../images';

const CreateCV = () => {
    const [languageOpen, setLanguageOpen] = useState(false);
    const [designOpen, setDesignOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("Tiếng Việt");
    const [selectedDesign, setSelectedDesign] = useState("Tất cả thiết kế");

    const toggleLanguageMenu = () => setLanguageOpen(!languageOpen);
    const toggleDesignMenu = () => setDesignOpen(!designOpen);

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setLanguageOpen(false); 
    };

    const handleDesignSelect = (design) => {
        setSelectedDesign(design);
        setDesignOpen(false); 
    };

    return (
      <div className="relative w-full h-[1753px] border-black box-border">
        <div className="absolute w-full h-full bg-[#FAF9F9] left-0 top-0">
            <div className="absolute w-full h-[270px] left-0 bg-gradient-to-r from-[#1A73E8]/35 via-[#1A73E8]/60 to-[#1A73E8]/60">
                <h2 className="absolute w-[350px] h-[80px] left-[100px] top-[50px] font-bold text-[26px] leading-[40px] text-[#1B5CB3]">
                    Danh sách mẫu CV xin việc tiếng Việt/ Anh
                </h2>
                <p className="absolute w-[425px] h-[50px] left-[100px] top-[140px] font-inter font-normal text-[16px] leading-[25px] text-black">
                    Các mẫu CV được thiết kế chuẩn theo từng ngành nghề. Phù hợp với cả sinh viên và người đi làm.
                </p>
                <div className="absolute w-[334px] h-[207.27px] left-[1100px] top-[10px]">
                    <img src={images['img_intro.png']} className="absolute w-[350px] h-[205.5px] right-[40px] top-[20px] object-cover" alt="Intro" />
                </div>
            </div>

            <div className="relative">
                <div className="absolute w-[220px] h-[40px] left-[70px] top-[290px] flex items-center bg-white border border-gray-300/80 rounded-md cursor-pointer" onClick={toggleLanguageMenu}>
                    <p className="ml-[28px] text-base text-black">{selectedLanguage}</p>
                    <img src={images['icon_down_arrow_black.png']} alt="Icon" className="ml-auto mr-[15px] w-[25px] h-[25px]" />
                </div>
                {languageOpen && (
                    <div className="absolute w-[220px] left-[70px] top-[340px] bg-white border border-gray-300/80 rounded-md shadow-md">
                        {["Tiếng Việt", "Tiếng Anh"].map((language) => (
                            <p
                                key={language}
                                onClick={() => handleLanguageSelect(language)}
                                className={`p-2 text-sm cursor-pointer ${
                                    selectedLanguage === language ? "text-blue-500 font-semibold" : "text-black"
                                } hover:bg-gray-100`}
                            >
                                {language}
                            </p>
                        ))}
                    </div>
                )}
            </div>

            <div className="relative">
                <div className="absolute w-[220px] h-[40px] left-[310px] top-[290px] flex items-center bg-white border border-gray-300/80 rounded-md cursor-pointer" onClick={toggleDesignMenu}>
                    <p className="ml-[28px] text-base text-black">{selectedDesign}</p>
                    <img src={images['icon_down_arrow_black.png']} alt="Icon" className="ml-auto mr-[15px] w-[25px] h-[25px]" />
                </div>
                {designOpen && (
                    <div className="absolute w-[220px] left-[310px] top-[340px] bg-white border border-gray-300/80 rounded-md shadow-md">
                        {["Tất cả thiết kế", "Đơn giản", "Thanh lịch", "Kinh nghiệm", "Sáng tạo", "Chuyên nghiệp"].map((design) => (
                            <p
                                key={design}
                                onClick={() => handleDesignSelect(design)}
                                className={`p-2 text-sm cursor-pointer ${
                                    selectedDesign === design ? "text-blue-500 font-semibold" : "text-black"
                                } hover:bg-gray-100`}
                            >
                                {design}
                            </p>
                        ))}
                    </div>
                )}
            </div>

            <div className="absolute flex right-[10px] top-[290px] space-x-[30px]">
                <div className="flex items-center space-x-[8px]">
                    <input type="checkbox" className="rounded-full border-2 border-gray-300 cursor-pointer checked:bg-blue-500 checked:border-blue-500" />
                    <p className="w-[100px] text-[16px] text-black">Mới cập nhật</p>
                </div>
                <div className="flex items-center space-x-[7px]">
                    <input type="checkbox" className="rounded-full border-2 border-gray-300 cursor-pointer checked:bg-blue-500 checked:border-blue-500" />
                    <p className="w-[200px] text-[16px] text-black">Được dùng nhiều nhất</p>
                </div>
            </div>
        </div>
      </div>
    );
};

export default CreateCV;