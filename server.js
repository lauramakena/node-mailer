import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint to send emails
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.DEFAULT_EMAIL,
        pass: process.env.DEFAULT_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.DEFAULT_EMAIL,
      to,
      subject,
      text,
    });

    res.json({ success: true, message: "Email sent successfully!", info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
