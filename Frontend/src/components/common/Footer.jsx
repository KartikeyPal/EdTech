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
      <div className='w-full flex flex-col justify-center bg-richblack-800'>
            <div className='mx-24 mt-14 flex justify-evenly'>
                {/* part 1 */}
                  <div className='flex flex-row gap-8 text-[#6E727F] w-[49%] justify-between'>
                    <div className='flex flex-col gap-3  text-sm'>
                      <div className='flex flex-row gap-2 items-center text-[#C5C7D4] text-l'>
                      <SiStudyverse> </SiStudyverse>
                        <p className='font-semibold'>Edtech</p>
                      </div>  
                      <p>Company</p>
                      <p>About</p>
                      <p>Careers</p>
                      <p>Affiliates</p>
                      <div className='flex flex-row gap-3 text-xl text-center  '>
                        <FaSquareXTwitter />
                        <FaFacebook />
                        <ImGoogle3 />
                        <FaYoutube/>
                      </div>
                    </div>
                    <div className='flex flex-col gap-3 text-sm mt-1'>
                      <p className='text-[#AFB2BF]  text-[16px] font-semibold '>Resources</p>
                      <p>Articles</p>
                      <p>Blog</p>
                      <p>Chart Sheet</p>
                      <p>Code Challenges</p>
                      <p>Docs</p>
                      <p>Projects</p>
                      <p>Video</p>
                      <p>Workspaces</p>
                      <div className='flex flex-col mt-6 gap-3'>
                        <p className='text-[#AFB2BF]  text-[16px] font-semibold '>Support</p>
                        <p>Help Center</p>
                      </div>
                    </div>
                    <div className='flex flex-col  text-sm mt-1'>
                      <div className='flex  flex-col gap-3 text-sm'>
                        <p className='text-[#AFB2BF]  text-[16px] font-semibold '>Plan</p>
                        <p>Paid Memberships</p>
                        <p>For Student</p>
                        <p>Bussiness solution</p>
                      </div>
                      <div className='flex flex-col gap-3 w-[32%] text-sm mt-6'>
                        <p className='text-[#AFB2BF]  text-[16px] font-semibold '>Community</p>
                        <p >Forms</p>
                        <p>Chapters</p>
                        <p>Events</p>
                      </div>
                    </div>
                  </div>

                  {/* vertical border */}
                  <div className='border-solid border-richblack-300 border-2 h-[35rem] mx-10'></div>

                  {/* part 2 */}
                  <div className='flex flex-row text-[#6E727F] w-[49%] justify-between'>
                        {FooterLink2.map((element, index) => (
                          <div className='flex flex-col gap-3  text-sm' key={index}>
                            <p className='text-[#AFB2BF]  text-[16px] font-semibold '>{element.title}</p>
                            {element.links.map((ele, ind) => (
                              <Link className='flex flex-col hover:text-white ' to={ele.link} key={ind}>
                                  <div>{ele.title}</div>
                                </Link>
                            ))}
                          </div>
                        ))}
                  </div>  
          </div>

        <div className='border-solid border-[2px] border-b text-[#2C333F] my-4'></div>

        <div className='flex justify-between mx-10 my-3 p-3 w-11/12 text-richblack-200'>
          <p>terms and condition </p>
          <p>made by kartikey</p>
        </div>
      </div>
  );
}

export default Footer;