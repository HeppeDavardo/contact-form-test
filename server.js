const express = require('express');
const app = express();

const nodemailer = require('nodemailer');
const SMTPConnection = require('nodemailer/lib/smtp-connection');

const PORT = process.env.PORT || 5000;

//midleware
app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/contactform.html')
})

app.post('/', (req, res)=>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        host: 'send.one.com',
        port: 465,
        secure: true,
        auth: {
            user: 'jeppe@menholt.dk',
            pass: 'Pelle2017',
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'jeppe@menholt.dk',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
})


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})