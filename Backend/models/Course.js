const mongoose = require("mongoose");
const Section = require("./Section");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        trim: true,
        required: true
    },
    courseDescription:{
        type: String, 
        trim: true,
        required: true
    } ,
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    whatYouWillLearn:{
        type: String,
        required: true,
    },
    courseContent:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    ],
    ratingAndReview:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"RationAndReview",
        }
    ],
    price:{
        type: Number,
    },
    thumbnail:{
        type: String,
    },
    tag:{
        type:[String],
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    instructions:{
        type:[String]
    },
    status:{
        type: String,
        enum:["Draft","Published"],
    },
});

module.exports = mongoose.model("Course",courseSchema);