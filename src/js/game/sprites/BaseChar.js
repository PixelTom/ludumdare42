const CharHUD = require('../ui/CharHUD');
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
    this.data.STATUS = '';

    this.hud = new CharHUD(this);
  }

  isAlive() {
    return this.data.ALIVE;
  }

  // Give the hero an item. Return false by default.
  // Overwrite in Hero classes.
  giveItem(item) {
    console.log('item', item);
    if (item.itemKey.EXCLUSIONS.indexOf(this.data.NAME) >= 0) {
      return false;
    }

    let consumed;

    console.log('TomTest', this.data.NAME);


    switch (this.data.NAME) {
      case 'ARCHER':
      case 'WARRIOR':
        this.defend(item.itemKey);
        consumed = this.checkSpecialItem(item.itemKey); // Reject specials if needed
        return consumed;
        break;
      case 'MERCHANT':

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
    // Try to block
    if (this.rollDice(this.data.BLOCK_CHANCE) && !attack.ITEM) {
      this.block();
      return false;
    }

    this.data.HP -= attack.DAMAGE;
    this.data.HP = Math.min(this.data.HP, this.data.MAX_HP); // Prevent overhealing
    if (this.data.HP <= 0) {
      this.die();
    }

    if (this.rollDice(attack.STATUS_CHANCE)) {
      if (attack.STATUS == this.data.STATUS && attack.HEAL) {
        this.data.STATUS = '';
      } else {
        this.data.STATUS = attack.STATUS;
      }
    }

    return true;
  }

  // Overwrite for warrior
  block() {

  }

  rollDice(chance) {
    return Math.random() < chance;
  }

  walk() {
    this.walkAnim = this.game.add.tween(this).to({ y: this.y - 10 }, 100 + (Math.random() * 100), 'Linear', true, Math.random() * 100, -1, true);
  }

  stopWalking() {
    this.walkAnim.stop();
  }

  die() {
    console.log('call die');
    this.data.ALIVE = false;
    this.onDeath.dispatch();
    if (this.data.FOE) {
      this.rotation += 1.571;
    } else {
      this.rotation -= 1.571;
    }
  }

  revive() {
    console.log('call revive');
    this.data.ALIVE = true;
    this.rotation = 0;
    this.data.HP = this.data.MAX_HP;
  }
}


module.exports = BaseChar;
