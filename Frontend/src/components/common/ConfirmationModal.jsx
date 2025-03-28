import React from 'react'
import IconButton from './IconButton'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='text-white  z-30'>
        <div>
            <p className='font-bold text-2xl text-richblue-100'>{modalData.text1}</p>
            <p className='font-semibold text-richblack-50'>{modalData.text2}</p>    
            <div className=' flex flex-row gap-3'>
                <IconButton 
                    onClick = {modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                    customClasses={"bg-yellow-25 p-2 text-richblack-900 mt-2 rounded-lg"}
                />
                <IconButton 
                    onClick={modalData?.btn2Handler} 
                    text={modalData?.btn2Text}
                    customClasses={"mt-2 bg-richblack-25 text-richblack-900 p-2 rounded-lg"}
                />
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal;
