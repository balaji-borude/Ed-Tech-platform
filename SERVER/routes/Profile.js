const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/auth");

// import controller
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile",auth, deleteAccount)  // we have to pass Authetication middleware to delete the accout Because we are get user.id from token ==> i missed to pass the auth meddleware to deleteaccount path 
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router