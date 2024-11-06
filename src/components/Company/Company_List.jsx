// Company_List.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Company_List = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch companies data from the backend
    axios.get('http://localhost:5000/companies')
      .then(response => {
        setCompanies(response.data);
      })
      .catch(error => {
        console.error("Error loading company data:", error);
      });
  }, []);

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
        </div>

        {/* Company List Display */}
        <div className="mt-[300px] px-10">
          {companies.map(company => (
            <div key={company.CT_ID} className="p-5 border-b border-gray-300">
              <h2 className="text-xl font-bold">{company.TenCongTy}</h2>
              <p>{company.GioiThieu}</p>
              <p><strong>Địa chỉ:</strong> {company.DiaChiCT}</p>
              <p><strong>Website:</strong> <a href={company.Website}>{company.Website}</a></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Company_List;
