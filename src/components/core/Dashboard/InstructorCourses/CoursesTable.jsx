import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {COURSE_STATUS} from "../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";
import {deleteCourse, fetchInstructorCourses} from '../../../../services/operations/courseDetailsAPI';

import { Table, Thead, Tr, Th, Tbody, Td } from "react-super-responsive-table";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
// import {setCourse} from '../../../../slices/courseSlice.js'

export default function CoursesTable({ courses, setCourses }) {

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // delete course
  const handleCourseDelete = async(courseId) => {
    setLoading(true);
    await deleteCourse({courseId:courseId},token);
    const result = await fetchInstructorCourses(token);
    if(result){
      setCourses(result);  // setcourses ya UseState madhe result la add krt ahe 
    }
    setConfirmationModal(null);
    setLoading(null);
  };

  return (
    // here React Super Resonsive table libraryt is usedd -->npm i react-super-responsive-table
    <div className="text-richblack-25 ">
      <Table className="border">

        <Thead>
          <Tr className=" ">
            <Th className="w-[50%]">Courses</Th>
            <Th className=" flex">Duration</Th>
            <Th>Price </Th>
            <Th>Actions</Th>
          </Tr>

        </Thead>
       

        {/* Body start here  */}

        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td> No Courses Found </Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id}
                className=" gap-x-10 border-richblack-800 p-8 "
              >
                {/* First column -- img,title,desc,createdat , status */}

                <Td className="flex gap-x-4 p-4">
                  <img
                    src={course?.thumbnail}
                    height={"140px"}
                    width={"220px"}
                    alt="Thumnail Img "
                    className="rounded-lg object-cover"
                  />

                  <div className=" flex flex-col ">
                    <p> {course.courseName}</p>

                    <p>{course.courseDescription}</p>

                    <p>Created : </p>

                    {/* status la condition rendering lavli 
                                            1. if Course status is Drafted then show it in Pink color 
                                            2. if status is published then show published and yellow color 
                                             */}

                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="text-pink-50"> DRAFTED </p>
                    ) : (
                      // TODO-- Add right tick icon 
                      <p className="text-yellow-100"> PUBLISHED </p>
                    )}
                  </div>
                </Td>

                {/* Duration Row  */}
                <Td  >
                  <p> 2hr 30min </p>
                </Td>

                {/* price */}
                <Td > ₹ {course.price} </Td>

                <Td className="space-x-4 w-auto">
                  {/* edit button */}
                  <button
                    disabled={loading} // jr loading chi value true hoti tevha button la disabled karun tak
                    // onClick={()=>{Navigate('/edit')}} TODO---
                  >
                    Edit
                  </button>

                  {/* delete button */}
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: " Do you want to delete this course",
                        text2:
                          "All the date related to this courese will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        // if we click on Cancel then close the Modal by detting the value null
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                  >
                    Delete
                    {/* add ICON */}
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {/*jr confirmation modal cha data exist krt asel tr ch confimation Modal display hoil   */}
      {
      confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }
    </div>
  );
}
