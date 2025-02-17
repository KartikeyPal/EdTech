import React, { useDebugValue, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../../common/IconButton'
import { GrAddCircle } from "react-icons/gr"; 
import { useDispatch, useSelector } from 'react-redux';
import { BiRightArrow } from "react-icons/bi";
import { setCourse, setEditCourse ,setStep} from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';
const CourseBuilderForm = () => {
  const [editSection, setEditSection] = useState(null);
  const {course}= useSelector(state=>state.course)
  console.log(course);
  const dispatch = useDispatch();
  const [loading,setLoading]  = useState(false);
  const token = useSelector(state=>state.auth);
  const{
    register,
    setvalue,
    getvalues,
    handleSubmit,
    formState:{errors}
  } = useForm();

  function cancelEdit(){
    setEditSection(null);
    setvalue("sectionName",""); 
  }
 async function onSubmit(data){
    setLoading(true);
    if(editSection){
      const res = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSection,
        courseId: course._id,

      },token)
    }
    else{
      const res = await createSection({
        sectionName: data.sectionName,
        sectionId: editSection,
        courseId: course._id,
      },token)
    }

    if(res){
      dispatch(setCourse(res));
      setEditSection(null);
      setvalue("sectionName", "");
    }



    setLoading(false);
  }
  function goBack(){
    dispatch(setStep(1)); 
    dispatch(setEditCourse(true));
  }

  function goToNext(){
    if(course.courseContent.length===0){
      toast.error("please add atleast one section");
      return;
    }
    if(course.courseContent.some((section)=>section.subSection.length===0)){
      toast.error("please add atleast one lecture in the section")
      return;
    }
    dispatch(setStep(3)); 
  }
  const handleChangeEditSectionName = (sectionId,sectionName)=>{
    if(editSection ===sectionId){
      cancelEdit();
      return;
    }
    setEditSection(sectionId);
    setvalue("sectionName",sectionName)
  }
  return (
    <div>
      <p>Course Builder</p>
      <form  onSubmit={handleSubmit(onSubmit)}>
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
          <div className='mt-10 flex w-full '>
            <IconButton
            type="submit"
            text={`${editSection ? "Edit Section" : "Create Section"}`}
            outline={true} 
            customClasses={"text-richblack-900 p-2 rounded-md bg-yellow-25 flex items-center gap-2 hover:scale-95 "}
            >
              <GrAddCircle/>
            </IconButton>

            {editSection && (
              <button
              type='button'
              onClick={cancelEdit}
              className='text-sm text-richblack-300 underline'>
                Cancel Edit
              </button>
            )}
          </div>
        </div>
      </form>
      {course?.courseContent?.length > 0 && (
        <  NestedView handleChangeEditSectionName={handleChangeEditSectionName}></NestedView>
      )}
      <div className='flex gap-1 justify-end'>
        <button onClick={goBack} className='rounded-md cursor-pointer flex items-center'>back</button>
        <IconButton text="next" onClick={goToNext}>
          <BiRightArrow />
        </IconButton>
      </div>




    </div>
  )
}

export default CourseBuilderForm