import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from "react-icons/ri"; 
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartCourses = () => {
    const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();

    return (
        <div className='w-[86%]  mt-[100px] mx-24 px-10'>
            {!cart.length ? (
                <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
                    Your cart is empty.
                </p>
            ) : (
                <div className="my-8 text-richblack-5">
                    {/* Headings */}
                    <div className="flex rounded-t-lg bg-richblack-500">
                        <p className="w-[45%] px-5 py-3">Course Name</p>
                        <p className="w-1/4 px-2 py-3">Price</p>
                        <p className="flex-1 px-2 py-3">Actions</p>
                    </div>
                    {/* Course Items */}
                    {cart.map((course, i, arr) => (
                        <div
                            className={`flex items-center border border-richblack-700 ${i===arr.length-1?"rounded-b-lg":"rounded-none"}`}
                            key={i}
                        >
                            <div className="flex w-[45%] items-center gap-4 px-5 py-3">
                                <img src={course.thumbnail} alt="course_img" className="h-14 w-14 rounded-lg object-cover" />
                                <div className="flex max-w-xs flex-col gap-2">
                                    <p className="font-semibold">{course.courseName}</p>
                                    <p className="text-xs text-richblack-300">
                                        {course.courseDescription.length > 50
                                            ? `${course.courseDescription.slice(0, 50)}...`
                                            : course.courseDescription}
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/4 px-2 py-3">Rs {course?.price}</div>
                            <div className="flex w-1/5 items-center gap-2 px-2 py-3">
                                <button 
                                    onClick={() => dispatch(removeFromCart(course?._id))}
                                    className="flex items-center gap-2 text-red-500 hover:text-red-600"
                                >
                                    <RiDeleteBin6Line />
                                    <span>Remove</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RenderCartCourses
