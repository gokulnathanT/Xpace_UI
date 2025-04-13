import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell,faUser} from '@fortawesome/free-regular-svg-icons';
import { faPlus} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div className="h-16 z-50 bg-white sticky top-0 shadow-md flex items-center justify-between px-4">
      <div className="text-lg font-bold">Logo</div>
      <div className="flex items-center space-x-4">
        <div className="text-gray-600 hover:text-black cursor-pointer">
          <FontAwesomeIcon icon={faBell} size="lg" />
        </div>
        <button className="px-4 py-2 bg-[#3730a3] flex items-center gap-2 rounded-lg hover:bg-blue-600">
        <FontAwesomeIcon icon={faPlus} size="md" color="white"/> 
        <div className='text-white font-mono'>Create Journey</div>
        </button>
        <div>
        <FontAwesomeIcon icon={faUser} className='h-[30px] w-[18px] border rounded-full p-2' />
      </div>
      </div>
      
    </div>
  );
};

export default Navbar;
