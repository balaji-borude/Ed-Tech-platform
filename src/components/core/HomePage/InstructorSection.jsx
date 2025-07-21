import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighLightText from './HighLightText';
import CTAButton  from './Button'
import { FaArrowRight } from 'react-icons/fa';



const InstructorSection = () => {
  return (
    <div className='mt-16 mb-32'>
        <div className='flex flex-row gap-20 items-center'>
          {/* left div img wla div */}
          <div className='w-[50%]'>
              <img src={Instructor} alt='aunty img' />
          </div>

          {/* Right div */}
          <div className='w-[50%] flex flex-col gap-10 '>
            <div className='text-4xl font-semibold w-[50%] text-white'>
              Become an 
              <HighLightText text={"Instructor"}/>
            </div>

            <p className='font-medium text-[16px] w-[80%] text-richblack-300 '> 
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.

            </p>

            {/* button */}
            <div className='w-fit'>
              <CTAButton active={true} linkto={"/signup"} >
                <div className='flex flex-row  items-center gap-4 fit-c'>
                  Start Teaching today
                  <FaArrowRight/>
                </div>
              </CTAButton>
            </div>


          </div>

        </div>
    </div>
  )
}

export default InstructorSection