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
        const selectedCategory =await Category.findById(categoryId).populate("courses").exec();  
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"data not found",
            })
        }
        const differentCategories = await Category.find({_id: {$ne: categoryId},}).populate("courses").exec();

        //how can i get top selling courses
        const allCategory = await Category.find().populate("courses").exec();
        const allCourses = allCategory.flatMap((catagory)=>categoryId.courses);
        const mostSellingCourses = allCourses.sort((a,b) => b.sold-a.sold).slice(1,10);

        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
                //top courses pending
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

