import React, { useState } from 'react'

const TagsInput = () => {
    const   [tags,setTags] = useState([]);
    const addTags = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            setTags([...tags, e.target.value]);
            e.target.value = "";
            console.log(tags);
        }
    };

    function removeTags(index){
        tags.splice(index,1);
        setTags(tags);
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
            <input
                type="text"
                onKeyUp={e => addTags(e)}
                placeholder="Press enter to add tags"
                className='w-full text-richblack-800'
            /> 
        </div>
  )
}

export default TagsInput