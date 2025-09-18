import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, FreeMode } from "swiper/modules";

import { apiConnector } from '../../services/apiconnector';
import { ratingsEndpoints } from '../../services/apis';
import ReactStars from "react-rating-stars-component";
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWord = 20;

  useEffect(() => {
    const fetchAllReviews = async () => {
      const response = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
      setReviews(response.data.data);
    };
    fetchAllReviews();
  }, []);

  return (
    <div className=" w-11/12 max-w-maxContent h-[280px] mx-auto text-white py-10 ">


      <div className="px-6">

        <Swiper
          loop={true}
          freeMode={true}
          autoplay={{ delay: 3000 }}
            // slidesPerView={"auto"}    // 👈 important 
          spaceBetween={30}   // adds space between cards
          modules={[FreeMode, Pagination, Autoplay]}
          className=" flex justify-center gap-x-20 "
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },   // mobile
            640: { slidesPerView: 1.5, spaceBetween: 20 },   // tablet
            1024: { slidesPerView: 2, spaceBetween: 30 },  // laptop
            1280: { slidesPerView: 3, spaceBetween: 30 },  // desktop
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-richblack-800  space-x-10 p-5 rounded-2xl shadow-md flex flex-col justify-between hover:scale-105 transition-transform duration-300">
                  {/* User Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={review?.user?.image}
                    alt="Profile"
                    className="w-12 h-12 object-cover rounded-full border border-yellow-400"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {review?.course?.courseName}
                    </p>
                  </div>
                </div>

                {/* Review */}
                <p className="text-sm text-gray-300 mt-4 line-clamp-3">
                  {review?.review}
                </p>

                {/* Rating */}
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-bold text-yellow-400">
                    {review?.rating?.toFixed(1)}
                  </p>
                  <ReactStars
                    count={5}
                    edit={false}
                    value={review?.rating}
                    size={20}
                    activeColor="#facc15"
                    emptyIcon={<MdOutlineStarOutline />}
                    fullIcon={<MdOutlineStarPurple500 />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;


// `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`