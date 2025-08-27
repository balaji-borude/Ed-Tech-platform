/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import ProfiledropDown from "../core/Auth/ProfiledropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { fetchCourseDetails } from "../../services/operations/courseDetailsAPI";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const { totalItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  // links
  const [subLinks, setSubLinks] = useState([]);

  // here we Hardcoded the data we need to --> replace with api response data
  // const subLinks = [
  //   {
  //       title: "python",
  //       link:"/catalog/python"
  //   },
  //   {
  //       title: "web dev",
  //       link:"/catalog/web-development"
  //   },
  // ];

  useEffect(() => {
    const fetchSubLinks = async () => {
      try {
        setLoading(true);
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        //console.log("Printing the result", result.data.data);
        setSubLinks(result.data.data);
      } catch (error) {
        console.log("Could not fetch category details", error);
      } finally {
        // ✅ Always runs (success or error)
        setLoading(false);
      }
    };

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
    if (!route) return false; // Prevent undefined errors
    return matchPath(route, location.pathname);
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/*Logo  */}
        <Link to="/">
          <img src={logo} alt="logo" width={160} height={42} loading="lazy" />
        </Link>

        {/* Navlink */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>

                      <MdOutlineArrowDropDownCircle />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        {/* small square slighly Tilted */}
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                        {/* {
                        loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )} */}

                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks.map((subLink) => (
                              <Link
                                key={subLink._id}
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                              >
                                <p className="font-semibold">{subLink.name}</p>
                                {/* <p className="text-sm text-richblack-400">{subLink.description}</p> */}
                              </Link>
                            ))}
                          </>
                        ) : (
                          <p className="text-center">No Categories Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/signup/dashboard --> buttons  */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfiledropDown />}
        </div>
        {/* TODO==> hamburger la create karayche baki ahe tyat -> Mobile responsice sathi create kraychi  */}
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
