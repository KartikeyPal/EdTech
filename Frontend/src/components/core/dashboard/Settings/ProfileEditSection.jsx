import React,{useEffect,useRef,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { updateProfilePicture } from '../../../../services/operations/settingsAPI';
import toast from 'react-hot-toast';
import { setUser } from '../../../../slices/profileSlice';
const ProfileEditSection = () => {
  const {token} = useSelector(state=>state.auth);
  const {user} = useSelector(state=>state.profile)
  const dispatch = useDispatch();
  const imageRef = useRef();

  const handleUpload = async()=>{
    console.log(imageRef.current.files[0]);
    const file = imageRef.current.files[0];
    if(!file){
      toast.error("Please select a file first");
      return;
    }
    const formData = new FormData();
    formData.append("displayPicture",file);

   const user =  await updateProfilePicture(formData,token);
   if(user){
     dispatch(setUser(user));
   }
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
                <input id="file" type="file" className='w-16 rounded-lg hidden' ref={imageRef}/>
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