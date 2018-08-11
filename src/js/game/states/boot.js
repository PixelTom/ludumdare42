const Stats = require('../../lib/stats.min');
const AutoScale = require('../../lib/autoscale');
const properties = require('../properties');

let stats;

class Boot extends Phaser.State {
  create() {
    if (properties.showStats) {
      this.addStats(this.game);
    }

    if (properties.autoScale) {
      AutoScale();
    }

    this.game.sound.mute = properties.mute;

    this.game.state.start('Preloader');
  }

  addStats(game) {
    stats = new Stats();

    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);

    // Monkey patch Phaser's update in order to correctly monitor FPS.
    const oldUpdate = game.update;
    game.update = function () {
      stats.begin();
      oldUpdate.apply(game, arguments);
      stats.end();
    };
  }
}

module.exports = Boot;
