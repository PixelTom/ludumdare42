class Preloader extends Phaser.State {
  preload() {
    this.game.load.image('logo', 'images/phaser.png');
    // Tom temp assets
    this.game.load.image('tom_warrior', 'images/tom_warrior.png');
    this.game.load.image('tom_archer', 'images/tom_archer.png');
    this.game.load.image('tom_merchant', 'images/tom_merchant.png');
    this.game.load.image('tom_monster_generic', 'images/tom_monster_generic.png');
    this.game.load.image('tom_bg', 'images/tom_bg.jpg');
  }

  create() {
    this.game.state.start('Game');
  }
}


module.exports = Preloader;
