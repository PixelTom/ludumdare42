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
    this.data.HP = this.data.HP || 0;
    this.data.STATUS = '';

    this.hud = new CharHUD(this);
  }

  isAlive() {
    return this.data.ALIVE;
  }

  // Give the hero an item. Return false by default.
  // Overwrite in Hero classes.
  giveItem(item) {
    if (!this.isEligible( item )) return false;

    let consumed;
    switch (this.data.NAME) {
      case 'ARCHER':
      case 'WARRIOR':
        this.defend(item.itemKey);
        consumed = this.checkSpecialItem(item.itemKey); // Reject specials if needed
        return consumed;
        break;
    }
  }

  isEligible( item ){
    if (!item || !item.itemKey) return false;
    if (item.itemKey.EXCLUSIONS.indexOf(this.data.NAME) >= 0) {
      return false;
    }
    return true;
  }

  attack() {
    this.doAttackAnim();
    return {
      DAMAGE: this.data.ATTACK,
    };
  }

  doAttackAnim() {
    let offset;
    if (this.data.FOE) {
      offset = -10;
    } else {
      offset = 10;
    }
    this.attackAnim = this.game.add.tween(this).to({ x: this.x + offset }, 100, 'Linear', true, 0, 0, true);
  }

  defend(attack) {
    console.log('Attacking', attack.DAMAGE);
    // Try to block
    if (this.rollDice(this.data.BLOCK_CHANCE) && !attack.ITEM) {
      this.block();
      return false;
    }

    if (this.data.FOE) {
      console.log(`FOE HP: ${this.data.HP}`);
      console.log(attack.DAMAGE);
    }
    this.data.HP -= attack.DAMAGE;
    this.data.HP = Math.min(this.data.HP, this.data.MAX_HP); // Prevent overhealing
    if (this.data.FOE) {
      console.log(`FOE HP: ${this.data.HP}`);
    }
    if (this.data.HP <= 0) {
      if (this.data.FOE) {
        console.log('FOE should be dead');
      }
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
    this.hud.statusText('BLOCKED', {
      x: this.x - 100,
      y: this.y - 100,
      parent: this.parent,
      color: 0xffffff,
    });
  }

  canAttack() {
    return true;
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
    if (!this.data.ALIVE) {
      return;
    }
    this.data.ALIVE = false;
    this.onDeath.dispatch();
    if (this.data.FOE) {
      this.rotation += 1.571;
    } else {
      this.rotation -= 1.571;
    }
  }

  revive() {
    this.data.ALIVE = true;
    this.rotation = 0;
    this.data.HP = this.data.MAX_HP;
  }
}


module.exports = BaseChar;
