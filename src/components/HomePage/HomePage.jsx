import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const HomePage = () => {
  return (
    <div>
      {/* Search Bar Section */}
      <div className="bg-blue-100 w-full h-[100px] flex items-center justify-center">
        <div className="w-full max-w-7xl flex items-center">
          <input 
            type="text" 
            placeholder="Vị trí ứng tuyển" 
            className="p-2 w-2/3 rounded-l-md border border-gray-300"
          />
          <button className="bg-blue-500 text-white p-2 rounded-r-md">
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Best Jobs Section */}
      <div className="w-full mt-10">
        <h2 className="text-2xl font-bold text-center">Việc làm tốt nhất</h2>
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button className="bg-gray-200 px-4 py-2 rounded-md">Ngẫu nhiên</button>
          <button className="bg-gray-200 px-4 py-2 rounded-md">Hà Nội</button>
          <button className="bg-gray-200 px-4 py-2 rounded-md">Hồ Chí Minh</button>
          <button className="bg-gray-200 px-4 py-2 rounded-md">Miền Bắc</button>
          <button className="bg-gray-200 px-4 py-2 rounded-md">Miền Nam</button>
        </div>
        <div className="flex justify-center items-center mt-6">
          <div className="grid grid-cols-3 gap-4 max-w-7xl">
            {/* Example Job Cards */}
            <JobCard title="Tên vị trí ứng tuyển" company="Tên công ty" hot />
            <JobCard title="Tên vị trí ứng tuyển" company="Tên công ty" />
            <JobCard title="Tên vị trí ứng tuyển" company="Tên công ty" gsb />
          </div>
        </div>
      </div>

      {/* Job Market Section */}
      <div className="w-full bg-green-100 py-10 mt-10">
        <h2 className="text-center text-2xl font-bold">
          Thị trường việc làm hôm nay <span className="text-green-600">21/09/2024</span>
        </h2>
        <div className="max-w-7xl mx-auto mt-6 grid grid-cols-3 gap-4">
          {/* Market Data */}
          <MarketInfo number="2.337" label="Việc làm mới 24h gần nhất" />
          <MarketInfo number="41.886" label="Việc làm đang tuyển" />
          <MarketInfo number="14.672" label="Công ty đang tuyển" />
        </div>

        <div className="mt-10 flex justify-center">
          <img
            src="/images/image.png"
            alt="Thống kê thị trường"
            className="max-w-7xl"
          />
        </div>
      </div>

      {/* Top Job Sectors */}
      <div className="w-full mt-10">
        <h2 className="text-2xl font-bold text-center">Top ngành nghề nổi bật</h2>
        <div className="grid grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
          <JobSector title="Kinh doanh/ Bán hàng" jobs="27,332 việc làm" />
          <JobSector title="IT phần mềm" jobs="27,332 việc làm" />
          <JobSector title="Hành chính/ Văn phòng" jobs="27,332 việc làm" />
          <JobSector title="Giáo dục/ Đào tạo" jobs="27,332 việc làm" />
        </div>
      </div>
    </div>
  );
};

// JobCard Component
const JobCard = ({ title, company, hot, gsb }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <p>{company}</p>
      {hot && <span className="text-red-500 font-bold">Hot</span>}
      {gsb && <span className="text-orange-500 font-bold">Gấp</span>}
    </div>
  );
};

// MarketInfo Component
const MarketInfo = ({ number, label }) => {
  return (
    <div className="text-center">
      <h3 className="text-3xl font-bold">{number}</h3>
      <p>{label}</p>
    </div>
  );
};

// JobSector Component
const JobSector = ({ title, jobs }) => {
  return (
    <div className="bg-gray-200 p-6 rounded-lg text-center">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-blue-600">{jobs}</p>
    </div>
  );
};

export default HomePage;