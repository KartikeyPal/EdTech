import React, { useState } from 'react'
import login from '../../assets/Images/login.webp'
import {Link} from 'react-router-dom'
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
import {logIn}  from '../services/operations/authAPI'
const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        email: "",
        password: "",
    })

    function handleOnChange(e){
        e.preventDefault();
        setFormData((prevData)=>({
          ...prevData,[e.target.name]: e.target.value,
        }))
        console.log(formData)
      }

    function handleOnSubmit(e){
        e.preventDefault();
        if(!formData.email){
            toast.error("enter Your email");
        }
        if(!formData.password){
            toast.error("wrong password");
        }
        dispatch(logIn(formData.email,formData.password,navigate));

    }
    
  return (
    <div className='w-11/12 pt-24 pb-12 items-center justify-between max-w-maxContent flex flex-col-reverse md:flex-row mx-auto text-richblack-5 gap-12 md:gap-0'>
        <div className='flex flex-col w-full md:w-[50%] gap-4 z-10'>
            <p className='font-semibold text-3xl md:text-4xl font-inter'>Welcome back</p>
            <p className='text-[16px] md:text-[18px] font-inter w-auto text-richblack-200'>Build skills for today, tomorrow, and beyond. <br /> <span className='text-sm font-bold font-edu-sa text-[#47A5C5]'>Education to future-proof your career.</span></p>
            <form onSubmit={handleOnSubmit} className="w-full mt-4">
                <div className='flex flex-col w-full md:w-[80%] mt-3'>
                    <label htmlFor="Enter Address">Email<span className='text-[red]'> *</span></label>
                    <input 
                    type="email"
                    name='email'
                    placeholder='Enter your email' 
                    required 
                    value={formData.email}
                    onChange={handleOnChange}
                    className='h-[48px] mt-2 bg-richblack-800 p-[12px] rounded-md border border-richblack-700 w-full focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 transition-all'/>
                </div>
                <div className='flex flex-col w-full md:w-[80%] mt-4'>
                    <label htmlFor="Password">Password<span className='text-[red]'> *</span></label>
                    <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    placeholder='Enter your password' 
                    onChange={handleOnChange}
                    required    
                    className='h-[48px] mt-2 bg-richblack-800 p-[12px] rounded-md border border-richblack-700 w-full focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 transition-all'/>
                </div>
                <div className='text-sm mt-2 font-bold font-edu-sa text-[#47A5C5] w-full md:w-[80%] text-right'>
                    <Link to={"/forgot-password"} className='hover:text-yellow-50 transition-colors'>
                        Forgot password
                    </Link>
                </div>

                <button type='submit' className='bg-yellow-50 w-full md:w-[80%] mt-8 h-[48px] text-richblack-900 font-medium rounded-md hover:scale-95 transition-all duration-200'>Log In</button>
            </form>
        </div>
        <div className='flex flex-col w-full md:w-[45%] md:w-max-[500px] items-center mb-8 md:mb-0 relative'>
            <div className="absolute top-4 right-4 md:right-auto md:top-4 md:-left-4 w-full h-full bg-richblack-800 rounded-lg -z-10 hidden md:block"></div>
            <img src={login} alt="login image" className='w-full max-w-[400px] md:max-w-full shadow-[20px_20px_0px_0px_#111827] rounded-lg' />
        </div>

    </div>
  )
}

export default LogIn
