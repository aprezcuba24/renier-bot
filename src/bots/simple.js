/**
 * @author: Renier Ricardo Figueredo
 * @mail: aprezcuba24@gmail.com
 */

module.exports = function(bot, controller){
  controller.hears(['hello'], 'direct_message', function(bot, message){
    bot.reply(message, 'hello human');
  });

  controller.hears('hi bot',['direct_message','direct_mention','mention'], (bot,message) => {
    bot.startConversation(message, (err,convo) => {
      convo.say('hi human');
      convo.ask('How are you?', [
        {
          default: true,
          callback: function(response,convo) {
            convo.next();
          }
        }
      ]);
      convo.on('end', (convo) => {
        if (convo.status == 'completed') {
          bot.reply(message, 'fine thanks');
        }
      });
    });
  });
};
