import React from 'react'
import RenderSteps from './RenderSteps';
const AddCourse = () => {
  return (
    <div className='w-11/12'>
        <div className=' mt-16 flex w-full items-start gap-x-10 justify-center ' >
            <div className='flex flex-col w-[45%] '>
                <h1 className='mb-14 text-3xl font-medium text-richblack-5'>Add Course</h1>
                <div>
                    <RenderSteps/>
                </div>
            </div>
            <div className="sticky top-10  max-w-[400px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 ">
                <p className="mb-8 text-lg text-richblack-5">⚡Code upload Tips</p>
                <ul className='ml-5  list-disc space-y-4 text-xs text-richblack-5'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default AddCourse