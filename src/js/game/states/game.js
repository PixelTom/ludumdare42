const MonsterManager = require('../logic/MonsterManager');
const PartyManager = require('../logic/PartyManager');
const EncounterManager = require('../logic/EncounterManager');
const ItemManager = require('../logic/ItemManager');
const InputHelper = require('../logic/InputHelper');
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

    // music
    this.bgMusic = this.game.add.audio('bg_music');
    this.bgMusic.loop = true;
    this.comMusic = this.game.add.audio('combat_music');
    this.comMusic.loop = true;
    this.sfx = {
      musicBg: this.bgMusic,
      musicCom: this.comMusic,
      combat: this.game.add.audio('enter_combat'),
      arrow: this.game.add.audio('sfx-arrow'),
      block: this.game.add.audio('sfx-block'),
      hit: [this.game.add.audio('sfx-hit1'), this.game.add.audio('sfx-hit2')],
      invDrop: this.game.add.audio('sfx-inventory-drop'),
      invLift: this.game.add.audio('sfx-inventory-lift'),
      invThrow: this.game.add.audio('sfx-inventory-throw'),
      lose: this.game.add.audio('sfx-lose'),
      monster: [this.game.add.audio('sfx-monster1'), this.game.add.audio('sfx-monster2'), this.game.add.audio('sfx-monster3')],
      itemPlayer: this.game.add.audio('sfx-pop1'),
      itemMerchant: this.game.add.audio('sfx-pop3'),
      itemMonster: this.game.add.audio('sfx-pop2'),
      pop: [this.game.add.audio('sfx-pop1'), this.game.add.audio('sfx-pop2'), this.game.add.audio('sfx-pop3')],
      sword: this.game.add.audio('sfx-sword'),
      win: [this.game.add.audio('sfx-win-0'), this.game.add.audio('sfx-win-1'), this.game.add.audio('sfx-sfx-win-generic-1'), this.game.add.audio('sfx-sfx-win-generic-2')],
      laugh: [this.game.add.audio('sfx-laugh1'), this.game.add.audio('sfx-laugh2'), this.game.add.audio('sfx-laugh3'), this.game.add.audio('sfx-laugh4')],
      scared: [this.game.add.audio('sfx-scared1'), this.game.add.audio('sfx-scared2'), this.game.add.audio('sfx-scared3')],
      corruption: this.game.add.audio('sfx-corruption'),
      poison: this.game.add.audio('sfx-poison'),
      burn: this.game.add.audio('sfx-burn'),
    };

    // other instances
    this.inputHelper = new InputHelper( document.getElementById('game').children[0], this.game );
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
    this.game.state.getCurrentState().sfx.musicCom.stop();
    setTimeout(() => {
      this.game.state.start('End', true, false, bosses);
    }, 2000);
  }

  updateScore() {
    textScoreVal.text = bosses;
  }
}


module.exports = Game;
