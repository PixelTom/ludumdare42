const properties = require('../properties');

class Item extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.anchor.setTo(0.5, 0.5);
    this.inputEnabled = true;
    this.input.enableDrag(true);
    this.events.onInputDown.add(this.onTap, this);
    this.events.onDragStart.add(this.onDragStart, this);
    this.events.onDragStop.add(this.onDragStop, this);
    this.inInventory = false;
    this.dropped = new Phaser.Signal();
  }

  placeInBag(slot) {
    this.inInventory = true;
    slot.occupied = true;
    this.x = slot.x;
    this.y = slot.y;
  }


  onTap(sprite, pointer) {
    if (this.inInventory) {
      return;
    }
    console.log('tapped');
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
}


module.exports = Item;
