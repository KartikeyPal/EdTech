import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold bg-gradient-to-r from-[#9CECFB] via-[#12D8FA] to-[#0052D4] text-transparent bg-clip-text'>
      {` ${text} `}
    </span>
  )
}
// #1FA2FF
export default HighlightText
// Gradient/05