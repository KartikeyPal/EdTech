import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLecture } from '../../../slices/viewCourseSlice';
import { Player ,BigPlayButton,LoadingSpinner  } from 'video-react';
import "../../../../node_modules/video-react/dist/video-react.css";
import { FaPlayCircle } from "react-icons/fa";
import IconButton from '../../common/IconButton';
const VideoDetails = () => {
      const {courseId ,sectionId, subSectionId} = useParams();
      console.log(useParams())
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const location = useLocation();
      const playerRef = useRef();
      const {token} = useSelector((state) => state.auth);
      const{
        courseSectionData,
        courseEntireData,
        CompletedLecture,
        totalNoOfLectures,
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
          console.log(firstSubSectionId);
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
      <div className='text-white bg-richblack-800  h-screen flex  items-center flex-col mt-[57px] p-3 w-full'>
          {
            !videoData ? (<div>no data found</div>) : (
                      <div className='w-full h-[70%] flex  flex-col'>
                        <Player
                            fluid={false}
                            ref={playerRef}
                            width="100%"
                            height="80%"
                            playsInLine
                            onEnded={()=>setVideoEnded(true)}
                            src={videoData?.videoUrl}  
                        >
                          <LoadingSpinner />
                          <BigPlayButton position="center" />
                        {
                          videoEnded && (
                            <div className='flex justify-center items-center h-full w-full flex-col  border-[2px] border-solid bg-richblue-900 text-white '>
                              {
                                !CompletedLecture.includes(subSectionId) && (
                                  <IconButton
                                      disabled={loading}
                                      onClick={()=>handleLectureCompletion()}
                                      text={!loading? ("Mark as completed") : ("Loading...")}
                                      customClasses={"z-50 m-3 font-semibold text-richblack-5 text-xl bg-richblack-900 rounded-lg p-2" }
                                  />
                                )
                              }

                              <IconButton  
                                  disabled={loading}
                                  onClick={()=>{
                                    if(playerRef?.current){
                                      playerRef.current?.seek(0);
                                      setVideoEnded(false);
                                    }
                                  }}
                                  text={"Rewatch"}
                                  customClasses={"z-50  font-semibold text-richblack-5 text-xl bg-richblack-900 rounded-lg p-2"}
                              />

                              <div className='z-50  mt-3 '>
                                {!isFirstVideo() && (
                                  <button 
                                    disabled={loading} 
                                    onClick={goToPrevVideo}
                                    className='z-50 bg-richblack-800 text-white p-2 rounded-lg mx-2 font-semi'
                                    >Prev</button>
                                )}
                                {
                                  !isLastVideo() && (
                                    <button
                                      disabled={loading}
                                      onClick={goToNextVideo}
                                      className='z-50 bg-yellow-50 text-richblack-900 p-2 rounded-lg hover:scale-95 mx-2'

                                    >Next</button>
                                  ) 
                                }
                              </div>
                            </div>
                          )
                        }
                        </Player>
                      </div>
            )
          }
          <div className='flex flex-col justify-start w-full p-3 -mt-11'>

            <h1 className='font-bold text-3xl text-richblack-50'>{videoData.title}</h1>
            <p className='text-lg font-semibold'>Description : </p>
            <p className='font'> {videoData?.description} </p> 

          </div>
    </div>
  )
}

export default VideoDetails