import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../../images';
import './Carousel.css';
import axios from 'axios';

const provincesAndCities = [
  "Tất cả tỉnh/thành phố", "Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Nha Trang",
  "Biên Hòa", "Bắc Ninh", "Bắc Giang", "Thừa Thiên Huế", "Hưng Yên", "Nam Định",
  "Ninh Bình", "Quảng Ninh", "Vĩnh Phúc", "Tuyên Quang", "Hà Tĩnh", "Thanh Hóa",
  "Quảng Bình", "Quảng Trị", "Hà Nam", "Lào Cai", "Lạng Sơn", "Hòa Bình",
  "Điện Biên", "Yên Bái", "Phú Thọ", "Ninh Thuận", "Bình Thuận",
  "Khánh Hòa", "Đắk Lắk", "Đắk Nông", "Gia Lai", "Kon Tum", "Bình Định",
  "Quảng Ngãi", "Phú Yên", "Hà Giang", "Sơn La", "Lai Châu", "Long An",
  "Tiền Giang", "Bến Tre", "Trà Vinh", "Vĩnh Long", "Đồng Tháp",
  "An Giang", "Kiên Giang", "Cà Mau", "Sóc Trăng", "Bạc Liêu", "Hậu Giang"
];

const HomePage = () => {
  const navigate = useNavigate();
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Tất cả tỉnh/thành phố");
  const [selectedFilter, setSelectedFilter] = useState('Địa điểm');
  const [selectedFilter1, setSelectedFilter1] = useState('Địa điểm');
  const [selectedRegion, setSelectedRegion] = useState('Ngẫu nhiên');
  const [regions, setRegions] = useState([]); // State chứa các địa điểm
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 6;

  const toggleCityDropdown = () => {
    setCityDropdownOpen(!cityDropdownOpen);
    if (filterDropdownOpen) {
      setFilterDropdownOpen(false);
    }
  };

  const toggleFilterDropdown = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
    if (cityDropdownOpen) {
      setCityDropdownOpen(false);
    }
  };


  const handleCityClick = (city) => {
    setSelectedCity(city);
    setCityDropdownOpen(false); 
  };
  

  const filterOptions = ['Địa điểm', 'Mức lương', 'Kinh nghiệm', 'Ngành nghề'];

  const filterOptions1 = ['Địa điểm', 'Mức lương', 'Kinh nghiệm', 'Ngành nghề'];


  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setFilterDropdownOpen(false);
  };


  const handleSelect = (selection) => {
    console.log("Selected:", selection);
  };

  // Danh sách hình ảnh
  const allImages = [
    images['img_test1.png'],
    images['img_test2.png'],
    images['img_test3.png'],
    images['img_test4.png'],
    images['img_test5.png'],
    images['img_test6.png'],
    images['img_test1.png'],
    images['img_test2.png'],
    images['img_test3.png'],
    images['img_test4.png'],
    images['img_test5.png'],
    images['img_test6.png'],
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesPerPage = 4;

  // Hàm chuyển sang hình trước đó
  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => {
      // Giảm currentIndex, nếu đã ở đầu thì chuyển về hình cuối
      if (prevIndex === 0) {
        return allImages.length - 1; // Chuyển đến hình cuối cùng
      }
      return prevIndex - 1; // Giảm chỉ số hiện tại
    });
  };

  // Hàm chuyển sang hình tiếp theo
  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => {
      // Tăng currentIndex, nếu đã ở cuối thì quay về hình đầu
      if (prevIndex === allImages.length - 1) {
        return 0; // Quay về hình đầu tiên
      }
      return prevIndex + 1; // Tăng chỉ số hiện tại
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 3000);
  
    return () => clearInterval(interval);
  }, [currentIndex]); // Theo dõi currentIndex để tự động cập nhật sau mỗi thay đổi

// Hàm tính toán hình ảnh hiện tại để hiển thị
const displayedImages = allImages.slice(
  currentIndex * imagesPerPage, // Bắt đầu từ chỉ số tính theo pages
  (currentIndex + 1) * imagesPerPage // Kết thúc tại page sau
);
  
