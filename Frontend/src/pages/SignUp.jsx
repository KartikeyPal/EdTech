import React from 'react'
import SignUpFrom from '../components/core/signup/SignUpForm';
import signup from '../../assets/Images/signup.webp';

const SignUp = () => {
  return (
    <div>
          <div className='px-3 mx-auto flex flex-row w-11/12 max-w-maxContent text-white justify-between mt-16 items-center '>
            <div className='w-[50%]'>
                <SignUpFrom/>
            </div>
            <div className='w-[40%]'>
              <img src={signup} alt="signUp image " className='w-[80%] shadow-xl shadow-pink-600 rounded-lg '  />
            </div>

          </div>
    </div>  
  )
}

export default SignUp
