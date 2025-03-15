import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconButton from '../../common/IconButton';

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
    <div className='bg-richblack-100 flex flex-col mt-[30px] py-8 max-w-52 text-richblack-900 h-screen'>
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
            <div className=' bg-richblack-900 text-white '>
                <p>{courseEntireData?.courseName}</p>
                <p>{CompletedLecture?.length} / {totalNoOfLectures}</p>
            </div>
        </div>
        {/* for section and subSection */}
        <div className='flex flex-col'>
            
            {
                courseSectionData.map((section,ind)=>(
                    <div
                        onClick={()=>setActiveStatus(section._id)}
                        key={ind}
                    >   
                        {/* section */}
                        <div>
                            <div>{section.sectionName}</div>
                            {/* add arrow icon */}
                        </div>
                        {/* {subSection} */}
                        <div>
                            {
                                activeStatus === section._id && (
                                    <div>
                                        {
                                            section.subSection.map((subsection,ind)=>(
                                                <div 
                                                    className={`flex gap-3 p-3${videoBarActive===subsection._id?"bg-yellow-25 text-richblack-900" : "bg-richblack-900 text-white"}`}
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
                                                    <span>{subsection.title}</span>
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