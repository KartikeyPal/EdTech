import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { EffectFade } from 'swiper/modules';
import ReactStars from "react-rating-stars-component";
import { getAllReview } from '../../services/operations/reviewAPI';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const ReviewSlider = () => {
  const [allReview, setAllReview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReview = async () => {
      try {
        setLoading(true);
        const res = await getAllReview();
        if (res) {
          setAllReview(res);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    }
    getReview();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[190px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-richblack-5"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[190px] text-richblack-5">
        {error}
      </div>
    );
  }

  if (!allReview || allReview.length === 0) {
    return (
      <div className="flex justify-center items-center h-[190px] text-richblack-5">
        No reviews available
      </div>
    );
  }

  return (
    <div className='text-white m-10 relative'>
      <div className='h-[190px] max-w-maxContent relative'>
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-richblack-900 to-transparent z-10"></div>
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-richblack-900 to-transparent z-10"></div>

        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          loop={true}
          freeMode={true}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[FreeMode, Autoplay]}
          className='w-full'
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          {allReview.map((review, ind) => (
            <SwiperSlide key={ind}>
              <div className="flex flex-col gap-2 p-4 bg-richblack-800 rounded-lg h-[190px]">
                <div className="flex items-center gap-2">
                  <img
                    src={review?.user?.image ? review?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                    alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
                    className='h-9 w-9 object-cover rounded-full'
                  />
                  <div>
                    <p className="font-semibold">{review?.user?.firstName} {review?.user?.lastName}</p>
                    <p className="text-sm text-richblack-300">{review?.course?.courseName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ReactStars
                    count={5}
                    value={review?.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <span className="text-yellow-100">{review?.rating}</span>
                </div>
                <p className="text-sm text-richblack-200 line-clamp-3">
                  {review?.review}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider