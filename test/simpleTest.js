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
      .push('hello')
      .get('hello human')
      .start(done)
    ;
  });

  it('hi bot', (done) => {
    botMock.testRunner
      .push('hi bot')
      .get('hi human')
      .get('How are you?')
      .push('fine thanks you, and you?')
      .get('fine thanks')
      .start(done)
    ;
  });
});