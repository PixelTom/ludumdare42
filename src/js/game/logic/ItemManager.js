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

  plopItem(slot) {
    console.log('plopitem');
    const item = new Item(this.game, 300, 300, 'item_potion_1');
    item.dropped.add(this.itemDropped, this);
    this.itemGroup.add(item);
    item.placeInBag(this.inventory[slot]);
  }

  itemDropped(sprite, pointer) {
    console.log('itemDropped', sprite, pointer);
  }
}

module.exports = ItemManager;
