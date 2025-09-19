import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { AiFillPlayCircle } from "react-icons/ai";
import IconBtn from "../../common/IconBtn";
import ErrorBoundary from "./ErrorBoundary"; // this will help to do not crash whole app if the error in the player

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData?.length) return;

      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses");
        return;
      }

      // find the section by id
      const currentSection = courseSectionData.find(
        (course) => course._id === sectionId
      );

      if (!currentSection?.subSection?.length) {
        console.warn("No subsection found for section:", sectionId);
        setVideoData(null);
        return;
      }

      // find the video by id
      const currentVideo = currentSection.subSection.find(
        (data) => data._id === subSectionId
      );

      if (!currentVideo) {
        console.warn("No video found for subsection:", subSectionId);
        setVideoData(null);
        return;
      }

      setVideoData(currentVideo);
      setVideoEnded(false);
    };

    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  // check if current is first video
  const isFirstVideo = () => {
    if (!courseSectionData?.length) return false;
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    if (currentSectionIndex === -1) return false;
    const currentSection = courseSectionData[currentSectionIndex];
    if (!currentSection?.subSection?.length) return false;
    const currentSubSectionIndex = currentSection.subSection.findIndex(
      (data) => data._id === subSectionId
    );
    if (currentSubSectionIndex === -1) return false;
    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  };

  // check if current is last video
  const isLastVideo = () => {
    if (!courseSectionData?.length) return false;
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    if (currentSectionIndex === -1) return false;
    const currentSection = courseSectionData[currentSectionIndex];
    if (!currentSection?.subSection?.length) return false;
    const currentSubSectionIndex = currentSection.subSection.findIndex(
      (data) => data._id === subSectionId
    );
    if (currentSubSectionIndex === -1) return false;
    return (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === currentSection.subSection.length - 1
    );
  };

  // go to next video
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  // go to prev video
  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  // mark lecture as complete
  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 lg:gap-10">
      {!videoData ? (
        <div className="text-center text-richblack-300">No Data Found</div>
      ) : (
<ErrorBoundary>
  <div className="relative w-full rounded-lg overflow-hidden bg-richblack-800 shadow-lg">
    <Player
      ref={playerRef}
      aspectRatio="16:9"
      playsInline
      onEnded={() => setVideoEnded(true)}
      src={videoData?.videoUrl}
      className="w-full"
    >
      <AiFillPlayCircle />
    </Player>
  </div>

  {/* Navigation buttons */}
  <div className="flex justify-between items-center mt-4">
    {!isFirstVideo() && (
      <IconBtn
        disabled={loading}
        onClick={goToPrevVideo}
        customClasses="px-4 py-2 bg-richblack-700 hover:bg-richblack-600 rounded-md"
      >
        Prev
      </IconBtn>
    )}
    {!isLastVideo() && (
      <IconBtn
        disabled={loading}
        onClick={goToNextVideo}
        customClasses="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 rounded-md text-black"
      >
        Next
      </IconBtn>
    )}
  </div>

  {/* Title + description */}
  <div className="px-2 md:px-0 mt-6">
    <h1 className="text-xl md:text-2xl font-semibold text-richblack-5 mb-2">
      {videoData?.title}
    </h1>
    <p className="text-richblack-200 text-sm md:text-base leading-relaxed">
      {videoData?.description}
    </p>
  </div>

  {/* Mark as Complete (only after end & if not already done) */}
  {videoEnded && !completedLectures.includes(subSectionId) && (
    <div className="mt-4 absolute z-10">
      <IconBtn
        disabled={loading}
        onClick={handleLectureCompletion}
        text={!loading ? "Mark As Completed" : "Loading..."}
        customClasses="px-6 py-2 bg-green-500 hover:bg-green-400 rounded-md"
      />
    </div>
  )}
</ErrorBoundary>

      )}

      {/* second section  */}
      {/* <div className="px-2 md:px-0">
        <h1 className="text-xl md:text-2xl font-semibold text-richblack-5 mb-2">
          {videoData?.title}
        </h1>
        <p className="text-richblack-200 text-sm md:text-base leading-relaxed">
          {videoData?.description}
        </p>
      </div> */}
    </div>
  );
};

export default VideoDetails;
