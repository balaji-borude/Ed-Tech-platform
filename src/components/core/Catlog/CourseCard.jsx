import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating';

import RatingStars from '../../common/RatingStars';


const CourseCard = ({course,Height}) => {

    // calculate avg rating fucntion
    const[avgReviewCount,setAvgReviewCount] = useState(0);

    // pratyek render la jevha course chi entry yeil tevha avgRating Count kadhun gheto 
    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews);

        setAvgReviewCount(count);

    },[course]);

  return (

    <div >
   <Link to={`/courses/${course._id}`}>
        <div className="">
            {/* Img div  */}
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full rounded-xl object-cover p-2 `}
            />
          </div>
          {/* one sectyon */}
          <div className="flex flex-col gap-2 px-1 py-9">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>

            <div className="flex items-center gap-2">
                {/* rating count */}
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              {/* convert reating number iunto stars */}
              <RatingStars Review_Count={avgReviewCount} />
              {/* How many rating is present */}
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            {/* price */}
            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CourseCard