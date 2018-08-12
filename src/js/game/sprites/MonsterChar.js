const _ = require('lodash');
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

    let status = [
      {
        STATUS: null,
        STATUS_DAMAGE: 0,
        COLOUR: null,
      },
      {
        STATUS: 'CORRUPTION',
        STATUS_DAMAGE: 1,
        COLOUR: 0x9e36ff,
      },
      {
        STATUS: 'POISON',
        STATUS_DAMAGE: 1,
        COLOUR: 0x36ff90,
      },
      {
        STATUS: 'BURNED',
        STATUS_DAMAGE: 1,
        COLOUR: 0xffa836,
      },
    ];

    console.log();

    status = _.sample(status);
    this.data.STATUS = status.STATUS;
    this.data.STATUS_DAMAGE = status.STATUS_DAMAGE;
    this.data.COLOUR = status.COLOUR;
    this.data.STATUS_CHANCE = _.sample([0.1, 0.2, 0.3, 0.4]);
    if (status.COLOUR) {
      this.tint = status.COLOUR;
    }
  }
}

module.exports = MonsterChar;
