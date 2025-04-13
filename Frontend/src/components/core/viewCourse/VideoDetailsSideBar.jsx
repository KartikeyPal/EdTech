import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconButton from '../../common/IconButton';
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { BiVideo, BiCheckCircle } from "react-icons/bi";
import { RiProgress4Fill } from "react-icons/ri";

const VideoDetailsSideBar = ({setReviewModal}) => {
    const [activeStatus,setActiveStatus] =  useState("");
    const [videoBarActive,setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId,subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        CompletedLecture,
        totalNoOfLectures,
    } = useSelector(state=>state.viewCourse);

    useEffect(()=>{
        if(!courseSectionData.length) return;
        
        const CurrentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
        const currentSubSectionIndex = courseSectionData[CurrentSectionIndex]?.subSection.findIndex((data)=>data._id ===subSectionId);
        const activeSubSectionId = courseSectionData[CurrentSectionIndex]?.subSection[currentSubSectionIndex]?._id;
        setActiveStatus(courseSectionData?.[CurrentSectionIndex]?._id);
        setVideoBarActive(activeSubSectionId);
    },[courseSectionData,courseEntireData,location.pathname])

    const calculateProgress = () => {
        return ((CompletedLecture?.length / totalNoOfLectures) * 100).toFixed(0);
    }

    return (
        <div className='bg-richblack-900 flex flex-col w-full text-richblack-25 h-screen overflow-y-auto mt-12'>
            {/* Header Section */}
            <div className='sticky top-0 bg-richblack-900 z-10 p-4 border-b border-richblack-700'>
                {/* Action Buttons */}
                <div className='flex items-center justify-between mb-6'>
                    <button
                        onClick={()=>navigate("/dashboard/enrolled-courses")}
                        className='flex items-center gap-2 px-4 py-2 bg-richblack-800 text-richblack-200 hover:text-white hover:bg-richblack-700 rounded-lg transition-all duration-200'
                    >
                        <IoIosArrowBack className="text-xl" />
                        <span>Back to Courses</span>
                    </button>
                    <IconButton 
                        text={'Add Review'} 
                        onClick={()=>setReviewModal(true)}
                        customClasses={'px-4 py-2 bg-yellow-25 text-richblack-900 rounded-lg hover:bg-yellow-50 transition-all duration-200'}
                    />
                </div>
                
                <div className='space-y-2'>
                    <h1 className='text-2xl font-bold text-white'>{courseEntireData?.courseName}</h1>
                    <div className='flex items-center gap-3'>
                        <div className='flex-1 h-2 bg-richblack-700 rounded-full overflow-hidden'>
                            <div 
                                className='h-full bg-yellow-25 transition-all duration-300'
                                style={{ width: `${calculateProgress()}%` }}
                            />
                        </div>
                        <span className='text-sm text-richblack-200'>
                            {CompletedLecture?.length} / {totalNoOfLectures} Lectures
                        </span>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className='flex-1 p-4 space-y-4 overflow-y-auto'>
                {courseSectionData.map((section, index) => (
                    <div key={index} className='bg-richblack-800 rounded-lg overflow-hidden'>
                        {/* Section Header */}
                        <div
                            onClick={()=>setActiveStatus(activeStatus === section._id ? "" : section._id)}
                            className='flex items-center justify-between p-4 cursor-pointer hover:bg-richblack-700 transition-all duration-200'
                        >
                            <div className='flex items-center gap-3'>
                                <span className='text-lg font-semibold'>{section.sectionName}</span>
                                <span className='text-sm text-richblack-200'>
                                    ({section.subSection.length} lectures)
                                </span>
                            </div>
                            <IoIosArrowDown 
                                className={`text-xl transition-transform duration-300 ${
                                    activeStatus === section._id ? "rotate-180" : ""
                                }`}
                            />
                        </div>

                        {/* Subsection List */}
                        <div 
                            className={`transition-all duration-300 ease-in-out ${
                                activeStatus === section._id 
                                    ? "max-h-[1000px] opacity-100" 
                                    : "max-h-0 opacity-0"
                            }`}
                        >
                            <div className='divide-y divide-richblack-700'>
                                {section.subSection.map((subsection, subIndex) => (
                                    <div 
                                        key={subIndex}
                                        className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 ${
                                            videoBarActive === subsection._id 
                                                ? "bg-yellow-25 text-richblack-900" 
                                                : "hover:bg-richblack-700"
                                        }`}
                                        onClick={() => {
                                            navigate(`view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${subsection._id}`);
                                            setVideoBarActive(subsection._id);
                                        }}
                                    >
                                        <div className='flex-shrink-0'>
                                            {CompletedLecture.includes(subsection._id) ? (
                                                <BiCheckCircle className="text-xl text-green-500" />
                                            ) : (
                                                <BiVideo className="text-xl" />
                                            )}
                                        </div>
                                        <div className='flex-1'>
                                            <p className='font-medium'>{subsection.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VideoDetailsSideBar