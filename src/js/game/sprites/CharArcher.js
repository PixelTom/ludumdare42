const BaseChar = require('./BaseChar');
const properties = require('../properties');

class CharArcher extends BaseChar {
  constructor(game, x, y, key, frame) {
    super(game, 400, properties.baseY, 'tom_archer', frame);

    const data = {
      HP: 5,
      MAX_HP: 5,
      NAME: 'Archer',
      AMMO: 5,
      ATTACK: 1,
      FRIEND: true,
      FOE: false,
    };

    this.initData(data);
  }
}

module.exports = CharArcher;
