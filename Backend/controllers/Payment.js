const { default: mongoose } = require('mongoose');
const {instance} = require('../config/razorpay');
const Course  = require ('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const crypto = require('crypto');
const CourseProgress = require('../models/CourseProgress');

//capture the payment
//initiates the razor pay order

exports.capturePayments = async(req,res)=>{
    const {courses}= req.body;
    const userId = req.user.id;

    if(courses.length===0){
         return res.json({
            success: false,
            message: "Please provide courseId"
         })
    }
    let totalAmount =0;
    for(const   course_id of courses){
        let course;
        try {
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({
                    success:false,
                    message: "Could not find the course"
                })
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message: "student is already enrolled",
                })
            }
            totalAmount+=course.price;

            const options = {
                amount: totalAmount*100,
                currency: "INR",
                receipt: Math.random(Date.now()).toString(),
            }

            try {
                const paymentResponse = await instance.orders.create(options);
                res.status(200).json({
                    success:true,
                    message: "order created successfully",
                    paymentResponse,
                })
            } catch (error) {
                    console.log(error);
                    return res.status(500).json({
                        success:false,
                        message: "could not initiate the order "
                    })
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message: error.message,
            })
        }
    }

}

exports.verifyPayment =  async(req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(400).json({
            success: false,
            message: "Missing required fields for payment verification",
        });
    }

    let body = razorpay_order_id + "|" +razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");
    if(expectedSignature === razorpay_signature){

        await enrolledStudent(courses,userId,res);

        return res.status(200).json({
            success:true,
            message: "payment verified",
        })
    }
    return res.status(200).json({
        success:false,
        message: "payment failed"
    })
}

    const enrolledStudent = async(courses,userId,res)=>{
        try {
            if(!courses || !userId){
                return res.status(200).json({
                    success:false,
                    message: "please provide data for courses or userId",
                })
            }
            for(const courseId of courses){
                const enrolledCourse = await Course.findByIdAndUpdate({_id: courseId},{$push:{studentEnrolled: userId}},{new: true});
                if(!enrolledCourse){
                    return res.status(500).json({
                        success:false,
                        message: "course not found",
                    })
                }   
                const courseProgres = await CourseProgress.create({
                    courseID: courseId,
                    userId: userId,
                    completedVideos:[], 
                })
                const enrolledStudent = await User.findByIdAndUpdate({_id: userId},{$push:{courses: courseId,courseProgress: courseProgres._id}},{new: true});
    
                const emailRes = await mailSender(enrolledStudent.email,`Successfully enrolled into ${enrolledCourse.courseName}`, "congratulation, you are onboarded into new course");
                console.log("Email send successfully : ",emailRes)
            }
        } catch (error) {
                return res.status(500).json({
                    success:false,
                    message: error.message,    
                })
        }
    }


exports.sendPaymentSuccessMail = async(req,res)=>{

    const {orderId,paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount) {
        return res.status(400).json({
            success:false,
            message: "please provide all the fields"
        })
    }

    try {
        const enrolledStudent = await User.findById(userId);
        await mailSender(enrolledStudent.email,"Payment Received","Testing payment")
    } catch (error) {
        console.log("error in sending mail : ",error);
        return res.status(500).json({
            success:false,
            message: " could not send mail",
        })
    }
}