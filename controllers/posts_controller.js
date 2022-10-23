const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = function (req,res) {
    Post.create({content : req.body.content, user:req.user._id},(err,post) =>{
        if(err){
            console.log('error in creating post');
        }
        return res.redirect('back');
    });
}

module.exports.destroy = function(req,res) {
    Post.findById(req.params.id,(err,post) => {
        if(err){ 
            res.redirect('back')
        }
        // .id means converting the object id to string
        if(req.user.id == post.user) {
            // Post.deleteOne({id :req.params.id });
            post.remove();
            Comment.deleteMany({post: req.params.id},(err,count) => {
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }   
    })
}