const express = require('express');
const port = 8000;

const app = express();

app.use('/',require('./routes'));

app.listen(port,(err) => {
    if(err) {
        console.log(err);
    }
    console.log('server started on port 8000');
});
