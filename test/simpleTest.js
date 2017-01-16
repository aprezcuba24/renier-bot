/**
 * @author: Renier Ricardo Figueredo
 * @mail: aprezcuba24@gmail.com
 */

const botMock = require('./BotKitMock/SlackMock')();
const testedFile = require("../src/bots/simple");
const assert = require('assert');

describe("simple controller",() => {
  beforeEach((done) => {
    testedFile(botMock.bot, botMock.controller);
    done();
  });

  it('hello', (done) => {
    botMock.testRunner
      .human('hello')
      .bot('hello human')
      .start(done)
    ;
  });

  it('hi bot', (done) => {
    botMock.testRunner
      .human('hi bot')
      .bot('hi human')
      .bot('How are you?')
      .human('fine thanks you, and you?')
      .bot('fine thanks')
      .start(done)
    ;
  });
});