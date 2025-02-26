import React from 'react'
import { Link } from 'react-router-dom'

// Import Swiper React components

import {Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import CourseCard from './CourseCard';

const CourseSlider = ({ courses }) => {
  console.log(courses);
  return (
    <div>
      {
        courses?.length ? (
          <Swiper
            loop={true}
          >
            {
              courses.map((course, ind) => (
                <SwiperSlide key={ind}>
                  <CourseCard course={course} Height={"h-[250px]"} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        ) : (<p>No course Found</p>)
      }
    </div>
  )
}

export default CourseSlider