import React from "react"
import { useSelector, useDispatch } from "react-redux"
import IconBtn from "../../../common/IconBtn"
import { buyCourse } from "../../../../services/operations/studenFeaturesApi"
import { useNavigate } from "react-router-dom"

const RenderTotalAmmount = () => {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const Courses = cart.map((course) => course._id) // find the id of each course
    buyCourse(token, Courses, user, navigate, dispatch)
  }

  return (
    <div className="bg-richblack-800 rounded-lg border border-richblack-700 p-6 flex flex-col gap-4 shadow-md">
      <p className="text-richblack-300">Total:</p>
      <p className="text-3xl font-bold text-yellow-50">Rs. {total}</p>

      <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses={"w-full justify-center bg-yellow-50 text-richblack-900 hover:opacity-90"}
      />
    </div>
  )
}

export default RenderTotalAmmount
