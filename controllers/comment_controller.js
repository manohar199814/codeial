const Comment = require('../models/comment');
const Post = require('../models/posts');


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