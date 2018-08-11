const _ = require('lodash');
const CharWarrior = require('../sprites/CharWarrior');
const CharArcher = require('../sprites/CharArcher');
const CharMerchant = require('../sprites/CharMerchant');

class PartyManager {
  constructor(game) {
    this.game = game;
    this.genParty();
  }

  genParty() {
    this.partyGroup = this.game.add.group();


    this.warrior = new CharWarrior(this.game);
    this.archer = new CharArcher(this.game);
    this.merchant = new CharMerchant(this.game);

    this.partyGroup.add(this.party.warrior);
    this.partyGroup.add(this.party.archer);
    this.partyGroup.add(this.party.merchant);
  }

  // Get a random party member who is still alive
  getRandomAlive() {
    if (this.archer.isAlive() && this.warrior.isAlive()) {
      return _.sample([this.archer, this.warrior]);
    }
    return this.getNextAlive();
  }


  // Get Warrior over Archer if Warrior is alive
  getNextAlive() {
    if (this.warrior.isAlive()) {
      return this.warrior;
    }
    return this.archer;
  }
}

module.exports = PartyManager;
