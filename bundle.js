/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let Game = __webpack_require__(3);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

let MovingObject = __webpack_require__(4);

class Asteroid extends MovingObject {
  constructor (game, position, color = 'black') {
    const vel = [Math.random()*6-3, Math.random()*6-3];
    const radius = Math.floor(Math.random()*10)+10;
    // const position = [Math.floor(Math.random()*1000), Math.floor(Math.random()*700)];
    super(game, {pos: position, vel: vel, color: color, radius: radius});
  }
}

module.exports = Asteroid;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

let GameView = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 1200;
  canvasEl.height = 700;

  const ctx = canvasEl.getContext("2d");

  const game = new GameView(ctx);
  game.start();
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

let Asteroid = __webpack_require__(1);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class MovingObject {
  constructor (game, hash) {
    this.game = game;
    this.pos = hash['pos'];
    this.vel = hash['vel'];
    this.radius = hash['radius'];
    this.color = hash['color'];
  }

  move () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.game.wrap(this.pos);
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


/***/ })
/******/ ]);