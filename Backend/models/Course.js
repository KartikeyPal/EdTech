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
        ref: "User",
        required: true
    },
    whatYouWillLearn:{
        type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
    },
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
});

module.exports = mongoose.model("Course",courseSchema);