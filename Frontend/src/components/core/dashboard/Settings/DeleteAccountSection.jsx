import React from 'react'
import { MdDelete } from "react-icons/md";
import {useDispatch, useSelector} from 'react-redux'
import { deleteAccount } from '../../../../services/operations/profileAPI';
import { logOut } from '../../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const DeleteAccountSection = () => {
  const {token} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = async () =>{
      const res = await deleteAccount(token);
      if(res){
        toast.success("Account deleted Successfully");
        dispatch(logOut(navigate));
      }
  }
  return (
    <div className='flex  bg-opacity-40 h-full w-full gap-3 -mb-3'>
      <div className='font-bold text-4xl bg-pink-300 max-h-max rounded-full text-pink-600'><MdDelete /></div>
      <div>
        <h1 className='font-semibold text-richblack-100 pb-3'>Delete Account</h1>
        <p className='text-pink-25'>Would you like to delete account?</p>
        <p className='text-pink-25'>This account may contain Paid Courses. Deleting your account is</p>
        <p className='text-pink-25'>permanent and will remove all the contain associated with it.</p>
        <button className='text-pink-300 pt-3 ' onClick={handleDelete}> <i>I want to delete my account.</i></button>
      </div>
    </div>
  )
}

export default DeleteAccountSection