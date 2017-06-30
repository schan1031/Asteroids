let MovingObject = require('./moving_object.js');

class Asteroid extends MovingObject {
  constructor (game, position, color = 'black') {
    const vel = [Math.random()*6-3, Math.random()*6-3];
    const radius = Math.floor(Math.random()*10)+10;
    // const position = [Math.floor(Math.random()*1000), Math.floor(Math.random()*700)];
    super(game, {pos: position, vel: vel, color: color, radius: radius});
  }
}

module.exports = Asteroid;
