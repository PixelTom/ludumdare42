const _ = require('lodash');
const MonsterChar = require('../sprites/MonsterChar');

class MonsterManager {
  constructor(game) {
    this.game = game;
    this.monsterGroup = this.game.add.group();
    this.onDeath = new Phaser.Signal();
  }

  genMonster() {
    if (this.monster != null) {
      this.removeMonster();
    }
    this.monster = new MonsterChar(this.game);
    this.monster.onDeath.add(this.handleDeath, this);
    this.monsterGroup.add(this.monster);
  }

  removeMonster() {
    this.monster.destroy();
    this.monster = null;
  }

  handleDeath() {
    console.log('handleDeath');
    this.onDeath.dispatch();
  }
}

module.exports = MonsterManager;
