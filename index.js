const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const sgMail = require('@sendgrid/mail');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/',(req, res)=>{
    res.send("Welcome email server!");
})

sgMail.setApiKey(process.env.APIKEY);


app.post('/getGmail', (req, res) => {
    const info = req.body;   
    
        const msg = {
            to: 'shakilatrai5@gmail.com',
            from: `Web info from shakil<cseshakil6@gmail.com>`,
            subject: `${info.subject}`,
            text: `${info.message}\n${info.name}\n${info.email}`,
        }

        sgMail.send(msg).then(() => {
            console.log('Message sent')
        }).catch((error) => {
            console.log(error.response.body)
        })   

});

const port = process.env.PORT || 4200;
app.listen(port, () => console.log('Listenting to port ', port));