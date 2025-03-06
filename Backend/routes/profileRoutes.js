const express = require("express");
const router  = express.Router();
const {auth, isInstructor} = require("../middlewares/auth");
const {
    deleteAccount,
    updateProfile,
    getUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
    instructorDashboard,
} = require("../controllers/Profile");

router.delete('/deleteProfile',auth,deleteAccount);
router.put('/updateProfile',auth,updateProfile);
router.get('/getUserDetails',auth,getUserDetails);
router.get('/instructorDashboard',auth,isInstructor,instructorDashboard);

router.get('/getEnrolledCourses',auth,getEnrolledCourses);
router.put('/updateDisplayPicture',auth,updateDisplayPicture);


module.exports = router; 