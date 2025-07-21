import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { MdOutlineStarOutline,MdOutlineStarPurple500 } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

// check if this is correct or not 
import {removeFromCart} from '../../../../slices/cartSlice'

const RenderCartCourses = () => {
    const{cart} = useSelector((state)=>state.cart);

    const dispatch = useDispatch();
  return (
    <div>
        {
            cart.map((course,index)=>(
                <div>
                    {/* left wala section  */}
                    <div>
                        <img src={course?.thumbnail}  alt='courseImg name'/>

                        <div>
                            <p>{course?.courseName} </p>
                            <p>{course?.category?.name} </p>

                            {/* star wali game  */}
                            {/* get average rating wali api call karayche ahe yethe  */}
                            <div>
                                {/* Now I am Hardcoding the value of Rating   */}
                                <span> {4.8 }</span>

                                {/* adding start  */}
                                <ReactStars
                                    count={5}
                                    edit={false}
                                    size={20}
                                    activeColor="#0ffd700"
                                    emptyIcon={<MdOutlineStarOutline/>}
                                    fullIcon={<MdOutlineStarPurple500 />}
                                />

                                {/* review count  */}
                                <span>{course?.ratingAndReview?.length} Ratings  </span>

                            </div>
                        </div>
                    </div>

                    {/* Right wala part  */}
                    <div>
                        <button 
                        onClick={()=>dispatch(removeFromCart(course._id))}>
                         <RiDeleteBinLine /> 
                         <span>Remove</span>
                        </button>

                        {/* course Price  */}
                        <p>
                            Rs {course?.price}
                        </p>
                    </div>
                </div>
            ))
        }    
    </div>
  )
}

export default RenderCartCourses