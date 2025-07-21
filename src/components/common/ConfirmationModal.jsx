import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData = {} }) => {

    
  return (

    // This div covers the entire screen (acts as a backdrop).
    // fixed inset-0 → Positions it across the full screen.
    // z-[1000] → Ensures it appears on top of other elements.
    // bg-black bg-opacity-50 → Adds a semi-transparent black overlay behind the modal.
    // backdrop-blur-sm → Blurs the background slightly.

    <div className="fixed inset-0 z-[1000]  grid place-items-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
 
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">

        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>

        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-x-4">
          <IconBtn onClick={modalData?.btn1Handler} text={modalData?.btn1Text} 
          className="text-white"/>

          <button
            onClick={modalData?.btn2Handler}
            className="cursor-pointer rounded-md bg-richblack-200 py-2 px-5 font-semibold text-richblack-900"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
