import React from "react";
import logo from "../../images/logo.png";
import siderIcon from "../../images/sider-icon.png";

const SiderMenu = () => {
  return (
    <div className="sider-menu-container">
      <div className="flex justify-center">
        <img src={logo} className="w-40" alt="Logo" />
      </div>

      <div className="flex bg-[#043933] rounded-md justify-evenly pr-5 items-center shadow-md h-11 mt-24 w-44">
        <img src={siderIcon} className="w-3" alt="Sider Icon" />
        <p className="text-white">CUSTOMERS</p>
      </div>
    </div>
  );
};

export default SiderMenu;
