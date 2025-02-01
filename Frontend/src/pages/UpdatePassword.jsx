import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
const UpdatePassword = () => {
    const {loading} = useSelector((state)=> state.auth);
    const [showPassword,setShowPassword] = useState(false);
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
    <div>
        {
            loading?(<div/>):(<div className='text-richblack-5'>
                <h1>Choose new Password</h1>
                <p>Almost done. Enter your new password and you're  all set</p>
                <form onSubmit={handleOnSubmit}>
                        <label>
                            <p>New password</p>
                            <input type={showPassword?("text"): ("password")}  required name='password' value={password} onChange={handleChange} />
                            <FaRegEye type='button' onClick={()=>setShowPassword((prev)=>!prev)} pointer></FaRegEye>
                        </label>
                        <label>
                            <p>confirm password</p>
                            <input type={showPassword?("text"): ("password")}  required name='confirmPassword' value={confirmPassword} onChange={handleChange} />
                        </label>
                        <button type='submit'>Submit</button>
                </form>
            </div>)
        }
    </div>
  )
}

export default UpdatePassword
