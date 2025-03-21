import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import IconButton from '../../../common/IconButton';
import { updatePassword } from '../../../../services/operations/settingsAPI';
import { useSelector } from 'react-redux';

const PasswordEditSection = () => {
  const {token} = useSelector(state => state.auth);
  const [currentPassword,setCurrentPassword]  = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [showCurrentPassword,setShowCurrentPassword ] = useState(false);
  const [showNewPassword,setShowNewPassword] = useState(false);   
  
  const updatepassword = async() =>{
    await updatePassword(currentPassword,newPassword,token)
  }
  
  return (
    <div className='w-full flex flex-col justify-center gap-3'>
      <h1 className='font-bold text-2xl text-richblack-50'>Password</h1>
      <div className='flex flex-row gap-9 w-full'>
          <div className='flex flex-col w-[48%] relative'>
              <label htmlFor="currentPassword">Current Password</label>
              <input type={showCurrentPassword? 'text' : 'password'} name='currentPassword' className='form-style' onChange={(e)=>setCurrentPassword(e.target.value)} value={currentPassword}/>
              <span className='absolute right-3 top-10 cursor-pointer ' onClick={()=>setShowCurrentPassword(!showCurrentPassword)}>
                {showCurrentPassword? <FaRegEye/> : <FaRegEyeSlash/>}
              </span>
          </div>
          <div className='flex flex-col w-[48%] relative'>
              <label htmlFor="newPassword">New Password</label>
              <input type={showNewPassword? 'text' : 'password'} name='newPassword' id='newPassword' onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} className='form-style ' />
              <span className='absolute right-3 top-10 cursor-pointer ' onClick={()=>setShowNewPassword(!showNewPassword)}>
                {showNewPassword? <FaRegEye/> : <FaRegEyeSlash/>}
              </span>
          </div>
      </div>

      <IconButton text={"Update Password"} onClick={updatepassword} customClasses={"bg-yellow-25 text-richblack-900 max-w-maxContent p-2 rounded-lg hover:scale-95 w-36"} />
    </div>
  )
}

export default PasswordEditSection