const mailsender = require("../utils/mailSender");

exports.contactus=async(req,res)=>{
    try {
        // fetch the data 
        const {firstName,lastName,email, phoneNumber,message} = req.body;

        // validate the given data 
        if(!firstName || !lastName || !email || ! phoneNumber || !message){
            return res.status(400).json({
                success:false,
                message:"Please field all the field"
            })
        }
        // send main to student that his --> message has been send 
        const body = `<h1> Your Mesage Has been received</h1> 
                    <p> email : ${email} we will get back to you soon !!  </p>`
        const mailResponse = await mailsender(email, "Confirmation mail from study-Notion",body);
        console.log("sending mail to contactUs student")
        // send mail to studyNotion that the this student send a mail to 

        const mailToStudyNotion = await mailsender(process.env.STUDYNOTION_MAIL, `${email} send email check it Out !!! `, `<p> ${message} -- <sub> send by - ${email}</sub> Solve the Query </p>`)

        // send success response 
        return res.status(200).json({
            success:true,
            message:"Your form request is send to studyNotion "
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            //message:"Something went Wrong while contacting StudyNotion ! please verify the details and try again later !!! "
        })
    }
}