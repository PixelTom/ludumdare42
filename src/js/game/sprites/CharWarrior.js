const BaseChar = require('./BaseChar');
const properties = require('../properties');

class CharWarrior extends BaseChar {
  constructor(game, x, y, key, frame) {
    super(game, 600, properties.baseY, 'tom_warrior', frame);

    const data = {
      HP: 5,
      MAX_HP: 5,
      ARMOUR: 5,
      NAME: 'WARRIOR',
      ATTACK: 1,
      BLOCK_CHANCE: 0.5,
      FRIEND: true,
      FOE: false,
    };

    this.initData(data);
  }

  block() {
    this.data.ARMOUR -= 1;
    if (this.data.ARMOUR <= 0) {
      this.data.BLOCK_CHANCE = 0;
    }
  }

  checkSpecialItem(itemKey) {
    if (itemKey.STATUS == 'ARMOUR') {
      this.data.ARMOUR = 5;
      this.data.BLOCK_CHANCE = 0.5;
    }
    if (itemKey.STATUS == 'ARROWS') {
      return false;
    }
    return true;
  }
}

module.exports = CharWarrior;
