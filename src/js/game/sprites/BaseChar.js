class BaseChar extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.anchor.setTo(0.5, 1);
    console.log("I'm a BaseChar", this);
  }

  initData(data) {
    this.data = data;
  }

  isAlive() {
    return this.data.ALIVE;
  }
}


module.exports = BaseChar;
