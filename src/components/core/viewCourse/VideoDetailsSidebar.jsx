import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const VideoDetailsSidebar = ({setReviewModal}) => {

    // at a time only on section is open 
    //curenly video is runing -- highlight 

    const [activeStatus,setActiveStatus] = useState("");
    const [videobarActive,setVideoBarActive] = useState("");

    const navigate = useNavigate();

    const location = useLocation();
    const {sectionId,subSectionId} = useParams();

    const {
        courseSectiondata,
        courseEntiredata,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state)=>state.viewCourse);

    //data fetch 
    useEffect(()=>{

        // this is new Syntax 
        ;(()=>{
            // video find karaycha --> section chi length 
            if(!courseSectiondata.length){
                return;
            };
            // section cha ndex kadhla baher
            const currentSectionIndex = courseSectiondata.findIndex((data)=>data._id === sectionId);

            // curent seubsectio cha index  find kert ahe 
            const currentSubsectionIndex = courseSectiondata?.[currentSectionIndex]?.subSection.findIndex((data)=> data._id === subSectionId);

            // curernt Active subsection --> Ji video la click kel ahe ti 

            const activeSubsectionId = courseSectiondata[currentSectionIndex]?.subSection.[currentSubsectionIndex]?._id;


            // set  current sectionm here 
            setActiveStatus(courseSectiondata?.[currentSectionIndex]?._id);
            // set current Subsection here 
            setVideoBarActive(activeSubsectionId);


        })();


    },[courseSectiondata,courseEntiredata,location.pathname]);


  return (
    <>
        <div>
            {/* for buttons and heading div */}
            <div>
              

                {/* for buttons only  */}
                <div>
                    <div 
                        onClick={()=>{
                            navigate('/dashboard/enroled-Courses')
                        }}
                    >
                        back
                    </div>

                    <div>
                        <IconBtn
                            text="Add Review "
                            onClick={()=>setReviewModal(true)}
                        />

                    </div>

                    
                </div>



                {/* for heading and tiitle  */}
                <div>
                        <p>{courseEntiredata?.courseName}</p>

                        <p>{completedLectures.length}/{totalNoOfLectures} </p>

                </div>
            </div>

            {/* for sections and subsections */}
            <div>
                {
                    courseSectiondata.map((section,index)=>(

                        <div
                        onClick={()=>setActiveStatus(course?._id)}  
                        key={index}
                        >
                            {/* Section  */}
                            <div>
                                <div>
                                    {section?.sectionName}
                                    
                                </div>
                                {/* arrow wlaa icon add karne ahe  ==> handle roate logic */}
                            </div>
                            
                            {/* subsection logic  */}
                            <div>
                                {
                                    activeStatus === course.subSection.map((topic,index)=>(
                                    <div 
                                        className={`flex gap-3 p-4 ${videobarActive === topic._id ? "bg-yellow-200 text-richblack-900" :"bg-black text-white"}`}

                                        key={index}

                             onClick={()=>{
                               navigate(`/view-course/${courseEntiredata?._id}/section/:sectionId/sub-section/:subSectionId`)

                               setVideoBarActive(topic?._id);
                                        }}

                                    >
                                <input
                                    type='checkbox'
                                    checked={completedLectures.includes(topic?._id)}
                                    onChange={()=>{}}   
                                />

                                <span>
                                    {topic.title}
                                </span>
                                        </div>
                                    ))
                                }
                            </div>



                        </div>
                    ))
                }
            </div>
           
        </div>




    </>
  )
}

export default VideoDetailsSidebar
