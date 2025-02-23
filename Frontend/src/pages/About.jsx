import React from 'react'
import HighlightText from '../components/core/homepage/HighlightText'
import aboutus1 from '../../assets/Images/aboutus1.webp'
import aboutus2 from '../../assets/Images/aboutus2.webp'
import aboutus3 from '../../assets/Images/aboutus3.webp'
import Quote from '../components/core/about/Quote'
import FoundingStory from '../../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/about/StatsComponent'
import LearningGrid from '../components/core/about/LearningGrid'
import ContactForm from '../components/core/about/ContactForm'
import Footer from '../components/common/Footer'
const About = () => {
  return (
    <div className='w-full text-white mt-[55px]'>
      {/* section 1 */}
      <section className='bg-richblack-800'>
        <div className='w-[11/12] flex flex-col items-center justify-center mx-11 text-center gap-10 relative '>
            <p className='text-richblack-200 p-2 font-inter font-semibold'>About Us</p>
            <header className='text-richblack-5 font-semibold text-2xl w-[55%] '>
            Driving Innovation in Online Education for a <br/>
            <HighlightText text={"Brighter Future"}/>
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%] mb-7">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </header>
            <div className='sm:h-[70px] lg:h-[150px] mt-11'></div>
            <div className='absolute bottom-0 left-[50%] grid w-[75%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5 '>
                <img src={aboutus1} alt="" />
                <img src={aboutus2} alt="" />
                <img src={aboutus3} alt="" />
            </div>
        </div>
      </section >
      {/* section 2 */}
      <section className='mt-32'>
            <div className='w-[11/12] flex flex-col items-center justify-center mx-11 text-center gap-10 relative '>
                <Quote/>
            </div>
            <div className='border-[1px] border-richblack-100 my-24'></div>
      </section>
      {/* section 3 */}
      <section>
            <div className='w-[11/12] flex flex-col items-center justify-center mx-11 text-center gap-10 relative '>
                {/* founding story  */}
                <div>
                    {/* Founding story left box */}
                    <div>
                        <h1>Our Founding Story </h1>
                        <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <br/>
                        <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    {/* founding story right box */}
                    <div>
                        <img src={FoundingStory} alt="" />
                    </div>
                </div>
                {/* vision mission parent div */}
                <div>
                    {/* left box*/}
                    <div>
                        <h1>Our Vision</h1>
                        <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    {/* right box */}
                    <div>
                        <h1>Our Mission</h1>
                        <p>
                        our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>
            </div>
      </section>
      {/* section 4 */}
      <section>
            <StatsComponent/>
      </section>
      {/* section 5 */}
      <section>
        <LearningGrid/>
        <ContactForm/>
      </section>
      <section>
            Review from other learners
            {/* <ReviewSlider/> */}
      </section>
        <Footer/>
    </div>
  )
}

export default About
