import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton'
import { buyCourse } from '../../../../services/operations/studentFeatureAPI'
import { useNavigate } from 'react-router-dom'
const RenderTotalAmount = () => {
    const {token} = useSelector(state=>state.auth);
    const {user} = useSelector(state=>state.profile);
    const {total,cart}  = useSelector((state)=>state.cart); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function handleBuyCourse(){
        const courses = cart.map((course)=>course._id);
        await buyCourse(token,courses,user,navigate,dispatch);
    }
  return (
    <div className='border-solid border-richblack-900 border-[2px] p-3 w-1/5 max-h-max bg-richblack-700 rounded-xl flex justify-end flex-col'>
        <p className='font-bold text-2xl text-yellow-25'>Your Total Amount  </p>
        <p className='font-semibold text-xl text-caribbeangreen-50'>Rs {total}</p>
        <IconButton
            text="Buy Now"
            onClick={handleBuyCourse}
            customClasses={"w-full justify-content bg-yellow-25 text-richblack-900 p-2 rounded-xl my-2 hover:scale-95"}
            
        />
    </div>
  )
}

export default RenderTotalAmount
