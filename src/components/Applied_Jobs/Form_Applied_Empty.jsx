import React from 'react';
import images from '../../images';

const Form_Applied_Empty = () => {
  return (
    <div className="absolute w-[800px] h-[450px] bg-white rounded-lg">
      <div className="flex items-center justify-between w-full h-[130px] px-5 bg-white rounded-t-lg">
        <h1 className="font-inter font-bold text-[24px] leading-[29px] text-black">
          Việc làm đã ứng tuyển
        </h1>
        <div className="flex items-center w-[210px] h-[50px] bg-white border border-gray-300 rounded-lg">
          <select
            className="w-full h-full bg-white border-none text-[#CCCCCC] font-inter font-bold text-[18px] leading-[22px] px-4 rounded-lg appearance-none"
            defaultValue="Trạng thái"
          >
            <option value="Trạng thái" disabled>
              Trạng thái
            </option>
            <option value="Đã ứng tuyển">Đã ứng tuyển</option>
            <option value="NTD đã xem hồ sơ">NTD đã xem hồ sơ</option>
            <option value="Hồ sơ phù hợp">Hồ sơ phù hợp</option>
            <option value="Hồ sơ chưa phù hợp">Hồ sơ chưa phù hợp</option>
          </select>
          <img
            src={images['icon_down_arrow_black.png']}
            alt="Icon"
            className="w-[25px] h-[25px] ml-2 mr-2 pointer-events-none"
          />
        </div>
      </div>

      <div className="absolute flex flex-col items-center justify-center top-[130px] left-0 right-0 h-[320px]">
        <img
          src={images['img_job_empty.png']}
          alt="Saved Job"
          className="w-[250px] h-[125.92px] object-cover"
        />

        <p className="mt-4 w-[213px] font-inter font-normal text-[16px] leading-[19px] text-black text-center">
          Bạn chưa ứng tuyển công việc nào!
        </p>

        <div className="mt-4 w-[163px] h-[45px]">
          <button className="w-full h-full bg-[#1A73E8] rounded-lg font-inter font-bold text-[18px] leading-[22px] text-white flex items-center justify-center">
            Tìm việc ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form_Applied_Empty;