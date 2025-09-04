import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";

import IconBtn from '../../common/IconBtn';
import {createRating} from '../../../services/operations/courseDetailsAPI.js'

const CourseReviewModal = ({setReviewModal}) => {

    const{user} = useSelector((state)=>state.profile);
    const{token} = useSelector((state)=>state.auth);

    // yatun 
    const {courseEntireData} = useSelector((state)=>state.viewCourse);



        const{
            register,
            handleSubmit,
            setValue,
            formState:{errors}
        } = useForm();
        // initial value 

        useEffect(()=>{
            setValue("courseExperience","");
            setValue("courseRating",0);
        })

        
    //onsubmit form --save vr click kelyavr kay kel pahije 
    const onSubmit =async(data)=>{
        //1. review chi entry db mahde entry create karne 
        await createRating({
            courseId:courseEntireData._id,
            rating:data.courseExperience,
            review:data.courseExperience,
        
        },token);

        //2 modal close karne 
        setReviewModal(false);
    };


    // start fucntion of rating 

    const ratingChanged =(newRating)=>{
        setValue("courseRating",newRating);
    }   

  return (
    <div>
        <div>
            {/* Modal Header */}
            <div>

                <p> Add Review </p>

                {/* cross wala button */}
                <button
                    onClick={()=>{
                        setReviewModal(false)
                    }}
                >
                    close
                </button>
            </div>

            {/* Modal; Body  */}
            <div>
                <img
                    src={user?.image}
                    alt='logo'
                    className='aspect-square w-[50px]  rounded-full object-cover'
                />

                <div>
                    <p>{user.firstName} {user?.lastName} </p>

                    <p> Posting Publlically </p>
                </div>



                {/* form  */}

                <form
                    onSubmit={handleSubmit(onSubmit)}

                    className='mt-6 flex flex-col items-center'
                >

                    {/* stars wala part  */}
              
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />

                    <div>
                        <label>
                            Add your Experience
                        </label>

                        <textarea
                            id='courseExperience'
                            placeholder='Add Your Experience '
                            {...register("courseExperience",{required:true})}

                            className='form-style min-h-[130px] w-full '
                        />
                        {
                            errors.courseExperience&&(
                                <span className='text-pink-200'>
                                     Please add Your Experience
                                     </span>
                            )
                        }
                    </div>

                        {/* buttons
                         */}

                    
                    <div>
                        <button onClick={()=>setReviewModal(false)}>
                            Cancel 
                        </button>

                        <IconBtn
                            text="save"
                            // onClick={}
                        />
                    </div>
                </form>

            </div>
        </div>

    </div>
  )
}

export default CourseReviewModal