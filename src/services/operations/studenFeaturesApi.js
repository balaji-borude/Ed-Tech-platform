import rzpLogo from '../../assets/Logo/rzp_logo.png';
import {toast} from "react-hot-toast";

import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";


// slice reducer fucntion called here 
import {setPaymentLoading} from '../../slices/courseSlice';
import { resetCart } from '../../slices/cartSlice';

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
export async function buyCourse(token,courses,userDetails,navigate,dispatch){
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

        console.log("Printing the orderResponse",orderResposne);


        // option 
        const options ={
            key:"rzp_test_RB8kBp4YKQcINU",  //--> this is from fronedn -->  process.env.REACT_APP_RAZORPAY_KEY   --> process.env.RAZORPAY_KEY, best approach 1. Create an endpoint in backend 2. fetch in fronend;

            currency:orderResposne.data.message.currency,
            amount:`${orderResposne.data.message.amount}`,
            order_id:`${orderResposne.data.message.id}`,
            name:"StudyNotion",
            description:"Thank You For Purchasing the course",
            image:rzpLogo,
            preFill:{
              name:`${userDetails.firstName}`,
              email:`${userDetails.email}`  
            },
            handler: function(response){
                // send succesfull wala mail 

                sendPaymentSuccessEmail(response,orderResposne.data.message.amount,token);

                //verify payment 
                verifyPayment({...response,courses}, token,navigate,dispatch);
            }
        }

        console.log("Options in the buycourse function form services )FrontEnd (==> ",options);

        // option create kele tyala razorpay cha payment dialog box open karav 
        
        
        const paymentObject = new window.Razorpay(options); // window create keli open  nahi keli 

        // open keli 
        paymentObject.open();
        paymentObject.on("payment.failed",function(response){
            toast.error("OOPS, Payment Failed");
             console.log(response.error);
        })


    }catch(error){
        console.log("PAYMENT API ERROR==> ",error);
        toast.error("Could Not Able to make Payment");

    }

    toast.dismiss(toastId);

};

//email send 
async function sendPaymentSuccessEmail(response,amount,token){
    console.log("entering in the sending mail to studnet for purcheing course")    
    try {
        // send mail 
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount
        },{
            Authorization:`Bearer ${token}`
        });
        console.log("Payment succesfull Email is send ");

    } catch (error) {
        console.log("PAYMENT SUCESS EMAIL ERROR....",error);

    }
};


// verify the payment 
async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId = toast.loading("Verifying payment ...");

    dispatch(setPaymentLoading(true)); // slice mahde flage ahe tyal true  mark kel 

    try {
        const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization:`Bearer ${token}`,
        });
        
        // validation 
        if(!response.data.success){
            throw new Error(response.data.message);
        };

        toast.success("Payment Succesful, You are added to the Courses ");

        // go to the courses page 
        navigate("/dashboard/enrolled-courses");

        // 
        dispatch(resetCart());

        console.log("Verifying payment Response ",response);

    } catch (error) {   
        console.log("PAYMENT VERIFY ERROR-->",error);
        toast.error("Could not Verify the payment ");

    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
