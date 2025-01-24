import React from 'react'
import HighlightText from './HighlightText'
import knowYourProgress from '../../../../assets/Images/Know_your_progress.png'
import planYourLesson from '../../../../assets/Images/Plan_your_lessons.png'
import compareWithOthers from '../../../../assets/Images/Compare_with_others.png'
import CTAButton from './Button';

const LearningLanguageSection = () => {
  return (
    <div className='mt-[110px]'>
      <div className='flex flex-col gap-5 items-center'>
            <div className='text-4xl font-semibold text-center '>
                Your swiss knife for <HighlightText text={"learning any language"}/>
            </div>
            <div className='text-center text-[#2C333F] mx-auto text-base items-center font-inter w-[760px] h-[48px] font-medium '>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>
            <div className=' flex flex-row items-center justify-center mt-5'>
                <img src={knowYourProgress} alt="Know Your Progress Image" className='object-contain -mr-32' />
                <img src={compareWithOthers} alt="Know Your Progress Image" className='object-contain' />
                <img src={planYourLesson} alt="Know Your Progress Image" className='object-contain -ml-40' />
            </div>
            <div className='w-fit py-6 mb-12'>
                <CTAButton linkto={"/signup"} active={true}>
                    <div>Learn More</div>
                </CTAButton>
            </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection
