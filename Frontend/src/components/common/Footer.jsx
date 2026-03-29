import React from 'react';
import Logo from '../../../assets/Logo/Logo-Full-Light.png';
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";  
import { ImGoogle3 } from "react-icons/im";
import { FaYoutube } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FooterLink2 } from '../../../data/footer-links';
import { SiStudyverse } from "react-icons/si";

const Footer = () => {
  return (
      <div className='w-full flex flex-col justify-center bg-richblack-800 pb-14'>
            <div className='w-11/12 max-w-maxContent mx-auto mt-14 flex flex-col lg:flex-row justify-between gap-12 lg:gap-4'>
                {/* part 1 */}
                  <div className='flex flex-col sm:flex-row gap-8 sm:gap-4 text-[#6E727F] w-full lg:w-[48%] justify-between'>
                    <div className='flex flex-col gap-3 text-sm flex-1'>
                      <div className='flex flex-row gap-2 items-center text-[#C5C7D4] text-xl mb-2'>
                        <SiStudyverse />
                        <p className='font-semibold'>Edtech</p>
                      </div>  
                      <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Company</p>
                      <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">About</p>
                      <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Careers</p>
                      <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Affiliates</p>
                      <div className='flex flex-row gap-4 text-xl mt-4'>
                        <FaSquareXTwitter className="hover:text-richblack-50 cursor-pointer transition-all duration-200" />
                        <FaFacebook className="hover:text-richblack-50 cursor-pointer transition-all duration-200" />
                        <ImGoogle3 className="hover:text-richblack-50 cursor-pointer transition-all duration-200" />
                        <FaYoutube className="hover:text-richblack-50 cursor-pointer transition-all duration-200" />
                      </div>
                    </div>

                    <div className='flex flex-col gap-3 text-sm mt-1 sm:mt-0 flex-1'>
                      <p className='text-[#AFB2BF] text-[16px] font-semibold mb-2'>Resources</p>
                      <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Articles</p>
                      <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Blog</p>
                      <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Chart Sheet</p>
                      <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Code Challenges</p>
                      <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Docs</p>
                      <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Projects</p>
                      <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Video</p>
                      <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Workspaces</p>
                      
                      <div className='flex flex-col mt-6 gap-3'>
                        <p className='text-[#AFB2BF] text-[16px] font-semibold mb-2'>Support</p>
                        <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Help Center</p>
                      </div>
                    </div>

                    <div className='flex flex-col gap-8 text-sm mt-1 sm:mt-0 flex-1'>
                      <div className='flex flex-col gap-3 text-sm'>
                        <p className='text-[#AFB2BF] text-[16px] font-semibold mb-2'>Plan</p>
                        <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Paid Memberships</p>
                        <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">For Student</p>
                        <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Business solution</p>
                      </div>
                      <div className='flex flex-col gap-3 text-sm'>
                        <p className='text-[#AFB2BF] text-[16px] font-semibold mb-2'>Community</p>
                        <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Forums</p>
                        <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Chapters</p>
                        <p className="hover:text-richblack-50 cursor-pointer transition-all duration-200">Events</p>
                      </div>
                    </div>
                  </div>

                  {/* vertical border - visible only on large screens */}
                  <div className='hidden lg:block border-l border-richblack-700 h-auto mx-8'></div>

                  {/* part 2 */}
                  <div className='flex flex-col sm:flex-row flex-wrap gap-8 sm:gap-4 text-[#6E727F] w-full lg:w-[48%] justify-between pt-8 lg:pt-0 border-t border-richblack-700 lg:border-t-0'>
                        {FooterLink2.map((element, index) => (
                          <div className='flex flex-col gap-3 text-sm flex-1 min-w-[120px]' key={index}>
                            <p className='text-[#AFB2BF] text-[16px] font-semibold mb-2'>{element.title}</p>
                            {element.links.map((ele, ind) => (
                              <Link className='hover:text-richblack-50 transition-colors duration-200' to={ele.link} key={ind}>
                                  <div>{ele.title}</div>
                              </Link>
                            ))}
                          </div>
                        ))}
                  </div>  
            </div>

        <div className='w-11/12 max-w-maxContent mx-auto mt-12 mb-4'>
            <div className='border-t border-richblack-700 pt-8 flex flex-col md:flex-row justify-between items-center text-richblack-200 text-sm gap-4 md:gap-0'>
              <div className='flex flex-row gap-4'>
                <p className="hover:text-white cursor-pointer transition-colors duration-200 border-r border-richblack-700 pr-4">Privacy Policy</p>
                <p className="hover:text-white cursor-pointer transition-colors duration-200 border-r border-richblack-700 pr-4">Terms</p>
                <p className="hover:text-white cursor-pointer transition-colors duration-200">Cookie Policy</p>
              </div>
              <p className="text-center md:text-right">Made with ❤️ by Kartikey © {new Date().getFullYear()} Edtech</p>
            </div>
        </div>
      </div>
  );
}

export default Footer;