import React from 'react'
import SignUpFrom from '../components/core/signup/SignUpForm';
import signup from '../../assets/Images/signup.webp';

const SignUp = () => {
  return (
    <div>
          <div className='px-4 md:px-3 mx-auto flex flex-col-reverse md:flex-row w-11/12 max-w-maxContent text-white justify-between pt-24 pb-12 items-center gap-12 md:gap-0'>
            <div className='w-full md:w-[50%] z-10'>
                <SignUpFrom/>
            </div>
            <div className='w-full md:w-[45%] flex justify-center relative'>
              <div className="absolute -top-4 -left-4 w-full h-full bg-richblack-800 rounded-lg -z-10 hidden md:block"></div>
              <img src={signup} alt="signUp image" className='w-full max-w-[400px] md:max-w-full shadow-[20px_20px_0px_0px_#111827] rounded-lg relative z-0' />
            </div>

          </div>
    </div>  
  )
}

export default SignUp
