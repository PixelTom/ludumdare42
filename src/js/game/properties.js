const npmProperties = require('../../../package.json');

module.exports = {
  title: 'Ludum Dare 42',
  description: npmProperties.description,
  port: 3017,
  liveReloadPort: 3018,
  mute: false,
  showStats: true,
  size: {
    x: 1024,
    y: 1024,
  },
  background: '#000',
  autoScale: false,
  // analyticsId: 'UA-50892214-2'

  // Positional properties
  gravity: 1,
  floorY: 500,
  baseY: 400,
  bagThreshold: 120,
  heroThresholdX: 40,
  heroThresholdY: 100,
  sellTimeout: 4500,

  // Explore properties
  exploreTimer: 3000, // How long to walk pre-battle

  // Combat properties
  turnTimer: 1000, // How long between turns
  postBattleTimer: 2000,
};
