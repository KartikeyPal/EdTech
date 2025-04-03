import React from 'react'
import { useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton'
const RenderTotalAmount = () => {
    const {total,cart}  = useSelector((state)=>state.cart); 
    function handleBuyCourse(){
        const courses = cart.map((course)=>course._id);
        console.log(courses);

        //Todo Integrate an api for payment gateway
    }
  return (
    <div className='border-solid border-richblack-900 border-[2px] p-3 w-1/5 max-h-max bg-richblack-700 rounded-xl flex justify-end flex-col'>
        <p className='font-bold text-2xl text-yellow-25'>Your Total Amount  </p>
        <p className='font-semibold text-xl text-caribbeangreen-50'>Rs {total}</p>
        <IconButton
            text="Buy Now"
            onclick={handleBuyCourse}
            customClasses={"w-full justify-content bg-yellow-25 text-richblack-900 p-2 rounded-xl my-2 hover:scale-95"}
            
        />
    </div>
  )
}

export default RenderTotalAmount
