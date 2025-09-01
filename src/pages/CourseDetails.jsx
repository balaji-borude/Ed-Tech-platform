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

  const CourseDetails = () => {
    const { loading, user } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();

        const [isActive,setIsActive ] = useState([]) 

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

          // if (result?.success && result.courseDetails?.length > 0) {
          //   // store just the single course object
          //   setCourseData(result.courseDetails[0]);
          // } else {
          //   setCourseData(null);
          // }
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
      return <div> Loading .....</div>;
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



    //  hide and open the subSection 
    // const handleActive = (id)=>{
    //   setIsActive(
    //     !isActive.includes(id)? isActive.concat(id):isActive.filter((e)=>e !== id )
    //   )
    // };
  //   const handleActive = (id) => {
  //   setIsActive(prev =>
  //     prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
  //   );
  // };


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
      <div className="text-richblack-50">
        <div className="relative  flex  flex-col items-center ">
          <p>{courseName}</p>
          <p>{courseDescription}</p>

          <div>
            <span>
              <p> {avgReviewCount}</p>
              <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
              <span>{`(${ratingAndReviews?.length || 0}) reviews`} </span>

              <span>
                {`(${studentEnrolled?.length || 0}) Students Enrolled`}{" "}
              </span>
            </span>
          </div>

          <div>
            <p> Created By {`${instructor.firstName}`} </p>
          </div>
          <div>
            <p>Created At :{formatDate(createdAt)}</p>

            {/*  */}
            <p>Language English </p>
          </div>
        </div>

        {/* Card components   */}
        <div>
          <CourseDetailsCard
            course={courseData}
            setConfirmationModal={setConfirmationModal}
            handleByCourse={handleByCourse}
          />
        </div>

        {/* what you will Learn Section */}
        <div>
          <p> what you will Learn Section</p>

          <div>{whatYouWillLearn}</div>
        </div>

        {/* /Couse Content div */}

        <div className=" flex gap-x-3  ">
          <div>
            <p> Course Content</p>

            <span> {courseContent.length} Section(s) </span>

            <span>{totalNoOfLectures} Lectures</span>

            {/* Total duration */}
            <span>{courseData.data?.totalDuration}</span>


            {/* collapse all section */}
            {/* <div>
              <button onClick={()=>setIsActive([])}>
                  cpllapse all section
              </button>
            </div> */}

            <button onClick={handleCollapseAll}>
  collapse all sections
</button>
            

            {/* Accordion section  */}
            {/* HW_  course content  */}


            {/* Author  */}


          </div>


        </div>

        {/* Buy Button */}
        {/* <button
          className="bg-yellow-50 mt-10 p-3 rounded-xl"
          onClick={handleByCourse}
        >
          Buy now
        </button> */}

        {/* Confirmation Modal */}
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </div>
    );
  };

  export default CourseDetails;
