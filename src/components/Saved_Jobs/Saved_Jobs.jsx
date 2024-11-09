import React, { useState, useEffect } from 'react';
import axios from 'axios';
import images from '../../images';

const Saved_Jobs = () => {
    const [selectedIcon, setSelectedIcon] = useState('Cập nhật gần đây'); 
    const [savedJobs, setSavedJobs] = useState([]);  // Lưu danh sách công việc yêu thích
    const [jobDetails, setJobDetails] = useState({});  // Lưu chi tiết công việc yêu thích
    const [loading, setLoading] = useState(true);

    const handleIconClick = (iconType) => {
        setSelectedIcon(iconType); 
    };

    // Lấy các công việc yêu thích từ localStorage và API khi component được render
    useEffect(() => {
        // Lấy danh sách các công việc yêu thích từ localStorage
        const savedJobIds = Object.keys(localStorage)
            .filter(key => key.startsWith('job-'))
            .map(key => key.replace('job-', ''));  // Lấy các jobId từ localStorage

        setSavedJobs(savedJobIds);  // Cập nhật savedJobs với ID công việc từ localStorage

        if (savedJobIds.length > 0) {
            // Gọi API để lấy chi tiết từng công việc đã lưu
            const jobDetailsPromises = savedJobIds.map((jobId) => 
                axios.get(`http://localhost:5000/api/job-details/${jobId}`)  // Gọi API lấy thông tin chi tiết công việc
                    .then(response => response.data)
                    .catch(error => {
                        console.error(`Error fetching details for job ${jobId}:`, error);
                        return null;  // Tránh lỗi nếu không lấy được dữ liệu
                    })
            );

            // Sau khi lấy tất cả dữ liệu, cập nhật jobDetails
            Promise.all(jobDetailsPromises)
                .then((details) => {
                    const jobDetailsMap = details.filter(detail => detail !== null).reduce((acc, detail) => {
                        acc[detail.jobId] = detail;  // Giả sử mỗi công việc có trường jobId
                        return acc;
                    }, {});
                    setJobDetails(jobDetailsMap);  // Lưu thông tin công việc vào state
                })
                .finally(() => setLoading(false));  // Hoàn tất việc lấy dữ liệu
        } else {
            setLoading(false);  // Nếu không có công việc yêu thích, hoàn tất việc tải
        }
    }, []);  // useEffect sẽ chạy khi component được render lần đầu

// Hàm xử lý khi nhấn nút yêu thích
const handleSaveJob = (jobId) => {
    // Cập nhật danh sách công việc yêu thích bằng cách lọc bỏ công việc đã chọn
    const updatedJobs = savedJobs.filter(job => job.ID !== jobId);

    // Cập nhật lại danh sách savedJobs
    setSavedJobs(updatedJobs);  // setSavedJobs là hàm để cập nhật trạng thái của savedJobs

    // Thông báo công việc đã xóa
    alert('Công việc đã được xóa khỏi danh sách yêu thích');
};

    // Hàm tính toán ngày còn lại
    const calculateDaysLeft = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const timeDiff = deadlineDate - today;
        const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24)); // Tính số ngày còn lại
        return daysLeft > 0 ? daysLeft : 0;  // Trả về số ngày còn lại hoặc 0 nếu hết hạn
    };

    if (loading) {
        return <div>Loading...</div>;  // Chờ dữ liệu từ API
    }
    
    
    return (
        <div className="relative w-full h-[1100px] top-[180px] bg-[#FAF9F9]">
            <div className="absolute w-[600px] h-[510px] left-[60px] top-[50px]">
                <div className="relative w-[900px] h-[900px] bg-white rounded-[10px]">
                    <div className="absolute top-0 left-0 w-full h-[110px] bg-gradient-to-b from-[#1A73E8] via-[#1A73E8]/60 to-transparent rounded-t-lg">
                        <h2 className="absolute left-[40px] top-[20px] text-white font-bold text-2xl leading-[29px]">
                            Việc làm đã lưu
                        </h2>
                        <p className="absolute left-[45px] top-[60px] text-white font-bold text-[12px] leading-[15px]">
                            Xem lại danh sách những việc làm mà bạn đã lưu. Ứng tuyển ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.
                        </p>
                    </div>

                    <div className="absolute left-[40px] top-[120px] text-black font-normal text-[16px] leading-[19px]">
                        Danh sách việc làm đã lưu: {savedJobs.length}
                    </div>

                    <div className="absolute left-0 top-[150px] w-full border-t border-[#D9D9D9]"></div>
                    <div className="absolute left-0 top-[190px] w-full border-t border-[#D9D9D9]"></div>

                    <div className="flex absolute left-[40px] top-[160px] space-x-4 gap-8">
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
                            Cần tuyển gấp
                        </div>

                        <div className="flex items-center text-black font-normal text-[16px] leading-[19px]" onClick={() => handleIconClick('highestSalary')}>
                            <img 
                                src={selectedIcon === 'highestSalary' ? images['icon_tick_green.png'] : images['icon_tick_empty.png']}
                                alt="Lương cao nhất" 
                                className="mr-2 w-[20px] h-[20px]" 
                            />
                            Lương cao nhất
                        </div>
                    </div>

                    <div className="absolute left-[40px] top-[220px] right-[40px] bottom-[10px] overflow-hidden max-h-[800px]">
                        <div className="flex flex-col space-y-4">
                            {savedJobs.map((job, index) => (
                                <div
                                    key={job.ID}  // Sử dụng job.ID làm key để đảm bảo tính duy nhất
                                    className="relative w-full h-[150px] bg-white border border-[#C5C0C0] rounded-[5px] p-4 flex items-center"
                                >
                                    {/* Hình ảnh công việc */}
                                    <img
                                        src={job.HinhURL ? `/images/${job.HinhURL}` : '/path/to/default/image1.png'}
                                        alt="Job Image"
                                        className="w-[90px] h-[98.04px] object-cover"
                                    />

                                    {/* Tiêu đề công việc */}
                                    <button className="absolute left-[150px] top-[10px] font-normal text-base leading-[19px] text-black">
                                        {job.TieuDe}
                                    </button>

                                    {/* Mức lương */}
                                    <div className="absolute right-[60px] top-[20px] font-bold text-lg leading-[19px] text-[#1A73E8]">
                                        {job.MucLuong}
                                    </div>

                                    {/* Tên công ty */}
                                    <button className="absolute left-[150px] top-[40px] font-normal text-sm leading-[15px] text-[#A2A2A2]">
                                        {job.TenCongTy}
                                    </button>

                                    {/* Địa điểm */}
                                    <div className="absolute w-[100px] left-[150px] top-[70px] bg-[#D9D9D9] rounded-[5px] p-1 text-black text-xs leading-[15px] flex items-center justify-center">
                                        {job.DiaDiem}
                                    </div>

                                    {/* Cập nhật */}
                                    <div className="absolute w-[180px] left-[150px] top-[105px] bg-[#D9D9D9] rounded-[5px] p-1 font-normal text-xs leading-[15px] text-black flex items-center justify-center">
                                        Cập nhật 1 tuần trước
                                    </div>

                                    {/* Thời gian còn lại */}
                                    <div className="absolute w-[180px] left-[260px] top-[70px] bg-[#D9D9D9] rounded-[5px] p-1 font-normal text-xs leading-[15px] text-black flex items-center justify-center">
                                        Còn {calculateDaysLeft(job.Deadline)} ngày để ứng tuyển
                                    </div>

                                    {/* Các nút hành động */}
                                    <div className="absolute right-[10px] bottom-[10px] flex items-center space-x-2">
                                        {/* Nút ứng tuyển */}
                                        <button className="w-[110px] h-[30px] bg-[#1A73E8] rounded-[5px] flex items-center justify-center">
                                            <span className="font-bold text-base leading-[18px] text-white">
                                                Ứng tuyển
                                            </span>
                                        </button>

                                        {/* Nút xóa */}
                                        <button className="w-[30px] h-[30px] bg-[#F1F3F4] rounded-[5px] flex items-center justify-center">
                                            <img
                                                src={images['icon_trash_can.png']}
                                                alt="Icon 1"
                                                className="w-[20px] h-[20px] object-cover"
                                            />
                                        </button>

                                        {/* Nút yêu thích */}
                                        <button
                                            className="w-[30px] h-[30px] bg-[#E0EDFF] rounded-[5px] flex items-center justify-center"
                                            onClick={() => handleSaveJob(job.ID)}  // Gọi hàm lưu/xóa công việc yêu thích
                                        >
                                            <img
                                                src={savedJobs.some(savedJob => savedJob.ID === job.ID) ? images['icon_heart_red.png'] : images['icon_heart_blue.png']}
                                                alt="Icon"
                                                className="w-[20px] h-[20px] object-cover"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gợi ý việc làm phù hợp */}
                    <div className="absolute left-[950px] h-[600px] top-0">
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

export default Saved_Jobs;