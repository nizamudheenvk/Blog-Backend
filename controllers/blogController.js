const blogs = require('../models/blogModel');
const projectController = require('../models/blogModel')

// add Blog

exports.addBlogController = async(req,res)=>{
    console.log("inside addBlogController");

    const userId = req.userId
    // console.log(userId);
    // console.log(req.body);
    // console.log(req.file);
    const {title,date,description}=req.body
    const blogImage =req.file.filename

    try{
        const existinBlog = await blogs.findOne({title})
        if(existinBlog){
              res.status(406).json("Blog alredy exist please upload another")
        }else{
               const newBlog =new blogs({
                title,date,description,blogImage,userId
               })
               await newBlog.save()
               res.status(200).json(newBlog)
        }

    }catch(err){
        res.status(401).json(err)

    }
}

// get  autorized user blogs
exports.getUserBlogController= async(req,res)=>{
console.log("inside getUserBlogController");
const userId=req.userId

try{
    const allUserBlogs = await blogs.find({userId})
    res.status(200).json(allUserBlogs)

}catch(err){
    res.status(401).json(err)
}
}
    

// get allblogs
exports.getAllBlogController= async(req,res)=>{
    console.log("inside getAllBlogController");
    
    try{
        const allBlogs = await blogs.find()
        res.status(200).json(allBlogs)
    
    }catch(err){
        res.status(401).json(err)
    }
    }

  // edit blog

  exports.editProjectController = async(req,res)=>{
    console.log("inside editProjectController");
    const {id} =req.params 
    const {title,date,description,blogImage}=req.body
    const reUploadImageFile = req.file?req.file.filename:blogImage
    const userId = req.userId
    console.log(id,title,date,description,blogImage, reUploadImageFile,userId);

    try{
        const updatedBlog = await blogs.findByIdAndUpdate({_id:id},{
            title,date,description,blogImage:reUploadImageFile,userId
        },{new:true})
        await updatedBlog.save()
        res.status(200).json(updatedBlog)

    }catch(err){
        res.status(401).json(err)
    }
    
    

  }

//   delete blog

exports.deleteBlogcontroller = async(req,res)=>{
    console.log("inside deleteBlogcontroller");
    const {id} = req.params

    try{
        const removeProject = await blogs.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)

    }catch(err){
        res.status(401).json(err)
    }
    

}
        