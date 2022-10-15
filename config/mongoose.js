const mongoose = require('mongoose');
main().catch((err)=> {console.log(err)});

async function main() {
    await mongoose.connect('mongodb://0.0.0.0:27017/codeial_development');
    console.log('connection successful to DB');
}
