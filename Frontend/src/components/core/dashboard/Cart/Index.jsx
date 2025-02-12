import React from 'react'
import {useSelector} from 'react-redux'
import RenderTotalAmount from './RenderTotalAmount'
import RenderCartCourses from './RenderCartCourses'
const Cart = () => {
    const {total,totalItems} = useSelector((state)=>state.cart)
  return (
    <div className='text-white flex justify-center items-center w-screen h-screen'>
        <h1>Your Cart</h1>
        <p>{totalItems} Course in cart</p>
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
