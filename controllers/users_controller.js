const User = require('../models/user');

module.exports.profile = (req,res) => {
    res.render('user_profile',{title:'user profile'});
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

module.exports.signOut = (req,res) => {
    req.logout(function(err) {
        if (err) { console.log(err); }
        res.redirect('/');
      });
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
    return res.redirect('/');
}