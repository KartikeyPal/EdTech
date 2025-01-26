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
    <div >
        <div className='flex flex-row '>
          <div className='flex flex-row gap-8 text-[#6E727F] font-inter  w-[50%] '>
            <div className='flex flex-col gap-3 w-[32%] text-sm'>
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
            <div className='flex flex-col gap-3 w-[32%] text-sm mt-1'>
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
            <div className='flex flex-col gap-3 w-[32%] text-sm mt-1'>
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
          <div className='flex flex-row gap-8 text-[#6E727F] font-inter ml-8 w-[50%] pl-11 border-l'>
            {FooterLink2.map((element, index) => (
              <div className='flex flex-col gap-3  text-sm' key={index}>
                 <p className='text-[#AFB2BF]  text-[16px] font-semibold '>{element.title}</p>
                {element.links.map((ele, ind) => (
                  <Link className='flex flex-col hover:text-white ' to={ele.link} key={ind}>{ele.title}</Link>
                ))}
              </div>
            ))}
          </div>  
        </div>
        <div className='border-solid border-[1px] border-b text-[#2C333F] mt-9'></div>
    </div>
  );
}

export default Footer;