import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// import { FreeMode, Pagination } from "swiper/modules"
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import CourseCard from './CourseCard'

const CourseSlider = ({Courses}) => {


  return (
    <>
      {
      Courses?.length ? (
        <Swiper
          spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-pink-200">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
