import React from 'react'
import HighlightText from '../homepage/HighlightText';
import CTAButton from '../homepage/Button';
const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];
  
const LearningGrid = () => {
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 '>
        {
            LearningGridArray.map((ele,ind)=>(
                <div
                key={ind}
                className={`${ind===0 && ("lg:col-span-2 lg:h-[300px]")}  ${ele.order%2===1 ? ("bg-richblack-700"):("bg-richblack-800")} ${ele.order ===3 && "lg:col-start-2"}`}
                >
                        {
                            ele.order<0 ? ( 
                                <div className='lg: w-[90%] flex flex-col pb-5 gap-3'>
                                    <div>
                                        {ele.heading}
                                        <HighlightText text={ele.highlightText}/>
                                        <p>{ele.description}</p>
                                        <CTAButton active={true} linkto={ele.BtnLink}>
                                            {ele.BtnText}
                                        </CTAButton>
                                    </div>
                                </div>
                            ):(
                                <div>
                                    <h1>{ele.heading}</h1>
                                    <p>{ele.description}</p>
                                </div>
                            )
                        }
                </div>
            ))
        }
    </div>
  )
}

export default LearningGrid
