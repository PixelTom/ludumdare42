const properties = require('../properties');

let music;
let bosses;

class End extends Phaser.State {
  init(defeated) {
    bosses = defeated;
  }

  create(game) {
    this.setup();
  }

  setup() {
    const dungBG1 = this.game.add.image(0, 0, 'dungeon_bg');
    const dungBG2 = this.game.add.image(0, 512, 'dungeon_bg');
    const textScore = this.game.add.text(this.game.world.centerX, 200, `YOUR PARTY HAS WIPED!\nYOU DEFEATED ${bosses} MONSTERS.`, {
      font: 'normal 30px "Press Start 2P"',
      fill: '#36ff90',
      align: 'center',
    });
    textScore.anchor.setTo(0.5, 0.5);

    const textClick = this.game.add.text(this.game.world.centerX, 400, 'CLICK TO GO BACK TO TITLE', {
      font: 'normal 30px "Press Start 2P"',
      fill: '#36ff90',
    });
    textClick.anchor.setTo(0.5, 0.5);
    textClick.alpha = 0;

    this.game.add.tween(textClick).to({ alpha: 1 }, 500, 'Linear', true, 2000, -1, true);

    const genRunner = function (opts) {
      const npc = this.game.add.sprite(0, 0, opts.name);
      npc.anchor.setTo(0.5, 0.5);
      npc.scale.x = opts.scaleX;
      npc.scale.y = opts.scaleY;
      npc.x = this.game.world.width * 2;
      npc.y = 800;
      this.game.add.tween(npc).to({ x: this.game.world.width * -1 }, 2000, 'Linear', true, opts.delay, -1, true);
      this.game.add.tween(npc).to({ y: npc.y - 10 }, 50, 'Linear', true, 0, -1, true);
      return npc;
    };

    const merchant = genRunner.call(this, {
      name: 'title_merchant',
      delay: 0,
      scaleX: -2,
      scaleY: 2,
    });
    const monster = genRunner.call(this, {
      name: 'tom_monster_minotaur',
      delay: 500,
      scaleX: 1.5,
      scaleY: 1.5,
    });

    const flipNpc = function (npc) {
      npc.scale.x *= -1;
    };

    const merchantLoop = this.game.time.events.loop(2000, flipNpc, this, merchant);
    const monsterLoop = this.game.time.events.loop(2000, flipNpc, this, monster);

    // music = this.game.add.audio('bg_music');
    // music.loop = true;
    // music.play();

    const allowLeave = function () {
      this.game.input.onDown.add(this.startGame, this);
    };

    this.game.time.events.add(2000, allowLeave, this);

    const lose = this.game.add.audio('sfx-lose');
    lose.play();
  }

  startGame() {
    // music.stop();
    this.game.state.start('Title');
  }
}


module.exports = End;
