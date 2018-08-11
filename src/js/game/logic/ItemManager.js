const _ = require('lodash');
const properties = require('../properties');
const Item = require('../sprites/item');

// Handles the item and inventory management

class ItemManager {
  constructor(game) {
    this.game = game;

    this.inventory = this.setupInventory();

    this.itemGroup = this.game.add.group();

    this.plopItem(1);
    this.plopItem(3);
    this.plopItem(4);
    this.plopItem(6);
  }

  setupInventory() {
    const slots = [
      {
        id: 0, occupied: false, x: 128, y: 640,
      },
      {
        id: 1, occupied: false, x: 384, y: 640,
      },
      {
        id: 2, occupied: false, x: 640, y: 640,
      },
      {
        id: 3, occupied: false, x: 896, y: 640,
      },
      {
        id: 4, occupied: false, x: 128, y: 896,
      },
      {
        id: 5, occupied: false, x: 384, y: 896,
      },
      {
        id: 6, occupied: false, x: 640, y: 896,
      },
      {
        id: 7, occupied: false, x: 896, y: 896,
      },
    ];
    return slots;
  }

  connectHeroes(partyManager) {
    console.log('connectHeroes');
    this.heroes = [
      partyManager.merchant,
      partyManager.archer,
      partyManager.warrior,
    ];
  }

  newItem() {
    const item = new Item(this.game, 300, 300, 'item_potion_1');
    item.dropped.add(this.itemDropped, this);
    this.itemGroup.add(item);
    return item;
  }

  plopItem(slot) {
    const item = this.newItem();
    item.placeInBag(this.inventory[slot]);
  }

  dropLoot() {
    const item = this.newItem();
    item.x = 900;
    item.y = 200;
    item.toss();
  }

  itemDropped(item, pointer) {
    // Check it can be dropped in an inventory slot
    // Dragging manually does not force other items out
    let found = false;
    for (let i = 0; i < this.inventory.length; i++) {
      const slot = this.inventory[i];
      if (item.x > slot.x - properties.bagThreshold
        && item.x < slot.x + properties.bagThreshold
        && item.y > slot.y - properties.bagThreshold
        && item.y < slot.y + properties.bagThreshold) {
        if (!slot.occupied) {
          if (item.slotID) {
            this.inventory[item.slotID].occupied = false;
          }
          item.placeInBag(slot);
          found = true;
        }
      }
    }
    // Check if dropped on heroes
    for (let i = 0; i < this.heroes.length; i++) {
      const hero = this.heroes[i];
      if (item.x > hero.x - properties.heroThresholdX
        && item.x < hero.x + properties.heroThresholdX
        && item.y > hero.y - (properties.heroThresholdY * 1.5)
        && item.y < hero.y + properties.heroThresholdY) {
        if (item.slotID) {
          this.inventory[item.slotID].occupied = false;
        }
        found = hero.giveItem(item);
        if (found) {
          item.destroy();
        }
      }
    }

    // Bounce it back if no luck
    if (!found) {
      item.placeInBag(this.inventory[item.slotID]);
    }
  }
}

module.exports = ItemManager;
