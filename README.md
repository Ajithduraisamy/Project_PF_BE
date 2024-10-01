# Portfolio Backend API

This is the backend service for my portfolio website. It handles the contact form submissions and stores data in MongoDB while also sending notification emails using SendGrid.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [License](#license)

## Overview

This backend service is built with Express.js to handle requests from my portfolio website. It features contact form data storage and sends email notifications when someone fills out the contact form.

## Features

- **Express Server**: Serves API requests and handles incoming data.
- **MongoDB**: Used to store contact form submissions.
- **SendGrid**: Sends an email notification to the admin when a contact form is submitted.
- **CORS Handling**: Allows the frontend to interact with the backend.

## Technologies Used

- **Node.js & Express.js**: For the server and API endpoints.
- **MongoDB**: NoSQL database for storing contact details.
- **SendGrid**: Email sending service.
- **Cors**: To handle cross-origin requests.
- **dotenv**: To manage environment variables.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

URL=<your-mongodb-url>
API_KEY=<your-sendgrid-api-key>
Email_To_Name=<recipient-email-address>
Email_From_Name=<sender-email-address>

## Usage

Contact Form: When a user submits the contact form on the frontend, the data is sent to this backend service, which stores it in the MongoDB database and sends an email to the admin.
Cross-Origin Requests: This server uses CORS to accept requests from the frontend hosted at http://localhost:5173.

## License

This project is open source and available under the MIT License.
