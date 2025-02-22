import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../../services/operations/authAPI';
import { VscDashboard } from "react-icons/vsc";
import { IoMdLogOut } from "react-icons/io";

const ProfileDropDown = () => {
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout = ()=>{
      dispatch(logOut(navigate))
    }
  return (
    <div className='   mr-9 w-auto '>
        <div className='  flex flex-row gap-2 items-center group '>
          <img src={`${user.image}`} alt="user image" className='w-9 rounded-full'/>
          <IoIosArrowDropdownCircle className='text-white'/>  
          <div className='w-min invisible absolute right-[6.2%] top-12 h-min border-collapse  flex flex-col rounded-md bg-richblack-700 p-4 text-richblack-900 opacity-0 transition-all duration-200  group-hover:visible group-hover:opacity-100 z-10  '>
              <Link to={"/dashboard/my-profile"} className='flex  items-center gap-x-1 border-richblack-700 rounded-md hover:bg-richblack-800 z-20 p-2 hover:text-white   '>
                <VscDashboard />
                <div>Dashboard</div>
              </Link>
              <Link to={"/"} className='flex  items-center gap-x-1 border-richblack-700 rounded-md hover:bg-richblack-800 z-20 p-2 hover:text-white'>
                <IoMdLogOut />
                <div onClick={handleLogout}>Logout</div>
              </Link>
          </div>
        </div>
    </div>
  )
}

export default ProfileDropDown
