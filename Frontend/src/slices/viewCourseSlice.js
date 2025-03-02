import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    CompletedLecture: [],
    totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers:{
        setCourseSectionData: (state,action)=>{
            state.courseSectionData = action.payload;   
        },
        setCourseEntireData: (state,action)=>{
            state.courseEntireData  = action.payload;
        },
        setCompletedLecture:(state,action)=>{
            state.CompletedLecture = action.payload;
        },
        updateCompletedLecture:(state,action)=>{
            state.CompletedLecture = [...state,action.payload];
        },
        setTotalNoOfLecture: (state,action)=>{
            state.totalNoOfLectures = action.payload;
        },
    },
});

export const {
    setCourseSectionData,
    setCourseEntireData,
    setCompletedLecture,
    updateCompletedLecture,
    setTotalNoOfLecture,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer