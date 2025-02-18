import React, { useEffect, useState } from 'react'

const TagsInput = ({label,name,placeholder,register,errors,setValue,getValues}) => {
    const   [tags,setTags] = useState([]);
    const addTags = (e) => {
        let s=e.target.value.trim();
        if ((e.key === "Enter" || e.key ===","  || e.key === " ") && (s !== "")) {
        if(e.key===",")s=s.slice(0,-1);
            setTags([...tags,s]);
            e.target.value = "";
            console.log(tags);
        }
    };
    useEffect(()=>{
        register(name,{required:true,validate:(value)=>value.length>0})
    },[]);
    useEffect(()=>{
        setValue("courseTag",tags)
    },[tags])

    function removeTags(index){
        const tagData =[...tags];
        tagData.splice(index,1);
        setTags(tagData);
    }
    const checkKeyDown = (e) => {
        if (e.key === 'click') e.preventDefault();
      }; 
  return (
        <div >
            <label htmlFor="tag">{label} <sup className='text-pink-300'>*</sup></label>
            <ul className='flex gap-3 flex-wrap'>
                {tags.map((tag, index) => (
                    <li key={index} className='space-x-2 p-2 border-yellow-25 border-[1px] h-7 mb-3 flex text-center items-center rounded-lg text-richblack-900 bg-yellow-25'>
                        <span>{tag}</span>
                        <button className='tag-close-icon'
                                type='button'
                                onClick={() => removeTags(index)}
                                onKeyDown={(e) => checkKeyDown(e)}
                        >
                        x
                        </button>
                    </li>
                ))}
            </ul>
              {tags.length>1 && (
                <button onClick={()=>setTags([])} className='text-xs p-2 bg-pink-800 text-white rounded-xl'>Remove all Tags</button>
              )}
            <div>
                <input
                    name={name}
                    type="text"
                    id={name}
                    onKeyUp={e => addTags(e)}
                    placeholder={placeholder}
                    className='w-full  p-2 mt-2 rounded-lg bg-richblack-700 outline-none text-richblack-5'
                    
                /> 
                {
                    errors[name] && (
                        <span className='text-pink-300 text-xs'>{name} is required</span>
                    )
                }

            </div>
        </div>
  )
}

export default TagsInput