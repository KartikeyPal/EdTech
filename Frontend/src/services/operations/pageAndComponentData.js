import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import {categories} from '../apis'
export const getCatalogPageData = async(catagoryId) => {
    console.log(catagoryId);
    const toastId = toast.loading("Loading...");
  let result = [];
  try {
    if(catagoryId){
        const res = await apiConnector('POST',categories.CATALOGPAGEDATA_API,{categoryId: catagoryId});
        if(!res?.data.success){
            throw new Error("could not fetch catatory page data");
        }
        result =  res?.data?.data
    }
  } catch (error) {
        console.log("category pgae data error: ", error);
        toast.error(error.message);
        result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}