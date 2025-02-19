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
import { BiLeftArrow } from "react-icons/bi";
const CourseBuilderForm = () => {
  const [editSection, setEditSection] = useState(null);
  const {course}= useSelector(state=>state.course)
  const dispatch = useDispatch();
  const [loading,setLoading]  = useState(false);
  const {token} = useSelector(state=>state.auth);
  const{
    register,
    setValue,
    getvalues,
    handleSubmit,
    formState:{errors}
  } = useForm();

  function cancelEdit(){
    setEditSection(null);
    setValue("sectionName",""); 
  }
 const onSubmit=async(data)=>{
    setLoading(true);
    if(editSection){
      console.log("edit section")
      const res = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSection,
        courseId: course._id,
      },token)
      if(res){
        console.log("edit section res" ,res)

        dispatch(setCourse(res)); 
        setEditSection(null);
        setValue("sectionName", "");
        console.log("set value called"); 
      }
    } 
    else{
      console.log("create section")
      const res = await createSection({
        sectionName: data.sectionName,
        sectionId: editSection,
        courseId: course._id,
      },token);
      console.log("rseponse of non-edit section ",res);
      if(res){
        console.log(res);
        dispatch(setCourse(res)); 
        setEditSection(null);
        setValue("sectionName", "");
        console.log("set value called");
      }
    }
    setLoading(false);
  }
  const goBack = ()=>{
      console.log("called");
    dispatch(setStep(1)); 
    dispatch(setEditCourse(true));
  }

  function goToNext(){
    if(course?.courseContent?.length===0){
      toast.error("please add atleast one section");
      return;
    }
    if(course?.courseContent?.some((section)=>section?.subSection?.length===0)){
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
    setValue("sectionName",sectionName)
  }
  return (
    <div>
      <p className='my-4 font-bold font-inter text-2xl text-pink-300 py-2'>Course Builder</p>
      <form  onSubmit={handleSubmit(onSubmit)}>
        <div className=''>
          <label htmlFor="sectionName">Section Name <sup className='text-pink-300 '>*</sup></label>
          <input 
          type="text"
          id='sectionName'
          placeholder='Add section name'
          {...register("sectionName",{required: true})}
          className='w-full text-richblack-5  p-2 rounded-lg bg-richblack-700 outline-none my-2 '
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
              className='text-sm text-richblack-900 p-2 border ml-10 rounded-lg hover:scale-95 bg-pink-50'>
                Cancel Edit
              </button>
            )}
          </div>
        </div>
      </form>
      {course?.courseContent?.length > 0 && (
        <  NestedView handleChangeEditSectionName={handleChangeEditSectionName}></NestedView>
      )}
      <div className='flex gap-3 justify-end flex-row  items-center mb-3'>
        <button onClick={goBack} className='rounded-md cursor-pointer flex items-center border border-solid p-2 bg-yellow-25 text-richblack-900 hover:scale-95'><BiLeftArrow className='text-sm' /> back</button>
        <IconButton text="next" onClick={goToNext} customClasses={`flex items-center gap-2 border border-solid p-2 bg-yellow-25 text-richblack-900 hover:scale-95 rounded-lg`}>
          <BiRightArrow  className='text-sm'/>
        </IconButton>
      </div>


 

    </div>
  )
}

export default CourseBuilderForm