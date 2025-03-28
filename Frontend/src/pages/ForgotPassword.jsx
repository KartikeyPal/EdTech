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
    <div className='text-richblack-5 flex justify-center items-center ' >
        {   
                loading?(<div> loading.... </div>):(
                <div className='text-white '>
                        <h1>{!emailSend? ("Reset Your Password"): ("check Your Email")}</h1>
                        <p>
                            {
                                !emailSend?("Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"):(`We have sent the reset email to
                                ${email}`)
                            }
                        </p>
                        <form onSubmit={handleSubmit}>
                            {
                                !emailSend && (
                                    <label>
                                        <p>Email Address:</p>
                                        <input required type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email Address' className='bg-richblack-800'/>
                                    </label>
                                )
                            }
                            <button type='submit'>
                                {
                                    !email? ("Reset Password") : ("Resend Email")
                                }
                            </button>
                        </form>
                        <div>
                            <Link to={"/login"}>
                            <p>Back to Login page</p></Link>
                        </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword
