import React from 'react'
import ProfileEditSection from './ProfileEditSection'
import ProfileInformationEditSection from './ProfileInformationEditSection'
import PasswordEditSection from './ProfileEditSection'
import DeleteAccountSection from './DeleteAccountSection'

const Settings = () => {
  return (
    <div className='mt-20 w-11/12 '>
      <p className='text-4xl text-richblack-5 text-start'>Edit profile</p>
      <div className='w-full flex flex-col items-center'>
          <div className='flex flex-row w-[75%] gap-3 justify-between items-center p-10 mt-8 rounded-lg bg-richblack-800 border-richblack-200 border-2'>
              <ProfileEditSection/> {/* half is completed only api hit left */}
          </div>
          <div className='flex flex-row w-[75%] gap-3 justify-between items-center p-10 mt-8 rounded-lg bg-richblack-800 border-richblack-200 border-2'>
              <ProfileInformationEditSection/>
          </div>
          <div className='flex flex-row w-[75%] gap-3 justify-between items-center p-10 mt-8 rounded-lg bg-richblack-800 border-richblack-200 border-2'>
              <PasswordEditSection/>
          </div>
          <div className='flex flex-row w-[75%] gap-3 justify-between items-center p-10 mt-8 rounded-lg bg-richblack-800 border-pink-200 border-2'>
              <DeleteAccountSection/>
          </div>
      </div>
    </div>
  )
}

export default Settings
