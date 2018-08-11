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

  attack() {
    return {
      DAMAGE: this.data.ATTACK,
    };
  }

  defend(attack) {
    this.data.HP -= attack.DAMAGE;
    if (this.data.HP <= 0) {
      this.die();
    }
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
