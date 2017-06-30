let Game = require('./game.js');

class GameView {
  constructor (ctx) {
    this.game = new Game();
    this.ctx = ctx;
  }

  start () {
    setInterval( () => {
      this.game.moveObjects();
      this.game.draw(this.ctx);
    }, 20);
  }
}

module.exports = GameView;
