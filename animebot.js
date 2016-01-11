var http = require("http");
var login = require('facebook-chat-api');


var FB_LOGIN_EMAIL = "ranimebot@gmail.com";
var FB_LOGIN_PASSWORD	= "Hihihi123*";

// creating a server
http.createServer(function (request, response) {
	console.log("making server");
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end("");
}).listen(process.env.PORT || 8081);

// for heroku
setInterval(function() {
  http.get((process.env.HEROKU_INSTANCE || config.heroku_instance), function(res) {
    console.log("pong");
  });
}, 300000);
//end 

// log onto facebook and calls upon bot
login({
	email: process.env.FB_LOGIN_EMAIL,
	password: process.env.FB_LOGIN_PASSWORD
}, function(err, api){
	if(err) return console.error(err);
	startBot(api);
});

function startBot(api){
	api.setOptions({listenEvents: true});

	var stopListenting = api.listen(function(err, event){
		if (err) return console.error(err);

		if(event.type === "message"){
			sendPic(event.body);
		}
	})
}

// for now it will just echo the message
function sendPic(inputString){
	api.sendMessage(inputString);
	return stopListenting();
}