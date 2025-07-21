import React from 'react'

const IconBtn = ({
    text,
    onClick,  // ✅ Corrected from "onCllick"
    children,
    disabled,
    outline = false,
    customClasses,
    type


}) => {
  
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center ${
                outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
              } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
              type={type}

        >

            {children ? (
                <>
                    <span className={`${outline && "text-yellow-50"}`}>
                        {text}
                    </span>
                    {children}
                </>
            ) : (
                text
            )}
        </button>
    )
}

export default IconBtn;
