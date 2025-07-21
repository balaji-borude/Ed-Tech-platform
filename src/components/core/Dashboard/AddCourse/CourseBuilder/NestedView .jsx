import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";


const NestedView  = () => {

    const {course} = useSelector((state)=>state.auth);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    // flags we are needed 
    const[addSubSection,setAddSubSection] = useState();
    const[editSubSection,setEditAddSubSection] = useState();
    const[viewSubSection,setViewAddSubSection] = useState();
    
    const[confirmationModal,setConfirmationModal] = useState();

    return (
    <div>
        <div>
            {
                course?.courseContent?.map((section)=>{
                    return <details key={section._id} open> 
                    {/* by default open thevne ahe details--> tag la   */}
                        <summary>
                            <div>
                                <RxDropdownMenu />
                                <p>{section.sectionName} </p>

                            </div>

                        </summary>
                    </details>
                })
            }
        </div>
    </div>
  )
}

export default NestedView 