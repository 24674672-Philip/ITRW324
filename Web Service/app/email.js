var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rip.donotreply@gmail.com',
    pass: 'Blockchain1'
  }
});

module.exports = function(link, emailAddress){
  var mailOptions = {
    from: 'rip.donotreply@gmail.com',
    to: emailAddress,
    subject: 'RIP-Email verification',
	  text: 'To verify your account, please go to this link: http://52.211.85.57:8080/api/activate?hash='
    + link + '&email=' + emailAddress
  };

  transporter.sendMail(mailOptions, function(error, info){
	if (error) {
      console.log(error);
	} else {
      console.log('Email sent: ' + info.response);
	}
  });
}
