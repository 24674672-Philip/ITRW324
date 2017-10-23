var nodemailer = require('nodemailer');
var fs = require('fs');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rip.donotreply@gmail.com',
    pass: 'Blockchain1'
  }
});

module.exports = function(emailAddress, jwt){
  const user = { email: emailAddress };
  const token = jwt.sign({ user }, 'passreset', { expiresIn: 18000 });
  var mailOptions = {
    from: 'rip.donotreply@gmail.com',
    to: emailAddress,
    subject: 'RIP-Password Reset Code',
    html :'<table width="100%" border="0" cellspacing="0" cellpadding="20" background="cid:kek@kek.com">'+
           '<tr>'+
                 '<td align="center"></td>'+
           '</tr>'+
            '<tr>'+
                   '<td align="center" style="background-color:white"><strong>'+'Email reset code: ' +token+ '</a></strong></td>'+
            '</tr>'+
            '<tr>'+
                  '<td align="center"><p><a href="http://ripmusic.tk/">Feel free to visit our site!</a></p></td>'+
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
      res.json({error: error});
	} else {
      console.log('Email sent: ' + info.response);
      res.json({result: "success"});
	}
  });
}
