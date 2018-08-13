class Preloader extends Phaser.State {
  preload() {
    // IMAGES
    this.game.load.image('tom_warrior', 'images/tom_warrior.png');
    this.game.load.image('tom_archer', 'images/tom_archer.png');
    this.game.load.image('tom_merchant', 'images/tom_merchant.png');
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
    this.game.load.image('item_burn_lotion_1', 'images/item_burn_lotion_1.png');
    this.game.load.image('item_potion_1', 'images/item_potion_1.png');
    this.game.load.image('item_quiver_1', 'images/item_quiver_1.png');
    this.game.load.image('item_shield_1', 'images/item_shield_1.png');
    this.game.load.image('item_relic_2', 'images/item_relic_2.png');
    this.game.load.image('icon_coin', 'images/icon-coin.png');
    this.game.load.image('icon_shield', 'images/icon-shield.png');
    this.game.load.image('icon_arrow', 'images/icon-arrow.png');
    this.game.load.image('title_merchant', 'images/title_merchant.png');
    this.game.load.image('title', 'images/title.png');

    // AUDIO
    this.game.load.audio('bg_music', 'audio/music-idle-loop.mp3');
    this.game.load.audio('combat_music', 'audio/music-combat-loop.mp3');
    this.game.load.audio('enter_combat', 'audio/sfx-combat.mp3');
    this.game.load.audio('sfx-arrow', 'audio/sfx-arrow.mp3');
    this.game.load.audio('sfx-block', 'audio/sfx-block.mp3');
    this.game.load.audio('sfx-hit1', 'audio/sfx-hit1.mp3');
    this.game.load.audio('sfx-hit2', 'audio/sfx-hit2.mp3');
    this.game.load.audio('sfx-inventory-drop', 'audio/sfx-inventory-drop.mp3');
    this.game.load.audio('sfx-inventory-lift', 'audio/sfx-inventory-lift.mp3');
    this.game.load.audio('sfx-inventory-throw', 'audio/sfx-inventory-throw.mp3');
    this.game.load.audio('sfx-lose', 'audio/sfx-lose.mp3');
    this.game.load.audio('sfx-monster1', 'audio/sfx-monster1.mp3');
    this.game.load.audio('sfx-monster2', 'audio/sfx-monster2.mp3');
    this.game.load.audio('sfx-monster3', 'audio/sfx-monster3.mp3');
    this.game.load.audio('sfx-pop1', 'audio/sfx-pop1.mp3');
    this.game.load.audio('sfx-pop2', 'audio/sfx-pop2.mp3');
    this.game.load.audio('sfx-pop3', 'audio/sfx-pop3.mp3');
    this.game.load.audio('sfx-sword', 'audio/sfx-sword.mp3');
    this.game.load.audio('sfx-win-1', 'audio/sfx-win-1.mp3');
    this.game.load.audio('sfx-win-0', 'audio/sfx-win-0.mp3');
    this.game.load.audio('sfx-sfx-win-generic-1', 'audio/sfx-win-generic-1.mp3');
    this.game.load.audio('sfx-sfx-win-generic-2', 'audio/sfx-win-generic-2.mp3');
    this.game.load.audio('sfx-laugh1', 'audio/sfx-laugh1.mp3');
    this.game.load.audio('sfx-laugh2', 'audio/sfx-laugh2.mp3');
    this.game.load.audio('sfx-laugh3', 'audio/sfx-laugh3.mp3');
    this.game.load.audio('sfx-laugh4', 'audio/sfx-laugh4.mp3');
    this.game.load.audio('sfx-scared1', 'audio/sfx-scared1.mp3');
    this.game.load.audio('sfx-scared2', 'audio/sfx-scared2.mp3');
    this.game.load.audio('sfx-scared3', 'audio/sfx-scared3.mp3');
    this.game.load.audio('sfx-corruption', 'audio/sfx-corruption.mp3');
    this.game.load.audio('sfx-burn', 'audio/sfx-burn.mp3');
    this.game.load.audio('sfx-poison', 'audio/sfx-poison.mp3');
  }

  create() {
    this.game.state.start('Title');
  }
}


module.exports = Preloader;
