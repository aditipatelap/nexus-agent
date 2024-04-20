import React from 'react';
import { Link } from 'react-router-dom';
import { MdAccountCircle, MdLogout } from "react-icons/md";

const Header = ({headerLine}) => {
  const logoPath = process.env.PUBLIC_URL + "/images/logo/logo_3x.png";

  return (
    <header className="max-w-full px-6 py-2 h-fit bg-[#deeef7] text-white flex items-center justify-start">
        {/* Logo */} 
        <Link to="/home/orders" className="w-8 h-8 sm:h-10 sm:w-10 md:h-11 md-w-11 lg:h-12 lg:w-12 xl:h-14 xl:w-14 2xl:h-20 2xl:w-20">
            <img src={logoPath} alt="Nexus" className="h-full w-full object-contain"/>
        </Link>
        <p className="h-full w-full flex justify-center text-[#3F3939] font-bold font-poppins text-xl lg:text-lg md:text-base sm:text-sm xs:text-xs">{headerLine}</p>
        
    </header>
  )
}

export default Header;
