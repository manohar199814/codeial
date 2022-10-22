const Post = require('../models/posts');

module.exports.home = function (req,res) {
    // console.log(req.cookies);
    // res.cookie('user_id',14);
    // Post.find({},function(err, posts) {
    //     if(err){
    //         console.log('Error in fetching posts from DB');
    //         return;
    //     }
    //     return res.render('home', {title: 'home',posts:posts});
    // });

    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{path:'user'}
    })
    .exec(function(err, posts) {
            if(err){
                console.log('Error in fetching posts from DB');
                return;
            }
            return res.render('home', {title: 'home',posts:posts});
    });
    
    
}

module.exports.cart = function (req,res) {
    res.send('<h1> From home control router cart </h1>');
}

