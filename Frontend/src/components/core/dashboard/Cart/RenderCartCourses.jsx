import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"; 
import { removeFromCart } from '../../../../slices/cartSlice';
const RenderCartCourses = () => {
    const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
  return (
    <div>
      {
        cart.map((course,ind)=>(
            <div>
                <div>
                    <img src={course.thumbnail} alt="Course image" />
                    <div>
                        <p>{course?.courseName}</p>
                        <p>{course?.category?.name}</p>
                        <div>
                            <span>4.8</span>
                            <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColour="#ffd700"
                                emptyIcon ={<FaRegStar />}
                                fullIcon = {<FaStar/>}
                            />
                            <span>{course?.ratingAndReviews} Ratings</span>
                        </div>
                    </div>

                </div>
                <div>
                    <button onClick={()=>dispatch(removeFromCart(course?._id))}><RiDeleteBin6Line /> <span>remove</span></button>
                    <p>Rs {course?.price}</p>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses
