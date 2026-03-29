import React, { useEffect, useState } from 'react'
import {NavbarLinks} from '../../../data/navbar-links'
import { Link, matchPath,useLocation } from 'react-router-dom'
import { SiStudyverse } from "react-icons/si";
import {useSelector} from 'react-redux'
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ProfileDrowDown from '../core/auth/ProfileDropDown'
import {apiConnector} from '../../services/apiconnector'
import { categories } from '../../services/apis';
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {

    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state)=>state.cart);
    const location = useLocation(); 
    const [sublinks,setSublinks] = useState([])
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const fetchSublinks= async()=>{
        try {
                const result =await  apiConnector("GET", categories.CATEGORIES_API );
                setSublinks(result?.data?.allCategory || []);
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
    <div className='flex w-full fixed z-50 h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-800 transition-all duration-200'>
        <div className='w-11/12 flex flex-row max-w-maxContent items-center justify-between'>
            {/* Logo */}
            <Link to={"/"} onClick={() => setIsMobileMenuOpen(false)}>
              <div className='flex flex-row gap-2 items-center text-[#C5C7D4] text-xl'>
              <SiStudyverse />
                <p className='font-semibold'>Edtech</p>
              </div> 
            </Link>

            {/* Desktop NavLinks */}
            <nav className='hidden md:block'>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link,index)=>(
                            <li key={index}>
                                {
                                    link.title === "Catalog"?(
                                        <div className='flex items-center relative group cursor-pointer'>
                                            <p className='group-hover:text-yellow-25'>{link.title}</p>
                                            <RiArrowDropDownLine className='text-2xl group-hover:rotate-180 transition-transform delay-150 group-hover:text-yellow-25' />
                                            <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[15%] top-[50%] flex flex-col rounded-md bg-richblack-900 p-4 text-richblack-25 opacity-0 transition-all delay-100 group-hover:visible group-hover:opacity-100 lg:w-[260px] z-[1000] border-[1px] border-richblack-700 shadow-xl'>
                                                <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded-md bg-richblack-900 translate-x-[67%] translate-y-[-30%] border-l-[1px] border-t-[1px] border-richblack-700'>
                                                </div>
                                                <div className="relative z-10 w-full">
                                                    {sublinks?.length ? (
                                                            sublinks.map((ele,ind)=>(
                                                                <Link to={`catalog/${ele.name}`} key={ind} className="block w-full">
                                                                <div className='w-full hover:bg-richblack-800 hover:text-richblack-5 rounded-lg p-3 transition-colors duration-200'>{ele.name}</div>
                                                                </Link>
                                                            ))
                                                    ) : (<div className="text-center p-2 text-richblack-200">No categories</div>)}
                                                </div>
                                            </div>
                                        </div>
                                    ):(
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path)? "text-yellow-25" : "text-richblack-25"} hover:text-yellow-50 transition-colors duration-200`}> 
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

            {/* Desktop Auth & Cart */}
            <div className='hidden md:flex gap-4 items-center'>
                    {
                        user && user.accountType !== "Instructor" &&  (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart className='text-richblack-100 hover:text-white text-2xl transition-colors duration-200'/>
                                {
                                    totalItems > 0 && (
                                        <span className='absolute -top-1 -right-2 text-[10px] font-bold bg-yellow-100 text-richblack-900 rounded-full px-1 py-[1px] leading-none min-w-[16px] text-center'>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }

                    {
                        token === null &&(
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:bg-richblack-700 hover:text-white transition-all duration-200 text-sm'>
                                    Login
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null &&(
                            <Link to="/Signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:bg-richblack-700 hover:text-white transition-all duration-200 text-sm'>
                                    Signup
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDrowDown/>
                    }
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4">
               {
                    user && user.accountType !== "Instructor" &&  (
                        <Link to="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart className='text-richblack-100 hover:text-white text-2xl transition-colors duration-200'/>
                            {
                                totalItems > 0 && (
                                    <span className='absolute -top-1 -right-2 text-[10px] font-bold bg-yellow-100 text-richblack-900 rounded-full px-1 py-[1px] leading-none min-w-[16px] text-center'>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
               }
               {token !== null && <div className="scale-90"><ProfileDrowDown/></div>}
               <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-richblack-100 text-2xl focus:outline-none">
                    {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
               </button>
            </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
            <div className="absolute top-[56px] left-0 w-full bg-richblack-800 border-b border-richblack-700 flex flex-col shadow-lg md:hidden z-50 animate-slideDown">
                <nav className="flex flex-col w-full py-4 px-6 gap-4">
                    {NavbarLinks.map((link, index) => (
                        <div key={index} className="w-full">
                            {link.title === "Catalog" ? (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center text-richblack-25 font-medium">
                                        <p>{link.title}</p>
                                        <RiArrowDropDownLine className="text-2xl" />
                                    </div>
                                    <div className="flex flex-col pl-4 gap-2 border-l border-richblack-700 ml-2 mt-1">
                                        {sublinks?.length ? (
                                            sublinks.map((ele, ind) => (
                                                <Link 
                                                    to={`catalog/${ele.name}`} 
                                                    key={ind} 
                                                    className="text-richblack-100 hover:text-white text-sm"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {ele.name}
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-richblack-300 text-sm">No categories</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <Link 
                                    to={link?.path} 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block w-full font-medium ${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}
                                >
                                    {link.title}
                                </Link>
                            )}
                        </div>
                    ))}

                    {/* Mobile Auth Buttons */}
                    {token === null && (
                        <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-richblack-700">
                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <button className="w-full border border-richblack-700 bg-transparent py-2 text-richblack-100 rounded-md hover:bg-richblack-700 transition-all text-center">
                                    Login
                                </button>
                            </Link>
                            <Link to="/Signup" onClick={() => setIsMobileMenuOpen(false)}>
                                <button className="w-full bg-yellow-50 text-richblack-900 py-2 rounded-md hover:bg-yellow-25 transition-all text-center font-medium">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        )}
    </div>
  )
}

export default Navbar

