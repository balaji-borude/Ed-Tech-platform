import React, { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI.js";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice.js";

// video player 
import { Player } from "video-react";
import '~video-react/dist/video-react.css';
import { FaPlay } from "react-icons/fa6";


const VideoDetails = () => {
  //1 . video component s
  //2. useRef == > is used to manipulate the dom Component s --> we can use this to rewatch the video functionality

  // 3. check video is completred ofr not --> if complted then show the pre,next,reWaTCH button

  const { courseId, sectionId, subSectionId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const playerRef = useRef();

  const { token } = useSelector((state) => state.auth);

  // VIEW COURSE --> slice  madhun data ghetle ahe =========>
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  // video data
  const [videoData, setVideoData] = useState([]);

  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  // pahilya render wr kay show karnar te yehte useEffect madhe karnat
  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData) {
        return;
      }
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        // if we have all three field are present then ==>

        // lets assume --> basiclly UI wr konti video fetch karaychi te dakhavnysathi hekrt ahe
        const filterData = courseSectionData.filter(
          (course) => course._id === sectionId
        );

        //
        const filterVideoData = filterData[0].subSection.filter(
          (data) => data._id === subSectionId
        );

        setVideoData(filterVideoData[0]);
        setVideoData(false);
      }
    };

    setVideoSpecificDetails(); // call the function
  }, [courseSectionData, courseEntireData, location.pathname]);

  // video wr ek t prev ani
  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSectionId.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex) {
      return true;
    } else {
      return false;
    }
  };

  // when we are in the last video then do not show the next button
  const isLastVideo = () => {
    // last video mahanne .// array chi n-1 video ahe
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSection =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSectionId.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      noOfSubSection - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  // next butotn
  const goToNextVideo = () => {
    // last video wr aslyave next btn nahi shankanr  ani nahi jau shaknar --> btn display nahi karayache

    // eka section madhun next butn la click kele tr   tya section ch next lecture wr jane ---> pn current section jr last video asel section cha ani next button wr click kel tr --> next section chya first video wr jane

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSection =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSectionId.findIndex((data) => data._id === subSectionId);

    // case 1-->  same section chya next video wr jane ahe
    if (currentSubSectionIndex !== noOfSubSection - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSectionIndex + 1
        ]._id;
      // is video wr ja
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      // differnet section chi first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;

      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  //prev button
  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSection =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSectionId.findIndex((data) => data._id === subSectionId);
    //current video is not first video then --> same section id used karo and prev video wr jau ya

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ];

      // video wr ja
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      // different section last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;

      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;

      // last video
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;

      //video wr jaa
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  // when the lecture is completed
  const handleLectureCompletion = async () => {
    // dummy code
    setLoading(true);

    const result = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );

    // we have to update the state in viewCourseSlice  '
    if (result) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };

  // vido la parat shart karne
  const reWatch = () => {
    if(playerRef?.current){
      playerRef.current?.seek(0); // chagpt bolte sabko kolte 
      setVideoEnded(false); 
    }

  };
  
  return (
    <div>
      {!videoData ? (
        <div> No Data Found </div>
      ) : (
        <div>
          {/* video player  */}
          <Player>
            ref={playerRef}
            aspectRatio = "16:9"
            playsInline
            onEnded={()=>setVideoEnded(true)}
            <source src={videoData?.videoUrl} />

            <FaPlay  />


            {/* video jr end zali tr  */}
            {
              videoEnded && (
              <div>
                {
                  !completedLectures.includes(subSectionId) &&(
                    <IconBtn
                      disabled={loading}
                      onClick={()=> handleLectureCompletion()} 
                      text={loading?"Mark as completed" : "Loading"}
                    />
                  )


                }

                {/* Rewatch wala btn */}
                <IconBtn
                  disabled={loading}
                  onClick={()=> reWatch()}
                  text="Rewatch"
                  customClasses = "text-xl"
                />

                <div>
                  {

                    // jr pahjili video nasel trch prev button dakhavnar nahit rnahi dakhavnar 
                    
                    !isFirstVideo() &&(
                      <button
                        disabled={loading}
                        onClick={()=> goToPrevVideo()}
                        // app.css madhe ahe 
                        className="blackButton"
                      >
                        prev
                      </button>

                    )
                  }


                  {!isLastVideo() &&(<button
                        disabled={loading}
                        onClick={()=> goToNextVideo()}
                        // app.css madhe ahe 
                        className="blackButton"
                      >
                        Next
                      </button>)}
                </div>


              </div>
              
            )
            }

          </Player>

        </div>
      )}

      <h1>
        {videoData?.title}
      </h1>

      <p>{videoData?.description}</p>

    </div>
  );
};

export default VideoDetails;
