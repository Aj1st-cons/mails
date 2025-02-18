// api/send-email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    const { adminEmail, referrerEmail, emailBody } = req.body;

    try {
        const data = await resend.emails.send({
            from: "admin@aj1st.com", // Replace with your verified domain
            to: [adminEmail, referrerEmail],
            subject: "New Form Submission",
            text: emailBody,
        });

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
}
