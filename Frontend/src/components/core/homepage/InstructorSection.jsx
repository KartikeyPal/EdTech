import React from 'react'
import Instructor from '../../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './Button';
import { FaArrowRight } from 'react-icons/fa';
const InstructorSection = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-row items-center gap-20'>
        <div className='w-[50%]'>
            <img src={Instructor} alt="Instructor image" className='shadow-white shadow-lg hover:shadow-pink-500 transition duration-200' />
        </div>
        <div className='w-[50%]  flex flex-col gap-10'>
            <div className='text-4xl font-semibold w-[50%]'>
                Become an <HighlightText text={"Instructor"}/>
            </div>
            <p className='font-inter font-medium text-[16px] text-[#838894] w-[80%] '>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>
            <div className='w-fit'>
                <CTAButton linkto={'/signup'} active={true} className='' >
                    <div className='flex flex-row items-center gap-2'>
                        Start Teaching Today <FaArrowRight/>
                    </div>
                </CTAButton>   
            </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection
