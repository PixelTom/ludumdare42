const _ = require('lodash');
const properties = require('../properties');

class Item extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.generateKeys();
    this.anchor.setTo(0.5, 0.5);
    this.inputEnabled = true;
    this.input.disableDrag();
    this.input.draggable = false;
    this.events.onInputDown.add(this.onTap, this);
    this.events.onInputUp.add(this.onUp, this);
    this.events.onDragStart.add(this.onDragStart, this);
    this.events.onDragStop.add(this.onDragStop, this);
    this.inInventory = false;
    this.dropped = new Phaser.Signal();
    this.tapped = new Phaser.Signal();
    this.attack = this.genAttack(key);
    this.slotID = -1;
  }

  toss(dirMod = 1) {
    console.log('dirMod', 1);
    this.loadTexture(this.giftKey);
    this.game.physics.arcade.enable(this, false);
    this.game.physics.arcade.setBounds(0, 0, 1024, 512);
    this.body.collideWorldBounds = true;
    this.body.enable = true;
    this.body.bounce.y = 0.3;
    this.body.bounce.x = 0.8;
    this.body.gravity.y = 1500;
    this.body.velocity.x = ((Math.random() * -800) - 250) * dirMod;
    this.body.velocity.y = ((Math.random() * -450) - 100) * dirMod;
    this.body.drag.x = 500;
    this.body.drag.y = 50;
    this.scale.x = 0.5;
    this.scale.y = 0.5;
    this.inInventory = false;
    this.input.draggable = false;
    this.input.disableDrag();
  }

  flipIt() {
    this.body.velocity.x = (Math.random() * -400) + 200;
    this.body.velocity.y = (Math.random() * -450) - 100;
  }

  placeInBag(slot, forced = false) {
    this.loadTexture(this.itemKey.KEY);
    if (this.body) {
      this.body.enable = false;
    }
    slot.occupied = true;
    this.x = slot.x;
    this.y = slot.y;
    this.scale.x = 1;
    this.scale.y = 1;
    this.slotID = slot.id;
    this.inInventory = true;
    if (forced) {
      this.input.draggable = true;
      this.input.enableDrag(true);
    }
  }


  onTap(sprite, pointer) {
    if (this.inInventory) {
      return;
    }
    this.tapped.dispatch(this);
    console.log('tapped');
  }

  onUp(sprite, pointer) {
    console.log('onUp');
    if (this.inInventory) {
      this.input.draggable = true;
      this.input.enableDrag(true);
    }
  }

  onDragStart(sprite, pointer) {
    if (!this.inInventory) {
      return;
    }
    this.bringToTop();
    console.log('Drag Start');
  }

  onDragStop(sprite, pointer) {
    if (!this.inInventory) {
      return;
    }
    console.log('Drop Start');
    this.dropped.dispatch(sprite, pointer);
  }

  genAttack(itemName) {
    switch (itemName) {
      case 'item_potion_1':
        return { DAMAGE: -2 };
        break;
    }
  }

  generateKeys() {
    // random for now
    const gifts = [
      'item_gift_1',
      'item_gift_2',
      'item_gift_3',
      'item_gift_4',
      'item_gift_5',
    ];
    const items = [
      {
        KEY: 'item_antidote_1',
        VALUE: 1,
        STATUS: 'POISON',
        HEAL: true,
      },
      {
        KEY: 'item_head_1',
        VALUE: 4,
        EXCLUSIONS: ['ARCHER', 'WARRIOR'],
      },
      {
        KEY: 'item_holy_water_1',
        VALUE: 1,
        STATUS: 'CORRUPTION',
        HEAL: true,
      },
      {
        KEY: 'item_junk_1',
        VALUE: 1,
        EXCLUSIONS: ['ARCHER', 'WARRIOR'],
      },
      {
        KEY: 'item_potion_1',
        VALUE: 1,
        DAMAGE: -2,
        HEAL: true,
      },
      {
        KEY: 'item_quiver_1',
        VALUE: 2,
        EXCLUSIONS: ['WARRIOR'],
        STATUS: 'ARROWS',
        HEAL: true,
      },
      {
        KEY: 'item_shield_1',
        VALUE: 3,
        EXCLUSIONS: ['ARCHER'],
        STATUS: 'ARMOUR',
        HEAL: true,
      },
    ];

    for (let i = 0; i < items.length; i++) {
      items[i].VALUE = items[i].VALUE || 0;
      items[i].EXCLUSIONS = items[i].EXCLUSIONS || [];
      items[i].DAMAGE = items[i].DAMAGE || 0;
      items[i].STATUS = items[i].STATUS || '';
      items[i].HEAL = items[i].HEAL || false;
      items[i].ITEM = true;
      items[i].STATUS_CHANCE = 1;
    }

    this.giftKey = _.sample(gifts);
    this.itemKey = _.sample(items);
  }

  update() {

  }
}


module.exports = Item;
