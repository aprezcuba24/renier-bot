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
      .push('plan')
      .get('hola')
      .get('¿Qué hiciste ayer?')
      .push('trabajé en discrepante')
      .get('¿Algo más?')
      .push('trabajé en dressingLab')
      .get('¿Algo más?')
      .push('nada más')
      .get('OK! nos vemos')
      .start(done)
    ;
  });
});