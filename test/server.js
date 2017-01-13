'use strict';
const assert = require('assert');
const botMock = require('../mocks/botMock');
const testedFile = require("../src/bots/index");

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
      messages:[{text: 'plan', isAssertion:true}]
    }]).then((text)=>{
      console.log('text =>', text)
      assert.equal(text, 'hola')
      done()
    })
  });
});
