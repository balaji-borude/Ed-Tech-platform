import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';


const Dashboard = () => {

    const { loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)
  
    if (profileLoading || authLoading) {
      return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      )
    }
  
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">

      <Sidebar />

      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">

        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
            

            {/* ✔ Outlet is used in parent routes to render child components dynamically.
                ✔ It keeps the parent layout while swapping child routes inside it.
                ✔ It makes routing modular and structured for dashboard-like layouts. */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
 export default Dashboard;

