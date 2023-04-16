const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d"); // getContext() 回傳drawing context
const unit = 20; // 單位
const row = canvas.height / unit;
const column = canvas.width / unit;

let snake = []; // array 中元素都是物件，儲存 x,y 座標
// 起始位置
function creatSnake() {
  snake[0] = {
    x: 80,
    y: 0,
  };
  snake[1] = {
    x: 60,
    y: 0,
  };
  snake[2] = {
    x: 40,
    y: 0,
  };
  snake[3] = {
    x: 20,
    y: 0,
  };
}
creatSnake();

// 分數
let score = 0,
  highestScore;
document.querySelector("#myScore").innerHTML = "- Score: " + score + " -";
function loadHighestScore() {
  // console.log(localStorage.getItem("highestScore"))
  if (localStorage.getItem("highestScore") == null) {
    highestScore = 0;
  } else {
    highestScore = Number(localStorage.getItem("highestScore"));
  }
}
loadHighestScore();
document.querySelector("#myScore2").innerHTML =
  "Highest Score: " + highestScore;
// 設定最高分數至 localStorage
function setHighestScore(score) {
  if (score > highestScore) {
    localStorage.setItem("highestScore", score);
    highestScore = score;
  }
}
let talkArray = ["you got it!", "Very good!", "Great!", "Well done!"];

// 做class果實
class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }
  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }
  pickALocation() {
    let overloop = false,
      new_x,
      new_y;
    // 檢測為謢是否與蛇重複
    function checkOverlap(x, y) {
      for (let i = 0; i < snake.length; i++) {
        if (new_x == snake[i].x && new_y == snake[i].y) {
          overloop = true;
          return;
        } else {
          overloop = false;
        }
      }
    }
    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      checkOverlap(new_x, new_y);
    } while (overloop);
    this.x = new_x;
    this.y = new_y;
  }
}
let myFruit = new Fruit();

// 監聽鍵盤改方向
window.addEventListener("keydown", changeDirection);
let d = "Right"; // 初始方向
function changeDirection(event) {
  // console.log(event);
  if (event.key == "ArrowLeft" && d != "Right") {
    d = "Left";
    console.log("ArrowLeft" + d);
  } else if (event.key == "ArrowRight" && d != "Left") {
    d = "Right";
    console.log("ArrowRight" + d);
  } else if (event.key == "ArrowUp" && d != "Down") {
    d = "Up";
    console.log("ArrowUp" + d);
  } else if (event.key == "ArrowDown" && d != "Up") {
    d = "Down";
    console.log("ArrowDown" + d);
  }
  // 避免按鍵過快導致還沒畫圖造成系統座標重複，因此在畫圖前不接受 keydown 事件
  window.removeEventListener("keydown", changeDirection);
}

// f() 讓蛇移動
function draw() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      clearInterval(myGame);
      document.querySelector("#talk").innerHTML = "Oh, no!";
      alert("you lose");
      return;
    }
  }
  // console.log("執行draw...");
  // 先塗掉全部
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.height, canvas.width);
  myFruit.drawFruit();

  // 蛇外觀
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen"; //fillStyle 填色
    } else {
      ctx.fillStyle = "lightblue";
    }
    ctx.strokeStyle = "white"; //storkeStyle 外誆
    // 穿牆效果
    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }
    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }
    if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }

    ctx.fillRect(snake[i].x, snake[i].y, unit, unit); // fillRect 從 xy 開始向左向下畫面積
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit); // strokeRect 從 xy 開始向左向下畫外誆
  }
  // 以 d 決定目前方向並改 xy 變物件屬性
  let snakeX = snake[0].x,
    snakeY = snake[0].y;
  if (d == "Left") {
    snakeX -= unit;
  } else if (d == "Right") {
    snakeX += unit;
  } else if (d == "Up") {
    snakeY -= unit;
  } else if (d == "Down") {
    snakeY += unit;
  }
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  // 蛇是否吃果實
  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    // console.log("get fruit");
    // 新的果實位置
    myFruit.pickALocation();
    // 畫果實 由於 draw() 一開始就會畫所以省略
    // myFruit.drawFruit();
    // 加分
    score += 10;
    setHighestScore(score);
    document.querySelector("#myScore").innerHTML = `- Score: ${score} -`;
    document.querySelector("#myScore2").innerHTML =
      "Highest Score: " + highestScore;
    document.querySelector("#talk").innerHTML =
      talkArray[Math.floor(Math.random() * talkArray.length)];
  } else {
    snake.pop(); // 刪掉[]最後
  }
  snake.unshift(newHead); // 新增[]頭
  window.addEventListener("keydown", changeDirection);
}
// 0.1s 重新畫蛇
let myGame = setInterval(draw, 100);
