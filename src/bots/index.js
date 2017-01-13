/**
 * @author: Renier Ricardo Figueredo
 * @mail: aprezcuba24@gmail.com
 */

module.exports = function(bot, controller){
  controller.hears('plan',['direct_message','direct_mention','mention'], (bot,message) => {
    bot.startConversation(message, (err,convo) => {
      convo.say('hola');
      convo.ask('¿Qué hiciste ayer?', [
        // {
        //   pattern: 'nada',
        //   callback: function(response,convo) {
        //     convo.completed();
        //   }
        // },
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
};
