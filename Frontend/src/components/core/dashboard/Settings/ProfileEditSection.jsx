import React,{useEffect,useRef,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

const ProfileEditSection = () => {
  const {token} = useSelector(state=>state.auth);
  const {user} = useSelector(state=>state.profile)
  const dispatch = useDispatch();

  const handleUpload = async()=>{
    console.log("workding")
  }
  return (
    <div className='flex flex-row gap-6 ' >
        <div className='w-16 gap-3 '>
            <img src={user?.image} alt="user image" className='rounded-full'/>
        </div>
        <div className='flex flex-col space-y-3'>
            <p className='text-richblack-300'>Change profile picture</p>
            <div className='flex flex-row gap-3 items-center'>
                <label htmlFor="file" className='hover:cursor-pointer  font-bold text-richblack-25'>select </label>
                <input id="file" type="file" className='w-16 rounded-lg hidden' />
                <button 
                  className='border-[1px] bg-yellow-200 text-richblack-900 p-2 rounded-lg hover:scale-90'
                  onClick={handleUpload}
                >Upload</button>
            </div>
        </div>
    </div>
  )
}

export default ProfileEditSection