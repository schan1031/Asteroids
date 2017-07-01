let Asteroid = require('./asteroid.js');
let Ship = require('./ship.js');

class Game {
  constructor () {
    this.DIM_X = 1200;
    this.DIM_Y = 700;
    this.NUM_ASTEROIDS = 40;
    this.asteroids = this.addAsteroids();
    this.objects = this.allObjects();
  }

  randomPosition () {
    const position = [Math.floor(Math.random()*this.DIM_X), Math.floor(Math.random()*this.DIM_Y)];
    return position;
  }

  allObjects () {
    let ship = new Ship(this, this.randomPosition());
    let objects = this.asteroids.push(ship);
    return objects;
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
    // this.ship.draw
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
