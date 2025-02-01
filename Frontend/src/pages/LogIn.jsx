import React from 'react'
import login from '../../assets/Images/login.webp'
import {Link} from 'react-router-dom'

const LogIn = () => {
  return (
    <div className='w-11/12 items-center justify-between max-w-maxContent flex flex-row mx-auto text-richblack-5 mt-20 '>
        <div className='flex flex-col w-[50%] gap-3'>
            <p className='font-semibold text-4xl font-inter'>Welcome back</p>
            <p className='text-[18px] font-inter  w-auto text-richblack-200'>Build skills for today, tomorrow, and beyond. <br /> <span className=' text-sm font-bold font-edu-sa size-[14px] text-[#47A5C5] '>Education to future-proof your career. </span> </p>
            <div className='flex flex-col w-[73%] mt-3'>
                <label htmlFor="Enter Address">Email<span className='text-[red]'> *</span></label>
                <input type="email" placeholder='Enter your email' required className=' h-[48px] mt-1 bg-richblack-800 p-[12px] rounded-md gap-[12px] border border-richblack-700'/>
            </div>
            <div className='flex flex-col w-[73%] mt-3'>
                <label htmlFor="Password">Password<span className='text-[red]'> *</span></label>
                <input type="password" placeholder='Enter your password' required className=' h-[48px] mt-1 bg-richblack-800 p-[12px] rounded-md gap-[12px] border border-richblack-700'/>
            </div>
            <div className=' text-sm font-bold font-edu-sa size-[14px] text-[#47A5C5] w-[73%] text-end'>
                <Link to={"/forgot-password"} className='items-end '>
                <div>Forgot password</div>
                </Link>
            </div>

            <button type='submit' className='bg-yellow-50 w-[73%] mt-6 h-[48px] text-richblack-900 rounded-md hover:scale-95'>Create Account</button>
       
        </div>
        <div className='flex flex-col w-[50%] gap-3 items-center mt-10'>
            <img src={login} alt="login image" className='w-[70%] shadow-xl shadow-pink-600 rounded-lg ' />
        </div>

    </div>
  )
}

export default LogIn
