const nodemiler =require("nodemailer");
const sendEmail =async ({to, subject,html})=>{

    const transpoter =nodemiler.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:process.env.EMAIL_USER,
            Pass:process.env.EMAIL_PASS,
        }
    }) 

    const mailoptions ={
        from:process.env.EMAIL_USER,
        to,
        subject,
         html
    }


    try {
   await transpoter.sendEmail(mailoptions);
   console.log(" email send successfully");
   
    } catch (error) {
        console.error("error sending email ayaz ali",error);
        
    }
  
}
module.exports =sendEmail;