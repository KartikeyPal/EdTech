import React from 'react'
import {useSelector} from 'react-redux'
import RenderTotalAmount from './RenderTotalAmount'
import RenderCartCourses from './RenderCartCourses'
const Cart = () => {
    const {total,totalItems} = useSelector((state)=>state.cart)
  return (
    <div className='text-white flex flex-col justify-center p-9 h-screen bg-richblack-900 w-full -ml-1 -mt-16 pl-16'>
        <h1 className='font-bold text-3xl text-richblack-200 mb-20'>Cart</h1>

        <p className='text-richblack-300 text-xl pl-16' >{totalItems} Course in cart</p>
  
        {
            total>0? (
            <div>
                <RenderCartCourses/>
                <RenderTotalAmount/>
            </div>):
            (<p>Your cart is Empty</p>)
        }
    </div>
  )
}

export default Cart
