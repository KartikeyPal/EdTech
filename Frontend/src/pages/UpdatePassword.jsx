import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
const UpdatePassword = () => {
    const {loading} = useSelector((state)=> state.auth);
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [formData,setFormData ] = useState({
        password: "",
        confirmPassword:"",
    });
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const dispatch = useDispatch();
    const location = useLocation();
    function handleChange(e){
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name]: e.target.value, 
        }))
    }
    const handleOnSubmit =(e)=>{
        e.preventDefault();
        const token  = location.pathname.split('/').at(-1);
        console.log(token);
        dispatch(resetPassword(password,confirmPassword,token)); 
    }
  return (
    <div className='w-screen h-screen flex justify-center items-center '>
        {
            loading?(<div/>):(<div className='text-richblack-5 bg-richblack-800 p-10 hover:shadow-xl transition-all shadow-lg delay-100 shadow-richblue-300 hover:shadow-pink-400  '>
                <h1 className='font-bold text-lg text-richblack-100'>Choose new Password</h1>
                <p className='font-semibold text-richblack-200'>Almost done. Enter your new password and you're  all set</p>
                <form onSubmit={handleOnSubmit} className='form-style flex flex-col'>
                        <label className='relative'>
                            <p className=''>New password</p>
                            <input type={showPassword?("text"): ("password")}  required name='password' value={password} onChange={handleChange}
                                className='bg-richblack-900 my-2 text-richblack-5 rounded-md'
                            />
                           {
                                showPassword ? (<FaRegEye type='button' onClick={()=>setShowPassword((prev)=>!prev)}
                                className='absolute left-[43%] bottom-3 hover:cursor-pointer5'
                                />) :(<FaRegEyeSlash type='button' onClick={()=>setShowPassword((prev)=>!prev)}
                                className='absolute left-[43%] bottom-3 hover:cursor-pointer5'
                            />)
                            }   
                        </label>
                        <label className='relative'>
                            <p>confirm password</p>
                            <input type={showConfirmPassword?("text"): ("password")}  required name='confirmPassword' value={confirmPassword} onChange={handleChange}  className='bg-richblack-900 my-2 text-richblack-5 rounded-md'
                            />
                            {
                                showConfirmPassword ? (<FaRegEye type='button' onClick={()=>setShowConfirmPassword((prev)=>!prev)}
                                className='absolute left-[43%] bottom-3 hover:cursor-pointer5'
                                
                        ></FaRegEye>) :(<FaRegEyeSlash type='button' onClick={()=>setShowConfirmPassword((prev)=>!prev)}
                        className='absolute left-[43%] bottom-3 hover:cursor-pointer5'
                        
                ></FaRegEyeSlash>)
                            }
                             
                        </label>
                        <button type='submit'
                            className='text-start mt-3 p-2 bg-yellow-25 max-w-max text-richblack-900 rounded-lg hover:scale-95 transition-transform delay-100'
                        >Submit</button>
                </form>
            </div>)
        }
    </div>
  )
}

export default UpdatePassword
