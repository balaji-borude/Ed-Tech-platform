import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";

import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI.js'

const CourseReviewModal = ({ setReviewModal }) => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    // yatun 
    const { courseEntireData } = useSelector((state) => state.viewCourse);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();
    
    // initial value 
    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, [setValue]);

    //onsubmit form --save vr click kelyavr kay kel pahije 
    const onSubmit = async (data) => {
        //1. review chi entry db mahde entry create karne 
        await createRating({
            courseId: courseEntireData._id,
            rating: data.courseRating,
            review: data.courseExperience,
        }, token);

        //2 modal close karne 
        setReviewModal(false);
    };

    // start function of rating 
    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-richblack-900 text-richblack-25 w-full max-w-lg rounded-xl shadow-lg overflow-hidden">

                {/* Modal Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-richblack-700">
                    <p className="text-xl font-semibold">Add Review</p>

                    {/* cross wala button */}
                    <button
                        onClick={() => { setReviewModal(false) }}
                        className="text-richblack-300 hover:text-pink-200 transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Body */}
                <div className="px-6 py-4 space-y-4">

                    <div className="flex items-center gap-4">
                        <img
                            src={user?.image}
                            alt='logo'
                            className='aspect-square w-12 h-12 rounded-full object-cover'
                        />
                        <div>
                            <p className="font-medium">{user.firstName} {user?.lastName}</p>
                            <p className="text-sm text-richblack-400">Posting Publicly</p>
                        </div>
                    </div>

                    {/* form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col gap-4'
                    >
                        {/* stars wala part */}
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={28}
                            activeColor="#ffd700"
                        />

                        <div className="flex flex-col gap-2">
                            <label htmlFor="courseExperience" className="text-sm font-medium">Add your Experience</label>

                            <textarea
                                id='courseExperience'
                                placeholder='Add Your Experience '
                                {...register("courseExperience", { required: true })}
                                className='form-style min-h-[130px] w-full resize-none rounded-md bg-richblack-800 px-3 py-2 text-richblack-25 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-pink-400'
                            />
                            {
                                errors.courseExperience && (
                                    <span className='text-pink-400 text-sm'>
                                        Please add Your Experience
                                    </span>
                                )
                            }
                        </div>

                        {/* buttons */}
                        <div className="flex justify-end gap-4 mt-2">
                            <button
                                type="button"
                                onClick={() => setReviewModal(false)}
                                className="px-4 py-2 rounded-md border border-richblack-700 hover:bg-richblack-700 transition"
                            >
                                Cancel
                            </button>

                            <IconBtn
                                text="Save"
                                type="submit"
                            />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default CourseReviewModal;
