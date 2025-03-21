import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import IconButton from '../../../common/IconButton'
import {useDispatch, useSelector} from 'react-redux'
import { updateProfile } from '../../../../services/operations/settingsAPI';
import { setUser } from '../../../../slices/profileSlice';
const ProfileInformationEditSection = () => {
  const {token} = useSelector(state=>state.auth);
  const {user} = useSelector(state=>state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Updated user data:", user);
  }, [user]);

  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm();

  const onSubmit = async(data)=>{
    const res = await updateProfile(data,token);
   const updatedUser = res.data.updatedUser;
    dispatch(setUser(updatedUser));
  }

  return (
    <div className='w-full flex flex-col justify-center gap-3'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='font-bold text-2xl flex flex-col'>Profile Information</h1>
        <div className='w-full flex flex-row  gap-9'>
          <div className='flex flex-col gap-3 w-[48%]'>
              <div className='flex flex-col'>
                <label htmlFor="firstName">First Name</label>
                <input 
                  type="text" 
                  name='firstname' 
                  id='firstname' 
                  className='form-style'
                  {...register('firstName')}
                  defaultValue={user?.firstName}
                />
                
              </div>
              <div className='flex flex-col'>
                <label htmlFor="dateOfBirth">Date Of Birth</label>
                <input 
                  type="date" 
                  name="dateOfBirth"
                  id='dateOfBirth'
                  className='form-style'
                  {...register('dateOfBirth')}   
                  defaultValue={user?.additionalDetails?.dateOfBirth} 
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="contactNumber">Contact Number</label>
                <input 
                  type="text"
                  inputMode="numeric"
                  name='contactNumber'
                  id='contactNumber'
                  {...register('contactNumber')}  
                  className='form-style'
                  defaultValue={user?.additionalDetails?.contactNumber}

                />
              </div>
          </div>
          <div className='flex flex-col gap-3 w-[48%]' >
              <div className='flex flex-col'>
                <label htmlFor="lastName">Last Name</label>
                <input 
                  type="text"
                  name='lastname'
                  id='lastName'
                  {...register('lastName')} 
                  className='form-style'
                  defaultValue={user?.lastName}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="gender">Gender</label>
                <select 
                  name="gender" 
                  id="gender"
                  className='form-style'
                  {...register('gender')}
                  defaultValue={user?.additionalDetails?.gender}
                  >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                
              </div>
              <div className='flex flex-col'>
                <label htmlFor="about">About</label>
                <input 
                  type="text"
                  id='about'
                  name='about'
                  className='form-style'
                  {...register('about')}
                  defaultValue={user?.additionalDetails?.about}
                />
              </div>
          </div>
        </div>
        <IconButton
          text="save"
          type="summit"
          customClasses={"bg-yellow-25 text-richblack-900 p-2 mt-9 rounded-lg hover:scale-95"}
        />
      </form>
    </div>
  )
}

export default ProfileInformationEditSection