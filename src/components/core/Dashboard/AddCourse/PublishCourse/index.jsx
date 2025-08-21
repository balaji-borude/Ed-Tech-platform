import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"

export default function PublishCourse() {
  const{
    register,
    handleSubmit,
    setValue,
    getValues
  } = useForm();

  const dispatch = useDispatch();

  const {course}= useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);


  const[loading,setLoading] = useState(false);

  // pahilya render la --> jr course cha status published asel tr setValue la Public set kr 
  useEffect(()=>{
    if(course?.status === COURSE_STATUS.PUBLISHED){
      setValue("public",true)
    }
  },[]);

  // jr form update kela nahi ani save wr click kert ahe tr sarv course dakhav 
  const goToCourse =()=>{
    dispatch(resetCourseState());
    // TODO ==>  navigate to t the dashboard/myCourses
    // navigate("/dashboard/my-courses")
  }


  // hadle course Public function if click on save changes 
  const handlePublish = async() => {

    // ya case mafhe form update zale la nasel tr --> 
    if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public")=== true || (course?.status===COURSE_STATUS.DRAFT && getValues("public")===false)){
      // no updation in form 
      // so no need to make tha api call 
      goToCourse();
      return;

    }

    // if form is updated 
    const formData = new FormData();
    formData.append("courseId",course._id);

    // PUBLIC chi value wr depend krt ahe jr true asel tr published hoil nahitr nahi honar 
    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;

    formData.append("status",courseStatus);


    // api call 
    setLoading(true);
    const result = await editCourseDetails(formData,token);

    // if course is valid then go to the Cousrses
    if(result){
      goToCourse();
    }
    setLoading(false);


  };


  // Submit handler
   const onSubmit = ()=>{
    // submit zalyavr course la  publish karne 
    handlePublish();
   }

   // goback function 
   const goBack =()=>{
     dispatch(setStep(2));
    }

  return (
    <div className="rounded-md border-[1px] p-6 bg-richblack-800 border-richblack-700 space-y-5">
      <p className="text-richblack-5">Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="flex   gap-x-2 items-center ">

          {/* Public he Id che nav ahe re bruuuuuuuuuuu */}
          <input
            id="public"
            type="checkbox"
            {...register("public")}
            className="rounded h-4 w-4 text-richblack-5 "
          /> 

          <label htmlFor="public" className="text-richblack-300">Make This course as Public </label>

        </div>
        {/* Button */}
        <div className="flex justify-end gap-x-3">
          {/*TODO -->  add logo of backward side   */}
          <button disabled={loading}
            type="button"
            onClick={goBack}
            className="flex items-center rounded-md bg-richblack-300 p-3 cursor-pointer "
          >
            Back
          </button>

          <IconBtn
            disabled={loading}
            text={"Save and Publish"}
            //onClick={()=>handlePublish}
          />

        </div>

      </form>
    </div>
  )
}