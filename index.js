const express = require('express');
const path = require('path');
const port = 8000;

const expressLayouts = require('express-ejs-layouts');

const app = express();


app.use(expressLayouts);
//extract styles and scripts for subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//static files folder
app.use(express.static('./assets'));

//set up view engine type
app.set('view engine','ejs');
//view folder path
app.set('views',path.join(__dirname,'views'));

app.use('/',require('./routes'));

app.listen(port,(err) => {
    if(err) {
        console.log(err);
    }
    console.log('server started on port 8000');
});
