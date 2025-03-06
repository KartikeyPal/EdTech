import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,FreeMode,Navigation, Pagination } from 'swiper/modules';
import { EffectFade } from 'swiper/modules';
import ReactStars from "react-rating-stars-component";
import { getAllReview } from '../../services/operations/reviewAPI';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const ReviewSlider = () => {
  const [allReview,setAllReview] = useState([]);
  useEffect(()=>{
    const getReview =async()=> {
      const res = await getAllReview();
      setAllReview(res);
    }
    getReview();
  },[])

  return (
    <div className='text-white m-10 '>
      <div className='h-[190px] max-w-maxContent'>
          <Swiper
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
              delay:2500,
            }}
            modules={[FreeMode,Pagination,EffectFade,Autoplay]}  
            effect="fade"
            className='w-full'
          >
              {
                allReview.map((review,ind)=>(
                  <SwiperSlide key={ind}>
                      <img 
                        src={review?.user?.image ? review?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                        alt='alt pic'
                        className='h-9 w-9 object-cover rounded-full'
                      />
                      <p>{review?.user?.firstName } {review?.user?.lastName }</p>
                      <p>{review?.course?.courseName}</p>
                      <p>
                        {review?.review}
                      </p>
                      <p>{review?.rating}</p>
                      <ReactStars
                        count={5}
                        value= {review?.rating}
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        
                      />

                  </SwiperSlide>
                ))
              }

          </Swiper>

      </div>
    </div>
  )
} 

export default ReviewSlider