module.exports.home = function (req,res) {
    res.render('home', {title: 'home'});
}

module.exports.cart = function (req,res) {
    res.send('<h1> From home control router cart </h1>');
}

