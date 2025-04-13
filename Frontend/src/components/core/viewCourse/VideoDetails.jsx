import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLecture } from '../../../slices/viewCourseSlice';
import { Player, BigPlayButton, LoadingSpinner } from 'video-react';
import "../../../../node_modules/video-react/dist/video-react.css";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import IconButton from '../../common/IconButton';

const VideoDetails = () => {
    const {courseId,sectionId,subSectionId}=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    const playerRef=useRef();
    const {token} = useSelector((state)=>state.auth);
    const{
        courseSectionData,
        courseEntireData,
        CompletedLecture,
    } = useSelector(state=>state.viewCourse);

    const [videoData,setVideoData] = useState([]);
    const [videoEnded,setVideoEnded] = useState(false);
    const [loading , setLoading] = useState(false);

    useEffect(()=>{
        const setVideoSpecificDetails = async()=>{
            if(!courseSectionData.length){
                return;
            }
            if(!courseId || !sectionId || !subSectionId){
                navigate("dashboard/enrolled-courses");
            }
            else{
                const filterData = courseSectionData.filter((section)=>section._id === sectionId);
                const filterVideoData = filterData?.[0]?.subSection.filter((data)=>data._id === subSectionId);
                setVideoData(filterVideoData[0]);
                setVideoEnded(false);
            }
        }
        setVideoSpecificDetails();
    },[courseSectionData,courseEntireData,location.pathname]);

    const isFirstVideo = () =>{
        const  currentSectionIndex = courseSectionData.findIndex((data)=>data._id ===sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id === subSectionId);
        if(currentSectionIndex === 0 && currentSubSectionIndex ===0){
            return true;
        }
        else{
            return false;
        }
    }
    const isLastVideo = () =>{
        const  currentSectionIndex = courseSectionData.findIndex((data)=>data._id ===sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id === subSectionId);
        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;
        if(currentSectionIndex === courseSectionData.length-1 && currentSubSectionIndex ===noOfSubSection-1){
            return true;
        }
        else{
            return false;
        }
    }

    const goToNextVideo = () =>{
        const  currentSectionIndex = courseSectionData.findIndex((data)=>data._id ===sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id === subSectionId);
        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;

        if(currentSubSectionIndex !== noOfSubSection-1) {
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex+1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        }
        else{
            const nextSectionId = courseSectionData[currentSectionIndex+1]._id;
            const firstSubSectionId = courseSectionData[currentSectionIndex+1].subSection[0]._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${firstSubSectionId}`);
        }
    }

    const goToPrevVideo = ()=>{
        const  currentSectionIndex = courseSectionData.findIndex((data)=>data._id ===sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id === subSectionId);
        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;

        if(currentSubSectionIndex !== 0) {
            const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex-1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
        }
        else{
            const prevSectionId = courseSectionData[currentSectionIndex-1]._id;
            const prevSubSectionLength = courseSectionData[currentSectionIndex-1].subSection.length;
            const lastSubSectionId = courseSectionData[currentSectionIndex-1].subSection[prevSubSectionLength-1]._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${lastSubSectionId}`);
        }
    }

    const handleLectureCompletion = async() =>{
        setLoading(true);
        const res = await markLectureAsComplete({courseId,subSectionId},token);
        if(res){
            dispatch(updateCompletedLecture(subSectionId));
        }
        setLoading(false);
    }

    return (
        <div className='min-h-screen bg-richblack-800 text-white'>
            <div className='max-w-[1200px] mx-auto px-4 py-6'>
                {!videoData ? (
                    <div className='flex items-center justify-center h-[60vh]'>
                        <div className='text-xl text-richblack-200'>No video data found</div>
                    </div>
                ) : (
                    <div className='space-y-6'>
                        {/* Video Player Section */}
                        <div className='relative w-full aspect-video bg-richblack-900 rounded-xl overflow-hidden shadow-lg'>
                            <Player
                                fluid={false}
                                ref={playerRef}
                                width="100%"
                                height="100%"
                                playsInLine
                                onEnded={()=>setVideoEnded(true)}
                                src={videoData?.videoUrl}
                            >
                                <LoadingSpinner />
                                <BigPlayButton position="center" />
                            </Player>
                            
                            {/* Video Completion Overlay */}
                            {videoEnded && (
                                <div className='absolute inset-0 flex flex-col items-center justify-center bg-richblack-900/95 backdrop-blur-sm z-50 animate-fadeIn'>
                                    <div className='text-center space-y-6 p-8 max-w-md w-full'>
                                        <div className='space-y-4'>
                                            <h2 className='text-2xl font-bold text-richblack-5'>Video Completed!</h2>
                                            <p className='text-richblack-200'>Would you like to mark this lecture as completed?</p>
                                        </div>

                                        <div className='flex flex-col gap-4'>
                                            {!CompletedLecture.includes(subSectionId) && (
                                                <IconButton
                                                    disabled={loading}
                                                    onClick={handleLectureCompletion}
                                                    text={!loading ? "Mark as Completed" : "Marking..."}
                                                    customClasses="w-full bg-yellow-50 text-richblack-900 hover:bg-yellow-100 transition-all duration-200 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl"
                                                />
                                            )}
                                            
                                            <div className='flex flex-col gap-3'>
                                                <IconButton
                                                    disabled={loading}
                                                    onClick={() => {
                                                        if (playerRef?.current) {
                                                            playerRef.current?.seek(0);
                                                            setVideoEnded(false);
                                                        }
                                                    }}
                                                    text="Rewatch Video"
                                                    customClasses="w-full bg-richblack-700 hover:bg-richblack-600 transition-all duration-200 py-3 text-lg font-medium rounded-lg"
                                                />
                                                
                                                <div className='flex gap-3 justify-center'>
                                                    {!isFirstVideo() && (
                                                        <button
                                                            disabled={loading}
                                                            onClick={goToPrevVideo}
                                                            className='flex items-center gap-2 px-6 py-3 bg-richblack-700 hover:bg-richblack-600 rounded-lg transition-all duration-200 disabled:opacity-50 font-medium'
                                                        >
                                                            <FaArrowLeft />
                                                            Previous
                                                        </button>
                                                    )}
                                                    {!isLastVideo() && (
                                                        <button
                                                            disabled={loading}
                                                            onClick={goToNextVideo}
                                                            className='flex items-center gap-2 px-6 py-3 bg-yellow-50 text-richblack-900 hover:bg-yellow-100 rounded-lg transition-all duration-200 disabled:opacity-50 font-medium'
                                                        >
                                                            Next
                                                            <FaArrowRight />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Video Details Section */}
                        <div className='space-y-4'>
                            <div className='flex items-center justify-between'>
                                <h1 className='text-3xl font-bold text-richblack-5'>{videoData.title}</h1>
                                {CompletedLecture.includes(subSectionId) && (
                                    <div className='flex items-center gap-2 text-yellow-50'>
                                        <FaCheckCircle className='text-xl' />
                                        <span className='font-medium'>Completed</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className='bg-richblack-700/50 p-6 rounded-xl'>
                                <h2 className='text-xl font-semibold text-richblack-5 mb-2'>Description</h2>
                                <p className='text-richblack-200 leading-relaxed'>{videoData?.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VideoDetails