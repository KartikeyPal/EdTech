import React, { useEffect, useState } from 'react'
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { useSelector } from 'react-redux';
import { getAllCourses } from '../../../../services/operations/courseDetailsAPI';
import { Link } from 'react-router-dom';
import InstrctorChart from './InstrctorChart';

const Instructor = () => {
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const [loading,setLoading] = useState(false);
    const [instructor,setInstructor]  = useState(null);
    const [courses,setCourses] = useState([]);


    useEffect(()=>{
        const getCouresDataWithStats =async ()=>{
            setLoading(true);
            const isntructorApiData = await getInstructorData(token);
             
            // const result = await fetchInstructorCourses(token);

            console.log("instructor ka data " , isntructorApiData);
            if(isntructorApiData.length){
                setInstructor(isntructorApiData);
            }
            // if(result){
            //     setCourses(result);
            // }
            setLoading(false);
        }
        getCouresDataWithStats();
    },[])

    const totalAmount = instructor?.reduce((acc,curr)=>acc+ curr.totalAmountGenerated,0);
    const totalStudent = instructor?.reduce((acc,curr)=>acc+ curr.totalStudentEnrolled,0);



  return (
    <div className='flex justify-center items-center text-center text-white mt-28'>
        <div>
            <h1>Hi {user.firstName}</h1> 
            <p>Let's start something new</p> 
        </div>
        {
          loading ? (<div className='spinner'></div>) : courses.length > 0? (<div> you have not created any courses
            <Link to={"/dashboard/addCourse"}>Create a course </Link>
          </div>): (
            <div>
                  <div>
                    <div>
                      <InstrctorChart courses = {instructor}/>
                      <div>
                        <p>statistics</p>
                        <div>
                          <p>Total courses</p>
                          <p>{courses.length}</p>
                        </div>
                        <div>
                          <p>total Students</p>
                          <p>{totalStudent}</p>
                        </div>
                        <div>
                          <p>Total Income</p>
                          <p>{totalAmount}</p>
                        </div>
                      </div>
                    </div>

                </div>

                <div>
                    {/* Render 3 courses   */}
                    <div>
                        <p>Your courses</p>
                        <Link  to="/dashboard/my-courses">
                            <p>View All</p>
                        </Link>
                    </div>
                    <div>
                        {
                          courses.slice(0,3).map((course)=>(
                            <div>
                                <img 
                                    src={course.thumbnail}
                                />
                                <div>
                                  <p>{course.courseName}</p>
                                  <div>
                                      <p>{course.studentEnrolled.length}</p>
                                      <p> | </p>
                                      <p>Rs {course.price}</p>
                                  </div>
                                </div>
                            </div>
                          ))
                        }
                    </div>
                </div>
            </div>
          )  
        }
    </div>
  )
}

export default Instructor