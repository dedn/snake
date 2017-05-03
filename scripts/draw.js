const width = 600;
const height = 600;

const canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');
const snakeSize = 10;

var w = width;
var h = height;
var score = 0;
var snake;
var food;
var snakecolor = 'black';
var snakeborder = '#fff';
var eatcolor = '#fff';
var eatborder = 'black';
var text_color = 'black';
var foodX = width / 11;
var foodY = height / 11;
var defaultLoopDelay = 80;
var currentLoopDelay = defaultLoopDelay;
var gameloop = null;
var speedBoost = 10;
var foodForBoost = 4;
var foodRemainForBoost = foodForBoost;
var needBoost;
var tail;

drawCanvasBoard = () => {
  ctx.strokeStyle = snakecolor;
  ctx.strokeRect(0, 0, w, h);
};

drawCanvasBoard();

const drawModule = ((() => {

  const bodySnake = (x, y) => {
    ctx.fillStyle = snakecolor;
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = snakeborder;
    ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  };

  const eat = (x, y) => {
    ctx.fillStyle = eatcolor;
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.fillStyle = eatborder;
    ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
  };

  scoreText = () => {
    const score_text = 'Score:' + score;
    ctx.font = "14px Arial";
    ctx.fillStyle = text_color;
    ctx.textAlign = "center";
    ctx.fillText(score_text, width / 2, h - 10);
  };

  gameOver = () => {
    const lose_text = 'You lose, try again';
    ctx.fillStyle = text_color;
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(lose_text, width / 2, height / 2);
  };

  restartText = () => {
    const restart_text = 'Will we start again? Are you sure?';
    ctx.fillStyle = text_color;
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(restart_text, width / 2, height / 2);
  };

  var drawSnake = () => {
    var length = 1;
    snake = [];
    for (let i = length - 1; i >= 0; i--) {
      snake.push(
        {
          x: i,
          y: 0
        });
    }
  };

  var paint = () => {
    ctx.fillStyle = snakeborder;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = snakecolor;
    ctx.strokeRect(0, 0, w, h);

    btn.setAttribute('disabled', true);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'right') {
      snakeX++;
    }
    else if (direction == 'left') {
      snakeX--;
    }
    else if (direction == 'up') {
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
      tail = {
        x: snakeX,
        y: snakeY
      };
      score++;

      needBoost = false;
      foodRemainForBoost--;
      if (!foodRemainForBoost) {
        foodRemainForBoost = foodForBoost;
        currentLoopDelay -= speedBoost;
        if (currentLoopDelay < 0) {
          currentLoopDelay = 0;
        }
        needBoost = true;
      }

      createEat();
    } else {
      tail = snake.pop();
      tail.x = snakeX;
      tail.y = snakeY;
    }

    snake.unshift(tail);

    for (let i = 0; i < snake.length; i++) {
      bodySnake(snake[i].x, snake[i].y);
    }

    eat(food.x, food.y);
    scoreText();

    if (needBoost) {
      clearInterval(gameloop);
      gameloop = setInterval(paint, currentLoopDelay);
    }
  };

  var reset = document.getElementById('btn-restart');
  reset.addEventListener("click", () => {
    btn.removeAttribute('disabled', true);
    ctx.clearRect(0, 0, w, h);
    clearInterval(gameloop);
    score = 0;
    restartText();
  });

  var createEat = () => {
    food = {
      x: Math.floor((Math.random() * foodX) + 1),
      y: Math.floor((Math.random() * foodY) + 1)
    };

    for (let i = 0; i > snake.length; i++) {
      const snakeX = snake[i].x;
      const snakeY = snake[i].y;

      if (food.x === snakeX && food.y === snakeY || food.y === snakeY && food.x === snakeX) {
        food.x = Math.floor((Math.random() * foodX) + 1);
        food.y = Math.floor((Math.random() * foodY) + 1);
      }
    }
  };

  var checkCollision = (x, y, array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].x === x && array[i].y === y)
        return true;
    }
    return false;
  };

  init = () => {

    direction = 'right';
    drawSnake();
    createEat();
    currentLoopDelay = defaultLoopDelay;
    gameloop = setInterval(paint, currentLoopDelay);

  };

  return {
    init
  };

})());

