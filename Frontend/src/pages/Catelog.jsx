import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import {getCatalogPageData} from '../services/operations/pageAndComponentData';
import CourseCard from '../components/core/catelog/CourseCard';
import CourseSlider from '../components/core/catelog/CourseSlider';
const Catelog = () => {
    const {catelogName} = useParams();
    const [catelogPageData,setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState(null);   

    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.allCategory?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catelogName.toLowerCase())[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catelogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
    },[categoryId]);

  return (
    <div className='text-white mt-[60px] ' >
        <div className='flex flex-col justify-center'>
            <div className='w-full py-16 bg-richblue-900 px-40'>
                <p className='font-light text-sm mb-3'>{`Home / Catalog  /`} <span className='text-yellow-50'> {catelogPageData?.selectedCategory?.name}</span></p>
                <p className='text-3xl font-semibold text-richblack-200 py-3'>{catelogPageData?.selectedCategory?.name} Courses</p>
                <p className='text-richblack-300'>{catelogPageData?.selectedCategory?.description}</p> 
            </div>
            <div className='mx-40'>
                {/* Section 1 */}
                <div className='pt-10'>
                    <div className='text-4xl text-richblack-100 font-bold pb-3'>Courses to get you started</div>
                    {/* <div className='flex gap-x-3'>
                        <p className=''>Most Popular</p>
                        <p>New</p>
                    </div> */}
                    <CourseSlider courses={catelogPageData?.selectedCategory?.courses}/>
                </div>

                {/* section 2 */}
                <div >
                    <p className='text-4xl text-richblack-100 font-bold pb-3 mt-16'>Top Courses in {catelogPageData?.selectedCategory?.name}</p>
                    <div><CourseSlider courses={catelogPageData?.differentCategories}/></div>
                    {console.log(catelogPageData    )}
                </div>
                {/* ?section 3 */}

                <div>
                    <div className='text-4xl text-richblack-100 font-bold pb-3 mt-16'>Frequently Bought</div>
                    <div className='py-8'>
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-3'>
                                {
                                    catelogPageData?.mostSellingCourses
                                    .map((course,index)=> (
                                        <div>
                                            <CourseCard course={course} key={index} Height={"h-[400px]"}/>

                                        </div>
                                    ))
                                }
                            </div>

                    </div>
                </div>

            </div>
        </div>
        <div className='mt-16'>

        <Footer/>
        </div>
    </div>
  )
}

export default Catelog