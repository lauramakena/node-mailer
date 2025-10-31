require("dotenv").config();
const nodemailer = require("nodemailer");

(async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.DEFAULT_EMAIL,
        pass: process.env.DEFAULT_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"NodeMailer Test" <${process.env.DEFAULT_EMAIL}>`,
      to: "donmathew342@gmail.com",
      subject: "✅ Test Email from NodeMailer for my baby",
      text: "Hey love of my life, this is a test email sent using NodeMailer! Glad to have you here with me.",
    });

    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
})();
