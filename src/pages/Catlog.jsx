import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/common/Footer";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { GetCatalogPageData } from "../services/operations/pageAndComponetData";
import CourseSlider from "../components/core/Catlog/CourseSlider";
import CourseCard from "../components/core/Catlog/CourseCard";

const Catlog = () => {
  const { catlogname } = useParams();

  //const [loading,setLoading] = useState(false);
  const [catalogPageData, setCatalogPageData] = useState();

  const [categoryId, setCategoryId] = useState();

  // usParams cha use karun jya category la hit kel hot frontend warun tya category che nav Url madhe ale mhanje te change zale ---> URL path change zali ki ha useEffect (()) la call kela ahe

  // fetch all category function
  useEffect(() => {
    const getCategories = async () => {
      const response = await apiConnector("GET", categories.CATEGORIES_API);

      // jo Array madhe data yeil tya tun filter kili category_id ani setcategoryId UseStaate la update kel
      // yehte filter laun category_id kadli ahe
      // const category_id = response?.data.data.filter((ct)=>ct.name.split(" ").join("_").toLowerCase()===catlogname)[0]._id;
      // update the setCategoryId
      // setCategoryId(category_id);

      const matchedCategory = response?.data?.data?.find(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catlogname
      );

      if (matchedCategory) {
        setCategoryId(matchedCategory._id);
      } else {
        console.error("No category found for:", catlogname);
      }
    };

    getCategories();
  }, [catlogname]);

  // api call
  useEffect(() => {
    const getCategoriesDetails = async () => {
      try {
        //Without below line the api get called 3,4 times due to strictMode in react
        if (!categoryId) return; // ❌ don't call API if ID is empty

        const res = await GetCatalogPageData(categoryId);

        console.log(
          "Printing the getCatlogPagedata res from catlog.jsxx file  --> ",
          res
        );
        setCatalogPageData(res); // useState la update kel
      } catch (error) {
        console.log(error);
      }
    };

    // MAIN Issue in the SLider ====> we can t make the direct call to function it cause --> Undefind value ==> which lead to not to show an slider autoplay and show undefiend while calling \
    // here --> we say if cateforyId is present then only call the functiuon --> get
    if(categoryId){
      getCategoriesDetails();

    }
  }, [categoryId]);


  // console.log("",catalogPageData?.data?.selectedCategory?.courses);
  // console.log(
  //   "Printing the data of mostSelling course",
  //   catalogPageData?.data?.mostSellingCourses
  // );
  return (
    <div className="text-richblack-25 w-11/12 mx-auto">
      {/* I am unsed {catlogname} */}
      <div>
        <p>
          {`Home / Catlog / `}
          <span className="text-yellow-100">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>

        {/* name */}
        <p>{catalogPageData?.data?.selectedCategory?.name}</p>

        {/* descriptoion */}
        <p>{catalogPageData?.data?.selectedCategory?.description}</p>
      </div>
      <div>
        {/* section1 */}
        <div>
          <div>Courses to get You started</div>

          <div className=" flex gap-x-3">
            <p> Most Popular </p>
            <p> New </p>
          </div>

          {/* course Slider componnet call kela  */}
          <div>
            <CourseSlider
              Courses={catalogPageData?.data?.selectedCategory?.courses}
            />
          </div>
        </div>

        {/* sectio2 */}
        <div>
          <p className="text-3xl"> Top Courses in {catalogPageData?.data?.differentCategory?.name}</p>
          <div>
            <CourseSlider
              Courses={catalogPageData?.data?.differentCategory.courses}
            />
          </div>
        </div>

        {/* section 3 */}
        <div>
          <p> Frequently Bought Together </p>
          <div className="py-8">

            <p className="text-pink-100"> Styles the card Properly below is card c </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 ">
              {catalogPageData?.data?.mostSellingCourses?.map(
                (course, index) => {
                  return (
                    <CourseCard
                      course={course}
                      key={index}
                      Height={"h-[400px]"}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catlog;
