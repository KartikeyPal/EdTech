import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconButton from '../../common/IconButton';
import { FaEdit } from 'react-icons/fa';

const MyProfile = () => {
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className='w-11/12 '>
      <h1 className='font-inter text-[30px] font-bold flex flex-row items-start text-white mt-16   '>My Profile</h1>
      {/* Main portion */}
      <div className='w-full flex flex-col items-center  '>
        {/* section 1 */}
        <div className='flex flex-row w-[75%] gap-3 justify-between items-center p-10 mt-8 rounded-lg bg-richblack-800 border-richblack-200 border-2'>
          <div className='flex items-center gap-3 '>
            <img src={user?.image} alt={`profile-${user?.firstName }`} className='aspect-square w-[78px] rounded-full object-cover'/>
            <div className='flex flex-col'>
              <p className=' text-lg font-inter font-bold text-richblue-25 '>{user?.firstName + " " + user?.lastName}</p>
              <p>{user.email}</p>
            </div>
          </div>
          <div 
          className='flex  bg-yellow-25 rounded-lg  text-richblack-900 items-center h-9 w-24 hover:scale-90 justify-center transition delay-150 ease-in-out '
          >
            
          <IconButton 
          text={"Edit"}
           
          onClick={()=>{
            navigate("dashboard/settings")
          }} />
          </div>
        </div>
        {/* Section 2 */}
        <div className='flex flex-row w-[75%] gap-3 justify-between p-10 mt-8 rounded-lg bg-richblack-800 border-richblack-200 border-2'>
          <div className='flex flex-col gap-8 '>
            <p className='-mt-6' >About</p>
            <p className='text-richblack-300'>{user?.additionalDetails?.about ?? "Tell Something about yourself"}</p>
          </div>
            <IconButton text={"edit"} onClick={()=>navigate("/dashboard/settings")}/>
        </div>
        {/* section 3 */}
        <div className='flex flex-row w-[75%] gap-3 justify-between p-10 mt-8 rounded-lg bg-richblack-800 border-richblack-200 border-2'>
          <div className='flex flex-col'>
            <p className='-mt-6'>Personal Details</p> 
           

            <div>
              <div>
                <p>First Name</p>
                <p>{user?.firstName}</p>
              </div>
              <div>
                <p>Email Name</p>
                <p>{user?.email}</p>
              </div>
              <div>
                <p>Gender</p>
                <p>{user?.additionalDetails?.gender ?? " add gender"}</p>
              </div>
              <div>
                <p>Last Name</p>
                <p>{user?.lastName}</p>
              </div>
              <div>
                <p>Phone Number</p>
                <p>{user?.additionalDetails?.contactNumber ?? "add contact number"}</p>
              </div>
              <div>
                <p>Date of Birth</p>
                <p>{user?.additionalDetails?.dateOfBirth ?? "add date of birth"}</p>
              </div>
            </div>
          </div>
            <IconButton text={"edit"} onClick={()=>navigate("/Dashboard/settings")}/>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
