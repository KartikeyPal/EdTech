import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/dashboard/Sidebar'

const Dashboard = () => {
    const { loading: authLoading, loading: profileLoading } = useSelector((state) => state.auth);

    if (profileLoading || authLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex  text-white bg-richblack-900 w-full '>
            <div className='w-[14%] flex mt-10'>
            <Sidebar />
            </div>
            <div className='w-[86%] bg-richblack-900 flex justify-center'>
                <Outlet/>
            </div>
        </div>
    );
}

export default Dashboard
