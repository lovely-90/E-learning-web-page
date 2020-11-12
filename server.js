// set up ================================
// get all modules we need
var express = require('express'),
  bodyParser = require('body-parser'),
  nodemailer = require('nodemailer'),
  smtpTransport = require('nodemailer-smtp-transport'),
  JSAlert = require('js-alert'),
  flag = 'false',
  check = 'true',
  app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + ''));

// landing page
app.get('/', (req, res) => {
  if (flag.localeCompare(check) == 0) {
    JSAlert.alert('Registered Successfully!');
    flag = 'false';
  }
  res.render('index.html');
});

// On Form Submission
app.post('/sendEmail', async (req, res) => {
  var data = req.body;
  console.log(data);
  var transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword',
    },
  });

  var mailInputs = {
    from: 'digralovely98@gmail.com',
    to: `${data.parentEmailId}`,
    subject: 'NotchUp Trial Class Booked successfully',
    html: `<h4>Dear ${data.parentName} , </h4><br><p> ${data.childName} 's class on ${data.date} at ${data.slot} has been successfully booked`,
  };

  try {
    transport.sendMail(mailInputs, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        alert(info.response);
        console.log('Email sent: ' + info.response);
      }
    });
    flag = 'true';
    res.redirect('/');
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server is not working');
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
