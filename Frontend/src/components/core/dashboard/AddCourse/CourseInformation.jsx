import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi"




const CourseInformation = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();

    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth);
    const {course,editCourse}  = useSelector((state)=>state.course);
    const [loading,setLoading]  = useState(false);
    const [courseCategory,setCourseCategory] = useState([]);

    useEffect(()=>{
        const getCategories =  async()=>{
            setLoading(true);
            const  categories = await fetchCourseCategories();
            if(categories){
                setCourseCategory(categories);
            }
            setLoading(false);
        }   
        if(editCourse){
            setValue("courseTitle",course.courseName)
            setValue("courseShortDesc",course.courseDescription)
            setValue("coursePrice",course.price)
            setValue("courseTag",course.tag)
            setValue("courseBenefits",course.whatYouWillLearn)
            setValue("courseCategory",course.category)
            setValue("courseRequirements",course.instruction)
            setValue("courseImage",course.thumbnail)


        }
        getCategories();
    },[])

    const onSubmit = async(data)=>{

    }


  return (
    <form
        onSubmit={handleSubmit(onSubmit)}
        className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
    >
        <div>
            <label htmlFor="">Course Title <sup>*</sup></label>
            <input 
            type="text" 
            id='courseTitle'
            placeholder='Enter the course Title'
            {...register("courseTitle",{required:true})}
            className='w-full'
            />
            {
                errors.courseTitle && (
                    <span>Course Title is required</span>
                )
            }
        </div>
        <div>
            <label htmlFor=" ">Course Short Description</label>
            <textarea 
            type="text"
            id='courseShortDesc'
            placeholder='Enter course short Description'
            {...register("courseShortDesc",{required:true})}
            className='min-h-[140px] w-full'
            />
            {
                errors.courseShortDesc && (
                    <span>Course Descrioption is required</span>
                )
            }
        </div>
        <div>
            <label htmlFor="">Course Price</label>
            <input 
                id='coursePrice'
                placeholder='enter course pricce'
                {...register("coursePrice",{required:true,valueAsNumber:true})}
                className='w-full px-9'
            />
            <HiOutlineCurrencyRupee />
            {
                errors.coursePrice && (
                    <span>course Price is required</span>
                )
            }

        </div>
        <div>
            <label htmlFor="">Course Category<sup>*</sup></label>
            <select 
            id="courseCategory" 
            defaultValue=''
            {...register("courseCategory",{required:true})}
            >  
                <option value="" disabled>Choose a category</option>
                {
                  !loading &&  courseCategory.map((val,ind)=>(
                        <option key={ind}>{val.name}</option>
                    ))
                }
            </select>
        </div>
    </form>
  )
}

export default CourseInformation