const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Handle email subscription
app.post("/subscribe", async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    // Send email (Example using Gmail)
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "your-email@gmail.com",
            pass: "your-password" // Use environment variables for security
        }
    });

    let mailOptions = {
        from: "your-email@gmail.com",
        to: email,
        subject: "Subscription Successful",
        text: `Thanks for subscribing! You will receive the latest updates.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Subscription successful! Check your inbox." });
    } catch (error) {
        res.status(500).json({ message: "Error sending email" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
