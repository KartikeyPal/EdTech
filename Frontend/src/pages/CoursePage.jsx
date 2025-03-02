import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import RatingStars from '../components/common/RatingStars';
import GetAvgRating from '../../utils/avgRating';
import Footer from '../components/common/Footer'
import { MdKeyboardArrowUp } from "react-icons/md";
import { PiMonitorFill, PiStrategyDuotone } from "react-icons/pi";
import { CiGlobe } from "react-icons/ci";
import {useDispatch,useSelector} from 'react-redux'
import { buyCourse } from '../services/operations/studentFeatureAPI';
const CoursePage = () => {
    const {id} = useParams();
    const [course,setCourse] = useState();
    const [showSection,setShowSection] = useState(false);
    const [averageReviewCount,setAverageReviewCount] = useState(0);
    

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector(state=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    useEffect(()=>{
        const fetchCourse = async () =>{
            const res = await fetchCourseDetails(id);
            setCourse(res.courseDetails);
        }
            fetchCourse();
    },[id]);
    useEffect(()=>{
        if(course){
        console.log(course)
        }
    },[course]);
    useEffect(()=>{
        const count = GetAvgRating(course?.ratingAndReview);
        setAverageReviewCount(count);
    },[course])



    const handleBuyCourse = () =>{
        if(token){
            buyCourse(token,[id],user,navigate,dispatch);
            return;
        }
    }




  return (
    <div className='text-white mt-[40px] h-auto bg-richblack-900 '>
                <div className='w-full h-[318px] bg-richblack-800 p-10 px-40 space-y-1 relative border-r-2'>
                        {/*This is Section 1 */}
                        <div className='border-r-2 py-7 lg:w-[790px] border-richblack-500'>
                            <div className='w-11/12 mr-96'>
                                <p className='text-richblack-400'>Home / Learning / <span className='text-yellow-25'>{course?.category?.name}</span></p>
                                <div className='text-[30px] text-richblack-25 font-bold'>{course?.courseName}</div>
                                <p className='text-richblack-100'> {course?.courseDescription}</p>
                            </div>
                            <div className='flex gap-x-3 items-center'>
                                <span>{averageReviewCount || 0}</span>
                                <RatingStars Review_Count={averageReviewCount}/>
                                <span>{`( ${course?.ratingAndReview.length} )`}</span>
                            </div>
                            <p className=''>{course?.instructor.firstName} {course?.instructor.lastName}</p>
                            <div className='flex gap-x-4 mt-6'>
                                <p>created at Time</p>
                                <div className='flex items-center gap-2'>
                                    <CiGlobe />
                                    <p>language</p>
                                </div>
                            </div>
                        </div>
                        {/* Course buy and add to cart section */}
                        <div className='flex flex-col w-[384px] rounded-3xl bg-richblack-700  absolute right-40 top-8   '>
                            <img src={course?.thumbnail} alt='Course Image' className=' rounded-t-3xl'></img>
                            <div className='mt-6 p-4 font-bold text-3xl'>Rs. {course?.price}</div>
                            <div className='flex flex-col p-2 m-2 space-y-6'>
                                <button 
                                    className='p-2 bg-yellow-25 text-richblack-900 rounded-lg font-bold hover:scale-95'
                                    
                                >
                                    Add to Cart
                                </button>
                                <button 
                                    className='p-2 bg-richblack-800 text-richblack-25 font-bold rounded-lg hover:scale-95'
                                    onClick={()=>handleBuyCourse()}
                                >
                                    Buy now
                                </button>
                            </div>
                            <div className='px-5 text-caribbeangreen-50 space-y-1'>
                                <p className='text-white mb-2'>This Course Includes: </p>
                                <p>30-Day Money-Back Gurantee</p>
                                <p>THis course includes: </p>
                            </div>
                            <div className='flex justify-center items-center my-10'>                             
                                <p className='text-yellow-50'>Share</p>
                            </div>
                            </div>
            </div>
            <div>
                <div className='flex flex-col items-start px-40 mt-10 space-y-9'>
                    <div className=' border-[1px] border-richblack-600 p-4 px-10 w-[792px] justify-center items-start'>
                        <p className='font-bold text-3xl text-richblack-5 '>What you'll learn</p>
                        <p className='text-lg text-richblack-25'>{course?.whatYouWillLearn}</p>
                    </div>
                    <div className=' border-[1px] border-richblack-600 p-4 px-10 w-[792px] justify-center items-start'>
                        <p className='font-bold text-3xl text-richblack-5 '>Course content</p>
                        <div className='flex justify-between'>
                            <div className='flex flex-row gap-x-3 text-richblack-200'>
                                <p>{course?.courseContent.length} Section</p>
                                <p className=''> 54 Total lecture</p>
                                <p className=''>7h 54min total length</p>
                            </div>
                            <div className='flex justify-end'>
                                <button 
                                className='text-yellow-25'
                                onClick={()=>setShowSection(!showSection)}>{showSection ? "Collapse all section": "Show section"}</button>
                            </div>
                        </div>
                        <div className='mt-6 border-[1px] border-richblack-600 rounded-lg' >
                            {showSection? (<div>
                                {course?.courseContent?.map((section)=>(
                                    <details key={section._id} close>
                                        <summary className='flex  gap-x-3 justify-between items-center p-4 bg-richblack-600 rounded-md border-richblack-500 border-[1px]'>
                                            <div  
                                                className='text-white  font-semibold flex items-center gap-2 rounded-md'
                                            > 
                                                <MdKeyboardArrowUp className='font-bold text-[20px]'/> 
                                                <p>{section?.sectionName}</p>
                                            </div>
                                            <div className='flex gap-3'>
                                                <p  className='text-yellow-50'>
                                                {section?.subSection?.length} Lecture(s)
                                                </p>
                                            </div>
                                        </summary>
                                            <div className='px-4 ml-1 mt-3 mb-4'>
                                                {section?.subSection?.map((subsection,ind)=>(
                                                    <details key={subsection._id}
                                                        className='transition-[height] delay-200 duration-1000 ease-in-out'
                                                    close>
                                                        <summary className='flex  items-center justify-between '>
                                                            <div className='flex items-center gap-2'>
                                                                <PiMonitorFill />
                                                                <div>{subsection.title}</div>
                                                            </div>
                                                            <div>
                                                                {subsection.timeDuration || "duration"}
                                                            </div>
                                                        </summary>
                                                        <div className='ml-6'>
                                                            <p>{subsection.description}</p>           
                                                        </div>
                                                    </details>
                                                ))}
                                            </div>
                                    </details>
                                ))}
                            </div>) : (<div/>)}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-start px-40 mt-10 space-y-3'>
                    <p className='font-bold text-3xl '>Author</p>
                    <div className='flex items-center gap-x-3'>
                        <img 
                            src={course?.instructor?.image} 
                            alt="Instructor image" 
                            className='rounded-full text-xs w-12'
                        />
                        <p className='flex text-md'>{course?.instructor?.firstName + " " + course?.instructor?.lastName}</p>
                    </div>
                    <p>About</p>
                </div> 
                <div className='text-richblack-5 mt-9 flex justify-center items-center text-4xl'>
                    Review from other learners
                </div>
            

                <footer className='mt-36'>
                    <Footer/>
                </footer>
            </div>
            {/* section 3 */}
            {/* Review slider */}
           
    </div>
  )
}

export default CoursePage   