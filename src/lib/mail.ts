import nodemailer from "nodemailer";
import { env } from "~/env";

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: env.GOOGLE_APP_USER,
      pass: env.GOOGLE_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "caitken86@gmail.com",
    to: "caitken86@gmail.com",
    subject: "Hello from Nodemailer",
    text: `Two Factor Token: ${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });

  return true;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  console.log({ email, token });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: env.GOOGLE_APP_USER,
      pass: env.GOOGLE_APP_PASSWORD,
    },
  });

  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  const mailOptions = {
    from: "caitken86@gmail.com",
    to: "caitken86@gmail.com",
    subject: "Hello from Nodemailer",
    text: `Reset Link: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });

  return true;
};

export const sendVerificationEmail = async (email: string, token: string) => {
  console.log({ email, token });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: env.GOOGLE_APP_USER,
      pass: env.GOOGLE_APP_PASSWORD,
    },
  });

  const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  const mailOptions = {
    from: "caitken86@gmail.com",
    to: "caitken86@gmail.com",
    subject: "Hello from Nodemailer",
    text: `Verification Link: ${confirmationLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });

  return true;
};
