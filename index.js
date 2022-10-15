const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoDbStore  = require('connect-mongo');

const path = require('path');
const port = 8000;

const mongoose = require('./config/mongoose');

const app = express();


app.use(expressLayouts);
//extract styles and scripts for subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//body parser
app.use(bodyParser.urlencoded({extended:true}));

//cookie parser
app.use(cookieParser())

//static files folder
app.use(express.static('./assets'));

//set up view engine type
app.set('view engine','ejs');
//view folder path
app.set('views',path.join(__dirname,'views'));

//mongo store is used to store session cookie in db
app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: MongoDbStore.create({ mongoUrl: 'mongodb://0.0.0.0:27017/codeial_development' })
}));

app.use(passport.initialize());
app.use(passport.session());
//user information is passed to locals when user is authenticated
app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes'));

app.listen(port,(err) => {
    if(err) {
        console.log(err);
    }
    console.log('server started on port 8000');
});
