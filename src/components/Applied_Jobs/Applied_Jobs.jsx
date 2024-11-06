import React, { useState } from 'react';
import images from '../../images';

const Applied_Jobs = () => {
    const [selectedIcon, setSelectedIcon] = useState('Cập nhật gần đây'); 

    const handleIconClick = (iconType) => {
        setSelectedIcon(iconType); 
    };

    const [isSearchingEnabled, setIsSearchingEnabled] = useState(false);

    const toggleSearching = (status) => {
      setIsSearchingEnabled(status);
    };

    return (
        <div className="relative w-full h-[1200px] top-[180px] bg-[#FAF9F9]">
            <div className="absolute w-[600px] h-[510px] left-[60px] top-[50px]">
                <div className="relative w-[900px] h-[1000px] bg-white rounded-[10px]">
                    <h2 className="absolute left-[40px] top-[20px] text-black font-bold text-2xl leading-[29px]">
                         Việc làm đã ứng tuyển
                    </h2>
                    <div className="absolute left-[40px] top-[70px] text-black font-normal text-[16px] leading-[19px]">
                        Danh sách việc làm đã ứng tuyển: 1
                    </div>

                    <div className="absolute left-0 top-[110px] w-full border-t border-[#D9D9D9]"></div>
                    <div className="absolute left-0 top-[170px] w-full border-t border-[#D9D9D9]"></div>

                    <div className="flex absolute left-[40px] top-[130px] space-x-4 gap-8">
                        <div className="text-[#A3A3A3] font-normal text-base leading-[19px]">
                            Ưu tiên hiển thị:
                        </div>
                        
                        <div className="flex items-center text-black font-normal text-[16px] leading-[19px]" onClick={() => handleIconClick('recentUpdate')}>
                            <img 
                                src={selectedIcon === 'recentUpdate' ? images['icon_tick_green.png'] : images['icon_tick_empty.png']}
                                alt="Cập nhật gần đây" 
                                className="mr-2 w-[20px] h-[20px]" 
                            />
                            Cập nhật gần đây
                        </div>

                        <div className="flex items-center text-black font-normal text-[16px] leading-[19px]" onClick={() => handleIconClick('urgent')}>
                            <img 
                                src={selectedIcon === 'urgent' ? images['icon_tick_green.png'] : images['icon_tick_empty.png']}
                                alt="Cần tuyển gấp" 
                                className="mr-2 w-[20px] h-[20px]" 
                            />
                            Tất cả
                        </div>
                    </div>

                    {/* Danh sách công việc */}
                    <div className="absolute left-[40px] top-[200px] right-[40px] bottom-[10px] overflow-hidden max-h-[800px]">
                        <div className="flex flex-col space-y-4">
                            {[1, 2, 3, 4].map((_, index) => (
                                <div
                                    key={index}
                                    className="relative w-full h-[150px] bg-white border border-[#C5C0C0] rounded-[5px] p-4 flex items-center"
                                >
                                    <img
                                        src={images['image1.png']}
                                        alt="Job Image"
                                        className="w-[90px] h-[98.04px] object-cover"
                                    />

                                    <button className="absolute left-[150px] top-[10px] font-normal text-base leading-[19px] text-black">
                                        Tên vị trí ứng tuyển
                                    </button>

                                    <div className="absolute right-[60px] top-[20px] font-bold text-lg leading-[19px] text-[#1A73E8]">
                                        Giá
                                    </div>

                                    <button className="absolute left-[150px] top-[40px] font-normal text-sm leading-[15px] text-[#A2A2A2]">
                                        Tên công ty
                                    </button>

                                    <div className="absolute w-[100px] left-[150px] top-[70px] bg-[#D9D9D9] rounded-[5px] p-1 text-black text-xs leading-[15px] flex items-center justify-center">
                                        Địa điểm
                                    </div>

                                    <div className="absolute w-[180px] left-[150px] top-[105px] bg-[#D9D9D9] rounded-[5px] p-1 font-normal text-xs leading-[15px] text-black flex items-center justify-center">
                                        Cập nhật 1 tuần trước
                                    </div>

                                    <div className="absolute w-[180px] left-[260px] top-[70px] bg-[#D9D9D9] rounded-[5px] p-1 font-normal text-xs leading-[15px] text-black flex items-center justify-center">
                                        Còn 14 ngày để ứng tuyển
                                    </div>

                                    <div className="absolute right-[10px] bottom-[10px] flex items-center space-x-2">
                                        <button className="w-[110px] h-[30px] bg-[#1A73E8] rounded-[5px] flex items-center justify-center">
                                            <span className="font-bold text-base leading-[18px] text-white">
                                                Ứng tuyển
                                            </span>
                                        </button>

                                        <button className="w-[30px] h-[30px] bg-[#F1F3F4] rounded-[5px] flex items-center justify-center">
                                            <img
                                                src={images['icon_trash_can.png']}
                                                alt="Icon 1"
                                                className="w-[20px] h-[20px] object-cover"
                                            />
                                        </button>

                                        <button className="w-[30px] h-[30px] bg-[#E0EDFF] rounded-[5px] flex items-center justify-center">
                                            <img
                                                src={images['icon_heart_blue.png']}
                                                alt="Icon 2"
                                                className="w-[20px] h-[20px] object-cover"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quản lý hồ sơ */}
                    <div className="absolute w-[420px] h-[350px] left-[950px] top-0 bg-white rounded-lg">
                        <h1 className="absolute left-[33px] top-[19px] text-[24px] font-bold text-black leading-[29px] font-inter">
                            Quản lý hồ sơ
                        </h1>

                        <div className="absolute w-[354px] h-[120px] left-[33px] top-[69px] bg-white border border-[#F2F0F0] rounded-lg">
                            <div className="flex items-center mt-[10px] ml-[18px]">
                            <button onClick={() => toggleSearching(true)} className="flex items-center">
                                <img
                                src={isSearchingEnabled ? images['icon_turn_on.png'] : images['icon_turn_off.png']}
                                alt="Icon"
                                className="w-[30px] h-[30px] mr-3"
                                />
                                <p className={`text-[18px] font-bold ${isSearchingEnabled ? 'text-[#1A73E8]' : 'text-[#A2A2A2]'}`}>
                                {isSearchingEnabled ? 'Đã bật tìm việc' : 'Đang tắt tìm việc'}
                                </p>
                            </button>
                            </div>
                            <p className="ml-[18px] mt-[10px] text-[12px] font-normal text-black leading-[15px] font-inter">
                            Bật tìm việc giúp hồ sơ của bạn nổi bật hơn và được chú ý nhiều hơn trong danh sách tìm kiếm của NTD.
                            </p>
                        </div>

                        <div className="absolute w-[354px] h-[120px] left-[33px] top-[203px] bg-white border border-[#F2F0F0] rounded-lg">
                            <div className="flex items-center mt-[10px] ml-[18px]">
                            <button onClick={() => toggleSearching(false)} className="flex items-center">
                                <img
                                src={isSearchingEnabled ? images['icon_turn_on.png'] : images['icon_turn_off.png']}
                                alt="Icon"
                                className="w-[30px] h-[30px] mr-3"
                                />
                                <p className={`text-[18px] font-bold ${!isSearchingEnabled ? 'text-[#A2A2A2]' : 'text-[#1A73E8]'}`}>
                                Cho phép NTD tìm kiếm hồ sơ
                                </p>
                            </button>
                            </div>
                            <p className="ml-[18px] mt-[10px] text-[12px] font-normal text-black leading-[15px] font-inter">
                            Khi có cơ hội việc làm phù hợp, NTD sẽ liên hệ và trao đổi với bạn qua email và số điện thoại của bạn.
                            </p>
                        </div>
                    </div>



                    {/* Gợi ý việc làm phù hợp */}
                    <div className="absolute left-[950px] h-[600px] top-[390px]">
                        <div className="flex flex-col space-y-4">
                            <div className="relative w-[400px] h-[600px] bg-white rounded-[10px]">
                                <div className="absolute w-[264px] h-[29px] left-4 top-4 font-bold text-2xl leading-[29px] text-black">
                                    Gợi ý việc làm phù hợp
                                </div>

                                {[1, 2, 3, 4].map((_, index) => (
                                    <div className="relative w-[360px] h-[110px] left-5 top-[50px] my-2" key={index}>
                                        <div className="box-border w-full h-full bg-white border border-[#F2F0F0] rounded-[5px] p-4 flex items-center">
                                            <img 
                                                src={images['image1.png']}
                                                alt="Mô tả hình ảnh" 
                                                className="w-[60px] h-[60px] object-cover mr-2" 
                                            />
                                            <div className="flex flex-col items-start">
                                                <button className="text-black text-left">
                                                    Tên vị trí ứng tuyển {index + 1}
                                                </button>
                                                <button className="text-[#A2A2A2] text-left">
                                                    Tên công ty {index + 1}
                                                </button>
                                                <div className="flex mt-2">
                                                    <div className="bg-[#D9D9D9] w-[80px] rounded-[5px] text-center text-black text-xs">
                                                        Giá
                                                    </div>
                                                    <div className="bg-[#D9D9D9] ml-2 w-[100px] rounded-[5px] text-center text-black text-xs">
                                                        Địa điểm
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="mt-16 ml-4 w-[360px] h-[40px] bg-white border border-[#1A73E8] rounded-[5px] flex items-center justify-center"
                                    onClick={() => handleIconClick('/')} >
                                    <span className="font-bold text-base leading-[18px] text-[#1A73E8]">
                                        Xem thêm công việc
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Applied_Jobs;