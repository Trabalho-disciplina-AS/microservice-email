// Run node send_email.js
const nodemailer = require('nodemailer');
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 4005

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "carepet.sender@gmail.com",
        pass: "@carepet123"
    }
});

function constructMessage(name, email, telefone, message) {
    return `name: ${name} \n email: ${email} \n telefone: ${telefone} \n message: ${message}`
}

app.get('/', (req, res) => {
    res.status(200).send('Sender Email working...')
})

app.post('/', (req, res) => {
    var emailProcess = {
        from: "carepet.sender@gmail.com",
        to: "carepet.sup@gmail.com",
        subject: req.body.subject,
        text: constructMessage(req.body.name, req.body.email, req.body.telefone, req.body.message),
    }

    transporter.sendMail(emailProcess, function(error, info) {
        if (error) {
            console.log(error);
            res.status(400).send('Problem to sent')
        }
        console.log(`Email sent: ${info.response}`);
        res.status(200).send('Email sent with success :)')
    });
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})