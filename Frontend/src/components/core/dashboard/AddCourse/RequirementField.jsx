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
        <label htmlFor={name}>{label}  <sup className='text-pink-300'>*</sup></label>
        <div>
            <input 
                type="text"
                id={name}
                value={requirement}
                onChange={(e)=>setRequirement(e.target.value)}
                className='w-full text-richblack-5 outline-none mt-2 p-2 rounded-lg bg-richblack-700'
            />
            <button onClick={handleAddRequirement} type='button' className='bg-yellow-25 text-richblack-900 rounded-md p-2 my-2   '    >
                Add Requirement
            </button>
        </div>
        {
            requirementList.length && (
                <ul className='gap-3 flex m-2'>
                    {
                        requirementList.map((ele,ind)=>(
                            <li key={ind} className='gap-2 justify-evenly flex bg-pink-50 px-1   text-sm font-inter rounded-lg text-richblack-900'>
                                <span>{ele}</span>
                                <button type='button' onClick={()=>handleRemoveRequirement(ind)} className='text-richblack-900'>X</button>
                            </li>
                        ))
                    } 
                </ul>
            )
        }
        {
            errors[name] && (
                <span className='text-pink-300 text-xs'>{label} is required </span>
            )
        }

    </div>
  )
}

export default RequirementField