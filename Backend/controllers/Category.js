const Category = require('../models/Category.js')

exports.createCategory= async(req,res)=>{
    try {
        const {name,description} = req.body;
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message: "All fields are required",
            })
        }

        const categoryDetails = await Category.create({
            name:name, 
            description:description,
        })
        console.log(categoryDetails);

        return res.status(200).json({
            success:true,
            message:"category created successfully",
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.showAllCategory = async (req,res) =>{
    try {
        const allCategory = await Category.find({},{name: true, description: true});
        return res.status(200).json({
            success: true,
            message: "all category returned successfully",
            allCategory,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}
//category page details

exports.categoryPageDetails = async(req,res) =>{
    try {
        const {categoryId} = req.body;
        if(!categoryId){
            return res.status(404).json({
                success:false,
                message: "categoryId not found"
            })
        }
        console.log("category Id ",categoryId);
        const selectedCategory =await Category.findById(categoryId).populate({
            path : "courses",
            populate:{
               path: "instructor"
            }
        }).exec();   
        console.log("Selected Category",selectedCategory);
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"data not found",
            })
        }
        const differentCategories = await Category.find({_id: {$ne: categoryId},}).populate({
            path : "courses",
            populate:{
               path: "instructor"
            }
        }).exec();
        console.log("different Categorires", differentCategories);
        const allCategory = await Category.find().populate({
            path : "courses",
            populate:{
               path: "instructor"
            }
        }).exec();
        const allCourses = allCategory.flatMap((catagory)=>catagory.courses);
        console.log("all courses : ",allCourses);   
        const mostSellingCourses = allCourses.sort((a,b) => b.sold-a.sold).slice(0,10);
        console.log("Most Selling courses");

        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
                mostSellingCourses,
            }
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message,
        })   
    }
}

