import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'; // this is a array of data --> Where all links of an sidebar is stored in an array 

//import {logout} from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";
import {logout} from "../../../services/operations/authAPI";

import  SidebarLink  from './SidebarLink'; // This is an components 
import ConfirmationModal from '../../common/ConfirmationModal'


const Sidebar = () => {

    const {user,loading:profileLoading} = useSelector((state)=>state.profile);

    const {loading:authLoading} = useSelector((state)=>state.auth);

    const dispatch  = useDispatch();
    const navigate = useNavigate();

    const [confirmationModal, setConfirmationModal] = useState(null);
    
    // ya doghan paiki kahihi nasel tr loading spinner dakhav 
    if(profileLoading || authLoading){
        return(
            <div>
                {/* add spinner here  */}
                loading....
            </div>
        )
    };


  return (

    <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 '>

        <div className='flex flex-col '>

                {/* array la map funtion use kele ahhe yethe */}
                {/* array la import kelay "data" folder madhun */}
            {
                sidebarLinks.map((link)=>{
                    // data folder madhe accountType la specify kelay tethun 
                    // jr user state madhe jo account Type asel to ani data folder madla dashbord-links madla accountType match nahi kela tr kahich return karu nkoo 
                    
                    if(link.type && user?.accountType !== link.type) return null;

                    return(
                        <SidebarLink link={link} iconName={link.icon} key={link.id}/>
                    )
                })
            }

        </div>

        {/* Horizontal line  */}
        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600 '></div>

        {/* setting and its icon  */}
        <div className='flex flex-col'>

            <SidebarLink
             link={{name:"settings",path:"/dashboard/settings"}}
             iconName="VscSettingsGear"
             
            />

            <button onClick={()=>setConfirmationModal({
                 text1:"Are You sure ?",
                 text2:"You will be logged Out of Your Account",
                 btn1Text:"Logout",
                 btn2Text:"Cancel",
                 btn1Handler:()=> dispatch(logout(navigate)),
                 btn2Handler:()=>setConfirmationModal(null)
            })}
            // change kele yethe 
            className='px-8 py-2 text-sm font-medium text-richblack-300'
            >
                <div className='flex items-center gap-x-2'>
                    <VscSignOut className='text-lg'/>
                    <span> LogOut </span>
                </div>

            </button>

        </div>

          {/* Logout kelyave confirmation pop up disnysahti  */}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

    </div>
  )
}

export default Sidebar

