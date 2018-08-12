const BaseChar = require('./BaseChar');
const properties = require('../properties');

class CharArcher extends BaseChar {
  constructor(game, x, y, key, frame) {
    super(game, 400, properties.baseY, 'tom_archer', frame);

    const data = {
      HP: 5,
      MAX_HP: 5,
      NAME: 'ARCHER',
      ARROWS: 5,
      ATTACK: 1,
      FRIEND: true,
      FOE: false,
    };

    this.initData(data);
  }

  attack() {
    this.doAttackAnim();
    if (this.data.ARROWS <= 0) {
      return false;
    }
    this.data.ARROWS -= 1;
    return {
      DAMAGE: this.data.ATTACK,
    };
  }

  checkSpecialItem(itemKey) {
    if (itemKey.STATUS == 'ARROWS') {
      this.data.ARROWS = 5;
    }
    if (itemKey.STATUS == 'ARMOUR') {
      return false;
    }
    if (itemKey.STATUS == 'LIFE') {
      if (this.data.ALIVE) {
        return false;
      }
      this.revive();
      this.data.ARROWS = 5;
    }
    return true;
  }
}

module.exports = CharArcher;
