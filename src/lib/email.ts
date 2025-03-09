/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthEmail } from "@/constants/email";
import { emailTemplate } from "@/html/verify-reset-email";
import UserModel from "@/models/UserModel";
import { AuthEmailProps, SendEmailProps } from "@/types/email";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export default async function sendEmail({
  recipients,
  subject,
  html,
}: SendEmailProps) {
  const mail = await transporter.sendMail({
    from: '"Isaiah Ernest Ovie 👻" <isaiahernest081@gmail.com>',
    to: recipients,
    subject: subject || "ChatFusion Fullstack",
    html,
  });

  return mail;
}

export async function sendResetVerificationEmail({
  userId,
  emailType,
  subject,
  recipients,
  bodyText,
}: AuthEmailProps) {
  try {
    // 1. Create a hashed token
    const hashedToken = await bcrypt.hash(userId, 10);
    const tokenExpiry = Date.now() + 86400000; // 1 day;

    let fieldsToUpdate: any;

    if (emailType === AuthEmail.VerifyEmail)
      fieldsToUpdate = {
        verifyToken: hashedToken,
        verifyTokenExpiry: tokenExpiry,
      };
    else if (emailType === AuthEmail.ResetPassword)
      fieldsToUpdate = {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: tokenExpiry,
      };
    else
      throw new Error("No fallback case for specified email type, ", emailType);

    // 2. Update user object with hashed token
    await UserModel.findByIdAndUpdate(userId, fieldsToUpdate, {
      new: true,
      runValidators: true,
    }).select("-password -__v");

    // Construct Redirect URL
    const URL = `${process.env.DOMAIN}/<URL>?token=${hashedToken}`;
    const redirectLink = URL.replace(
      "<URL>",
      emailType === AuthEmail.ResetPassword ? "reset-password" : "verify"
    );

    // Generate html template before sending to email function
    const template = emailTemplate({
      subject: subject || "ChatFusion V2.0",
      bodyText,
      link: redirectLink,
      buttonText:
        emailType === AuthEmail.VerifyEmail ? "Verify Email" : "Reset Password",
    });

    if (recipients && recipients?.length) {
      await sendEmail({
        recipients,
        subject,
        html: template,
      });
    }
  } catch (err) {
    console.log("sendVerificationEmail -> ", err);
  }
}
