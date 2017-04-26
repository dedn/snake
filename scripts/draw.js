const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const snakeSize = 10;
let w = 350;
let h = 350;
let score = 0;
let snake;
let food;
let loop;

const drawModule = ((() => {

  const bodySnake = (x, y) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = '#9acc99';
    ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  };

  const eat = (x, y) => {
    ctx.fillStyle = '#9acc99';
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.fillStyle = 'black';
    ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
  };
  scoreText = () => {
    const score_text = 'Score:' + score;
    ctx.fillStyle = 'black';
    ctx.fillText(score_text, 145, h - 5);
  };

  gameOver = () => {
    const score_text = 'You lose, try again';
    ctx.fillStyle = 'black';
    ctx.fillText(score_text, 100, h - 5);
  };
  restartText = () => {
    const score_text = 'Already finished? Come on again.';
    ctx.fillStyle = 'black';
    ctx.fillText(score_text, 100, h - 5);
  };

  const drawSnake = () => {
    const length = 1;
    snake = [];
    for (let i = length - 1; i >= 0; i--) {
      snake.push(
        {
          x: i,
          y: 0
        });
    }
  };

  speed = () => {
    if (score >= 1) {
      loop = 20;
    } else {
      loop = 80;
    }
    console.log(loop);
    return;
  };

  const paint = () => {
    ctx.fillStyle = '#9acc99';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'black';
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
      //restart game
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

    for (let i = 0; i < snake.length; i++) {
      bodySnake(snake[i].x, snake[i].y);
    }

    eat(food.x, food.y);
    scoreText();
    console.log(score);


    console.log(score);
    speed();
  };

  let reset = document.getElementById('btn-restart');
  reset.addEventListener("click", () => {
    btn.removeAttribute('disabled', true);
    ctx.clearRect(0, 0, w, h);
    gameloop = clearInterval(gameloop);
    score = 0;
    restartText();
  });

  var createEat = () => {
    food = {
      x: Math.floor((Math.random() * 30) + 1),
      y: Math.floor((Math.random() * 30) + 1)
    };

    for (let i = 0; i > snake.length; i++) {
      const snakeX = snake[i].x;
      const snakeY = snake[i].y;

      if (food.x === snakeX && food.y === snakeY || food.y === snakeY && food.x === snakeX) {
        food.x = Math.floor((Math.random() * 30) + 1);
        food.y = Math.floor((Math.random() * 30) + 1);
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
  console.log(score);

  init = () => {
    direction = 'right';
    drawSnake();
    createEat();
    gameloop = setInterval(paint, loop);
  };

  return {
    init
  };

})());


