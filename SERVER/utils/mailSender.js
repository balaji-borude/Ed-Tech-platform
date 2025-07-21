const nodemailer = require("nodemailer");
require("dotenv").config();

 
const mailSender =async (email,title,body)=>{
    try {
        // 
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST, 
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },  
        })

        let Info = await transporter.sendMail({
            from:"Study Notion  | codehelp - by balaji",
            to: `${email}`,            // mailsender function madhun ::-->  email,title, and body ghetleli ahe 
            subject:`${title}`,                           // chcek can we use --> {body } or not
            html:`${body}`
        }) 
        console.log("printing semd mail data --> ", Info);

    } catch (error) {
        console.log(error.message)
        
    }
}

module.exports = mailSender;