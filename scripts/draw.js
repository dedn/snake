const canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

var fieldWidth = canvas.width / snakeSize;
var fieldHeight = canvas.height / snakeSize;

((() => {
  ctx.strokeStyle = snakecolor;
  ctx.strokeRect(0, 0, w, h);
})());

var throughWall = (i) => {
    if (snake[i].x < 0) {
        snake[i].x = fieldWidth - 1;
    }
    else if (snake[i].x > fieldWidth - 1) {
        snake[i].x = 0;
    }
    if (snake[i].y < 0) {
        snake[i].y = fieldHeight - 1;
    }
    else if (snake[i].y > fieldHeight - 1) {
        snake[i].y = 0;
    }
};



var drawModule = ((() => {

  var bodySnake = (x, y) => {
    ctx.fillStyle = snakecolor;
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = snakeborder;
    ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  };

  var eat = (x, y) => {
    ctx.fillStyle = eatcolor;
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.fillStyle = eatborder;
    ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
  };

  scoreText = () => {
    var score_text = 'Score:' + score;
    ctx.font = "14px Arial";
    ctx.fillStyle = text_color;
    ctx.textAlign = "center";
    ctx.fillText(score_text, width / 2, h - 10);
  };

  gameOver = () => {
    var lose_text = 'You lose, try again';
    ctx.fillStyle = text_color;
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(lose_text, width / 2, height / 2);
  };

  restartText = () => {
    var restart_text = 'You started anew';
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

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

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

    if (checkCollision(snakeX, snakeY, snake)) {

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
        throughWall(i);
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

