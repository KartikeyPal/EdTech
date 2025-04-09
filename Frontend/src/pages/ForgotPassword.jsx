import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
const ForgotPassword = () => {
    const [emailSend,setEmailSend] = useState(false);   
    const [email,setEmail] = useState("");
    const {loading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    

   const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(getPasswordResetToken(email,setEmailSend));
    }


  return (
    <div className=' w-screen h-screen text-white flex flex-col justify-center items-center' >
        {
        loading?(<div> loading.... </div>):(
        <div className=' text-white bg-richblack-800 rounded-xl hover:shadow-richblue-200 hover:shadow-2xl flex flex-col justify-center px-16 py-6 transition-shadow delay-100   '>
                        <h1 className='font-bold text-xl text-richblack-100 '>{!emailSend? ("Reset Your Password"): ("check Your Email")}</h1>
                        <p className='text-lg pt-1 text-richblack-200'>
                            {
                                !emailSend?("Enter your Email for resetting your password"):(`We have sent the reset email to
                                ${email}`)
                            }
                        </p>
                    <div className=''>
                        <form onSubmit={handleSubmit}
                            className=' '
                        >

                            <div className=' py-3'>
                                {
                                    !emailSend && (
                                        <div className='flex flex-col gap-y-2 '>
                                            <label htmlFor="email" className='font-semibold text-richblack-25'>Enter Your Email</label>
                                            <input 
                                            required 
                                            type='email' 
                                            name='email' 
                                            value={email} 
                                            onChange={(e)=>setEmail(e.target.value)} 
                                            placeholder='Enter Your Email Address' 
                                            className='bg-richblack-800'/>
                                        </div>
                                        
                                    )
                                }
                                <button type='submit' 
                                    className='bg-richblack-700 p-2 rounded-lg mt-6 text-richblack-25 hover:scale-95 hover:shadow-richblack-500 hover:shadow-md transition-all delay-100'>
                                    {
                                        !emailSend? ("Reset Password") : ("Resend Email")
                                    }
                                </button>
                            </div>
                        </form>
                        <div className=''>
                            <Link to={"/login"}>
                                <button className='bg-yellow-25 p-2 text-richblack-900 rounded-lg hover:scale-95 transition-transform duration-200 delay-100 '>Back To Login Page</button>
                            </Link>
                        </div>
                    </div>
        </div>
        )
        }
    </div>
  )
}

export default ForgotPassword
