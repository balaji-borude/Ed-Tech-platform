import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast'; 
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';

function CourseDetailsCard({ course, setConfirmationModal, handleByCourse }) {

    const { thumbnail, price, courseName } = course;
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // add to cart function
    function HandleAddToCart() {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, You Can't buy a course");
            return;
        }
        if (token) {
            dispatch(addToCart(course));
            // toast.success("Added to Cart!");
            return;
        }
        setConfirmationModal({
            text1: "You are not Logged In",
            text2: "Please login to buy a course",
            btn1text: "Login",
            btn2text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(false)
        })
    };

    // copy link
    function HandleShare() {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard");
    }

    return (
        <div className="bg-richblack-900 flex border border-richblack-700 shadow-lg  rounded-xl text-richblack-25 rounded-xl shadow-lg p-6  flex-col gap-6 max-w-md mx-auto md:max-w-lg lg:max-w-xl">

          <div>

            {/* Thumbnail */}
            <img
                src={thumbnail}
                alt={courseName}
                className='w-full max-h-60 md:max-h-72 object-cover rounded-lg shadow-md'
            />

            {/* Price */}
            <div>
                <p className="text-lg font-semibold">
                    Price: {price === 0 ? "Free" : `$${price}`}
                </p>
            </div>

            {/* Buy Buttons */}
            <div className='flex flex-col md:flex-row gap-4'>
                <button
                    className='bg-yellow-50 text-richblack-900 px-6 py-2 rounded-md font-medium hover:bg-yellow-100 transition w-full md:w-auto'
                    onClick={
                        user && course?.studentEnrolled.includes(user?._id)
                            ? () => navigate("/dashboard/enrolled-courses")
                            : handleByCourse
                    }
                >
                    {user && course?.studentEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"}
                </button>

                {!course?.studentEnrolled.includes(user?._id) && (
                    <button
                        className='bg-richblack-700 text-yellow-50 px-6 py-2 rounded-md font-medium hover:bg-richblack-600 transition w-full md:w-auto'
                        onClick={() => HandleAddToCart()}
                    >
                        Add to Cart
                    </button>
                )}
            </div>
          </div>

            {/* Guarantee & Instructions */}
            <div className='flex flex-col gap-3'>
                <p className='text-sm text-richblack-400 font-medium'>30-Day Money-Back Guarantee</p>
                <p className='text-sm text-richblack-400 font-medium'>This course includes:</p>
                <ul className='list-disc list-inside flex flex-col gap-1 text-richblack-200'>
                    {course?.instructions?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Share Button */}
            <div className='flex justify-center'>
                <button
                    onClick={() => HandleShare()}
                    className='flex items-center gap-2 px-4 py-2 bg-richblack-700 text-yellow-50 rounded-md hover:bg-richblack-600 transition'
                >
                    Share
                </button>
            </div>
        </div>
    )
}

export default CourseDetailsCard;
