class BaseChar extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    console.log("I'm a BaseChar", game);
    super(game, x, y, key, frame);
  }
}


module.exports = BaseChar;
