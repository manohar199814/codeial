module.exports.profile = (req,res) => {
    console.log('in /user/profile')
    res.send('<h1>User Profile</h1>');
}

module.exports.posts = (req,res) => {
    console.log('in /user/posts'); 
    res.send('<ul> <li> Post 1</li> <li> Post 2</li> </ul>')
}