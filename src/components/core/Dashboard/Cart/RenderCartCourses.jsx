import React from "react"
import { useDispatch, useSelector } from "react-redux"
import ReactStars from "react-rating-stars-component"
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md"
import { RiDeleteBinLine } from "react-icons/ri"

// check if this is correct or not
import { removeFromCart } from "../../../../slices/cartSlice"

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col gap-6">
      {cart.map((course, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-richblack-700 pb-4"
        >
          {/* left wala section  */}
          <div className="flex gap-4 w-full md:w-[70%]">
            <img
              src={course?.thumbnail}
              alt="courseImg name"
              className="w-[180px] h-[120px] object-cover rounded-md"
            />

            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">{course?.courseName}</p>
              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>

              {/* star wali game  */}
              {/* get average rating wali api call karayche ahe yethe  */}
              <div className="flex items-center gap-2 text-sm text-richblack-300">
                {/* Now I am Hardcoding the value of Rating   */}
                <span>{4.8}</span>

                <ReactStars
                  count={5}
                  edit={false}
                  size={20}
                  activeColor="#ffd700"
                  emptyIcon={<MdOutlineStarOutline />}
                  fullIcon={<MdOutlineStarPurple500 />}
                />

                {/* review count  */}
                <span>{course?.ratingAndReviews?.length} Ratings </span>
              </div>
            </div>
          </div>

          {/* Right wala part  */}
          <div className="flex flex-row md:flex-col items-center md:items-end gap-3 mt-4 md:mt-0">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-1 px-3 py-1 bg-richblack-700 text-pink-200 rounded-md hover:bg-richblack-600 transition-all"
            >
              <RiDeleteBinLine />
              <span>Remove</span>
            </button>

            {/* course Price  */}
            <p className="font-semibold text-yellow-50">Rs. {course?.price}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RenderCartCourses
