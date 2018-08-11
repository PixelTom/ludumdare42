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
    this.attack = this.genAttack(key);
  }

  toss() {
    this.game.physics.arcade.enable(this, false);
    this.game.physics.arcade.setBounds(0, 0, 1024, 512);
    this.body.collideWorldBounds = true;
    this.body.bounce.y = 0.3;
    this.body.gravity.y = 1500;
    this.body.velocity.x = (Math.random() * -200) - 250;
    this.body.velocity.y = (Math.random() * -250) - 100;
    this.body.drag.x = 150;
    this.body.drag.y = 50;
  }

  placeInBag(slot) {
    this.inInventory = true;
    slot.occupied = true;
    this.x = slot.x;
    this.y = slot.y;
    this.slotID = slot.id;
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

  genAttack(itemName) {
    switch (itemName) {
      case 'item_potion_1':
        return { DAMAGE: -2 };
        break;
    }
  }

  update() {

  }
}


module.exports = Item;
