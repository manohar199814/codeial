module.exports.profile = (req,res) => {
    res.render('users',{title:'user profile'});
}

module.exports.posts = (req,res) => {
    console.log('in /user/posts'); 
    res.send('<ul> <li> Post 1</li> <li> Post 2</li> </ul>')
}