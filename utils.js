/*
Mailgun 
*/
const mailgun = require('mailgun-js');
const DOMAIN = '';
const mg = mailgun({apiKey: '', domain: DOMAIN});

const mail ={
    content : function(subject, text){
        let info ={
            from: '',
            to: 'lynn@blueplanet.com.tw',
            subject: subject,
            text: text,
        }
        return info;
    },

    send :function(data){
        mg.messages().send(data, function (error, body) {
            if(error){
                console.log(error);
            }else{
                console.log(body);
            }
        });
    },
}

module.exports=mail;

// const data ={
// 	from: '',
// 	to: 'lynn@blueplanet.com.tw',
// 	subject: subject,
// 	text: text,
// };


// mg.messages().send(data, function (error, body) {
// 	console.log(body);
// });

