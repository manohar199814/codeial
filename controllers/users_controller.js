const User = require('../models/user');

module.exports.profile = (req,res) => {
    console.log(req.cookies);
    if(req.cookies.user_id){
        User.findOne({_id : req.cookies.user_id},(err,user) =>{
            if(err){ console.log('error in getting user profile'); return;}
            if(user) {
                return res.render('user_profile',{title:'user profile', user:user});
            }

            return res.redirect('/user/sign-in');
        })
    }else{
        return res.redirect('/user/sign-in');
    }
    
}

module.exports.posts = (req,res) => {
    console.log('in /user/posts'); 
    res.send('<ul> <li> Post 1</li> <li> Post 2</li> </ul>');
}

//user/sign-in route
module.exports.signIn = (req,res) =>{
    res.render('user_sign_in',{title:'user SignIn'});
}

//user/sign-up route
module.exports.signUp = (req,res) =>{
    res.render('user_sign_up',{title:'user SignUp'});
}

//user/sign-out route

module.exports.signOut = (req,res) =>{
    res.clearCookie("user_id");
    res.redirect('back');
}

//post request after submitting signUP form
module.exports.create = (req,res) => {
    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},(err,user) => {
        if(err){
            console.log('error in signup user');
            return;
        }
        if(!user){
            User.create(req.body,(err,user) =>{
                if(err){
                    console.log('error in signup user');
                }
                return res.redirect('/user/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    })
    
}

//post request after submitting signIn form
module.exports.createSession = (req,res) => {

    //find user
    User.findOne({email:req.body.email},(err,user) => {
        if(err){console.log('error in signIn user'); return}

        if(user){
            //handle password which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/user/profile');
        }else{
            //handle user not found
            return res.redirect('back');
        }
    })
}

