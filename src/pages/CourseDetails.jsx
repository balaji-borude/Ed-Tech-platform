import React from 'react'

const CourseDetails = () => {
const token = "33";

    // razorpay function
    const handleByCourse =()=>{
        if(token){
            // buyCourse()
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