const MonsterManager = require('../logic/MonsterManager');
const PartyManager = require('../logic/PartyManager');
const EncounterManager = require('../logic/EncounterManager');
const ItemManager = require('../logic/ItemManager');
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
    this.itemManager = new ItemManager(this.game);
    this.itemManager.connectHeroes(this.partyManager);
    this.encounterManager = new EncounterManager(this.game, this.partyManager, this.monsterManager);
    this.explorePhase();
  }

  explorePhase() {
    console.log('Exlore Phase');
    this.partyManager.walk();
    this.game.time.events.add(properties.exploreTimer, this.newEncounter, this);
  }

  newEncounter() {
    console.log('New Encounter');
    this.partyManager.stop();
    this.encounterManager.onWin.add(this.winEncounter, this);
    this.encounterManager.onLose.add(this.loseEncounter, this);
    this.encounterManager.newEncounter();
    // enemyMonster = new MonsterChar(this.game, this.EncounterManager.getMonster());
    // this.enemyGroup.add(enemyMonster);
  }

  winEncounter() {
    console.log('game.win');
    this.explorePhase();
  }

  loseEncounter() {
    console.log('Game over :(');
  }
}


module.exports = Game;
