import React from 'react'
import logo1 from '../../../../assets/TimeLineLogo/logo1.svg';
import logo2 from '../../../../assets/TimeLineLogo/logo2.svg';
import logo3 from '../../../../assets/TimeLineLogo/logo3.svg';
import logo4 from '../../../../assets/TimeLineLogo/logo4.svg';
import timelineImage from '../../../../assets/Images/TimelineImage.png'

const TimeLine =[
  {
    Logo: logo1,
    heading: "Leadership",
    Description:"Fully Committed to the success company", 
  },
  {
    Logo: logo2,
    heading: "Responsibility",
    Description:"Students will always be our top priority", 
  },
  {
    Logo: logo3,
    heading: "Flexibility",
    Description:"The ability to switch is an important skills", 
  },
  {
    Logo: logo4,
    heading: "Solve the problem",
    Description:"Code your way to a solution", 
  },
]

const TimelineSection = () => {

  return (
    <div>
        <div className='flex flex-row gap-15 items-center '>
            {/* Part 1 */}
            <div className=' w-[45%] flex flex-col gap-5'>
                {TimeLine.map((element,index)=>{
                  return(
                    <div className='flex flex-row gap-5 ' key={index}>
                        <div className='w-[50px] h-[50px] bg-white flex items-center'>
                            <img src={element.Logo} alt="" />
                        </div>
                        <div>
                            <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                            <p className='text-base'>{element.Description}</p>
                        </div>
                    </div>
                  )
                })}
            </div>
            {/* part 2 */}

            <div className='relative  shadow-blue-200'>
              <img src={timelineImage} alt="Timeline Image" className='shadow-white object-cover h-fit mb-20 '/>
              <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 left-[8%] bottom-[4px]'>
                  <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 text-white px-7'>
                    <p className='text-3xl font-bold'>10</p>
                    <p className='text-sm '>Years Of Experience</p>
                  </div>
                  <div className='flex gap-5 items-center px-7'>
                  <p className='text-3xl font-bold'>250</p>
                  <p className='text-sm'>Types of Courses </p>
                  </div>
              </div>
            </div>

        </div>
    </div>
  )
}

export default TimelineSection
