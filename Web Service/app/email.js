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
    html :'<table width="100%" border="0" cellspacing="0" cellpadding="20" background="cid:kek@kek.com">'+
           '<tr>'+
                 '<td align="center"></td>'+
           '</tr>'+
            '<tr>'+
                   '<td align="center" style="background-color:white"><strong>'+'To verify your account, <a href="http://52.211.85.57:8080/api/activate?hash='
                  + link + '&email=' + emailAddress+'"> click here</a></strong></td>'+
            '</tr>'+
            '<tr>'+
                  '<td align="center"><p><a href="https://reddit.com">Feel free to visit our site, and thanks for registering!</a></p></td>'+
            '</tr>'+
      '</table>',
    attachments: [
    {
        filename: 'background.png',
        path: './app/background.png',
        cid: 'kek@kek.com'
    }]
  };

  transporter.sendMail(mailOptions, function(error, info){
	if (error) {
      console.log(error);
	} else {
      console.log('Email sent: ' + info.response);
	}
  });
}
