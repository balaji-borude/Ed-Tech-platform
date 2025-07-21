import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { useLocation } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const {loading} = useSelector((state)=> state.auth);

    const [showPassword,setShowPassword]= useState(false);
    const [showConfirmPassword,setShowConfirmPassword]= useState(false);

    const dispatch = useDispatch();
    const location = useLocation();  // he 


    const[formData,setFormData]= useState({
        password:"",
        confirmPassword:""
    });
    // handle on submit function madhe password lagel na api call madhun DB madhe save karnysathi tya sathi formData madhun Password Baher kadhla 
    const {password,confirmPassword} = formData; 

    // onchange function handler 
    function handleOnChange (e){
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ))
    };



    const navigate = useNavigate(); // reset- password zalyave page la navigate pn kel pahije tysathi tyala yethech import kele ahe ani argumemnt madhe pass kele ahe resetPassword() function call madhe 

    // form submit kelayaver
    const handleOnsubmit = (e)=>{
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        // url chya paathname madhun token kadhat ahe tyasathi --> / chya basis wr split kel URL and -1 mhanje Right chi sarv string ghrtli ahe --> Tyla Token varibale madhe  stored kele 

        dispatch(resetPassword(password,confirmPassword,token,navigate));

        // dispatch hook cha use karun resetPassword functionla call kele --> he funtion service folder --> operation Folder--> reset Password function ya path wr ahe checkit out 

        // jevha mail send kela hota na tevha path sobat token send kel hote tya tokan chi bat ho rahi haii 
        //password reset Link --> http://localhost:3000/update-password/b54c372a-d575-4776-abf0-2a70024788d5 please Click this URL to reset Password
        // he Token ahe --> b54c372a-d575-4776-abf0-2a70024788d5 
    }

  return (
    <div className='text-white'>
        {
            // jr loadinng chi value true ahe tr he kra nahi tr he kra --> Ternary Operator
            loading? 
            (<div>
                loading... 
                {/* add spinneer */}
            </div>)
            :(
                <div>
                    <h1> Choose new Passsword</h1>
                    <p>Almost done. Enter your new password and youre all set</p>
                    <form onSubmit={handleOnsubmit}>
                        <label>
                            <p> New Password <sup>*</sup> </p>

                            <input
                                required
                                type={showPassword?"text":"password"}
                                name='password'
                                placeholder='Password'
                                value={password}
                                onChange={handleOnChange}
                                className='w-full p-6 bg-richblack-600 text-richblack-5'
                            />
                            <span
                            onClick={()=>{
                                setShowPassword((prev)=>!prev);
                                // prevState la negation madhe convert kele 
                                
                                // toogle karat ahe visible and invisible Password mahde 
                            }}>
                                {
                                    showPassword ? (
                                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                              ) : (
                                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                              )
                                }
                            </span>

                        </label>

                        {/*confirm password label   */}
                        <label>
                            <p> Confirm New Password <sup>*</sup> </p>

                            <input
                                required
                                type={showConfirmPassword?"text":"password"}
                                name='confirmPassword'
                                placeholder='confirmPassword'
                                className='w-full p-6 bg-richblack-600 text-richblack-5'                               
                                value={confirmPassword}
                                onChange={handleOnChange}
                            />
                            <span
                            onClick={()=>{
                                setShowConfirmPassword((prev)=>!prev);
                                // prevState la negation madhe convert kele 
                                
                                // toogle karat ahe visible and invisible Password mahde 
                            }}>
                                {
                                    showConfirmPassword ? (
                                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                              ) : (
                                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                              )
                                }
                            </span>

                        </label>

                        <button type='submit'>
                            Reset Passsword
                        </button>

                    </form>

                    {/* back to login button  */}
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

export default UpdatePassword