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
    this.data.DAMAGE = this.data.DAMAGE || 0;
    this.data.HP = this.data.HP || 0;
    this.data.STATUS = null;

    this.hud = new CharHUD(this);
  }

  isAlive() {
    return this.data.ALIVE;
  }

  // Give the hero an item. Return false by default.
  // Overwrite in Hero classes.
  giveItem(item) {
    if (!this.isEligible(item)) return false;

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

  isEligible(item) {
    if (!item || (!item && !item.itemKey)) return false;
    if (item.itemKey.EXCLUSIONS.indexOf(this.data.NAME) >= 0) {
      return false;
    }
    if (item.itemKey.STATUS != 'LIFE' && !this.data.ALIVE) {
      return false;
    }
    return true;
  }

  attack() {
    this.doAttackAnim();
    return true;
  }

  doAttackAnim() {
    this.playAttackSound();
    let offset;
    if (this.data.FOE) {
      offset = -10;
    } else {
      offset = 10;
    }
    this.attackAnim = this.game.add.tween(this).to({ x: this.x + offset }, 100, 'Linear', true, 0, 0, true);
  }

  playAttackSound() {

  }

  defend(attack) {
    // Try to block
    if (this.rollDice(this.data.BLOCK_CHANCE) && !attack.ITEM) {
      this.block();
      return false;
    }

    this.damage(attack.DAMAGE);

    if (this.rollDice(attack.STATUS_CHANCE) && this.data.ALIVE) {
      if (attack.STATUS == this.data.STATUS && attack.HEAL) {
        this.data.STATUS = null;
        this.tint = 0xffffff;
      } else {
        this.data.STATUS = attack.STATUS;
        this.data.STATUS_COUNT = -1;
        if (attack.COLOUR) {
          this.tint = attack.COLOUR;
        }
      }
    }

    return true;
  }

  damage(value) {
    this.data.HP -= value;
    this.data.HP = Math.min(this.data.HP, this.data.MAX_HP); // Prevent overhealing
    if (this.data.HP <= 0) {
      if (this.data.FOE) {
      }
      this.die();
    }
  }

  checkStatus() {
    if (this.data.STATUS) {
      this.data.STATUS_COUNT += 1;
      if (this.data.STATUS_COUNT > 0) {
        this.damage(1);
        this.hud.statusText(this.data.STATUS, {
          x: this.x - 100,
          y: this.y - 100,
          parent: this.parent,
          color: 0xffffff,
        });
      }
    }
  }

  // Overwrite for warrior
  block() {
    this.game.state.getCurrentState().sfx.block.play();
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
    this.clearStatus();
    this.onDeath.dispatch();
    if (this.data.FOE) {
      this.rotation += 1.571;
    } else {
      this.rotation -= 1.571;
    }
  }

  clearStatus() {
    this.data.STATUS = null;
    this.data.STATUS_COUNT = -1;
    this.tint = 0xFFFFFF;
  }

  revive() {
    this.data.ALIVE = true;
    this.rotation = 0;
    this.data.HP = this.data.MAX_HP;
  }
}


module.exports = BaseChar;
