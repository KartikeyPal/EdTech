import { Scripts } from "react-router-dom";
import { studentEndpoints } from "../apis"
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import rzpLogo  from '../../../assets/Logo/rzp_logo.png'
import {resetCart}  from '../../slices/cartSlice'

// require('dotenv').config()
const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}  = studentEndpoints;

 function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export const buyCourse = async(token,courses,userDetails,navigate,dispatch)=>{
    const toastId = toast.loading("loading...");
    try {
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        console.log("script res is : ",res);
        if(!res){
            toast.error("razorPay sdk faild to load");
            return;
        }
        // initiate the order 
        const orderRes = await apiConnector("POST",COURSE_PAYMENT_API,{courses},{
            Authorization: `Bearer ${token}`
        });
        console.log(orderRes.data.paymentResponse);
        if(!orderRes?.data?.success){
            throw new Error(orderRes.data.message); 
        }
        // "key": process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        const option ={
            "key": "rzp_test_PG7OzXR68vb2Oo", //Enter the Key ID generated from the Dashboard
            "amount": orderRes.data.paymentResponse.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise.
            "currency": orderRes.data.paymentResponse.currency,
            "order_id": orderRes.data.paymentResponse.id, //This is a sample Order id. Pass the `id` obtained in the response of Step 1.
            "name": "Ed Tech",
            "description": "Test Transaction",
            "prefill": {
                "name": `${userDetails.firstName }`,
                "email": `${userDetails.email }`,
            },
            "handler": function (response){
                //send successFull mail
                sendPaymentSuccessEmail(response,orderRes.data.paymentResponse.amount,token);
                //verify payment
                verifyPayment({...response,courses},token,navigate,dispatch);
            }, 
        }
        const paymentObject  = new  Razorpay(option);
        paymentObject.open();
        paymentObject.on('payment.failed', function (response){
            console.log(response);
            toast.error("oops, payment failed")
        });
        console.log("first")
    } catch (error) {
        console.log("payment api error...  ",error);
        toast.error("could not make payment");
    }       
    toast.dismiss(toastId);
}

const sendPaymentSuccessEmail=async(response,amount,token)=>{
    try {
        console.log("WORKIGN")
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id, 
            amount: amount
        },{
            Authorization: `Bearer ${token}`
        })
    } catch (error) {
        console.log("payment success email error : ",error);
        console.log(error.message);
    }
}

//verify payment
const verifyPayment=async(bodyData,token,navigate,dispatch)=>{
    console.log("verifing");
    const toastId = toast.loading("verifying Payment......")
    // dispatch(setPaymentLoading(true));
    try {
        const res = await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
           Authorization: `Bearer ${token}`
        })
        console.log(res);

        if(!res.data.success){
            throw new Error(res.data.message);
        }
        toast.success("payment Successfull");
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart());
    } catch (error) {
        console.log("Payment verify error",error);
        toast.error("could not verify payemnt") 
    }
    toast.dismiss(toastId);
    // dispatch(setPaymentLoading(false));
}