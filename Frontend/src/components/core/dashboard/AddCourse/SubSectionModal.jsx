import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createSubSection, updateSubSection } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../slices/courseSlice';
import { RxCross1 } from "react-icons/rx";
import Upload from './Upload';
import IconButton from '../../../common/IconButton';
const SubSectionModal = ({modalData,setModalData,add=false,view=false,edit=false}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
        getValues
    } = useForm();
    const dispatch = useDispatch();
    const [loading,setLoading]  = useState(false);
    const  {course} = useSelector(state=>state.course);
    const {token} = useSelector(state=>state.auth);

    useEffect(()=>{
        if(view || edit){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDesc",modalData.description);
            setValue("lectureVideo",modalData.videoUrl);
        }
    },[]);

    const isFormUpdated=()=>{
        const currValue  = getValues();
        if(currValue.lectureTitle !== modalData.title || 
            currValue.lectureDesc !== modalData.description ||
            currValue.lectureVideo !== modalData.videoUrl 
        )return true;
        else
        return false;
    }

    const onSubmit =async (data) => {
        if(view){
            return;
        }
        if(edit){
            if(!isFormUpdated) {
                toast.error("No changes made in the form");
            }
            //Handling edit subsection
            const formData =new FormData();
            if(modalData.lectureTitle !== data.lectureTitle){
                formData.append("title",data.lectureTitle)
            }
            if(modalData.lectureDesc !== data.lectureDesc){
                formData.append("description",data.lectureDesc);
            }
            if(modalData.lectureVideo !== data.lectureVideo){
                formData.append("videoUrl",data.lectureVideo);
            }
            formData.append("subSectionId",modalData._id);
            setLoading(true);   
            const res = await updateSubSection(formData,token);
            if(res){
                const sectionInd = course?.courseContent?.findIndex(section=>section._id === modalData.sectionId);
                const subSectionId = course?.courseContent[sectionInd]?.subSection?.findIndex(subSection=>subSection._id === modalData._id);
                if(subSectionId >=0){
                    const updatedSubSections  = [...course.courseContent[sectionInd].subSection.slice(0,subSectionId),res,...course.courseContent[sectionInd].subSection.slice(subSectionId+1)];
                    
                    const updatedSection = {
                        ...course.courseContent[sectionInd],subSection: updatedSubSections,
                    };

                    const updatedCourseContent = [
                        ...course.courseContent.slice(0, sectionInd),
                        updatedSection,
                        ...course.courseContent.slice(sectionInd + 1),
                    ];
                    const updatedCourse = {
                        ...course,
                        courseContent: updatedCourseContent
                    };
                    dispatch(setCourse(updatedCourse));
                }
            }
        }
        else{
            const formData = new FormData();
            formData.append("sectionId",modalData);
            formData.append("title",data.lectureTitle);
            formData.append("description",data.lectureDesc);
            formData.append("video",data.lectureVideo);
            setLoading(true);

            const res=await createSubSection(formData,token);
            if(res){
                const index = course.courseContent.findIndex(section=>section._id === modalData)
                if(index>=0){
                    // console.log(index);
                    const courseData = [...course.courseContent.slice(0,index),res,...course.courseContent.slice(index+1),]
                    const updatedCourse ={...course,courseContent:courseData};
                    // console.log(updatedCourse);
                    dispatch(setCourse(updatedCourse));
                };
            }
    }
        setModalData(null);
        setLoading(false); 
        
    }


  return (
    <div>
        <div>
            <div className='flex gag-2 space-x-2 mb-3 p-2 w-[10rem] justify-between bg-pink-800 rounded-lg text-richblack-5 '>
                <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                <button onClick={()=>(!loading?setModalData(null) :{})}><RxCross1 /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Upload
                            name={"lectureVideo"}
                            label={"Video"}
                            setValue={setValue}
                            getValues={getValues}
                            register={register}
                            errors={errors}
                            video={true}
                            viewData={view?modalData.videoUrl : null}
                            editData={edit?modalData.videoUrl: null}
                        />
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="lectureTitle">Title <sub className='text-pink-300'>*</sub></label>
                        <input 
                            type="text" 
                            id='lectureTitle'
                            placeholder='Enter lecture Title'
                            {...register("lectureTitle",{required: true})}
                            className='w-full p-2 my-2 rounded-lg bg-richblack-700 outline-none '
                        />
                        {errors.lectureTitle && (
                            <span className='text-pink-300 text-xs'>Lecture is required</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="lectureDesc">Description <sup className='text-pink-300'>*</sup></label>
                        <textarea 
                            name="lectureDesc" 
                            id="lectureDesc"
                            placeholder='Enter Lecture Description' 
                            {...register("lectureDesc",{required:true})}
                            className='w-full min-h-[130px] p-2 my-2 bg-richblack-700 rounded-lg outline-none'
                        />
                        {errors.lectureDesc && (
                            <span className='text-pink-300 text-xs'>Description is required</span>
                        )}
                    </div>
                    {
                        !view && (
                            <div>
                                <IconButton
                                    text={loading? "loading...": edit? "Save Changes" : "Save"}
                                    customClasses={`p-2 bg-yellow-25 text-richblack-900 rounded-lg hover:scale-95`}
                                />
                            </div>
                        )
                    }
            </form>
        </div>
    </div>
  )
}

export default SubSectionModal