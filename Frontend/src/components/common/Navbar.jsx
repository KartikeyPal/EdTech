import React, { useEffect, useState } from 'react'
import {NavbarLinks} from '../../../data/navbar-links'
import { Link, matchPath,useLocation } from 'react-router-dom'
import { SiStudyverse } from "react-icons/si";
import {useSelector} from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDrowDown from '../core/auth/ProfileDropDown'
import {apiConnector} from '../../services/apiconnector'
import { categories } from '../../services/apis';
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {

    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {totalItem} = useSelector((state)=>state.cart);
    const location = useLocation(); 
    const [sublinks,setSublinks] = useState([])

    const fetchSublinks= async()=>{
        try {
                const result =await  apiConnector("GET", categories.CATEGORIES_API );
                setSublinks(result.data.allCategory);
        } catch (error) {
            console.log("could not fetch the categories list")
        }

    }    
    useEffect(()=>{
        fetchSublinks();
    },[])

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }
    
  return (
    <div className='flex w-full fixed z-50 h-14 items-center justify-center border-b-[1px] border-b-richblack-700  bg-richblack-800'>
        <div className='w-11/12 flex flex-row max-w-maxContent items-center justify-between fixed'>
            <Link to={"/"}>
            <div className='flex flex-row gap-2 items-center text-[#C5C7D4] text-l'>
              <SiStudyverse> </SiStudyverse>
                <p className='font-semibold'>Edtech</p>
              </div> 
            </Link>
            {/* NavLinks */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link,index)=>(
                            <li key={index}>
                                {
                                    link.title === "Catalog"?(
                                    <div>
                                        <div className='flex flex-row items-center relative group'>
                                            <p>{link.title}</p>
                                            <RiArrowDropDownLine className='text-2xl' />
                                            <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[20%] top-[50%]  flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200  group-hover:visible group-hover:opacity-100 lg:w-[260px] z-10 '>
                                                <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded-md bg-richblack-5 translate-x-[67%] translate-y-[-20%]'>
                                                </div>
                                                    <div>
                                                        {sublinks?.length ? (
                                                                sublinks.map((ele,ind)=>(
                                                                    <Link to={`catalog/${ele.name}`} key={ind} >
                                                                    <div className=''>{ele.name}</div>
                                                                    </Link>
                                                                ))
                                                        ) : (<div/>)}
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    ):(
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path)? "text-yellow-25" : "text-richblack-25"}`}> 
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>

            {/* Login and Sighup  and Dashboard*/}
            <div className='flex gap-3 items-center'>
                    {
                        user && user.accountType != "Instructor" &&  (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart className='text-white text-xl'/>
                                {
                                    totalItem>0 && (
                                        <span>{totalItem}</span>
                                    )
                                }
                            </Link>
                        )
                    }

                    {
                        token === null &&(
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800  px-[12px] py-[12px] text-richblack-100 rounded-md hover:scale-95'>
                                    Login
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null &&(
                            <Link to="/Signup">
                                <button className='border border-richblack-700 bg-richblack-800  px-[12px] py-[12px] text-richblack-100 rounded-md hover:scale-95'>
                                    Signup
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !==null && <ProfileDrowDown/>
                    }
            </div>
        </div>
    </div>
  )
}

export default Navbar
