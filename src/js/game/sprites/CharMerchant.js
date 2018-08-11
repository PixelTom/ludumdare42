const BaseChar = require('./BaseChar');

class CharMerchant extends BaseChar {
  constructor(game, x, y, key, frame) {
    super(game, 200, 500, 'tom_merchant', frame);

    const data = {
      NAME: 'Merchant',
      FRIEND: true,
    };

    this.initData(data);
  }
}

module.exports = CharMerchant;
