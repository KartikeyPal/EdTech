import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";       
import { MdDelete } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { BsPlusCircle } from "react-icons/bs";
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubSection } from '../../../../services/operations/courseDetailsAPI.js';
import { setCourse } from '../../../../slices/courseSlice.js';
import ConfirmationModal from '../../../common/ConfirmationModal';
const NestedView = ({handleChangeEditSectionName}) => {
    const {course}=useSelector(state=>state.course);
    const {token} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const [addSubSection,setAddSubSection] = useState(null)
    const [viewSubSection,setViewSubSection] = useState(null);
    const [editSubSection,setEditSubSection] = useState(null);
    const [confirmationModal,setConfirmationModal] = useState(null);

    // Funtion for sections

    const handleDeleteSection=async(sectionId)=>{
        const res = await deleteSection({
            sectionId,
            courseId: course._id,
            token,
        })
        if(res){
            console.log(res);
            dispatch(setCourse(res))
        }
        setConfirmationModal(null)
    }
    


    //Function for SubSection
    const handleDeleteSubSection = async(sectionId,subSectionId)=>{
        const res = await deleteSubSection({
            sectionId,
            subSectionId,
            courseId: course._id,
            token,
        })
        if(res){
            console.log(res);
            // dispatch(setCourse(res));
        }
        setConfirmationModal(null);
    }

  return (
    <div>
        <div className='w-full flex flex-col bg-richblack-700 p-3 my-5 rounded-xl mb-9 max-w-maxContent'>
            {course?.courseContent?.map((section)=>(
                <details key={section._id} open>
                    <summary className='flex items-center justify-between gap-x-3 border-b-[1px]'>
                        <div className='flex items-center gap-x-3 '>
                        <RxDropdownMenu />
                        <p>{section.sectionName}</p>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <button onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)}>
                            <MdModeEdit />
                            </button>
                            <button onClick={()=>setConfirmationModal({
                                text1:"delete This Section",
                                text2:"All the lecture in this section will be deleted",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: ()=> handleDeleteSection(section._id),
                                btn2Handler: ()=>setConfirmationModal(null),
                                
                                })}>
                                <MdDelete />    
                            </button>
                            <span>|</span>
                            <MdArrowDropDown className={`text-4xl text-richblack-5`}/>
                        </div>
                    </summary>
                    <div>
                        {
                            section.subSection?.map((subSection)=>(
                                <div 
                                key={subSection?._id}
                                onClick={()=>setViewSubSection(subSection)} 
                                className='flex items-center justify-between gap-x-3 border-b-[1px]'
                                >   <div className='flex items-center gap-x-3'>
                                        <RxDropdownMenu />
                                        <p>{subSection.sectionName}</p>
                                    </div>
                                    <div className='flex items-center gap-x-3'>
                                        <button onClick={()=>setEditSubSection({...data,sectionId: section._id})}><MdModeEdit /></button>
                                        <button onClick={()=> setConfirmationModal({
                                            text1:"delete This Sub Section",
                                            text2:"Current lec will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: ()=> handleDeleteSubSection(subSection._id,section._id),
                                            btn2Handler: ()=>setConfirmationModal(null),
                                        })}> <MdDelete />    </button>
                                    </div>
                                </div>
                                
                            ))
                        }
                        <button 
                        className='flex items-center my-3 p-2 border border-solid bg-yellow-25 text-richblack-900 rounded-lg hover:scale-95 text-transparent bg-clip-text gap-2 font-semibold'
                        onClick={()=>setAddSubSection(section._id)}
                        >
                            <BsPlusCircle className='text-yellow-25 font-semibold'/>  Add Lecture
                        </button>
                    </div>
                </details>
            ))}
        </div>

            {
            addSubSection ?(<SubSectionModal  modalData={addSubSection}  setModalData = {setAddSubSection} add={true}/>): 
            viewSubSection?(<SubSectionModal modalData={viewSubSection} setModalData = {setViewSubSection} view={true}/>): 
            editSubSection?(<SubSectionModal modalData={editSubSection} setModalData = {setEditSubSection} edit={true}/>): 
            (<div/>)
            }
 
            {confirmationModal? (<ConfirmationModal  modalData={confirmationModal} setModalData={setConfirmationModal} /> ): (<div/>)}

    </div>
  )
}

export default NestedView