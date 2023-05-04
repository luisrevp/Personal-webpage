// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

var cors = require("cors");
var fs = require('fs');
var path = require("path");
var express = require("express");
var app = express();
var nodemailer = require("nodemailer");
var bodyparser = require("body-parser");
const PORT = 3000;
const router = express.Router();


app.use(cors());
app.use(express.static(__dirname));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// homepage
// app.get("/", (req, res) => res.render("index"));

// endpoint de tipo POST
app.post("/send-email", (req, res) => {
  
    const output = `
    <div>
    <p>You have a new email from ${req.body.username} &lt;${req.body.email}&gt;</p>
    <h3>${req.body.message}</h3>
    </div>
    `;

    var transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "eunice.johns@ethereal.email",
      pass: "RfkkQjf4xBSgDxKbwy"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: `${req.body.username} <${req.body.email}>`,
    to: 'luisrev97@gmail.com',
    subject: `New email from "${req.body.username}"`,
    text: 'Hey people',
    html: output
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      return console.log(error);
    }

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.render("index");
  })
});

app.get("/hello-world", cors(), (req, res) => {
  if(res.statusCode == 200){
    res.send(JSON.stringify({
      from: "Luigi",
      message: "Form has been sumbitted"
    }));
  }
});

app.listen(PORT, () => {
  console.log("Initialized server in -> http://localhost:3000");
});