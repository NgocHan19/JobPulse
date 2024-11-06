import React, { useState, useEffect } from 'react';
import axios from 'axios';
import images from '../../images';

const UploadCV = () => {
  const [cvFile, setCvFile] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [jobPosition, setJobPosition] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const authToken = localStorage.getItem('authToken');
  
    console.log('userData:', userData); 
    console.log('authToken:', authToken); 
  
    if (userData && authToken) {
      setEmail(userData.email);
      setFullName(userData.fullName);
      setJobPosition(userData.jobPosition);
    } else {
      setMessage('Vui lòng đăng nhập để tải CV lên');
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
    setSelectedFileName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cvFile) {
      setMessage('Vui lòng chọn tệp CV để tải lên');
      return;
    }

    const formData = new FormData();
    formData.append('cvFile', cvFile); // Tệp CV
    formData.append('email', email); // Email người dùng gửi tới backend

    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.post('http://localhost:5000/uploadCV', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      setMessage(response.data.message || 'CV đã được tải lên thành công!');
      // Reset the form after successful upload
      setCvFile(null);
      setSelectedFileName('');
    } catch (error) {
      setMessage('Đã xảy ra lỗi khi tải lên CV');
      console.error('Lỗi:', error);
    }
  };

  if (!email || !fullName || !jobPosition) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg font-bold text-red-500">{message}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[1100px] bg-[#FAF9F9] border-black">
      <div className="absolute w-[1300px] h-[950px] left-[100px] top-[60px] bg-white rounded-lg">
        <div className="absolute w-[1300px] h-[130px] bg-gradient-to-r from-blue-500/30 to-blue-500/60 rounded-t-lg">
          <h2 className="absolute left-[30px] top-[25px] text-2xl font-bold text-white">Upload CV để các cơ hội việc làm tự tìm đến bạn</h2>
          <p className="absolute left-[30px] top-[60px] text-sm font-bold text-white">Giảm đến 50% thời gian cần thiết để tìm được công việc phù hợp</p>
        </div>

        <p className="absolute w-[910px] h-[38px] left-[20px] top-[145px] text-black font-normal text-sm leading-5">
          Bạn đã có sẵn CV của mình, chỉ cần tải CV lên, hệ thống sẽ tự động đề xuất CV của bạn tới những nhà tuyển dụng uy tín. Tiết kiệm thời gian, tìm việc thông minh, nắm bắt cơ hội và làm chủ đường đua nghề nghiệp của chính mình.
        </p>

        <div className="absolute w-[1260px] h-[200px] left-[20px] top-[200px] bg-white border-dashed border border-black">
          <div className="flex items-center justify-center space-x-2 mt-[20px]">
            <img
              src={images['icon_uploadcv.png']}
              alt="Upload Icon"
              className="w-[40px] h-[40px]"
            />
            <p className="font-bold text-base text-black">
              Tải CV lên từ máy tính, chọn hoặc kéo thả
            </p>
          </div>        
          <div className="flex justify-center mt-[13px]">
            <p className="font-bold text-base text-gray-500">
              Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới 10MB
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-[30px]">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".doc,.docx,.pdf"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="w-[120px] h-[45px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer">
              <span className="text-black font-normal text-lg">{selectedFileName || 'Chọn CV'}</span>
            </label>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-[420px]">
          <button
            className="w-[150px] h-[45px] bg-blue-500 rounded-lg"
            onClick={handleSubmit}
          >
            <span className="text-white font-bold text-lg">Tải CV lên</span>
          </button>
        </div>

        {message && (
          <div className="flex justify-center mt-4">
            <p className="text-center text-lg font-bold text-green-500">{message}</p>
          </div>
        )}

        <div className="flex flex-col items-center space-y-10 mt-[20px]">
          <div className="flex space-x-10">
            <div className="w-[600px] h-[180px] bg-white border border-gray-400 rounded-md p-6 flex flex-col items-center text-center">
              <div className="w-[60px] h-[60px] bg-green-100 rounded-full flex justify-center items-center mb-4">
                <img src={images['icon_share.png']} alt="Icon" className="w-[30px] h-[30px]" />
              </div>
              <h3 className="text-lg font-bold text-black">Chia sẻ CV bất cứ nơi đâu</h3>
              <p className="text-sm text-black">Upload một lần và sử dụng đường link gửi tới nhiều nhà tuyển dụng.</p>
            </div>

            <div className="w-[600px] h-[180px] bg-white border border-gray-400 rounded-md p-6 flex flex-col items-center text-center">
              <div className="w-[60px] h-[60px] bg-red-200 rounded-full flex justify-center items-center mb-4">
                <img src={images['icon_connect_ntd.png']} alt="Icon" className="w-[30px] h-[30px]" />
              </div>
              <h3 className="text-lg font-bold text-black">Kết nối nhanh chóng với nhà tuyển dụng</h3>
              <p className="text-sm text-black">Dễ dàng kết nối với các nhà tuyển dụng nào xem và quan tâm tới CV của bạn.</p>
            </div>
          </div>

          <div className="flex space-x-10">
            <div className="w-[600px] h-[180px] bg-white border border-gray-400 rounded-md p-6 flex flex-col items-center text-center">
              <div className="w-[60px] h-[60px] bg-blue-100 rounded-full flex justify-center items-center mb-4">
                <img src={images['icon_opportunity.png']} alt="Icon" className="w-[30px] h-[30px]" />
              </div>
              <h3 className="text-lg font-bold text-black">Nhận về các cơ hội tốt nhất</h3>
              <p className="text-sm text-black">CV của bạn sẽ được ưu tiên hiển thị với các nhà tuyển dụng đã xác thực.</p>
            </div>

            <div className="w-[600px] h-[180px] bg-white border border-gray-400 rounded-md p-6 flex flex-col items-center text-center">
              <div className="w-[60px] h-[60px] bg-orange-200 rounded-full flex justify-center items-center mb-4">
                <img src={images['icon_data_tracking.png']} alt="Icon" className="w-[30px] h-[30px]" />
              </div>
              <h3 className="text-lg font-bold text-black">Theo dõi số liệu, tối ưu CV</h3>
              <p className="text-sm text-black">Nhận báo cáo về sự quan tâm và hiệu suất của CV để cải thiện và tối ưu hóa.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCV;