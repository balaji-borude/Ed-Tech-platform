import rzpLogo from '../../assets/Logo/rzp_logo.png';
import {toast} from "react-hot-toast";

import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints;

// this is equivalant to the this script in html ==> <script src="https://checkout.razorpay.com/v1/checkout.js"></script> from razorpay 


// SCRIPT FUNCTION BY- RAZORPAY
function loadScript(src){
    return new Promise ((resolve)=>{
        const script = document.createElement("script");

        script.src =src;

        script.onload=()=>{
            resolve(true);
        }

        script.onerror=()=>{
            resolve(false);
        }

        document.body.appendChild(script);

    })
};


// course buy karne 
export async function buyCourse(){
    const toastId = toast.loading("Loading...");
    try{
        // load script 
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay SDK Failed To load ");

        }

        // initialize the order  --> capturePayment Function initilize the order 
        const orderResposne = await apiConnector("POST",COURSE_PAYMENT_API,
                                                            {courses},
                                                            {
                                                                Authorization:`Bearer ${token}` 
                                                            });

        if(!orderResposne.data.success){
            throw new Error(orderResposne.data.message);

        };

        // option 
        const options ={
            key:process.env.RAZORPAY_KEY,
            currency:orderResposne.data.data.currency,
            amount:`${orderResposne.data.data.amount}`,
            order_id:`${orderResposne.data.data.id}`,
            name:"StudyNotion",
            description:"Thank You For Purchasing the course",
            image:rzpLogo,
            preFill:{
              name:`${userDetails.firstName}`,
              email:`${userDetails.email}`  
            },
            handler: function(response){

            }
        }


    }catch(error){

    }
}
