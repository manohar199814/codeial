const User = require('../models/user');

module.exports.profile = (req,res) => {
    User.findById(req.params.id,(err,user) => {
        return res.render('user_profile',{
            title:'User Profile',
            profile_user:user
        });
    });   
}

module.exports.update = (req,res) =>{

    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,(err,user) => {
            res.redirect('back')
        })
    }else{
        res.status(401).send('un authorised');
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

module.exports.signOut = (req,res) => {
    return req.logout(function(err) {
        if (err) { console.log(err); }
        req.flash('success','You have logged out!')
        res.redirect('/');
      });
}
//post request after submitting signUP form
module.exports.create = (req,res) => {
    if(req.body.password !== req.body.confirm_password){
        req.flash('error','password not matched');
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},(err,user) => {
        if(err){
            req.flash('error','error in signup user');
            return;
        }
        if(!user){
            User.create(req.body,(err,user) =>{
                if(err){
                    req.flash('error','error in signup user');
                }
                req.flash('success','Sign up Successful')
                return res.redirect('/user/sign-in');
            });
        }else{
            req.flash('error','User already exists');
            return res.redirect('back');
        }
    });
}

//post request after submitting signIn form
module.exports.createSession = (req,res) => {
    req.flash('success','logged in Successfully');
    return res.redirect('/');
}
