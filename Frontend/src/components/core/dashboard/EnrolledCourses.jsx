import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from "@ramonak/react-progress-bar";
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
const EnrolledCourses = () => {
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const [enrolledCourses,setEnrolledCourses] = useState(null);
    const getEnrolledCourses =async ()=>{
        try {
            const res = getUserEnrolledCourses(token);
            setEnrolledCourses(res);
        } catch (error) {
                console.log("Unable to fetch enrooled courses");
        }
    }
    useEffect(()=>{
        getEnrolledCourses();
    },[])
  return (
    <div className=' text-white w-screen h-screen flex justify-center items-center'>
        <div>Enrolled Courses</div>
        <div>
            {
                !enrolledCourses? (<div>Loading...</div>) : !enrolledCourses.length?(<p>you have not enrooled to any course</p>):(
                    <div>
                        <div>
                            <p>Course Name</p>
                            <p>Duration</p>
                            <p>Progess</p>
                        </div>
                        {
                            enrolledCourses.map((course,index)=>(
                                <div>
                                    <div>
                                        <img src={course.thumbnail}/>
                                        <div>
                                            <p>{course.courseName}</p>
                                            <p>{course.courseDescription}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p>progress: {course.progressPercentage || 0} %</p>
                                        <ProgressBar completed={course.progressPercentage || 0} height='8px' isLabelVisible={false}/>;
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                )
            }
        </div>
    </div>
  )
}

export default EnrolledCourses
