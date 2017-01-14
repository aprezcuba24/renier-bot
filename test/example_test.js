/**
 * @author: Renier Ricardo Figueredo
 * @mail: aprezcuba24@gmail.com
 */

'use strict';

return;//no usar por ahora

const assert = require('assert');
const botMock = require('../mocks/botMock');
const testedFile = require("../src/bots/example_test");

describe("controller tests",()=>{
  beforeEach((done)=>{
    var self = this;
    self.slackId = 'test'
    self.userName = 'test'
    self.controller =new botMock.controller(self.slackId,self.userName)
    testedFile(self.controller.bot,self.controller)
    done();
  });

  it('should return `help message` if user types `help`', (done)=>{
    var self = this;
    self.controller.usersInput([{
      //by if type null we using type: direct_message
      type: null,
      first:true,
      user: self.slackId,
      messages:[{text: 'help', isAssertion:true}]
    }]).then((text)=>{
      console.log('text =>', text)
      assert.equal(text, 'help message')
      done()
    })
  });

  it('should return `hey there` if a user types `hi`', (done)=>{
    var self = this;
    self.controller.usersInput([{
      //by if type null we using type: direct_message
      type: null,
      first:true,
      user: self.slackId,
      messages:[{text: 'hi', isAssertion:true}]
    }]).then((text)=>{
      console.log('text =>', text)
      assert.equal(text, 'hey there')
      done()
    })
  });

  it('should return question `here a question` if user type any text after `hi`', (done)=>{
    var self = this;
    self.controller.usersInput([{
      //by if type null we using type: direct_message
      type: null,
      first:true,
      user: self.slackId,
      messages:[{text: 'hi'}, {text: 'its true', isAssertion:true}]
    }]).then((text)=>{
      console.log('text =>', text)
      assert.equal(text, 'here a question')
      done()
    })
  });

  it('should return `..user typed any text after `hi`` if user types any text after `hi`', (done)=>{
    var self = this;
    self.controller.usersInput([{
      //by if type null we using type: direct_message
      type: null,
      first:true,
      user: self.slackId,
      // deep indicates which message to return in then .then()
      // ie deep: 1, text => its true. deep:2, text => hi
      messages:[{text: 'hi'}, {text: 'its true', isAssertion:true, deep: 1}]
    }]).then((text)=>{
      console.log('textt =>', text)
      assert.equal(text, '..user typed any text after `hi`')
      done()
    })
  });

  it('should return `here a question` if user type any text after bot says `..user typed any text after `hi``', (done)=>{
    var self = this;
    self.controller.usersInput([{
      //by if type null we using type: direct_message
      type: null,
      first:true,
      user: self.slackId,
      messages:[{text: 'hi'}, {text: 'random user message 1'}, {text: 'random user message 2', isAssertion:true, }]
    }]).then((text)=>{
      console.log('text =>', text)
      assert.equal(text, 'here an answer')
      done()
    })
  });

  it('should return `hello bot reply` (through bot.reply) in channel if user types `hello bot reply` in channel', (done)=>{
    var self = this;
    self.controller.usersInput([{
      //by if type null we using type: direct_message
      type: null,
      first: true,
      user: self.slackId,
      messages:[{channel: "newbies", text: 'hello bot reply', isAssertion: true}]
    }]).then((text)=>{
      console.log('text =>', self.controller.bot.detailedAnswers["newbies"][0]);
      assert.equal(self.controller.bot.detailedAnswers["newbies"][0], 'hello bot reply');
      done()
    })
  });

  it('should return `hello bot say` (through bot.say) in channel if user types `hello bot say` in channel', (done)=>{
    var self = this;
    self.controller.usersInput([{
      //by if type null we using type: direct_message
      type: null,
      first: true,
      user: self.slackId,
      messages:[{channel: "newbies", text: 'hello bot say', isAssertion: true}]
    }]).then((text)=>{
      console.log('text =>', self.controller.bot.detailedAnswers["newbies"][0]);
      assert.equal(self.controller.bot.detailedAnswers["newbies"][0], 'hello bot say');
      done()
    })
  });

  it('should return `hello bot direct_mention` if user types `hello bot direct` as direct_mention', (done)=>{
    var self = this;
    self.controller.usersInput([{
      //by if type null we using type: direct_message
      type: 'direct_mention',
      first: true,
      user: self.slackId,
      messages:[{text: 'hello bot direct', isAssertion: true}]
    }]).then((text)=>{
      assert.equal(text, 'hello bot direct_mention');
      done()
    })
  });

  it('should return `hello bot direct_message` if user types `hello bot direct_message` as direct_message', (done)=>{
    var self = this;
    self.controller.usersInput([{
      //by if type null we using type: direct_message
      type: 'direct_message',
      first: true,
      user: self.slackId,
      messages:[{text: 'hello bot direct', isAssertion: true}]
    }]).then((text)=>{
      assert.equal(text, 'hello bot direct_message');
      done()
    })
  });

  it('should return `hello bot multiple` if user types `hello bot multiple` as direct_message', (done)=>{
    var self = this;
    self.controller.usersInput([{
      //by if type null we using type: direct_message
      type: 'direct_message',
      first: true,
      user: self.slackId,
      messages:[{text: 'hello bot multiple', isAssertion: true}]
    }]).then((text)=>{
      assert.equal(text, 'hello bot multiple');
      done()
    })
  });

  it('should return `hello bot multiple` if user types `hello bot multiple` as ambient', (done)=>{
    var self = this;
    self.controller.usersInput([{
      //by if type null we using type: direct_message
      type: 'ambient',
      first: true,
      user: self.slackId,
      messages:[{text: 'hello bot multiple', isAssertion: true}]
    }]).then((text)=>{
      assert.equal(text, 'hello bot multiple');
      done()
    })
  });

  it('should return `hello bot multiple` if user types `hello bot multiple` as mention', (done)=>{
    var self = this;
    self.controller.usersInput([{
      //by if type null we using type: direct_message
      type: 'mention',
      first: true,
      user: self.slackId,
      messages:[{text: 'hello bot multiple', isAssertion: true}]
    }]).then((text)=>{
      assert.equal(text, 'hello bot multiple');
      done()
    })
  });
});
