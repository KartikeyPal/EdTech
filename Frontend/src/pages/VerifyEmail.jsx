import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';
import { sendOtp } from '../services/operations/authAPI';
const VerifyEmail = () => {
    const [otp,setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,signupData} = useSelector((state)=>state.auth);

    useEffect(()=>{
      if(!signupData){
        navigate("/signup")
      }
    },[]);
    const handleOnSubmit=(e)=>{
      e.preventDefault();
      const {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      } = signupData;
      dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
    }
  return (
    <div>
      {
        loading?(<div>loading...</div>):(
            <div>
                <h1>Verify Email</h1>
                <p>A Verification code has been sent to you. Enter Your code below</p>
                <form onSubmit={handleOnSubmit}>
                  <OtpInput
                      value={otp}
                      onChange={setOtp}   
                      numInputs={6}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                    />
                  <button type='submit'>Submit</button>
                </form>
                <div>
                  <Link to={"/login"}>
                      <p>back to login</p>
                  </Link>
                </div>
                <button
                  onClick={()=>{sendOtp(signupData.email,navigate)}}
                >Resend otp</button>
            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail
