import React from 'react'
import { useSelector } from 'react-redux'
import CourseInformation from './CourseInformation';
import CourseBuilderForm from './CourseBuilderForm'
import {FaCheck} from 'react-icons/fa'
const RenderSteps = () => {
    const {step} = useSelector((state)=>state.course);
    console.log(step);
    const steps = [
        {
            id:1,
            title: "Course Information"
        },
        {
            id:2,
            title: "Course Builder"
        },
        {
            id:3,
            title: "Publish"
        }
    ]
  return (
    <>
        <div className="relative mb-2 flex w-full justify-center">
            {steps.map((item)=>(
                        <div>
                            <div key={item.id} className={`${step === item.id? "bg-yellow-900 border-yellow-50 text-yellow-50 w-[33%]" : "border-richblack-100 bg-richblack-800 text-richblack-300 w-[33%]"}`}>
                                {
                                    step>item.id ? (<FaCheck/>) : (item.id)
                                }
                            </div>
                            {/* Add course for dashes between the labels */}
                            {/* {
                                item.id !== steps.length? "":"" 
                            } */}
                        </div>
                    ))}
        <div>
                            {steps.map((item)=>(
                                <div key={item.id}>
                                    <div>
                                        <p>{item.title}</p>
                                    </div>
                                </div>
                            ))}
            </div>
                        
        </div>
        {step===1 && <CourseInformation/>}
        {step===2 && <CourseBuilderForm/>}
        {/* {step===3 && <CoursePulishForm/>} */}      
    </>
  )
}

export default RenderSteps