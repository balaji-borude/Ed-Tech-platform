import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const { course } = useSelector((state) => state.course);
  // at a time only on section is open
  //curenly video is runing -- highlight

  const [activeStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideoBarActive] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  //data fetch
  useEffect(() => {
    // this is new Syntax
    (() => {
      // video find karaycha --> section chi length
      if (!courseSectionData.length) {
        return;
      }
      // section cha ndex kadhla baher
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      // curent seubsectio cha index  find kert ahe
      const currentSubsectionIndex =
        courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
          (data) => data._id === subSectionId
        );

      // curernt Active subsection --> Ji video la click kel ahe ti
      const activeSubsectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubsectionIndex
        ]?._id;

      // set  current sectionm here
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      // set current Subsection here
      setVideoBarActive(activeSubsectionId);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  console.log(
    "printing the courseSectionData from VideoDetailsSidebar",
    courseSectionData
  );

  return (
    <div className=" text-white flex flex-col gap-6 p-4 md:p-6 bg-richblack-800 rounded-md shadow-lg h-full overflow-y-auto">
      <div>
        {/* for buttons and heading div */}
        <div className="flex items-center justify-between mb-4">
          {/* for buttons only  */}
          <div className="flex gap-2">
            <div
              className="cursor-pointer text-sm text-richblack-800 px-3 flex items-center border rounded-md hover:scale-105  bg-richblack-100"
              onClick={() => {
                navigate("/dashboard/enrolled-courses");
              }}

            >
              Back
            </div>

            <div>
              <IconBtn
                text="Add Review "
                onClick={() => setReviewModal(true)}
              />
            </div>
          </div>
        </div>

        {/* for heading and tiitle  */}
        <div className="mb-6">
          <p className="font-semibold text-lg text-richblack-5">
            {courseEntireData?.courseName}
          </p>
          <p className="text-sm text-richblack-200">
            {completedLectures.length}/{totalNoOfLectures} Lectures Completed
          </p>
        </div>
      </div>

      {/* for sections and subsections */}
      <div className="flex flex-col gap-3">
        {courseSectionData.map((section, index) => (
          <div
            onClick={() => setActiveStatus(section._id)}
            key={index}
            className="rounded-md border border-richblack-700 overflow-hidden"
          >
            {/* Section */}
            <div
              className={`px-4 py-3 cursor-pointer font-medium ${
                activeStatus === section._id
                  ? "bg-richblack-700 text-yellow-50"
                  : "bg-richblack-900 text-richblack-200"
              }`}
            >
              {section?.sectionName}
            </div>

            {/* Subsections */}
            {activeStatus === section._id && (
              <div className="flex flex-col">
                {section?.subSection?.map((topic, index) => (
                  <div
                    className={`flex items-center gap-3 px-4 py-2 text-sm cursor-pointer transition-all ${
                      videobarActive === topic._id
                        ? "bg-yellow-200 text-richblack-900 font-semibold"
                        : "bg-richblack-800 text-richblack-100 hover:bg-richblack-700"
                    }`}
                    key={index}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${topic._id}`
                      );
                      setVideoBarActive(topic?._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                      className="accent-yellow-200 cursor-pointer"
                    />
                    <span>{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
