import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/common/Footer'
import { apiConnector } from '../services/apiconnector'
import { categories } from '../services/apis'
import {GetCatalogPageData} from '../services/operations/pageAndComponetData';

const Catlog = () => {

    const {catlogname} = useParams()


    //const [loading,setLoading] = useState(false);
    const[catalogPageData,setCatlogPageData] = useState(null);

    const [categoryId,setCategoryId] = useState();

    // usParams cha use karun jya category la hit kel hot frontend warun tya category che nav Url madhe ale mhanje te change zale ---> URL path change zali ki ha useEffect (()) la call kela ahe 

    // fetch all category function 
    useEffect(()=>{
        const getCategories = async()=>{
            const response = await apiConnector("GET",categories.CATEGORIES_API);

           // console.log("Printing the all categories API ", response);

            // jo Array madhe data yeil tya tun filter kili category_id ani setcategoryId UseStaate la update kel 

            // yehte filter laun category_id kadli ahe 
            const category_id = response?.data.data.filter((ct)=>ct.name.split(" ").join("_").toLowerCase()===catlogname)[0]._id;
            
            //console.log("Printing the categoryId form getAllCategories",category_id);

            // update the setCategoryId
            setCategoryId(category_id);

        }

        getCategories();
    },[catlogname]);


    // api call 
    useEffect(()=>{
        const getCategoriesDetails = async()=>{

            try {
               //Without below line the api get called 3,4 times due to strictMode in react  
                if (!categoryId) return;  // ❌ don't call API if ID is empty
                const res = await GetCatalogPageData(categoryId);
                
                console.log("Printing the getCatlogPagedata res from catlog.jsxx file  --> ",res)
                setCatlogPageData(res); // useStae la update kel 
                
            } catch (error) {
                console.log(error);
            }
        };

        getCategoriesDetails();
    },[categoryId])




  return (
    <div className='text-richblack-25'>
        I am unsed {catlogname}
        <div>
            <p>
                {`Home / Catlog`}
                <span></span>
            </p>

                {/* name */}
            <p>

            </p>
            {/* descriptoion */}
            <p> </p>
        </div>

        <div>
            {/* section1 */}
            <div>
                <div className=' flex'>
                    <p> Most Popular </p>
                    <p> new</p>
                </div>

                {/* course Slider componnet call kela  */}
                {/* <CourseSlider/> */}

            </div>

            {/* sectio2 */}
            <div>
                <p> Top Courses</p>
                <div>
                    {/* <CourseSlider/> */}
                </div>
            </div>

            {/* section 3 */}
            <div>
                <p> Frequently Bought Together </p>

            </div>


        </div>

        <Footer/>
    </div>
  )
}

export default Catlog