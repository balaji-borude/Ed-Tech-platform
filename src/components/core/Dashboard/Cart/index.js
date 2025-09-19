import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmmount from "./RenderTotalAmmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)
  // if any loginc regarding to loading is possiblke check it out 

  return (
    <div className="w-full min-h-screen text-white bg-richblack-900 px-4 md:px-12 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">My Cart</h1>
      <p className="text-richblack-300 mb-6">
        {totalItems} Courses in Cart
      </p>

      {// if total is greater than zero then rendder Two components 
        total > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Courses List */}
            <div className="flex-1 flex flex-col gap-6">
              <RenderCartCourses />
            </div>

            {/* Right: Total Amount Card */}
            <div className="w-full lg:w-[320px]">
              <RenderTotalAmmount />
            </div>
          </div>
        ) : (
          <p className="text-richblack-400">Your Cart is Empty</p>
        )
      }
    </div>
  )
}
