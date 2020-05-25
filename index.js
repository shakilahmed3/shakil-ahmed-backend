const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

app.post('/getGmail', (req, res) => {
    const info = req.body;
    const mailOptions = {
        from: `shakilatrai6@gmail.com`,
        to: 'shakilatrai5@gmail.com',
        subject: `${info.subject}`,
        text: `${info.message}\n${info.name}\n${info.email}`
    }
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error Occurs');
        } else {
            console.log('Message Sent!!!');
        }
    })
});

const port = process.env.PORT || 4200;
app.listen(port, () => console.log('Listenting to port ', port));