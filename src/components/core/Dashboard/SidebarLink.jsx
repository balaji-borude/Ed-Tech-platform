import React from 'react'
import * as Icons from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


import { resetCourseState } from "../../../slices/courseSlice";



const SidebarLink = ({link,iconName}) => {

   // const Icon =  Icons[iconName];
   // const Icon =  Icons.VscAccount;
   //const Icon = Icons[iconName] || Icons.VscQuestion; // Default to a generic icon if undefined
   const Icon = Icons[iconName];  

    const location = useLocation();// sidebar che icon and text la yellow color madhe thevayche ahe == user jya path wr mhanje sidebarcya page wr  ahe tyacha color aplyala yelllow karaycha ahe 

    const dispatch = useDispatch();
    // jya page wr sadhya ahe tya page la currnetly active dakhavyache ahe --> tyasathi matchRoute Function cha use kela ahe -- ha JS cha function ahe tyasathi useLocation() --> hook chi garaj padte 
     
    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname)
    };

    // function madhe same name function call kele ki recursion houn --> function function la call kart rahto tyamul --> code burst hotot 

  return (

    <div>

        <NavLink 
        to={link.path}
        onClick={() => dispatch(resetCourseState())}
        className={`relative  text-sm font-medium 
        transition-all duration-200`}
         // jr route match zala tr backgroud text color yellow hoil 
        >
            {/* border of sidebar left side  */}
            <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 
                    ${matchRoute(link.path) ? "opacity-100" : "opacity-0"
                    }`}
                ></span>

            {/* name and icon */}
            <div  className={`flex items-center gap-x-2 p-4 px-8 
                ${matchRoute(link.path)
            ? "bg-yellow-700 text-yellow-50 "
            : "bg-opacity-0 text-richblack-300"
        }
            transition-all duration-200`}>
                <Icon className=" text-lg"/>
                <span>{link.name} </span>
            </div>

        </NavLink>

        
    </div>
  )
}

export default SidebarLink;