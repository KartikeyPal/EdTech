import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { setSignupData } from '../../../slices/authSlice';
import { sendOtp } from '../../../services/operations/authAPI';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast';
const SignUpForm = () => {
    const [accountType,setAccountType] = useState("Student");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData,setFormData] = useState({
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmPassword:"",
    })
    function handleOnChange(e){
      e.preventDefault();
      setFormData((prevData)=>({
        ...prevData,[e.target.name]: e.target.value,
      }))
    }
    function handleSubmit(e){
      e.preventDefault();
        const signupData = {
          ...formData,accountType,
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords Do Not Match");
          return;
        }
        dispatch(setSignupData(signupData));
        dispatch(sendOtp(formData.email,navigate));
    }
  return (
    <div >
        <div className='w-[85%] '>
        <p className='font-semibold font-inter  text-4xl'>Join the millions learning to code with StudyNotion for free</p>
        <p className='text-[18px] font-inter  w-auto text-richblack-200'>Build skills for today, tomorrow, and beyond. <span className=' text-sm font-bold font-edu-sa size-[14px] text-[#47A5C5] '>Education to future-proof your career. </span> </p>
        </div>
        <div className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max" >
          <button className={accountType == "Student"?("bg-richblack-900 text-richblack-5 py-2 px-5 rounded-full transition-all duration-200"):("bg-transparent text-richblack-200 py-2 px-5 rounded-full transition-all duration-200")} onClick={()=>setAccountType("Student")}>Student</button>
          <button className={accountType == "Instructor"?("bg-richblack-900 text-richblack-5 py-2 px-5 rounded-full transition-all duration-200"):("bg-transparent text-richblack-200 py-2 px-5 rounded-full transition-all duration-200")} onClick={()=>setAccountType("Instructor")}>Instructor</button>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
              <div className='flex flex-row gap-3 text-white'>
                <div className='flex flex-col'>
                  <label htmlFor="First_Name">First Name <span className='text-[red]'>*</span></label>
                  <input type="text" placeholder='Enter first name' required name='firstName' className=' h-[48px] mt-1 bg-richblack-800 p-[12px] rounded-md gap-[12px] border border-richblack-700' onChange={handleOnChange} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="Last_Name">Last Name <span className='text-[red]'>*</span></label>
                  <input type="text" placeholder='Enter last name' required name='lastName' className=' h-[48px] mt-1 bg-richblack-800 p-[12px] rounded-md gap-[12px] border border-richblack-700' onChange={handleOnChange}/>
                </div>
              </div>
              <div className='flex flex-col w-[73%] mt-3'>
                <label htmlFor="Last_Name">Email<span className='text-[red]'> *</span></label>
                <input type="email" placeholder='Enter your email' required name='email' className=' h-[48px] mt-1 bg-richblack-800 p-[12px] rounded-md gap-[12px] border border-richblack-700' onChange={handleOnChange}/>
              </div>
              <div className='flex flex-row gap-3 text-white mt-3 '>
                <div className='flex flex-col '>
                  <label htmlFor="password">Create Password<span className='text-[red]'> *</span></label>
                  <input type="password" placeholder='Create Password' name='password' required className=' h-[48px] mt-1 bg-richblack-800 p-[12px] rounded-md gap-[12px] border border-richblack-700' onChange={handleOnChange} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="password">Confirm Password<span className='text-[red]'> *</span></label>
                  <input type="password" placeholder='Confirm Password' name='confirmPassword' required className=' h-[48px] mt-1 bg-richblack-800 p-[12px] rounded-md gap-[12px] border border-richblack-700' onChange={handleOnChange}/>
                </div>
              </div>
              <button type='submit' className='bg-yellow-50 w-[453px] mt-6 h-[48px] text-richblack-900 rounded-md hover:scale-95'>Create Account</button>
            </div>
        </form>
    </div>
  )
}

export default SignUpForm
