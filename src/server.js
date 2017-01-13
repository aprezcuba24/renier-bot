var http = require('http');
var PORT=process.env.PORT;
function handleRequest(request, response){
  response.end(
    '<html>' +
    '<body>' +
    'Responde a una conversación de este tipo' +
    '<br/>' +
    'humano: plan' +
    'bot: ¿Qué hiciste ayer?' +
    'humano: code 1' +
    'bot: ¿Algo más?' +
    'humano: code 2' +
    'bot: ¿Algo más?' +
    'humano: más nada' +
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

let Botkit = require('botkit');
let controller = Botkit.slackbot({
  debug: false
});
let bot = controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM();

controller.hears('plan',['direct_message','direct_mention','mention'], (bot,message) => {
  bot.startConversation(message, (err,convo) => {
    convo.ask('¿Qué hiciste ayer?', [
      {
        pattern: 'nada',
        callback: function(response,convo) {
          convo.action('completed')
        }
      },
      {
        default: true,
        callback: function(response,convo) {
          // convo.log('save');
          convo.next();
        }
      }
    ]);
    convo.ask('¿Algo más?', [
      {
        default: true,
        callback: function(response,convo) {
          // convo.log('save');
          convo.repeat();
          convo.next();
        }
      },
      {
        pattern: 'nada más',
        callback: function(response,convo) {
          convo.next();
        }
      }
    ]);
    convo.on('end', (convo) => {
      if (convo.status == 'completed') {
        bot.reply(message, 'OK! nos vemos');
      }
    });
  });
});