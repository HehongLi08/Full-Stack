module.exports = {

    // database Configuration-----------------------
    url: "mongodb://localhost:27017/",
    database: "ece5725",
    imgBucket: "images",
    imgBaseUrl: "http://192.168.1.102:8080/img/retrieve/",
    imgUploadFieldName: "images",
    maxImgCnt: 12,


    // CORS configuration---------------------------
    corsUrl: "http://192.168.1.102:3000",


    // JWT configuration----------------------------
    secretKey: "ece5725",
    tokenValidPeriod: 3600,

    // sign up configuration------------------------
    eduEmailCheckToken: "@cornell.edu",
    emailTokenValidPeriod: 3600,
    signupEmailSubject: "Hi there! Here is your verification code for Cornell Second-hand Trading!",
    signupEmailTextContent: "Dear Cornellian, thank you for registering an account at our website, " +
        "here is your token (verification code), and it will expire in 10 minutes, " +
        "please copy and paste ALL of them to the input box: \n\n\n",


    // retrieve configuration-----------------------
    retrieveEmailSubject: "Hi, you are resetting your password at Cornell Second-hand Trading",
    retrieveEmailContent: "Dear Cornellian, you are retrieving your account at our website, " +
        "here is your token (verification code), and it will expire in 10 minutes, " +
        "please copy and paste ALL of them to the input box: \n\n\n",

    // nodemailer sender account configuration------
    // mailSenderConfig: {
    //     host: "smtp-mail.outlook.com",
    //     secureConnection: false,
    //     // service: 'outlook',
    //     port: 587,
    //     tls: {
    //         ciphers: 'SSLv3'
    //     },
    //     auth: {
    //         user: "ece5725-cl2228@outlook.com",
    //         pass: "mzxcnmcnm2228"
    //     },
    // },



    mailSenderConfig: {
        host: "smtp-mail.yahoo.com",
        service: 'yahoo',
        port: 465,
        secure: false,
        auth: {
            user: "ece5725.cl2228@yahoo.com",
            pass: "rhlemnckvwjtyhnn"
        },
        debug: false,
        logger: false,          // only for debug
    },
};