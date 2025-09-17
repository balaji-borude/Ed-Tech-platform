import { apiConnector } from "../apiconnector";
import {
    ratingsEndpoints
}from '../apis'
import { toast } from "react-hot-toast"

export  function getRating() {
    return async()=>{
        try{
            const response = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
            console.log("GETTING ALL REVIWS AND RATING--->",response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("ALL reviess are getted ")
        }catch(error){
                console.log("Review and rating  API ERROR............", error)
             toast.error("Login Failed")
        }
    }
}