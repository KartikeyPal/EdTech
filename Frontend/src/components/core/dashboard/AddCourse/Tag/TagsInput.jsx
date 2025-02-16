import React, { useEffect, useState } from 'react'

const TagsInput = ({label,name,placeholder,register,errors,setValue,getValues}) => {
    const   [tags,setTags] = useState([]);
    const addTags = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            setTags([...tags, e.target.value]);
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
        <div className=" w-full bg-richblack-700 rounded-t-md p-3" >
            <ul className='flex gap-3 '>
                {tags.map((tag, index) => (
                    <li key={index} className='space-x-2 p-2 border-yellow-25 border-[1px] h-7 mb-3 flex text-center items-center rounded-lg text-richblack-900 bg-yellow-25'>
                        <span>{tag}</span>
                        <button className='tag-close-icon'
                                onClick={() => removeTags(index)}
                                onKeyDown={(e) => checkKeyDown(e)}
                        >
                        x
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                <label htmlFor="tag">{label}</label>
                <input
                    name={name}
                    type="text"
                    id={name}
                    onKeyUp={e => addTags(e)}
                    placeholder={placeholder}
                    className='w-full text-richblack-800'
                    
                /> 
                {
                    errors.courseTag && (
                        <span>At least one tag is required</span>
                    )
                }

            </div>
        </div>
  )
}

export default TagsInput