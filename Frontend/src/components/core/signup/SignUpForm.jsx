import React, { useState } from 'react'

const SignUpForm = () => {
    const [studentOrInstructor,setStudentOrInstructor] = useState("Student");
    function handleSubmit(){
    }
  return (
    <div >
        <div className='w-[85%] '>
        <p className='font-semibold font-inter  text-4xl'>Join the millions learning to code with StudyNotion for free</p>
        <p className='text-[18px] font-inter  w-auto text-richblack-200'>Build skills for today, tomorrow, and beyond. <span className=' text-sm font-bold font-edu-sa size-[14px] text-[#47A5C5] '>Education to future-proof your career. </span> </p>
        </div>
        <div className='flex flex-row justify-between items-center bg-richblack-800 rounded-full my-5 px-2 py-2 w-[30%]'>
          <div className={studentOrInstructor=="Student" ? ("bg-richblack-900  rounded-[100px] px-3 text-pink-25"): ("")} role='button' onClick={()=>setStudentOrInstructor("Student")} >Student</div>
          <div className={studentOrInstructor=="Instructor" ? ("bg-richblack-900  rounded-[100px] px-3 text-pink-25"): ("")} role='button' onClick={()=>setStudentOrInstructor("Instructor")} >Instructor</div>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
              <div className='flex flex-row gap-3 text-white'>
                <div className='flex flex-col'>
                  <label htmlFor="First_Name">First Name <span className='text-[red]'>*</span></label>
                  <input type="text" placeholder='Enter first name' required className=' h-[48px] mt-1 bg-richblack-800 p-[12px] rounded-md gap-[12px] border border-richblack-700' />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="Last_Name">Last Name <span className='text-[red]'>*</span></label>
                  <input type="text" placeholder='Enter last name' required className=' h-[48px] mt-1 bg-richblack-800 p-[12px] rounded-md gap-[12px] border border-richblack-700'/>
                </div>
              </div>
              <div className='flex flex-col w-[73%] mt-3'>
                <label htmlFor="Last_Name">Email<span className='text-[red]'> *</span></label>
                <input type="email" placeholder='Enter your email' required className=' h-[48px] mt-1 bg-richblack-800 p-[12px] rounded-md gap-[12px] border border-richblack-700'/>
              </div>

              <div className='flex flex-row gap-3 text-white mt-3 '>
                <div className='flex flex-col '>
                  <label htmlFor="password">Create Password<span className='text-[red]'> *</span></label>
                  <input type="password" placeholder='Create Password' required className=' h-[48px] mt-1 bg-richblack-800 p-[12px] rounded-md gap-[12px] border border-richblack-700' />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="password">Confirm Password<span className='text-[red]'> *</span></label>
                  <input type="password" placeholder='Confirm Password' required className=' h-[48px] mt-1 bg-richblack-800 p-[12px] rounded-md gap-[12px] border border-richblack-700'/>
                </div>
              </div>
              <button type='submit' className='bg-yellow-50 w-[453px] mt-6 h-[48px] text-richblack-900 rounded-md hover:scale-95'>Create Account</button>
            </div>
        </form>
    </div>
  )
}

export default SignUpForm
