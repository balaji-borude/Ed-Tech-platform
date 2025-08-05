import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";

import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { data } from "react-router-dom";



const NestedView = ({ course, handleChangeEditSectionName }) => {
  // const {course} = useSelector((state)=>state.auth);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // flags we are needed
  const [addSubSection, setAddSubSection] = useState();
  const [editSubSection, setEditAddSubSection] = useState();
  const [viewSubSection, setViewSubSection] = useState();

  const [confirmationModal, setConfirmationModal] = useState();

  console.log("Printing the course from auth state-->", course);
    
    // delete wala button 
  const handleDeleteSection =(sectionId)=>{

  }


  return (
    <div>
      <div className="mt-10">
        <RxDropdownMenu color="white" className="hover:cursor-pointer" />

        {course.courseContent.map((section) => {
          return (
            <details key={section._id} open>
              {/* by default open thevne ahe details--> tag la   */}
              <summary className="flex items-center justify-between gap-x-3  border-white border-b-2">
                <div className="flex items-center gap-x-3">
                  {/* drop down icon  */}
                  <p className="text-white">{section.sectionName} </p>
                </div>

                {/* edit icon and button  */}
                <div className="bg-caribbeangreen-50 flex items-center gap-x-3">
                  <button
                    className=""
                    onClick={handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )}
                  >
                    <CiEdit />
                  </button>

                  {/* dekete button */}

                  <button
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Delete this section",
                        text2:
                          "All the lecturesin this section will be deleted ",

                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Handler:()=>setConfirmationModal(null)
                      });
                    }}
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <span>|</span>
                    
                    {/* icon */}
                    <TiArrowSortedDown  className="text-xl text-richblack-300"/>



                </div>
              </summary>

              {/* subSection */}
              <div>
                {
                    section.subSection.map((data)=>{
                        <div
                         key={data?._id}
                         onClick={()=>setViewSubSection(data)}
                         className="flex items-center justify-between gap-x-3 border-b-2 "
                        >

                            <div>
                                
                            </div>

                        </div>
                    })
                }
              </div>


            </details>
          );
        })}
      </div>
    </div>
  );
};

export default NestedView;
