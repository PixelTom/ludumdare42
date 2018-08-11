const _ = require('lodash');
const properties = require('../properties');

class EncounterManager {
  constructor(game, party, monster) {
    this.game = game;
    this.current = null;
    this.party = party;
    this.monster = monster;
  }


  newEncounter() {
    console.log('EncounterManager.newEncounter');
    this.current = {
      active: true,
      attackArray: [this.party.archer, this.party.warrior, this.monster],
      battleRound: 0,
      turnRound: 0,
    };

    this.game.time.events.loop(properties.turnTimer, this.nextTurn, this);
  }

  genMonster() {
    this.current.monster = 'tom_monster_generic';
  }

  nextTurn() {
    const c = this.current;
    let target;
    // Who is attacking?
    const combatant = c.attackArray[c.turnRound];
    if (combatant.data.FOE) {
      if (combatant.data.RANGED) {
        target = _.sample([c.party.warrior, c.party.archer]);
      } else {
        target = c.party.warrior;
      }
    }

    c.turnRound++;
    if (c.turnRound >= c.attackArray.length) {
      c.turnRound = 0;
      c.battleRound++;
    }
  }
}

module.exports = EncounterManager;
