const express = require('express');
const router = express.Router();
const  Post = require('../models/Post');


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

router.post('/', async(req,res) => {
    // console.log(req.body);
    const post = new Post({
        item : req.body.item,
        price : req.body.price
    });
    try{
    const savedPost = await post.save();
       
            res.json(savedPost);
            console.log(data);
        }catch(err){
            res.json({message:error});
            console.log(err);
        }

});

// SPECIFIC POST
router.get('/:postId',async(req,res) =>{
    try{
    // console.log(req.params.postId);
   const post = await Post.findById(req.params.postId);
   res.json(post);
    }catch(err){
        res.json({message:error});
        console.log(err);
    }
});

// DELETE A SPECIFIC POST

router.delete('/:postId',async(req,res) =>{
    try{
     const removedPost = await  Post.remove({_id: req.params.postId});
     res.json(removedPost);
    }catch(err){
        res.json({message:error});
        console.log(err);
    }
});

// UPDATED POST
router.patch('/:postId',async(req,res) =>{
    try{
        const updatedPost = await Post.updateOne({_id:req.params.postId},{$set: {title:req.body.title}})
        res.json(updatedPost);
    }catch(err){
        res.json({message:error});
        console.log(err);
    }

});


module.exports = router;