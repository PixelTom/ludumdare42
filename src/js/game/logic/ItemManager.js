const _ = require('lodash');
const properties = require('../properties');
const Item = require('../sprites/item');

// Handles the item and inventory management

class ItemManager {
  constructor(game) {
    this.game = game;

    this.inventory = this.setupInventory();

    this.bagGroup = this.game.add.group();
    this.dropGroup = this.game.add.group();

    this.plopItem(0);
    this.plopItem(1);
    this.plopItem(2);
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
    const item = new Item(this.game, 300, 300);
    item.dropped.add(this.itemDropped, this);
    item.tapped.add(this.itemTapped, this);
    // this.bagGroup.add(item);
    return item;
  }

  plopItem(slot) {
    const item = this.newItem();
    this.placeLoot( item, this.inventory[slot], true );
  }

  placeLoot( item, slot, forced ) {
    item.placeInBag( slot, forced );
    this.bagGroup.add(item);
  }

  dropLoot(opts = {}) {
    opts.dirMod = opts.dirMod || 1;
    const item = this.newItem();
    item.x = opts.x || 900;
    item.y = opts.y || 200;
    console.log('dirMod', opts.dirMod);
    item.toss(opts.dirMod);

    this.dropGroup.add(item);
  }

  itemTapped(item) {
    console.log('item', item);
    // Get next available slot if possible
    let slot = false;
    for (let i = 0; i < this.inventory.length; i++) {
      if (!this.inventory[i].occupied && !slot) {
        slot = this.inventory[i];
      }
    }

    if (!slot) {
      // Flip it diablo style
      item.flipIt();
    } else {
      this.placeLoot(item, slot);
    }
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
          if (item.slotID >= 0) {
            this.inventory[item.slotID].occupied = false;
          }
          this.placeLoot(item, slot);
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
        if (item.slotID >= 0) {
          this.inventory[item.slotID].occupied = false;
          item.slotID = -1;
        }
        found = hero.giveItem(item);
        console.log('found', found);
        if (found) {
          item.destroy();
        } else {
          item.toss(0);
        }
      }
    }

    // Bounce it back if no luck
    if (!found) {
      if (pointer.y < this.game.world.centerY) {
        if (item.slotID >= 0) {
          this.inventory[item.slotID].occupied = false;
          item.slotID = -1;
        }
        item.toss(0);
      } else {
        this.placeLoot(item, this.inventory[item.slotID], true);
      }
    }
  }

  startWalk() { // drift the items when characters are walking

  }

  stopWalk() { // stop the drift

  }
}

module.exports = ItemManager;
