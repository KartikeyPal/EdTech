import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import {getCatalogPageData} from '../services/operations/pageAndComponentData';
const Catelog = () => {
    const {catelogName} = useParams();
    const [catelogPageData,setCatelogPageData] = useState();
    const [categoryId,setCategoryId] = useState("");   

    useEffect(()=>{
        const getCatagories = async()=>{
            const res = await apiConnector('GET',categories.CATEGORIES_API);
            const category=  res?.data?.allCategory.filter((ct)=>ct.name.split(" ").join("-").toLowerCase()===catelogName.toLowerCase());
            setCategoryId(category[0]);
            console.log(categoryId._id);
        }
        getCatagories();
    },[catelogName])

    useEffect(()=>{
        const getCatagoryDetails = async()=>{
            try {
                const res = await getCatalogPageData(categoryId._id);
                console.log("res is catalog : ",res)
                setCatelogPageData(res);
            } catch (error) {
                console.log(error);
            }
        }
        getCatagoryDetails();
    },[categoryId])


  return (
    <div className='text-white mt-[60px]' >
        <div>
            <div>
                <p>{`Home/Catalog`}</p>
                <p></p>
                <p></p> 
            </div>
            <div>
                {/* Section 1 */}
                <div>
                    <div className='flex gap-x-3'>
                        <p>Most Popular</p>
                        <p>New</p>
                    </div>
                    {/* <CourseSlider/> */}
                </div>

                {/* section 2 */}
                <div>
                    <p>Top Courses</p>
                    {/* <div><CourseSlider/></div> */}
                </div>
                {/* ?section 3 */}

                <div>
                    <p>Frequently Bought Together</p>

                </div>

            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Catelog