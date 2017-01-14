/**
 * @author: Renier Ricardo Figueredo
 * @mail: aprezcuba24@gmail.com
 */

/**
 * @author: Renier Ricardo Figueredo
 * @mail: aprezcuba24@gmail.com
 */

module.exports = function(bot, controller){
  // simple conversation
  controller.hears(['hi'], 'direct_message', function(bot, message){
    bot.startConversation(message, function(response, convo){
      convo.ask('hey there', function(response, convo){
        convo.say('..user typed any text after `hi`');
        convo.ask('here a question', function(response, convo){
          convo.say('here an answer');
          convo.next();
        })
        convo.next();
      })
    })
  });

};
