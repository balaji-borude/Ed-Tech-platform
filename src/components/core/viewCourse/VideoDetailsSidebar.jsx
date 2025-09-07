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
      const currentSubsectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

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
    <div className="text-white">
      <div>
        {/* for buttons and heading div */}
        <div>
          {/* for buttons only  */}
          <div>
            <div
              onClick={() => {
                navigate("/dashboard/enrolled-courses");
              }}
            >
              back
            </div>

            <div>
              <IconBtn
                text="Add Review "
                onClick={() => setReviewModal(true)}
              />
            </div>
          </div>

          {/* for heading and tiitle  */}
          <div>
            <p>{courseEntireData?.courseName}</p>

            <p>
              {completedLectures.length}/{totalNoOfLectures}{" "}
            </p>
          </div>
        </div>

        {/* for sections and subsections */}
        <div>
          {courseSectionData.map((section, index) => (
            <div onClick={() => setActiveStatus(section._id)} key={index}>
              {/* Section */}
              <div>{section?.sectionName}</div>

              {/* Subsections */}
              {activeStatus === section._id &&
                section?.subSection?.map((topic, index) => (
                  <div
                    className={`flex gap-3 p-4 ${
                      videobarActive === topic._id
                        ? "bg-yellow-200 text-richblack-900"
                        : "bg-black text-white"
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
                    />
                    <span>{topic.title}</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
