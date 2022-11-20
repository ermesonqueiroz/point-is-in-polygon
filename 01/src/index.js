class Point {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }
}

class LineSting {
  constructor(points) {
    this.points = points;
    Object.freeze(this);
  }
}

// const point = new Point({ x: 0, y: 10});
const line = new LineSting([
  { x: 400, y: 100 },
  { x: 400, y: 500 },
]);
const intersectionLine = new LineSting([
  { x: 10, y: 100 },
  { x: 600, y: 100 },
]);

const x1 = intersectionLine.points[0].x;
const y1 = intersectionLine.points[0].y;
const x2 = intersectionLine.points[1].x;
const y2 = intersectionLine.points[1].y;
const x3 = line.points[0].x;
const y3 = line.points[0].y;
const x4 = line.points[1].x;
const y4 = line.points[1].y;

const intersectionPointX = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
  ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
const intersectionPointY = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
  ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));

const canvas = document.querySelector('#map');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 4;

ctx.strokeStyle = 'rgb(255,0,0)';
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();

ctx.strokeStyle = 'rgb(0, 0, 255)';
ctx.beginPath();
ctx.moveTo(x3, y3);
ctx.lineTo(x4, y4);
ctx.stroke();

if ((x2 >= x3) && (y1 >= y3 && y1 <= y4)) {
  ctx.fillStyle = 'rgb(0, 255, 0)';
  ctx.beginPath();
  ctx.arc(intersectionPointX, intersectionPointY, 10, 0, Math.PI * 2, true);
  ctx.fill();
}

