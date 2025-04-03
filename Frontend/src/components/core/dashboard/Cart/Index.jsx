import React from 'react'
import {useSelector} from 'react-redux'
import RenderTotalAmount from './RenderTotalAmount'
import RenderCartCourses from './RenderCartCourses'
const Cart = () => {
    const {total,totalItems} = useSelector((state)=>state.cart)
  return (
    <div className='w-full text-white flex flex-col justify-center p-9 h-full bg-richblack-900 mt-20  '>
        <p className='text-richblack-300 text-xl ' >{totalItems} Course in cart</p>
        <hr/> 
        {
            total>0? (
            <div className='flex justify-between items-center '>
                <RenderCartCourses/>
                <RenderTotalAmount/>
            </div>):
            (<p className='font-bold text-4xl mt-5 py-2 text-richblack-25'>Your cart is Empty</p>)
        }
    </div>
  )
}

export default Cart
