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

class Polygon {
  constructor(lines) {
    this.lines = lines;
    Object.freeze(this);
  }
}

const polygon = new Polygon([
  [
    { x: 200, y: 200 },
    { x: 600, y: 200 },
    { x: 600, y: 500 },
    { x: 200, y: 500 },
    { x: 200, y: 200 },
  ],
]);
const intersectionLine = new LineSting([
  { x: 1000, y: 0 },
  { x: 0, y: 600 },
]);

const canvas = document.querySelector('#map');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 4;

const x1 = intersectionLine.points[0].x;
const y1 = intersectionLine.points[0].y;
const x2 = intersectionLine.points[1].x;
const y2 = intersectionLine.points[1].y;

ctx.strokeStyle = 'rgb(255,0,0)';
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();

for (let i = 1; i < polygon.lines[0].length; i++) {
  const x3 = polygon.lines[0][i - 1].x;
  const y3 = polygon.lines[0][i - 1].y;
  const x4 = polygon.lines[0][i].x;
  const y4 = polygon.lines[0][i].y;

  const intersectionPointX = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
  ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
  const intersectionPointY = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
    ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));

  ctx.strokeStyle = 'rgb(0, 0, 255)';
  ctx.beginPath();
  polygon.lines[0].forEach(({ x, y }, i) => {
    if (i === 1) ctx.moveTo(x, y);
    ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = 'rgb(0, 255, 0)';
  ctx.beginPath();
  ctx.arc(intersectionPointX, intersectionPointY, 10, 0, Math.PI * 2, true);
  ctx.fill();
}


