import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  // profile slice madhun token la fetch kel ahe
  const { token } = useSelector((state) => state.auth);

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  // function for getting all coursese
  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);


  const navigate = useNavigate();

  return (
    <div className="text-white">
      <h2> Enrolled courses </h2>

      {
        // if enrolledCourses not availablle now
        !enrolledCourses ? (
          <div>Loading...</div>
        ) : !enrolledCourses.length ? (
          <p>You have not enrolled in Any Course yet </p>
        ) : (
          <div>
            <div>
              <p> Course Name</p>
              <p>Duration</p>
              <p>Progress</p>

              {/* card yethun suru zale  */}

              {enrolledCourses.map((course, index) => {
                return (
                  <div key={index}>


                    {/* left wala part  */}
                    <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-8 "
                    // this is used for routing to view the lecture of enroled courses 
                    onClick={()=>{
                      navigate(`/view-courses/${course?.id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)
                    }}
                    >
                      <img src={course.thumbnail} alt="thumbnail name " />

                      <div>
                        <p>{course.courseName} </p>
                        <p>{course.courseDescription} </p>
                      </div>
                    </div>

                    <div>{course?.totalDuration}</div>

                    {/* Progress bar div */}
                    <div>
                      <p> Progress: {course.progressPercentage || 0} </p>

                      {/* Progress Bar  */}
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height="8px"
                        isLabelVisible={false}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default EnrolledCourses;
