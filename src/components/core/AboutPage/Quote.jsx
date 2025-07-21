import React from 'react'
import HighLightText from '../HomePage/HighLightText'
import { FaQuoteLeft,FaQuoteRight } from "react-icons/fa";
const Quote = () => {
  return (
    <div className='mb-28'>
      <div className="relative flex flex-col items-center text-center">
        <FaQuoteLeft className="absolute -top-4 -left-2 text-2xl text-gray-500" />
        
        <p className="font-inter text-4xl text-gray-300 px-6">
           We are passionate about revolutionizing the way we learn. Our innovative platform  
          <HighLightText text="combines technology" className="text-[#1FA2FF] font-bold" />,  
          <HighLightText text="expertise" className="text-[#F98A3F] font-bold" />,  
          and community to create an  
          <HighLightText text="unparalleled educational experience." className="text-[#FFBA08] font-bold" />
        </p>
        
        <FaQuoteRight className="absolute bottom-0 right-64 text-2xl text-gray-300" />

      </div>

    </div>
  )

}

export default Quote