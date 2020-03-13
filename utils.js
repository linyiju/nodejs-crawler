const mailgun = require('mailgun-js');
const DOMAIN = 'sandboxd855de2672704e0694721ed91c5b0faf.mailgun.org';
const mg = mailgun({apiKey: '92cbe7f5bdd8ddb732ca609b47a08d5b-816b23ef-c7392a6d', domain: DOMAIN});
const data = {
	from: 'crawler@sandboxd855de2672704e0694721ed91c5b0faf.mailgun.org',
	to: 'lynn@blueplanet.com.tw',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};


mg.messages().send(data, function (error, body) {
	console.log(body);
});