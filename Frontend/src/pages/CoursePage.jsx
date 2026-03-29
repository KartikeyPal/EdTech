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
import { addToCart } from '../slices/cartSlice';
import toast from 'react-hot-toast';
const CoursePage = () => {
    const {id} = useParams();
    const [course,setCourse] = useState();
    const [showSection,setShowSection] = useState(false);
    const [averageReviewCount,setAverageReviewCount] = useState(0);

    
    const {cart,totalItems,total} = useSelector(state => state.cart);
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
        const count = GetAvgRating(course?.ratingAndReview);
        setAverageReviewCount(count);
    },[course])



    const handleBuyCourse = () =>{
        if(token){
            buyCourse(token,[id],user,navigate,dispatch);
            return;
        }
    }
    const handleAddToCart = () =>{
        if(!user){
            toast.error("Please log in");
            navigate('/login')
            return;
        }
        dispatch(addToCart(course));
    }



  return (
    <div className='text-white pt-16 bg-richblack-900 min-h-screen'>
        {/* Header Section */}
        <div className='w-full bg-richblack-800 py-10 lg:py-16'>
            <div className='mx-auto px-4 lg:px-0 w-full lg:w-11/12 max-w-maxContent flex flex-col-reverse lg:flex-row gap-12 justify-between items-start relative'>
                
                {/* Course Details Info */}
                <div className='flex flex-col gap-4 lg:w-[60%] py-4'>
                    <p className='text-richblack-400 text-sm'>
                        Home / Learning / <span className='text-yellow-25'>{course?.category?.name}</span>
                    </p>
                    <div className='text-3xl lg:text-4xl text-richblack-5 font-bold'>{course?.courseName}</div>
                    <p className='text-richblack-100 text-lg'> {course?.courseDescription}</p>
                    
                    <div className='flex gap-x-3 items-center flex-wrap mt-2'>
                        <span className="text-yellow-25 text-lg">{averageReviewCount || 0}</span>
                        <RatingStars Review_Count={averageReviewCount}/>
                        <span className="text-richblack-200">{`( ${course?.ratingAndReview?.length || 0} Reviews )`}</span>
                    </div>
                    <p className='text-richblack-50 text-lg'>Instructor: {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    
                    <div className='flex flex-wrap gap-x-6 mt-4 text-richblack-50'>
                        <div className='flex items-center gap-2'>
                            <CiGlobe className="text-xl"/>
                            <p>English</p>
                        </div>
                    </div>
                </div>

                {/* Course Buy Card - Stacked on Mobile, Floating Absolute on Desktop */}
                <div className='w-full lg:w-[35%] rounded-3xl bg-richblack-700 lg:absolute lg:right-0 lg:top-[12%] shadow-[20px_20px_0px_0px_#111827] overflow-hidden border border-richblack-600 z-10'>
                    <img src={course?.thumbnail} alt='Course Thumbnail' className='w-full h-[250px] lg:h-auto object-cover' />
                    <div className='p-6 flex flex-col gap-6'>
                        <div className='font-bold text-3xl text-white'>Rs. {course?.price}</div>
                        
                        <div className='flex flex-col gap-4'>
                            <button 
                                className='w-full py-3 bg-yellow-50 text-richblack-900 rounded-lg font-bold hover:bg-yellow-25 hover:scale-95 transition-all outline-none focus:ring-2 focus:ring-yellow-50'
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                            <button 
                                className='w-full py-3 bg-richblack-800 text-richblack-5 font-bold rounded-lg hover:bg-richblack-900 hover:scale-95 transition-all outline-none focus:ring-2 focus:ring-richblack-50 border border-richblack-600'
                                onClick={handleBuyCourse}
                            >
                                Buy Now
                            </button>
                        </div>
                        
                        <div className='text-richblack-50 text-sm space-y-2 pb-4 border-b border-richblack-600'>
                            <p className='text-white mb-2 font-medium text-lg'>This Course Includes:</p>
                            <p>• 30-Day Money-Back Guarantee</p>
                            <p>• Full Lifetime Access</p>
                            <p>• Certificate of Completion</p>
                        </div>
                        
                        <div className='flex justify-center items-center cursor-pointer'>                             
                            <p className='text-yellow-50 font-medium hover:text-yellow-25 transition-colors'>Share</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* Content Section */}
        <div className='mx-auto px-4 lg:px-0 w-full lg:w-11/12 max-w-maxContent flex flex-col lg:flex-row mt-12 gap-10 lg:gap-0 pb-16'>
            
            <div className='flex flex-col items-start space-y-10 w-full lg:w-[60%]'>
                
                {/* What You'll Learn */}
                <div className='border border-richblack-700 p-6 lg:p-8 w-full rounded-lg bg-richblack-800 shadow-sm'>
                    <p className='font-bold text-2xl lg:text-3xl text-richblack-5 mb-4'>What you'll learn</p>
                    <p className='text-base md:text-lg text-richblack-50 leading-relaxed whitespace-pre-wrap'>{course?.whatYouWillLearn}</p>
                </div>
                
                {/* Course Content overview */}
                <div className='border border-richblack-700 p-6 lg:p-8 w-full rounded-lg bg-richblack-800 shadow-sm'>
                    <p className='font-bold text-2xl lg:text-3xl text-richblack-5 mb-4'>Course content</p>
                    
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6'>
                        <div className='flex flex-wrap gap-x-3 gap-y-2 text-richblack-200 text-sm'>
                            <p>{course?.courseContent?.length || 0} Sections</p>
                            <p className='hidden sm:block'>•</p>
                            <p>{course?.courseContent?.reduce((acc, sec) => acc + (sec.subSection?.length || 0), 0) || 0} Total Lectures</p>
                        </div>
                        <button 
                            className='text-yellow-50 font-medium hover:text-yellow-25 transition-colors'
                            onClick={()=>setShowSection(!showSection)}
                        >
                            {showSection ? "Collapse all sections" : "Expand all sections"}
                        </button>
                    </div>
                    
                    {/* Collapsible Content */}
                    <div className='border border-richblack-700 rounded-lg overflow-hidden bg-richblack-900' >
                        {showSection && (
                            <div className="flex flex-col gap-0 border-b border-richblack-700 last:border-b-0">
                                {course?.courseContent?.map((section)=>(
                                    <details key={section._id} className="group" open>
                                        <summary className='flex cursor-pointer gap-x-3 justify-between items-center p-4 bg-richblack-700 border-b border-richblack-600 transition-colors hover:bg-richblack-600 list-none'>
                                            <div className='text-richblack-5 font-semibold flex items-center gap-2'> 
                                                <MdKeyboardArrowUp className='text-[24px] group-open:-rotate-180 transition-transform duration-300 text-richblack-200'/> 
                                                <p>{section?.sectionName}</p>
                                            </div>
                                            <div className='text-yellow-50 text-sm'>
                                                {section?.subSection?.length || 0} Lecture(s)
                                            </div>
                                        </summary>
                                        
                                        {/* Subsections List */}
                                        <div className='px-4 py-3 bg-richblack-900'>
                                            {section?.subSection?.map((subsection,ind)=>(
                                                <div key={subsection._id} className='flex items-center justify-between py-3 border-b border-richblack-800 last:border-b-0'>
                                                    <div className='flex items-center gap-3 text-richblack-50'>
                                                        <PiMonitorFill className="text-xl text-richblack-200 min-w-[20px]"/>
                                                        <span className="text-sm md:text-base">{subsection.title}</span>
                                                    </div>
                                                    <div className='text-richblack-200 text-sm min-w-[50px] text-right'>
                                                        {subsection.timeDuration || "--:--"}
                                                    </div>
                                                </div>
                                            ))}
                                            {(!section?.subSection || section?.subSection?.length === 0) && (
                                                <div className="text-richblack-400 italic text-sm py-2">No lectures available.</div>
                                            )}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        )}
                        {!showSection && (
                            <div className="p-4 text-center text-richblack-300 italic">Sections collapsed. Click 'Expand all sections' to view course curriculum.</div>
                        )}
                    </div>
                </div>

                {/* Author Section */}
                <div className='flex flex-col items-start space-y-4 w-full pt-4'>
                    <p className='font-bold text-2xl lg:text-3xl text-richblack-5'>Author</p>
                    <div className='flex items-center gap-x-4 bg-richblack-800 p-4 border border-richblack-700 rounded-lg w-full'>
                        <img 
                            src={course?.instructor?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${course?.instructor?.firstName} ${course?.instructor?.lastName}`} 
                            alt={`${course?.instructor?.firstName}`} 
                            className='rounded-full h-14 w-14 object-cover'
                        />
                        <div className='flex flex-col'>
                            <p className='text-lg font-medium text-richblack-50'>
                                {course?.instructor?.firstName} {course?.instructor?.lastName}
                            </p>
                            <p className="text-sm text-richblack-300">Instructor</p>
                        </div>
                    </div>
                </div> 

            </div>
        </div>
        
        {/* Reviews Section */}
        <div className='mx-auto px-4 w-full max-w-maxContent py-10'>
             <div className='text-richblack-5 mb-8 flex justify-center items-center text-2xl lg:text-4xl font-semibold text-center'>
                    Reviews from other learners
             </div>
             {/* Note: ReviewSlider can be placed here when ready */}
        </div>

        {/* Footer block integrated securely */}
        <div className='w-full'>
            <Footer/>
        </div>

    </div>
  )
}

export default CoursePage   