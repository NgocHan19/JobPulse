import React, { useState, useEffect, useRef  } from 'react';
import images from '../../images';
import axios from 'axios';

const UploadCV = () => {
  const [cvFile, setCvFile] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [cvTitle, setCvTitle] = useState(''); // Đảm bảo biến này được sử dụng đúng
  const [loading, setLoading] = useState(false);
  const [showTitleForm, setShowTitleForm] = useState(false);
  const fileInput = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setCvFile(file);
      console.log('Selected file:', file); // Log file data for debugging
    }
  };

  // Handle title input change
  const handleTitleChange = (e) => {
    setCvTitle(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cvFile || !cvTitle) {
      alert('Vui lòng chọn tệp và nhập tiêu đề!');
      return;
    }

    const formData = new FormData();
    formData.append('cvFile', cvFile); // cvFile is the file to upload
    formData.append('TieuDe', cvTitle); // Using cvTitle for the title input

    setLoading(true); // Start loading indicator

    try {
      const response = await axios.post('http://localhost:5000/uploadCV', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Tải lên thành công');
      console.log('Upload thành công:', response.data);

      // Reset file input and title after successful upload
      setCvFile(null);
      setSelectedFileName('');
      setCvTitle('');
      fileInput.current.value = ''; // Reset file input

    } catch (error) {
      console.error('Lỗi khi tải lên:', error);
      setMessage('Lỗi khi tải lên CV: ' + (error.response ? error.response.data : error.message));
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

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
            <label htmlFor="file-upload" className="w-[200px] h-[45px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer">
              <span className="text-black font-normal text-lg">{selectedFileName || 'Chọn CV'}</span>
            </label>
          </div>

          {selectedFileName && (
            <div className="flex justify-center gap-4">
              <button
                className="w-[150px] h-[40px] bg-blue-500 rounded-lg mt-11"
                onClick={() => setShowTitleForm(true)} // Show title form
              >
                <span className="text-white font-bold text-lg">Tải CV lên</span>
              </button>
            </div>
          )}

          {showTitleForm && (
            <div className="flex justify-center mt-[30px]">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={cvTitle}
                    onChange={handleTitleChange}
                    placeholder="Nhập tiêu đề CV"
                    className="w-[300px] h-[45px] border border-gray-300 rounded-lg p-2"
                    required
                  />
                  <button
                    type="submit"
                    className="w-[150px] h-[45px] bg-blue-500 rounded-lg"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? 'Đang tải...' : 'Xác nhận'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {message && (
          <div className="flex justify-center mt-4">
            <p className={`text-center text-lg font-bold ${message.includes('Lỗi') ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          </div>
        )}
        <div className="flex flex-col items-center space-y-10 mt-[480px]">
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