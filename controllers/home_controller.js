module.exports.home = function (req,res) {
    console.log(req.cookies);
    res.cookie('user_id',14);
    res.render('home', {title: 'home'});
}

module.exports.cart = function (req,res) {
    res.send('<h1> From home control router cart </h1>');
}

