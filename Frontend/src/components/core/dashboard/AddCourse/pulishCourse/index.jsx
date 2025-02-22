import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../../../common/IconButton';
import {useNavigate} from 'react-router-dom'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
const PublishCourse = () => {
    const {register,handleSubmit,setValue, getValues} = useForm();
    const {course} = useSelector(state=>state.course);
    const dispatch = useDispatch();
    const {token} = useSelector(state=>state.auth);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const goBack=()=>{
        dispatch(setStep(2));
    }
    const goToCourse=()=>{
        dispatch(resetCourseState());
        navigate('/dashboard/add-course')
    }
    const handleCoursePublish=async()=>{
        if(course?.status === "Published" && getValues("public") === true ||(
            course?.status === "Draft" && getValues("public") === false
        )){
            goToCourse();
            return;
        }
        const formData = new FormData();
        formData.append("courseId",course._id);
        const courseStatus  = getValues("public")? "Published" : "Draft";
        formData.append("status",courseStatus);

        setLoading(true);
        const res = await editCourseDetails(formData,token);
        if(res){
            goToCourse();
        }
        setLoading(false);
    }
    const onSubmit = async()=>{
        handleCoursePublish();
    }
  return (
    <div>
        <div>
            <p className='font-bold text-xl text-richblack-100'>Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)}> 
                <div className='flex gap-x-3 items-center p-2 -ml-2'>
                    <input 
                    type='checkbox' 
                    id='public'
                    {...register("public")}
                    />
                    <label htmlFor="public">Make this course public</label>    
                </div>    
                <div className='flex gap-x-3'>
                    <button
                    disabled={loading}
                    type='button'   
                    onClick={()=>goBack()}
                    >
                        Back
                    </button>
                    <IconButton
                        disabled={loading}
                        text={"Save Changes"}
                        customClasses={'bg-yellow-25 text-richblack-900 p-2 rounded-lg text-sm'}
                    ></IconButton>
                </div>
            </form>
        </div>
    </div>
  )
}

export default PublishCourse