import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../../../common/IconButton';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
const PublishCourse = () => {
    const {register,handleSubmit,setValue, getValues} = useForm();
    const {course} = useSelector(state=>state.course);
    const dispatch = useDispatch();
    const {token} = useSelector(state=>state.auth);
    const [loading,setLoading] = useState(false);
    const goBack=()=>{
        dispatch(setStep(2));
    }
    const goToCourse=()=>{
        dispatch(resetCourseState());
        //navigate to '/dashboard/mycourse'
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
            <p>Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)}> 
                <div>
                    <label htmlFor="public">Make this course public</label>    
                    <input 
                    type='checkbox' 
                    id='public'
                    {...register("public")}
                    />
                </div>    
                <div>
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
                        customClasses={''}
                    ></IconButton>
                </div>
            </form>
        </div>
    </div>
  )
}

export default PublishCourse