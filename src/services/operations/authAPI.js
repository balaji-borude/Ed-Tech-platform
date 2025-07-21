import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"


//import { useNavigate } from 'react-router-dom';

const { 
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints 

// send otp function here 
export function sendOtp(email, navigate) {

  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));

    // console.log("Entering in ")
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        //checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE.-->", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// signup function 
export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
    
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      },{ withCredentials: true,  // ✅ Add this here  for using api call with credential 
        })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed");
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

//Login function 
export function login(email, password, navigate) {

  return async (dispatch) => {

    const toastId = toast.loading("Loading...");

    dispatch(setLoading(true));   // loading la true kel ahe 

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });


      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful");

      dispatch(setToken(response.data.token));

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));

      // one Error found :-->
      // user la pn local storage madhe add kele karan --> UI wr Login and signup button disat navhte --> session storage.clear kelyavr disata hote --> mhanje user la local storage madhe add kelel navhte 
      
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");


    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }

    // what ever happen in uppe code lastly closed the loading toast 
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// get reset password Token
export function getPasswordResetToken(email, setEmailSent) {

  return async (dispatch) => {

    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true)); 

    console.log("Entering in Forgot passwprd Token funtion frontend ");

    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })
      // in our Backend--> ResetPasswordToken Controoller we only get email from req.body --> that why we only pass email while hitting req.

      console.log("RESETPASSTOKEN RESPONSE............", response)

      //check if any error ocuur from B.E
      // if (!response.data.success) {
      //   throw new Error(response.data.message)
      // }

      setEmailSent(true);
      toast.success("Password Reset Email Sent")


    } catch (error) {
      console.log("RESETPASSTOKEN ERROR.........", error)
      toast.error("Failed To Send Reset Email for resetting password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

// reset Passsword func
export function resetPassword(password, confirmPassword, token, navigate) {
 
  return async (dispatch) => {

    console.log("eentering in ResetPassword func --> frontend");
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
    try {
      // api connector Axios cha instance ghrltela ahe 
      // POST methos usekeli ahe 
      // RESETPASSWORD_API --> HE apis file madhun import kele ahe 
      // Backend madhe ResetPassword controller madhe req.body madhun kay kay ghetle te yethin req.body madhe pathvayche ahe --> password ,confirmPassword , token --> ya tin goshti pass kelya ahe  
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      console.log("RESETPASSWORD RESPONSE======>", response);

      // jr status false ale te error throw kra  
      if (!response.data.success) {
        console.log("getting in failed response from DB")
        throw new Error(response.data.message)
        
      }

      toast.success("Password Reset Successfully")
      navigate("/login"); // navigate to login route

    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)

    dispatch(setLoading(false)); // wr loding la true kele hote tyala false kele 
  }
}


// logout zalyavr konty functionaliyt remove karayche 
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user");

        // Optionally, force a page reload to clear session data
        window.location.reload();

    toast.success("Logged Out")
    navigate("/")
  }
}