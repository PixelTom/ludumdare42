const _ = require('lodash');
const BaseChar = require('./BaseChar');
const properties = require('../properties');

class CharMerchant extends BaseChar {
  constructor(game, x, y, key, frame) {
    super(game, 200, properties.baseY, 'tom_merchant', frame);

    const data = {
      NAME: 'MERCHANT',
      FRIEND: true,
      ITEMS: 0,
    };
    this.dropLoot = new Phaser.Signal();
    this.initData(data);
  }

  giveItem(item) {
    _.sample(this.game.state.getCurrentState().sfx.laugh).play();
    this.throb();
    this.startTimer();
    this.data.ITEMS += item.itemKey.VALUE;
    return true;
  }

  throb() {
    if (this.throbY && this.throbY.isRunning) {
      return;
    }
    this.throbY = this.game.add.tween(this.scale).to({ y: 1.2 }, 100 + (Math.random() * 100), 'Linear', true, 0, -1, true);
    this.throbX = this.game.add.tween(this.scale).to({ x: 1.1 }, 100 + (Math.random() * 100), 'Linear', true, 0, -1, true);
  }

  startTimer() {
    if (this.timer) {
      this.game.time.events.remove(this.timer);
    }
    this.timer = this.game.time.events.add(properties.sellTimeout, this.trade, this);
  }

  trade() {
    while (this.data.ITEMS > 0) {
      this.dropLoot.dispatch({ x: 200, dirMod: -1 });
      this.data.ITEMS -= 1;
      setTimeout( () => {
        _.sample(this.game.state.getCurrentState().sfx.pop).play();
      }, Math.random() * 200 )
    }
    this.timer = null;
    this.throbY.stop();
    this.throbX.stop();
    this.scale.x = 1;
    this.scale.y = 1;
  }
}

module.exports = CharMerchant;
