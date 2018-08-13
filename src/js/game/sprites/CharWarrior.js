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
      DAMAGE: 1,
      BLOCK_CHANCE: 0.5,
      FRIEND: true,
      FOE: false,
    };

    this.initData(data);
  }

  block() {
    this.game.state.getCurrentState().sfx.block.play();
    this.hud.statusText('BLOCKED', {
      x: this.x - 100,
      y: this.y - 100,
      parent: this.parent,
      color: 0xffffff,
    });
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
    if (itemKey.STATUS == 'LIFE') {
      if (this.data.ALIVE) {
        return false;
      }
      this.revive();
      this.data.ARMOUR = 5;
      this.data.BLOCK_CHANCE = 0.5;
    }
    return true;
  }

  playAttackSound() {
    this.game.state.getCurrentState().sfx.sword.play();
  }
}

module.exports = CharWarrior;
