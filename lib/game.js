let Asteroid = require('./asteroid.js');

class Game {
  constructor () {
    this.DIM_X = 1200;
    this.DIM_Y = 700;
    this.NUM_ASTEROIDS = 40;
    this.asteroids = this.addAsteroids();
  }

  randomPosition () {
    const position = [Math.floor(Math.random()*this.DIM_X), Math.floor(Math.random()*this.DIM_Y)];
    return position;
  }

  addAsteroids () {
    let asteroids = [];
    for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
      asteroids.push(new Asteroid(this, this.randomPosition()));
    }
    return asteroids;
  }

  draw (ctx) {
    this.moveObjects();
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(ctx);
    }
  }

  moveObjects () {
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
    }
  }

  wrap (pos) {
    if (pos[0] > this.DIM_X) {
      pos[0] = 0;
    } else if (pos[0] < 0) {
      pos[0] = this.DIM_X;
    }
    if (pos[1] > this.DIM_Y) {
      pos[1] = 0;
    } else if (pos[1] < 0) {
      pos[1] = this.DIM_Y;
    }

  }
}

module.exports = Game;

// document.addEventListener("DOMContentLoaded", function(){
//   const canvasEl = document.getElementById("game-canvas");
//   canvasEl.width = 1200;
//   canvasEl.height = 700;
//
//   const ctx = canvasEl.getContext("2d");
//
//   let x = new Game();
//   setInterval(() => x.draw(ctx), 20);
// });
