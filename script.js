const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const box = 20;

let snake = [{x: 9*box, y: 10*box}];
let food = {
  x: Math.floor(Math.random() * (canvas.width / box)) * box,
  y: Math.floor(Math.random() * (canvas.height / box)) * box
};

let dx = box, dy = 0, score = 0;
let game;

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
  if (e.key === "ArrowLeft" && dx === 0) { dx = -box; dy = 0; }
  else if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -box; }
  else if (e.key === "ArrowRight" && dx === 0) { dx = box; dy = 0; }
  else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = box; }
}

function draw() {
  // Clear canvas
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  snake.forEach((s, i) => {
    ctx.fillStyle = i === 0 ? "#76ff03" : "#fff";
    ctx.fillRect(s.x, s.y, box, box);
  });

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Move snake
  let head = {x: snake[0].x + dx, y: snake[0].y + dy};

  // Check if food is eaten
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = `Score: ${score}`;
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
  } else {
    snake.pop();
  }

  snake.unshift(head);

  // Game over conditions
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.slice(1).some(s => s.x === head.x && s.y === head.y)
  ) {
    clearInterval(game);
    alert("Game Over! Your Score: " + score);
  }
}

game = setInterval(draw, 100);
