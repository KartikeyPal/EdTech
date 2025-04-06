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
          <img src={`${user.image}`} alt="user image" className='w-7 h-7 rounded-full'/>
          <IoIosArrowDropdownCircle className='text-white group-hover:rotate-180 transition-transform delay-100'/>  
          <div className='w-min invisible absolute top-10 h-min border-collapse flex flex-col rounded-md bg-richblack-300 p-4 text-richblack-900 opacity-0 translate-y-[-10px] transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 z-10'>
              <Link to={"/dashboard/my-profile"} className='flex -mx-4 -mt-4 items-center gap-x-1 border-richblack-700 hover:bg-richblack-800 z-10 p-2 hover:text-white   '>
                <VscDashboard />
                <div className=''>Dashboard</div>
              </Link>
              <Link to={"/"} className='flex -mx-4 -mb-4 items-center gap-x-1 border-richblack-700 hover:bg-richblack-800 z-20 p-2 hover:text-white'>
                <IoMdLogOut />
                <div onClick={handleLogout}>Logout</div>
              </Link>
          </div>
        </div>
    </div>
  )
}

export default ProfileDropDown
