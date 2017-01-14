var http = require('http');
var PORT=process.env.PORT;
function handleRequest(request, response){
  response.end(
    '<html>' +
    '<meta charset="UTF-8">' +
    '<body>' +
    'Responde a una conversación de este tipo' +
    '<br/>' +
    'humano: plan' +
    '<br/>' +
    'bot: ¿Qué hiciste ayer?' +
    '<br/>' +
    'humano: code 1' +
    '<br/>' +
    'bot: ¿Algo más?' +
    '<br/>' +
    'humano: code 2' +
    '<br/>' +
    'bot: ¿Algo más?' +
    '<br/>' +
    'humano: más nada' +
    '<br/>' +
    'OK! nos vemos' +
    '<br/>' +
    '</body>' +
    '</html>'
  );
}
var server = http.createServer(handleRequest);
server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});

if (!process.env.SLACK_TOKEN) {
  console.log('Error: Specify token in config file');
  process.exit(1);
}

var Botkit = require('botkit')
var controller = Botkit.slackbot({
  debug: false
});

var bot = controller.spawn({
  token: process.env.SLACK_TOKEN
});

require('./bots/index')(bot, controller);

bot.startRTM((err, bot, res) => {
  if (err)
    throw new Error('Could not connect to Slack');
});