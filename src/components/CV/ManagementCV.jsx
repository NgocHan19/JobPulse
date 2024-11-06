import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import images from '../../images';

const ManagementCV = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate(); 
    
    // Hàm chuyển trang
    const handleNavigate = (path) => {
        navigate(path);
        setMenuVisible(false);
    };

    const [isSearchingEnabled, setIsSearchingEnabled] = useState(false);

    const toggleSearching = (status) => {
      setIsSearchingEnabled(status);
    };

  const [isStarred, setIsStarred] = useState(false);

  const handleClick = () => {
    setIsStarred(!isStarred); // Đảo trạng thái khi nhấn
  };

  return (
    <div className="relative w-full h-[2050px] bg-[#FAF9F9]">
      <div className="absolute left-[50px] top-[50px] w-full h-[1170px]">
        {/* <div className="absolute w-[900px] h-[290px] bg-white shadow-md rounded-lg left-0 top-0 p-5">
          <h2 className="text-2xl font-bold text-black mb-2">CV đã tạo trên JobPulse</h2>
          <div className="flex flex-col items-center justify-center h-full">
            <img src={images['icon_addcv_empty.png']} alt="CV Icon Empty" className="w-[100px] h-[100px] mr-4" />
            <p className="text-sm text-black mt-2">Bạn chưa tạo CV nào</p>
          </div>
          <button className="absolute right-[20px] top-[20px] flex items-center justify-center w-[120px] h-[35px] bg-[#1A73E8] rounded-lg text-white font-bold text-base"
            onClick={() => navigate('/create-cv')}>
            <img src={images['icon_add.png']} alt="Add Icon" className="w-[20px] h-[20px] mr-1" />
            Tạo CV
          </button>
        </div> */}

        <div className="container  p-5 bg-white rounded-lg shadow-lg left-0 top-0 w-[900px]">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold text-black">CV đã tạo trên JobPulse</h2>
                <button className="flex items-center bg-[#1A73E8] text-white font-bold py-2 px-4 rounded w-[130px] h-[35px]">
                    <img src={images['icon_add.png']} alt="Add Icon" className="w-5 h-5 mr-2" /> {/* Icon Add */}
                    Tạo mới
                </button>
            </div>

            <div className="grid grid-cols-3 gap-5">
                {[1, 2, 3].map((_, index) => (
                    <div key={index} className="w-[270px] bg-gray-100 p-4 rounded-lg relative">
                        <div className="w-full h-[300px] bg-gray-300 rounded mb-2 flex justify-center items-center relative">
                            <img src={images['icon_add.png']} alt="CV Icon" className="w-[100px] h-[100px]" />
                            <h3 className="absolute left-[10px] bottom-[25px] text-lg font-medium text-gray-700">{`cv test ${index + 1}`}</h3>
                            <div className="absolute left-[10px] bottom-[5px] text-xs text-gray-500">{`Cập nhật lần cuối 06-11-2024 21:24 PM`}</div>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button className="flex items-center bg-gray-200 px-2 py-1 rounded text-xs text-black">
                                <img src={images['share.png']} alt="Share Icon" className="w-5 h-4 mr-1" /> {/* Icon Chia sẻ */}
                                Chia sẻ
                            </button>
                            <button className="flex items-center bg-gray-200 px-2 py-1 rounded text-xs text-black">
                                <img src={images['download.png']} alt="Download Icon" className="w-5 h-4 mr-1" />
                                Tải xuống
                            </button>
                            <button className="flex items-center bg-gray-200 px-2 py-1 rounded text-xs text-black">
                                <img src={images['delete.png']} alt="Delete Icon" className="w-4 h-4 mr-1" /> 
                            </button>
                        </div>
 
                        <button
                            className="absolute top-2 right-2 flex items-center bg-white border border-gray-300 rounded-lg p-2"
                            onClick={handleClick}
                            >
                            <img
                                src={isStarred ? images['star_yellow.png'] : images['star.png']} // Sử dụng ảnh tùy theo trạng thái
                                alt="Star Icon"
                                className="w-3 h-3 mr-1"
                            />
                            <span className="text-xs text-black">Đặt làm CV chính</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>


        {/* <div className="absolute w-[900px] h-[290px] bg-white shadow-md rounded-lg left-0 top-[500px] p-5">
          <h2 className="text-2xl font-bold text-black mb-2">CV đã tải lên JobPulse</h2>
          <div className="flex flex-col items-center justify-center h-full">
            <img src={images['icon_uploadcv_empty.png']} alt="CV Icon Empty" className="w-[100px] h-[100px] mr-4" />
            <p className="text-sm text-black mt-3">Bạn chưa tải lên CV nào</p>
          </div>
          <button className="absolute right-[20px] top-[20px] flex items-center justify-center w-[130px] h-[35px] bg-[#1A73E8] rounded-lg text-white font-bold text-base"
            onClick={() => navigate('/upload-cv')}>
            <img src={images['icon_upload.png']} alt="Upload Icon" className="w-[20px] h-[20px] mr-1" />
            Tải CV lên
          </button>
        </div> */}

        <div className="container p-5 bg-white rounded-lg shadow-lg left-0 top-[510px] w-[900px] absolute">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold text-black">CV đã tải lên JobPulse</h2>
                <button className="flex items-center bg-[#1A73E8] text-white font-bold py-2 px-4 rounded w-[140px] h-[35px]">
                    <img src={images['icon_add.png']} alt="Add Icon" className="w-5 h-5 mr-2" /> {/* Icon Add */}
                    Tải CV lên
                </button>
            </div>

            <div className="grid grid-cols-3 gap-5">
                {[1, 2, 3].map((_, index) => (
                    <div key={index} className="w-[270px] bg-gray-100 p-4 rounded-lg relative">
                        <div className="w-full h-[300px] bg-gray-300 rounded mb-2 flex justify-center items-center relative">
                            <img src={images['icon_add.png']} alt="CV Icon" className="w-[100px] h-[100px]" />
                            <h3 className="absolute left-[10px] bottom-[25px] text-lg font-medium text-gray-700">{`cv test ${index + 1}`}</h3>
                            <div className="absolute left-[10px] bottom-[5px] text-xs text-gray-500">{`Cập nhật lần cuối 06-11-2024 21:24 PM`}</div>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button className="flex items-center bg-gray-200 px-2 py-1 rounded text-xs text-black">
                                <img src={images['share.png']} alt="Share Icon" className="w-5 h-4 mr-1" /> {/* Icon Chia sẻ */}
                                Chia sẻ
                            </button>
                            <button className="flex items-center bg-gray-200 px-2 py-1 rounded text-xs text-black">
                                <img src={images['download.png']} alt="Download Icon" className="w-5 h-4 mr-1" />
                                Tải xuống
                            </button>
                            <button className="flex items-center bg-gray-200 px-2 py-1 rounded text-xs text-black">
                                <img src={images['delete.png']} alt="Delete Icon" className="w-4 h-4 mr-1" /> 
                            </button>
                        </div>
 
                        <button
                            className="absolute top-2 right-2 flex items-center bg-white border border-gray-300 rounded-lg p-2"
                            onClick={handleClick}
                            >
                            <img
                                src={isStarred ? images['star_yellow.png'] : images['star.png']} // Sử dụng ảnh tùy theo trạng thái
                                alt="Star Icon"
                                className="w-3 h-3 mr-1"
                            />
                            <span className="text-xs text-black">Đặt làm CV chính</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>

        <div className="absolute left-0 top-[1020px] w-[900px] h-[900px] bg-white shadow-lg rounded-lg p-6 mb-5">
          <h2 className="text-2xl font-bold text-black">Việc làm phù hợp với bạn</h2>
          <p className="mt-4 text-base text-black">Để nhận được gợi ý việc làm chính xác hơn, hãy <span className="italic text-[#1A73E8]">tùy chỉnh cài đặt gợi ý việc làm.</span></p>
          <div className="absolute left-[40px] top-[120px] right-[40px] bottom-[10px] overflow-hidden max-h-[800px]">
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
          <button className="mt-[740px] w-[250px] h-[40px] bg-[#1A73E8] rounded text-white font-bold text-base mx-auto block">
            Xem tất cả việc làm phù hợp
          </button>
        </div>
      </div>
      
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
  );
};

export default ManagementCV;