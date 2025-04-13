import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ReactStars from 'react-stars';
import IconButton from '../../common/IconButton';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import { IoClose } from "react-icons/io5";

const CourseReviewModal = ({setReviewModal}) => {
    const {user} = useSelector(state=>state.profile);
    const {token} = useSelector(state=>state.auth);
    const {courseEntireData} = useSelector(state=>state.viewCourse);

    const {
      register,
      handleSubmit,
      setValue,
      getValues,
      formState: {errors},
    } = useForm();

    useEffect(()=>{
      setValue("courseExperience",'');
      setValue("courseRating",0)
    },[]);

    const onSubmit =async (data) =>{
      await createRating({
        courseId: courseEntireData._id,
        rating:data.courseRating,
        review:data.courseExperience
      },token)
      setReviewModal(false);
    }

    const ratingChange = (newRating) => {
      setValue("courseRating",newRating);
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-richblack-900/50 backdrop-blur-sm">
      <div className="w-full max-w-[500px] bg-richblack-800 rounded-xl shadow-xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-richblack-700">
          <h2 className="text-2xl font-bold text-richblack-5">Add Review</h2>
          <button 
            onClick={()=>setReviewModal(false)}
            className="text-richblack-400 hover:text-richblack-5 transition-all duration-200"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* User Info */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={user?.image}
              alt={user?.firstName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-richblack-5 font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-richblack-400 text-sm">Posting Publicly</p>
            </div>
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Rating Section */}
            <div className="space-y-2">
              <label className="text-richblack-5 font-medium">Rate this course</label>
              <div className="flex justify-center">
                <ReactStars 
                  count={5}
                  onChange={ratingChange}
                  size={32}
                  color2="#ffd700"
                  color1="#4B5563"
                />
              </div>
            </div>

            {/* Review Text */}
            <div className="space-y-2">
              <label htmlFor="courseExperience" className="text-richblack-5 font-medium">
                Share your experience
              </label>
              <textarea 
                id="courseExperience" 
                placeholder="What did you like or dislike about this course?"
                {...register("courseExperience",{required:true})}
                className="w-full min-h-[150px] p-4 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-transparent resize-none"
              />
              {errors.courseExperience && (
                <p className="text-pink-500 text-sm">Please share your experience</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => setReviewModal(false)}
                className="px-4 py-2 text-richblack-200 hover:text-richblack-5 transition-all duration-200"
              >
                Cancel
              </button>
              <IconButton
                text="Submit Review"
                type="submit"
                customClasses="px-4 py-2 bg-yellow-50 text-richblack-900 hover:bg-yellow-100 transition-all duration-200"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal