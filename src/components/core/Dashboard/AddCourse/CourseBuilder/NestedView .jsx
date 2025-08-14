import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";

import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
// import ConfirmationModal from "../../../../common/ConfirmationModal"
import setCourse from '../../../../../courseSlice.js/';
const NestedView = ({ course, handleChangeEditSectionName }) => {
  // const {course} = useSelector((state)=>state.auth);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // flags we are needed for ==> edit, add, and View the confirmatio modal 
  const [addSubSection, setAddSubSection] = useState();
  const [editSubSection, setEditSubSection] = useState();
  const [viewSubSection, setViewSubSection] = useState();

  const [confirmationModal, setConfirmationModal] = useState();

  console.log("Printing the course from auth state-->", course);

  // delete wala button
  const handleDeleteSection = async(sectionId) => {
    const result = await handleDeleteSection({
      sectionId,
      courseid:course._id,
      token 
    });
    if(result){
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  };

  // Delete SubSection
  const handleDeleteSubSection = async(subSectionId, sectionId) => {

    // api call 
    const result = await handleDeleteSubSection({subSectionId,sectionId,token});

    // if result get success then Update the Course
    if(result){
      dispatch(setCourse(result));
    }

    // modal la band kel 
    setConfirmationModal(null);

  };

  return (
    <div>
      <div className="mt-10">
        {/* <RxDropdownMenu color="white" className="hover:cursor-pointer" /> */}

        {course.courseContent.map((section) => {
          return (
            <details key={section._id} open>
              {/* by default open thevne ahe details--> tag la   */}
              <summary className="flex items-center justify-between gap-x-3  border-white border-b-2">
                <div className="flex items-center gap-x-3">
                  {/* drop down icon  */}
                  <RxDropdownMenu
                    color="white"
                    className="hover:cursor-pointer"
                  />

                  <p className="text-white">{section.sectionName}</p>
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
                        btn2Handler: () => setConfirmationModal(null),
                      });
                    }}
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <span>|</span>

                  {/* icon */}
                  <TiArrowSortedDown className="text-xl text-richblack-300" />
                </div>
              </summary>
              {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */}
              {/* subSection */}
              <div>
                {section.subSection.map((data) => {
                  return (
                    <div
                      key={data?._id}
                      onClick={() => setViewSubSection(data)}
                      className="flex items-center justify-between gap-x-3 border-b-2 "
                    >
                      <div className="flex items-center gap-x-3">
                        {/* drop down icon  */}
                        <RxDropdownMenu
                          color="white"
                          className="hover:cursor-pointer"
                        />

                        <p className="text-white">{data.title}</p>
                      </div>

                      <div className="flex items-center gap-x-3">
                        {/* Edit button */}
                        <button
                          onClick={() =>
                            setEditSubSection({
                              ...data,
                              sectionId: section._id,
                            })
                          }
                        >
                          <CiEdit />
                        </button>

                        {/* delete button */}
                        <button
                          onClick={() => {
                            setConfirmationModal({
                              text1: "Delete this Sub-section",
                              text2: "Selected Leccture will be deleted ",

                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () =>
                                handleDeleteSection(section._id),
                              btn2Handler: () => setConfirmationModal(null),
                            });
                          }}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </div>
                  );
                })}
                {/* lecture add krnysathi add lecture che button pahije  */}
                <button
                  onClick={setAddSubSection(section._id)}
                  className="mt-4 flex items-center gap-x-2 text-yellow-50"
                >
                  <AiOutlinePlus />
                  <p>Add Lecture</p>
                </button>
              </div>
            </details>
          );
        })}
      </div>

      {/* Now only Modal section is leave --> created Below */}

      {/*addsubsection madhe jr data asel tr ==> SubSection Modal component show kr   */}


      {/* Modal Creation */}
      {addSubSection ? (
        <SubSectionModal
          modaldata={addSubSection}
          setModaldata={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modaldata={viewSubSection}
          setModaldata={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modaldata={editSubSection}
          setModaldata={setEditSubSection}
          edit={true}
        />
      ) : (
        <div> </div>
      )}

      {/* we have to render the confirmation modal ==> we have to check if the data is present then render the modal   */}

       {
        confirmationModal ? 
        (<ConfimationModal modaldata={confirmationModal}/> ) 
        :(<div> </div>)
       }

    </div>
  );
};

export default NestedView;
