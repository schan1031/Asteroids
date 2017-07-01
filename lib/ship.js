let MovingObject = require('./moving_object.js');

class Ship extends MovingObject {
  constructor (game, position, color = 'red', radius = 10) {
    super(game, {pos: position, color: color, radius: radius});
    this.COLOR = color;
    this.RADIUS = radius;
    this.vel = 0;
  }


}

module.exports = Ship;
