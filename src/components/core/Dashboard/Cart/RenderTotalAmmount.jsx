import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';

const RenderTotalAmmount = () => {
    const {total,cart} = useSelector((state)=>state.cart);


    //This function goes to Payment Intergration 
    function handleBuyCourse(){
        const course = cart.map((course)=>course._id);
        console.log("User bought This courses ", course );
        
    }

  return (
    <div>
        <p>Total:  </p>
        <p>Rs {total}  </p>

        <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses={"w-full justify-center"}
        />
    </div>
  )
}

export default RenderTotalAmmount