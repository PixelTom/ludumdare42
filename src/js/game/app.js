const _ = require('lodash');
const properties = require('./properties');
const Boot = require('./states/Boot.js');
const Preloader = require('./states/Preloader.js');
const Game = require('./states/Game.js');

const states = {
  Boot,
  Preloader,
  Game,
};

const phaserGame = new Phaser.Game(properties.size.x, properties.size.y, Phaser.AUTO, 'game', {
  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  },
});

// Automatically register each state.
_.each(states, (state, key) => {
  phaserGame.state.add(key, state);
});

phaserGame.state.start('Boot');
