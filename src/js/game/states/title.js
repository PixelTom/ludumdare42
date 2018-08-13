const properties = require('../properties');

let music;

class Title extends Phaser.State {
  create(game) {
    this.setup();
  }

  setup() {
    const textScore = this.game.make.text(0, 0, 'TEST', {
      font: 'normal 15px "Press Start 2P"',
      fill: '#ffffff',
    });
    const dungBG1 = this.game.add.image(0, 0, 'dungeon_bg');
    const dungBG2 = this.game.add.image(0, 256, 'dungeon_bg');
    const title = this.game.add.image(0, 0, 'title');

    const merchant = this.game.add.sprite(0, 0, 'title_merchant');
    merchant.scale.x = 2;
    merchant.scale.y = 2;
    merchant.x = 150;
    merchant.y = 400;

    music = this.game.add.audio('bg_music');
    music.loop = true;
    music.play();

    let credits = null;

    const startGame = function () {
      music.stop();
      this.game.state.start('Game');
    };

    const showCredits = function (phase) {
      const textArray = [
        'CODE, ART & SOUND\n\nGITHUB.COM/PIXELTOM\nGITHUB.COM/AKURN',
        'ADDITIONAL ART\n\nGITHUB.COM/DEVELOPERALAN\nDEVIANTART.COM/ORTEIL\nCCRGEEK.WORDPRESS.COM',
        'CLICK TO PLAY',
      ];
      if (credits != null) {
        credits.destroy();
      }
      credits = this.game.add.text(this.game.world.centerX, this.game.world.height * 0.6, textArray[phase], {
        font: 'normal 15px "Press Start 2P"',
        fill: '#36ff90',
        align: 'center',
      });
      credits.anchor.setTo(0.5, 0.5);
      const tweenA = this.game.add.tween(credits).from({ alpha: 0 }, 500, 'Linear', true);
      const tweenB = this.game.add.tween(credits).to({ alpha: 0 }, 500, 'Linear', false, 3700);

      tweenA.chain(tweenB);

      phase += 1;
      if (phase > 2) {
        phase = 0;
      }
      this.game.time.events.add(5000, showCredits, this, phase);
    };

    this.game.input.onDown.add(startGame, this);
    this.game.time.events.add(2000, showCredits, this, 0);
  }
}


module.exports = Title;
