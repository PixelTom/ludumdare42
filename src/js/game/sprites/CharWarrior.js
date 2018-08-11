const BaseChar = require('./BaseChar');
const properties = require('../properties');

class CharWarrior extends BaseChar {
  constructor(game, x, y, key, frame) {
    super(game, 600, properties.baseY, 'tom_warrior', frame);

    const data = {
      HP: 5,
      ARMOUR: 5,
      NAME: 'Warrior',
      ATTACK: 1,
      BLOCK_CHANCE: 0.5,
      FRIEND: true,
      FOE: false,
    };

    this.initData(data);
  }
}

module.exports = CharWarrior;
