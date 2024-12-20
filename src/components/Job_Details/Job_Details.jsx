import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams để lấy ID từ URL
import images from '../../images';

const Job_Details = () => {
  const [selectedIcon, setSelectedIcon] = useState([]);
  const { jobId } = useParams(); // Lấy ID từ URL
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm state loading
  const [error, setError] = useState(null); // Thêm state error
  const savedJob = localStorage.getItem(`job-${jobId}`); // Lấy job từ localStorage theo jobId
  const [isSaved, setIsSaved] = useState(false);

  const handleIconClick = (iconType) => {
    setSelectedIcon(iconType);
  };
  
  // Hàm xử lý khi người dùng nhấn nút Lưu tin
  const handleSaveClick = () => {
    // Thay đổi trạng thái lưu khi nhấn nút
    setIsSaved(prevState => !prevState);  // Nếu đang lưu thì bỏ lưu, và ngược lại
    if (isSaved) {
      // Xóa khỏi yêu thích
      alert('Đã xóa khỏi danh sách yêu thích');
    } else {
      // Lưu vào danh sách yêu thích
      alert('Đã lưu vào danh sách yêu thích');
    }
  };

  useEffect(() => {
    // Kiểm tra xem jobId có hợp lệ không
    if (!jobId) {
      setError('Không tìm thấy ID công việc.');
      setLoading(false);
      return;
    }

    // Fetch API lấy chi tiết công việc từ backend dựa trên ID lấy từ URL
    const fetchJobDetails = async () => {
      try {
        // Đảm bảo đường dẫn API đúng và có thể bao gồm baseURL nếu cần
        const response = await fetch(`http://localhost:5000/api/job-details/${jobId}`);
        
        // Kiểm tra mã phản hồi HTTP
        if (!response.ok) {
          const errorMessage = `Lỗi từ server: ${response.status} - ${response.statusText}`;
          throw new Error(errorMessage);
        }
        
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết công việc:', error);
        setError(error.message); // Cập nhật thông báo lỗi
      } finally {
        setLoading(false); // Hoàn thành quá trình tải dữ liệu
      }
    };
    fetchJobDetails();
  }, [jobId]); // Chạy lại effect khi ID thay đổi

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Trạng thái khi đang tải dữ liệu
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị lỗi nếu có
  }

  // Nếu có chi tiết công việc, render chúng
  if (jobDetails) {
  return (
    <div className="relative w-[1920px] h-[2050px] top-[100px] bg-[#FAF9F9]">
      {/* Chi tiết việc làm*/}
      <div className="absolute top-[20px] left-[100px] flex items-center">
        <button className="font-bold text-base leading-[22px] text-[#1A73E8]">
          Trang chủ
        </button>
        <img src={images['icon_right_arrow_black.png']} alt="icon right arrow" className="mx-[10px] w-[20px] h-[20px]" />
        <div className="font-bold text-base leading-[22px] text-[#1A73E8]">
          Tìm việc làm
        </div>
      </div>

      <div className="relative w-full">
        <div className="absolute top-[60px] left-[100px] w-[800px] h-[300px] bg-white rounded-lg shadow-md">
          <div className="absolute top-[20px] left-[30px] font-bold text-2xl leading-[29px] text-black">
          {jobDetails.TieuDe}
          </div>
          <div className="absolute top-[80px] left-0 right-0 flex justify-between px-[45px]">
            <div className="flex items-start space-x-3">
              <img src={images['icon_salary.png']} alt="icon" className="w-[35px] h-[35px]" />
              <div className="flex flex-col">
                <div className="font-medium text-lg leading-[24px] text-black">Mức lương</div>
                <div className="text-base leading-[24px] text-black">{jobDetails.MucLuong}</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <img src={images['icon_location.png']} alt="icon" className="w-[35px] h-[35px]" />
              <div className="flex flex-col">
                <div className="font-medium text-lg leading-[24px] text-black">Địa điểm</div>
                <div className="text-base leading-[24px] text-black">{jobDetails.DiaDiem}</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <img src={images['icon_experience.png']} alt="icon" className="w-[35px] h-[35px]" />
              <div className="flex flex-col">
                <div className="font-medium text-lg leading-[24px] text-black">Kinh nghiệm</div>
                <div className="text-base leading-[24px] text-black">{jobDetails.KinhNghiem}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[230px] left-[120px] w-[280px] h-[40px] bg-[#F1F3F4] flex items-center px-4 rounded-lg">
          <img src={images['icon_lock.png']} alt="icon lock" className="w-[20px] h-[20px]" />
          <span className="ml-3 text-base leading-[24px] text-black ">
            Hạn nộp hồ sơ: {new Date(jobDetails.HanNopHoSo).toLocaleDateString('vi-VN')}
          </span>
        </div>

        <button className="absolute top-[285px] left-[120px] w-[560px] h-[40px] bg-[#1A73E8] rounded flex items-center justify-center">
          <span className="font-bold text-lg leading-[29px] text-[#FFFBFB]">
            Ứng tuyển ngay
          </span>
        </button>

        <button
        className="absolute top-[285px] left-[700px] w-[180px] h-[40px] bg-white border border-[#1A73E8] rounded flex items-center justify-center"
        onClick={handleSaveClick} // Gọi hàm khi nhấn nút
      >
        <img
          src={isSaved ? images['icon_heart_red.png'] : images['icon_heart_blue.png']} // Thay đổi icon khi nhấn
          alt="icon heart"
          className="w-[20px] h-[20px]"
        />
        <span className="ml-2 font-inter font-medium text-[20px] leading-[24px] text-[#1A73E8]">
          {isSaved ? 'Đã lưu' : 'Lưu tin'}
        </span>
      </button>

      </div>

      {/* Công ty */}
      <div className="absolute top-[60px] left-[940px] w-[450px] h-[300px] bg-white rounded-lg shadow-md">
        <div className="absolute top-[20px] left-[20px] flex items-center space-x-2">
          <img src={images['image1.png']} alt="img company" className="w-[60px] h-[60px]" />
          <div className="font-bold text-lg leading-[29px] text-black max-w-[320px] overflow-hidden whitespace-nowrap text-ellipsis">{jobDetails.TenCongTy}</div>
        </div>

        <div className="absolute top-[120px] left-[20px] flex items-center space-x-2">
          <img src={images['icon_scale.png']} alt="icon" className="w-[20px] h-[20px]" />
          <div className="font-inter font-medium text-[14px] leading-[17px] text-black">Quy mô: {jobDetails.QuyMo}</div>
        </div>

        <div className="absolute top-[170px] left-[20px] flex items-center space-x-2">
          <img src={images['icon_industry.png']} alt="icon" className="w-[20px] h-[20px]" />
          <div className="font-inter font-medium text-[14px] leading-[17px] text-black">Lĩnh vực: {jobDetails.LinhVuc}</div>
        </div>

        <div className="absolute top-[220px] left-[20px] flex items-center space-x-2">
          <img src={images['icon_location_black_company.png']} alt="icon" className="w-[20px] h-[20px]" />
          <div className="font-inter font-medium text-[14px] leading-[17px] text-black">Địa điểm: {jobDetails.DiaDiem}</div>
        </div>

        <button className="absolute bottom-[20px] left-[140px] flex items-center space-x-2 cursor-pointer">
          <div className="font-inter font-medium text-base leading-[17px] text-[#1A73E8]"
            onClick={() => handleIconClick('/company-detail')} >Xem chi tiết công ty</div>
          <img src={images['icon_detail.png']} alt="icon" className="w-[20px] h-[20px]"/>
        </button>
      </div>



      

      {/* Chi tiết*/}
      <div className="absolute w-[800px] h-[1160px] left-[100px] top-[400px] bg-white rounded-lg shadow-lg">
        <div className="absolute left-[20px] top-[20px] flex items-center">
          <div className="absolute w-[30px] h-0 left-[15px] top-[15px] border-[#1A73E8] transform rotate-90" />
          <h2 className="font-bold text-2xl leading-[29px] text-black ml-[10px]">
            Chi tiết tin tuyển dụng
          </h2>
        </div>
        {/* Mô tả công việc */}
        <div className="absolute w-[800px] h-[1100px] left-[40px] top-[75px]">
          <div className="font-bold text-lg leading-[29px] text-black mb-3">
            Mô tả công việc
          </div>
          <div className="text-black text-sm leading-[24px] max-w-[700px]">
            {jobDetails.MoTa}
          </div>
          
          <div className="font-bold text-lg leading-[29px] text-black mt-6 mb-3">
            Yêu cầu ứng viên
          </div>
          <div className="text-black text-sm leading-[24px]">
            {jobDetails.YeuCau}
          </div>

          <div className="font-bold text-lg leading-[29px] text-black mt-6 mb-3">
            Quyền lợi
          </div>
          <div className="text-black text-sm leading-[24px]">
            {jobDetails.QuyenLoi}
          </div>

          <div className="font-bold text-lg leading-[29px] text-black mt-6 mb-3">
            Địa điểm làm việc
          </div>
          <div className="text-black text-sm leading-[24px]">
            {jobDetails.DiaDiem}
          </div>

          <div className="font-bold text-lg leading-[29px] text-black mt-8">
            Cách thức ứng tuyển
          </div>
          <div className="text-[#D84432] text-sm leading-[24px]">
            {jobDetails.CachThucUngTuyen}
          </div>
        </div>

        <div className="absolute w-[200px] h-[30px] left-[40px] top-[1110px] bg-[#1A73E8] rounded-[5px] flex items-center justify-center cursor-pointer">
          <span className="font-bold text-base text-[#FFFBFB]">
            Ứng tuyển ngay
          </span>
        </div>

        <div className="absolute w-[140px] h-[30px] left-[260px] top-[1110px] border border-[#1A73E8] rounded-[5px] flex items-center justify-center cursor-pointer">
          <span className="font-normal text-base text-[#1A73E8]">
            Lưu tin
          </span>
        </div>
      </div>

      {/* Thông tin chung */}
      <div className="absolute w-[450px] h-[390px] left-[940px] top-[400px] bg-white rounded-lg shadow-md">
        <div className="absolute w-[192px] h-[29px] left-[20px] top-[20px] font-bold text-2xl leading-[29px] text-black">
          Thông tin chung
        </div>

        <div className="absolute left-[20px] top-[70px] flex items-center space-x-2">
          <img src={images['icon_rank.png']} alt="Cấp bậc" className="w-[40px] h-[40px] bg-[#1A73E8] rounded-full" />
          <div className="flex flex-col">
            <div className="font-normal text-[14px] leading-[17px] text-black mb-2">Cấp bậc</div>
            <div className="font-bold text-[14px] leading-[17px] text-black">{jobDetails.CapBac}</div>
          </div>
        </div>

        <div className="absolute left-[20px] top-[130px] flex items-center space-x-2">
          <img src={images['icon_experience1.png']} alt="Cấp bậc" className="w-[40px] h-[40px] bg-[#1A73E8] rounded-full" />
          <div className="flex flex-col">
            <div className="font-normal text-[14px] leading-[17px] text-black mb-2">Kinh nghiệm</div>
            <div className="font-bold text-[14px] leading-[17px] text-black">{jobDetails.KinhNghiem}</div>
          </div>
        </div>
        
        <div className="absolute left-[20px] top-[190px] flex items-center space-x-2">
          <img src={images['icon_quantity.png']} alt="Cấp bậc" className="w-[40px] h-[40px] bg-[#1A73E8] rounded-full" />
          <div className="flex flex-col">
            <div className="font-normal text-[14px] leading-[17px] text-black mb-2">Số lượng tuyển</div>
            <div className="font-bold text-[14px] leading-[17px] text-black">{jobDetails.SoLuongTuyen}</div>
          </div>
        </div>
        
        <div className="absolute left-[20px] top-[250px] flex items-center space-x-2">
          <img src={images['icon_working_form.png']} alt="Cấp bậc" className="w-[40px] h-[40px] bg-[#1A73E8] rounded-full" />
          <div className="flex flex-col">
            <div className="font-normal text-[14px] leading-[17px] text-black mb-2">Hình thức làm việc</div>
            <div className="font-bold text-[14px] leading-[17px] text-black">{jobDetails.HinhThucLamViec}</div>
          </div>
        </div>

        <div className="absolute left-[20px] top-[310px] flex items-center space-x-2">
          <img src={images['icon_gender.png']} alt="Cấp bậc" className="w-[40px] h-[40px] bg-[#1A73E8] rounded-full" />
          <div className="flex flex-col">
            <div className="font-normal text-[14px] leading-[17px] text-black mb-2">Giới tính</div>
            <div className="font-bold text-[14px] leading-[17px] text-black">{jobDetails.GioiTinh}</div>
          </div>
        </div>
      </div>

        {/* Thông tin cần */}
        <div className="absolute w-[450px] h-[400px] left-[940px] top-[830px] bg-white rounded-[10px] shadow-lg">
            <div className="absolute left-[20px] top-[20px] font-bold text-[24px] leading-[29px] text-black">
                Vị trí chuyên môn
            </div>

            <div className="absolute left-[20px] top-[140px] font-bold text-[24px] leading-[29px] text-black">
                Kỹ năng cần có
            </div>

            <div className="absolute left-[20px] top-[260px] font-bold text-[24px] leading-[29px] text-black">
                Khu vực
            </div>
        </div>

                    {/* Gợi ý việc làm phù hợp */}
                    <div className="absolute left-[940px] h-[600px] top-0">
                        <div className="flex flex-col space-y-4">
                            <div className="relative w-[450px] h-[600px] top-[1270px] bg-white rounded-[10px] shadow-lg">
                                <div className="absolute w-[264px] h-[29px] left-4 top-4 font-bold text-2xl leading-[29px] text-black">
                                    Gợi ý việc làm phù hợp
                                </div>
                                {[1, 2, 3, 4].map((_, index) => (
                                    <div className="relative w-[410px] h-[110px] left-5 top-[50px] my-2" key={index}>
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
                                <button className="mt-16 ml-4 w-[410px] h-[40px] bg-white border border-[#1A73E8] rounded-[5px] flex items-center justify-center"
                                    onClick={() => handleIconClick('/')} >
                                    <span className="font-bold text-base leading-[18px] text-[#1A73E8]">
                                        Xem thêm công việc
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
    </div>
  );
}
  return <div>Không tìm thấy chi tiết công việc.</div>;
};


export default Job_Details;