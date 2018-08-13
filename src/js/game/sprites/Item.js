const _ = require('lodash');
const properties = require('../properties');

class Item extends Phaser.Sprite {
  constructor(forceHeal = false, game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.generateKeys(forceHeal);
    this.anchor.setTo(0.5, 0.5);
    this.inputEnabled = true;
    this.input.disableDrag();
    this.input.draggable = false;
    this.events.onInputDown.add(this.onTap, this);
    this.events.onInputUp.add(this.onUp, this);
    this.events.onDragStart.add(this.onDragStart, this);
    this.events.onDragStop.add(this.onDragStop, this);
    this.events.onDragUpdate.add(this.onDragUpdate, this);
    this.inInventory = false;
    this.dropped = new Phaser.Signal();
    this.tapped = new Phaser.Signal();
    this.dragUpdate = new Phaser.Signal();
    this.attack = this.genAttack(key);
    this.slotID = -1;
    this.walking = false; // bool to check if items should be deleted when they hit the left of screen
    this.dragging = false; // bool to check if it's picked up atm
  }

  toss(dirMod = 1) {
    this.loadTexture(this.giftKey);
    this.game.physics.arcade.enable(this, false);
    this.game.physics.arcade.setBounds(-50, 0, 512, 256); // let items fall out of screen a bit
    // this.body.onWorldBounds = new Phaser.Signal();
    // this.body.onWorldBounds.add(this.onWorldBounds.bind(this));
    this.body.collideWorldBounds = true;
    this.body.enable = true;
    this.body.bounce.y = 0.3;
    this.body.bounce.x = 0.8;
    this.body.gravity.y = 750;
    this.body.velocity.x = ((Math.random() * -400) - 125) * dirMod;
    this.body.velocity.y = ((Math.random() * -225) - 50) * dirMod;
    this.body.drag.x = 250;
    this.body.drag.y = 25;
    this.scale.x = 0.5;
    this.scale.y = 0.5;
    this.inInventory = false;
    this.input.draggable = false;
    this.input.disableDrag();
  }

  flipIt() {
    this.body.velocity.x = (Math.random() * -200) + 100;
    this.body.velocity.y = (Math.random() * -225) - 50;
  }

  placeInBag(slot, forced = false) {
    this.loadTexture(this.itemKey.KEY);
    if (this.body) {
      this.body.enable = false;
    }
    slot.occupied = true;
    const tweenSpeed = 100 + (Math.random() * 100);
    this.bagAnim = this.game.add.tween(this).to({ y: slot.y, x: slot.x }, tweenSpeed, 'Linear', true);
    this.scaleAnim = this.game.add.tween(this.scale).to({ y: 1, x: 1 }, tweenSpeed, 'Linear', true);
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
    this.dragging = true;
    console.log('Drag Start');

    this.game.state.getCurrentState().sfx.invLift.play();
  }

  onDragStop(sprite, pointer) {
    if (!this.inInventory) {
      return;
    }
    console.log('Drop Start');
    this.dragging = false;
    this.dropped.dispatch(sprite, pointer);
  }

  onDragUpdate(sprite, pointer, x, y) {
    if (!this.dragging) return;
    this.dragUpdate.dispatch(sprite, pointer, x, y);
  }

  // onWorldBounds(sprite, up, down, left, right) {
  //   if (left && this.walking) {
  //     this.destroy();
  //   }
  // }

  genAttack(itemName) {
    switch (itemName) {
      case 'item_potion_1':
        return { DAMAGE: -2 };
        break;
    }
  }

  generateKeys(forceHeal = false) {
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
        KEY: 'item_burn_lotion_1',
        VALUE: 1,
        STATUS: 'BURNED',
        HEAL: true,
      },
      {
        KEY: 'item_junk_1',
        VALUE: 1,
        EXCLUSIONS: ['ARCHER', 'WARRIOR'],
      },
      {
        KEY: 'item_junk_2',
        VALUE: 1,
        EXCLUSIONS: ['ARCHER', 'WARRIOR'],
      },
      {
        KEY: 'item_junk_3',
        VALUE: 1,
        EXCLUSIONS: ['ARCHER', 'WARRIOR'],
      },
      {
        KEY: 'item_junk_4',
        VALUE: 1,
        EXCLUSIONS: ['ARCHER', 'WARRIOR'],
      },
      {
        KEY: 'item_potion_1',
        VALUE: 1,
        DAMAGE: -2,
        HEAL: true,
        STATUS_CHANCE: -1,
      },
      {
        KEY: 'item_quiver_1',
        VALUE: 2,
        EXCLUSIONS: ['WARRIOR'],
        STATUS: 'ARROWS',
        HEAL: true,
        STATUS_CHANCE: -1,
      },
      {
        KEY: 'item_shield_1',
        VALUE: 2,
        EXCLUSIONS: ['ARCHER'],
        STATUS: 'ARMOUR',
        HEAL: true,
        STATUS_CHANCE: -1,
      },
      {
        KEY: 'item_relic_2',
        VALUE: 3,
        STATUS: 'LIFE',
        HEAL: true,
        STATUS_CHANCE: -1,
      },
    ];

    for (let i = 0; i < items.length; i++) {
      items[i].VALUE = items[i].VALUE || 0;
      items[i].EXCLUSIONS = items[i].EXCLUSIONS || [];
      items[i].DAMAGE = items[i].DAMAGE || 0;
      items[i].STATUS = items[i].STATUS || null;
      items[i].HEAL = items[i].HEAL || false;
      items[i].ITEM = true;
      items[i].STATUS_CHANCE = items[i].STATUS_CHANCE || 1;
    }

    this.giftKey = _.sample(gifts);
    this.itemKey = this.rarityPick(items, forceHeal);
  }

  rarityPick(items, forceHeal) {
    items = _.shuffle(items);
    const rarity = _.sample([1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 4]);
    let found = false;
    let i = -1;
    let item;
    while (!found) {
      i += 1;
      item = items[i];
      if (item.HEAL && forceHeal) {
        found = true;
      } else if (item.VALUE == rarity && !forceHeal) {
        found = true;
      }
    }
    return item;
  }

  update() {

  }
}


module.exports = Item;