useEffect(() => {
  axios.get('http://localhost:5000/api/jobs')
    .then(response => {
      console.log('API Response:', response.data);
      if (response.data && response.data.jobListings) {
        setJobs(response.data.jobListings); // Use correct response structure
      }
    })
    .catch(error => {
      console.error('Error fetching job data:', error);
    });
}, []);

const indexOfLastJob = (currentPage + 1) * jobsPerPage;
const indexOfFirstJob = currentPage * jobsPerPage;
const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

const totalPages = Math.ceil(jobs.length / jobsPerPage);

const prevPage = () => {
  if (currentPage > 0) setCurrentPage(currentPage - 1);
};

const nextPage = () => {
  if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
};
  


  return (
    <div className="w-full h-[2080px] bg-white relative">
      {/* Banner */}
      <div className="absolute w-full h-[250px] left-0 bg-gradient-to-r from-[#1A73E8]/35 via-[#1A73E8]/60 to-[#1A73E8]/60">
        <div className="absolute w-[700px] h-[50px] top-[30px] left-[150px] bg-white rounded-lg flex items-center pl-3 pr-3 space-x-3">
          <img src={images['icon_search.png']} alt="search-icon" className="w-[25px] h-[25px]" />
          <input type="text" placeholder="Vị trí ứng tuyển" className="outline-none font-bold text-gray-600 text-base w-full" />
          <div className="border-l border-gray-400 h-[30px] mx-10"></div>
          <img src={images['icon_location_black.png']} alt="location-icon" className="w-[25px] h-[25px]" />
          <p 
            className={`whitespace-nowrap font-bold text-gray-600 text-sm mx-10 cursor-pointer ${selectedCity === "Tất cả tỉnh/thành phố" ? 'text-[#1A73E8]' : 'text-black'}`}
            onClick={toggleCityDropdown}
          >
            {selectedCity}
          </p>
          <button onClick={toggleCityDropdown} className="w-[30px] h-[30px] flex items-center justify-center">
            <img src={images['icon_downarrow.png']} alt="dropdown-icon" className="w-[15px] h-[15px]" />
          </button>
          <button className="w-[200px] h-[30px] bg-blue-600 rounded-md text-white font-bold text-sm flex items-center justify-center ml-auto mr-3">
            Tìm kiếm
          </button>
        </div>

        {cityDropdownOpen && (
          <div className="absolute w-[230px] h-[256px] bg-white border rounded-lg shadow-lg top-[90px] left-[600px] p-4 overflow-y-auto z-50">
            <div className="space-y-2">
              {provincesAndCities.map((city, index) => (
                <p 
                  key={index} 
                  className={`font-normal text-base cursor-pointer ${selectedCity === city ? 'text-[#1A73E8]' : 'text-black'}`}
                  onClick={() => handleCityClick(city)}
                >
                  {city}
                </p>
              ))}
            </div>
          </div>
        )}
        
        <img src={images['img_intro.png']} className="absolute w-[350px] h-[205.5px] right-[40px] top-[20px] object-cover" alt="Intro" />
      </div>


      {/* Việc làm tốt nhất */}
      <div className="absolute w-full h-[460px] top-[250px] bg-[#F1F3F4]">
        <h1 className="absolute left-[100px] top-[20px] text-2xl leading-[30px] font-bold text-[#1A73E8] font-inter">
          Việc làm tốt nhất
        </h1>
        <div className="absolute w-full h-[55px] flex items-center top-[60px]">
          <div className="relative">
            <div className="w-[300px] h-[40px] bg-white border border-[#C3C3C3] border-opacity-80 rounded-[5px] flex items-center ml-[100px]">
              <img src={images['icon_filter.png']} className="w-[20px] h-[20px] mx-4" alt="Icon filter" />
              <span className="text-base leading-[20px] font-semibold text-[#CCCCCC] mr-4">Lọc theo:</span>
              <span className="text-sm leading-[20px] font-bold text-gray-600">{selectedFilter}</span>
              <img
                src={images['icon_down_arrow_black.png']}
                alt="dropdown-icon"
                className="w-[20px] h-[20px] ml-auto mr-[10px] cursor-pointer"
                onClick={toggleFilterDropdown}
              />
            </div>
            {filterDropdownOpen && (
              <div className="absolute w-[230px] h-[160px] bg-white border rounded-lg shadow-lg top-[50px] left-[100px] p-4 overflow-y-auto z-50">
                <div className="space-y-2">
                  {filterOptions.map((option, index) => (
                    <p
                      key={index}
                      className={`font-normal text-base cursor-pointer ${selectedFilter === option ? 'text-[#1A73E8]' : 'text-black'}`}
                      onClick={() => handleFilterClick(option)}
                    >
                      {option}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center ml-auto mr-28 space-x-2.5">
            <img 
              src={images['icon_page_left.png']} 
              className="w-[30px] h-[30px] cursor-pointer" 
              alt="Icon page left" 
              onClick={() => handleSelect('Previous')}
            />
            <button
              className={`text-base leading-[22px] font-bold text-white rounded-[15px] w-[120px] h-[40px] ${selectedRegion === 'Ngẫu nhiên' ? 'bg-[#1A73E8]' : 'bg-[#1A73E8]'}`}
              onClick={() => handleSelect('Ngẫu nhiên')}
            >
              Ngẫu nhiên
            </button>
            {['Hà Nội', 'Miền Bắc', 'Miền Nam', 'Hồ Chí Minh'].map((region, index) => (
              <button 
                key={index} 
                className={`text-base leading-[22px] font-normal text-black bg-white w-[120px] h-[40px] rounded-[15px] ${selectedRegion === region ? 'bg-[#1A73E8] text-white' : ''}`} 
                onClick={() => handleSelect(region)}
              >
                {region}
              </button>
            ))}
            <img 
              src={images['icon_page_right.png']} 
              className="w-[30px] h-[30px] cursor-pointer" 
              alt="Icon page right" 
              onClick={() => handleSelect('Next')}
            />
          </div>
        </div>
        
        <div className="mt-[150px] ml-[100px] flex flex-wrap gap-5">
        {Array.isArray(currentJobs) && currentJobs.length > 0 ? (
          currentJobs.map((job, index) => (
            <div key={index} className="relative w-[420px] h-[105px] bg-white rounded-md">
              <div className="absolute w-[70px] h-[76.25px] left-[20px] top-[15px]">
                <img
                  src={job.HinhURL ? `/images/${job.HinhURL}` : '/path/to/default/image1.png'}
                  alt="Company"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute left-[130px] top-[10px]">
                <button
                  className="text-base font-normal text-black mb-1 max-w-[220px] truncate"
                  onClick={() => navigate(`/job-details/${job.TTD_ID}`)} 
                >
                  {job.TieuDe}
                </button>
                <p className="text-sm font-normal text-gray-400 mb-1 max-w-[250px] truncate">{job.TenCongTy}</p>
              </div>
              <div className="absolute left-[130px] top-[65px] flex space-x-2 mt-2">
                <div className="w-[80px] h-[20px] bg-gray-300 rounded-md flex items-center justify-center">
                  <p className="text-xs text-black">{job.MucLuong}</p>
                </div>
                <div className="w-[100px] h-[20px] bg-gray-300 rounded-md flex items-center justify-center">
                  <p className="text-xs text-black">{job.DiaDiem}</p>
                </div>
              </div>
              <div className="absolute top-[8px] right-[10px] w-[45px] h-[20px] bg-red-500 rounded-full flex items-center justify-center">
                <p className="text-xs text-white">Hot</p>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs available</p>  // Fallback when currentJobs is empty or not an array
        )}
      </div>      
      <div className="relative w-full h-full left-[680px] top-[20px]">
        <div className="absolute w-[187px] h-[40px] bg-[#F1F3F4] flex items-center justify-between px-2"> 
          <button 
            className="flex items-center justify-center w-[40px] h-[40px] bg-transparent border-none cursor-pointer"
            onClick={prevPage}
            disabled={currentPage === 0} // Disabled when on the first page
          >
            <img 
              src={images['icon_page_left.png']} 
              alt="Previous Page" 
              className="w-[30px] h-[30px] object-cover"
            />
          </button>

          <div className="flex-grow flex items-center justify-center">
            <p className="font-inter font-normal text-base leading-[19px] text-[#A2A2A2]">
              {currentPage + 1} / {totalPages} pages  {/* Displaying 1-based page numbers */}
            </p>
          </div>

          <button 
            className="flex items-center justify-center w-[40px] h-[40px] bg-transparent border-none cursor-pointer"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1} // Disabled when on the last page
          >
            <img 
              src={images['icon_page_right.png']} 
              alt="Next Page" 
              className="w-[30px] h-[30px] object-cover"
            />
          </button>
        </div>
      </div>
      </div>


      {/* Danh sách giới thiệu của công ty */}
      <div className="absolute w-full top-[700px]">
        <div className="relative bg-white flex items-center justify-between px-2 h-[300px]">
          <button
            onClick={handlePrevImage}
            className="flex items-center justify-center w-[40px] h-[40px] bg-transparent border-none cursor-pointer"
          >
            <img
              src={images['icon_page_left.png']}
              alt="Icon Left"
              className="w-[30px] h-[30px] object-cover"
            />
          </button>

          <div className="flex items-center justify-center space-x-5">
            {displayedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${currentIndex + index + 1}`}
                className="w-[340px] h-[191.25px] object-cover"
              />
            ))}
          </div>

          <button
            onClick={handleNextImage}
            className="flex items-center justify-center w-[40px] h-[40px] bg-transparent border-none cursor-pointer"
          >
            <img
              src={images['icon_page_right.png']}
              alt="Icon Right"
              className="w-[30px] h-[30px] object-cover"
            />
          </button>
        </div>
      </div>



      {/* Việc làm hấp dẫn */}
      <div className="absolute w-full h-[460px] top-[1000px] bg-[#F1F3F4]">
        <h1 className="absolute left-[150px] top-[20px] text-2xl leading-[30px] font-bold text-[#1A73E8] font-inter">
          Việc làm hấp dẫn
        </h1>
        <div className="absolute w-full h-[55px] flex items-center top-[60px]">
          <div className="relative">
            <div className="w-[300px] h-[40px] bg-white border border-[#C3C3C3] border-opacity-80 rounded-[5px] flex items-center ml-[150px]">
              <img src={images['icon_filter.png']} className="w-[20px] h-[20px] mx-4" alt="Icon filter" />
              <span className="text-base leading-[20px] font-semibold text-[#CCCCCC] mr-4">Lọc theo:</span>
              <span className="text-sm leading-[20px] font-bold text-gray-600">{selectedFilter}</span>
              <img
                src={images['icon_down_arrow_black.png']}
                alt="dropdown-icon"
                className="w-[20px] h-[20px] ml-auto mr-[10px] cursor-pointer"
                onClick={toggleFilterDropdown}
              />
            </div>

            {filterDropdownOpen && (
              <div className="absolute w-[230px] h-[160px] bg-white border rounded-lg shadow-lg top-[50px] left-[200px] p-4 overflow-y-auto z-50">
                <div className="space-y-2">
                  {filterOptions1.map((option, index) => (
                    <p
                      key={index}
                      className={`font-normal text-base cursor-pointer ${selectedFilter === option ? 'text-[#1A73E8]' : 'text-black'}`}
                      onClick={() => handleFilterClick(option)}
                    >
                      {option}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center ml-[100px] space-x-2.5">
            <img 
              src={images['icon_page_left.png']} 
              className="w-[30px] h-[30px] cursor-pointer" 
              alt="Icon page left" 
              onClick={() => handleSelect('Previous')}
            />
            <button
              className={`text-base leading-[22px] font-bold text-white rounded-[15px] w-[120px] h-[40px] ${selectedRegion === 'Ngẫu nhiên' ? 'bg-[#1A73E8]' : 'bg-[#1A73E8]'}`}
              onClick={() => handleSelect('Ngẫu nhiên')}
            >
              Ngẫu nhiên
            </button>
            {['Hà Nội', 'Hồ Chí Minh'].map((region, index) => (
              <button 
                key={index} 
                className={`text-base leading-[22px] font-normal text-black bg-white w-[120px] h-[40px] rounded-[15px] ${selectedRegion === region ? 'bg-[#1A73E8] text-white' : ''}`} 
                onClick={() => handleSelect(region)}
              >
                {region}
              </button>
            ))}
            <img 
              src={images['icon_page_right.png']} 
              className="w-[30px] h-[30px] cursor-pointer" 
              alt="Icon page right" 
              onClick={() => handleSelect('Next')}
            />
          </div>
        </div>

        <div className="mt-[150px] ml-[150px] w-[1000px] flex flex-wrap gap-5">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="relative w-[420px] h-[105px] bg-white rounded-md">
              <div className="absolute w-[70px] h-[76.25px] left-[20px] top-[15px]">
                <img src={images['image1.png']} alt="Company" className="w-full h-full object-cover" />
              </div>

              <div className="absolute left-[130px] top-[10px]">
                <button className="text-base font-normal text-black mb-1 max-w-[220px] truncate">Tên vị trí ứng tuyển</button>
                <p className="text-sm font-normal text-gray-400 mb-1 max-w-[250px] truncate">Tên công ty</p>
              </div>

              <div className="absolute left-[130px] top-[65px] flex space-x-2 mt-2">
                <div className="w-[80px] h-[20px] bg-gray-300 rounded-md flex items-center justify-center">
                  <p className="text-xs text-black">Giá</p>
                </div>
                <div className="w-[100px] h-[20px] bg-gray-300 rounded-md flex items-center justify-center">
                  <p className="text-xs text-black">Địa điểm</p>
                </div>
              </div>

              <div className="absolute top-[8px] right-[10px] w-[45px] h-[20px] bg-red-500 rounded-full flex items-center justify-center">
                <p className="text-xs text-white">Hot</p>
              </div>
            </div>
          ))}

          <div className="absolute top-[20px] right-[120px] w-[305.25px] h-[420px]">
            <img
              src={images['image3.png']}
              alt="Large Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="relative w-full h-full left-[480px] top-[20px]">
          <div className="absolute w-[187px] h-[40px] bg-[#F1F3F4] flex items-center justify-between px-2"> 
            <button className="flex items-center justify-center w-[40px] h-[40px] bg-transparent border-none cursor-pointer">
              <img 
                src={images['icon_page_left.png']} 
                alt="Icon 9" 
                className="w-[30px] h-[30px] object-cover"
              />
            </button>
            
            <div className="flex-grow flex items-center justify-center">
              <p className="font-inter font-normal text-base leading-[19px] text-[#A2A2A2]">
                1/10 trang
              </p>
            </div>

            <button className="flex items-center justify-center w-[40px] h-[40px] bg-transparent border-none cursor-pointer">
              <img 
                src={images['icon_page_right.png']} 
                alt="Icon 10" 
                className="w-[30px] h-[30px] object-cover"
              />
            </button>
          </div>
        </div>
      </div>


      {/* Top ngành nghề nổi bật */}
      <div className="absolute w-full h-[600px] top-[1480px] bg-white">
        <div className="flex items-center justify-between mx-[100px] mt-[20px]">
          <h2 className="font-bold text-[28px] leading-[34px] text-[#1A73E8]">
            Top ngành nghề nổi bật
          </h2>
          <div className="flex items-center">
            <button className="flex items-center justify-center">
              <img 
                src={images['icon_page_left.png']} 
                className="w-[30px] h-[30px] object-cover"
              />
            </button>
            <button className="flex items-center justify-center pl-4">
              <img 
                src={images['icon_page_right.png']} 
                className="w-[30px] h-[30px] object-cover"
              />
            </button>
          </div>
        </div>

        <div className="mt-[20px] flex flex-wrap gap-2 justify-center">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="relative w-[300px] h-[200px] m-4 bg-[#F1F3F4] rounded-lg flex flex-col items-center justify-center"
            >
              <img
                src={images['image2.png']}
                className="w-[70px] h-[70px] mb-4"
                alt="icon"
              />
              <p className="font-normal text-[20px] leading-[24px] text-black text-center mb-4">
                Kinh doanh/ Bán hàng
              </p>
              <p className="font-normal text-[16px] leading-[19px] text-[#1A73E8] text-center">
                27.332 việc làm
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;