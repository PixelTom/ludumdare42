const BaseChar = require('./BaseChar');

class CharArcher extends BaseChar {
  constructor(game, x, y, key, frame) {
    super(game, 400, 500, 'tom_archer', frame);

    const data = {
      HP: 5,
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
