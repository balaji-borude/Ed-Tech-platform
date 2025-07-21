import { useSelector } from "react-redux"
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmmount from "./RenderTotalAmmount";

export default function Cart() {

    const {total,totalItems} = useSelector((state)=>state.auth);
    // if any loginc regarding to loading is possiblke check it out 

    return(
        <div className="text-white">
            <h1> Your Carts </h1>
            <p> {totalItems} Courses in Carts  </p>

            {// if total is greater than zero then rendder Two components 
                total > 0 
                ?(
                    <div>
                        <RenderCartCourses/>
                        <RenderTotalAmmount/>
                    </div>
                )
                :(<p> Your Carts is Empty </p>)
            }
        </div>
    )

}