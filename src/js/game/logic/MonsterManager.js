const _ = require('lodash');
const MonsterChar = require('../sprites/MonsterChar');

class MonsterManager {
  constructor(game) {
    this.game = game;
    this.monsterGroup = this.game.add.group();
    this.onDeath = new Phaser.Signal();
    this.diff = {
      DAMAGE: 1,
      BLOCK_CHANCE: 0,
    };
    this.blockBuff = {
      // affects: this.diff.BLOCK_CHANCE,
      turns: 1,
      reset: 1,
      buff: 0.1,
      max: 0.6,
    };
    this.damageBuff = {
      // affects: this.diff.DAMAGE,
      turns: 3,
      reset: 3,
      buff: 1,
      max: 4,
    };
  }

  genMonster() {
    if (this.monster != null) {
      this.removeMonster();
    }
    this.monster = new MonsterChar(this.diff, this.game);
    this.monster.onDeath.add(this.handleDeath, this);
    this.monsterGroup.add(this.monster);
  }

  removeMonster() {
    this.monster.destroy();
    this.monster = null;

    const buffItUp = function (buff, prop) {
      buff.turns -= 1;
      if (buff.turns <= 0) {
        console.log('Buff!');
        buff.turns = buff.reset;
        prop = Math.min(prop + buff.buff, buff.max);
      }
      return prop;
    };

    this.diff.BLOCK_CHANCE = buffItUp(this.blockBuff, this.diff.BLOCK_CHANCE);
    this.diff.DAMAGE = buffItUp(this.damageBuff, this.diff.DAMAGE);
    console.log('DIFF', this.diff);
  }

  handleDeath() {
    console.log('handleDeath');
    this.game.state.getCurrentState().sfx.musicCom.stop();
    _.sample(this.game.state.getCurrentState().sfx.win).play();
    this.onDeath.dispatch();
  }
}

module.exports = MonsterManager;
