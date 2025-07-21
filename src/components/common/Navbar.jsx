/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfiledropDown from '../core/Auth/ProfiledropDown';
import {apiConnector} from '../../services/apiconnector'
import {categories} from '../../services/apis'

import { MdOutlineArrowDropDownCircle } from "react-icons/md";


const Navbar = () => {

  const {token} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
  const {totalitems} = useSelector((state)=>state.cart);


  // links 
  //const [subLinks,setSubLinks] = useState([]);

  // here we Hardcoded the data we need to --> replace with api response data
  const subLinks = [
    {
        title: "python",
        link:"/catalog/python"
    },
    {
        title: "web dev",
        link:"/catalog/web-development"
    },
  ];

  const fetchSubLinks = async () => {
    try {
      // api calling 
      const result = await apiConnector("GET", categories.CATEGORIES_API);

      // console.log("printing result of links",result)
      console.log("printing Sublinks data -->", result.data.showAllCategory);

      //setSubLinks(result.data.showAllCategory);

    } catch (error) {
      console.log("Could not fetch category details", error);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);





 //matchPath() is a function (likely from React Router v6).
 //It checks if the location.pathname matches the provided route.
  const location = useLocation();

//   const matchRoute = (route) => {
//     return matchPath(route, location.pathname);
// }

  // ✅ Fix: Ensure route is not undefined before using matchPath()
  const matchRoute = (route) => {
    if (!route) return false;       // Prevent undefined errors
    return matchPath(route, location.pathname);
  };


  return (
    <div className='flex h-12 items-center justify-center border-b-[1px] border-b-richblack-600 p-6'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

        {/*Logo  */}
        <Link to="/">
         <img src={logo} alt='logo' width={160} height={42} loading='lazy' />
        </Link>
  
        {/* Navlink */}
        <nav className=' gap-x-6 text-richblue-25 '>

          <ul className='flex  gap-x-5'>
            {
            NavbarLinks.map( (link, index) => (

              <li key={index}>
                 {
                     link.title === "Catalog" ? (
                         <div className='relative flex items-center gap-2 group'>

                             <p>{link.title} </p>

                             <MdOutlineArrowDropDownCircle/>

                             <div className='invisible absolute left-[50%]
                                 translate-x-[-50%] translate-y-[80%]
                              top-[50%]
                             flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                             opacity-0 transition-all duration-200 group-hover:visible
                             group-hover:opacity-100 lg:w-[300px] -mt-11 z-10'>

                                {/* This is a div of small square */}
                                 <div className='absolute left-[50%] top-0
                                 translate-x-[80%]
                                 translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                 </div>

                                 {
                                     subLinks.length ? (
                                             subLinks.map( (subLink, index) => (
                                                 <Link to={`${subLink.link}`} key={index}>
                                                     <p>{subLink.title}</p>
                                                 </Link>
                                             ) )
                                     ) : (<div></div>)
                                 }

                             </div>


                         </div>

                     ) : (
                      // this section for other navlinks exccept => Catlog link
                         <Link to={link?.path}>
                             <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                 {link.title}
                             </p>
                             
                         </Link>
                     )
                 }
             </li>
          ) )
            }
          </ul>

        </nav>

        {/* Login/signup/dashboard --> buttons  */}
        <div className='flex gap-x-4 items-center text-white'>
          {
            user && user?.accountType !== "Instructor" && (
              // classname la relative mark kele --> karan cart wr jo number yet nahi ka tyla crt chya warti thevnysathi 

              <Link to="/dashboard/cart" className='relative'>
                <AiOutlineShoppingCart />
                {
                  totalitems > 0 && (
                    <span>
                      {totalitems}
                    </span>
                  )
                }
              </Link>
            ) 
          }

          {
            token === null &&(
              <Link to="/login">
                 <button className=' border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-200 rounded-md '> 
                  log In 
                </button>
              </Link>
            )
          }
          {
            token === null &&(
              <Link to="/signup">
                 <button className=' border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-200 rounded-md ' > 
                  Sign Up
               </button>
              </Link>
            )
          } 

          {/* if token is not null means token has a value then show  ProfileDropDown page  */}
         
         {
          token !==null &&(
            <ProfiledropDown/>
          )
         }
          
        </div>


      </div>

    </div>
  )
}

export default Navbar