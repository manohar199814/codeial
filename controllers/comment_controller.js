const Comment = require('../models/comment');
const Post = require('../models/posts');


module.exports.create = async function (req,res) {
    let post = await Post.findById(req.body.post);
    if(post){
        let comment = await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        });
        post.comments.push(comment);
        post.save();
        req.flash('success','comment posted');
        res.redirect('back');
    }
}

module.exports.destroy = async function(req,res) {
    try{
        let comment = await Comment.findById(req.params.id);
        if(req.user.id == comment.user) {
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}});
            req.flash('success','comment deleted');
            return res.redirect('back');
        }else{
            req.flash('error','You cant delete Comment');
            return res.redirect('back');
        }   

    }catch(err){
        req.flash('error',err);
        return;
    }
}