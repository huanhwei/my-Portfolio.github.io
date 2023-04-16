const canvas = document.querySelector("#myCanvas"),
  ctx = canvas.getContext("2d"),
  canvasHeight = canvas.height,
  canvasWidth = canvas.width;
// 球圓心 x座標,y座標,半徑,x速度,y速度
let circle_x = 160,
  circle_y = 60,
  radius = 20,
  xSpeed = 20,
  ySpeed = 20;
// 地板位置
let ground_x = 100,
  ground_y = 500,
  groundWidth = 200,
  groundHeight = 5;
// 磚塊class
let brickArray = [],
  brickwidth = 50,
  brickheight = 50,
  strike = 0;
class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = brickwidth;
    this.height = brickheight;
    brickArray.push(this);
    this.visible = true;
  }
  drawBrick() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  touchBall(ballx, bally) {
    return (
      ballx >= this.x - radius &&
      ballx <= this.x + this.width + radius &&
      bally <= this.y + this.height + radius &&
      bally >= this.y - radius
    );
    // if (
    //   ballx >= this.x - radius &&
    //   ballx <= this.x + this.width + radius &&
    //   bally <= this.y + this.height + radius &&
    //   bally >= this.x - radius
    // ) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
}
// 生成磚塊
// let brick1 = new Brick(100,100);
function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}
for (let i = 0; i < 10; i++) {
  new Brick(
    getRandom(0, canvasWidth / brickwidth) * brickwidth,
    getRandom(0, canvasHeight / brickheight - 2) * brickheight
  );
}

// 監聽滑鼠
canvas.addEventListener("mousemove", (e) => {
  console.log(e.clientX);
  ground_x = e.clientX - groundWidth / 2;
});
function drawCircle() {
  // 背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 地板
  ctx.fillStyle = "orange";
  ctx.fillRect(ground_x, ground_y, groundWidth, groundHeight);
  // 地板反彈
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + groundWidth + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + radius
  ) {
    if (ySpeed > 0) {
      circle_y -= 40;
    } else {
      circle_y += 40;
    }
    ySpeed *= -1;
  }

  // 球
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
  // 球移動
  if (circle_x >= canvasWidth - radius) {
    xSpeed *= -1;
  }
  if (circle_x <= radius) {
    xSpeed *= -1;
  }
  if (circle_y >= canvasHeight - radius) {
    ySpeed *= -1;
  }
  if (circle_y <= radius) {
    ySpeed *= -1;
  }
  circle_x += xSpeed;
  circle_y += ySpeed;

  // 磚塊
  brickArray.forEach((brick) => {
    // 畫磚塊
    if (brick.visible) {
      brick.drawBrick();
    }
    // 偵測磚塊撞擊
    if (brick.visible && brick.touchBall(circle_x, circle_y)) {
      strike++;
      brick.visible = false;
      // 從下方與上方撞擊
      if (circle_y >= brick.y + brick.height || circle_y <= brick.y) {
        ySpeed *= -1;
      }
      // 從左方與右方撞擊
      else if (circle_x >= brick.x + brick.width || circle_x <= brick.x) {
        xSpeed *= -1;
      }
      // 改方向並移除陣列值（這方法比較慢所以用改變值來製作比較快）
      // brickArray.splice(index, 1);
      // if (brickArray.length == 0) {
      //   alert("win");
      //   clearTimeout(game);
      // }
      if (strike == 10) {
        alert("win");
        clearTimeout(game);
      }
    }
  });
}

let game = setInterval(drawCircle, 100);