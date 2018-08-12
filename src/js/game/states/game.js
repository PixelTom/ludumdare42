const MonsterManager = require('../logic/MonsterManager');
const PartyManager = require('../logic/PartyManager');
const EncounterManager = require('../logic/EncounterManager');
const ItemManager = require('../logic/ItemManager');
const properties = require('../properties');

// set global so it's not accessible via console. (this file should be scoped right?)
let bosses = 0;
let textScoreVal;

class Game extends Phaser.State {
  create(game) {
    this.setup();
  }

  setup() {
    const bg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tom_bg');
    bg.anchor.setTo(0.5, 0.5);

    // no bg manager because lazy
    const dungBG1 = this.game.add.sprite(0, 0, 'dungeon_bg');
    const dungBG2 = this.game.add.sprite(dungBG1.width, 0, 'dungeon_bg');
    this.dungBG = [dungBG1, dungBG2];

    this.partyManager = new PartyManager(this.game);
    this.monsterManager = new MonsterManager(this.game);
    this.itemManager = new ItemManager(this.game);
    this.itemManager.connectHeroes(this.partyManager);
    this.encounterManager = new EncounterManager(this.game, this.partyManager, this.monsterManager);
    this.encounterManager.onWin.add(this.winEncounter, this);
    this.encounterManager.onLose.add(this.loseEncounter, this);
    this.encounterManager.dropLoot.add(this.itemManager.dropLoot, this.itemManager);
    this.partyManager.dropLoot.add(this.itemManager.dropLoot, this.itemManager);

    bosses = 0;
    const scoreCnt = this.game.add.group();
    scoreCnt.x = 600;
    scoreCnt.y = 20;
    const textScore = this.game.make.text(0, 10, 'Defeated:', {
      font: 'normal 30px "Press Start 2P"',
      fill: '#ffffff',
    });
    textScoreVal = this.game.make.text(280, 0, bosses, {
      font: 'normal 50px "Press Start 2P"',
      fill: '#ffffff',
    });
    scoreCnt.add(textScore);
    scoreCnt.add(textScoreVal);

    // music
    this.bgMusic = this.game.add.audio('bg_music');
    this.bgMusic.loop = true;
    this.comMusic = this.game.add.audio('combat_music');
    this.comMusic.loop = true;
    this.sfx = {
      combat: this.game.add.audio('enter_combat'),
    };

    this.explorePhase();
  }

  explorePhase() {
    console.log('Exlore Phase');
    this.partyManager.walk();
    // this.itemManager.startWalk();
    this.game.time.events.add(properties.exploreTimer, this.newEncounter, this);

    this.exploring = true;

    // setTimeout( () => {
    this.bgMusic.play();
    this.comMusic.stop();
    // }, 2000);
  }

  recheckItemWalks() {
    this.itemManager.startWalk();
  }

  newEncounter() {
    console.log('New Encounter');
    this.partyManager.stop();
    // this.itemManager.stopWalk();
    this.encounterManager.newEncounter();
    // enemyMonster = new MonsterChar(this.game, this.EncounterManager.getMonster());
    // this.enemyGroup.add(enemyMonster);

    // no bg manager because lazy
    this.exploring = false;

    this.bgMusic.stop();
    this.sfx.combat.play();
    // this.sfx.combat.onStop.addOnce( () => {
    this.comMusic.play();
    // } );
  }

  update() {
    if (this.exploring) {
      for (const bg of this.dungBG) {
        bg.x -= 2;
        if (bg.x <= -bg.width) {
          bg.x = bg.width;
        }
      }

      this.itemManager.dropGroup.forEach((item) => {
        item.x -= 3;

        if (item.x < 0) {
          item.destroy();
        }
      });
    }
  }

  winEncounter() {
    console.log('game.win');
    bosses++;
    this.updateScore();
    this.explorePhase();
  }

  loseEncounter() {
    console.log('Game over :(');
    this.game.state.start('End');
  }

  updateScore() {
    textScoreVal.text = bosses;
  }
}


module.exports = Game;
