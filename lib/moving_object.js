class MovingObject {
  constructor (hash) {
    this.pos = hash['pos'];
    this.vel = hash['vel'];
    this.radius = hash['radius'];
    this.color = hash['color'];
  }

  move () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 2*Math.PI, false);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

module.exports = MovingObject;
