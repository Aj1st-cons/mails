import fetch from "node-fetch";

export default async function (req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { adminEmail, referrerEmail, emailBody } = req.body;

    if (!adminEmail || !referrerEmail || !emailBody) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Use the Resend API key directly here if you're not using environment variables
    const API_KEY = "re_6Uc61pcr_HHiSHLbzcEtMs5Gq2tsdoud6"; // Replace with your actual API key if needed
    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            from: "admin@aj1st.com", // Your email
            to: [adminEmail, referrerEmail],
            subject: "New Form Submission",
            text: emailBody
        })
    });

    const result = await response.json();
    if (response.ok) {
        return res.status(200).json({ success: true, result });
    } else {
        return res.status(500).json({ error: "Email sending failed", details: result });
    }
}
