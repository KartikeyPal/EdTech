import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/homepage/HighlightText';
import CTAButton from '../components/core/homepage/Button';
import Banner from '../../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/homepage/CodeBlocks';
import TimelineSection from '../components/core/homepage/TimelineSection.jsx';
import LearningLanguageSection from "../components/core/homepage/LearningLanguageSection.jsx";
import InstructorSection from '../components/core/homepage/InstructorSection.jsx';
import ExploreMore from '../components/core/homepage/ExploreMore.jsx';
import Footer from '../components/common/Footer.jsx';
import ReviewSlider from '../components/common/ReviewSlider.jsx';

const Home = () => {

  return (

    <div>
      {/* section 1  */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between'>
            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'> 
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future With
                <HighlightText text={" Coding Skills"}/>
            </div>
            <div className='mt-4 w-[90%] text-center font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>
            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton linkto={"/signup"} active={true}>Learn More</CTAButton>
                <CTAButton linkto={"/login"} active={false}>Book a Demo</CTAButton>
            </div>
            
            <div className='mx-3 my-12 shadow-blue-200'>
                <video muted loop autoPlay src={Banner} type="video/mp4/"></video>
            </div>

            {/* code section 1 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your
                            <HighlightText text={"coding potential"}/>
                            with our onlin courses
                        </div>
                    }
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"}
                    ctabtn1={{
                        btntext: "try is yourself",
                        linkto: "/signup",
                        active: true,
                    }}
                    ctabtn2={{
                        btntext: "Learn more",
                        linkto: "/login",
                        active: false,
                    }}
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</ \ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-yellow-25"}
                    backgroundGradient={`bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
                    from-pink-800 via-richblack-900 to-richblack-900`}/>
            </div>
            {/* code section 2 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start
                            <HighlightText text={"coding in seconds"}/>
                            
                        </div>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    ctabtn1={{
                        btntext: "Continue Lesson",
                        linkto: "/signup",
                        active: true,
                    }}
                    ctabtn2={{
                        btntext: "Learn more",
                        linkto: "/login",
                        active: false,
                    }}
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</ \ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-yellow-25"}
                    backgroundGradient={`bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))]
                        from-blue-500 via-richblack-900 to-richblack-900`}
                />
            </div>
            <ExploreMore/>
        </div>
        {/* section 2  */}
        <div className="bg-pure-greys-5 text-richblack-700">
            {/* {part 1} */}
                <div className='homgpage_bg h-[333px]'>
                    <div className='h-[50%]'></div>
                    <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5'>
                        <div className=' flex flex-row gap-7 text-white  items-center ml-[10%] mt-[3%]    '>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    Explore Full Catelog
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"} >
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>
            {/*part 2 */}
                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                    <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                        <div className='font-inter font-semibold w-[45%] text-4xl'>
                            get the skills you need for a <HighlightText text={"job that is in demand"}/>
                        </div>
                        <div className='flex flex-col gap-10 w-[40%] items-start' >
                            <div className='text-[16px] font-inter'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}><div>Learn More</div></CTAButton>
                        </div>
                    </div>
                <TimelineSection/>
                <LearningLanguageSection/>
                </div>
        </div>
        {/* section 3  */}
        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 text-white'>
                    <InstructorSection/>
                    <h2 className=' text-center text-4xl font-semibold m-10'>Review from other learners</h2>
                    {/* Review slider */}
                    <ReviewSlider/> 
        </div>
        {/* Footer  */}
        <div className='mx-auto w-full flex flex-row items-center justify-between gap-7 bg-[#161D29] shadow-richblack-700 shadow-lg px-[52px] pt-[120px] '>
                <Footer/>
        </div>
    </div>
  )
}

export default Home;
