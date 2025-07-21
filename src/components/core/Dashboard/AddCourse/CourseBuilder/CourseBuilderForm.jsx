import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { GoPlusCircle } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
// importing the update section APi 
import {createSection, updateSection} from '../../../../../services/operations/courseDetailsAPI'
// arrow 
import { FaCircleArrowRight } from "react-icons/fa6";
import toast from 'react-hot-toast';
import NestedView from '../CourseBuilder/NestedView '

const CourseBuilderForm = () => {

  // usefull thing to be imported for ==> useForm Hook
  const {register,handleSubmit, setValue,formState:{errors}} = useForm();

  // flag for edit and show button creacte section 
  const[editSectionName,setEditSectionName] = useState(false);
  const[loading,setLoading] = useState(false);


  const {course,setCourse,setStep,setEditCourse} = useSelector((state)=> state.course);
  const {token} = useSelector((state)=>state.auth);

  const dispatch = useDispatch();

  // cancel edit button Function 
  const cancelEdit =()=>{
    setEditSectionName(false);
    setValue("sectionName", "")
  }

  const goBack =()=>{
    // jr apan mage jat asel tr apan course la create krt  nhai ahe apan tyala --< Edit krnra ahe --> step-1; madhe editcourse cha flag dila ahe tyala access karayche 
    dispatch(setStep(1));
    dispatch(setEditCourse(true))
  }

  const goToNext=()=>{
    if(course.courseContent.length===0){
      toast.error("Please add atleast one section ")
      return;
    }
    if(course.courseContent.some((section)=>section.subSection.length ===0)){
      toast.error("Please add atleast one lecture in Each section ")
      return;
    }
    // if everything is good 
    dispatch(setStep(3));
  }

  const onSubmit=async(data)=>{
    // this button create the section and --> update pn hoil 
    setLoading(true);
    let result = null;
    // lets if i am editing the section then EditSection API is called --> which is below
    if(editSectionName){
      // API CALL HERE 
        result = await updateSection({
        sectionName:data.sectionName,
        sectionId:editSectionName,
        course:course._id,
      },token
      )
    }else{
        // edit krt nahi ahe ==> Crate krt ahe --> tyamule create section chi APi call keli ahe 
         result = await createSection({
          sectionName:data.sectionName,
          courseId:course._id
        },token)

        console.log("Response of createsection --> ",result);
      }
      // values update karaychi ahe 
      if(result){
        dispatch(setCourse(result));
        setEditSectionName(false);
        setValue("sectionName"," ");
      }
      // loading false karne ahe 
      setLoading(false);
  }

  // NESTED VIEW SATHI FUNCION banavle 
  const handleChangeEditSectionName =(sectionId,sectionName)=>{

    if(editSectionName === sectionId){
      cancelEdit()
      return;
    }
    setEditSectionName
    (sectionId);
    setValue("sectionName",sectionName);

  }
  return (
    <div>
      <p> Course Builder </p>

      <form onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor='sectionName' className='text-richblack-5'> Section Name <sup>*</sup></label>
        <input
          type='text'
          id='sectionName'
          placeholder='Add Section Name'
          {...register("sectionName",{required:true})}
          //register madhe --> input field la kshane olkale jail tyache nav --> "sectioName" dile ani validation add kele ahe 
          className='w-full'
        />
        {errors.sectionName&&(
          <span className='text-pink-300'> Section Name is Required *</span>
        )}

          {/* khalil button wala section  */}
        <div className='mt-10 flex w-full '>
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-white"}

          >
            <GoPlusCircle  className='text-yellow-50'/>

          </IconBtn>

          {
            editSectionName &&(
              <button
                type='button'
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline ml-5'
              >
                cancel Edit
              </button>
            )
          }

          {/*  Nested View wala componsnts banavlene ahe  */}
          {/* section banavlyaver te yehte dilse pahije  */}


          {
            course.courseContent.length>0 &&(
              <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
            
            )
          }

          {/* Backa nd next button */}

          <div className='flex justify-end gap-x-3'>

            <button
              onClick={goBack}
              className='rounded-md cursor-pointer flex items-center'
            >
              Back
            </button>

            <IconBtn
              text="Next"
              onClick={goToNext}
            >
              <FaCircleArrowRight />
            </IconBtn>
          </div>


        </div>
      </form>
    </div>
  )
}

export default CourseBuilderForm