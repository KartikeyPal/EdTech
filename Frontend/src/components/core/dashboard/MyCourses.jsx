import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import IconButton from '../../common/IconButton';
import CourseTable from './InstructorCourses/CourseTable'
const MyCourses = () => {
    const {token} = useSelector(state=>state.auth);
    const navigate = useNavigate();
    const [course,setCourse] = useState([]);

    useEffect(()=>{
        const fetchCourses = async()=>{
            const res = await fetchInstructorCourses(token);
            if(res){
                setCourse(res);
            }
        }
        fetchCourses();
    },[]);
  return (
    <div>
        <div>
            <h1>My Courses</h1>
            <IconButton text={'Add Courses'} onClick={()=>navigate('/dashboard/add-courses')}/>
                {/* //add icon  */}
        </div>

        {course && <CourseTable courses={course} setCourses={setCourse}/>}
    </div>
  )
}

export default MyCourses;