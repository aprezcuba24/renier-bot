'use strict';
const assert = require('assert');
const botMock = require('./BotKitMock/SlackMock')();
const testedFile = require("../src/bots/index");

describe("controller tests",()=>{
  beforeEach((done)=>{
    testedFile(botMock.bot, botMock.controller);
    done();
  });

  it('hello', (done) => {
    botMock.testRunner
      .human('plan')
      .bot('hola')
      .bot('¿Qué hiciste ayer?')
      .human('trabajé en discrepante')
      .bot('¿Algo más?')
      .human('trabajé en dressingLab')
      .bot('¿Algo más?')
      .human('nada más')
      .bot('OK! nos vemos')
      .start(done)
    ;
  });
});