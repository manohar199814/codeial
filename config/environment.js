const development = {
    name:'development',
    asset_path:'assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'manoharmanu2614', // gmail user name
          pass: 'ngznhctlojrnobug', // gmail password
        },
    },
    google_client_id:'27346747973-f4bfdga5t0094l7fmmcltrj40ijv0n4q.apps.googleusercontent.com',
    google_client_secret: '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',
    google_callback_url: "http://localhost:8000/user/auth/google/callback",
    jwt_secret:'codeial'
}

const production = {
    name:'production'
}

module.exports = development;