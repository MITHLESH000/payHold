import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

interface SendEmailParams {
    email: string;
    emailType: string;
    userId: string | undefined;
}

console.log("multter sendEmail()");
export const sendEmail = async ({ email, emailType, userId }: SendEmailParams): Promise<string> => {
    try {
        if (!userId) {
            console.log("User ID is undefined");
            throw new Error("userId is undefined");
        }

        const hashedToken = await bcryptjs.hash(userId, 10);
        // const hashedToken="mithleshkumar1234567890a";
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set:{
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set:{

                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: 'myth@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
            html: `
                <html>
                    <head>
                        <style>
                            /* Style for the body */
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f0f0f0;
                                margin: 0;
                                padding: 20px;
                            }
                            /* Style for the main content */
                            .content {
                                background-color: #ffffff;
                                padding: 20px;
                                border-radius: 5px;
                                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                            }
                            /* Style for the button */
                            .button {
                                display: inline-block;
                                padding: 10px 20px;
                                background-color: #007bff;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 10px;
                            }
                            /* Style for the link */
                            a {
                                color: #007bff;
                                text-decoration: none;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="content">
                            <h2>${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</h2>
                            <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" class="button">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser:</p>
                            <p>${process.env.DOMAIN}/api/users/verifyemail?token=${hashedToken}</p>
                        </div>
                    </body>
                </html>
            `
        };
        

        const mailResponse = await transport.sendMail(mailOptions);
        console.log(`Email sent: ${mailResponse.messageId}`);
        return `Email sent: ${mailResponse.messageId}`;
    } catch (error: any) {
        console.error(`Error in sendEmail: ${error.message}`);
        throw new Error(error.message);
    }
};
