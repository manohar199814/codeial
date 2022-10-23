const Comment = require('../models/comment');
const Post = require('../models/posts');
const { post } = require('../routes');


module.exports.create = function (req,res) {
    // console.log(req.body.content, req.user._id , req.body.post)
    // Comment.create({content : req.body.content, user:req.user._id , post:req.body.post},(err,comment) =>{
    //     if(err){
    //         console.log('error in creating comment');
    //     }

    //     // UPDATE comments field of respective post this comment belongs
    //     Post.updateOne({_id:req.body.post} , { "$push": { "comments": comment._id } },(err,post) =>{
    //         if(err){
    //             console.log('error in updating comments of post ');
    //         }
    //     })

        
    //     return res.redirect('back');
    // });

    // find if posts exists then create comment with post and user reference
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },(err,comment) => {
                // UPDATE comments field of respective post this comment belongs
                post.comments.push(comment);
                post.save();
                res.redirect('back');
            });
        }
    })
}

module.exports.destroy = function(req,res) {
    
    Comment.findById(req.params.id,(err,comment) => {
        if(err){ 
            res.redirect('back')
        }
        // .id means converting the object id to string
        if(req.user.id == comment.user) {
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}},(err,post) => {
                res.redirect('back');
            });

    //         Post.findById(postId,(err,post) => {
    //             if(err){
    //                 res.redirect('back')
    //             }
    //             const index = post.comments.findIndex((postComment) => postComment.id == comment.id);
    //             post.comments.splice(index,1);
    //             post.save();
    //             res.redirect('back');
    //         })
        }else{
            return res.redirect('back');
        }   
    })
}