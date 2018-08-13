const _ = require('lodash');
const properties = require('../properties');

class EncounterManager {
  constructor(game, party, monster) {
    this.game = game;
    this.current = null;
    this.party = party;
    this.party.onDeath.add(this.loseEncounter, this);
    this.monster = monster;
    this.monster.onDeath.add(this.winEncounter, this);
    this.onWin = new Phaser.Signal();
    this.onLose = new Phaser.Signal();
    this.dropLoot = new Phaser.Signal();
  }

  newEncounter() {
    this.monster.genMonster();
    this.current = {
      active: true,
      attackArray: [this.party.archer, this.party.warrior, this.monster.monster],
      battleRound: 0,
      turnRound: 0,
    };

    this.loopEvent = this.game.time.events.loop(properties.turnTimer, this.nextTurn, this);
  }

  nextTurn() {
    const c = this.current;
    const combatant = c.attackArray[c.turnRound];
    if (combatant.isAlive() && combatant.canAttack()) {
      this.inactTurn(c, combatant);
    } else {
      console.log(`${combatant.data.NAME} is dead, skipping turn...`);
      this.prepNext(c);
      this.nextTurn();
    }
  }

  inactTurn(c, combatant) {
    let target;
    if (combatant.data.FOE) {
      if (combatant.data.RANGED) {
        target = this.party.getRandomAlive();
      } else {
        target = this.party.getNextAlive();
      }
    } else {
      target = this.monster.monster;
    }

    // Attack
    const cantAttack = combatant.attack();
    let result = false;
    if (cantAttack) { // lazy
      result = target.defend(combatant.data);
    }

    combatant.checkStatus();

    // Post attack tasks
    if (target.data.FOE && result) {
      this.dropLoot.dispatch();
    }

    this.prepNext(c);
  }

  prepNext(c) {
    c.turnRound += 1;
    if (c.turnRound >= c.attackArray.length) {
      c.turnRound = 0;
      c.battleRound += 1;
    }
  }

  winEncounter() {
    console.log('Monster slain!');
    this.game.time.events.remove(this.loopEvent);
    this.game.time.events.add(properties.postBattleTimer, this.cleanUp, this);
  }

  loseEncounter() {
    console.log('Party slain!');
    this.game.time.events.remove(this.loopEvent);
    this.onLose.dispatch();
  }

  cleanUp() {
    this.monster.removeMonster();
    this.onWin.dispatch();
  }
}

module.exports = EncounterManager;
