import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studenFeaturesApi";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal.jsx";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "../services/formatDate.js";

import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import ReviewSlider from "../components/common/ReviewSlider.jsx";
import Footer from "../components/common/Footer.jsx";

const CourseDetails = () => {
  const { loading, user } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [isActive, setIsActive] = useState([]);

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  // fetch course details
  useEffect(() => {
    if (!courseId) return; // if courseId is not present, exit early

    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        console.log("API result:", result);

        setCourseData(result.courseDetails[0]);
      } catch (error) {
        console.log("Could not fetch course details", error);
        // setCourseData(null);
      }
    };

    getCourseFullDetails();
  }, [courseId]);

  // avg review count
  useEffect(() => {
    if (courseData?.ratingAndReviews) {
      const count = GetAvgRating(courseData.ratingAndReviews);
      setAvgReviewCount(count);
    }
  }, [courseData]);

  // total lectures ==> calcualte total lectures from all sections]
  useEffect(() => {
    if (courseData?.courseContent) {
      let lectures = 0;
      courseData.courseContent.forEach((sec) => {
        lectures += sec?.subSection?.length || 0;
      });
      setTotalNoOfLectures(lectures);
    }
  }, [courseData]);

  // razorpay function
  const handleByCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }

    // modal data => for opening confirmation modal
    setConfirmationModal({
      text1: "You are Not Logged in",
      text2: "Please Login to purchase the Course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(false),
    });
  };

  if (loading || !courseData) {
    return (
      <div className="text-center text-richblack-300 py-20"> Loading .....</div>
    );
  }

  // destructure after state is set
  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentEnrolled,
    createdAt,
  } = courseData;

  // toggle section
  const handleActive = (id) => {
    setIsActive((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  // collapse all
  const handleCollapseAll = () => {
    setIsActive([]);
  };

  return (
    <>
          <div className=" w-11/12 max-w-maxContent  mx-auto min-h-screen text-richblack-50 px-4 md:px-10 lg:px-20 py-10 space-y-10">
      {/* Course Header */}
      <div className="w-full flex flex-col justify-between lg:flex-row gap-6 lg:gap-12">
        {/* Left Card */}
        <div className="flex-1 w-full h-auto bg-richblack-800 border border-richblack-700 rounded-2xl shadow-md p-6 space-y-4">
          <p className="text-3xl md:text-4xl font-bold text-left">
            {courseName}
          </p>
          <p className="text-richblack-300 max-w-[90%] text-left">
            {courseDescription}
          </p>

          {/* Rating Section */}
          <div className="flex flex-col gap-2 text-left">
            <RatingStars Review_Count={avgReviewCount} Star_Size={30} />
            <p className="font-semibold mt-1">Avg Review {avgReviewCount}</p>

            <div className="flex flex-col md:flex-row gap-2 text-sm">
              <span className="text-richblack-400">
                ({ratingAndReviews?.length || 0} reviews)
              </span>
              <span className="text-richblack-400">
                ({studentEnrolled?.length || 0} Students Enrolled)
              </span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="text-richblack-400 space-y-1 text-left text-sm">
            <p>Created By {`${instructor.firstName}`}</p>
            <p>Created At: {formatDate(createdAt)}</p>
            <p>Language: English</p>
          </div>
        </div>

        {/* Right Card */}
        <div className="flex-1">
          <CourseDetailsCard
            course={courseData}
            setConfirmationModal={setConfirmationModal}
            handleByCourse={handleByCourse}
          />
        </div>
      </div>

      {/* what you will Learn Section */}
      <div className="bg-richblack-800 p-6 rounded-xl shadow-md space-y-4">
        <p className="text-xl font-semibold">what you will Learn Section</p>
        <div className="text-richblack-200">
          {whatYouWillLearn} {/* keep exactly as original */}
        </div>
      </div>

      {/* /Couse Content div */}
      <div className="bg-richblack-800 p-6 rounded-xl shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xl font-semibold">Course Content</p>

          {/* collapse all section */}
          <button
            onClick={handleCollapseAll}
            className="px-4 py-2 bg-richblack-700 text-yellow-50 rounded-md hover:bg-richblack-600 transition"
          >
            collapse all sections
          </button>
        </div>

        <span>{courseContent.length} Section(s)</span>
        <span>{totalNoOfLectures} Lectures</span>
        {/* Total duration */}
        <span>{courseData.data?.totalDuration}</span>

        {/* Accordion section */}
        <div className="space-y-2 mt-2">
          {courseContent?.map((section, idx) => (
            <div key={section._id} className="bg-richblack-700 rounded-md p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleActive(section._id)}
              >
                <p className="font-semibold">{section.sectionName}</p>
                <span>{isActive.includes(section._id) ? "-" : "+"}</span>
              </div>

              {isActive.includes(section._id) && (
                <div className="mt-2 pl-4 flex flex-col gap-1">
                  {section.subSection?.map((sub) => (
                    <p key={sub._id} className="text-richblack-200">
                      {sub.title}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

      <ReviewSlider/>
    </div>
      <Footer/>
    </>
  );
};

export default CourseDetails;
