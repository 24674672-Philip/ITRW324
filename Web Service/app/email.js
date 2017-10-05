var nodemailer = require('nodemailer');
var fs = require('fs');

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
    html :'<table width="100%" border="0" cellspacing="0" cellpadding="20" background="cid:nyan@example.com">'+
            '<tr>'+
                   '<td align="center"></td>'+
            '</tr>'+
            '<tr>'+
                   '<td align="center">'+'To verify your account, please go to this link: http://52.211.85.57:8080/api/activate?hash='
                   + link + '&email=' + emailAddress+'</td>'+
            '</tr>'+
            '<tr>'+
                   '<td align="center"><p><a href="https://reddit.com">Feel free to visit our site</a></p></td>'+
            '</tr>'+
        '</table>',
    attachments: [
    // File Stream attachment
    {
        filename: 'background.png',
        path: './app/background.png',
        cid: 'nyan@example.com' // should be as unique as possible
    }
]
  };

  transporter.sendMail(mailOptions, function(error, info){
	if (error) {
      console.log(error);
	} else {
      console.log('Email sent: ' + info.response);
	}
  });
}
