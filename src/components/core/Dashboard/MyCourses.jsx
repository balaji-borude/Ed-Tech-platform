import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {fetchInstructorCourses} from '../../../services/operations/courseDetailsAPI';

import IconBtn from '../../common/IconBtn';
import CoursesTable from './InstructorCourses/CoursesTable';



const MyCourses = () => {

    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();

    const[courses,setCourses]= useState([]);

    // Instructor ne Build kelele --- Sarv course fetch krt ahe -- First render wr  
    useEffect(()=>{

        const fetchCourses = async()=>{
            const result = await fetchInstructorCourses(token);
            console.log("Priting token from the fetcCourse",token);
            console.log(result)
            if(result){
                setCourses(result);
            }
        };

        fetchCourses(); // fuction call kela 
    },[]);



  return (
    <div>

        <div className='space-y-4'>
            <h1 className='text-richblack-25 font-medium text-2xl  '> My Courses </h1>

            <IconBtn
                text="Add Course"
                onClick={()=>navigate("/dashboard/add-course")}
                //  TODO --> add Plus Icons  here
            />
        </div>

        {/* jr Cousrses Exist krt asel trch Table madhla content dakhavne --> Cooman Sense  */}
        {
            courses && <CoursesTable courses={courses} setCourses={setCourses} />
        }


    </div>
  )
}

export default MyCourses