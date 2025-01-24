import React, { useState } from 'react'
import {HomePageExplore} from '../../../../data/homepage-explore'
import HighlightText from './HighlightText'
const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill path",
    "Career path",
]
const ExploreMore = () => {
    const [currentTab,setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCard = (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
  return (
    <div>
        <div className='text-4xl font-semibold text-center'>
            Unlock the <HighlightText text={"power of code"}/>
        </div>
        <p className='font-medium text-richblack-300 text-[16px]  text-center'>
            Learn to build anything you can imagine
        </p>
        <div className='flex flex-row justify-between items-center bg-richblack-800 rounded-full my-5 px-2 py-2 '>
            {
                tabsName.map((element,index)=>{
                    return(
                        <div className={`text-[16px] ${currentTab==element?"bg-richblack-900 text-richblack-5 font-medium":"text-richblack-200"} rounded-full  transition-all cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-4 py-3 `} key={index} onClick={()=>setMyCard(element)}>
                            {element}
                        </div>
                    )
                })
            }
        </div>
        <div className='lg:h-[150px]'></div>
            {/* course card group */}
        {/* <div className='absolute flex flex-row gap-10 justify-between w-full'>
            {courses.map((element, index) => {
                return (
                    <CourseCard cardData={element} setCurrentCard={setCurrentCard} key={index}/>
                );
            })}
        </div> */}
    </div> 
  ) 
}

export default ExploreMore
