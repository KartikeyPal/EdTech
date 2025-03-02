import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconButton from '../../common/IconButton';

const VideoDetailsSideBar = ({setReviewModal}) => {

    const [activeStatus,setActiveStatus] =  useState("");
    const [videoBarActive,setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId,sebSectionId} = useParams();
    const{
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        CompletedLectures,
    } = useSelector(state=>state.viewCourse);

    useEffect(()=>{
        ;(()=>{
            if(!courseSectionData.length){
                return
            }
            const CurrentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
            const currentSubSectionIndex = courseSectionData?.[CurrentSectionIndex].findIndex((data)=>data._id ===sebSectionId);

            const activeSubSectionId = courseSectionData[currentSubSectionIndex]?.subSection[currentSubSectionIndex]?._id;
            setActiveStatus(courseSectionData?.[CurrentSectionIndex]?._id);
            setVideoBarActive(activeSubSectionId);
        })()
    },[courseSectionData,courseEntireData,location.pathname])

  return (
    <div>
            {/* button and heading */}
        <div>
            {/* buttons  */}
            <div>
                <div
                    onClick={()=>navigate("/dashboard/enrolled-courses")}
                >
                    back
                </div>
                <div>
                    <IconButton text={'Add Review'} onClick={()=>setReviewModal(true)}/>
                </div>
            </div>
            {/* heading or title */}
            <div>
                <p>{courseEntireData?.courseName}</p>
                <p>{CompletedLectures?.length} / {totalNoOfLectures}</p>
            </div>
        </div>
        {/* for section and subSection */}
        <div>
            {
                courseSectionData.map((section,ind)=>{
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
                                                        checked= {CompletedLectures.includes(subsection._id)}
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
                })
            }
        </div>
    </div>
  )
}

export default VideoDetailsSideBar