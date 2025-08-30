import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studenFeaturesApi';import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Error from './Error';



const CourseDetails = () => {
    
    const {loading}= useSelector((state)=>state.profile);
     const {paymentLoading} = useSelector((state)=>state.course);

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams(); // course Id params madhun ghetli 



    const [courseData,setCourseData]= useState(null);
    
    // we have to get data firsly
    useEffect(()=>{
        const getCourseFullDetails = async()=>{

            try{
                // api call 
                const result = await fetchCourseDetails(courseId);

                // set data  in coursedata state
                setCourseData(result);
            }catch(error){
                console.log("Could not fetch course details");
            }   
        }
    },[courseId]);


    // avg review count
    const [avgReviewCount,setAvgReviewCount] = useState(0);
    
        // use effect for avg review count
        useEffect(()=>{
            const count = GetAvgRating(courseData?.data?.CourseDetails.ratingAndReviews);
            setAvgReviewCount(count);
        },[courseData]);


    // for total lecture 
    const[totalNoOfLectures,setTotalNoOfLectures] = useState(0);
    
    useEffect(()=>{
        let lectures =0;
      response?.data?.CourseDetails?.courseContent?.forEach((sec)=>{
        lectures += sec?.subSection?.length;
      })
      setTotalNoOfLectures(lectures);
    },[courseData]);

    // to update 
        // razorpay function
    const handleByCourse =()=>{
        if(token){
            buyCourse(token,[courseId],user,navigate, dispatch);
        }
    };

    if(loading||!courseData){
        return<div> Loading .....</div>
    };

    if(!courseData?.success){
        return <Error/>
    }

  return (
    <div>

        {/* <button className='bg-yellow-50 mt-10 p-3 rounded-xl'
            onClick={()=>handleByCourse()}
        >
            Buy now
        </button> */}

        <div className='relative '>

        </div>
    </div>
  )
}

export default CourseDetails