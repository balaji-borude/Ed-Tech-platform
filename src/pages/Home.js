import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighLightText";

import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import bgImage from "../assets/Images/bghome.svg";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";

import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div className="h-auto">
      {/* Section1 */}
      <div className="relative mx-auto mt-16 flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
        <Link to={"/signup"}>
          <div
            className="group p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit"
          >
            <div
              className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                    transition-all duration-200 group-hover:bg-richblack-900"
            >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText
            text={"Coding Skills"}
            className="text-4xl font-bold bg-gradient-to-tr from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent"
          />
        </div>

        <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* two buttons */}
        <div className="flex flex-row gap-7 mt-8 flex-wrap justify-center">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/* Video section */}
        <div className="relative  w-full max-w-5xl flex my-12  shadow-blue-200 shadow-2xl rounded-xl overflow-hidden">
          <video
            className="w-full h-auto object-cover "
            muted
            loop
            autoPlay
            playsInline
          >
            <source src={Banner} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Code Section 1 */}
        <div className="w-full px-4 ">
          <CodeBlocks
            position={"flex flex-col-reverse sm:flex-row items-center justify-between gap-8"}
            heading={
              <div className="text-3xl sm:text-4xl font-semibold leading-snug ">
                Unlock your <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}
        <div className="w-full px-4 py-8">
          <CodeBlocks
            position={"flex flex-col-reverse lg:flex-row-reverse items-center justify-between gap-8"}
            heading={
              <div className="w-full text-3xl sm:text-4xl font-semibold leading-snug lg:w-[50%]">
                Start <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>




      </div>

      {/* ExploreMore section */}
      <ExploreMore />

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700 mt-20">
        <div
          style={{ backgroundImage: `url(${bgImage})` }}
          className="bgImage h-[310px]"
        >
          <div className="w-11/12 max-w-maxContent h-[150px] flex flex-col items-center justify-center gap-5 mx-auto">
            <div className="flex flex-row gap-7 text-white mt-16 flex-wrap justify-center">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-4">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                <div className="flex items-center gap-4">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-col w-full justify-center items-center space-y-10 mb-10 md:flex-row md:space-x-5 mt-[90px]">
            <div className="text-4xl font-semibold text-center md:text-left">
              <span>Get The Skills you need for a </span>
              <HighlightText
                className="text-4xl font-bold bg-gradient-to-tr from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent"
                text={"Job that’s in Demand"}
              />
            </div>

            <div className="flex flex-col gap-10 items-start text-center md:text-left">
              <div className="text-[16px] mb-5">
                The modern StudyNotion dictates its own terms. Today, to be a
                competitive specialist requires more than professional skills.
              </div>

              <CTAButton active={true} linkto={"/signup"}>
                learn more
              </CTAButton>
            </div>
          </div>

          <TimeLineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-8 bg-richblack-900">
        <InstructorSection />

        <h2 className="text-center text-white text-4xl font-semibold mt-10">
          Review from Other{" "}
          <HighlightText
            className="text-4xl font-bold bg-gradient-to-tr from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent"
            text={"learners"}
          />
        </h2>
      </div>

      {/* Rating and Review  Slider  */}
      <ReviewSlider />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
