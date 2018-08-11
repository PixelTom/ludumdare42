const _ = require('lodash');
const CharWarrior = require('../sprites/CharWarrior');
const CharArcher = require('../sprites/CharArcher');
const CharMerchant = require('../sprites/CharMerchant');

class PartyManager {
  constructor(game) {
    this.game = game;
    this.genParty();
    this.onDeath = new Phaser.Signal();
  }

  genParty() {
    this.partyGroup = this.game.add.group();


    this.warrior = new CharWarrior(this.game);
    this.archer = new CharArcher(this.game);
    this.merchant = new CharMerchant(this.game);

    this.partyGroup.add(this.warrior);
    this.partyGroup.add(this.archer);
    this.partyGroup.add(this.merchant);

    this.warrior.onDeath.add(this.loseMember, this);
    this.archer.onDeath.add(this.loseMember, this);
  }

  // Get a random party member who is still alive
  getRandomAlive() {
    if (this.archer.isAlive() && this.warrior.isAlive()) {
      return _.sample([this.archer, this.warrior]);
    }
    return this.getNextAlive();
  }


  walk() {
    this.warrior.walk();
    this.archer.walk();
    this.merchant.walk();
  }

  stop() {
    this.warrior.stopWalking();
    this.archer.stopWalking();
    this.merchant.stopWalking();
  }

  // Get Warrior over Archer if Warrior is alive
  getNextAlive() {
    if (this.warrior.isAlive()) {
      return this.warrior;
    } if (this.archer.isAlive()) {
      return this.archer;
    }
    return null;
  }

  loseMember() {
    if (this.getNextAlive() == null) {
      this.onDeath.dispatch();
    }
  }
}

module.exports = PartyManager;
