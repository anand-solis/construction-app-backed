const EmailVerificationOTP = (code) => {
    const template = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="en">
        <head>
            <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        </head>
        <body style="background-color:#F6F9FC;padding:10px 0">
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
                style="max-width:37.5em;background-color:#FFFFFF;border:1px solid #F0F0F0;padding:45px">
                <tbody>
                    <tr style="width:100%">
                        <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                <tbody>
                                    <tr>
                                        <td>
                                            <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Hi,</p>
                                            <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Someone recently requested a OTP for your account. If this was you, This is your verification code:</p>
                                            <p style="font-size:25px;line-height:1.3;margin:16px 0;color:#377DFF;font-weight:600;text-align:center;margin-top:10px;margin-bottom:10px">${code}</p>
                                            <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">If you don't want to Login or didn't request this, just ignore and delete this Email.</p>
                                            <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">To keep your account secure, please don't forward this email to anyone.<a href="#" style="color:#067df7;text-decoration:none" target="_blank"> more security tips.</a></p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
    </html>`;

    return template;
}

module.exports = EmailVerificationOTP;