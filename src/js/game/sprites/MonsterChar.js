const BaseChar = require('./BaseChar');

class MonsterChar extends BaseChar {
  constructor(game, key) {
    key = key || 'tom_monster_generic';
    super(game, 900, 500, 'tom_monster_generic', null);

    const data = {
      HP: 5,
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
