import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import { courseEndpoints } from '../services/apis';

import VideoDetailsSidebar from '../components/core/viewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/viewCourse/CourseReviewModal';

const ViewCourse = () => {

    const[reviewModal,setReviewModal] = useState();

    //course Id
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    
    // data fetch 
    useEffect(()=>{
        const setCourseSpecificDetails = async()=>{
            const courseData = await getFullDetailsOfCourse(courseId,token);
            
            // these field are preent in --> viewCourseSlice 

            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));  // check here random inspection

            let lecture ;
            courseData?.courseDetails?.courseContent?.forEach((sec)=>{
                lecture += sec.subSection.length
            });

            dispatch(setTotalNoOfLectures(lecture));

        };

        setCourseSpecificDetails();
    },[])

  return (
    <>
        <div>
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>

            {/* video */}
            <div>
                <Outlet/>
            </div>

            {/* modal; */}
            {
                reviewModal&&<CourseReviewModal setReviewModal={setReviewModal}/>
            }
        </div>
    </>

  )
}

export default ViewCourse