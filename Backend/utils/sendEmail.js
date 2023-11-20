import nodemailer from 'nodemailer';
export const sendEmail = async(subject,message,send_to,sent_from,reply_to) => { 
    //Create Email transporter
    const transporter = nodemailer.createTransport({
        pool: true,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }

    })
    //Options for sending email
    const options = {
       from:  sent_from,
       to: send_to,
       replyTo: reply_to,
       subject: subject,
       html: message
    }

    //Send email
    transporter.sendMail(options, function(err, info){
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    })
}