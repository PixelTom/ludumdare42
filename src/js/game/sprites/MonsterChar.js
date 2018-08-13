const _ = require('lodash');
const BaseChar = require('./BaseChar');
const properties = require('../properties');

class MonsterChar extends BaseChar {
  constructor(prebuild, game, key) {
    key = key || 'tom_monster_minotaur';
    super(game, 450, properties.baseY, key, null);

    const data = {
      HP: 5,
      MAX_HP: 5,
      NAME: 'Minodoot',
      DAMAGE: prebuild.DAMAGE,
      BLOCK_CHANCE: prebuild.BLOCK_CHANCE,
      FRIEND: false,
      FOE: true,
    };

    this.initData(data);

    let status = [
      {
        STATUS: null,
        STATUS_DAMAGE: 0,
        COLOUR: null,
        SFX: null,
      },
      {
        STATUS: 'CORRUPTION',
        STATUS_DAMAGE: 1,
        COLOUR: 0x9e36ff,
        SFX: this.game.state.getCurrentState().sfx.corruption,
      },
      {
        STATUS: 'POISON',
        STATUS_DAMAGE: 1,
        COLOUR: 0x36ff90,
        SFX: this.game.state.getCurrentState().sfx.poison,
      },
      {
        STATUS: 'BURNED',
        STATUS_DAMAGE: 1,
        COLOUR: 0xffa836,
        SFX: this.game.state.getCurrentState().sfx.burn,
      },
    ];

    status = _.sample(status);
    this.data.STATUS = status.STATUS;
    this.data.STATUS_DAMAGE = status.STATUS_DAMAGE;
    this.data.COLOUR = status.COLOUR;
    this.data.STATUS_SFX = status.SFX;
    this.data.STATUS_CHANCE = _.sample([0.1, 0.2, 0.3, 0.4]);
    if (status.COLOUR) {
      this.tint = status.COLOUR;
    }
  }

  checkStatus() {
    // Monsters can't suffer damage from statuses
  }

  playAttackSound() {
    _.sample(this.game.state.getCurrentState().sfx.monster).play();
  }
}

module.exports = MonsterChar;
