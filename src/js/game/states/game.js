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

    //no bg manager because lazy
    const dungBG1 = this.game.add.sprite(0, 0, 'dungeon_bg');
    const dungBG2 = this.game.add.sprite(dungBG1.width, 0, 'dungeon_bg');
    this.dungBG = [ dungBG1, dungBG2 ]

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
    this.itemManager.startWalk();
    this.game.time.events.add(properties.exploreTimer, this.newEncounter, this);

    this.bgwalking = true;
  }

  update() {
    if (this.bgwalking) {
      for (const bg of this.dungBG) {
        bg.x -= 2;
        if (bg.x <= -bg.width) {
          bg.x = bg.width
        }
      }
    }
  }

  newEncounter() {
    console.log('New Encounter');
    this.partyManager.stop();
    this.itemManager.stopWalk();
    this.encounterManager.onWin.add(this.winEncounter, this);
    this.encounterManager.onLose.add(this.loseEncounter, this);
    this.encounterManager.dropLoot.add(this.itemManager.dropLoot, this.itemManager);
    this.encounterManager.newEncounter();
    // enemyMonster = new MonsterChar(this.game, this.EncounterManager.getMonster());
    // this.enemyGroup.add(enemyMonster);

    //no bg manager because lazy
    this.bgwalking = false;
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
