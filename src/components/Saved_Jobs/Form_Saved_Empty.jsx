import React from 'react';
import images from '../../images';

const Form_Saved_Empty = () => {
  return (
    <div className="absolute w-[1000px] h-[450px] bg-white rounded-lg">
      {/* Header */}
      <div className="absolute w-[1000px] h-[130px] bg-gradient-to-b from-[#1A73E8] via-[#1A73E8]/60 to-transparent rounded-t-lg">
        <h1 className="absolute w-[180px] h-[29px] font-inter font-bold text-[24px] leading-[29px] text-white top-[20px] left-[20px]">
          Việc làm đã lưu
        </h1>
        <p className="absolute w-[668px] h-[15px] font-inter font-bold text-[12px] leading-[15px] text-white top-[60px] left-[20px]">
          Xem lại danh sách những việc làm mà bạn đã lưu. Ứng tuyển ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.
        </p>
      </div>

      {/* Content Container */}
      <div className="absolute flex flex-col items-center justify-center top-[130px] left-0 right-0 h-[320px]">
        {/* Image */}
        <img
          src={images['img_job_empty.png']}
          alt="Saved Job"
          className="w-[250px] h-[125.92px] object-cover"
        />

        {/* No jobs saved message */}
        <p className="mt-4 w-[213px] font-inter font-normal text-[16px] leading-[19px] text-black text-center">
          Bạn chưa lưu công việc nào!
        </p>

        {/* Button Group */}
        <div className="mt-4 w-[163px] h-[45px]">
          <div className="w-full h-full bg-[#1A73E8] rounded-lg flex items-center justify-center">
            <button className="font-inter font-bold text-[18px] leading-[22px] text-white">
              Tìm việc ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form_Saved_Empty;