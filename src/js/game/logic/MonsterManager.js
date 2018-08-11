const _ = require('lodash');
const MonsterChar = require('../sprites/MonsterChar');

class MonsterManager {
  constructor(game) {
    this.game = game;
    this.monsterGroup = this.game.add.group();
  }
}

module.exports = MonsterManager;
