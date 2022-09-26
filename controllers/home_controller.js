module.exports.home = function (req,res) {
    res.send('<h1> From home control router </h1>');
}

module.exports.users = function(req,res) {
    res.send('<ul> <li> user1 </li> <li> user2 </li>  <li> user3 </li>  </ul>')
}

