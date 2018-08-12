const properties = require('../properties');

class Title extends Phaser.State {
  create(game) {
    this.setup();
  }

  setup() {
    const dungBG1 = this.game.add.image(0, 0, 'dungeon_bg');
    const dungBG2 = this.game.add.image(0, 512, 'dungeon_bg');
    const title = this.game.add.image(0, 0, 'title');

    const merchant = this.game.add.sprite(0, 0, 'title_merchant');
    merchant.scale.x = 2;
    merchant.scale.y = 2;
    merchant.x = 300;
    merchant.y = 800;

    this.game.input.onDown.add(this.startGame, this);
  }

  startGame() {
    this.game.state.start('Game');
  }
}


module.exports = Title;
