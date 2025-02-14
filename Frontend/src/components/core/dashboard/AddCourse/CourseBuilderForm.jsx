import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../../common/IconButton'
import { GrAddCircle } from "react-icons/gr"; 
const CourseBuilderForm = () => {
  const [editSection, setEditSection] = useState(false);
  const{
    register,
    setvalue,
    getvalues,
    handleSubmit,
    formState:{errors}
  } = useForm();
  return (
    <div>
      <p>Course Builder</p>
      <form>
        <div>
          <label htmlFor="sectionName">Section Name <sup>*</sup></label>
          <input 
          type="text"
          id='sectionName'
          placeholder='Add section name'
          {...register("sectionName",{required: true})}
          className='w-full text-richblack-900'
          />
          {errors.sectionName && (
            <span>Section Name is required</span>
          )}
          <div className='mt-10'>
            <IconButton
            type="submit"
            text={`${editSection? "Edit create Section" : "Create Section"}`}
            outline={true} 
            customClasses={"text-white bg-yellow-25"}
            >
              <GrAddCircle/>
            </IconButton>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CourseBuilderForm