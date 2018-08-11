const properties = require('../properties');

class BaseChar extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.anchor.setTo(0.5, 0.7);
    this.onDeath = new Phaser.Signal();
  }


  initData(data) {
    this.data = data;
    this.data.ALIVE = this.data.ALIVE || true;
    this.data.ATTACK = this.data.ATTACK || 0;
    this.data.HP = this.data.HP || 5;
  }

  isAlive() {
    return this.data.ALIVE;
  }

  // Give the hero an item. Return false by default.
  // Overwrite in Hero classes.
  giveItem(item) {
    switch (this.data.NAME) {
      case 'Archer':
      case 'Warrior':
        this.defend(item.attack);
        return true;
        break;
      case 'Merchant':

        return true;
        break;
      default:
        return false;
        break;
    }
  }

  attack() {
    return {
      DAMAGE: this.data.ATTACK,
    };
  }

  defend(attack) {
    console.log(`Attacked for ${attack.DAMAGE} damage`);
    this.data.HP -= attack.DAMAGE;
    this.data.HP = Math.min(this.data.HP, this.data.MAX_HP); // Prevent overhealing
    if (this.data.HP <= 0) {
      this.die();
    }
    console.log(`HP remaining: ${this.data.HP}`);
  }

  walk() {
    this.walkAnim = this.game.add.tween(this).to({ y: this.y - 10 }, 100 + (Math.random() * 100), 'Linear', true, Math.random() * 100, -1, true);
  }

  stopWalking() {
    this.walkAnim.stop();
  }

  die() {
    this.data.ALIVE = false;
    this.onDeath.dispatch();
    if (this.data.FOE) {
      this.rotation += 1.571;
    } else {
      this.rotation -= 1.571;
    }
  }
}


module.exports = BaseChar;
