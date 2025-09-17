import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/studenFeaturesApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';



const RenderTotalAmmount = () => {
    const {total,cart} = useSelector((state)=>state.cart);
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);

    const navigate = useNavigate();

    //This function goes to Payment Intergration 
    // function handleBuyCourse(){
    //     const course = cart.map((course)=>course._id);
    //     console.log("User bought This courses ", course );
        
    // }
    const dispatch = useDispatch();


      const handleBuyCourse = () => {
          const Courses = cart.map((course)=>course._id);// find the id of each course
        
          buyCourse(token, Courses, user, navigate, dispatch);
        
        
  
      };
    

  return (
    <div className='flex flex-col gap-6 p-4 border border-richblack-700'>
        <p>Total:  </p>
        <p className='text-3xl'>Rs-- {total}  </p>

        <IconBtn
          text="Buy Now"
          onClick={handleBuyCourse}
          customClasses={"w-full justify-center"}
        />
    </div>
  )
}

export default RenderTotalAmmount