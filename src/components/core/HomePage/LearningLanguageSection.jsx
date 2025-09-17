import React from 'react'
import HighLightText from './HighLightText'
import Know_you_progress from '../../../assets/Images/Know_your_progress.png';
import compare_with_other from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from '../HomePage/Button'
const LearningLanguageSection = () => {

  return (
    <div className=' mt-[140px]'>

        <div className='flex flex-col gap-5 items-center'>

            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife for 
                <HighLightText  className="text-4xl font-bold bg-gradient-to-tr from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent" text={"Learning any language"}/>
            </div>

            <div className='text-center text-richblack-600 text-base font-medium w-[70%] ' >
             Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>


            {/* hit and trial is required  */}
            <div className='flex flex-col items-center  justify-center md:flex-row mt-5'>

                <img src={Know_you_progress} alt={Know_you_progress}
                className='object-contain -mr-30 md:-mr-32' />

                <img src={compare_with_other} alt={compare_with_other}
                className='object-contain -mt-12 md:m-0' />

                <img src={Plan_your_lesson} alt={Plan_your_lesson}
                className='object-contain -ml-34 -mt-16 md:-ml-32' />

            </div>

            <div className='mb-7'>
                <CTAButton active={true} linkto>
                    Learn more
                </CTAButton>
            </div>


        </div>
        
    </div>

  )
}

export default LearningLanguageSection