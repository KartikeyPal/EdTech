import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLecture, setCourseEntireData, setCourseSectionData, setTotalNoOfLecture } from '../slices/viewCourseSlice';
import CourseReviewModal from '../components/core/viewCourse/CourseReviewModal';
import VideoDetailsSideBar from '../components/core/viewCourse/VideoDetailsSideBar';

const ViewCourse = () => {
    const [reviewModal,setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector(state=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        const setCourseSpecificDetails = async()=>{
            const courseData = await getFullDetailsOfCourse(courseId,token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setCourseEntireData(courseData.courseDetails));
            dispatch(setCompletedLecture(courseData.completedVideos));
            let lec = 0;
            courseData?.courseDetails?.courseContent?.forEach(sec => {
                lec+=sec.subSection.length;
            });
            dispatch(setTotalNoOfLecture(lec));
        }
        setCourseSpecificDetails();
    },[])


  return (
    <div>
        <div>
            <VideoDetailsSideBar setReviewModal = {setReviewModal} />
            <div>
                <Outlet/>
            </div>
        </div>
        {reviewModal && <CourseReviewModal setReviewModal = {setReviewModal}/>}
    </div>
  )
}

export default ViewCourse