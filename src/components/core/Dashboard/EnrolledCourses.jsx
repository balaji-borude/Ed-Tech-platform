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

  console.log("Printing the enroled Courrses ");
  console.log(enrolledCourses);

  return (
    <div className="text-white px-4 md:px-12 py-10 min-h-screen bg-richblack-900">
      <h2 className="text-3xl font-semibold mb-8 text-richblack-5">
        Enrolled Courses
      </h2>

      {
        // if enrolledCourses not availablle now
        !enrolledCourses ? (
          <div className="text-richblack-300">Loading...</div>
        ) : !enrolledCourses.length ? (
          <p className="text-richblack-300">
            You have not enrolled in any course yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            {/* Table-like header (hidden on small screens) */}
            <div className="hidden md:grid grid-cols-12 gap-4 bg-richblack-800 text-richblack-200 px-6 py-3 rounded-t-lg text-sm uppercase">
              <p className="col-span-6">Course</p>
              <p className="col-span-3">Duration</p>
              <p className="col-span-3">Progress</p>
            </div>

            {/* card yethun suru zale  */}
            <div className="flex flex-col divide-y divide-richblack-700">
              {enrolledCourses.map((course, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-richblack-800 hover:bg-richblack-700 transition-all duration-300 p-6 cursor-pointer"
                    // this is used for routing to view the lecture of enroled courses 
                    onClick={() => {
                      navigate(
                        `/view-course/${course?._id}/section/${course.courseContent?.[0]._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                      );
                    }}
                  >
                    {/* left wala part  */}
                    <div className="flex items-center gap-4 col-span-6">
                      <img
                        src={course.thumbnail}
                        alt="thumbnail"
                        className="h-16 w-24 rounded-lg object-cover"
                      />

                      <div className="flex flex-col">
                        <p className="font-medium text-richblack-25 text-lg">
                          {course.courseName}
                        </p>
                        <p className="text-sm text-richblack-300 line-clamp-2">
                          {course.courseDescription}
                        </p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="col-span-3 text-richblack-200 text-sm">
                      {course?.totalDuration || "—"}
                    </div>

                    {/* Progress bar div */}
                    <div className="col-span-3 flex flex-col gap-2">
                      <p className="text-sm text-richblack-200">
                        Progress: {course.progressPercentage}%
                      </p>

                      {/* Progress Bar  */}
                      <ProgressBar
                        completed={course.progressPercentage}
                        height="8px"
                        isLabelVisible={false}
                        bgColor="#FFD60A"
                        baseBgColor="#2c2f38"
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
