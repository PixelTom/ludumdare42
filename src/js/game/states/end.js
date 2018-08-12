const properties = require('../properties');

let music;

class End extends Phaser.State {
  create(game) {
    this.setup();
  }

  setup() {
    const dungBG1 = this.game.add.image(0, 0, 'dungeon_bg');
    const dungBG2 = this.game.add.image(0, 512, 'dungeon_bg');
    const textScore = this.game.make.text(0, 0, 'YOUR PARTY HAS DIED!\nTEST', {
      font: 'normal 30px "Press Start 2P"',
      fill: '#ffffff',
    });

    const merchant = this.game.add.sprite(0, 0, 'title_merchant');
    merchant.anchor.setTo(0.5, 0.5);
    merchant.scale.x = -2;
    merchant.scale.y = 2;
    merchant.x = this.game.world.centerX;
    merchant.y = 800;

    // music = this.game.add.audio('bg_music');
    // music.loop = true;
    // music.play();

    this.game.input.onDown.add(this.startGame, this);
  }

  startGame() {
    // music.stop();
    this.game.state.start('Title');
  }
}


module.exports = End;
