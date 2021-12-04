module.exports = {

    // database Configuration-----------------------
    url: "mongodb://localhost:27017/",
    database: "ece5725",
    imgBucket: "images",
    imgBaseUrl: "http://localhost:8080/img/retrieve/",
    imgUploadFieldName: "images",
    maxImgCnt: 12,


    // CORS configuration---------------------------
    corsUrl: "http://localhost:3000",


    // JWT configuration----------------------------
    secretKey: "ece5725",
    tokenValidPeriod: 3600,

    // sign up configuration------------------------
    eduEmailCheckToken: "@cornell.edu",
    emailTokenValidPeriod: 3600,
    emailSubject: "Hi there! Here is your verification code for Cornell Second-hand Trading!",
    emailTextContent: "Dear Cornellian, thank you for registering an account at our website, " +
        "here is your token (verification code), please copy and paste ALL of them to the input box: \n\n\n",


    // nodemailer sender account configuration------
    mailSenderConfig: {
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: "g20170284@outlook.com",
            pass: "-deviL0284"
        },
    }
};