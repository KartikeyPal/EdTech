import React, { useEffect, useState } from 'react'

const RequirementField = ({name,label,register,errors,setValue,getvalues}) => {
    const [requirement,setRequirement]  = useState("");
    const [requirementList,setrequirementList] = useState([]);

    useEffect(()=>{
        register(name,{required:true,validate:(value)=>value.length>0})
    },[]);

    useEffect(()=>{
        setValue(name,requirementList)
    },[requirementList]);

    function handleAddRequirement(){
        if(requirement){
            setrequirementList([...requirementList,requirement]);
            setRequirement("");
        }
    }
    function handleRemoveRequirement(index){
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index,1);
        setrequirementList(updatedRequirementList);
    }
  return (
    <div>
        <label htmlFor={name}>{label}</label>
        <div>
            <input 
                type="text"
                id={name}
                value={requirement}
                onChange={(e)=>setRequirement(e.target.value)}
                className='w-full text-richblack-900'
            />
            <button onClick={handleAddRequirement} type='button' className='bg-yellow-25 text-richblack-900 rounded-md p-2 my-2   '    >
                Add Requirement
            </button>
        </div>
        {
            requirementList.length && (
                <ul className='gap-3 flex'>
                    {
                        requirementList.map((ele,ind)=>(
                            <li key={ind} className='gap-2 justify-evenly flex'>
                                <span>{ele}</span>
                                <button type='button' onClick={()=>handleRemoveRequirement(ind)}>Remove</button>
                            </li>
                        ))
                    } 
                </ul>
            )
        }
        {
            errors[name] && (
                <span>{label} is required** </span>
            )
        }

    </div>
  )
}

export default RequirementField