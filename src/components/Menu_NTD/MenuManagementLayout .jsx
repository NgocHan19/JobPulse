import React from 'react';
import Menu from '../Menu_NTD/Menu';
import Management_Company from '../Company/Management_Company';

const MenuManagementLayout = () => {
  return (
    <div className="app flex h-screen">
      <div className="w-[220px] h-[1080px]">
        <Menu /> {/* Menu sẽ nằm bên trái */}
      </div>
      <div className="flex-1 bg-white">
        <Management_Company /> {/* Management_Company sẽ nằm bên phải */}
      </div>
    </div>
  );
};

export default MenuManagementLayout;