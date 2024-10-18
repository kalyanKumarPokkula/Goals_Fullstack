import { User } from "../models/user";
import bcrypt from "bcrypt";
import { DOMAIN } from "../configs/config";
import transport from "../configs/emailConfig";

const sendEmail = async (email: string, emailType: string, userId: string) => {
  try {
    const hashedToken = bcrypt.hashSync(userId.toString(), 10);
    console.log(email);
    console.log(userId);
    console.log(DOMAIN);
    console.log(typeof DOMAIN);

    if (emailType === "VERIFY") {
      let user = await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 36000000,
      });
      console.log(user);
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 36000000,
      });
    }

    const mailOptions = {
      from: "akhil6305964225@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html:
        emailType === "VERIFY"
          ? `<P>Click <a href="${DOMAIN}/verify?token=${hashedToken}">here</a> to ${
              emailType === "VERIFY"
                ? "Verify your email"
                : "Reset your password"
            }</P>`
          : `<P>Click <a href="${DOMAIN}/reset-password?token=${hashedToken}">here</a> to ${
              emailType === "VERIFY"
                ? "Verify your email"
                : "Reset your password"
            }</P>`,
    };

    // const mailOptions = {
    //   from: "kalyanakhil022@gmail.com",
    //   to: email,
    //   subject:
    //     emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    //   html: `<P>Click <a href="${DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
    //     emailType === "VERIFY" ? "Verify your email" : "Reset your password"
    //   }</P>`,
    // };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log(mailResponse);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default sendEmail;
