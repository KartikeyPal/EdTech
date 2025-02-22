import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {Table,Thead,Th,Tbody, Td, Tr } from 'react-super-responsive-table'
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../slices/courseSlice';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const CourseTable = ({courses,setCourses}) => {
    const dispatch=useDispatch();
    const {token} = useSelector(state=>state.auth);
    const [loading,setLoading] = useState(false);
    const [ConfirmationModal,setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    const handleCourseDelete=async()=>{
        setLoading(true);
        await deleteCourse({courseId: courseId},token);
        const res  = await fetchInstructorCourses(token);
        if(res){
           setCourses(res);  
        }

    }
  return (
    <div>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Courses</Th>
                        <Th>Duration</Th>
                        <Th>Price</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {courses?.length===0 ?(
                        <Tr>
                            <Td>No Coures found</Td>
                        </Tr>
                    ) : (
                        courses.map((course)=>{
                            <Tr key={course._id} className='flex gap-x-10 border-richblack-800'>
                                <Td className="flex gap-x-4">
                                    <img src={course.thumbnail}
                                        className='h-[150px] w-[220px] rounded-lg object-cover'
                                    />
                                    <div className='flex flex-col'>
                                        <p>{course.courseName} </p>
                                        <p>{course.courseDescription}</p>
                                        <p>Created: </p>
                                        {
                                            course.status === "Draft"? (
                                                <p className='text-pink-100'>Drafted</p>
                                            ):(
                                                <p className='text-yellow-25'>Published</p>
                                            )
                                        }
                                    </div>
                                </Td>
                                <Td>
                                    2hr 30min
                                </Td>
                                <Td>
                                    $ {course.price}
                                </Td>
                                <Td>
                                    <button 
                                        disabled={loading}
                                        onClick={()=>{
                                            navigate(`/dashboard/edit-course/${course._id}`)
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                    disabled={loading}
                                    onClick={()=>{
                                        setConfirmationModal({
                                            text1:"Do you want to delete this course",
                                            text2: "All the data related to this course will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btnHandler1:!loading ? ()=>handleCourseDelete(course._id): ()=>{},
                                            btn2Handler2:!loading ? ()=>setConfirmationModal(null): ()=>{},
                                        })
                                    }}
                                    >
                                        Delete
                                    </button>
                                </Td>
                            </Tr>
                        })
                    )}
                </Tbody>
            </Table>
            {ConfirmationModal && <ConfirmationModal modalData={ConfirmationModal}/>}

    </div>
  )
}

export default CourseTable