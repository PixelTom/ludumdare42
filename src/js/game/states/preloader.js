class Preloader extends Phaser.State {
  preload() {
    this.game.load.image('logo', 'images/phaser.png');
    // Tom temp assets
    this.game.load.image('tom_warrior', 'images/tom_warrior.png');
    this.game.load.image('tom_archer', 'images/tom_archer.png');
    this.game.load.image('tom_merchant', 'images/tom_merchant.png');
    this.game.load.image('tom_monster_generic', 'images/tom_monster_generic.png');
    this.game.load.image('tom_monster_minotaur', 'images/tom_monster_minotaur.png');
    this.game.load.image('tom_bg', 'images/tom_bg.png');
    this.game.load.image('dungeon_bg', 'images/dungeon_bg.png');
    this.game.load.image('item_antidote_1', 'images/item_antidote_1.png');
    this.game.load.image('item_gift_1', 'images/item_gift_1.png');
    this.game.load.image('item_gift_2', 'images/item_gift_2.png');
    this.game.load.image('item_gift_3', 'images/item_gift_3.png');
    this.game.load.image('item_gift_4', 'images/item_gift_4.png');
    this.game.load.image('item_gift_5', 'images/item_gift_5.png');
    this.game.load.image('item_head_1', 'images/item_head_1.png');
    this.game.load.image('item_holy_water_1', 'images/item_holy_water_1.png');
    this.game.load.image('item_junk_1', 'images/item_junk_1.png');
    this.game.load.image('item_junk_2', 'images/item_junk_2.png');
    this.game.load.image('item_junk_3', 'images/item_junk_3.png');
    this.game.load.image('item_junk_4', 'images/item_junk_4.png');
    this.game.load.image('item_aloe_1', 'images/item_aloe_1.png');
    this.game.load.image('item_potion_1', 'images/item_potion_1.png');
    this.game.load.image('item_quiver_1', 'images/item_quiver_1.png');
    this.game.load.image('item_shield_1', 'images/item_shield_1.png');
    // this.game.load.image('item_relic_1', 'images/item_relic_1.png');
    this.game.load.image('item_relic_2', 'images/item_relic_2.png');
    this.game.load.image('icon_coin', 'images/icon-coin.png');
    this.game.load.image('icon_shield', 'images/icon-shield.png');
    this.game.load.image('icon_arrow', 'images/icon-arrow.png');
    this.game.load.image('title_merchant', 'images/title_merchant.png');
    this.game.load.image('title', 'images/title.png');

    //audio
    this.game.load.audio('bg_music', 'audio/music-idle-loop.mp3');
    this.game.load.audio('combat_music', 'audio/music-combat-loop.mp3');
    this.game.load.audio('enter_combat', 'audio/sfx-combat.mp3');

  }

  create() {
    this.game.state.start('Title');
  }
}


module.exports = Preloader;
