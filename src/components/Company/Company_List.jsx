import React from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../../images';

const Company_List = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[1500px] border-l border-black">
      <div className="absolute w-full h-full bg-[#FAF9F9]"> 
        <div className="absolute w-full h-[230px] bg-gradient-to-r from-[#E0F2FF] via-[#A1C6EA] to-[#1A73E8] opacity-65">
          <div className="absolute left-[50px] top-[40px] flex space-x-5">
            <button 
              onClick={() => navigate('/company-list')}
              className="w-[159px] h-[22px] font-normal text-lg leading-[22px] text-black"
            >
              Danh sách công ty
            </button>

            <button 
              onClick={() => navigate('/company-top')}
              className="w-[101px] h-[22px] font-normal text-lg leading-[22px] text-black"
            >
              Top công ty
            </button>
          </div>

          <div className="absolute w-[454px] h-[31px] left-[60px] top-[110px] font-bold text-[26px] leading-[31px] text-[#1B5CB3]">
            Khám phá 100.000+ công ty nổi bật
          </div>

          <div className="absolute w-[546px] h-[19px] left-[60px] top-[160px] text-[16px] leading-[19px] text-black">
            Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho bạn
          </div>

          <div className="absolute left-[900px] top-[40px] w-[450px] h-[50px]">
            <div className="w-full h-full bg-white rounded-[30px] flex items-center px-4">
              <input
                type="text"
                placeholder="Nhập tên công ty"
                className="w-[150px] h-[22px] font-bold text-base leading-[22px] text-[#CDCDCD] placeholder-[#CDCDCD] focus:outline-none"
              />
              <div className="relative flex items-center ml-auto">
                <div className="w-[130px] h-[35px] bg-[#1A73E8] rounded-[20px] flex items-center justify-center">
                  <img
                    src={images['icon_search_white.png']}
                    alt="Tìm kiếm"
                    className="mr-2 w-[20px] h-[20px]"
                  />
                  <span className="font-bold text-base leading-[22px] text-white">
                    Tìm kiếm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute w-full top-[250px]">
          {/* Tiêu đề danh sách */}
          <div className="w-full h-[29px] font-inter font-bold text-[24px] leading-[29px] text-black mb-8 text-center">
            DANH SÁCH CÁC CÔNG TY NỔI BẬT
          </div>

          {/* Danh sách công ty */}
          <div className="flex flex-wrap gap-14 justify-center"> 
            {[
              { name: "Tên công ty 1", image: images['img_test4.png'] },
              { name: "Tên công ty 2", image: images['img_test6.png'] },
              { name: "Tên công ty 3", image: images['img_test5.png'] },
            ].map((company, index) => (
              <div key={index} className="w-[400px] h-[400px]">
                <div className="box-border w-full h-full bg-white border border-[#A3A3A3] rounded-[10px]">
                  <img
                    src={company.image}
                    alt="Banner"
                    className="w-full h-[186px] rounded-t-[10px] object-cover"
                  />
                  <div className="max-w-[500px] h-[20px] font-bold text-lg leading-[19px] text-black my-5 ml-4 truncate">
                    {company.name}
                  </div>
                  <div className="max-w-[500px] h-auto font-normal text-base leading-[15px] text-black ml-4">
                    Giới thiệu: 
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company_List;