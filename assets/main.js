const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
let snake = [{ x: 5, y: 5 }];
let direction = 'right';
let food = createFood();
let score = 0;

const gameOverScreen = document.getElementById('gameOverScreen');
const resetButton = document.getElementById('resetButton');
const finalScoreDisplay = document.getElementById('finalScore');
const upButton = document.getElementById('upButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const downButton = document.getElementById('downButton');

function createFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * (canvas.width / gridSize)),
      y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
}

function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = 'green';
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function updateSnake() {
  const head = { ...snake[0] };

  switch (direction) {
    case 'up':
      head.y -= 1;
      break;
    case 'down':
      head.y += 1;
      break;
    case 'left':
      head.x -= 1;
      break;
    case 'right':
      head.x += 1;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    food = createFood();
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.x >= canvas.width / gridSize ||
    head.y < 0 ||
    head.y >= canvas.height / gridSize ||
    snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval);
    showGameOverScreen();
  }
}

function showGameOverScreen() {
  finalScoreDisplay.textContent = score;
  gameOverScreen.style.display = 'flex';
}

function hideGameOverScreen() {
  gameOverScreen.style.display = 'none';
}

restartButton.addEventListener('click', () => {
  hideGameOverScreen();
  resetGame();
});

function updateScore() {
  const scoreDisplay = document.getElementById('scoreDisplay');
  scoreDisplay.textContent = 'Score: ' + score;
}

resetButton.addEventListener('click', () => {
    hideGameOverScreen();
    resetGame();
  });

  function resetGame() {
    snake = [{ x: 5, y: 5 }];
    direction = 'right';
    food = createFood();
    score = 0;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 200);
    updateScore();
  }

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
  } else if (key === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
  } else if (key === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
  } else if (key === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
  }
});


upButton.addEventListener('click', () => {
    if (direction !== 'down') {
      direction = 'up';
    }
  });
  
  leftButton.addEventListener('click', () => {
    if (direction !== 'right') {
      direction = 'left';
    }
  });
  
  rightButton.addEventListener('click', () => {
    if (direction !== 'left') {
      direction = 'right';
    }
  });
  
  downButton.addEventListener('click', () => {
    if (direction !== 'up') {
      direction = 'down';
    }
  });
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
  clearCanvas();
  updateSnake();
  checkCollision();
  drawSnake();
  drawFood();
  updateScore();
}

let gameInterval = setInterval(gameLoop, 200); // Game loop interval
