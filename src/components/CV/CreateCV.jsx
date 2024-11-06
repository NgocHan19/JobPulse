
import React from 'react';
import images from '../../images';

const CreateCV = () => {
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
                <div className="absolute w-[334px] h-[207.27px] left-[1200px] top-[10px]">
                    <img src={images['img_intro.png']} className="absolute w-[350px] h-[205.5px] right-[40px] top-[20px] object-cover" alt="Intro" />
                </div>
            </div>

            <div className="absolute w-[250px] h-[40px] left-[70px] top-[290px] flex items-center bg-white border border-gray-300/80 rounded-md">
                <p className="ml-[28px] text-[18px] text-black">Tiếng Việt</p>
                <img src={images['icon_uploadcv.png']} alt="Icon" className="ml-auto mr-[15px] w-[25px] h-[25px]" />
            </div>

        </div>

  
        {/* Language Selection - Group 41 */}

  
        {/* All Designs - Group 67 */}
        <div className="absolute w-[250px] h-[50px] left-[378px] top-[353px] flex items-center bg-white border border-gray-300/80 rounded-md">
          <p className="ml-[28px] text-[18px] text-black">Tất cả thiết kế</p>
          <img src={images['icon_uploadcv.png']} alt="Icon" className="ml-auto mr-[15px] w-[25px] h-[25px]" />
        </div>
  
        {/* Recently Updated */}
        <div className="absolute flex items-center left-[1450px] top-[368px] space-x-[7px]">
          <img src={images['icon_uploadcv.png']} alt="Recently Updated Icon" className="w-[20px] h-[20px]" />
          <p className="text-[16px] text-black">Mới cập nhật</p>
        </div>
  
        {/* Most Used */}
        <div className="absolute flex items-center left-[1624px] top-[368px] space-x-[7px]">
          <img src={images['icon_uploadcv.png']} alt="Most Used Icon" className="w-[20px] h-[20px]" />
          <p className="text-[16px] text-black">Được dùng nhiều nhất</p>
        </div>
      </div>
    );
  };
  
  export default CreateCV;