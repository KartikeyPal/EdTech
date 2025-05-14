const express  = require('express');
const router = express.Router();
const {auth,isInstructor,isAdmin,isStudent} = require('../middlewares/auth');

const{
    createCourse,
    showAllCourses,
    getCourseDetails, 
    editCourse,
    getFullCourseDetails,
    getInstructorCourses,
} = require('../controllers/Course'); // all ok 


const{
    createCategory,
    showAllCategory,
    categoryPageDetails,
} = require('../controllers/Category'); //all ok

const {
    createSection,
    updateSection,
    deleteSection,
} = require('../controllers/Section');//al ok

const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require('../controllers/SubSection'); //all ok

const {
    createRating,
    getAverageRating,
    getAllRatingAndReview,
} = require('../controllers/RatingAndReview'); //all ok

const {
    updateCourseProgress,
} = require('../controllers/CourseProgress')

//                                          Course Routes

//courses can only be created by instructor
router.post('/createCourse',auth,isInstructor,createCourse);
router.get('/showAllCourses',showAllCourses);
router.post('/getCourseDetails',getCourseDetails);
router.post('/editCourse',auth,isInstructor,editCourse);
router.post('/getFullCourseDetails',auth,getFullCourseDetails);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Section Routes
router.post('/addSection',auth,isInstructor,createSection);
router.post('/updateSection',auth,isInstructor,updateSection);
router.post('/deleteSection',auth,isInstructor,deleteSection);
//subsection Routes
router.post('/updateSubSection',auth,isInstructor,updateSubSection);
router.post('/deleteSubSection',auth,isInstructor,deleteSubSection);
router.post('/addSubSection',auth,isInstructor,createSubSection);


//category can only be create by admin

router.post('/createCategory',auth,isAdmin,createCategory);
router.get('/showAllCategories',showAllCategory);
router.post('/getCategoryPageDetails',categoryPageDetails);


//Rating and Review 
router.post('/createRating',auth,isStudent,createRating);
router.get('/getAverageRating',getAverageRating);
router.get('/getAllReviews',getAllRatingAndReview)

//courseProgress related routes

router.post('/updateCourseProgress',auth,isStudent,updateCourseProgress); 

module.exports = router;