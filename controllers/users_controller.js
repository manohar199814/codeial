const User = require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = (req,res) => {
    User.findById(req.params.id,(err,user) => {
        return res.render('user_profile',{
            title:'User Profile',
            profile_user:user
        });
    });   
}

module.exports.update = async (req,res) =>{

    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,(err,user) => {
    //         res.redirect('back')
    //     })
    // }else{
    //     res.status(401).send('un authorised');
    // }

    if(req.user.id == req.params.id){

        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('************* Multer error *********',err);
                }

                user.name = req.body.name;
                user.email =  req.body.email;

                if(req.file){

                    if(user.avatar){
                        // fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        fs.unlink(path.join(__dirname,'..',user.avatar), function(err) {
                            if(err && err.code == 'ENOENT') {
                                // file doens't exist
                                console.info("File doesn't exist, won't remove it.");
                            } else if (err) {
                                // other errors, e.g. maybe we don't have enough permission
                                console.error("Error occurred while trying to remove file");
                            } else {
                                console.info(`removed`);
                            }
                        });
                    }
                    //save the path of the uploaded file into avatar field field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');
            })
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized');
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
