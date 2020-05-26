const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure:false,
    port:25,
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
            res.send("Error");
        } else {
            res.send('Message Sent!!!');
        }
    })
});

const port = process.env.PORT || 4200;
app.listen(port, () => console.log('Listenting to port ', port));