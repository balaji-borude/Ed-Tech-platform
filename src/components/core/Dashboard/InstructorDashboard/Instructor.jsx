import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {getInstructorData} from '../../../../services/operations/profileAPI';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
// import { getInstructorData } from '../../../../services/operations/profileAPI';

const Instructor = () => {

    const {token} = useSelector((state)=> state.auth);

    const [laoding,setLoading] = useState(false);
    const [instructorData,setInstructordata] = useState(null);

    const[course,setCourse] = useState([]);

    useEffect(()=>{
        const fetchInstructorStat = async()=>{
            setLoading(true);

            const instructorApiData = await getInstructorData(token);
            console.log("Particular Instructor data ==> ",instructorApiData);
            
            // instructor che sarv course yethe ahe 
            const result = await fetchInstructorCourses(token);
            

            if(instructorApiData.llength){
                setInstructordata(instructorApiData);   
            };

            if(result){
                setCourse(result);
            };

            setLoading(false);

        }
        fetchInstructorStat();
    },[]);





  return (
    <div>
        instructor Page 

        <div>

        </div>
    </div>
  )
}

export default Instructor