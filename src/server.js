var http = require('http');
var PORT=process.env.PORT;
function handleRequest(request, response){
  response.end('Por ahora solo responde a la "hello"');
}
var server = http.createServer(handleRequest);
server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});

if (!process.env.SLACK_TOKEN) {
  console.log('Error: Specify token in config file');
  process.exit(1);
}

let Botkit = require('botkit');
let controller = Botkit.slackbot({
  debug: false
});
let bot = controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM();

controller.hears('plan',['direct_message','direct_mention','mention'], (bot,message) => {
  bot.startConversation(message, (err,convo) => {
    convo.say('Hello!');
    convo.say('Have a nice day!');
  });
});