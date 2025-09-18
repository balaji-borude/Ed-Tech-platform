import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

import VideoDetailsSidebar from "../components/core/viewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/viewCourse/CourseReviewModal";

// Icons
import { HiOutlineMenuAlt2, HiX } from "react-icons/hi";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);

      dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent || []));
      dispatch(setEntireCourseData(courseData?.courseDetails || {}));
      dispatch(setCompletedLectures(courseData?.completedVideos || []));

      let lecture = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lecture += sec?.subSection?.length || 0;
      });

      dispatch(setTotalNoOfLectures(lecture));
    };

    setCourseSpecificDetails();
  }, [courseId, token, dispatch]);

  return (
    <div className="flex min-h-screen bg-richblack-900 text-white relative">
      {/* Sidebar Desktop */}
      <div className="hidden md:block w-[320px] border-r border-richblack-700 bg-richblack-800 p-4 overflow-y-auto">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
      </div>

      {/* Hamburger Button (Mobile) */}
      <button
        className="absolute top-4 left-4 z-50 flex items-center justify-center p-2 rounded-md bg-richblack-800 text-white md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <HiX size={24} /> : <HiOutlineMenuAlt2 size={24} />}
      </button>

      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-y-0 left-0 w-[280px] bg-richblack-800 border-r border-richblack-700 p-4 z-40 overflow-y-auto md:hidden">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>
      )}

      {/* Overlay when sidebar open (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Video / Outlet */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>

      {/* Review Modal */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
};

export default ViewCourse;
