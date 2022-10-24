const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = async function (req,res) {
    try{
        await Post.create({content : req.body.content, user:req.user._id});
        return res.redirect('back');
    }catch(err){
        console.log('error in creating post',err);
        return;
    }
//     Post.create({content : req.body.content, user:req.user._id},(err,post) =>{
//         if(err){
//             console.log('error in creating post');
//         }
//         return res.redirect('back');
//     });
// }
}

module.exports.destroy = async function(req,res) {
    try{
        let post = await Post.findById(req.params.id);
        if(req.user.id == post.user) {
           post.remove();
           await Comment.deleteMany({post: req.params.id});
           return res.redirect('back');
        }else{
           return res.redirect('back');
        }            
    }catch(err){
        console.log('error',err);
        return;
    }
    // Post.findById(req.params.id,(err,post) => {
    //     if(err){ 
    //         res.redirect('back')
    //     }
    //     // .id means converting the object id to string
    //     if(req.user.id == post.user) {
    //         // Post.deleteOne({id :req.params.id });
    //         post.remove();
    //         Comment.deleteMany({post: req.params.id},(err,count) => {
    //             return res.redirect('back');
    //         });
    //     }else{
    //         return res.redirect('back');
    //     }   
    // })
}