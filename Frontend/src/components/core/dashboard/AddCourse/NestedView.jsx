import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";        
const NestedView = () => {
    const {course}=useSelector(state=>state.course);
    const {token} = useSelector(state=>state.token);
    const dispatch = useDispatch();
    const [addSubSection,setAddSubSection] = useState(null)
    const [viewSubSection,setViewSubSection] = useState(null);
    const [editSubSection,setEditSubSection] = useState(null);
    const [confirmationModal,setConfirmationModal] = null;


  return (
    <div>
        <div>
            {course?.courseContent.map((section,ind)=>(
                <details key={section._id}>
                    <summary>
                        <div>
                        <RxDropdownMenu />
                        <p>{section.sectionName}</p>
                        </div>
                    </summary>
                </details>
            ))}
        </div>
    </div>
  )
}

export default NestedView