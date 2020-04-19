const nodemailer = require("nodemailer");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../configs/configs.js')[env];


const sendEmail = async(userData, orderData) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: config.mailUserName,
            pass: config.mailUserPassword
        }
    });

    try {
        const userName = userData.name;
        const userEmail = userData.email;

        let info = await transporter.sendMail({
            from: '"Pizza & More!" <pizzanmoreforyou@gmail.com>',
            to: `${userName}  <${userEmail}>`,
            subject: `Order Details #${orderData.number} `,
            text: `This email is to confirm your order number ${orderData.number}`,
            html: `<p> This email is to confirm your order number <b>#${orderData.number}</b> </p><br>
            <p> Your order total is: <b>${orderData.total} Euros</b>
                <br><br> <p> Thanks & Regards,</p><p> <b>Team Pizza & More!</b></p>
            ` // html body
        });
        console.log("Message sent: %s", info.messageId);
        return Promise.resolve(info);
    } catch (error) {
        console.log(error)
    }


}


module.exports = { sendEmail }