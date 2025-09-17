import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast'; 
import {ACCOUNT_TYPE} from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';



function CourseDetailsCard({course,setConfirmationModal,handleByCourse}) {

    const {
        thumbnail,
        price,
        courseName,
    } =course;

    const { user} = useSelector((state)=>state.profile);

    const{token} = useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const dispatch= useDispatch();

    // add to cart functiojn
    function HandleAddToCart(){
        // instructor of not logged in user in not allowe d to add rto cart the course
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are a Instructor , You Can't buy a course");
        }
            if(token){
                console.log("Dispacting to cart");
                dispatch(addToCart(course));
                return;
            };
            //if not a valid token // if user is not logged in 

            setConfirmationModal({
                text1:"You are not Looged In",
                text2:"Please login to buy a course",
                btn1text:"Login",
                btn2text:"cancel",
                btn1Handler:()=> navigate("/login"),
                btn2Handler:()=>setConfirmationModal(false)
            })
        
    };

    // her is the copy function which copy the link of the current page
    // COPY TO CLIPBOARD 
    function HandleShare(){

        copy(window.location.href);
        toast.success("Link Copied to clipboard");
    }

  return (
    <div>
        {/* Thumbnai */}
        <img src={thumbnail} alt={courseName} className='w-[400px] max-h-[300px] min-h-[180px] object-cover rounded-xl'/>

        {/*  rice*/}
        <div>
            <p>Price : {price===0 ? "Free": `$${price}`}</p>
        </div>


        {/* Buy Button */}
<div className='flex flex-col gap-y-6'>
  <button 
    className='bg-yellow-50 w-fit'
    onClick={
      user && course?.studentEnrolled.includes(user?._id)
        ? () => navigate("/dashboard/enrolled-courses")
        : handleByCourse
    }
  >
    {
      user && course?.studentEnrolled.includes(user?._id) 
        ? "Go to Course" 
        : "Buy Now"
    }
  </button>

  {
    !course?.studentEnrolled.includes(user?._id) && (
      <button
        className='bg-yellow-50 w-fit text-richblack-900'
        onClick={() => HandleAddToCart()}
      >
        Add to Cart
      </button>
    )
  }
</div>


        <div>
            <p>
                30-Day Money-Back Gurantee
            </p>
            <p>
                This course Included : 
            </p>
            <div className='flex flex-col gap-y-3'>
                {
                    course?.instructions?.map((item,index)=>(
                        <p key={index} className='flex gap-2'>
                            <span> {item}</span>
                        </p>
                    ))
                }
            </div>
        </div>

        {/* share walka button */}
        <div>
            <button 
                onClick={()=>HandleShare()}
                className='mx-auto flex items-center gap-2 p-6 text-yellow-50'
            >
                Share
            </button>
        </div>
    </div>
  )
}
export default CourseDetailsCard