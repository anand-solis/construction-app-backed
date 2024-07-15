const SuccessCreateOrganization = (name, email, phone) => {
    const template = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="en">
        <head>
            <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        </head>
        <body style="background-color:#efeef1;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
                style="max-width:37.5em;width:580px;margin:30px auto;background-color:#ffffff">
                <tbody>
                    <tr style="width:100%">
                        <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="display:flex;justify-content:center;align-items:center;padding:30px">
                                <tbody>
                                    <tr>
                                        <td>
                                            <h1>🎉🎉Congratulations🎉🎉</h1>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:100%;display:flex">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0"
                                                role="presentation">
                                                <tbody style="width:100%">
                                                    <tr style="width:100%">
                                                        <td data-id="__react-email-column" style="border-bottom:1px solid rgb(238,238,238);width:249px"></td>
                                                        <td data-id="__react-email-column" style="border-bottom:1px solid rgb(145,71,255);width:102px"></td>
                                                        <td data-id="__react-email-column" style="border-bottom:1px solid rgb(238,238,238);width:249px"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:5px 50px 10px 60px">
                                <tbody>
                                    <tr>
                                        <td>
                                            <p style="font-size:16px;line-height:1.5;margin:16px 0">Hey,</p>
                                            <p style="font-size:16px;line-height:1.5;margin:16px 0">You have successfully created your Organization.</p>
                                            <p style="font-size:16px;line-height:1.5;margin:16px 0"></p>
                                            <p style="font-size:16px;line-height:1.5;margin:16px 0">
                                            <h4>Here is Your Details,</h4>
                                            <h4>Organization Name:&nbsp;
                                                <span style="color:#377dff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
                                                    ${name}
                                                </span>
                                            </h4>
                                            <h4>Email:&nbsp;
                                                <span style="color:#377dff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
                                                    ${email}
                                                </span>
                                            </h4>
                                            <h4>Phone Number:&nbsp;
                                                <span style="color:#377dff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
                                                    ${phone}
                                                </span>
                                            </h4>
                                            </p>
                                            <p style="font-size:16px;line-height:1.5;margin:16px 0">Thanks,<br />Solis Reality Team</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:580px;margin:0 auto">
                <tbody>
                    <tr>
                        <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                <tbody style="width:100%">
                                    <tr style="width:100%">
                                        <td align="right" data-id="__react-email-column" style="width:50%;padding-right:8px"></td>
                                        <td align="left" data-id="__react-email-column" style="width:50%;padding-left:8px"></td>
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

module.exports = SuccessCreateOrganization;