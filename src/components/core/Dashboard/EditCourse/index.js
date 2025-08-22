import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";

import RenderSteps from  '../../Dashboard/AddCourse/RenderSteps';

import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";

import {setCourse,setEditCourse} from '../../../../slices/courseSlice';



export default function EditCourse () {
    // renderSteps components chya 3 step chi garaj padel 
    // Edit course karayche ahe yat 

    const dispatch = useDispatch();
    const {courseId} = useParams(); // CourseTable components madhe edit button wr click kelyaver course chi id pramas madhe pathvli ahe tila import kel ahe yethe 

    const {course}=  useSelector((state)=>state.course);

    const[loading,setLoading] = useState(false);
    const{token}= useSelector((state)=> state.auth);

    // pahilya render madhe seleted course cha data ala pahije form madhe --> pahilyapasun tyamule useEffect la use kele ahe 
    useEffect(()=>{
        const showcourseDetails =async()=>{
            setLoading(true);
            // api call to get full course details 
            const result = await getFullDetailsOfCourse(courseId,token);
                console.log("Priting the result of Ful course Detail ", result);
            if(result?.courseDetails){
               dispatch(setEditCourse(true)); 
               // setEditCourse flag la true mark kel tyamule apan edit course karu shakto

               // Redux Course sclice chya   setCourse madhil variabnle madhe value set keli ahe --> tyamule form madhe prev amdhe Api call kelela data render hoil 
               dispatch(setCourse(result.courseDetails));
               
               setLoading(false);
            }
        }
        showcourseDetails();
    },[])

    // if loading is true 
    if(loading){
        return(
            <div> loading .... </div>
        )
    }


  return (
    <div>
        <h1>  Edit Course </h1>
        <div>
            {
                course?(<RenderSteps/>) : ("Course Not Found ")
            }
        </div>
    </div>
  )
}

