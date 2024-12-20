import React, { useState} from 'react';
import images from '../../images'; 

const Info = () => {
  const [isSearchingEnabled, setIsSearchingEnabled] = useState(false);

  const toggleSearching = (status) => {
    setIsSearchingEnabled(status);
  };

  return (
    <div className="relative w-full h-[500px]">
      <div className="absolute w-full h-[800px] bg-[#F1F3F4]">
          <div className="absolute w-[900px] h-[440px] bg-white rounded-[25px] left-[80px] top-[50px]">
            <div className="flex items-center justify-between px-4 py-3">
              <h1 className="font-bold text-2xl text-[#525050] ml-[10px]">
                  Cài đặt thông tin cá nhân
              </h1>
              <button className="mr-[10px] p-2 bg-transparent hover:bg-gray-100 rounded-full">
                  <img src={images['icon_edit.png']} alt="Edit Icon" className="w-[25px] h-[25px]" />
              </button>
            </div>

            <div className="absolute left-[50px] top-[65px]">
              <label className="w-[200px] h-[24px] text-lg text-black">Họ và tên</label>
              <div className="flex items-center mt-2">
                <input className="w-[700px] h-[40px] bg-white border border-[#525050] rounded-[10px] px-2" />
              </div>
            </div>

            <div className="absolute left-[50px] top-[160px]">
              <label className="w-[200px] h-[24px] text-lg text-black">E-mail</label>
              <div className="flex items-center mt-2"> 
                <input className="w-[700px] h-[40px] bg-white border border-[#525050] rounded-[10px] px-2" />
              </div>
            </div>

            <div className="absolute left-[50px] top-[260px]">
              <label className="w-[200px] h-[24px] text-lg text-black">Số điện thoại</label>
              <div className="flex items-center mt-2"> 
                <input className="w-[700px] h-[40px] bg-white border border-[#525050] rounded-[10px] px-2" />
              </div>
            </div>

            <div className="absolute w-[160px] h-[45px] left-[380px] top-[360px] bg-[#609BEA] rounded-[5px] flex items-center justify-center">
              <button className="text-2xl font-bold text-white">Lưu</button>
            </div>
          </div>

        {/* Phần thông tin bên phải */}
      
                    {/* Quản lý hồ sơ */}
                    <div className="absolute w-[420px] h-[450px] left-[1000px] top-[50px] bg-white rounded-lg">
                        <div className="absolute w-[80px] h-[80px] left-[30px] top-[20px]">
                            <img src={images['icon_info.png']} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="absolute w-[155px] h-[48px] left-[150px] top-[20px] text-[20px] text-black">
                            Chào bạn trở lại, (tên account)
                        </h2>
                        <div className="absolute w-[200px] h-[40px] left-[150px] top-[100px] bg-[#D9D9D9] rounded-[15px] flex items-center justify-center">
                            <p className="text-base text-black">Tài khoản đã xác thực</p>
                        </div>

                        <div className="absolute w-[354px] h-[120px] left-[33px] top-[160px] bg-white border border-[#F2F0F0] rounded-lg">
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

                        <div className="absolute w-[354px] h-[120px] left-[33px] top-[300px] bg-white border border-[#F2F0F0] rounded-lg">
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

      </div>


    </div>
  );
};

export default Info;