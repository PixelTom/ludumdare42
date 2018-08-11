const npmProperties = require('../../../package.json');

module.exports = {
  title: 'Phaser JS Boilerplate',
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
  autoScale: true,
  // analyticsId: 'UA-50892214-2'
};
