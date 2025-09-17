import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

import TimelineImage from "../../../assets/Images/TimelineImage.png"

const TimeLineSection = () => {

    const timeline = [
        {
            logo:logo1,
            heading:"Leadership",
            Description:"Fully Commited to the success company "
        },
        {
            logo:logo2,
            heading:"Responsibility",
            Description:"Students will always be our top priority "
        },
        {
            logo:logo3,
            heading:"Flexibility",
            Description:"The ability to switch is an important skills"
        },
        {
            logo:logo4,
            heading:"Solve the Problem",
            Description:"code Your way to solution"
        },
    ]
  return (
    <div className='w-full'>
        <div className='flex flex-col w-full h-auto md:flex-row gap-10'>
            {/* left div */}
            <div className='w-full h-auto sm:w-[45%] flex  flex-col  gap-5 '>
                {
                    timeline.map((element,index)=>{
                        return(
                            <div className=' w-full h-auto flex flex-row gap-6 ' key={index} >
                                {/* LEFT SIDE */}
                                {/* left logo div */}
                                <div className='w-[50px] h-[50px] bg-white flex items-center justify-center'>
                                    <img src ={element.logo} alt='Logo'/>

                                </div>

                                {/* right heading and paragragph div */}
                                <div className='w-full h-auto' >
                                    <h2 className='font-semibold text-[18px]'>
                                        {element.heading}
                                        
                                    </h2>
                                    <p className='w-full text-base '>{element.Description} </p>
                                </div>

                            

                            </div>
                        )
                    } )
                }

            </div>

            {/* Right img wala part  */}
                <div className='relative shadow-blue-200 mb-10 '>
                    <img src={TimelineImage} alt={TimelineImage}
                    className='shadow-white object-cover h-fit'
                    />

                    {/* overlap karyche te Absolute Position ghyaychi  */}
                    <div className=' flex flex-row absolute bg-caribbeangreen-700 text-white uppercase py-6 left-[50%] translate-x-[-50%] translate-y-[-50%] '>

                        <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                            <p className='font-bold  text-3xl'>10</p>
                            <p className='text-caribbeangreen-300 text-sm'>Year of Experience</p>

                        </div>

                        <div className='flex gap-5 items-center px-7 ' >
                            <p className='font-bold  text-3xl'> 250 </p>
                            <p className='text-caribbeangreen-300 text-sm'> Type of Courses </p>
                        </div>

                    </div>
                </div>
        </div>

    </div>
  )
}

export default TimeLineSection