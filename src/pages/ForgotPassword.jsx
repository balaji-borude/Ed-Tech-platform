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
    <div className='text-white'>  
        {
            // PENDING --> loding chya jagi SPINNER add karayche brooo-     
            loading ? (<div> loading </div>) : (
                <div>
                    <h1>
                        {
                        !emailSend ? "Reset Your Password" : "Check Your Email"
                        }
                    </h1>

                    <p>
                        {
                            !emailSend ? "have no fear we'll email your Instructions to reset Your password. If don't have access to your email we can try account recovery " 
                            : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSend && (
                                <label>
                                    <p>Email Address</p>
                                    <input
                                        required
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </label>
                            )
                        }

                        <button type='submit'>
                            {
                                !emailSend ? "Reset Password":"Resend Email"
                            }
                        </button>
                    </form>

                    <div>

                        <Link to="/login">
                          <p> back to Login </p>
                        </Link>

                    </div>


                </div>
            )
        }

    </div>
  )
}

export default ForgotPassword