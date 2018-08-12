const BaseChar = require('./BaseChar');
const properties = require('../properties');

class CharMerchant extends BaseChar {
  constructor(game, x, y, key, frame) {
    super(game, 200, properties.baseY, 'tom_merchant', frame);

    const data = {
      NAME: 'MERCHANT',
      FRIEND: true,
    };

    this.initData(data);
  }
}

module.exports = CharMerchant;
