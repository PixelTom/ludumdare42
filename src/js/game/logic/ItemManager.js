const _ = require('lodash');
const properties = require('../properties');
const Item = require('../sprites/Item');

// Handles the item and inventory management

class ItemManager {
  constructor(game) {
    this.game = game;

    this.inventory = this.setupInventory();

    this.dropGroup = this.game.add.group();
    this.bagGroup = this.game.add.group();

    this.plopItem(0, true);
    this.plopItem(1, true);
    this.plopItem(2, true);
  }

  setupInventory() {
    const slots = [
      {
        id: 0, occupied: false, x: 64, y: 320,
      },
      {
        id: 1, occupied: false, x: 192, y: 320,
      },
      {
        id: 2, occupied: false, x: 320, y: 320,
      },
      {
        id: 3, occupied: false, x: 448, y: 320,
      },
      {
        id: 4, occupied: false, x: 64, y: 448,
      },
      {
        id: 5, occupied: false, x: 192, y: 448,
      },
      {
        id: 6, occupied: false, x: 320, y: 448,
      },
      {
        id: 7, occupied: false, x: 448, y: 448,
      },
    ];
    return slots;
  }

  connectHeroes(partyManager) {
    this.heroes = [
      partyManager.merchant,
      partyManager.archer,
      partyManager.warrior,
    ];
  }

  newItem(forceHeal = false) {
    const item = new Item(forceHeal, this.game, 150, 150);
    item.dropped.add(this.itemDropped, this);
    item.tapped.add(this.itemTapped, this);
    item.dragUpdate.add(this.itemDragging, this); // check if item is over something
    // item.events.onAddedToGroup.add( this.checkForWalk, this ); // check if the item should be walking when added to dropGroup
    // this.bagGroup.add(item);
    return item;
  }

  plopItem(slot, forceHeal = false) {
    const item = this.newItem(forceHeal);
    this.placeLoot(item, this.inventory[slot], true);
  }

  placeLoot(item, slot, forced) {
    item.placeInBag(slot, forced);
    this.bagGroup.add(item);

    this.game.state.getCurrentState().sfx.invDrop.play();
  }

  dropLoot(opts = {}) {
    opts.dirMod = opts.dirMod || 1;
    const item = this.newItem();
    item.x = opts.x || 450;
    item.y = opts.y || 100;
    item.toss(opts.dirMod);

    this.dropGroup.add(item);
  }

  dropTossZero(item) {
    item.toss(0);
    this.dropGroup.add(item);

    this.game.state.getCurrentState().sfx.invThrow.play();
  }

  itemTapped(item) {
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
      this.game.state.getCurrentState().sfx.invThrow.play();
    } else {
      this.placeLoot(item, slot);
      this.game.state.getCurrentState().sfx.invDrop.play();
    }

    // this.game.state.getCurrentState().sfx.itemPickup.play();
  }

  itemDragging(item) {
    let found = false;

    // Check if over inventory
    for (let i = 0; i < this.inventory.length; i++) {
      const slot = this.inventory[i];
      if (item.x > slot.x - properties.bagThreshold
        && item.x < slot.x + properties.bagThreshold
        && item.y > slot.y - properties.bagThreshold
        && item.y < slot.y + properties.bagThreshold) {
        if (!slot.occupied) {
          found = true;
        }
      }
    }

    // Check if over heroes
    for (let i = 0; i < this.heroes.length; i++) {
      const hero = this.heroes[i];
      if (item.x > hero.x - properties.heroThresholdX
        && item.x < hero.x + properties.heroThresholdX
        && item.y > hero.y - (properties.heroThresholdY * 1.5)
        && item.y < hero.y + properties.heroThresholdY) {
        found = hero.isEligible(item);
        if (found) {
          item.scale.x = 0.6;
          item.scale.y = 0.6;
        }
      }
    }

    if (!found) {
      // assume if not found, that it's junk
      item.scale.x = 1;
      item.scale.y = 1;
      item.alpha = 0.5;
    } else {
      item.alpha = 1;
    }
  }

  itemDropped(item, pointer) {
    // reset some stuff from dragUpdate they may be out of sync
    item.alpha = 1;
    item.scale.x = 1;
    item.scale.y = 1;

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
        if (found) {
          item.destroy();
          this.game.state.getCurrentState().sfx.itemPlayer.play();
        } else {
          this.dropTossZero(item);
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
        this.dropTossZero(item);
      } else {
        this.placeLoot(item, this.inventory[item.slotID], true);
      }
    }
  }

  // checkForWalk( item, group ) { // if an item just get's added, redo walk if walking
  //   if (group == this.dropGroup) {
  //     if (this.game.state.getCurrentState().exploring) {
  //       this.startWalk(); // recall it so all new dropped items keep walking
  //     }
  //   }
  // }

  // startWalk() { // drift the items when characters are walking
  //   this.dropGroup.forEach((item) => {
  //     item.walking = true;
  //     item.body.velocity.x = -200;
  //     item.body.drag.x = 0;
  //   });
  // }

  // stopWalk() { // stop the drift
  //   this.dropGroup.forEach((item) => {
  //     item.walking = false;
  //     item.body.velocity.x = 0;
  //     item.body.drag.x = 500;
  //   });
  // }
}

module.exports = ItemManager;
