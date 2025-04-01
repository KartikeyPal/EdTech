import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconButton from '../../common/IconButton';
import { IoIosArrowDown } from "react-icons/io";
import { BiVideo } from "react-icons/bi";
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
    console.log(courseEntireData);
    useEffect(()=>{
        ;(()=>{
            if(!courseSectionData.length){
                return
            }
            console.log("courseSectionData : ", courseSectionData);
            const CurrentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
            const currentSubSectionIndex = courseSectionData[CurrentSectionIndex]?.subSection.findIndex((data)=>data._id ===subSectionId);
            const activeSubSectionId = courseSectionData[currentSubSectionIndex]?.subSection[currentSubSectionIndex]?._id;
            setActiveStatus(courseSectionData?.[CurrentSectionIndex]?._id);
            setVideoBarActive(activeSubSectionId);
        })()
    },[courseSectionData,courseEntireData,location.pathname])

  return (
    <div className='bg-richblack-900 flex flex-col mt-[30px] py-8 w-full text-richblack-25 h-screen'>
            {/* button and heading */}
        <div>
            {/* buttons  */}
            <div className='flex gap-5'>
                <div
                    
                    onClick={()=>navigate("/dashboard/enrolled-courses")}
                    className='p-2 bg-richblack-800 text-white rounded-lg hover:cursor-pointer hover:scale-95 m-2'
                >
                    back
                </div>
                <div>
                    <IconButton 
                        text={'Add Review'} 
                        onClick={()=>setReviewModal(true)}
                        customClasses={'p-2 bg-yellow-25 text-richblack-900 rounded-lg hover:cursor-pointer hover:scale-95 m-2'}
                    />
                </div>
            </div>
            {/* heading or title */}
            <div className='w-[100%] bg-richblack-900 text-white  py-3 flex items-center gap-3'>
                <p className='font-bold text-2xl w-[80%]'>{courseEntireData?.courseName}</p>
                <p className='w-[20%]'>{CompletedLecture?.length} / {totalNoOfLectures}</p>
            </div>

            <hr />
        </div>
        {/* for section and subSection */}
        <div className='flex flex-col mt-3'>
            
            {
                courseSectionData.map((section,ind)=>(
                    <div
                        onClick={()=>setActiveStatus(section._id)}
                        key={ind}
                    >   
                        {/* section */}
                        <div className='flex items-center gap-2 px-3 bg-richblack-600 py-2 justify-between text-white'>
                            <div>{section.sectionName}</div>
                            <IoIosArrowDown className={`${sectionId === section._id ? "rotate-180 " : ""}`}/>
                        </div>
                        {/* {subSection} */}
                        <div className='w-full flex '>
                            {
                                activeStatus === section._id && (
                                    <div className='w-full'> 
                                        {
                                            section.subSection.map((subsection,ind)=>(
                                                <div 
                                                    className={`w-full flex gap-3 p-1  ${videoBarActive===subsection._id?"bg-yellow-25 text-richblack-900 items-center " : "bg-richblack-700 text-white items-center"}`}
                                                    key={ind}
                                                    onClick={()=>{navigate(`view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${subsection._id}`)
                                                    setVideoBarActive(subsection?._id);
                                                }}
                                                >
                                                    <input 
                                                        type="checkbox" 
                                                        checked= {CompletedLecture.includes(subsection._id)}
                                                        onChange={()=>{}}
                                                    />
                                                    <span >{subsection.title}</span>
                                                    <BiVideo />
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default VideoDetailsSideBar