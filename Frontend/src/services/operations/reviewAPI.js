import { reviewAndRatingEndpoints } from "../apis";
import toast from 'react-hot-toast'; 
import { apiConnector } from "../apiconnector";

const {GET_ALL_REVIEWS} = reviewAndRatingEndpoints;

export const getAllReview = async()=>{
    let result = null;
    try {
        const res =await apiConnector("get",GET_ALL_REVIEWS);
        if(!res){
            throw new Error("could not fetch all review")
        }
        console.log(res);
        result = res.data.allReview;
        return result;
    } catch (error) {
        console.error("error is " ,error.message);
        console.log(error);
        toast.error("could not fetch Review");
    }
}