import React, { useEffect, useState } from 'react'
import GetAvgRating from '../../../../utils/avgRating';
import RatingStars from '../../common/RatingStars';
import { Link } from 'react-router-dom';

const CourseCard = ({course,Height}) => {
    const [averageReviewCount,setAverageReviewCount] = useState(0);
    console.log(course);

    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReview);
        setAverageReviewCount(count);
    },[course])
  return (
    <div>
        <Link to={`/courses/${course._id}`}>
            <div >
                <div>
                    <img src={course.thumbnail} 
                    alt="Course Thumbnail"
                    className={`${Height} w-full  rounded-xl object-cover`} 
                    />
                    
                </div>
                <div>
                    <p className=' text-2xl pt-2 text-richblack-50'>{course.courseName}</p>
                    <p className='text-sm text-richblack-100'> Instructor: {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className='flex gap-x-3 items-center mt-2'>
                        <span className='text-yellow-100'>{averageReviewCount || 0}</span>
                        <RatingStars Review_Count={averageReviewCount}/>
                        <span className='text-richblack-100'>{course.ratingAndReview?.length} Ratings</span>
                    </div>
                    <p className='text-2xl py-2 text-richblack-100'> Rs. {course.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default CourseCard