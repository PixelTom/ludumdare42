const BaseChar = require('./BaseChar');
const properties = require('../properties');

class MonsterChar extends BaseChar {
  constructor(game, key) {
    key = key || 'tom_monster_minotaur';
    super(game, 900, properties.baseY, key, null);

    const data = {
      HP: 5,
      MAX_HP: 5,
      NAME: 'Generic',
      ATTACK: 1,
      BLOCK_CHANCE: 0.5,
      FRIEND: false,
      FOE: true,
    };

    this.initData(data);
  }
}

module.exports = MonsterChar;
