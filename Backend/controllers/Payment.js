const {instance} = require('../config/razorpay');
const Course  = require ('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');

//capture the payment
//initiates the razor pay order

exports.capturePayments = async(req,res)=>{
    //getcourseID and userID
    const {courseId}= req.body;
    const userId = req.user.id;
    //validation
    if(!courseId) {
        return res.json({
            success: false,
            message: "course id not valid",
        })
    }
    let course;
    try {
        course = await Course.findById(courseId);
        if(!course){
            return res.json({
                    success:false,
                    message: 'could not find the course',
            })
        }
        //checking if user already enrolled
        const uid = new mongoose.Types.ObjectId(userId);
        if(courseId.studentEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message: 'student is already enrolled',
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message: 'SomeThing went wrong while purchaing the course',
        })
    }
    //creating order
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount*100,
        currency:currency,
        receipt: Math.random(Date.now().toString),
        notes:{
            courseID: courseId,
            userId
        }
    };
    try {
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message: 'could not initiate the order',
        })
    }
    //return res.
    return res.status.json({
        success:true,
        courseName:  course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: "INR",
        amount: paymentResponse.amount,
    }
    )

}


//verify signature of razorpay and Server
exports.verifySignature = async(req,res)=>{
    const webhookSecret = '12345678';
    const signature = req.headers['x-razorpay-signature']
    
    const shasum =  crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("HEX");

    if(digest === signature){
        console.log("Payment is authorized");
        const {courseId,userId} = req.body.payload.payment.entity.notes;
        try {
            const enrolledCourse = await Course.findOneAndUpdate({_id: courseId},{
                $push:{
                    studentEnrolled:userId,
                },
            },{new:true}); 
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"course not found",
                })
            }
            console.log(enrolledCourse);

            const enrolledStudent = await User.findByIdAndUpdate({_id: userId},{
                $push:{courses:courseId}
            },{new:true});
            console.log(enrolledStudent);
            
            //sending confirmation mail to the user
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "congratulation by kartikey",
                "congratulation, you are onboarded into new course"
            );
            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message: "student is enrolled in the course",

            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message: error.message,
            })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message: "could not verify signature",
        })
    }
}