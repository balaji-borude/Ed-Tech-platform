import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import {Link} from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighLightText'

import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import bgImage from "../assets/Images/bghome.svg";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimeLineSection from "../components/core/HomePage/TimeLineSection"
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer'



const Home = () => {
  return (
    <div >
      {/*Section1  */}
      <div className='relative mx-auto  mt-16  flex flex-col w-11/12 max-w-maxContent items-center 
      text-white justify-between'>

        <Link to={"/signup"}>
            <div className=' group p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit'>
                {/* This is a button  */}
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Become an Instructor</p>
                    <FaArrowRight />
                </div>
            </div>

        </Link>

        <div className='text-center text-4xl font-semibold mt-7'>
            Empower Your Future with
            <HighlightText text={"Coding Skills"}
               className="text-4xl font-bold bg-gradient-to-tr from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent"
            />
        </div>

        <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        {/* two buttons toggle between active state */}
        <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={"/signup"}> 
                Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}> 
                Book a Demo
            </CTAButton>
        </div>

        {/* Video  */}
        <div className='mx-3 my-12 shadow-blue-200 shadow-2xl w-[800px] relative'>
            {/* <div className='absolute w-full bg-white'>

            </div> */}
            <video
                muted
                loop
                autoPlay
            >
             <source  src={Banner} type="video/mp4" />
            </video>
        </div>

        {/* Code Section 1 */}
        <div>
            <CodeBlocks 
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock Your
                        <HighlightText text={"coding potential"}/>
                        with our online courses
                    </div>
                }
                subheading = {
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={
                    {
                        btnText: "try it yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<!DOCTYPE html>
                    <html>
                        <head> <title>Example</title>
                            <link rel="stylesheet" href="styles.css">
                        </head>
                        <body>
                            <h1><a href="/">Header</a></h1>
                            <nav><a href="one/">One</a><a href="two/">Two</a>
                                <a href="three/">Three</a>
                            </nav>
                        </body>
                    </html>`}

                codeColor={"text-yellow-25"}
                backgroudGradient={"bg-custom-gradient"} 

            />
        </div>

                {/* Code Section 2 */}
        <div>
            <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Start
                        <HighlightText text={"coding "}/>
                        In seconds 
                    </div>
                }
                subheading = {
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={
                    {
                        btnText: "try it yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<!DOCTYPE html>
                    <html>
                        <head> <title>Example</title>
                            <link rel="stylesheet" href="styles.css">
                        </head>
                        <body>
                            <h1><a href="/">Header</a></h1>
                            <nav><a href="one/">One</a><a href="two/">Two</a>
                                <a href="three/">Three</a>
                            </nav>
                        </body>
                    </html>`}

                codeColor={"text-yellow-25"}
            />
        </div>

      </div>

        {/* ExploreMore section  */}
        
        <ExploreMore/>
      
        
      {/*Section 2  */}
      <div className='bg-pure-greys-5 text-richblack-700 mt-20'>
        <div style={{ backgroundImage: `url(${bgImage})`, height:'200px' }}  className="bgImage h-[310px] " >
         {/* style={{ backgroundImage: `url(${bgImage})` }}  className="bgImage h-[310px] " */}

            <div className='w-11/12 max-w-maxContent h-[150px] flex felx-col items-center justify-center gap-5 mx-auto'>
            {/* <div className='h-[150px]'></div> */}
                <div className='flex flex-row gap-7 text-white mt-16  '>

                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex items-center gap-4'>
                            Explore Full Catlog
                            <FaArrowRight/>
                        </div>
                       
                    </CTAButton>
                    <CTAButton active={false} linkto={"/ signup"}>
                        <div className='flex items-center gap-4'>
                            Learn More
                            
                        </div>
                       
                    </CTAButton>

                </div>
            </div>
        </div>

        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 '>
            <div className='flex flex-row justify-center gap-5 mb-10 mt-[90px] '>

                    <div className='text-4xl font-semibold w-[45%] '>
                        Get The Skills you nees for a 
                        <HighlightText text={"Job that in Demand"}/>
                    </div>

                    <div className='felx flex-col gap-10 w-[40%] items-start ' >
                        <div className='text-[16px]'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills
                        </div>

                        <CTAButton  active={true} linkto={"/signup"}>
                         learn more 

                        </CTAButton>
                    </div>
            </div>

                    {/* componets add kele  */}

        <TimeLineSection/>
        <LearningLanguageSection/> 
        </div>



      </div>

      {/*Section 3 */}
      <div className='w-11/12 mx-auto flex flex-col items-center justify-between gap-8 first-letter bg-richblack-900' >

      <InstructorSection/>

      <h2 className='text-center text-white text-4xl font-semibold mt-10 '> 
         Review from Other learner
      </h2>


      </div>

      {/*Footer Section  */}

          <Footer/>

    </div>
  )
}

export default Home
