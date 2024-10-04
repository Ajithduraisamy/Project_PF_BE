const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const sgMail = require('@sendgrid/mail'); // Import SendGrid
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables early

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'https://ajithduraisamy.netlify.app'
}));

const URL = process.env.URL;
let db;

// Function to connect to MongoDB
async function connectTodb() {
    if (!db) {
        try {
            const client = await MongoClient.connect(URL);
            db = client.db('Portfolio');
            console.log("Connected to MongoDB!");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    }
    return db;
}

// Set SendGrid API key
sgMail.setApiKey(process.env.API_KEY); // Make sure to add this to your .env file

app.post('/contact', async (req, res) => {
    try {
        // Connect to the database
        const db = await connectTodb();
        const collection = db.collection('contacts');

        // Insert contact data into the database
        await collection.insertOne(req.body);
        console.log("Contact data inserted successfully");

        // Configure email details
        const msg = {
            to: process.env.Email_To_Name, // recipient email
            from: process.env.Email_From_Name, // sender email (use a verified sender)
            subject: 'Portfolio New Contact Form Submission',
            text: `You have a new portfolio contact submission from:
            Name: ${req.body.name}
            Email: ${req.body.email}
            Message: ${req.body.message}`
        };

        // Send email using SendGrid
        await sgMail.send(msg);
        console.log("Email sent successfully");
        
        // Send a successful response
        res.json({ message: 'Contact details shared successfully and email sent!' });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: 'Something went wrong!', error: error.message });
    }
});

const PORT = 3008;

app.listen(PORT, () => {
    console.log(`This server is running on port ${PORT}`);
});