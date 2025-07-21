import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {getUserEnrolledCourses} from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {
  // profile slice madhun token la fetch kel ahe 
  const{token} = useSelector((state)=>state.auth);

  const [enrolledCourses,setEnrolledCourses] = useState(null);

  // function for getting all coursese 
  const getEnrolledCourses = async()=>{

    try{
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    }catch(error)
    {
      console.log(error);

    }
  };

  useEffect(()=>{
    getEnrolledCourses();
  },[]);


    
  return (

    <div className='text-white'>

        <h2> Enrolled courses  </h2> 

        {
          // if enrolledCourses not availablle now 
          !enrolledCourses ? (<div>Loading...</div>)
          : !enrolledCourses.length ? 
          (<p>You have not enrolled in Any Course yet </p>)
          :(
            <div>
              <div>
                <p> Course Name</p>
                <p>Duration</p>
                <p>Progress</p>

                {/* card yethun suru zale  */}

                {
                  enrolledCourses.map((course,index)=>{
                    <div key={index}>
                       {/* left wala part  */} 
                      <div>
                        <img src={course.thumbnail} alt='thumbnail name ' />

                        <div>
                          <p>{course.courseName} </p>
                          <p>{course.courseDescription} </p>
                        </div>
                      </div>

                        <div>
                          {course?.totalDuration}
                        </div>

                        {/* Progress bar div */}
                        <div>
                          <p> Progress: {course.progressPercentage || 0 } </p>

                          {/* Progress Bar  */}
                          <ProgressBar
                            completed={course.progressPercentage || 0}
                            height='8px'
                            isLabelVisible={false}
                          />
                        </div>

                        
                      
                    </div>
                  })
                }

              </div>
            </div>
          )
        } 
    </div>
  )
}

export default EnrolledCourses