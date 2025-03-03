import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ReactStars from 'react-stars';
import IconButton from '../../common/IconButton';
import { createRating } from '../../../services/operations/courseDetailsAPI';

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
    },[])

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
    <div>
      <div>
        <p>Add Review</p>
        <button onClick={(setReviewModal(false))} >Close</button>
        {/* mdoal body */}
        <div>
          <div>
            <img
                src={user?.image}
                alt='alt image'
                className='aspect-square w-[50px] rounded-full object-cover'
            />
            <div>
                <p>{user?.firstName} {user?.lastName}</p>
                <p>Posting  Publicly</p>
            </div>

          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col items-center'>
              <ReactStars 
                  count={5}
                  onChange={ratingChange}
                  size={24}
                  activeColor="#ffd700"
              />
              <div>
                  <label htmlFor="courseExperience">
                    Add your Experience
                  </label>
                  <textarea 
                      name="courseExperience" 
                      id="courseExperience" 
                      placeholder='Add Your Experience'
                      {...register("courseExperience",{required:true})}
                      className='form-style min-h-[130px] w-full'
                  />
                  {
                    errors.courseExperience && (
                      <span>Please add your Experience</span>
                    )
                  }
              </div>
              {/* cancel and save  button */}
                  <div>
                      <button onClick={()=> setReviewModal(false)}>
                        cancel
                      </button>
                      <IconButton text={"save"}/>
                  </div>
          </ form>



        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal