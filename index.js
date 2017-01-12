let config = require('./config');

if (!config.SLACK_TOKEN) {
  console.log('Error: Specify token in config file');
  process.exit(1);
}

let Botkit = require('botkit');
let controller = Botkit.slackbot({
  debug: false
});
let bot = controller.spawn({
  token: config.SLACK_TOKEN
}).startRTM();

controller.hears('hello',['direct_message','direct_mention','mention'], function(bot,message) {
  bot.reply(message,'Hello world.');
});