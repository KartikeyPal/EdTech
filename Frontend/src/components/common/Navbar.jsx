import React from 'react'
import {NavbarLinks} from '../../../data/navbar-links'
import { Link, matchPath,useLocation } from 'react-router-dom'
import { SiStudyverse } from "react-icons/si";
const Navbar = () => {
    const location = useLocation(); 
    const matchRoute = (route) => {

        return matchPath({path:route}, location.pathname)

    }


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700  '>
        <div className='w-11/12 flex flex-row max-w-maxContent items-center justify-between'>
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
                                    link.title === "Catalog"?(<div></div>):(
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
            <div className='flex gap-2 items-center'>
                    
            </div>
        </div>
    </div>
  )
}

export default Navbar
