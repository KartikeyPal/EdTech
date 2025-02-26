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
                    <p>{course.courseName}</p>
                    <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div>
                        <span>{averageReviewCount || 0}</span>
                        <RatingStars Review_Count={averageReviewCount}/>
                        {/* <span>{course.ratingAndReview.length} Ratings</span> */}
                    </div>
                    <p>{course.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default CourseCard