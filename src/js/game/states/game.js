const BaseChar = require('../sprites/BaseChar');

class Game extends Phaser.State {
  create(game) {
    this.tempSetup();
  }

  tempSetup() {
    const bg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tom_bg');
    bg.anchor.setTo(0.5, 0.5);

    const partyGroup = this.game.add.group();

    const derp = new BaseChar(this.game, this.game.world.centerX, this.game.world.centerY, 'tom_warrior');
    this.game.world.add(derp);
    derp.anchor.setTo(0.5, 0.5);
  }
}


module.exports = Game;
