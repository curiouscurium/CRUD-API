const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename :function(req,file,cb){
        cb(null,new Date().toISOString()+file.originalname)
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
         cb(null,false);
    }

}

const upload = multer({
    storage :storage,
    limits:{
        fileSize : 1024 * 1024
    },
    fileFilter : fileFilter
});

const  Post = require('../models/Post');
const CounterSchema = require('../models/Order');

// GETS ALL POST
router.get('/', async(req,res) =>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
    
});

// SUBMIT A POST

router.post('/',upload.single('productImage'), async(req,res) => {
    // console.log(req.file.path);
    // console.log(req.body);
    const latestCounter = await CounterSchema.findOne({type: 'ORDER'});
    const counters = (latestCounter?.counter || 0) + 1;
    
    const count ={
        counter : counters,
        type: "ORDER",
    };
    // const count1 = new CounterSchema(count);
    // count1.save();
    await CounterSchema.findOneAndUpdate(
        { type: "ORDER" },
        { counter: counters },
        { returnOriginal: false }
  );
        console.log("abcd",req.file.path);


    // const post = new Post({
    //     orderNo : counters,
    //     // orderNo : req.body.orderNo,
    //     item : req.body.item,
    //     price : req.body.price,
    //     productImage:req.file.path
    // });
    // console.log(post);
    const post = await Post.create({
            orderNo : counters,
            // orderNo : req.body.orderNo,
            item : req.body.item,
            price : req.body.price,
            productImage:req.file.path
    });


    // try{
        // const savedPost = await post.save();   
        // console.log(savedPost);
        res.json(post);
        // console.log(data);
    // }catch(err){
    //     res.json({message:error});
    //     // console.log(err);
    // }

});

// SPECIFIC POST
router.get('/:postId',async(req,res) =>{
    try{
    // console.log(req.params.postId);
   const post = await Post.findById(req.params.postId);
   res.json(post);
    }catch(err){
        res.json({message:error});
        // console.log(err);
    }
});

// DELETE A SPECIFIC POST

router.delete('/:postId',async(req,res) =>{
    try{
     const removedPost = await  Post.remove({_id: req.params.postId});
     res.json(removedPost);
    }catch(err){
        res.json({message:error});
        // console.log(err);
    }
});

// UPDATED POST
// router.patch('/:postId',async(req,res) =>{
//     try{
//         const updatedPost = await Post.updateOne({_id:req.params.postId},{$set: {price:req.body.price}})
//         res.json(updatedPost);
//     }catch(err){
//         res.json({message:error});
//         console.log(err);
//     }

// });


module.exports = router;