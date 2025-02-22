import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

const EditCourse = () => {
    const dispatch = useDispatch();
    const {courseId}=useParams();
    const {course} = useSelector(state=>state.course);
    const [loading,setLoading] = useState(false);
    const {token} = useSelector(state=>state.auth);

    useEffect(()=>{
        const  populateCourseDetails = async()=>{
            setLoading(true);
            const res= await getFullDetailsOfCourse(courseId,token);
            if(res?.courseDetails){
                dispatch(setEditCourse=true);
                dispatch(setCourse(res?.courseDetails));
            }
            setLoading(false);
        }
        populateCourseDetails();
    },[])

    if(loading){
        return (
            <div>Loading...</div>
        )
    }

  return (
    <div>
        <h1>Edit Course</h1>
        <div>
            {course ? (<RenderSteps/>) : (<p>Course not found</p>)}
        </div>
    </div>
  )
}

export default EditCourse