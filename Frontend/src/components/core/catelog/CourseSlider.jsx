import React from 'react'
import { Link } from 'react-router-dom'

// Import Swiper React components
import {Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import Swiper modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import CourseCard from './CourseCard';

const CourseSlider = ({ courses }) => {
  console.log(courses);
  return (
    <div>
      {
        courses?.length ? (
          <Swiper
            // modules={[Autoplay, FreeMode, Pagination]}
            loop={true}
            // autoplay={{
            //   delay: 2000,
            //   disableOnInteraction: false,
            // }}
            pagination={{
              clickable: true,
            }}
            freeMode={true}
            slidesPerView={3}
            spaceBetween={30}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30
              }
            }}
          >
            {
              courses.map((course, ind) => (
                <SwiperSlide key={ind}>
                  <CourseCard course={course} Height={"h-[250px]"} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        ) : (
          <div className='w-full flex justify-center items-center p-9 border-richblack-400  border-[1px]  rounded-lg mb-9'>
            <p className='font-extrabold text-richblack-50 text-4xl '>No Course Found</p>
          </div>
        )
      }
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #FFD60A;
          opacity: 0.5;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #FFD60A;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  )
}

export default CourseSlider