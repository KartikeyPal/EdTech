import React, { useState } from 'react'
import { sidebarLinks } from '../../../../data/dashboard-links';
import  {logOut} from '../../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'
const Sidebar = () => {
        const {user,loading: profileLoading} = useSelector((state)=>state.profile);
        const {loading: authLoading} = useSelector((state)=>state.profile);
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [confirmationModal, setConfirmationModal] = useState(null);    

        if (profileLoading || authLoading) {
            return <div className='mt-10'>Loading...</div>;
        }

  return (
    <div className='text-richblack-5'>
            <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((ele)=>{
                            if(ele.type && user?.accountType !== ele.type)return null;
                            return(
                                <SidebarLink key={ele.id} link={ele} iconName={ele.icon}/>
                            )
                        })
                    }
                </div>
                <div className='mx-auto mt-6 mb-6 h-[2px] w-10/12 bg-richblack-700'></div>
                        <div className='flex flex-col'>
                            <SidebarLink 
                                link={{ name: "Settings", path: "dashboard/settings" }}
                                iconName="VscSettingsGear"
                        />
                        <button 
                            onClick={()=>setConfirmationModal({
                                text1: "Are you sure ?",
                                text2: "You will be loged out of your account",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: ()=>dispatch(logOut(navigate)),
                                btn2Handler: ()=>setConfirmationModal(null)
                            })}
                                className='text-sm font-medium text-richblue-300 flex flex-col' 
                            >
                                <div className='text-sm font-medium px-8 py-2 text-white flex items-center gap-x-2'>
                                <VscSignOut className='text-lg' />
                                <span>Logout</span>
                                </div>
                        </button>
                </div>
            </div>
            <div className={`${confirmationModal ? "absolute bottom-[50%] left-[50%] t px-11 bg-richblack-800 py-14  z-40 bg-transparent-[50%] border border-richblack-900 rounded-md m " :""} `}>
                {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
            </div>
    </div>
  )
}

export default Sidebar
