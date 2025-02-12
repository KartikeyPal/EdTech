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
    <div>
        <p>Total: </p>
        <p>Rs {total}</p>
        <IconButton
            text="Buy Now"
            onclick={handleBuyCourse}
            cutomClases={"w-full justify-content"}
        />
    </div>
  )
}

export default RenderTotalAmount
