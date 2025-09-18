                import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
// import { InputHandler } from 'concurrently';


const ForgotPassword = () => {
    const {loading} = useSelector((state)=>state.auth);


    // flag tyar kela 
    const[emailSend,setEmailSend] = useState(false);
    const[email, setEmail] = useState("");

    const dispatch = useDispatch();  // use in reduxtoolkit - hook 

    // submit handler 
    const handleOnSubmit =(e)=>{
       e.preventDefault();   //------->he check kr , jevha prevent default use karto tevha email jat nahi (check this out )
        dispatch(getPasswordResetToken(email,setEmailSend));
        // setEmailSend -->  email send kelyave reset Password wala page hatun --> check Your email page madhe convert zale pahije 
        // karan ki te state ahe mhanje UI update hoil 
        // B.E madhe  ...

    };

  return (
 <div className="flex min-h-screen items-center justify-center bg-richblack-900 px-4">
      {
        // PENDING --> loding chya jagi SPINNER add karayche brooo-     
        loading ? (
          <div className="text-white"> loading... </div>
        ) : (
          <div className="w-11/12 max-w-maxContentTab rounded-lg bg-richblack-800 p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-richblack-5 mb-3">
              {
                !emailSend ? "Reset your password" : "Check your email"
              }
            </h1>

            <p className="text-richblack-200 text-sm mb-6 leading-relaxed">
              {
                !emailSend
                  ? "Have no fear. We’ll email you instructions to reset your password. If you don’t have access to your email we can try account recovery."
                  : `We have sent the reset email to ${email}`
              }
            </p>

            <form onSubmit={handleOnSubmit} className="space-y-5">
              {
                !emailSend && (
                  <label className="block w-full">
                    <p className="mb-1 text-sm text-richblack-25">Email Address <sup className="text-pink-200">*</sup></p>
                    <input
                      required
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md bg-richblack-700 px-3 py-2 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
                      placeholder="Enter your email"
                    />
                  </label>
                )
              }

              <button
                type="submit"
                className="w-full rounded-md bg-yellow-50 py-2 font-semibold text-richblack-900 transition hover:bg-yellow-200"
              >
                {
                  !emailSend ? "Reset Password" : "Resend Email"
                }
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-richblack-200 hover:underline flex items-center justify-center gap-2">
                <span className="text-lg">←</span> Back to login
              </Link>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ForgotPassword