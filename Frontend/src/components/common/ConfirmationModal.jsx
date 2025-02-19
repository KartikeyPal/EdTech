import React from 'react'
import IconButton from './IconButton'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='text-white  z-30'>
        <div>
            <p>{modalData.text1} lskdjfal</p>
            <p>{modalData.text2}</p>    
            <div className=' flex flex-row gap-3'>
                <IconButton 
                    onClick = {modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                />
                <IconButton 
                    onClick={modalData?.btn2Handler} 
                    text={modalData?.btn2Text}
                />
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal;
