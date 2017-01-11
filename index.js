if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var Botkit = require('botkit');
var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});
var bot = controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM();

controller.hears('hello',['direct_message','direct_mention','mention'], function(bot,message) {
  bot.reply(message,'Hello world.');
});