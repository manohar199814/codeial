const env = require('./environment');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    console.log('in asset path')
    app.locals.assetPath = function(filePath){
        console.log(filePath);
        if(env.name = 'development'){
            return filePath;
        }
        console.log("/" + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json'))))
        return "/" + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')));
    }
}