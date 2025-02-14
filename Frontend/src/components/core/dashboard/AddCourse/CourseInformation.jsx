import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import IconButton  from '../../../common/IconButton';
import RequirementField from './RequirementField';
import { setCourse,setEditCourse,setStep } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';


const CourseInformation = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);

    const {course,editCourse}  = useSelector((state)=>state.course);
    const [loading,setLoading]  = useState(false);
    const [courseCategory,setCourseCategory] = useState([]);

    useEffect(()=>{
        const getCategories =  async()=>{
            setLoading(true);
            const  categories = await fetchCourseCategories();
            if(categories){
                setCourseCategory(categories);
                console.log("course categorures", courseCategory);
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

    function isFormUpdated(){
        const currentValues = getValues();
        if( currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            // currentValues.courseTag !== course.tag ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category ||
            currentValues.courseRequirements.toString() !== course.instruction.toString() 
            // currentValues.courseImage !== course.thumbnail
        ){
            return true;
        }
        else{
            return false;
        }
    }


    const onSubmit = async(data)=>{
        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();
                formData.append("courseId",course._id);
                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName",data.courseTitle);
                }
                if(currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription",data.courseShortDesc);
                }
                if(currentValues.coursePrice !== course.price){
                    formData.append("price",data.coursePrice);
                }
                // if(currentValues.courseTag !== course.tag){
                //     formData.append("tag",data.courseTag);
                // }
                if(currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn",data.courseBenefits);
                }
                if(currentValues.courseCategory !== course.category){
                    formData.append("categoryId",data.courseCategory);
                    console.log("Course Category : ", data.courseCategory);
                }
                if(currentValues.courseRequirements.toString() !== course.instruction.toString()){
                    formData.append("instruction",JSON.stringify(data.courseRequirements));
                }
                // if(currentValues.courseImage !== course.thumbnail){
                //     formData.append("thumbnail",data.courseImage);
                // }
                setLoading(true);
                const result = await editCourseDetails(formData,token);
                console.log("result is ",result);
                setLoading(false);
                if(result){
                    setStep(2);
                    dispatch(setCourse(result));
                }
            }
            else{
                    toast.error("no changes made to the form")
            }
            return;
        }
        // IF we create a new course
        const formData = new FormData();
        formData.append("courseName",data.courseTitle);
        formData.append("price",data.coursePrice);
        // formData.append("tag",data.courseTag);
        formData.append("courseDescription",data.courseShortDesc);
        formData.append("whatYouWillLearn",data.courseBenefits);
        console.log(data.courseCategory);
        formData.append("categoryId",data.courseCategory);
        formData.append("instruction",JSON.stringify(data.courseRequirements));
        // formData.append("thumbnail",data.courseImage);

        setLoading(true);
        console.log(...formData);
        const result =  await   addCourseDetails(formData,token);
        if(result){
            console.log("result is ",result);
            dispatch(setStep(2));   
            dispatch(setCourse(result));
        }
        setLoading(false);
    }


  return (
    <form
        onSubmit={handleSubmit(onSubmit)}
        className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
    >
        <div >
            <label htmlFor="">Course Title <sup>*</sup></label>
            <input 
            type="text" 
            id='courseTitle'
            placeholder='Enter the course Title'
            {...register("courseTitle",{required:true})}
            className='w-full text-richblack-900'
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
            className='min-h-[140px] w-full text-richblack-900'
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
                className='w-full px-9 text-richblack-900'
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
                className='w-full text-richblack-900'
            >  
                <option value="" disabled>Choose a category</option>
                {
                  !loading &&  courseCategory.map((val,ind)=>(
                        <option value={val._id} key={ind}>{val.name} </option>
                        
                    ))
                }
            </select>
            {
                errors.courseCategory && (
                    <span>select a course Category</span>
                )
            }
        </div>
        {/* create a custom component for handling tags input */}
        {/* <ChipInput
            label = "Tags"
            name= "courseTags"
            placeholder= "enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        /> */}

        {/* create a component for uploading and showing preview of media*/}

        {/* <Upload
            label = "Tags"
            name= "courseTags"
            placeholder= "enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />    */}

        {/* Benefits fo the course */}
        <div>
            <label htmlFor="">Benefits fo the course <sup>*</sup></label>
            <textarea 
            name="" 
            id="courseBenefits"
            placeholder='Enter the penefits of the course'
            {...register("courseBenefits",{required:true})}
            className='w-full min-h-[130px] text-richblack-900'
            />
            {
                errors.courseBenefits && (
                    <span>Benefits of the course required**</span>
                )
            }
        </div>
        <RequirementField
            name="courseRequirements"
            label="Requirements/Instruction"
            register={register}
            errors={errors}
            getValues={getValues}
            setValue={setValue}
        />
        <div>
            {editCourse &&(
                <button
                    onClick={dispatch(setStep(2))}
                    className='flex items-center gap-x-2 bg-richblack-300'
                >Continue without Saving</button>
            )}
            <IconButton
                text={!editCourse ? "Next" : "Save" }
            />
        </div>
    </form>
  )
}

export default CourseInformation