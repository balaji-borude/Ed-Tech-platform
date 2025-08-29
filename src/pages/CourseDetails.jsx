import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studenFeaturesApi';;


const CourseDetails = () => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams(); // course Id params madhun ghetli 

    // razorpay function
    const handleByCourse =()=>{
        if(token){
            buyCourse(token,[courseId],user,navigate, dispatch);
        }
    }


  return (
    <div>

        <button className='bg-yellow-50 mt-10 p-3 rounded-xl'
            onClick={()=>handleByCourse()}
        >
            Buy now
        </button>
    </div>
  )
}

export default CourseDetails