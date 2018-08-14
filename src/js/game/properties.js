const npmProperties = require('../../../package.json');

module.exports = {
  title: 'Dungeon Trader',
  description: npmProperties.description,
  port: 3017,
  liveReloadPort: 3018,
  mute: false,
  showStats: false,
  size: {
    x: 512,
    y: 512,
  },
  background: '#000',
  autoScale: true,
  // analyticsId: 'UA-50892214-2'

  // Positional properties
  gravity: 1,
  floorY: 250,
  baseY: 200,
  bagThreshold: 60,
  heroThresholdX: 35,
  heroThresholdY: 50,
  sellTimeout: 1500,

  // Explore properties
  exploreTimer: 6000, // How long to walk pre-battle

  // Combat properties
  turnTimer: 1000, // How long between turns
  postBattleTimer: 2000,
};
