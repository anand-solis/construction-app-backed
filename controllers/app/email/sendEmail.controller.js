const nodemailer = require("nodemailer");

const sendEmailController = async (params) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    let emailContent = {
        from: `"${process.env.SMTP_FROM}" <${process.env.SMTP_USERNAME}>`,
        subject: params?.subject,
        html: params?.content,
    };

    if(params?.email) {
        emailContent.to = params?.email;
    }

    if (params?.bcc) {
        if (Array.isArray(params.bcc)) {
            emailContent.bcc = params.bcc.join(", ");
        } else {
            emailContent.bcc = params.bcc;
        }
    }

    if (params?.cc) {
        if (Array.isArray(params.cc)) {
            emailContent.cc = params.cc.join(", ");
        } else {
            emailContent.cc = params.cc;
        }
    }

    try {
        await transporter.sendMail(emailContent);
        return { success: true, error: "", message: "Email sent successfully." };
    } catch (error) {
        return { success: true, error: `Error: ${error}`, message: "" };
    }
}

module.exports = sendEmailController;