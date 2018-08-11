const MonsterManager = require('../logic/MonsterManager');
const PartyManager = require('../logic/PartyManager');
const EncounterManager = require('../logic/EncounterManager');
const properties = require('../properties');

class Game extends Phaser.State {
  create(game) {
    this.tempSetup();
  }

  tempSetup() {
    const bg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tom_bg');
    bg.anchor.setTo(0.5, 0.5);

    this.partyManager = new PartyManager(this.game);
    this.monsterManager = new MonsterManager(this.game);
    this.encounterManager = new EncounterManager(this.game, this.partyManager, this.monsterManager);

    this.explorePhase();
  }

  explorePhase() {
    console.log('Exlore Phase');
    this.game.time.events.add(properties.exploreTimer, this.newEncounter, this);
  }

  newEncounter() {
    console.log('New Encounter');

    this.encounterManager.newEncounter();
    // enemyMonster = new MonsterChar(this.game, this.EncounterManager.getMonster());
    // this.enemyGroup.add(enemyMonster);
  }
}


module.exports = Game;
