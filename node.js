const express = require("express");
const mailgun = require("mailgun-js");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Initialize Mailgun with API key and domain from environment variables
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

// Define the email sending endpoint
app.post("/send-email", (req, res) => {
  const { toEmail, subject, body } = req.body;

  const data = {
    from: "postmaster@sandbox9ed17eff81ee44f18c1d2a80ac6fa5d6.mailgun.org", // Your Mailgun 'from' email
    to: toEmail,
    subject: subject,
    text: body,
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ success: false, message: "Error sending email" });
    }
    console.log("Email sent:", body);
    return res.status(200).json({ success: true, message: "Email sent successfully!" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at https://your-glitch-project.glitch.me`);
});
