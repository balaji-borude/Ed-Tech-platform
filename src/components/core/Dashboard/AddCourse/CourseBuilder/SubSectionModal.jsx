import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-hot-toast';
import setCourse from '../../../../../courseSlice.js/';
import  { createSubSection,updateSubSection } from '../../../../../services/operations/courseDetailsAPI.js';
import { RxCross1 } from "react-icons/rx";
import Upload from "../CourseFormation/Upload.jsx";
import IconBtn from '../../../../common/IconBtn.jsx'

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false, // ha data yeto kinva nahi yet tyasathi Bydefault tyana false kele
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
        const currentValues = getValues();
        if (
        currentValues.lectureTitle !== modalData.title ||
        currentValues.lectureDesc !== modalData.description ||
        currentValues.lectureVideo !== modalData.videoUrl
        ) {
        return true; // form is updated
        } else {
        return false; // form is not updated
        }
    };
// subsection edit zale 
    const handleEditSubSection=async()=>{
      const currentValues = getValues();
      const formData = new FormData();

      formData.append("sectionId",modalData.sectionId);
      formData.append("subSection",modalData._id);

      // jr update zaale tr 
      if(currentValues.lectureTitle !== modalData.title){
        formData.append("title",currentValues.lectureTitle)
      }
      if(currentValues.lectureVideo !== modalData.videoUrl){
        formData.append("video",currentValues.lectureVideo)
      }
      if(currentValues.lectureDesc !== modalData.description){
        formData.append("description",currentValues.lectureDesc)
      }
      setLoading(true);


      // api call 
      // edit subsection
      const result = await updateSubSection(formData,token);
      if(result){
        dispatch(setCourse(result));

      }
      setModalData(null); // modal close kela
      setLoading(false);
    }

    // onSubmit 
    const onSubmit =async(data)=>{
      // subsection view chi call ahe 
        if(view)
            return; 
          // edit chi call ahe 
        if(edit){
            if(!isFormUpdated){
                toast.error("No Changes Made to The Form")
          }

        }else{
            // edit kardoo 
          handleEditSubSection();
          return;
        }
        

        
        // add subsection chi call --> normal case 
      const formData = new FormData();
      formData.append("sectionId",modalData);
      formData.append("title",data.lectureTitle);
      formData.append("description",data.lectureDesc);
      formData.append("video",data.lectureVideo);
      setLoading(true);

      // api call
      const result = await createSubSection(formData,token);
      
      if(result){
        // check for updation od something
        dispatch(setCourse(result));

      }
      // modal la band karu 
      setModalData(null);
      loading(false);

    }




  return(
    <div>
        <div>
          {/* jr view wala flag true asel tr view dakhav */}
          <p>
            {view && "Viewing" } 
            {add && "Adding"}
            {edit && "Editing"} 
            Lecture
          </p>

          <button
            onClick={()=>(!loading ? setModalData(null):{})}
           className=""
          >
            <RxCross1 />
          </button>


          {/* form creation */}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* upload wala components */}
            <Upload
              name="LectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
            />
            {/* title */}

            <div>
              <label htmlFor="lectureTitle"> Lecture Title</label>
              <input
                id="lectureTitle"
                placeholder="Enter Lecture Title"
                {...register("lectureTitle",{required:true})}
                className="w-full"
              />
              {
                errors.lectureTitle && <span> Lecture Title is required </span>
              }



            </div>
            
            {/* desccription */}
            <div>
                <label htmlFor="lectureDesc"> 
                  Lecture Description
                </label>

                <input
                  id="lectureDesc"
                  placeholder="Enter Lecture Description"
                  {...register("lectureDesc",{required:true})}
                  className="w-full min-h-[130px]"
                />
                {
                  errors.lectureDesc && <span>
                    Lecture Description is required
                  </span>
                }
            </div>

            {/* button add and edit madhe button yenar view made button nahi yeanr */}
            {
              !view &&(
                <div>
                  <IconBtn
                    text={loading? "Loading..." : edit ? "Save Changes" : "Save"}
                  />
                </div>
              )
            }

          </form>
        </div>
    </div>
  )
};

export default SubSectionModal;
