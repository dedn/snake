var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var snakeSize = 10;
var w = 350;
var h = 350;
var score = 0;
var snake = void 0;
var food = void 0;
var loop = 80;
var snakecolor = 'black';
var snakeborder = '#9acc99';
var eatcolor = '#9acc99';
var eatborder = 'black';

var drawModule = function () {

  var bodySnake = function bodySnake(x, y) {
    ctx.fillStyle = snakecolor;
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = snakeborder;
    ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  };

  var eat = function eat(x, y) {
    ctx.fillStyle = eatcolor;
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.fillStyle = eatborder;
    ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
  };

  scoreText = function scoreText() {
    var score_text = 'Score:' + score;
    ctx.fillStyle = 'black';
    ctx.fillText(score_text, 145, h - 5);
  };

  gameOver = function gameOver() {
    var score_text = 'You lose, try again';
    ctx.fillStyle = 'black';
    ctx.font = "14px Arial";
    ctx.fillText(score_text, 120, h - 200);
  };

  restartText = function restartText() {
    var score_text = 'Already finished? Come on again.';
    ctx.fillStyle = 'black';
    ctx.font = "14px Arial";
    ctx.fillText(score_text, 70, h - 200);
  };

  var drawSnake = function drawSnake() {
    var length = 1;
    snake = [];
    for (var i = length - 1; i >= 0; i--) {
      snake.push({
        x: i,
        y: 0
      });
    }
  };

  var paint = function paint() {
    ctx.fillStyle = '#9acc99';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, w, h);

    btn.setAttribute('disabled', true);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (direction == 'right') {
      snakeX++;
    } else if (direction == 'left') {
      snakeX--;
    } else if (direction == 'up') {
      snakeY--;
    } else if (direction == 'down') {
      snakeY++;
    }

    if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {

      btn.removeAttribute('disabled', true);
      ctx.clearRect(0, 0, w, h);
      gameloop = clearInterval(gameloop);
      gameOver();

      return;
    }

    if (snakeX == food.x && snakeY == food.y) {
      var tail = {
        x: snakeX,
        y: snakeY
      };
      score++;
      createEat();
    } else {
      var tail = snake.pop();
      tail.x = snakeX;
      tail.y = snakeY;
    }

    snake.unshift(tail);

    for (var i = 0; i < snake.length; i++) {
      bodySnake(snake[i].x, snake[i].y);
    }

    eat(food.x, food.y);
    scoreText();
  };

  var reset = document.getElementById('btn-restart');
  reset.addEventListener("click", function () {
    btn.removeAttribute('disabled', true);
    ctx.clearRect(0, 0, w, h);
    gameloop = clearInterval(gameloop);
    score = 0;
    restartText();
  });

  var createEat = function createEat() {
    food = {
      x: Math.floor(Math.random() * 30 + 1),
      y: Math.floor(Math.random() * 30 + 1)
    };

    for (var i = 0; i > snake.length; i++) {
      var snakeX = snake[i].x;
      var snakeY = snake[i].y;

      if (food.x === snakeX && food.y === snakeY || food.y === snakeY && food.x === snakeX) {
        food.x = Math.floor(Math.random() * 30 + 1);
        food.y = Math.floor(Math.random() * 30 + 1);
      }
    }
  };

  var checkCollision = function checkCollision(x, y, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].x === x && array[i].y === y) return true;
    }
    return false;
  };

  init = function init() {

    direction = 'right';
    drawSnake();
    createEat();
    gameloop = setInterval(paint, loop);
  };

  return {
    init: init
  };
}();