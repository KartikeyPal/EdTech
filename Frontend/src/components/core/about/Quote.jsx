import React from 'react'
import HighlightText from '../homepage/HighlightText'

const Quote = () => {
  return (
    <div className='text-4xl w-full p-8 px-20 font-inter font-bold text-richblack-100 gap-y-11'>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={ "combines technology"}/> , <span className='text-[#FF512F]'>expertise</span> and community to create an <span  className='text-[#FF512F]'>unparalleled educational experience.</span>
    </div>
  )
}

export default Quote
